"use client"

import { Button } from "@/components/ui/button"
import { useState } from "react"

export default function ButtonTestPage() {
    const [loading, setLoading] = useState(false)

    return (
        <div className="p-8 space-y-8">
            <h1 className="text-2xl font-bold">Button Fix Verification</h1>

            <div className="space-y-4">
                <h2 className="text-xl font-semibold">Controls</h2>
                <label className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        checked={loading}
                        onChange={(e) => setLoading(e.target.checked)}
                    />
                    Toggle Global Loading
                </label>
            </div>

            <div className="grid gap-4 max-w-md">
                <div className="p-4 border rounded space-y-2">
                    <h3 className="font-semibold">Case 1: isLoading=true, disabled=undefined</h3>
                    <p className="text-sm text-gray-500">Should be disabled when loading is checked.</p>
                    <Button isLoading={loading}>
                        Click Me
                    </Button>
                </div>

                <div className="p-4 border rounded space-y-2">
                    <h3 className="font-semibold">Case 2: isLoading=true, disabled=false</h3>
                    <p className="text-sm text-gray-500">Should be disabled when loading is checked (Bug Fix).</p>
                    <Button isLoading={loading} disabled={false}>
                        Start Pitch
                    </Button>
                </div>

                <div className="p-4 border rounded space-y-2">
                    <h3 className="font-semibold">Case 3: isLoading=false, disabled=true</h3>
                    <p className="text-sm text-gray-500">Should always be disabled.</p>
                    <Button isLoading={loading} disabled={true}>
                        Always Disabled
                    </Button>
                </div>

                <div className="p-4 border rounded space-y-2">
                    <h3 className="font-semibold">Case 4: asChild, isLoading=true</h3>
                    <p className="text-sm text-gray-500">Should be disabled when loading.</p>
                    <Button asChild isLoading={loading} disabled={false}>
                        <a href="#">Link Button</a>
                    </Button>
                </div>
            </div>
        </div>
    )
}
