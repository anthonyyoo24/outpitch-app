"use client"

import { useFormContext, useFieldArray } from "react-hook-form"
import { CirclePlus } from "lucide-react"
import { SelectedWorkItem } from "./SelectedWorkItem"

export function SelectedWorkInput() {
    const { control } = useFormContext()
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
                    <SelectedWorkItem key={field.id} index={index} remove={remove} />
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
