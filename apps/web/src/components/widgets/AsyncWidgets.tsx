'use client';

import React from 'react';
import { MetricCard } from '@/components/ui/MetricCard';
import { ChartCard } from '@/components/ui/ChartCard';
import { useMetricData, useChartData } from '@/hooks/useWidgetData';
import { ChartType, ChartFormat } from '@/lib/chart-utils';

/**
 * Permissive shapes matching our mock data / hooks, but typed (no `any`).
 */
export type MetricData = {
  id?: string;
  title?: string;
  value?: number | null;
  previousValue?: number | null;
  format?: 'currency' | 'percentage' | 'number' | 'count' | string;
  icon?: React.ReactNode;
  trend?: 'up' | 'down' | 'neutral' | string | null;
  [key: string]: unknown;
};

export type ChartData = {
  id?: string;
  title?: string;
  data?: Array<{ label: string; value: number; trend?: string }> | null;
  chartType?: 'line' | 'bar' | 'area' | 'pie' | string;
  format?: 'currency' | 'percentage' | 'number' | string;
  icon?: React.ReactNode;
  height?: 'small' | 'medium' | 'large';
  [key: string]: unknown;
};

interface AsyncWidgetProps {
  widgetId: string;
}

interface AsyncMetricWidgetProps extends AsyncWidgetProps {
  icon?: React.ReactNode;
  size?: 'small' | 'medium' | 'large';
  data?: MetricData | null;
  showTitle?: boolean;
}

interface AsyncChartWidgetProps extends AsyncWidgetProps {
  icon?: React.ReactNode;
  height?: 'small' | 'medium' | 'large';
  showGrid?: boolean;
  showTooltip?: boolean;
  data?: ChartData | null;
  showTitle?: boolean;
}

/** humanize fallback for titles */
function humanizeId(id: string) {
  return id.replace(/[-_]/g, ' ').replace(/\b\w/g, (ch) => ch.toUpperCase());
}

/** Allowed metric formats narrowed for MetricCard discriminant */
const allowedMetricFormats = ['currency', 'percentage', 'number'] as const;
type MetricFormat = (typeof allowedMetricFormats)[number];
function isMetricFormat(v: unknown): v is MetricFormat {
  return typeof v === 'string' && (allowedMetricFormats as readonly string[]).includes(v);
}

/** Allowed chart types/formats (narrow lists) */
const allowedChartTypes = ['line', 'bar', 'area', 'pie'] as const;
function isChartType(v: unknown): v is ChartType {
  return typeof v === 'string' && (allowedChartTypes as readonly string[]).includes(v);
}

const allowedChartFormats = ['currency', 'percentage', 'number'] as const;
function isChartFormat(v: unknown): v is ChartFormat {
  return typeof v === 'string' && (allowedChartFormats as readonly string[]).includes(v);
}

/**
 * AsyncMetricWidget
 * - prefers explicit `data` prop, otherwise falls back to useMetricData(widgetId)
 * - validates discriminant union fields (value + format) before rendering MetricCard
 */
export const AsyncMetricWidget: React.FC<AsyncMetricWidgetProps> = ({
  widgetId,
  icon,
  size = 'medium',
  data: overrideData,
  showTitle = true,
}) => {
  const { data: fetchedData, loading, error, refresh } = useMetricData(widgetId);
  const resolvedData: MetricData | null | undefined = overrideData ?? fetchedData;

  if (error) {
    throw new Error(`Metric widget ${widgetId} failed to load: ${error}`);
  }

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

  if (!resolvedData) {
    throw new Error(`No data available for metric widget: ${widgetId}`);
  }

  const {
    title: dataTitle,
    value: dataValue,
    format: dataFormat,
    previousValue,
    trend,
    ...otherProps
  } = resolvedData as MetricData;

  if (typeof dataValue !== 'number') {
    throw new Error(`Metric widget ${widgetId} has invalid value: ${String(dataValue)}`);
  }
  if (!isMetricFormat(dataFormat)) {
    throw new Error(
      `Metric widget ${widgetId} has invalid or unsupported format: ${String(
        dataFormat
      )}. Allowed formats: ${allowedMetricFormats.join(', ')}`
    );
  }

  const metricCardProps = {
    ...(showTitle ? { title: typeof dataTitle === 'string' ? dataTitle : humanizeId(widgetId) } : {}),
    value: dataValue,
    format: dataFormat as MetricFormat,
    previousValue: typeof previousValue === 'number' ? previousValue : undefined,
    trend: typeof trend === 'string' ? (trend as 'up' | 'down' | 'neutral') : undefined,
    loading,
    size,
    icon,
    widgetId,
    ...(otherProps as Record<string, unknown>),
    actions: {
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
      },
      onExport: () => {
        if (process.env.NODE_ENV === 'development') {
          console.log(`📊 [${widgetId}] Export metric (not implemented)`);
        }
      },
    },
  };

  return <MetricCard {...metricCardProps} />;
};

/**
 * AsyncChartWidget
 * - prefers explicit `data` prop, otherwise falls back to useChartData(widgetId)
 * - validates required fields (data/chartType/format) and narrows types before passing to ChartCard
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
  const { data: fetchedData, loading, error, refresh } = useChartData(widgetId);
  const resolvedData: ChartData | null | undefined = overrideData ?? fetchedData;

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

  const { title: chartTitle, data, chartType: dataChartType, format: dataFormat, ...restChartProps } =
    resolvedData;

  if (!data || !Array.isArray(data) || data.length === 0) {
    throw new Error(`Chart widget ${widgetId} has no chart data.`);
  }
  if (!isChartType(dataChartType)) {
    throw new Error(
      `Chart widget ${widgetId} has invalid chartType: ${String(dataChartType)}. Allowed: ${allowedChartTypes.join(
        ', '
      )}`
    );
  }
  if (!isChartFormat(dataFormat)) {
    throw new Error(
      `Chart widget ${widgetId} has invalid format: ${String(dataFormat)}. Allowed: ${allowedChartFormats.join(', ')}`
    );
  }

  const chartCardProps = {
    ...(showTitle ? { title: typeof chartTitle === 'string' ? chartTitle : humanizeId(widgetId) } : {}),
    data,
    chartType: dataChartType as ChartType,
    format: dataFormat as ChartFormat,
    loading,
    height,
    showGrid,
    showTooltip,
    icon,
    widgetId,
    ...(restChartProps as Record<string, unknown>),
    actions: {
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
    },
  };

  return <ChartCard {...chartCardProps} />;
};

export const AsyncWidget = {
  Metric: AsyncMetricWidget,
  Chart: AsyncChartWidget,
} as const;