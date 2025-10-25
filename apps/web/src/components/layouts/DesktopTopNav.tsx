'use client';

import React from 'react';
import Link from 'next/link';
import { AppBar, Toolbar, IconButton, Typography, Box, Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useUiStore } from '@/lib/ui/useUiStore';

/**
 * DesktopTopNav
 * - Full navigation shown on desktop / wide screens.
 * - Part of the normal document flow (position static), so it affects layout.
 */
export const DesktopTopNav: React.FC = () => {
  const toggleSidebar = useUiStore((s) => s.toggleSidebar);

  return (
    <AppBar position="static" color="transparent" elevation={0} sx={{ borderBottom: 1, borderColor: 'divider' }}>
      <Toolbar sx={{ px: { xs: 2, md: 4 } }}>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="open sidebar"
          onClick={toggleSidebar}
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>

        <Box sx={{ flexGrow: 1 }}>
          <Link href="/" legacyBehavior={false}>
            <Button component="span" color="inherit" sx={{ textTransform: 'none' }}>
              <Typography variant="h6" component="span" color="text.primary">
                Analytics Dashboard
              </Typography>
            </Button>
          </Link>
        </Box>

        <Box sx={{ display: 'flex', gap: 1 }}>
          <Link href="/dashboard"><Button component="span">Dashboard</Button></Link>
          <Link href="/reports"><Button component="span">Reports</Button></Link>
          <Link href="/settings"><Button component="span">Settings</Button></Link>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default DesktopTopNav;