import { cn } from '@/lib/utils'

interface AuthCardProps {
    children: React.ReactNode
    className?: string
}

export function AuthCard({ children, className }: AuthCardProps) {
    return (
        <div
            className={cn(
                "bg-white/80 backdrop-blur-xl border border-white/20 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-2xl p-6 sm:p-8 ring-1 ring-neutral-200/50",
                className
            )}
        >
            {children}
        </div>
    )
}
