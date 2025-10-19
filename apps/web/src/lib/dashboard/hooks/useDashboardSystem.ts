'use client';

import { useShallow } from 'zustand/shallow';
import { useDashboardStore } from '../store';
import type { DashboardStore } from '../store-types';

export function useDashboardLayout() {
  return useDashboardStore(
    useShallow((state: DashboardStore) => ({
      // Layout Configuration
      layout: state.layout,

      // Layout Management Methods
      updateLayout: state.updateLayout,
      resetLayout: state.resetLayout,

      // Computed layout helpers
      isCompactMode: state.layout.compactMode,
      currentColumns: {
        desktop: state.layout.columns.desktop,
        tablet: state.layout.columns.tablet,
        mobile: state.layout.columns.mobile,
      },
      currentGaps: {
        desktop: state.layout.gaps.desktop,
        tablet: state.layout.gaps.tablet,
        mobile: state.layout.gaps.mobile,
      },
    }))
  );
}

export function useDashboardStatus() {
  return useDashboardStore(
    useShallow((state: DashboardStore) => {
      // Computed status metrics
      const widgets = Object.values(state.widgets);
      const errorWidgets = widgets.filter(w => w.error !== null);
      const loadingWidgets = widgets.filter(w => w.loading);
      const visibleWidgets = widgets.filter(w => w.visible);

      return {
        // Core Status
        initialized: state.initialized,
        globalLoading: state.globalLoading,
        lastSync: state.lastSync,

        // Error Status
        hasErrors: state.hasErrors(),
        errorCount: errorWidgets.length,
        errorWidgets: errorWidgets,

        // Loading Status
        hasLoadingWidgets: state.hasLoadingWidgets(),
        loadingWidgetCount: loadingWidgets.length,
        loadingWidgets: loadingWidgets,

        // Widget Metrics
        totalWidgets: widgets.length,
        visibleWidgetCount: visibleWidgets.length,
        hiddenWidgetCount: widgets.length - visibleWidgets.length,

        // System Methods
        initializeDashboard: state.initializeDashboard,

        // Health score calculation
        healthScore: widgets.length === 0 ? 100 : 
          Math.round(((widgets.length - errorWidgets.length) / widgets.length) * 100),
      };
    })
  );
}

export function useBulkWidgetOperations() {
  return useDashboardStore(
    useShallow((state: DashboardStore) => {
      const widgets = Object.values(state.widgets);
      const visibleWidgets = widgets.filter(w => w.visible);
      const hiddenWidgets = widgets.filter(w => !w.visible);
      const errorWidgets = widgets.filter(w => w.error !== null);
      
      return {
        // Bulk Operations
        refreshAllWidgets: state.refreshAllWidgets,
        hideAllWidgets: state.hideAllWidgets,
        showAllWidgets: state.showAllWidgets,
        
        // Additional bulk operations
        clearAllErrors: () => {
          widgets.forEach(widget => {
            if (widget.error) {
              state.setWidgetError(widget.id, null);
            }
          });
        },
        
        stopAllLoading: () => {
          widgets.forEach(widget => {
            if (widget.loading) {
              state.setWidgetLoading(widget.id, false);
            }
          });
        },
        
        // Operation Status
        canPerformBulkOps: widgets.length > 0,
        hasVisibleWidgets: visibleWidgets.length > 0,
        hasHiddenWidgets: hiddenWidgets.length > 0,
        hasErrorWidgets: errorWidgets.length > 0,
        
        // Operation counts for user feedback
        operationTargets: {
          total: widgets.length,
          visible: visibleWidgets.length,
          hidden: hiddenWidgets.length,
          errors: errorWidgets.length,
        },
      };
    })
  );
}

export function useDashboardPerformance() {
  return useDashboardStore(
    useShallow((state: DashboardStore) => {
      const widgets = Object.values(state.widgets);
      const now = new Date();
      
      // Performance calculations
      const widgetLoadTimes = widgets.map(widget => {
        if (widget.lastUpdated) {
          return now.getTime() - widget.lastUpdated.getTime();
        }
        return 0;
      }).filter(time => time > 0);
      
      const averageLoadTime = widgetLoadTimes.length > 0 
        ? widgetLoadTimes.reduce((sum, time) => sum + time, 0) / widgetLoadTimes.length
        : 0;
      
      const slowestWidget = widgets.reduce((slowest, widget) => {
        if (!widget.lastUpdated) return slowest;
        if (!slowest?.lastUpdated) return widget;
        
        return widget.lastUpdated < slowest.lastUpdated ? widget : slowest;
      }, null as typeof widgets[0] | null);
      
      return {
        // Performance Metrics
        averageLoadTime: Math.round(averageLoadTime),
        slowestWidget,
        fastestLoadTime: Math.min(...widgetLoadTimes) || 0,
        slowestLoadTime: Math.max(...widgetLoadTimes) || 0,
        
        // Performance scoring
        performanceScore: Math.max(0, Math.min(100, 
          100 - Math.round(averageLoadTime / 100)
        )),
        
        // System Health
        totalRenderCount: widgets.length,
        activeWidgetCount: widgets.filter(w => w.visible && !w.loading).length,
        
        // Memory usage estimation
        estimatedMemoryUsage: widgets.length * 50, // Rough estimate in KB
      };
    })
  );
}