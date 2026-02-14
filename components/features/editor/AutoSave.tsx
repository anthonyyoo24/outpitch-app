"use client"

import { useEffect, useRef, useCallback } from "react"
import { useFormContext, DefaultValues } from "react-hook-form"
import { updatePitch } from "@/app/dashboard/editor/actions"
import { PitchFormValues } from "./schema"

interface AutoSaveProps {
    pitchId: string
    defaultValues: DefaultValues<PitchFormValues>
}

export function AutoSave({ pitchId, defaultValues }: AutoSaveProps) {
    const { watch } = useFormContext<PitchFormValues>()

    // Store defaultValues as string for comparison
    const lastSavedRef = useRef<string>(JSON.stringify(defaultValues))
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

    const save = useCallback(async (values: PitchFormValues) => {
        const currentString = JSON.stringify(values)
        if (currentString === lastSavedRef.current) {
            return
        }

        try {
            await updatePitch(pitchId, values)
            console.log("Auto-saved")
            lastSavedRef.current = currentString
        } catch (error) {
            console.error("Auto-save failed:", error)
        }
    }, [pitchId])

    useEffect(() => {
        // Subscribe to form changes via watch callback — runs only inside useEffect (after mount)
        const subscription = watch((values) => {
            // Clear previous timer
            if (timerRef.current) {
                clearTimeout(timerRef.current)
            }

            // Debounce: wait 1s after last change before saving
            timerRef.current = setTimeout(() => {
                save(values as PitchFormValues)
            }, 1000)
        })

        return () => {
            subscription.unsubscribe()
            if (timerRef.current) {
                clearTimeout(timerRef.current)
            }
        }
    }, [watch, save])

    return null
}
