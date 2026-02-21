import { GIFEncoder, quantize, applyPalette } from "gifenc"

/**
 * Generates an animated GIF thumbnail from a video file.
 * It strictly captures the first `duration` seconds at a specified `fps`.
 * 
 * @param file The uploaded video file
 * @param fps Frames per second (e.g., 5 for a choppy Vidyard feel)
 * @param duration Total duration in seconds (e.g., 3)
 * @param targetWidth The width of the generated GIF (maintains aspect ratio)
 * @returns A Blob representing the image/gif, or null if it fails
 */
export async function generateGifThumbnail(
    file: File,
    fps: number = 5,
    duration: number = 3,
    targetWidth: number = 320
): Promise<Blob | null> {
    return new Promise((resolve) => {
        const objectUrl = URL.createObjectURL(file)
        try {
            const video = document.createElement("video")
            video.src = objectUrl
            video.muted = true
            video.crossOrigin = "anonymous"
            video.playsInline = true

            const cleanup = () => {
                URL.revokeObjectURL(objectUrl)
                video.onseeked = null
                video.onerror = null
                video.onloadeddata = null
            }

            let settled = false
            const finish = (result: Blob | null) => {
                if (settled) return
                settled = true
                clearTimeout(seekTimeoutId)
                cleanup()
                resolve(result)
            }

            // Failsafe: if onseeked never fires, resolve null instead of hanging
            const seekTimeoutId = setTimeout(() => {
                console.warn("GIF generation timed out.")
                finish(null)
            }, 15_000)

            video.onloadeddata = () => {
                const canvas = document.createElement("canvas")
                const scale = targetWidth / video.videoWidth
                const targetHeight = Math.round(video.videoHeight * scale)

                canvas.width = targetWidth
                canvas.height = targetHeight
                const ctx = canvas.getContext("2d", { willReadFrequently: true })

                if (!ctx) {
                    finish(null)
                    return
                }

                const gif = GIFEncoder()
                const totalFrames = fps * duration
                const delayMs = 1000 / fps
                let currentFrame = 0

                const captureFrame = () => {
                    try {
                        // Draw current video frame to canvas
                        ctx.drawImage(video, 0, 0, targetWidth, targetHeight)
                        const imageData = ctx.getImageData(0, 0, targetWidth, targetHeight)

                        // Quantize colors (128 colors for balance of quality and speed)
                        // format: 'rgb444' helps with performance and file size
                        const palette = quantize(imageData.data, 128, { format: 'rgb444' })
                        const index = applyPalette(imageData.data, palette)

                        // Write frame to GIF
                        gif.writeFrame(index, targetWidth, targetHeight, { palette, delay: delayMs })

                        currentFrame++
                        if (currentFrame < totalFrames && video.currentTime < video.duration) {
                            // Move to next frame
                            video.currentTime += (1 / fps)
                        } else {
                            // All frames captured, finalize GIF
                            gif.finish()
                            const buffer = gif.bytesView()
                            finish(new Blob([buffer as unknown as BlobPart], { type: "image/gif" }))
                        }
                    } catch (err) {
                        console.error("Frame capture error:", err)
                        finish(null)
                    }
                }

                // Listen for seeked events to guarantee the frame is ready to draw
                video.onseeked = captureFrame

                // Trigger the first frame capture by seeking slightly.
                // Using 0.001 instead of 0 prevents the browser from ignoring the seek
                // if it considers the video already at time 0.
                video.currentTime = 0.001
            }

            video.onerror = () => {
                console.error("Video loading error:", video.error)
                finish(null)
            }
        } catch (err) {
            console.error("Error setting up GIF generation:", err)
            URL.revokeObjectURL(objectUrl)
            resolve(null)
        }
    })
}
