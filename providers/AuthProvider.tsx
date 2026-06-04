"use client";

import {
    createContext,
    useContext,
    useEffect,
    useState,
    useCallback,
} from "react";
import { useRouter } from "next/navigation";
import { authApi, getToken, setToken, removeToken } from "@/lib/api";
import type { User } from "@/lib/api";

interface AuthContextType {
    user: User | null;
    loading: boolean;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    updateUser: (user: User) => void;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    loading: true,
    login: async () => { },
    logout: async () => { },
    updateUser: () => { },
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    // Cek token dan fetch user saat pertama load
    useEffect(() => {
        const init = async () => {
            const token = getToken();
            if (!token) {
                setLoading(false);
                return;
            }

            try {
                const res = await authApi.me();
                setUser(res.data);
            } catch {
                // Token tidak valid, hapus
                removeToken();
            } finally {
                setLoading(false);
            }
        };

        init();
    }, []);

    const login = useCallback(async (email: string, password: string) => {
        const res = await authApi.login({ email, password });
        setToken(res.data.token);
        setUser(res.data.user);
        router.push('/dashboard');
    }, [router]);

    const logout = useCallback(async () => {
        try {
            await authApi.logout();
        } catch {
            // Tetap logout meski API error
        } finally {
            removeToken();
            setUser(null);
            router.push('/login');
        }
    }, [router]);

    const updateUser = useCallback((updatedUser: User) => {
        setUser(updatedUser);
    }, []);

    return (
        <AuthContext.Provider value={{ user, loading, login, logout, updateUser }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);