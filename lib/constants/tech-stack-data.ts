export type TechItem = {
    name: string
    slug: string // Simple Icons slug
    category?: "Development" | "Design" | "Sales/Marketing" | "Productivity" | "Other"
}

export const TECH_STACK_DATA: TechItem[] = [
    // Development - Languages
    { name: "TypeScript", slug: "typescript", category: "Development" },
    { name: "JavaScript", slug: "javascript", category: "Development" },
    { name: "Python", slug: "python", category: "Development" },
    { name: "Java", slug: "java", category: "Development" },
    { name: "C#", slug: "csharp", category: "Development" },
    { name: "C++", slug: "cplusplus", category: "Development" },
    { name: "Go", slug: "go", category: "Development" },
    { name: "Rust", slug: "rust", category: "Development" },
    { name: "PHP", slug: "php", category: "Development" },
    { name: "Ruby", slug: "ruby", category: "Development" },
    { name: "Swift", slug: "swift", category: "Development" },
    { name: "Kotlin", slug: "kotlin", category: "Development" },
    { name: "Dart", slug: "dart", category: "Development" },

    // Development - Frameworks & Libraries
    { name: "React", slug: "react", category: "Development" },
    { name: "Next.js", slug: "nextdotjs", category: "Development" },
    { name: "Vue.js", slug: "vuedotjs", category: "Development" },
    { name: "Angular", slug: "angular", category: "Development" },
    { name: "Svelte", slug: "svelte", category: "Development" },
    { name: "Node.js", slug: "nodedotjs", category: "Development" },
    { name: "Express", slug: "express", category: "Development" },
    { name: "NestJS", slug: "nestjs", category: "Development" },
    { name: "Django", slug: "django", category: "Development" },
    { name: "Flask", slug: "flask", category: "Development" },
    { name: "Spring", slug: "spring", category: "Development" },
    { name: "Laravel", slug: "laravel", category: "Development" },
    { name: "Ruby on Rails", slug: "rubyonrails", category: "Development" },
    { name: "Flutter", slug: "flutter", category: "Development" },
    { name: "React Native", slug: "react", category: "Development" },
    { name: "Expo", slug: "expo", category: "Development" },
    { name: "Tailwind CSS", slug: "tailwindcss", category: "Development" },
    { name: "Sass", slug: "sass", category: "Development" },
    { name: "Bootstrap", slug: "bootstrap", category: "Development" },
    { name: "Material UI", slug: "mui", category: "Development" },
    { name: "Chakra UI", slug: "chakraui", category: "Development" },
    { name: "Shadcn UI", slug: "shadcnui", category: "Development" },

    // Development - Tools & Infra
    { name: "Git", slug: "git", category: "Development" },
    { name: "GitHub", slug: "github", category: "Development" },
    { name: "GitLab", slug: "gitlab", category: "Development" },
    { name: "Docker", slug: "docker", category: "Development" },
    { name: "Kubernetes", slug: "kubernetes", category: "Development" },
    { name: "AWS", slug: "amazonaws", category: "Development" },
    { name: "Google Cloud", slug: "googlecloud", category: "Development" },
    { name: "Azure", slug: "microsoftazure", category: "Development" },
    { name: "Firebase", slug: "firebase", category: "Development" },
    { name: "Supabase", slug: "supabase", category: "Development" },
    { name: "Vercel", slug: "vercel", category: "Development" },
    { name: "Netlify", slug: "netlify", category: "Development" },
    { name: "Heroku", slug: "heroku", category: "Development" },
    { name: "PostgreSQL", slug: "postgresql", category: "Development" },
    { name: "MySQL", slug: "mysql", category: "Development" },
    { name: "MongoDB", slug: "mongodb", category: "Development" },
    { name: "Redis", slug: "redis", category: "Development" },
    { name: "GraphQL", slug: "graphql", category: "Development" },
    { name: "Prisma", slug: "prisma", category: "Development" },

    // Design
    { name: "Figma", slug: "figma", category: "Design" },
    { name: "Adobe XD", slug: "adobexd", category: "Design" },
    { name: "Sketch", slug: "sketch", category: "Design" },
    { name: "Adobe Photoshop", slug: "adobephotoshop", category: "Design" },
    { name: "Adobe Illustrator", slug: "adobeillustrator", category: "Design" },
    { name: "Canva", slug: "canva", category: "Design" },
    { name: "InVision", slug: "invision", category: "Design" },
    { name: "Framer", slug: "framer", category: "Design" },
    { name: "Webflow", slug: "webflow", category: "Design" },
    { name: "Penpot", slug: "penpot", category: "Design" },
    { name: "Blender", slug: "blender", category: "Design" },

    // Sales & Marketing
    { name: "Salesforce", slug: "salesforce", category: "Sales/Marketing" },
    { name: "HubSpot", slug: "hubspot", category: "Sales/Marketing" },
    { name: "Mailchimp", slug: "mailchimp", category: "Sales/Marketing" },
    { name: "Intercom", slug: "intercom", category: "Sales/Marketing" },
    { name: "Zendesk", slug: "zendesk", category: "Sales/Marketing" },
    { name: "Marketo", slug: "marketo", category: "Sales/Marketing" },
    { name: "Pipedrive", slug: "pipedrive", category: "Sales/Marketing" },
    { name: "Zoho", slug: "zoho", category: "Sales/Marketing" },
    { name: "Google Analytics", slug: "googleanalytics", category: "Sales/Marketing" },
    { name: "Mixpanel", slug: "mixpanel", category: "Sales/Marketing" },
    { name: "Segment", slug: "segment", category: "Sales/Marketing" },
    { name: "Amplitude", slug: "amplitude", category: "Sales/Marketing" },
    { name: "Shopify", slug: "shopify", category: "Sales/Marketing" },
    { name: "Stripe", slug: "stripe", category: "Sales/Marketing" },

    // Productivity & Collaboration
    { name: "Notion", slug: "notion", category: "Productivity" },
    { name: "Trello", slug: "trello", category: "Productivity" },
    { name: "Asana", slug: "asana", category: "Productivity" },
    { name: "Jira", slug: "jira", category: "Productivity" },
    { name: "Slack", slug: "slack", category: "Productivity" },
    { name: "Discord", slug: "discord", category: "Productivity" },
    { name: "Zoom", slug: "zoom", category: "Productivity" },
    { name: "Microsoft Teams", slug: "microsoftteams", category: "Productivity" },
    { name: "Google Workspace", slug: "google", category: "Productivity" },
    { name: "Linear", slug: "linear", category: "Productivity" },
    { name: "Monday.com", slug: "mondaydotcom", category: "Productivity" },
    { name: "ClickUp", slug: "clickup", category: "Productivity" },
    { name: "Airtable", slug: "airtable", category: "Productivity" },
    { name: "Obsidian", slug: "obsidian", category: "Productivity" },
    { name: "Loom", slug: "loom", category: "Productivity" },
]
// Setup a Lookup Map for O(1) access to slugs & existence checks
export const TECH_SLUG_MAP: Record<string, string> = TECH_STACK_DATA.reduce((acc, item) => {
    acc[item.name.toLowerCase()] = item.slug
    return acc
}, {} as Record<string, string>)
