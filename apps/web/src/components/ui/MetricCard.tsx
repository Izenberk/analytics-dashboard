'use client'

import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Skeleton,
  Chip,
  Stack
} from '@mui/material';
import {
  TrendingUp,
  TrendingDown,
  TrendingFlat
} from '@mui/icons-material';
import { SxProps, Theme } from "@mui/material";

import { calculateTrend, TrendCalculation } from "@/lib/trend-calculator";
import { formatNumber, formatCurrency } from "@/lib/utils";
import { WidgetActionCallbacks } from "@/types/widget-actions";
import { WidgetActions } from "./WidgetActions";

/**
 * MetricCard Props Interface
 * Using discriminated unions for type safety - prevents invalid format/value combinations
 *
 * Note: title is optional so the presentational shell (WidgetCard) can own the header.
 */
type MetricCardProps = {
  title?: string; // optional now
  loading?: boolean;
  previousValue?: number;
  trend?: 'up' | 'down' | 'neutral' | 'auto';
  size?: 'small' | 'medium' | 'large';
  icon?: React.ReactNode;
  sx?: SxProps<Theme>;
  actions?: WidgetActionCallbacks;
  widgetId?: string;
} & (
  | {
      format: 'currency';
      value: number;
    }
  | {
      format: 'percentage';
      value: number;
    }
  | {
      format: 'number';
      value: number;
    }
);

/**
 * MetricCard Component
 *
 * Features:
 * - Type-safe format handling
 * - Automatic trend calculation
 * - Loading states
 * - Responsive design
 * - Clean architecture patterns
 */
export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  format,
  loading = false,
  previousValue,
  trend = 'auto',
  size = 'medium',
  icon,
  sx,
  actions,
  widgetId
}) => {
  // Computed values using useMemo for performance
  const trendData = React.useMemo((): TrendCalculation | null => {
    // Only calculate trend if we have previous value (allow 0) and trend is auto
    if (previousValue == null || trend !== 'auto') {
      return null;
    }

    return calculateTrend(value, previousValue);
  }, [value, previousValue, trend]);

  // Derived state for display values
  const displayValue = React.useMemo(() => {
    if (loading) return null;

    switch (format) {
      case 'currency':
        return formatCurrency(value);
      case 'percentage':
        return `${value.toFixed(1)}%`;
      case 'number':
        return formatNumber(value);
    }
  }, [value, format, loading]);

  // Computed trend display logic
  const trendDisplay = React.useMemo(() => {
    // Manual trend takes precedence
    if (trend !== 'auto') {
      return {
        direction: trend,
        text: '',
        icon: getTrendIcon(trend)
      };
    }

    // Use calculated trend
    if (trendData) {
      return {
        direction: trendData.direction,
        text: trendData.formattedChange,
        icon: getTrendIcon(trendData.direction)
      };
    }

    return null;
  }, [trend, trendData]);

  // Helper function for trend icons
  function getTrendIcon(direction: 'up' | 'down' | 'neutral') {
    switch (direction) {
      case 'up':
        return <TrendingUp />;
      case 'down':
        return <TrendingDown />;
      case 'neutral':
        return <TrendingFlat />;
    }
  }

  // Helper function for trend colors
  function getTrendColor(direction: 'up' | 'down' | 'neutral'): string {
    switch (direction) {
      case 'up':
        return '#2e7d32';
      case 'down':
        return '#d32f2f';
      case 'neutral':
        return '#757575';
      default:
        return '#757575';
    }
  }

  // Size-based styling
  const cardSizes = {
    small: { minHeight: 120, padding: 2 },
    medium: { minHeight: 160, padding: 3 },
    large: { minHeight: 200, padding: 4 }
  };

  return (
    <Card
      sx={{
        ...cardSizes[size],
        ...sx
      }}
    >
      <CardContent>
        <Stack spacing={2} height="100%">
          {/* Header Section - Always render header container so actions are available.
              Show title text only when provided; icon and actions render regardless.
              This allows WidgetCard to own the textual header while keeping actions available.
          */}
          <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
            {/* Left: title (conditionally rendered) */}
            {title ? (
              <Typography
                variant="h6"
                component="h3"
                color="text.secondary"
                sx={{
                  fontSize: size === 'small' ? '0.875rem' : '1rem',
                  fontWeight: 500
                }}
              >
                {title}
              </Typography>
            ) : (
              // keep left spacing consistent when title absent (use an empty Box)
              <Box />
            )}

            {/* Right section with icon and actions (always present if provided) */}
            <Stack direction="row" spacing={1} alignItems="center">
              {icon && (
                <Box
                  sx={{
                    color: 'primary.main',
                    '& > *': { fontSize: size === 'small' ? 20 : 24 }
                  }}
                >
                  {icon}
                </Box>
              )}

              {actions && (
                <WidgetActions
                  onRefresh={actions.onRefresh}
                  onConfigure={actions.onConfigure}
                  onExport={actions.onExport}
                  onFullscreen={actions.onFullscreen}
                  onRemove={actions.onRemove}
                  widgetId={widgetId}
                  widgetTitle={title ?? widgetId ?? ''}
                  size={size === 'small' ? 'small' : 'medium'}
                  showOnHover={true}
                />
              )}
            </Stack>
          </Stack>

          {/* Main Value Section */}
          <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            {loading ? (
              <Stack spacing={1}>
                <Skeleton variant="text" width="60%" height={40} />
                <Skeleton variant="text" width="40%" height={24} />
              </Stack>
            ) : (
              <Stack spacing={1}>
                <Typography
                  variant="h3"
                  component="div"
                  sx={{
                    fontSize: size === 'small' ? '1.75rem' : size === 'medium' ? '2.125rem' : '2.5rem',
                    fontWeight: 700,
                    lineHeight: 1.2
                  }}
                >
                  {displayValue}
                </Typography>

                {/* Trend Indicator */}
                {trendDisplay && (
                  <Chip
                    icon={trendDisplay.icon}
                    label={trendDisplay.text || 'No change'}
                    size={size === 'small' ? 'small' : 'medium'}
                    sx={{
                      alignSelf: 'flex-start',
                      backgroundColor: getTrendColor(trendDisplay.direction),
                      color: 'white',
                      '& .MuiChip-icon' : {
                        color: 'white'
                      }
                    }}
                  />
                )}
              </Stack>
            )}
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default MetricCard;