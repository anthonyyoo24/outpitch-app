"use client"

import { useFormContext, Controller } from "react-hook-form"
import { TechTag } from "./TechTag"
import { TechStackPicker } from "./TechStackPicker"
import { PitchFormValues } from "../../schema"

export function TechStackInput() {
    const { control } = useFormContext<PitchFormValues>()

    return (
        <Controller
            name="tech_stack"
            control={control}
            render={({ field }) => {
                const techStack = field.value || []

                const handleRemove = (tag: string) => {
                    field.onChange(techStack.filter((t: string) => t !== tag))
                }

                const handleSelect = (value: string) => {
                    field.onChange([...techStack, value])
                }

                const handleRemoveLast = () => {
                    if (techStack.length > 0) {
                        const newStack = [...techStack]
                        newStack.pop()
                        field.onChange(newStack)
                    }
                }

                return (
                    <section className="mb-8 sm:mb-10 z-50 relative">
                        <h3 className="uppercase text-xs font-semibold text-neutral-900 tracking-widest font-mono mb-4 sm:mb-5">
                            Tech Stack
                        </h3>

                        <div className={`flex flex-wrap gap-2 ${techStack.length > 0 && "mb-3"}`}>
                            {techStack.map((tech: string) => (
                                <TechTag key={tech} name={tech} onRemove={handleRemove} />
                            ))}
                        </div>

                        <TechStackPicker
                            selectedStack={techStack}
                            onSelect={handleSelect}
                            onRemoveLast={handleRemoveLast}
                        />
                    </section>
                )
            }}
        />
    )
}
