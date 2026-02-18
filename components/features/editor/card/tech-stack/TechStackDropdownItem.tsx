import { CommandItem } from "@/components/ui/Command"
import { Check, Plus } from "lucide-react"
import { TechItem } from "@/lib/constants/tech-stack-data"
import { TechIcon } from "@/components/shared/TechIcon"

interface TechStackDropdownItemProps {
    item: TechItem | { name: string; slug: string }
    isSelected?: boolean
    isCreateOption?: boolean
    onSelect: (value: string) => void
}

export function TechStackDropdownItem({ item, isSelected, isCreateOption, onSelect }: TechStackDropdownItemProps) {
    const renderContent = () => {
        if (isCreateOption) {
            return (
                <>
                    <Plus className="mr-2 h-4 w-4 text-neutral-500" />
                    Create &quot;{item.name}&quot;
                </>
            )
        }

        return (
            <div className="flex items-center gap-2 w-full">
                <div className="relative w-4 h-4 shrink-0 flex items-center justify-center">
                    <TechIcon
                        name={item.name}
                        slug={item.slug}
                        width={16}
                        height={16}
                        className="w-4 h-4 object-contain"
                    />
                </div>

                <span>{item.name}</span>
                {isSelected && <Check className="ml-auto w-4 h-4 text-neutral-400" />}
            </div>
        )
    }

    return (
        <CommandItem
            value={item.name}
            onSelect={() => onSelect(item.name)}
            className="font-mono cursor-pointer"
        >
            {renderContent()}
        </CommandItem>
    )
}
