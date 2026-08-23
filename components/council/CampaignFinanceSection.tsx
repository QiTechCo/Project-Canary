"use client";

import React, { useState, useMemo } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  CartesianGrid
} from "recharts";
import {
  DollarSign,
  TrendingUp,
  Users,
  Search,
  ExternalLink,
  Download,
  Filter,
  ArrowUpDown
} from "lucide-react";

import financeLedgerData from "@/data/campaign-finance-ledger.json";

// --- Seed Data ---
const CYCLE_SUMMARY_DATA = [
  { cycle: "2017 (D5)", raised: 42500, spent: 38200, office: "District 5" },
  { cycle: "2017 (At-Large)", raised: 88400, spent: 81000, office: "At-Large" },
  { cycle: "2019 (At-Large)", raised: 142000, spent: 129500, office: "At-Large" },
  { cycle: "2020 (Treasurer)", raised: 278766, spent: 404378, office: "NC Treasurer" },
  { cycle: "2022 (At-Large)", raised: 165000, spent: 148000, office: "At-Large" },
  { cycle: "2023 (At-Large)", raised: 184500, spent: 162300, office: "At-Large" },
  { cycle: "2025 (At-Large)", raised: 210000, spent: 175000, office: "At-Large" }
];

const SECTOR_DATA = [
  { name: "Real Estate & Development", value: 32, color: "#3b82f6" },
  { name: "Finance, Banking & Insurance", value: 24, color: "#10b981" },
  { name: "Tech & Professional Services", value: 18, color: "#8b5cf6" },
  { name: "Healthcare & Education", value: 14, color: "#f59e0b" },
  { name: "PACs & Advocacy Committees", value: 12, color: "#ec4899" }
];

interface DonorTransaction {
  id: string;
  contributor: string;
  employer: string;
  occupation: string;
  amount: number;
  date: string;
  cycle: string;
  type: "Individual" | "PAC" | "Candidate Loan" | string;
}

const LEDGER_TRANSACTIONS: DonorTransaction[] = financeLedgerData as DonorTransaction[];

