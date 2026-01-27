'use server'

import { z } from 'zod'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(1),
})

export type LoginState = {
    errors?: {
        email?: string[]
        password?: string[]
    }
    message?: string | null
    values?: {
        email?: string
    }
}

export async function login(prevState: LoginState, formData: FormData): Promise<LoginState> {
    const data = Object.fromEntries(formData)
    const emailStr = data.email as string
    const parsed = loginSchema.safeParse(data)

    if (!parsed.success) {
        return {
            errors: parsed.error.flatten().fieldErrors,
            message: null,
            values: { email: emailStr },
        }
    }

    const supabase = await createClient()
    const { error } = await supabase.auth.signInWithPassword({
        email: parsed.data.email,
        password: parsed.data.password,
    })

    if (error) {
        return {
            message: error.message,
            errors: {},
            values: { email: emailStr },
        }
    }

    redirect('/dashboard')
}
