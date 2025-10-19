/**
 * Professional Chart Display Component - FIXED VERSION
 * 
 * Learning Focus: Proper Recharts integration with TypeScript compliance
 * Fix: Remove width/height from chart components, let ResponsiveContainer handle sizing
 */

import React from 'react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import { AdaptedChartWidget, transformChartDataForRecharts } from '@/lib/widget-data-adapters';

interface ChartDisplayProps {
  data: AdaptedChartWidget;
  className?: string;
}

export function ChartDisplay({ data, className = '' }: ChartDisplayProps) {
  // Professional Learning: Transform data for Recharts
  const rechartsData = transformChartDataForRecharts(data);
  
  // Professional Learning: FIXED - Remove width/height, let ResponsiveContainer handle sizing
  const chartMargin = {
    top: 5,
    right: 30,
    left: 20,
    bottom: 5
  };

  // Professional Learning: Chart rendering with proper TypeScript compliance
  const renderChart = () => {
    switch (data.chart_type) {
      case 'line':
        return (
          <LineChart 
            data={rechartsData} 
            margin={chartMargin}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis 
              dataKey="name" 
              stroke="rgba(255,255,255,0.7)"
              fontSize={12}
            />
            <YAxis 
              stroke="rgba(255,255,255,0.7)"
              fontSize={12}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: '#1f2937',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '6px'
              }}
            />
            <Line 
              type="monotone" 
              dataKey="value" 
              stroke="#10b981" 
              strokeWidth={3}
              dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: '#10b981', strokeWidth: 2 }}
            />
          </LineChart>
        );

      case 'bar':
        return (
          <BarChart 
            data={rechartsData} 
            margin={chartMargin}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis 
              dataKey="name" 
              stroke="rgba(255,255,255,0.7)"
              fontSize={12}
            />
            <YAxis 
              stroke="rgba(255,255,255,0.7)"
              fontSize={12}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: '#1f2937',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '6px'
              }}
            />
            <Bar 
              dataKey="value" 
              fill="#3b82f6"
              radius={[2, 2, 0, 0]}
            />
          </BarChart>
        );

      default:
        return (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            color: 'rgba(255,255,255,0.7)',
            fontSize: '0.9rem'
          }}>
            Chart type &quot;{data.chart_type}&quot; not yet supported
          </div>
        );
    }
  };

  // Professional Learning: Format value for display
  const formatValue = (value: number): string => {
    switch (data.format) {
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

  return (
    <div className={`chart-display ${className}`} style={{ padding: '1.5rem', height: '100%' }}>
      {/* Professional Learning: Chart metadata header */}
      <div style={{ marginBottom: '1rem' }}>
        <div style={{
          fontSize: '0.85rem',
          opacity: 0.8,
          marginBottom: '0.5rem'
        }}>
          {data.data_points.length} data points • Last updated: {new Date(data.last_updated).toLocaleDateString()}
        </div>
      </div>

      {/* Professional Learning: FIXED - ResponsiveContainer handles all sizing */}
      <div style={{ width: '100%', height: '250px' }}>
        <ResponsiveContainer width="100%" height="100%">
          {renderChart()}
        </ResponsiveContainer>
      </div>

      {/* Professional Learning: Chart summary */}
      <div style={{
        marginTop: '1rem',
        fontSize: '0.8rem',
        opacity: 0.7,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <span>Type: {data.chart_type}</span>
        <span>
          Range: {formatValue(Math.min(...rechartsData.map(d => d.value)))} - {formatValue(Math.max(...rechartsData.map(d => d.value)))}
        </span>
      </div>
    </div>
  );
}