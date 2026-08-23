import React from "react";
import Link from "next/link";
import { Landmark, ArrowLeft, ExternalLink } from "lucide-react";

export default function CouncilWikiLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full">
      {/* Sub-header Context Bar for Council Wiki */}
      <div className="bg-slate-900 text-white py-3 border-b border-slate-800 no-print">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-1 text-slate-300 hover:text-white font-medium transition"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Campaign Home
            </Link>
            <span className="text-slate-700">|</span>
            <span className="text-emerald-400 font-semibold flex items-center gap-1.5">
              <Landmark className="w-3.5 h-3.5" /> Official Legislative Archive &amp; Wiki (2017 – Present)
            </span>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="https://charlottenc.legistar.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1 text-slate-300 hover:text-white"
            >
              Granicus Legistar <ExternalLink className="w-3 h-3 text-slate-400" />
            </a>
            <a
              href="https://www.youtube.com/@CharlotteGOVchannel/streams"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex items-center gap-1 text-rose-300 hover:text-rose-200"
            >
              Charlotte GOV Streams <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </div>
    </div>
  );
}
