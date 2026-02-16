import { Play } from "lucide-react"

interface PitchCardHeaderProps {
    headerContent: string
    bio?: string
}

export function PitchCardHeader({ headerContent, bio }: PitchCardHeaderProps) {
    return (
        <div className="flex flex-col items-center pt-2">
            <div className="w-full text-center z-10">
                <h1
                    className="text-3xl leading-[1.1] font-semibold text-neutral-900 tracking-tighter sm:text-[40px]"
                    dangerouslySetInnerHTML={{ __html: headerContent || "" }}
                />
            </div>

            {/* Video Bubble */}
            <div className="relative shrink-0 w-28 h-28 rounded-full border border-neutral-100 overflow-hidden mt-8 mb-8 bg-neutral-50 sm:w-36 sm:h-36 shadow-xl shadow-neutral-200/50 group cursor-pointer">
                <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                    alt="Pitch Video"
                    className="w-full h-full object-cover grayscale contrast-125 group-hover:scale-105 transition-transform duration-700"
                />
                <div className="flex bg-white/5 absolute top-0 right-0 bottom-0 left-0 items-center justify-center pointer-events-none z-10">
                    <div className="bg-white/30 backdrop-blur-sm border border-white/40 rounded-full w-12 h-12 flex items-center justify-center pl-1 group-hover:scale-110 transition-transform duration-300 shadow-sm">
                        <Play className="w-5 h-5 text-black fill-current" />
                    </div>
                </div>
            </div>

            {bio && (
                <section className="mb-12">
                    <p className="leading-relaxed text-sm text-neutral-500 sm:text-base font-normal text-center px-4">
                        {bio}
                    </p>
                </section>
            )}
        </div>
    )
}
