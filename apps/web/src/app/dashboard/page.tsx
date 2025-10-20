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
        {/* 1. Total Revenue - Financial KPI */}
        <WidgetArea gridArea="metric1" mobileOrder={1}>
          <WidgetErrorBoundary 
            widgetId="total-revenue" 
            widgetType="metric"
            onError={WidgetErrorHandler.createMetricErrorHandler('total-revenue')}
          >
            <MetricCard 
              {...mockMetrics[0]}
              widgetId="total-revenue"
              actions={{
                onRefresh: () => {
                  console.log('🔄 [REVENUE] Refreshing total revenue data...');
                  // Future: API call to refresh revenue metrics
                },
                onConfigure: () => {
                  console.log('⚙️ [REVENUE] Opening revenue configuration...');
                  // Future: Open revenue settings dialog
                },
                onExport: () => {
                  console.log('📊 [REVENUE] Exporting revenue data to CSV...');
                  // Future: Generate revenue report
                },
              }}
            />
          </WidgetErrorBoundary>
        </WidgetArea>

        {/* 2. Active Users - User Analytics KPI */}
        <WidgetArea gridArea="metric2" mobileOrder={2}>
          <WidgetErrorBoundary 
            widgetId="active-users" 
            widgetType="metric"
            onError={WidgetErrorHandler.createMetricErrorHandler('active-users')}
          >
            <MetricCard 
              {...mockMetrics[1]}
              widgetId="active-users"
              actions={{
                onRefresh: () => {
                  console.log('🔄 [USERS] Refreshing active users data...');
                  // Future: API call to refresh user metrics
                },
                onConfigure: () => {
                  console.log('⚙️ [USERS] Opening user analytics configuration...');
                  // Future: Configure user tracking settings
                },
                onExport: () => {
                  console.log('📊 [USERS] Exporting user data to Excel...');
                  // Future: Generate user analytics report
                },
              }}
            />
          </WidgetErrorBoundary>
        </WidgetArea>

        {/* 3. Conversion Rate - Performance KPI */}
        <WidgetArea gridArea="metric3" mobileOrder={3}>
          <WidgetErrorBoundary 
            widgetId="conversion-rate" 
            widgetType="metric"
            onError={WidgetErrorHandler.createMetricErrorHandler('conversion-rate')}
          >
            <MetricCard 
              {...mockMetrics[2]}
              widgetId="conversion-rate"
              actions={{
                onRefresh: () => {
                  console.log('🔄 [CONVERSION] Refreshing conversion rate data...');
                  // Future: API call to refresh conversion metrics
                },
                onConfigure: () => {
                  console.log('⚙️ [CONVERSION] Opening conversion tracking settings...');
                  // Future: Configure conversion goals and tracking
                },
                onExport: () => {
                  console.log('📊 [CONVERSION] Exporting conversion funnel data...');
                  // Future: Generate conversion analysis report
                },
              }}
            />
          </WidgetErrorBoundary>
        </WidgetArea>

        {/* 4. Average Order Value - Business KPI */}
        <WidgetArea gridArea="metric4" mobileOrder={4}>
          <WidgetErrorBoundary 
            widgetId="avg-order-value" 
            widgetType="metric"
            onError={WidgetErrorHandler.createMetricErrorHandler('avg-order-value')}
          >
            <MetricCard 
              {...mockMetrics[3]}
              widgetId="avg-order-value"
              actions={{
                onRefresh: () => {
                  console.log('🔄 [AOV] Refreshing average order value data...');
                  // Future: API call to refresh order metrics
                },
                onConfigure: () => {
                  console.log('⚙️ [AOV] Opening order value configuration...');
                  // Future: Configure AOV calculation settings
                },
                onExport: () => {
                  console.log('📊 [AOV] Exporting order value analysis...');
                  // Future: Generate order value trends report
                },
              }}
            />
          </WidgetErrorBoundary>
        </WidgetArea>

        {/* Chart widgets with specialized error handling */}
        {/* 1. Revenue Chart - Financial Trend Analysis */}
        <WidgetArea gridArea="chart1" mobileOrder={5}>
          <WidgetErrorBoundary 
            widgetId="revenue-chart" 
            widgetType="chart"
            maxRetries={2}
            onError={WidgetErrorHandler.createChartErrorHandler('revenue-chart', 'revenue-trends')}
          >
            <ChartCard 
              {...mockCharts[0]}
              widgetId="revenue-chart"
              actions={{
                onRefresh: () => {
                  console.log('🔄 [REVENUE-CHART] Refreshing revenue trend data...');
                  // Future: API call to refresh chart data
                },
                onConfigure: () => {
                  console.log('⚙️ [REVENUE-CHART] Opening chart configuration...');
                  // Future: Configure chart type, time range, styling
                },
                onFullscreen: () => {
                  console.log('🖥️ [REVENUE-CHART] Opening revenue analysis in fullscreen...');
                  // Future: Open expanded chart view for detailed analysis
                },
                onExport: () => {
                  console.log('📈 [REVENUE-CHART] Exporting revenue chart...');
                  // Future: Export chart as PNG/PDF and data as CSV
                },
              }}
            />
          </WidgetErrorBoundary>
        </WidgetArea>

        {/* 2. Users Chart - User Growth Analysis */}
        <WidgetArea gridArea="chart2" mobileOrder={6}>
          <WidgetErrorBoundary 
            widgetId="users-chart" 
            widgetType="chart"
            maxRetries={2}
            onError={WidgetErrorHandler.createChartErrorHandler('users-chart', 'user-analytics')}
          >
            <ChartCard 
              {...mockCharts[1]}
              widgetId="users-chart"
              actions={{
                onRefresh: () => {
                  console.log('🔄 [USERS-CHART] Refreshing user growth data...');
                  // Future: API call to refresh user analytics data
                },
                onConfigure: () => {
                  console.log('⚙️ [USERS-CHART] Opening user chart settings...');
                  // Future: Configure user segmentation, time periods
                },
                onFullscreen: () => {
                  console.log('🖥️ [USERS-CHART] Opening user analytics in fullscreen...');
                  // Future: Detailed user growth analysis view
                },
                onExport: () => {
                  console.log('📈 [USERS-CHART] Exporting user growth chart...');
                  // Future: Export user growth trends and cohort data
                },
              }}
            />
          </WidgetErrorBoundary>
        </WidgetArea>
      </DashboardGrid>
    </DashboardLayout>
  );
}