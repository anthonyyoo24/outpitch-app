import { CommandItem } from "@/components/ui/Command"
import { Check, Code, Plus } from "lucide-react"
import Image from "next/image"
import { TechItem } from "@/lib/constants/tech-stack-data"

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

        const logoUrl = item.slug ? `https://cdn.simpleicons.org/${item.slug}` : null

        return (
            <div className="flex items-center gap-2 w-full">
                {logoUrl ? (
                    <div className="relative w-4 h-4 shrink-0">
                        <Image
                            src={logoUrl}
                            alt={item.name}
                            fill
                            className="object-contain"
                            unoptimized
                        />
                    </div>
                ) : null}

                {/* Fallback Icon (initially hidden if logo exists) */}
                <Code className={`w-4 h-4 text-neutral-400 ${logoUrl ? 'hidden' : ''}`} />

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
