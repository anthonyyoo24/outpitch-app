"use client"

import React, { useState } from "react"
import { useFormContext } from "react-hook-form"
import { Trash2, Image as ImageIcon, Link as LinkIcon, Loader2, X } from "lucide-react"
import { toast } from "sonner"
import { uploadPitchImage, deletePitchImage } from "@/lib/storage/upload"
import { useUserStore } from "@/lib/store/user-store"

interface SelectedWorkItemProps {
    index: number
    remove: (index: number) => void
}

export function SelectedWorkItem({ index, remove }: SelectedWorkItemProps) {
    const { register, setValue, watch, getValues } = useFormContext()
    const [isUploading, setIsUploading] = useState(false)
    const user = useUserStore((state) => state.user)
    const userId = user?.id

    // Watch image URL for preview
    const imageUrl = watch(`portfolio.${index}.image_url`)

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        if (!userId) {
            toast.error("You must be logged in to upload.")
            return
        }

        setIsUploading(true)

        try {
            const { publicUrl } = await uploadPitchImage(file, userId)
            setValue(`portfolio.${index}.image_url`, publicUrl, { shouldDirty: true })
            toast.success("Image uploaded")
        } catch (error) {
            console.error(error)
            toast.error("Upload failed")
        } finally {
            setIsUploading(false)
        }
    }

    const handleDeleteImage = async (e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()

        const currentImageUrl = getValues(`portfolio.${index}.image_url`)
        if (!currentImageUrl) return

        try {
            if (currentImageUrl.includes("/storage/v1/object/public/pitch-media/")) {
                const oldPath = currentImageUrl.split("pitch-media/")[1]
                if (oldPath) {
                    await deletePitchImage(oldPath)
                }
            }
            setValue(`portfolio.${index}.image_url`, "", { shouldDirty: true })
            toast.success("Image removed")
        } catch (error) {
            console.error("Delete error:", error)
            toast.error("Failed to remove image")
        }
    }

    return (
        <div className="group relative p-3 rounded-2xl border border-neutral-200 bg-neutral-50/50 hover:border-neutral-300 hover:bg-neutral-50 transition-colors">

            {/* Remove Item Button */}
            <button
                type="button"
                onClick={() => remove(index)}
                className="absolute -top-2 -right-2 p-1.5 cursor-pointer bg-white border border-neutral-200 text-neutral-400 hover:text-red-500 hover:border-red-200 rounded-full shadow-sm transition-all opacity-0 group-hover:opacity-100 z-10"
            >
                <Trash2 className="w-3.5 h-3.5" />
            </button>

            <div className="flex gap-4">
                {/* Image Placeholder / Preview */}
                <div className="relative shrink-0 w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-white border border-neutral-200 flex flex-col items-center justify-center group-hover:border-neutral-300 transition-colors overflow-hidden hover:bg-neutral-50 shadow-sm group/image">

                    {imageUrl ? (
                        <>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={imageUrl}
                                alt="Portfolio Preview"
                                className="w-full h-full object-cover"
                            />
                            {/* Delete Overlay */}
                            <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer"
                                onClick={handleDeleteImage}
                            >
                                <X className="w-5 h-5 text-white drop-shadow-sm" />
                            </div>
                        </>
                    ) : isUploading ? (
                        <div className="flex flex-col items-center justify-center">
                            <Loader2 className="w-4 h-4 text-neutral-400 animate-spin" />
                        </div>
                    ) : (
                        <label className="flex flex-col items-center justify-center w-full h-full cursor-pointer">
                            <ImageIcon className="w-5 h-5 text-neutral-400 group-hover/image:text-neutral-600 transition-colors mb-1" />
                            <span className="text-[8px] text-neutral-400 font-mono uppercase tracking-wide group-hover/image:text-neutral-500 transition-colors">
                                Img
                            </span>
                            <input
                                type="file"
                                accept="image/png,image/jpeg,image/webp,image/gif"
                                className="hidden"
                                onChange={handleFileChange}
                            />
                        </label>
                    )}

                    {/* Hidden input to register field with form */}
                    <input type="hidden" {...register(`portfolio.${index}.image_url`)} />
                </div>

                <div className="flex-1 min-w-0 flex flex-col justify-center gap-2">
                    <input
                        {...register(`portfolio.${index}.title`)}
                        type="text"
                        className="w-full bg-transparent border-b border-neutral-200 pb-1 text-sm font-medium text-neutral-900 font-mono placeholder-neutral-400 focus:outline-none focus:border-neutral-400 transition-colors rounded-none"
                        placeholder="Project Title"
                    />
                    <input
                        {...register(`portfolio.${index}.description`)}
                        type="text"
                        className="w-full bg-transparent border-b border-neutral-200 pb-1 text-xs text-neutral-500 placeholder-neutral-400 focus:outline-none focus:border-neutral-400 transition-colors rounded-none"
                        placeholder="Brief description..."
                    />

                    <div className="flex items-center gap-2 pt-0.5">
                        <LinkIcon className="w-3 h-3 text-neutral-400 shrink-0" />
                        <input
                            {...register(`portfolio.${index}.link`)}
                            type="url"
                            className="flex-1 bg-transparent border-none text-[10px] text-blue-500 placeholder-neutral-400 focus:outline-none font-mono p-0"
                            placeholder="Add link..."
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
