'use client';

import { useState, useEffect, useCallback } from "react";
import { DataService, ServiceResponse, ServiceError } from '@/lib/services/DataService';
import { mockMetrics, mockCharts } from '@/lib/mock-data';

// Generic hook interface for all widget data
interface UseWidgetDataResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
  lastUpdated: Date | null;
}

function useAsyncData<T>(
  fetchFunction: () => Promise<ServiceResponse<T>>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dependencies: any[] = []
): UseWidgetDataResult<T> {
  const [data, setData ] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  // Memoized fetch function to prevent unnecessary re-fetches
  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Memoized fetch function to prevent unnecessary re-fetches
      const response = await DataService.retryRequest(() => fetchFunction());

      setData(response.data);
      setLastUpdated(response.timestamp);

      // Development logging for debugging
      if (process.env.NODE_ENV === 'development') {
        console.log(`✅ Widget data loaded successfully:`, {
          loadTime: response.loadTime,
          timestamp: response.timestamp,
        });
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load data';
      setError(errorMessage);

      // Professional: Development error logging
      if (process.env.NODE_ENV === 'development') {
        console.error('❌ Widget data loading failed:', err);
      }
    } finally {
      setLoading(false);
    }
  }, dependencies);

  // Load data on mount and dependency changes
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const refresh = useCallback(async () => {
    await fetchData();
  }, [fetchData]);

  return {
    data,
    loading,
    error,
    refresh,
    lastUpdated,
  };
}

/**
 * Metric data hook
 * Specialized hook for metric widgets with proper typing
 */
export function useMetricData(metricId: string): UseWidgetDataResult<typeof mockMetrics[0]> {
  return useAsyncData(
    () => DataService.fetchMetricData(metricId),
    [metricId]
  );
}

/**
 * Chart data hook
 * Specialized hook for chart widgets with proper typing
 */
export function useChartData(chartId: string): UseWidgetDataResult<typeof mockCharts[0]> {
  return useAsyncData(
    () => DataService.fetchChartData(chartId),
    [chartId]
  );
}

/**
 * Dashboard coordination hook
 * Manages loading states across multiple widgets
 */

export function useDashboardLoading() {
  const [globalLoading, setGlobalLoading] = useState(false);
  const [loadingWidgets, setLoadingWidgets] = useState<Set<string>>(new Set());

  // Register widget loading state
  const registerWidgetLoading = useCallback((widgetId: string, isLoading: boolean) => {
    setLoadingWidgets(prev => {
      const newSet = new Set(prev);
      if (isLoading) {
        newSet.add(widgetId);
      } else {
        newSet.delete(widgetId);
      }
      return newSet;
    });
  }, []);

  // Update global loading based on individual widgets
  useEffect(() => {
    setGlobalLoading(loadingWidgets.size > 0);
  }, [loadingWidgets]);

  return {
    globalLoading,
    loadingWidgetCount: loadingWidgets.size,
    registerWidgetLoading,
  };
}