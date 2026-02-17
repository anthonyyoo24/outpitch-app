"use client"

import { Code } from "lucide-react"
import Image from "next/image"
import { useState } from "react"

interface TechIconProps {
    name: string
    slug?: string | null
    className?: string
    width?: number
    height?: number
}

export function TechIcon({
    name,
    slug,
    className,
    width = 12,
    height = 12
}: TechIconProps) {
    const [imageError, setImageError] = useState(false)
    const [prevSlug, setPrevSlug] = useState(slug)

    if (slug !== prevSlug) {
        setPrevSlug(slug)
        setImageError(false)
    }

    if (slug && !imageError) {
        return (
            <Image
                src={`https://cdn.simpleicons.org/${slug}`}
                alt={name}
                width={width}
                height={height}
                className={className}
                onError={() => setImageError(true)}
                unoptimized
            />
        )
    }

    return (
        <Code
            className={`text-neutral-500 ${className}`}
            style={{ width, height }}
        />
    )
}
