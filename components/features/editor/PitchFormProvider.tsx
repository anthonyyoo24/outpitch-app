"use client"

import React from "react"
import { useForm, FormProvider, DefaultValues, Resolver } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { pitchSchema, PitchFormValues } from "./schema"
import { AutoSave } from "./AutoSave"

interface PitchFormProviderProps {
    children: React.ReactNode
    defaultValues: DefaultValues<PitchFormValues>
    pitchId: string
}

export function PitchFormProvider({ children, defaultValues, pitchId }: PitchFormProviderProps) {
    const methods = useForm<PitchFormValues>({
        resolver: zodResolver(pitchSchema) as Resolver<PitchFormValues>,
        defaultValues,
        mode: "onChange",
    })

    return (
        <FormProvider {...methods}>
            <AutoSave pitchId={pitchId} defaultValues={defaultValues} />
            <form onSubmit={(e) => e.preventDefault()} className="h-full flex flex-col">
                {children}
            </form>
        </FormProvider>
    )
}
