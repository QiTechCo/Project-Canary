import React from "react";
import Link from "next/link";
import { Home, Landmark, Building, Coins, ArrowRight } from "lucide-react";

export const metadata = {
  title: "Affordable Workforce Housing | Dimple Ajmera for Charlotte",
  description: "Dimple Ajmera's platform on Housing Trust Fund bond investments, workforce housing creation, and neighborhood anti-displacement programs."
};

export default function PriorityHousingPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="space-y-4 text-center sm:text-left">
        <Link
          href="/#priorities"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-700 dark:text-blue-400 hover:underline"
        >
          &larr; Back to All Priorities
        </Link>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300 text-xs font-bold uppercase tracking-wider">
          <Home className="w-3.5 h-3.5" /> Affordable Housing
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
          Housing Affordability &amp; Neighborhood Anti-Displacement
        </h1>
        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
          Charlotte’s teachers, nurses, municipal workers, and seniors deserve to live in the communities they serve without being priced out by rapid growth.
        </p>
      </div>

      <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-blue-950 via-indigo-950 to-slate-950 text-white shadow-xl space-y-4">
        <span className="text-xs uppercase tracking-widest text-blue-400 font-bold">Key Track Record</span>
        <h2 className="text-2xl font-bold">
          $200M+ in Housing Trust Fund Allocations
        </h2>
        <p className="text-sm text-slate-300 leading-relaxed">
          Throughout her service on City Council, Dimple has championed biennial Housing Bond referendums, financing more than 10,000 deed-restricted affordable homes for families earning below 30%, 50%, and 80% Area Median Income (AMI).
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950 text-blue-600 flex items-center justify-center">
            <Building className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">Naturally Occurring Affordable Housing (NOAH)</h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Acquiring and preserving existing multi-family rental apartments to protect working-class tenants from predatory acquisitions and eviction.
          </p>
        </div>

        <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center">
            <Coins className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">Down Payment &amp; Homeownership Grants</h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Expanding the HouseCharlotte down payment assistance program to create first-generation homeownership and intergenerational family wealth.
          </p>
        </div>
      </div>

      <div className="p-8 rounded-3xl bg-slate-100 dark:bg-slate-900 text-center space-y-4">
        <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">
          Verify Housing Roll-Call Votes &amp; Bonds
        </h3>
        <p className="text-xs text-slate-500 max-w-lg mx-auto">
          View all Housing Trust Fund votes and development subsidies on the Dimple Ajmera Council Hub.
        </p>
        <Link
          href="/council-wiki"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs shadow transition"
        >
          <Landmark className="w-4 h-4" /> Open Housing Votes on Council Wiki &rarr;
        </Link>
      </div>
    </div>
  );
}
