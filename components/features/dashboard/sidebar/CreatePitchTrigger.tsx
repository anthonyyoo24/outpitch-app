"use client"

import { SquarePen } from "lucide-react"
import { useUIStore } from "@/lib/store/ui-store"

export function CreatePitchTrigger() {
    const setOpen = useUIStore((state) => state.setCreatePitchModalOpen)

    return (
        <button
            type="button"
            aria-label="Create a new pitch"
            onClick={() => setOpen(true)}
            className="group cursor-pointer relative flex h-8 w-8 items-center justify-center rounded-lg border border-neutral-200 bg-white shadow-sm transition-all hover:bg-neutral-50 hover:text-neutral-900 text-neutral-500 outline-none"
        >
            <SquarePen className="w-4 h-4" />
            {/* Tooltip */}
            <span className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-2 py-1 text-[10px] font-medium text-white bg-neutral-900 rounded-md shadow-sm opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
                Create a new pitch
            </span>
        </button>
    )
}
