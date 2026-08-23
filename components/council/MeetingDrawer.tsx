"use client";

import React from "react";
import Link from "next/link";
import { CouncilRecord } from "@/types/council";
import { ActionItemTable } from "./ActionItemTable";
import { TranscriptViewer } from "./TranscriptViewer";
import {
  X,
  Calendar,
  ExternalLink,
  FileText,
  Printer,
  ChevronRight,
  Landmark,
  Award
} from "lucide-react";

interface Props {
  record: CouncilRecord | null;
  onClose: () => void;
}

export function MeetingDrawer({ record, onClose }: Props) {
  if (!record) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/60 backdrop-blur-sm flex justify-end">
      <div className="w-full max-w-2xl bg-white dark:bg-slate-900 h-full shadow-2xl overflow-y-auto flex flex-col justify-between border-l border-slate-200 dark:border-slate-800 animate-in slide-in-from-right duration-200">
        
        {/* Drawer Header */}
        <div className="p-6 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 sticky top-0 z-10">
          <div className="flex items-center justify-between gap-4 mb-3">
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span className="inline-flex items-center gap-1 font-semibold px-2 py-0.5 rounded bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                <Calendar className="w-3.5 h-3.5 text-emerald-600" />
                {record.date}
              </span>
              <span>•</span>
              <span className="font-semibold text-slate-800 dark:text-slate-200">{record.body}</span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-800 transition"
              aria-label="Close drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-2 leading-tight">
            {record.title}
          </h2>

          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-emerald-800 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950 px-2.5 py-0.5 rounded flex items-center gap-1">
              <Award className="w-3 h-3" />
              {record.term}
            </span>
            {record.agendaStatus && (
              <span className="text-xs text-slate-500 bg-slate-200/70 dark:bg-slate-800 px-2 py-0.5 rounded">
                Status: {record.agendaStatus}
              </span>
            )}
          </div>
        </div>

        {/* Drawer Body Content */}
        <div className="p-6 space-y-6 flex-1">
          {/* Executive Summary */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
              Official Agenda & Legislative Summary
            </h4>
            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-800/40 p-4 rounded-xl border border-slate-100 dark:border-slate-800">
              {record.summary}
            </p>
          </div>

          {/* Itemized Votes Table */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
              Roll-Call Votes & Motions ({record.ajmeraVotes?.length || 0})
            </h4>
            <ActionItemTable votes={record.ajmeraVotes} />
          </div>

          {/* Spoken Transcripts */}
          {record.transcripts && record.transcripts.length > 0 && (
            <div>
              <TranscriptViewer
                transcripts={record.transcripts}
                videoUrl={record.videoUrl}
              />
            </div>
          )}

          {/* Official Document Links */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Granicus Legistar & Official Archival Links
            </h4>
            <div className="flex flex-wrap gap-3">
              {record.minutesUrl && (
                <a
                  href={record.minutesUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-emerald-700 dark:text-emerald-400 hover:bg-slate-50"
                >
                  <FileText className="w-4 h-4" /> Download Minutes (PDF)
                </a>
              )}
              {record.inInsiteUrl && (
                <a
                  href={record.inInsiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50"
                >
                  <ExternalLink className="w-4 h-4" /> Legistar Web InSite
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Drawer Footer */}
        <div className="p-5 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 flex items-center justify-between">
          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition"
          >
            <Printer className="w-3.5 h-3.5" /> Print Records
          </button>
          
          <Link
            href={`/council-wiki/${record.id}`}
            className="inline-flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white transition shadow-sm"
          >
            Open Dedicated Record Page <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </div>
  );
}
