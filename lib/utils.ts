import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * **Purpose**: To allow dynamic conditional styling while handling Tailwind CSS class conflicts.
 *
 * It combines two powerful libraries:
 * 1. `clsx`: Allows you to toggle classes based on boolean conditions (e.g., `isActive && 'bg-blue-500'`).
 * 2. `tailwind-merge`: Resolves CSS specificity conflicts (e.g., if you have `px-4` and `px-8`, it ensures `px-8` wins instead of depending on CCS load order).
 *
 * @example
 * // Basic usage
 * cn("bg-red-500", "text-white") // "bg-red-500 text-white"
 *
 * @example
 * // Conditional classes
 * cn("p-4", isActive && "bg-blue-500") // "p-4" or "p-4 bg-blue-500"
 *
 * @example
 * // Resolving conflicts (last one wins)
 * cn("p-4", "p-8") // "p-8" (removes "p-4" automatically)
 *
 * @param inputs - A list of class values (strings, objects, arrays) to merge.
 * @returns A clean class string with no duplicates or conflicts.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Strips HTML tags from a string and decodes basic entities.
 * Useful for using rich-text content in plain-text fields like SEO metadata.
 */
export function stripHtml(html: string): string {
  if (!html) return ""
  return html
    .replace(/<[^>]*>/g, " ") // Replace tags with space
    // Decode basic named entities
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&nbsp;/g, " ")
    // Decode numeric entities (&#123;)
    .replace(/&#(\d+);/g, (_, dec) => String.fromCharCode(parseInt(dec, 10)))
    // Decode hex entities (&#x1a2b;)
    .replace(/&#x([a-f\d]+);/gi, (_, hex) => String.fromCharCode(parseInt(hex, 16)))
    .replace(/\s+/g, " ") // Collapse whitespace
    .trim()
}
/**
 * Masks an identifier (like username or slug) for safe logging.
 * Returns a redacted version (e.g., "jo***oe") to protect PII.
 */
export function maskIdentifier(value: string | undefined | null): string {
  if (!value) return "unknown"
  if (value.length <= 4) return "****"
  const start = value.slice(0, 2)
  const end = value.slice(-2)
  return `${start}***${end}`
}
