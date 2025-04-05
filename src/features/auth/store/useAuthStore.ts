import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  accessToken: string | null;
  setToken: (accessToken: string) => void;
  setAccessToken: (accessToken: string) => void;
  clearToken: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      refreshToken: null,
      expiresAt: null,
      setToken: (accessToken) => {
        set({ accessToken });
      },
      setAccessToken: (accessToken) => {
        set(() => ({
          accessToken,
        }));
      },
      clearToken: () => set({ accessToken: null }),
    }),
    { name: "auth-storage" }
  )
);

export const isLoginChecking = (): boolean => {
  return useAuthStore.getState().accessToken === null;
};
