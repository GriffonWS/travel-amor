"use client";
import { useChat } from "ai/react";
import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import { cn } from "@/lib/utils";
import { QUICK_PROMPTS } from "@/lib/data";
import { useAppStore } from "@/lib/store";
import { MOCK_LOYALTY } from "@/lib/data";

export function AIPlannerView() {
  const { activeTrip } = useAppStore();
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef  = useRef<HTMLInputElement>(null);
  const [showPrompts, setShowPrompts] = useState(true);

  const { messages, input, handleInputChange, handleSubmit, isLoading, setInput } = useChat({
    api: "/api/chat",
    initialMessages: [{
      id: "init", role: "assistant",
      content: `Hello, I'm **Amor** — your personal travel concierge.\n\nI know you have upcoming trips to **Tokyo & Kyoto**, Morocco, and Iceland. Ask me anything — itineraries, flights, hidden gems, visa requirements, packing lists — I'm here to make every journey extraordinary.\n\nWhat would you like to plan?`,
    }],
  });

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, isLoading]);

  function firePrompt(prompt: string) {
    setInput(prompt);
    setShowPrompts(false);
    setTimeout(() => { inputRef.current?.form?.requestSubmit(); }, 60);
  }

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 288px", gap: 20, padding: 28, height: "calc(100vh - 56px)", overflow: "hidden" }}>

      {/* ── Chat panel ── */}
      <div className="card" style={{ display: "flex", flexDirection: "column", overflow: "hidden", padding: 0 }}>

        {/* Header */}
        <div style={{
          padding: "18px 24px 16px",
          borderBottom: "1px solid rgba(28,21,16,.08)",
          display: "flex", alignItems: "center", gap: 14, flexShrink: 0,
        }}>
          <div style={{ position: "relative" }}>
            <div style={{
              width: 40, height: 40, borderRadius: 10,
              background: "linear-gradient(135deg, #C4963A, #E8C87A)",
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "#fff", fontSize: 18,
            }}>
              ✦
            </div>
            <div style={{
              position: "absolute", bottom: -1, right: -1,
              width: 10, height: 10, borderRadius: "50%",
              background: "#5C7A5F", border: "2px solid #FDFAF5",
              animation: "livePulse 2.5s ease-in-out infinite",
            }} />
          </div>
          <div>
            <div style={{ fontSize: 14, fontWeight: 500 }}>Amor AI Planner</div>
            <div className="eyebrow" style={{ marginBottom: 0 }}>Powered by Claude · Always on</div>
          </div>
          <div style={{ flex: 1 }} />
          <span className="badge badge-gold">Luxury · Foodie · Cultural</span>
          <span className="badge badge-sand">MAA home base</span>
        </div>

        {/* Messages */}
        <div style={{ flex: 1, overflowY: "auto", padding: "20px 24px", display: "flex", flexDirection: "column", gap: 16 }}>
          {messages.map((msg) => (
            <div key={msg.id} style={{ display: "flex", gap: 12, justifyContent: msg.role === "user" ? "flex-end" : "flex-start" }} className="view-enter">
              {msg.role === "assistant" && (
                <div style={{
                  width: 30, height: 30, borderRadius: 8, flexShrink: 0,
                  background: "linear-gradient(135deg, #C4963A, #E8C87A)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "#fff", fontSize: 13, marginTop: 2,
                }}>✦</div>
              )}
              <div style={{
                maxWidth: "76%",
                padding: "12px 15px",
                borderRadius: msg.role === "assistant" ? "4px 14px 14px 14px" : "14px 4px 14px 14px",
                background: msg.role === "assistant" ? "#F5F0E8" : "#1C1510",
                color: msg.role === "assistant" ? "#1C1510" : "#F5F0E8",
                fontSize: 13.5, lineHeight: 1.7,
              }}>
                {msg.role === "assistant"
                  ? <div className="prose-amor"><ReactMarkdown>{msg.content}</ReactMarkdown></div>
                  : <span>{msg.content}</span>
                }
              </div>
              {msg.role === "user" && (
                <div style={{
                  width: 30, height: 30, borderRadius: 8, flexShrink: 0,
                  background: "#C4963A",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "#fff", fontSize: 12, fontFamily: "'Jost', sans-serif", fontWeight: 500, marginTop: 2,
                }}>F</div>
              )}
            </div>
          ))}

          {/* Typing indicator */}
          {isLoading && (
            <div style={{ display: "flex", gap: 12 }}>
              <div style={{ width: 30, height: 30, borderRadius: 8, background: "linear-gradient(135deg, #C4963A, #E8C87A)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 13 }}>✦</div>
              <div style={{ background: "#F5F0E8", padding: "12px 16px", borderRadius: "4px 14px 14px 14px", display: "flex", alignItems: "center", gap: 4 }}>
                {[0,1,2].map((i) => (
                  <div key={i} style={{
                    width: 5, height: 5, borderRadius: "50%", background: "rgba(28,21,16,.3)",
                    animation: `typingBounce 1.2s ease-in-out ${i * 0.18}s infinite`,
                  }} />
                ))}
              </div>
            </div>
          )}

          {/* Quick prompts */}
          {showPrompts && messages.length <= 1 && (
            <div style={{ marginTop: 4 }}>
              <div className="eyebrow" style={{ marginBottom: 10 }}>Quick start</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                {QUICK_PROMPTS.map((p) => (
                  <button key={p.label} onClick={() => firePrompt(p.prompt)}
                    style={{
                      textAlign: "left", padding: "10px 14px",
                      background: "#F5F0E8", border: "1px solid rgba(28,21,16,.08)",
                      borderRadius: 8, fontSize: 13, color: "#1C1510",
                      cursor: "pointer", fontFamily: "'Jost', sans-serif",
                      transition: "all .15s",
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(176,92,58,.35)"; e.currentTarget.style.background = "#EDE7D9"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(28,21,16,.08)"; e.currentTarget.style.background = "#F5F0E8"; }}
                  >
                    <span style={{ color: "#B05C3A", marginRight: 6 }}>→</span>{p.label}
                  </button>
                ))}
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <form
          onSubmit={(e) => { setShowPrompts(false); handleSubmit(e); }}
          style={{ padding: "14px 20px", borderTop: "1px solid rgba(28,21,16,.08)", display: "flex", gap: 10, flexShrink: 0 }}
        >
          <input
            ref={inputRef}
            value={input}
            onChange={handleInputChange}
            placeholder="Describe your dream trip, ask about any destination…"
            className="input-editorial"
            style={{ flex: 1 }}
            disabled={isLoading}
          />
          <button type="submit" disabled={isLoading || !input.trim()} className="btn btn-terracotta">
            Send ↗
          </button>
        </form>
      </div>

      {/* ── Right panel ── */}
      <div style={{ display: "flex", flexDirection: "column", gap: 14, overflowY: "auto" }}>

        {/* Travel style */}
        <div className="card-sm">
          <div className="eyebrow">Your Travel Style</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginBottom: 12 }}>
            {["Luxury", "Cultural", "Foodie", "Business"].map((t) => (
              <span key={t} className="badge badge-gold">{t}</span>
            ))}
          </div>
          <button className="btn btn-ghost btn-sm" style={{ width: "100%" }}>Retake Style Quiz</button>
        </div>

        {/* Active trips */}
        <div className="card-sm">
          <div className="eyebrow">Your Trips</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {[
              { e: "🗾", n: "Tokyo & Kyoto", d: "Apr 18–28", s: "confirmed" },
              { e: "🇲🇦", n: "Morocco",       d: "Jun 5–15",  s: "booked" },
              { e: "🇮🇸", n: "Iceland",       d: "Aug 20–",   s: "planning" },
            ].map((t) => (
              <div key={t.n} style={{
                display: "flex", alignItems: "center", gap: 10, padding: "9px 11px",
                background: "#F5F0E8", borderRadius: 9, cursor: "pointer",
                border: "1px solid transparent",
                transition: "border-color .15s",
              }}
              onMouseEnter={(e) => e.currentTarget.style.borderColor = "rgba(28,21,16,.1)"}
              onMouseLeave={(e) => e.currentTarget.style.borderColor = "transparent"}
              >
                <span style={{ fontSize: 16 }}>{t.e}</span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 12.5, fontWeight: 500, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{t.n}</div>
                  <div style={{ fontSize: 11, color: "rgba(28,21,16,.4)" }}>{t.d}</div>
                </div>
                <span className={cn("badge", t.s === "confirmed" ? "badge-sage" : t.s === "booked" ? "badge-sand" : "badge-gold")} style={{ fontSize: 10 }}>
                  {t.s}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Points */}
        <div className="card-sm">
          <div className="eyebrow">Points Snapshot</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {MOCK_LOYALTY.slice(0, 3).map((lp) => (
              <div key={lp.id} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 28, height: 28, borderRadius: 7, background: lp.logoColor, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 700, flexShrink: 0, fontFamily: "'Jost', sans-serif" }}>{lp.logo}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 12, fontWeight: 500, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{lp.name.split(" ").slice(0, 2).join(" ")}</div>
                </div>
                <div style={{ fontSize: 12.5, fontWeight: 500, flexShrink: 0 }}>{lp.points.toLocaleString()}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Amor tip */}
        <div style={{ borderRadius: 14, padding: 16, background: "#1C1510", color: "#F5F0E8" }}>
          <div className="eyebrow" style={{ color: "rgba(245,240,232,.35)", marginBottom: 8 }}>Amor Tip</div>
          <div style={{ fontSize: 13, lineHeight: 1.65, color: "rgba(245,240,232,.85)" }}>
            Tokyo's cherry blossom season peaks around your April 18 arrival. Ask me to build a hanami itinerary — the best spots are gone by 9am.
          </div>
        </div>

        {/* Voice */}
        <div className="card-sm" style={{ textAlign: "center" }}>
          <div style={{ fontSize: 28, marginBottom: 8 }}>◎</div>
          <div style={{ fontSize: 12.5, color: "rgba(28,21,16,.6)", marginBottom: 10 }}>Plan your trip by talking to Amor</div>
          <button className="btn btn-ghost btn-sm" style={{ width: "100%" }}>Start Voice Chat</button>
        </div>
      </div>
    </div>
  );
}
