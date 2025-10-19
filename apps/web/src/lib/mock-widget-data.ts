/**
 * Widget-Focused Mock Data
 * 
 * Learning Focus: Provide exactly what widgets need for testing
 * Architecture: Simple, widget-consumable data structures
 * Goal: Test widget integration, not simulate database complexity
 */

// Professional Learning: Simple data types that widgets actually consume
export interface WidgetMetricData {
  id: string;
  title: string;
  current_value: number;
  previous_value?: number;
  unit: 'currency' | 'percentage' | 'count' | 'number';
  format: 'currency' | 'percentage' | 'number' | 'count';
  growth_rate?: number;
  trend: 'up' | 'down' | 'stable';
  last_updated: string;
}

export interface WidgetChartData {
  id: string;
  title: string;
  chart_type: 'line' | 'bar' | 'area' | 'pie';
  data: Array<{
    period: string;    // "2024-01" or "Jan 2024"
    value: number;
    label?: string;
  }>;
  unit: 'currency' | 'percentage' | 'count' | 'number';
  format: 'currency' | 'percentage' | 'number' | 'count';
  last_updated: string;
}

// Professional Learning: Ready-to-use mock data for widget testing
export const mockWidgetMetrics: WidgetMetricData[] = [
  {
    id: 'mrr-primary',
    title: 'Monthly Recurring Revenue',
    current_value: 742000,
    previous_value: 698000,
    unit: 'currency',
    format: 'currency',
    growth_rate: 6.3,
    trend: 'up',
    last_updated: '2025-10-19T10:37:57Z'
  },
  {
    id: 'cac-metric',
    title: 'Customer Acquisition Cost',
    current_value: 245,
    previous_value: 280,
    unit: 'currency',
    format: 'currency',
    growth_rate: -12.5,
    trend: 'down',  // Lower CAC is better
    last_updated: '2025-10-19T10:37:57Z'
  },
  {
    id: 'mau-count',
    title: 'Monthly Active Users',
    current_value: 34250,
    previous_value: 32100,
    unit: 'count',
    format: 'number',
    growth_rate: 6.7,
    trend: 'up',
    last_updated: '2025-10-19T10:37:57Z'
  },
  {
    id: 'churn-rate',
    title: 'Monthly Churn Rate',
    current_value: 2.8,
    previous_value: 3.2,
    unit: 'percentage',
    format: 'percentage',
    growth_rate: -12.5,
    trend: 'down',  // Lower churn is better
    last_updated: '2025-10-19T10:37:57Z'
  }
];

export const mockWidgetCharts: WidgetChartData[] = [
  {
    id: 'mrr-trend-chart',
    title: 'MRR Growth Trend',
    chart_type: 'line',
    data: [
      { period: '2024-05', value: 485000, label: 'May 2024' },
      { period: '2024-06', value: 521000, label: 'Jun 2024' },
      { period: '2024-07', value: 578000, label: 'Jul 2024' },
      { period: '2024-08', value: 612000, label: 'Aug 2024' },
      { period: '2024-09', value: 658000, label: 'Sep 2024' },
      { period: '2024-10', value: 698000, label: 'Oct 2024' }
    ],
    unit: 'currency',
    format: 'currency',
    last_updated: '2025-10-19T10:37:57Z'
  },
  {
    id: 'user-growth-chart',
    title: 'User Growth',
    chart_type: 'bar',
    data: [
      { period: '2024-05', value: 28500, label: 'May' },
      { period: '2024-06', value: 29800, label: 'Jun' },
      { period: '2024-07', value: 30900, label: 'Jul' },
      { period: '2024-08', value: 31200, label: 'Aug' },
      { period: '2024-09', value: 32100, label: 'Sep' },
      { period: '2024-10', value: 34250, label: 'Oct' }
    ],
    unit: 'count',
    format: 'number',
    last_updated: '2025-10-19T10:37:57Z'
  }
];