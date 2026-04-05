"use client";
import { useAppStore } from "@/lib/store";
import { daysUntil, formatDate, formatCurrency } from "@/lib/utils";
import { AlertBanner, ProgressBar, StatCard, Eyebrow, TimelineDot } from "@/components/ui";
import { MOCK_WEATHER, MOCK_LOYALTY, MOCK_TRIPS } from "@/lib/data";

export function DashboardView() {
  const { activeTrip, alerts, dismissAlert, setActiveView } = useAppStore();
  const trip = activeTrip;
  const days = trip ? daysUntil(trip.startDate) : 0;

  return (
    <div className="p-7 space-y-6 view-enter">

      {/* ── Row 1: Hero + Stats + Alerts ── */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 280px", gap: 20 }}>

        {/* Next trip */}
        <div className="card col-span-2" style={{ gridColumn: "1 / 3" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 16, alignItems: "start" }}>
            <div>
              <Eyebrow>Next Journey</Eyebrow>
              <h2 className="font-display" style={{ fontSize: 32, lineHeight: 1.1, marginBottom: 8 }}>
                {trip?.emoji} {trip?.name}
              </h2>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 18, flexWrap: "wrap" }}>
                <span className="badge badge-sage">Confirmed</span>
                <span className="eyebrow" style={{ letterSpacing: ".12em", color: "rgba(28,21,16,.4)" }}>
                  {trip ? formatDate(trip.startDate, "MMM d") : ""} — {trip ? formatDate(trip.endDate, "MMM d, yyyy") : ""}
                </span>
                <span className="eyebrow" style={{ color: "rgba(28,21,16,.3)" }}>·</span>
                <span className="eyebrow" style={{ color: "rgba(28,21,16,.4)" }}>{trip?.nights} nights</span>
              </div>

              {/* Alerts inline */}
              {alerts.length > 0 && (
                <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 18 }}>
                  {alerts.slice(0, 2).map((a) => (
                    <AlertBanner key={a.id} alert={a} onDismiss={() => dismissAlert(a.id)} />
                  ))}
                </div>
              )}

              <div style={{ display: "flex", gap: 8 }}>
                <button onClick={() => setActiveView("trips")} className="btn btn-primary btn-sm">View Itinerary</button>
                <button className="btn btn-ghost btn-sm">Share Trip</button>
                <button onClick={() => setActiveView("docs")} className="btn btn-ghost btn-sm">Docs</button>
              </div>
            </div>

            {/* Countdown */}
            <div style={{ textAlign: "right", paddingTop: 4 }}>
              <div className="font-display" style={{ fontSize: 72, lineHeight: 1, color: "#1C1510", opacity: .9 }}>{days}</div>
              <div className="eyebrow" style={{ marginTop: 4 }}>days to departure</div>
              <div style={{ fontSize: 32, marginTop: 8 }}>✈</div>
            </div>
          </div>
        </div>

        {/* Right column: stats */}
        <div className="card" style={{ gridColumn: "3 / 4", gridRow: "1 / 2" }}>
          <Eyebrow>Travel Stats</Eyebrow>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            <StatCard value="47"   label="Countries" />
            <StatCard value="183"  label="Cities" />
            <StatCard value="284k" label="Miles flown" />
            <StatCard value="3.2t" label="CO₂ offset" accent="#5C7A5F" />
          </div>
        </div>
      </div>

      {/* ── Row 2: Timeline + Weather + Points ── */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 20 }}>

        {/* Today's timeline */}
        <div className="card">
          <Eyebrow>Departure Day — {formatDate(trip?.startDate ?? "", "MMM d")}</Eyebrow>
          <div style={{ position: "relative", paddingLeft: 20 }}>
            <div style={{ position: "absolute", left: 4, top: 8, bottom: 8, width: 1, background: "rgba(28,21,16,.08)" }} />
            {trip?.flights.slice(0, 2).map((fl, i) => (
              <div key={fl.id} style={{ position: "relative", paddingBottom: 20 }}>
                <TimelineDot type="flight" />
                <div className="eyebrow" style={{ marginBottom: 2 }}>{fl.departureTime} · {i === 0 ? "Terminal 3" : "IGI T3"}</div>
                <div style={{ fontSize: 13.5, fontWeight: 500 }}>{fl.originCode} → {fl.destinationCode} ({fl.flightNumber})</div>
                <div style={{ fontSize: 12, color: "rgba(28,21,16,.5)", marginTop: 1 }}>{fl.airline} · {fl.duration} · Seat {fl.seat}</div>
              </div>
            ))}
            {trip?.hotels.slice(0, 1).map((h) => (
              <div key={h.id} style={{ position: "relative" }}>
                <TimelineDot type="hotel" />
                <div className="eyebrow" style={{ marginBottom: 2 }}>21:15 JST · Check-in</div>
                <div style={{ fontSize: 13.5, fontWeight: 500 }}>{h.name}</div>
                <div style={{ fontSize: 12, color: "rgba(28,21,16,.5)", marginTop: 1 }}>{h.location} · #{h.confirmationNumber}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Weather */}
        <div className="card">
          <Eyebrow>Tokyo Forecast</Eyebrow>
          <div>
            {MOCK_WEATHER.map((w, i) => (
              <div key={w.date} style={{
                display: "flex", alignItems: "center", gap: 12,
                padding: "10px 0",
                borderBottom: i < MOCK_WEATHER.length - 1 ? "1px solid rgba(28,21,16,.06)" : "none",
              }}>
                <span style={{ fontSize: 20, width: 28, textAlign: "center" }}>{w.emoji}</span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                    <span style={{ fontSize: 13, fontWeight: 400 }}>{w.date}</span>
                    <span className="font-display" style={{ fontSize: 20 }}>{w.temp}°</span>
                  </div>
                  {w.tip && (
                    <div style={{ fontSize: 11, color: "rgba(28,21,16,.4)", marginTop: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {w.tip}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Points */}
        <div className="card">
          <Eyebrow>Points & Miles</Eyebrow>
          <div>
            {MOCK_LOYALTY.slice(0, 3).map((lp, i) => (
              <div key={lp.id} style={{
                display: "flex", alignItems: "center", gap: 12,
                padding: "10px 0",
                borderBottom: i < 2 ? "1px solid rgba(28,21,16,.06)" : "none",
              }}>
                <div style={{
                  width: 32, height: 32, borderRadius: 8,
                  background: lp.logoColor, color: "#fff",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 11, fontWeight: 700, flexShrink: 0,
                  fontFamily: "'Jost', sans-serif",
                }}>
                  {lp.logo}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 500, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {lp.name.split(" ").slice(0, 2).join(" ")}
                  </div>
                  <div style={{ fontSize: 11, color: "rgba(28,21,16,.4)" }}>{lp.note}</div>
                </div>
                <div style={{ textAlign: "right", flexShrink: 0 }}>
                  <div style={{ fontSize: 14, fontWeight: 500 }}>{lp.points.toLocaleString()}</div>
                  {lp.pendingPoints && (
                    <div style={{ fontSize: 10, color: "#5C7A5F" }}>+{lp.pendingPoints.toLocaleString()}</div>
                  )}
                </div>
              </div>
            ))}
          </div>
          <button onClick={() => setActiveView("points")} className="btn btn-ghost btn-sm" style={{ width: "100%", marginTop: 12 }}>
            View All Programs
          </button>
        </div>
      </div>

      {/* ── Row 3: Planning progress ── */}
      <div className="card">
        <Eyebrow>Planning Progress</Eyebrow>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 24 }}>
          {MOCK_TRIPS.map((t) => (
            <div key={t.id}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 6 }}>
                <span style={{ fontSize: 13, fontWeight: 500 }}>{t.emoji} {t.name}</span>
                <span style={{ fontSize: 12, color: "rgba(28,21,16,.4)" }}>{t.planningProgress}%</span>
              </div>
              <ProgressBar value={t.planningProgress} />
              <div style={{ fontSize: 11, color: "rgba(28,21,16,.4)", marginTop: 5 }}>
                {t.activitiesCount} activities · {formatDate(t.startDate, "MMM d")} departure
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
