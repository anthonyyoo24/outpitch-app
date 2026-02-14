import { Globe, Github, Linkedin, Instagram, Link as LinkIcon } from "lucide-react"
import { XIcon, TikTokIcon } from "@/components/icons"

export const PLATFORMS = [
    { id: "linkedin", label: "LinkedIn", icon: Linkedin, placeholder: "https://linkedin.com/in/..." },
    { id: "twitter", label: "Twitter", icon: XIcon, placeholder: "https://x.com/..." },
    { id: "github", label: "GitHub", icon: Github, placeholder: "https://github.com/..." },
    { id: "instagram", label: "Instagram", icon: Instagram, placeholder: "https://instagram.com/..." },
    { id: "tiktok", label: "TikTok", icon: TikTokIcon, placeholder: "https://tiktok.com/@..." },
    { id: "website", label: "Website", icon: Globe, placeholder: "https://..." },
] as const

export const SELECT_PLATFORM = { id: "", label: "Select", icon: LinkIcon, placeholder: "https://..." } as const

export type PlatformId = typeof PLATFORMS[number]["id"] | ""
