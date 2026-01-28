export function SidebarListSkeleton() {
    return (
        <div className="flex flex-1 flex-col space-y-1 p-2 animate-pulse">
            {/* Simulate 5 list items */}
            {[...Array(5)].map((_, i) => (
                <div key={i} className="flex items-center gap-3 rounded-lg p-2">
                    <div className="h-8 w-8 shrink-0 rounded-md bg-neutral-100"></div>
                    <div className="flex flex-1 flex-col gap-1.5">
                        <div className="h-3 w-24 rounded bg-neutral-100"></div>
                        <div className="h-2 w-16 rounded bg-neutral-100"></div>
                    </div>
                </div>
            ))}
        </div>
    )
}
