'use client';

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
import WidgetConfigModal from '@/components/dashboard/WidgetConfigModal';

/** small helper to humanize IDs -> "total-revenue" => "Total Revenue" */
function humanizeId(id: string) {
  return id
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, (ch) => ch.toUpperCase());
}

/** Lightweight types to avoid `any` in maps */
type MetricItem = {
  id?: string;
  title?: string;
  value?: number;
  previousValue?: number;
  format?: string;
  icon?: React.ReactNode;
  [key: string]: unknown;
};

type ChartItem = {
  id?: string;
  title?: string;
  data?: Array<{ label: string; value: number }>;
  chartType?: string;
  format?: string;
  icon?: React.ReactNode;
  [key: string]: unknown;
};

export default function DashboardPage() {
  // invoke the responsive hook for internal behavior (don't destructure into unused vars)
  useResponsiveGrid();

  const [configureWidgetId, setConfigureWidgetId] = React.useState<string | null>(null);

  const handleConfigureClick = (widgetId: string) => {
    setConfigureWidgetId(widgetId);
  };

  const handleCloseConfig = () => {
    setConfigureWidgetId(null);
  };

  // Cast mock arrays to typed arrays (unknown -> typed) to avoid implicit `any`
  // and keep the page-level mapping strongly typed.
  const metrics = mockMetrics as unknown as MetricItem[];
  const charts = mockCharts as unknown as ChartItem[];

  // Build maps from arrays (avoid index-coupling)
  const metricMap: Record<string, MetricItem | undefined> = React.useMemo(
    () => ({
      'total-revenue': metrics[0],
      'conversion-rate': metrics[1],
      'active-users': metrics[2],
      'avg-order-value': metrics[3],
    }),
    [metrics]
  );

  const chartMap: Record<string, ChartItem | undefined> = React.useMemo(
    () => ({
      'revenue-chart': charts[0],
      'users-chart': charts[1],
    }),
    [charts]
  );

  return (
    <DashboardLayout>
      <DashboardHeader />

      <DashboardGrid>
        {/* 1. Total Revenue */}
        <WidgetArea gridArea="metric1" mobileOrder={1}>
          <WidgetCard id="total-revenue" title={humanizeId('total-revenue')} onConfigureClick={handleConfigureClick}>
            <WidgetErrorBoundary widgetId="total-revenue" widgetType="metric" onError={WidgetErrorHandler.createMetricErrorHandler('total-revenue')}>
              <AsyncWidget.Metric
                widgetId="total-revenue"
                data={metricMap['total-revenue']}
                icon={metricMap['total-revenue']?.icon}
                size="medium"
                showTitle={false}
              />
            </WidgetErrorBoundary>
          </WidgetCard>
        </WidgetArea>

        {/* 2. Conversion Rate */}
        <WidgetArea gridArea="metric2" mobileOrder={2}>
          <WidgetCard id="conversion-rate" title={humanizeId('conversion-rate')} onConfigureClick={handleConfigureClick}>
            <WidgetErrorBoundary
              widgetId="conversion-rate"
              widgetType="metric"
              onError={WidgetErrorHandler.createMetricErrorHandler('conversion-rate')}
            >
              <AsyncWidget.Metric
                widgetId="conversion-rate"
                data={metricMap['conversion-rate']}
                icon={metricMap['conversion-rate']?.icon}
                size="medium"
                showTitle={false}
              />
            </WidgetErrorBoundary>
          </WidgetCard>
        </WidgetArea>

        {/* 3. Active Users */}
        <WidgetArea gridArea="metric3" mobileOrder={3}>
          <WidgetCard id="active-users" title={humanizeId('active-users')} onConfigureClick={handleConfigureClick}>
            <WidgetErrorBoundary
              widgetId="active-users"
              widgetType="metric"
              onError={WidgetErrorHandler.createMetricErrorHandler('active-users')}
            >
              <AsyncWidget.Metric
                widgetId="active-users"
                data={metricMap['active-users']}
                icon={metricMap['active-users']?.icon}
                size="medium"
                showTitle={false}
              />
            </WidgetErrorBoundary>
          </WidgetCard>
        </WidgetArea>

        {/* 4. Average Order Value */}
        <WidgetArea gridArea="metric4" mobileOrder={4}>
          <WidgetCard id="avg-order-value" title={humanizeId('avg-order-value')} onConfigureClick={handleConfigureClick}>
            <WidgetErrorBoundary widgetId="avg-order-value" widgetType="metric" onError={WidgetErrorHandler.createMetricErrorHandler('avg-order-value')}>
              <AsyncWidget.Metric
                widgetId="avg-order-value"
                data={metricMap['avg-order-value']}
                icon={metricMap['avg-order-value']?.icon}
                size="medium"
                showTitle={false}
              />
            </WidgetErrorBoundary>
          </WidgetCard>
        </WidgetArea>

        {/* Charts */}
        <WidgetArea gridArea="chart1" mobileOrder={5}>
          <WidgetCard id="revenue-chart" title={humanizeId('revenue-chart')} onConfigureClick={handleConfigureClick}>
            <WidgetErrorBoundary widgetId="revenue-chart" widgetType="chart" maxRetries={2} onError={WidgetErrorHandler.createChartErrorHandler('revenue-chart', 'revenue-trends')}>
              <AsyncWidget.Chart
                widgetId="revenue-chart"
                data={chartMap['revenue-chart']}
                icon={chartMap['revenue-chart']?.icon}
                height="medium"
                showGrid
                showTooltip
                showTitle={false}
              />
            </WidgetErrorBoundary>
          </WidgetCard>
        </WidgetArea>

        <WidgetArea gridArea="chart2" mobileOrder={6}>
          <WidgetCard id="users-chart" title={humanizeId('users-chart')} onConfigureClick={handleConfigureClick}>
            <WidgetErrorBoundary widgetId="users-chart" widgetType="chart" maxRetries={2} onError={WidgetErrorHandler.createChartErrorHandler('users-chart', 'user-analytics')}>
              <AsyncWidget.Chart
                widgetId="users-chart"
                data={chartMap['users-chart']}
                icon={chartMap['users-chart']?.icon}
                height="medium"
                showGrid
                showTooltip
                showTitle={false}
              />
            </WidgetErrorBoundary>
          </WidgetCard>
        </WidgetArea>
      </DashboardGrid>

      <WidgetConfigModal widgetId={configureWidgetId} open={Boolean(configureWidgetId)} onClose={handleCloseConfig} />
    </DashboardLayout>
  );
}