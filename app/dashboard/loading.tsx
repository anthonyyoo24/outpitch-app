import { RotateCw } from "lucide-react"

export default function Loading() {
    return (
        <div className="flex h-full w-full items-center justify-center">
            <RotateCw className="h-8 w-8 animate-spin text-neutral-400" />
        </div>
    )
}
