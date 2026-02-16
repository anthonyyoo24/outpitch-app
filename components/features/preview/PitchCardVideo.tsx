"use client"

import { useState, useRef } from "react"
import { Play, Pause } from "lucide-react"

interface PitchCardVideoProps {
    videoUrl?: string
}

export function PitchCardVideo({ videoUrl }: PitchCardVideoProps) {
    const [isInPlaybackMode, setIsInPlaybackMode] = useState(false)
    const [isPlaying, setIsPlaying] = useState(false)
    const [isHovering, setIsHovering] = useState(false)
    const videoRef = useRef<HTMLVideoElement>(null)

    const handleVideoClick = () => {
        if (!videoUrl || !videoRef.current) return

        if (!isInPlaybackMode) {
            // First click: switch from preview to playback mode
            setIsInPlaybackMode(true)
            videoRef.current.muted = false
            videoRef.current.loop = false // Disable looping in playback mode
            videoRef.current.currentTime = 0 // Reset to beginning
            videoRef.current.play()
            setIsPlaying(true)
        } else {
            // Subsequent clicks: toggle play/pause
            if (isPlaying) {
                videoRef.current.pause()
                setIsPlaying(false)
            } else {
                videoRef.current.play()
                setIsPlaying(true)
            }
        }
    }

    const handleMouseEnter = () => setIsHovering(true)
    const handleMouseLeave = () => setIsHovering(false)

    // Determine which icon to show
    const showPlayIcon = !isInPlaybackMode || !isPlaying
    const showPauseIcon = isInPlaybackMode && isPlaying && isHovering

    return (
        <div
            className="relative shrink-0 w-28 h-28 rounded-full border border-neutral-100 overflow-hidden mt-8 mb-8 bg-neutral-50 sm:w-36 sm:h-36 shadow-xl shadow-neutral-200/50 group cursor-pointer"
            onClick={handleVideoClick}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {videoUrl ? (
                <video
                    ref={videoRef}
                    src={videoUrl}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                    style={{
                        filter: 'saturate(0.85) contrast(1.15) brightness(1.05)',
                    }}
                    onPlay={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                />
            ) : (
                <div className="w-full h-full bg-neutral-100" />
            )}
            {(showPlayIcon || showPauseIcon) && (
                <div className="flex bg-white/5 absolute top-0 right-0 bottom-0 left-0 items-center justify-center pointer-events-none z-10">
                    <div className="bg-white/30 backdrop-blur-sm border border-white/40 rounded-full w-12 h-12 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-sm">
                        {showPauseIcon ? (
                            <Pause className="w-5 h-5 text-black fill-current" />
                        ) : (
                            <Play className="w-5 h-5 text-black fill-current pl-0.5" />
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}
