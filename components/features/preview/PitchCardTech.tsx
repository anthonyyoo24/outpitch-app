import Image from "next/image"
import { TECH_SLUG_MAP } from "@/lib/constants/tech-stack-data"

const TechItem = ({ label, iconSlug }: { label: string, iconSlug: string }) => (
    <div className="px-3 py-1.5 rounded-full border flex items-center gap-2 text-[11px] font-medium transition-colors cursor-default bg-white border-neutral-200 text-neutral-700 hover:text-black hover:border-neutral-300 hover:shadow-sm group">
        <Image
            src={`https://cdn.simpleicons.org/${iconSlug}`}
            alt={label}
            width={12}
            height={12}
            className="w-3 h-3 group-hover:scale-110 transition-transform"
        />
        {label}
    </div>
)

interface PitchCardTechProps {
    techStack?: string[]
}

export function PitchCardTech({ techStack }: PitchCardTechProps) {
    // Don't render section if no tech stack items
    if (!techStack || techStack.length === 0) {
        return null
    }

    return (
        <section className="mb-10">
            <div className="flex items-center justify-between mb-4 border-b border-neutral-200 pb-2">
                <h3 className="uppercase text-[11px] font-semibold text-neutral-900 tracking-[0.2em] flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"
                        fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                        strokeLinejoin="round" className="text-neutral-400">
                        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z">
                        </path>
                    </svg>
                    Toolkit
                </h3>
            </div>
            <div className="flex flex-wrap gap-2">
                {techStack.map((techName) => {
                    // Look up the icon slug from the mapping
                    const iconSlug = TECH_SLUG_MAP[techName.toLowerCase()] || "code"
                    return <TechItem key={techName} label={techName} iconSlug={iconSlug} />
                })}
            </div>
        </section>
    )
}
