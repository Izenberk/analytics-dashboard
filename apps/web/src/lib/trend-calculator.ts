/**
 * Trend Calculator Utility
 *
 * Business logic for calculating metric trends and changes.
 * Following clean architecture - pure functions, no UI dependencies.
 */

export interface TrendCalculation {
  direction: 'up' | 'down' | 'neutral';
  percentageChange: number;
  absoluteChange: number;
  isSignificant: boolean;
  formattedChange: string;
}

/**
 * Calculate trend between current and previous values
 *
 * @param current - Current metric value
 * @param previous - Previous metric value
 * @param significanceThreshold - Minimum percentage change to be considered significant (default: 1%)
 * @returns TrendCalculation with direction, changes, and formatting
 */
export function calculateTrend(
  current: number,
  previous: number,
  significanceThreshold: number = 1
): TrendCalculation {
  if (previous === 0) {
    return {
      direction: current > 0 ? 'up' : current < 0 ? 'down' : 'neutral',
      percentageChange: 0,
      absoluteChange: current,
      isSignificant: Math.abs(current) > 0,
      formattedChange: current > 0 ? `+${current.toLocaleString()}` : current.toLocaleString()
    };
  }

  // Calculate changes
  const absoluteChange = current - previous;
  const percentageChange = (absoluteChange / Math.abs(previous)) * 100;

  // Determine direction
  let direction: 'up' | 'down' | 'neutral' = 'neutral';
  if (Math.abs(percentageChange) >= significanceThreshold) {
    direction = percentageChange > 0 ? 'up' : 'down';
  }

  // Check if change is significant
  const isSignificant = Math.abs(percentageChange) >= significanceThreshold;

  // Format the change for display
  const formattedChange = `${percentageChange >= 0 ? '+' : ''}${percentageChange.toFixed(1)}%`;

  return {
    direction,
    percentageChange,
    absoluteChange,
    isSignificant,
    formattedChange
  };
}

/**
 * Utility to validate trend calculation inputs
 * Professional practice: validate inputs for better debugging
 */
export function validateTrendInputs(current: number, previous: number): void {
  if (typeof current !== 'number' || typeof previous !== 'number') {
    throw new Error('Trend calculation requires numeric values');
  }

  if (!isFinite(current) || !isFinite(previous)) {
    throw new Error('Trend calculation requires finite numbers');
  }
}