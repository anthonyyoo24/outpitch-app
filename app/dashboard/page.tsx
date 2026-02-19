import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { EmptyState } from "@/components/features/dashboard/EmptyState"
import { PitchEditorLayout } from "@/components/features/editor/PitchEditorLayout"
import { DashboardError } from "@/components/features/dashboard/DashboardError"

import { getPitch } from "@/app/dashboard/editor/actions"

export default async function DashboardPage({ searchParams }: { searchParams: Promise<{ pitchId?: string }> }) {
    const params = await searchParams

    // 1. Auth Check FIRST
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        redirect("/login")
    }

    // 2. Handle specific pitch with Error Boundary
    if (params.pitchId) {
        let initialData

        try {
            initialData = await getPitch(params.pitchId)
        } catch (error) {
            console.error("Error fetching pitch:", error)
        }

        if (!initialData) {
            return <DashboardError />
        }

        return <PitchEditorLayout key={params.pitchId} pitchId={params.pitchId} initialData={initialData} />
    }

    // 3. Default Dashboard View (Latest pitch or Empty state)
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
