// ===================== TRIPS =====================
export interface Trip {
  id: string;
  name: string;
  destination: string;
  country: string;
  countryCode: string;
  emoji: string;
  startDate: string;
  endDate: string;
  nights: number;
  status: "confirmed" | "planning" | "booked" | "completed";
  planningProgress: number;
  activitiesCount: number;
  coverGradient: string;
  flights: Flight[];
  hotels: Hotel[];
  activities: Activity[];
  documents: TravelDocument[];
  requirements: TravelRequirement[];
  companions: Companion[];
  budget?: Budget;
}

// ===================== FLIGHTS =====================
export interface Flight {
  id: string;
  flightNumber: string;
  airline: string;
  airlineCode: string;
  origin: string;
  originCode: string;
  destination: string;
  destinationCode: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  date: string;
  class: "economy" | "business" | "first";
  seat: string;
  terminal?: string;
  gate?: string;
  status: "on-time" | "delayed" | "cancelled" | "boarding" | "departed";
  pnr?: string;
  baggageClaim?: string;
  fareAmount?: number;
  fareCurrency?: string;
  fareDropAmount?: number;
  isFareEligibleForRefund?: boolean;
}

// ===================== HOTELS =====================
export interface Hotel {
  id: string;
  name: string;
  location: string;
  checkIn: string;
  checkOut: string;
  nights: number;
  roomType: string;
  confirmationNumber: string;
  loyaltyProgram?: string;
  loyaltyPoints?: number;
  rating?: number;
  amenities?: string[];
}

// ===================== ACTIVITIES =====================
export interface Activity {
  id: string;
  name: string;
  type: "culture" | "food" | "nature" | "adventure" | "shopping" | "transport";
  emoji: string;
  date: string;
  time: string;
  duration: string;
  location: string;
  price?: number;
  currency?: string;
  confirmationNumber?: string;
  rating?: number;
  isBookable?: boolean;
  isBooked?: boolean;
  source?: "ai" | "manual" | "imported";
}

// ===================== DOCUMENTS =====================
export interface TravelDocument {
  id: string;
  type: "passport" | "visa" | "insurance" | "ticket" | "hotel" | "other";
  name: string;
  description: string;
  status: "valid" | "pending" | "expired" | "not-required";
  expiryDate?: string;
  fileUrl?: string;
  tripId?: string;
}

// ===================== REQUIREMENTS =====================
export interface TravelRequirement {
  type: "visa" | "vaccination" | "currency" | "plug" | "safety" | "health";
  emoji: string;
  title: string;
  description: string;
  severity: "info" | "warning" | "success" | "danger";
}

// ===================== LOYALTY =====================
export interface LoyaltyProgram {
  id: string;
  name: string;
  type: "airline" | "hotel" | "credit-card" | "other";
  logo: string;
  logoColor: string;
  points: number;
  pendingPoints?: number;
  tier?: string;
  tierProgress?: number;
  tierTarget?: number;
  estimatedValue?: number;
  currency?: string;
  expiryDate?: string;
  note?: string;
}

// ===================== WEATHER =====================
export interface WeatherDay {
  date: string;
  emoji: string;
  temp: number;
  description: string;
  tip?: string;
}

// ===================== AI PLANNER =====================
export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  itinerary?: GeneratedItinerary;
  suggestions?: QuickSuggestion[];
}

export interface GeneratedItinerary {
  destination: string;
  days: ItineraryDay[];
  totalBudget?: number;
  currency?: string;
  notes?: string;
}

export interface ItineraryDay {
  day: number;
  date: string;
  title: string;
  activities: Activity[];
}

export interface QuickSuggestion {
  label: string;
  prompt: string;
}

// ===================== MISC =====================
export interface Companion {
  id: string;
  name: string;
  initials: string;
  avatarColor?: string;
}

export interface Budget {
  total: number;
  spent: number;
  currency: string;
  breakdown: { category: string; amount: number }[];
}

export interface Alert {
  id: string;
  type: "warning" | "danger" | "success" | "info";
  title: string;
  message: string;
  actionLabel?: string;
  actionHref?: string;
  timestamp: Date;
}
