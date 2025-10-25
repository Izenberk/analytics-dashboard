'use client'

import React from 'react';
import Box from '@mui/material/Box';
import TopNav from '@/components/layouts/TopNav';
import Sidebar from '@/components/layouts/Sidebar';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', flexDirection: 'column' }}>
      <TopNav />
      <Sidebar />

      <Box component="main" sx={{ flex: 1, p: { xs: 2, md: 4 }, backgroundColor: 'background.default' }}>
        {children}
      </Box>
    </Box>
  );
}