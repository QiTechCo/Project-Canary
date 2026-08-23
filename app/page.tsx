"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Heart,
  Landmark,
  ShieldCheck,
  TreePine,
  Home,
  TrendingUp,
  Award,
  Calendar,
  MapPin,
  Clock,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Play,
  Users,
  Vote,
  ExternalLink,
  ChevronRight,
  Maximize2,
  X,
  Instagram,
  Filter
} from "lucide-react";
import { InstagramFeed } from "@/components/social/InstagramFeed";

export default function HomePage() {
  const [selectedPhoto, setSelectedPhoto] = useState<{
    src: string;
    title: string;
    tag: string;
    desc: string;
  } | null>(null);

  const [galleryFilter, setGalleryFilter] = useState<string>("all");
  const [volunteerEmail, setVolunteerEmail] = useState("");
  const [volunteerSuccess, setVolunteerSuccess] = useState(false);

  const DONATE_URL = "https://secure.actblue.com/donate/dimple-ajmera-for-city-council-1";

  const ALL_GALLERY_PHOTOS = [
    {
      src: "/assets/images/dimple_newest_crop.jpg",
      title: "Official Campaign Portrait",
      tag: "leadership",
      tagLabel: "Leadership",
      desc: "Council Member Dimple Ajmera representing fiscal discipline, sustainability, and dedicated service for all of Charlotte."
    },
    {
      src: "/assets/images/dimple_hugh_mccoll.jpg",
      title: "With Hugh McColl (Former CEO Bank of America)",
      tag: "leadership",
      tagLabel: "Economic Leadership",
      desc: "Discussing Charlotte's financial growth, small business expansion, and fiscal stewardship with banking legend Hugh McColl."
    },
    {
      src: "/assets/images/dimple_susan_rodriguez_mcdowell.jpg",
      title: "With Commissioner Susan Rodriguez McDowell",
      tag: "leadership",
      tagLabel: "County Collaboration",
      desc: "Collaborating with Mecklenburg County Commissioner Susan Rodriguez McDowell on regional water security and community services."
    },
    {
      src: "/assets/images/gallery_community_1.jpg",
      title: "West Boulevard Corridor Business Walk",
      tag: "community",
      tagLabel: "Corridors of Opportunity",
      desc: "Meeting with local entrepreneurs, small business owners, and community residents along West Boulevard."
    },
    {
      src: "/assets/images/gallery_community_2.jpg",
      title: "CMPD & Firefighter Round Table",
      tag: "safety",
      tagLabel: "Public Safety",
      desc: "Discussing first responder retention bonuses, mental health clinician units, and family healthcare benefits."
    },
    {
      src: "/assets/images/hero_slide_8.jpg",
      title: "Catawba River Basin Environmental Forum",
      tag: "environment",
      tagLabel: "Sustainability",
      desc: "Convening clean water advocates and conservation experts to protect the Catawba River watershed and urban tree canopy."
    },
    {
      src: "/assets/images/gallery_community_3.jpg",
      title: "Affordable Housing Groundbreaking",
      tag: "community",
      tagLabel: "Affordable Housing",
      desc: "Celebrating new deed-restricted affordable homes funded through the municipal Housing Trust Fund."
    },
    {
      src: "/assets/images/gallery_community_4.jpg",
      title: "CMS Youth Mentorship Session",
      tag: "community",
      tagLabel: "Education & Youth",
      desc: "Engaging with Charlotte-Mecklenburg students on public leadership, civic engagement, and career pathways in finance."
    },
    {
      src: "/assets/images/gallery_community_5.jpg",
      title: "Grassroots Canvassing Kickoff",
      tag: "campaign",
      tagLabel: "Campaign Trail",
      desc: "Launching weekend precinct door-knocking operations with neighborhood volunteers and community organizers."
    },
    {
      src: "/assets/images/gallery_community_6.jpg",
      title: "Eastland Yards Community Advisory",
      tag: "community",
      tagLabel: "Neighborhood Growth",
      desc: "Reviewing East Charlotte community investments, recreational facilities, and small business retail development."
    },
    {
      src: "/assets/images/gallery_community_7.jpg",
      title: "Urban Tree Canopy Planting Initiative",
      tag: "environment",
      tagLabel: "Clean Energy & SEAP",
      desc: "Planting native shade trees in urban heat-island neighborhoods as part of the City’s tree canopy expansion grant."
    },
    {
      src: "/assets/images/hero_slide_1.jpg",
      title: "Civic Outreach & Town Hall Remarks",
      tag: "leadership",
      tagLabel: "Public Forum",
      desc: "Addressing Charlotte families on balanced municipal budgets, transit connectivity, and neighborhood safety."
    }
  ];

  const filteredGallery = galleryFilter === "all"
    ? ALL_GALLERY_PHOTOS
    : ALL_GALLERY_PHOTOS.filter((p) => p.tag === galleryFilter);

  const PRIORITIES = [
    {
      id: "public-safety",
      href: "/priority-public-safety",
      title: "Public Safety & First Responders",
      subtitle: "CMPD Retention & Community Crisis Response",
      icon: ShieldCheck,
      color: "from-rose-600 to-red-700",
      textColor: "text-rose-700 dark:text-rose-400",
      bgLight: "bg-rose-50 dark:bg-rose-950/40",
      description: "Secured competitive pay, officer recruitment bonuses, mental health crisis clinician units, and landmark family healthcare benefits for CMPD."
    },
    {
      id: "environment",
      href: "/priority-environment",
      title: "Clean Water & Climate (SEAP)",
      subtitle: "100% Zero-Carbon & Watershed Protection",
      icon: TreePine,
      color: "from-emerald-600 to-green-700",
      textColor: "text-emerald-700 dark:text-emerald-400",
      bgLight: "bg-emerald-50 dark:bg-emerald-950/40",
      description: "Co-sponsored Charlotte's Strategic Energy Action Plan (SEAP), led municipal solar retrofits, protected Catawba water security, and expanded urban tree canopy."
    },
    {
      id: "housing",
      href: "/priority-housing",
      title: "Affordable Workforce Housing",
      subtitle: "Housing Trust Fund & Anti-Displacement",
      icon: Home,
      color: "from-blue-600 to-indigo-700",
      textColor: "text-blue-700 dark:text-blue-400",
      bgLight: "bg-blue-50 dark:bg-blue-950/40",
      description: "Championed $200M+ in Housing Trust Fund bonds creating over 10,000 deed-restricted affordable homes, plus emergency rental relief programs."
    },
    {
      id: "economy",
      href: "/priority-economy",
      title: "Fiscal Stewardship & Small Business",
      subtitle: "5+ Years Budget Chair & Corridors of Opportunity",
      icon: TrendingUp,
      color: "from-amber-600 to-yellow-700",
      textColor: "text-amber-700 dark:text-amber-400",
      bgLight: "bg-amber-50 dark:bg-amber-950/40",
      description: "Chaired 50+ budget sessions passing balanced $4.17B city budgets without property tax rate spikes, directing millions to historic commercial corridors."
    }
  ];

  const handleVolunteerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (volunteerEmail) {
      setVolunteerSuccess(true);
      setVolunteerEmail("");
      setTimeout(() => setVolunteerSuccess(false), 5000);
    }
  };

  return (
    <div className="w-full space-y-16">
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-[#0B2545] to-[#044B2A] text-white py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(16,185,129,0.15),rgba(255,255,255,0))] pointer-events-none" />

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur border border-white/20 text-xs sm:text-sm font-bold uppercase tracking-wider text-emerald-300">
              <Sparkles className="w-4 h-4 text-emerald-400" /> Working Mother • Accountant • Fighter
            </div>

            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-tight sm:leading-none">
              Delivering Proven Results for <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-teal-200 to-white">All of Charlotte</span>
            </h1>

            <p className="text-base sm:text-xl text-slate-200 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Four-term Charlotte City Councilwoman and CPA. Championing balanced city budgets, clean water protection, affordable housing bonds, and community public safety.
            </p>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <a
                href={DONATE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-base shadow-xl transition transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <Heart className="w-5 h-5 fill-white" /> Donate on ActBlue
              </a>
              <Link
                href="/council-wiki"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white/15 hover:bg-white/25 border border-white/30 text-white font-bold text-base backdrop-blur transition"
              >
                <Landmark className="w-5 h-5 text-emerald-300" /> Council Voting Wiki
              </Link>
              <Link
                href="/volunteer"
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-slate-200 font-semibold text-base transition"
              >
                <Users className="w-5 h-5 text-rose-400" /> Join Campaign
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md">
              <div className="absolute -inset-1.5 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-3xl blur opacity-30 group-hover:opacity-100 transition duration-1000"></div>
              <div className="relative rounded-3xl overflow-hidden border-2 border-white/20 shadow-2xl bg-slate-900 aspect-[4/5]">
                <img
                  src="/assets/images/dimple_newest_crop.jpg"
                  alt="Dimple Ajmera for Charlotte City Council"
                  className="w-full h-full object-cover object-top"
                />
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-transparent p-6 text-white text-center">
                  <span className="text-xs uppercase tracking-widest text-emerald-400 font-bold">Council Member At-Large</span>
                  <h3 className="text-xl font-extrabold">Dimple Ajmera, CPA</h3>
                  <p className="text-xs text-slate-300 mt-1">Budget Chair • SEAP Co-Sponsor • Fighter for Charlotte</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Impact Counter Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 sm:-mt-12 relative z-20">
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl p-6 sm:p-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 divide-y sm:divide-y-0 sm:divide-x divide-slate-100 dark:divide-slate-800 text-center">
            <div className="pt-4 sm:pt-0">
              <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">4</div>
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-1">Terms Elected At-Large</div>
            </div>
            <div className="pt-4 sm:pt-0 sm:pl-6">
              <div className="text-3xl sm:text-4xl font-extrabold text-emerald-700 dark:text-emerald-400 tracking-tight">$50M+</div>
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-1">Housing Bonds Passed</div>
            </div>
            <div className="pt-4 sm:pt-0 sm:pl-6">
              <div className="text-3xl sm:text-4xl font-extrabold text-teal-600 dark:text-teal-400 tracking-tight">100%</div>
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-1">Environment Voting Record</div>
            </div>
            <div className="pt-4 sm:pt-0 sm:pl-6">
              <div className="text-3xl sm:text-4xl font-extrabold text-rose-600 dark:text-rose-400 tracking-tight">38+</div>
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-1">Key Endorsing Leaders</div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. August 20th Environment Town Hall Spotlight */}
      <section id="event-townhall" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white p-8 sm:p-12 shadow-xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-bold uppercase tracking-wider">
                <Calendar className="w-3.5 h-3.5" /> Upcoming Town Hall
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
                State of Our Environment: Data Centers, Water &amp; Charlotte’s Future
              </h2>
              <p className="text-sm sm:text-base text-emerald-100 max-w-2xl leading-relaxed">
                Join Council Member Dimple Ajmera and regional environmental leaders to discuss safeguarding the Catawba River watershed, cooling demands of data center expansion, and urban forest protection.
              </p>
              <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-white/90 pt-2">
                <div className="flex items-center gap-1.5"><Calendar className="w-4 h-4 text-emerald-400" /> August 20th, 2026</div>
                <div className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-emerald-400" /> 6:00 PM – 7:30 PM</div>
                <div className="flex items-center gap-1.5"><MapPin className="w-4 h-4 text-emerald-400" /> Charlotte Community Center &amp; Live Stream</div>
              </div>
            </div>
            <div className="lg:col-span-4 flex justify-center lg:justify-end">
              <Link
                href="/volunteer"
                className="w-full sm:w-auto text-center px-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-sm shadow-lg transition"
              >
                RSVP for Town Hall
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Biography & Meet Dimple Section */}
      <section id="about" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">Meet Council Member Ajmera</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight mt-1">
                A Proven Track Record of Public Service &amp; Fiscal Integrity
              </h2>
            </div>
            <p className="text-base text-slate-600 dark:text-slate-400 leading-relaxed">
              Dimple immigrated to the United States with her family at age 16. Overcoming language barriers, she learned English, graduated from Southern High School in Durham, earned her accounting degree from the University of Southern California, and became a Certified Public Accountant managing multi-million dollar corporate budgets at Deloitte and TIAA.
            </p>
            <p className="text-base text-slate-600 dark:text-slate-400 leading-relaxed">
              Driven by public service values, Dimple left corporate finance to serve Charlotte. First appointed and elected to represent District 5 in 2017, she has now been elected across Charlotte for four consecutive terms At-Large, chairing the Budget Committee and co-sponsoring landmark clean energy and affordable housing resolutions.
            </p>
            <div className="pt-2 flex items-center gap-4">
              <Link
                href="/council-wiki"
                className="inline-flex items-center gap-1.5 text-sm font-bold text-emerald-700 dark:text-emerald-400 hover:underline"
              >
                View Full Legislative Record <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-500" /> Honors &amp; Leadership Recognition
              </h3>
              <ul className="space-y-3 text-xs text-slate-600 dark:text-slate-400">
                <li className="flex items-start gap-2.5 pb-2 border-b border-slate-100 dark:border-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 dark:text-slate-200 block">Charlotte Business Journal 40 Under 40</strong>
                    <span>Recognized for outstanding leadership and financial management in municipal governance.</span>
                  </div>
                </li>
                <li className="flex items-start gap-2.5 pb-2 border-b border-slate-100 dark:border-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 dark:text-slate-200 block">Global Service Award by Rotary International</strong>
                    <span>Honored for lifelong public service, clean water advocacy, and community dedication.</span>
                  </div>
                </li>
                <li className="flex items-start gap-2.5 pb-2 border-b border-slate-100 dark:border-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 dark:text-slate-200 block">Clean Energy Champion Award</strong>
                    <span>Recognized by environmental coalitions for co-sponsoring Charlotte's Strategic Energy Action Plan.</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Dimple on Council Hub Spotlight Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl shadow-xl border border-emerald-500/20 bg-gradient-to-br from-slate-950 via-[#0B2545] to-[#044B2A] text-white">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-bold uppercase tracking-wider text-emerald-300">
                <Landmark className="w-3.5 h-3.5" /> Live Legislative Archive &amp; Wiki
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                Dimple Ajmera on Council Hub
              </h2>
              <p className="text-sm sm:text-base text-slate-300 max-w-xl leading-relaxed">
                Explore 8+ years of public service records. Ingested directly from the Granicus Legistar Web API and Charlotte GOV Channel — featuring instant fuzzy search, roll-call voting records, timecoded spoken transcripts, and campaign finance disclosures.
              </p>
              <div className="flex flex-wrap gap-2 pt-1">
                <span className="text-xs bg-white/10 px-3 py-1.5 rounded-lg font-medium">1,200+ Recorded Votes</span>
                <span className="text-xs bg-white/10 px-3 py-1.5 rounded-lg font-medium">100% SEAP Co-Sponsor</span>
                <span className="text-xs bg-white/10 px-3 py-1.5 rounded-lg font-medium">$4.17B Balanced Budgets</span>
                <span className="text-xs bg-white/10 px-3 py-1.5 rounded-lg font-medium">Timecoded YouTube Transcripts</span>
              </div>
              <div className="flex flex-wrap gap-3 pt-3">
                <Link
                  href="/council-wiki"
                  className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-md transition"
                >
                  Launch Council Hub &amp; Wiki
                </Link>
                <Link
                  href="/council-wiki#finance"
                  className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-sm transition"
                >
                  Campaign Finance Ledger
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5 bg-white/10 p-6 rounded-2xl border border-white/15 backdrop-blur space-y-4">
              <div className="flex justify-between items-center text-xs font-semibold text-white/80">
                <span>Live Data Pipeline</span>
                <span className="flex items-center gap-1 text-emerald-400 font-bold">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" /> In Sync
                </span>
              </div>
              <div className="p-3 bg-slate-900/60 rounded-xl space-y-1">
                <div className="text-[11px] font-bold text-amber-400 uppercase">Granicus Legistar API</div>
                <p className="text-xs text-slate-200">Full Council • Zoning • Budget • SEAP Committee Work Sessions</p>
              </div>
              <div className="p-3 bg-slate-900/60 rounded-xl space-y-1">
                <div className="text-[11px] font-bold text-rose-400 uppercase">Charlotte GOV Streams</div>
                <p className="text-xs text-slate-200">Spoken Transcripts &amp; Direct Timecoded Jump Links</p>
              </div>
              <Link
                href="/council-wiki"
                className="block text-center w-full py-2.5 rounded-xl bg-white text-slate-900 font-bold text-xs hover:bg-slate-100 transition"
              >
                Search Official Archive &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Live Instagram Feed Section */}
      <section id="social" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-8 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-purple-100 via-rose-100 to-amber-100 dark:from-purple-950 dark:via-rose-950 dark:to-amber-950 text-rose-800 dark:text-rose-300 text-xs font-bold uppercase tracking-wider">
            <Instagram className="w-3.5 h-3.5" /> Social Media Live Stream
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
            Follow the Campaign on Instagram
          </h2>
          <p className="text-sm text-slate-500">
            Real-time updates, community meetings, council votes, and behind-the-scenes on the campaign trail.
          </p>
        </div>

        <InstagramFeed />
      </section>

      {/* 7. Key Priorities Grid */}
      <section id="priorities" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">Core Agenda</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
            Priorities for Charlotte’s Working Families
          </h2>
          <p className="text-sm text-slate-500">
            Proven leadership addressing our city's most critical public safety, environmental, and economic challenges.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {PRIORITIES.map((p) => {
            const Icon = p.icon;
            return (
              <Link
                key={p.id}
                href={p.href}
                className="group p-8 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm hover:shadow-md transition flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className={`w-12 h-12 rounded-2xl ${p.bgLight} ${p.textColor} flex items-center justify-center`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400">{p.subtitle}</span>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition mt-0.5">
                      {p.title}
                    </h3>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {p.description}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-bold text-emerald-700 dark:text-emerald-400">
                  <span>Explore Detailed Policy Plan</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* 8. Expanded Community Photo Gallery */}
      <section id="gallery" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-8 space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">On The Ground</span>
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
            Community &amp; Activism Photo Gallery
          </h2>
          <p className="text-xs text-slate-500">
            Click any image to view in full resolution with event details.
          </p>
        </div>

        {/* Gallery Filter Chips */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {[
            { id: "all", label: "All Photos" },
            { id: "leadership", label: "Leadership" },
            { id: "community", label: "Neighborhoods & Civic" },
            { id: "environment", label: "Environmental Action" },
            { id: "safety", label: "Public Safety" },
            { id: "campaign", label: "Campaign Trail" }
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setGalleryFilter(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                galleryFilter === cat.id
                  ? "bg-emerald-700 text-white shadow"
                  : "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGallery.map((photo, idx) => (
            <div
              key={idx}
              onClick={() => setSelectedPhoto(photo)}
              className="cursor-pointer group rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm hover:shadow-md transition"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-slate-100 dark:bg-slate-800">
                <img
                  src={photo.src}
                  alt={photo.title}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition duration-300"
                />
                <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                  <Maximize2 className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="p-4 text-center space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                  {photo.tagLabel}
                </span>
                <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 line-clamp-1">
                  {photo.title}
                </h4>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div
          onClick={() => setSelectedPhoto(null)}
          className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white dark:bg-slate-900 rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800 relative animate-in zoom-in-95 duration-200"
          >
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-slate-900/60 text-white hover:bg-slate-900 transition"
              aria-label="Close photo"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="max-h-[60vh] bg-slate-950 flex items-center justify-center">
              <img
                src={selectedPhoto.src}
                alt={selectedPhoto.title}
                className="max-h-[60vh] w-auto object-contain"
              />
            </div>
            <div className="p-6 space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                {selectedPhoto.tag}
              </span>
              <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                {selectedPhoto.title}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                {selectedPhoto.desc}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 9. Media Video Clips */}
      <section id="media" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-rose-700 dark:text-rose-400">Policy in Action</span>
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
            Dimple in Action: Policy Briefings
          </h2>
          <p className="text-xs text-slate-500">
            Watch Council Member Ajmera discuss municipal water security and regional infrastructure.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
            <video
              controls
              poster="/assets/images/Dimple_Ajmera_Charlotte_Councilmember_2025.jpg"
              className="w-full aspect-video bg-black object-cover"
            >
              <source src="/assets/images/Clip 1 - Data Center Wave.mp4" type="video/mp4" />
            </video>
            <div className="p-6 space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-rose-600 bg-rose-50 dark:bg-rose-950/40 px-2.5 py-1 rounded-full">
                Video Briefing 1
              </span>
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                Data Center Expansion &amp; Municipal Water Protection
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Council Member Ajmera outlines proactive safeguards to protect Charlotte's municipal water supplies from industrial data center cooling demands.
              </p>
            </div>
          </div>

          <div className="rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
            <video
              controls
              poster="/assets/images/hero_slide_8.jpg"
              className="w-full aspect-video bg-black object-cover"
            >
              <source src="/assets/images/Clip 2 - Policies for Water Demand.mp4" type="video/mp4" />
            </video>
            <div className="p-6 space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-1 rounded-full">
                Video Briefing 2
              </span>
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                Municipal Water Demand Policies &amp; Conservation
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Deep dive into long-term infrastructure planning to secure clean drinking water for the next generation of Charlotte residents.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 10. Endorsements Strip */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center space-y-6">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Broad Coalition Support</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100">
            Endorsed by 38+ Leaders Across Charlotte
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
            Supported by Mayor Vi Lyles, Hugh McColl, Mecklenburg County Commissioners, community advocates, and labor leaders across our city.
          </p>
          <div className="pt-2">
            <Link
              href="/endorsements"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white dark:bg-slate-100 dark:text-slate-900 font-bold text-sm shadow transition"
            >
              View Full Endorsements Roster <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 11. Grassroots Volunteer Callout */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-rose-700 to-red-800 text-white shadow-xl text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Be Part of Our Grassroots Movement
          </h2>
          <p className="text-sm sm:text-base text-rose-100 max-w-xl mx-auto">
            From canvassing neighborhoods to hosting lawn signs and phone banks, every volunteer makes a difference for Charlotte.
          </p>

          <form onSubmit={handleVolunteerSubmit} className="max-w-md mx-auto flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              required
              value={volunteerEmail}
              onChange={(e) => setVolunteerEmail(e.target.value)}
              placeholder="Enter your email address..."
              className="flex-1 px-4 py-3 rounded-xl text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-slate-950 hover:bg-slate-900 text-white font-bold text-sm shadow transition shrink-0"
            >
              Sign Up
            </button>
          </form>

          {volunteerSuccess && (
            <div className="text-xs font-semibold text-white bg-white/20 py-2 px-4 rounded-xl inline-block">
              ✓ Thank you! We will be in touch with grassroots volunteer opportunities.
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
