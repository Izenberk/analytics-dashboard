// =================== CORE TYPE EXPORTS ===================
// Essential types that components and other modules need

export type {
  // Widget Core Types
  WidgetType,
  WidgetSize,
  WidgetPosition,
  WidgetConfig,

  // Action System Types
  WidgetActionType,
  SimpleWidgetActionType,
  ComplexWidgetActionType,
  WidgetActionInput,
  WidgetActionConfig,
  SimpleActionConfig,
  ConfirmActionConfig,
  MenuActionConfig,
  ProcessedActionConfig,
  ProcessedSimpleAction,
  ProcessedConfirmAction,
  ProcessedMenuAction,
  ProcessedActionUIHints,
  ActionExecutionContext,
  ActionExecutionResult,
  ActionProcessingResult,

  // Component Interface Types
  DashboardWidgetProps,
  WidgetContentProps,
  ActionButtonProps,
  WidgetRegistrationConfig,

  // Dashboard System Types
  LayoutConfig,
  UIState,
  Notification,
} from './types';

// =================== STORE TYPE EXPORTS ===================
// For advanced usage and store integration

export type {
  DashboardState,
  DashboardActions,
  DashboardSelectors,
  DashboardStore,
} from './store-types';

// =================== FOUNDATION HOOKS ===================
// Core hooks for basic widget operations
// Start here for simple widget management

export {
  useWidget,              // Get single widget state
  useWidgetActions,       // Get widget CRUD operations
  useWidgetStateActions,  // Get widget state management actions
  useWidgetRegistration,
  useWidgetRegistrationStatus,
} from './hooks';

// =================== DATA ACCESS HOOKS ===================
// For querying and filtering widget collections
// Use these when working with multiple widgets

export {
  useWidgetsByType,       // Filter widgets by type
  useVisibleWidgets,      // Get only visible widgets
  useWidgetsByLoadingState, // Filter by loading state
  useWidgetsWithErrors,   // Get widgets with errors
} from './hooks';

// =================== SYSTEM MANAGEMENT HOOKS ===================
// Dashboard-wide operations and monitoring
// For administrative and system-level functionality

export {
  useDashboardLayout,     // Layout configuration management
  useDashboardStatus,     // System health and metrics
  useBulkWidgetOperations, // Mass operations on widgets
  useDashboardPerformance, // Performance monitoring
} from './hooks';

// =================== CONVENIENCE HOOKS ===================
// High-level, easy-to-use interfaces
// Recommended for most component development

export {
  useWidgetConfig,        // Complete widget management (recommended)
  useWidgetStateData,     // Read-only widget state access
} from './hooks';

// =================== ADVANCED HOOKS ===================
// Specialized functionality for complex features

export {
  useActionProcessing,    // Process widget actions with context
} from './hooks';

// =================== STORE ACCESS ===================
// Direct store access (use hooks instead when possible)

export { useDashboardStore } from './store';

// =================== ACTION SYSTEM ===================
// Action processing and factory functions

export {
  // Action Registry and Processing
  actionRegistry,
  resolveActionConfig,
  getAvailableActions,
  getActionIcon,

  // Action Factory Functions
  createRemoveActionConfig,
  createExportActionConfig,

  // Action System Constants
  ACTION_ICONS,
  SIMPLE_ACTION_DEFAULTS,
} from './action-system';

// =================== HOOK GROUPS FOR ADVANCED USAGE ===================
// Organized hook collections for specific use cases

export {
  FoundationHooks,        // Essential hooks for basic operations
  SystemHooks,            // Dashboard management hooks
  DataHooks,              // Data querying and filtering hooks
} from './hooks';