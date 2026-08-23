"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  ChevronDown,
  Heart,
  Landmark,
  ShieldCheck,
  TreePine,
  Home,
  TrendingUp,
  Users,
  Lock,
  FileText,
  DollarSign,
  Vote,
  ExternalLink,
  Sparkles
} from "lucide-react";

export function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [prioritiesOpen, setPrioritiesOpen] = useState(false);
  const [councilOpen, setCouncilOpen] = useState(false);
  const [involvedOpen, setInvolvedOpen] = useState(false);

  const DONATE_URL = "https://secure.actblue.com/donate/dimple-ajmera-for-city-council-1";

  const closeAll = () => {
    setMobileMenuOpen(false);
    setPrioritiesOpen(false);
    setCouncilOpen(false);
    setInvolvedOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/95 dark:bg-slate-900/95 backdrop-blur border-b border-slate-200 dark:border-slate-800 shadow-sm no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <Link href="/" onClick={closeAll} className="flex items-center gap-3">
            <img
              src="/assets/images/whiteboard_9_navlogo.png"
              alt="Dimple Ajmera for Charlotte"
              className="h-12 sm:h-14 w-auto object-contain"
            />
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-1 xl:gap-2">
            <Link
              href="/"
              className={`px-3 py-2 rounded-lg text-sm font-semibold transition ${
                pathname === "/"
                  ? "text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40"
                  : "text-slate-700 dark:text-slate-200 hover:text-emerald-700 dark:hover:text-emerald-400 hover:bg-slate-50 dark:hover:bg-slate-800"
              }`}
            >
              Home
            </Link>

            <Link
              href="/#about"
              className="px-3 py-2 rounded-lg text-sm font-semibold text-slate-700 dark:text-slate-200 hover:text-emerald-700 dark:hover:text-emerald-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition"
            >
              About
            </Link>

            <Link
              href="/#media"
              className="px-3 py-2 rounded-lg text-sm font-semibold text-slate-700 dark:text-slate-200 hover:text-emerald-700 dark:hover:text-emerald-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition"
            >
              Media
            </Link>

            {/* Priorities Dropdown */}
            <div className="relative group">
              <button
                onClick={() => setPrioritiesOpen(!prioritiesOpen)}
                onMouseEnter={() => setPrioritiesOpen(true)}
                className="flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-semibold text-slate-700 dark:text-slate-200 hover:text-emerald-700 dark:hover:text-emerald-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition"
              >
                Priorities <ChevronDown className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              </button>

              <div
                onMouseLeave={() => setPrioritiesOpen(false)}
                className={`absolute left-0 top-full mt-1 w-64 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl py-2 transition-all duration-200 ${
                  prioritiesOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-2 pointer-events-none"
                }`}
              >
                <Link
                  href="/#priorities"
                  onClick={closeAll}
                  className="flex items-center gap-2.5 px-4 py-2.5 text-xs font-bold text-slate-900 dark:text-slate-100 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 hover:text-emerald-700"
                >
                  <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> All Key Priorities
                </Link>
                <div className="border-t border-slate-100 dark:border-slate-800 my-1" />
                <Link
                  href="/priority-public-safety"
                  onClick={closeAll}
                  className="flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-emerald-700"
                >
                  <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> Public Safety &amp; Officers
                </Link>
                <Link
                  href="/priority-environment"
                  onClick={closeAll}
                  className="flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-emerald-700"
                >
                  <TreePine className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> Environment &amp; Clean Water
                </Link>
                <Link
                  href="/priority-housing"
                  onClick={closeAll}
                  className="flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-emerald-700"
                >
                  <Home className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> Affordable Housing Bonds
                </Link>
                <Link
                  href="/priority-economy"
                  onClick={closeAll}
                  className="flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-emerald-700"
                >
                  <TrendingUp className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> Economy &amp; Small Business
                </Link>
              </div>
            </div>

            {/* On Council Dropdown */}
            <div className="relative group">
              <button
                onClick={() => setCouncilOpen(!councilOpen)}
                onMouseEnter={() => setCouncilOpen(true)}
                className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-semibold transition ${
                  pathname.startsWith("/council-wiki")
                    ? "text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40"
                    : "text-slate-700 dark:text-slate-200 hover:text-emerald-700 dark:hover:text-emerald-400 hover:bg-slate-50 dark:hover:bg-slate-800"
                }`}
              >
                <Landmark className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                On Council <ChevronDown className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              </button>

              <div
                onMouseLeave={() => setCouncilOpen(false)}
                className={`absolute left-0 top-full mt-1 w-72 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl py-2 transition-all duration-200 ${
                  councilOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-2 pointer-events-none"
                }`}
              >
                <Link
                  href="/council-wiki"
                  onClick={closeAll}
                  className="flex items-center gap-2.5 px-4 py-2.5 text-xs font-bold text-emerald-800 dark:text-emerald-300 bg-emerald-50/50 dark:bg-emerald-950/30 hover:bg-emerald-100/60"
                >
                  <FileText className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <div>
                    <div>Council Hub &amp; Legislative Wiki</div>
                    <span className="text-[10px] font-normal text-slate-500">Official searchable archive &amp; votes</span>
                  </div>
                </Link>
                <div className="border-t border-slate-100 dark:border-slate-800 my-1" />
                <Link
                  href="/council-wiki#votes"
                  onClick={closeAll}
                  className="flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-emerald-700"
                >
                  <Vote className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> Voting Record &amp; Roll Calls
                </Link>
                <Link
                  href="/council-wiki"
                  onClick={closeAll}
                  className="flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-emerald-700"
                >
                  <DollarSign className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> Campaign Finance &amp; Disclosures
                </Link>
                <Link
                  href="/council-wiki"
                  onClick={closeAll}
                  className="flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-emerald-700"
                >
                  <TreePine className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> SEAP &amp; Climate Action Plan
                </Link>
                <div className="border-t border-slate-100 dark:border-slate-800 my-1" />
                <a
                  href="https://charlottenc.legistar.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between px-4 py-2 text-[11px] font-medium text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
                >
                  <span className="flex items-center gap-2"><Landmark className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> Granicus Legistar Portal</span>
                  <ExternalLink className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                </a>
              </div>
            </div>

            <Link
              href="/endorsements"
              className={`px-3 py-2 rounded-lg text-sm font-semibold transition ${
                pathname === "/endorsements"
                  ? "text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40"
                  : "text-slate-700 dark:text-slate-200 hover:text-emerald-700 dark:hover:text-emerald-400 hover:bg-slate-50 dark:hover:bg-slate-800"
              }`}
            >
              Endorsements
            </Link>

            {/* Get Involved Dropdown */}
            <div className="relative group">
              <button
                onClick={() => setInvolvedOpen(!involvedOpen)}
                onMouseEnter={() => setInvolvedOpen(true)}
                className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-semibold transition ${
                  pathname === "/volunteer"
                    ? "text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40"
                    : "text-slate-700 dark:text-slate-200 hover:text-emerald-700 dark:hover:text-emerald-400 hover:bg-slate-50 dark:hover:bg-slate-800"
                }`}
              >
                Get Involved <ChevronDown className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              </button>

              <div
                onMouseLeave={() => setInvolvedOpen(false)}
                className={`absolute right-0 top-full mt-1 w-60 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl py-2 transition-all duration-200 ${
                  involvedOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-2 pointer-events-none"
                }`}
              >
                <Link
                  href="/volunteer"
                  onClick={closeAll}
                  className="flex items-center gap-2.5 px-4 py-2.5 text-xs font-bold text-slate-900 dark:text-slate-100 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 hover:text-emerald-700"
                >
                  <Users className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> Volunteer with Us
                </Link>
                <Link
                  href="/portal"
                  onClick={closeAll}
                  className="flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-emerald-700"
                >
                  <Lock className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> Volunteer Portal Login
                </Link>
                <div className="border-t border-slate-100 dark:border-slate-800 my-1" />
                <Link
                  href="/council-wiki"
                  onClick={closeAll}
                  className="flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-emerald-700"
                >
                  <Landmark className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> Council Legislative Wiki
                </Link>
              </div>
            </div>
          </div>

          {/* Right Action Button (Donate) */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href={DONATE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-rose-700 hover:bg-rose-800 text-white font-bold text-sm shadow-md transition transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <Heart className="w-4 h-4 fill-white" /> Donate
            </a>
          </div>

          {/* Mobile Menu Hamburger Button */}
          <div className="flex lg:hidden items-center gap-2">
            <a
              href={DONATE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-1.5 rounded-lg bg-rose-700 text-white font-bold text-xs"
            >
              Donate
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Slide-down Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 pt-3 pb-6 space-y-2">
          <Link
            href="/"
            onClick={closeAll}
            className="block px-3 py-2 rounded-lg text-base font-semibold text-slate-900 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            Home
          </Link>
          <Link
            href="/#about"
            onClick={closeAll}
            className="block px-3 py-2 rounded-lg text-base font-semibold text-slate-900 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            About Dimple
          </Link>
          <Link
            href="/#media"
            onClick={closeAll}
            className="block px-3 py-2 rounded-lg text-base font-semibold text-slate-900 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            Media &amp; Socials
          </Link>
          <Link
            href="/council-wiki"
            onClick={closeAll}
            className="flex items-center justify-between px-3 py-2.5 rounded-lg text-base font-bold bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300"
          >
            <span className="flex items-center gap-2"><Landmark className="w-5 h-5 text-emerald-600 dark:text-emerald-400" /> Council Hub &amp; Wiki</span>
            <span className="text-xs bg-emerald-700 text-white px-2 py-0.5 rounded-full font-bold">Live</span>
          </Link>
          <Link
            href="/#priorities"
            onClick={closeAll}
            className="block px-3 py-2 rounded-lg text-base font-semibold text-slate-900 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            Key Priorities
          </Link>
          <Link
            href="/endorsements"
            onClick={closeAll}
            className="block px-3 py-2 rounded-lg text-base font-semibold text-slate-900 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            Endorsements
          </Link>
          <Link
            href="/volunteer"
            onClick={closeAll}
            className="block px-3 py-2 rounded-lg text-base font-semibold text-slate-900 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            Volunteer with Us
          </Link>
          <Link
            href="/portal"
            onClick={closeAll}
            className="block px-3 py-2 rounded-lg text-sm text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            Volunteer Portal Login
          </Link>
        </div>
      )}
    </nav>
  );
}
