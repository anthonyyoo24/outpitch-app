"use client"

import React from "react"
import { Eye, Rocket } from "lucide-react"

export function PitchEditorToolbar() {
    return (
        <div className="absolute top-0 left-0 right-0 h-14 flex items-center justify-end px-6 z-10 pointer-events-none sm:pointer-events-auto">
            <div className="hidden sm:flex items-center gap-2">
                <button
                    type="button"
                    className="group flex items-center gap-2 bg-white border border-neutral-200 text-neutral-600 hover:text-neutral-900 hover:border-neutral-300 px-4 py-1.5 rounded-full text-xs font-medium shadow-[0_1px_2px_rgba(0,0,0,0.06)] transition-all active:scale-95"
                >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Preview</span>
                </button>

                <button
                    type="button"
                    className="group flex items-center gap-2 bg-neutral-900 border border-neutral-900 text-white px-4 py-1.5 rounded-full text-xs font-medium shadow-md hover:bg-neutral-800 hover:shadow-lg transition-all active:scale-95"
                >
                    <Rocket className="w-3.5 h-3.5" />
                    <span>Publish</span>
                </button>
            </div>
        </div>
    )
}
