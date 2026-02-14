"use client"

import { useFormContext } from "react-hook-form"
import React from "react"

export function PitchBioInput() {
    const { register, formState: { errors } } = useFormContext()
    const error = errors.bio?.message

    return (
        <section className="mb-8 sm:mb-10 mt-6 sm:mt-4">
            <textarea
                {...register("bio")}
                className={`leading-relaxed focus:outline-none focus:bg-white resize-none transition-colors placeholder-neutral-400 sm:text-base text-sm text-neutral-600 font-mono bg-neutral-50/50 w-full border rounded-2xl p-4 focus:shadow-sm ${error
                    ? "border-red-500 focus:border-red-500"
                    : "border-neutral-300 hover:border-neutral-400 focus:border-neutral-400"
                    }`}
                rows={4}
                placeholder="Bio & Introduction"
            />
        </section>
    )
}
