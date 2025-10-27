'use client';

// React and Next.js imports
import React from 'react';

// Internal component imports (organized by feature)
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { DashboardGrid, WidgetArea, useResponsiveGrid } from "@/components/dashboard/DashboardGrid";

// Error handling imports
import { WidgetErrorBoundary } from '@/components/error-boundaries';
import { WidgetErrorHandler } from '@/lib/error-handling/WidgetErrorHandler';

// Data imports
import { mockMetrics, mockCharts } from "@/lib/mock-data";
import { AsyncWidget } from '@/components/widgets/AsyncWidgets';

// Presentational card
import WidgetCard from '@/components/dashboard/WidgetCard';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';

/** small helper to humanize IDs -> "total-revenue" => "Total Revenue" */
function humanizeId(id: string) {
  return id
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, (ch) => ch.toUpperCase());
}

export default function DashboardPage() {
  const { isMobile, isTablet, isDesktop } = useResponsiveGrid();
  const [configureWidgetId, setConfigureWidgetId] = React.useState<string | null>(null);

  const handleConfigureClick = (widgetId: string) => {
    setConfigureWidgetId(widgetId);
  };

  const handleCloseConfig = () => {
    setConfigureWidgetId(null);
  };

  return (
    <DashboardLayout>
      <DashboardHeader />

      <DashboardGrid>
        {/* 1. Total Revenue - Async Financial KPI */}
        <WidgetArea gridArea="metric1" mobileOrder={1}>
          <WidgetCard id="total-revenue" title={humanizeId('total-revenue')} onConfigureClick={handleConfigureClick}>
            <WidgetErrorBoundary 
              widgetId="total-revenue" 
              widgetType="metric"
              onError={WidgetErrorHandler.createMetricErrorHandler('total-revenue')}
            >
              <AsyncWidget.Metric 
                widgetId="total-revenue"
                icon={mockMetrics[0]?.icon}
                size="medium"
              />
            </WidgetErrorBoundary>
          </WidgetCard>
        </WidgetArea>

        {/* 2. Active Users - Async User Analytics KPI */}
        <WidgetArea gridArea="metric2" mobileOrder={2}>
          <WidgetCard id="conversion-rate" title={humanizeId('conversion-rate')} onConfigureClick={handleConfigureClick}>
            <WidgetErrorBoundary 
              widgetId="active-users" 
              widgetType="metric"
              onError={WidgetErrorHandler.createMetricErrorHandler('active-users')}
            >
              <AsyncWidget.Metric 
                widgetId="active-users"
                icon={mockMetrics[1]?.icon}
                size="medium"
              />
            </WidgetErrorBoundary>
          </WidgetCard>
        </WidgetArea>

        {/* 3. Conversion Rate - Async Performance KPI */}
        <WidgetArea gridArea="metric3" mobileOrder={3}>
          <WidgetCard id="active-users" title={humanizeId('active-users')} onConfigureClick={handleConfigureClick}>
            <WidgetErrorBoundary 
              widgetId="conversion-rate" 
              widgetType="metric"
              onError={WidgetErrorHandler.createMetricErrorHandler('conversion-rate')}
            >
              <AsyncWidget.Metric 
                widgetId="conversion-rate"
                icon={mockMetrics[2]?.icon}
                size="medium"
              />
            </WidgetErrorBoundary>
          </WidgetCard>
        </WidgetArea>

        {/* 4. Average Order Value - Async Business KPI */}
        <WidgetArea gridArea="metric4" mobileOrder={4}>
          <WidgetCard id="avg-order-value" title={humanizeId('avg-order-value')} onConfigureClick={handleConfigureClick}>
            <WidgetErrorBoundary 
              widgetId="avg-order-value" 
              widgetType="metric"
              onError={WidgetErrorHandler.createMetricErrorHandler('avg-order-value')}
            >
              <AsyncWidget.Metric 
                widgetId="avg-order-value"
                icon={mockMetrics[3]?.icon}
                size="medium"
              />
            </WidgetErrorBoundary>
          </WidgetCard>
        </WidgetArea>

        {/* Chart widgets with specialized error handling */}
        {/* 1. Revenue Chart - Async Financial Trend Analysis */}
        <WidgetArea gridArea="chart1" mobileOrder={5}>
          <WidgetCard id="revenue-chart" title={humanizeId('revenue-chart')} onConfigureClick={handleConfigureClick}>
            <WidgetErrorBoundary 
              widgetId="revenue-chart" 
              widgetType="chart"
              maxRetries={2}
              onError={WidgetErrorHandler.createChartErrorHandler('revenue-chart', 'revenue-trends')}
            >
              <AsyncWidget.Chart 
                widgetId="revenue-chart"
                icon={mockCharts[0]?.icon}
                height="medium"
                showGrid={true}
                showTooltip={true}
              />
            </WidgetErrorBoundary>
          </WidgetCard>
        </WidgetArea>

        {/* 2. Users Chart - Async User Growth Analysis */}
        <WidgetArea gridArea="chart2" mobileOrder={6}>
          <WidgetCard id="users-chart" title={humanizeId('users-chart')} onConfigureClick={handleConfigureClick}>
            <WidgetErrorBoundary 
              widgetId="users-chart" 
              widgetType="chart"
              maxRetries={2}
              onError={WidgetErrorHandler.createChartErrorHandler('users-chart', 'user-analytics')}
            >
              <AsyncWidget.Chart 
                widgetId="users-chart"
                icon={mockCharts[1]?.icon}
                height="medium"
                showGrid={true}
                showTooltip={true}
              />
            </WidgetErrorBoundary>
          </WidgetCard>
        </WidgetArea>
      </DashboardGrid>

      {/* Simple placeholder config dialog — later replace with WidgetConfigModal */}
      <Dialog open={Boolean(configureWidgetId)} onClose={handleCloseConfig} fullWidth maxWidth="sm">
        <DialogTitle>Configure widget</DialogTitle>
        <DialogContent>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Configuration for widget: <strong>{configureWidgetId}</strong>
          </Typography>
          <Typography variant="body2" color="text.secondary">
            This is a placeholder dialog. In the next step we will implement a form (title, refresh interval, visible)
            and persist changes to the widget config store.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfig}>Close</Button>
          <Button variant="contained" onClick={() => { /* Later: save changes */ handleCloseConfig(); }}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </DashboardLayout>
  );
}