/**
 * SmartSearchSheet - Full-screen search experience
 * Native app feel with recent searches, trending, and live preview
 */

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import {
  Search,
  X,
  Clock,
  TrendingUp,
  Mic,
  Star,
  GraduationCap,
  ChevronRight,
  Sparkles,
  Zap,
} from "lucide-react";
import { fadeUpVariants } from "./animations/variants";
import type { LiveEducationData } from "@/hooks/useLiveEducationData";

interface SmartSearchSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  programmes: LiveEducationData[];
  onSelectProgramme: (programme: LiveEducationData) => void;
  onSearch: (term: string) => void;
  recentSearches: string[];
  onClearRecentSearches: () => void;
  onSaveSearch: (term: string) => void;
  categories: { name: string; count: number }[];
  onSelectCategory: (category: string) => void;
}

// Quick filter definitions
const QUICK_FILTERS = [
  { id: "top-rated", label: "Top Rated", icon: Star },
  { id: "high-demand", label: "High Demand", icon: TrendingUp },
  { id: "online", label: "Online", icon: Zap },
  { id: "part-time", label: "Part-time", icon: Clock },
];

// Mini result card for search preview
const MiniResultCard = ({
  programme,
  onClick,
}: {
  programme: LiveEducationData;
  onClick: () => void;
}) => (
  <motion.button
    variants={fadeUpVariants}
    initial="initial"
    animate="animate"
    exit="exit"
    onClick={onClick}
    className="w-full flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-purple-500/30 transition-all text-left"
  >
    {/* Image thumbnail */}
    <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-white/10">
      {programme.imageUrl ? (
        <img
          src={programme.imageUrl}
          alt=""
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <GraduationCap className="h-5 w-5 text-purple-400" />
        </div>
      )}
    </div>

    {/* Content */}
    <div className="flex-1 min-w-0">
      <h4 className="text-sm font-medium text-white line-clamp-1">
        {programme.title}
      </h4>
      <p className="text-xs text-purple-400 line-clamp-1">
        {programme.institution}
      </p>
      <div className="flex items-center gap-2 mt-1 text-xs text-white/50">
        <span className="flex items-center gap-0.5">
          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
          {programme.rating?.toFixed(1)}
        </span>
        <span>•</span>
        <span>{programme.studyMode}</span>
      </div>
    </div>

    {/* Arrow */}
    <ChevronRight className="h-4 w-4 text-white/40 flex-shrink-0" />
  </motion.button>
);

