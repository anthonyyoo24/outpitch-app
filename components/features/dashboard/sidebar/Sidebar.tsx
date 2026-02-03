import { Suspense } from "react"
import { SidebarHeader } from "./SidebarHeader"
import { SidebarSearch } from "./SidebarSearch"
import { SidebarList } from "./SidebarList"
import { SidebarFooter } from "./SidebarFooter"
import { SidebarListSkeleton } from "./SidebarListSkeleton"

export async function Sidebar() {
    return (
        <aside className="z-20 hidden w-full max-w-70 flex-col border-r border-neutral-200 bg-white sm:flex lg:max-w-80">
            <SidebarHeader />
            <SidebarSearch />
            <Suspense fallback={<SidebarListSkeleton />}>
                <SidebarList />
            </Suspense>
            <SidebarFooter />
        </aside>
    )
}
