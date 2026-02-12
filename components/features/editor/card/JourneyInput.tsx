"use client"

import React from "react"
import { CirclePlus } from "lucide-react"
import { useFormContext, useFieldArray } from "react-hook-form"
import { JourneyItem } from "./JourneyItem"

export function JourneyInput() {
    const { control } = useFormContext()
    const { fields, append, remove } = useFieldArray({
        control,
        name: "work_experience"
    })

    return (
        <section className="">
            <div className="flex items-center justify-between mb-4 sm:mb-5">
                <h3 className="uppercase text-xs font-semibold text-neutral-900 tracking-widest font-mono">
                    Journey
                </h3>
            </div>

            <div className="relative space-y-6">
                {fields.map((field, index) => (
                    <JourneyItem key={field.id} index={index} remove={remove} />
                ))}

                <button
                    type="button"
                    onClick={() => append({
                        role: "",
                        company: "",
                        start_month: "",
                        start_year: "",
                        end_month: "",
                        end_year: "",
                        is_current: false,
                        description: ""
                    })}
                    className="w-full cursor-pointer py-3 rounded-xl border border-dashed border-neutral-400 text-neutral-500 hover:text-neutral-900 hover:border-neutral-500 hover:bg-neutral-50 transition-all flex items-center justify-center gap-2 text-xs font-medium font-mono group"
                >
                    <CirclePlus className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    Add Role
                </button>
            </div>
        </section>
    )
}
