'use client';

import { useShallow } from "zustand/shallow";
import { useDashboardStore } from "../store";
import { DashboardStore } from "../store-types";


export function useWidget(id: string) {
  return useDashboardStore(
    useShallow((state: DashboardStore) => state.widgets[id]),
  );
}