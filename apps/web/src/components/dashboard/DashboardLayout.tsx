'use client'

import { Box, Container } from '@mui/material';
import { ReactNode } from 'react';

interface DashboardLayoutProps {
  children: ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <Box sx={{
      minHeight: '100vh',
      backgroundColor: 'background.default',
      pb: 4
    }}>
      <Container
        maxWidth="xl"
        sx={{
          pt: 4,
          px: { xs: 2, sm: 3, md: 4 },
          mx: 'auto',
        }}
      >
        {children}
      </Container>
    </Box>
  );
}