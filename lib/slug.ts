export function slugify(text: string): string {
    if (!text) return '';

    return String(text)
        .normalize('NFKD')               // Decompose accented chars into base + mark
        .replace(/[\u0300-\u036f]/g, '') // Strip combining diacritical marks
        .toLowerCase()
        .trim()
        .replace(/[\s_]+/g, '-')         // Replace spaces and underscores with -
        .replace(/[^\w-]+/g, '')         // Remove remaining non-word chars (except -)
        .replace(/-{2,}/g, '-')          // Collapse multiple - to single -
        .replace(/^-+|-+$/g, '');        // Trim leading/trailing -
}
