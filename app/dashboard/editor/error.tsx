"use client"

import { DashboardError } from "@/components/features/dashboard/DashboardError"
import { useEffect } from "react"

export default function EditorError({
    error
}: {
    error: Error & { digest?: string }
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error)
    }, [error])

    return <DashboardError message={error.message || "We encountered an error while loading the pitch."} />
}
