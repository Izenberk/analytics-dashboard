export type WidgetConfig = {
    id: string;
    title?: string;
    refreshInterval?: number;
    visible?: boolean;
};

export const DEFAULT_WIDGET_CONFIG: Omit<WidgetConfig, 'id'>= {
    refreshInterval: 30,
    visible: true,
};

export type WidgetMetadata = {
    id: string;
    type: 'metric' | 'chart' | 'table';
    defaultTitle: string;
}