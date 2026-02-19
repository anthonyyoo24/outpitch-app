"use client"

import React, { useState } from "react"
import { Eye, Rocket, Loader2, Check, EyeOff, Pencil, Link as LinkIcon } from "lucide-react"
import { publishPitch, unpublishPitch } from "@/app/dashboard/editor/actions"
import { useRouter } from "next/navigation"
import { useFormContext } from "react-hook-form"
import { toast } from "sonner"
import { PitchFormValues, publishSchema, ActionStatus } from "@/lib/schemas/pitch"
import { useUserStore } from "@/lib/store/user-store"

interface PitchEditorToolbarProps {
    pitchId: string
    slug: string | null
    isPreviewMode: boolean
    onTogglePreview: (isPreview: boolean) => void
    actionStatus: ActionStatus
    onActionStatusChange: (status: ActionStatus) => void
    onSlugUpdate: (slug: string) => void
}

export function PitchEditorToolbar({
    pitchId,
    slug,
    isPreviewMode,
    onTogglePreview,
    actionStatus,
    onActionStatusChange,
    onSlugUpdate,
}: PitchEditorToolbarProps) {
    const { getValues, setError, watch } = useFormContext<PitchFormValues>()
    const [isPublishing, setIsPublishing] = useState(false)
    const [isCopied, setIsCopied] = useState(false)
    const router = useRouter()
    const user = useUserStore((state) => state.user)
    const profile = useUserStore((state) => state.profile)

    // Watch status to react to changes
    const status = watch("status")

    // Auto-switch to preview on publish if it was successful (detected via status change or prop)
    // However, the parent controls isPreviewMode. 
    // We'll handle the switch trigger in the handlePublish success block.

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
            const result = await publishPitch(pitchId)

            if (result.success && result.slug) {
                onSlugUpdate(result.slug)
            }

            onActionStatusChange("success-published")
            router.refresh()
            toast.success("Pitch published successfully!")

            // Switch to preview mode on success
            onTogglePreview(true)
        } catch (error) {
            console.error("Failed to publish:", error)
            toast.error("Failed to publish. Please try again.")
        } finally {
            setIsPublishing(false)
        }
    }

    const handleUnpublish = async () => {
        setIsPublishing(true)
        try {
            await unpublishPitch(pitchId)
            onActionStatusChange("success-unpublished")
            router.refresh()
            toast.success("Pitch unpublished successfully!")
        } catch (error) {
            console.error("Failed to unpublish:", error)
            toast.error("Failed to unpublish. Please try again.")
        } finally {
            setIsPublishing(false)
        }
    }

    const isPublished = status === "published"

    // Determine whether to show the unpublish button based on status and action feedback
    // If we just successfully published, we want to keep showing the publish button (in success state)
    // If we just successfully unpublished, we want to keep showing the unpublish button (in success state)
    // Otherwise, we rely on the actual status
    const showUnpublishButton = actionStatus === "success-published"
        ? false
        : actionStatus === "success-unpublished"
            ? true
            : isPublished

    const handleCopyLink = () => {
        const username = profile?.username || user?.user_metadata?.username || user?.email?.split('@')[0]
        if (!username || !slug) return

        const url = `${window.location.origin}/p/${username}/${slug}`
        navigator.clipboard.writeText(url)

        setIsCopied(true)
        toast.success("Link copied to clipboard!")

        setTimeout(() => setIsCopied(false), 2000)
    }

    return (
        <div className="absolute top-0 left-0 right-0 h-14 flex items-center justify-end px-6 z-10 pointer-events-none sm:pointer-events-auto">
            <div className="hidden sm:flex items-center gap-2">
                {isPublished && slug && (
                    <button
                        type="button"
                        onClick={handleCopyLink}
                        className="group flex items-center gap-2 cursor-pointer border px-4 py-1.5 rounded-full text-xs font-medium shadow-[0_1px_2px_rgba(0,0,0,0.06)] transition-all active:scale-95 bg-white border-neutral-200 text-neutral-600 hover:text-neutral-900 hover:border-neutral-300"
                    >
                        {isCopied ? (
                            <>
                                <Check className="w-3.5 h-3.5 text-green-500" />
                                <span className="text-green-600">Copied!</span>
                            </>
                        ) : (
                            <>
                                <LinkIcon className="w-3.5 h-3.5" />
                                <span>Share Link</span>
                            </>
                        )}
                    </button>
                )}

                <button
                    type="button"
                    onClick={() => onTogglePreview(!isPreviewMode)}
                    className="group flex items-center gap-2 cursor-pointer border px-4 py-1.5 rounded-full text-xs font-medium shadow-[0_1px_2px_rgba(0,0,0,0.06)] transition-all active:scale-95 bg-white border-neutral-200 text-neutral-600 hover:text-neutral-900 hover:border-neutral-300"
                >
                    {isPreviewMode ? (
                        <>
                            <Pencil className="w-3.5 h-3.5" />
                            <span>Edit</span>
                        </>
                    ) : (
                        <>
                            <Eye className="w-3.5 h-3.5" />
                            <span>Preview</span>
                        </>
                    )}
                </button>

                {showUnpublishButton ? (
                    <button
                        type="button"
                        onClick={handleUnpublish}
                        disabled={isPublishing || actionStatus === "success-unpublished"}
                        className={`group flex items-center gap-2 cursor-pointer border px-4 py-1.5 rounded-full text-xs font-medium shadow-md transition-all active:scale-95 disabled:opacity-80 disabled:pointer-events-none ${actionStatus === "success-unpublished"
                            ? "bg-green-600 border-green-600 text-white hover:bg-green-700"
                            : "bg-neutral-900 border-neutral-900 text-white hover:bg-neutral-800 hover:shadow-lg"
                            }`}
                    >
                        {isPublishing ? (
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        ) : actionStatus === "success-unpublished" ? (
                            <Check className="w-3.5 h-3.5" />
                        ) : (
                            <EyeOff className="w-3.5 h-3.5" />
                        )}
                        <span>{actionStatus === "success-unpublished" ? "Unpublished!" : isPublishing ? "Unpublishing..." : "Unpublish"}</span>
                    </button>
                ) : (
                    <button
                        type="button"
                        onClick={handlePublish}
                        disabled={isPublishing || actionStatus === "success-published"}
                        className={`group flex items-center gap-2 cursor-pointer border px-4 py-1.5 rounded-full text-xs font-medium shadow-md transition-all active:scale-95 disabled:opacity-80 disabled:pointer-events-none ${actionStatus === "success-published"
                            ? "bg-green-600 border-green-600 text-white hover:bg-green-700"
                            : "bg-neutral-900 border-neutral-900 text-white hover:bg-neutral-800 hover:shadow-lg"
                            }`}
                    >
                        {isPublishing ? (
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        ) : actionStatus === "success-published" ? (
                            <Check className="w-3.5 h-3.5" />
                        ) : (
                            <Rocket className="w-3.5 h-3.5" />
                        )}
                        <span>{actionStatus === "success-published" ? "Published!" : isPublishing ? "Publishing..." : "Publish"}</span>
                    </button>
                )}
            </div>
        </div>
    )
}

