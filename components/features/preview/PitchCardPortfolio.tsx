import { ArrowRight } from "lucide-react"

interface PortfolioItem {
    title: string
    description: string
    link?: string
    image_url?: string | null
}

interface PitchCardPortfolioProps {
    portfolio?: PortfolioItem[]
}

export function PitchCardPortfolio({ portfolio }: PitchCardPortfolioProps) {
    // Filter out empty items (items without title or description)
    const validPortfolio = portfolio?.filter(
        (item) => item.title?.trim() || item.description?.trim()
    )

    // Don't render section if no valid portfolio items
    if (!validPortfolio || validPortfolio.length === 0) {
        return null
    }

    return (
        <section className="mb-10">
            <div className="flex items-center justify-between mb-6 border-b border-neutral-200 pb-2">
                <h3 className="uppercase text-[11px] font-semibold text-neutral-900 tracking-[0.2em] flex items-center gap-2">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-neutral-400"
                    >
                        <rect width="20" height="14" x="2" y="7" rx="2" ry="2" />
                        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                    </svg>
                    Selected Work
                </h3>
                {/* <a href="#"
                    className="text-[10px] transition-colors hover:text-neutral-900 flex items-center gap-1 uppercase tracking-widest text-neutral-500 font-medium">
                    View All
                    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24"
                        fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M5 12h14m-7-7 7 7-7 7"></path>
                    </svg>
                </a> */}
            </div>

            <div className="space-y-3">
                {validPortfolio.map((item, index) => {
                    const content = (
                        <div className="flex items-center p-2 gap-4 sm:p-3">
                            <div className="w-12 h-12 rounded-xl bg-neutral-50 border border-neutral-200 flex items-center justify-center shrink-0 group-hover:border-neutral-300 transition-colors shadow-sm overflow-hidden">
                                {item.image_url ? (
                                    <img
                                        src={item.image_url}
                                        alt={item.title}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                                        viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
                                        strokeLinecap="round" strokeLinejoin="round" className="text-neutral-900">
                                        <rect width="18" height="12" x="3" y="4" rx="2" ry="2"></rect>
                                        <line x1="2" x2="22" y1="20" y2="20"></line>
                                    </svg>
                                )}
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between">
                                    <h4 className="text-sm font-semibold text-neutral-900 group-hover:text-black transition-colors">
                                        {item.title}
                                    </h4>
                                </div>
                                <p className="text-xs text-neutral-500 mt-1 line-clamp-1 font-normal">
                                    {item.description}
                                </p>
                            </div>
                            <div className="w-8 h-8 flex items-center justify-center rounded-full bg-white border border-neutral-200 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0 shadow-sm">
                                <ArrowRight className="w-3.5 h-3.5" />
                            </div>
                        </div>
                    );

                    return item.link ? (
                        <a
                            key={index}
                            href={item.link}
                            className="group block p-1 rounded-2xl transition-all duration-300 hover:bg-neutral-100"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {content}
                        </a>
                    ) : (
                        <div
                            key={index}
                            className="group block p-1 rounded-2xl transition-all duration-300 hover:bg-neutral-100"
                        >
                            {content}
                        </div>
                    );
                })}
            </div>
        </section>
    )
}
