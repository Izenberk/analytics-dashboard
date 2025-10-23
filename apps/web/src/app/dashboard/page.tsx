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

export default function DashboardPage() {
  const { isMobile, isTablet, isDesktop } = useResponsiveGrid();

  return (
    <DashboardLayout>
      <DashboardHeader />

      <DashboardGrid>
        {/* 1. Total Revenue - Async Financial KPI */}
        <WidgetArea gridArea="metric1" mobileOrder={1}>
          <WidgetErrorBoundary 
            widgetId="total-revenue" 
            widgetType="metric"
            onError={WidgetErrorHandler.createMetricErrorHandler('total-revenue')}
          >
            <AsyncWidget.Metric 
              widgetId="total-revenue"
              icon={mockMetrics[0].icon}
              size="medium"
            />
          </WidgetErrorBoundary>
        </WidgetArea>

        {/* 2. Active Users - Async User Analytics KPI */}
        <WidgetArea gridArea="metric2" mobileOrder={2}>
          <WidgetErrorBoundary 
            widgetId="active-users" 
            widgetType="metric"
            onError={WidgetErrorHandler.createMetricErrorHandler('active-users')}
          >
            <AsyncWidget.Metric 
              widgetId="active-users"
              icon={mockMetrics[1].icon}
              size="medium"
            />
          </WidgetErrorBoundary>
        </WidgetArea>

        {/* 3. Conversion Rate - Async Performance KPI */}
        <WidgetArea gridArea="metric3" mobileOrder={3}>
          <WidgetErrorBoundary 
            widgetId="conversion-rate" 
            widgetType="metric"
            onError={WidgetErrorHandler.createMetricErrorHandler('conversion-rate')}
          >
            <AsyncWidget.Metric 
              widgetId="conversion-rate"
              icon={mockMetrics[2].icon}
              size="medium"
            />
          </WidgetErrorBoundary>
        </WidgetArea>

        {/* 4. Average Order Value - Async Business KPI */}
        <WidgetArea gridArea="metric4" mobileOrder={4}>
          <WidgetErrorBoundary 
            widgetId="avg-order-value" 
            widgetType="metric"
            onError={WidgetErrorHandler.createMetricErrorHandler('avg-order-value')}
          >
            <AsyncWidget.Metric 
              widgetId="avg-order-value"
              icon={mockMetrics[3].icon}
              size="medium"
            />
          </WidgetErrorBoundary>
        </WidgetArea>

        {/* Chart widgets with specialized error handling */}
        {/* 1. Revenue Chart - Async Financial Trend Analysis */}
        <WidgetArea gridArea="chart1" mobileOrder={5}>
          <WidgetErrorBoundary 
            widgetId="revenue-chart" 
            widgetType="chart"
            maxRetries={2}
            onError={WidgetErrorHandler.createChartErrorHandler('revenue-chart', 'revenue-trends')}
          >
            <AsyncWidget.Chart 
              widgetId="revenue-chart"
              icon={mockCharts[0].icon}
              height="medium"
              showGrid={true}
              showTooltip={true}
            />
          </WidgetErrorBoundary>
        </WidgetArea>

        {/* 2. Users Chart - Async User Growth Analysis */}
        <WidgetArea gridArea="chart2" mobileOrder={6}>
          <WidgetErrorBoundary 
            widgetId="users-chart" 
            widgetType="chart"
            maxRetries={2}
            onError={WidgetErrorHandler.createChartErrorHandler('users-chart', 'user-analytics')}
          >
            <AsyncWidget.Chart 
              widgetId="users-chart"
              icon={mockCharts[1].icon}
              height="medium"
              showGrid={true}
              showTooltip={true}
            />
          </WidgetErrorBoundary>
        </WidgetArea>
      </DashboardGrid>
    </DashboardLayout>
  );
}