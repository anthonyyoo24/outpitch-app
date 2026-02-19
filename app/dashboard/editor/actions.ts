"use server"

import { createClient } from "@/lib/supabase/server"
import { PitchFormValues, pitchSchema, publishSchema } from "@/lib/schemas/pitch"
import { sanitizeHtml } from "@/lib/sanitize"
import { slugify } from "@/lib/slug"


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
        video_type: (data.video_type as "upload" | "youtube" | "loom" | null) || null,

        resume_url: data.resume_url || "",
        status: data.status || "draft",
        slug: data.slug || null,

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
    // 1. Validate pitchId
    const idValidation = pitchSchema.shape.id.safeParse(pitchId)
    if (!idValidation.success) {
        throw new Error("Invalid pitch ID")
    }

    // 2. Validate and Parse input values
    const validation = pitchSchema.safeParse(values)

    if (!validation.success) {
        // Log the error for debugging purposes (optional)
        console.error("Validation error:", validation.error)
        // Return a user-friendly error message
        const errorMessage = validation.error.issues.map(i => `${i.path.join('.')}: ${i.message}`).join(', ')
        throw new Error(`Invalid pitch data: ${errorMessage}`)
    }

    const parsedValues = validation.data

    const supabase = await createClient()

    // Check if user owns the pitch (RLS should handle this, but good to be safe/explicit if needed)
    // For now rely on RLS.

    const { error } = await supabase
        .from("pitches")
        .update({
            // Use parsedValues to ensure we use exactly what was validated
            company_name: parsedValues.company_name,
            role_title: parsedValues.role_title,
            bio: parsedValues.bio,
            video_url: parsedValues.video_url,
            video_type: parsedValues.video_type,
            resume_url: parsedValues.resume_url,

            // Map Contact object back to DB fields
            calendly_link: parsedValues.contact.calendly_link,
            email: parsedValues.contact.email, // New Column

            header_content: sanitizeHtml(parsedValues.header_content), // Sanitize to prevent XSS
            tech_stack: parsedValues.tech_stack,
            work_experience: parsedValues.work_experience,
            portfolio: parsedValues.portfolio,

            // Save remaining socials to JSON
            // We can cleanup 'email' from JSON if we want, or overwrite it to keep in sync.
            // Let's just save the new socials structure.
            social_links: parsedValues.social_links,

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

    // 4. Generate Slug if first time publishing (or if missing)
    let slug = currentPitch.slug
    if (!slug) {
        slug = slugify(`${currentPitch.company_name}-${currentPitch.role_title}`)
    }

    const { error } = await supabase
        .from("pitches")
        .update({
            status: "published",
            published_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            slug: slug // Save the generated slug
        })
        .eq("id", pitchId)

    if (error) {
        throw new Error(error.message)
    }

    return { success: true, slug }
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
