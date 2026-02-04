"use client"

import React from "react"
import { Type, Bold, Italic, Underline } from "lucide-react"

export function PitchHeaderInput() {
    return (
        <div className="flex flex-col pt-2 sm:pt-4 gap-6">
            <div className="w-full z-10">
                <div className="flex flex-col transition-colors hover:border-neutral-300 hover:bg-neutral-50/80 group bg-neutral-50/40 border-neutral-200 border rounded-2xl sm:rounded-3xl p-4 sm:p-5 gap-3">
                    {/* Toolbar */}
                    <div className="flex items-center gap-3 border-b border-neutral-200 pb-3 overflow-x-auto no-scrollbar">
                        <div className="flex items-center gap-1.5 pr-3 border-r border-neutral-200 shrink-0">
                            <Type className="text-neutral-500 w-3 h-3" />
                            <select className="bg-transparent text-[10px] text-neutral-500 font-mono focus:outline-none cursor-pointer hover:text-neutral-900 transition-colors">
                                <option>40px</option>
                                <option>32px</option>
                                <option>24px</option>
                            </select>
                        </div>
                        <div className="flex items-center gap-1 shrink-0">
                            <button
                                type="button"
                                className="p-1.5 text-neutral-400 hover:text-neutral-900 hover:bg-neutral-200/50 rounded-lg transition-colors"
                                title="Bold"
                            >
                                <Bold className="w-3.5 h-3.5" />
                            </button>
                            <button
                                type="button"
                                className="p-1.5 text-neutral-400 hover:text-neutral-900 hover:bg-neutral-200/50 rounded-lg transition-colors"
                                title="Italic"
                            >
                                <Italic className="w-3.5 h-3.5" />
                            </button>
                            <button
                                type="button"
                                className="p-1.5 text-neutral-400 hover:text-neutral-900 hover:bg-neutral-200/50 rounded-lg transition-colors"
                                title="Underline"
                            >
                                <Underline className="w-3.5 h-3.5" />
                            </button>
                        </div>
                    </div>

                    {/* Editable Title */}
                    <div
                        contentEditable
                        suppressContentEditableWarning
                        className="outline-none sm:text-[40px] leading-[1.15] focus:text-neutral-600 transition-colors text-3xl font-normal text-neutral-400 tracking-tight font-mono duration-100 ease-in-out"
                    >
                        Hey Linear, I&apos;m{" "}
                        <span className="text-neutral-900 font-medium block sm:inline">
                            Alex Rivera.
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}
