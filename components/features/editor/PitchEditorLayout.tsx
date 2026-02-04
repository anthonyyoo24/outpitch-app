"use client"

import React from "react"
import { PitchCard } from "./card/PitchCard"
import { PitchEditorToolbar } from "./PitchEditorToolbar"

export function PitchEditorLayout({ pitchId }: { pitchId: string }) {
    // Note: pitchId will be used later for fetching/saving data
    return (
        <div className="flex-1 relative h-full overflow-hidden bg-[#FAFAFA]" data-pitch-id={pitchId}>
            {/* Technical Grid Background handled in dashboard layout, but good to reinforce or keep empty if handled above */}
            {/* Assuming GridBackground is in DashboardLayout as seen in previous view_file */}

            <PitchEditorToolbar />

            {/* Scrollable Container */}
            <div className="w-full h-full sm:pt-16 overflow-y-auto custom-scrollbar relative z-0">
                <div className="w-full min-h-full flex items-center justify-center p-4 sm:p-8">
                    <PitchCard />
                </div>
            </div>
        </div>
    )
}
