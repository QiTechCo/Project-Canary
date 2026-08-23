import React from "react";
import Link from "next/link";
import { ShieldCheck, Lock, FileText } from "lucide-react";

export const metadata = {
  title: "Privacy Policy & Mobile Terms | Dimple Ajmera for Charlotte",
  description: "Privacy policy and mobile text messaging terms for the Committee to Elect Dimple Ajmera."
};

export default function PrivacyTermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div className="space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold uppercase tracking-wider">
          <ShieldCheck className="w-3.5 h-3.5" /> Legal &amp; Compliance
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
          Privacy Policy &amp; Mobile Terms of Service
        </h1>
        <p className="text-xs text-slate-500">
          Last Updated: August 2026 • Committee to Elect Dimple Ajmera
        </p>
      </div>

      <div className="prose dark:prose-invert max-w-none text-xs sm:text-sm space-y-6 text-slate-600 dark:text-slate-400 leading-relaxed">
        <section className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
          <h2 className="text-base font-bold text-slate-900 dark:text-slate-100">1. Information Collection</h2>
          <p>
            The Committee to Elect Dimple Ajmera collects personal information provided voluntarily by supporters, including name, email address, phone number, mailing address, and contribution details. We do not sell, rent, or trade your personal information to commercial third parties.
          </p>
        </section>

        <section className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
          <h2 className="text-base font-bold text-slate-900 dark:text-slate-100">2. Mobile Text Messaging (SMS/MMS) Terms</h2>
          <p>
            By opting into SMS updates or providing your phone number on our website forms, you consent to receive periodic text messages from the Committee to Elect Dimple Ajmera regarding campaign events, voting reminders, volunteer activities, and campaign news.
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Opt-Out:</strong> You may opt out at any time by texting <strong>STOP</strong> to any message.</li>
            <li><strong>Help:</strong> For support, text <strong>HELP</strong> or contact info@dimpleajmera.com.</li>
            <li><strong>Frequency &amp; Rates:</strong> Message frequency varies. Message and data rates may apply.</li>
          </ul>
        </section>

        <section className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
          <h2 className="text-base font-bold text-slate-900 dark:text-slate-100">3. Campaign Finance &amp; Public Records</h2>
          <p>
            Federal, state, and local election laws require political committees to collect and publicly report the name, mailing address, occupation, and employer of individuals whose contributions exceed statutory disclosure thresholds to the North Carolina State Board of Elections (NCSBE).
          </p>
        </section>
      </div>
    </div>
  );
}
