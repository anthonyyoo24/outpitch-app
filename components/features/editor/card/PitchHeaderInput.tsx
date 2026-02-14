"use client"

import React from "react"
import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Underline from "@tiptap/extension-underline"
import { TextStyle } from "@tiptap/extension-text-style"
import { useFormContext } from "react-hook-form"
import { Type, Bold, Italic, Underline as UnderlineIcon } from "lucide-react"
import { Extension } from "@tiptap/core"
import Placeholder from "@tiptap/extension-placeholder"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
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

export function PitchHeaderInput() {
    const { setValue, watch, register, formState: { errors } } = useFormContext()
    const headerContent = watch("header_content")
    const [currentFontSize, setCurrentFontSize] = React.useState("40px")
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
            Placeholder.configure({
                placeholder: "Hey Linear, I'm Alex Rivera",
            }),
        ],
        content: headerContent || "",
        editorProps: {
            attributes: {
                class: "outline-none sm:text-[40px] leading-[1.15] text-neutral-600 transition-colors text-3xl font-normal text-neutral-400 tracking-tight font-mono duration-100 ease-in-out min-h-24",
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
                    </div>

                    {/* Editor */}
                    <EditorContent editor={editor} />
                </div>
            </div>
        </div >
    )
}
