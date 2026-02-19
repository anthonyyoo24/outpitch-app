'use client'

import { useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { useUserStore } from "@/lib/store/user-store"

/**
 * A component that handles global authentication logic:
 * 1. Synchronizes the Supabase auth state with the global Zustand store.
 * 2. Fetches the user profile on login (profile creation is now handled by DB trigger).
 *
 * It renders nothing visible.
 */
export function AuthListener() {
    const router = useRouter()
    const setUser = useUserStore((state) => state.setUser)
    const setProfile = useUserStore((state) => state.setProfile)

    useEffect(() => {
        const supabase = createClient()

        // Listen for changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {

            // Handle side effects in a detached async function to avoid blocking the listener
            const handleAuthSideEffects = async () => {
                setUser(session?.user ?? null)

                if (session?.user) {
                    // Just fetch the profile, don't create it
                    const { data: profile } = await supabase
                        .from('profiles')
                        .select('username, full_name, id')
                        .eq('id', session.user.id)
                        .single()

                    if (profile) {
                        setProfile(profile)
                    }
                } else {
                    setProfile(null)
                }

                // router.refresh() forces Next.js to re-fetch Server Components.
                // When a user signs in, we need the server to re-render the layout 
                // (e.g. to show 'Dashboard' instead of 'Login' in the header).
                if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
                    router.refresh()
                }
            }

            // Execute without awaiting
            handleAuthSideEffects()
        })

        return () => {
            subscription.unsubscribe()
        }
    }, [setUser, setProfile, router])

    return null
}
