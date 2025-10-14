import React from 'react';
import { Button, ButtonProps as MuiButtonProps } from '@mui/material';
import { SxProps, Theme } from '@mui/material/styles';

/**
 * Analytics Dashboard Button Component
 * Wraps MUI Button with our specific styling and business logic
 */

export interface AnalyticsButtonProps extends Omit<MuiButtonProps, 'sx'> {
  /**
   * Custom styling for analytics-specific use cases
   */
  variant?: 'contained' | 'outlined' | 'text';

  /**
   * Analytics-specific button types
   */
  analyticsType?: 'primary' | 'secondary' | 'success' | 'warning' | 'error';

  /**
   * Loading state with custom analytics styling
   */
  loading?: boolean;

  /**
   * Custom sx prop for advanced styling
   */
  sx?: SxProps<Theme>;
}

/**
 * Professional Analytics Button Component
 *
 * Features:
 * - Consistent styling across analytics dashboard
 * - Loading states for async operations
 * - Analytics-specific color variants
 * - Full MUI Button API compatibility
 */
export const AnalyticsButton: React.FC<AnalyticsButtonProps> = ({
  children,
  variant = 'contained',
  analyticsType = 'primary',
  loading = false,
  disabled,
  sx,
  ...props
}) => {
  // Map analytics types to MUI colors
  const getColor = (): MuiButtonProps['color'] => {
    switch (analyticsType) {
      case 'primary':
        return 'primary';
      case 'secondary':
        return 'secondary';
      case 'success':
        return 'success';
      case 'warning':
        return 'warning';
      case 'error':
        return 'error';
      default:
        return 'primary';
    }
  };

  // Custom styling for analytics dashboard
  const buttonSx: SxProps<Theme> = {
    minWidth: 120, // Consistent minimum width
    height: 40, // Consistent height
    borderRadius: 2, // Consistent border radius
    fontWeight: 600,
    textTransform: 'none',
    boxShadow: variant === 'contained' ? 2 : 'none',
    '&:hover': {
      boxShadow: variant === 'contained' ? 4 : 'none',
      transform: 'translateY(-1px)',
    },
    '&:active': {
      transform: 'translateY(0)',
    },
    // Loading state styling
    ...(loading && {
      pointerEvents: 'none',
      opacity: 0.7,
    }),
    // Merge with custom sx
    ...sx,
  };

  return (
    <Button
      variant={variant}
      color={getColor()}
      disabled={disabled || loading}
      sx={buttonSx}
      {...props}
    >
      {loading ? 'Loading...' : children}
    </Button>
  );
};

export default AnalyticsButton;