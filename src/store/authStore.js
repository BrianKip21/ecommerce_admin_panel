import { create } from "zustand";
import * as authService from "../services/auth.service";

export const useAuthStore = create((set) => ({
    admin: null,
    loading: true,
    error: null,

    init: async () => {
        try {
            const res = await authService.getMe();
            set({ admin: res, loading: false });
        } catch {
            set({ admin: null, loading: false });
        }
    },

    login: async (payload) => {
        set({ error: null });
        const res = await authService.login(payload);

        if (res.role && res.role !== "admin") {
            throw { message: "This account does not have admin access" };
        }

        set({ admin: res });
        return res;
    },

    logout: async () => {
        await authService.logout();
        set({ admin: null });
    }
}));
