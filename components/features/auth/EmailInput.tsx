'use client'

import { Mail } from 'lucide-react'

interface EmailInputProps {
    className?: string
}

export function EmailInput({ className = '', error }: EmailInputProps & { error?: string }) {
    return (
        <div className={`space-y-1.5 ${className}`}>
            <label className="text-xs font-medium text-neutral-700 ml-1">
                Email address
            </label>
            <div className="relative group">
                <input
                    name="email"
                    type="email"
                    placeholder="name@company.com"
                    className={`w-full bg-white border rounded-lg pl-10 pr-3 py-2.5 text-sm outline-none transition-all placeholder:text-neutral-400 text-neutral-900 ${error
                            ? 'border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-50'
                            : 'border-neutral-200 focus:border-neutral-400 focus:ring-4 focus:ring-neutral-100'
                        }`}
                    required
                />
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 transition-colors pointer-events-none flex items-center">
                    <Mail width={18} height={18} />
                </div>
            </div>
            {error && (
                <p className="text-xs text-red-500 ml-1">{error}</p>
            )}
        </div>
    )
}
