"use client"

import { useEffect, useRef } from "react"
import { useFormContext, DefaultValues } from "react-hook-form"
import { useDebounce } from "use-debounce"
import { updatePitch } from "@/app/dashboard/editor/actions"
import { PitchFormValues } from "./schema"

interface AutoSaveProps {
    pitchId: string
    defaultValues: DefaultValues<PitchFormValues>
}

export function AutoSave({ pitchId, defaultValues }: AutoSaveProps) {
    const { watch, formState } = useFormContext<PitchFormValues>()
    // Watch form values - this component will re-render on change, but the parent won't
    const values = watch()
    const [debouncedValues] = useDebounce(values, 1000)

    // Store defaultValues as string for comparison
    const lastSavedRef = useRef<string>(JSON.stringify(defaultValues))

    useEffect(() => {
        const save = async () => {
            // Only save if data has actually changed from what we last saved
            const currentString = JSON.stringify(debouncedValues)
            if (currentString === lastSavedRef.current) {
                return
            }

            // If currentString is different from lastSavedRef, we know the values have changed
            // because of the check above

            try {
                await updatePitch(pitchId, debouncedValues)
                console.log("Auto-saved")
                lastSavedRef.current = currentString
            } catch (error) {
                console.error("Auto-save failed:", error)
            }
        }

        // Save if we have values
        if (debouncedValues) save()

    }, [debouncedValues, pitchId, formState.isDirty])

    return null
}
