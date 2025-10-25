/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React from "react";
import Link from 'next/link';
import { Box, Drawer, List, ListItemButton, ListItemIcon, ListItemText, useTheme, useMediaQuery } from "@mui/material";
import { Dashboard, BarChart, Settings, Home } from "@mui/icons-material";
import { useUiStore } from "@/lib/ui/useUiStore";

/**
 * Sidebar
 *
 * Behavior:
 * - Uses shared useUiStore for open state.
 * - Ensures when the drawer closes we restore focus to the mobile menu button
 *   so no hidden focused element remains (prevents aria-hidden focus warning).
 */
export const Sidebar: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const open = useUiStore((s) => s.sidebarOpen);
  const setSidebarOpen = useUiStore((s) => s.setSidebarOpen);

  // Close drawer by default on mobile when breakpoint is entered
  React.useEffect(() => {
    if (isMobile) setSidebarOpen(false);
  }, [isMobile, setSidebarOpen]);

  // Track previous 'open' value to detect close transitions
  const prevOpenRef = React.useRef(open);
  React.useEffect(() => {
    // on transition from true -> false, restore focus (mobile only)
    if (prevOpenRef.current === true && open === false && isMobile) {
      // Try to focus the mobile toggle button so focus does not remain inside the hidden drawer
      const btn = document.getElementById('mobile-menu-button') as HTMLElement | null;
      if (btn) {
        btn.focus();
      } else {
        // Fallback: focus the document body to avoid a focused-but-hidden element
        (document.activeElement as HTMLElement | null)?.blur();
      }
    }
    prevOpenRef.current = open;
  }, [open, isMobile]);

  const handleClose = () => {
    setSidebarOpen(false);
    // we can call focus here as well to be extra-safe
    if (isMobile) {
      const btn = document.getElementById('mobile-menu-button') as HTMLElement | null;
      if (btn) btn.focus();
    }
  };

  return (
    <Drawer
      open={open}
      onClose={handleClose}
      variant="temporary"
      ModalProps={{ keepMounted: true }}
    >
      <Box sx={{ width: 260 }} role="presentation" onKeyDown={handleClose}>
        <List>
          <ListItemButton component={Link as any} href="/" onClick={() => setSidebarOpen(false)}>
            <ListItemIcon><Home /></ListItemIcon>
            <ListItemText primary="Home" />
          </ListItemButton>
          <ListItemButton component={Link as any} href="/dashboard" onClick={() => setSidebarOpen(false)}>
            <ListItemIcon><Dashboard /></ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItemButton>

          <ListItemButton component={Link as any} href="/reports" onClick={() => setSidebarOpen(false)}>
            <ListItemIcon><BarChart /></ListItemIcon>
            <ListItemText primary="Reports" />
          </ListItemButton>

          <ListItemButton component={Link as any} href="/settings" onClick={() => setSidebarOpen(false)}>
            <ListItemIcon><Settings /></ListItemIcon>
            <ListItemText primary="Settings" />
          </ListItemButton>
        </List>
      </Box>
    </Drawer>
  );
};

export default Sidebar;