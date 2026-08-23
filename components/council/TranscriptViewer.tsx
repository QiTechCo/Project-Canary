"use client";

import React, { useState } from "react";
import { TranscriptSnippet } from "@/types/council";
import { Video, Clock, ExternalLink, PlayCircle } from "lucide-react";

interface Props {
  transcripts: TranscriptSnippet[];
  videoUrl?: string;
}

export function TranscriptViewer({ transcripts, videoUrl }: Props) {
  const [activeSnippet, setActiveSnippet] = useState<number | null>(null);

  if (!transcripts || transcripts.length === 0) {
    return (
      <div className="p-6 text-center text-xs text-slate-500 border border-dashed rounded-xl">
        Spoken transcripts for this meeting are being processed or are archived under Charlotte GOV Channel.
      </div>
    );
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const getYouTubeTimestampUrl = (baseUrl: string, seconds: number) => {
    const cleanUrl = baseUrl.split("&t=")[0].split("?t=")[0];
    const separator = cleanUrl.includes("?") ? "&" : "?";
    return `${cleanUrl}${separator}t=${Math.floor(seconds)}s`;
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <Video className="w-4 h-4 text-emerald-600" />
          Timecoded Council Spoken Transcripts & Remarks
        </h4>
        {videoUrl && (
          <a
            href={videoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs font-semibold text-rose-600 hover:text-rose-700 underline"
          >
            <PlayCircle className="w-3.5 h-3.5" /> Watch on Charlotte GOV YouTube
          </a>
        )}
      </div>

      <div className="space-y-3">
        {transcripts.map((t, index) => {
          const timestampUrl = videoUrl ? getYouTubeTimestampUrl(videoUrl, t.timestamp) : null;
          const isSelected = activeSnippet === index;

          return (
            <div
              key={index}
              onClick={() => setActiveSnippet(index)}
              className={`p-4 rounded-xl border transition cursor-pointer ${
                isSelected
                  ? "border-emerald-600 bg-emerald-50/70 dark:bg-emerald-950/40 ring-1 ring-emerald-500/40"
                  : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1 font-mono text-[11px] font-bold px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
                    <Clock className="w-3 h-3" />
                    {formatTime(t.timestamp)}
                  </span>
                  {t.duration && (
                    <span className="text-[10px] text-slate-400">
                      Duration: {Math.round(t.duration)}s
                    </span>
                  )}
                </div>

                {timestampUrl && (
                  <a
                    href={timestampUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 dark:text-emerald-400 hover:underline"
                  >
                    Jump to Video <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>

              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed italic">
                &ldquo;{t.text}&rdquo;
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
