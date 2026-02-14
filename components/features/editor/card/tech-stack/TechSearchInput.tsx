import { Search } from "lucide-react"
import { Command as CommandPrimitive } from "cmdk"

interface TechSearchInputProps {
    value: string
    onValueChange: (val: string) => void
    onFocus: () => void
    onKeyDown: (e: React.KeyboardEvent) => void
}

export function TechSearchInput({ value, onValueChange, onFocus, onKeyDown }: TechSearchInputProps) {
    return (
        <div className="flex items-center px-3" cmdk-input-wrapper="">
            <Search className="mr-2 h-4 w-4 shrink-0 text-neutral-400" />
            <CommandPrimitive.Input
                value={value}
                onValueChange={onValueChange}
                onFocus={onFocus}
                onKeyDown={onKeyDown}
                className="flex h-11 w-full rounded-md bg-transparent py-3 text-xs outline-none placeholder:text-neutral-400 font-mono disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Search stack (e.g. React, Figma, Salesforce)..."
            />
        </div>
    )
}
