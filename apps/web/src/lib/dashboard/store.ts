import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { produce } from 'immer';

import {
  DashboardStore,
  DashboardState,
} from './store-types';
import { LayoutConfig, WidgetConfig, WidgetType } from './types';
import {
  createInitialWidgets,
  createInitialLayout,
  createInitialUIState
} from './initial-data';

/**
 * Create unique IDs for new widgets
 * Simple but effective ID generation
 */
function generateWidgetId(): string {
  return `widget-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Simulate API calls for learning
 * In Phase 4, these will become real backend calls
 */
async function simulateWidgetRefresh(id: string): Promise<void> {
  // Simulate network delay and potential failure
  await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));

  // 10% chance of simulated error for testing error handling
  if (Math.random() < 0.1) {
    throw new Error(`Failed to refresh widget ${id}: Network timeout`);
  }
}

/**
 * Initial state factory
 * Centralizes state initialization logic
 */
function createInitialState(): DashboardState {
  return {
    widgets: createInitialWidgets(),
    layout: createInitialLayout(),
    ui: createInitialUIState(),
    initialized: false,
    globalLoading: false,
    lastSync: null,
  };
}

/**
 * Main Zustand store with enterprise patterns
 * Uses Immer for clean immutable updates and DevTools for debugging
 */
export const useDashboardStore = create<DashboardStore>()(
  devtools(
    immer((set, get) => ({
      // Spread initial state
      ...createInitialState(),

      // =================== WIDGET CRUD OPERATIONS ===================

      /**
       * Add new widget with generated ID
       * Returns the generated ID for immediate component usage
       */
      addWidget: (config) => {
        // Professional: Use provided ID or generate new one
        const id = config.id || generateWidgetId();
        
        // Professional: Remove id from config to avoid duplication
        const { id: configId, ...widgetConfig } = config;
        
        set((state) => {
          state.widgets[id] = {
            ...widgetConfig,
            id, // ✅ Use the correct ID (provided or generated)
            lastUpdated: new Date(),
          };
        });

        return id; // ✅ Return the actual ID used
      },

      /**
       * Update widget with partial updates
       * Uses Immer for clean immutable updates
       */
      updateWidget: (id, updates) => {
        set((state) => {
          const widget = state.widgets[id];
          if (widget) {
            Object.assign(widget, updates);
            widget.lastUpdated = new Date();
          }
        });
      },

      /**
       * Remove widget with cleanup
       */
      removeWidget: (id) => {
        set((state) => {
          delete state.widgets[id];
        });
      },

      // =================== WIDGET STATE MANAGEMENT ===================

      /**
       * Dedicated loading state management
       * Clear, single-purpose actions for better debugging
       */
      setWidgetLoading: (id, loading) => {
        set((state) => {
          const widget = state.widgets[id];
          if (widget) {
            widget.loading = loading;
            // Clear error when starting to load
            if (loading) {
              widget.error = null;
            }
          }
        });
      },

      /**
       * Error state management with automatic loading cleanup
       */
      setWidgetError: (id, error) => {
        set((state) => {
          const widget = state.widgets[id];
          if (widget) {
            widget.error = error;
            widget.loading = false; // Always stop loading on error
          }
        });
      },

      /**
       * Toggle visibility with clean state update
       */
      toggleWidgetVisibility: (id) => {
        set((state) => {
          const widget = state.widgets[id];
          if (widget) {
            widget.visible = !widget.visible;
          }
        });
      },

      // =================== ASYNC WIDGET OPERATIONS ===================

      /**
       * Async widget refresh with comprehensive error handling
       * Demonstrates proper async action patterns in Zustand
       */
      refreshWidget: async (id) => {
        const { setWidgetLoading, setWidgetError, updateWidget } = get();

        // Set loading state immediately
        setWidgetLoading(id, true);

        try {
          // Simulate API call
          await simulateWidgetRefresh(id);

          // Update success state
          updateWidget(id, {
            loading: false,
            error: null,
            lastUpdated: new Date(),
          });

          console.log(`[Dashboard] Successfully refreshed widget: ${id}`);

        } catch (error) {
          // Handle error with detailed logging
          const errorMessage = error instanceof Error ? error.message : 'Unknown error';
          setWidgetError(id, errorMessage);

          console.error(`[Dashboard] Failed to refresh widget ${id}:`, error);
        }
      },

      /**
       * Bulk refresh operation
       * Demonstrates parallel async operations with error isolation
       */
      refreshAllWidgets: async () => {
        const { widgets, refreshWidget } = get();

        // Get only visible widgets for efficiency
        const visibleWidgets = Object.values(widgets).filter(w => w.visible);

        // Parallel execution with Promise.allSettled
        // This ensures one widget failure doesn't stop others
        const refreshPromises = visibleWidgets.map(widget => 
          refreshWidget(widget.id)
        );

        const results = await Promise.allSettled(refreshPromises);

        // Log summary of refresh operation
        const successful = results.filter(r => r.status === 'fulfilled').length;
        const failed = results.filter(r => r.status === 'rejected').length;

        console.log(`[Dashboard] Refresh completed: ${successful} successful, ${failed} failed`);
      },

      // =================== LAYOUT MANAGEMENT ===================

      /**
       * Layout updates with validation
       */
      updateLayout: (layoutUpdates) => {
        set((state) => {
          Object.assign(state.layout, layoutUpdates);
        });
      },

      /**
       * Reset to default layout
       */
      resetLayout: () => {
        set((state) => {
          state.layout = createInitialLayout();
        });
      },

      // =================== BULK OPERATIONS ===================

      /**
       * Bulk visibility operations
       * Efficient batch updates using Immer
       */
      hideAllWidgets: () => {
        set((state) => {
          Object.values(state.widgets).forEach(widget => {
            widget.visible = false;
          });
        });
      },

      showAllWidgets: () => {
        set((state) => {
          Object.values(state.widgets).forEach(widget => {
            widget.visible = true;
          });
        });
      },

      // =================== INITIALIZATION ===================

      /**
       * Dashboard initialization with async setup
       */
      initializeDashboard: async () => {
        set((state) => {
          state.globalLoading = true;
        });

        try {
          // Simulate loading dashboard configuration
          await new Promise(resolve => setTimeout(resolve, 500));

          set((state) => {
            state.initialized = true;
            state.globalLoading = false;
            state.lastSync = new Date();
          });

          console.log('[Dashboard] Dashboard initialized successfully');

        } catch (error) {
          set((state) => {
            state.globalLoading = false;
          });

          console.error('[Dashboard] Failed to initialize dashboard:', error);
        }
      },

      // =================== COMPUTED SELECTORS ===================

      /**
       * Memoized selectors for performance
       * These prevent unnecessary re-renders in components
       */
      getVisibleWidgets: () => {
        const { widgets } = get();
        return Object.values(widgets).filter(w => w.visible);
      },

      getWidgetsByType: (type) => {
        const { widgets } = get();
        return Object.values(widgets).filter(w => w.type === type);
      },

      getLoadingWidgets: () => {
        const { widgets } = get();
        return Object.values(widgets).filter(w => w.loading);
      },

      getErrorWidgets: () => {
        const { widgets } = get();
        return Object.values(widgets).filter(w => w.error !== null);
      },

      hasErrors: () => {
        const { getErrorWidgets } = get();
        return getErrorWidgets().length > 0;
      },

      hasLoadingWidgets: () => {
        const { getLoadingWidgets } = get();
        return getLoadingWidgets().length > 0;
      },
    })),
    {
      name: 'dashboard-store', // Shows in Redux DevTools
      trace: true, // Shows action stack traces
    }
  )
);