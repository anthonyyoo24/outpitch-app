'use client'

import { useActionState } from 'react'
import { ArrowRight, Loader2 } from 'lucide-react'
import { login, type LoginState } from '@/app/login/actions'
import { GoogleAuthButton } from './GoogleAuthButton'
import { EmailInput } from './EmailInput'
import { PasswordInput } from './PasswordInput'

const initialState: LoginState = {
    message: null,
    errors: {},
}

export function LoginForm() {
    const [state, formAction, isPending] = useActionState(login, initialState)

    return (
        <>
            <form noValidate className="space-y-4" action={formAction}>
                {/* Global Error Message */}
                {state?.message && (
                    <div className="p-3 text-xs text-red-500 bg-red-50 border border-red-100 rounded-lg">
                        {state.message}
                    </div>
                )}

                <EmailInput error={state?.errors?.email?.[0]} />
                <PasswordInput error={state?.errors?.password?.[0]} />

                {/* Actions */}
                <div className="pt-2">
                    <button
                        type="submit"
                        disabled={isPending}
                        className="w-full cursor-pointer bg-neutral-900 hover:bg-neutral-800 text-white text-sm font-medium py-2.5 rounded-lg shadow-sm hover:shadow-md transition-all active:scale-[0.99] flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {isPending ? (
                            <Loader2 className="animate-spin" width={18} height={18} />
                        ) : (
                            <>
                                Sign in
                                <ArrowRight width={18} height={18} />
                            </>
                        )}
                    </button>
                </div>

                {/* Divider */}
                <div className="relative py-2">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-neutral-200"></div>
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-white px-2 text-neutral-400 font-medium tracking-wider">
                            Or continue with
                        </span>
                    </div>
                </div>

                {/* Social Buttons */}
                <div className="grid gap-3 grid-cols-1">
                    <GoogleAuthButton />
                </div>
            </form>
        </>
    )
}
