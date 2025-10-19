// Following enterprise patterns for scalability and maintainability

/**
 * Core Widget Configuration Interface
 * Comprehensive but focused - everything a widget needs to know about itself
 */
export interface WidgetConfig {
  // Identity & Metadata
  id: string;
  title: string;
  type: WidgetType;

  // Visibility & State Management
  visible: boolean;
  loading: boolean;
  error: string | null;
  lastUpdated: Date | null;

  // Layout & Positioning
  position: WidgetPosition;
  size: WidgetSize;

  // Behavior Configuration
  actions: WidgetActionInput[];                           // Support both strings and configs
  actionPermissions?: Record<WidgetActionType, string>;   // Per-action permissions
  customActions?: Record<string, WidgetActionConfig>;     // Custom action definitions

  // Data Management (prepared for backend integration)
  data?: unknown;
  dataSource?: string;
}

/**
 * Discriminated unions provide type safety and IDE autocomplete
 */
export type WidgetType = 'metric' | 'chart' | 'table' | 'custom';
export type WidgetSize = 'small' | 'medium' | 'large' ;

// =================== ENHANCED ACTION TYPE SEPARATION ===================
// Separate simple actions from complex actions for better type safety

export type SimpleWidgetActionType =
  | 'refresh'
  | 'configure'
  | 'fullscreen'
  | 'minimize'
  | 'help';

export type ComplexWidgetActionType =
  | 'remove'    // Requires confirmation
  | 'export';   // Requires menu options

export type WidgetActionType = SimpleWidgetActionType | ComplexWidgetActionType;

// =================== BASE ACTION CONFIG ===================
// Common properties shared by all action types
// This follows DRY principle - define once, use everywhere

export interface BaseActionConfig {
  type: WidgetActionType;
  label?: string;
  tooltip?: string;
  shortcut?: string;
  permission?: string;
  disabled?: boolean;
  hidden?: boolean,
  priority?: number;
}

// =================== SIMPLE ACTION CONFIGS ===================
// Actions that execute immediately without additional UI

export interface SimpleActionConfig extends BaseActionConfig {
  type: SimpleWidgetActionType;
}



// =================== FUTURE ACTION CONFIGS ===================
// Placeholder for complex action types we'll implement later

export interface ConfirmActionConfig extends BaseActionConfig {
  type: 'remove';
  confirm: {
    title: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
    destructive?: boolean;
  };
}

export interface MenuActionConfig extends BaseActionConfig {
  type: 'export';
  menu: {
    items: Array<{
      label: string;
      value: string;
      icon?: React.ComponentType;
      disabled?: boolean;
    }>;
  };
}

// =================== ACTION CONFIG UNION TYPE ===================
// Type-safe union supporting current and future action types

export type WidgetActionConfig =
  | SimpleActionConfig
  | ConfirmActionConfig
  | MenuActionConfig;

// =================== PROCESSED ACTION INTERFACES ===================
// Interfaces for actions after processing pipeline

export interface ProcessedActionUIHints {
  variant: 'default' | 'destructive' | 'primary';
  showConfirmation: boolean;
  showMenu: boolean;
  loadingState: boolean;
  iconColor?: 'default' | 'primary' | 'error' | 'warning';
  buttonSize?: 'small' | 'medium' | 'large';
}

// Base interface for all processed actions
export interface ProcessedActionBase extends BaseActionConfig {
  icon: React.ComponentType | null;           // ✅ Always present after processing
  uiHints: ProcessedActionUIHints;           // ✅ Always present after processing
}

// Specific processed action interfaces
export interface ProcessedSimpleAction extends ProcessedActionBase {
  type: SimpleWidgetActionType;
}

export interface ProcessedConfirmAction extends ProcessedActionBase {
  type: 'remove';
  confirm: ConfirmActionConfig['confirm'];    // Inherit from base config
}

export interface ProcessedMenuAction extends ProcessedActionBase {
  type: 'export';
  menu: MenuActionConfig['menu'];             // Inherit from base config
}

// Union type for all processed actions
export type ProcessedActionConfig =
  | ProcessedSimpleAction
  | ProcessedConfirmAction
  | ProcessedMenuAction;

// =================== ACTION PROCESSING RESULT ===================
// Complete interface for action processing results

export interface ActionProcessingResult {
  processedActions: ProcessedActionConfig[];
  actionContext: ActionExecutionContext;
  hasActions: boolean;
  hasLoadingActions: boolean;
  getActionByType: (type: WidgetActionType) => ProcessedActionConfig | undefined;
}

// =================== FLEXIBLE ACTION INPUT ===================
// Support both simple strings and complex configurations

export type WidgetActionInput =
  | SimpleWidgetActionType        // Simple string for basic actions
  | WidgetActionConfig;          // Full config object for complex actions

// =================== BACKWARD COMPATIBILITY ===================
// Maintain compatibility with existing WidgetAction type

export type WidgetAction = WidgetActionType; // Alias for backward compatibility

