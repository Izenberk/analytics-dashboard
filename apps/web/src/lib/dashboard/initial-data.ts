import { WidgetConfig, LayoutConfig, UIState } from './types';

/**
 * Factory functions for initial data
 * Centralizes default values and makes testing easier
 */
export function createInitialWidgets(): Record<string, WidgetConfig> {
  const widgets: WidgetConfig[] = [
    {
      id: 'revenue-metric',
      title: 'Total Revenue',
      type: 'metric',
      visible: true,
      loading: false,
      error: null,
      lastUpdated: null,
      position: {
        gridArea: 'metric1',
        mobileOrder: 1,
      },
      size: 'medium',
      actions: ['refresh', 'configure'],
      data: null,
    },
    {
      id: 'users-metric',
      title: 'Active Users',
      type: 'metric',
      visible: true,
      loading: false,
      error: null,
      lastUpdated: null,
      position: {
        gridArea: 'metric2',
        mobileOrder: 2,
      },
      size: 'medium',
      actions: ['refresh', 'configure'],
      data: null,
    },
    {
      id: 'trends-chart',
      title: 'Revenue Trends',
      type: 'chart',
      visible: true,
      loading: false,
      error: null,
      lastUpdated: null,
      position: {
        gridArea: 'chart1',
        mobileOrder: 5,
      },
      size: 'large',
      actions: ['refresh', 'configure', 'fullscreen'],
      data: null,
    },
  ];

  // Convert array to normalized Record<string, WidgetConfig>
  return widgets.reduce((acc, widget) => {
    acc[widget.id] = widget;
    return acc;
  }, {} as Record<string, WidgetConfig>);
}

export function createInitialLayout(): LayoutConfig {
  return {
    columns: {
      desktop: 4,
      tablet: 2,
      mobile: 1,
    },
    gaps: {
      desktop: 24,
      tablet: 20,
      mobile: 16,
    },
    autoRefresh: false,
    compactMode: false,
  };
}

export function createInitialUIState(): UIState {
  return {
    sidebarOpen: false,
    theme: 'auto',
    notifications: [],
  };
}