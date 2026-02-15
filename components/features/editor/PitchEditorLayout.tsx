"use client"

import React, { useState } from "react"
import { PitchEditCard } from "./card/PitchEditCard"
import { PitchPreviewCard } from "../preview/PitchPreviewCard"
import { PitchEditorToolbar } from "./PitchEditorToolbar"
import { PitchFormProvider } from "./PitchFormProvider"


import { PitchFormValues, ActionStatus } from "./schema"

interface PitchEditorLayoutProps {
    pitchId: string
    initialData: PitchFormValues
}

export function PitchEditorLayout({ pitchId, initialData }: PitchEditorLayoutProps) {
    // Note: pitchId will be used later for fetching/saving data
    // Fetch data server-side - Refactored to parent

    // Data guaranteed by page component (Strict Fetching)

    // Initialize preview mode based on status
    const [isPreviewMode, setIsPreviewMode] = useState(initialData.status === "published")
    const [actionStatus, setActionStatus] = useState<ActionStatus>("idle")

    // Reset success state after delay
    React.useEffect(() => {
        if (actionStatus === "success-published" || actionStatus === "success-unpublished") {
            const timer = setTimeout(() => setActionStatus("idle"), 2000)
            return () => clearTimeout(timer)
        }
    }, [actionStatus])

    return (
        <PitchFormProvider key={initialData.status} defaultValues={initialData} pitchId={pitchId}>
            <div className="flex-1 relative h-full overflow-hidden" data-pitch-id={pitchId}>
                {/* Technical Grid Background handled in dashboard layout, but good to reinforce or keep empty if handled above */}
                {/* Assuming GridBackground is in DashboardLayout as seen in previous view_file */}

                <PitchEditorToolbar
                    pitchId={pitchId}
                    isPreviewMode={isPreviewMode}
                    onTogglePreview={setIsPreviewMode}
                    actionStatus={actionStatus}
                    onActionStatusChange={setActionStatus}
                />

                {/* Scrollable Container */}
                <div className="w-full h-full sm:pt-16 overflow-y-auto custom-scrollbar relative z-0">
                    <div className="w-full min-h-full flex items-center justify-center p-4 sm:p-8">
                        {isPreviewMode ? <PitchPreviewCard /> : <PitchEditCard />}
                    </div>
                </div>
            </div>
        </PitchFormProvider>
    )
}
