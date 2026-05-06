/**
 * JobSearchSheet — editorial smart-search sheet.
 *
 * Type-led full-screen sheet. Title + supporting copy, two inputs (role +
 * location), AI-match toggle, primary search action. Recent searches +
 * popular roles + tips below, all rendered with eyebrows + hairline
 * dividers + tabular nums. Drops the amber/orange gradient chrome.
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Drawer } from 'vaul';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { storageGetJSONSync, storageSetJSONSync } from '@/utils/storage';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import {
  Search,
  X,
  MapPin,
  Sparkles,
  ChevronRight,
  ArrowRight,
} from 'lucide-react';
import { fadeUpVariants, pillVariants, listItemVariants } from './animations/variants';
import { Eyebrow } from '@/components/college/primitives';

interface JobSearchSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onSearch: (query: string, location: string) => void;
  initialQuery?: string;
  initialLocation?: string;
}

const RECENT_SEARCHES_KEY = 'elecmate-job-recent-searches';
const MAX_RECENT_SEARCHES = 8;

const POPULAR_SEARCHES = [
  'Electrician',
  'Solar installer',
  'EV technician',
  'Apprentice',
  'Site manager',
  'Maintenance engineer',
  'Fire alarm',
  'Data installer',
];

const LOCATION_SUGGESTIONS = [
  'London',
  'Manchester',
  'Birmingham',
  'Leeds',
  'Bristol',
  'Remote',
  'Nationwide',
];

interface RecentSearch {
  query: string;
  location: string;
  timestamp: number;
}

const loadRecentSearches = (): RecentSearch[] =>
  storageGetJSONSync<RecentSearch[]>(RECENT_SEARCHES_KEY, []);

const saveRecentSearches = (searches: RecentSearch[]) =>
  storageSetJSONSync(RECENT_SEARCHES_KEY, searches);

const formatTimeAgo = (timestamp: number) => {
  const diff = Date.now() - timestamp;
  const mins = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);
  if (mins < 60) return `${mins}m ago`;
  if (hours < 24) return `${hours}h ago`;
  return `${days}d ago`;
};

const JobSearchSheet = ({
  isOpen,
  onClose,
  onSearch,
  initialQuery = '',
  initialLocation = '',
}: JobSearchSheetProps) => {
  const [query, setQuery] = useState(initialQuery);
  const [location, setLocation] = useState(initialLocation);
  const [recentSearches, setRecentSearches] = useState<RecentSearch[]>([]);
  const [showLocationSuggestions, setShowLocationSuggestions] = useState(false);
  const [isAISearchEnabled, setIsAISearchEnabled] = useState(false);
  const queryInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setRecentSearches(loadRecentSearches());
  }, []);

  useEffect(() => {
    if (isOpen) setTimeout(() => queryInputRef.current?.focus(), 100);
  }, [isOpen]);

  useEffect(() => {
    setQuery(initialQuery);
    setLocation(initialLocation);
  }, [initialQuery, initialLocation]);

  const persist = useCallback(
    (q: string, loc: string) => {
      const next: RecentSearch = { query: q, location: loc, timestamp: Date.now() };
      const updated = [
        next,
        ...recentSearches.filter((s) => s.query !== next.query || s.location !== next.location),
      ].slice(0, MAX_RECENT_SEARCHES);
      setRecentSearches(updated);
      saveRecentSearches(updated);
    },
    [recentSearches]
  );

  const handleSearch = useCallback(() => {
    const q = query.trim();
    if (!q) return;
    const loc = location.trim();
    persist(q, loc);
    onSearch(q, loc);
    onClose();
  }, [query, location, persist, onSearch, onClose]);

  const handleQuickSearch = (searchQuery: string, searchLocation = '') => {
    setQuery(searchQuery);
    setLocation(searchLocation);
    persist(searchQuery, searchLocation);
    onSearch(searchQuery, searchLocation);
    onClose();
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
    saveRecentSearches([]);
  };

  const removeRecentSearch = (index: number) => {
    const updated = recentSearches.filter((_, i) => i !== index);
    setRecentSearches(updated);
    saveRecentSearches(updated);
  };

  return (
    <Drawer.Root
      shouldScaleBackground={false}
      noBodyStyles
      open={isOpen}
      onOpenChange={(open) => !open && onClose()}
    >
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[90]" />
        <Drawer.Content className="fixed bottom-0 left-0 right-0 z-[100] flex flex-col rounded-t-3xl bg-[linear-gradient(180deg,hsl(0_0%_13%)_0%,hsl(0_0%_10%)_100%)] border-t border-white/[0.10] max-h-[95vh] outline-none">
          <VisuallyHidden>
            <Drawer.Title>Search jobs</Drawer.Title>
            <Drawer.Description>
              Search the unified job feed by role, location, and quick filters
            </Drawer.Description>
          </VisuallyHidden>
          {/* Drag handle */}
          <div className="flex justify-center pt-3 pb-1">
            <div className="w-12 h-1.5 rounded-full bg-white/15" />
          </div>

          {/* Header */}
          <div className="flex items-start justify-between gap-3 px-5 sm:px-6 pt-2 pb-4">
            <div className="space-y-1">
              <Eyebrow>SEARCH</Eyebrow>
              <h2 className="text-[24px] sm:text-[28px] font-semibold tracking-tight leading-tight">
                <span className="text-elec-yellow">Find</span>{' '}
                <span className="text-white">your fit.</span>
              </h2>
              <p className="text-[12.5px] text-white/85">Role, location, or both — start anywhere.</p>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="text-white/65 hover:text-white border border-white/15 hover:border-white/30 rounded-full h-9 w-9 inline-flex items-center justify-center shrink-0 touch-manipulation transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Search form */}
          <div className="px-5 sm:px-6 pb-4 space-y-3">
            <div className="relative">
              {!query && (
                <Search
                  className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-white/65 pointer-events-none"
                  aria-hidden
                />
              )}
              <Input
                ref={queryInputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                placeholder="Job title, skill, or company"
                className={cn(
                  'h-12 pr-4 bg-white/[0.04] border-white/[0.10] text-white placeholder:text-white/65 rounded-xl focus-visible:border-elec-yellow/50 focus-visible:ring-1 focus-visible:ring-elec-yellow/30',
                  !query && 'pl-11'
                )}
              />
            </div>

            <div className="relative">
              {!location && (
                <MapPin
                  className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-white/65 pointer-events-none"
                  aria-hidden
                />
              )}
              <Input
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                onFocus={() => setShowLocationSuggestions(true)}
                onBlur={() => setTimeout(() => setShowLocationSuggestions(false), 200)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                placeholder="Location, postcode, or remote"
                className={cn(
                  'h-12 pr-4 bg-white/[0.04] border-white/[0.10] text-white placeholder:text-white/65 rounded-xl focus-visible:border-elec-yellow/50 focus-visible:ring-1 focus-visible:ring-elec-yellow/30',
                  !location && 'pl-11'
                )}
              />

              <AnimatePresence>
                {showLocationSuggestions && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    className="absolute top-full left-0 right-0 mt-2 rounded-xl bg-[linear-gradient(180deg,hsl(0_0%_15%)_0%,hsl(0_0%_11%)_100%)] border border-white/[0.10] overflow-hidden z-10 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]"
                  >
                    <ul className="divide-y divide-white/[0.06]">
                      {LOCATION_SUGGESTIONS.map((loc) => (
                        <li key={loc}>
                          <button
                            type="button"
                            onMouseDown={(e) => e.preventDefault()}
                            onClick={() => {
                              setLocation(loc);
                              setShowLocationSuggestions(false);
                            }}
                            className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-white/[0.04] transition-colors"
                          >
                            <MapPin className="h-3.5 w-3.5 text-white/65" aria-hidden />
                            <span className="text-[13px] text-white">{loc}</span>
                          </button>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* AI match toggle */}
            <button
              type="button"
              onClick={() => setIsAISearchEnabled(!isAISearchEnabled)}
              className={cn(
                'w-full flex items-center justify-between gap-3 px-4 py-3 rounded-xl border touch-manipulation transition-colors',
                isAISearchEnabled
                  ? 'border-elec-yellow/40 bg-elec-yellow/[0.08]'
                  : 'border-white/[0.10] bg-white/[0.02] hover:border-white/[0.20]'
              )}
            >
              <div className="flex items-center gap-3 min-w-0">
                <Sparkles
                  className={cn(
                    'h-4 w-4 shrink-0',
                    isAISearchEnabled ? 'text-elec-yellow' : 'text-white/65'
                  )}
                  aria-hidden
                />
                <div className="text-left min-w-0">
                  <span
                    className={cn(
                      'block text-[13px] font-semibold',
                      isAISearchEnabled ? 'text-elec-yellow' : 'text-white'
                    )}
                  >
                    AI job match
                  </span>
                  <span className="block text-[11px] text-white/65">
                    Reorders results to your profile
                  </span>
                </div>
              </div>
              <div
                className={cn(
                  'w-9 h-5 rounded-full flex items-center transition-all shrink-0',
                  isAISearchEnabled ? 'bg-elec-yellow justify-end pr-0.5' : 'bg-white/15 justify-start pl-0.5'
                )}
              >
                <div
                  className={cn(
                    'w-4 h-4 rounded-full transition-colors',
                    isAISearchEnabled ? 'bg-black' : 'bg-white'
                  )}
                />
              </div>
            </button>

            <button
              type="button"
              onClick={handleSearch}
              disabled={!query.trim()}
              className="w-full text-[13px] font-semibold uppercase tracking-[0.14em] text-black bg-elec-yellow hover:bg-elec-yellow/90 active:bg-elec-yellow/85 rounded-full px-4 py-3 min-h-[44px] inline-flex items-center justify-center gap-2 touch-manipulation transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <Search className="h-4 w-4" />
              Search jobs
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          {/* Scrollable content */}
          <div className="flex-1 overflow-y-auto px-5 sm:px-6 pb-8 space-y-7">
            {/* Recent searches */}
            {recentSearches.length > 0 && (
              <motion.section variants={fadeUpVariants} initial="initial" animate="animate" className="space-y-3">
                <div className="flex items-baseline justify-between gap-3">
                  <Eyebrow>RECENT</Eyebrow>
                  <button
                    type="button"
                    onClick={clearRecentSearches}
                    className="text-[10.5px] uppercase tracking-[0.14em] font-semibold text-white/65 hover:text-red-300 transition-colors"
                  >
                    Clear all
                  </button>
                </div>

                <ul className="divide-y divide-white/[0.06]">
                  {recentSearches.slice(0, 5).map((search, index) => (
                    <motion.li
                      key={`${search.query}-${search.timestamp}`}
                      variants={listItemVariants}
                      className="group"
                    >
                      <div className="flex items-center gap-3 py-3 first:pt-0 last:pb-0">
                        <button
                          type="button"
                          onClick={() => handleQuickSearch(search.query, search.location)}
                          className="flex-1 min-w-0 inline-flex items-center gap-3 text-left rounded-md -mx-1 px-1 py-1 hover:bg-white/[0.03] active:bg-white/[0.05] transition-colors touch-manipulation"
                        >
                          <Search className="h-3.5 w-3.5 text-white/65 shrink-0" aria-hidden />
                          <div className="flex-1 min-w-0">
                            <p className="text-[13.5px] font-semibold text-white truncate">
                              {search.query}
                            </p>
                            {search.location && (
                              <p className="text-[11.5px] text-white/65 truncate inline-flex items-center gap-1">
                                <MapPin className="h-3 w-3" aria-hidden />
                                {search.location}
                              </p>
                            )}
                          </div>
                          <span className="text-[10.5px] tabular-nums uppercase tracking-[0.14em] text-white/65 shrink-0">
                            {formatTimeAgo(search.timestamp)}
                          </span>
                        </button>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            removeRecentSearch(index);
                          }}
                          aria-label="Remove"
                          className="opacity-60 group-hover:opacity-100 text-white/65 hover:text-white p-1 rounded transition-all"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    </motion.li>
                  ))}
                </ul>
              </motion.section>
            )}

            {/* Popular */}
            <motion.section
              variants={fadeUpVariants}
              initial="initial"
              animate="animate"
              transition={{ delay: 0.1 }}
              className="space-y-3"
            >
              <Eyebrow>POPULAR ROLES</Eyebrow>
              <ul className="flex flex-wrap gap-1.5">
                {POPULAR_SEARCHES.map((term, index) => (
                  <motion.li
                    key={term}
                    variants={pillVariants}
                    initial="initial"
                    animate="animate"
                    custom={index}
                  >
                    <button
                      type="button"
                      onClick={() => handleQuickSearch(term)}
                      className="inline-flex items-center text-[11px] font-semibold uppercase tracking-[0.12em] text-white/85 border border-white/15 hover:border-elec-yellow/40 hover:text-elec-yellow rounded-full px-3 py-1.5 transition-colors touch-manipulation"
                    >
                      {term}
                    </button>
                  </motion.li>
                ))}
              </ul>
            </motion.section>

            {/* Tips */}
            <motion.section
              variants={fadeUpVariants}
              initial="initial"
              animate="animate"
              transition={{ delay: 0.2 }}
              className="rounded-2xl bg-[linear-gradient(180deg,hsl(0_0%_15%)_0%,hsl(0_0%_11%)_100%)] border border-white/[0.10] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] p-5"
            >
              <Eyebrow>SEARCH TIPS</Eyebrow>
              <ol className="mt-3 divide-y divide-white/[0.06]">
                <Tip>Use a specific job title — "Solar PV installer" beats "engineer".</Tip>
                <Tip>"Remote" or "Nationwide" pulls flexible roles UK-wide.</Tip>
                <Tip>AI match reorders results against your profile + saved roles.</Tip>
              </ol>
            </motion.section>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
};

const Tip = ({ children }: { children: React.ReactNode }) => (
  <li className="flex items-baseline gap-2.5 py-2.5 first:pt-0 last:pb-0">
    <ChevronRight className="h-3.5 w-3.5 text-elec-yellow shrink-0 self-center" aria-hidden />
    <p className="text-[12.5px] leading-relaxed text-white/85">{children}</p>
  </li>
);

export default JobSearchSheet;
