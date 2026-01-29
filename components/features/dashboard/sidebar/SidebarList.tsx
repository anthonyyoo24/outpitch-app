import { createClient } from "@/lib/supabase/server"
import { SidebarListItem } from "./SidebarListItem"
import { SidebarListEmptyState } from "./SidebarListEmptyState"
import { SidebarError } from "./SidebarError"

export async function SidebarList() {
    const supabase = await createClient()

    const { data: pitches, error } = await supabase
        .from("pitches")
        .select("id, company_name, role_title, status, created_at")
        .order("created_at", { ascending: false })

    if (error) {
        console.error("Failed to load pitches", error)
        return <SidebarError />
    }

    const hasPitches = pitches && pitches.length > 0

    return (
        <div className="custom-scrollbar flex flex-1 flex-col space-y-1 overflow-y-auto p-2">
            {!hasPitches ? (
                <SidebarListEmptyState />
            ) : (
                pitches.map((pitch) => (
                    <SidebarListItem key={pitch.id} pitch={pitch} />
                ))
            )}
        </div>
    )
}
