import { X, Code } from "lucide-react"
import Image from "next/image"
import { TECH_SLUG_MAP } from "@/lib/constants/tech-stack-data"

interface TechTagProps {
    name: string
    onRemove: (name: string) => void
}

export function TechTag({ name, onRemove }: TechTagProps) {
    const slug = TECH_SLUG_MAP[name.toLowerCase()]
    const logoUrl = slug ? `https://cdn.simpleicons.org/${slug}` : null

    return (
        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-neutral-100 border border-neutral-200 text-xs font-medium text-neutral-700 font-mono group">
            {logoUrl ? (
                <Image
                    src={logoUrl}
                    alt={name}
                    width={14}
                    height={14}
                    className="w-3.5 h-3.5"
                    unoptimized
                />
            ) : (
                <Code className="w-3.5 h-3.5 text-neutral-500" />
            )}
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
