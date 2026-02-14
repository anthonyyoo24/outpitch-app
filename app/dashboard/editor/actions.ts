"use server"

import { createClient } from "@/lib/supabase/server"
import { PitchFormValues, pitchSchema, publishSchema } from "@/components/features/editor/schema"

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

    // 1. Construct the raw object from DB data
    const rawPitch = {
        id: data.id,
        user_id: data.user_id,
        company_name: data.company_name || "",
        role_title: data.role_title || "",
        bio: data.bio || "",
        video_url: data.video_url || "",
        resume_url: data.resume_url || "",
        status: data.status || "draft",

        // New structure: Contact object
        contact: {
            email: data.email || "",
            calendly_link: data.calendly_link || "",
        },

        header_content: data.header_content || "",
        tech_stack: data.tech_stack || [],
        work_experience: data.work_experience ?? [],
        portfolio: data.portfolio || [],
        social_links: data.social_links ?? []
    }

    // 2. Parse it through the schema
    // This throws an error if data is invalid, or returns typed data if valid.
    const parsedPitch = pitchSchema.parse(rawPitch)

    return parsedPitch
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

    // 1. Fetch current data to validate
    const { data: currentPitch, error: fetchError } = await supabase
        .from("pitches")
        .select("*")
        .eq("id", pitchId)
        .single()

    if (fetchError || !currentPitch) {
        throw new Error("Pitch not found")
    }

    // 2. Construct object for validation (similar to getPitch mapping)
    const pitchData = {
        ...currentPitch,
        contact: {
            email: currentPitch.email || "",
            calendly_link: currentPitch.calendly_link || "",
        },
        // Ensure arrays are present
        tech_stack: currentPitch.tech_stack || [],
        work_experience: currentPitch.work_experience ?? [],
        portfolio: currentPitch.portfolio || [],
        social_links: currentPitch.social_links ?? []
    }

    // 3. Strict Validation
    const validation = publishSchema.safeParse(pitchData)

    if (!validation.success) {
        // Collect errors deeply if needed, but for server action just one message is fine
        const errorMessage = validation.error.issues.map(i => `${i.path.join('.')}: ${i.message}`).join(', ')
        throw new Error(`Cannot publish: ${errorMessage}`)
    }

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
