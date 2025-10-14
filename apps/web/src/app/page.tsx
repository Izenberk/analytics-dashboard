'use client';

/**
 * Home Page - Client Component
 *
 * Marked as 'use client' because:
 * 1. Uses MUI interactive components
 * 2. Will eventually have event handlers (onClick, etc.)
 * 3. MUI components need browser context for styling
 */

import { Typography, Container, Box, Stack } from "@mui/material";
import { AnalyticsButton } from '@/components/ui/AnalyticsButton';
import {
  Dashboard,
  TrendingUp,
  PieChart,
  BarChart,
  Timeline,
} from '@mui/icons-material';

export default function Home() {
  // Event handlers for our buttons (professional practice)
  const handleDashboardClick = () => {
    console.log('Dashboard clicked');
  };

  const handleGrowthClick = () => {
    console.log('Growth metrics clicked');
  };

  const handleChartsClick = () => {
    console.log('Charts view clicked');
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box textAlign="center" mb={6}>
        <Typography variant="h1" component="h1" gutterBottom color="primary">
          Analytics Dashboard
        </Typography>
        <Typography variant="h5" component="p" color="text.secondary" mb={4}>
          Professional analytics dashboard build with Next.js and MUI
        </Typography>
      </Box>

      {/* Test our AnalyticsButton component */}
      <Box mb={6}>
        <Typography variant="h3" gutterBottom>
          🔘 Testing Our Analytics Buttons
        </Typography>

        <Stack direction="row" spacing={2} flexWrap="wrap" gap={2}>
          <AnalyticsButton
            analyticsType="primary"
            startIcon={<Dashboard />}
            onClick={handleDashboardClick}
          >
            Dashboard
          </AnalyticsButton>

          <AnalyticsButton
            analyticsType="success"
            startIcon={<TrendingUp />}
            onClick={handleGrowthClick}
          >
            Growth +12%
          </AnalyticsButton>

          <AnalyticsButton
            analyticsType="warning"
            variant="outlined"
            startIcon={<PieChart />}
            onClick={handleChartsClick}
          >
            View Charts
          </AnalyticsButton>

          <AnalyticsButton
            analyticsType="error"
            variant="text"
            startIcon={<BarChart />}
          >
            Critical Alert
          </AnalyticsButton>

          <AnalyticsButton
            loading
            analyticsType="secondary"
            startIcon={<Timeline />}
          >
            Fetching Data
          </AnalyticsButton>
        </Stack>
      </Box>

      {/* Test MUI Typography */}
      <Box mb={4}>
        <Typography variant="h3" gutterBottom>
          📊 Dashboard Preview
        </Typography>
        <Typography variant="body1" paragraph>
          This is our analytics dashboard built with professional tools and practices.
          We&apos;re using MUI for consistent, accessible components and our custom theme
          for analytics-specific styling.
        </Typography>
      </Box>
    </Container>
  );
}
