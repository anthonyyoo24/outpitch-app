export function PitchCardExperience() {
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
                <div className="group relative p-4 rounded-2xl bg-white shadow-[0_4px_20px_-12px_rgba(0,0,0,0.1)] hover:bg-neutral-100 hover:shadow-none transition-all duration-300">
                    <div className="flex flex-col gap-1">
                        <div className="flex justify-between items-start">
                            <h4 className="text-sm font-semibold text-neutral-900 group-hover:text-black transition-colors">
                                Senior Frontend Engineer
                            </h4>
                            <span className="text-[10px] font-geist-mono text-neutral-600 bg-white border border-neutral-100 px-2 py-1 rounded-md group-hover:border-neutral-200 transition-colors">
                                2022 - Present
                            </span>
                        </div>
                        <span className="text-xs font-medium italic text-neutral-700 mb-1">
                            TechCorp Inc.
                        </span>
                        <p className="text-xs leading-relaxed text-neutral-500 font-normal">
                            Leading the design system team and reducing technical debt by 40%.
                        </p>
                    </div>
                </div>

                <div className="group relative p-4 rounded-2xl bg-white shadow-[0_4px_20px_-12px_rgba(0,0,0,0.1)] hover:bg-neutral-100 hover:shadow-none transition-all duration-300">
                    <div className="flex flex-col gap-1">
                        <div className="flex justify-between items-start">
                            <h4 className="text-sm font-semibold text-neutral-900 group-hover:text-black transition-colors">
                                Product Designer
                            </h4>
                            <span className="text-[10px] font-geist-mono text-neutral-600 bg-white border border-neutral-100 px-2 py-1 rounded-md group-hover:border-neutral-200 transition-colors">
                                2020 - 2022
                            </span>
                        </div>
                        <span className="text-xs font-medium italic text-neutral-700 mb-1">
                            Studio Alpha
                        </span>
                        <p className="text-xs leading-relaxed text-neutral-500 font-normal">
                            Designed user flows for fintech mobile apps and design systems.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}
