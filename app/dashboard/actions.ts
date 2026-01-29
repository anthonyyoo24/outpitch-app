"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

// Better implementation for direct redirect
export async function createPitchAction(formData: FormData) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) throw new Error("Unauthorized")

    const { data, error } = await supabase.from('pitches').insert({
        user_id: user.id,
        company_name: formData.get("companyName") as string,
        role_title: formData.get("roleTitle") as string,
        status: 'draft'
    }).select('id').single()

    if (error) {
        return { error: error.message }
    }

    revalidatePath('/dashboard')
    return { id: data.id }
}

export async function deletePitchAction(pitchId: string) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) throw new Error("Unauthorized")

    const { error } = await supabase
        .from('pitches')
        .delete()
        .eq('id', pitchId)
        .eq('user_id', user.id) // Ensure users can only delete their own pitches

    if (error) {
        return { error: error.message }
    }

    revalidatePath('/dashboard')
    return { success: true }
}
