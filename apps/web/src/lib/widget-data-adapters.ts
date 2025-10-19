/**
 * Widget Data Adapters
 * 
 * Learning Focus: Transform mock data for widget consumption
 * Architecture: Clean data transformation layer
 * Goal: Bridge mock data to component interfaces
 */

import { mockWidgetMetrics, mockWidgetCharts, type WidgetMetricData, type WidgetChartData } from './mock-widget-data';

// Learning: Widget data interfaces for components
export interface AdaptedMetricWidget {
  id: string;
  title: string;
  type: 'metric';
  current_value: number;
  previous_value?: number;
  growth_rate?: number;
  format: 'currency' | 'percentage' | 'number' | 'count';
  trend: 'up' | 'down' | 'stable';
  last_updated: string;
  status: 'success' | 'warning' | 'danger' | 'neutral';
}

export interface AdaptedChartWidget {
  id: string;
  title: string;
  type: 'chart';
  chart_type: 'line' | 'bar' | 'area' | 'pie';
  data_points: Array<{
    label: string;
    value: number;
    period: string;
  }>;
  format: 'currency' | 'percentage' | 'number' | 'count';
  last_updated: string;
}

// Learning: Core adapter functions
export function adaptMetricData(metricId: string): AdaptedMetricWidget | null {
  const metric = mockWidgetMetrics.find(m => m.id === metricId);
  if (!metric) return null;

  // Professional: Determine status based on growth rate
  let status: 'success' | 'warning' | 'danger' | 'neutral' = 'neutral';
  if (metric.growth_rate !== undefined) {
    if (metric.trend === 'up' && metric.growth_rate > 5) status = 'success';
    else if (metric.trend === 'down' && Math.abs(metric.growth_rate) > 10) status = 'danger';
    else if (metric.growth_rate !== 0) status = 'warning';
  }

  return {
    id: metric.id,
    title: metric.title,
    type: 'metric',
    current_value: metric.current_value,
    previous_value: metric.previous_value,
    growth_rate: metric.growth_rate,
    format: metric.format,
    trend: metric.trend,
    last_updated: metric.last_updated,
    status
  };
}

export function adaptChartData(chartId: string): AdaptedChartWidget | null {
  const chart = mockWidgetCharts.find(c => c.id === chartId);
  if (!chart) return null;

  return {
    id: chart.id,
    title: chart.title,
    type: 'chart',
    chart_type: chart.chart_type,
    data_points: chart.data.map(point => ({
      label: point.label || point.period,
      value: point.value,
      period: point.period
    })),
    format: chart.format,
    last_updated: chart.last_updated
  };
}

// Professional Learning: Add these functions to your existing widget-data-adapters.ts

// Professional Pattern: Transform our chart data for Recharts consumption
export function transformChartDataForRecharts(chartData: AdaptedChartWidget): Array<{name: string, value: number}> {
  return chartData.data_points.map(point => ({
    name: point.label,
    value: point.value
  }));
}

// Professional Pattern: Get chart-ready data in one call
export function getRechartsChartData(chartId: string): {
  chartConfig: AdaptedChartWidget;
  rechartsData: Array<{name: string, value: number}>;
} {
  const chartConfig = getChartWidget(chartId);
  const rechartsData = transformChartDataForRecharts(chartConfig);
  
  return { chartConfig, rechartsData };
}

// Learning: Convenience functions for widget creation
export function getMetricWidget(metricId: string): AdaptedMetricWidget {
  const adapted = adaptMetricData(metricId);
  if (!adapted) {
    throw new Error(`Metric widget not found: ${metricId}`);
  }
  return adapted;
}

export function getChartWidget(chartId: string): AdaptedChartWidget {
  const adapted = adaptChartData(chartId);
  if (!adapted) {
    throw new Error(`Chart widget not found: ${chartId}`);
  }
  return adapted;
}

// Learning: Get all available widgets
export function getAllAvailableMetrics(): AdaptedMetricWidget[] {
  return mockWidgetMetrics.map(metric => adaptMetricData(metric.id)!).filter(Boolean);
}

export function getAllAvailableCharts(): AdaptedChartWidget[] {
  return mockWidgetCharts.map(chart => adaptChartData(chart.id)!).filter(Boolean);
}

