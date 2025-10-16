import { create } from 'zustand'
import { useEffect } from 'react'


type User = { id: string; phone: string }


type AuthState = {
    token: string | null
    user: User | null
    setToken: (t: string | null) => void
    setUser: (u: User | null) => void
}


let externalToken: string | null = null


export const getAuthToken = () => externalToken
export const setAuthToken = (t: string | null) => { externalToken = t }


export const useAuthStore = create<AuthState>((set) => ({
    token: typeof window !== 'undefined' ? localStorage.getItem('token') : null,
    user: null,
    setToken: (t) => {
        if (typeof window !== 'undefined') {
            if (t) localStorage.setItem('token', t)
            else localStorage.removeItem('token')
        }
        externalToken = t
        set({ token: t })
    },
    setUser: (u) => set({ user: u }),
}))


export function AuthProvider({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        const t = localStorage.getItem('token')
        externalToken = t
    }, [])
    return <>{children}</>
}