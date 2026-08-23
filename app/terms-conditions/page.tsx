import React from "react";
import Link from "next/link";
import { FileText } from "lucide-react";

export const metadata = {
  title: "Terms & Conditions | Dimple Ajmera for Charlotte",
  description: "Terms and conditions of use for the Dimple Ajmera campaign website and Council Legislative Wiki."
};

export default function TermsConditionsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div className="space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold uppercase tracking-wider">
          <FileText className="w-3.5 h-3.5" /> Terms of Service
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
          Website Terms &amp; Conditions
        </h1>
        <p className="text-xs text-slate-500">
          Last Updated: August 2026 • Committee to Elect Dimple Ajmera
        </p>
      </div>

      <div className="prose dark:prose-invert max-w-none text-xs sm:text-sm space-y-6 text-slate-600 dark:text-slate-400 leading-relaxed">
        <section className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
          <h2 className="text-base font-bold text-slate-900 dark:text-slate-100">1. Acceptance of Terms</h2>
          <p>
            By accessing and using this website, including the campaign portal and Council Legislative Wiki, you agree to comply with and be bound by these Terms and Conditions.
          </p>
        </section>

        <section className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
          <h2 className="text-base font-bold text-slate-900 dark:text-slate-100">2. Public Legislative Data</h2>
          <p>
            Legislative records, roll-call voting outcomes, minutes, and video stream links indexed in the Council Legislative Wiki are sourced from public domain proceedings of the City of Charlotte via the Granicus Legistar Web API and the Charlotte GOV Channel.
          </p>
        </section>

        <section className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
          <h2 className="text-base font-bold text-slate-900 dark:text-slate-100">3. Campaign Contributions</h2>
          <p>
            All campaign contributions are processed through ActBlue in compliance with Federal Election Commission (FEC) and North Carolina State Board of Elections (NCSBE) regulations. Contributions are not tax-deductible for federal income tax purposes.
          </p>
        </section>
      </div>
    </div>
  );
}
