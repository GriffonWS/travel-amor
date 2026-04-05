"use client";
import { useState } from "react";
import { useAppStore } from "@/lib/store";

export function Topbar() {
  const { setActiveView, alerts } = useAppStore();
  const [q, setQ] = useState("");

  return (
    <header
      className="h-14 flex items-center gap-5 px-6 flex-shrink-0"
      style={{
        background: "#FDFAF5",
        borderBottom: "1px solid rgba(28,21,16,.08)",
      }}
    >
      {/* Wordmark */}
      <h1
        className="font-display select-none flex-shrink-0"
        style={{ fontSize: 22, color: "#1C1510", fontStyle: "italic", letterSpacing: "-.01em" }}
      >
        Travel Amor
      </h1>

      {/* Thin divider */}
      <div className="rule-v h-5 opacity-30 flex-shrink-0" />

      {/* Search */}
      <div
        className="flex items-center gap-2 flex-1 max-w-xs"
        style={{
          background: "#F5F0E8",
          border: "1px solid rgba(28,21,16,.08)",
          borderRadius: 7,
          padding: "6px 12px",
        }}
      >
        <span style={{ color: "rgba(28,21,16,.25)", fontSize: 12 }}>↗</span>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search trips, places, flights…"
          className="bg-transparent text-sm outline-none w-full"
          style={{ fontFamily: "'Jost', sans-serif", color: "#1C1510" }}
        />
      </div>

      <div className="flex-1" />

      {/* Plan CTA */}
      <button
        onClick={() => setActiveView("ai")}
        className="btn btn-terracotta btn-sm"
        style={{ letterSpacing: ".06em" }}
      >
        ✦ Plan a Trip
      </button>

      {/* Notifications */}
      <div
        className="relative cursor-pointer"
        onClick={() => setActiveView("flights")}
        style={{ color: "rgba(28,21,16,.4)", fontSize: 16 }}
        title="Alerts"
      >
        ◎
        {alerts.length > 0 && (
          <div
            className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full"
            style={{ background: "#B05C3A", border: "1.5px solid #FDFAF5" }}
          />
        )}
      </div>

      {/* Avatar */}
      <div
        className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium flex-shrink-0 cursor-pointer select-none"
        style={{ background: "#C4963A", color: "#FDFAF5", fontFamily: "'Jost', sans-serif", letterSpacing: ".05em" }}
      >
        F
      </div>
    </header>
  );
}
