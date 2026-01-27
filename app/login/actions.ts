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

/**
 * Server Action to authenticate a user with email and password.
 * Validates inputs using Zod, attempts Supabase sign-in, and handles errors.
 *
 * @param prevState - The previous form state, including errors and submitted values.
 * @param formData - The raw form data submitted by the client.
 * @returns The new state containing success status, validation errors, or auth failures.
 */
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
        // Log actual error for debugging
        console.error('Login error:', error.message)

        return {
            message: 'Invalid email or password. Please try again.',
            errors: {},
            values: { email: emailStr },
        }
    }

    redirect('/dashboard')
}
