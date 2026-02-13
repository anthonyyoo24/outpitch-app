"use client"

import React, { useState } from "react"
import { useFormContext, useFieldArray } from "react-hook-form"
import { PlusCircle } from "lucide-react"
import { PitchFormValues } from "@/components/features/editor/schema"
import { SocialLinkItem } from "./SocialLinkItem"
import { PlatformId } from "./constants"

export function SocialsInput() {
    const { control, register, getValues } = useFormContext<PitchFormValues>()
    const { fields, append, remove, update } = useFieldArray({
        control,
        name: "social_links",
    })

    // Track which dropdown is open (by index)
    const [openDropdownIndex, setOpenDropdownIndex] = useState<number | null>(null)

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
                        />
                    )
                })}

                {/* Add Link Button */}
                <div className="relative">
                    <button
                        type="button"
                        onClick={handleAddLink}
                        className="w-full py-2.5 cursor-pointer rounded-xl border border-dashed border-neutral-400 text-neutral-500 hover:text-neutral-900 hover:border-neutral-500 hover:bg-neutral-50 transition-all flex items-center justify-center gap-2 text-xs font-medium font-mono group"
                    >
                        <PlusCircle className="w-4 h-4 group-hover:scale-110 transition-transform" />
                        Add Link
                    </button>
                </div>
            </div>
        </section>
    )
}
