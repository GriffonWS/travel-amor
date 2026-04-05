"use client";
import { useState } from "react";
import { useAppStore } from "@/lib/store";
import { Eyebrow } from "@/components/ui";
import { cn } from "@/lib/utils";

const DESTINATIONS = [
  { name: "Santorini",  country: "Greece",    best: "Jun–Sep", g: "#1a3a5c, #2980B9" },
  { name: "Marrakech",  country: "Morocco",   best: "Oct–Apr", g: "#8B4513, #D4895A" },
  { name: "Maldives",   country: "Maldives",  best: "Nov–Apr", g: "#006994, #1ABC9C" },
  { name: "Bali",       country: "Indonesia", best: "Apr–Oct", g: "#2d6a4f, #52b788" },
  { name: "Amalfi",     country: "Italy",     best: "May–Sep", g: "#4a1942, #c77dff" },
  { name: "Phuket",     country: "Thailand",  best: "Nov–Apr", g: "#7f4f24, #e9c46a" },
];

const ACTIVITIES = [
  { e: "🏯", n: "Kyoto Bamboo Groves & Tea Ceremony", t: "Cultural", d: "4 hours", p: "¥8,500", r: 4.9, tag: "Instant book", tagV: "sage" },
  { e: "🍣", n: "Tsukiji Outer Market Food Walk",     t: "Food",     d: "3 hours", p: "¥5,000", r: 4.8, tag: "Local expert", tagV: "sand" },
  { e: "🗻", n: "Mt. Fuji Day Trip from Tokyo",       t: "Nature",   d: "Full day",p: "¥12,000",r: 4.9, tag: "Best seller",  tagV: "terracotta" },
  { e: "🎨", n: "TeamLab Planets Digital Art",        t: "Culture",  d: "2 hours", p: "¥3,200", r: 4.9, tag: "Must-do",      tagV: "gold" },
];

