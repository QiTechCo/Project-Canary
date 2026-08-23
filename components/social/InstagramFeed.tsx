"use client";

import React, { useState } from "react";
import {
  Instagram,
  Heart,
  MessageCircle,
  ExternalLink,
  Share2,
  CheckCircle2,
  Maximize2,
  X
} from "lucide-react";

export interface InstagramPost {
  id: string;
  permalink: string;
  mediaUrl: string;
  caption: string;
  timestamp: string;
  likes: number;
  comments: number;
  category: "council" | "community" | "environment" | "campaign";
  location?: string;
}

const INSTAGRAM_POSTS: InstagramPost[] = [
  {
    id: "post-1",
    permalink: "https://www.instagram.com/dimpleajmera/",
    mediaUrl: "/assets/images/gallery_community_1.jpg",
    caption: "Honored to join our Charlotte neighbors and local business owners along the West Boulevard corridor. Investing in our Corridors of Opportunity means creating real economic mobility for every family. 🏙️✨ #CharlotteNC #CLT #CorridorsOfOpportunity #DimpleAjmera",
    timestamp: "2 days ago",
    likes: 342,
    comments: 28,
    category: "community",
    location: "West Boulevard Corridor, Charlotte"
  },
  {
    id: "post-2",
    permalink: "https://www.instagram.com/dimpleajmera/",
    mediaUrl: "/assets/images/hero_slide_8.jpg",
    caption: "Water is life. At tonight’s environmental forum, we laid out concrete policies to safeguard our Catawba River basin and ensure sustainable cooling standards for regional data centers. 💧🌿 #CleanWater #SEAP #ClimateAction #CharlotteCouncil",
    timestamp: "4 days ago",
    likes: 519,
    comments: 41,
    category: "environment",
    location: "Catawba Riverkeeper Center"
  },
  {
    id: "post-3",
    permalink: "https://www.instagram.com/dimpleajmera/",
    mediaUrl: "/assets/images/dimple_hugh_mccoll.jpg",
    caption: "Invaluable discussion with banking and civic icon Hugh McColl on Charlotte’s financial future, balancing our municipal budget, and preserving our AAA bond rating while funding affordable housing. 🏛️📈 #FiscalStewardship #AffordableHousing #CharlotteEconomy",
    timestamp: "1 week ago",
    likes: 684,
    comments: 53,
    category: "council",
    location: "Uptown Charlotte"
  },
  {
    id: "post-4",
    permalink: "https://www.instagram.com/dimpleajmera/",
    mediaUrl: "/assets/images/gallery_community_2.jpg",
    caption: "Our first responders put their lives on the line for us every single day. Proud to lead the fight as Budget Chair for competitive wages, mental health crisis teams, and family healthcare coverage for CMPD & CFD. 🚒👮‍♀️ #PublicSafety #FirstResponders #CLT",
    timestamp: "1 week ago",
    likes: 428,
    comments: 36,
    category: "council",
    location: "Charlotte Fire Dept Station 1"
  },
  {
    id: "post-5",
    permalink: "https://www.instagram.com/dimpleajmera/",
    mediaUrl: "/assets/images/gallery_community_5.jpg",
    caption: "Grassroots energy is unstoppable! Huge thank you to all our volunteers who came out to knock doors and register voters across District 5 today. Join Team Dimple! 🗳️🙌 #TeamDimple #Grassroots #Vote2026 #CharlotteElections",
    timestamp: "2 weeks ago",
    likes: 495,
    comments: 47,
    category: "campaign",
    location: "East Charlotte Community HQ"
  },
  {
    id: "post-6",
    permalink: "https://www.instagram.com/dimpleajmera/",
    mediaUrl: "/assets/images/dimple_susan_rodriguez_mcdowell.jpg",
    caption: "Teamwork in action: working closely with Mecklenburg County Commissioner Susan Rodriguez McDowell on county-city joint investments in maternal healthcare and parkland preservation. 🤝🌳 #MecklenburgCounty #CityCouncil #PublicService",
    timestamp: "2 weeks ago",
    likes: 387,
    comments: 29,
    category: "council",
    location: "Charlotte-Mecklenburg Government Center"
  },
  {
    id: "post-7",
    permalink: "https://www.instagram.com/dimpleajmera/",
    mediaUrl: "/assets/images/gallery_community_7.jpg",
    caption: "Tree canopy protection is climate action and neighborhood equity. Celebrating new heritage tree plantings with our local youth conservation corps! 🌳🍃 #UrbanForest #TreeCanopy #UDO #GreenCharlotte",
    timestamp: "3 weeks ago",
    likes: 561,
    comments: 38,
    category: "environment",
    location: "Freedom Park, Charlotte"
  },
  {
    id: "post-8",
    permalink: "https://www.instagram.com/dimpleajmera/",
    mediaUrl: "/assets/images/gallery_community_4.jpg",
    caption: "Speaking to our next generation of leaders at CMS! Investing in public education, youth mentorship, and community recreation centers creates the foundation for Charlotte’s future. 🎓📚 #CMS #YouthLeadership #FutureOfCLT",
    timestamp: "3 weeks ago",
    likes: 612,
    comments: 52,
    category: "community",
    location: "Charlotte-Mecklenburg Schools"
  }
];

