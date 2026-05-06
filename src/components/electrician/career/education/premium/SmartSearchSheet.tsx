/**
 * SmartSearchSheet — editorial programme search.
 *
 * Type-led full-screen sheet. Find. by name. eyebrow + headline, single
 * search input, four quick-filter pills, debounced live preview, recent
 * searches as a divided list, trending categories as a divided list with
 * tabular counts. Drops the gradient/icon chrome.
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Drawer, DrawerContent, DrawerTitle, DrawerDescription } from '@/components/ui/drawer';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import {
  Search,
  X,
  Clock,
  TrendingUp,
  Star,
  ChevronRight,
  Zap,
  ArrowRight,
} from 'lucide-react';
import { fadeUpVariants } from './animations/variants';
import { Eyebrow } from '@/components/college/primitives';
import type { LiveEducationData } from '@/hooks/useLiveEducationData';

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

const QUICK_FILTERS = [
  { id: 'top-rated', label: 'Top rated', icon: Star },
  { id: 'high-demand', label: 'High demand', icon: TrendingUp },
  { id: 'online', label: 'Online', icon: Zap },
  { id: 'part-time', label: 'Part-time', icon: Clock },
];

const initialsOf = (institution: string): string =>
  institution
    .split(/\s+/)
    .map((w) => w[0])
    .filter(Boolean)
    .slice(0, 3)
    .join('')
    .toUpperCase();

const MiniResultCard = ({
  programme,
  onClick,
}: {
  programme: LiveEducationData;
  onClick: () => void;
}) => (
  <motion.button
    type="button"
    variants={fadeUpVariants}
    initial="initial"
    animate="animate"
    exit="exit"
    onClick={onClick}
    className="w-full flex items-start gap-3 p-3 rounded-xl bg-[linear-gradient(180deg,hsl(0_0%_15%)_0%,hsl(0_0%_11%)_100%)] border border-white/[0.10] hover:border-elec-yellow/40 active:bg-white/[0.04] transition-colors text-left touch-manipulation shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]"
  >
    <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-elec-yellow/[0.08] border border-elec-yellow/30 shrink-0">
      <span className="text-[10px] font-semibold tabular-nums text-elec-yellow">
        {initialsOf(programme.institution)}
      </span>
    </div>
    <div className="min-w-0 flex-1">
      <h4 className="text-[13.5px] font-semibold text-white line-clamp-1">{programme.title}</h4>
      <p className="text-[11.5px] text-elec-yellow line-clamp-1">{programme.institution}</p>
      <div className="flex items-baseline gap-2 mt-1 text-[11px] text-white/85">
        <span className="inline-flex items-center gap-0.5 tabular-nums">
          <Star className="h-3 w-3 fill-amber-400 text-amber-400" aria-hidden />
          {(programme.rating || 0).toFixed(1)}
        </span>
        <span className="text-white/40">·</span>
        <span>{programme.studyMode}</span>
      </div>
    </div>
    <ChevronRight className="h-4 w-4 text-white/65 shrink-0 self-center" aria-hidden />
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
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [searchResults, setSearchResults] = useState<LiveEducationData[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setSearchTerm('');
      setSearchResults([]);
      setActiveFilters([]);
    }
  }, [open]);

  useEffect(() => {
    if (searchTerm.length < 2) {
      setSearchResults([]);
      return;
    }
    setIsSearching(true);
    const timer = setTimeout(() => {
      const lower = searchTerm.toLowerCase();
      let filtered = programmes.filter(
        (p) =>
          p.title.toLowerCase().includes(lower) ||
          p.institution.toLowerCase().includes(lower) ||
          p.keyTopics.some((t) => t.toLowerCase().includes(lower))
      );
      if (activeFilters.includes('top-rated')) {
        filtered = filtered.filter((p) => (p.rating || 0) >= 4.5);
      }
      if (activeFilters.includes('high-demand')) {
        filtered = filtered.filter((p) => (p.employmentRate || 0) >= 90);
      }
      if (activeFilters.includes('online')) {
        filtered = filtered.filter(
          (p) => p.studyMode === 'Distance Learning' || p.studyMode === 'Online'
        );
      }
      if (activeFilters.includes('part-time')) {
        filtered = filtered.filter(
          (p) => p.studyMode === 'Part-time' || p.studyMode === 'Flexible'
        );
      }
      setSearchResults(filtered.slice(0, 5));
      setIsSearching(false);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchTerm, programmes, activeFilters]);

  const handleSearch = useCallback(() => {
    const t = searchTerm.trim();
    if (t.length >= 2) {
      onSaveSearch(t);
      onSearch(t);
      onOpenChange(false);
    }
  }, [searchTerm, onSaveSearch, onSearch, onOpenChange]);

  const toggleFilter = (filterId: string) =>
    setActiveFilters((prev) =>
      prev.includes(filterId) ? prev.filter((f) => f !== filterId) : [...prev, filterId]
    );

  const handleRecentSearchClick = (term: string) => {
    setSearchTerm(term);
    onSearch(term);
    onOpenChange(false);
  };

  const handleCategoryClick = (category: string) => {
    onSelectCategory(category);
    onOpenChange(false);
  };

  const handleResultClick = (programme: LiveEducationData) => {
    onSelectProgramme(programme);
    onOpenChange(false);
  };

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="h-[95vh] rounded-t-3xl bg-[linear-gradient(180deg,hsl(0_0%_13%)_0%,hsl(0_0%_10%)_100%)] border-white/[0.10]">
        <VisuallyHidden>
          <DrawerTitle>Search programmes</DrawerTitle>
          <DrawerDescription>
            Find a programme by title, provider, or topic
          </DrawerDescription>
        </VisuallyHidden>
        {/* Drag handle */}
        <div className="flex justify-center pt-3 pb-1">
          <div className="w-12 h-1.5 rounded-full bg-white/15" />
        </div>

        {/* Header */}
        <div className="flex items-start justify-between gap-3 px-5 sm:px-6 pt-2 pb-4">
          <div className="space-y-1">
            <Eyebrow>SEARCH</Eyebrow>
            <h2 className="text-[22px] sm:text-[26px] font-semibold tracking-tight leading-tight">
              <span className="text-elec-yellow">Find</span>{' '}
              <span className="text-white">a programme.</span>
            </h2>
            <p className="text-[12px] text-white/85">Title, provider, or topic.</p>
          </div>
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            aria-label="Close"
            className="text-white/65 hover:text-white border border-white/15 hover:border-white/30 rounded-full h-9 w-9 inline-flex items-center justify-center shrink-0 touch-manipulation transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="flex-1 overflow-hidden flex flex-col px-5 sm:px-6 pb-4">
          {/* Input */}
          <div className="relative mb-3">
            {!searchTerm && (
              <Search
                className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-white/65 pointer-events-none"
                aria-hidden
              />
            )}
            <Input
              ref={inputRef}
              placeholder="Search programmes, providers, topics"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              className={cn(
                'h-12 text-[14px] rounded-xl bg-white/[0.04] border-white/[0.10] text-white placeholder:text-white/65 focus-visible:border-elec-yellow/50 focus-visible:ring-1 focus-visible:ring-elec-yellow/30',
                !searchTerm && 'pl-10'
              )}
            />
            {searchTerm && (
              <button
                type="button"
                onClick={() => setSearchTerm('')}
                aria-label="Clear"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 h-7 w-7 inline-flex items-center justify-center rounded-full border border-white/15 hover:border-white/30 text-white/65 hover:text-white transition-colors touch-manipulation"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>

          {/* Quick filters */}
          <div className="overflow-x-auto scrollbar-hide -mx-5 sm:-mx-6 px-5 sm:px-6 mb-4">
            <div className="flex gap-1.5 pr-4">
              {QUICK_FILTERS.map((filter) => {
                const isActive = activeFilters.includes(filter.id);
                const Icon = filter.icon;
                return (
                  <motion.button
                    key={filter.id}
                    type="button"
                    whileTap={{ scale: 0.96 }}
                    onClick={() => toggleFilter(filter.id)}
                    className={cn(
                      'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-semibold uppercase tracking-[0.12em] whitespace-nowrap',
                      'border transition-colors duration-200 touch-manipulation',
                      isActive
                        ? 'text-elec-yellow border-elec-yellow/40 bg-elec-yellow/[0.08]'
                        : 'text-white/85 border-white/15 hover:border-white/30'
                    )}
                  >
                    <Icon className="h-3 w-3" aria-hidden />
                    {filter.label}
                  </motion.button>
                );
              })}
            </div>
          </div>

          <ScrollArea className="flex-1 -mx-5 sm:-mx-6 px-5 sm:px-6">
            <AnimatePresence mode="wait">
              {/* Live results */}
              {searchTerm.length >= 2 && (
                <motion.div
                  key="results"
                  variants={fadeUpVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="space-y-3"
                >
                  <div className="flex items-baseline justify-between gap-3">
                    <Eyebrow>
                      {isSearching ? 'SEARCHING…' : `${searchResults.length} RESULT${searchResults.length === 1 ? '' : 'S'}`}
                    </Eyebrow>
                    {searchResults.length > 0 && (
                      <button
                        type="button"
                        onClick={handleSearch}
                        className="inline-flex items-center gap-1 text-[10.5px] uppercase tracking-[0.14em] font-semibold text-elec-yellow hover:text-elec-yellow/80 touch-manipulation"
                      >
                        See all
                        <ArrowRight className="h-3 w-3" />
                      </button>
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
                      <div className="text-center py-10">
                        <p className="text-[13.5px] text-white/85">No programmes match.</p>
                        <p className="text-[11.5px] text-white/65 mt-1">Try a broader keyword.</p>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}

              {/* Default state */}
              {searchTerm.length < 2 && (
                <motion.div
                  key="default"
                  variants={fadeUpVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="space-y-7"
                >
                  {/* Recent searches */}
                  {recentSearches.length > 0 && (
                    <section className="space-y-3">
                      <div className="flex items-baseline justify-between gap-3">
                        <Eyebrow>RECENT</Eyebrow>
                        <button
                          type="button"
                          onClick={onClearRecentSearches}
                          className="text-[10.5px] uppercase tracking-[0.14em] font-semibold text-white/65 hover:text-red-300 transition-colors"
                        >
                          Clear
                        </button>
                      </div>
                      <ul className="flex flex-wrap gap-1.5">
                        {recentSearches.map((term, index) => (
                          <motion.li
                            key={term}
                            initial={{ opacity: 0, scale: 0.96 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.04 }}
                          >
                            <button
                              type="button"
                              onClick={() => handleRecentSearchClick(term)}
                              className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-white/85 border border-white/15 hover:border-elec-yellow/40 hover:text-elec-yellow rounded-full px-3 py-1.5 transition-colors touch-manipulation"
                            >
                              <Clock className="h-3 w-3" aria-hidden />
                              {term}
                            </button>
                          </motion.li>
                        ))}
                      </ul>
                    </section>
                  )}

                  {/* Trending categories */}
                  {categories.length > 0 && (
                    <section className="space-y-3">
                      <Eyebrow>TRENDING</Eyebrow>
                      <ul className="divide-y divide-white/[0.06]">
                        {categories.slice(0, 6).map((category, index) => (
                          <motion.li
                            key={category.name}
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.04 + index * 0.03 }}
                          >
                            <button
                              type="button"
                              onClick={() => handleCategoryClick(category.name)}
                              className="w-full flex items-baseline gap-3 py-3 text-left rounded-md -mx-1 px-1 hover:bg-white/[0.03] active:bg-white/[0.05] transition-colors touch-manipulation first:pt-2 last:pb-2"
                            >
                              <span className="text-[10.5px] tabular-nums font-semibold text-elec-yellow shrink-0 w-5">
                                {String(index + 1).padStart(2, '0')}
                              </span>
                              <div className="flex-1 min-w-0">
                                <p className="text-[13.5px] font-semibold text-white">
                                  {category.name}
                                </p>
                              </div>
                              <span className="text-[11px] tabular-nums text-white/65 shrink-0">
                                {category.count}
                              </span>
                              <ChevronRight
                                className="h-3.5 w-3.5 text-white/65 shrink-0 self-center"
                                aria-hidden
                              />
                            </button>
                          </motion.li>
                        ))}
                      </ul>
                    </section>
                  )}

                  <div className="text-center pt-2 pb-4">
                    <button
                      type="button"
                      onClick={() => onOpenChange(false)}
                      className="text-[11.5px] uppercase tracking-[0.14em] font-semibold text-elec-yellow hover:text-elec-yellow/80 underline underline-offset-4 touch-manipulation"
                    >
                      Browse all programmes
                    </button>
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
