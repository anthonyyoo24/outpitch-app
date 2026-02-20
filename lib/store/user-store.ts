import { create } from 'zustand'
import { User } from '@supabase/supabase-js'

interface UserState {
    user: User | null
    profile: { username: string; full_name: string | null } | null
    isAuthenticated: boolean
    setUser: (user: User | null) => void
    setProfile: (profile: { username: string; full_name: string | null } | null) => void
}

export const useUserStore = create<UserState>((set) => ({
    user: null,
    profile: null,
    isAuthenticated: false,
    setUser: (user) => set({ user, isAuthenticated: !!user }),
    setProfile: (profile) => set({ profile }),
}))
