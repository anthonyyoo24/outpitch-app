"use client"

import Link from "next/link"
import { formatDistanceToNow } from "date-fns"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface SidebarListItemProps {
    pitch: {
        id: string
        company_name: string
        role_title: string
        status: string
        created_at: string
    }
}

export function SidebarListItem({ pitch }: SidebarListItemProps) {
    return (
        <div className="relative">
            <Link
                href={`/dashboard?pitchId=${pitch.id}`}
                className="group flex cursor-pointer items-center gap-3 gap-x-3 gap-y-3 rounded-xl border border-transparent bg-neutral-100 p-3 pt-3 pr-3 pb-3 pl-3 shadow-sm transition-all hover:border-neutral-200/60 hover:bg-neutral-50"
            >
                <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg border border-neutral-200 bg-white">
                    <div className="flex h-full w-full items-center justify-center bg-neutral-50 text-xs font-medium text-neutral-400">
                        {pitch.company_name.substring(0, 2).toUpperCase()}
                    </div>
                </div>
                <div className="flex min-w-0 flex-1 flex-col justify-center">
                    <div className="mb-0.5 flex items-start justify-between pr-6">
                        <h3 className="text-sm font-semibold leading-none text-neutral-900 group-hover:text-black">
                            {pitch.company_name}
                        </h3>
                    </div>
                    <p className="mb-1 truncate text-xs font-medium text-neutral-900 group-hover:text-neutral-700">
                        {pitch.role_title}
                    </p>
                    <div className="flex items-center">
                        <div className="flex items-center gap-1.5">
                            <span
                                className={`h-1.5 w-1.5 rounded-full ${pitch.status === "live" || pitch.status === "published"
                                    ? "bg-emerald-500"
                                    : pitch.status === "draft"
                                        ? "bg-amber-500"
                                        : "bg-neutral-300"
                                    }`}
                            ></span>
                            <span className="text-[10px] font-medium text-neutral-700 capitalize">
                                {pitch.status}
                            </span>
                        </div>
                        <span className="mx-1.5 text-[10px] text-neutral-400">|</span>
                        <span className="text-[10px] font-normal text-neutral-500">
                            Updated {formatDistanceToNow(new Date(pitch.created_at), { addSuffix: true })}
                        </span>
                    </div>
                </div>
            </Link>

            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <button className="absolute top-2 right-2 z-10 rounded-md p-1 text-neutral-500 transition-all hover:bg-neutral-200/50 hover:text-neutral-900 focus:outline-none opacity-100 cursor-pointer">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="21"
                            height="21"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <circle cx="12" cy="12" r="1"></circle>
                            <circle cx="12" cy="5" r="1"></circle>
                            <circle cx="12" cy="19" r="1"></circle>
                        </svg>
                    </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[140px] rounded-lg border-neutral-200 p-1 shadow-lg">
                    <DropdownMenuItem className="gap-2 rounded-md px-2 py-1.5 text-xs font-medium text-neutral-500 transition-colors hover:bg-neutral-50 hover:text-neutral-900 focus:bg-neutral-50 focus:text-neutral-900 cursor-pointer">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
                        </svg>
                        <span>Edit</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="gap-2 rounded-md px-2 py-1.5 text-xs font-medium text-neutral-500 transition-colors hover:bg-neutral-50 hover:text-neutral-900 focus:bg-neutral-50 focus:text-neutral-900 cursor-pointer">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <rect width="13" height="13" x="9" y="9" rx="2" ry="2"></rect>
                            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                        </svg>
                        <span>Duplicate</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="gap-2 rounded-md px-2 py-1.5 text-xs font-medium text-neutral-500 transition-colors hover:bg-neutral-50 hover:text-neutral-900 focus:bg-neutral-50 focus:text-neutral-900 cursor-pointer">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
                        </svg>
                        <span>Share Link</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="gap-2 rounded-md px-2 py-1.5 text-xs font-medium text-neutral-500 transition-colors hover:bg-neutral-50 hover:text-neutral-900 focus:bg-neutral-50 focus:text-neutral-900 cursor-pointer">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"></path>
                            <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"></path>
                            <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"></path>
                            <line x="2" x2="22" y="2" y2="22"></line>
                        </svg>
                        <span>Unpublish</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="my-0.5 bg-neutral-100" />
                    <DropdownMenuItem variant="destructive" className="gap-2 rounded-md px-2 py-1.5 text-xs font-medium cursor-pointer">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="text-inherit"
                        >
                            <path d="M3 6h18"></path>
                            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                        </svg>
                        <span>Delete</span>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}
