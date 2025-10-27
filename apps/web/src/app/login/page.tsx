'use client';

import React from 'react';
import { Box, Typography, Button, TextField } from '@mui/material';
import { useAuth } from '@/lib/auth/AuthProvider';
import { useRouter, useSearchParams } from 'next/navigation';

export default function LoginPage() {
    const { signin } = useAuth();
    const router = useRouter();
    const searchParams = useSearchParams();
    const next = searchParams?.get('next') ? decodeURIComponent(searchParams.get('next')!) : '/dashboard';
    const [name, setName] = React.useState('Demo User');

    const handleLogin = async () => {
        await signin(name);
        router.replace(next);
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
                sx={{ mb: 2 }}
            />
            <Button variant='contained' onClick={handleLogin}>
                Sign in (mock)
            </Button>
        </Box>
    );
}