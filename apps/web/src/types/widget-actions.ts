/**
 * Clean interfaces with optional props for backwards compatibility
 */

export interface WidgetActionCallbacks {
  onRefresh?: () => void | Promise<void>;

  onConfigure?: () => void | Promise<void>;

  onExport?: () => void | Promise<void>;

  onFullscreen?: () => void | Promise<void>;

  onRemove?: () => void | Promise<void>;
}

export interface WidgetActionProps extends WidgetActionCallbacks {
  widgetId?: string;

  widgetTitle?: string;

  showOnHover?: boolean;

  size?: 'small' | 'medium';
}