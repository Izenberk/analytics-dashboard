/**
 * Mock Data Repository
 *
 * Centralized test data for development and testing.
 * Clean separation of data from presentation logic.
 */

import { AttachMoney, People, ShoppingCart, ShowChart, Timeline, TrendingUp } from "@mui/icons-material";
import { BarChart } from "recharts";

// MetricCard test data (now includes stable `id` fields)
export const mockMetrics = [
  {
    id: 'total-revenue',
    title: "Total Revenue",
    value: 125000,
    previousValue: 112000,
    format: "currency" as const,
    icon: <AttachMoney />
  },
  {
    id: 'conversion-rate',
    title: "Conversion Rate",
    value: 3.2,
    previousValue: 2.8,
    format: "percentage" as const,
    icon: <TrendingUp />
  },
  {
    id: 'active-users',
    title: "Active Users",
    value: 8420,
    previousValue: 8100,
    format: "number" as const,
    icon: <People />
  },
  {
    id: 'orders-today',
    title: "Orders Today",
    value: 89,
    format: "number" as const,
    icon: <ShoppingCart />,
    trend: "up" as const
  }
];

// Chart test data
export const mockChartData = {
  revenue: [
    { label: 'Jan', value: 42000 },
    { label: 'Feb', value: 38000 },
    { label: 'Mar', value: 45000 },
    { label: 'Apr', value: 51000 },
    { label: 'May', value: 49000 },
    { label: 'Jun', value: 55000 }
  ],
  users: [
    { label: 'Q1', value: 1200 },
    { label: 'Q2', value: 1850 },
    { label: 'Q3', value: 2100 },
    { label: 'Q4', value: 2450 }
  ],
  conversion: [
    { label: 'Week 1', value: 2.1 },
    { label: 'Week 2', value: 2.8 },
    { label: 'Week 3', value: 3.2 },
    { label: 'Week 4', value: 2.9 }
  ]
};

// Chart configurations (include stable ids)
export const mockCharts = [
  {
    id: 'revenue-chart',
    title: "Revenue Trend",
    data: mockChartData.revenue,
    chartType: "line" as const,
    format: "currency" as const,
    icon: <ShowChart />
  },
  {
    id: 'users-chart',
    title: "User Growth",
    data: mockChartData.users,
    chartType: "bar" as const,
    format: "number" as const,
    icon: <BarChart />
  },
  {
    id: 'conversion-chart',
    title: "Conversion Rate",
    data: mockChartData.conversion,
    chartType: "area" as const,
    format: "percentage" as const,
    icon: <Timeline />
  },
  {
    id: 'revenue-distribution',
    title: "Revenue Distribution",
    data: mockChartData.revenue.slice(0, 4),
    chartType: "pie" as const,
    format: "currency" as const,
    height: "large" as const
  }
];

// Calculator test cases
export const mockCalculatorTests = [
  { current: 120, previous: 100, description: "20% increase" },
  { current: 100, previous: 120, description: "16.7% decrease" },
  { current: 100, previous: 100, description: "No change" },
  { current: 100, previous: 0, description: "From zero" }
];