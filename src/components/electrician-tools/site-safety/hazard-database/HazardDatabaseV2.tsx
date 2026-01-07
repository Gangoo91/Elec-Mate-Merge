import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { Search, Bookmark, X } from 'lucide-react';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { CategoryPill, getCategoriesFromHazards } from './CategoryPill';
import { QuickStatsCard } from './QuickStatsCard';
import { HazardCardV2 } from './HazardCardV2';
import { HazardSearchOverlay } from './HazardSearchOverlay';
import { HazardDetailSheet } from './HazardDetailSheet';
import { BookmarksSheet } from './BookmarksSheet';
import { enhancedRiskDatabase } from '@/data/enhanced-hazard-database';
import type { EnhancedRiskConsequence } from '@/data/hazards';

const BOOKMARKS_KEY = 'hazard-bookmarks';

export const HazardDatabaseV2: React.FC = () => {
  // State
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchOpen, setSearchOpen] = useState(false);
  const [selectedHazard, setSelectedHazard] = useState<EnhancedRiskConsequence | null>(null);
  const [bookmarksOpen, setBookmarksOpen] = useState(false);
  const [bookmarks, setBookmarks] = useState<Set<string>>(new Set());

  // Load bookmarks from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(BOOKMARKS_KEY);
      if (saved) {
        setBookmarks(new Set(JSON.parse(saved)));
      }
    } catch (e) {
      // Ignore localStorage errors
    }
  }, []);

  // Save bookmarks to localStorage
  const saveBookmarks = useCallback((newBookmarks: Set<string>) => {
    setBookmarks(newBookmarks);
    try {
      localStorage.setItem(BOOKMARKS_KEY, JSON.stringify([...newBookmarks]));
    } catch (e) {
      // Ignore localStorage errors
    }
  }, []);

  // Toggle bookmark
  const toggleBookmark = useCallback((id: string) => {
    const newBookmarks = new Set(bookmarks);
    if (newBookmarks.has(id)) {
      newBookmarks.delete(id);
    } else {
      newBookmarks.add(id);
    }
    saveBookmarks(newBookmarks);
  }, [bookmarks, saveBookmarks]);

  // Get all hazards from the enhanced database
  const hazards = enhancedRiskDatabase;

  // Categories derived from hazards
  const categories = useMemo(() => getCategoriesFromHazards(hazards), [hazards]);

  // Filtered hazards based on category
  const filteredHazards = useMemo(() => {
    if (activeCategory === 'all') return hazards;
    return hazards.filter((h) => h.category === activeCategory);
  }, [hazards, activeCategory]);

  // Bookmarked hazards
  const bookmarkedHazards = useMemo(() => {
    return hazards.filter((h) => bookmarks.has(h.id));
  }, [hazards, bookmarks]);

  // Get category name for display
  const activeCategoryName = useMemo(() => {
    const cat = categories.find((c) => c.id === activeCategory);
    return cat?.name || 'All Hazards';
  }, [categories, activeCategory]);

  return (
    <div className="min-h-full bg-elec-dark">
      {/* Sticky Header */}
      <header className="sticky top-0 z-40 bg-elec-dark/95 backdrop-blur-md border-b border-white/[0.06]">
        {/* Title Row */}
        <div className="flex items-center justify-between px-4 py-3">
          <h1 className="text-xl font-semibold text-white">Hazard Database</h1>
          <button
            onClick={() => setBookmarksOpen(true)}
            className={cn(
              "relative p-2 rounded-xl transition-colors",
              "hover:bg-white/[0.05]"
            )}
          >
            <Bookmark
              className={cn(
                "h-5 w-5",
                bookmarks.size > 0 ? "text-elec-yellow fill-elec-yellow" : "text-white/50"
              )}
            />
            {bookmarks.size > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-elec-yellow text-black text-[10px] font-bold flex items-center justify-center">
                {bookmarks.size > 9 ? '9+' : bookmarks.size}
              </span>
            )}
          </button>
        </div>

        {/* Search Bar - Tappable to open overlay */}
        <div className="px-4 pb-3">
          <button
            onClick={() => setSearchOpen(true)}
            className={cn(
              "w-full h-12 bg-white/[0.05] rounded-2xl flex items-center gap-3 px-4",
              "border border-white/[0.08] hover:border-white/[0.12] transition-colors",
              "active:scale-[0.99]"
            )}
          >
            <Search className="h-5 w-5 text-white/40" />
            <span className="text-white/40 text-sm">Search hazards...</span>
          </button>
        </div>

        {/* Category Pills */}
        <ScrollArea className="w-full">
          <div className="flex gap-2 px-4 pb-3">
            {categories.map((cat) => (
              <CategoryPill
                key={cat.id}
                id={cat.id}
                name={cat.name}
                count={cat.count}
                active={activeCategory === cat.id}
                onClick={() => setActiveCategory(cat.id)}
              />
            ))}
          </div>
          <ScrollBar orientation="horizontal" className="invisible" />
        </ScrollArea>

        {/* Active Filter Indicator */}
        {activeCategory !== 'all' && (
          <div className="px-4 pb-3">
            <div className="flex items-center gap-2">
              <span className="text-xs text-white/50">Filtered by:</span>
              <button
                onClick={() => setActiveCategory('all')}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-1 rounded-full",
                  "bg-elec-yellow/10 border border-elec-yellow/20",
                  "text-sm text-elec-yellow hover:bg-elec-yellow/20 transition-colors"
                )}
              >
                {activeCategoryName}
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <div className="px-4 py-4">
        {/* Quick Stats */}
        <QuickStatsCard
          hazards={filteredHazards}
          categoryName={activeCategory !== 'all' ? activeCategoryName : undefined}
        />

        {/* Hazard List */}
        <div className="space-y-3 mt-4">
          {filteredHazards.length === 0 ? (
            <div className="flex flex-col items-center py-16">
              <div className="w-20 h-20 rounded-2xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center mb-5">
                <Search className="h-10 w-10 text-white/20" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                No Hazards Found
              </h3>
              <p className="text-sm text-white/50 text-center max-w-xs">
                No hazards match the selected category
              </p>
            </div>
          ) : (
            filteredHazards.map((hazard, i) => (
              <HazardCardV2
                key={hazard.id}
                hazard={hazard}
                index={i}
                isBookmarked={bookmarks.has(hazard.id)}
                onTap={() => setSelectedHazard(hazard)}
                onBookmark={() => toggleBookmark(hazard.id)}
              />
            ))
          )}
        </div>
      </div>

      {/* Search Overlay */}
      <HazardSearchOverlay
        open={searchOpen}
        onClose={() => setSearchOpen(false)}
        hazards={hazards}
        bookmarks={bookmarks}
        onSelectHazard={setSelectedHazard}
        onToggleBookmark={toggleBookmark}
      />

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
    </div>
  );
};

export default HazardDatabaseV2;
