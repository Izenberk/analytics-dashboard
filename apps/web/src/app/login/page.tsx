'use client';

import React, { Suspense } from 'react';
import { Box, CircularProgress } from '@mui/material';
import { useAuth } from '@/lib/auth/AuthProvider';
import { useRouter, useSearchParams } from 'next/navigation';
import { LoginForm } from '@/components/auth/LoginForm';

export default function LoginPage() {
    return (
        <Suspense fallback={<LoginPageSkeleton />}>
            <LoginForm />
        </Suspense>
    );
}

function LoginPageSkeleton() {
    return (
        <Box
            sx={{
                maxWidth: 560,
                mx: 'auto',
                mt: 8,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: 200
            }}
        >
            <CircularProgress />
        </Box>
    );
}