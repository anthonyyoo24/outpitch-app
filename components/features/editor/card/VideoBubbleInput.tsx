"use client"

import React from "react"

export function VideoBubbleInput() {
    return (
        <div className="relative shrink-0 w-24 h-24 sm:w-36 sm:h-36 rounded-full shadow-xl border border-neutral-100 overflow-hidden transform rotate-0 sm:rotate-2 hover:rotate-0 transition-transform duration-500 ring-1 ring-neutral-200 sm:my-4 mx-auto bg-neutral-50">
            <label className="flex flex-col items-center justify-center w-full h-full transition-colors cursor-pointer bg-neutral-50 hover:bg-neutral-100 group">
                <input type="file" className="hidden" />
                <div className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 mb-1 transition-colors border border-dashed rounded-full border-neutral-300 group-hover:border-neutral-400 bg-white">
                    {/* Solar Icon: upload-minimalistic-linear */}
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        className="text-neutral-400 transition-colors group-hover:text-neutral-600 sm:w-4.5"
                    >
                        <path
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.5"
                            d="M3 15c0 2.828 0 4.243.879 5.121C4.757 21 6.172 21 9 21h6c2.828 0 4.243 0 5.121-.879C21 19.243 21 17.828 21 15m-9 1V3m0 0l4 4.375M12 3L8 7.375"
                        />
                    </svg>
                </div>
                <span className="text-[8px] sm:text-[9px] font-medium tracking-wide text-neutral-400 uppercase transition-colors font-mono group-hover:text-neutral-600">
                    Upload
                </span>
            </label>
        </div>
    )
}
