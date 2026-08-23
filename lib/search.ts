import MiniSearch from "minisearch";
import { CouncilRecord } from "@/types/council";

export type { CouncilRecord };

export function createCouncilSearchIndex(documents: CouncilRecord[]): MiniSearch<CouncilRecord> {
  const miniSearch = new MiniSearch<CouncilRecord>({
    fields: ["title", "summary", "tags", "votesText", "transcriptText"], // Fields indexed for full-text
    storeFields: [
      "id",
      "eventId",
      "title",
      "date",
      "body",
      "term",
      "summary",
      "tags",
      "votesText",
      "transcriptText",
      "agendaStatus",
      "minutesUrl",
      "agendaUrl",
      "inInsiteUrl",
      "videoUrl",
      "ajmeraVotes",
      "transcripts"
    ], // Fields returned in search output
    searchOptions: {
      boost: {
        title: 3,         // Title matches rank highest
        tags: 2.5,        // Specific topic tags rank second
        votesText: 2,     // Motions and votes rank third
        summary: 1.5,
        transcriptText: 1 // Spoken transcript snippets
      },
      prefix: true,       // Matches partial terms (e.g. "east" matches "Eastland")
      fuzzy: 0.2          // Handles minor typos or phonetic transcript errors
    }
  });

  miniSearch.addAll(documents);
  return miniSearch;
}
