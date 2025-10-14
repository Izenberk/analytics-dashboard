/**
 * Core types for our Analytics Dashboard
 * These types ensure type safety across our application
 */

export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  role: 'admin' | 'user' | 'viewer'
}

export interface MetricCard {
  id: string
  title: string
  value: number
  change: number
  changeType: 'positive' | 'negative' | 'neutral'
  icon: string
  color: 'blue' | 'green' | 'red' | 'yellow' | 'purple'
}

export interface ChartDataPoint {
  date: string
  value: number
  label?: string
}

export interface DashboardStats {
  totalUsers: number
  totalRevenue: number
  conversionRate: number
  averageOrderValue: number
  previousPeriodComparison: {
    totalUsers: number
    totalRevenue: number
    conversionRate: number
    averageOrderValue: number
  }
}

export interface SidebarItem {
  id: string
  label: string
  icon: string
  href: string
  badge?: number
  isActive?: boolean
}

/**
 * Chart configuration types
 * Used for consistent chart styling across the dashboard
 */
export interface ChartConfig {
  [key: string]: {
    label: string
    color: string
  }
}

export type DateRange = '7d' | '30d' | '90d' | '1y'

export type ChartType = 'line' | 'bar' | 'area' | 'pie' | 'donut'