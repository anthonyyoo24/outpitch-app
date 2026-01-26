'use client'

import { GridBackground } from '@/components/ui/GridBackground'
import { AuthCard } from '@/components/ui/AuthCard'
import { LoginForm } from '@/components/features/auth/LoginForm'

export default function LoginPage() {
    return (
        <div className="h-screen w-full bg-white text-neutral-900 antialiased selection:bg-neutral-900 selection:text-white overflow-hidden relative flex flex-col items-center justify-center font-sans">
            <GridBackground />

            {/* Login Container */}
            <main className="w-full max-w-[400px] z-10 p-4 animate-in fade-in slide-in-from-bottom-4 duration-1000">
                {/* Logo Area */}
                <div className="flex justify-center mb-8">
                    <div className="w-10 h-10 bg-neutral-900 rounded-xl flex items-center justify-center text-white shadow-lg shadow-neutral-900/20">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                            <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                            <line x1="12" y1="22.08" x2="12" y2="12"></line>
                        </svg>
                    </div>
                </div>

                <AuthCard>
                    <div className="text-center mb-6">
                        <h1 className="text-xl font-semibold tracking-tight text-neutral-900">
                            Welcome back
                        </h1>
                        <p className="text-sm text-neutral-500 mt-2">
                            Enter your email to access your workspace
                        </p>
                    </div>

                    <LoginForm />
                </AuthCard>

                {/* Footer */}
                <p className="text-center text-xs text-neutral-500 mt-8">
                    Don&apos;t have an account?{' '}
                    <a
                        href="#"
                        className="font-medium text-neutral-900 hover:underline decoration-neutral-300 underline-offset-4"
                    >
                        Create one now
                    </a>
                </p>
            </main>

            {/* Bottom Links */}
            <div className="absolute bottom-6 flex gap-6 text-[10px] text-neutral-400 font-medium">
                <a href="#" className="hover:text-neutral-600 transition-colors">
                    Terms
                </a>
                <a href="#" className="hover:text-neutral-600 transition-colors">
                    Privacy
                </a>
                <a href="#" className="hover:text-neutral-600 transition-colors">
                    Help
                </a>
            </div>
        </div>
    )
}
