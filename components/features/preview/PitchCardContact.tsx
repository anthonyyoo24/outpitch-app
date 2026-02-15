"use client"

import { useState } from "react"
import { ArrowRight, Mail, Phone, Twitter, Github, Linkedin, Globe, X } from "lucide-react"

export function PitchCardContact() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    return (
        <>
            <section className="pt-8 border-t border-neutral-200 w-full">
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-3 sm:flex-row">
                        <button
                            className="flex items-center justify-center gap-3 bg-neutral-900 text-white text-sm font-semibold rounded-full px-6 py-3.5 hover:bg-neutral-800 transition-colors w-full active:scale-95 duration-200 shadow-md hover:shadow-lg cursor-pointer"
                            onClick={() => setIsMenuOpen(true)}
                        >
                            Get in touch
                            <ArrowRight className="w-4 h-4" />
                        </button>
                        <a href="#"
                            className="flex items-center justify-center gap-2 border border-neutral-200 text-neutral-900 text-sm font-semibold rounded-full hover:bg-neutral-50 transition-colors px-6 py-3.5 w-full sm:w-auto">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
                                fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                                strokeLinejoin="round">
                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                                <polyline points="7 10 12 15 17 10"></polyline>
                                <line x1="12" x2="12" y1="15" y2="3"></line>
                            </svg>
                            Resume
                        </a>
                    </div>

                    <div className="flex items-center gap-6 w-full justify-center mt-4 pt-2">
                        <a href="#" className="hover:text-black transition-colors text-neutral-400 hover:scale-110 duration-200">
                            <Twitter className="w-4.5 h-4.5" />
                        </a>
                        <a href="#" className="hover:text-black transition-colors text-neutral-400 hover:scale-110 duration-200">
                            <Github className="w-4.5 h-4.5" />
                        </a>
                        <a href="#" className="hover:text-black transition-colors text-neutral-400 hover:scale-110 duration-200">
                            <Linkedin className="w-4.5 h-4.5" />
                        </a>
                        <a href="#" className="hover:text-black transition-colors text-neutral-400 hover:scale-110 duration-200">
                            <Globe className="w-4.5 h-4.5" />
                        </a>
                    </div>
                </div>
            </section>

            {/* Menu Overlay */}
            {isMenuOpen && (
                <div className="absolute inset-0 z-100 flex items-end justify-center p-4">
                    <div
                        className="absolute inset-0 bg-white/80 backdrop-blur-sm transition-all duration-300"
                        onClick={() => setIsMenuOpen(false)}
                    />
                    <div className="relative mb-60 sm:mb-56 z-10 grid grid-cols-1 gap-3 w-full max-w-70 animate-pop-in">
                        <a href="#"
                            className="group bg-neutral-900 rounded-full p-4 flex flex-row items-center justify-center gap-3 hover:scale-[1.02] active:scale-95 transition-all duration-300 cursor-pointer shadow-lg">
                            <Phone className="w-4.5 h-4.5 text-white" />
                            <span className="text-white font-semibold text-sm tracking-tight">
                                Book a call
                            </span>
                        </a>
                        <a href="mailto:hello@alexrivera.com"
                            className="group bg-white border border-neutral-200 rounded-full p-4 flex flex-row items-center justify-center gap-3 hover:border-neutral-300 hover:bg-neutral-50 transition-all duration-300 cursor-pointer shadow-sm">
                            <Mail className="w-4.5 h-4.5 text-neutral-900" />
                            <span className="text-neutral-900 font-medium text-sm tracking-tight">
                                Send email
                            </span>
                        </a>
                        <button
                            className="absolute -bottom-16 left-1/2 -translate-x-1/2 hover:text-neutral-900 transition-colors text-neutral-500 cursor-pointer"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            <X className="w-6 h-6" />
                        </button>
                    </div>
                </div>
            )}
        </>
    )
}
