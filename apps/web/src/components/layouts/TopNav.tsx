'use client';

import React from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import DesktopTopNav from './DesktopTopNav';
import MobileTopNav from './MobileTopNav';

/**
 * TopNav wrapper
 * - Chooses which top nav to render based on breakpoint.
 * - Keeps layout code simple and keeps the breakpoint check in one place.
 */
const TopNav: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return isMobile ? <MobileTopNav /> : <DesktopTopNav />;
};

export default TopNav;