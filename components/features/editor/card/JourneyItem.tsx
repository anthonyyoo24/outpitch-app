import React from "react"
import { useFormContext, useWatch, Controller } from "react-hook-form"
import { Trash2, ChevronDown } from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

interface JourneyItemProps {
    index: number
    remove: (index: number) => void
}

const MONTHS = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
]

const YEARS = Array.from({ length: 30 }, (_, i) => (new Date().getFullYear() - i).toString())

export function JourneyItem({ index, remove }: JourneyItemProps) {
    const { register, control } = useFormContext()

    // Watch is_current specifically for logic
    const isCurrent = useWatch({
        control,
        name: `work_experience.${index}.is_current`,
    })

    return (
        <div className="relative group">
            {/* Remove Button */}
            <button
                type="button"
                onClick={() => remove(index)}
                className="absolute -top-2 -right-2 p-1.5 cursor-pointer bg-white border border-neutral-200 text-neutral-400 hover:text-red-500 hover:border-red-200 rounded-full shadow-sm transition-all opacity-0 group-hover:opacity-100 z-10"
            >
                <Trash2 className="w-3.5 h-3.5" />
            </button>

            <div className="relative p-4 sm:p-5 rounded-2xl border border-neutral-200 bg-neutral-50/30 hover:border-neutral-300 hover:bg-neutral-50 transition-colors space-y-4">
                {/* Role & Company */}
                <div className="space-y-2">
                    <input
                        {...register(`work_experience.${index}.role`)}
                        type="text"
                        className="placeholder-neutral-400 focus:outline-none focus:border-neutral-400 transition-colors text-sm font-medium text-neutral-900 font-mono bg-transparent w-full border-neutral-200 border-b pb-1"
                        placeholder="Role Title"
                    />
                    <input
                        {...register(`work_experience.${index}.company`)}
                        type="text"
                        className="w-full bg-transparent border-b border-neutral-200 text-xs text-neutral-500 placeholder-neutral-400 focus:outline-none focus:border-neutral-400 transition-colors pb-1"
                        placeholder="Company Name"
                    />
                </div>

                {/* Dates Logic */}
                <div className="space-y-3">
                    <label className="flex items-center gap-2 cursor-pointer w-fit select-none">
                        <input
                            type="checkbox"
                            {...register(`work_experience.${index}.is_current`)}
                            className="w-3.5 h-3.5 cursor-pointer rounded border-neutral-300 bg-white text-neutral-900 focus:ring-0 focus:ring-offset-0 checked:bg-neutral-900 checked:border-neutral-900 transition-colors"
                        />
                        <span className="text-[10px] font-medium text-neutral-500 font-mono transition-colors group-hover:text-neutral-700">
                            Current role
                        </span>
                    </label>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Start Date */}
                        <div className="space-y-1">
                            <p className="text-[9px] uppercase tracking-wider text-neutral-500 font-mono font-semibold">
                                Start Date
                            </p>
                            <div className="flex gap-2">
                                <Controller
                                    control={control}
                                    name={`work_experience.${index}.start_month`}
                                    render={({ field }) => (
                                        <DateSelect
                                            value={field.value}
                                            onChange={field.onChange}
                                            options={MONTHS}
                                            placeholder="Month"
                                            className="w-full flex-1 cursor-pointer"
                                        />
                                    )}
                                />
                                <Controller
                                    control={control}
                                    name={`work_experience.${index}.start_year`}
                                    render={({ field }) => (
                                        <DateSelect
                                            value={field.value}
                                            onChange={field.onChange}
                                            options={YEARS}
                                            placeholder="Year"
                                            className="w-full flex-1 cursor-pointer"
                                        />
                                    )}
                                />
                            </div>
                        </div>

                        {/* End Date */}
                        <div className={cn("space-y-1 transition-opacity duration-300", isCurrent && "opacity-30 pointer-events-none")}>
                            <p className="text-[9px] uppercase tracking-wider text-neutral-500 font-mono font-semibold">
                                End Date
                            </p>
                            <div className="flex gap-2">
                                <Controller
                                    control={control}
                                    name={`work_experience.${index}.end_month`}
                                    render={({ field }) => (
                                        <DateSelect
                                            value={field.value}
                                            onChange={field.onChange}
                                            options={MONTHS}
                                            placeholder="Month"
                                            className="w-full flex-1 cursor-pointer"
                                            disabled={isCurrent}
                                        />
                                    )}
                                />
                                <Controller
                                    control={control}
                                    name={`work_experience.${index}.end_year`}
                                    render={({ field }) => (
                                        <DateSelect
                                            value={field.value}
                                            onChange={field.onChange}
                                            options={YEARS}
                                            placeholder="Year"
                                            className="w-full flex-1 cursor-pointer"
                                            disabled={isCurrent}
                                        />
                                    )}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Description */}
                <textarea
                    {...register(`work_experience.${index}.description`)}
                    rows={1}
                    className="w-full bg-transparent border-b border-neutral-200 text-xs text-neutral-500 placeholder-neutral-400 focus:outline-none focus:border-neutral-400 transition-colors resize-none leading-relaxed min-h-6"
                    placeholder="Description"
                />
            </div>
        </div>
    )
}

interface DateSelectProps {
    value?: string
    onChange: (val: string) => void
    options: string[]
    placeholder: string
    className?: string
    disabled?: boolean
}

function DateSelect({
    value,
    onChange,
    options,
    placeholder,
    className,
    disabled = false
}: DateSelectProps) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild disabled={disabled}>
                <button
                    type="button"
                    className={cn(
                        "flex items-center justify-between bg-transparent border-b border-neutral-200 text-[11px] text-neutral-500 focus:outline-none focus:border-neutral-400 pb-1 font-mono transition-colors group/select disabled:opacity-50",
                        className
                    )}
                >
                    <span className={cn("truncate text-left", !value && "text-neutral-400", value && "text-neutral-900")}>
                        {value || placeholder}
                    </span>
                    <ChevronDown className="w-2.5 h-2.5 text-neutral-400 transition-transform duration-300 group-data-[state=open]/select:rotate-180 shrink-0 ml-1" />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="h-48 overflow-y-auto bg-white border border-neutral-100 rounded-xl shadow-2xl p-1 custom-scrollbar min-w-24">
                {options.map((option) => (
                    <DropdownMenuItem
                        key={option}
                        onClick={() => onChange(option)}
                        className="w-full text-left px-3 py-1.5 text-[11px] text-neutral-500 hover:text-neutral-900 hover:bg-neutral-50 rounded-lg transition-colors font-mono cursor-pointer"
                    >
                        {option}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
