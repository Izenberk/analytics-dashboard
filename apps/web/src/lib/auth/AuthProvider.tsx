'use client';

import React from "react";

type User = { id: string; name: string } | null;

type AuthContext = {
    user: User;
    signin: (name?: string) => Promise<void>;
    signout: () => Promise<void>
};

const AuthContext = React.createContext<AuthContext | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = React.useState<User>(() => {
        try {
            const raw = typeof window !== 'undefined' ? localStorage.getItem('mock_user') : null;
            return raw ? JSON.parse(raw) as User : null;
        } catch {
            return null;
        }
    });

    const signin = async (name = 'Demo User') => {
        const u = { id: '1', name };
        setUser(u);
        try {
            localStorage.setItem('mock_user', JSON.stringify(u));
        } catch {
            // ignore localStorage errors in dev
        }
    };

    const signout = async () => {
        setUser(null);
        try {
            localStorage.removeItem('mock_user');
        } catch {}
    };

    return <AuthContext.Provider value={{ user, signin, signout }}>{children}</AuthContext.Provider>;
};

export function useAuth() {
    const ctx = React.useContext(AuthContext);
    if (!ctx) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return ctx;
}