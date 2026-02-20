import React from "react"
import { PitchCardHeader } from "./PitchCardHeader"
import { PitchCardPortfolio } from "./PitchCardPortfolio"
import { PitchCardTech } from "./PitchCardTech"
import { PitchCardExperience } from "./PitchCardExperience"
import { PitchCardContact } from "./PitchCardContact"

export interface PitchPreviewCardProps {
    headerContent: string
    bio?: string
    videoUrl?: string
    portfolio?: Array<{
        title: string
        description: string
        link?: string
        image_url?: string | null
    }>
    techStack?: string[]
    workExperience?: Array<{
        role: string
        company: string
        start_month?: string
        start_year?: string
        end_month?: string
        end_year?: string
        is_current?: boolean
        description: string
    }>
    contact?: {
        email: string
        calendly_link?: string
    }
    socialLinks?: Array<{ platform: string; url: string }>
    resumeUrl?: string | null
}

export function PitchPreviewCard({ headerContent, bio, videoUrl, portfolio, techStack, workExperience, contact, socialLinks, resumeUrl }: PitchPreviewCardProps) {
    return (
        <div className="relative w-full max-w-full animate-fade-in sm:max-w-125 mx-auto">
            <div className="sm:p-10 flex flex-col overflow-hidden sm:rounded-[40px] bg-white border-neutral-200/80 border rounded-3xl p-6 relative shadow-[0_2.8px_2.2px_rgba(0,0,0,0.034),0_6.7px_5.3px_rgba(0,0,0,0.048),0_12.5px_10px_rgba(0,0,0,0.06),0_22.3px_17.9px_rgba(0,0,0,0.072),0_41.8px_33.4px_rgba(0,0,0,0.086),0_100px_80px_rgba(0,0,0,0.12)]">
                <PitchCardHeader headerContent={headerContent} bio={bio} videoUrl={videoUrl} />
                <PitchCardPortfolio portfolio={portfolio} />
                <PitchCardTech techStack={techStack} />
                <PitchCardExperience workExperience={workExperience} />
                <PitchCardContact email={contact?.email || ''} calendlyLink={contact?.calendly_link} socialLinks={socialLinks} resumeUrl={resumeUrl} />
            </div>
        </div>
    )
}
