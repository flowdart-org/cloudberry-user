import { AUTH_SERVICES } from "@/api/auth/auth.service";
import { USER_SERVICES } from "@/api/user/user.service";
import { authApi } from "@/lib/axios";
import { User } from "@/types/user.types";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useCartStore } from "./useCartStore";

interface AuthState {
    isAuthenticated: boolean;
    isLoading: boolean;
    user: User | null;

    setTryOnImage: (image: string) => void;
    decrementTryOnCount: () => void;

    login: () => Promise<void>;
    logout: () => Promise<void>;
    refreshToken: () => Promise<boolean>;
    fetchUser: () => Promise<void>
    updateUser: (data: User) => void;
}
const mockUser: User = {
  id: "1",
  name: "John Doe",
  email: "john@example.com",
  tryOnCount: 3,
  tier: "free",
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      isAuthenticated: false,
      isLoading: true,
      user: mockUser,

      login: async () => {
        set({ isAuthenticated: true });
        await get().fetchUser();
      },

      fetchUser: async () => {
        if (get().isAuthenticated) {
          try {
            const { success, data: user } = await USER_SERVICES.me();

            if (success) {
              set({ user, isAuthenticated: true });
              useCartStore.getState().getInitialCart()
            }
          } catch (error: any) {
            const code = error?.response?.data?.error?.code;

            if (code === "ForbiddenException") {
              get().logout();
            }
          }
        } else {
          set({ user: null });
        }

        set({ isLoading: false });
      },

      logout: async () => {
        await AUTH_SERVICES.logout();
        set({ user: null, isAuthenticated: false, isLoading: false });
      },

      refreshToken: async () => {
        try {
          await authApi.authControllerRefreshToken();
          return true;
        } catch {
          return false;
        }
      },

      updateUser: (updates: User) => {
        set({ user: updates });
      },

      setTryOnImage: (image: string) => {
        set((state) => {
          if (!state.user) return state;
          return { user: { ...state.user, tryOnImage: image } };
        });
      },

      decrementTryOnCount: () => {
        set((state) => {
          if (!state.user) return state;
          return {
            user: {
              ...state.user,
              tryOnCount: Math.max(0, (state.user.tryOnCount ?? 0) - 1),
            },
          };
        });
      },
    }),

    // <-- THIS PART MUST BE OUTSIDE THE STORE FUNCTION
    {
      name: "auth-storage",
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