export function DiscoverView() {
  const { setActiveView } = useAppStore();
  const [added, setAdded] = useState<Set<string>>(new Set());

  return (
    <div className="view-enter" style={{ padding: 28, display: "flex", flexDirection: "column", gap: 24 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <h2 className="font-display" style={{ fontSize: 28 }}>Discover</h2>
        <div style={{ display: "flex", gap: 8 }}>
          <button className="btn btn-ghost btn-sm">Travel Style Quiz</button>
          <button onClick={() => setActiveView("ai")} className="btn btn-terracotta btn-sm">✦ Inspire Me</button>
        </div>
      </div>

      {/* Destination strip */}
      <div>
        <Eyebrow>Trending Destinations</Eyebrow>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 12 }}>
          {DESTINATIONS.map((d) => (
            <div key={d.name} style={{
              height: 150, borderRadius: 14, overflow: "hidden", position: "relative", cursor: "pointer",
              transition: "transform .2s",
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-3px)"}
            onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}
            >
              <div style={{ position: "absolute", inset: 0, background: `linear-gradient(150deg, ${d.g})` }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(28,21,16,.7) 0%, transparent 55%)" }} />
              <div style={{ position: "absolute", bottom: 12, left: 12 }}>
                <div className="font-display" style={{ color: "rgba(255,255,255,.95)", fontSize: 15, lineHeight: 1.2 }}>{d.name}</div>
                <div style={{ color: "rgba(255,255,255,.6)", fontSize: 10.5, marginTop: 2, fontFamily: "'Jost', sans-serif" }}>{d.country} · {d.best}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 290px", gap: 20 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

          {/* AI activities */}
          <div className="card">
            <Eyebrow>Recommended for Your Tokyo Trip</Eyebrow>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {ACTIVITIES.map((act) => (
                <div key={act.n} style={{
                  display: "flex", gap: 14, padding: "12px 14px",
                  background: "#F5F0E8", borderRadius: 10, cursor: "pointer",
                  border: "1px solid transparent", transition: "border-color .15s",
                }}
                onMouseEnter={(e) => e.currentTarget.style.borderColor = "rgba(28,21,16,.09)"}
                onMouseLeave={(e) => e.currentTarget.style.borderColor = "transparent"}
                >
                  <div style={{ fontSize: 28, lineHeight: 1, paddingTop: 2, flexShrink: 0 }}>{act.e}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 13.5, fontWeight: 500 }}>{act.n}</div>
                    <div style={{ fontSize: 11.5, color: "rgba(28,21,16,.45)", margin: "3px 0 7px" }}>
                      {act.t} · {act.d} · {act.p}/person
                    </div>
                    <div style={{ display: "flex", gap: 6 }}>
                      <span className="badge badge-gold">★ {act.r}</span>
                      <span className={`badge badge-${act.tagV}`}>{act.tag}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => setAdded((p) => { const n = new Set(p); n.has(act.n) ? n.delete(act.n) : n.add(act.n); return n; })}
                    className={`btn btn-sm ${added.has(act.n) ? "btn-terracotta" : "btn-ghost"}`}
                    style={{ alignSelf: "center", flexShrink: 0 }}
                  >
                    {added.has(act.n) ? "✓ Added" : "Add"}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Inspiration import */}
          <div className="card">
            <Eyebrow>Inspiration Import</Eyebrow>
            <p style={{ fontSize: 13, color: "rgba(28,21,16,.55)", marginBottom: 16, lineHeight: 1.6 }}>
              Share content from anywhere — Instagram, TikTok, YouTube, Google Maps, articles — and Amor extracts the places automatically.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
              {[
                { i: "◈", l: "Instagram" }, { i: "▶", l: "YouTube" },
                { i: "◎", l: "Google Maps" }, { i: "♫", l: "TikTok" },
                { i: "↗", l: "Article URL" }, { i: "▣", l: "Upload PDF" },
              ].map((item) => (
                <button key={item.l} className="btn btn-ghost btn-sm" style={{ justifyContent: "flex-start", gap: 6 }}>
                  <span style={{ color: "#B05C3A" }}>{item.i}</span> {item.l}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right panel */}
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div className="card-sm">
            <Eyebrow>Events in Tokyo · Apr 18–28</Eyebrow>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {[
                { n: "Hanami — Cherry Blossom",  d: "Apr 18–25 · Parks · Free" },
                { n: "TeamLab Planets",           d: "Daily · Toyosu · ¥3,200" },
                { n: "Sumo Spring Tournament",    d: "Apr 21 · Ryogoku · ¥5,000+" },
                { n: "Shibuya Sky Night View",    d: "Daily · ¥2,000" },
              ].map((ev) => (
                <div key={ev.n} style={{ padding: "9px 11px", background: "#F5F0E8", borderRadius: 8 }}>
                  <div style={{ fontSize: 12.5, fontWeight: 500 }}>{ev.n}</div>
                  <div style={{ fontSize: 11, color: "rgba(28,21,16,.45)", marginTop: 2 }}>{ev.d}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="card-sm">
            <Eyebrow>My Collections</Eyebrow>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {[
                { e: "🍜", n: "Tokyo Ramen Spots", c: 12 },
                { e: "🏯", n: "Kyoto Temples",     c: 8 },
                { e: "🛍️", n: "Shopping in Japan", c: 5 },
              ].map((col) => (
                <div key={col.n} style={{
                  display: "flex", alignItems: "center", gap: 10, padding: "9px 11px",
                  background: "#F5F0E8", borderRadius: 8, cursor: "pointer",
                }}>
                  <span style={{ fontSize: 18 }}>{col.e}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 12.5, fontWeight: 500 }}>{col.n}</div>
                    <div style={{ fontSize: 11, color: "rgba(28,21,16,.4)" }}>{col.c} places</div>
                  </div>
                  <span style={{ color: "rgba(28,21,16,.2)", fontSize: 14 }}>›</span>
                </div>
              ))}
              <button className="btn btn-ghost btn-sm" style={{ width: "100%" }}>+ New Collection</button>
            </div>
          </div>

          <div style={{ borderRadius: 14, padding: 16, background: "#1C1510" }}>
            <div className="eyebrow" style={{ color: "rgba(245,240,232,.3)", marginBottom: 8 }}>Magic Camera</div>
            <div style={{ fontSize: 13, color: "rgba(245,240,232,.75)", lineHeight: 1.6, marginBottom: 12 }}>
              Point your camera at a menu, sign, or landmark and Amor explains everything.
            </div>
            <button className="btn btn-sm" style={{ background: "rgba(245,240,232,.1)", color: "#F5F0E8", border: "1px solid rgba(245,240,232,.15)", width: "100%" }}>
              ◎ Open Camera
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
