"use client"

import React, { useState } from "react"
import { useFormContext, useFieldArray } from "react-hook-form"
import { PlusCircle } from "lucide-react"
import { PitchFormValues } from "@/components/features/editor/schema"
import { SocialLinkItem } from "./SocialLinkItem"
import { PlatformId } from "./constants"

export function SocialsInput() {
    const { control, register, getValues, formState: { errors } } = useFormContext<PitchFormValues>()
    const { fields, append, remove, update } = useFieldArray({
        control,
        name: "social_links",
    })

    // Track which dropdown is open (by index)
    const [openDropdownIndex, setOpenDropdownIndex] = useState<number | null>(null)

    // Calculate which platforms are already in use
    const usedPlatforms = fields.map(f => f.platform as PlatformId).filter(p => p !== "")

    // Check if max links reached
    const isMaxLinks = fields.length >= 6

    const handleAddLink = () => {
        // Adds a new item to the 'social_links' array in the form state.
        // We initialize it with empty strings so it shows up as a blank "Select" row in the UI.
        append({ platform: "", url: "" })
    }

    return (
        <section className="mt-6 sm:mt-8 space-y-4">
            <h3 className="uppercase text-xs font-semibold text-neutral-900 tracking-widest font-mono">
                Socials
            </h3>

            <div className="space-y-3">
                {fields.map((field, index) => {
                    // TS sometimes struggles with strict unions in arrays
                    const platformId = field.platform as PlatformId
                    const isDropdownOpen = openDropdownIndex === index
                    const error = errors.social_links?.[index]?.url?.message

                    return (
                        <SocialLinkItem
                            key={field.id}
                            index={index}
                            platformValue={platformId}
                            register={register}
                            update={update}
                            remove={remove}
                            getValues={getValues}
                            isOpen={isDropdownOpen}
                            onToggle={() => setOpenDropdownIndex(isDropdownOpen ? null : index)}
                            onClose={() => setOpenDropdownIndex(null)}
                            error={error}
                            usedPlatforms={usedPlatforms}
                        />
                    )
                })}

                {/* Add Link Button */}
                <div className="relative">
                    <button
                        type="button"
                        onClick={handleAddLink}
                        disabled={isMaxLinks}
                        className={`w-full py-2.5 rounded-xl border border-dashed text-xs font-medium font-mono group flex items-center justify-center gap-2 transition-all ${isMaxLinks
                                ? "border-neutral-300 text-neutral-300 cursor-not-allowed opacity-50"
                                : "border-neutral-400 text-neutral-500 hover:text-neutral-900 hover:border-neutral-500 hover:bg-neutral-50 cursor-pointer"
                            }`}
                    >
                        <PlusCircle className="w-4 h-4 group-hover:scale-110 transition-transform" />
                        Add Link
                    </button>
                </div>
            </div>
        </section>
    )
}
