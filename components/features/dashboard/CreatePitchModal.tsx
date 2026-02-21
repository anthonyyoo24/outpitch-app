"use client"

import { useState, useTransition, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useUIStore } from "@/lib/store/ui-store"
import { createPitchAction } from "@/app/dashboard/actions"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/Dialog"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Label } from "@/components/ui/Label"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"

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
                if (result?.error) {
                    toast.error(result.error)
                    return
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
                            disabled={isPending || !companyName.trim() || !roleTitle.trim()}
                        >
                            {isPending ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
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
