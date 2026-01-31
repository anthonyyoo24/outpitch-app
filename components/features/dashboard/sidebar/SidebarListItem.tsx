"use client"

import Link from "next/link"
import { formatDistanceToNow } from "date-fns"
import { useTransition, useState } from "react"
import { toast } from "sonner"
import { useRouter, useSearchParams } from "next/navigation"
import { deletePitchAction } from "@/app/dashboard/actions"
import { Tables } from "@/lib/supabase/database.types"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { CompanyLogo } from "@/components/ui/CompanyLogo"
import {
    MoreVertical,
    Pencil,
    Copy,
    Share2,
    EyeOff,
    Trash2,
    Loader2
} from "lucide-react"

interface SidebarListItemProps {
    pitch: Pick<Tables<"pitches">, "id" | "company_name" | "role_title" | "status" | "updated_at">
}

export function SidebarListItem({ pitch }: SidebarListItemProps) {
    const [open, setOpen] = useState(false)
    const [isPending, startTransition] = useTransition()
    const router = useRouter()
    const searchParams = useSearchParams()
    const currentPitchId = searchParams.get("pitchId")
    const isCurrentPitch = currentPitchId === pitch.id

    const handleDelete = async () => {
        try {
            // Optimistic UI update could go here, but for now we rely on server revalidation
            const result = await deletePitchAction(pitch.id)

            if (result?.error) {
                toast.error("Failed to delete pitch")
            } else {
                toast.success("Pitch deleted")
                setOpen(false)

                // Correctly handle navigation if the deleted pitch was active
                if (isCurrentPitch) {
                    router.push("/dashboard")
                }
            }
        } catch (error) {
            console.error("Failed to delete pitch", error)
            toast.error("Failed to delete pitch")
        }
    }

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

            <AlertDialog open={open} onOpenChange={setOpen}>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <button
                            aria-label="Open pitch actions"
                            aria-haspopup="menu"
                            className="absolute top-2 right-2 z-10 rounded-md p-1 text-neutral-500 transition-all hover:bg-neutral-200/50 hover:text-neutral-900 focus:outline-none opacity-100 cursor-pointer"
                        >
                            <MoreVertical className="h-5 w-5" />
                        </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-[140px] rounded-lg border-neutral-200 p-1 shadow-lg">
                        <DropdownMenuItem className="gap-2 rounded-md px-2 py-1.5 text-xs font-medium text-neutral-500 transition-colors hover:bg-neutral-50 hover:text-neutral-900 focus:bg-neutral-50 focus:text-neutral-900 cursor-pointer">
                            <Pencil className="h-3.5 w-3.5" />
                            <span>Edit</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-2 rounded-md px-2 py-1.5 text-xs font-medium text-neutral-500 transition-colors hover:bg-neutral-50 hover:text-neutral-900 focus:bg-neutral-50 focus:text-neutral-900 cursor-pointer">
                            <Copy className="h-3.5 w-3.5" />
                            <span>Duplicate</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-2 rounded-md px-2 py-1.5 text-xs font-medium text-neutral-500 transition-colors hover:bg-neutral-50 hover:text-neutral-900 focus:bg-neutral-50 focus:text-neutral-900 cursor-pointer">
                            <Share2 className="h-3.5 w-3.5" />
                            <span>Share Link</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-2 rounded-md px-2 py-1.5 text-xs font-medium text-neutral-500 transition-colors hover:bg-neutral-50 hover:text-neutral-900 focus:bg-neutral-50 focus:text-neutral-900 cursor-pointer">
                            <EyeOff className="h-3.5 w-3.5" />
                            <span>Unpublish</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator className="my-0.5 bg-neutral-100" />

                        <AlertDialogTrigger asChild>
                            <DropdownMenuItem
                                variant="destructive"
                                className="gap-2 rounded-md px-2 py-1.5 text-xs font-medium cursor-pointer"
                                onSelect={(e) => {
                                    e.preventDefault()
                                    setOpen(true)
                                }}
                            >
                                <Trash2 className="h-3.5 w-3.5 text-inherit" />
                                <span>Delete</span>
                            </DropdownMenuItem>
                        </AlertDialogTrigger>
                    </DropdownMenuContent>
                </DropdownMenu>

                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete your pitch for
                            <span className="font-medium text-neutral-900"> {pitch.company_name}</span>.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            disabled={isPending}
                            onClick={(e) => {
                                e.preventDefault()
                                startTransition(async () => {
                                    await handleDelete()
                                })
                            }}
                            className="bg-red-600 hover:bg-red-700 min-w-[80px] flex justify-center items-center"
                        >
                            {isPending ? (
                                <Loader2 className="h-4 w-4 animate-spin text-white" />
                            ) : (
                                "Delete"
                            )}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}
