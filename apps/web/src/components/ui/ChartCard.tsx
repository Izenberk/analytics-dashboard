'use client'

import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Skeleton,
  Stack,
  useTheme,
  SxProps,
  Theme
} from '@mui/material';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  PieChart,
  Pie,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell
} from 'recharts';

import {
  processChartData,
  formatChartValue,
  getChartColor,
  chartConfigs,
  ChartDataPoint,
  ChartType,
  ChartFormat
} from '@/lib/chart-utils';

/**
 * ChartCard Props Interface
 * Type-safe chart configuration with discriminated unions
 */
type ChartCardProps = {
  title: string;
  data: Array<{ label: string; value: number }>;
  chartType: ChartType;
  format: ChartFormat;
  loading?: boolean;
  height?: 'small' | 'medium' | 'large';
  showGrid?: boolean;
  showTooltip?: boolean;
  icon?: React.ReactNode;
  sx?: SxProps<Theme>;
};

/**
 * ChartCard Component
 *
 * Features:
 * - Multiple chart types (line, bar, area, pie)
 * - Responsive design with Recharts
 * - Loading states with proper skeletons
 * - Type-safe data formatting
 * - Theme integration
 * - Clean architecture with utility separation
 */
export const ChartCard: React.FC<ChartCardProps> = ({
  title,
  data,
  chartType,
  format,
  loading = false,
  height = 'medium',
  showGrid = true,
  showTooltip = true,
  icon,
  sx
}) => {
  const theme = useTheme();

  // Process chart data using utility functions
  const chartData = React.useMemo(() => {
    if (loading || !data.length) return [];
    return processChartData(data, format);
  }, [data, format, loading]);

  // Chart height configuration
  const chartHeights = {
    small: 200,
    medium: 300,
    large: 400
  };

  // Custom tooltip for better UX
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <Box
          sx={{
            backgroundColor: 'background.paper',
            border: 1,
            borderColor: 'divider',
            borderRadius: 1,
            p: 1.5,
            boxShadow: theme.shadows[4]
          }}
        >
          <Typography variant="body2" color="text.secondary">
            {label}
          </Typography>
          <Typography variant="body1" color="primary.main" fontWeight="bold">
            {payload[0].payload.formatted_value || formatChartValue(payload[0].value, format)}
          </Typography>
        </Box>
      );
    }
    return null;
  };

  // Render different chart types
  const renderChart = () => {
    if (loading) {
      return (
        <Skeleton
          variant="rectangular"
          width="100%"
          height={chartHeights[height]}
          sx={{ borderRadius: 1 }}
        />
      );
    }

    if (!chartData.length) {
      return (
        <Box
          sx={{
            height: chartHeights[height],
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'text.secondary'
          }}
        >
          <Typography variant="body2">No data available</Typography>
        </Box>
      );
    }

    const commonProps = {
      data: chartData,
      height: chartHeights[height]
    };

    switch (chartType) {
      case 'line':
        return (
          <ResponsiveContainer width="100%" height={chartHeights[height]}>
            <LineChart {...commonProps}>
              {showGrid && <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} />}
              <XAxis
                dataKey="name"
                stroke={theme.palette.text.secondary}
                fontSize={12}
              />
              <YAxis
                stroke={theme.palette.text.secondary}
                fontSize={12}
                tickFormatter={(value) => formatChartValue(value, format)}
              />
              {showTooltip && <Tooltip content={<CustomTooltip />} />}
              <Line
                type="monotone"
                dataKey="value"
                {...chartConfigs.line}
                stroke={theme.palette.primary.main}
              />
            </LineChart>
          </ResponsiveContainer>
        );

      case 'bar':
        return (
          <ResponsiveContainer width="100%" height={chartHeights[height]}>
            <BarChart {...commonProps}>
              {showGrid && <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} />}
              <XAxis
                dataKey="name"
                stroke={theme.palette.text.secondary}
                fontSize={12}
              />
              <YAxis
                stroke={theme.palette.text.secondary}
                fontSize={12}
                tickFormatter={(value) => formatChartValue(value, format)}
              />
              {showTooltip && <Tooltip content={<CustomTooltip />} />}
              <Bar
                dataKey="value"
                fill={theme.palette.primary.main}
                radius={chartConfigs.bar.radius}
              />
            </BarChart>
          </ResponsiveContainer>
        );

      case 'area':
        return (
          <ResponsiveContainer width="100%" height={chartHeights[height]}>
            <AreaChart {...commonProps}>
              {showGrid && <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} />}
              <XAxis
                dataKey="name"
                stroke={theme.palette.text.secondary}
                fontSize={12}
              />
              <YAxis
                stroke={theme.palette.text.secondary}
                fontSize={12}
                tickFormatter={(value) => formatChartValue(value, format)}
              />
              {showTooltip && <Tooltip content={<CustomTooltip />} />}
              <Area
                type="monotone"
                dataKey="value"
                {...chartConfigs.area}
                stroke={theme.palette.primary.main}
                fill={theme.palette.primary.main}
              />
            </AreaChart>
          </ResponsiveContainer>
        );

      case 'pie':
        return (
          <ResponsiveContainer width="100%" height={chartHeights[height]}>
            <PieChart>
              {showTooltip && <Tooltip content={<CustomTooltip />} />}
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={2}
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={getChartColor(entry.trend || 'neutral', format)}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        );

      default:
        return null;
    }
  };

  return (
    <Card sx={{ height: '100%', ...sx }}>
      <CardContent sx={{ height: '100%' }}>
        <Stack spacing={2} height="100%">
          {/* Header */}
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="h6" component="h3" color="text.secondary">
              {title}
            </Typography>
            {icon && (
              <Box sx={{ color: 'primary.main'}}>
                {icon}
              </Box>
            )}
          </Stack>

          {/* Chart */}
          <Box sx={{ flex: 1, minHeight: 0 }}>
            {renderChart()}
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default ChartCard;