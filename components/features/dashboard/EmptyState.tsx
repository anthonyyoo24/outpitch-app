"use client"

import { useUIStore } from "@/lib/store/ui-store"
import { EmptyStateIllustration } from "./EmptyStateIllustration"
import { Plus } from "lucide-react"

export function EmptyState() {
    const setOpen = useUIStore((state) => state.setCreatePitchModalOpen)

    return (
        <main className="flex-1 relative h-full overflow-hidden bg-[#FAFAFA]">
            {/* Technical Grid Background */}
            <div className="fixed inset-0 w-full h-full pointer-events-none z-0 opacity-50 bg-[linear-gradient(to_right,rgba(0,0,0,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.04)_1px,transparent_1px)] bg-size-[40px_40px]"></div>

            {/* Scrollable Container */}
            <div className="overflow-y-auto custom-scrollbar flex pt-20 pb-10 sm:pt-16 sm:px-8 z-0 w-full h-full relative items-start justify-center">
                {/* Center Card */}
                <div className="flex flex-col animate-in fade-in zoom-in duration-500 text-center w-full max-w-md mt-auto mr-auto mb-auto ml-auto items-center justify-center p-4">
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
        </main>
    )
}
