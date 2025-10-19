import type { ErrorInfo } from '@/components/error-boundaries/types';

/**
 * Widget Error Handlers
 *
 * Architecture: Centralized error handling logic for different widget types
 * Naming: PascalCase for consistency with component naming patterns
 * Benefit: Consistent error processing, easy to enhance for analytics/monitoring
 */

export class WidgetErrorHandler {
  /**
   * Create specialized error handler for metric widgets
   * pattern: Factory method for creating handlers
   */
  static createMetricErrorHandler(widgetId: string) {
    return (errorInfo: ErrorInfo) => {
      const errorData = {
        category: 'metric-widget' as const,
        widgetId,
        error: errorInfo.error.message,
        retryCount: errorInfo.retryCount,
        timestamp: errorInfo.timestamp.toISOString(),
        userAgent: navigator.userAgent,
      };

      if (process.env.NODE_ENV === 'development') {
        console.group(`📊 Metric Widget Error - ${widgetId}`);
        console.error('Error Details:', errorData);
        console.error('Full Error:', errorInfo.error);
        console.groupEnd();
      } else {
        console.error('Metric Error:', { 
          widgetId, 
          message: errorInfo.error.message 
        });
      }

      // Professional: Return error data for potential analytics
      return errorData;
    };
  }

  /**
   * Create specialized error handler for chart widgets
   * Enhanced with chart-specific debugging information
   */
  static createChartErrorHandler(widgetId: string, chartType?: string) {
    return (errorInfo: ErrorInfo) => {
      const errorData = {
        category: 'chart-widget' as const,
        widgetId,
        chartType: chartType || 'unknown',
        error: errorInfo.error.message,
        retryCount: errorInfo.retryCount,
        timestamp: errorInfo.timestamp.toISOString(),
        possibleCauses: [
          'Data format mismatch',
          'Chart library rendering error', 
          'Canvas/SVG rendering issue',
          'Data processing failure'
        ] as const
      };

      if (process.env.NODE_ENV === 'development') {
        console.group(`📈 Chart Widget Error - ${widgetId}`);
        console.error('Chart Error Details:', errorData);
        console.error('Possible Causes:', errorData.possibleCauses);
        console.error('Full Error:', errorInfo.error);
        console.groupEnd();
      } else {
        console.error('Chart Error:', { 
          widgetId, 
          chartType, 
          message: errorInfo.error.message 
        });
      }

      return errorData;
    };
  }
}