export function InstagramFeed() {
  const [filter, setFilter] = useState<string>("all");
  const [selectedPost, setSelectedPost] = useState<InstagramPost | null>(null);
  const [likedPosts, setLikedPosts] = useState<Record<string, boolean>>({});

  const filteredPosts = filter === "all"
    ? INSTAGRAM_POSTS
    : INSTAGRAM_POSTS.filter((p) => p.category === filter);

  const toggleLike = (id: string) => {
    setLikedPosts((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="space-y-8">
      {/* Profile Header Strip */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4 text-center sm:text-left">
          <div className="relative">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full p-1 bg-gradient-to-tr from-emerald-500 via-teal-500 to-emerald-700">
              <img
                src="/assets/images/dimple_newest_crop.jpg"
                alt="Dimple Ajmera Instagram"
                className="w-full h-full rounded-full object-cover border-2 border-white dark:border-slate-900"
              />
            </div>
            <div className="absolute bottom-0 right-0 w-6 h-6 rounded-full bg-emerald-700 text-white flex items-center justify-center border-2 border-white dark:border-slate-900 shadow">
              <Instagram className="w-3 h-3 text-white" />
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-slate-100">
                @dimpleajmera
              </h3>
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 fill-emerald-500/20" />
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Dimple Ajmera • Charlotte City Council Member At-Large • CPA • Mom • Fighter
            </p>
            <div className="flex items-center justify-center sm:justify-start gap-4 text-xs font-semibold text-slate-600 dark:text-slate-300 pt-1">
              <span><strong>1,200+</strong> Votes</span>
              <span><strong>4</strong> Terms</span>
              <span><strong>100%</strong> SEAP Score</span>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <a
            href="https://www.instagram.com/dimpleajmera"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-md transition transform hover:-translate-y-0.5"
          >
            <Instagram className="w-4 h-4 text-white" /> Follow on Instagram
          </a>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-3">
        <div className="flex flex-wrap gap-1.5">
          {[
            { id: "all", label: "All Posts" },
            { id: "council", label: "On Council" },
            { id: "community", label: "Community & Civic" },
            { id: "environment", label: "Clean Water & SEAP" },
            { id: "campaign", label: "Campaign Trail" }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition ${
                filter === tab.id
                  ? "bg-emerald-700 text-white shadow-sm"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="text-[11px] font-semibold text-slate-400">
          Showing {filteredPosts.length} posts
        </div>
      </div>

      {/* Responsive Instagram Card Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredPosts.map((post) => {
          const isLiked = likedPosts[post.id];
          return (
            <div
              key={post.id}
              className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm hover:shadow-md transition overflow-hidden flex flex-col justify-between group"
            >
              {/* Card Header */}
              <div className="p-3.5 flex items-center justify-between border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2.5">
                  <img
                    src="/assets/images/dimple_newest_crop.jpg"
                    alt="Dimple"
                    className="w-7 h-7 rounded-full object-cover border border-slate-200"
                  />
                  <div>
                    <span className="text-xs font-bold text-slate-900 dark:text-slate-100 block leading-tight">
                      dimpleajmera
                    </span>
                    {post.location && (
                      <span className="text-[10px] text-slate-400 block leading-none truncate max-w-[130px]">
                        {post.location}
                      </span>
                    )}
                  </div>
                </div>
                <a
                  href={post.permalink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-600 dark:text-emerald-400 hover:text-emerald-800 transition p-1"
                  aria-label="View on Instagram"
                >
                  <Instagram className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                </a>
              </div>

              {/* Media Image with Hover Action */}
              <div
                onClick={() => setSelectedPost(post)}
                className="relative aspect-square bg-slate-100 dark:bg-slate-800 cursor-pointer overflow-hidden"
              >
                <img
                  src={post.mediaUrl}
                  alt={post.caption}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                />
                <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-4 text-white font-bold text-xs">
                  <span className="flex items-center gap-1.5"><Heart className="w-4 h-4 fill-emerald-400 text-emerald-400" /> {post.likes + (isLiked ? 1 : 0)}</span>
                  <span className="flex items-center gap-1.5"><MessageCircle className="w-4 h-4 text-emerald-400 fill-emerald-400/20" /> {post.comments}</span>
                  <Maximize2 className="w-4 h-4 text-emerald-400" />
                </div>
              </div>

              {/* Card Footer & Caption */}
              <div className="p-4 space-y-2.5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-slate-600 dark:text-slate-300 pb-2">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => toggleLike(post.id)}
                        className={`transition ${isLiked ? "text-emerald-600 scale-110" : "text-emerald-600 dark:text-emerald-400 hover:text-emerald-800"}`}
                        aria-label="Like post"
                      >
                        <Heart className={`w-4 h-4 text-emerald-600 dark:text-emerald-400 ${isLiked ? "fill-emerald-600" : ""}`} />
                      </button>
                      <button
                        onClick={() => setSelectedPost(post)}
                        className="text-emerald-600 dark:text-emerald-400 hover:text-emerald-800 transition"
                        aria-label="Comment"
                      >
                        <MessageCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                      </button>
                      <a
                        href={post.permalink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-emerald-600 dark:text-emerald-400 hover:text-emerald-800 transition"
                        aria-label="Share"
                      >
                        <Share2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                      </a>
                    </div>
                    <span className="text-[10px] font-semibold text-slate-400">{post.timestamp}</span>
                  </div>

                  <div className="text-xs font-bold text-slate-900 dark:text-slate-100 mb-1">
                    {post.likes + (isLiked ? 1 : 0)} likes
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-3 leading-relaxed">
                    <strong className="text-slate-900 dark:text-slate-200 mr-1.5">dimpleajmera</strong>
                    {post.caption}
                  </p>
                </div>

                <a
                  href={post.permalink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] font-bold text-emerald-700 dark:text-emerald-400 hover:underline inline-flex items-center gap-1 pt-1"
                >
                  View post on Instagram <ExternalLink className="w-2.5 h-2.5 text-emerald-600 dark:text-emerald-400" />
                </a>
              </div>
            </div>
          );
        })}
      </div>

      {/* Lightbox / Post Modal */}
      {selectedPost && (
        <div
          onClick={() => setSelectedPost(null)}
          className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white dark:bg-slate-900 rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800 relative grid grid-cols-1 md:grid-cols-12 animate-in zoom-in-95 duration-200"
          >
            <button
              onClick={() => setSelectedPost(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-slate-900/60 text-white hover:bg-slate-900 transition"
              aria-label="Close"
            >
              <X className="w-5 h-5 text-emerald-400" />
            </button>

            {/* Media Column */}
            <div className="md:col-span-7 bg-slate-950 flex items-center justify-center max-h-[70vh]">
              <img
                src={selectedPost.mediaUrl}
                alt={selectedPost.caption}
                className="max-h-[70vh] w-full object-contain"
              />
            </div>

            {/* Content Column */}
            <div className="md:col-span-5 p-6 flex flex-col justify-between space-y-4">
              <div className="space-y-4">
                <div className="flex items-center gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
                  <img
                    src="/assets/images/dimple_newest_crop.jpg"
                    alt="Dimple"
                    className="w-10 h-10 rounded-full object-cover border"
                  />
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1">
                      dimpleajmera <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 fill-emerald-500/20" />
                    </h4>
                    <span className="text-[11px] text-slate-400">{selectedPost.location || "Charlotte, NC"}</span>
                  </div>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed max-h-[35vh] overflow-y-auto pr-1">
                  <strong className="text-slate-900 dark:text-slate-100 mr-1.5">dimpleajmera</strong>
                  {selectedPost.caption}
                </p>
              </div>

              <div className="space-y-3 pt-3 border-t border-slate-100 dark:border-slate-800">
                <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
                  <span>{selectedPost.likes} likes • {selectedPost.comments} comments</span>
                  <span>{selectedPost.timestamp}</span>
                </div>
                <a
                  href={selectedPost.permalink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow text-center block transition"
                >
                  Open Original Post on Instagram &rarr;
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
