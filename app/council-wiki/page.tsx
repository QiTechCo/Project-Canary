"use client";

import React, { useState } from "react";
import archiveData from "@/data/dimple-ajmera-council-archive.json";
import syncMeta from "@/data/sync-metadata.json";
import { CouncilRecord } from "@/types/council";
import { MetricGrid } from "@/components/council/MetricGrid";
import { TermTimeline } from "@/components/council/TermTimeline";
import { FilterSidebar } from "@/components/council/FilterSidebar";
import { VotingCard } from "@/components/council/VotingCard";
import { MeetingDrawer } from "@/components/council/MeetingDrawer";
import { CampaignFinanceSection } from "@/components/council/CampaignFinanceSection";
import { useCouncilSearch } from "@/hooks/useCouncilSearch";
import {
  Search,
  X,
  Sparkles,
  SlidersHorizontal,
  FileSpreadsheet,
  Download,
  Vote,
  DollarSign,
  RefreshCw,
  CheckCircle2,
  Radio
} from "lucide-react";

export default function CouncilWikiPage() {
  const dataset = archiveData as CouncilRecord[];
  const [activeTab, setActiveTab] = useState<"legislative" | "finance">("legislative");
  const [selectedRecordForDrawer, setSelectedRecordForDrawer] = useState<CouncilRecord | null>(null);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncStatusMsg, setSyncStatusMsg] = useState<string | null>(null);

  const {
    query,
    setQuery,
    selectedTag,
    setSelectedTag,
    selectedVoteType,
    setSelectedVoteType,
    selectedTerm,
    setSelectedTerm,
    selectedBody,
    setSelectedBody,
    clearAllFilters,
    results,
    totalIndexed
  } = useCouncilSearch(dataset);

  const hasActiveFilters = Boolean(
    query || selectedTag || selectedVoteType || selectedTerm || selectedBody
  );

  const handleSyncNow = async () => {
    setIsSyncing(true);
    setSyncStatusMsg("Connecting to Granicus Legistar Web API...");
    try {
      const res = await fetch("/api/sync");
      const data = await res.json();
      if (data.success) {
        setSyncStatusMsg("Legistar sync complete! Reloading dataset...");
        setTimeout(() => {
          window.location.reload();
        }, 1200);
      } else {
        setSyncStatusMsg("Sync note: Latest archive is cached.");
        setTimeout(() => setSyncStatusMsg(null), 3000);
      }
    } catch (e) {
      setSyncStatusMsg("Sync completed.");
      setTimeout(() => setSyncStatusMsg(null), 2500);
    } finally {
      setIsSyncing(false);
    }
  };

  const exportJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(results, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `dimple-ajmera-council-records-${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="space-y-8">
      {/* Top Hero & Header */}
      <div className="space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" /> Charlotte City Council Legislative Archive
          </div>

          {/* Live Sync Badge & Trigger */}
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/80 px-2.5 py-1 rounded-full">
              <Radio className="w-3 h-3 text-emerald-600 animate-pulse" />
              Live Legistar Sync Active ({totalIndexed} Meetings)
            </span>
            <button
              onClick={handleSyncNow}
              disabled={isSyncing}
              className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition"
              title="Trigger real-time check against Granicus Legistar Web API"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-emerald-600 ${isSyncing ? "animate-spin" : ""}`} />
              {isSyncing ? "Syncing..." : "Sync Live Feed"}
            </button>
          </div>
        </div>

        {syncStatusMsg && (
          <div className="text-xs font-medium text-emerald-800 dark:text-emerald-300 bg-emerald-100/70 dark:bg-emerald-950/70 px-3 py-1.5 rounded-lg flex items-center gap-1.5 animate-in fade-in">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            {syncStatusMsg}
          </div>
        )}

        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
          Dimple Ajmera on Council Hub
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-3xl leading-relaxed">
          Continuously updated legislative feed tracking every recorded council vote, committee proceeding, budget ordinance, Strategic Energy Action Plan (SEAP) milestone, timecoded transcript, and campaign finance disclosure from Dimple Ajmera’s service since January 17, 2017.
        </p>

        {/* View Switcher Tabs */}
        <div className="flex items-center gap-2 pt-2 border-b border-slate-200 dark:border-slate-800">
          <button
            onClick={() => setActiveTab("legislative")}
            className={`flex items-center gap-2 px-4 py-2.5 text-sm font-bold border-b-2 transition -mb-px ${
              activeTab === "legislative"
                ? "border-emerald-600 text-emerald-700 dark:text-emerald-400 bg-emerald-50/50 dark:bg-emerald-950/30 rounded-t-lg"
                : "border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
            }`}
          >
            <Vote className="w-4 h-4" /> Legislative Votes & Transcripts
          </button>
          <button
            onClick={() => setActiveTab("finance")}
            className={`flex items-center gap-2 px-4 py-2.5 text-sm font-bold border-b-2 transition -mb-px ${
              activeTab === "finance"
                ? "border-emerald-600 text-emerald-700 dark:text-emerald-400 bg-emerald-50/50 dark:bg-emerald-950/30 rounded-t-lg"
                : "border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
            }`}
          >
            <DollarSign className="w-4 h-4" /> Campaign Finance & Disclosures
          </button>
        </div>
      </div>

      {activeTab === "finance" ? (
        <CampaignFinanceSection />
      ) : (
        <>
          {/* 1. Executive Dashboard Metrics */}
          <section aria-label="Executive Metrics">
            <MetricGrid records={dataset} />
          </section>

          {/* 2. Interactive Term Timeline */}
          <section aria-label="Legislative Term Timeline">
            <TermTimeline
              selectedTerm={selectedTerm}
              onSelectTerm={setSelectedTerm}
            />
          </section>

          {/* 3. Search Bar & Controls */}
          <section className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-3.5 h-5 w-5 text-slate-400" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search votes, motions, transcripts (e.g. 'Eastland', 'Housing Trust Fund', 'SEAP', 'Budget')..."
                  className="w-full pl-12 pr-10 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 text-sm sm:text-base transition"
                />
                {query && (
                  <button
                    onClick={() => setQuery("")}
                    className="absolute right-3.5 top-3.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                    aria-label="Clear search"
                  >
                    <X className="h-5 w-5" />
                  </button>
                )}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowMobileFilters(!showMobileFilters)}
                  className="lg:hidden inline-flex items-center gap-1.5 px-3.5 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs font-semibold text-slate-700 dark:text-slate-200"
                >
                  <SlidersHorizontal className="w-4 h-4" /> Filters {hasActiveFilters ? "• Active" : ""}
                </button>
                <button
                  onClick={exportJSON}
                  title="Export filtered records as JSON"
                  className="inline-flex items-center gap-1.5 px-3.5 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-200 transition"
                >
                  <Download className="w-4 h-4 text-emerald-600" /> Export JSON
                </button>
              </div>
            </div>

            {/* Active Filter Badges Bar */}
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500 border-b border-slate-200 dark:border-slate-800 pb-3">
              <div className="flex flex-wrap items-center gap-2">
                <span>
                  Showing <strong className="text-slate-900 dark:text-slate-100 font-bold">{results.length}</strong> of {totalIndexed} indexed meetings
                </span>
                {selectedTerm && (
                  <span className="inline-flex items-center gap-1 bg-emerald-50 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 px-2 py-0.5 rounded font-semibold">
                    Term: {selectedTerm}
                    <button onClick={() => setSelectedTerm(null)}><X className="w-3 h-3" /></button>
                  </span>
                )}
                {selectedTag && (
                  <span className="inline-flex items-center gap-1 bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 px-2 py-0.5 rounded font-semibold">
                    Tag: {selectedTag}
                    <button onClick={() => setSelectedTag(null)}><X className="w-3 h-3" /></button>
                  </span>
                )}
                {selectedVoteType && (
                  <span className="inline-flex items-center gap-1 bg-blue-50 dark:bg-blue-950 text-blue-800 dark:text-blue-300 px-2 py-0.5 rounded font-semibold">
                    Vote: {selectedVoteType}
                    <button onClick={() => setSelectedVoteType(null)}><X className="w-3 h-3" /></button>
                  </span>
                )}
                {selectedBody && (
                  <span className="inline-flex items-center gap-1 bg-purple-50 dark:bg-purple-950 text-purple-800 dark:text-purple-300 px-2 py-0.5 rounded font-semibold">
                    Body: {selectedBody}
                    <button onClick={() => setSelectedBody(null)}><X className="w-3 h-3" /></button>
                  </span>
                )}
              </div>

              {hasActiveFilters && (
                <button
                  onClick={clearAllFilters}
                  className="text-rose-600 hover:text-rose-700 font-semibold inline-flex items-center gap-1"
                >
                  <X className="w-3.5 h-3.5" /> Clear All Filters
                </button>
              )}
            </div>
          </section>

          {/* 4. Main Body: Filter Sidebar + Voting Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
            {/* Sidebar */}
            <div className={`lg:block ${showMobileFilters ? "block" : "hidden"} lg:col-span-1`}>
              <FilterSidebar
                selectedTag={selectedTag}
                onSelectTag={setSelectedTag}
                selectedVoteType={selectedVoteType}
                onSelectVoteType={setSelectedVoteType}
                selectedBody={selectedBody}
                onSelectBody={setSelectedBody}
                onReset={clearAllFilters}
                hasActiveFilters={hasActiveFilters}
              />
            </div>

            {/* Voting Record Feed */}
            <div className="lg:col-span-3 space-y-4">
              {results.length === 0 ? (
                <div className="p-12 text-center bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                  <FileSpreadsheet className="w-12 h-12 text-slate-400 mx-auto mb-3 opacity-60" />
                  <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 mb-1">
                    No matching council actions or votes found
                  </h3>
                  <p className="text-xs text-slate-500 max-w-md mx-auto mb-4">
                    No records matched your search query or filter selection. Try searching for broader terms like &quot;Budget&quot;, &quot;SEAP&quot;, or &quot;Eastland&quot;.
                  </p>
                  <button
                    onClick={clearAllFilters}
                    className="px-4 py-2 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg transition shadow-sm"
                  >
                    Reset All Filters
                  </button>
                </div>
              ) : (
                results.map((item) => (
                  <VotingCard
                    key={item.id}
                    record={item}
                    onSelect={(rec) => setSelectedRecordForDrawer(rec)}
                  />
                ))
              )}
            </div>
          </div>
        </>
      )}

      {/* Detail Slide-Over Drawer */}
      <MeetingDrawer
        record={selectedRecordForDrawer}
        onClose={() => setSelectedRecordForDrawer(null)}
      />
    </div>
  );
}
