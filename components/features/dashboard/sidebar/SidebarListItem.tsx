"use client"

import Link from "next/link"
import { formatDistanceToNow } from "date-fns"
import { useSearchParams } from "next/navigation"
import { Tables } from "@/lib/supabase/database.types"
import { CompanyLogo } from "@/components/ui/CompanyLogo"
import { SidebarListItemActions } from "./SidebarListItemActions"

interface SidebarListItemProps {
    pitch: Pick<Tables<"pitches">, "id" | "company_name" | "role_title" | "status" | "updated_at">
}

export function SidebarListItem({ pitch }: SidebarListItemProps) {
    const searchParams = useSearchParams()
    const currentPitchId = searchParams.get("pitchId")
    const isCurrentPitch = currentPitchId === pitch.id

    const displayStatus = pitch.status
    const displayDate = new Date(pitch.updated_at)

    return (
        <div className="relative">
            <Link
                href={`/dashboard?pitchId=${pitch.id}`}
                className={`group flex cursor-pointer items-center gap-3 rounded-xl border p-3 shadow-sm transition-all ${isCurrentPitch
                    ? "border-transparent bg-neutral-100 hover:border-neutral-200/60 hover:bg-neutral-50"
                    : "border-transparent bg-white hover:border-neutral-200/60 hover:bg-neutral-100"
                    }`}
            >
                <CompanyLogo
                    name={pitch.company_name}
                    className="h-12 w-12"
                />
                <div className="flex min-w-0 flex-1 flex-col justify-center">
                    <div className="mb-0.5 flex items-start justify-between pr-6">
                        <h3 className="text-sm font-semibold leading-none text-neutral-900 group-hover:text-black">
                            {pitch.company_name}
                        </h3>
                    </div>
                    <p className="mb-1 truncate text-xs font-medium text-neutral-900 group-hover:text-neutral-700">
                        {pitch.role_title}
                    </p>
                    <div className="flex items-center">
                        <div className="flex items-center gap-1.5">
                            <span
                                className={`h-1.5 w-1.5 rounded-full ${displayStatus === "published"
                                    ? "bg-emerald-500"
                                    : displayStatus === "draft"
                                        ? "bg-amber-500"
                                        : "bg-neutral-300"
                                    }`}
                            ></span>
                            <span className="text-[10px] font-medium text-neutral-700 capitalize">
                                {displayStatus}
                            </span>
                        </div>
                        <span className="mx-1.5 text-[10px] text-neutral-400">|</span>
                        <span className="text-[10px] font-normal text-neutral-500">
                            Updated {formatDistanceToNow(displayDate, { addSuffix: true })}
                        </span>
                    </div>
                </div>
            </Link>

            <SidebarListItemActions
                pitchId={pitch.id}
                companyName={pitch.company_name}
            />
        </div>
    )
}
