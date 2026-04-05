"use client";
import { useState } from "react";
import { useAppStore } from "@/lib/store";
import { formatDate, formatCurrency, cn } from "@/lib/utils";
import { Eyebrow, ProgressBar, TimelineDot, RequirementCard, Avatar, StatusBadge } from "@/components/ui";
import type { Trip } from "@/types";

export function TripsView() {
  const { trips, activeTrip, setActiveTrip, setActiveView } = useAppStore();

  return (
    <div className="view-enter" style={{ padding: 28, display: "flex", flexDirection: "column", gap: 24 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <h2 className="font-display" style={{ fontSize: 28 }}>My Trips</h2>
        <button onClick={() => setActiveView("ai")} className="btn btn-terracotta">+ New Trip</button>
      </div>

      {/* Trip cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
        {trips.map((t) => (
          <TripCard key={t.id} trip={t} isActive={activeTrip?.id === t.id} onClick={() => setActiveTrip(t)} />
        ))}
      </div>

      {/* Detail */}
      {activeTrip && <TripDetail trip={activeTrip} />}
    </div>
  );
}

function TripCard({ trip, isActive, onClick }: { trip: Trip; isActive: boolean; onClick: () => void }) {
  return (
    <div onClick={onClick} style={{
      background: "#FDFAF5", borderRadius: 18, overflow: "hidden",
      border: isActive ? "1.5px solid #C4963A" : "1px solid rgba(28,21,16,.08)",
      cursor: "pointer", transition: "all .2s",
      boxShadow: isActive ? "0 4px 20px rgba(196,150,58,.15)" : "0 1px 4px rgba(28,21,16,.06)",
    }}
    onMouseEnter={(e) => { if (!isActive) e.currentTarget.style.transform = "translateY(-2px)"; }}
    onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; }}
    >
      {/* Hero */}
      <div style={{ height: 130, position: "relative" }}>
        <div style={{ position: "absolute", inset: 0, background: `linear-gradient(135deg, ${trip.coverGradient.replace("from-[","").replace("]","").split(" via-[").join(", ").replace("] to-[","").replace("]","")})` }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(28,21,16,.6) 0%, transparent 60%)" }} />
        <div style={{ position: "absolute", top: 12, left: 12, fontSize: 11, color: "rgba(255,255,255,.7)", fontFamily: "'Jost', sans-serif", letterSpacing: ".05em" }}>
          {formatDate(trip.startDate, "MMM d")} — {formatDate(trip.endDate, "MMM d")}
        </div>
        <div style={{ position: "absolute", bottom: 12, left: 12 }}>
          <StatusBadge status={trip.status} />
        </div>
      </div>
      {/* Body */}
      <div style={{ padding: 16 }}>
        <div className="font-display" style={{ fontSize: 17, marginBottom: 4 }}>{trip.emoji} {trip.name}</div>
        <div style={{ display: "flex", gap: 10, fontSize: 11.5, color: "rgba(28,21,16,.45)", marginBottom: 12 }}>
          <span>✈ {trip.flights[0]?.airline ?? "TBD"}</span>
          <span>· {trip.nights} nights</span>
        </div>
        <ProgressBar value={trip.planningProgress} />
        <div style={{ fontSize: 11, color: "rgba(28,21,16,.4)", marginTop: 6 }}>
          {trip.planningProgress}% planned · {trip.activitiesCount} activities
        </div>
      </div>
    </div>
  );
}

