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
  Sparkles,
  ChevronDown,
  ChevronUp,
  ChevronRight,
  RefreshCw,
  Lightbulb,
  Brain,
  AlertTriangle,
  Briefcase,
} from 'lucide-react';
import { useSiteDiaryEntries } from '@/hooks/site-diary/useSiteDiaryEntries';
import { useDiaryStreak } from '@/hooks/site-diary/useDiaryStreak';
import { useDiaryCoach } from '@/hooks/site-diary/useDiaryCoach';
import type { PortfolioNudge } from '@/hooks/site-diary/useDiaryCoach';
import { useStudentQualification } from '@/hooks/useStudentQualification';
import { usePortfolioData } from '@/hooks/portfolio/usePortfolioData';
import { useQualificationACs } from '@/hooks/qualification/useQualificationACs';
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
  const {
    currentStreak,
    longestStreak,
    totalEntries,
    nextMilestone,
    daysToNextMilestone,
    streakMessage,
  } = useDiaryStreak(entries);
  const { qualificationCode } = useStudentQualification();
  const {
    insight: coachInsight,
    isLoading: coachLoading,
    error: coachError,
    refresh: refreshCoach,
  } = useDiaryCoach(entries, qualificationCode);
  // Portfolio data for evidence awareness
  const { entries: portfolioEntries } = usePortfolioData();
  const evidencedACSet = useMemo(() => {
    const set = new Set<string>();
    for (const pe of portfolioEntries) {
      for (const ac of pe.assessmentCriteria || []) {
        // ACs stored as e.g. "301 AC 2.3 Describe the types..." — extract unit+acRef
        const match = ac.match(/^(\S+)\s+AC\s+(\S+)/);
        if (match) set.add(`${match[1]}.${match[2]}`);
      }
    }
    return set;
  }, [portfolioEntries]);

  // Qualification units for course-aware skill prompts
  const { tree: qualificationTree } = useQualificationACs(qualificationCode);
  const qualificationUnits = useMemo(
    () => qualificationTree.units.map((u) => ({ unitCode: u.unitCode, unitTitle: u.unitTitle })),
    [qualificationTree.units]
  );

  const [coachExpanded, setCoachExpanded] = useState(true);
  const [viewMode, setViewMode] = useState<ViewMode>('feed');
  const [sheetOpen, setSheetOpen] = useState(false);
  const [sheetInitialDate, setSheetInitialDate] = useState<string | null>(null);
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
    const withMood = entries.filter((e) => e.mood_rating);
    if (withMood.length === 0) return null;
    const avg = withMood.reduce((sum, e) => sum + (e.mood_rating || 0), 0) / withMood.length;
    return Math.round(avg);
  }, [entries]);

  // Filtered entries
  const filteredEntries = useMemo(() => {
    let filtered = entries;

    if (dateFilter) {
      filtered = filtered.filter((e) => e.date === dateFilter);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (e) =>
          e.site_name.toLowerCase().includes(q) ||
          e.tasks_completed.some((t) => t.toLowerCase().includes(q)) ||
          (e.what_i_learned && e.what_i_learned.toLowerCase().includes(q))
      );
    }

    if (activeSkillFilter) {
      filtered = filtered.filter((e) => e.skills_practised.includes(activeSkillFilter));
    }

    return filtered;
  }, [entries, searchQuery, activeSkillFilter, dateFilter]);

  // Build nudge map for feed badges
  const nudgeMap = useMemo(() => {
    const map = new Map<string, PortfolioNudge>();
    coachInsight?.portfolioNudges?.forEach((n) => map.set(n.entryId, n));
    return map;
  }, [coachInsight?.portfolioNudges]);

  // Portfolio opportunities: un-linked diary entries with portfolio nudges
  const portfolioOpportunities = useMemo(() => {
    if (!coachInsight?.portfolioNudges) return [];
    return coachInsight.portfolioNudges.filter((n) => {
      const entry = entries.find((e) => e.id === n.entryId);
      return entry && !entry.linked_portfolio_id;
    });
  }, [coachInsight?.portfolioNudges, entries]);

  const handleEntryTap = useCallback((entry: SiteDiaryEntry) => {
    setDetailEntry(entry);
    setDetailOpen(true);
  }, []);

  const handleEdit = useCallback((entry: SiteDiaryEntry) => {
    setDetailOpen(false);
    setEditEntry(entry);
    setSheetOpen(true);
  }, []);

  const handleDelete = useCallback(
    async (id: string) => {
      await deleteEntry(id);
      setDetailOpen(false);
      setDetailEntry(null);
    },
    [deleteEntry]
  );

  const handleDayTap = useCallback(
    (date: string) => {
      // If already filtering by this date, clear it; otherwise set filter and switch to feed
      if (dateFilter === date) {
        setDateFilter(null);
      } else {
        setDateFilter(date);
        setViewMode('feed');
      }
    },
    [dateFilter]
  );

  const handleSheetClose = useCallback(() => {
    setSheetOpen(false);
    setEditEntry(null);
    setSheetInitialDate(null);
  }, []);

  const handleSave = useCallback(
    async (entry: Parameters<typeof createEntry>[0]) => {
      if (editEntry) {
        await updateEntry(editEntry.id, entry);
      } else {
        await createEntry(entry);
      }
    },
    [editEntry, updateEntry, createEntry]
  );

  return (
    <div className="flex flex-col bg-background min-h-0">
      {/* ═══ FIXED TOP BAR ═══ */}
      <div className="flex-shrink-0 bg-[hsl(0_0%_8%)]/92 backdrop-blur-md border-b border-white/[0.06] z-20">
        {/* Title row */}
        <div className="flex items-center gap-2 sm:gap-3 px-3 sm:px-4 h-14">
          <button
            onClick={() => navigate('/apprentice')}
            className="inline-flex items-center justify-center gap-2 h-11 px-2 -ml-1 rounded-md text-[11px] sm:text-[12px] uppercase tracking-[0.18em] text-white/55 hover:text-white/85 transition-colors touch-manipulation flex-shrink-0"
            aria-label="Back to apprentice hub"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="hidden md:inline">Apprentice hub</span>
          </button>
          <div className="hidden md:block h-5 w-px bg-white/10 flex-shrink-0" />

          <div className="flex-1 min-w-0">
            <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55 block truncate">
              <span className="hidden sm:inline">Site diary · Daily logbook</span>
              <span className="sm:hidden">Site diary</span>
            </span>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-1 flex-shrink-0">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className={`h-10 w-10 flex items-center justify-center rounded-md touch-manipulation transition-colors ${
                searchOpen
                  ? 'bg-elec-yellow/[0.10] text-elec-yellow'
                  : 'active:bg-white/[0.06] text-white/70'
              }`}
              aria-label="Search entries"
            >
              <Search className="h-4 w-4" />
            </button>
            <button
              onClick={() => {
                setEditEntry(null);
                setSheetOpen(true);
              }}
              className="h-10 inline-flex items-center justify-center gap-1.5 px-3 sm:px-4 rounded-md bg-elec-yellow text-black text-[12.5px] font-semibold hover:bg-elec-yellow/90 active:scale-[0.97] transition-all touch-manipulation"
            >
              <Plus className="h-4 w-4" strokeWidth={2.5} />
              <span className="hidden sm:inline">Log entry</span>
            </button>
          </div>
        </div>

        {/* Stats ribbon */}
        <div className="flex items-center gap-2.5 px-3 sm:px-4 pb-2.5 overflow-x-auto scrollbar-hide sm:flex-wrap">
          {currentStreak > 0 ? (
            <div className="flex items-center gap-1.5 flex-shrink-0 px-2 h-7 rounded-md border border-elec-yellow/25 bg-elec-yellow/[0.06]">
              <Flame className="h-3 w-3 text-elec-yellow" />
              <span className="text-[11px] font-mono tabular-nums text-elec-yellow">
                {currentStreak}d streak
              </span>
              {nextMilestone && daysToNextMilestone > 0 && (
                <span className="text-[10px] font-mono tabular-nums text-elec-yellow/70">
                  · {daysToNextMilestone}d to {nextMilestone}
                </span>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-1.5 flex-shrink-0 px-2 h-7 rounded-md border border-white/[0.08] bg-white/[0.02]">
              <Flame className="h-3 w-3 text-white/55" />
              <span className="text-[11px] text-white/70">{streakMessage}</span>
            </div>
          )}
          <div className="flex items-center gap-1.5 flex-shrink-0">
            <BookOpen className="h-3 w-3 text-white/40" />
            <span className="text-[11px] font-mono tabular-nums text-white/85">
              {totalEntries} entries
            </span>
          </div>
          {longestStreak > 1 && (
            <div className="flex items-center gap-1.5 flex-shrink-0">
              <TrendingUp className="h-3 w-3 text-white/40" />
              <span className="text-[11px] font-mono tabular-nums text-white/85">
                Best {longestStreak}d
              </span>
            </div>
          )}
          {avgMood && (
            <div className="flex items-center gap-1 flex-shrink-0">
              <span className="text-[13px] leading-none">{moodEmojis[avgMood]}</span>
              <span className="text-[11px] text-white/55 uppercase tracking-[0.14em]">
                avg mood
              </span>
            </div>
          )}
        </div>

        {/* Search bar - slides down when open */}
        {searchOpen && (
          <div className="px-4 pb-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white" />
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search entries..."
                autoFocus
                className="w-full h-11 pl-10 pr-10 rounded-xl bg-white/[0.06] border border-white/[0.08] text-white text-sm placeholder:text-white focus:outline-none focus:border-elec-yellow/40 focus:ring-1 focus:ring-elec-yellow/20 touch-manipulation"
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
              onClick={() => {
                setViewMode('feed');
                setDateFilter(null);
              }}
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
                {new Date(dateFilter + 'T00:00:00').toLocaleDateString('en-GB', {
                  day: 'numeric',
                  month: 'short',
                })}
                <X className="h-3 w-3" />
              </button>
            )}
          </div>

          {/* Skill filter pills */}
          <div className="flex gap-1.5 overflow-x-auto scrollbar-hide -mx-1 px-1 sm:flex-wrap">
            {skillFilterOptions.map((skill) => (
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
      <div className="flex-1">
        <div className="max-w-7xl mx-auto px-3 py-3 sm:px-6 lg:px-8 space-y-3">
          {/* Weekly Summary (full width) */}
          <DiaryWeeklySummary entries={entries} aiSummary={coachInsight?.weekSummary} />

          {/* Portfolio + AI Coach */}
          <div className="space-y-3">
            {/* Portfolio Opportunities card */}
            {portfolioOpportunities.length > 0 && (
              <button
                onClick={() => {
                  const nudge = portfolioOpportunities[0];
                  const target = entries.find((e) => e.id === nudge.entryId);
                  if (target) {
                    setDetailEntry(target);
                    setDetailOpen(true);
                  }
                }}
                className="w-full rounded-xl border border-elec-yellow/25 bg-elec-yellow/[0.04] overflow-hidden text-left touch-manipulation active:bg-elec-yellow/[0.08] transition-colors"
              >
                <div className="px-4 py-3 flex items-center gap-3">
                  <div className="h-9 w-9 rounded-md border border-elec-yellow/30 bg-elec-yellow/[0.06] flex items-center justify-center flex-shrink-0">
                    <Briefcase className="h-4 w-4 text-elec-yellow" />
                  </div>
                  <div className="flex-1 min-w-0 space-y-0.5">
                    <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-elec-yellow/85">
                      Portfolio opportunity
                    </span>
                    <p className="text-[13px] text-white leading-snug">
                      <span className="font-mono tabular-nums">
                        {portfolioOpportunities.length}
                      </span>{' '}
                      entr{portfolioOpportunities.length !== 1 ? 'ies' : 'y'} could
                      strengthen your portfolio
                    </p>
                  </div>
                  <ChevronRight className="h-4 w-4 text-white/40 flex-shrink-0" />
                </div>
              </button>
            )}

            {/* AI Coach card — only when 3+ entries */}
            {entries.length >= 3 && (
              <div className="rounded-xl overflow-hidden border border-white/[0.06] bg-[hsl(0_0%_10%)]">
                <button
                  onClick={() => setCoachExpanded(!coachExpanded)}
                  className="w-full flex items-center justify-between px-4 py-3 touch-manipulation"
                >
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-elec-yellow" />
                    <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                      AI coach
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    {!coachLoading && coachInsight && (
                      <div
                        role="button"
                        tabIndex={0}
                        onClick={(e) => {
                          e.stopPropagation();
                          refreshCoach();
                        }}
                        onKeyDown={(e) => { if (e.key === 'Enter') { e.stopPropagation(); refreshCoach(); } }}
                        className="h-8 px-2.5 flex items-center gap-1.5 rounded-md border border-white/[0.08] bg-white/[0.02] touch-manipulation cursor-pointer active:bg-white/[0.04] transition-colors"
                      >
                        <RefreshCw className="h-3 w-3 text-white/70" />
                        <span className="text-[10.5px] font-medium text-white/85">Refresh</span>
                      </div>
                    )}
                    {coachExpanded ? (
                      <ChevronUp className="h-4 w-4 text-white/40 ml-1" />
                    ) : (
                      <ChevronDown className="h-4 w-4 text-white/40 ml-1" />
                    )}
                  </div>
                </button>

                {coachExpanded && !coachInsight && !coachLoading && !coachError && (
                  <div className="px-4 pb-4">
                    <button
                      onClick={refreshCoach}
                      className="w-full inline-flex items-center justify-center gap-2 h-11 rounded-xl bg-elec-yellow text-black text-[13px] font-semibold hover:bg-elec-yellow/90 active:scale-[0.98] transition-all touch-manipulation"
                    >
                      <Sparkles className="h-4 w-4" />
                      Get AI insights
                    </button>
                    <p className="text-[11px] text-white/55 text-center mt-2">
                      Analyses your recent entries for patterns and guidance
                    </p>
                  </div>
                )}

                {coachExpanded && coachLoading && !coachInsight && (
                  <div className="flex items-center justify-center py-6 px-4">
                    <div className="animate-spin h-4 w-4 border-2 border-elec-yellow border-t-transparent rounded-full" />
                    <span className="text-[11px] text-white/55 uppercase tracking-[0.14em] ml-2">
                      Analysing…
                    </span>
                  </div>
                )}

                {coachExpanded && coachError && !coachLoading && !coachInsight && (
                  <div className="px-4 pb-4 space-y-2">
                    <div className="flex items-start gap-2 px-3 py-2.5 rounded-md border border-red-500/30 bg-red-500/[0.04]">
                      <AlertTriangle className="h-3.5 w-3.5 text-red-300 mt-0.5 flex-shrink-0" />
                      <p className="text-[12px] text-red-300 leading-relaxed">{coachError}</p>
                    </div>
                    <button
                      onClick={refreshCoach}
                      className="w-full inline-flex items-center justify-center gap-2 h-10 rounded-md border border-white/[0.08] bg-white/[0.02] text-[12px] font-medium text-white/85 hover:bg-white/[0.04] active:scale-[0.98] transition-all touch-manipulation"
                    >
                      Try again
                    </button>
                  </div>
                )}

                {coachExpanded && coachInsight && (
                  <div className="px-4 pb-4 space-y-4 border-t border-white/[0.04]">
                    <p className="text-[10px] uppercase tracking-[0.18em] text-white/40 text-center pt-3">
                      Based on {entries.length} entr{entries.length !== 1 ? 'ies' : 'y'}
                    </p>

                    {/* Encouragement */}
                    <div className="px-4 py-3 rounded-md border border-elec-yellow/20 bg-elec-yellow/[0.04]">
                      <p className="text-[13px] text-white/85 leading-relaxed">
                        {coachInsight.encouragement}
                      </p>
                    </div>

                    {/* 2-col grid on desktop for key insights */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-2.5">
                      {/* Recommendation */}
                      <div className="px-4 py-3 rounded-md border border-white/[0.06] bg-white/[0.02] space-y-1.5">
                        <div className="flex items-center gap-1.5">
                          <Lightbulb className="h-3.5 w-3.5 text-elec-yellow/85" />
                          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                            Next steps
                          </span>
                        </div>
                        <p className="text-[12.5px] text-white/85 leading-relaxed">
                          {coachInsight.recommendation}
                        </p>
                      </div>

                      {/* Mood */}
                      {coachInsight.moodInsight && (
                        <div className="px-4 py-3 rounded-md border border-white/[0.06] bg-white/[0.02] space-y-1.5">
                          <div className="flex items-center gap-1.5">
                            <Brain className="h-3.5 w-3.5 text-white/55" />
                            <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                              Wellbeing
                            </span>
                          </div>
                          <p className="text-[12.5px] text-white/85 leading-relaxed">
                            {coachInsight.moodInsight}
                          </p>
                        </div>
                      )}

                      {/* Regulation tip */}
                      {coachInsight.regulationTip && (
                        <div className="px-4 py-3 rounded-md border border-elec-yellow/20 bg-elec-yellow/[0.04] space-y-1.5">
                          <div className="flex items-center gap-1.5">
                            <AlertTriangle className="h-3.5 w-3.5 text-elec-yellow/85" />
                            <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-elec-yellow/85">
                              BS 7671 tip
                            </span>
                          </div>
                          <p className="text-[12.5px] text-white/85 leading-relaxed">
                            {coachInsight.regulationTip}
                          </p>
                        </div>
                      )}

                      {/* KSB + Qualification */}
                      {(coachInsight.ksbSuggestion || coachInsight.qualificationProgress) && (
                        <div className="px-4 py-3 rounded-md border border-white/[0.06] bg-white/[0.02] space-y-1.5">
                          <div className="flex items-center gap-1.5">
                            <BookOpen className="h-3.5 w-3.5 text-white/55" />
                            <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                              Evidence & progress
                            </span>
                          </div>
                          {coachInsight.ksbSuggestion && (
                            <p className="text-[12.5px] text-white/85 leading-relaxed">
                              {coachInsight.ksbSuggestion}
                            </p>
                          )}
                          {coachInsight.qualificationProgress && (
                            <p className="text-[12px] text-white/70 leading-relaxed mt-1">
                              {coachInsight.qualificationProgress}
                            </p>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Skill gaps */}
                    {coachInsight.skillGaps && coachInsight.skillGaps.length > 0 && (
                      <div className="space-y-2">
                        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                          Skills to practise
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {coachInsight.skillGaps.map((skill) => (
                            <span
                              key={skill}
                              className="inline-flex items-center h-7 px-2 rounded-md border border-white/[0.08] bg-white/[0.02] text-[11px] text-white/85"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Portfolio evidence suggestion */}
                    {coachInsight.suggestedEvidence && (
                      <button
                        onClick={() => {
                          const nudge = coachInsight.portfolioNudges?.[0];
                          if (nudge) {
                            const target = entries.find((e) => e.id === nudge.entryId);
                            if (target) { setDetailEntry(target); setDetailOpen(true); }
                          }
                        }}
                        className="w-full flex items-start gap-3 px-4 py-3 min-h-[44px] rounded-md border border-elec-yellow/20 bg-elec-yellow/[0.04] text-left touch-manipulation active:bg-elec-yellow/[0.08] transition-colors"
                      >
                        <Briefcase className="h-4 w-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                        <div className="flex-1 min-w-0 space-y-1">
                          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-elec-yellow/85">
                            Portfolio suggestion
                          </span>
                          <p className="text-[12.5px] text-white/85 leading-relaxed">
                            {coachInsight.suggestedEvidence}
                          </p>
                          {coachInsight.portfolioNudges?.[0] && (
                            <p className="text-[10.5px] text-elec-yellow/70">
                              Tap to view & add to portfolio
                            </p>
                          )}
                        </div>
                        {coachInsight.portfolioNudges?.[0] && (
                          <ChevronRight className="h-4 w-4 text-elec-yellow/60 mt-0.5 flex-shrink-0" />
                        )}
                      </button>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Results count when filtered */}
          {(searchQuery.trim() || activeSkillFilter || dateFilter) && (
            <p className="text-xs text-white px-1">
              {filteredEntries.length} entr{filteredEntries.length !== 1 ? 'ies' : 'y'}
              {searchQuery.trim() && <> matching &quot;{searchQuery}&quot;</>}
              {dateFilter && (
                <>
                  {' '}
                  on{' '}
                  {new Date(dateFilter + 'T00:00:00').toLocaleDateString('en-GB', {
                    day: 'numeric',
                    month: 'long',
                  })}
                </>
              )}
            </p>
          )}

          {/* Feed or Calendar */}
          {viewMode === 'feed' ? (
            <DiaryFeed
              entries={filteredEntries}
              onEntryTap={handleEntryTap}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onNewEntry={() => {
                setEditEntry(null);
                setSheetOpen(true);
              }}
              portfolioNudges={nudgeMap}
            />
          ) : (
            <DiaryCalendarView
              entries={entries}
              onDayTap={handleDayTap}
              onEmptyDayTap={(date) => {
                setSheetInitialDate(date);
                setEditEntry(null);
                setSheetOpen(true);
              }}
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
        initialDate={sheetInitialDate}
        qualificationUnits={qualificationUnits}
      />

      {/* Entry detail sheet */}
      <DiaryEntryDetailSheet
        entry={detailEntry}
        open={detailOpen}
        onOpenChange={setDetailOpen}
        onEdit={handleEdit}
        onDelete={handleDelete}
        relatedEntries={
          detailEntry
            ? entries
                .filter((e) => e.site_name === detailEntry.site_name && e.id !== detailEntry.id)
                .slice(0, 3)
            : []
        }
        evidencedACs={evidencedACSet}
      />
    </div>
  );
}
