'use client'

import { useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { nanoid } from 'nanoid'
import { useRouter } from 'next/navigation'
import { useUserStore } from "@/lib/store/user-store"

/**
 * A component that handles global authentication logic:
 * 1. Synchronizes the Supabase auth state with the global Zustand store.
 * 2. Checks for a user profile on login and creates one if missing.
 *
 * It renders nothing visible.
 */
export function AuthListener() {
    const router = useRouter()
    const setUser = useUserStore((state) => state.setUser)

    useEffect(() => {
        const supabase = createClient()

        // --- 1. Sync User State ---
        // Initial check
        supabase.auth.getUser().then(({ data }) => {
            setUser(data.user)
            if (data.user) checkProfile(data.user)
        })

        // Listen for changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null)
            if (session?.user) checkProfile(session.user)
        })

        // --- 2. Profile Check Logic ---
        const checkProfile = async (user: any) => {
            // Check if profile exists
            const { data: profile } = await supabase
                .from('profiles')
                .select('id')
                .eq('id', user.id)
                .single()

            if (!profile) {
                // Create profile
                const username = `user_${nanoid(8)}`
                const fullName = user.user_metadata.full_name || user.email?.split('@')[0]

                const { error } = await supabase
                    .from('profiles')
                    .upsert({
                        id: user.id,
                        username: username,
                        full_name: fullName,
                    }, { onConflict: 'id', ignoreDuplicates: true })

                if (!error) {
                    console.log('Profile created:', username)
                    router.refresh()
                } else {
                    console.error('Error creating profile:', error)
                }
            }
        }

        return () => {
            subscription.unsubscribe()
        }
    }, [setUser, router])

    return null
}
