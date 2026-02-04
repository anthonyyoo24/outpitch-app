"use client"

import React from "react"

export function PitchBioInput() {
    return (
        <section className="mb-8 sm:mb-10 mt-6 sm:mt-4">
            <textarea
                className="leading-relaxed focus:border-neutral-300 focus:outline-none focus:bg-white resize-none transition-colors placeholder-neutral-400 sm:text-base hover:border-neutral-300 text-sm text-neutral-600 font-mono bg-neutral-50/40 hover:bg-neutral-50/80 w-full border-neutral-200 border rounded-2xl pt-4 pr-4 pb-4 pl-4 shadow-sm"
                rows={4}
                placeholder="Bio & Introduction"
                defaultValue="I redesigned your landing page to better align with your product's ethos. The new concept focuses on a cleaner visual hierarchy and performance optimizations to drive higher conversion rates."
            />
        </section>
    )
}
