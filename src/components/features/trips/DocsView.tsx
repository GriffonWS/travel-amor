"use client";
import { MOCK_DOCUMENTS } from "@/lib/data";
import { Eyebrow } from "@/components/ui";
import { formatDate } from "@/lib/utils";
import type { TravelDocument } from "@/types";

const ICONS: Record<string, string> = { passport:"🛂", visa:"🗂️", insurance:"🏥", ticket:"✈️", hotel:"🏨", other:"📄" };
const STATUS_BADGE: Record<string, { bg: string; color: string; label: string }> = {
  valid:          { bg: "rgba(92,122,95,.12)", color: "#2d4e30", label: "Valid" },
  pending:        { bg: "rgba(196,150,58,.12)", color: "#6b4c10", label: "Pending" },
  expired:        { bg: "rgba(176,92,58,.12)", color: "#7a3820", label: "Expired" },
  "not-required": { bg: "rgba(28,21,16,.06)", color: "rgba(28,21,16,.5)", label: "Not Required" },
};

function DocRow({ doc }: { doc: TravelDocument }) {
  const st = STATUS_BADGE[doc.status] ?? STATUS_BADGE["not-required"];
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 12, padding: "12px 14px",
      background: "#F5F0E8", borderRadius: 10, border: "1px solid transparent", transition: "border-color .15s", cursor: "pointer",
    }}
    onMouseEnter={(e) => e.currentTarget.style.borderColor = "rgba(28,21,16,.08)"}
    onMouseLeave={(e) => e.currentTarget.style.borderColor = "transparent"}
    >
      <span style={{ fontSize: 22, flexShrink: 0 }}>{ICONS[doc.type]}</span>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 13.5, fontWeight: 500 }}>{doc.name}</div>
        <div style={{ fontSize: 11.5, color: "rgba(28,21,16,.45)", marginTop: 2 }}>{doc.description}</div>
        {doc.expiryDate && <div style={{ fontSize: 11, color: "rgba(28,21,16,.35)", marginTop: 1 }}>Expires: {formatDate(doc.expiryDate)}</div>}
      </div>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 6 }}>
        <span style={{ padding: "3px 9px", borderRadius: 20, fontSize: 11, fontWeight: 500, background: st.bg, color: st.color }}>{st.label}</span>
        <button className="btn btn-ghost btn-sm">View</button>
      </div>
    </div>
  );
}

export function DocsView() {
  return (
    <div className="view-enter" style={{ padding: 28, display: "flex", flexDirection: "column", gap: 22 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <h2 className="font-display" style={{ fontSize: 28 }}>Travel Documents</h2>
        <button className="btn btn-terracotta btn-sm">+ Upload Document</button>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        <div className="card">
          <Eyebrow>Identity & Travel</Eyebrow>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {MOCK_DOCUMENTS.filter((d) => !d.tripId).map((d) => <DocRow key={d.id} doc={d} />)}
          </div>
        </div>
        <div className="card">
          <Eyebrow>Tokyo Trip — Confirmations</Eyebrow>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {MOCK_DOCUMENTS.filter((d) => d.tripId).map((d) => <DocRow key={d.id} doc={d} />)}
          </div>
        </div>
      </div>
      <div className="card">
        <Eyebrow>Document Checklist · Japan</Eyebrow>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10 }}>
          {[
            { e: "✓", l: "Passport (6+ months valid)", ok: true },
            { e: "⚠", l: "Japan Tourist Visa", ok: false },
            { e: "✓", l: "Travel Insurance", ok: true },
            { e: "✓", l: "Flight E-tickets", ok: true },
            { e: "✓", l: "Hotel Confirmations", ok: true },
            { e: "◯", l: "IC Card (Suica)", ok: false },
            { e: "✓", l: "Emergency contacts", ok: true },
            { e: "◯", l: "Int'l Driving Permit", ok: false },
          ].map((item) => (
            <div key={item.l} style={{
              display: "flex", alignItems: "flex-start", gap: 8, padding: "10px 12px", borderRadius: 9,
              background: item.ok ? "rgba(92,122,95,.08)" : "rgba(196,150,58,.08)",
              border: `1px solid ${item.ok ? "rgba(92,122,95,.15)" : "rgba(196,150,58,.15)"}`,
            }}>
              <span style={{ fontSize: 14, color: item.ok ? "#5C7A5F" : "#C4963A", flexShrink: 0, marginTop: 1 }}>{item.e}</span>
              <span style={{ fontSize: 12, color: item.ok ? "#2d4e30" : "#6b4c10", lineHeight: 1.4 }}>{item.l}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
