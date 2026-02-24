"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner"; // If sonner isn't set up, it won't break unless the toast is not imported. Looking at package.json, sonner is present!

interface User {
    email: string;
    name?: string;
}

interface AuthContextType {
    user: User | null;
    login: (email: string, password: string) => Promise<boolean>;
    logout: () => void;
    isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        // Check local storage on initial load
        const storedUser = localStorage.getItem("dummy_auth_user");
        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser));
            } catch (e) {
                console.error("Failed to parse stored user", e);
            }
        }
        setIsLoading(false);
    }, []);

    const login = async (email: string, password: string) => {
        if (email === "demo@example.com" && password === "demo123") {
            const newUser = { email };
            setUser(newUser);
            localStorage.setItem("dummy_auth_user", JSON.stringify(newUser));
            toast.success("Logged in successfully");
            return true;
        }
        toast.error("Invalid email or password");
        return false;
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("dummy_auth_user");
        toast.success("Logged out");
        router.push("/login");
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
