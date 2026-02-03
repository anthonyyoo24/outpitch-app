export function EmptyStateIllustration() {
    return (
        <div className="flex w-full mb-2 pt-12 pb-12 relative items-center justify-center">
            {/* Concentric Circles (Ripples) */}
            <div className="absolute inset-0 flex items-center justify-center select-none pointer-events-none">
                {/* Outer Circle */}
                <div className="w-[21.25rem] h-[21.25rem] rounded-full border border-neutral-200/40"></div>
                {/* Middle Circle */}
                <div className="absolute w-60 h-60 rounded-full border border-neutral-200/60"></div>
                {/* Inner Circle */}
                <div className="absolute w-[8.75rem] h-[8.75rem] rounded-full border border-neutral-200"></div>
            </div>

            {/* Sparkles */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[11.25rem] h-[11.25rem] pointer-events-none select-none">
                {/* Top Right Sparkle */}
                <svg
                    aria-hidden="true"
                    focusable="false"
                    className="absolute top-8 right-8 w-4 h-4 text-neutral-400 animate-pulse"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                >
                    <path d="M12 2L14.4 9.6L22 12L14.4 14.4L12 22L9.6 14.4L2 12L9.6 9.6L12 2Z"></path>
                </svg>
                {/* Bottom Left Sparkle */}
                <svg
                    aria-hidden="true"
                    focusable="false"
                    className="absolute bottom-10 left-10 w-3 h-3 text-neutral-300 animate-pulse delay-75"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                >
                    <path d="M12 2L14.4 9.6L22 12L14.4 14.4L12 22L9.6 14.4L2 12L9.6 9.6L12 2Z"></path>
                </svg>
                {/* Top Left Sparkle (Small) */}
                <svg
                    aria-hidden="true"
                    focusable="false"
                    className="absolute top-12 left-12 w-2.5 h-2.5 text-neutral-300 animate-pulse delay-150"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                >
                    <path d="M12 2L14.4 9.6L22 12L14.4 14.4L12 22L9.6 14.4L2 12L9.6 9.6L12 2Z"></path>
                </svg>
                {/* Bottom Right Sparkle (Small) */}
                <svg
                    aria-hidden="true"
                    focusable="false"
                    className="absolute bottom-14 right-12 w-2 h-2 text-neutral-300 animate-pulse"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                >
                    <path d="M12 2L14.4 9.6L22 12L14.4 14.4L12 22L9.6 14.4L2 12L9.6 9.6L12 2Z"></path>
                </svg>
            </div>

            {/* Central Icon Box */}
            <div className="relative z-10 w-[4.5rem] h-[4.5rem] bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-neutral-100 flex items-center justify-center group transition-transform hover:scale-105 duration-300">
                {/* Rocket Icon */}
                <svg
                    aria-hidden="true"
                    focusable="false"
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-neutral-400 w-[2.625rem] h-[2.625rem] drop-shadow-sm"
                >
                    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"></path>
                    <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"></path>
                    <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"></path>
                    <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"></path>
                </svg>
            </div>
        </div>
    )
}
