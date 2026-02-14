"use client"

import React, { useState } from "react"
import { Eye, Rocket, Loader2, Check } from "lucide-react"
import { publishPitch } from "@/app/dashboard/editor/actions"
import { useRouter } from "next/navigation"
import { useFormContext } from "react-hook-form"
import { toast } from "sonner"
import { PitchFormValues, publishSchema } from "./schema"

interface PitchEditorToolbarProps {
    pitchId: string
}

export function PitchEditorToolbar({ pitchId }: PitchEditorToolbarProps) {
    const { getValues, setError } = useFormContext<PitchFormValues>()
    const [isPublishing, setIsPublishing] = useState(false)
    const [hasPublished, setHasPublished] = useState(false)
    const router = useRouter()

    const handlePublish = async () => {
        const values = getValues()

        // Client-side validation
        const validation = publishSchema.safeParse(values)
        if (!validation.success) {
            let hasErrors = false
            validation.error.issues.forEach((issue) => {
                // Map Zod issues to React Hook Form errors
                const path = issue.path[0] as keyof PitchFormValues | "contact"

                // Special handling for nested contact object
                if (path === "contact" && issue.path[1] === "email") {
                    setError("contact.email", { message: issue.message })
                    hasErrors = true
                } else if (path !== "contact") {
                    setError(path, { message: issue.message })
                    hasErrors = true
                }
            })

            if (hasErrors) {
                toast.error("Please fill in all required fields to publish")
                return
            }
        }

        setIsPublishing(true)
        try {
            await publishPitch(pitchId)
            setHasPublished(true)
            setTimeout(() => setHasPublished(false), 2000)
            router.refresh()
            toast.success("Pitch published successfully!")
        } catch (error) {
            console.error("Failed to publish:", error)
            toast.error("Failed to publish. Please try again.")
        } finally {
            setIsPublishing(false)
        }
    }

    return (
        <div className="absolute top-0 left-0 right-0 h-14 flex items-center justify-end px-6 z-10 pointer-events-none sm:pointer-events-auto">
            <div className="hidden sm:flex items-center gap-2">
                <button
                    type="button"
                    className="group flex items-center gap-2 cursor-pointer bg-white border border-neutral-200 text-neutral-600 hover:text-neutral-900 hover:border-neutral-300 px-4 py-1.5 rounded-full text-xs font-medium shadow-[0_1px_2px_rgba(0,0,0,0.06)] transition-all active:scale-95"
                >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Preview</span>
                </button>

                <button
                    type="button"
                    onClick={handlePublish}
                    disabled={isPublishing || hasPublished}
                    className={`group flex items-center gap-2 cursor-pointer border px-4 py-1.5 rounded-full text-xs font-medium shadow-md transition-all active:scale-95 disabled:opacity-80 disabled:pointer-events-none ${hasPublished
                        ? "bg-green-600 border-green-600 text-white hover:bg-green-700"
                        : "bg-neutral-900 border-neutral-900 text-white hover:bg-neutral-800 hover:shadow-lg"
                        }`}
                >
                    {isPublishing ? (
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : hasPublished ? (
                        <Check className="w-3.5 h-3.5" />
                    ) : (
                        <Rocket className="w-3.5 h-3.5" />
                    )}
                    <span>{hasPublished ? "Published!" : isPublishing ? "Publishing..." : "Publish"}</span>
                </button>
            </div>
        </div>
    )
}
