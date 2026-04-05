"use client";
import { MOCK_LOYALTY } from "@/lib/data";
import { formatCurrency } from "@/lib/utils";
import { Eyebrow } from "@/components/ui";

export function PointsView() {
  const total = MOCK_LOYALTY.reduce((s, l) => s + (l.estimatedValue ?? 0), 0);
  const totalPts = MOCK_LOYALTY.reduce((s, l) => s + l.points, 0);

  return (
    <div className="view-enter" style={{ padding: 28, display: "flex", flexDirection: "column", gap: 24 }}>
      <h2 className="font-display" style={{ fontSize: 28 }}>Points & Loyalty</h2>

      {/* Stats strip */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
        {[
          { v: totalPts.toLocaleString(), l: "Total points" },
          { v: String(MOCK_LOYALTY.length), l: "Programs tracked" },
          { v: formatCurrency(total), l: "Estimated value", c: "#5C7A5F" },
        ].map((s) => (
          <div key={s.l} className="card">
            <div className="font-display" style={{ fontSize: 32, color: s.c ?? "#1C1510" }}>{s.v}</div>
            <div style={{ fontSize: 12, color: "rgba(28,21,16,.45)", marginTop: 4 }}>{s.l}</div>
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 20 }}>
        {/* Programs */}
        <div className="card">
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18 }}>
            <Eyebrow>All Programs</Eyebrow>
            <button className="btn btn-terracotta btn-sm">+ Add Program</button>
          </div>
          <div>
            {MOCK_LOYALTY.map((lp, i) => (
              <div key={lp.id} style={{ paddingTop: i === 0 ? 0 : 18, paddingBottom: 18, borderBottom: i < MOCK_LOYALTY.length - 1 ? "1px solid rgba(28,21,16,.07)" : "none" }}>
                <div style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
                  <div style={{
                    width: 40, height: 40, borderRadius: 10, flexShrink: 0,
                    background: lp.logoColor, color: "#fff",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 12, fontWeight: 700, fontFamily: "'Jost', sans-serif",
                  }}>{lp.logo}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 4 }}>
                      <div style={{ fontSize: 14, fontWeight: 500 }}>{lp.name}</div>
                      <div style={{ textAlign: "right" }}>
                        <div className="font-display" style={{ fontSize: 22 }}>{lp.points.toLocaleString()}</div>
                        {lp.pendingPoints && <div style={{ fontSize: 11, color: "#5C7A5F" }}>+{lp.pendingPoints.toLocaleString()} pending</div>}
                      </div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: lp.tierProgress !== undefined ? 10 : 0 }}>
                      {lp.tier && <span className="badge badge-gold">{lp.tier}</span>}
                      <span style={{ fontSize: 11.5, color: "rgba(28,21,16,.45)" }}>{lp.note}</span>
                      {lp.estimatedValue && (
                        <span style={{ marginLeft: "auto", fontSize: 12, color: "rgba(28,21,16,.6)", fontWeight: 500 }}>
                          ≈ {formatCurrency(lp.estimatedValue)}
                        </span>
                      )}
                    </div>
                    {lp.tierProgress !== undefined && (
                      <div>
                        <div style={{ height: 2, background: "rgba(28,21,16,.08)", borderRadius: 1, overflow: "hidden" }}>
                          <div style={{ height: "100%", width: `${Math.min(100, lp.tierProgress)}%`, background: "#C4963A", borderRadius: 1, transition: "width .5s" }} />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tips */}
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div className="card-sm">
            <Eyebrow>Amor's Redemption Tips</Eyebrow>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                { e: "🏨", t: "Your 142,800 Marriott pts = 5 free nights at a Category 5 Kyoto property" },
                { e: "✈️", t: "Air India 84,200 pts can cover a Business Class upgrade on your Tokyo return" },
                { e: "★",  t: "12,000 more Emirates tier miles = Gold status. Book your Morocco leg on EK." },
                { e: "💳", t: "HDFC Infinia ₹28,350 value — redeem against your Tokyo hotel bill" },
              ].map((tip, i) => (
                <div key={i} style={{ display: "flex", gap: 10, padding: "10px 12px", background: "#F5F0E8", borderRadius: 9 }}>
                  <span style={{ fontSize: 18, flexShrink: 0 }}>{tip.e}</span>
                  <p style={{ fontSize: 12, color: "rgba(28,21,16,.65)", lineHeight: 1.6 }}>{tip.t}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
