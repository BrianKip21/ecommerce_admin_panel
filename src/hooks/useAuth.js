import { useAuthStore } from "../store/authStore";

// Thin convenience hook so components don't need to know the store shape
export function useAuth() {
    const admin = useAuthStore((s) => s.admin);
    const loading = useAuthStore((s) => s.loading);
    const login = useAuthStore((s) => s.login);
    const logout = useAuthStore((s) => s.logout);

    return { admin, loading, isAuthenticated: !!admin, login, logout };
}
