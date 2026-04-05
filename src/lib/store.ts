import { create } from "zustand";
import type { Trip, Alert, ChatMessage } from "@/types";
import { MOCK_TRIPS, MOCK_ALERTS } from "@/lib/data";
import { generateId } from "@/lib/utils";

interface AppState {
  // Navigation
  activeView: string;
  setActiveView: (view: string) => void;

  // Trips
  trips: Trip[];
  activeTrip: Trip | null;
  setActiveTrip: (trip: Trip | null) => void;

  // Alerts
  alerts: Alert[];
  dismissAlert: (id: string) => void;

  // Chat
  messages: ChatMessage[];
  addMessage: (msg: Omit<ChatMessage, "id" | "timestamp">) => void;
  clearMessages: () => void;

  // UI
  sidebarCollapsed: boolean;
  toggleSidebar: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  activeView: "dashboard",
  setActiveView: (view) => set({ activeView: view }),

  trips: MOCK_TRIPS,
  activeTrip: MOCK_TRIPS[0],
  setActiveTrip: (trip) => set({ activeTrip: trip }),

  alerts: MOCK_ALERTS,
  dismissAlert: (id) =>
    set((s) => ({ alerts: s.alerts.filter((a) => a.id !== id) })),

  messages: [
    {
      id: "init",
      role: "assistant",
      content:
        "Hello! I'm Amor, your personal travel concierge ✈️\n\nTell me about your dream trip — destination, travel dates, budget, and style — and I'll craft a complete itinerary with flights, hotels, activities, and even visa & packing tips for your Indian passport.\n\nWhat's your next adventure?",
      timestamp: new Date(),
      suggestions: [
        { label: "Plan a Japan trip", prompt: "Plan a 7-day luxury trip to Japan in April for an Indian traveler from Chennai" },
        { label: "Alternatives if flight cancelled", prompt: "If my NH820 flight gets cancelled, what are my best alternatives?" },
        { label: "Hidden gems in Kyoto", prompt: "What are the hidden gems in Kyoto for a luxury traveler?" },
        { label: "Best restaurants in Tokyo", prompt: "Best luxury restaurants in Shinjuku, Tokyo?" },
      ],
    },
  ],
  addMessage: (msg) =>
    set((s) => ({
      messages: [
        ...s.messages,
        { ...msg, id: generateId(), timestamp: new Date() },
      ],
    })),
  clearMessages: () =>
    set({
      messages: [
        {
          id: "init",
          role: "assistant",
          content: "Chat cleared. What would you like to plan next?",
          timestamp: new Date(),
        },
      ],
    }),

  sidebarCollapsed: false,
  toggleSidebar: () =>
    set((s) => ({ sidebarCollapsed: !s.sidebarCollapsed })),
}));
