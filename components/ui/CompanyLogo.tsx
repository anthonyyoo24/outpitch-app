"use client"

import { useState } from "react"

interface CompanyLogoProps {
    name: string
    className?: string
}

export function CompanyLogo({ name, className }: CompanyLogoProps) {
    const [imgError, setImgError] = useState(false)

    // Helper to get initials (max 2 chars)
    const getInitials = (name: string) => {
        return name
            .split(/\s+/)
            .map(word => word[0])
            .filter(Boolean)
            .slice(0, 2)
            .join('')
            .toUpperCase()
    }

    // Convert name to Simple Icons slug format: lowercase, remove non-alphanumeric
    const slug = name.toLowerCase().replace(/[^a-z0-9]/g, '')

    return (
        <div className={`relative flex shrink-0 overflow-hidden rounded-lg border border-neutral-200 bg-white ${className}`}>
            {
                imgError ?
                    <div className="flex h-full w-full items-center justify-center bg-neutral-50 text-xs font-medium text-neutral-400">
                        {getInitials(name)}
                    </div>
                    :
                    <img
                        src={`https://cdn.simpleicons.org/${slug}`}
                        alt={`${name} logo`}
                        className="h-full w-full object-cover p-2"
                        loading="lazy"
                        onError={() => setImgError(true)}
                    />
            }
        </div>
    )
}
