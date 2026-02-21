import React from "react"
import { UseFormRegister, UseFormGetValues } from "react-hook-form"
import { Trash2, ChevronUp } from "lucide-react"
import { PitchFormValues } from "@/lib/schemas/pitch"
import { PLATFORMS, SELECT_PLATFORM, PlatformId } from "./constants"
import { ValidationTooltip } from "../validation/ValidationTooltip"

interface SocialLinkItemProps {
    index: number
    platformValue: PlatformId
    register: UseFormRegister<PitchFormValues>
    update: (index: number, value: NonNullable<PitchFormValues["social_links"]>[number]) => void
    remove: (index: number) => void
    getValues: UseFormGetValues<PitchFormValues>
    isOpen: boolean
    onToggle: () => void
    onClose: () => void
    error?: string
    usedPlatforms: PlatformId[]
}

export function SocialLinkItem({
    index,
    platformValue,
    register,
    update,
    remove,
    getValues,
    isOpen,
    onToggle,
    onClose,
    error,
    usedPlatforms
}: SocialLinkItemProps) {
    // Determine the current platform definition or fallback to "Select"
    const platform = PLATFORMS.find(p => p.id === platformValue) || SELECT_PLATFORM
    const Icon = platform.icon
    const containerRef = React.useRef<HTMLDivElement>(null)

    // Handle clicking outside to close
    React.useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (isOpen && containerRef.current && !containerRef.current.contains(event.target as Node)) {
                onClose()
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [isOpen, onClose])

    const handlePlatformSelect = (id: PlatformId) => {
        // preserve the current URL when switching platforms
        // we use getValues to ensure we get the *current* input value, not the stale one from fields
        const currentUrl = getValues(`social_links.${index}.url`) || ""
        update(index, { platform: id, url: currentUrl })
        onClose()
    }

    return (
        <div className="flex gap-2 group relative z-20" ref={containerRef}>
            {/* Hidden input to register the platform field so RHF tracks it */}
            <input type="hidden" {...register(`social_links.${index}.platform`)} value={platformValue} />

            <div className="relative w-fit sm:w-32 shrink-0 group/select">
                <button
                    type="button"
                    onClick={onToggle}
                    className="w-12.5 sm:w-full cursor-pointer bg-white border border-neutral-300 rounded-xl py-2.5 pl-3 sm:pl-9 pr-2 text-xs text-neutral-600 focus:outline-none focus:border-neutral-500 hover:border-neutral-400 font-mono text-left flex items-center relative transition-colors shadow-sm"
                >
                    <div className="absolute xs:static sm:absolute left-2.5 sm:left-3 top-1/2 -translate-y-1/2 text-neutral-400 flex items-center justify-center">
                        <Icon className="w-3.5 h-3.5" />
                    </div>
                    <span className="truncate w-0 sm:w-full hidden sm:block">
                        {platform.label}
                    </span>

                    <ChevronUp className={`w-3 h-3 absolute right-2 text-neutral-400 opacity-0 group-hover/select:opacity-100 transition-all duration-300 ${isOpen ? "rotate-0 opacity-100" : "rotate-180"}`} />
                </button>

                {/* Dropdown */}
                <div
                    className={`absolute bottom-full left-0 w-32 mb-2 bg-white border border-neutral-100 rounded-xl overflow-hidden shadow-2xl transition-all duration-200 z-50 p-1 ${isOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible translate-y-2 pointer-events-none"}`}
                >
                    {PLATFORMS.map((p) => {
                        const PIcon = p.icon
                        const isUsed = usedPlatforms.includes(p.id) && p.id !== platformValue
                        return (
                            <button
                                key={p.id}
                                type="button"
                                disabled={isUsed}
                                onClick={isUsed ? undefined : () => handlePlatformSelect(p.id)}
                                className={`w-full px-3 py-2 text-left text-xs font-mono flex items-center gap-2 transition-colors rounded-lg ${p.id === platformValue
                                    ? "bg-neutral-50 text-neutral-900 font-medium"
                                    : isUsed
                                        ? "text-neutral-300 cursor-not-allowed opacity-50"
                                        : "text-neutral-500 hover:bg-neutral-50 hover:text-neutral-900 cursor-pointer"
                                    }`}
                            >
                                <PIcon className="w-3.5 h-3.5" />
                                {p.label}
                            </button>
                        )
                    })}
                </div>
            </div>

            <div className="flex-1 relative min-w-0">
                <input
                    {...register(`social_links.${index}.url`)}
                    type="url"
                    className={`w-full bg-neutral-50/50 border rounded-xl px-3 py-2.5 text-xs text-neutral-900 placeholder-neutral-400 focus:outline-none focus:bg-white focus:shadow-sm font-mono transition-colors ${error
                        ? "border-red-300 focus:border-red-500 bg-red-50/10"
                        : "border-neutral-300 hover:border-neutral-400 focus:border-neutral-500"
                        }`}
                    placeholder={platform.placeholder}
                />
                <ValidationTooltip error={error} />
            </div>

            <button
                type="button"
                onClick={() => remove(index)}
                className="w-9 cursor-pointer shrink-0 flex items-center justify-center rounded-xl border border-neutral-300 text-neutral-400 hover:text-red-500 hover:bg-red-50 hover:border-red-200 transition-all bg-white shadow-sm"
            >
                <Trash2 className="w-3.5 h-3.5" />
            </button>
        </div>
    )
}
