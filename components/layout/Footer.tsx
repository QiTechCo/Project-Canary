import React from "react";
import Link from "next/link";
import { Heart, Landmark, ShieldCheck, ExternalLink } from "lucide-react";

export function Footer() {
  const DONATE_URL = "https://secure.actblue.com/donate/dimple-ajmera-for-city-council-1";

  return (
    <footer className="mt-auto border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 no-print">
      {/* Top CTA Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-950 to-emerald-950 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div>
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-2">
              Join the Fight for Charlotte’s Future
            </h3>
            <p className="text-sm text-slate-300 max-w-xl">
              Support Dimple Ajmera’s campaign for clean water, affordable housing, public safety, and fiscal integrity across all Charlotte neighborhoods.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href={DONATE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-sm shadow-lg transition transform hover:-translate-y-0.5"
            >
              <Heart className="w-4 h-4 fill-white" /> Donate
            </a>
            <Link
              href="/volunteer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold text-sm transition"
            >
              Volunteer with Us
            </Link>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand & Mission */}
          <div className="space-y-4 md:col-span-1">
            <img
              src="/assets/images/whiteboard_9_navlogo.png"
              alt="Dimple Ajmera for Charlotte"
              className="h-12 w-auto object-contain"
            />
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Working Mother • Accountant • Fighter. Dedicated to delivering proven, transparent results for every resident of Charlotte.
            </p>
          </div>

          {/* Key Priorities */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-100">
              Key Priorities
            </h4>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
              <li><Link href="/priority-public-safety" className="hover:text-emerald-600">Public Safety &amp; Officers</Link></li>
              <li><Link href="/priority-environment" className="hover:text-emerald-600">Environment &amp; Clean Water</Link></li>
              <li><Link href="/priority-housing" className="hover:text-emerald-600">Affordable Housing Bonds</Link></li>
              <li><Link href="/priority-economy" className="hover:text-emerald-600">Small Business &amp; Corridors</Link></li>
            </ul>
          </div>

          {/* Council Legislative Hub */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
              <Landmark className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> Council Hub &amp; Wiki
            </h4>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
              <li><Link href="/council-wiki" className="hover:text-emerald-600 font-semibold">Legislative Wiki Feed</Link></li>
              <li><Link href="/council-wiki#votes" className="hover:text-emerald-600">Roll-Call Votes Tracker</Link></li>
              <li><Link href="/council-wiki#finance" className="hover:text-emerald-600">Campaign Finance Ledger</Link></li>
              <li>
                <a href="https://charlottenc.legistar.com" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-600 inline-flex items-center gap-1">
                  Granicus Legistar <ExternalLink className="w-2.5 h-2.5 text-emerald-600 dark:text-emerald-400" />
                </a>
              </li>
            </ul>
          </div>

          {/* Campaign & Legal */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-100">
              Campaign &amp; Legal
            </h4>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
              <li><Link href="/endorsements" className="hover:text-emerald-600">37+ Community Endorsements</Link></li>
              <li><Link href="/volunteer" className="hover:text-emerald-600">Volunteer Opportunities</Link></li>
              <li><Link href="/portal" className="hover:text-emerald-600">Volunteer Portal Login</Link></li>
              <li><Link href="/privacy-terms" className="hover:text-emerald-600">Privacy Policy &amp; Mobile Terms</Link></li>
              <li><Link href="/terms-conditions" className="hover:text-emerald-600">Terms &amp; Conditions</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Disclaimer */}
        <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800 text-center space-y-3">
          <div className="inline-block border border-slate-400/40 px-4 py-2 rounded-lg text-xs font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wider">
            Paid for by the Committee to Elect Dimple Ajmera
          </div>
          <p className="text-[11px] text-slate-400 max-w-xl mx-auto">
            © {new Date().getFullYear()} Dimple Ajmera for Charlotte. All rights reserved. Content from the official Charlotte legislative archive is public domain record aggregated for voter transparency.
          </p>
        </div>
      </div>
    </footer>
  );
}
