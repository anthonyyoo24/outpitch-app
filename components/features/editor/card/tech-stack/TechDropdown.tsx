import { CommandList, CommandEmpty, CommandGroup } from "@/components/ui/command"
import { TechDropdownItem } from "./TechDropdownItem"
import { TechItem } from "@/lib/constants/tech-stack-data"

interface TechDropdownProps {
    items: TechItem[]
    techStack: string[]
    showCreateOption: boolean
    inputValue: string
    onSelect: (val: string) => void
}

export function TechDropdown({ items, techStack, showCreateOption, inputValue, onSelect }: TechDropdownProps) {
    return (
        <CommandList>
            <CommandEmpty className="py-2 px-2 text-sm text-neutral-500">No results found.</CommandEmpty>

            {items.length > 0 && (
                <CommandGroup heading="Suggestions">
                    {items.map((item) => (
                        <TechDropdownItem
                            key={item.name}
                            item={item}
                            isSelected={techStack.includes(item.name)}
                            onSelect={onSelect}
                        />
                    ))}
                </CommandGroup>
            )}

            {showCreateOption && (
                <CommandGroup heading="Create new">
                    <TechDropdownItem
                        item={{ name: inputValue, slug: "" }}
                        isCreateOption
                        onSelect={onSelect}
                    />
                </CommandGroup>
            )}
        </CommandList>
    )
}
