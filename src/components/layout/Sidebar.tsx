"use client";
import { useAppStore } from "@/lib/store";
import { cn } from "@/lib/utils";

const NAV = [
  { id: "dashboard", icon: "⌂",  label: "Dashboard" },
  { id: "trips",     icon: "◈",  label: "Trips" },
  { id: "flights",   icon: "↗",  label: "Flights", badge: true },
  { id: "discover",  icon: "✦",  label: "Discover" },
  { id: "ai",        icon: "◎",  label: "Amor AI" },
  { id: "points",    icon: "◇",  label: "Points" },
  { id: "docs",      icon: "▣",  label: "Docs" },
];

export function Sidebar() {
  const { activeView, setActiveView, alerts } = useAppStore();

  return (
    <aside
      style={{ background: "#1C1510", width: 64 }}
      className="flex flex-col items-center py-6 gap-0 flex-shrink-0 z-50 relative"
    >
      {/* Logo mark */}
      <div
        className="font-display text-xl mb-8 select-none"
        style={{ color: "#C4963A", fontStyle: "italic", lineHeight: 1 }}
      >
        TA
      </div>

      {/* Thin vertical rule */}
      <div className="rule-v absolute right-0 top-0 bottom-0 opacity-20" />

      {/* Nav */}
      <nav className="flex flex-col gap-1 items-center w-full px-2">
        {NAV.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveView(item.id)}
            title={item.label}
            className={cn(
              "relative w-full h-10 flex flex-col items-center justify-center rounded-lg transition-all duration-150 group",
              activeView === item.id
                ? "bg-white/8"
                : "hover:bg-white/5"
            )}
            style={{ color: activeView === item.id ? "#C4963A" : "rgba(245,240,232,.3)" }}
          >
            {/* Icon */}
            <span className="text-base leading-none" style={{ fontFamily: "sans-serif" }}>
              {item.icon}
            </span>

            {/* Active left bar */}
            {activeView === item.id && (
              <div
                className="absolute left-0 top-2 bottom-2 w-0.5 rounded-r-full"
                style={{ background: "#C4963A" }}
              />
            )}

            {/* Alert dot */}
            {item.badge && alerts.length > 0 && (
              <div
                className="absolute top-1.5 right-2 w-1.5 h-1.5 rounded-full"
                style={{ background: "#B05C3A" }}
              />
            )}

            {/* Tooltip */}
            <span
              className="absolute left-16 px-2.5 py-1 rounded-md text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50"
              style={{
                background: "#1C1510",
                color: "#F5F0E8",
                border: "1px solid rgba(245,240,232,.1)",
                fontFamily: "'Jost', sans-serif",
                letterSpacing: ".05em",
                fontSize: 11,
              }}
            >
              {item.label}
            </span>
          </button>
        ))}
      </nav>

      <div className="flex-1" />

      {/* Settings */}
      <button
        onClick={() => setActiveView("settings")}
        title="Settings"
        className={cn(
          "w-10 h-10 flex items-center justify-center rounded-lg transition-all group relative",
          activeView === "settings" ? "bg-white/8" : "hover:bg-white/5"
        )}
        style={{ color: "rgba(245,240,232,.25)" }}
      >
        <span className="text-sm">⚙</span>
        <span
          className="absolute left-14 px-2.5 py-1 rounded-md text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50"
          style={{ background: "#1C1510", color: "#F5F0E8", border: "1px solid rgba(245,240,232,.1)", fontFamily: "'Jost', sans-serif", fontSize: 11 }}
        >
          Settings
        </span>
      </button>
    </aside>
  );
}
