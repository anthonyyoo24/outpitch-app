
import { createBrowserClient } from '@supabase/ssr'

/**
 * Creates a Supabase client for Client Components.
 * This client runs in the browser and handles authentication state using cookies.
 *
 * @returns A typed Supabase browser client.
 */
export function createClient() {
    return createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
}
