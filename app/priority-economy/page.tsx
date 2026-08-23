import React from "react";
import Link from "next/link";
import { TrendingUp, Landmark, Calculator, Briefcase, ArrowRight } from "lucide-react";

export const metadata = {
  title: "Fiscal Stewardship & Small Business | Dimple Ajmera for Charlotte",
  description: "Dimple Ajmera's platform on balanced municipal budgeting, AAA bond ratings, Corridors of Opportunity grants, and small business growth."
};

export default function PriorityEconomyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="space-y-4 text-center sm:text-left">
        <Link
          href="/#priorities"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-700 dark:text-amber-400 hover:underline"
        >
          &larr; Back to All Priorities
        </Link>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 text-xs font-bold uppercase tracking-wider">
          <TrendingUp className="w-3.5 h-3.5" /> Fiscal Integrity &amp; Small Business
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
          Balanced Budgets, AAA Bond Rating &amp; Economic Opportunity
        </h1>
        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
          As a Certified Public Accountant and Budget Committee Chair, Dimple Ajmera manages Charlotte's $4.17 Billion municipal budget with strict fiscal discipline.
        </p>
      </div>

      <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-amber-950 via-slate-950 to-slate-900 text-white shadow-xl space-y-4">
        <span className="text-xs uppercase tracking-widest text-amber-400 font-bold">5+ Years Budget Leadership</span>
        <h2 className="text-2xl font-bold">
          Maintaining Charlotte’s Pristine AAA Bond Rating
        </h2>
        <p className="text-sm text-slate-300 leading-relaxed">
          Under Dimple's financial stewardship, Charlotte has consistently preserved its coveted AAA credit rating from all three major rating agencies, saving taxpayers millions in capital project financing costs.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950 text-amber-600 flex items-center justify-center">
            <Calculator className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">Transparent Budget Workshops</h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Chaired over 50 public budget committee sessions, opening municipal spreadsheets to public scrutiny and ensuring every tax dollar is spent with measurable impact.
          </p>
        </div>

        <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center">
            <Briefcase className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">Corridors of Opportunity Investments</h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Directed direct micro-grants and facade improvements to local small businesses along historic commercial corridors including West Boulevard, Sugar Creek, and Albemarle Road.
          </p>
        </div>
      </div>

      <div className="p-8 rounded-3xl bg-slate-100 dark:bg-slate-900 text-center space-y-4">
        <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">
          Verify Annual Budget Ordinances
        </h3>
        <p className="text-xs text-slate-500 max-w-lg mx-auto">
          Explore all budget ordinances, capital investment plans, and fiscal roll-call votes on the Dimple Ajmera Council Hub.
        </p>
        <Link
          href="/council-wiki"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-700 hover:bg-amber-800 text-white font-bold text-xs shadow transition"
        >
          <Landmark className="w-4 h-4" /> Open Budget Ordinances on Council Wiki &rarr;
        </Link>
      </div>
    </div>
  );
}
