import { cn } from '@/lib/utils'

interface GridBackgroundProps {
    className?: string
}

export function GridBackground({ className }: GridBackgroundProps) {
    return (
        <div
            className={cn("fixed inset-0 w-full h-full pointer-events-none z-0 opacity-60", className)}
            style={{
                backgroundSize: '40px 40px',
                backgroundImage:
                    'linear-gradient(to right, rgba(0, 0, 0, 0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(0, 0, 0, 0.04) 1px, transparent 1px)',
            }}
        />
    )
}
