"use client";
import { Eyebrow } from "@/components/ui";

export function SettingsView() {
  return (
    <div className="view-enter" style={{ padding: 28, display: "flex", flexDirection: "column", gap: 24 }}>
      <h2 className="font-display" style={{ fontSize: 28 }}>Settings</h2>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        <div className="card">
          <Eyebrow>Profile</Eyebrow>
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20 }}>
            <div style={{ width: 48, height: 48, borderRadius: "50%", background: "#C4963A", color: "#FDFAF5", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, fontFamily: "'Jost', sans-serif", fontWeight: 500 }}>F</div>
            <div>
              <div style={{ fontSize: 15, fontWeight: 500 }}>Fiaz</div>
              <div style={{ fontSize: 12, color: "rgba(28,21,16,.5)" }}>Chennai, India · Indian Passport</div>
            </div>
          </div>
          <div>
            {[
              { l: "Home airport", v: "MAA — Chennai International" },
              { l: "Preferred class", v: "Business" },
              { l: "Currency", v: "INR (₹)" },
              { l: "Travel style", v: "Luxury · Cultural · Foodie" },
              { l: "Notifications", v: "Push + Email" },
            ].map((row, i, arr) => (
              <div key={row.l} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "11px 0", borderBottom: i < arr.length - 1 ? "1px solid rgba(28,21,16,.06)" : "none" }}>
                <span style={{ fontSize: 13, color: "rgba(28,21,16,.5)" }}>{row.l}</span>
                <span style={{ fontSize: 13, fontWeight: 500 }}>{row.v}</span>
              </div>
            ))}
          </div>
          <button className="btn btn-ghost btn-sm" style={{ width: "100%", marginTop: 14 }}>Edit Profile</button>
        </div>
        <div className="card">
          <Eyebrow>Connected Services</Eyebrow>
          <div>
            {[
              { n: "Gmail Inbox Sync",  d: "Auto-import booking confirmations", on: true },
              { n: "Google Calendar",   d: "Sync trips to your calendar",       on: true },
              { n: "Apple Wallet",      d: "Boarding passes & tickets",         on: false },
              { n: "Concur TripLink",   d: "Business travel sync",              on: false },
              { n: "WhatsApp",          d: "Share trip updates with contacts",  on: false },
            ].map((svc, i, arr) => (
              <div key={svc.n} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "11px 0", borderBottom: i < arr.length - 1 ? "1px solid rgba(28,21,16,.06)" : "none" }}>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 500 }}>{svc.n}</div>
                  <div style={{ fontSize: 11.5, color: "rgba(28,21,16,.4)", marginTop: 1 }}>{svc.d}</div>
                </div>
                {svc.on
                  ? <span className="badge badge-sage">Connected</span>
                  : <button className="btn btn-ghost btn-sm">Connect</button>
                }
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
