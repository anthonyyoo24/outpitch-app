"use client"

import { useFormContext } from "react-hook-form"
import { PitchPreviewCard } from "../preview/PitchPreviewCard"
import { PitchFormValues } from "@/lib/schemas/pitch"

export function PitchPreviewCardEditor() {
    const { watch } = useFormContext<PitchFormValues>()
    const headerContent = watch("header_content")
    const bio = watch("bio")
    const videoUrl = watch("video_url")
    const videoThumbnailUrl = watch("video_thumbnail_url")
    const portfolio = watch("portfolio")
    const techStack = watch("tech_stack")
    const workExperience = watch("work_experience")
    const contact = watch("contact")
    const socialLinks = watch("social_links")
    const resumeUrl = watch("resume_url")

    return (
        <PitchPreviewCard
            headerContent={headerContent}
            bio={bio}
            videoUrl={videoUrl}
            videoThumbnailUrl={videoThumbnailUrl}
            portfolio={portfolio}
            techStack={techStack}
            workExperience={workExperience}
            contact={contact}
            socialLinks={socialLinks}
            resumeUrl={resumeUrl}
        />
    )
}
