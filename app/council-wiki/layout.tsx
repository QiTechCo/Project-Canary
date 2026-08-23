import React from "react";
import Link from "next/link";
import { Landmark, ArrowLeft, ExternalLink, ShieldCheck, FileSpreadsheet } from "lucide-react";

export default function CouncilWikiLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Banner Navigation */}
      <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur border-b border-slate-200 dark:border-slate-800 shadow-sm no-print">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-emerald-700 dark:hover:text-emerald-400 transition"
            >
              <ArrowLeft className="w-4 h-4" /> Return to Campaign Site
            </Link>
            <span className="text-slate-300 dark:text-slate-700">|</span>
            <Link
              href="/council-wiki"
              className="flex items-center gap-2.5 font-bold text-slate-900 dark:text-slate-100 hover:text-emerald-700 dark:hover:text-emerald-400 transition"
            >
              <div className="w-8 h-8 rounded-lg bg-emerald-700 text-white flex items-center justify-center font-extrabold text-sm shadow-sm">
                DA
              </div>
              <div className="leading-tight">
                <span className="block text-sm sm:text-base font-extrabold text-slate-900 dark:text-slate-100">
                  Dimple Ajmera on Council
                </span>
                <span className="block text-[10px] text-emerald-700 dark:text-emerald-400 font-semibold uppercase tracking-wider">
                  Official Legislative Archive & Wiki
                </span>
              </div>
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="https://charlottenc.legistar.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300"
            >
              <Landmark className="w-3.5 h-3.5 text-slate-400" /> Granicus Legistar <ExternalLink className="w-3 h-3" />
            </a>
            <a
              href="https://www.youtube.com/@CharlotteGOVchannel/streams"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 hover:bg-rose-100"
            >
              Charlotte GOV Streams <ExternalLink className="w-3 h-3" />
            </a>
            <Link
              href="/volunteer.html"
              className="text-xs font-bold px-3.5 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white shadow-sm transition"
            >
              Join Campaign
            </Link>
          </div>
        </div>
      </header>

      {/* Main Page Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 py-8 no-print">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold text-slate-600 dark:text-slate-400">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            Official Charlotte City Council Archive (January 17, 2017 – Present)
          </div>
          <p className="text-xs text-slate-500 max-w-2xl mx-auto">
            This open legislative archive aggregates public roll-call votes, minutes, and timecoded video transcripts from the City of Charlotte Granicus Legistar Web API and the Charlotte GOV Channel.
          </p>
          <div className="pt-2 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            Paid for by the Committee to Elect Dimple Ajmera
          </div>
        </div>
      </footer>
    </div>
  );
}
