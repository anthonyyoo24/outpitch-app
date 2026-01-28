import { create } from 'zustand'

interface UIState {
    isCreatePitchModalOpen: boolean
    setCreatePitchModalOpen: (isOpen: boolean) => void
}

export const useUIStore = create<UIState>((set) => ({
    isCreatePitchModalOpen: false,
    setCreatePitchModalOpen: (isOpen) => set({ isCreatePitchModalOpen: isOpen }),
}))
