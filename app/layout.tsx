import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dimple Ajmera on Council Hub & Legislative Archive",
  description:
    "Official searchable legislative archive, vote tracker, committee records, and timecoded transcripts for Charlotte City Council Member Dimple Ajmera (2017 – Present).",
  keywords: [
    "Dimple Ajmera",
    "Charlotte City Council",
    "SEAP",
    "Housing Trust Fund",
    "Budget Chair",
    "Eastland Yards",
    "UDO",
    "Legistar"
  ]
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col antialiased bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
        {children}
      </body>
    </html>
  );
}
