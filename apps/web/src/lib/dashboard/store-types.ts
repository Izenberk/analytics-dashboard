import { WidgetConfig, LayoutConfig, UIState } from "./types";

/**
 * Main dashboard state structure
 * Normalized design for optimal performance and updates
 */
export interface DashboardState {
  // Normalized widget storage by ID
  widgets: Record<string, WidgetConfig>;

  // Separate layout concerns
  layout: LayoutConfig;

  // UI state management
  ui: UIState;

  // Global dashboard state
  initialized: boolean;
  globalLoading: boolean;
  lastSync: Date | null;
}

/**
 * Action interface for type-safe Zustand actions
 */
export interface DashboardActions {
  // Widget CRUD Operations
  addWidget: (config: Omit<WidgetConfig, "id" | "lastUpdated"> & { id?: string }) => string;
  updateWidget: (id: string, updates: Partial<WidgetConfig>) => void;
  removeWidget: (id: string) => void;

  // Widget State Management
  setWidgetLoading: (id: string, loading: boolean) => void;
  setWidgetError: (id: string, error: string | null) => void;
  toggleWidgetVisibility: (id: string) => void;

  // Widget Operations (async)
  refreshWidget: (id: string) => Promise<void>;
  refreshAllWidgets: () => Promise<void>;

  // Layout Management
  updateLayout: (layout: Partial<LayoutConfig>) => void;
  resetLayout: () => void;

  // Bulk Operations
  hideAllWidgets: () => void;
  showAllWidgets: () => void;

  // Initialization
  initializeDashboard: () => Promise<void>;
}

/**
 * Computed selectors for performance
 * These will be memoized to prevent unnecessary re-renders
 */
export interface DashboardSelectors {
  getVisibleWidgets: () => WidgetConfig[];
  getWidgetsByType: (type: WidgetConfig['type']) => WidgetConfig[];
  getLoadingWidgets: () => WidgetConfig[];
  getErrorWidgets: () => WidgetConfig[];
  hasErrors: () => boolean;
  hasLoadingWidgets: () => boolean;
}

/**
 * Complete store interface
 * Combines all store capabilities into one interface
 */
export interface DashboardStore extends
  DashboardState,
  DashboardActions,
  DashboardSelectors {
}

/**
 * Helper types for component integration
 */
export type WidgetSelector<T> = (state: DashboardStore) => T;
export type WidgetUpdater = (id: string, updates: Partial<WidgetConfig>) => void;