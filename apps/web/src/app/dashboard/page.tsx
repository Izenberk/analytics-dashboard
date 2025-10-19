'use client';

// React and Next.js imports
import React from 'react';

// Internal component imports (organized by feature)
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { DashboardGrid, WidgetArea, useResponsiveGrid } from "@/components/dashboard/DashboardGrid";
import { MetricCard } from '@/components/ui/MetricCard';
import { ChartCard } from '@/components/ui/ChartCard';

// Error handling imports
import { WidgetErrorBoundary } from '@/components/error-boundaries';
import { WidgetErrorHandler } from '@/lib/error-handling/WidgetErrorHandler';

// Data imports
import { mockMetrics, mockCharts } from "@/lib/mock-data";

export default function DashboardPage() {
  const { isMobile, isTablet, isDesktop } = useResponsiveGrid();

  return (
    <DashboardLayout>
      <DashboardHeader />

      <DashboardGrid>
        {/* Refactored Metric Widgets - Professional Pattern */}
        <WidgetArea gridArea="metric1" mobileOrder={1}>
          <WidgetErrorBoundary
            widgetId="total-revenue"
            widgetType="metric"
            onError={WidgetErrorHandler.createMetricErrorHandler('total-revenue')}
          >
            <MetricCard {...mockMetrics[0]} />
          </WidgetErrorBoundary>
        </WidgetArea>

        <WidgetArea gridArea="metric2" mobileOrder={2}>
          <WidgetErrorBoundary
            widgetId="active-users"
            widgetType="metric"
            onError={WidgetErrorHandler.createMetricErrorHandler('active-users')}
          >
            <MetricCard {...mockMetrics[1]} />
          </WidgetErrorBoundary>
        </WidgetArea>

        <WidgetArea gridArea="metric3" mobileOrder={3}>
          <WidgetErrorBoundary
            widgetId="conversion-rate"
            widgetType="metric"
            onError={WidgetErrorHandler.createMetricErrorHandler('conversion-rate')}
          >
            <MetricCard {...mockMetrics[2]} />
          </WidgetErrorBoundary>
        </WidgetArea>

        <WidgetArea gridArea="metric4" mobileOrder={4}>
          <WidgetErrorBoundary
            widgetId="avg-order-value"
            widgetType="metric"
            onError={WidgetErrorHandler.createMetricErrorHandler('avg-order-value')}
          >
            <MetricCard {...mockMetrics[3]} />
          </WidgetErrorBoundary>
        </WidgetArea>

        {/* Professional: Chart widgets with specialized error handling */}
        <WidgetArea gridArea="chart1" mobileOrder={5}>
          <WidgetErrorBoundary
            widgetId="revenue-chart"
            widgetType="chart"
            maxRetries={2}
            onError={WidgetErrorHandler.createChartErrorHandler('revenue-chart', 'revenue-trends')}
          >
            <ChartCard {...mockCharts[0]} />
          </WidgetErrorBoundary>
        </WidgetArea>

        <WidgetArea gridArea="chart2" mobileOrder={6}>
          <WidgetErrorBoundary
            widgetId="users-chart"
            widgetType="chart"
            maxRetries={2}
            onError={WidgetErrorHandler.createChartErrorHandler('users-chart', 'user-analytics')}
          >
            <ChartCard {...mockCharts[1]} />
          </WidgetErrorBoundary>
        </WidgetArea>
      </DashboardGrid>
    </DashboardLayout>
  );
}