"use client";
import { useAppStore } from "@/lib/store";
import { formatCurrency } from "@/lib/utils";
import { Eyebrow, AlertBanner } from "@/components/ui";
import type { Flight } from "@/types";

const STATUS_STYLE: Record<string, { dot: string; label: string }> = {
  "on-time": { dot: "#5C7A5F", label: "On Time" },
  delayed:   { dot: "#C4963A", label: "Delayed" },
  cancelled: { dot: "#B05C3A", label: "Cancelled" },
};

export function FlightsView() {
  const { activeTrip, alerts, dismissAlert } = useAppStore();
  const flights = activeTrip?.flights ?? [];

  return (
    <div className="view-enter" style={{ padding: 28, display: "flex", flexDirection: "column", gap: 22 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <h2 className="font-display" style={{ fontSize: 28 }}>Flights & Alerts</h2>
        <div style={{ display: "flex", gap: 8 }}>
          <button className="btn btn-ghost btn-sm">Forward Booking Email</button>
          <button className="btn btn-terracotta btn-sm">+ Add Flight</button>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 290px", gap: 20 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>

          {/* Live alerts */}
          {alerts.length > 0 && (
            <div className="card">
              <Eyebrow>Live Alerts</Eyebrow>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {alerts.map((a) => <AlertBanner key={a.id} alert={a} onDismiss={() => dismissAlert(a.id)} />)}
              </div>
            </div>
          )}

          {/* Upcoming flights */}
          <div className="card">
            <Eyebrow>Upcoming Flights</Eyebrow>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {flights.map((fl) => <FlightRow key={fl.id} flight={fl} />)}
            </div>
          </div>

          {/* Alternates */}
          <div className="card">
            <Eyebrow>Alternate Flights — if plans change</Eyebrow>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                { fn: "JL 741", al: "JAL", from: "DEL", to: "NRT", dep: "13:20", arr: "23:45", dur: "9h 10m", seats: "5 seats", price: 38200 },
                { fn: "EK 502", al: "Emirates via DXB", from: "DEL", to: "NRT", dep: "03:05", arr: "21:10", dur: "11h 05m", seats: "12 seats", price: 44900 },
              ].map((alt) => (
                <div key={alt.fn} style={{
                  display: "flex", alignItems: "center", gap: 16, padding: "14px 16px",
                  borderRadius: 10, border: "1px solid rgba(196,150,58,.25)", background: "rgba(196,150,58,.03)",
                }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
                      <span className="font-display" style={{ fontSize: 18 }}>{alt.from} → {alt.to}</span>
                      <span style={{ fontSize: 12, color: "rgba(28,21,16,.45)" }}>{alt.fn} · {alt.al}</span>
                    </div>
                    <div style={{ fontSize: 12, color: "rgba(28,21,16,.5)", marginTop: 2 }}>
                      {alt.dep} — {alt.arr} · {alt.dur} · {alt.seats} available
                    </div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: 16, fontWeight: 500, color: "#5C7A5F" }}>{formatCurrency(alt.price)}</div>
                    <button className="btn btn-terracotta btn-sm" style={{ marginTop: 6 }}>Book</button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Airport map */}
          <div className="card">
            <Eyebrow>Airport Guide — IGI Terminal 3</Eyebrow>
            <div style={{
              height: 160, borderRadius: 10, position: "relative", overflow: "hidden",
              background: "linear-gradient(135deg, #d4e8d4 0%, #b8d4e8 50%, #d4daea 100%)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <div style={{ textAlign: "center", color: "rgba(28,21,16,.5)" }}>
                <div style={{ fontSize: 36, marginBottom: 6 }}>◎</div>
                <div style={{ fontSize: 13, fontWeight: 500 }}>Interactive Airport Map</div>
                <div style={{ fontSize: 11.5, marginTop: 3 }}>Gate B7 · Security ~12 min · Lounge: 8 min walk</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right sidebar */}
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {/* Fare tracker */}
          {flights[1]?.fareDropAmount && (
            <div className="card-sm">
              <Eyebrow>Fare Tracker</Eyebrow>
              <div style={{ marginBottom: 12 }}>
                <div style={{ fontSize: 12.5, fontWeight: 500, marginBottom: 4 }}>DEL → NRT · Apr 18</div>
                <div className="font-display" style={{ fontSize: 26 }}>{formatCurrency(flights[1].fareAmount ?? 0)}</div>
                <div style={{ fontSize: 12, color: "#5C7A5F", marginTop: 3 }}>
                  ▼ {formatCurrency(flights[1].fareDropAmount)} drop since you booked
                </div>
                {flights[1].isFareEligibleForRefund && (
                  <div style={{ fontSize: 11, color: "#2d4e30", background: "rgba(92,122,95,.1)", borderRadius: 6, padding: "4px 10px", marginTop: 8, display: "inline-block" }}>
                    ✓ Eligible for partial refund
                  </div>
                )}
              </div>
              <button className="btn btn-ghost btn-sm" style={{ width: "100%" }}>Request Refund</button>
            </div>
          )}

          {/* Seat tracker */}
          <div className="card-sm">
            <Eyebrow>Seat Tracker · NH 820</Eyebrow>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 6, marginBottom: 10 }}>
              {[
                { s: "22A", t: "yours" }, { s: "22C", t: "taken" },
                { s: "14A", t: "open" },  { s: "14C", t: "taken" },
              ].map((seat) => (
                <div key={seat.s} style={{
                  borderRadius: 6, padding: "7px 0", textAlign: "center", fontSize: 11, fontWeight: 500,
                  background: seat.t === "yours" ? "#5C7A5F" : seat.t === "open" ? "rgba(139,115,85,.12)" : "rgba(28,21,16,.05)",
                  color: seat.t === "yours" ? "#fff" : seat.t === "open" ? "#5C4220" : "rgba(28,21,16,.35)",
                }}>
                  {seat.s}{seat.t === "yours" ? " ★" : ""}
                </div>
              ))}
            </div>
            <div style={{ fontSize: 10.5, color: "rgba(28,21,16,.4)", marginBottom: 8 }}>★ Your seat · Available seats highlighted</div>
            <button className="btn btn-ghost btn-sm" style={{ width: "100%" }}>Move to 14A</button>
          </div>

          {/* Security wait times */}
          <div className="card-sm">
            <Eyebrow>Security Wait Times</Eyebrow>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                { lane: "IGI T3 — Gate A", time: "8 min",  color: "#5C7A5F" },
                { lane: "IGI T3 — Gate B", time: "22 min", color: "#C4963A" },
                { lane: "Priority Lane",   time: "4 min",  color: "#5C7A5F" },
              ].map((s) => (
                <div key={s.lane} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 13 }}>
                  <span style={{ color: "rgba(28,21,16,.65)" }}>{s.lane}</span>
                  <span style={{ fontWeight: 500, color: s.color }}>{s.time}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Baggage */}
          <div className="card-sm">
            <Eyebrow>Baggage Allowance</Eyebrow>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {[
                { l: "Checked bags", v: "2 × 32 kg" },
                { l: "Cabin bags",   v: "2 × 10 kg" },
                { l: "Claim belt",   v: "TBA on landing" },
              ].map((r) => (
                <div key={r.l} style={{ display: "flex", justifyContent: "space-between", fontSize: 12.5 }}>
                  <span style={{ color: "rgba(28,21,16,.5)" }}>{r.l}</span>
                  <span style={{ fontWeight: 500 }}>{r.v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FlightRow({ flight }: { flight: Flight }) {
  const s = STATUS_STYLE[flight.status] ?? STATUS_STYLE["on-time"];
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 16, padding: "14px 16px",
      borderRadius: 10, border: "1px solid rgba(28,21,16,.07)",
      background: "#FDFAF5", transition: "border-color .15s",
    }}
    onMouseEnter={(e) => e.currentTarget.style.borderColor = "rgba(28,21,16,.14)"}
    onMouseLeave={(e) => e.currentTarget.style.borderColor = "rgba(28,21,16,.07)"}
    >
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: 3 }}>
          <span className="font-display" style={{ fontSize: 18 }}>{flight.originCode} → {flight.destinationCode}</span>
          <span style={{ fontSize: 11.5, color: "rgba(28,21,16,.4)" }}>{flight.airline} · {flight.flightNumber}</span>
        </div>
        <div style={{ fontSize: 12, color: "rgba(28,21,16,.5)" }}>
          {flight.departureTime} — {flight.arrivalTime} · {flight.duration} · {flight.class} · Seat {flight.seat}
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 6 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 11.5, color: s.dot, fontWeight: 500 }}>
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: s.dot }} />
          {s.label}
        </div>
        <div style={{ display: "flex", gap: 6 }}>
          <button className="btn btn-ghost btn-sm">Track</button>
          <button className="btn btn-ghost btn-sm">Details</button>
        </div>
      </div>
    </div>
  );
}
