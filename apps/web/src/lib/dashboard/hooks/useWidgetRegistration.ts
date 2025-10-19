'use client';

import { useEffect } from 'react';
import { useWidget } from './useWidget';
import { useWidgetActions } from './useWidgetActions';
import type { DashboardWidgetProps, WidgetConfig } from '../types';

export function useWidgetRegistration(
  id: string,
  registrationProps: Pick<DashboardWidgetProps, 'title' | 'type' | 'gridArea' | 'mobileOrder' | 'actions' | 'autoRegister'>
) {
  const widget = useWidget(id);
  const actions = useWidgetActions();

  // Auto-registration effect with dependency management
  useEffect(() => {
    // Skip registration if auto-register is disabled or widget already exists
    if (registrationProps.autoRegister === false || widget) {
      return;
    }

    // Validate actions are available
    if (!actions || typeof actions.addWidget !== 'function') {
      console.error(`[Widget Registration] Actions not available for widget: ${id}`);
      return;
    }

    // Create widget configuration from props
    const widgetConfig: Omit<WidgetConfig, 'id' | 'lastUpdated'> = {
      title: registrationProps.title || `Widget ${id}`,
      type: registrationProps.type || 'custom',
      visible: true,
      loading: false,
      error: null,
      position: {
        gridArea: registrationProps.gridArea,
        mobileOrder: registrationProps.mobileOrder || 0,
      },
      size: 'medium',
      actions: registrationProps.actions || ['refresh'],
      data: null,
    };

    try {
      // Register widget with store
      const registeredId = actions.addWidget({
        id, // Preserve intended ID
        ...widgetConfig
      });
      
      // Only log in development or on error
      if (process.env.NODE_ENV === 'development') {
        console.log(`[Widget Registration] Successfully registered widget: ${registeredId}`);
      }
    } catch (error) {
      // Always log errors for debugging
      console.error(`[Widget Registration] Failed to register widget ${id}:`, error);
    }

  }, [
    id,
    widget,
    actions,
    registrationProps.title,
    registrationProps.type,
    registrationProps.gridArea,
    registrationProps.mobileOrder,
    registrationProps.actions,
    registrationProps.autoRegister
  ]);

  // Return registration status and widget data
  return {
    widget,
    isRegistered: !!widget,
    
    // Additional registration helpers
    needsRegistration: registrationProps.autoRegister !== false && !widget,
    registrationComplete: !!widget,
  };
}

export function useWidgetRegistrationStatus(id: string) {
  const widget = useWidget(id);
  
  return {
    isRegistered: !!widget,
    exists: !!widget,
  };
}