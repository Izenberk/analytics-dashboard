'use client';

import React from "react";
import { MetricCard } from '@/components/ui/MetricCard';
import { ChartCard } from '@/components/ui/ChartCard';
import { useMetricData, useChartData } from "@/hooks/useWidgetData";

// Type definitions for container props
interface AsyncWidgetProps {
  widgetId: string;
}

interface AsyncMetricWidgetProps extends AsyncWidgetProps {
  icon?: React.ReactNode;
  size?: 'small' | 'medium' | 'large';
  /**
   * Optional explicit data to render. When provided, this overrides hook data.
   */
  data?: any;
  /**
   * When false, the inner MetricCard will not receive a title prop.
   * Use when a presentational shell (WidgetCard) renders the header.
   */
  showTitle?: boolean;
}

interface AsyncChartWidgetProps extends AsyncWidgetProps {
  icon?: React.ReactNode;
  height?: 'small' | 'medium' | 'large';
  showGrid?: boolean;
  showTooltip?: boolean;
  data?: any;
  showTitle?: boolean;
}

/**
 * Async Metric Widget Container
 * Handles async data loading for metric widgets.
 * - Accepts optional `data` override and `showTitle` flag.
 */
export const AsyncMetricWidget: React.FC<AsyncMetricWidgetProps> = ({
  widgetId,
  icon,
  size = 'medium',
  data: overrideData,
  showTitle = true,
}) => {
  // Use async hook for data management
  const { data: fetchedData, loading, error, refresh } = useMetricData(widgetId);

  // Prefer explicit override data when provided by caller
  const resolvedData = overrideData ?? fetchedData;

  // Error boundary integration — rethrow to be caught by WidgetErrorBoundary
  if (error) {
    throw new Error(`Metric widget ${widgetId} failed to load: ${error}`);
  }

  // Loading state
  if (loading && !resolvedData) {
    return (
      <MetricCard
        title="Loading..."
        value={0}
        format="number"
        loading={true}
        size={size}
        icon={icon}
      />
    );
  }

  // Missing data — surface as an error so the error boundary can handle it
  if (!resolvedData) {
    throw new Error(`No data available for metric widget: ${widgetId}`);
  }

  // Separate title from the rest of the props so we can optionally omit it
  const { title, ...restProps } = resolvedData;

  return (
    <MetricCard
      {...(showTitle ? { title } : {})}
      {...restProps}
      loading={loading}
      size={size}
      icon={icon}
      widgetId={widgetId}
      actions={{
        onRefresh: async () => {
          if (process.env.NODE_ENV === 'development') {
            console.log(`🔄 [${widgetId}] Refreshing metric data...`);
          }
          await refresh();
          if (process.env.NODE_ENV === 'development') {
            console.log(`✅ [${widgetId}] Metric data refreshed`);
          }
        },
        onConfigure: () => {
          if (process.env.NODE_ENV === 'development') {
            console.log(`⚙️ [${widgetId}] Open configure (not implemented)`);
          }
          // Placeholder: dashboard page / WidgetCard should handle opening config modal
        },
        onExport: () => {
          if (process.env.NODE_ENV === 'development') {
            console.log(`📊 [${widgetId}] Export metric (not implemented)`);
          }
        },
      }}
    />
  );
};

/**
 * Async Chart Widget Container
 * Handles async data loading for chart widgets.
 * - Accepts optional `data` override and `showTitle` flag.
 */
export const AsyncChartWidget: React.FC<AsyncChartWidgetProps> = ({
  widgetId,
  icon,
  height = 'medium',
  showGrid = true,
  showTooltip = true,
  data: overrideData,
  showTitle = true,
}) => {
  // Use async hook for chart data
  const { data: fetchedData, loading, error, refresh } = useChartData(widgetId);

  // Prefer explicit override data when provided
  const resolvedData = overrideData ?? fetchedData;

  if (error) {
    throw new Error(`Chart widget ${widgetId} failed to load: ${error}`);
  }

  if (loading && !resolvedData) {
    return (
      <ChartCard
        title="Loading Chart..."
        data={[]}
        chartType="line"
        format="number"
        loading={true}
        height={height}
        icon={icon}
      />
    );
  }

  if (!resolvedData) {
    throw new Error(`No data available for chart widget: ${widgetId}`);
  }

  const { title, ...restChartProps } = resolvedData;

  return (
    <ChartCard
      {...(showTitle ? { title } : {})}
      {...restChartProps}
      loading={loading}
      height={height}
      showGrid={showGrid}
      showTooltip={showTooltip}
      icon={icon}
      widgetId={widgetId}
      actions={{
        onRefresh: async () => {
          if (process.env.NODE_ENV === 'development') {
            console.log(`🔄 [${widgetId}] Refreshing chart data...`);
          }
          await refresh();
          if (process.env.NODE_ENV === 'development') {
            console.log(`✅ [${widgetId}] Chart data refreshed`);
          }
        },
        onConfigure: () => {
          if (process.env.NODE_ENV === 'development') {
            console.log(`⚙️ [${widgetId}] Open chart configure (not implemented)`);
          }
        },
        onFullscreen: () => {
          if (process.env.NODE_ENV === 'development') {
            console.log(`🖥️ [${widgetId}] Open fullscreen (not implemented)`);
          }
        },
        onExport: () => {
          if (process.env.NODE_ENV === 'development') {
            console.log(`📈 [${widgetId}] Export chart (not implemented)`);
          }
        },
      }}
    />
  );
};

/**
 * Widget factory for easy dashboard integration
 */
export const AsyncWidget = {
  Metric: AsyncMetricWidget,
  Chart: AsyncChartWidget,
} as const;