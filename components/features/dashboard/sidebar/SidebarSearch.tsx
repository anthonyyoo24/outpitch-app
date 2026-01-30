import { Search } from "lucide-react";

export function SidebarSearch() {
    return (
        <div className="flex gap-2 border-b border-neutral-100 bg-neutral-50/50 px-4 py-3">
            <div className="relative flex-1">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2.5 text-neutral-500">
                    <Search className="size-3.25" />
                </div>
                <input
                    type="text"
                    placeholder="Search"
                    aria-label="Search pitches"
                    className="w-full rounded-md border border-neutral-200 bg-white py-1.5 pl-8 pr-3 text-[11px] font-medium text-neutral-900 placeholder:text-neutral-400 transition-all focus:border-neutral-300 focus:outline-none focus:ring-1 focus:ring-neutral-100"
                />
            </div>
        </div>
    )
}
