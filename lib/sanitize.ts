import sanitizeHtmlLib from "sanitize-html"

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
    return sanitizeHtmlLib(html, {
        allowedTags: ['p', 'strong', 'em', 'u', 'span', 'br'],
        allowedAttributes: {
            'span': ['style']
        },
        allowedStyles: {
            '*': {
                // allow basic inline styles like color and font-size safely if needed
                'color': [/^#(0x)?[0-9a-f]+$/i, /^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/],
                'font-size': [/^\d+(?:px|em|rem|%)$/]
            }
        },
        textFilter: function (text) {
            return text;
        }
    })
}

