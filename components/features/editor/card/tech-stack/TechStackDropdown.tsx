import { CommandList, CommandEmpty, CommandGroup } from "@/components/ui/Command"
import { TechStackDropdownItem } from "./TechStackDropdownItem"
import { TechItem } from "@/lib/constants/tech-stack-data"

interface TechStackDropdownProps {
    items: TechItem[]
    techStack: string[]
    showCreateOption: boolean
    inputValue: string
    onSelect: (val: string) => void
}

export function TechStackDropdown({ items, techStack, showCreateOption, inputValue, onSelect }: TechStackDropdownProps) {
    return (
        <CommandList>
            <CommandEmpty className="py-2 px-2 text-sm text-neutral-500">No results found.</CommandEmpty>

            {items.length > 0 && (
                <CommandGroup heading="Suggestions">
                    {items.map((item) => (
                        <TechStackDropdownItem
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
                    <TechStackDropdownItem
                        item={{ name: inputValue, slug: "" }}
                        isCreateOption
                        onSelect={onSelect}
                    />
                </CommandGroup>
            )}
        </CommandList>
    )
}
