'use client';

/**
 * Home Page - Client Component
 *
 * Marked as 'use client' because:
 * 1. Uses MUI interactive components
 * 2. Will eventually have event handlers (onClick, etc.)
 * 3. MUI components need browser context for styling
 */

import { Typography, Container, Box, Stack, Button, Paper, Grid } from "@mui/material";
import {
  Dashboard as DashboardIcon,
  Code as CodeIcon
} from '@mui/icons-material';
import Link from 'next/link';
import { MetricCard } from '@/components/ui/MetricCard';
import { mockMetrics } from "@/lib/mock-data";

export default function HomePage() {
  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Box sx={{textAlign:"center", mb: 6}} >
        <Typography variant="h2" component="h1" gutterBottom>
          Analytics Dashboard
        </Typography>
        <Typography variant="h5" component="p" color="text.secondary" paragraph>
          Professional React Component Library
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          Clean architecture • TypeScript • Material-UI • Recharts
        </Typography>

        <Stack direction="row" spacing={2} justifyContent="center" sx={{ mt: 4}}>
          <Button
            component={Link}
            href="/test-utils"
            variant="contained"
            size="large"
            startIcon={<CodeIcon />}
          >
            View Components
          </Button>
          <Button
            component={Link}
            href="/dashboard"
            variant="contained"
            size="large"
            startIcon={<DashboardIcon />}
          >
            View Dashboard
          </Button>
        </Stack>
      </Box>

      {/* Component Preview */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h4" gutterBottom align="center">
          Component Library Preview
        </Typography>

        <Grid container spacing={3} sx={{ flexGrow: 1, mt: 2 }}>
          {mockMetrics.slice(0, 4).map((metric, index) => (
            <Grid key={index} size={{ xs: 12, sm: 6, md: 3 }}>
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
      </Box>

      {/* Technical Details */}
      <Paper sx={{ p: 4, bgcolor: 'background.default' }}>
        <Typography variant="h5" gutterBottom>
          Technical Architecture
        </Typography>
        <Grid container spacing={3} sx={{ flexGrow: 1 }}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="h6" color="primary" gutterBottom>
              Frontend Stack
            </Typography>
            <Typography variant="body2" paragraph>
              • Next.js with App Router for performance<br/>
              • TypeScript for type safety<br/>
              • Material-UI component system<br/>
              • Recharts for interactive data visualization
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="h6" color="primary" gutterBottom>
              Architecture Patterns
            </Typography>
            <Typography variant="body2" paragraph>
              • Clean architecture with separation of concerns<br/>
              • Type-safe component APIs<br/>
              • Centralized utility functions<br/>
              • Professional component composition
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}
