"use client"

import { useFormContext } from "react-hook-form"
import { PitchPreviewCard } from "../preview/PitchPreviewCard"
import { PitchFormValues } from "./schema"

export function PitchPreviewCardEditor() {
    const { watch } = useFormContext<PitchFormValues>()
    const headerContent = watch("header_content")
    const bio = watch("bio")
    const videoUrl = watch("video_url")

    return (
        <PitchPreviewCard
            headerContent={headerContent}
            bio={bio}
            videoUrl={videoUrl}
        />
    )
}
