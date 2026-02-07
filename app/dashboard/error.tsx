"use client"

import { useEffect, useTransition } from "react"
import { Button } from "@/components/ui/button"
import { AlertCircle, RotateCw } from "lucide-react"

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    const [isPending, startTransition] = useTransition()

    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error)
    }, [error])

    const handleReset = () => {
        startTransition(() => {
            reset()
        })
    }

    return (
        <div className="flex h-full w-full flex-col items-center justify-center space-y-4 p-8">
            <div className="rounded-full bg-red-100 p-3">
                <AlertCircle className="h-6 w-6 text-red-600" />
            </div>
            <h2 className="text-xl font-semibold text-neutral-900">Something went wrong</h2>
            <p className="text-center text-neutral-500 max-w-sm">
                We encountered an error while loading this page. Please try refreshing or reloading the content.
            </p>
            <div className="flex gap-2">
                <Button onClick={handleReset} variant="default" isLoading={isPending}>
                    Try again
                </Button>
                <Button onClick={() => window.location.href = '/dashboard'} variant="outline">
                    Back to Dashboard
                </Button>
            </div>
        </div>
    )
}
