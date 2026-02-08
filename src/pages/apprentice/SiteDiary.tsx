/**
 * SiteDiary
 *
 * Full-viewport "one window" site diary page matching the LearningVideos pattern.
 * h-[100dvh] with fixed header, scrollable content area, no page-level scrolling.
 * Supports feed + calendar views, search, skill filtering, and full CRUD via sheets.
 */

import { useState, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Plus,
  Flame,
  List,
  CalendarDays,
  Search,
  X,
  TrendingUp,
  BookOpen,
} from 'lucide-react';
import { useSiteDiaryEntries } from '@/hooks/site-diary/useSiteDiaryEntries';
import { useDiaryStreak } from '@/hooks/site-diary/useDiaryStreak';
import { DiaryFeed } from '@/components/apprentice/site-diary/DiaryFeed';
import { DiaryCalendarView } from '@/components/apprentice/site-diary/DiaryCalendarView';
import { DiaryWeeklySummary } from '@/components/apprentice/site-diary/DiaryWeeklySummary';
import { DiaryEntrySheet } from '@/components/apprentice/site-diary/DiaryEntrySheet';
import { DiaryEntryDetailSheet } from '@/components/apprentice/site-diary/DiaryEntryDetailSheet';
import type { SiteDiaryEntry } from '@/hooks/site-diary/useSiteDiaryEntries';

const moodEmojis: Record<number, string> = {
  1: '😢',
  2: '😔',
  3: '😐',
  4: '🙂',
  5: '😊',
};

type ViewMode = 'feed' | 'calendar';

const skillFilterOptions = [
  'Practical Skills',
  'Health & Safety',
  'Testing & Inspection',
  'Wiring & Containment',
  'Regulations',
  'Tools & Equipment',
  'Communication',
  'Problem Solving',
];

