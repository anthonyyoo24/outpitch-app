"use client"

import { useFormContext } from "react-hook-form"
import { TechTag } from "./TechTag"
import { TechStackPicker } from "./TechStackPicker"

export function TechStackInput() {
    const { setValue, watch } = useFormContext()
    const techStack = watch("tech_stack") || []

    const handleRemove = (tag: string) => {
        setValue("tech_stack", techStack.filter((t: string) => t !== tag))
    }

    const handleSelect = (value: string) => {
        setValue("tech_stack", [...techStack, value])
    }

    const handleRemoveLast = () => {
        if (techStack.length > 0) {
            const newStack = [...techStack]
            newStack.pop()
            setValue("tech_stack", newStack)
        }
    }

    return (
        <section className="mb-8 sm:mb-10 z-50 relative">
            <h3 className="uppercase text-xs font-semibold text-neutral-900 tracking-widest font-mono mb-4 sm:mb-5">
                Tech Stack
            </h3>

            <div className="flex flex-wrap gap-2 mb-3">
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
}
