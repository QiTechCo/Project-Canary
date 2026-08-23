"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Users, CheckCircle2, Heart, Lock, Sparkles, Send } from "lucide-react";

export default function VolunteerPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    zipCode: "",
    roles: [] as string[],
    notes: ""
  });
  const [submitted, setSubmitted] = useState(false);

  const VOLUNTEER_ROLES = [
    { id: "canvass", label: "Neighborhood Door Canvassing" },
    { id: "phonebank", label: "Phone Banking & Voter Outreach" },
    { id: "lawnsign", label: "Lawn Sign Placement" },
    { id: "houseparty", label: "Host a Meet & Greet / House Party" },
    { id: "events", label: "Campaign Event Staff & Logistics" },
    { id: "digital", label: "Social Media & Digital Organizing" }
  ];

  const handleRoleToggle = (roleId: string) => {
    setFormData((prev) => {
      const exists = prev.roles.includes(roleId);
      return {
        ...prev,
        roles: exists ? prev.roles.filter((r) => r !== roleId) : [...prev.roles, roleId]
      };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 dark:bg-rose-950 text-rose-800 dark:text-rose-300 text-xs font-bold uppercase tracking-wider">
          <Users className="w-3.5 h-3.5" /> Grassroots Organizing
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
          Join Team Dimple
        </h1>
        <p className="text-base text-slate-600 dark:text-slate-400">
          Sign up to knock doors, make calls, host lawn signs, and connect with voters across Charlotte.
        </p>
      </div>

      {submitted ? (
        <div className="p-10 rounded-3xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-center space-y-4 shadow-sm animate-in zoom-in-95">
          <CheckCircle2 className="w-16 h-16 text-emerald-600 mx-auto" />
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            Thank You for Joining the Team!
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 max-w-md mx-auto">
            Our volunteer coordinator will reach out shortly with upcoming canvassing schedules and voter outreach materials.
          </p>
          <div className="pt-4 flex flex-wrap justify-center gap-3">
            <Link
              href="/"
              className="px-6 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs transition shadow"
            >
              Return Home
            </Link>
            <Link
              href="/portal"
              className="px-6 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs transition"
            >
              Go to Volunteer Portal
            </Link>
          </div>
        </div>
      ) : (
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl p-8 sm:p-12">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                  First Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 text-sm focus:ring-2 focus:ring-emerald-600 outline-none"
                  placeholder="First name"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                  Last Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 text-sm focus:ring-2 focus:ring-emerald-600 outline-none"
                  placeholder="Last name"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 text-sm focus:ring-2 focus:ring-emerald-600 outline-none"
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                  ZIP Code *
                </label>
                <input
                  type="text"
                  required
                  pattern="[0-9]{5}"
                  value={formData.zipCode}
                  onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 text-sm focus:ring-2 focus:ring-emerald-600 outline-none"
                  placeholder="28202"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                Phone Number (Mobile for Campaign SMS)
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 text-sm focus:ring-2 focus:ring-emerald-600 outline-none"
                placeholder="(704) 555-0199"
              />
            </div>

            {/* Volunteer Roles */}
            <div className="space-y-3 pt-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                How would you like to help? (Select all that apply)
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {VOLUNTEER_ROLES.map((role) => (
                  <label
                    key={role.id}
                    className={`flex items-center gap-3 p-3.5 rounded-xl border cursor-pointer transition text-xs font-semibold ${
                      formData.roles.includes(role.id)
                        ? "border-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200"
                        : "border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={formData.roles.includes(role.id)}
                      onChange={() => handleRoleToggle(role.id)}
                      className="rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4"
                    />
                    <span>{role.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                Notes or Special Skills (Optional)
              </label>
              <textarea
                rows={3}
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 text-sm focus:ring-2 focus:ring-emerald-600 outline-none"
                placeholder="Languages spoken, precinct knowledge, availability..."
              />
            </div>

            <p className="text-[11px] text-slate-400 leading-relaxed">
              By providing your mobile number, you agree to receive campaign updates from the Committee to Elect Dimple Ajmera. Message &amp; data rates may apply. Reply STOP to cancel.
            </p>

            <button
              type="submit"
              className="w-full py-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold text-sm shadow-lg transition flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" /> Submit Volunteer Registration
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
