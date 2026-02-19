import { notFound } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { PitchPreviewCard } from "@/components/features/preview/PitchPreviewCard"
import { GridBackground } from "@/components/ui/GridBackground"

interface PublicPitchPageProps {
    params: Promise<{
        username: string
        slug: string
    }>
}

export default async function PublicPitchPage({ params }: PublicPitchPageProps) {
    const { username, slug } = await params
    const supabase = await createClient()

    // 1. Fetch Profile by Username
    const { data: profile } = await supabase
        .from("profiles")
        .select("id")
        .eq("username", username)
        .single()

    if (!profile) {
        return notFound()
    }

    // 2. Fetch Pitch by UserID + Slug + Status=Published
    const { data: pitch } = await supabase
        .from("pitches")
        .select("*")
        .eq("user_id", profile.id)
        .eq("slug", slug)
        .eq("status", "published") // CRITICAL: Only show if published
        .single()

    if (!pitch) {
        return notFound()
    }

    return (
        <div className="flex min-h-screen w-full overflow-hidden bg-[#FAFAFA] relative">
            <GridBackground />

            <main className="flex-1 overflow-y-auto w-full flex justify-center items-center py-10 px-4 sm:px-6 z-10">
                <div className="w-full max-w-3xl">
                    <PitchPreviewCard
                        headerContent={pitch.header_content || ""}
                        bio={pitch.bio || ""}
                        videoUrl={pitch.video_url || ""}

                        // Explicit casts for Supabase JSON types
                        portfolio={(pitch.portfolio as any[]) || []}
                        techStack={(pitch.tech_stack as string[]) || []}
                        workExperience={(pitch.work_experience as any[]) || []}
                        contact={{
                            email: pitch.email || "",
                            calendly_link: pitch.calendly_link || undefined // Fix null vs undefined
                        }}
                        socialLinks={(pitch.social_links as any[]) || []}
                        resumeUrl={pitch.resume_url}
                    />

                    {/* Optional Footer / Branding */}
                    <div className="mt-12 text-center text-neutral-400 text-xs pb-10">
                        <p>Powered by Outpitch</p>
                    </div>
                </div>
            </main>
        </div>
    )
}
