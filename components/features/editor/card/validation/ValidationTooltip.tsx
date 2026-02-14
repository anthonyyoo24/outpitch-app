"use client"

import React, { useEffect, useState } from "react"
import { AlertCircle } from "lucide-react"

interface ValidationTooltipProps {
    error?: string
}

export function ValidationTooltip({ error }: ValidationTooltipProps) {
    const [isFlashing, setIsFlashing] = useState(false)

    useEffect(() => {
        if (error) {
            // Defer the flash to the next tick to avoid synchronous state update warning
            const startTimer = setTimeout(() => setIsFlashing(true), 0)
            const endTimer = setTimeout(() => setIsFlashing(false), 3000)

            return () => {
                clearTimeout(startTimer)
                clearTimeout(endTimer)
            }
        }
    }, [error])

    if (!error) return null

    return (
        <div
            className={`absolute bottom-full mb-2.5 left-0 z-50 flex items-center gap-1.5 px-2.5 py-1.5 bg-red-500 text-white text-[10px] font-medium rounded-lg shadow-sm whitespace-nowrap transition-opacity duration-200 pointer-events-none ${isFlashing ? "opacity-100" : "opacity-0 group-hover:opacity-100 group-focus-within:opacity-100"
                }`}
        >
            <AlertCircle className="w-3 h-3" />
            {error}
            {/* Arrow */}
            <div className="absolute top-full left-4 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-red-500" />
        </div>
    )
}
