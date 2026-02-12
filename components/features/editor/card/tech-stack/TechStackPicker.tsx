import React, { useState, useRef, useEffect, useMemo } from "react"
import { Command } from "@/components/ui/command"
import { TECH_STACK_DATA, TECH_SLUG_MAP } from "@/lib/constants/tech-stack-data"
import { TechSearchInput } from "./TechSearchInput"
import { TechStackDropdown } from "./TechStackDropdown"

interface TechStackPickerProps {
    selectedStack: string[]
    onSelect: (value: string) => void
    onRemoveLast: () => void
}

export function TechStackPicker({ selectedStack, onSelect, onRemoveLast }: TechStackPickerProps) {
    const [open, setOpen] = useState(false)
    const [inputValue, setInputValue] = useState("")
    const commandRef = useRef<HTMLDivElement>(null)

    // Manual filtering logic
    const filteredTech = useMemo(() => TECH_STACK_DATA.filter((item) => {
        // Exclude already selected items
        if (selectedStack.includes(item.name)) return false

        if (!inputValue) return true
        const normalizedValue = item.name.toLowerCase()
        const normalizedSearch = inputValue.toLowerCase()
        if (normalizedValue.startsWith(normalizedSearch)) return true
        const words = normalizedValue.split(" ")
        for (const word of words) {
            if (word.startsWith(normalizedSearch)) return true
        }
        return false
    }), [inputValue, selectedStack])

    const showCreateOption = inputValue &&
        !selectedStack.includes(inputValue) &&
        !TECH_SLUG_MAP[inputValue.toLowerCase()] &&
        filteredTech.length === 0

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
        if (selectedStack.includes(value)) {
            setInputValue("")
            return
        }
        onSelect(value)
        setInputValue("")
        setOpen(false)
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && inputValue.trim() && !open) {
            e.preventDefault()
            handleSelect(inputValue.trim())
        }

        if (e.key === "Backspace" && !inputValue) {
            onRemoveLast()
        }
    }

    return (
        <div className="relative group" ref={commandRef}>
            <Command
                className="rounded-xl border border-neutral-200 bg-neutral-50/40 hover:bg-neutral-50/80 w-full overflow-visible focus:border-neutral-300 focus:outline-none focus:bg-white hover:border-neutral-300"
                shouldFilter={false}
            >
                <TechSearchInput
                    value={inputValue}
                    onValueChange={(val) => {
                        setInputValue(val)
                        setOpen(!!val)
                    }}
                    onFocus={() => setOpen(!!inputValue)}
                    onKeyDown={handleKeyDown}
                />

                {open && (
                    <div className="absolute top-full left-0 w-full mt-2 bg-white rounded-xl border border-neutral-200 shadow-xl overflow-hidden z-50">
                        <TechStackDropdown
                            items={filteredTech}
                            techStack={selectedStack}
                            showCreateOption={!!showCreateOption}
                            inputValue={inputValue}
                            onSelect={handleSelect}
                        />
                    </div>
                )}
            </Command>
        </div>
    )
}
