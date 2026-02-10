
"use client"

import React, { useState, useCallback, useEffect } from "react"
import { useFormContext } from "react-hook-form"
import { useDebounce } from "use-debounce"
import { toast } from "sonner"
import { Upload, Link as LinkIcon, X, Loader2 } from "lucide-react"

import { uploadPitchVideo, deletePitchVideo } from "@/lib/storage/upload"
import { useUserStore } from "@/lib/store/user-store"

export function VideoBubbleInput() {
    const { register, setValue, watch, getValues } = useFormContext()
    const [isUploading, setIsUploading] = useState(false)
    const [isDragging, setIsDragging] = useState(false)
    const [previewUrl, setPreviewUrl] = useState<string | null>(null)
    const [previewType, setPreviewType] = useState<"video" | "image" | null>(null)
    const user = useUserStore((state) => state.user)
    const userId = user?.id

    // Watch video_url to hydrate state if editing existing pitch
    const initialVideoUrl = watch("video_url")
    const initialVideoType = watch("video_type")

    // Hydrate preview on load
    useEffect(() => {
        if (initialVideoUrl && !previewUrl) {
            if (initialVideoType === 'upload') {
                setPreviewUrl(initialVideoUrl)
                setPreviewType('video')
            } else {
                setPreviewThumbnail(initialVideoUrl)
            }
        }
    }, [initialVideoUrl, initialVideoType]) // eslint-disable-line react-hooks/exhaustive-deps

    // --- File Upload Handling ---
    // --- File Upload Handling ---
    const processFile = async (file: File) => {
        if (!file) return

        if (file.size > 50 * 1024 * 1024) {
            toast.error("File too large. Max 50MB.")
            return
        }

        if (!userId) {
            toast.error("You must be logged in to upload.")
            return
        }

        setIsUploading(true)
        setPreviewUrl(URL.createObjectURL(file)) // Immediate local preview
        setPreviewType("video")

        try {
            // [ADDED CLEANUP BLOCK]
            // We read the current value (before upload finishes) to see if we have an old file to kill.
            const currentVideoUrl = getValues("video_url")

            // Check if it's a Supabase Storage URL
            if (currentVideoUrl && currentVideoUrl.includes("/storage/v1/object/public/pitch-media/")) {
                const oldPath = currentVideoUrl.split("pitch-media/")[1]
                if (oldPath) {
                    await deletePitchVideo(oldPath) // Delete old file
                }
            }
            // [END CLEANUP BLOCK]

            const { publicUrl } = await uploadPitchVideo(file, userId)

            setValue("video_url", publicUrl, { shouldDirty: true })
            setValue("video_type", "upload", { shouldDirty: true })
            toast.success("Video uploaded successfully!")
        } catch (error) {
            console.error(error)
            toast.error("Upload failed. Please try again.")
            setPreviewUrl(null)
            setPreviewType(null)
        } finally {
            setIsUploading(false)
        }
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) processFile(file)
    }

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault()
        setIsDragging(true)
    }

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault()
        setIsDragging(false)
    }

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault()
        setIsDragging(false)
        const file = e.dataTransfer.files?.[0]
        if (file) processFile(file)
    }

    // --- Embed Link Handling ---
    const [linkInput, setLinkInput] = useState("")
    const [debouncedLink] = useDebounce(linkInput, 500)

    const setPreviewThumbnail = useCallback(async (url: string) => {
        // 1. YouTube
        const youtubeMatch = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/)
        if (youtubeMatch) {
            const id = youtubeMatch[1]
            const thumb = `https://img.youtube.com/vi/${id}/0.jpg`
            setPreviewUrl(thumb)
            setPreviewType("image")
            setValue("video_url", url)
            setValue("video_type", "youtube")
            return
        }

        // 2. Loom
        if (url.includes("loom.com/share") || url.includes("loom.com/v/")) {
            try {
                const oembedUrl = `https://www.loom.com/v1/oembed?url=${url}`
                const res = await fetch(oembedUrl)
                const data = await res.json()
                if (data.thumbnail_url) {
                    setPreviewUrl(data.thumbnail_url)
                    setPreviewType("image")
                    setValue("video_url", url)
                    setValue("video_type", "loom")
                    return
                }
            } catch (err) {
                console.warn("Loom oembed failed", err)
            }
        }

        // 3. Fallback (Invalid or Unknown)
        if (url.length > 5) {
            toast.error("Only YouTube and Loom links are supported.")
        }
    }, [setValue])

    useEffect(() => {
        if (!debouncedLink) return
        setPreviewThumbnail(debouncedLink)
    }, [debouncedLink, setPreviewThumbnail])


    // --- Render Logic ---
    const hasContent = !!previewUrl

    return (
        <div className="flex flex-col items-center w-full mx-auto sm:my-4">

            {/* Hidden Inputs for Form Data */}
            <input type="hidden" {...register("video_url")} />
            <input type="hidden" {...register("video_type")} />

            {/* 1. The Bubble (Display & Upload Zone) */}
            <div
                className={`relative shrink-0 w-24 h-24 sm:w-36 sm:h-36 rounded-full shadow-xl border overflow-hidden bg-neutral-50 ring-1 group transition-all duration-300
                    ${isDragging ? 'border-indigo-500 ring-2 ring-indigo-500 scale-105' : 'border-neutral-100 ring-neutral-200'}
                    ${hasContent && !isDragging ? 'rotate-0' : 'sm:rotate-2 hover:rotate-0'}`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
            >

                {/* A. Content State */}
                {hasContent && (
                    <div className="absolute inset-0 w-full h-full bg-black">
                        {previewType === "video" ? (
                            <video
                                src={previewUrl!}
                                className="w-full h-full object-cover opacity-90"
                                muted
                                playsInline
                            // No autoplay/loop per user request. Static frame.
                            />
                        ) : (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                                src={previewUrl!}
                                alt="Video Preview"
                                className="w-full h-full object-cover opacity-90"
                            />
                        )}

                        {/* Overlay Action to Remove/Change */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 cursor-pointer"
                            onClick={async (e) => {
                                e.stopPropagation()
                                try {
                                    const currentVideoUrl = getValues("video_url")
                                    if (currentVideoUrl && currentVideoUrl.includes("/storage/v1/object/public/pitch-media/")) {
                                        const oldPath = currentVideoUrl.split("pitch-media/")[1]
                                        if (oldPath) {
                                            await deletePitchVideo(oldPath)
                                            toast.success("Video removed")
                                        }
                                    }
                                } catch (error) {
                                    console.error("Cleanup error:", error)
                                }

                                setPreviewUrl(null)
                                setPreviewType(null)
                                setLinkInput("")
                                setValue("video_url", "", { shouldDirty: true })
                                setValue("video_type", null)
                            }}
                        >
                            <X className="w-8 h-8 text-white drop-shadow-md" />
                        </div>
                    </div>
                )}

                {/* B. Loading State */}
                {isUploading && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/80 z-20">
                        <Loader2 className="w-6 h-6 text-indigo-600 animate-spin mb-1" />
                        <span className="text-[9px] font-medium text-indigo-600 uppercase tracking-wider">Uploading</span>
                    </div>
                )}

                {/* C. Empty State (Upload Trigger) */}
                {!hasContent && !isUploading && (
                    <label className="flex flex-col items-center justify-center w-full h-full transition-colors cursor-pointer bg-neutral-50 hover:bg-neutral-100 group">
                        <input
                            type="file"
                            className="hidden"
                            accept="video/mp4,video/webm,video/ogg,video/quicktime,.mp4,.webm,.ogg,.mov"
                            onChange={handleFileChange}
                        />
                        <div className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 mb-1 transition-colors border border-dashed rounded-full border-neutral-300 group-hover:border-neutral-400 bg-white">
                            <Upload className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-neutral-400 group-hover:text-neutral-600" />
                        </div>
                        <span className="text-[8px] sm:text-[9px] font-medium tracking-wide text-neutral-400 uppercase transition-colors font-mono group-hover:text-neutral-600">
                            Upload
                        </span>
                    </label>
                )}
            </div>

            {/* 2. Link Input (Below Bubble) */}
            <div className="mt-4 w-full max-w-60 relative">
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <LinkIcon className="h-3.5 w-3.5 text-neutral-400" />
                    </div>
                    <input
                        type="text"
                        placeholder="Link (YouTube / Loom)"
                        value={linkInput}
                        onChange={(e) => setLinkInput(e.target.value)}
                        disabled={isUploading}
                        className="block w-full pl-8 pr-3 py-2 border border-neutral-200 rounded-full text-xs placeholder:text-neutral-400 focus:outline-none focus:ring-1 focus:ring-neutral-300 focus:border-neutral-300 bg-white/50 text-center transition-all"
                    />
                </div>
            </div>

        </div>
    )
}
