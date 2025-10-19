'use client';

import { useShallow } from 'zustand/shallow';
import { useDashboardStore } from "../store";
import { DashboardStore } from "../store-types";


export function useWidgetActions() {
  return useDashboardStore(
    useShallow((state: DashboardStore) => ({
      // Widget CRUD Operations
      addWidget: state.addWidget,
      updateWidget: state.updateWidget,
      removeWidget: state.removeWidget,

      // Widget State Management
      refreshWidget: state.refreshWidget,
      toggleWidgetVisibility: state.toggleWidgetVisibility,
      setWidgetLoading: state.setWidgetLoading,
      setWidgetError: state.setWidgetError,
    }))
  );
}

export function useWidgetStateActions() {
  return useDashboardStore(
    useShallow((state: DashboardStore) => ({
      setWidgetLoading: state.setWidgetLoading,
      setWidgetError: state.setWidgetError,
      toggleWidgetVisibility: state.toggleWidgetVisibility,
      refreshWidget: state.refreshWidget,
    }))
  );
}
