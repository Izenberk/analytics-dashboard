'use client';

import React from 'react';
import { Box, Typography, Button, TextField } from '@mui/material';
import { useAuth } from '@/lib/auth/AuthProvider';
import { useRouter, useSearchParams } from 'next/navigation';


export function LoginForm() {
    const { signin } = useAuth();
    const router = useRouter();
    const searchParams = useSearchParams();

    // Extract the 'next' parameter or default to dashboard
    const next = searchParams?.get('next')
        ? decodeURIComponent(searchParams.get('next')!)
        : '/dashboard';

    const [name, setName] = React.useState('Demo User');
    const [isLoading, setIsLoading] = React.useState(false);

    const handleLogin = async () => {
        try {
            setIsLoading(true);
            await signin(name);
            router.replace(next);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !isLoading) {
            handleLogin();
        }
    };

    return (
        <Box sx={{ maxWidth: 560, mx: 'auto', mt: 8 }}>
            <Typography variant='h4' gutterBottom>
                Sign in
            </Typography>

            <TextField
                fullWidth
                label="Name (mock)"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={isLoading}
                sx={{ mb: 2 }}
                autoFocus
            />
            <Button
                variant='contained'
                onClick={handleLogin}
                disabled={isLoading}
                fullWidth
            >
                {isLoading ? 'Signing in...' : 'Sign in (mock)'}
            </Button>
        </Box>
    );
}