"use client"

import React from "react"
import { CirclePlus } from "lucide-react"

export function SelectedWorkInput() {
    return (
        <section className="mb-8 sm:mb-10">
            <div className="flex items-center justify-between mb-4 sm:mb-5">
                <h3 className="uppercase text-xs font-semibold text-neutral-900 tracking-widest font-mono">
                    Selected Work
                </h3>
            </div>
            <div className="space-y-4">
                <div className="group relative p-3 rounded-2xl border border-dashed border-neutral-400 bg-neutral-50/50 hover:border-neutral-500 hover:bg-neutral-50 transition-colors">
                    <div className="flex gap-4">
                        <label className="relative shrink-0 w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-white border border-neutral-200 flex flex-col items-center justify-center group-hover:border-neutral-300 transition-colors cursor-pointer overflow-hidden hover:bg-neutral-50 shadow-sm">
                            {/* Solar Icon: gallery-add-linear */}
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                className="text-neutral-400 group-hover:text-neutral-600 transition-colors"
                            >
                                <g fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5">
                                    <path d="M22 12c0 4.714 0 7.071-1.465 8.535C19.072 22 16.714 22 12 22s-7.071 0-8.536-1.465C2 19.072 2 16.714 2 12s0-7.071 1.464-8.536C4.93 2 7.286 2 12 2" />
                                    <path d="m2 12.5l1.752-1.533a2.3 2.3 0 0 1 3.14.105l4.29 4.29a2 2 0 0 0 2.564.222l.299-.21a3 3 0 0 1 3.731.225L21 18.5m-6-13h3.5m0 0H22m-3.5 0V9m0-3.5V2" />
                                </g>
                            </svg>
                            <span className="text-[8px] text-neutral-400 mt-1 font-mono uppercase tracking-wide group-hover:text-neutral-500">
                                Img
                            </span>
                            <input type="file" className="hidden" />
                        </label>
                        <div className="flex-1 min-w-0 flex flex-col justify-center gap-2">
                            <input
                                type="text"
                                className="placeholder-neutral-400 focus:outline-none focus:border-neutral-400 transition-colors text-sm font-medium text-neutral-900 font-mono bg-transparent w-full border-neutral-200 border-b pb-1"
                                placeholder="Project Title"
                            />
                            <input
                                type="text"
                                className="w-full bg-transparent border-b border-neutral-200 text-xs text-neutral-500 placeholder-neutral-400 focus:outline-none focus:border-neutral-400 transition-colors pb-1"
                                placeholder="Description"
                            />
                            <div className="flex items-center gap-2 pt-0.5">
                                {/* Solar Icon: link-linear */}
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="12"
                                    height="12"
                                    viewBox="0 0 24 24"
                                    className="text-neutral-400 shrink-0"
                                >
                                    <g fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5">
                                        <path d="M10.046 14c-1.506-1.512-1.37-4.1.303-5.779l4.848-4.866c1.673-1.68 4.25-1.816 5.757-.305s1.37 4.1-.303 5.78l-2.424 2.433" />
                                        <path d="M13.954 10c1.506 1.512 1.37 4.1-.303 5.779l-2.424 2.433l-2.424 2.433c-1.673 1.68-4.25 1.816-5.757.305s-1.37-4.1.303-5.78l2.424-2.433" />
                                    </g>
                                </svg>
                                <input
                                    type="url"
                                    className="flex-1 bg-transparent border-none text-[10px] text-blue-500 placeholder-neutral-400 focus:outline-none font-mono"
                                    placeholder="Add link..."
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <button
                    type="button"
                    className="w-full py-3 rounded-xl border border-dashed border-neutral-400 text-neutral-500 hover:text-neutral-900 hover:border-neutral-500 hover:bg-neutral-50 transition-all flex items-center justify-center gap-2 text-xs font-medium font-mono group"
                >
                    <CirclePlus className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    Add Portfolio Item
                </button>
            </div>
        </section>
    )
}
