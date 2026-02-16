"use client"

import { useFormContext } from "react-hook-form"
import { PitchPreviewCard } from "../preview/PitchPreviewCard"
import { PitchFormValues } from "./schema"

export function PitchPreviewCardEditor() {
    const { watch } = useFormContext<PitchFormValues>()
    const headerContent = watch("header_content")
    const bio = watch("bio")
    const videoUrl = watch("video_url")
    const portfolio = watch("portfolio")
    const techStack = watch("tech_stack")

    return (
        <PitchPreviewCard
            headerContent={headerContent}
            bio={bio}
            videoUrl={videoUrl}
            portfolio={portfolio}
            techStack={techStack}
        />
    )
}
