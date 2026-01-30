import { Package2 } from "lucide-react"
import { CreatePitchTrigger } from "./CreatePitchTrigger"

export function SidebarHeader() {
    return (
        <div className="flex h-14 shrink-0 items-center justify-between border-b border-neutral-200 px-4">
            <div className="flex items-center gap-2">
                <div className="flex h-6 w-6 items-center justify-center rounded-md bg-neutral-900 text-white shadow-sm">
                    <Package2 className="w-3.5 h-3.5" />
                </div>
                <span className="text-sm font-semibold tracking-tight text-neutral-900">
                    Pitches
                </span>
            </div>
            <div className="flex items-center gap-3">
                <CreatePitchTrigger />
            </div>
        </div>
    )
}
