"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"
import { z } from "zod"

const CreatePitchSchema = z.object({
    companyName: z.string().trim().min(1, "Company name is required"),
    roleTitle: z.string().trim().min(1, "Role title is required"),
})

const DeletePitchSchema = z.string().uuid("Invalid pitch ID format")

// Better implementation for direct redirect
export async function createPitchAction(formData: FormData) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) throw new Error("Unauthorized")

    const parseResult = CreatePitchSchema.safeParse({
        companyName: formData.get("companyName"),
        roleTitle: formData.get("roleTitle"),
    })

    if (!parseResult.success) {
        return { error: parseResult.error.issues[0].message }
    }

    const { companyName, roleTitle } = parseResult.data

    const { data, error } = await supabase.from('pitches').insert({
        user_id: user.id,
        company_name: companyName,
        role_title: roleTitle,
        status: 'draft',
        email: '',
        header_content: '',
    }).select('id').single()

    if (error) {
        return { error: error.message }
    }

    revalidatePath('/dashboard')
    return { id: data.id }
}

export async function deletePitchAction(pitchId: string) {
    const parseResult = DeletePitchSchema.safeParse(pitchId)
    if (!parseResult.success) {
        return { error: parseResult.error.issues[0].message }
    }

    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) throw new Error("Unauthorized")

    const { error } = await supabase
        .from('pitches')
        .delete()
        .eq('id', pitchId)
        .eq('user_id', user.id) // Ensure users can only delete their own pitches
        .select('id')
        .single()

    if (error) {
        // PostgREST returns code PGRST116 when no rows correspond to .single()
        if (error.code === 'PGRST116') {
            return { error: "Pitch not found or you do not have permission to delete it." }
        }
        return { error: error.message }
    }

    revalidatePath('/dashboard')
    return { success: true }
}
