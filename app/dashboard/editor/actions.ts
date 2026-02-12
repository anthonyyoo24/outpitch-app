"use server"

import { createClient } from "@/lib/supabase/server"
import { PitchFormValues, pitchSchema } from "@/components/features/editor/schema"

export async function getPitch(pitchId: string) {
    const validation = pitchSchema.shape.id.safeParse(pitchId)

    if (!validation.success) {
        return null
    }

    const supabase = await createClient()

    const { data, error } = await supabase
        .from("pitches")
        .select("*")
        .eq("id", pitchId)
        .single()

    if (error) {
        throw new Error(error.message)
    }

    // Map DB fields to Form Schema
    // Note: JSONB fields come back as objects, so we cast them.
    // Ensure fallback values for arrays if null

    // DB Column "email" exists now. 
    // social_links jsonb column still holds other socials.
    const socialLinks = (data.social_links || {}) as any

    return {
        id: data.id,
        user_id: data.user_id,
        company_name: data.company_name || "",
        role_title: data.role_title || "",
        bio: data.bio || "",
        video_url: data.video_url || "",
        resume_url: data.resume_url || "",

        // New structure: Contact object
        contact: {
            email: (data as any).email || socialLinks.email || "", // Fallback to JSON if column empty (migration period)
            calendly_link: data.calendly_link || "",
        },

        header_content: (data as any).header_content || "",
        tech_stack: data.tech_stack || [],
        work_experience: ((data.work_experience as any[]) || []).map((item: any) => ({
            role: item.role || "",
            company: item.company || "",
            start_month: item.start_month || "",
            start_year: item.start_year || "",
            end_month: item.end_month || "",
            end_year: item.end_year || "",
            is_current: item.is_current || false,
            description: item.description || "",
        })),
        portfolio: data.portfolio || [],

        // Social Links (email removed from here in UI)
        social_links: {
            linkedin: socialLinks.linkedin || "",
            website: socialLinks.website || "",
            twitter: socialLinks.twitter || "",
            github: socialLinks.github || "",
            instagram: socialLinks.instagram || "",
            tiktok: socialLinks.tiktok || "",
        }
    } as PitchFormValues
}

export async function updatePitch(pitchId: string, values: PitchFormValues) {
    const supabase = await createClient()

    // Check if user owns the pitch (RLS should handle this, but good to be safe/explicit if needed)
    // For now rely on RLS.

    const { error } = await supabase
        .from("pitches")
        .update({
            company_name: values.company_name,
            role_title: values.role_title,
            bio: values.bio,
            video_url: values.video_url,
            resume_url: values.resume_url,

            // Map Contact object back to DB fields
            calendly_link: values.contact.calendly_link,
            email: values.contact.email, // New Column

            header_content: values.header_content, // Requires column to exist
            tech_stack: values.tech_stack,
            work_experience: values.work_experience,
            portfolio: values.portfolio,

            // Save remaining socials to JSON
            // We can cleanup 'email' from JSON if we want, or overwrite it to keep in sync.
            // Let's just save the new socials structure.
            social_links: values.social_links,

            updated_at: new Date().toISOString()
        })
        .eq("id", pitchId)

    if (error) {
        throw new Error(error.message)
    }

    return { success: true }
}

export async function publishPitch(pitchId: string) {
    const supabase = await createClient()

    const { error } = await supabase
        .from("pitches")
        .update({
            status: "published",
            published_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
        })
        .eq("id", pitchId)

    if (error) {
        throw new Error(error.message)
    }

    return { success: true }
}

export async function unpublishPitch(pitchId: string) {
    const supabase = await createClient()

    const { error } = await supabase
        .from("pitches")
        .update({
            status: "draft",
            updated_at: new Date().toISOString()
        })
        .eq("id", pitchId)

    if (error) {
        throw new Error(error.message)
    }

    return { success: true }
}
