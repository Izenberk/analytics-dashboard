'use client';

import React from "react";
import { MetricCard } from '@/components/ui/MetricCard';
import { ChartCard } from '@/components/ui/ChartCard';
import { useMetricData, useChartData } from "@/hooks/useWidgetData";
import { WidgetErrorHandler } from "@/lib/error-handling/WidgetErrorHandler";

// Type definitions for container props
interface AsyncWidgetProps {
  widgetId: string;
}

interface AsyncMetricWidgetProps extends AsyncWidgetProps {
  icon?: React.ReactNode;
  size?: 'small' | 'medium' | 'large';
}

interface AsyncChartWidgetProps extends AsyncWidgetProps {
  icon?: React.ReactNode;
  height?: 'small' | 'medium' | 'large';
  showGrid?: boolean;
  showTooltip?: boolean;
}

/**
 * Async Metric Widget Container
 * Handles async data loading for metric widgets
 */
export const AsyncMetricWidget: React.FC<AsyncMetricWidgetProps> = ({
  widgetId,
  icon,
  size = 'medium'
}) => {
  // Use async hook for data management
  const { data, loading, error, refresh, lastUpdated } = useMetricData(widgetId);

  // Error boundary integration
  if (error) {
    throw new Error(`Metric widget ${widgetId} failed to load: ${error}`);
  }

  // Handle loading state gracefully
  if (loading && !data) {
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

  // Handle missing data gracefully
  if (!data) {
    throw new Error(`No data available for metric widget: ${widgetId}`);
  }

  // Render with async data and actions
  return (
    <MetricCard
      {...data}
      loading={loading} // Show loading during refresh
      size={size}
      icon={icon}
      widgetId={widgetId}
      actions={{
        onRefresh: async () => {
          console.log(`🔄 [${widgetId.toUpperCase()}] Refreshing metric data...`);
          await refresh();
          console.log(`✅ [${widgetId.toUpperCase()}] Metric data refreshed at ${new Date().toLocaleTimeString()}`);
        },
        onConfigure: () => {
          console.log(`⚙️ [${widgetId.toUpperCase()}] Opening metric configuration...`);
          // Future: Open configuration dialog
        },
        onExport: () => {
          console.log(`📊 [${widgetId.toUpperCase()}] Exporting metric data...`);
          // Future: Export functionality with actual data
        },
      }}
    />
  );
};

/**
 * Async Chart Widget Container
 * Handles async data loading for chart widgets
 */
export const AsyncChartWidget: React.FC<AsyncChartWidgetProps> = ({
  widgetId,
  icon,
  height = 'medium',
  showGrid = true,
  showTooltip = true
}) => {
  // Use async hook for chart data
  const { data, loading, error, refresh, lastUpdated } = useChartData(widgetId);

  // Error boundary integration
  if (error) {
    throw new Error(`Chart widget ${widgetId} failed to load: ${error}`);
  }

  // Handle loading state for charts
  if (loading && !data) {
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

  // Handle missing data
  if (!data) {
    throw new Error(`No data available for chart widget: ${widgetId}`);
  }

  // Render with async data and enhanced actions
  return (
    <ChartCard
      {...data}
      loading={loading}
      height={height}
      showGrid={showGrid}
      showTooltip={showTooltip}
      icon={icon}
      widgetId={widgetId}
      actions={{
        onRefresh: async () => {
          console.log(`🔄 [${widgetId.toUpperCase()}] Refreshing chart data...`);
          await refresh();
          console.log(`✅ [${widgetId.toUpperCase()}] Chart data refreshed at ${new Date().toLocaleTimeString()}`);
        },
        onConfigure: () => {
          console.log(`⚙️ [${widgetId.toUpperCase()}] Opening chart configuration...`);
          // Future: Chart configuration dialog
        },
        onFullscreen: () => {
          console.log(`🖥️ [${widgetId.toUpperCase()}] Opening fullscreen chart view...`);
          // Future: Fullscreen chart modal
        },
        onExport: () => {
          console.log(`📈 [${widgetId.toUpperCase()}] Exporting chart...`);
          // Future: Export chart image and data
        },
      }}
    />
  );
};

/**
 * Widget factory for easy dashboard integration
 * Provides convenient way to create async widgets with consistent patterns
 */
export const AsyncWidget = {
  Metric: AsyncMetricWidget,
  Chart: AsyncChartWidget,
} as const;