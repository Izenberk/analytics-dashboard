/**
 * Chart Utilities
 *
 * Business logic for chart data processing and formatting.
 * Follows clean architecture - pure functions, no UI dependencies.
 */

export interface ChartDataPoint {
  name: string;
  value: number;
  formatted_value?: string;
  trend?: 'up' | 'down' | 'neutral';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export type ChartType = 'line' | 'bar' | 'area' | 'pie';
export type ChartFormat = 'currency' | 'percentage' | 'number';

/**
 * Process raw data for chart consumption
 */
export function processChartData(
  rawData: Array<{ label: string; value: number}>,
  format: ChartFormat
): ChartDataPoint[] {
  return rawData.map((item, index, array) => {
    const formatted_value = formatChartValue(item.value, format);
    const trend = index > 0 ? calculateTrendDirection(item.value, array[index - 1].value) : 'neutral';

    return {
      name: item.label,
      value: item.value,
      formatted_value,
      trend
    };
  });
}

/**
 * Format chart values based on type
 */
export function formatChartValue(value: number, format: ChartFormat): string {
  switch (format) {
    case 'currency':
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(value);
    case 'percentage':
      return `${value.toFixed(1)}%`;
    case 'number':
      return new Intl.NumberFormat('en-US').format(value);
    default:
      return value.toString();
  }
}

/**
 * Calculate trend direction between two values
 */
function calculateTrendDirection(current: number, previous: number): 'up' | 'down' | 'neutral' {
  const threshold = 0.01;
  const change = ((current - previous) / Math.abs(previous)) * 100;

  if (Math.abs(change) < threshold) return 'neutral';
  return change > 0 ? 'up' : 'down';
}

/**
 * Get chart color based on trend and format
 */
export function getChartColor(trend: 'up' | 'down' | 'neutral', format: ChartFormat): string {
  if (format === 'currency' || format === 'number') {
    switch (trend) {
      case 'up': return '#2e7d32';
      case 'down': return '#d32f2f';
      case 'neutral': return '#1976d2';
    }
  }
  return '#1976d2';
}

/**
 * Chart configuration presets for different types
 */
export const chartConfigs = {
  line: {
    strokeWidth: 2,
    dot: { fill: '#1976d2', strokeWidth: 2, r: 4 },
    activeDot: { r: 6, strokeWidth: 0 }
  },
  bar: {
    radius: [4, 4, 0, 0] as [number, number, number, number],
    fill: '#1976d2'
  },
  area: {
    strokeWidth: 2,
    fillOpacity: 0.1,
    stroke: '#1976d2',
    fill: '#1976d2'
  }
} as const;