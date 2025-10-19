/**
 * Error information passed to fallback components
 */
export interface ErrorInfo {
  error: Error;
  errorInfo: React.ErrorInfo;
  retryCount: number;
  timestamp: Date;
}

/**
 * Props for error boundary components
 */
export interface ErrorBoundaryProps {
  children: React.ReactNode;

  // Widget identification for logging
  widgetId?: string;
  widgetType?: 'metric' | 'chart' | 'table' | 'custom';

  // Custom error handling
  onError?: (errorInfo: ErrorInfo) => void;
  fallback?: React.ComponentType<ErrorFallbackProps>;

  // Recovery options
  maxRetries?: number;
  resetKeys?: Array<string | number | boolean | null | undefined>;
}

/**
 * Props for error fallback UI components
 */
export interface ErrorFallbackProps {
  error: Error;
  retryCount: number;
  onRetry: () => void;
  widgetId?: string;
  widgetType?: string;
}

/**
 * Internal state structure for error boundary
 * Clean state management: Explicitly define what we track
 */
export interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
  retryCount: number;
  errorId: string
}

