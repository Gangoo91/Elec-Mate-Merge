/**
 * Hook for education programme search with debouncing and recent searches
 */

import { useState, useEffect, useCallback, useMemo } from "react";
import type { LiveEducationData } from "@/hooks/useLiveEducationData";

const RECENT_SEARCHES_KEY = "elecmate_education_recent_searches";
const MAX_RECENT_SEARCHES = 5;

export interface EducationFilters {
  category: string;
  level: string;
  studyMode: string;
  location: string;
  sortBy: "rating" | "employment" | "title" | "duration" | "fees";
}

const DEFAULT_FILTERS: EducationFilters = {
  category: "",
  level: "",
  studyMode: "",
  location: "",
  sortBy: "rating",
};

export interface QuickFilter {
  id: string;
  label: string;
  active: boolean;
  apply: (programmes: LiveEducationData[]) => LiveEducationData[];
}

export const useEducationSearch = (
  programmes: LiveEducationData[],
  debounceMs: number = 300
) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [filters, setFilters] = useState<EducationFilters>(DEFAULT_FILTERS);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  // Load recent searches from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(RECENT_SEARCHES_KEY);
      if (stored) {
        setRecentSearches(JSON.parse(stored));
      }
    } catch (error) {
      console.error("Failed to load recent searches:", error);
    }
  }, []);

  // Debounce search term
  useEffect(() => {
    setIsSearching(searchTerm.length >= 2);
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
      setIsSearching(false);
    }, debounceMs);

    return () => clearTimeout(timer);
  }, [searchTerm, debounceMs]);

  // Save search to recent searches
  const saveToRecentSearches = useCallback((term: string) => {
    if (term.trim().length < 2) return;

    setRecentSearches((prev) => {
      const filtered = prev.filter(
        (s) => s.toLowerCase() !== term.toLowerCase()
      );
      const updated = [term, ...filtered].slice(0, MAX_RECENT_SEARCHES);

      try {
        localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(updated));
      } catch (error) {
        console.error("Failed to save recent searches:", error);
      }

      return updated;
    });
  }, []);

  // Clear recent searches
  const clearRecentSearches = useCallback(() => {
    setRecentSearches([]);
    localStorage.removeItem(RECENT_SEARCHES_KEY);
  }, []);

  // Apply search and filters
  const filteredProgrammes = useMemo(() => {
    let result = [...programmes];

    // Apply text search
    if (debouncedSearchTerm.length >= 2) {
      const searchLower = debouncedSearchTerm.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(searchLower) ||
          p.institution.toLowerCase().includes(searchLower) ||
          p.description.toLowerCase().includes(searchLower) ||
          p.keyTopics.some((t) => t.toLowerCase().includes(searchLower)) ||
          p.category.toLowerCase().includes(searchLower)
      );
    }

    // Apply category filter
    if (filters.category) {
      result = result.filter((p) => p.category === filters.category);
    }

    // Apply level filter
    if (filters.level) {
      result = result.filter((p) => p.level === filters.level);
    }

    // Apply study mode filter
    if (filters.studyMode) {
      result = result.filter((p) => p.studyMode === filters.studyMode);
    }

    // Apply location filter
    if (filters.location) {
      const locationLower = filters.location.toLowerCase();
      result = result.filter((p) =>
        p.locations.some((loc) => loc.toLowerCase().includes(locationLower))
      );
    }

    // Apply sorting
    switch (filters.sortBy) {
      case "rating":
        result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case "employment":
        result.sort(
          (a, b) => (b.employmentRate || 0) - (a.employmentRate || 0)
        );
        break;
      case "title":
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "duration":
        result.sort((a, b) => {
          const aDuration = parseInt(a.duration.match(/\d+/)?.[0] || "0");
          const bDuration = parseInt(b.duration.match(/\d+/)?.[0] || "0");
          return aDuration - bDuration;
        });
        break;
      case "fees":
        result.sort((a, b) => {
          const aFees = parseInt(a.tuitionFees.replace(/[^\d]/g, "") || "0");
          const bFees = parseInt(b.tuitionFees.replace(/[^\d]/g, "") || "0");
          return aFees - bFees;
        });
        break;
    }

    return result;
  }, [programmes, debouncedSearchTerm, filters]);

  // Quick filter definitions
  const quickFilters: QuickFilter[] = useMemo(
    () => [
      {
        id: "high-rated",
        label: "Top Rated",
        active: false,
        apply: (p) => p.filter((prog) => (prog.rating || 0) >= 4.5),
      },
      {
        id: "high-demand",
        label: "High Demand",
        active: false,
        apply: (p) => p.filter((prog) => (prog.employmentRate || 0) >= 90),
      },
      {
        id: "online",
        label: "Online",
        active: false,
        apply: (p) =>
          p.filter(
            (prog) =>
              prog.studyMode === "Distance Learning" ||
              prog.studyMode === "Online"
          ),
      },
      {
        id: "part-time",
        label: "Part-time",
        active: false,
        apply: (p) =>
          p.filter(
            (prog) =>
              prog.studyMode === "Part-time" || prog.studyMode === "Flexible"
          ),
      },
    ],
    []
  );

  // Get unique categories with counts
  const categories = useMemo(() => {
    const categoryMap = new Map<string, number>();
    programmes.forEach((p) => {
      const count = categoryMap.get(p.category) || 0;
      categoryMap.set(p.category, count + 1);
    });
    return Array.from(categoryMap.entries())
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);
  }, [programmes]);

  // Get unique levels with counts
  const levels = useMemo(() => {
    const levelMap = new Map<string, number>();
    programmes.forEach((p) => {
      const count = levelMap.get(p.level) || 0;
      levelMap.set(p.level, count + 1);
    });
    return Array.from(levelMap.entries())
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [programmes]);

  // Get unique study modes
  const studyModes = useMemo(() => {
    const modes = new Set<string>();
    programmes.forEach((p) => modes.add(p.studyMode));
    return Array.from(modes).sort();
  }, [programmes]);

  // Update a single filter
  const setFilter = useCallback(
    <K extends keyof EducationFilters>(key: K, value: EducationFilters[K]) => {
      setFilters((prev) => ({ ...prev, [key]: value }));
    },
    []
  );

  // Reset all filters
  const resetFilters = useCallback(() => {
    setFilters(DEFAULT_FILTERS);
    setSearchTerm("");
  }, []);

  // Check if any filters are active
  const hasActiveFilters = useMemo(() => {
    return (
      searchTerm.length > 0 ||
      filters.category !== "" ||
      filters.level !== "" ||
      filters.studyMode !== "" ||
      filters.location !== ""
    );
  }, [searchTerm, filters]);

  return {
    // Search
    searchTerm,
    setSearchTerm,
    isSearching,
    saveToRecentSearches,

    // Recent searches
    recentSearches,
    clearRecentSearches,

    // Filters
    filters,
    setFilter,
    setFilters,
    resetFilters,
    hasActiveFilters,

    // Results
    filteredProgrammes,
    resultCount: filteredProgrammes.length,

    // Filter options
    categories,
    levels,
    studyModes,
    quickFilters,
  };
};

export default useEducationSearch;
