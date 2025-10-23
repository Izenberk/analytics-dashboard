import { mockMetrics, mockCharts } from '@/lib/mock-data';
import { resolve } from 'path';

// Type definitions for service responses
export interface ServiceResponse<T> {
  data: T;
  timestamp: Date;
  loadTime: number;
}

export interface ServiceError {
  code: string;
  message: string;
  retryable: boolean;
  timestamp:  Date;
}

/**
 * Simulate realistic network delays
 */
function simulateNetworkDelay(minMs: number = 500, maxMs: number = 3000): Promise<void> {
  const delay = Math.random() * (maxMs - minMs) + minMs;
  return new Promise(resolve => setTimeout(resolve, delay));
}

/**
 * Simulate network failures (10% chance)
 */
function simulateNetworkFailure(): boolean {
  return Math.random() < 0.1; // 10% failure rate
}

/**
 * Create realistic service errors
 */
function createServiceError(type: 'network' | 'timeout' | 'server'): ServiceError {
  const errors = {
    network: {
      code: 'NETWORK_ERROR',
      message: 'Network connection failed. Please check your internet connection.',
      retryable: true,
    },
    timeout: {
      code: 'REQUEST_TIMEOUT',
      message: 'Request timed out. The server took too long to respond.',
      retryable: true,
    },
    server: {
      code: 'SERVER_ERROR',
      message: 'Internal server error. Please try again later.',
      retryable: true,
    }
  };

  return {
    ...errors[type],
    timestamp: new Date(),
  };
}

/**
 * Data Service Class
 * Simulates realistic async operations for dashboard widgets
 */
export class DataService {
  /**
   * Fetch metric data with realistic async behavior
   */
  static async fetchMetricData(metricId: string): Promise<ServiceResponse<typeof mockMetrics[0]>> {
    const startTime = Date.now();

    // Simulate network delay
    await simulateNetworkDelay(800, 2500);

    // Simulate occasional failures
    if (simulateNetworkFailure()) {
      throw createServiceError('network');
    }

    // Find requested metric
    const metricIndex = ['total-revenue', 'active-users', 'conversion-rate', 'avg-order-value'].indexOf(metricId);
    const metric = mockMetrics[metricIndex] || mockCharts[0];

    return {
      data: metric,
      timestamp: new Date(),
      loadTime: Date.now() - startTime,
    };
  }

  /**
   * Fetch metric data with realistic async behavior
   */
  static async fetchChartData(chartId: string): Promise<ServiceResponse<typeof mockCharts[0]>> {
    const startTime = Date.now();

    // Professional: Charts take longer to load (more data processing)
    await simulateNetworkDelay(1200, 4000); // Charts: 1.2s - 4s

    // Professional: Simulate occasional failures
    if (simulateNetworkFailure()) {
      throw createServiceError('server');
    }

    // Professional: Find requested chart
    const chartIndex = ['revenue-chart', 'users-chart'].indexOf(chartId);
    const chart = mockCharts[chartIndex] || mockCharts[0];

    return {
      data: chart,
      timestamp: new Date(),
      loadTime: Date.now() - startTime,
    };
  }

  /**
   * Retry mechanism for failed requests
   */
  static async retryRequest<T>(
    requestFn: () => Promise<T>,
    maxRetries: number = 3,
    retryDelay: number = 1000
  ): Promise<T> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let lastError: any;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        return await requestFn();
      } catch (error) {
        lastError = error;

        // Log retry attempts in development
        if (process.env.NODE_ENV === 'development') {
          console.log(`🔄 Request failed, attempt ${attempt}/${maxRetries}:`, error);
        }

        // Don't retry on final attempt
        if (attempt === maxRetries) {
          break;
        }

        // Exponential backoff for retries
        const backoffDelay = retryDelay * Math.pow(2, attempt - 1);
        await new Promise(resolve => setTimeout(resolve, backoffDelay));
      }
    }

    throw lastError;
  }
}