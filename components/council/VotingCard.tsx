"use client";

import React from "react";
import Link from "next/link";
import { CouncilRecord } from "@/types/council";
import {
  Calendar,
  FileText,
  ExternalLink,
  Vote,
  Video,
  ChevronRight,
  Landmark,
  Award
} from "lucide-react";

interface Props {
  record: CouncilRecord;
  onSelect?: (record: CouncilRecord) => void;
}

export function VotingCard({ record, onSelect }: Props) {
  return (
    <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm hover:border-emerald-500/60 dark:hover:border-emerald-500/60 transition duration-150">
      {/* Top Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
        <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
          <span className="inline-flex items-center gap-1 font-semibold px-2.5 py-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
            <Calendar className="w-3.5 h-3.5 text-emerald-600" />
            {record.date}
          </span>
          <span>•</span>
          <span className="font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1">
            <Landmark className="w-3.5 h-3.5 text-slate-400" />
            {record.body}
          </span>
          <span>•</span>
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded">
            <Award className="w-3 h-3" />
            {record.term}
          </span>
        </div>

        <div className="flex items-center gap-3">
          {record.minutesUrl && (
            <a
              href={record.minutesUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 dark:text-emerald-400 hover:underline"
            >
              <FileText className="w-3.5 h-3.5" /> Minutes PDF
            </a>
          )}
          {record.inInsiteUrl && (
            <a
              href={record.inInsiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 hover:underline"
            >
              <ExternalLink className="w-3.5 h-3.5" /> Legistar
            </a>
          )}
        </div>
      </div>

      {/* Main Title & Summary */}
      <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2">
        {record.title}
      </h3>
      <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">
        {record.summary}
      </p>

      {/* Itemized Votes Summary */}
      {record.ajmeraVotes && record.ajmeraVotes.length > 0 && (
        <div className="mb-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl p-3.5 border border-slate-100 dark:border-slate-800 space-y-2">
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
            <Vote className="w-3.5 h-3.5 text-emerald-600" /> Recorded Roll-Call Votes:
          </div>
          {record.ajmeraVotes.map((v, i) => (
            <div key={i} className="flex flex-wrap items-center justify-between text-xs gap-2 pt-1 border-t border-slate-200/50 dark:border-slate-700/40 first:border-t-0 first:pt-0">
              <div className="text-slate-700 dark:text-slate-300 font-medium">
                {v.matterFile && <span className="font-mono text-slate-900 dark:text-slate-100 font-bold mr-1.5">{v.matterFile}:</span>}
                {v.title}
              </div>
              <div className="flex items-center gap-1.5">
                <span
                  className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                    v.ajmeraVote.toLowerCase().includes("aye")
                      ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300"
                      : "bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300"
                  }`}
                >
                  Dimple Vote: {v.ajmeraVote}
                </span>
                <span className="text-slate-500 text-[11px]">({v.result})</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Transcript snippet */}
      {record.transcripts && record.transcripts.length > 0 && (
        <div className="mb-4 text-xs italic text-slate-600 dark:text-slate-400 bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200/40 dark:border-amber-800/30 rounded-lg p-3">
          <div className="font-semibold text-amber-900 dark:text-amber-300 not-italic mb-1 flex items-center gap-1">
            <Video className="w-3.5 h-3.5 text-amber-600" /> Verified Spoken Statement:
          </div>
          &ldquo;{record.transcripts[0].text}&rdquo;
        </div>
      )}

      {/* Footer tags and links */}
      <div className="flex flex-wrap items-center justify-between gap-2 pt-2">
        <div className="flex flex-wrap gap-1.5">
          {record.tags.map((t) => (
            <span
              key={t}
              className="text-[11px] px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-medium"
            >
              {t}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-2">
          {onSelect && (
            <button
              onClick={() => onSelect(record)}
              className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 transition"
            >
              Quick Details
            </button>
          )}
          <Link
            href={`/council-wiki/${record.id}`}
            className="inline-flex items-center gap-1 text-xs font-semibold px-3.5 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white shadow-sm transition"
          >
            Full Record <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
