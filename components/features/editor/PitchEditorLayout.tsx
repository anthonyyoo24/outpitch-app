"use client"

export function PitchEditorLayout({ pitchId }: { pitchId: string }) {
    return (
        <div className="flex h-full w-full items-center justify-center bg-gray-50 p-6">
            <div className="flex h-full w-full max-w-5xl flex-col rounded-xl border border-neutral-200 bg-white shadow-sm">
                <div className="flex h-16 shrink-0 items-center justify-between border-b border-neutral-100 px-6">
                    <div className="flex items-center gap-2">
                        <h1 className="text-lg font-semibold text-neutral-900">Edit Pitch</h1>
                        <span className="text-xs text-neutral-400">ID: {pitchId}</span>
                    </div>
                    <div className="flex gap-2">
                        <button className="rounded-md px-3 py-1.5 text-sm font-medium text-neutral-600 hover:bg-neutral-100">
                            Save Draft
                        </button>
                        <button className="rounded-md bg-neutral-900 px-3 py-1.5 text-sm font-medium text-white hover:bg-neutral-800">
                            Publish
                        </button>
                    </div>
                </div>

                <div className="flex flex-1 items-center justify-center p-10">
                    <div className="text-center text-neutral-400">
                        <p>Editor Widgets (Company Input, Video, Tech Stack) will go here.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
