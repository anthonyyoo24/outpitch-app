import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { EmptyState } from "@/components/features/dashboard/EmptyState"
import { PitchEditorLayout } from "@/components/features/editor/PitchEditorLayout"

import { getPitch } from "@/app/dashboard/editor/actions"

export default async function DashboardPage({ searchParams }: { searchParams: Promise<{ pitchId?: string }> }) {
    const params = await searchParams

    if (params.pitchId) {
        const initialData = await getPitch(params.pitchId)

        if (!initialData) {
            throw new Error("Pitch not found")
        }

        return <PitchEditorLayout pitchId={params.pitchId} initialData={initialData} />
    }

    const supabase = await createClient()

    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        redirect("/login")
    }

    const { data: latestPitch } = await supabase
        .from('pitches')
        .select('id')
        .eq('user_id', user.id)
        .order('updated_at', { ascending: false })
        .limit(1)
        .single()

    if (latestPitch) {
        redirect(`/dashboard?pitchId=${latestPitch.id}`)
    }

    return <EmptyState />
}
