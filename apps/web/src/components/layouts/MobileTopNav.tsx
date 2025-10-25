'use client';

import React from "react";
import { AppBar, Toolbar, IconButton, Typography, Box, useTheme, useMediaQuery } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import { useUiStore } from '@/lib/ui/useUiStore';

/**
 * MobileTopNav
 * - Minimal fixed app bar for mobile: only the hamburger.
 * - Fixed overlay so it does NOT change layout flow (no "trace" when hidden).
 * - Hides itself while the sidebar is open to avoid duplication.
 *
 * Note: the IconButton includes an id so Sidebar can return focus to it after closing.
 */
export const MobileTopNav: React.FC = () => {
  const toggleSidebar = useUiStore((s) => s.toggleSidebar);
  const sidebarOpen = useUiStore((s) => s.sidebarOpen);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  if (!isMobile) return null;
  if (sidebarOpen) return null;

  return (
    <AppBar
      position="fixed"
      color="transparent"
      elevation={1}
      sx={{
        top: 0,
        left: 0,
        right: 0,
        zIndex: (theme) => theme.zIndex.drawer + 2,
        background: 'rgba(255,255,255,0.05)',
        backdropFilter: 'saturate(180%) blur(4px)',
        borderBottom: 1,
        borderColor: 'divider',
      }}
    >
      <Toolbar sx={{ px: { xs: 1, md: 4 }, minHeight: 56 }}>
        <IconButton
          id="mobile-menu-button"           // stable id for focus restore
          edge="start"
          color="inherit"
          aria-label="open menu"
          onClick={toggleSidebar}
          sx={{ mx: 1 }}
        >
          <MenuIcon />
        </IconButton>

        <Typography component="span" sx={{ position: 'absolute', left: -10000, top: 'auto', width: 1, height: 1, overflow: 'hidden' }}>
          Analytics Dashboard
        </Typography>

        <Box sx={{ flex: 1 }} />
      </Toolbar>
    </AppBar>
  );
};

export default MobileTopNav;