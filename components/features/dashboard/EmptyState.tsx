"use client"

import { useUIStore } from "@/lib/store/ui-store"
import { EmptyStateIllustration } from "./EmptyStateIllustration"
import { Plus } from "lucide-react"

export function EmptyState() {
    const setOpen = useUIStore((state) => state.setCreatePitchModalOpen)

    return (
        <div className="overflow-y-auto custom-scrollbar flex pt-20 pb-10 sm:pt-16 sm:px-8 z-0 w-full h-full relative items-start justify-center">
            {/* Center Card */}
            <div className="flex flex-col animate-in fade-in zoom-in duration-500 text-center w-full max-w-md mt-auto mr-auto mb-auto ml-auto items-center justify-center p-4">
                {/* Illustration: Concentric Circles + Rocket + Sparkles */}
                <EmptyStateIllustration />

                <h2 className="text-base font-semibold text-neutral-900 tracking-tight mb-3">
                    Ready to stand out?
                </h2>
                <p className="text-sm text-neutral-500 max-w-[18.75rem] mb-8 leading-relaxed">
                    Create a high-signal pitch that cuts through the noise.
                </p>
                <button
                    onClick={() => setOpen(true)}
                    className="group cursor-pointer inline-flex items-center justify-center gap-2.5 px-6 py-3 bg-neutral-900 hover:bg-neutral-800 text-white text-sm font-medium rounded-full transition-all shadow-md hover:shadow-lg active:scale-95"
                >
                    <Plus className="w-4 h-4 opacity-70 group-hover:opacity-100 transition-opacity" />
                    <span>Create New Pitch</span>
                </button>
            </div>
        </div>
    )
}
