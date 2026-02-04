"use client"

import React from "react"
import { X } from "lucide-react"

export function TechStackInput() {
    return (
        <section className="mb-8 sm:mb-10">
            <div className="flex items-center justify-between mb-4">
                <h3 className="uppercase text-xs font-semibold text-neutral-900 tracking-widest font-mono">
                    Tech Stack
                </h3>
                <button
                    type="button"
                    className="text-[10px] font-medium text-neutral-400 hover:text-red-500 transition-colors font-mono"
                >
                    Clear all
                </button>
            </div>
            <div className="flex flex-wrap gap-2 mb-4">
                <div className="pl-2.5 pr-1 py-1.5 rounded-lg border border-neutral-300 bg-white flex items-center gap-1.5 text-xs font-medium text-neutral-600 cursor-pointer group hover:border-red-200 hover:bg-red-50 hover:text-red-500 transition-all font-mono shadow-sm">
                    <span>React</span>
                    <X className="w-3.5 h-3.5 text-neutral-400 group-hover:text-red-400 transition-colors" />
                </div>
                <div className="pl-2.5 pr-1 py-1.5 rounded-lg border border-neutral-300 bg-white flex items-center gap-1.5 text-xs font-medium text-neutral-600 cursor-pointer group hover:border-red-200 hover:bg-red-50 hover:text-red-500 transition-all font-mono shadow-sm">
                    <span>Tailwind</span>
                    <X className="w-3.5 h-3.5 text-neutral-400 group-hover:text-red-400 transition-colors" />
                </div>
            </div>
            <div className="relative min-h-11 sm:min-h-11.5 p-1.5 rounded-xl border border-neutral-300 bg-neutral-50/50 flex flex-wrap gap-2 transition-colors focus-within:border-neutral-300 hover:border-neutral-400 focus-within:bg-white focus-within:shadow-sm">
                <input
                    type="text"
                    className="flex-1 min-w-30 border-none placeholder-neutral-400 focus:outline-none focus:ring-0 text-xs text-neutral-900 font-mono bg-transparent pt-1.5 pr-2 pb-1.5 pl-2"
                    placeholder="Search stack..."
                />
            </div>
        </section>
    )
}
