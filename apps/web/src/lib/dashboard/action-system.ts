'use client'

import { Refresh, Settings, Close, Fullscreen, GetApp, Minimize, Help } from '@mui/icons-material';
import type {
  WidgetActionType,
  SimpleWidgetActionType,
  ComplexWidgetActionType,
  WidgetActionConfig,
  BaseActionConfig,
  SimpleActionConfig,
  ConfirmActionConfig,
  MenuActionConfig,
  WidgetActionInput,
  ActionExecutionContext,
  ActionExecutionResult
} from './types'

// =================== ACTION ICON MAPPING ===================
// Centralized icon system for consistency

export const ACTION_ICONS = {
  refresh: Refresh,
  configure: Settings,
  remove: Close,
  export: GetApp,
  fullscreen: Fullscreen,
  minimize: Minimize,
  help: Help,
} as const;

// =================== DEFAULT ACTION CONFIGURATIONS ===================
// Predefined configurations for common actions

export const SIMPLE_ACTION_DEFAULTS: Record<SimpleWidgetActionType, BaseActionConfig> = {
  refresh: {
    type: 'refresh',
    label: 'Refresh',
    tooltip: 'Refresh widget data',
    shortcut: 'R',
    priority: 1,
  },
  configure: {
    type: 'configure',
    label: 'Configure',
    tooltip: 'Configure widget settings',
    shortcut: 'C',
    priority: 2,
  },
  fullscreen: {
    type: 'fullscreen',
    label: 'Fullscreen',
    tooltip: 'Open in fullscreen mode',
    shortcut: 'F11',
    priority: 4,
  },
  minimize: {
    type: 'minimize',
    label: 'Minimize',
    tooltip: 'Minimize widget',
    shortcut: 'M',
    priority: 5,
  },
  help: {
    type: 'help',
    label: 'Help',
    tooltip: 'Show widget help',
    shortcut: 'F1',
    priority: 9,
  },
};

// =================== COMPLEX ACTION FACTORIES ===================
// Helper functions to create complete complex action configs

export const createRemoveActionConfig = (
  overrides?: Partial<ConfirmActionConfig>
): ConfirmActionConfig => ({
  type: 'remove',
  label: 'Remove',
  tooltip: 'Remove widget from dashboard',
  shortcut: 'Delete',
  priority: 10,
  confirm: {
    title: 'Remove Widget?',
    message: 'This widget will be removed from your dashboard. This action cannot be undone.',
    confirmText: 'Remove',
    cancelText: 'Cancel',
    destructive: true,
  },
  ...overrides,
});

export const createExportActionConfig = (
  menuItems?: Array<{ label: string; value: string; icon?: React.ComponentType; disabled?: boolean }>,
  overrides?: Partial<MenuActionConfig>
): MenuActionConfig => ({
  type: 'export',
  label: 'Export',
  tooltip: 'Export widget data',
  shortcut: 'E',
  priority: 3,
  menu: {
    items: menuItems || [
      { label: 'Export as PDF', value: 'pdf' },
      { label: 'Export as CSV', value: 'csv' },
      { label: 'Export as Image', value: 'png' },
    ],
  },
  ...overrides,
});

// =================== ACTION REGISTRY CLASS ===================
// Central registry for managing action definitions

export class WidgetActionRegistry {
  private static instance: WidgetActionRegistry;
  private customConfigs: Map<string, WidgetActionConfig> = new Map();

  // Singleton pattern for global registry
  public static getInstance(): WidgetActionRegistry {
    if (!WidgetActionRegistry.instance) {
      WidgetActionRegistry.instance = new WidgetActionRegistry();
    }
    return WidgetActionRegistry.instance;
  }

  /**
   * Type-safe action config resolution
   * Handles both simple strings and complex configuration objects
   */
  public resolveActionConfig(
    action: WidgetActionInput,
    context?: Partial<ActionExecutionContext>
  ): WidgetActionConfig {

    // If it's already a complete config object, validate and use it
    if (typeof action === 'object') {
      return this.evaluateActionAvailability(action, context);
    }

    // If it's a simple action string, create simple config
    if (this.isSimpleAction(action)) {
      const defaults = SIMPLE_ACTION_DEFAULTS[action];
      const simpleConfig: SimpleActionConfig = {
        ...defaults,
        type: action,
      };
      return this.evaluateActionAvailability(simpleConfig, context);
    }

    // If it's a complex action string, provide helpful error
    throw new Error(
      `Complex action '${action}' requires full configuration. ` +
      `Use createRemoveActionConfig() or createExportActionConfig() helper functions.`
    );
  }

  /**
   * Type guard for simple actions
   */
  private isSimpleAction(action: WidgetActionType): action is SimpleWidgetActionType {
    return ['refresh', 'configure', 'fullscreen', 'minimize', 'help'].includes(action);
  }


  /**
   * Context-aware action availability evaluation
   */
  private evaluateActionAvailability(
    config: WidgetActionConfig,
    context?: Partial<ActionExecutionContext>
  ): WidgetActionConfig {

    if (!context) return config;

    let disabled = config.disabled || false;
    let hidden = config.hidden || false;

    // Check permissions
    if (config.permission && context.userPermissions) {
      if (!context.userPermissions.includes(config.permission)) {
        hidden = true;
      }
    }

    // Check widget state dependencies
    if (context.widgetState) {
      const { loading, error } = context.widgetState;

      switch (config.type) {
        case 'refresh':
          // Refresh available even when loading (allows cancellation)
          break;
        case 'configure':
        case 'fullscreen':
          disabled = disabled || loading;
          break;
        case 'export':
          disabled = disabled || loading || !!error;
          break;
        case 'remove':
          // Remove always available unless explicitly disabled
          break;
      }
    }

    return {
      ...config,
      disabled,
      hidden,
    };
  }

  /**
   * Get available actions with proper type safety
   */
  public getAvailableActions(
    actions: WidgetActionInput[],
    context?: Partial<ActionExecutionContext>
  ): WidgetActionConfig[] {

    return actions
      .map(action => {
        try {
          return this.resolveActionConfig(action, context);
        } catch (error) {
          console.warn(`[ActionRegistry] Failed to resolve action:`, action, error);
          return null;
        }
      })
      .filter((config): config is WidgetActionConfig => config !== null)
      .filter(config => !config.hidden)
      .sort((a, b) => (a.priority || 0) - (b.priority || 0));
  }

  /**
   * Register custom action configuration
   * Allows extending the action system with custom behaviors
   */
  public registerCustomAction(key: string, config: WidgetActionConfig): void {
    this.customConfigs.set(key, config);
  }

  /**
   * Get action icon with type safety
   */
  public getActionIcon(actionType: WidgetActionType): React.ComponentType | null {
    const icons = {
      refresh: Refresh,
      configure: Settings,
      remove: Close,
      export: GetApp,
      fullscreen: Fullscreen,
      minimize: Minimize,
      help: Help,
    };

    return icons[actionType] || null;
  }
}

// =================== CONVENIENCE EXPORTS ===================
export const actionRegistry = WidgetActionRegistry.getInstance();

export const resolveActionConfig = (
  action: WidgetActionInput,
  context?: Partial<ActionExecutionContext>
) => actionRegistry.resolveActionConfig(action, context);

export const getAvailableActions = (
  actions: WidgetActionInput[],
  context?: Partial<ActionExecutionContext>
) => actionRegistry.getAvailableActions(actions, context);

export const getActionIcon = (actionType: WidgetActionType) => 
  actionRegistry.getActionIcon(actionType);