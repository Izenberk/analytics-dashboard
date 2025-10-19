/**
 * Professional Metric Display Component
 * 
 * Learning Focus: Clean data visualization for dashboard widgets
 * Fixed: React inline styling patterns
 */

import React from 'react';
import { AdaptedMetricWidget } from '@/lib/widget-data-adapters';

interface MetricDisplayProps {
  data: AdaptedMetricWidget;
  className?: string;
}

export function MetricDisplay({ data, className = '' }: MetricDisplayProps) {
  // Professional: Format value based on type
  const formatValue = (value: number, format: string): string => {
    switch (format) {
      case 'currency':
        return new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }).format(value);
      case 'percentage':
        return `${value.toFixed(1)}%`;
      case 'count':
        return new Intl.NumberFormat('en-US').format(value);
      default:
        return value.toLocaleString();
    }
  };

  // Professional Learning: FIXED - Return React style objects, not CSS strings
  const getGrowthStyleObject = (trend: string, growth_rate?: number): React.CSSProperties => {
    if (!growth_rate) return {};
    
    if (trend === 'up') return { 
      color: '#10b981', 
      fontWeight: 600 
    };
    if (trend === 'down') return { 
      color: '#ef4444', 
      fontWeight: 600 
    };
    return { 
      color: '#6b7280', 
      fontWeight: 500 
    };
  };

  // Professional: Status indicator color
  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'success': return '#10b981';
      case 'warning': return '#f59e0b';
      case 'danger': return '#ef4444';
      default: return '#6b7280';
    }
  };

  return (
    <div className={`metric-display ${className}`} style={{ padding: '1.5rem', height: '100%' }}>
      {/* Professional: Status indicator */}
      <div style={{
        position: 'absolute',
        top: '0.75rem',
        right: '0.75rem',
        width: '8px',
        height: '8px',
        borderRadius: '50%',
        backgroundColor: getStatusColor(data.status)
      }} />

      {/* Professional: Main metric value */}
      <div style={{ marginBottom: '1rem' }}>
        <div style={{
          fontSize: '2.5rem',
          fontWeight: 'bold',
          lineHeight: '1',
          marginBottom: '0.5rem'
        }}>
          {formatValue(data.current_value, data.format)}
        </div>
        
        {/* Professional Learning: FIXED - Proper React style object usage */}
        {data.growth_rate !== undefined && (
          <div style={{
            fontSize: '0.9rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.25rem',
            ...getGrowthStyleObject(data.trend, data.growth_rate) // ✅ Spread style object correctly
          }}>
            <span>{data.trend === 'up' ? '↗️' : data.trend === 'down' ? '↘️' : '➡️'}</span>
            <span>{Math.abs(data.growth_rate).toFixed(1)}%</span>
            <span style={{ 
              color: 'rgba(255,255,255,0.7)', 
              fontSize: '0.8rem' 
            }}>
              vs previous
            </span>
          </div>
        )}
      </div>

      {/* Professional: Additional context */}
      <div style={{
        fontSize: '0.85rem',
        opacity: 0.8,
        marginTop: 'auto'
      }}>
        <div>Previous: {data.previous_value ? formatValue(data.previous_value, data.format) : 'N/A'}</div>
        <div style={{ 
          fontSize: '0.75rem', 
          marginTop: '0.5rem' 
        }}>
          Updated: {new Date(data.last_updated).toLocaleDateString()}
        </div>
      </div>
    </div>
  );
}