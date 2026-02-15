import Image from "next/image"

const TechItem = ({ label, iconSlug, colorHex }: { label: string, iconSlug: string, colorHex: string }) => (
    <div className="px-3 py-1.5 rounded-full border flex items-center gap-2 text-[11px] font-medium transition-colors cursor-default bg-white border-neutral-200 text-neutral-700 hover:text-black hover:border-neutral-300 hover:shadow-sm group">
        <Image
            src={`https://cdn.simpleicons.org/${iconSlug}/${colorHex}`}
            alt={label}
            width={12}
            height={12}
            className="w-3 h-3 group-hover:scale-110 transition-transform"
        />
        {label}
    </div>
)

export function PitchCardTech() {
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
                <TechItem label="React" iconSlug="react" colorHex="61DAFB" />
                <TechItem label="Tailwind" iconSlug="tailwindcss" colorHex="06B6D4" />
                <TechItem label="Next.js" iconSlug="nextdotjs" colorHex="000000" />
                <TechItem label="TypeScript" iconSlug="typescript" colorHex="3178C6" />
                <TechItem label="Supabase" iconSlug="supabase" colorHex="3ECF8E" />
                <TechItem label="Figma" iconSlug="figma" colorHex="F24E1E" />
            </div>
        </section>
    )
}
