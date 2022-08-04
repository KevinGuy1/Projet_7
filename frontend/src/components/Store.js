import create from 'zustand'
import { devtools } from 'zustand/middleware'

export const userStore = create(devtools(set => ({
    pseudo: '',
    userId: '',
    token: '',
    setCurrentUser: (pseudo, userId, token) => set({ pseudo, userId, token }),
})))
