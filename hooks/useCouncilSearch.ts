"use client";

import { useMemo, useState } from "react";
import { CouncilRecord } from "@/types/council";
import { createCouncilSearchIndex } from "@/lib/search";

export interface SearchFilterState {
  query: string;
  selectedTag: string | null;
  selectedVoteType: string | null;
  selectedTerm: string | null;
  selectedBody: string | null;
}

export function useCouncilSearch(initialData: CouncilRecord[]) {
  const [query, setQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [selectedVoteType, setSelectedVoteType] = useState<string | null>(null);
  const [selectedTerm, setSelectedTerm] = useState<string | null>(null);
  const [selectedBody, setSelectedBody] = useState<string | null>(null);

  // Initialize the index once per dataset
  const searchIndex = useMemo(() => {
    return createCouncilSearchIndex(initialData);
  }, [initialData]);

  // Execute full-text query or fallback to default dataset
  const results = useMemo(() => {
    let filtered = initialData;

    if (query.trim()) {
      const searchResults = searchIndex.search(query);
      const idMap = new Map(initialData.map((item) => [item.id, item]));
      filtered = searchResults
        .map((res) => idMap.get(res.id))
        .filter((item): item is CouncilRecord => item !== undefined);
    }

    if (selectedTag) {
      filtered = filtered.filter((item) => item.tags.includes(selectedTag));
    }

    if (selectedTerm && selectedTerm !== "All Terms") {
      filtered = filtered.filter((item) => item.term === selectedTerm);
    }

    if (selectedBody) {
      filtered = filtered.filter((item) => {
        const bodyLower = item.body.toLowerCase();
        const selLower = selectedBody.toLowerCase();

        if (selLower === "environment") {
          return (
            bodyLower.includes("environment") ||
            bodyLower.includes("seap") ||
            item.tags.some((t) =>
              t.includes("seap") ||
              t.includes("environment") ||
              t.includes("climate") ||
              t.includes("water") ||
              t.includes("tree-canopy")
            ) ||
            item.title.toLowerCase().includes("seap") ||
            item.title.toLowerCase().includes("environment") ||
            item.title.toLowerCase().includes("climate") ||
            item.title.toLowerCase().includes("tree") ||
            item.title.toLowerCase().includes("water")
          );
        }

        if (selLower === "budget") {
          return (
            bodyLower.includes("budget") ||
            item.tags.some((t) => t.includes("budget") || t.includes("finance")) ||
            item.title.toLowerCase().includes("budget")
          );
        }

        if (selLower === "transportation") {
          return (
            bodyLower.includes("transportation") ||
            bodyLower.includes("transit") ||
            item.tags.some((t) => t.includes("transit") || t.includes("transportation")) ||
            item.title.toLowerCase().includes("transit") ||
            item.title.toLowerCase().includes("corridor")
          );
        }

        if (selLower === "city council") {
          return bodyLower.includes("council");
        }

        return bodyLower.includes(selLower);
      });
    }

    if (selectedVoteType) {
      filtered = filtered.filter((item) =>
        item.ajmeraVotes.some((vote) =>
          vote.ajmeraVote.toLowerCase().includes(selectedVoteType.toLowerCase()) ||
          vote.actionName.toLowerCase().includes(selectedVoteType.toLowerCase())
        )
      );
    }

    return filtered;
  }, [query, selectedTag, selectedTerm, selectedBody, selectedVoteType, searchIndex, initialData]);

  const clearAllFilters = () => {
    setQuery("");
    setSelectedTag(null);
    setSelectedVoteType(null);
    setSelectedTerm(null);
    setSelectedBody(null);
  };

  return {
    query,
    setQuery,
    selectedTag,
    setSelectedTag,
    selectedVoteType,
    setSelectedVoteType,
    selectedTerm,
    setSelectedTerm,
    selectedBody,
    setSelectedBody,
    clearAllFilters,
    results,
    totalIndexed: initialData.length
  };
}
