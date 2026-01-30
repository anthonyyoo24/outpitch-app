import { Settings } from "lucide-react"

export function SidebarFooter() {
    return (
        <div className="border-t border-neutral-200 bg-neutral-50/30 p-3">
            <div className="cursor-pointer rounded-lg p-2 hover:bg-neutral-100 transition-colors flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-100">
                    <Settings className="size-4 text-neutral-600" />
                </div>
                <div className="flex flex-col">
                    <span className="text-xs font-medium text-neutral-900">
                        Settings
                    </span>
                    <span className="text-[10px] text-neutral-500">
                        Preferences
                    </span>
                </div>
            </div>
        </div>
    )
}
