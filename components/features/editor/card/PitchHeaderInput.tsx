"use client"

import React from "react"
import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Underline from "@tiptap/extension-underline"
import { TextStyle } from "@tiptap/extension-text-style"
import { Color } from "@tiptap/extension-color"
import { useFormContext } from "react-hook-form"
import { Type, Bold, Italic, Underline as UnderlineIcon, Palette, X } from "lucide-react"
import { Extension } from "@tiptap/core"
import Placeholder from "@tiptap/extension-placeholder"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuSeparator,
} from "@/components/ui/DropdownMenu"

// Custom extension to allow fontSize in textStyle
const FontSize = Extension.create({
    name: 'fontSize',
    addOptions() {
        return {
            types: ['textStyle'],
        };
    },
    addGlobalAttributes() {
        return [
            {
                types: this.options.types,
                attributes: {
                    fontSize: {
                        default: null,
                        parseHTML: element => element.style.fontSize ? element.style.fontSize.replace(/['"]+/g, '') : null,
                        renderHTML: attributes => {
                            if (!attributes.fontSize) {
                                return {};
                            }
                            return {
                                style: `font-size: ${attributes.fontSize}`,
                            };
                        },
                    },
                },
            },
        ];
    },
});

const NEUTRAL_COLORS = [
    { hex: '#fafafa', tailwindClass: 'neutral-50' },
    { hex: '#f5f5f5', tailwindClass: 'neutral-100' },
    { hex: '#e5e5e5', tailwindClass: 'neutral-200' },
    { hex: '#d4d4d4', tailwindClass: 'neutral-300' },
    { hex: '#a3a3a3', tailwindClass: 'neutral-400' },
    { hex: '#737373', tailwindClass: 'neutral-500' },
    { hex: '#525252', tailwindClass: 'neutral-600' },
    { hex: '#404040', tailwindClass: 'neutral-700' },
    { hex: '#262626', tailwindClass: 'neutral-800' },
    { hex: '#171717', tailwindClass: 'neutral-900' },
    { hex: '#0a0a0a', tailwindClass: 'neutral-950' },
] as const

export function PitchHeaderInput() {
    const { setValue, watch, register, formState: { errors } } = useFormContext()
    const headerContent = watch("header_content")
    const [currentFontSize, setCurrentFontSize] = React.useState("40px")
    const [selectedColor, setSelectedColor] = React.useState<string | null>(null)
    const error = errors.header_content?.message as string | undefined

    React.useEffect(() => {
        register("header_content")
    }, [register])


    const editor = useEditor({
        extensions: [
            StarterKit,
            Underline,
            TextStyle,
            FontSize,
            Color,
            Placeholder.configure({
                placeholder: "Hey Linear, I'm Alex Rivera",
            }),
        ],
        content: headerContent || "",
        editorProps: {
            attributes: {
                class: "outline-none sm:text-[40px] leading-[1.15] text-neutral-600 transition-colors text-3xl font-normal tracking-tight font-mono duration-100 ease-in-out min-h-24",
            },
        },
        onUpdate: ({ editor }) => {
            setValue("header_content", editor.getHTML(), { shouldDirty: true, shouldValidate: true })
        },
        immediatelyRender: false,
    })

    const handleFontSizeChange = (size: string) => {
        if (!editor) return

        editor
            .chain()
            .focus()
            .selectAll()
            .setMark('textStyle', { fontSize: size })
            .setTextSelection(editor.state.doc.content.size)
            .run()

        setCurrentFontSize(size)
    }

    const handleColorSelect = (hex: string) => {
        if (!editor) return

        editor.chain().focus().setColor(hex).run()
        setSelectedColor(hex)
    }

    if (!editor) {
        return null
    }

    return (
        <div className="flex flex-col pt-2 sm:pt-4 gap-6" >
            <div className="w-full z-10">
                <div className={`flex flex-col transition-colors focus-within:bg-white focus-within:shadow-sm group bg-neutral-50/50 border rounded-2xl sm:rounded-3xl p-4 sm:p-5 gap-3 ${error
                    ? "border-red-500 hover:border-red-500 focus-within:border-red-500"
                    : "border-neutral-300 hover:border-neutral-400 focus-within:border-neutral-400"
                    }`}>
                    {/* Toolbar */}
                    <div className="flex items-center gap-3 border-b border-neutral-200 pb-3 overflow-x-auto no-scrollbar">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <button
                                    className="flex items-center gap-1.5 cursor-pointer text-[10px] text-neutral-500 font-mono hover:text-neutral-900 transition-colors focus:outline-none outline-none group/fontsize pr-3 border-r border-neutral-200 shrink-0 select-none"
                                    type="button"
                                >
                                    <Type className="text-neutral-500 w-3 h-3 group-hover/fontsize:text-neutral-900 transition-colors" />
                                    <span>{currentFontSize}</span>
                                </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="start" className="min-w-16 p-1 bg-white border border-neutral-100 rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.05)]">
                                {['40px', '32px', '24px'].map((size) => (
                                    <DropdownMenuItem
                                        key={size}
                                        onClick={() => handleFontSizeChange(size)}
                                        className="w-full justify-center px-2 py-1.5 text-[10px] text-neutral-500 hover:text-neutral-900 focus:text-neutral-900 hover:bg-neutral-50 focus:bg-neutral-50 rounded-lg transition-colors font-mono cursor-pointer"
                                    >
                                        {size}
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>

                        <div className="flex items-center gap-1 shrink-0">
                            <button
                                type="button"
                                onClick={() => editor.chain().focus().toggleBold().run()}
                                className={`p-1.5 rounded-lg cursor-pointer transition-colors ${editor.isActive('bold') ? 'text-neutral-900 bg-neutral-200/50' : 'text-neutral-400 hover:text-neutral-900 hover:bg-neutral-200/50'}`}
                                title="Bold"
                            >
                                <Bold className="w-3.5 h-3.5" />
                            </button>
                            <button
                                type="button"
                                onClick={() => editor.chain().focus().toggleItalic().run()}
                                className={`p-1.5 rounded-lg cursor-pointer transition-colors ${editor.isActive('italic') ? 'text-neutral-900 bg-neutral-200/50' : 'text-neutral-400 hover:text-neutral-900 hover:bg-neutral-200/50'}`}
                                title="Italic"
                            >
                                <Italic className="w-3.5 h-3.5" />
                            </button>
                            <button
                                type="button"
                                onClick={() => editor.chain().focus().toggleUnderline().run()}
                                className={`p-1.5 rounded-lg cursor-pointer transition-colors ${editor.isActive('underline') ? 'text-neutral-900 bg-neutral-200/50' : 'text-neutral-400 hover:text-neutral-900 hover:bg-neutral-200/50'}`}
                                title="Underline"
                            >
                                <UnderlineIcon className="w-3.5 h-3.5" />
                            </button>
                        </div>

                        {/* Vertical Divider */}
                        <div className="h-4 w-px bg-neutral-200 mx-1 shrink-0" />

                        {/* Text Color Picker */}
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <button
                                    className={`flex items-center gap-1.5 cursor-pointer p-1.5 rounded-lg transition-colors focus:outline-none outline-none group/color shrink-0 select-none ${selectedColor ? 'bg-neutral-100 text-neutral-900' : 'text-neutral-400 hover:text-neutral-900 hover:bg-neutral-200/50'}`}
                                    type="button"
                                    title="Text Color"
                                >
                                    <Palette className="w-3.5 h-3.5" />
                                </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="start" className="w-84 p-3 bg-white border border-neutral-100 rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.05)]">
                                <div className="flex flex-col gap-3">
                                    <div className="flex items-center justify-between px-1">
                                        <span className="text-[10px] uppercase font-bold text-neutral-400 font-mono tracking-wider">Color Picker</span>
                                    </div>

                                    {/* Color Swatches Grid */}
                                    <div className="grid grid-cols-11 gap-2 px-1">
                                        {NEUTRAL_COLORS.map((color) => {
                                            const isSelected = selectedColor === color.hex
                                            const isLight = ['neutral-50', 'neutral-100', 'neutral-200', 'neutral-300'].includes(color.tailwindClass)

                                            return (
                                                <button
                                                    key={color.tailwindClass}
                                                    type="button"
                                                    onClick={() => handleColorSelect(color.hex)}
                                                    title={color.tailwindClass}
                                                    className={`relative w-6 h-6 rounded-full transition-transform cursor-pointer hover:scale-110 ${isLight ? 'border border-neutral-300' : ''
                                                        } ${isSelected ? 'ring-2 ring-neutral-900 ring-offset-1' : ''}`}
                                                    style={{ backgroundColor: color.hex }}
                                                >
                                                    {isSelected && (
                                                        <div className="absolute inset-0 flex items-center justify-center">
                                                            <svg
                                                                className={`w-3 h-3 ${isLight ? 'text-neutral-900' : 'text-white'}`}
                                                                fill="none"
                                                                viewBox="0 0 24 24"
                                                                stroke="currentColor"
                                                                strokeWidth={3}
                                                            >
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                                            </svg>
                                                        </div>
                                                    )}
                                                </button>
                                            )
                                        })}
                                    </div>

                                    {selectedColor && (
                                        <>
                                            <DropdownMenuSeparator className="bg-neutral-100" />
                                            <DropdownMenuItem
                                                onClick={() => {
                                                    editor.chain().focus().unsetColor().run()
                                                    setSelectedColor(null)
                                                }}
                                                className="w-full flex items-center gap-2 px-2 py-1.5 text-[10px] text-red-500 hover:text-red-700 focus:text-red-700 hover:bg-red-50 focus:bg-red-50 rounded-lg transition-colors font-mono cursor-pointer"
                                            >
                                                <X className="w-3 h-3" />
                                                <span>Reset to Default</span>
                                            </DropdownMenuItem>
                                        </>
                                    )}
                                </div>
                            </DropdownMenuContent>
                        </DropdownMenu>

                    </div>

                    {/* Editor */}
                    <EditorContent editor={editor} />
                </div>
            </div>
        </div >
    )
}
