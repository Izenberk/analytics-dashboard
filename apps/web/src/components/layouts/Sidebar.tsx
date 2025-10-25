'use client';

import React from "react";
import Link from 'next/link';
import { Box, Drawer, List, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { Dashboard, BarChart, Settings } from "@mui/icons-material";

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ open, onClose }) => {
  return (
    <Drawer open={open} onClose={onClose} variant="temporary" ModalProps={{ keepMounted: true }}>
      <Box sx={{ width: 260 }} role="presentation" onClick={onClose} onKeyDown={onClose}>
        <List>
          <Link href="/dashboard" passHref>
            <ListItemButton>
              <ListItemIcon><Dashboard /></ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItemButton>
          </Link>

          <Link href="/reports" passHref>
            <ListItemIcon><BarChart /></ListItemIcon>
            <ListItemText primary="Reports" />
          </Link>

          <Link href="/settings" passHref>
          <ListItemIcon><Settings /></ListItemIcon>
          <ListItemText primary="Settings" />
          </Link>
        </List>
      </Box>
    </Drawer>
  );
};

export default Sidebar;