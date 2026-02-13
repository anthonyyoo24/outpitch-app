"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/Button"
import { AlertCircle, RefreshCw } from "lucide-react"
import { useTransition } from "react"

export function SidebarError() {
    const router = useRouter()
    const [isPending, startTransition] = useTransition()

    const handleRetry = () => {
        startTransition(() => {
            router.refresh()
        })
    }

    return (
        <div className="flex flex-1 flex-col items-center justify-center p-4 text-center">
            <div className="mb-2 rounded-full bg-red-50 p-3">
                <AlertCircle className="h-5 w-5 text-red-600" />
            </div>
            <h3 className="mb-4 text-sm font-medium text-neutral-900">
                Failed to load pitches
            </h3>
            <Button
                variant="outline"
                size="sm"
                className="h-8 gap-2 text-xs"
                onClick={handleRetry}
                disabled={isPending}
            >
                <RefreshCw className={`h-3.5 w-3.5 ${isPending ? 'animate-spin' : ''}`} />
                {isPending ? 'Retrying...' : 'Try again'}
            </Button>
        </div>
    )
}
