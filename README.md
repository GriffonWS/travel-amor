# ✈️ Travel Amor

Your all-in-one AI-powered travel companion — combining the best of TripIt Pro and Mindtrip into a single, beautifully designed app.

## Features

- **Amor AI Planner** — Chat with Claude for itineraries, flight suggestions, visa tips, restaurant picks
- **Smart Itinerary Management** — Auto-import bookings, day-by-day timeline, multi-trip dashboard
- **Flight Alerts** — Real-time status, fare drops, seat upgrades, alternate flights, airport maps
- **Discover** — AI recommendations, inspiration import from Instagram/TikTok/YouTube, events
- **Points Tracker** — All loyalty programs in one view with redemption tips
- **Document Vault** — Passport, visas, insurance, e-tickets, booking confirmations
- **Travel Requirements** — Visa, vaccinations, currency, plug types for 260+ countries
- **Inner Circle** — Share trips with family and travel companions

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **AI**: Anthropic Claude via Vercel AI SDK (streaming chat)
- **State**: Zustand
- **Fonts**: Playfair Display + DM Sans
- **Icons**: Emoji-native (no icon library dependency)

---

## 🚀 Getting Started

### 1. Prerequisites

Make sure you have installed:
- [Node.js 18+](https://nodejs.org/)
- npm or yarn or pnpm

### 2. Clone or download the project

```bash
# If you have git
git clone <your-repo-url>
cd travel-amor

# Or just unzip the downloaded folder and cd into it
cd travel-amor
```

### 3. Install dependencies

```bash
npm install
```

### 4. Set up your API key

Copy the example env file:
```bash
cp .env.example .env.local
```

Open `.env.local` and add your Anthropic API key:
```
ANTHROPIC_API_KEY=sk-ant-api03-xxxxxxxxxxxxxxxxxxxx
```

Get your key at: **https://console.anthropic.com**

### 5. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. The app is live! ✈️

---

## 📁 Project Structure

```
src/
├── app/
│   ├── api/
│   │   └── chat/route.ts        ← Amor AI streaming endpoint
│   ├── page.tsx                  ← Main view router
│   ├── layout.tsx                ← Root layout + fonts
│   └── globals.css               ← Global styles
├── components/
│   ├── layout/
│   │   ├── Sidebar.tsx           ← Navigation sidebar
│   │   └── Topbar.tsx            ← Top bar with search
│   ├── ui/
│   │   └── index.tsx             ← Reusable UI components
│   └── features/
│       ├── planner/
│       │   └── AIPlannerView.tsx ← ⭐ Flagship AI chat feature
│       ├── trips/
│       │   ├── DashboardView.tsx
│       │   ├── TripsView.tsx
│       │   ├── PointsView.tsx
│       │   ├── DocsView.tsx
│       │   └── SettingsView.tsx
│       ├── flights/
│       │   └── FlightsView.tsx
│       └── discover/
│           └── DiscoverView.tsx
├── lib/
│   ├── data.ts                   ← Mock seed data
│   ├── store.ts                  ← Zustand global state
│   └── utils.ts                  ← Helper functions
└── types/
    └── index.ts                  ← All TypeScript types
```

---

## 🔧 Customisation

### Change the user profile
Edit `src/app/api/chat/route.ts` — update the `SYSTEM_PROMPT` with your name, home city, passport country, loyalty programs, and upcoming trips.

### Add real trips
Edit `src/lib/data.ts` — add entries to `MOCK_TRIPS` with your actual booking details. The app reads from this file.

### Connect real APIs (production)
For a production build, you'd connect:
- **Amadeus API** — real flight search and pricing
- **Google Places API** — real destination data
- **Stripe** — for booking/payments
- **Supabase/PostgreSQL** — for persistent user data

---

## 🚢 Deploy to Vercel (free)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set your env var in Vercel dashboard:
# Settings → Environment Variables → ANTHROPIC_API_KEY
```

Or connect your GitHub repo to [vercel.com](https://vercel.com) and it deploys automatically on every push.

---

## 📱 Mobile (React Native)

The current build is a web app optimised for desktop. For a native mobile app using the same codebase, you can use **Expo Router** with React Native — the logic, store, and API routes transfer directly.

---

Built with ❤️ for Griffon Web Studios
