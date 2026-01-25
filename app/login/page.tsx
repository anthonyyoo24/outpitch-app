'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { Mail, Lock, Eye, EyeOff, ArrowRight, Loader2 } from 'lucide-react'
import { toast } from 'sonner'

export default function LoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const router = useRouter()
    const supabase = createClient()

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        })

        if (error) {
            toast.error('Login failed: ' + error.message)
            setLoading(false)
            return
        }

        toast.success('Logged in successfully!')
        router.push('/dashboard')
        router.refresh()
    }

    const handleGoogleLogin = async () => {
        const { error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: `${location.origin}/auth/callback`,
            },
        })

        if (error) {
            toast.error('Google login failed: ' + error.message)
        }
    }

    return (
        <div className="h-screen w-full bg-white text-neutral-900 antialiased selection:bg-neutral-900 selection:text-white overflow-hidden relative flex flex-col items-center justify-center font-sans">
            {/* Background Grid */}
            <div
                className="fixed inset-0 w-full h-full pointer-events-none z-0 opacity-60"
                style={{
                    backgroundSize: '40px 40px',
                    backgroundImage: 'linear-gradient(to right, rgba(0, 0, 0, 0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(0, 0, 0, 0.04) 1px, transparent 1px)'
                }}
            ></div>

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

                {/* Card */}
                <div className="bg-white/80 backdrop-blur-xl border border-white/20 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-2xl p-6 sm:p-8 ring-1 ring-neutral-200/50">
                    <div className="text-center mb-6">
                        <h1 className="text-xl font-semibold tracking-tight text-neutral-900">
                            Welcome back
                        </h1>
                        <p className="text-sm text-neutral-500 mt-2">
                            Enter your email to access your workspace
                        </p>
                    </div>

                    <form className="space-y-4" onSubmit={handleLogin}>
                        {/* Email Input */}
                        <div className="space-y-1.5">
                            <label className="text-xs font-medium text-neutral-700 ml-1">
                                Email address
                            </label>
                            <div className="relative group">
                                <input
                                    type="email"
                                    placeholder="name@company.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full bg-white border border-neutral-200 rounded-lg pl-10 pr-3 py-2.5 text-sm outline-none focus:border-neutral-400 focus:ring-4 focus:ring-neutral-100 transition-all placeholder:text-neutral-400 text-neutral-900"
                                    required
                                />
                                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 transition-colors pointer-events-none flex items-center">
                                    <Mail width={18} height={18} />
                                </div>
                            </div>
                        </div>

                        {/* Password Input */}
                        <div className="space-y-1.5">
                            <label className="text-xs font-medium text-neutral-700 ml-1 flex justify-between items-center">
                                Password
                                <a
                                    href="#"
                                    className="text-neutral-500 hover:text-neutral-900 transition-colors hover:underline"
                                >
                                    Forgot password?
                                </a>
                            </label>
                            <div className="relative group">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-white border border-neutral-200 rounded-lg pl-10 pr-10 py-2.5 text-sm outline-none focus:border-neutral-400 focus:ring-4 focus:ring-neutral-100 transition-all placeholder:text-neutral-400 text-neutral-900"
                                    required
                                />
                                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 transition-colors pointer-events-none flex items-center">
                                    <Lock width={18} height={18} />
                                </div>
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 transition-colors cursor-pointer flex items-center outline-none"
                                >
                                    {showPassword ? (
                                        <EyeOff width={18} height={18} />
                                    ) : (
                                        <Eye width={18} height={18} />
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="pt-2">
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-neutral-900 hover:bg-neutral-800 text-white text-sm font-medium py-2.5 rounded-lg shadow-sm hover:shadow-md transition-all active:scale-[0.99] flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {loading ? (
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
                            <button
                                type="button"
                                onClick={handleGoogleLogin}
                                className="flex items-center justify-center gap-2 px-4 py-2 bg-white border border-neutral-200 rounded-lg hover:bg-neutral-50 hover:border-neutral-300 transition-all shadow-sm"
                            >
                                {/* Google Icon SVG */}
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="18"
                                    height="18"
                                    viewBox="0 0 48 48"
                                >
                                    <path
                                        fill="#FFC107"
                                        d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                                    ></path>
                                    <path
                                        fill="#FF3D00"
                                        d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                                    ></path>
                                    <path
                                        fill="#4CAF50"
                                        d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                                    ></path>
                                    <path
                                        fill="#1976D2"
                                        d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                                    ></path>
                                </svg>
                                <span className="text-xs font-medium text-neutral-700">Google</span>
                            </button>
                        </div>
                    </form>
                </div>

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
