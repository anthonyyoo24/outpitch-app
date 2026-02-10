"use client"

import { useFormContext, useFieldArray } from "react-hook-form"
import { CirclePlus, Trash2, Image as ImageIcon, Link as LinkIcon } from "lucide-react"

export function SelectedWorkInput() {
    const { control, register } = useFormContext()
    const { fields, append, remove } = useFieldArray({
        control,
        name: "portfolio"
    })

    return (
        <section className="mb-8 sm:mb-10">
            <div className="flex items-center justify-between mb-4 sm:mb-5">
                <h3 className="uppercase text-xs font-semibold text-neutral-900 tracking-widest font-mono">
                    Selected Work
                </h3>
            </div>

            <div className="space-y-4">
                {fields.map((field, index) => (
                    <div key={field.id} className="group relative p-3 rounded-2xl border border-dashed border-neutral-400 bg-neutral-50/50 hover:border-neutral-500 hover:bg-neutral-50 transition-colors">

                        {/* Remove Button (Updated Position/Style if needed, but keeping absolute for utility) */}
                        <button
                            type="button"
                            onClick={() => remove(index)}
                            className="absolute -top-2 -right-2 p-1.5 cursor-pointer bg-white border border-neutral-200 text-neutral-400 hover:text-red-500 hover:border-red-200 rounded-full shadow-sm transition-all opacity-0 group-hover:opacity-100 z-10"
                        >
                            <Trash2 className="w-3.5 h-3.5" />
                        </button>

                        <div className="flex gap-4">
                            {/* Image Placeholder */}
                            <label className="relative shrink-0 w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-white border border-neutral-200 flex flex-col items-center justify-center group-hover:border-neutral-300 transition-colors cursor-pointer overflow-hidden hover:bg-neutral-50 shadow-sm group/image">
                                <ImageIcon className="w-5 h-5 text-neutral-400 group-hover/image:text-neutral-600 transition-colors mb-1" />
                                <span className="text-[8px] text-neutral-400 font-mono uppercase tracking-wide group-hover/image:text-neutral-500 transition-colors">
                                    Img
                                </span>
                                {/* Hidden input for file upload (functionality preserved) */}
                                <input type="hidden" {...register(`portfolio.${index}.image_url`)} />
                            </label>

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
                ))}

                <button
                    type="button"
                    onClick={() => append({ title: "", description: "", link: "", image_url: "" })}
                    className="w-full cursor-pointer py-3 rounded-xl border border-dashed border-neutral-400 text-neutral-500 hover:text-neutral-900 hover:border-neutral-500 hover:bg-neutral-50 transition-all flex items-center justify-center gap-2 text-xs font-medium font-mono group"
                >
                    <CirclePlus className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    Add Portfolio Item
                </button>
            </div>
        </section>
    )
}
