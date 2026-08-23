"use client";

import React from "react";
import Link from "next/link";
import { useCouncilSearch } from "@/hooks/useCouncilSearch";
import { CouncilRecord } from "@/lib/search";
import {
  Search,
  Calendar,
  FileText,
  ExternalLink,
  X,
  Vote,
  Video,
  ChevronRight,
  Sparkles,
  Award
} from "lucide-react";

interface Props {
  data: CouncilRecord[];
  onOpenDrawer?: (record: CouncilRecord) => void;
}

const TOP_TAGS = [
  "#budget",
  "#seap",
  "#eastland",
  "#affordable-housing",
  "#transit",
  "#udo"
];

export function CouncilSearchFeed({ data, onOpenDrawer }: Props) {
  const {
    query,
    setQuery,
    selectedTag,
    setSelectedTag,
    selectedVoteType,
    setSelectedVoteType,
    selectedTerm,
    setSelectedTerm,
    clearAllFilters,
    results,
    totalIndexed
  } = useCouncilSearch(data);

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      {/* Search Input Box */}
      <div className="relative">
        <Search className="absolute left-4 top-3.5 h-5 w-5 text-slate-400" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search meeting titles, votes (e.g. 'Eastland Yards', 'SEAP', 'Budget'), or spoken transcripts..."
          className="w-full pl-12 pr-10 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 text-base transition-all"
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

      {/* Filter Chips & Quick Selectors */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 mr-1 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" /> Quick Filters:
          </span>
          {TOP_TAGS.map((tag) => {
            const isActive = selectedTag === tag;
            return (
              <button
                key={tag}
                onClick={() => setSelectedTag(isActive ? null : tag)}
                className={`text-xs px-3 py-1.5 rounded-full font-medium transition-colors ${
                  isActive
                    ? "bg-emerald-700 text-white shadow-sm"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                }`}
              >
                {tag}
              </button>
            );
          })}
        </div>

        {(query || selectedTag || selectedVoteType || selectedTerm) && (
          <button
            onClick={clearAllFilters}
            className="text-xs text-rose-600 hover:text-rose-700 font-medium inline-flex items-center gap-1"
          >
            <X className="w-3.5 h-3.5" /> Reset Filters
          </button>
        )}
      </div>

      {/* Results Header */}
      <div className="flex justify-between items-center text-sm text-slate-500 border-b border-slate-200 dark:border-slate-800 pb-2">
        <span>
          Showing <strong className="text-slate-900 dark:text-slate-100">{results.length}</strong> of {totalIndexed} indexed records
        </span>
        <span className="text-xs text-slate-400">
          Instant Client-side Search (MiniSearch)
        </span>
      </div>

      {/* Meeting Cards List */}
      <div className="space-y-4">
        {results.length === 0 ? (
          <div className="p-12 text-center bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-200 dark:border-slate-800">
            <Vote className="w-12 h-12 text-slate-400 mx-auto mb-3 opacity-60" />
            <p className="text-slate-700 dark:text-slate-300 font-medium mb-1">
              No matching council records or transcript segments found.
            </p>
            <p className="text-sm text-slate-500 mb-4">
              Try modifying your search term or clearing active topic filters.
            </p>
            <button
              onClick={clearAllFilters}
              className="px-4 py-2 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg transition"
            >
              Clear All Filters
            </button>
          </div>
        ) : (
          results.map((item) => (
            <div
              key={item.id}
              className="group p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm hover:border-emerald-500/50 dark:hover:border-emerald-500/50 transition-all duration-200"
            >
              {/* Header metadata */}
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                  <span className="inline-flex items-center gap-1.5 font-medium px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                    <Calendar className="h-3.5 w-3.5 text-emerald-600" />
                    {item.date}
                  </span>
                  <span>•</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">{item.body}</span>
                  <span className="hidden sm:inline">•</span>
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded">
                    <Award className="w-3 h-3" />
                    {item.term}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  {item.minutesUrl && (
                    <a
                      href={item.minutesUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-medium text-emerald-700 dark:text-emerald-400 hover:underline"
                    >
                      <FileText className="h-3.5 w-3.5" /> Minutes PDF
                    </a>
                  )}
                  {item.inInsiteUrl && (
                    <a
                      href={item.inInsiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 hover:underline"
                    >
                      <ExternalLink className="h-3.5 w-3.5" /> Legistar
                    </a>
                  )}
                </div>
              </div>

              {/* Title & Summary */}
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
                {item.title}
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">
                {item.summary}
              </p>

              {/* Recorded Votes Snippet */}
              {item.ajmeraVotes && item.ajmeraVotes.length > 0 && (
                <div className="mb-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl p-3.5 border border-slate-100 dark:border-slate-800 space-y-2">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                    <Vote className="w-3.5 h-3.5 text-emerald-600" /> Key Recorded Votes:
                  </div>
                  <div className="space-y-1.5">
                    {item.ajmeraVotes.map((v, idx) => (
                      <div
                        key={idx}
                        className="flex flex-wrap items-center justify-between text-xs gap-2"
                      >
                        <span className="text-slate-700 dark:text-slate-300 font-medium">
                          {v.matterFile ? <strong className="font-mono text-slate-900 dark:text-slate-100 mr-1">{v.matterFile}</strong> : null}
                          {v.title}
                        </span>
                        <div className="flex items-center gap-1.5">
                          <span
                            className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                              v.ajmeraVote.toLowerCase().includes("aye")
                                ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300"
                                : v.ajmeraVote.toLowerCase().includes("nay")
                                ? "bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300"
                                : "bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300"
                            }`}
                          >
                            Vote: {v.ajmeraVote}
                          </span>
                          <span className="text-slate-500 text-[11px]">({v.result})</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Transcript quotes preview */}
              {item.transcripts && item.transcripts.length > 0 && (
                <div className="mb-4 text-xs italic text-slate-600 dark:text-slate-400 bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200/50 dark:border-amber-800/40 rounded-lg p-3">
                  <div className="font-semibold text-amber-900 dark:text-amber-300 not-italic mb-1 flex items-center gap-1">
                    <Video className="w-3.5 h-3.5 text-amber-700 dark:text-amber-400" /> Verified Spoken Transcript:
                  </div>
                  &ldquo;{item.transcripts[0].text}&rdquo;
                </div>
              )}

              {/* Tags & Action Buttons */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <div className="flex flex-wrap gap-1.5">
                  {item.tags.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                      className={`text-[11px] px-2.5 py-0.5 rounded font-medium transition ${
                        selectedTag === tag
                          ? "bg-emerald-700 text-white"
                          : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200"
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  {onOpenDrawer && (
                    <button
                      onClick={() => onOpenDrawer(item)}
                      className="inline-flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 transition"
                    >
                      Quick Drawer
                    </button>
                  )}
                  <Link
                    href={`/council-wiki/${item.id}`}
                    className="inline-flex items-center gap-1 text-xs font-semibold px-3.5 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white shadow-sm transition"
                  >
                    View Official Record <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
