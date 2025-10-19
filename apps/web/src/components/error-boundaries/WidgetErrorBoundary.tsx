'use client';

import React, { Component, ReactNode } from "react";
import {
  ErrorBoundaryProps,
  ErrorBoundaryState,
  ErrorFallbackProps,
  ErrorInfo
} from './types'
import { userAgent } from "next/server";

export class WidgetErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);

    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      retryCount: 0,
      errorId: '',
    };

    this.handleRetry = this.handleRetry.bind(this);
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    const errorId = `error-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    return {
      hasError: true,
      error,
      errorId,
    }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    const errorData = {
      widgetId: this.props.widgetId,
      widgetType: this.props.widgetType,
      error: {
        message: error.message,
        stack: error.stack,
        name: error.name,
      },
      componentStack: errorInfo.componentStack,
      retryCount: this.state.retryCount,
      errorId: this.state.errorId,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
    };

    // Development logging (detailed)
    if (process.env.NODE_ENV === 'development') {
      console.group('🚨 Widget Error Boundary - Error Caught');
      console.error('Error:', error);
      console.error('Component Stack:', errorInfo.componentStack);
      console.table(errorData);
      console.groupEnd();
    } else {
      // Production logging (minimal)
      console.error('Widget Error:', {
        widgetId: this.props.widgetId,
        message: error.message,
        errorId: this.state.errorId,
      });
    }

    // Custom error handler from props
    if (this.props.onError) {
      const customErrorInfo: ErrorInfo = {
        error,
        errorInfo,
        retryCount: this.state.retryCount,
        timestamp: new Date(),
      };

      this.props.onError(customErrorInfo);
    }
  }

  handleRetry = (): void => {
    const { maxRetries = 3 } = this.props;

    // Prevent infinite retries
    if (this.state.retryCount >= maxRetries) {
      console.warn(`Max retries (${maxRetries}) reached for widget: ${this.props.widgetId}`);
      return;
    }

    // Logging for retry attempts
    console.log(`🔄 Retrying widget: ${this.props.widgetId} (attempt ${this.state.retryCount + 1})`);

    // Reset error state and increment retry count
    this.setState(prevState => ({
      hasError: false,
      error: null,
      errorInfo: null,
      retryCount: prevState.retryCount + 1,
      errorId: '', // Clear error ID since we're recovering
    }));
  };

  render(): ReactNode {
    // Error state: Show fallback UI
    if (this.state.hasError && this.state.error) {
      // Use custom fallback or default
      const FallbackComponent = this.props.fallback || DefaultErrorFallback;

      return (
        <FallbackComponent
          error={this.state.error}
          retryCount={this.state.retryCount}
          onRetry={this.handleRetry}
          widgetId={this.props.widgetId}
          widgetType={this.props.widgetType}
        />
      );
    }

    // Success state: Render normal children
    return this.props.children;
  }
}

const DefaultErrorFallback: React.FC<ErrorFallbackProps> = ({
    error,
    retryCount,
    onRetry,
    widgetId,
    widgetType
  }) => {
    // Determine if retry is still allowed
    const maxRetries = 3;
    const canRetry = retryCount < maxRetries;

    return (
    <div style={{
      // Clean, accessible, user-friendly
      padding: '24px',
      border: '1px solid #ff6b6b',
      borderRadius: '8px',
      backgroundColor: '#fff5f5',
      textAlign: 'center',
      minHeight: '120px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '12px',
    }}>
      {/* Error Icon and Title */}
      <div style={{ fontSize: '24px', marginBottom: '4px' }}>
        ⚠️
      </div>
      
      <h4 style={{
        color: '#d63031',
        margin: 0,
        fontSize: '16px',
        fontWeight: '600'
      }}>
        Widget Error
      </h4>
      
      {/* User-friendly error message */}
      <p style={{
        color: '#636e72',
        margin: 0,
        fontSize: '14px',
        maxWidth: '250px',
        lineHeight: '1.4'
      }}>
        {widgetId
          ? `The "${widgetId}" widget encountered an error`
          : 'This widget encountered an error'
        }
      </p>

      {/* Retry button with smart state */}
      {canRetry ? (
        <button
          onClick={onRetry}
          style={{
            backgroundColor: '#0984e3',
            color: 'white',
            border: 'none',
            padding: '8px 16px',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '500',
            transition: 'background-color 0.2s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#0770c4';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#0984e3';
          }}
        >
          🔄 Try Again {retryCount > 0 && `(${retryCount}/${maxRetries})`}
        </button>
      ) : (
        <p style={{
          color: '#d63031',
          fontSize: '12px',
          fontStyle: 'italic'
        }}>
          Max retry attempts reached
        </p>
      )}

      {/* Development-only error details */}
      {process.env.NODE_ENV === 'development' && (
        <details style={{
          marginTop: '8px',
          width: '100%',
          fontSize: '12px'
        }}>
          <summary style={{
            cursor: 'pointer',
            color: '#636e72',
            fontSize: '11px'
          }}>
            🔍 Error Details (Dev Only)
          </summary>
          <pre style={{
            textAlign: 'left',
            fontSize: '10px',
            color: '#2d3748',
            backgroundColor: '#f7fafc',
            padding: '8px',
            borderRadius: '4px',
            overflow: 'auto',
            maxHeight: '100px',
            margin: '8px 0 0 0'
          }}>
            {error.message}
            {error.stack && `\n\nStack:\n${error.stack}`}
          </pre>
        </details>
      )}
    </div>
  );
}

