"use client";

import React from "react";
import { Filter, Check, RotateCcw, Tag, Vote, Landmark } from "lucide-react";

interface Props {
  selectedTag: string | null;
  onSelectTag: (tag: string | null) => void;
  selectedVoteType: string | null;
  onSelectVoteType: (vt: string | null) => void;
  selectedBody: string | null;
  onSelectBody: (body: string | null) => void;
  onReset: () => void;
  hasActiveFilters: boolean;
}

const TAG_OPTIONS = [
  { id: "#budget", label: "#Budget & Finance", desc: "Balanced budgets, appropriations" },
  { id: "#seap", label: "#SEAP & Clean Energy", desc: "100% clean energy transition" },
  { id: "#affordable-housing", label: "#Affordable Housing", desc: "Housing Trust Fund & bonds" },
  { id: "#eastland", label: "#Eastland Yards", desc: "East Charlotte redevelopment" },
  { id: "#udo", label: "#UDO & Zoning", desc: "Unified Development Ordinance" },
  { id: "#transit", label: "#Transit & Vision Zero", desc: "Buses, light rail, safety" },
  { id: "#environment", label: "#Environment & Water", desc: "Tree canopy, water security" },
  { id: "#public-safety", label: "#Public Safety", desc: "First responder retention" },
  { id: "#district5", label: "#District 5", desc: "East Charlotte district records" }
];

const VOTE_TYPES = [
  { id: "Aye", label: "Aye / In Favor", color: "text-emerald-700 bg-emerald-50 border-emerald-200" },
  { id: "Nay", label: "Nay / Opposed", color: "text-rose-700 bg-rose-50 border-rose-200" },
  { id: "Sponsor", label: "Sponsor / Co-Sponsor", color: "text-blue-700 bg-blue-50 border-blue-200" },
  { id: "Adopted", label: "Adopted Motions", color: "text-purple-700 bg-purple-50 border-purple-200" }
];

const BODIES = [
  { id: "City Council", label: "Full City Council" },
  { id: "Budget", label: "Budget Committee" },
  { id: "Environment", label: "Environment & SEAP Committee" },
  { id: "Transportation", label: "Transportation & Planning" }
];

export function FilterSidebar({
  selectedTag,
  onSelectTag,
  selectedVoteType,
  onSelectVoteType,
  selectedBody,
  onSelectBody,
  onReset,
  hasActiveFilters
}: Props) {
  return (
    <aside className="w-full lg:w-72 space-y-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm">
      <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
        <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <Filter className="w-4 h-4 text-emerald-600" />
          Multi-Facet Filter
        </h3>
        {hasActiveFilters && (
          <button
            onClick={onReset}
            className="text-xs text-rose-600 hover:text-rose-700 font-medium inline-flex items-center gap-1"
          >
            <RotateCcw className="w-3 h-3" /> Reset
          </button>
        )}
      </div>

      {/* Vote Types */}
      <div className="space-y-2">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
          <Vote className="w-3.5 h-3.5 text-emerald-600" /> Vote / Action Outcome
        </label>
        <div className="space-y-1.5">
          {VOTE_TYPES.map((vt) => {
            const isSelected = selectedVoteType === vt.id;
            return (
              <button
                key={vt.id}
                onClick={() => onSelectVoteType(isSelected ? null : vt.id)}
                className={`w-full flex items-center justify-between text-xs px-3 py-2 rounded-lg border text-left font-medium transition ${
                  isSelected
                    ? "border-emerald-600 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-900 dark:text-emerald-200 font-bold"
                    : "border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 text-slate-700 dark:text-slate-300"
                }`}
              >
                <span>{vt.label}</span>
                {isSelected && <Check className="w-3.5 h-3.5 text-emerald-600" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Topic Tags */}
      <div className="space-y-2">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
          <Tag className="w-3.5 h-3.5 text-emerald-600" /> Topic & Policy Tag
        </label>
        <div className="flex flex-col gap-1.5 max-h-60 overflow-y-auto pr-1">
          {TAG_OPTIONS.map((t) => {
            const isSelected = selectedTag === t.id;
            return (
              <button
                key={t.id}
                onClick={() => onSelectTag(isSelected ? null : t.id)}
                className={`w-full flex items-center justify-between text-xs px-3 py-2 rounded-lg border text-left transition ${
                  isSelected
                    ? "border-emerald-600 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-900 dark:text-emerald-200 font-bold"
                    : "border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 text-slate-700 dark:text-slate-300"
                }`}
              >
                <div>
                  <div className="font-semibold">{t.label}</div>
                  <div className="text-[10px] text-slate-400">{t.desc}</div>
                </div>
                {isSelected && <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Meeting Body */}
      <div className="space-y-2">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
          <Landmark className="w-3.5 h-3.5 text-emerald-600" /> Council Committee / Body
        </label>
        <div className="space-y-1.5">
          {BODIES.map((b) => {
            const isSelected = selectedBody === b.id;
            return (
              <button
                key={b.id}
                onClick={() => onSelectBody(isSelected ? null : b.id)}
                className={`w-full flex items-center justify-between text-xs px-3 py-2 rounded-lg border text-left font-medium transition ${
                  isSelected
                    ? "border-emerald-600 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-900 dark:text-emerald-200 font-bold"
                    : "border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 text-slate-700 dark:text-slate-300"
                }`}
              >
                <span>{b.label}</span>
                {isSelected && <Check className="w-3.5 h-3.5 text-emerald-600" />}
              </button>
            );
          })}
        </div>
      </div>
    </aside>
  );
}
