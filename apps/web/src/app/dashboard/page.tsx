'use client';

import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { DashboardGrid, WidgetArea, useResponsiveGrid } from "@/components/dashboard/DashboardGrid";
import { MetricCard } from '@/components/ui/MetricCard'
import { ChartCard } from '@/components/ui/ChartCard'
import { mockMetrics, mockCharts } from "@/lib/mock-data";

export default function DashboardPage() {
  const { isMobile, isTablet, isDesktop } = useResponsiveGrid();

  return (
    <DashboardLayout>
      <DashboardHeader />

      <DashboardGrid>
        {/* Metrics Row - Professional responsive approach */}
        <WidgetArea
          gridArea="metric1"
          mobileOrder={1}
        >
          <MetricCard {...mockMetrics[0]} />
        </WidgetArea>

        <WidgetArea
          gridArea="metric2"
          mobileOrder={2}
        >
          <MetricCard {...mockMetrics[1]} />
        </WidgetArea>

        <WidgetArea
          gridArea="metric3"
          mobileOrder={3}
        >
          <MetricCard {...mockMetrics[2]} />
        </WidgetArea>

        <WidgetArea
          gridArea="metric4"
          mobileOrder={4}
        >
          <MetricCard {...mockMetrics[3]} />
        </WidgetArea>

        {/* Charts Row - Professional layout control */}
        <WidgetArea
          gridArea="chart1"
          mobileOrder={5}
        >
          <ChartCard {...mockCharts[0]} />
        </WidgetArea>

        <WidgetArea
          gridArea="chart2"
          mobileOrder={6}
        >
          <ChartCard {...mockCharts[1]} />
        </WidgetArea>
      </DashboardGrid>
    </DashboardLayout>
  );
}