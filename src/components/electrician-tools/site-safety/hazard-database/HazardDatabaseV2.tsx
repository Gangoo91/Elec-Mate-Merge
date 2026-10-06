/**
 * Hazard Database — read-only reference library of site hazards, controls and
 * BS 7671 references. Rebuilt to the Site Safety editorial standard:
 * SafetyMasthead + PageHero + StatStrip + FilterBar + hairline SafetyListCard rows.
 *
 * ONE colour dimension = risk severity (green / amber / orange / red) shown as a
 * thin SafetyListRow accent bar plus a small uppercase risk pill. No decorative icons.
 */

import { useState, useMemo, useCallback, useEffect } from 'react';
import { getCategoriesFromHazards, normaliseCategory, hazardMatchesCategory } from './CategoryPill';
import { HazardDetailSheet } from './HazardDetailSheet';
import { BookmarksSheet } from './BookmarksSheet';
import { RiskPill, riskTone } from './RiskBar';
import { enhancedRiskDatabase } from '@/data/enhanced-hazard-database';
import type { EnhancedRiskConsequence } from '@/data/hazards';
import { storageGetJSONSync, storageSetJSONSync } from '@/utils/storage';

import { FilterBar, EmptyState, toneDot } from '@/components/college/primitives';
import { cn } from '@/lib/utils';
import { SafetyModuleShell } from '../common/SafetyModuleShell';
import { LoadMoreButton } from '../common/LoadMoreButton';
import { SafetyListCard } from '../common/SafetyList';
import { SafetyPageHeader } from '../common/SafetyPageHeader';

const BOOKMARKS_KEY = 'hazard-bookmarks';

// Count how many control measures a hazard carries across the hierarchy.
const countControls = (controlMeasures: EnhancedRiskConsequence['controlMeasures']) =>
  Object.values(controlMeasures).reduce((acc, measures) => acc + (measures?.length || 0), 0);

interface HazardDatabaseV2Props {
  onBack?: () => void;
}