function TripDetail({ trip }: { trip: Trip }) {
  return (
    <div className="card">
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 22 }}>
        <div>
          <h3 className="font-display" style={{ fontSize: 22, marginBottom: 4 }}>{trip.emoji} {trip.name} — Full Itinerary</h3>
          <div style={{ fontSize: 12.5, color: "rgba(28,21,16,.45)" }}>
            {formatDate(trip.startDate)} – {formatDate(trip.endDate)} · Auto-imported from confirmation emails
          </div>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button className="btn btn-ghost btn-sm">Export PDF</button>
          <button className="btn btn-ghost btn-sm">Sync Calendar</button>
          <button className="btn btn-ghost btn-sm">Share</button>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}>
        {/* Timeline */}
        <div>
          <Eyebrow>Day 1 — {formatDate(trip.startDate, "MMM d, EEEE")} · Travel Day</Eyebrow>
          <div style={{ position: "relative", paddingLeft: 20 }}>
            <div style={{ position: "absolute", left: 4, top: 8, bottom: 8, width: 1, background: "rgba(28,21,16,.08)" }} />
            {trip.flights.slice(0, 2).map((fl) => (
              <div key={fl.id} style={{ position: "relative", paddingBottom: 18 }}>
                <TimelineDot type="flight" />
                <div className="eyebrow" style={{ marginBottom: 2 }}>{fl.departureTime} · {fl.originCode}</div>
                <div style={{ fontSize: 13.5, fontWeight: 500 }}>{fl.flightNumber} — {fl.originCode} → {fl.destinationCode}</div>
                <div style={{ fontSize: 12, color: "rgba(28,21,16,.5)", marginTop: 1 }}>{fl.airline} · {fl.class} · {fl.duration} · Seat {fl.seat}</div>
                {fl.pnr && <div style={{ fontSize: 11, color: "rgba(28,21,16,.35)", marginTop: 1 }}>PNR: {fl.pnr}</div>}
              </div>
            ))}
            {trip.hotels.slice(0, 1).map((h) => (
              <div key={h.id} style={{ position: "relative", paddingBottom: 18 }}>
                <TimelineDot type="hotel" />
                <div className="eyebrow" style={{ marginBottom: 2 }}>21:15 JST · Check-in</div>
                <div style={{ fontSize: 13.5, fontWeight: 500 }}>{h.name}</div>
                <div style={{ fontSize: 12, color: "rgba(28,21,16,.5)", marginTop: 1 }}>{h.location} · #{h.confirmationNumber}</div>
              </div>
            ))}
            <div style={{ height: 10 }} />
            <Eyebrow>Day 2 — Explore Tokyo</Eyebrow>
            {trip.activities.slice(0, 3).map((act) => (
              <div key={act.id} style={{ position: "relative", paddingBottom: 16 }}>
                <TimelineDot type={act.type === "food" ? "food" : "activity"} />
                <div className="eyebrow" style={{ marginBottom: 2 }}>{act.time} · {act.location.split(",")[0]}</div>
                <div style={{ fontSize: 13.5, fontWeight: 500 }}>{act.name}</div>
                <div style={{ fontSize: 12, color: "rgba(28,21,16,.5)", marginTop: 1 }}>
                  {act.duration}{act.price ? ` · ${formatCurrency(act.price, act.currency)}` : " · Free"}
                </div>
                {act.confirmationNumber && (
                  <div style={{ fontSize: 11, color: "#5C7A5F", marginTop: 1 }}>✓ Booked #{act.confirmationNumber}</div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Right: summary + requirements + companions */}
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {/* Summary */}
          <div className="card-ghost">
            <Eyebrow>Trip Summary</Eyebrow>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              {[
                { l: "Flights",    v: `${trip.flights.length} segments` },
                { l: "Hotels",     v: `${trip.hotels.length} properties` },
                { l: "Activities", v: `${trip.activitiesCount} booked` },
                { l: "Est. Budget",v: trip.budget ? formatCurrency(trip.budget.total) : "TBD" },
              ].map((s) => (
                <div key={s.l}>
                  <div style={{ fontSize: 11, color: "rgba(28,21,16,.4)" }}>{s.l}</div>
                  <div style={{ fontSize: 13.5, fontWeight: 500, marginTop: 2 }}>{s.v}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Requirements */}
          <div className="card-ghost">
            <Eyebrow>Travel Requirements</Eyebrow>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {trip.requirements.map((req) => (
                <RequirementCard key={req.type} req={req} />
              ))}
            </div>
          </div>

          {/* Inner circle */}
          {trip.companions.length > 0 && (
            <div className="card-ghost">
              <Eyebrow>Inner Circle</Eyebrow>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                {trip.companions.map((c) => <Avatar key={c.id} initials={c.initials} color={c.avatarColor} size="sm" />)}
                <button className="btn btn-ghost btn-sm">+ Invite</button>
              </div>
              <div style={{ fontSize: 11.5, color: "rgba(28,21,16,.45)" }}>
                {trip.companions.map((c) => c.name).join(" & ")} are tracking this trip
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
