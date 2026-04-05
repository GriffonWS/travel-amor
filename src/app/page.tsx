"use client";

import { useAppStore } from "@/lib/store";
import { Sidebar } from "@/components/layout/Sidebar";
import { Topbar } from "@/components/layout/Topbar";
import { DashboardView } from "@/components/features/trips/DashboardView";
import { TripsView } from "@/components/features/trips/TripsView";
import { FlightsView } from "@/components/features/flights/FlightsView";
import { DiscoverView } from "@/components/features/discover/DiscoverView";
import { AIPlannerView } from "@/components/features/planner/AIPlannerView";
import { PointsView } from "@/components/features/trips/PointsView";
import { DocsView } from "@/components/features/trips/DocsView";
import { SettingsView } from "@/components/features/trips/SettingsView";

const VIEWS: Record<string, React.ComponentType> = {
  dashboard: DashboardView,
  trips:     TripsView,
  flights:   FlightsView,
  discover:  DiscoverView,
  ai:        AIPlannerView,
  points:    PointsView,
  docs:      DocsView,
  settings:  SettingsView,
};

export default function Home() {
  const { activeView } = useAppStore();
  const ActiveView = VIEWS[activeView] ?? DashboardView;

  return (
    <div className="flex h-screen overflow-hidden bg-cream-100">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Topbar />
        <main className="flex-1 overflow-y-auto">
          <ActiveView key={activeView} />
        </main>
      </div>
    </div>
  );
}
