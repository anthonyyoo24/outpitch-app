"use client"

import { useUIStore } from "@/lib/store/ui-store"

export function EmptyState() {
    const setOpen = useUIStore((state) => state.setCreatePitchModalOpen)

    return (
        <main className="flex-1 relative h-full overflow-hidden bg-[#FAFAFA]">
            {/* Technical Grid Background */}
            <div className="fixed inset-0 w-full h-full pointer-events-none z-0 opacity-50 bg-[linear-gradient(to_right,rgba(0,0,0,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.04)_1px,transparent_1px)] bg-size-[40px_40px]"></div>

            {/* Scrollable Container */}
            <div className="overflow-y-auto custom-scrollbar flex pt-20 pb-10 sm:pt-16 sm:px-8 z-0 w-full h-full relative items-start justify-center">
                {/* Center Card */}
                <div className="flex flex-col animate-in fade-in zoom-in duration-500 text-center w-full max-w-md mt-auto mr-auto mb-auto ml-auto items-center justify-center p-4">
                    {/* Illustration: Concentric Circles + Rocket + Sparkles */}
                    <div className="flex w-full mb-2 pt-12 pb-12 relative items-center justify-center">
                        {/* Concentric Circles (Ripples) */}
                        <div className="absolute inset-0 flex items-center justify-center select-none pointer-events-none">
                            {/* Outer Circle */}
                            <div className="w-85 h-85 rounded-full border border-neutral-200/40"></div>
                            {/* Middle Circle */}
                            <div className="absolute w-60 h-60 rounded-full border border-neutral-200/60"></div>
                            {/* Inner Circle */}
                            <div className="absolute w-35 h-35 rounded-full border border-neutral-200"></div>
                        </div>

                        {/* Sparkles */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-45 h-45 pointer-events-none select-none">
                            {/* Top Right Sparkle */}
                            <svg
                                className="absolute top-8 right-8 w-4 h-4 text-neutral-400 animate-pulse"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                            >
                                <path d="M12 2L14.4 9.6L22 12L14.4 14.4L12 22L9.6 14.4L2 12L9.6 9.6L12 2Z"></path>
                            </svg>
                            {/* Bottom Left Sparkle */}
                            <svg
                                className="absolute bottom-10 left-10 w-3 h-3 text-neutral-300 animate-pulse delay-75"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                            >
                                <path d="M12 2L14.4 9.6L22 12L14.4 14.4L12 22L9.6 14.4L2 12L9.6 9.6L12 2Z"></path>
                            </svg>
                            {/* Top Left Sparkle (Small) */}
                            <svg
                                className="absolute top-12 left-12 w-2.5 h-2.5 text-neutral-300 animate-pulse delay-150"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                            >
                                <path d="M12 2L14.4 9.6L22 12L14.4 14.4L12 22L9.6 14.4L2 12L9.6 9.6L12 2Z"></path>
                            </svg>
                            {/* Bottom Right Sparkle (Small) */}
                            <svg
                                className="absolute bottom-14 right-12 w-2 h-2 text-neutral-300 animate-pulse"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                            >
                                <path d="M12 2L14.4 9.6L22 12L14.4 14.4L12 22L9.6 14.4L2 12L9.6 9.6L12 2Z"></path>
                            </svg>
                        </div>

                        {/* Central Icon Box */}
                        <div className="relative z-10 w-18 h-18 bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-neutral-100 flex items-center justify-center group transition-transform hover:scale-105 duration-300">
                            {/* Rocket Icon */}
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="32"
                                height="32"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="text-neutral-400 w-10.5 h-10.5 drop-shadow-sm"
                            >
                                <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"></path>
                                <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"></path>
                                <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"></path>
                                <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"></path>
                            </svg>
                        </div>
                    </div>

                    <h2 className="text-base font-semibold text-neutral-900 tracking-tight mb-3">
                        Ready to stand out?
                    </h2>
                    <p className="text-sm text-neutral-500 max-w-75 mb-8 leading-relaxed">
                        Create a high-signal pitch that cuts through the noise.
                    </p>
                    <button
                        onClick={() => setOpen(true)}
                        className="group cursor-pointer inline-flex items-center justify-center gap-2.5 px-6 py-3 bg-neutral-900 hover:bg-neutral-800 text-white text-sm font-medium rounded-full transition-all shadow-md hover:shadow-lg active:scale-95"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="opacity-70 group-hover:opacity-100 transition-opacity"
                        >
                            <path d="M5 12h14"></path>
                            <path d="M12 5v14"></path>
                        </svg>
                        <span>Create New Pitch</span>
                    </button>
                </div>
            </div>
        </main>
    )
}
