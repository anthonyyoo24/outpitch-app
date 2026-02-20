"use client"

import React, { useState } from "react"
import { PitchEditCard } from "./card/PitchEditCard"
import { PitchPreviewCardEditor } from "./PitchPreviewCardEditor"
import { PitchEditorToolbar } from "./PitchEditorToolbar"
import { PitchFormProvider } from "./PitchFormProvider"


import { Pitch, ActionStatus } from "@/lib/schemas/pitch"

interface PitchEditorLayoutProps {
    pitchId: string
    initialData: Pitch
}

export function PitchEditorLayout({ pitchId, initialData }: PitchEditorLayoutProps) {
    // Separate form data from system state
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, user_id, slug, status, ...formValues } = initialData

    // Initialize preview mode based on status
    const [isPreviewMode, setIsPreviewMode] = useState(status === "published")
    const [actionStatus, setActionStatus] = useState<ActionStatus>("idle")
    const [currentSlug, setCurrentSlug] = useState<string | null>(slug || null)

    // Reset success state after delay
    React.useEffect(() => {
        if (actionStatus === "success-published" || actionStatus === "success-unpublished") {
            const timer = setTimeout(() => setActionStatus("idle"), 2000)
            return () => clearTimeout(timer)
        }
    }, [actionStatus])

    return (
        <PitchFormProvider key={status} defaultValues={formValues} pitchId={pitchId}>
            <div className="flex-1 relative h-full overflow-hidden" data-pitch-id={pitchId}>
                {/* Technical Grid Background handled in dashboard layout, but good to reinforce or keep empty if handled above */}
                {/* Assuming GridBackground is in DashboardLayout as seen in previous view_file */}

                <PitchEditorToolbar
                    pitchId={pitchId}
                    slug={currentSlug}
                    onSlugUpdate={setCurrentSlug}
                    isPreviewMode={isPreviewMode}
                    onTogglePreview={setIsPreviewMode}
                    actionStatus={actionStatus}
                    onActionStatusChange={setActionStatus}
                    initialStatus={status}
                />

                {/* Scrollable Container */}
                <div className="w-full h-full sm:pt-16 overflow-y-auto custom-scrollbar relative z-0">
                    <div className="w-full min-h-full flex items-center justify-center p-4 sm:p-8">
                        {isPreviewMode ? <PitchPreviewCardEditor /> : <PitchEditCard />}
                    </div>
                </div>
            </div>
        </PitchFormProvider>
    )
}
