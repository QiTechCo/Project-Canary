export interface AjmeraVote {
  matterId?: number;
  matterFile?: string;
  title: string;
  actionName: string;
  ajmeraVote: "Aye" | "Nay" | "Sponsor" | "Abstain" | "Absent" | string;
  result: string;
}

export interface TranscriptSnippet {
  timestamp: number; // in seconds
  duration?: number;
  text: string;
}

export interface CouncilRecord {
  id: string;
  eventId?: number;
  date: string;
  body: string;
  term: string;
  title: string;
  summary: string;
  tags: string[];
  votesText: string;        // Flattened list of motions & vote outcomes
  transcriptText: string;   // Spoken words & timestamps
  agendaStatus?: string;
  minutesUrl?: string;
  agendaUrl?: string;
  inInsiteUrl?: string;
  videoUrl?: string;
  ajmeraVotes: AjmeraVote[];
  transcripts: TranscriptSnippet[];
}

export interface DashboardMetrics {
  totalVotesCast: number;
  ayeVotes: number;
  nayVotes: number;
  seapInitiatives: number;
  budgetSessionsChaired: number;
  housingFundAllocated: string;
  termsServed: number;
}

export type LegislativeTerm =
  | "All Terms"
  | "District 5 (2017)"
  | "At-Large (2017–2019)"
  | "At-Large (2019–2022)"
  | "At-Large (2022–2023)"
  | "At-Large (2023–2025)"
  | "At-Large (2025–Present)";
