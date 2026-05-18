import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Pulse Medication | Monitor Tech Certification",
    template: "%s | Pulse Medication",
  },
  description:
    "EKG Monitor Tech / Telemetry Certification Course. Live online 4-day program with 32 contact hours. CA BRN approved. Enroll today!",
  keywords: [
    "EKG certification",
    "monitor tech",
    "telemetry certification",
    "cardiac monitoring",
    "healthcare education",
    "BRN approved",
    "online certification",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 pt-20">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
