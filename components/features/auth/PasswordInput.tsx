'use client'

import { useState } from 'react'
import { Lock, Eye, EyeOff } from 'lucide-react'

interface PasswordInputProps {
    className?: string
}

export function PasswordInput({ className = '', error }: PasswordInputProps & { error?: string }) {
    const [showPassword, setShowPassword] = useState(false)

    return (
        <div className={`space-y-1.5 ${className}`}>
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
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    className={`w-full bg-white border rounded-lg pl-10 pr-10 py-2.5 text-sm outline-none transition-all placeholder:text-neutral-400 text-neutral-900 ${error
                            ? 'border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-50'
                            : 'border-neutral-200 focus:border-neutral-400 focus:ring-4 focus:ring-neutral-100'
                        }`}
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
            {error && (
                <p className="text-xs text-red-500 ml-1">{error}</p>
            )}
        </div>
    )
}
