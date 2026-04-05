import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { differenceInDays, parseISO, format } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function daysUntil(dateStr: string): number {
  return Math.max(0, differenceInDays(parseISO(dateStr), new Date()));
}

export function formatDate(dateStr: string, fmt = "MMM d, yyyy"): string {
  try {
    return format(parseISO(dateStr), fmt);
  } catch {
    return dateStr;
  }
}

export function formatCurrency(amount: number, currency = "INR"): string {
  if (currency === "INR") return `₹${amount.toLocaleString("en-IN")}`;
  if (currency === "JPY") return `¥${amount.toLocaleString()}`;
  if (currency === "USD") return `$${amount.toLocaleString()}`;
  return `${amount.toLocaleString()} ${currency}`;
}

export function getStatusColor(status: string): string {
  const map: Record<string, string> = {
    confirmed: "text-emerald-700 bg-emerald-50 border-emerald-200",
    planning: "text-amber-700 bg-amber-50 border-amber-200",
    booked: "text-sky-700 bg-sky-50 border-sky-200",
    completed: "text-gray-600 bg-gray-100 border-gray-200",
    "on-time": "text-emerald-700 bg-emerald-50",
    delayed: "text-amber-700 bg-amber-50",
    cancelled: "text-red-700 bg-red-50",
  };
  return map[status] ?? "text-gray-600 bg-gray-100";
}

export function getSeverityStyle(severity: string) {
  const map: Record<string, { bg: string; border: string; text: string; icon: string }> = {
    info:    { bg: "bg-sky-50",    border: "border-sky-400",    text: "text-sky-800",    icon: "ℹ️" },
    warning: { bg: "bg-amber-50",  border: "border-amber-400",  text: "text-amber-900",  icon: "⚠️" },
    success: { bg: "bg-emerald-50",border: "border-emerald-400",text: "text-emerald-800",icon: "✅" },
    danger:  { bg: "bg-red-50",    border: "border-red-400",    text: "text-red-800",    icon: "🔴" },
  };
  return map[severity] ?? map.info;
}

export function getAlertStyle(type: string) {
  return getSeverityStyle(type === "warning" ? "warning" : type === "success" ? "success" : type === "danger" ? "danger" : "info");
}

export function generateId(): string {
  return Math.random().toString(36).slice(2, 9);
}
