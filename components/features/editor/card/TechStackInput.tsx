"use client"

import React, { useState, useRef, useEffect } from "react"
import { Search, X, Code, Check, Plus } from "lucide-react"
import { useFormContext } from "react-hook-form"
import { Command as CommandPrimitive } from "cmdk"
import {
    Command,
    CommandList,
    CommandEmpty,
    CommandGroup,
    CommandItem
} from "@/components/ui/command"
import { TECH_STACK_DATA } from "@/lib/constants/tech-stack-data"

export function TechStackInput() {
    const { setValue, watch } = useFormContext()
    const techStack = watch("tech_stack") || []
    const [open, setOpen] = useState(false)
    const [inputValue, setInputValue] = useState("")
    const commandRef = useRef<HTMLDivElement>(null)

    // Handle clicking outside to close
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (commandRef.current && !commandRef.current.contains(event.target as Node)) {
                setOpen(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    const handleSelect = (value: string) => {
        // Check if it's already selected
        if (techStack.includes(value)) {
            setInputValue("")
            return
        }

        setValue("tech_stack", [...techStack, value])
        setInputValue("")
        setOpen(false)
    }

    const handleRemove = (tag: string) => {
        setValue("tech_stack", techStack.filter((t: string) => t !== tag))
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && inputValue.trim() && !open) {
            // If dropdown is closed but they typed something and hit enter (e.g. fast typing)
            // We can treat it as a create action
            e.preventDefault()
            handleSelect(inputValue.trim())
        }

        if (e.key === "Backspace" && !inputValue) {
            // Only remove if we have items
            if (techStack.length > 0) {
                e.preventDefault()
                const newStack = [...techStack]
                newStack.pop()
                setValue("tech_stack", newStack)
            }
        }
    }

    // Helper to get logo URL
    const getLogoUrl = (techName: string) => {
        const item = TECH_STACK_DATA.find(t => t.name.toLowerCase() === techName.toLowerCase())
        if (item?.slug) {
            return `https://cdn.simpleicons.org/${item.slug}`
        }
        return null
    }

    return (
        <section className="mb-8 sm:mb-10 z-50 relative">
            <h3 className="uppercase text-xs font-semibold text-neutral-900 tracking-widest font-mono mb-4 sm:mb-5">
                Tech Stack
            </h3>

            <div className="flex flex-wrap gap-2 mb-3">
                {techStack.map((tech: string) => {
                    const logoUrl = getLogoUrl(tech)
                    return (
                        <div
                            key={tech}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-neutral-100 border border-neutral-200 text-xs font-medium text-neutral-700 font-mono group"
                        >
                            {logoUrl ? (
                                <img src={logoUrl} alt={tech} className="w-3.5 h-3.5" />
                            ) : (
                                <Code className="w-3.5 h-3.5 text-neutral-500" />
                            )}
                            {tech}
                            <button
                                type="button"
                                onClick={() => handleRemove(tech)}
                                className="hover:text-red-500 cursor-pointer transition-colors focus:outline-none ml-1"
                            >
                                <X className="w-3 h-3" />
                            </button>
                        </div>
                    )
                })}
            </div>

            <div className="relative group" ref={commandRef}>
                <Command
                    className="rounded-xl border border-neutral-200 overflow-visible bg-white shadow-sm"
                    filter={(value, search) => {
                        if (!search) return 1
                        const normalizedValue = value.toLowerCase()
                        const normalizedSearch = search.toLowerCase()

                        // Check if full term starts with search
                        if (normalizedValue.startsWith(normalizedSearch)) return 1

                        // Check if any word starts with search
                        const words = normalizedValue.split(" ")
                        for (const word of words) {
                            if (word.startsWith(normalizedSearch)) return 1
                        }

                        return 0
                    }}
                >
                    <div className="flex items-center px-3" cmdk-input-wrapper="">
                        <Search className="mr-2 h-4 w-4 shrink-0 opacity-50 text-neutral-400" />
                        <CommandPrimitive.Input
                            value={inputValue}
                            onValueChange={(val) => {
                                setInputValue(val)
                                setOpen(!!val)
                            }}
                            onFocus={() => setOpen(!!inputValue)}
                            onKeyDown={handleKeyDown}
                            className="flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-neutral-400 font-mono disabled:cursor-not-allowed disabled:opacity-50"
                            placeholder="Search stack (e.g. React, Figma, Salesforce)..."
                        />
                    </div>

                    {open && (
                        <div className="absolute top-full left-0 w-full mt-2 bg-white rounded-xl border border-neutral-200 shadow-xl overflow-hidden z-50">
                            <CommandList>
                                <CommandEmpty className="py-2 px-2">
                                    <button
                                        type="button"
                                        className="flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-neutral-100 cursor-pointer"
                                        onClick={() => handleSelect(inputValue)}
                                    >
                                        <Plus className="h-4 w-4 text-neutral-500" />
                                        <span className="font-mono">Create &quot;{inputValue}&quot;</span>
                                    </button>
                                </CommandEmpty>

                                <CommandGroup heading="Suggestions">
                                    {TECH_STACK_DATA.map((item) => (
                                        <CommandItem
                                            key={item.name}
                                            value={item.name}
                                            onSelect={() => {
                                                // items in cmdk are lowercased by default logic often, but we pass simple name
                                                // we want the Title Case name
                                                handleSelect(item.name)
                                            }}
                                            className="font-mono cursor-pointer"
                                        >
                                            <div className="flex items-center gap-2 w-full">
                                                <img
                                                    src={`https://cdn.simpleicons.org/${item.slug}`}
                                                    alt={item.name}
                                                    className="w-4 h-4 object-contain"
                                                    onError={(e) => {
                                                        e.currentTarget.style.display = 'none'
                                                        e.currentTarget.nextElementSibling?.classList.remove('hidden')
                                                    }}
                                                />
                                                <Code className="w-4 h-4 text-neutral-400 hidden" />
                                                <span>{item.name}</span>
                                                {techStack.includes(item.name) && (
                                                    <Check className="ml-auto w-4 h-4 text-neutral-400" />
                                                )}
                                            </div>
                                        </CommandItem>
                                    ))}
                                </CommandGroup>
                            </CommandList>
                        </div>
                    )}
                </Command>
            </div>
        </section>
    )
}
