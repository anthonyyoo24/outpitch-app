"use client"

import { useState, useTransition, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useUIStore } from "@/lib/store/ui-store"
import { createPitchAction } from "@/app/dashboard/actions"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"

export function CreatePitchModal() {
    const router = useRouter()
    const { isCreatePitchModalOpen, setCreatePitchModalOpen } = useUIStore()
    const [isPending, startTransition] = useTransition()

    // Local state for basic form values to disable submit if empty
    const [companyName, setCompanyName] = useState("")
    const [roleTitle, setRoleTitle] = useState("")

    useEffect(() => {
        if (!isCreatePitchModalOpen) {
            // Wait for the closing animation to finish before resetting
            const timer = setTimeout(() => {
                setCompanyName("")
                setRoleTitle("")
            }, 300)
            return () => clearTimeout(timer)
        }
    }, [isCreatePitchModalOpen])

    async function handleSubmit(formData: FormData) {
        startTransition(async () => {
            try {
                const result = await createPitchAction(formData)
                if (result.error) {
                    throw new Error(result.error)
                }

                setCreatePitchModalOpen(false)
                router.push(`/dashboard?pitchId=${result.id}`)
                toast.success("Pitch created!")
            } catch (error) {
                console.error(error)
                toast.error("Failed to create pitch. Please try again.")
            }
        })
    }

    return (
        <Dialog open={isCreatePitchModalOpen} onOpenChange={setCreatePitchModalOpen}>
            <DialogContent className="sm:max-w-100">
                <DialogHeader>
                    <DialogTitle>Create new pitch</DialogTitle>
                </DialogHeader>
                <form action={handleSubmit} className="space-y-4 pt-2">
                    <div className="space-y-2">
                        <Label htmlFor="companyName">Company Name</Label>
                        <Input
                            id="companyName"
                            name="companyName"
                            placeholder="e.g. Acme Corp"
                            value={companyName}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCompanyName(e.target.value)}
                            required
                            minLength={2}
                            maxLength={50}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="roleTitle">Role Title</Label>
                        <Input
                            id="roleTitle"
                            name="roleTitle"
                            placeholder="e.g. Product Designer"
                            value={roleTitle}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRoleTitle(e.target.value)}
                            required
                            minLength={2}
                            maxLength={60}
                        />
                    </div>
                    <div className="flex gap-3 pt-2">
                        <Button
                            type="button"
                            variant="outline"
                            className="flex-1"
                            onClick={() => setCreatePitchModalOpen(false)}
                            disabled={isPending}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            className="flex-1"
                            disabled={isPending || !companyName || !roleTitle}
                        >
                            {isPending ? (
                                <svg
                                    className="h-4 w-4 animate-spin"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                    ></circle>
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                    ></path>
                                </svg>
                            ) : (
                                "Create Pitch"
                            )}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog >
    )
}
