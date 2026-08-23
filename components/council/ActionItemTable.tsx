"use client";

import React from "react";
import { AjmeraVote } from "@/types/council";
import { Vote, FileText, CheckCircle2, XCircle } from "lucide-react";

interface Props {
  votes: AjmeraVote[];
}

export function ActionItemTable({ votes }: Props) {
  if (!votes || votes.length === 0) {
    return (
      <div className="p-6 text-center text-xs text-slate-500 border border-dashed rounded-xl">
        No specific roll-call votes recorded for this meeting.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto border border-slate-200 dark:border-slate-800 rounded-xl bg-white dark:bg-slate-900 shadow-sm">
      <table className="w-full text-left text-xs text-slate-600 dark:text-slate-300">
        <thead className="bg-slate-50 dark:bg-slate-800/80 uppercase text-[10px] tracking-wider text-slate-500 font-bold border-b border-slate-200 dark:border-slate-800">
          <tr>
            <th className="py-3 px-4">Matter / File #</th>
            <th className="py-3 px-4">Motion / Legislation Title</th>
            <th className="py-3 px-4">Action Type</th>
            <th className="py-3 px-4">Ajmera Vote</th>
            <th className="py-3 px-4">Council Outcome</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
          {votes.map((v, i) => {
            const isAye = v.ajmeraVote.toLowerCase().includes("aye");
            const isNay = v.ajmeraVote.toLowerCase().includes("nay");

            return (
              <tr key={i} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition">
                <td className="py-3 px-4 font-mono font-bold text-slate-900 dark:text-slate-100 whitespace-nowrap">
                  {v.matterFile || `ITEM-${i + 1}`}
                </td>
                <td className="py-3 px-4 font-medium text-slate-800 dark:text-slate-200">
                  {v.title}
                </td>
                <td className="py-3 px-4 text-slate-500 whitespace-nowrap">
                  <span className="inline-flex items-center gap-1">
                    <FileText className="w-3 h-3 text-slate-400" />
                    {v.actionName}
                  </span>
                </td>
                <td className="py-3 px-4 whitespace-nowrap">
                  <span
                    className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-bold ${
                      isAye
                        ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300"
                        : isNay
                        ? "bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300"
                        : "bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300"
                    }`}
                  >
                    {isAye ? <CheckCircle2 className="w-3.5 h-3.5" /> : isNay ? <XCircle className="w-3.5 h-3.5" /> : <Vote className="w-3.5 h-3.5" />}
                    {v.ajmeraVote}
                  </span>
                </td>
                <td className="py-3 px-4 font-semibold text-slate-700 dark:text-slate-300 whitespace-nowrap">
                  {v.result}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
