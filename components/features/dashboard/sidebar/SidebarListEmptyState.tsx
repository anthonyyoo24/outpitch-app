export function SidebarListEmptyState() {
    return (
        <div className="flex flex-1 flex-col items-center justify-center p-6 text-center animate-in fade-in duration-700">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl border border-neutral-100 bg-neutral-50 text-neutral-400">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z" />
                    <path d="m21.854 2.147-10.94 10.939" />
                </svg>
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
