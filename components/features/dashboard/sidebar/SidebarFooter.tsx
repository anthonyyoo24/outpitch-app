"use client"

import { Settings, LogOut } from "lucide-react"
import { signOutAction } from "@/app/auth/actions"

export function SidebarFooter() {
    return (
        <div className="border-t border-neutral-200 bg-neutral-50/30 p-3">
            <div className="flex items-center justify-between p-2 rounded-lg hover:bg-neutral-100 transition-colors cursor-pointer group">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-neutral-200 flex items-center justify-center group-hover:bg-neutral-300 transition-colors">
                        <Settings className="h-4 w-4 text-neutral-600" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-xs font-semibold text-neutral-900">
                            Settings
                        </span>
                        <span className="text-[10px] text-neutral-500 font-medium">
                            Preferences
                        </span>
                    </div>
                </div>
                <button
                    onClick={() => signOutAction()}
                    className="group/logout cursor-pointer relative p-1.5 text-neutral-400 hover:text-neutral-900 hover:bg-neutral-200/60 rounded-md transition-all"
                >
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-neutral-900 text-white text-[10px] font-medium rounded opacity-0 group-hover/logout:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50 shadow-sm">
                        Log out
                    </div>
                    <LogOut className="h-4 w-4" />
                </button>
            </div>
        </div>
    )
}
