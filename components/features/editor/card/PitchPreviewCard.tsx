"use client"

import React from "react"
import { Eye } from "lucide-react"

export function PitchPreviewCard() {
    return (
        <div className="relative w-full max-w-125 animate-fade-in">
            <div className="sm:p-10 flex flex-col items-center justify-center min-h-150 overflow-visible sm:rounded-[40px] bg-white border-neutral-200/80 border rounded-[32px] pt-5 pr-5 pb-5 pl-5 shadow-[0_2.8px_2.2px_rgba(0,0,0,0.034),0_6.7px_5.3px_rgba(0,0,0,0.048),0_12.5px_10px_rgba(0,0,0,0.06),0_22.3px_17.9px_rgba(0,0,0,0.072),0_41.8px_33.4px_rgba(0,0,0,0.086),0_100px_80px_rgba(0,0,0,0.12)]">

                <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mb-6">
                    <Eye className="w-8 h-8 text-neutral-400" />
                </div>

                <h3 className="text-xl font-medium text-neutral-900 mb-2">Preview Mode</h3>
                <p className="text-neutral-500 text-center max-w-sm mb-8">
                    This is a preview of your pitch. In the future, this will show exactly what your recipient sees.
                </p>

                <div className="px-4 py-2 bg-neutral-100 rounded-lg text-xs font-mono text-neutral-500">
                    PitchPreviewCard.tsx
                </div>
            </div>
        </div>
    )
}
