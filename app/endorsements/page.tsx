import React from "react";
import Link from "next/link";
import { Award, Users, ArrowRight, Heart } from "lucide-react";

export const metadata = {
  title: "Endorsements | Dimple Ajmera for Charlotte",
  description: "Official endorsements for Dimple Ajmera for Charlotte City Council from community leaders, elected officials, and labor organizations."
};

export default function EndorsementsPage() {
  const DONATE_URL = "https://secure.actblue.com/donate/dimple-ajmera-for-city-council-1";

  const LEADERS = [
    { name: "Vi Lyles", title: "Mayor of Charlotte", category: "Elected Official" },
    { name: "Hugh McColl", title: "Former Chairman & CEO, Bank of America", category: "Business & Civic Leader" },
    { name: "Susan Rodriguez McDowell", title: "Mecklenburg County Commissioner (District 6)", category: "County Official" },
    { name: "George Dunlap", title: "Chairman, Mecklenburg Board of County Commissioners", category: "County Official" },
    { name: "Malcolm Graham", title: "Charlotte City Council Member (District 2)", category: "Council Colleague" },
    { name: "Danté Anderson", title: "Charlotte City Council Member (District 1)", category: "Council Colleague" },
    { name: "Marjorie Molina", title: "Charlotte City Council Member (District 5)", category: "Council Colleague" },
    { name: "Nasif Majeed", title: "NC House Representative (District 99)", category: "State Legislator" },
    { name: "Becky Carney", title: "NC House Representative (District 102)", category: "State Legislator" },
    { name: "Terry Brown", title: "NC House Representative (District 92)", category: "State Legislator" },
    { name: "Carolyn Logan", title: "NC House Representative (District 101)", category: "State Legislator" },
    { name: "Laura Meier", title: "Mecklenburg County Commissioner (District 5)", category: "County Official" },
    { name: "Leigh Altman", title: "Mecklenburg County Commissioner At-Large", category: "County Official" },
    { name: "Arthur Griffin", title: "Mecklenburg County Commissioner At-Large", category: "County Official" },
    { name: "Pat Cotham", title: "Former Mecklenburg County Commissioner", category: "County Leader" },
    { name: "Vilma Leake", title: "Mecklenburg County Commissioner (District 2)", category: "County Official" },
    { name: "Elyse Dashew", title: "Former Chair, Charlotte-Mecklenburg School Board", category: "Education Leader" },
    { name: "Jennifer De La Jara", title: "CMS School Board Member At-Large", category: "Education Leader" },
    { name: "Lenora Shipp", title: "CMS School Board Member At-Large", category: "Education Leader" },
    { name: "Stephanie Sneed", title: "CMS School Board Chair", category: "Education Leader" },
    { name: "Dr. Monty Witherspoon", title: "CMS School Board Member (District 2)", category: "Education Leader" },
    { name: "Colette Forrest", title: "Grassroots Community Leader & Activist", category: "Community Leader" },
    { name: "Ameena Batada", title: "Public Health Professor & Community Advocate", category: "Community Leader" },
    { name: "Reverend Ricky Woods", title: "Senior Pastor, First Baptist Church-West", category: "Faith Leader" },
    { name: "Dr. Patrick Graham", title: "Workforce & Equity Leader", category: "Community Leader" },
    { name: "Braxton Winston", title: "Former Mayor Pro Tem, City of Charlotte", category: "Civic Leader" },
    { name: "Larken Egleston", title: "Former Charlotte City Council Member", category: "Civic Leader" },
    { name: "Greg Phipps", title: "Former Charlotte City Council Member", category: "Civic Leader" },
    { name: "Julie Eiselt", title: "Former Mayor Pro Tem, City of Charlotte", category: "Civic Leader" },
    { name: "James 'Smuggie' Mitchell", title: "Charlotte City Council Member At-Large", category: "Council Colleague" },
    { name: "Victoria Watlington", title: "Charlotte City Council Member (District 3)", category: "Council Colleague" },
    { name: "Tariq Bokhari", title: "Charlotte City Council Member (District 6)", category: "Council Colleague" },
    { name: "Ed Driggs", title: "Charlotte City Council Member (District 7)", category: "Council Colleague" },
    { name: "Ray McKinnon", title: "Faith Leader & Housing Advocate", category: "Faith Leader" },
    { name: "John Autry", title: "Former NC House Representative & Council Member", category: "Civic Leader" },
    { name: "Dan Clodfelter", title: "Former Mayor & NC State Senator", category: "Civic Leader" },
    { name: "Harvey Gantt", title: "First African American Mayor of Charlotte", category: "Historical Civic Leader" }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-xs font-bold uppercase tracking-wider">
          <Award className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400" /> Broad Citywide Coalition
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
          Endorsements for Dimple Ajmera
        </h1>
        <p className="text-base text-slate-600 dark:text-slate-400 leading-relaxed">
          Proudly endorsed by Mayor Vi Lyles, Hugh McColl, Mecklenburg County Commissioners, community leaders, and working families across Charlotte.
        </p>
      </div>

      {/* Featured Quote Card */}
      <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-950 to-emerald-950 text-white shadow-xl max-w-4xl mx-auto">
        <div className="space-y-4">
          <div className="text-emerald-400 text-3xl font-serif">“</div>
          <p className="text-lg sm:text-xl font-medium leading-relaxed italic text-slate-100 -mt-4">
            Dimple Ajmera has demonstrated steady fiscal leadership, unwavering commitment to environmental sustainability, and a fierce dedication to the working families of Charlotte. Her track record as Budget Chair speaks for itself.
          </p>
          <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
            <div>
              <strong className="text-white font-bold block">Mayor Vi Lyles</strong>
              <span className="text-xs text-emerald-400">Mayor of Charlotte</span>
            </div>
            <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Official Endorsement</div>
          </div>
        </div>
      </div>

      {/* Endorsements Roster Grid */}
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Users className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            38+ Community &amp; Elected Endorsers
          </h2>
          <span className="text-xs font-semibold text-slate-500">Mecklenburg County &amp; Regional</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {LEADERS.map((leader, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm hover:shadow transition space-y-1.5"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded">
                  {leader.category}
                </span>
                <Award className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                {leader.name}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {leader.title}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="p-8 rounded-3xl bg-slate-100 dark:bg-slate-900 text-center space-y-4 max-w-2xl mx-auto">
        <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">
          Stand With Us for Charlotte
        </h3>
        <p className="text-xs text-slate-500">
          Join our campaign team today or contribute to help reach voters in every precinct.
        </p>
        <div className="flex flex-wrap justify-center gap-3 pt-2">
          <a
            href={DONATE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow transition flex items-center gap-1.5"
          >
            <Heart className="w-3.5 h-3.5 fill-white" /> Donate
          </a>
          <Link
            href="/volunteer"
            className="px-6 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow transition flex items-center gap-1.5"
          >
            Volunteer with Us
          </Link>
        </div>
      </div>
    </div>
  );
}