const SmartSearchSheet = ({
  open,
  onOpenChange,
  programmes,
  onSelectProgramme,
  onSearch,
  recentSearches,
  onClearRecentSearches,
  onSaveSearch,
  categories,
  onSelectCategory,
}: SmartSearchSheetProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [searchResults, setSearchResults] = useState<LiveEducationData[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-focus input when sheet opens
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setSearchTerm("");
      setSearchResults([]);
      setActiveFilters([]);
    }
  }, [open]);

  // Debounced search
  useEffect(() => {
    if (searchTerm.length < 2) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    const timer = setTimeout(() => {
      const searchLower = searchTerm.toLowerCase();
      let filtered = programmes.filter(
        (p) =>
          p.title.toLowerCase().includes(searchLower) ||
          p.institution.toLowerCase().includes(searchLower) ||
          p.keyTopics.some((t) => t.toLowerCase().includes(searchLower))
      );

      // Apply quick filters
      if (activeFilters.includes("top-rated")) {
        filtered = filtered.filter((p) => (p.rating || 0) >= 4.5);
      }
      if (activeFilters.includes("high-demand")) {
        filtered = filtered.filter((p) => (p.employmentRate || 0) >= 90);
      }
      if (activeFilters.includes("online")) {
        filtered = filtered.filter(
          (p) =>
            p.studyMode === "Distance Learning" || p.studyMode === "Online"
        );
      }
      if (activeFilters.includes("part-time")) {
        filtered = filtered.filter(
          (p) => p.studyMode === "Part-time" || p.studyMode === "Flexible"
        );
      }

      setSearchResults(filtered.slice(0, 5));
      setIsSearching(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm, programmes, activeFilters]);

  // Handle search submission
  const handleSearch = useCallback(() => {
    if (searchTerm.trim().length >= 2) {
      onSaveSearch(searchTerm.trim());
      onSearch(searchTerm.trim());
      onOpenChange(false);
    }
  }, [searchTerm, onSaveSearch, onSearch, onOpenChange]);

  // Toggle quick filter
  const toggleFilter = (filterId: string) => {
    setActiveFilters((prev) =>
      prev.includes(filterId)
        ? prev.filter((f) => f !== filterId)
        : [...prev, filterId]
    );
  };

  // Handle recent search click
  const handleRecentSearchClick = (term: string) => {
    setSearchTerm(term);
    onSearch(term);
    onOpenChange(false);
  };

  // Handle category click
  const handleCategoryClick = (category: string) => {
    onSelectCategory(category);
    onOpenChange(false);
  };

  // Handle result click
  const handleResultClick = (programme: LiveEducationData) => {
    onSelectProgramme(programme);
    onOpenChange(false);
  };

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="h-[95vh] rounded-t-3xl">
        <DrawerHeader className="pb-0">
          <div className="flex items-center justify-between">
            <DrawerTitle className="text-lg font-semibold">
              Search Programmes
            </DrawerTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onOpenChange(false)}
              className="h-8 w-8"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DrawerHeader>

        <div className="flex-1 overflow-hidden flex flex-col p-4">
          {/* Search Input */}
          <div className="relative mb-4">
            {!searchTerm && (
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground pointer-events-none" />
            )}
            <Input
              ref={inputRef}
              placeholder="Search courses, providers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              className={cn(
                "pr-12 h-14 text-base rounded-2xl bg-white/5 border-white/10 focus:border-purple-500/50",
                !searchTerm && "pl-12"
              )}
            />
            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 h-8 w-8 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors"
              onClick={() => {
                // Voice search placeholder
              }}
            >
              <Mic className="h-5 w-5 text-muted-foreground" />
            </button>
          </div>

          {/* Quick Filters */}
          <div className="overflow-x-auto scrollbar-hide -mx-4 px-4 mb-4">
            <div className="flex gap-2">
              {QUICK_FILTERS.map((filter) => {
                const isActive = activeFilters.includes(filter.id);
                const Icon = filter.icon;
                return (
                  <motion.button
                    key={filter.id}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => toggleFilter(filter.id)}
                    className={cn(
                      "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap",
                      "border transition-all duration-200",
                      isActive
                        ? "bg-purple-500 text-white border-purple-500"
                        : "bg-white/5 text-white/70 border-white/10 hover:bg-white/10"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    {filter.label}
                  </motion.button>
                );
              })}
            </div>
          </div>

          <ScrollArea className="flex-1 -mx-4 px-4">
            <AnimatePresence mode="wait">
              {/* Search Results */}
              {searchTerm.length >= 2 && (
                <motion.div
                  key="results"
                  variants={fadeUpVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-white/60">
                      {isSearching
                        ? "Searching..."
                        : `${searchResults.length} results`}
                    </h3>
                    {searchResults.length > 0 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleSearch}
                        className="text-purple-400 hover:text-purple-300"
                      >
                        See all
                        <ChevronRight className="h-4 w-4 ml-1" />
                      </Button>
                    )}
                  </div>

                  <div className="space-y-2">
                    <AnimatePresence>
                      {searchResults.map((programme) => (
                        <MiniResultCard
                          key={programme.id}
                          programme={programme}
                          onClick={() => handleResultClick(programme)}
                        />
                      ))}
                    </AnimatePresence>

                    {!isSearching && searchResults.length === 0 && (
                      <div className="text-center py-8">
                        <Search className="h-12 w-12 text-white/20 mx-auto mb-3" />
                        <p className="text-white/60">No programmes found</p>
                        <p className="text-sm text-white/40 mt-1">
                          Try different keywords
                        </p>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}

              {/* Default State - Recent & Trending */}
              {searchTerm.length < 2 && (
                <motion.div
                  key="default"
                  variants={fadeUpVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="space-y-6"
                >
                  {/* Recent Searches */}
                  {recentSearches.length > 0 && (
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-sm font-medium text-white flex items-center gap-2">
                          <Clock className="h-4 w-4 text-white/40" />
                          Recent Searches
                        </h3>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={onClearRecentSearches}
                          className="text-xs text-white/40 hover:text-white/60"
                        >
                          Clear all
                        </Button>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {recentSearches.map((term, index) => (
                          <motion.button
                            key={term}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleRecentSearchClick(term)}
                            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
                          >
                            <Clock className="h-3 w-3 text-white/40" />
                            <span className="text-sm text-white/70">{term}</span>
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Trending Categories */}
                  {categories.length > 0 && (
                    <div>
                      <h3 className="text-sm font-medium text-white flex items-center gap-2 mb-3">
                        <Sparkles className="h-4 w-4 text-purple-400" />
                        Trending Categories
                      </h3>
                      <div className="grid grid-cols-2 gap-2">
                        {categories.slice(0, 6).map((category, index) => (
                          <motion.button
                            key={category.name}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 + index * 0.05 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handleCategoryClick(category.name)}
                            className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-purple-500/10 hover:border-purple-500/30 transition-all text-left"
                          >
                            <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
                              <GraduationCap className="h-5 w-5 text-purple-400" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-white truncate">
                                {category.name}
                              </p>
                              <p className="text-xs text-white/50">
                                {category.count} programmes
                              </p>
                            </div>
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Browse All Prompt */}
                  <div className="text-center pt-4">
                    <p className="text-sm text-white/40">
                      Or{" "}
                      <button
                        onClick={() => onOpenChange(false)}
                        className="text-purple-400 hover:text-purple-300 underline underline-offset-2"
                      >
                        browse all programmes
                      </button>
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </ScrollArea>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default SmartSearchSheet;