export function CampaignFinanceSection() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCycle, setSelectedCycle] = useState<string>("All");
  const [selectedType, setSelectedType] = useState<string>("All");

  const filteredTransactions = useMemo(() => {
    return LEDGER_TRANSACTIONS.filter((item) => {
      const matchesSearch =
        item.contributor.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.employer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.occupation.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCycle = selectedCycle === "All" || item.cycle.includes(selectedCycle);
      const matchesType = selectedType === "All" || item.type === selectedType;

      return matchesSearch && matchesCycle && matchesType;
    });
  }, [searchTerm, selectedCycle, selectedType]);

  return (
    <section className="w-full max-w-6xl mx-auto py-8 space-y-8">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-5">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <DollarSign className="h-6 w-6 text-emerald-600" />
            Campaign Finance & Disclosures
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            Historical contributions, donor industry breakdown, and official NCSBE regulatory disclosures.
          </p>
        </div>

        {/* Regulatory External Links */}
        <div className="flex flex-wrap gap-2">
          <a
            href="https://www.ncsbe.gov/campaign-finance/search-campaign-funding-and-spending-reports-and-penalties"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition"
          >
            <ExternalLink className="h-3.5 w-3.5" /> NCSBE Portal
          </a>
          <a
            href="https://meckboe.org"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition"
          >
            <ExternalLink className="h-3.5 w-3.5" /> MeckBOE Filings
          </a>
        </div>
      </div>

      {/* KPI Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Lifetime Raised</span>
            <DollarSign className="h-4 w-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-bold text-slate-900 dark:text-slate-100 mt-2">$1.11M+</div>
          <span className="text-[11px] text-slate-500">Across 6 municipal & 1 state race</span>
        </div>

        <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Small Dollar Ratio</span>
            <Users className="h-4 w-4 text-blue-600" />
          </div>
          <div className="text-2xl font-bold text-slate-900 dark:text-slate-100 mt-2">64.2%</div>
          <span className="text-[11px] text-slate-500">Donations under $250</span>
        </div>

        <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">2020 State Run</span>
            <TrendingUp className="h-4 w-4 text-purple-600" />
          </div>
          <div className="text-2xl font-bold text-slate-900 dark:text-slate-100 mt-2">$278.7K</div>
          <span className="text-[11px] text-slate-500">NC Treasurer primary campaign</span>
        </div>

        <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Unique Contributors</span>
            <Users className="h-4 w-4 text-amber-600" />
          </div>
          <div className="text-2xl font-bold text-slate-900 dark:text-slate-100 mt-2">1,850+</div>
          <span className="text-[11px] text-slate-500">State & local disclosures</span>
        </div>
      </div>

      {/* Visual Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Bar Chart: Fundraising by Cycle */}
        <div className="lg:col-span-7 p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
          <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 mb-4">
            Fundraising & Expenditures by Election Cycle
          </h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={CYCLE_SUMMARY_DATA} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                <XAxis dataKey="cycle" tick={{ fontSize: 11 }} />
                <YAxis
                  tick={{ fontSize: 11 }}
                  tickFormatter={(val) => `$${val / 1000}k`}
                />
                <Tooltip
                  formatter={(val: any) => [`$${Number(val || 0).toLocaleString()}`, ""]}
                  contentStyle={{ backgroundColor: "#0f172a", borderColor: "#334155", color: "#f8fafc" }}
                />
                <Bar dataKey="raised" name="Total Raised" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                <Bar dataKey="spent" name="Total Spent" fill="#94a3b8" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Donut Chart: Industry Concentration */}
        <div className="lg:col-span-5 p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm flex flex-col justify-between">
          <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 mb-2">
            Donor Sector Breakdown
          </h3>
          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={SECTOR_DATA}
                  innerRadius={50}
                  outerRadius={75}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {SECTOR_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(val: any) => [`${val}%`, "Share"]} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-1.5 pt-2 border-t border-slate-100 dark:border-slate-800">
            {SECTOR_DATA.map((sector) => (
              <div key={sector.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: sector.color }} />
                  <span className="text-slate-600 dark:text-slate-400">{sector.name}</span>
                </div>
                <span className="font-semibold text-slate-900 dark:text-slate-100">{sector.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Itemized Contributor Search Table */}
      <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
            Itemized Contributor Ledger
          </h3>

          <div className="flex flex-wrap items-center gap-2">
            {/* Search Input */}
            <div className="relative w-full sm:w-60">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search contributor, employer..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            {/* Cycle Filter */}
            <select
              value={selectedCycle}
              onChange={(e) => setSelectedCycle(e.target.value)}
              className="text-xs px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-700 dark:text-slate-300"
            >
              <option value="All">All Cycles</option>
              <option value="2025">2025</option>
              <option value="2023">2023</option>
              <option value="2022">2022</option>
              <option value="2020">2020 (Treasurer)</option>
              <option value="2019">2019</option>
              <option value="2017">2017</option>
            </select>

            {/* Type Filter */}
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="text-xs px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-700 dark:text-slate-300"
            >
              <option value="All">All Types</option>
              <option value="Individual">Individual</option>
              <option value="PAC">PAC</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600 dark:text-slate-300">
            <thead className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 font-semibold uppercase tracking-wider border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="py-2.5 px-3">Contributor</th>
                <th className="py-2.5 px-3">Employer / Occupation</th>
                <th className="py-2.5 px-3">Cycle</th>
                <th className="py-2.5 px-3">Type</th>
                <th className="py-2.5 px-3 text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredTransactions.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-6 text-center text-slate-400">
                    No donor records match your search criteria.
                  </td>
                </tr>
              ) : (
                filteredTransactions.map((tx) => (
                  <tr key={tx.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition">
                    <td className="py-2.5 px-3 font-medium text-slate-900 dark:text-slate-100">
                      {tx.contributor}
                    </td>
                    <td className="py-2.5 px-3 text-slate-500">
                      {tx.employer} • {tx.occupation}
                    </td>
                    <td className="py-2.5 px-3">{tx.cycle}</td>
                    <td className="py-2.5 px-3">
                      <span
                        className={`inline-block px-2 py-0.5 rounded text-[10px] font-semibold ${
                          tx.type === "PAC"
                            ? "bg-purple-100 text-purple-700 dark:bg-purple-950/60 dark:text-purple-300"
                            : "bg-blue-100 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300"
                        }`}
                      >
                        {tx.type}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-right font-bold text-slate-900 dark:text-slate-100">
                      ${tx.amount.toLocaleString()}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
