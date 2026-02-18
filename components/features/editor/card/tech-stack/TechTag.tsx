import { X } from "lucide-react"
import { TechIcon } from "@/components/shared/TechIcon"
import { TECH_SLUG_MAP } from "@/lib/constants/tech-stack-data"

interface TechTagProps {
    name: string
    onRemove: (name: string) => void
}

export function TechTag({ name, onRemove }: TechTagProps) {
    const slug = TECH_SLUG_MAP[name.toLowerCase()]

    return (
        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-neutral-100 border border-neutral-200 text-xs font-medium text-neutral-700 font-mono group">
            <TechIcon
                name={name}
                slug={slug}
                className="w-3.5 h-3.5"
                width={14}
                height={14}
            />
            {name}
            <button
                type="button"
                onClick={() => onRemove(name)}
                className="hover:text-red-500 cursor-pointer transition-colors focus:outline-none ml-1"
            >
                <X className="w-3 h-3" />
            </button>
        </div>
    )
}
