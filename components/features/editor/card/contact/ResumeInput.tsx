"use client"

import React, { useState } from "react"
import { FileText, Loader2, X, Upload } from "lucide-react"
import { useFormContext } from "react-hook-form"
import { toast } from "sonner"
import { uploadPitchResume, deletePitchResume } from "@/lib/storage/upload"
import { useUserStore } from "@/lib/store/user-store"

export function ResumeInput() {
    const { register, setValue, watch, getValues } = useFormContext()
    const [isUploading, setIsUploading] = useState(false)
    const user = useUserStore((state) => state.user)
    const userId = user?.id

    const resumeUrl = watch("resume_url")

    // Extract filename from URL for display
    const getFileName = (url: string) => {
        if (!url) return ""
        try {
            // URL format: .../userId/resumes/nanoid-original_filename.ext
            const parts = url.split("/")
            const fileName = parts[parts.length - 1]

            // If it matches our new pattern (nanoid(21) + "-" + rest), strip the prefix
            // nanoid is 21 chars by default. Check if we have at least 22 chars and a hyphen at 21?
            // Actually, nanoid uses - and _ so splitting is hard. 
            // We'll trust the length since we just set it up. 21 + 1 = 22 chars prefix.
            if (fileName.length > 22) {
                return fileName.slice(22)
            }
            return fileName
        } catch {
            return "Resume"
        }
    }

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        if (!userId) {
            toast.error("You must be logged in to upload.")
            return
        }

        // Size check (also done in upload.ts, but good for quick feedback)
        if (file.size > 10 * 1024 * 1024) {
            toast.error("File too large. Max 10MB.")
            return
        }

        setIsUploading(true)
        try {
            // Delete old resume if exists
            const currentResumeUrl = getValues("resume_url")
            if (currentResumeUrl && currentResumeUrl.includes("/storage/v1/object/public/pitch-assets/")) {
                const oldPath = currentResumeUrl.split("pitch-assets/")[1]
                if (oldPath) await deletePitchResume(oldPath)
            }

            const { publicUrl } = await uploadPitchResume(file, userId)
            setValue("resume_url", publicUrl, { shouldDirty: true })
            toast.success("Resume uploaded")
        } catch (error) {
            console.error(error)
            toast.error(error instanceof Error ? error.message : "Upload failed")
        } finally {
            setIsUploading(false)
        }
    }

    const handleRemove = async (e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()

        const currentResumeUrl = getValues("resume_url")
        if (!currentResumeUrl) return

        try {
            if (currentResumeUrl.includes("/storage/v1/object/public/pitch-assets/")) {
                const oldPath = currentResumeUrl.split("pitch-assets/")[1]
                if (oldPath) await deletePitchResume(oldPath)
            }
            setValue("resume_url", "", { shouldDirty: true })
            toast.success("Resume removed")
        } catch (error) {
            console.error("Delete error:", error)
            toast.error("Failed to remove resume")
        }
    }

    return (
        <section className="mt-6 sm:mt-8 space-y-4">
            <h3 className="uppercase text-xs font-semibold text-neutral-900 tracking-widest font-mono">
                Resume
            </h3>

            {resumeUrl ? (
                // File Uploaded State
                <div className="flex items-center justify-between p-3 rounded-2xl border border-neutral-200 bg-white shadow-sm">
                    <div className="flex items-center gap-3 overflow-hidden">
                        <div className="flex items-center justify-center w-10 h-10 shrink-0 rounded-xl bg-indigo-50 border border-indigo-100 text-indigo-600">
                            <FileText className="w-5 h-5" />
                        </div>
                        <div className="flex flex-col min-w-0">
                            <span className="text-xs font-medium text-neutral-900 font-mono truncate">
                                {getFileName(resumeUrl)}
                            </span>
                            <span className="text-[10px] text-neutral-500 font-mono">
                                Uploaded successfully
                            </span>
                        </div>
                    </div>
                    <button
                        type="button"
                        onClick={handleRemove}
                        className="p-2 ml-2 cursor-pointer rounded-lg text-neutral-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                        title="Remove resume"
                    >
                        <X className="w-4 h-4" />
                    </button>
                    {/* Hidden input to ensure value is registered */}
                    <input type="hidden" {...register("resume_url")} />
                </div>
            ) : (
                // Upload State
                <label className={`group relative block w-full ${isUploading ? 'cursor-not-allowed opacity-70' : ''}`}>
                    <div className={`flex items-center justify-between p-3 rounded-2xl border border-dashed transition-all ${isUploading
                        ? 'border-indigo-300 bg-indigo-50/30'
                        : 'border-neutral-300 bg-neutral-50/50 hover:border-neutral-400 hover:bg-neutral-50 cursor-pointer'
                        }`}>
                        <div className="flex items-center gap-3">
                            <div className={`flex items-center justify-center w-10 h-10 rounded-xl border transition-colors shadow-sm ${isUploading
                                ? 'bg-indigo-50 border-indigo-100'
                                : 'bg-white border-neutral-200 group-hover:border-neutral-300'
                                }`}>
                                {isUploading ? (
                                    <Loader2 className="w-5 h-5 text-indigo-600 animate-spin" />
                                ) : (
                                    <Upload className="w-5 h-5 text-neutral-500 group-hover:text-neutral-700" />
                                )}
                            </div>
                            <div className="flex flex-col">
                                <span className={`text-xs font-medium font-mono transition-colors ${isUploading
                                    ? 'text-indigo-600'
                                    : 'text-neutral-500 group-hover:text-neutral-900'
                                    }`}>
                                    {isUploading ? "Uploading..." : "Upload Resume"}
                                </span>
                                <span className="text-[10px] text-neutral-400 font-mono">
                                    {isUploading ? "Please wait" : "PDF, DOCX (Max 10MB)"}
                                </span>
                            </div>
                        </div>
                        {!isUploading && (
                            <div className="px-3 py-1.5 rounded-lg bg-white border border-neutral-200 text-[10px] text-neutral-500 font-medium font-mono group-hover:text-neutral-700 group-hover:border-neutral-300 transition-colors shadow-sm">
                                Select File
                            </div>
                        )}
                    </div>
                    <input
                        type="file"
                        className="hidden"
                        accept=".pdf,.doc,.docx"
                        onChange={handleFileChange}
                        disabled={isUploading}
                    />
                    <input type="hidden" {...register("resume_url")} />
                </label>
            )}
        </section>
    )
}
