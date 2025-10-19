'use client';

import { useMemo, useCallback } from 'react';
import type {
  WidgetType,
  WidgetActionType,
  WidgetActionInput,
  WidgetActionConfig,
  ActionExecutionContext,
  ProcessedActionConfig,
  ProcessedSimpleAction,
  ProcessedConfirmAction,
  ProcessedMenuAction,
  ProcessedActionUIHints,
  ActionProcessingResult,
} from '@/lib/dashboard';

import { getAvailableActions, getActionIcon } from '@/lib/dashboard';

/**
 * Type-safe action processing hook
 * Ensures complete type safety throughout the processing pipeline
 */
export function useActionProcessing(
  rawActions: WidgetActionInput[] = [],
  widgetId: string,
  widgetState?: {
    loading: boolean;
    error: string | null;
    visible: boolean;
    type: WidgetType;
  },
  userPermissions?: string[]
): ActionProcessingResult {
  
  // Explicitly typed context
  const actionContext = useMemo((): ActionExecutionContext => ({
    widgetId,
    widgetType: widgetState?.type || 'custom',
    actionType: 'refresh',
    userPermissions: userPermissions || [],
    widgetState: widgetState ? {
      loading: widgetState.loading,
      error: widgetState.error,
      visible: widgetState.visible,
    } : undefined,
  }), [widgetId, widgetState, userPermissions]);

  // Type-safe processing with explicit type assertions
  const processedActions = useMemo((): ProcessedActionConfig[] => {
    if (!rawActions.length) return [];

    try {
      // Get resolved actions with explicit typing
      const resolvedActions: WidgetActionConfig[] = getAvailableActions(rawActions, actionContext);
      
      // Transform with type safety verification
      return resolvedActions.map((action: WidgetActionConfig): ProcessedActionConfig => {
        // Verify we have a properly typed action
        const actionType: WidgetActionType = action.type;
        
        // Create UI hints
        const uiHints: ProcessedActionUIHints = {
          variant: actionType === 'remove' ? 'destructive' : 'default',
          showConfirmation: 'confirm' in action,
          showMenu: 'menu' in action,
          loadingState: actionType === 'refresh' && (widgetState?.loading ?? false),
          iconColor: actionType === 'remove' ? 'error' : 'default',
          buttonSize: 'medium',
        };

        // Get icon with type safety
        const icon = getActionIcon(actionType);
        
        // Create base processed action
        const baseProcessedAction = { 
          ...action, 
          icon, 
          uiHints 
        };

        // Type-safe exhaustive checking
        switch (actionType) { // ✅ Use explicitly typed variable
          case 'refresh':
          case 'configure':
          case 'fullscreen':
          case 'minimize':
          case 'help':
            return baseProcessedAction as ProcessedSimpleAction;
            
          case 'remove':
            return baseProcessedAction as ProcessedConfirmAction;
            
          case 'export':
            return baseProcessedAction as ProcessedMenuAction;
            
          default:
            // Now this should work properly
            const _exhaustiveCheck: never = actionType;
            throw new Error(`Unhandled action type: ${_exhaustiveCheck}`);
        }
      });
      
    } catch (error) {
      console.error('[useActionProcessing] Processing failed:', error);
      return [];
    }
  }, [rawActions, actionContext, widgetState?.loading]);

  // Computed properties
  const hasActions = processedActions.length > 0;
  const hasLoadingActions = processedActions.some(action => action.uiHints.loadingState);
  
  const getActionByType = useCallback((type: WidgetActionType): ProcessedActionConfig | undefined => {
    return processedActions.find(action => action.type === type);
  }, [processedActions]);

  return {
    processedActions,
    actionContext,
    hasActions,
    hasLoadingActions,
    getActionByType,
  };
}