// =================== ACTION EXECUTION CONTEXT ===================
// Runtime context for action execution

export interface ActionExecutionContext {
  widgetId: string;
  widgetType: WidgetType;
  actionType: WidgetActionType;
  userPermissions?: string[];
  widgetState?: {
    loading: boolean;
    error: string | null;
    visible: boolean;
  };
}

// =================== ACTION EXECUTION RESULT ===================
// Standardized result type for action execution

export interface ActionExecutionResult {
  success: boolean;                 // Did the action succeed
  message?: string;                 // Optional success/error message
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any;                       // Optional result data
  error?: Error;                    // Optional error object
}


/**
 * Responsive positioning system
 * Supports both CSS Grid areas and future drag-drop positioning
 */
export interface WidgetPosition {
  gridArea: string;
  mobileOrder: number;

  // Future-proof responsive design
  responsive?: {
    desktop: string;
    table: string;
    mobile: string;
  };
}

/**
 * Layout configuration for entire dashboard
 */
export interface LayoutConfig {
  columns: {
    desktop: number;
    tablet: number;
    mobile: number;
  };
  gaps: {
    desktop: number;
    tablet: number;
    mobile: number;
  };
  autoRefresh: boolean;
  compactMode: boolean;
}

/**
 * UI state separate from business logic
 */
export interface UIState {
  sidebarOpen: boolean;
  theme: 'light' | 'dark' | 'auto';
  notifications: Notification[];
}

export interface Notification {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  message: string;
  timestamp: Date;
  dismissed: boolean;
}

export interface DashboardWidgetProps {
  // =================== IDENTITY LAYER ===================
  /** Required: Unique identifier for widget in store */
  id: string;
  /** Display title (overrides store title) */
  title?: string;
  /** Widget type classification (overrides store type) */
  type?: WidgetType;

  // =================== LAYOUT LAYER ===================
  /** Required: CSS Grid area name for positioning */
  gridArea: string;
  /** Mobile stacking order (default: 0) */
  mobileOrder?: number;

  // =================== BEHAVIOR LAYER ===================
  /** Widget actions - supports both simple strings and complex configs */
  actions?: WidgetActionInput[];
  /** Auto-refresh interval in milliseconds */
  refreshInterval?: number;
  /** Auto-register widget in store on mount (default: true) */
  autoRegister?: boolean;

  // =================== CONTENT LAYER ===================
  /** Required: Widget content to render */
  children: React.ReactNode;
  /** Additional CSS classes */
  className?: string;
  /** Inline styles override */
  style?: React.CSSProperties;

  // =================== EVENT HANDLER LAYER ===================
  /** Custom refresh handler - overrides default store refresh */
  onRefresh?: () => void | Promise<void>;
  /** Custom configure handler */
  onConfigure?: () => void | Promise<void>;
  /** Custom remove handler - overrides default store removal */
  onRemove?: () => void | Promise<void>;
  /** Export handler - receives selected format */
  onExport?: (format: string) => void | Promise<void>;
  /** Fullscreen handler */
  onFullscreen?: () => void | Promise<void>;
  /** Generic action handler - receives action type and execution context */
  onActionExecute?: (
    actionType: WidgetActionType,
    context: ActionExecutionContext,
    processedAction: ProcessedActionConfig
  ) => void | Promise<void>;
  /** Store sync callback - called when widget state changes */
  onStoreSync?: (widget: WidgetConfig) => void;

  // =================== OPTIONS LAYER ===================
  /** User permissions for action filtering */
  permissions?: string[];
  /** Action system configuration overrides */
  actionConfig?: {
    /** Enable/disable confirmation dialogs (default: true) */
    confirmations?: boolean;
    /** Enable/disable keyboard shortcuts (default: true) */
    shortcuts?: boolean;
    /** Enable/disable action animations (default: true) */
    animations?: boolean;
  };
}

// =================== COMPONENT COMPOSITION INTERFACES ===================
// Additional interfaces for component ecosystem

/**
 * Props for custom widget content components
 * Use this when building components that will be children of DashboardWidget
 */
export interface WidgetContentProps {
  /** Widget ID for context */
  widgetId: string;
  /** Widget configuration from store */
  widget?: WidgetConfig;
  /** Loading state */
  loading: boolean;
  /** Error state */
  error: string | null;
  /** Refresh trigger function */
  onRefresh: () => void;
}

/**
 * Props for action button components
 * Use this when building custom action button implementations
 */
export interface ActionButtonProps {
  /** Processed action configuration */
  action: ProcessedActionConfig;
  /** Click handler */
  onClick: () => void;
  /** Widget title for accessibility */
  widgetTitle: string;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Configuration for widget registration
 * Used internally by the auto-registration system
 */
export interface WidgetRegistrationConfig {
  title: string;
  type: WidgetType;
  gridArea: string;
  mobileOrder: number;
  actions: WidgetActionInput[];
  autoRegister: boolean;
}