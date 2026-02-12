"use client"

import { useFormContext } from "react-hook-form"
import React from "react"

export function PitchBioInput() {
    const { register } = useFormContext()

    return (
        <section className="mb-8 sm:mb-10 mt-6 sm:mt-4">
            <textarea
                {...register("bio")}
                className="leading-relaxed focus:border-neutral-300 focus:outline-none focus:bg-white resize-none transition-colors placeholder-neutral-400 sm:text-base hover:border-neutral-300 text-sm text-neutral-600 font-mono bg-neutral-50/40 hover:bg-neutral-50/80 w-full border-neutral-200 border rounded-2xl p-4"
                rows={4}
                placeholder="Bio & Introduction"
            />
        </section>
    )
}
