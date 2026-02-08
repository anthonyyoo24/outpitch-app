"use client"

import { useTransition } from "react"
import { Button } from "@/components/ui/button"
import { AlertCircle } from "lucide-react"
import { useRouter } from "next/navigation"

interface DashboardErrorProps {
    message?: string
}

export function DashboardError({ message = "We encountered an error while loading this page." }: DashboardErrorProps) {
    const router = useRouter()
    const [isRetrying, startRetrying] = useTransition()
    const [isNavigating, startNavigating] = useTransition()

    const handleRetry = () => {
        startRetrying(() => {
            router.refresh()
        })
    }

    const handleDashboard = () => {
        startNavigating(() => {
            router.refresh()
            router.push('/dashboard')
        })
    }

    return (
        <div className="flex h-full w-full flex-col items-center justify-center space-y-4 p-8">
            <div className="rounded-full bg-red-100 p-3">
                <AlertCircle className="h-6 w-6 text-red-600" />
            </div>
            <h2 className="text-xl font-semibold text-neutral-900">Something went wrong</h2>
            <p className="text-center text-neutral-500 max-w-sm">
                {message} Please try refreshing or reloading the content.
            </p>
            <div className="flex gap-2">
                <Button onClick={handleRetry} variant="default" isLoading={isRetrying}>
                    Try again
                </Button>
                <Button onClick={handleDashboard} variant="outline" isLoading={isNavigating}>
                    Back to Dashboard
                </Button>
            </div>
        </div>
    )
}
