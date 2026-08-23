"use client";

import React from "react";
import { LegislativeTerm } from "@/types/council";
import { CheckCircle2, Milestone } from "lucide-react";

interface Props {
  selectedTerm: string | null;
  onSelectTerm: (term: string | null) => void;
}

const TERMS: { name: LegislativeTerm; label: string; period: string; highlight: string }[] = [
  {
    name: "District 5 (2017)",
    label: "District 5",
    period: "Jan 2017 – Dec 2017",
    highlight: "Sworn in Jan 17, 2017 • Eastland Mall redevelopment & East Charlotte transit"
  },
  {
    name: "At-Large (2017–2019)",
    label: "At-Large 1st Term",
    period: "2017 – 2019",
    highlight: "Co-sponsored landmark Strategic Energy Action Plan (SEAP 100% clean energy)"
  },
  {
    name: "At-Large (2019–2022)",
    label: "At-Large 2nd Term",
    period: "2019 – 2022",
    highlight: "Enacted Charlotte 2040 Plan & Modernized Unified Development Ordinance (UDO)"
  },
  {
    name: "At-Large (2022–2023)",
    label: "At-Large 3rd Term",
    period: "2022 – 2023",
    highlight: "Tree Canopy Protection amendments & Vision Zero traffic calming corridors"
  },
  {
    name: "At-Large (2023–2025)",
    label: "At-Large 4th Term",
    period: "2023 – 2025",
    highlight: "Budget Committee Chair • $4.17B balanced municipal budget without tax hikes"
  },
  {
    name: "At-Large (2025–Present)",
    label: "At-Large Present",
    period: "2025 – Present",
    highlight: "Climate Resilience Bond allocations & Corridors of Opportunity economic grants"
  }
];

export function TermTimeline({ selectedTerm, onSelectTerm }: Props) {
  return (
    <div className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
        <div>
          <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Milestone className="w-4 h-4 text-emerald-600" />
            Interactive Legislative Tenure Timeline
          </h3>
          <p className="text-xs text-slate-500">
            Click on any term to filter council actions, votes, and committee proceedings
          </p>
        </div>

        {selectedTerm && (
          <button
            onClick={() => onSelectTerm(null)}
            className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 dark:text-emerald-400 underline"
          >
            Show All Terms
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {TERMS.map((t) => {
          const isActive = selectedTerm === t.name;
          return (
            <button
              key={t.name}
              onClick={() => onSelectTerm(isActive ? null : t.name)}
              className={`text-left p-3.5 rounded-xl border transition-all duration-150 relative ${
                isActive
                  ? "border-emerald-600 bg-emerald-50/80 dark:bg-emerald-950/40 ring-2 ring-emerald-500/30"
                  : "border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 hover:border-slate-300 dark:hover:border-slate-700"
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold text-slate-900 dark:text-slate-100">
                  {t.label}
                </span>
                <span className="text-[11px] font-medium text-slate-500 bg-white dark:bg-slate-900 px-2 py-0.5 rounded border border-slate-200 dark:border-slate-800">
                  {t.period}
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
                {t.highlight}
              </p>
              {isActive && (
                <div className="mt-2 text-[11px] font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Filtering by this term
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
