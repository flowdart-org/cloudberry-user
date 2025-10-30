import { AUTH_SERVICES } from "@/api/auth/auth.service";
import { USER_SERVICES } from "@/api/user/user.service";
import { User } from "@/types/user.types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
    isAuthenticated: boolean;
    isLoading: boolean;
    user: User | null;
    login: () => Promise<void>;
    logout: () => Promise<void>;
    setUser: (user: Partial<User>) => void;
    refreshToken: () => Promise<boolean>;
    fetchUser: () => Promise<void>
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set, get) => ({
            isAuthenticated: false,
            isLoading: true,
            user: null,

            login: async () => {
                set({ isAuthenticated: true })
                await get().fetchUser()
            },

            fetchUser: async () => {
                if (get().isAuthenticated) {
                    const { success, data: user } = await USER_SERVICES.me()
                    console.log(success, user, 'fetchUser me')
                    if (success) {
                        set({ user, isAuthenticated: true })
                    }
                } else {
                    set({ user: null })
                }
                set({ isLoading: false })
            },

            logout: async () => {
                set({ isLoading: true })
                const { success } = await AUTH_SERVICES.logout()
                if (success) {
                    set({ user: null, isAuthenticated: false })
                }
                set({ isLoading: false })
            },

            setUser: (userUpdate) => {
                set((state) => ({
                    user: state.user ? { ...state.user, ...userUpdate } : null,
                }))
            },

            refreshToken: async () => {
                console.log('refreshingg');
                return false;
            },
        }),
        {
            name: "auth-storage",
            partialize: (state) => ({
                isAuthenticated: state.isAuthenticated,
            }),
        }
    )
);
