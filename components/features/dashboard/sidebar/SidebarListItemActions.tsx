"use client"

import { useState, useTransition } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { toast } from "sonner"
import {
    MoreVertical,
    Pencil,
    Copy,
    Share2,
    EyeOff,
    Trash2,
} from "lucide-react"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ConfirmDeleteDialog } from "@/components/ui/ConfirmDeleteDialog"
import { deletePitchAction } from "@/app/dashboard/actions"

interface SidebarListItemActionsProps {
    pitchId: string
    companyName: string
}

export function SidebarListItemActions({ pitchId, companyName }: SidebarListItemActionsProps) {
    const [open, setOpen] = useState(false)
    const [isPending, startTransition] = useTransition()
    const router = useRouter()
    const searchParams = useSearchParams()

    const handleDelete = () => {
        const currentPitchId = searchParams.get("pitchId")
        const isCurrentPitch = currentPitchId === pitchId

        startTransition(async () => {
            try {
                const result = await deletePitchAction(pitchId)

                if (result?.error) {
                    toast.error("Failed to delete pitch")
                } else {
                    toast.success("Pitch deleted")
                    setOpen(false)

                    if (isCurrentPitch) {
                        router.push("/dashboard")
                    }
                }
            } catch (error) {
                console.error("Failed to delete pitch", error)
                toast.error("Failed to delete pitch")
            }
        })
    }

    return (
        <>
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
                </DropdownMenuContent>
            </DropdownMenu>

            <ConfirmDeleteDialog
                open={open}
                onOpenChange={setOpen}
                onConfirm={handleDelete}
                isPending={isPending}
                description={
                    <>
                        This action cannot be undone. This will permanently delete your pitch for
                        <span className="font-medium text-neutral-900"> {companyName}</span>.
                    </>
                }
            />
        </>
    )
}