export default function SiteDiary() {
  const navigate = useNavigate();
  const { entries, createEntry, updateEntry, deleteEntry, recentSites } = useSiteDiaryEntries();
  const { currentStreak, longestStreak, totalEntries } = useDiaryStreak(entries);
  const [viewMode, setViewMode] = useState<ViewMode>('feed');
  const [sheetOpen, setSheetOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSkillFilter, setActiveSkillFilter] = useState<string | null>(null);
  const [dateFilter, setDateFilter] = useState<string | null>(null);

  // Detail sheet state
  const [detailEntry, setDetailEntry] = useState<SiteDiaryEntry | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);

  // Edit sheet state
  const [editEntry, setEditEntry] = useState<SiteDiaryEntry | null>(null);

  // Average mood for stats ribbon
  const avgMood = useMemo(() => {
    const withMood = entries.filter(e => e.mood_rating);
    if (withMood.length === 0) return null;
    const avg = withMood.reduce((sum, e) => sum + (e.mood_rating || 0), 0) / withMood.length;
    return Math.round(avg);
  }, [entries]);

  // Filtered entries
  const filteredEntries = useMemo(() => {
    let filtered = entries;

    if (dateFilter) {
      filtered = filtered.filter(e => e.date === dateFilter);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(e =>
        e.site_name.toLowerCase().includes(q) ||
        e.tasks_completed.some(t => t.toLowerCase().includes(q)) ||
        (e.what_i_learned && e.what_i_learned.toLowerCase().includes(q))
      );
    }

    if (activeSkillFilter) {
      filtered = filtered.filter(e =>
        e.skills_practised.includes(activeSkillFilter)
      );
    }

    return filtered;
  }, [entries, searchQuery, activeSkillFilter, dateFilter]);

  const handleEntryTap = useCallback((entry: SiteDiaryEntry) => {
    setDetailEntry(entry);
    setDetailOpen(true);
  }, []);

  const handleEdit = useCallback((entry: SiteDiaryEntry) => {
    setDetailOpen(false);
    setEditEntry(entry);
    setSheetOpen(true);
  }, []);

  const handleDelete = useCallback(async (id: string) => {
    await deleteEntry(id);
    setDetailOpen(false);
    setDetailEntry(null);
  }, [deleteEntry]);

  const handleDayTap = useCallback((date: string) => {
    // If already filtering by this date, clear it; otherwise set filter and switch to feed
    if (dateFilter === date) {
      setDateFilter(null);
    } else {
      setDateFilter(date);
      setViewMode('feed');
    }
  }, [dateFilter]);

  const handleSheetClose = useCallback(() => {
    setSheetOpen(false);
    setEditEntry(null);
  }, []);

  const handleSave = useCallback(async (entry: Parameters<typeof createEntry>[0]) => {
    if (editEntry) {
      await updateEntry(editEntry.id, entry);
    } else {
      await createEntry(entry);
    }
  }, [editEntry, updateEntry, createEntry]);

  return (
    <div className="h-[100dvh] flex flex-col bg-[hsl(240,5.9%,10%)] overflow-hidden">
      {/* ═══ FIXED TOP BAR ═══ */}
      <div className="flex-shrink-0 bg-[hsl(240,5.9%,10%)]/95 backdrop-blur-xl border-b border-white/[0.06] z-20">
        {/* Title row */}
        <div className="flex items-center gap-3 px-4 h-14">
          <button
            onClick={() => navigate('/apprentice')}
            className="h-11 w-11 flex items-center justify-center rounded-xl active:bg-white/10 touch-manipulation -ml-1"
          >
            <ArrowLeft className="h-5 w-5 text-white" />
          </button>

          <div className="flex-1 min-w-0">
            <h1 className="text-lg font-bold text-white truncate">Site Diary</h1>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className={`h-11 w-11 flex items-center justify-center rounded-xl touch-manipulation transition-colors ${
                searchOpen ? 'bg-elec-yellow/15 text-elec-yellow' : 'active:bg-white/10 text-white'
              }`}
            >
              <Search className="h-5 w-5" />
            </button>
            <button
              onClick={() => { setEditEntry(null); setSheetOpen(true); }}
              className="h-11 flex items-center gap-1.5 px-3.5 rounded-xl bg-elec-yellow text-black font-semibold text-sm touch-manipulation active:scale-[0.98] transition-transform"
            >
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">Log Entry</span>
            </button>
          </div>
        </div>

        {/* Stats ribbon */}
        <div className="flex items-center gap-3 px-4 pb-2.5 overflow-x-auto scrollbar-hide">
          {currentStreak > 0 && (
            <div className="flex items-center gap-1 flex-shrink-0">
              <Flame className="h-3.5 w-3.5 text-orange-400" />
              <span className="text-xs font-bold text-orange-400">{currentStreak}</span>
            </div>
          )}
          <div className="flex items-center gap-1 flex-shrink-0">
            <BookOpen className="h-3.5 w-3.5 text-white" />
            <span className="text-xs text-white">{totalEntries} entries</span>
          </div>
          {longestStreak > 1 && (
            <div className="flex items-center gap-1 flex-shrink-0">
              <TrendingUp className="h-3.5 w-3.5 text-white" />
              <span className="text-xs text-white">Best: {longestStreak}d</span>
            </div>
          )}
          {avgMood && (
            <div className="flex items-center gap-1 flex-shrink-0">
              <span className="text-sm">{moodEmojis[avgMood]}</span>
              <span className="text-xs text-white">avg mood</span>
            </div>
          )}
        </div>

        {/* Search bar - slides down when open */}
        {searchOpen && (
          <div className="px-4 pb-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30" />
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search entries..."
                autoFocus
                className="w-full h-11 pl-10 pr-10 rounded-xl bg-white/[0.06] border border-white/[0.08] text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-elec-yellow/40 focus:ring-1 focus:ring-elec-yellow/20 touch-manipulation"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-1 top-1/2 -translate-y-1/2 h-9 w-9 flex items-center justify-center rounded-full active:bg-white/10 touch-manipulation"
                >
                  <X className="h-4 w-4 text-white" />
                </button>
              )}
            </div>
          </div>
        )}

        {/* View toggle + skill filter pills */}
        <div className="px-4 pb-3 space-y-2.5">
          {/* Feed / Calendar segmented control */}
          <div className="flex gap-1.5">
            <button
              onClick={() => { setViewMode('feed'); setDateFilter(null); }}
              className={`flex items-center gap-1.5 px-4 h-9 rounded-full text-[13px] font-medium touch-manipulation transition-all ${
                viewMode === 'feed'
                  ? 'bg-elec-yellow text-black'
                  : 'bg-white/[0.06] text-white active:bg-white/10'
              }`}
            >
              <List className="h-3.5 w-3.5" />
              Feed
            </button>
            <button
              onClick={() => setViewMode('calendar')}
              className={`flex items-center gap-1.5 px-4 h-9 rounded-full text-[13px] font-medium touch-manipulation transition-all ${
                viewMode === 'calendar'
                  ? 'bg-elec-yellow text-black'
                  : 'bg-white/[0.06] text-white active:bg-white/10'
              }`}
            >
              <CalendarDays className="h-3.5 w-3.5" />
              Calendar
            </button>

            {/* Date filter indicator */}
            {dateFilter && (
              <button
                onClick={() => setDateFilter(null)}
                className="flex items-center gap-1 px-3 h-9 rounded-full bg-elec-yellow/15 text-elec-yellow text-[13px] font-medium touch-manipulation"
              >
                {new Date(dateFilter + 'T00:00:00').toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
                <X className="h-3 w-3" />
              </button>
            )}
          </div>

          {/* Skill filter pills */}
          <div className="flex gap-1.5 overflow-x-auto scrollbar-hide -mx-1 px-1">
            {skillFilterOptions.map(skill => (
              <button
                key={skill}
                onClick={() => setActiveSkillFilter(activeSkillFilter === skill ? null : skill)}
                className={`flex-shrink-0 px-3 h-8 text-[11px] rounded-full font-medium touch-manipulation transition-all whitespace-nowrap ${
                  activeSkillFilter === skill
                    ? 'bg-elec-yellow text-black'
                    : 'bg-white/[0.06] text-white active:bg-white/10'
                }`}
              >
                {skill}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ═══ SCROLLABLE CONTENT ═══ */}
      <div className="flex-1 overflow-y-auto overscroll-contain">
        <div className="max-w-3xl mx-auto px-3 py-3 sm:px-4 space-y-3">
          {/* Weekly Summary (always at top) */}
          <DiaryWeeklySummary entries={entries} />

          {/* Results count when filtered */}
          {(searchQuery.trim() || activeSkillFilter || dateFilter) && (
            <p className="text-xs text-white px-1">
              {filteredEntries.length} entr{filteredEntries.length !== 1 ? 'ies' : 'y'}
              {searchQuery.trim() && <> matching &quot;{searchQuery}&quot;</>}
              {dateFilter && <> on {new Date(dateFilter + 'T00:00:00').toLocaleDateString('en-GB', { day: 'numeric', month: 'long' })}</>}
            </p>
          )}

          {/* Feed or Calendar */}
          {viewMode === 'feed' ? (
            <DiaryFeed
              entries={filteredEntries}
              onEntryTap={handleEntryTap}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onNewEntry={() => { setEditEntry(null); setSheetOpen(true); }}
            />
          ) : (
            <DiaryCalendarView
              entries={entries}
              onDayTap={handleDayTap}
              selectedDate={dateFilter}
            />
          )}

          {/* Bottom breathing room */}
          <div className="h-4" />
        </div>
      </div>

      {/* Entry create/edit sheet */}
      <DiaryEntrySheet
        open={sheetOpen}
        onOpenChange={handleSheetClose}
        onSave={handleSave}
        recentSites={recentSites}
        existingEntry={editEntry}
      />

      {/* Entry detail sheet */}
      <DiaryEntryDetailSheet
        entry={detailEntry}
        open={detailOpen}
        onOpenChange={setDetailOpen}
        onEdit={handleEdit}
        onDelete={handleDelete}
        relatedEntries={detailEntry ? entries.filter(e => e.site_name === detailEntry.site_name && e.id !== detailEntry.id).slice(0, 3) : []}
      />
    </div>
  );
}
