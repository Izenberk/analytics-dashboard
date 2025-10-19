import { useMemo } from "react";
import { useWidget } from "./useWidget";
import { useWidgetActions, useWidgetStateActions } from "./useWidgetActions";
import { WidgetConfig, WidgetType } from "../types";


export function useWidgetConfig(id: string) {
  // Professional: Compose lower-level hooks
  const widget = useWidget(id);
  const widgetActions = useWidgetActions();
  const widgetState = useWidgetStateActions();

  // Professional: Memoized computed values
  const computedState = useMemo(() => ({
    widget,
    exists: !!widget,
    loading: widget?.loading ?? false,
    error: widget?.error ?? null,
    visible: widget?.visible ?? true,
    title: widget?.title ?? `Widget ${id}`,
    type: widget?.type ?? 'custom' as WidgetType,
    lastUpdated: widget?.lastUpdated ?? null,
    
    // Professional: Computed status helpers
    hasError: !!(widget?.error),
    isActive: !!(widget && widget.visible && !widget.loading),
    needsRefresh: widget ? (
      !widget.lastUpdated ||
      (Date.now() - widget.lastUpdated.getTime()) > 300000 // 5 minutes
    ) : false,
  }), [widget, id]);

  // Professional: Memoized bound action methods
  const boundActions = useMemo(() => ({
    // CRUD Operations
    update: (updates: Partial<WidgetConfig>) => widgetActions.updateWidget(id, updates),
    remove: () => widgetActions.removeWidget(id),
    
    // State Management
    refresh: () => widgetActions.refreshWidget(id),
    setLoading: (loading: boolean) => widgetState.setWidgetLoading(id, loading),
    setError: (error: string | null) => widgetState.setWidgetError(id, error),
    toggleVisibility: () => widgetState.toggleWidgetVisibility(id),
    
    // Professional: Convenience methods
    clearError: () => widgetState.setWidgetError(id, null),
    show: () => widgetActions.updateWidget(id, { visible: true }),
    hide: () => widgetActions.updateWidget(id, { visible: false }),
    updateTitle: (title: string) => widgetActions.updateWidget(id, { title }),
    updateType: (type: WidgetType) => widgetActions.updateWidget(id, { type }),
  }), [id, widgetActions, widgetState]);

  // Professional: Async convenience methods with error handling
  const asyncActions = useMemo(() => ({
    refreshSafely: async () => {
      try {
        boundActions.setLoading(true);
        boundActions.clearError();
        await boundActions.refresh();
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Refresh failed';
        boundActions.setError(errorMessage);
      } finally {
        boundActions.setLoading(false);
      }
    },

    updateSafely: async (updates: Partial<WidgetConfig>) => {
      try {
        boundActions.clearError();
        boundActions.update(updates);
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Update failed';
        boundActions.setError(errorMessage);
      }
    },
  }), [boundActions]);

  // Professional: Return complete convenience interface
  return {
    // State (computed and memoized)
    ...computedState,

    // Basic Actions (bound to this widget)
    ...boundActions,

    // Advanced Actions (with error handling)
    ...asyncActions,
  };
}

export function useWidgetStateData(id: string) {
  const widget = useWidget(id);

  return useMemo(() => ({
    widget,
    exists: !!widget,
    loading: widget?.loading ?? false,
    error: widget?.error ?? null,
    visible: widget?.visible ?? true,
    title: widget?.title ?? `Widget ${id}`,
    type: widget?.type ?? 'custom' as WidgetType,
    hasError: !!(widget?.error),
    isActive: !!(widget && widget.visible && !widget.loading),
  }), [widget, id]);
}