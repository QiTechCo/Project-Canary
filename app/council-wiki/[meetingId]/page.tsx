"use client";

import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import archiveData from "@/data/dimple-ajmera-council-archive.json";
import { CouncilRecord } from "@/types/council";
import { ActionItemTable } from "@/components/council/ActionItemTable";
import { TranscriptViewer } from "@/components/council/TranscriptViewer";
import {
  Calendar,
  ArrowLeft,
  Printer,
  FileText,
  ExternalLink,
  ShieldCheck,
  Award,
  Vote
} from "lucide-react";

interface Props {
  params: {
    meetingId: string;
  };
}

export default function MeetingDetailPage({ params }: Props) {
  const records = archiveData as CouncilRecord[];
  const record = records.find((r) => r.id === params.meetingId);

  if (!record) {
    notFound();
  }

  return (
    <article className="max-w-4xl mx-auto space-y-8">
      {/* Top Breadcrumb & Print Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 no-print border-b border-slate-200 dark:border-slate-800 pb-4">
        <Link
          href="/council-wiki"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-emerald-700 dark:hover:text-emerald-400 transition"
        >
          <ArrowLeft className="w-4 h-4" /> Back to All Council Records
        </Link>

        <div className="flex items-center gap-2">
          {record.minutesUrl && (
            <a
              href={record.minutesUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-emerald-700 dark:text-emerald-400 hover:bg-slate-50 transition"
            >
              <FileText className="w-3.5 h-3.5" /> Minutes PDF
            </a>
          )}
          {record.inInsiteUrl && (
            <a
              href={record.inInsiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-50 transition"
            >
              <ExternalLink className="w-3.5 h-3.5" /> Legistar InSite
            </a>
          )}
          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-1.5 text-xs font-bold px-3.5 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white shadow-sm transition"
          >
            <Printer className="w-3.5 h-3.5" /> Print Official Record
          </button>
        </div>
      </div>

      {/* Printable Official Header */}
      <div className="p-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm printable-card space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
            <span className="inline-flex items-center gap-1 font-bold px-2.5 py-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200">
              <Calendar className="w-3.5 h-3.5 text-emerald-600" />
              {record.date}
            </span>
            <span>•</span>
            <span className="font-semibold text-slate-700 dark:text-slate-300">{record.body}</span>
            <span>•</span>
            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/80 px-2.5 py-0.5 rounded">
              <Award className="w-3 h-3" />
              {record.term}
            </span>
          </div>

          {record.agendaStatus && (
            <span className="text-xs font-medium text-slate-500 bg-slate-100 dark:bg-slate-800 px-2.5 py-0.5 rounded">
              {record.agendaStatus}
            </span>
          )}
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 leading-tight">
          {record.title}
        </h1>

        <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed pt-2 border-t border-slate-100 dark:border-slate-800">
          {record.summary}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 pt-2">
          {record.tags.map((t) => (
            <span
              key={t}
              className="text-xs font-semibold px-2.5 py-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Itemized Motions & Roll-Call Votes */}
      <section className="space-y-4 printable-card">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Vote className="w-5 h-5 text-emerald-600" />
            Official Roll-Call Votes & Motions ({record.ajmeraVotes?.length || 0})
          </h2>
          <span className="text-xs text-slate-500">
            Source: Charlotte Granicus Legistar Web API
          </span>
        </div>

        <ActionItemTable votes={record.ajmeraVotes} />
      </section>

      {/* Spoken Transcripts & Remarks */}
      {record.transcripts && record.transcripts.length > 0 && (
        <section className="space-y-4 printable-card">
          <TranscriptViewer
            transcripts={record.transcripts}
            videoUrl={record.videoUrl}
          />
        </section>
      )}

      {/* Archival Record Verification */}
      <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400 space-y-2 printable-card">
        <div className="flex items-center gap-1.5 font-bold text-slate-800 dark:text-slate-200">
          <ShieldCheck className="w-4 h-4 text-emerald-600" /> Archival Verification & Public Record Note
        </div>
        <p className="leading-relaxed">
          Roll-call votes and legislative items displayed are synced with official City of Charlotte clerk minutes and Granicus Legistar event record #{record.eventId || record.id}. Spoken transcripts are transcribed directly from official broadcast streams archived by the Charlotte GOV Channel.
        </p>
      </div>
    </article>
  );
}
