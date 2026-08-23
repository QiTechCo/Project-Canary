import React from "react";
import Link from "next/link";
import { TreePine, Landmark, ArrowRight, ShieldCheck, CheckCircle2, Droplets, Sun, Award } from "lucide-react";

export const metadata = {
  title: "Environment & Clean Water | Dimple Ajmera for Charlotte",
  description: "Dimple Ajmera's platform on the Strategic Energy Action Plan (SEAP), Catawba River water security, data center regulations, and urban tree canopy expansion."
};

export default function PriorityEnvironmentPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="space-y-4 text-center sm:text-left">
        <Link
          href="/#priorities"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-400 hover:underline"
        >
          &larr; Back to All Priorities
        </Link>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-xs font-bold uppercase tracking-wider">
          <TreePine className="w-3.5 h-3.5" /> Environmental Stewardship
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
          Protecting Clean Water &amp; 100% Zero-Carbon Climate Action
        </h1>
        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
          From co-sponsoring Charlotte's landmark Strategic Energy Action Plan (SEAP) to safeguarding our Catawba River drinking water, Council Member Dimple Ajmera is Charlotte's leading voice for environmental justice and sustainability.
        </p>
      </div>

      {/* Hero Highlight Card */}
      <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-emerald-950 via-teal-950 to-slate-950 text-white shadow-xl space-y-6">
        <div className="flex items-center justify-between border-b border-emerald-800/80 pb-4">
          <span className="text-xs uppercase tracking-widest text-emerald-400 font-bold">Policy Record</span>
          <span className="text-xs bg-emerald-700 text-white px-3 py-1 rounded-full font-bold">100% Environmental Voting Score</span>
        </div>
        <h2 className="text-2xl font-bold">
          Charlotte’s Strategic Energy Action Plan (SEAP) Landmark Co-Sponsor
        </h2>
        <p className="text-sm text-emerald-100 leading-relaxed">
          In November 2018, Dimple co-sponsored Charlotte’s historic SEAP resolution, committing our city to transition all municipal buildings and fleet vehicles to 100% zero-carbon sources by 2030, and citywide by 2050.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div className="p-4 rounded-xl bg-white/10 backdrop-blur">
            <div className="text-2xl font-extrabold text-emerald-300">100%</div>
            <div className="text-xs text-slate-300 mt-1">Zero-Carbon Municipal Goal (2030)</div>
          </div>
          <div className="p-4 rounded-xl bg-white/10 backdrop-blur">
            <div className="text-2xl font-extrabold text-teal-300">$18.5M+</div>
            <div className="text-xs text-slate-300 mt-1">Rooftop Solar &amp; Building Retrofits</div>
          </div>
          <div className="p-4 rounded-xl bg-white/10 backdrop-blur">
            <div className="text-2xl font-extrabold text-white">45+</div>
            <div className="text-xs text-slate-300 mt-1">CATS Transit EV Fast-Chargers</div>
          </div>
        </div>
      </div>

      {/* Core Policy Pillars */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          Core Environmental Action Plan
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950 text-blue-600 flex items-center justify-center">
              <Droplets className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
              Catawba River Basin Water Security
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Enforcing stringent water recycling requirements and infrastructure impact fees for water-intensive industrial developments, preventing depletion of Charlotte's regional water basin.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center">
              <TreePine className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
              Tree Canopy &amp; Shade Equity
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Authored key heritage tree protection amendments in the Unified Development Ordinance (UDO), investing $3.5M+ in tree planting across historically heat-vulnerable East and West Charlotte corridors.
            </p>
          </div>
        </div>
      </div>

      {/* Direct Link to Wiki Record */}
      <div className="p-8 rounded-3xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 text-center space-y-4">
        <h3 className="text-xl font-bold text-emerald-950 dark:text-emerald-200">
          Verify Dimple’s Environmental Voting Record
        </h3>
        <p className="text-xs text-slate-600 dark:text-slate-400 max-w-lg mx-auto">
          Explore every roll-call vote, SEAP progress report, and transcript timestamp on the Dimple Ajmera Council Hub.
        </p>
        <Link
          href="/council-wiki"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow transition"
        >
          <Landmark className="w-4 h-4" /> Open Environmental Records on Council Wiki &rarr;
        </Link>
      </div>
    </div>
  );
}
