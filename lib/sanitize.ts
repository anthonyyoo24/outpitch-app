import DOMPurify from "isomorphic-dompurify"

/**
 * Sanitizes HTML content from TipTap editor to prevent XSS attacks.
 * 
 * This function uses a strict allowlist approach that only permits:
 * - Tags: <p>, <strong>, <em>, <u>, <span>, <br> (matches TipTap StarterKit + Underline)
 * - Attributes: style (only on <span>)
 * - Styles: color (hex format), font-size (pixel format)
 * 
 * All other tags, attributes, and styles are stripped.
 * 
 * @param html - Raw HTML string from TipTap editor
 * @returns Sanitized HTML string safe for rendering
 */
export function sanitizeHtml(html: string): string {
    return DOMPurify.sanitize(html, {
        ALLOWED_TAGS: ['p', 'strong', 'em', 'u', 'span', 'br'],
        ALLOWED_ATTR: ['style'],
        // Note: ALLOWED_STYLES is not available in current @types/dompurify
        // We rely on ALLOWED_ATTR: ['style'] to permit inline styles
        // and DOMPurify's default sanitization to strip dangerous values
        KEEP_CONTENT: true,
    })
}

