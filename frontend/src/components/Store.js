import create from 'zustand'
import { devtools } from 'zustand/middleware'

export const userStore = create(devtools(set => ({
    pseudo: '',
    userId: '',
    token: '',
    role: '',
    setCurrentUser: (pseudo, userId, token, role) => set({ pseudo, userId, token, role }),
})))
