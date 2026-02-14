"use client"

import React from "react"
import { PitchHeaderInput } from "./PitchHeaderInput"
import { VideoBubbleInput } from "./VideoBubbleInput"
import { PitchBioInput } from "./PitchBioInput"
import { SelectedWorkInput } from "./SelectedWorkInput"
import { TechStackInput } from "./tech-stack/TechStackInput"
import { JourneyInput } from "./JourneyInput"
import { ContactInput } from "./contact/ContactInput"
import { SocialsInput } from "./contact/SocialsInput"
import { ResumeInput } from "./contact/ResumeInput"

export function PitchEditCard() {
    return (
        <div className="relative w-full max-w-125 animate-fade-in">
            <div className="sm:p-10 flex flex-col overflow-visible sm:rounded-[40px] bg-white border-neutral-200/80 border rounded-[32px] pt-5 pr-5 pb-5 pl-5 shadow-[0_2.8px_2.2px_rgba(0,0,0,0.034),0_6.7px_5.3px_rgba(0,0,0,0.048),0_12.5px_10px_rgba(0,0,0,0.06),0_22.3px_17.9px_rgba(0,0,0,0.072),0_41.8px_33.4px_rgba(0,0,0,0.086),0_100px_80px_rgba(0,0,0,0.12)]">
                <PitchHeaderInput />
                <VideoBubbleInput />
                <PitchBioInput />
                <SelectedWorkInput />
                <TechStackInput />
                <JourneyInput />
                <ContactInput />
                <SocialsInput />
                <ResumeInput />
            </div>
        </div>
    )
}
