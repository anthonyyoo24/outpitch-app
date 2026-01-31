import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { EmptyState } from "@/components/features/dashboard/EmptyState"
import { PitchEditorLayout } from "@/components/features/editor/PitchEditorLayout"

export default async function DashboardPage({ searchParams }: { searchParams: Promise<{ pitchId?: string }> }) {
    const params = await searchParams

    if (params.pitchId) {
        return <PitchEditorLayout pitchId={params.pitchId} />
    }

    const supabase = await createClient()
    const { data: latestPitch } = await supabase
        .from('pitches')
        .select('id')
        .order('updated_at', { ascending: false })
        .limit(1)
        .single()

    if (latestPitch) {
        redirect(`/dashboard?pitchId=${latestPitch.id}`)
    }

    return <EmptyState />
}
