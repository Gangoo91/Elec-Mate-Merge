/**
 * JobSearchSheet - Full-screen smart search experience
 * Recent searches, location input, quick filters, live results preview
 */

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Drawer } from "vaul";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  Search,
  X,
  MapPin,
  Clock,
  TrendingUp,
  Sparkles,
  Zap,
  ChevronRight,
  Trash2,
  Briefcase,
} from "lucide-react";
import { fadeUpVariants, pillVariants, listItemVariants } from "./animations/variants";

interface JobSearchSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onSearch: (query: string, location: string) => void;
  initialQuery?: string;
  initialLocation?: string;
}

// Recent searches storage key
const RECENT_SEARCHES_KEY = "elecmate-job-recent-searches";
const MAX_RECENT_SEARCHES = 8;

// Popular search terms
const POPULAR_SEARCHES = [
  "Electrician",
  "Solar Installer",
  "EV Technician",
  "Apprentice",
  "Site Manager",
  "Maintenance Engineer",
  "Fire Alarm",
  "Data Installer",
];

// Quick location suggestions
const LOCATION_SUGGESTIONS = [
  "London",
  "Manchester",
  "Birmingham",
  "Leeds",
  "Bristol",
  "Remote",
  "Nationwide",
];

interface RecentSearch {
  query: string;
  location: string;
  timestamp: number;
}

