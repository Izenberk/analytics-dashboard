import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Utility function to merge Tailwind CSS classes intelligently
 * This prevents conflicts when combining multiple Tailwind classes
 *
 * Example: cn('px-2 py-1', 'px-4') → 'py-1 px-4'
 * (px-4 overrides px-2, preventing style conflicts)
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Format numbers for display in analytics dashboards
 * Handles large numbers with appropriate suffixes (K, M, B)
 */
export function formatNumber(num: number): string {
  if (num >= 1_000_000_000) {
    return (num / 1_000_000_000).toFixed(1) + 'B'
  }
  if (num >= 1_000_000) {
    return (num / 1_000_000).toFixed(1) + 'M'
  }
  if (num >= 1_000) {
    return (num / 1_000).toFixed(1) + 'K'
  }
  return num.toString()
}

/**
 * Format currency values for financial analytics
 */
export function formatCurrency(amount: number, currency = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount)
}

/**
 * Format percentage values for analytics displays
 */
export function formatPercentage(value: number): string {
  return `${value.toFixed(1)}%`
}

/**
 * Calculate percentage change between two values
 * Returns both the change and whether it's positive/negative
 */
export function calculatePercentageChange(current: number, previous: number): {
  change: number
  isPositive: boolean
  formatted: string
} {
  if (previous === 0) {
    return { change: 0, isPositive: true, formatted: '0%' }
  }

  const change = ((current - previous) / previous) * 100
  const isPositive = change >= 0

  return {
    change: Math.abs(change),
    isPositive,
    formatted: `${isPositive ? '+' : '-'}${Math.abs(change).toFixed(1)}%`
  }
}