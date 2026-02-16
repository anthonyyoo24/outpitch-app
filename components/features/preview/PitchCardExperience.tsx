import { format, parse } from 'date-fns'

interface WorkExperience {
    role: string
    company: string
    start_month?: string
    start_year?: string
    end_month?: string
    end_year?: string
    is_current?: boolean
    description: string
}

interface PitchCardExperienceProps {
    workExperience?: WorkExperience[]
}

function formatDateRange(experience: WorkExperience): string {
    const { start_month, start_year, end_month, end_year, is_current } = experience

    // Helper to format a single date
    const formatDate = (month?: string, year?: string): string => {
        if (!year) return ""
        if (!month) return year

        try {
            // Try parsing as full month name (e.g., "January 2024")
            const dateStr = `${month} 1, ${year}`
            const date = parse(dateStr, 'MMMM d, yyyy', new Date())
            return format(date, 'MMM yyyy')
        } catch {
            // Fallback: return as-is if parsing fails
            return `${month} ${year}`
        }
    }

    const startDate = formatDate(start_month, start_year)
    const endDate = is_current ? "Present" : formatDate(end_month, end_year)

    if (!startDate && !endDate) return ""
    if (!startDate) return endDate
    if (!endDate) return startDate

    return `${startDate} - ${endDate}`
}

export function PitchCardExperience({ workExperience }: PitchCardExperienceProps) {
    // Filter out empty items (items without role or company)
    const validExperience = workExperience?.filter(
        (exp) => exp.role?.trim() || exp.company?.trim()
    )

    // Don't render section if no valid work experience items
    if (!validExperience || validExperience.length === 0) {
        return null
    }

    return (
        <section className="mb-10">
            <div className="flex items-center justify-between mb-5 border-b border-neutral-200 pb-2">
                <h3 className="uppercase text-[11px] font-medium text-neutral-900 tracking-[0.2em] flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"
                        fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                        strokeLinejoin="round" className="text-neutral-500">
                        <path d="M18 6H5a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h13l4-3.5L18 6Z"></path>
                        <path d="M12 13v8"></path>
                        <path d="M12 3v3"></path>
                    </svg>
                    Journey
                </h3>
            </div>

            <div className="space-y-3">
                {validExperience.map((experience, index) => {
                    const dateRange = formatDateRange(experience)

                    return (
                        <div key={index} className="group relative p-4 rounded-2xl bg-white shadow-[0_4px_20px_-12px_rgba(0,0,0,0.1)] hover:bg-neutral-100 hover:shadow-none transition-all duration-300">
                            <div className="flex flex-col gap-1">
                                <div className="flex justify-between items-start">
                                    <h4 className="text-sm font-semibold text-neutral-900 group-hover:text-black transition-colors">
                                        {experience.role}
                                    </h4>
                                    {dateRange && (
                                        <span className="text-[10px] font-geist-mono text-neutral-600 bg-white border border-neutral-100 px-2 py-1 rounded-md group-hover:border-neutral-200 transition-colors">
                                            {dateRange}
                                        </span>
                                    )}
                                </div>
                                <span className="text-xs font-medium italic text-neutral-700 mb-1">
                                    {experience.company}
                                </span>
                                {experience.description && (
                                    <p className="text-xs leading-relaxed text-neutral-500 font-normal">
                                        {experience.description}
                                    </p>
                                )}
                            </div>
                        </div>
                    )
                })}
            </div>
        </section>
    )
}
