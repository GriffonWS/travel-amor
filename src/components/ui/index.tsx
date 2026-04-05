import { cn } from "@/lib/utils";
import type { TravelRequirement, Alert } from "@/types";

/* ── Badge ──────────────────────────────────────────────── */
export function Badge({ variant = "muted", children, className }: {
  variant?: "terracotta"|"sage"|"gold"|"sand"|"muted"; children: React.ReactNode; className?: string;
}) {
  return <span className={cn("badge", `badge-${variant}`, className)}>{children}</span>;
}

export function StatusBadge({ status }: { status: string }) {
  const map: Record<string, { v: "sage"|"gold"|"sand"|"muted"; l: string }> = {
    confirmed: { v: "sage",       l: "Confirmed" },
    planning:  { v: "gold",       l: "Planning" },
    booked:    { v: "sand",       l: "Booked" },
    completed: { v: "muted",      l: "Completed" },
    "on-time": { v: "sage",       l: "On Time" },
    delayed:   { v: "gold",       l: "Delayed" },
    cancelled: { v: "muted", l: "Cancelled" },
  };
  const { v, l } = map[status] ?? { v: "muted", l: status };
  return <Badge variant={v}>{l}</Badge>;
}

/* ── Section Eyebrow ────────────────────────────────────── */
export function Eyebrow({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("eyebrow mb-3", className)}>{children}</div>;
}

/* ── Thin rule ──────────────────────────────────────────── */
export function Rule({ className }: { className?: string }) {
  return <div className={cn("rule", className)} />;
}

/* ── Alert banner ───────────────────────────────────────── */
const ALERT_STYLES: Record<string, { left: string; bg: string; label: string }> = {
  danger:  { left: "#B05C3A", bg: "rgba(176,92,58,.07)",  label: "Alert" },
  warning: { left: "#C4963A", bg: "rgba(196,150,58,.08)", label: "Notice" },
  success: { left: "#5C7A5F", bg: "rgba(92,122,95,.08)",  label: "Good news" },
  info:    { left: "#8B7355", bg: "rgba(139,115,85,.07)", label: "Info" },
};
export function AlertBanner({ alert, onDismiss }: { alert: Alert; onDismiss?: () => void }) {
  const s = ALERT_STYLES[alert.type] ?? ALERT_STYLES.info;
  return (
    <div
      className="flex gap-3 rounded-lg px-3.5 py-3 text-sm relative"
      style={{ background: s.bg, borderLeft: `2px solid ${s.left}` }}
    >
      <div className="flex-1 min-w-0">
        <div className="font-medium text-xs mb-0.5" style={{ color: s.left }}>{alert.title}</div>
        <div className="text-xs leading-relaxed" style={{ color: "rgba(28,21,16,.6)" }}>{alert.message}</div>
      </div>
      {onDismiss && (
        <button onClick={onDismiss} className="text-xs flex-shrink-0 self-start mt-0.5 opacity-30 hover:opacity-60 transition-opacity">
          ✕
        </button>
      )}
    </div>
  );
}

/* ── Travel requirement ─────────────────────────────────── */
const REQ_STYLES: Record<string, { left: string; bg: string }> = {
  warning: { left: "#C4963A", bg: "rgba(196,150,58,.07)" },
  success: { left: "#5C7A5F", bg: "rgba(92,122,95,.07)" },
  info:    { left: "#8B7355", bg: "rgba(139,115,85,.07)" },
  danger:  { left: "#B05C3A", bg: "rgba(176,92,58,.07)" },
};
export function RequirementCard({ req }: { req: TravelRequirement }) {
  const s = REQ_STYLES[req.severity] ?? REQ_STYLES.info;
  return (
    <div className="flex gap-2.5 rounded-lg px-3 py-2.5" style={{ background: s.bg, borderLeft: `2px solid ${s.left}` }}>
      <span className="text-sm flex-shrink-0 mt-0.5">{req.emoji}</span>
      <div>
        <div className="text-xs font-medium" style={{ color: "#1C1510" }}>{req.title}</div>
        <div className="text-xs mt-0.5 leading-relaxed" style={{ color: "rgba(28,21,16,.55)" }}>{req.description}</div>
      </div>
    </div>
  );
}

/* ── Progress bar ───────────────────────────────────────── */
export function ProgressBar({ value, className }: { value: number; className?: string }) {
  return (
    <div className={cn("prog-track", className)}>
      <div className="prog-fill" style={{ width: `${Math.min(100, value)}%` }} />
    </div>
  );
}

/* ── Avatar ─────────────────────────────────────────────── */
export function Avatar({ initials, color = "#C4963A", size = "md" }: {
  initials: string; color?: string; size?: "sm"|"md"|"lg";
}) {
  const sz = { sm: { wh: 28, fs: 11 }, md: { wh: 34, fs: 13 }, lg: { wh: 44, fs: 16 } }[size];
  return (
    <div
      className="rounded-full flex items-center justify-center flex-shrink-0 font-medium"
      style={{ width: sz.wh, height: sz.wh, background: color, color: "#FDFAF5", fontSize: sz.fs, fontFamily: "'Jost', sans-serif" }}
    >
      {initials}
    </div>
  );
}

/* ── Stat card ──────────────────────────────────────────── */
export function StatCard({ value, label, accent }: { value: string; label: string; accent?: string }) {
  return (
    <div className="card-ghost">
      <div className="font-display text-2xl" style={{ color: accent ?? "#1C1510" }}>{value}</div>
      <div className="text-xs mt-1" style={{ color: "rgba(28,21,16,.45)" }}>{label}</div>
    </div>
  );
}

/* ── Timeline dot ───────────────────────────────────────── */
const DOT_COLORS: Record<string, string> = {
  flight: "#8B7355", hotel: "#C4963A", activity: "#5C7A5F", food: "#B05C3A", car: "#7A6B5A",
};
export function TimelineDot({ type }: { type: string }) {
  return <div className="tl-dot" style={{ color: DOT_COLORS[type] ?? "#8B7355" }} />;
}
