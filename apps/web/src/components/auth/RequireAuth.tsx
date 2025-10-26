'use client';

import React from "react";
import { useRouter } from "next/navigation";
import { CircularProgress, Box } from "@mui/material";
import { useAuth } from "@/lib/auth/AuthProvider";

export const RequireAuth: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { user } = useAuth();
    const router = useRouter();

    React.useEffect(() => {
        if (user === null) {
            router.replace('/login');
        }
    }, [user, router]);

    // If user is not present, show a spinner while redirect will happen.
    if (!user) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}>
                <CircularProgress />
            </Box>
        );
    }

    return <>{children}</>
};

export default RequireAuth;