'use client';

import React from 'react';
import './dashboard-test.css';
import { DashboardWidget } from '@/components/dashboard/DashboardWidget';
import { createRemoveActionConfig } from '@/lib/dashboard';
import { getMetricWidget, getRechartsChartData } from '@/lib/widget-data-adapters';
import { MetricDisplay } from '@/components/widgets/MetricDisplay';
import { ChartDisplay } from '@/components/widgets/ChartDisplay';

export default function DashboardTestPage() {
  // Professional Learning: Load adapted metric data
  const mrrData = getMetricWidget('mrr-primary');
  const cacData = getMetricWidget('cac-metric');
  
  // Professional Learning: Load adapted chart data
  const mrrChartData = getRechartsChartData('mrr-trend-chart');
  const userGrowthData = getRechartsChartData('user-growth-chart');

  // Professional: Enhanced action handlers with widget type logging
  const handleGenericAction = (actionType: string, widgetId: string, widgetType: 'metric' | 'chart') => {
    console.log(`🎬 [INTEGRATION TEST] ${actionType} executed:`, {
      widgetId,
      widgetType,
      timestamp: new Date().toISOString(),
    });
    alert(`✅ ${actionType} executed for ${widgetType} widget: ${widgetId}!`);
  };

  return (
    <div className="dashboard-test-page">
      <header className="test-page-header">
        <h1>🎯 Professional Dashboard Integration Test</h1>
        <p>Complete System: Testing metrics + charts with Recharts integration</p>
        <div className="test-instructions">
          <h3>🧪 Integration Testing Checklist:</h3>
          <ul>
            <li>✅ Metric widgets display business data</li>
            <li>🎯 Chart widgets render with Recharts</li>
            <li>🎯 Both widget types support actions</li>
            <li>🎯 Data adapters work for both components</li>
            <li>🎯 Responsive design across widget types</li>
          </ul>
        </div>
      </header>

      <main className="dashboard-test-grid">
        
        {/* Test 1: MRR Metric Widget */}
        <DashboardWidget
          id="mrr-metric-widget"
          title={mrrData.title}
          gridArea="test-1"
          type="metric"
          actions={['refresh', 'configure']}
          onRefresh={() => handleGenericAction('refresh', 'mrr-metric-widget', 'metric')}
          onConfigure={() => handleGenericAction('configure', 'mrr-metric-widget', 'metric')}
        >
          <MetricDisplay data={mrrData} />
        </DashboardWidget>

        {/* Test 2: MRR Trend Chart Widget */}
        <DashboardWidget
          id="mrr-chart-widget"
          title={mrrChartData.chartConfig.title}
          gridArea="test-2"
          type="chart"
          actions={['refresh', 'configure', 'fullscreen']}
          onRefresh={() => handleGenericAction('refresh', 'mrr-chart-widget', 'chart')}
          onConfigure={() => handleGenericAction('configure', 'mrr-chart-widget', 'chart')}
          onFullscreen={() => handleGenericAction('fullscreen', 'mrr-chart-widget', 'chart')}
        >
          <ChartDisplay data={mrrChartData.chartConfig} />
        </DashboardWidget>

        {/* Test 3: CAC Metric Widget */}
        <DashboardWidget
          id="cac-metric-widget"
          title={cacData.title}
          gridArea="test-3"
          type="metric"
          actions={['refresh', 'configure']}
          onRefresh={() => handleGenericAction('refresh', 'cac-metric-widget', 'metric')}
          onConfigure={() => handleGenericAction('configure', 'cac-metric-widget', 'metric')}
        >
          <MetricDisplay data={cacData} />
        </DashboardWidget>

        {/* Test 4: User Growth Chart Widget */}
        <DashboardWidget
          id="user-chart-widget"
          title={userGrowthData.chartConfig.title}
          gridArea="test-4"
          type="chart"
          actions={['refresh', 'configure', createRemoveActionConfig()]}
          onRefresh={() => handleGenericAction('refresh', 'user-chart-widget', 'chart')}
          onConfigure={() => handleGenericAction('configure', 'user-chart-widget', 'chart')}
        >
          <ChartDisplay data={userGrowthData.chartConfig} />
        </DashboardWidget>

      </main>

      <footer className="test-page-footer">
        <div className="test-summary">
          <h3>🧪 Complete System Integration Verification</h3>
          <p><strong>Testing Process:</strong></p>
          <ol>
            <li><strong>Data Flow Testing:</strong> Verify both metric and chart data render correctly</li>
            <li><strong>Component Integration:</strong> Test both MetricDisplay and ChartDisplay components</li>
            <li><strong>Action Functionality:</strong> Confirm actions work across different widget types</li>
            <li><strong>Responsive Behavior:</strong> Check layout adaptation across screen sizes</li>
            <li><strong>Professional Patterns:</strong> Validate clean architecture and data adapter integration</li>
            <li><strong>Chart Library Integration:</strong> Test Recharts rendering and interactivity</li>
          </ol>
          
          <div style={{ 
            marginTop: '1.5rem', 
            padding: '1rem', 
            background: 'var(--color-gray-100)', 
            borderRadius: '8px',
            borderLeft: '3px solid var(--color-success)'
          }}>
            <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--color-gray-800)' }}>
              🎯 Integration Success Indicators:
            </h4>
            <ul style={{ margin: 0, color: 'var(--color-gray-700)' }}>
              <li>MRR metric displays current value with growth indicators</li>
              <li>MRR trend chart shows line graph with historical data</li>
              <li>CAC metric displays cost with trend analysis</li>
              <li>User growth chart shows bar graph with monthly data</li>
              <li>All action buttons function correctly with proper logging</li>
              <li>Charts are responsive and interactive (hover, tooltips)</li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}