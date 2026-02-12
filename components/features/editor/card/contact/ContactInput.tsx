"use client"

import React from "react"
import { Calendar, Mail } from "lucide-react"
import { useFormContext } from "react-hook-form"

export function ContactInput() {
    const { register } = useFormContext()

    return (
        <div className="mt-6 sm:mt-8 space-y-4">
            <h3 className="uppercase text-xs font-semibold text-neutral-900 tracking-widest font-mono">
                Contact
            </h3>
            <div className="grid gap-3">
                {/* Calendly Link */}
                <div className="group relative flex items-center gap-3 p-1.5 pl-3 rounded-2xl border border-neutral-300 bg-neutral-50/50 hover:border-neutral-400 transition-colors focus-within:border-neutral-400 focus-within:bg-white focus-within:shadow-sm">
                    <Calendar className="w-4.5 h-4.5 text-neutral-400" />
                    <input
                        {...register("contact.calendly_link")}
                        type="url"
                        className="flex-1 bg-transparent border-none text-xs text-neutral-900 placeholder-neutral-400 focus:outline-none py-2.5 font-mono transition-[background-color] duration-[9999s] ease-in-out"
                        placeholder="Calendly or scheduling link"
                    />
                </div>

                {/* Email Address */}
                <div className="group relative flex items-center gap-3 p-1.5 pl-3 rounded-2xl border border-neutral-300 bg-neutral-50/50 hover:border-neutral-400 transition-colors focus-within:border-neutral-400 focus-within:bg-white focus-within:shadow-sm">
                    <Mail className="w-4.5 h-4.5 text-neutral-400" />
                    <input
                        {...register("contact.email")}
                        type="email"
                        className="flex-1 bg-transparent border-none text-xs text-neutral-900 placeholder-neutral-400 focus:outline-none py-2.5 font-mono transition-[background-color] duration-[9999s] ease-in-out"
                        placeholder="Email address"
                    />
                </div>
            </div>
        </div>
    )
}
