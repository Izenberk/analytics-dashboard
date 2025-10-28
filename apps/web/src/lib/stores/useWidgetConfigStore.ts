'use client';

import { create } from "zustand";
import { persist } from "zustand/middleware";

export type WidgetConfig = {
    title?: string;
    refreshInterval?: number | null;
    visible?: boolean;
};

type WidgetConfigState = {
    configs: Record<string, WidgetConfig>;
    getConfig: (id: string) => WidgetConfig | undefined;
    setConfig: (id: string, cfg: WidgetConfig) => void;
    removeConfig: (id: string) => void;
    setConfigs: (next: Record<string, WidgetConfig>) => void;
};

export const useWidgetConfigStore = create<WidgetConfigState>()(
  persist(
    (set, get) => ({
      configs: {},
      getConfig: (id: string) => get().configs[id],
      setConfig: (id: string, cfg: WidgetConfig) =>
        set((state) => ({ configs: { ...state.configs, [id]: { ...(state.configs[id] || {}), ...cfg } } })),
      removeConfig: (id: string) =>
        set((state) => {
          const next = { ...state.configs };
          delete next[id];
          return { configs: next };
        }),
      setConfigs: (next) => set(() => ({ configs: next })),
    }),
    {
      name: 'widget-configs-v1',
      // Use localStorage (default). For SSR safety, this hook is client-only.
    }
  )
);

export default useWidgetConfigStore;