// Load recent searches from localStorage
const loadRecentSearches = (): RecentSearch[] => {
  try {
    const stored = localStorage.getItem(RECENT_SEARCHES_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

// Save recent searches to localStorage
const saveRecentSearches = (searches: RecentSearch[]) => {
  try {
    localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(searches));
  } catch {
    // Ignore storage errors
  }
};

const JobSearchSheet = ({
  isOpen,
  onClose,
  onSearch,
  initialQuery = "",
  initialLocation = "",
}: JobSearchSheetProps) => {
  const [query, setQuery] = useState(initialQuery);
  const [location, setLocation] = useState(initialLocation);
  const [recentSearches, setRecentSearches] = useState<RecentSearch[]>([]);
  const [showLocationSuggestions, setShowLocationSuggestions] = useState(false);
  const [isAISearchEnabled, setIsAISearchEnabled] = useState(false);
  const queryInputRef = useRef<HTMLInputElement>(null);

  // Load recent searches on mount
  useEffect(() => {
    setRecentSearches(loadRecentSearches());
  }, []);

  // Focus input when sheet opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => queryInputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  // Reset form when initial values change
  useEffect(() => {
    setQuery(initialQuery);
    setLocation(initialLocation);
  }, [initialQuery, initialLocation]);

  // Handle search submission
  const handleSearch = useCallback(() => {
    if (!query.trim()) return;

    // Add to recent searches
    const newSearch: RecentSearch = {
      query: query.trim(),
      location: location.trim(),
      timestamp: Date.now(),
    };

    const updated = [
      newSearch,
      ...recentSearches.filter(
        (s) => s.query !== newSearch.query || s.location !== newSearch.location
      ),
    ].slice(0, MAX_RECENT_SEARCHES);

    setRecentSearches(updated);
    saveRecentSearches(updated);

    onSearch(query.trim(), location.trim());
    onClose();
  }, [query, location, recentSearches, onSearch, onClose]);

  // Handle quick search from popular/recent
  const handleQuickSearch = (searchQuery: string, searchLocation: string = "") => {
    setQuery(searchQuery);
    setLocation(searchLocation);
    // Trigger search immediately
    const newSearch: RecentSearch = {
      query: searchQuery,
      location: searchLocation,
      timestamp: Date.now(),
    };

    const updated = [
      newSearch,
      ...recentSearches.filter(
        (s) => s.query !== searchQuery || s.location !== searchLocation
      ),
    ].slice(0, MAX_RECENT_SEARCHES);

    setRecentSearches(updated);
    saveRecentSearches(updated);

    onSearch(searchQuery, searchLocation);
    onClose();
  };

  // Clear recent searches
  const clearRecentSearches = () => {
    setRecentSearches([]);
    saveRecentSearches([]);
  };

  // Remove single recent search
  const removeRecentSearch = (index: number) => {
    const updated = recentSearches.filter((_, i) => i !== index);
    setRecentSearches(updated);
    saveRecentSearches(updated);
  };

  // Format time ago
  const formatTimeAgo = (timestamp: number) => {
    const diff = Date.now() - timestamp;
    const mins = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (mins < 60) return `${mins}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  return (
    <Drawer.Root open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50" />
        <Drawer.Content className="fixed bottom-0 left-0 right-0 z-50 flex flex-col rounded-t-3xl bg-background max-h-[95vh] outline-none">
          {/* Drag handle */}
          <div className="flex justify-center pt-4 pb-2">
            <div className="w-12 h-1.5 rounded-full bg-white/20" />
          </div>

          {/* Header */}
          <div className="flex items-center justify-between px-6 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500/30 to-orange-500/30 border border-amber-400/30 flex items-center justify-center">
                <Search className="h-5 w-5 text-amber-300" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-white">Search Jobs</h2>
                <p className="text-xs text-white/50">Find your perfect role</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/20 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Search Form */}
          <div className="px-6 pb-4 space-y-3">
            {/* Job Search Input */}
            <div className="relative">
              {!query && (
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-white/40 pointer-events-none" />
              )}
              <Input
                ref={queryInputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                placeholder="Job title, skill, or company"
                className={cn("h-12 pr-4 bg-white/5 border-white/10 text-white placeholder:text-white/40 rounded-xl focus:border-amber-500/50 focus:ring-amber-500/20", !query && "pl-12")}
              />
            </div>

            {/* Location Input */}
            <div className="relative">
              {!location && (
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-white/40 pointer-events-none" />
              )}
              <Input
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                onFocus={() => setShowLocationSuggestions(true)}
                onBlur={() => setTimeout(() => setShowLocationSuggestions(false), 200)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                placeholder="Location (city, postcode, or remote)"
                className={cn("h-12 pr-4 bg-white/5 border-white/10 text-white placeholder:text-white/40 rounded-xl focus:border-amber-500/50 focus:ring-amber-500/20", !location && "pl-12")}
              />

              {/* Location Suggestions Dropdown */}
              <AnimatePresence>
                {showLocationSuggestions && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-full left-0 right-0 mt-2 bg-card/95 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden z-10"
                  >
                    {LOCATION_SUGGESTIONS.map((loc) => (
                      <button
                        key={loc}
                        onClick={() => {
                          setLocation(loc);
                          setShowLocationSuggestions(false);
                        }}
                        className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-white/5 transition-colors"
                      >
                        <MapPin className="h-4 w-4 text-white/40" />
                        <span className="text-sm text-white">{loc}</span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* AI Search Toggle */}
            <button
              onClick={() => setIsAISearchEnabled(!isAISearchEnabled)}
              className={cn(
                "w-full flex items-center justify-between px-4 py-3 rounded-xl border transition-all",
                isAISearchEnabled
                  ? "bg-purple-500/20 border-purple-500/30"
                  : "bg-white/5 border-white/10"
              )}
            >
              <div className="flex items-center gap-3">
                <Sparkles
                  className={cn(
                    "h-5 w-5",
                    isAISearchEnabled ? "text-purple-400" : "text-white/40"
                  )}
                />
                <div className="text-left">
                  <span
                    className={cn(
                      "text-sm font-medium",
                      isAISearchEnabled ? "text-purple-300" : "text-white"
                    )}
                  >
                    AI Job Match
                  </span>
                  <p className="text-xs text-white/50">Match jobs to your profile</p>
                </div>
              </div>
              <div
                className={cn(
                  "w-10 h-6 rounded-full flex items-center transition-all",
                  isAISearchEnabled
                    ? "bg-purple-500 justify-end pr-1"
                    : "bg-white/20 justify-start pl-1"
                )}
              >
                <div className="w-4 h-4 rounded-full bg-white shadow" />
              </div>
            </button>

            {/* Search Button */}
            <Button
              onClick={handleSearch}
              disabled={!query.trim()}
              className="w-full h-12 bg-gradient-to-r from-amber-500 to-orange-500 text-black hover:from-amber-400 hover:to-orange-400 font-semibold shadow-lg shadow-amber-500/25 rounded-xl disabled:opacity-50"
            >
              <Search className="h-5 w-5 mr-2" />
              Search Jobs
            </Button>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto px-6 pb-8">
            {/* Recent Searches */}
            {recentSearches.length > 0 && (
              <motion.div
                variants={fadeUpVariants}
                initial="initial"
                animate="animate"
                className="mb-6"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-white/40" />
                    <span className="text-sm font-medium text-white">Recent Searches</span>
                  </div>
                  <button
                    onClick={clearRecentSearches}
                    className="text-xs text-white/40 hover:text-red-400 transition-colors"
                  >
                    Clear all
                  </button>
                </div>

                <div className="space-y-2">
                  {recentSearches.slice(0, 5).map((search, index) => (
                    <motion.div
                      key={`${search.query}-${search.timestamp}`}
                      variants={listItemVariants}
                      className="group flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/5 hover:border-white/10 hover:bg-white/[0.05] transition-all cursor-pointer"
                      onClick={() => handleQuickSearch(search.query, search.location)}
                    >
                      <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
                        <Search className="h-4 w-4 text-white/40" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-white font-medium truncate">{search.query}</p>
                        {search.location && (
                          <p className="text-xs text-white/50 truncate flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {search.location}
                          </p>
                        )}
                      </div>
                      <span className="text-xs text-white/30">
                        {formatTimeAgo(search.timestamp)}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          removeRecentSearch(index);
                        }}
                        className="opacity-0 group-hover:opacity-100 p-1 hover:bg-white/10 rounded transition-all"
                      >
                        <X className="h-4 w-4 text-white/40" />
                      </button>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Popular Searches */}
            <motion.div
              variants={fadeUpVariants}
              initial="initial"
              animate="animate"
              transition={{ delay: 0.1 }}
            >
              <div className="flex items-center gap-2 mb-3">
                <TrendingUp className="h-4 w-4 text-amber-400" />
                <span className="text-sm font-medium text-white">Popular Searches</span>
              </div>

              <div className="flex flex-wrap gap-2">
                {POPULAR_SEARCHES.map((term, index) => (
                  <motion.button
                    key={term}
                    variants={pillVariants}
                    initial="initial"
                    animate="animate"
                    whileTap="tap"
                    custom={index}
                    onClick={() => handleQuickSearch(term)}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-white/70 hover:bg-amber-500/20 hover:text-amber-300 hover:border-amber-500/30 transition-all"
                  >
                    <Briefcase className="h-3.5 w-3.5" />
                    {term}
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Quick Tips */}
            <motion.div
              variants={fadeUpVariants}
              initial="initial"
              animate="animate"
              transition={{ delay: 0.2 }}
              className="mt-6 p-4 rounded-xl bg-gradient-to-br from-amber-500/10 to-orange-500/10 border border-amber-500/20"
            >
              <div className="flex items-center gap-2 mb-2">
                <Zap className="h-4 w-4 text-amber-400" />
                <span className="text-sm font-medium text-amber-300">Search Tips</span>
              </div>
              <ul className="space-y-1.5 text-xs text-white/60">
                <li className="flex items-center gap-2">
                  <ChevronRight className="h-3 w-3 text-amber-400" />
                  Use specific job titles for better matches
                </li>
                <li className="flex items-center gap-2">
                  <ChevronRight className="h-3 w-3 text-amber-400" />
                  Try "Remote" or "Nationwide" for flexible roles
                </li>
                <li className="flex items-center gap-2">
                  <ChevronRight className="h-3 w-3 text-amber-400" />
                  Enable AI Match to find jobs suited to your skills
                </li>
              </ul>
            </motion.div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
};

export default JobSearchSheet;
