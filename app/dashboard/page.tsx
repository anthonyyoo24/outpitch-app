import { EmptyState } from "@/components/features/dashboard/EmptyState"
import { PitchEditorLayout } from "@/components/features/editor/PitchEditorLayout"

export default async function DashboardPage({ searchParams }: { searchParams: Promise<{ pitchId?: string }> }) {
    const params = await searchParams
    if (params.pitchId) {
        return <PitchEditorLayout pitchId={params.pitchId} />
    }
    return <EmptyState />
}
