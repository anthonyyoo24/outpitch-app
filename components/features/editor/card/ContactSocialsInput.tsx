"use client"

import React from "react"
import { Calendar, Mail, Linkedin, Trash2, FileText, ChevronUp, CirclePlus } from "lucide-react"

export function ContactSocialsInput() {
    return (
        <section className="mt-8 sm:mt-10 pt-6 border-t border-neutral-200">
            <div className="flex flex-col gap-6 sm:gap-8">
                <div className="space-y-4">
                    <h3 className="uppercase text-xs font-semibold text-neutral-900 tracking-widest font-mono">
                        Contact
                    </h3>
                    <div className="grid gap-3">
                        <div className="group relative flex items-center gap-3 p-1.5 pl-3 rounded-2xl border border-neutral-300 bg-neutral-50/50 hover:border-neutral-400 transition-colors focus-within:border-neutral-400 focus-within:bg-white focus-within:shadow-sm">
                            <Calendar className="w-4.5 h-4.5 text-neutral-400" />
                            <input
                                type="url"
                                className="flex-1 bg-transparent border-none text-xs text-neutral-900 placeholder-neutral-400 focus:outline-none py-2.5 font-mono"
                                placeholder="Calendly or scheduling link"
                            />
                        </div>
                        <div className="group relative flex items-center gap-3 p-1.5 pl-3 rounded-2xl border border-neutral-300 bg-neutral-50/50 hover:border-neutral-400 transition-colors focus-within:border-neutral-400 focus-within:bg-white focus-within:shadow-sm">
                            <Mail className="w-4.5 h-4.5 text-neutral-400" />
                            <input
                                type="email"
                                className="flex-1 bg-transparent border-none text-xs text-neutral-900 placeholder-neutral-400 focus:outline-none py-2.5 font-mono"
                                placeholder="Email address"
                            />
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    <h3 className="uppercase text-xs font-semibold text-neutral-900 tracking-widest font-mono">
                        Socials
                    </h3>
                    <div className="space-y-3">
                        <div className="flex gap-2 group relative z-20">
                            <div className="relative w-fit sm:w-32 shrink-0 group/select">
                                <button
                                    type="button"
                                    className="w-12.5 sm:w-full bg-white border border-neutral-300 rounded-xl py-2.5 pl-8 sm:pl-9 pr-2 text-xs text-neutral-600 focus:outline-none focus:border-neutral-500 hover:border-neutral-400 font-mono text-left flex items-center relative transition-colors shadow-sm"
                                >
                                    <div className="absolute left-2.5 sm:left-3 top-1/2 -translate-y-1/2 text-neutral-400 flex items-center justify-center">
                                        <Linkedin className="w-3.5 h-3.5" />
                                    </div>
                                    <span className="truncate w-0 sm:w-full">LinkedIn</span>
                                    <ChevronUp className="absolute right-2 w-3 h-3 text-neutral-400 opacity-0 group-hover/select:opacity-100 transition-all duration-300 group-focus-within/select:rotate-180" />
                                </button>
                            </div>
                            <input
                                type="url"
                                className="flex-1 bg-neutral-50/50 border border-neutral-300 hover:border-neutral-400 rounded-xl px-3 py-2.5 text-xs text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-neutral-500 focus:bg-white focus:shadow-sm font-mono transition-colors min-w-0"
                                placeholder="https://linkedin.com/..."
                            />
                            <button
                                type="button"
                                className="w-9 shrink-0 flex items-center justify-center rounded-xl border border-neutral-300 text-neutral-400 hover:text-red-500 hover:bg-red-50 hover:border-red-200 transition-all bg-white shadow-sm"
                            >
                                <Trash2 className="w-3.5 h-3.5" />
                            </button>
                        </div>
                        <button
                            type="button"
                            className="w-full py-2.5 rounded-xl border border-dashed border-neutral-400 text-neutral-500 hover:text-neutral-900 hover:border-neutral-500 hover:bg-neutral-50 transition-all flex items-center justify-center gap-2 text-xs font-medium font-mono group"
                        >
                            <CirclePlus className="w-4 h-4 group-hover:scale-110 transition-transform" />
                            Add Link
                        </button>
                    </div>
                </div>

                <div className="space-y-4">
                    <h3 className="uppercase text-xs font-semibold text-neutral-900 tracking-widest font-mono">
                        Resume
                    </h3>
                    <label className="group relative block w-full">
                        <div className="flex items-center justify-between p-3 rounded-2xl border border-dashed border-neutral-400 bg-neutral-50/50 hover:border-neutral-500 hover:bg-neutral-50 transition-all cursor-pointer">
                            <div className="flex items-center gap-3">
                                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-white border border-neutral-200 group-hover:border-neutral-300 transition-colors shadow-sm">
                                    <FileText className="w-5 h-5 text-neutral-500 group-hover:text-neutral-700" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-xs font-medium text-neutral-500 group-hover:text-neutral-900 font-mono transition-colors">
                                        Upload Resume
                                    </span>
                                    <span className="text-[10px] text-neutral-400 font-mono">
                                        PDF, DOCX (Max 10MB)
                                    </span>
                                </div>
                            </div>
                            <div className="px-3 py-1.5 rounded-lg bg-white border border-neutral-200 text-[10px] text-neutral-500 font-medium font-mono group-hover:text-neutral-700 group-hover:border-neutral-300 transition-colors shadow-sm">
                                Select File
                            </div>
                        </div>
                        <input type="file" className="hidden" accept=".pdf,.doc,.docx" />
                    </label>
                </div>
            </div>
        </section>
    )
}
