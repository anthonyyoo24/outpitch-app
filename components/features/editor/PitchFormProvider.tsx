"use client"

import React, { useEffect } from "react"
import { useForm, FormProvider, DefaultValues } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { pitchSchema, PitchFormValues } from "./schema"
import { updatePitch } from "@/app/dashboard/editor/actions"
import { useDebounce } from "use-debounce"

interface PitchFormProviderProps {
    children: React.ReactNode
    defaultValues: DefaultValues<PitchFormValues>
    pitchId: string
}

export function PitchFormProvider({ children, defaultValues, pitchId }: PitchFormProviderProps) {
    const methods = useForm<PitchFormValues>({
        resolver: zodResolver(pitchSchema) as any,
        defaultValues,
        mode: "onChange",
    })

    const { watch } = methods
    const values = watch()
    const [debouncedValues] = useDebounce(values, 1000)

    const lastSavedRef = React.useRef<string>(JSON.stringify(defaultValues))

    useEffect(() => {
        const save = async () => {
            // Only save if data has actually changed from what we last saved
            const currentString = JSON.stringify(debouncedValues)
            if (currentString === lastSavedRef.current) {
                return
            }

            if (methods.formState.isDirty) {
                try {
                    await updatePitch(pitchId, debouncedValues)
                    console.log("Auto-saved")
                    lastSavedRef.current = currentString
                } catch (error) {
                    console.error("Auto-save failed:", error)
                }
            }
        }
        if (debouncedValues) save()
    }, [debouncedValues, pitchId, methods.formState.isDirty])

    return (
        <FormProvider {...methods}>
            <form onSubmit={(e) => e.preventDefault()} className="h-full flex flex-col">
                {children}
            </form>
        </FormProvider>
    )
}
