'use client';

import React from "react";
import Link from "next/link";
import { AppBar, Toolbar, IconButton, Typography, Box, Button } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu'

interface TopNavProps {
  onToggleSidebar?: () => void;
}

export const TopNav: React.FC<TopNavProps> = ({ onToggleSidebar }) => {
  return (
    <AppBar position="static" color="transparent" elevation={0} sx={{ borderBottom: 1, borderColor: 'divider' }}>
      <Toolbar sx={{ px: {xs: 2, md: 4} }}>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="open sidebar"
          onClick={onToggleSidebar}
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>

        <Box sx={{ flexGrow: 1 }}>
          <Link href="/" passHref>
            <Button color="inherit" sx={{ textTransform: 'none' }}>
              <Typography variant="h6" component="span" color="text.primary">
                Analytics Dashboard
              </Typography>
            </Button>
          </Link>
        </Box>

        <Box sx={{display: 'flex', gap: 1 }}>
          <Link href="/dashboard" passHref>
            <Button>Dashboard</Button>
          </Link>
          <Link href="/reports" passHref>
            <Button>Reports</Button>
          </Link>
          <Link href="/settings" passHref>
            <Button>Settings</Button>
          </Link>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default TopNav;