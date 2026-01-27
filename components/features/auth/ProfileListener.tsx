'use client'

import { useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { nanoid } from 'nanoid'
import { useRouter } from 'next/navigation'

export function ProfileListener() {
    const router = useRouter()

    useEffect(() => {
        const supabase = createClient()
        const checkProfile = async () => {
            const { data: { user } } = await supabase.auth.getUser()
            if (!user) return

            // Check if profile exists
            const { data: profile } = await supabase
                .from('profiles')
                .select('id')
                .eq('id', user.id)
                .single()

            if (!profile) {
                // Create profile
                const username = `user_${nanoid(8)}` // e.g. user_V1StGXr8
                const fullName = user.user_metadata.full_name || user.email?.split('@')[0]

                const { error } = await supabase
                    .from('profiles')
                    .insert({
                        id: user.id,
                        username: username,
                        full_name: fullName,
                    })

                if (!error) {
                    console.log('Profile created:', username)
                    router.refresh()
                } else {
                    console.error('Error creating profile:', error)
                }
            }
        }

        checkProfile()
    }, [router])

    return null // This component is invisible
}
