'use client'

import { Container, Typography, Box, Grid, Divider } from '@mui/material';
import {
  TrendingUp,
  AttachMoney,
  People,
  ShoppingCart,
  Timeline
} from '@mui/icons-material';
import { calculateTrend } from "@/lib/trend-calculator"
import { MetricCard } from '@/components/ui/MetricCard'

export default function TestUtilsPage() {
  // Test data for our MetricCard components
  const metricTestCases = [
    {
      title: "Total Revenue",
      value: 125000,
      previousValue: 112000,
      format: "currency" as const,
      icon: <AttachMoney />
    },
    {
      title: "Conversion Rate",
      value: 3.2,
      previousValue: 2.8,
      format: "percentage" as const,
      icon: <TrendingUp />
    },
    {
      title: "Active Users",
      value: 8420,
      previousValue: 8100,
      format: "number" as const,
      icon: <People />
    },
    {
      title: "Orders Today",
      value: 89,
      format: "number" as const,
      icon: <ShoppingCart />,
      trend: "up" as const  // Manual trend
    }
  ];

  const calculatorTests = [
    { current: 120, previous: 100, description: "20% increase" },
    { current: 100, previous: 120, description: "16.7% decrease" },
    { current: 100, previous: 100, description: "No change" },
    { current: 100, previous: 0, description: "From zero" },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        🧪 Component Testing Lab
      </Typography>
      <Typography variant="body1" paragraph color="text.secondary">
        Professional component testing and development verification.
      </Typography>

      {/* MetricCard Component Tests */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h5" gutterBottom>
          📊 MetricCard Component Tests
        </Typography>

        <Grid container spacing={3} sx={{ mb: 4 }}>
          {metricTestCases.map((metric, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
              <MetricCard
                title={metric.title}
                value={metric.value}
                previousValue={metric.previousValue}
                format={metric.format}
                icon={metric.icon}
                trend={metric.trend}
              />
            </Grid>
          ))}
        </Grid>

        {/* Different sizes */}
        <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
          Size Variations
        </Typography>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 4 }}>
            <MetricCard
              title="Small Card"
              value={42000}
              previousValue={38000}
              format="currency"
              size="small"
              icon={<Timeline />}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <MetricCard
              title="Medium Card (default)"
              value={42000}
              previousValue={38000}
              format="currency"
              size="medium"
              icon={<Timeline />}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <MetricCard
              title="Large Card"
              value={42000}
              previousValue={38000}
              format="currency"
              size="large"
              icon={<Timeline />}
            />
          </Grid>
        </Grid>

        {/* Loading state */}
        <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
          Loading State
        </Typography>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 6 }}>
            <MetricCard
              title="Loading Revenue Data"
              value={0}
              format="currency"
              loading={true}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <MetricCard
              title="Loading User Count"
              value={0}
              format="number"
              loading={true}
              icon={<People />}
            />
          </Grid>
        </Grid>
      </Box>

      <Divider sx={{ my: 4 }} />

      {/* Original Trend Calculator Tests */}
      <Box>
        <Typography variant="h5" gutterBottom>
          🔧 Trend Calculator Utility Tests
        </Typography>
        <Grid container spacing={2}>
          {calculatorTests.map((testCase, index) => {
            const result = calculateTrend(testCase.current, testCase.previous);

            return (
              <Grid size={{ xs: 12, md: 6 }} key={index}>
                <Box sx={{ p: 2, border: '1px solid #e0e0e0', borderRadius: 1 }}>
                  <Typography variant="h6">{testCase.description}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Current: {testCase.current}, Previous: {testCase.previous}
                  </Typography>
                  <Typography variant="body1" sx={{ mt: 1 }}>
                    <strong>Direction:</strong> {result.direction} |
                    <strong> Change:</strong> {result.formattedChange} |
                    <strong> Significant:</strong> {result.isSignificant ? 'Yes' : 'No'}
                  </Typography>
                </Box>
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </Container>
  );
}