export const HazardDatabaseV2 = ({ onBack }: HazardDatabaseV2Props) => {
  // State
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedHazard, setSelectedHazard] = useState<EnhancedRiskConsequence | null>(null);
  const [bookmarksOpen, setBookmarksOpen] = useState(false);
  const [bookmarks, setBookmarks] = useState<Set<string>>(new Set());

  // Progressive loading - only render a window of hazards at a time.
  const [displayCount, setDisplayCount] = useState(10);

  // Load bookmarks from localStorage
  useEffect(() => {
    const saved = storageGetJSONSync<string[]>(BOOKMARKS_KEY, []);
    if (saved.length > 0) {
      setBookmarks(new Set(saved));
    }
  }, []);

  // Save bookmarks to localStorage
  const saveBookmarks = useCallback((newBookmarks: Set<string>) => {
    setBookmarks(newBookmarks);
    storageSetJSONSync(BOOKMARKS_KEY, [...newBookmarks]);
  }, []);

  // Toggle bookmark
  const toggleBookmark = useCallback(
    (id: string) => {
      const newBookmarks = new Set(bookmarks);
      if (newBookmarks.has(id)) {
        newBookmarks.delete(id);
      } else {
        newBookmarks.add(id);
      }
      saveBookmarks(newBookmarks);
    },
    [bookmarks, saveBookmarks]
  );

  // Get all hazards from the enhanced database
  const hazards = enhancedRiskDatabase;

  // Categories derived from hazards
  const categories = useMemo(() => getCategoriesFromHazards(hazards), [hazards]);

  /** Canonical category → hazard count, so "Other" knows what it holds. */
  const categoryCounts = useMemo(() => {
    const c: Record<string, number> = {};
    hazards.forEach((h) => {
      const id = normaliseCategory(h.category);
      c[id] = (c[id] || 0) + 1;
    });
    return c;
  }, [hazards]);

  // Filtered hazards based on category + free-text search.
  const filteredHazards = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return hazards.filter((h) => {
      if (!hazardMatchesCategory(h.category, activeCategory, categoryCounts)) return false;
      if (!q) return true;
      return (
        h.hazard.toLowerCase().includes(q) ||
        h.consequence.toLowerCase().includes(q) ||
        h.category.toLowerCase().includes(q) ||
        (h.bs7671References ?? []).some((r) => r.toLowerCase().includes(q)) ||
        Object.values(h.controlMeasures).some((measures) =>
          (measures ?? []).some((m) => m.toLowerCase().includes(q))
        )
      );
    });
  }, [hazards, activeCategory, searchQuery, categoryCounts]);

  // Highest-risk hazards sort to the top.
  const sortedHazards = useMemo(
    () => [...filteredHazards].sort((a, b) => b.riskRating - a.riskRating),
    [filteredHazards]
  );

  // Bookmarked hazards
  const bookmarkedHazards = useMemo(
    () => hazards.filter((h) => bookmarks.has(h.id)),
    [hazards, bookmarks]
  );

  // Progressive loading - slice hazards for display
  const displayedHazards = useMemo(
    () => sortedHazards.slice(0, displayCount),
    [sortedHazards, displayCount]
  );

  const hasMore = displayCount < sortedHazards.length;
  const remaining = sortedHazards.length - displayCount;

  // Reset display count when category or search changes.
  useEffect(() => {
    setDisplayCount(10);
  }, [activeCategory, searchQuery]);

  // Show more handler
  const handleShowMore = useCallback(() => {
    setDisplayCount((prev) => Math.min(prev + 10, sortedHazards.length));
  }, [sortedHazards.length]);

  return (
    <SafetyModuleShell
      onBack={onBack ?? (() => {})}
      moduleName="Hazard Database"
      trailing={
        bookmarks.size > 0 ? (
          <button
            type="button"
            onClick={() => setBookmarksOpen(true)}
            className="inline-flex items-center gap-1.5 h-11 px-3.5 rounded-full border border-elec-yellow/35 text-[12px] font-medium text-elec-yellow touch-manipulation"
          >
            Saved
            <span className="tabular-nums">{bookmarks.size}</span>
          </button>
        ) : undefined
      }
      hero={
        <SafetyPageHeader
          eyebrow="Hazard Database"
          title="Hazards and how to control them"
          description="Browse the hazard library by category, review the hierarchy of control measures and pull the right guidance into your risk assessments."
          tone="amber"
        />
      }
      /* The four-figure strip (99 hazards / 83 high risk / 14 categories /
         0 saved) was removed. It filled the first phone screen, and "83 of 99
         are high risk" tells nobody what to do. The hazard count is on the
         "All" tab and Saved is the masthead button once anything is saved.
         The "Tap any hazard" hint went too — it squeezed the module name in
         the masthead down to "Haza…". */
      filter={
        <FilterBar
          touch
          tabs={categories.map((c) => ({ value: c.id, label: c.name, count: c.count }))}
          activeTab={activeCategory}
          onTabChange={setActiveCategory}
          search={searchQuery}
          onSearchChange={setSearchQuery}
          searchPlaceholder="Search a task, hazard or regulation"
        />
      }
    >
      {sortedHazards.length === 0 ? (
        <EmptyState
          touch
          title="No hazards found"
          description={
            searchQuery
              ? `No hazards match "${searchQuery}". Try different keywords or clear your search.`
              : 'No hazards match the selected category.'
          }
          action={searchQuery || activeCategory !== 'all' ? 'Clear filters' : undefined}
          onAction={
            searchQuery || activeCategory !== 'all'
              ? () => {
                  setSearchQuery('');
                  setActiveCategory('all');
                }
              : undefined
          }
        />
      ) : (
        <div className="space-y-3">
          <p className="text-[12px] text-white tabular-nums" aria-live="polite">
            {sortedHazards.length} {sortedHazards.length === 1 ? 'hazard' : 'hazards'} · highest
            risk first · tap one for its controls
          </p>
          {/* Own rows rather than SafetyListRow: that row truncates the title
              to one line, and next to the risk pill a hazard read as
              "Underground cable …" — the part that says what the job is was
              the part cut off. Titles now wrap to two lines. */}
          <SafetyListCard className="-mx-4 rounded-none border-x-0 sm:mx-0 sm:rounded-2xl sm:border-x">
            {displayedHazards.map((hazard) => {
              const controls = countControls(hazard.controlMeasures);
              const tone = riskTone(hazard.riskRating);
              return (
                <button
                  key={hazard.id}
                  type="button"
                  onClick={() => setSelectedHazard(hazard)}
                  className="flex w-full items-start gap-3 px-4 py-3.5 text-left touch-manipulation transition-colors [-webkit-tap-highlight-color:transparent] hover:bg-white/[0.05] active:bg-white/[0.08] sm:px-6 sm:py-4"
                >
                  <span
                    aria-hidden
                    className={cn('mt-1 h-9 w-[3px] shrink-0 rounded-full', toneDot[tone])}
                  />
                  <span className="min-w-0 flex-1">
                    <span className="line-clamp-2 text-[14px] font-medium leading-snug text-white sm:text-[15px]">
                      {hazard.hazard}
                    </span>
                    <span className="mt-1 line-clamp-1 text-[12px] text-white">
                      {hazard.consequence}
                    </span>
                    <span className="mt-1.5 flex flex-wrap items-center gap-2">
                      <RiskPill riskRating={hazard.riskRating} />
                      <span className="text-[11.5px] text-white tabular-nums">
                        {controls} control{controls !== 1 ? 's' : ''}
                      </span>
                      {bookmarks.has(hazard.id) && (
                        <span className="text-[11.5px] font-medium text-elec-yellow">Saved</span>
                      )}
                    </span>
                  </span>
                </button>
              );
            })}
          </SafetyListCard>
          {hasMore && <LoadMoreButton onLoadMore={handleShowMore} remaining={remaining} />}
        </div>
      )}

      {/* Hazard Detail Sheet */}
      <HazardDetailSheet
        hazard={selectedHazard}
        open={!!selectedHazard}
        onClose={() => setSelectedHazard(null)}
        isBookmarked={selectedHazard ? bookmarks.has(selectedHazard.id) : false}
        onToggleBookmark={() => selectedHazard && toggleBookmark(selectedHazard.id)}
      />

      {/* Bookmarks Sheet */}
      <BookmarksSheet
        open={bookmarksOpen}
        onClose={() => setBookmarksOpen(false)}
        bookmarkedHazards={bookmarkedHazards}
        bookmarks={bookmarks}
        onSelectHazard={setSelectedHazard}
        onToggleBookmark={toggleBookmark}
      />
    </SafetyModuleShell>
  );
};

export default HazardDatabaseV2;
