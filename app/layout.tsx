import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dimple Ajmera for Charlotte | Working Mother • Accountant • Fighter",
  description:
    "Official website for Dimple Ajmera for Charlotte City Council. Working Mother, Certified Public Accountant, and fighter for public safety, clean water, affordable housing, and transparent governance.",
  keywords: [
    "Dimple Ajmera",
    "Charlotte City Council",
    "Dimple Ajmera for Charlotte",
    "SEAP",
    "Affordable Housing",
    "Clean Water",
    "Budget Committee Chair",
    "Charlotte City Council At-Large"
  ],
  icons: {
    icon: "/assets/images/whiteboard_9_navlogo.png"
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full scroll-smooth">
      <body className="min-h-full flex flex-col antialiased bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
        <Navbar />
        <main className="flex-1 w-full">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
