/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React, { useState, useCallback, useMemo } from "react";
import { Close, Refresh} from "@mui/icons-material";

// =================== CLEAN IMPORTS ===================
// All dashboard functionality from single barrel export
import type {
  DashboardWidgetProps,
  ProcessedActionConfig,
  ActionExecutionContext,
} from '@/lib/dashboard';

import {
  // Foundation hooks for core functionality
  useWidgetRegistration,
  useWidgetActions,

  // Convenience hook for complete widget interface
  useWidgetConfig,

  // Advanced hook for action processing
  useActionProcessing,
} from '@/lib/dashboard';


export function DashboardWidget({
  id,
  title,
  type,
  gridArea,
  mobileOrder = 0,
  actions = [],
  refreshInterval,
  autoRegister = true,
  children,
  className = '',
  style = {},
  onRefresh,
  onConfigure,
  onRemove,
  onExport,
  onFullscreen,
  onActionExecute,
  onStoreSync,
  permissions = [],
  actionConfig = {},
}: DashboardWidgetProps) {

  // =================== ALL HOOKS FIRST (PROFESSIONAL PATTERN) ===================
  // Professional: ALL hooks must be called before any early returns
  
  // Step 1: Handle widget registration
  const { widget, isRegistered, needsRegistration } = useWidgetRegistration(id, {
    title,
    type,
    gridArea,
    mobileOrder,
    actions,
    autoRegister,
  });

  // Step 2: Get complete widget interface using convenience hook
  const {
    loading: isLoading,
    error: hasError,
    visible: isVisible,
    title: displayTitle,
    type: displayType,
    refreshSafely,
    clearError,
  } = useWidgetConfig(id);

  // Step 3: Get widget actions for advanced operations
  const storeActions = useWidgetActions();

  // Step 4: Process actions using advanced processing hook
  const {
    processedActions,
    actionContext,
    hasActions,
    hasLoadingActions,
  } = useActionProcessing(
    actions,
    id,
    {
      loading: isLoading,
      error: hasError,
      visible: isVisible,
      type: displayType,
    },
    permissions
  );

  // =================== LOCAL UI STATE ===================
  const [isHovered, setIsHovered] = useState(false);
  const [showActions, setShowActions] = useState(false);

  // =================== ALL MEMOIZED VALUES (BEFORE EARLY RETURNS) ===================
  // Professional: Move useMemo calls BEFORE any early returns
  
  const containerClasses = useMemo(() => [
    'dashboard-widget',
    'store-connected',
    'action-enabled',
    `widget-type-${displayType}`,
    isHovered ? 'hovered' : '',
    isLoading ? 'loading' : '',
    hasError ? 'has-error' : '',
    hasActions ? 'has-actions' : '',
    className,
  ].filter(Boolean).join(' '), [displayType, isHovered, isLoading, hasError, hasActions, className]);

  const containerStyles = useMemo(() => ({
    gridArea,
    '--mobile-order': mobileOrder,
    '--action-count': processedActions.length,
    ...style,
  } as React.CSSProperties), [gridArea, mobileOrder, processedActions.length, style]);

  // =================== ALL CALLBACKS ===================
  // Professional: All useCallback calls before early returns
  
  const executeAction = useCallback(async (
    actionConfig: ProcessedActionConfig
  ) => {
    if (!isRegistered) {
      console.warn(`[DashboardWidget] Cannot execute ${actionConfig.type}: widget ${id} not registered`);
      return;
    }

    const executionContext: ActionExecutionContext = {
      ...actionContext,
      actionType: actionConfig.type as any,
    };

    try {
      switch (actionConfig.type) {
        case 'refresh':
          if (onRefresh) {
            await onRefresh();
          } else {
            await refreshSafely();
          }
          break;

        case 'configure':
          if (onConfigure) {
            await onConfigure();
          } else {
            console.log(`[DashboardWidget] Configure widget: ${id}`);
          }
          break;

        case 'remove':
          if ('confirm' in actionConfig && actionConfig.confirm) {
            const confirmed = await showConfirmationDialog(actionConfig.confirm);
            if (!confirmed) return;
          }

          if (onRemove) {
            await onRemove();
          } else {
            storeActions.removeWidget(id);
          }
          break;

        case 'export':
          if ('menu' in actionConfig && actionConfig.menu) {
            const firstFormat = actionConfig.menu.items[0]?.value || 'pdf';
            if (onExport) {
              await onExport(firstFormat);
            } else {
              console.log(`[DashboardWidget] Export widget ${id} as ${firstFormat}`);
            }
          }
          break;

        case 'fullscreen':
          if (onFullscreen) {
            await onFullscreen();
          } else {
            console.log(`[DashboardWidget] Fullscreen widget: ${id}`);
          }
          break;

        default:
          if (onActionExecute) {
            await onActionExecute(actionConfig.type, executionContext, actionConfig);
          } else {
            console.log(`[DashboardWidget] Unknown action: ${actionConfig.type}`);
          }
      }

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : `${actionConfig.type} failed`;
      console.error(`[DashboardWidget] Action ${actionConfig.type} failed for widget ${id}:`, error);
    }
  }, [
    id,
    isRegistered,
    actionContext,
    storeActions,
    onRefresh,
    onConfigure,
    onRemove,
    onExport,
    onFullscreen,
    onActionExecute,
    refreshSafely,
  ]);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
    setShowActions(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    if (!isLoading && !hasLoadingActions) {
      setShowActions(false);
    }
  }, [isLoading, hasLoadingActions]);

  const showConfirmationDialog = useCallback(async (confirmConfig: any): Promise<boolean> => {
    return window.confirm(`${confirmConfig.title}\n\n${confirmConfig.message}`);
  }, []);

  const renderActionButton = useCallback((actionConfig: ProcessedActionConfig) => {
    const IconComponent = actionConfig.icon;

    return (
      <button
        key={actionConfig.type}
        className={`widget-action ${actionConfig.type}-action ${actionConfig.disabled ? 'disabled' : ''}`}
        onClick={() => executeAction(actionConfig)}
        disabled={actionConfig.disabled}
        title={actionConfig.tooltip}
        aria-label={`${actionConfig.label} for ${displayTitle}`}
        data-action={actionConfig.type}
        data-variant={actionConfig.uiHints?.variant}
      >
        {IconComponent ? (
          React.createElement(IconComponent, {
            className: `action-icon ${actionConfig.uiHints?.loadingState ? 'loading' : ''}`,
            fontSize: 'small',
          } as any) // Safe type assertion for dynamic props
        ) : null}
      </button>
    );
  }, [executeAction, displayTitle]);

  // =================== NOW SAFE FOR EARLY RETURNS ===================
  // Professional: All hooks called - now safe to have early returns
  
  // Widget not visible
  if (!isVisible) return null;

  // Widget needs registration
  if (needsRegistration) {
    return (
      <div
        className="dashboard-widget registering"
        style={containerStyles} // ✅ Can safely use containerStyles here
      >
        <div className="widget-registering">
          <Refresh className="registration-spinner" />
          <p>Initializing widget...</p>
        </div>
      </div>
    );
  }

  // =================== MAIN RENDER ===================
  // Professional: Main render path
  
  return (
    <div
      className={containerClasses}
      style={containerStyles}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      data-widget-id={id}
      data-widget-type={displayType}
      data-store-connected="true"
      data-action-system="enabled"
    >
      {/* Header with processed actions */}
      <header className="widget-header">
        <div className="widget-title-section">
          <h3 className="widget-title">{displayTitle}</h3>
          <span className="widget-type-badge">{displayType}</span>
          {isLoading && (
            <span className="loading-indicator" title="Widget is updating">
              <Refresh className="loading-spinner" fontSize="small" />
            </span>
          )}
        </div>

        {hasActions && (
          <div className={`widget-actions ${showActions ? 'visible' : 'hidden'}`}>
            {processedActions.map(renderActionButton)}
          </div>
        )}
      </header>

      {/* Content with error handling */}
      <main className="widget-content">
        {hasError ? (
          <div className="widget-error">
            <Close className="error-icon" color="error" />
            <p className="error-message">{hasError}</p>
            <button
              className="error-retry"
              onClick={() => clearError()}
              aria-label="Clear error"
            >
              Clear Error
            </button>
          </div>
        ) : (
          <div className="widget-content-wrapper">
            {children}
          </div>
        )}
      </main>
    </div>
  );
}

export type { DashboardWidgetProps };
export default DashboardWidget;