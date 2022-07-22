import create from 'zustand'
import { devtools } from 'zustand/middleware'

export const useStore = create(devtools(set => ({
    pseudo: '',
    userId: '',
    token: '',
    setCurrentUser: (pseudo, userId, token) => set({ pseudo, userId, token }),
    setPseudo: (pseudo) => set({ pseudo }),
    setUserId: (userId) => set({ userId }),
    setToken: (token) => set({ token }),
})))