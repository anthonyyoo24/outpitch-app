"use client"

import React from "react"
import { useFormContext } from "react-hook-form"
import { PitchCardHeader } from "./PitchCardHeader"

import { PitchCardPortfolio } from "./PitchCardPortfolio"
import { PitchCardTech } from "./PitchCardTech"
import { PitchCardExperience } from "./PitchCardExperience"
import { PitchCardContact } from "./PitchCardContact"
import { PitchFormValues } from "../editor/schema"

export function PitchPreviewCard() {
    const { watch } = useFormContext<PitchFormValues>()
    const headerContent = watch("header_content")
    const bio = watch("bio")
    const videoUrl = watch("video_url")

    return (
        <div className="relative w-full max-w-full animate-fade-in sm:max-w-125 mx-auto">
            <div className="sm:p-10 flex flex-col overflow-hidden sm:rounded-[40px] bg-white border-neutral-200/80 border rounded-3xl p-6 relative shadow-[0_2.8px_2.2px_rgba(0,0,0,0.034),0_6.7px_5.3px_rgba(0,0,0,0.048),0_12.5px_10px_rgba(0,0,0,0.06),0_22.3px_17.9px_rgba(0,0,0,0.072),0_41.8px_33.4px_rgba(0,0,0,0.086),0_100px_80px_rgba(0,0,0,0.12)]">
                <PitchCardHeader headerContent={headerContent} bio={bio} videoUrl={videoUrl} />

                <PitchCardPortfolio />
                <PitchCardTech />
                <PitchCardExperience />
                <PitchCardContact />
            </div>
        </div>
    )
}
