import { AUTH_SERVICES } from "@/api/auth/auth.service";
import { USER_SERVICES } from "@/api/user/user.service";
import { authApi } from "@/lib/axios";
import { User } from "@/types/user.types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
    isAuthenticated: boolean;
    isLoading: boolean;
    user: User | null;
    login: () => Promise<void>;
    logout: () => Promise<void>;
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
                    if (success) {
                        set({ user, isAuthenticated: true })
                    }
                } else {
                    set({ user: null })
                }
                set({ isLoading: false })
            },

            logout: async () => {
                const { success } = await AUTH_SERVICES.logout()
                set({ user: null, isAuthenticated: false, isLoading: false })
            },

            refreshToken: async () => {
                try {
                    const res = await authApi.authControllerRefreshToken();
                    return true
                } catch (err) {
                    return false
                }
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
