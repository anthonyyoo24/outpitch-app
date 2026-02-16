import { PitchCardVideo } from "./PitchCardVideo"

interface PitchCardHeaderProps {
    headerContent: string
    bio?: string
    videoUrl?: string
}

export function PitchCardHeader({ headerContent, bio, videoUrl }: PitchCardHeaderProps) {
    return (
        <div className="flex flex-col items-center pt-2">
            <div className="w-full text-center z-10">
                <h1
                    className="text-3xl leading-[1.1] font-semibold text-neutral-900 tracking-tighter sm:text-[40px]"
                    dangerouslySetInnerHTML={{ __html: headerContent || "" }}
                />
            </div>

            {/* Video Bubble */}
            <PitchCardVideo videoUrl={videoUrl} />

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
