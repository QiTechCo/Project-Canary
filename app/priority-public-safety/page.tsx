import React from "react";
import Link from "next/link";
import { ShieldCheck, HeartHandshake, UserCheck, Landmark, ArrowRight } from "lucide-react";

export const metadata = {
  title: "Public Safety & First Responders | Dimple Ajmera for Charlotte",
  description: "Dimple Ajmera's platform on competitive CMPD retention, mental health crisis response teams, and firefighter healthcare protections."
};

export default function PriorityPublicSafetyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="space-y-4 text-center sm:text-left">
        <Link
          href="/#priorities"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-rose-700 dark:text-rose-400 hover:underline"
        >
          &larr; Back to All Priorities
        </Link>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-100 dark:bg-rose-950 text-rose-800 dark:text-rose-300 text-xs font-bold uppercase tracking-wider">
          <ShieldCheck className="w-3.5 h-3.5" /> Community Public Safety
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
          Safe Neighborhoods, Accountable Policing &amp; First Responder Support
        </h1>
        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
          Every Charlotte family deserves safe streets, and our first responders deserve the pay, healthcare, and mental health tools necessary to protect our community with integrity.
        </p>
      </div>

      <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-rose-950 via-slate-950 to-slate-900 text-white shadow-xl space-y-4">
        <span className="text-xs uppercase tracking-widest text-rose-400 font-bold">Key Achievement</span>
        <h2 className="text-2xl font-bold">
          Landmark Healthcare &amp; Officer Retention in FY2025 Budget
        </h2>
        <p className="text-sm text-slate-300 leading-relaxed">
          As Budget Committee Chair, Dimple Ajmera led council approval of the largest first responder compensation package in city history: expanding mental health crisis intervention clinicians (CARES teams), recruitment bonuses, and family healthcare coverage.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-rose-50 dark:bg-rose-950 text-rose-600 flex items-center justify-center">
            <UserCheck className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">Competitive Pay &amp; Recruitment</h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Eliminating officer vacancy gaps through competitive market-rate wages, longevity retention bonuses, and lateral entry incentives.
          </p>
        </div>

        <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center">
            <HeartHandshake className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">Alternative Crisis Response Teams</h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Expanding non-police civilian clinician response units for non-violent 911 calls involving mental health crises and substance recovery.
          </p>
        </div>
      </div>

      <div className="p-8 rounded-3xl bg-slate-100 dark:bg-slate-900 text-center space-y-4">
        <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">
          Verify Public Safety Roll-Call Votes
        </h3>
        <p className="text-xs text-slate-500 max-w-lg mx-auto">
          Review Dimple's complete voting history on CMPD budgets, de-escalation funding, and community safety resolutions.
        </p>
        <Link
          href="/council-wiki"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-rose-700 hover:bg-rose-800 text-white font-bold text-xs shadow transition"
        >
          <Landmark className="w-4 h-4" /> Open Public Safety Votes on Council Wiki &rarr;
        </Link>
      </div>
    </div>
  );
}
