'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { WidgetConfig, DEFAULT_WIDGET_CONFIG } from '@/types/widget';

type WidgetConfigState = {
    configs: Record<string, Partial<WidgetConfig>>;

    getConfig: (widgetId: string) => WidgetConfig;
    setConfig: (widgetId: string, config: Partial<WidgetConfig>) => void;
    resetConfig: (widgetId: string) => void;
    resetAllConfigs: () => void;
};

export const useWidgetConfigStore = create<WidgetConfigState>()(
    persist(
        (set, get) => ({
            configs: {},

            getConfig: (widgetId: string) => {
                const userConfig = get().configs[widgetId] || {};
                return {
                    id: widgetId,
                    ...DEFAULT_WIDGET_CONFIG,
                    ...userConfig,
                };
            },

            setConfig: (widgetId: string, config: Partial<WidgetConfig>) => {
                set((state) => ({
                configs: {
                    ...state.configs,
                    [widgetId]: {
                    ...state.configs[widgetId],
                    ...config,
                    },
                },
                }));
            },

            resetConfig: (widgetId: string) => {
                set((state) => {
                const { [widgetId]: removed, ...rest } = state.configs;
                return { configs: rest };
                });
            },

            resetAllConfigs: () => set({ configs: {} }),
        }),
        {
            name: 'widget-config',
        }
    )
)