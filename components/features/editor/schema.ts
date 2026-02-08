
import { z } from "zod"

export const pitchSchema = z.object({
    id: z.string().uuid(),
    user_id: z.string(),
    company_name: z.string().min(1, "Company name is required"),
    role_title: z.string().min(1, "Role title is required"),
    header_content: z.string().min(1, "Header content is required"), // HTML string for the rich text header
    video_url: z.string().min(1, "Video URL is required"),
    bio: z.string().optional(),
    portfolio: z.array(
        z.object({
            title: z.string(),
            description: z.string(),
            link: z.string().url().optional().or(z.literal("")),
            image_url: z.string().optional().nullable(),
        })
    ).optional(),
    tech_stack: z.array(z.string()).optional(),
    work_experience: z.array(
        z.object({
            role: z.string(),
            company: z.string(),
            date_range: z.string(),
            description: z.string(),
        })
    ).optional(),
    contact: z.object({
        email: z.string().email("Invalid email address"),
        calendly_link: z.string().url().optional().or(z.literal("")),
    }),
    social_links: z.object({
        linkedin: z.string().url().optional().or(z.literal("")),
        twitter: z.string().url().optional().or(z.literal("")),
        website: z.string().url().optional().or(z.literal("")),
        github: z.string().url().optional().or(z.literal("")),
        instagram: z.string().url().optional().or(z.literal("")),
        tiktok: z.string().url().optional().or(z.literal("")),
    }).optional(),
    resume_url: z.string().optional().nullable(),
    status: z.enum(["draft", "published"]).default("draft"),
})

export type PitchFormValues = z.infer<typeof pitchSchema>
