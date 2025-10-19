'use client';

import { useShallow } from 'zustand/shallow';
import { useDashboardStore } from '../store';
import type { WidgetType, WidgetConfig } from '../types';
import { DashboardStore } from '../store-types';


export function useWidgetsByType(type: WidgetType) {
  return useDashboardStore(
    useShallow((state: DashboardStore) => state.getWidgetsByType(type))
  );
}

export function useVisibleWidgets() {
  return useDashboardStore(
    useShallow((state: DashboardStore) => state.getVisibleWidgets())
  );
}

export function useWidgetsByLoadingState(loading: boolean): WidgetConfig[] {
  return useDashboardStore(
    useShallow((state: DashboardStore) =>
      Object.values(state.widgets).filter(widget => widget.loading === loading)
    )
  );
}

export function useWidgetsWithErrors(): WidgetConfig[] {
  return useDashboardStore(
    useShallow((state: DashboardStore) =>
      Object.values(state.widgets).filter(widget => widget.error !== null)
    )
  );
}