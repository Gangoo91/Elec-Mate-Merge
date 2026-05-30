/**
 * Hazard Database — read-only reference library of site hazards, controls and
 * BS 7671 references. Rebuilt to the Site Safety editorial standard:
 * SafetyMasthead + PageHero + StatStrip + FilterBar + hairline ListCard rows.
 *
 * ONE colour dimension = risk severity (green / amber / orange / red) shown as a
 * thin ListRow accent bar plus a small uppercase risk pill. No decorative icons.
 */

import { useState, useMemo, useCallback, useEffect } from 'react';
import { getCategoriesFromHazards } from './CategoryPill';
import { HazardDetailSheet } from './HazardDetailSheet';
import { BookmarksSheet } from './BookmarksSheet';
import { RiskPill, riskTone } from './RiskBar';
import { enhancedRiskDatabase } from '@/data/enhanced-hazard-database';
import type { EnhancedRiskConsequence } from '@/data/hazards';
import { storageGetJSONSync, storageSetJSONSync } from '@/utils/storage';

import {
  PageHero,
  StatStrip,
  FilterBar,
  EmptyState,
  ListCard,
  ListRow,
} from '@/components/college/primitives';
import { SafetyModuleShell } from '../common/SafetyModuleShell';
import { LoadMoreButton } from '../common/LoadMoreButton';

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

  // Filtered hazards based on category + free-text search.
  const filteredHazards = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return hazards.filter((h) => {
      if (activeCategory !== 'all' && h.category !== activeCategory) return false;
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
  }, [hazards, activeCategory, searchQuery]);

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

  // ── Headline stats ──
  const highRiskCount = useMemo(() => hazards.filter((h) => h.riskRating >= 9).length, [hazards]);
  const categoryCount = categories.length - 1; // exclude the synthetic "All" entry

  return (
    <SafetyModuleShell
      onBack={onBack ?? (() => {})}
      moduleName="Hazard Database"
      trailing={
        bookmarks.size > 0 ? (
          <button
            type="button"
            onClick={() => setBookmarksOpen(true)}
            className="inline-flex items-center gap-1.5 h-8 px-3 rounded-full bg-elec-yellow/10 border border-elec-yellow/25 text-[11px] font-medium text-elec-yellow touch-manipulation"
          >
            Saved
            <span className="tabular-nums">{bookmarks.size}</span>
          </button>
        ) : undefined
      }
      hero={
        <PageHero
          eyebrow="Hazard Database"
          title="Site hazards, controls and BS 7671 references"
          description="Browse the hazard library by category, review the hierarchy of control measures and pull the right guidance into your risk assessments."
          tone="amber"
          actions={
            bookmarks.size > 0 ? undefined : (
              <span className="text-[12px] text-white/55 self-end">
                Tap any hazard for full controls
              </span>
            )
          }
        />
      }
      stats={
        <StatStrip
          stats={[
            { value: hazards.length, label: 'Hazards', onClick: () => setActiveCategory('all') },
            { value: highRiskCount, label: 'High risk', sub: 'rating 9+', accent: true },
            { value: categoryCount, label: 'Categories' },
            {
              value: bookmarks.size,
              label: 'Saved',
              sub: bookmarks.size > 0 ? 'tap to view' : undefined,
              onClick: bookmarks.size > 0 ? () => setBookmarksOpen(true) : undefined,
            },
          ]}
        />
      }
      filter={
        <FilterBar
          tabs={categories.map((c) => ({ value: c.id, label: c.name, count: c.count }))}
          activeTab={activeCategory}
          onTabChange={setActiveCategory}
          search={searchQuery}
          onSearchChange={setSearchQuery}
          searchPlaceholder="Search hazards, controls, regs…"
        />
      }
    >
      {sortedHazards.length === 0 ? (
        <EmptyState
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
          <ListCard>
            {displayedHazards.map((hazard) => {
              const controls = countControls(hazard.controlMeasures);
              const tone = riskTone(hazard.riskRating);
              return (
                <ListRow
                  key={hazard.id}
                  onClick={() => setSelectedHazard(hazard)}
                  accent={tone}
                  title={hazard.hazard}
                  subtitle={hazard.consequence}
                  trailing={
                    <div className="flex flex-col items-end gap-1">
                      <RiskPill riskRating={hazard.riskRating} />
                      <span className="text-[11px] text-white/45 tabular-nums">
                        {controls} control{controls !== 1 ? 's' : ''}
                      </span>
                    </div>
                  }
                />
              );
            })}
          </ListCard>
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
