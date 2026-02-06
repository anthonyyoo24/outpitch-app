"use client"

import React from "react"
import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Underline from "@tiptap/extension-underline"
import { TextStyle } from "@tiptap/extension-text-style"
import { useFormContext } from "react-hook-form"
import { Type, Bold, Italic, Underline as UnderlineIcon } from "lucide-react"
import { Extension } from "@tiptap/core"

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
                        parseHTML: element => element.style.fontSize.replace(/['"]+/g, ''),
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
    const { setValue, watch } = useFormContext()
    const headerContent = watch("header_content")

    const editor = useEditor({
        extensions: [
            StarterKit,
            Underline,
            TextStyle,
            FontSize,
        ],
        content: headerContent || `<p class="text-3xl sm:text-[40px] text-neutral-400 font-mono">Hey Linear, I'm <span class="text-neutral-900 font-medium">Alex Rivera.</span></p>`,
        editorProps: {
            attributes: {
                class: "outline-none sm:text-[40px] leading-[1.15] text-neutral-600 transition-colors text-3xl font-normal text-neutral-400 tracking-tight font-mono duration-100 ease-in-out",
            },
        },
        onUpdate: ({ editor }) => {
            setValue("header_content", editor.getHTML(), { shouldDirty: true })
        },
        immediatelyRender: false,
    })

    if (!editor) {
        return null
    }

    return (
        <div className="flex flex-col pt-2 sm:pt-4 gap-6">
            <div className="w-full z-10">
                <div className="flex flex-col transition-colors hover:border-neutral-300 hover:bg-neutral-50/80 group bg-neutral-50/40 border-neutral-200 border rounded-2xl sm:rounded-3xl p-4 sm:p-5 gap-3">
                    {/* Toolbar */}
                    <div className="flex items-center gap-3 border-b border-neutral-200 pb-3 overflow-x-auto no-scrollbar">
                        <div className="relative flex items-center gap-1.5 pr-3 border-r border-neutral-200 shrink-0">
                            <Type className="text-neutral-500 w-3 h-3" />
                            <select
                                className="bg-transparent text-[10px] text-neutral-500 font-mono focus:outline-none cursor-pointer hover:text-neutral-900 transition-colors"
                                onChange={(e) => {
                                    editor
                                        .chain()
                                        .focus()
                                        .selectAll()
                                        .setMark('textStyle', { fontSize: e.target.value })
                                        .setTextSelection(editor.state.doc.content.size)
                                        .run()
                                }}
                                defaultValue="40px"
                            >
                                <option value="40px">40px</option>
                                <option value="32px">32px</option>
                                <option value="24px">24px</option>
                            </select>
                        </div>
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
        </div>
    )
}
