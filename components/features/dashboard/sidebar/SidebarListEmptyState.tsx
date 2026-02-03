import { Send } from "lucide-react"

export function SidebarListEmptyState() {
    return (
        <div className="flex flex-1 flex-col items-center justify-center p-6 text-center animate-in fade-in duration-700">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl border border-neutral-100 bg-neutral-50 text-neutral-400">
                <Send className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-semibold text-neutral-900">
                No pitches yet
            </h3>
            <p className="mt-1.5 text-xs leading-relaxed text-neutral-500">
                Your pitches will appear here.
            </p>
        </div>
    )
}
