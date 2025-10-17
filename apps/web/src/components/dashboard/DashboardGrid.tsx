'use client';

import { Box, styled, useTheme, useMediaQuery } from '@mui/material';
import { ReactNode } from 'react';

// CSS Grid with MUI integration
const GridContainer = styled(Box)(({ theme }) => ({
  display: 'grid',
  gap: theme.spacing(3),
  width: '100%',

  // Desktop: 4 columns with named areas
  gridTemplateColumns: 'repeat(4, 1fr)',
  gridTemplateAreas: `
    "metric1 metric2 metric3 metric4"
    "chart1 chart1 chart2 chart2"
    "table1 table1 table2 table2"
  `,

  // Responsive breakpoint
  [theme.breakpoints.down('md')]: {
    gridTemplateColumns: 'repeat(2, 1fr)',
    gridTemplateAreas: `
      "metric1 metric2"
      "metric3 metric4"
      "chart1 chart1"
      "chart2 chart2"
    `,
    gap: theme.spacing(2.5),
  },

  [theme.breakpoints.down('sm')]: {
    gridTemplateColumns: '1fr',
    gridTemplateAreas: 'none', // Let items flow naturally
    gap: theme.spacing(2),
  },

}));

interface WidgetAreaProps {
  children: ReactNode;
  gridArea?: string;
  mobileOrder?: number; // Control mobile stacking order
}

// Filter out custom props to prevent DOM leakage
const WidgetArea = styled(Box, {
  // Filtering props
  shouldForwardProp: (prop) =>
    prop !== 'gridArea' && prop !== 'mobileOrder'
})<WidgetAreaProps>(({ theme, gridArea, mobileOrder }) => ({
  // Use grid area on desktop/tablet
  gridArea,
  minHeight: '200px',
  display: 'flex',
  flexDirection: 'column',

  // Mobile: ignore grid area, use order for stacking
  [theme.breakpoints.down('sm')]: {
    gridArea: 'unset',
    order: mobileOrder || 0,
  },

  '& > *': {
    flex: 1,
    height: '100%',
  },
}));

// Hook for responsive grid behavior
export function useResponsiveGrid() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

  return { isMobile, isTablet, isDesktop };
}

interface DashboardGridProps {
  children: ReactNode;
}


export function DashboardGrid({ children }: DashboardGridProps) {
  return (
    <>
      <GridContainer>
        {children}
      </GridContainer>
    </>
  );
}

export { WidgetArea };