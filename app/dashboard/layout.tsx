import { ReactNode } from "react"
import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { Sidebar } from "@/components/features/dashboard/sidebar/Sidebar"
import { CreatePitchModal } from "@/components/features/dashboard/CreatePitchModal"
import { GridBackground } from "@/components/ui/GridBackground"

export default async function DashboardLayout({ children }: { children: ReactNode }) {
    const supabase = await createClient()

    const {
        data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
        return redirect("/login")
    }

    return (
        <div className="flex h-screen w-full overflow-hidden bg-white text-neutral-900 antialiased selection:bg-neutral-900 selection:text-white">
            <Sidebar />
            <CreatePitchModal />
            <main className="flex-1 relative overflow-hidden bg-[#FAFAFA]">
                <GridBackground />
                {children}
            </main>
        </div>
    )
}
