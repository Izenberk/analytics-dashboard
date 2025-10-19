import { useWidget, useWidgetActions, useDashboardLayout, useDashboardStatus, useBulkWidgetOperations, useWidgetsByType, useVisibleWidgets } from '../hooks';
import { useDashboardPerformance } from './useDashboardSystem';
import { useWidgetStateActions } from './useWidgetActions';
import { useWidgetsByLoadingState, useWidgetsWithErrors } from './useWidgetFilters';

// =================== FOUNDATION LAYER ===================
// Core hooks that other hooks depend on
// Use these for fundamental widget operations

export { useWidget } from './useWidget';
export { useWidgetActions, useWidgetStateActions } from './useWidgetActions';

export {
  useWidgetRegistration,
  useWidgetRegistrationStatus
} from './useWidgetRegistration';

// =================== DATA ACCESS LAYER ===================
// Hooks for querying and filtering widget data
// Use these when you need specific subsets of widgets

export {
  useWidgetsByType,
  useVisibleWidgets,
  useWidgetsByLoadingState,
  useWidgetsWithErrors,
} from './useWidgetFilters';

// =================== SYSTEM LAYER ===================
// Dashboard-wide management and monitoring
// Use these for system-level operations and status

export {
  useDashboardLayout,
  useDashboardStatus,
  useBulkWidgetOperations,
  useDashboardPerformance,
} from './useDashboardSystem';

// =================== CONVENIENCE LAYER ===================
// High-level, easy-to-use composed hooks
// Use these for common widget management patterns

export {
  useWidgetConfig,      // Complete widget management interface
  useWidgetStateData,   // Read-only widget state access
} from './useWidgetConfig';

// =================== ADVANCED LAYER ===================
// Specialized hooks for complex functionality
// Use these for advanced dashboard features

export { useActionProcessing } from './useActionProcessing';

// =================== TYPE EXPORTS ===================
// Export types that hook consumers might need

export type {
  // Hook result types
  ActionProcessingResult,
} from '../types';

// =================== PROFESSIONAL HOOK GROUPS ===================
// For advanced usage patterns

/**
 * Professional: Foundation Hooks Group
 * Essential hooks for basic widget operations
 */
export const FoundationHooks = {
  useWidget,
  useWidgetActions,
  useWidgetStateActions,
} as const;

/**
 * Professional: System Management Hooks Group  
 * For dashboard administration and monitoring
 */
export const SystemHooks = {
  useDashboardLayout,
  useDashboardStatus,
  useBulkWidgetOperations,
  useDashboardPerformance,
} as const;

/**
 * Professional: Data Access Hooks Group
 * For querying and filtering widgets
 */
export const DataHooks = {
  useWidgetsByType,
  useVisibleWidgets,
  useWidgetsByLoadingState,
  useWidgetsWithErrors,
} as const;