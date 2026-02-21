import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { cache } from "react"
import { createClient } from "@/lib/supabase/server"
import { PitchPreviewCard, type PitchPreviewCardProps } from "@/components/features/preview/PitchPreviewCard"
import { GridBackground } from "@/components/ui/GridBackground"
import { stripHtml } from "@/lib/utils"

interface PublicPitchPageProps {
    params: Promise<{
        username: string
        slug: string
    }>
}

/**
 * Deduplicates database queries using React cache().
 * Next.js will only execute this once per page load.
 */
const getStoredPitch = cache(async (username: string, slug: string) => {
    const supabase = await createClient()

    // 1. Fetch Profile by Username
    const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("id")
        .eq("username", username)
        .maybeSingle()

    if (profileError) {
        console.error(`[PublicPitchPage] Error fetching profile for username ${username}:`, profileError)
    }

    if (!profile) return { profile: null, pitch: null }

    // 2. Fetch Pitch by UserID + Slug + Status=Published
    const { data: pitch, error: pitchError } = await supabase
        .from("pitches")
        .select("*")
        .eq("user_id", profile.id)
        .eq("slug", slug)
        .eq("status", "published") // CRITICAL: Only show if published
        .maybeSingle()

    if (pitchError) {
        console.error(`[PublicPitchPage] Error fetching pitch for slug ${slug}:`, pitchError)
    }

    return { profile, pitch }
})

export async function generateMetadata({ params }: PublicPitchPageProps): Promise<Metadata> {
    const { username, slug } = await params
    const { pitch } = await getStoredPitch(username, slug)

    if (!pitch) return {}

    const title = stripHtml(pitch.header_content || `${username}'s Pitch`)
    const description = stripHtml(pitch.bio || "Check out my pitch on Outpitch.")

    // Fallback thumbnail image
    const ogImage = "https://outpitch.com/og-image.jpg"

    return {
        title,
        description,
        openGraph: {
            title,
            description,
            type: "website",
            images: [
                {
                    url: ogImage,
                    width: 1200,
                    height: 630,
                    alt: title,
                }
            ],
            ...(pitch.video_url && {
                videos: [
                    {
                        url: pitch.video_url, // Direct video URL
                        type: "video/mp4",
                        width: 1920,
                        height: 1080,
                    }
                ]
            })
        },
        twitter: {
            card: pitch.video_url ? "player" : "summary_large_image",
            title,
            description,
            images: [ogImage],
            ...(pitch.video_url && {
                players: [
                    {
                        playerUrl: pitch.video_url,
                        streamUrl: pitch.video_url,
                        width: 1920,
                        height: 1080,
                    }
                ]
            })
        }
    }
}

export default async function PublicPitchPage({ params }: PublicPitchPageProps) {
    const { username, slug } = await params
    const { profile, pitch } = await getStoredPitch(username, slug)

    if (!profile || !pitch) {
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
                        videoThumbnailUrl={pitch.video_thumbnail_url || null}

                        // Specific type casts from PitchPreviewCardProps to avoid 'any'
                        portfolio={(pitch.portfolio as PitchPreviewCardProps["portfolio"]) || []}
                        techStack={(pitch.tech_stack as PitchPreviewCardProps["techStack"]) || []}
                        workExperience={(pitch.work_experience as PitchPreviewCardProps["workExperience"]) || []}
                        contact={{
                            email: pitch.email || "",
                            calendly_link: pitch.calendly_link || undefined // Fix null vs undefined
                        }}
                        socialLinks={(pitch.social_links as PitchPreviewCardProps["socialLinks"]) || []}
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
