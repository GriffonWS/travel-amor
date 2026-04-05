import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Travel Amor — Your Personal Travel Concierge",
  description: "AI-powered travel planning, itinerary management, flight alerts and discovery.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
