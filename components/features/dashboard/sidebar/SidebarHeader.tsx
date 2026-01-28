import { CreatePitchTrigger } from "./CreatePitchTrigger"

export function SidebarHeader() {
    return (
        <div className="flex h-14 shrink-0 items-center justify-between border-b border-neutral-200 px-4">
            <div className="flex items-center gap-2">
                <div className="flex h-6 w-6 items-center justify-center rounded-md bg-neutral-900 text-white shadow-sm">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                        <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                        <line x1="12" y1="22.08" x2="12" y2="12" />
                    </svg>
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
