"use client"

import React from "react"
import { CirclePlus, ChevronDown } from "lucide-react"

export function JourneyInput() {
    return (
        <section>
            <div className="flex items-center justify-between mb-4 sm:mb-5">
                <h3 className="uppercase text-xs font-semibold text-neutral-900 tracking-widest font-mono">
                    Journey
                </h3>
            </div>
            <div className="relative space-y-6">
                <div className="relative group">
                    <div className="relative p-4 sm:p-5 rounded-2xl border border-dashed border-neutral-400 bg-neutral-50/30 hover:border-neutral-500 hover:bg-neutral-50 transition-colors space-y-4">
                        <div className="space-y-2">
                            <input
                                type="text"
                                className="placeholder-neutral-400 focus:outline-none focus:border-neutral-400 transition-colors text-sm font-medium text-neutral-900 font-mono bg-transparent w-full border-neutral-200 border-b pb-1"
                                placeholder="Role Title"
                            />
                            <input
                                type="text"
                                className="w-full bg-transparent border-b border-neutral-200 text-xs text-neutral-500 placeholder-neutral-400 focus:outline-none focus:border-neutral-400 transition-colors pb-1"
                                placeholder="Company Name"
                            />
                        </div>
                        <div className="space-y-3">
                            <label className="flex items-center gap-2 cursor-pointer w-fit select-none">
                                <input
                                    type="checkbox"
                                    className="w-3.5 h-3.5 rounded border-neutral-300 bg-white text-neutral-900 focus:ring-0 focus:ring-offset-0 checked:bg-neutral-900 checked:border-neutral-900 transition-colors"
                                />
                                <span className="text-[10px] font-medium text-neutral-500 font-mono transition-colors group-hover:text-neutral-700">
                                    Current role
                                </span>
                            </label>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <p className="text-[9px] uppercase tracking-wider text-neutral-500 font-mono font-semibold">
                                        Start Date
                                    </p>
                                    <div className="flex gap-2">
                                        <div className="relative w-full group/start-month z-31">
                                            <button
                                                type="button"
                                                className="w-full flex items-center justify-between bg-transparent border-b border-neutral-200 text-[11px] text-neutral-500 focus:outline-none focus:border-neutral-400 pb-1 font-mono transition-colors"
                                            >
                                                <span>Month</span>
                                                <ChevronDown className="w-2.5 h-2.5 text-neutral-400 transition-transform duration-300 group-focus-within/start-month:rotate-180" />
                                            </button>
                                        </div>
                                        <div className="relative w-full group/start-year z-31">
                                            <button
                                                type="button"
                                                className="w-full flex items-center justify-between bg-transparent border-b border-neutral-200 text-[11px] text-neutral-500 focus:outline-none focus:border-neutral-400 pb-1 font-mono transition-colors"
                                            >
                                                <span>Year</span>
                                                <ChevronDown className="w-2.5 h-2.5 text-neutral-400 transition-transform duration-300 group-focus-within/start-year:rotate-180" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-1 end-date-group transition-opacity duration-300">
                                    <p className="text-[9px] uppercase tracking-wider text-neutral-500 font-mono font-semibold">
                                        End Date
                                    </p>
                                    <div className="flex gap-2">
                                        <div className="relative w-full group/end-month z-30">
                                            <button
                                                type="button"
                                                className="w-full flex items-center justify-between bg-transparent border-b border-neutral-200 text-[11px] text-neutral-500 focus:outline-none focus:border-neutral-400 pb-1 font-mono transition-colors"
                                            >
                                                <span>Month</span>
                                                <ChevronDown className="w-2.5 h-2.5 text-neutral-400 transition-transform duration-300 group-focus-within/end-month:rotate-180" />
                                            </button>
                                        </div>
                                        <div className="relative w-full group/end-year z-30">
                                            <button
                                                type="button"
                                                className="w-full flex items-center justify-between bg-transparent border-b border-neutral-200 text-[11px] text-neutral-500 focus:outline-none focus:border-neutral-400 pb-1 font-mono transition-colors"
                                            >
                                                <span>Year</span>
                                                <ChevronDown className="w-2.5 h-2.5 text-neutral-400 transition-transform duration-300 group-focus-within/end-year:rotate-180" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <textarea
                            rows={1}
                            className="w-full bg-transparent border-b border-neutral-200 text-xs text-neutral-500 placeholder-neutral-400 focus:outline-none focus:border-neutral-400 transition-colors resize-none leading-relaxed"
                            placeholder="Description"
                        />
                    </div>
                </div>
                <div className="relative">
                    <button
                        type="button"
                        className="w-full py-3 rounded-xl border border-dashed border-neutral-400 text-neutral-500 hover:text-neutral-900 hover:border-neutral-500 hover:bg-neutral-50 transition-all flex items-center justify-center gap-2 text-xs font-medium font-mono group"
                    >
                        <CirclePlus className="w-4 h-4 group-hover:scale-110 transition-transform" />
                        Add Role
                    </button>
                </div>
            </div>
        </section>
    )
}
