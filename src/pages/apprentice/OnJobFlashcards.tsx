import { useState, useCallback, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowRight, Search } from 'lucide-react';
import { HubBody, HubMasthead, HubPage } from '@/components/hub/HubPrimitives';
import { chipCn } from '@/components/college/ui/CollegeUi';
import {
  BookOpen,
  Brain,
  Target,
  Flame,
  Zap,
  Shield,
  Lightbulb,
  TrendingUp,
  CheckCircle,
  Clock,
  Cable,
  ShieldCheck,
  Wrench,
  Atom,
  Hammer,
  Leaf,
  type LucideIcon,
} from 'lucide-react';
import StudyModeSelector from '@/components/apprentice/flashcards/StudyModeSelector';
import StudyTipsCard from '@/components/apprentice/flashcards/StudyTipsCard';
import FlashcardStudySession from '@/components/apprentice/flashcards/FlashcardStudySession';
import FlashcardAchievements from '@/components/apprentice/flashcards/FlashcardAchievements';
import AchievementUnlockToast from '@/components/apprentice/flashcards/AchievementUnlockToast';
import WeeklyProgressCard from '@/components/apprentice/flashcards/WeeklyProgressCard';
import { PullToRefresh } from '@/components/ui/pull-to-refresh';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';
import { useStudyStreak } from '@/hooks/useStudyStreak';
import { useFlashcardProgress } from '@/hooks/useFlashcardProgress';
import { useFlashcardAchievements } from '@/hooks/useFlashcardAchievements';
import { useAuth } from '@/contexts/AuthContext';
import { flashcardSetDefinitions, flashcardSets, type FlashcardLevel } from '@/data/flashcards';

/** Resolve icon name strings to Lucide components */
const ICON_MAP: Record<string, LucideIcon> = {
  Target,
  BookOpen,
  Brain,
  Shield,
  Zap,
  Cable,
  ShieldCheck,
  Wrench,
  Atom,
  Hammer,
  Leaf,
  Lightbulb,
  Flame,
  Clock,
  TrendingUp,
  CheckCircle,
};

const CATEGORIES = [
  { id: 'all', label: 'All' },
  { id: 'Regulations', label: 'Regs' },
  { id: 'Testing & Inspection', label: 'Testing' },
  { id: 'Installation', label: 'Install' },
  { id: 'Basic Theory', label: 'Theory' },
  { id: 'Safety', label: 'Safety' },
  { id: 'Green Technology', label: 'Green' },
] as const;

/**
 * `backTo` — where the Back button goes when this page is mounted inside
 * another hub's route tree.
 *
 * Mirrors `LearningVideos`, which the Study Centre already mounts with
 * `backTo="/study-centre"`. Without it, linking here from the Study Centre
 * jumps OUT of the Study Centre route tree, which both renders a blank page
 * and strands the user in the Apprentice hub.
 */
const OnJobFlashcards = ({ backTo }: { backTo?: string } = {}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { profile } = useAuth();

  /**
   * ELE-1656 — go back where they came FROM, not where we assume.
   *
   * Back was hardcoded to `/apprentice/on-job-tools`, so anyone arriving from
   * the Study Centre got dumped into the Apprentice hub. There are far more
   * than two ways in — Dashboard, On-Job Tools, Inspection & Testing, a BS 7671
   * step, topic mastery, smart recommendations and search all link here — so
   * history is the only thing that actually knows.
   *
   * `location.key === 'default'` means this is the first entry in the session
   * (deep link, refresh, or opened from outside), where there is nothing to go
   * back to and `navigate(-1)` would leave the app. Only then do we guess.
   */
  const goBack = useCallback(() => {
    // An explicit destination from the mounting route always wins — it knows
    // which hub the user is actually inside.
    if (backTo) {
      navigate(backTo);
      return;
    }
    if (location.key !== 'default') navigate(-1);
    else navigate('/apprentice/on-job-tools');
  }, [backTo, location.key, navigate]);

  const [selectedSet, setSelectedSet] = useState<string | null>(null);
  const [showModeSelector, setShowModeSelector] = useState(false);
  const [studySession, setStudySession] = useState<{
    setId: string;
    mode: string;
    dueCardIds?: string[];
    /** "Keep going": the order to serve the deck in. */
    orderIds?: string[];
    /** Set for a Due Today session, which spans every deck. */
    queue?: { setId: string; cardId: string }[];
  } | null>(null);
  const [activeCategory, setActiveCategory] = useState('all');
  const [sessionKey, setSessionKey] = useState(0);

  const {
    streak,
    loading: streakLoading,
    getStreakDisplay,
    refetch: refetchStreak,
  } = useStudyStreak();
  const {
    progress: cardProgress,
    getSetProgress,
    getAllDueCards,
    loading: progressLoading,
    refetch: refetchProgress,
  } = useFlashcardProgress();
  const {
    achievements: fcAchievements,
    recentlyUnlocked,
    stats: achievementStats,
  } = useFlashcardAchievements();

  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    await Promise.all([refetchStreak(), refetchProgress()]);
    setIsRefreshing(false);
  }, [refetchStreak, refetchProgress]);

  const streakInfo = getStreakDisplay();

  const formatLastStudied = (isoDate: string | null): string | undefined => {
    if (!isoDate) return undefined;
    const diffMs = Date.now() - new Date(isoDate).getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    return `${diffDays} days ago`;
  };

  /** Build UI-ready set objects from the data-layer definitions */
  const flashcardSetsUI = flashcardSetDefinitions.map((def) => ({
    ...def,
    icon: ICON_MAP[def.iconName] || Target,
  }));

  /**
   * Tap a deck: it starts. (It used to open a "choose a study mode" sheet
   * first — a decision before every session.) A deck with cards due, or one
   * already started, goes to spaced repetition; a new deck goes in order.
   * "Ways to study" still opens the sheet for anyone who wants a mode.
   */
  const handleStartFlashcards = (setId: string, startedBefore: boolean, due: number) => {
    // "Review 4 due" reviews those 4, not the whole deck.
    const dueCardIds =
      due > 0
        ? getAllDueCards()
            .filter((d) => d.setId === setId)
            .map((d) => d.cardId)
        : undefined;
    // "Keep going": pick up where you are — cards not seen yet, then the
    // weakest, mastered ones last — rather than the whole deck hardest-first.
    let orderIds: string[] | undefined;
    if (!due && startedBefore) {
      const mastery = new Map(
        cardProgress
          .filter((p) => p.flashcard_set_id === setId)
          .map((p) => [p.card_id, p.mastery_level])
      );
      orderIds = [...(flashcardSets[setId] ?? [])]
        .map((c, i) => ({ id: c.id, m: mastery.get(c.id) ?? -1, i }))
        .sort((a, b) => a.m - b.m || a.i - b.i)
        .map((c) => c.id);
    }
    setSessionKey((k) => k + 1);
    // Coming from a finished session: bring the page's figures up to date too.
    void refetchProgress();
    setStudySession({
      setId,
      mode: due > 0 ? 'spaced' : startedBefore ? 'resume' : 'sequential',
      dueCardIds,
      orderIds,
    });
  };
  /**
   * Where to go after finishing a deck: the deck with the most cards due, or
   * the next deck not started in the same category. Nothing after a mixed
   * "every deck" review (that already covered what was due).
   */
  const nextUpFor = (doneSetId: string | null) => {
    if (!doneSetId) return null;
    const dueNext = [...dueBySet.entries()]
      .filter(([id, n]) => id !== doneSetId && n > 0)
      .sort((a, b) => b[1] - a[1])[0];
    if (dueNext) {
      const deck = setsWithProgress.find((x) => x.id === dueNext[0]);
      if (deck)
        return {
          title: deck.title,
          detail: `${dueNext[1]} ${dueNext[1] === 1 ? 'card' : 'cards'} due`,
          start: () => handleStartFlashcards(deck.id, true, dueNext[1]),
        };
    }
    const done = setsWithProgress.find((x) => x.id === doneSetId);
    const fresh =
      setsWithProgress.find(
        (x) => x.id !== doneSetId && !x.lastStudiedAt && x.category === done?.category
      ) ?? setsWithProgress.find((x) => x.id !== doneSetId && !x.lastStudiedAt);
    return fresh
      ? {
          title: fresh.title,
          detail: `New deck · ${fresh.count} cards`,
          start: () => handleStartFlashcards(fresh.id, false, 0),
        }
      : null;
  };

  const handleChooseMode = (setId: string) => {
    setSelectedSet(setId);
    setShowModeSelector(true);
  };

  const handleSelectMode = (mode: string) => {
    if (selectedSet) {
      setStudySession({ setId: selectedSet, mode });
      setShowModeSelector(false);
    }
  };

  // The session writes progress through its own copy of the hook, so the page
  // refetches on the way back: due counts, mastery and Carry on are current.
  const handleExitStudySession = () => {
    setStudySession(null);
    setSelectedSet(null);
    void refetchProgress();
    void refetchStreak();
  };

  /**
   * Start a "Due Today" review session across every deck.
   *
   * This used to walk the decks and start the FIRST one with anything due,
   * then stop. A learner with forty cards due over eight decks reviewed one
   * deck's worth, came back to a tile still showing a number, and had to
   * guess that tapping it again would do a different deck. The queue is one
   * queue — the schedule does not care which deck a card came from.
   */
  const handleStartDueToday = () => {
    const due = getAllDueCards();
    if (due.length === 0) return;
    setStudySession({
      // Kept for the single-deck props the session still takes; every answer
      // is written against the card's own deck via the queue.
      setId: due[0].setId,
      mode: 'spaced',
      queue: due.map((d) => ({ setId: d.setId, cardId: d.cardId })),
    });
  };

  /*
   * Every set, for everyone.
   *
   * The hub is reached from the Study Centre as well as the Apprentice area,
   * so it serves qualified electricians too. Filtering by apprentice level hid
   * Part 7, EV charging and the A4:2026 changes from anyone on a Level 2 tab —
   * and made no sense at all for a working spark with no apprentice level set.
   */
  const levelFilteredSets = flashcardSetsUI;

  // Calculate stats for filtered level
  const totalSets = levelFilteredSets.length;
  const totalCards = levelFilteredSets.reduce((sum, set) => sum + set.count, 0);
  const setsWithProgress = levelFilteredSets.map((set) => {
    const progress = getSetProgress(set.id, set.count);
    return {
      ...set,
      progressPercentage: progress.progressPercentage,
      masteredCards: progress.masteredCards,
      // >= : mastery rows for cards since removed from a deck can push past 100.
      completed: progress.progressPercentage >= 100,
      lastStudied: formatLastStudied(progress.lastStudied),
      lastStudiedAt: progress.lastStudied,
    };
  });
  const completedSets = setsWithProgress.filter((s) => s.completed).length;
  const masteredCards = setsWithProgress.reduce((sum, s) => sum + (s.masteredCards || 0), 0);
  const overallProgress = totalCards > 0 ? Math.round((masteredCards / totalCards) * 100) : 0;

  // Count due-today cards across level-filtered sets
  const dueTodayCount = getAllDueCards().length;

  // Cards due, per deck — so each deck says what needs doing.
  const dueBySet = new Map<string, number>();
  // Only cards that still exist in their deck (rows can outlive a removed card).
  for (const d of getAllDueCards()) {
    if (!(flashcardSets[d.setId] ?? []).some((c) => c.id === d.cardId)) continue;
    dueBySet.set(d.setId, (dueBySet.get(d.setId) ?? 0) + 1);
  }

  // Started and not finished, most recent first: "Carry on".
  const inProgress = setsWithProgress
    .filter((s) => s.lastStudiedAt && !s.completed)
    .sort((a, b) => String(b.lastStudiedAt).localeCompare(String(a.lastStudiedAt)))
    .slice(0, 3);

  const [query, setQuery] = useState('');
  const q = query.trim().toLowerCase();
  // Category and search compose.
  const filteredSets = setsWithProgress.filter(
    (s) =>
      (activeCategory === 'all' || s.category === activeCategory) &&
      (!q || `${s.title} ${s.description} ${s.category}`.toLowerCase().includes(q))
  );

  // Show study session if active
  const loadedOnce = useRef(false);
  if (!progressLoading && !streakLoading) loadedOnce.current = true;

  if (studySession) {
    return (
      <div className="animate-fade-in">
        <FlashcardStudySession
          // A fresh session for each start (Up next starts one from the finish screen).
          key={sessionKey}
          setId={studySession.setId}
          studyMode={studySession.mode}
          onExit={handleExitStudySession}
          nextUp={nextUpFor(studySession.queue ? null : studySession.setId)}
          dueCardIds={studySession.dueCardIds}
          orderIds={studySession.orderIds}
          queue={studySession.queue}
        />
      </div>
    );
  }

  // Loading skeleton: the first load only, never a refresh after a session.
  // Shaped like the page it stands in for: header, three figures, deck cards.
  if (!loadedOnce.current && (progressLoading || streakLoading)) {
    return (
      <HubPage ground="landing">
        <HubMasthead section="Study Centre" title="Flashcards" onBack={goBack} />
        <HubBody>
          <div aria-busy className="space-y-6">
            <Skeleton className="-mx-4 h-[190px] rounded-none sm:mx-0 sm:rounded-3xl" />
            <div className="grid grid-cols-3 gap-2 sm:gap-3">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-[92px] rounded-2xl" />
              ))}
            </div>
            <div className="grid gap-2.5 sm:grid-cols-2 sm:gap-3 lg:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Skeleton key={i} className="h-[168px] rounded-2xl" />
              ))}
            </div>
          </div>
        </HubBody>
      </HubPage>
    );
  }

  // First-time welcome state for new users
  if (streak.totalSessions === 0 && masteredCards === 0) {
    // Fall through to the normal view but we'll show a welcome banner
  }

  const categoryName: Record<string, string> = {
    Regulations: 'Regulations',
    'Testing & Inspection': 'Testing',
    Installation: 'Installation',
    'Basic Theory': 'Theory',
    Safety: 'Safety',
    'Green Technology': 'Green tech',
  };
  const pillLabel: Record<string, string> = {
    all: 'All',
    Regulations: 'Regulations',
    'Testing & Inspection': 'Testing',
    Installation: 'Installation',
    'Basic Theory': 'Theory',
    Safety: 'Safety',
    'Green Technology': 'Green tech',
  };
  const recommended =
    inProgress[0] ?? setsWithProgress.find((s) => !s.lastStudiedAt) ?? setsWithProgress[0];
  const minutes = Math.max(1, Math.round((dueTodayCount * 8) / 60));
  const cap = (w: string) => w.charAt(0).toUpperCase() + w.slice(1);

  /**
   * A deck (10 Oct 2026, second pass — Andrew: "no icons… make it excellent
   * and not AI like"). Typography does the work: a quiet facts line, the
   * title, one line of description, a thin mastery bar and one status on the
   * right. The whole card starts it; "Options" opens the study modes.
   * Colour only where it means something: orange for cards due, green for
   * mastered. Yellow is kept for the page's one main button.
   */
  const deckCard = (set: (typeof setsWithProgress)[number]) => {
    const due = dueBySet.get(set.id) ?? 0;
    const started = !!set.lastStudiedAt;
    const action = set.completed
      ? { text: 'Revise', cls: 'border-emerald-400/60 text-emerald-300' }
      : due > 0
        ? { text: `Review ${due}`, cls: 'border-orange-400 bg-orange-400 text-black' }
        : started
          ? { text: 'Keep going', cls: 'border-white/[0.3] text-white' }
          : { text: 'Start', cls: 'border-white/[0.3] text-white' };
    const start = () => handleStartFlashcards(set.id, started, due);
    return (
      <div
        key={set.id}
        className="group flex min-w-0 flex-col rounded-2xl border border-white/[0.1] bg-white/[0.03] transition-colors hover:border-white/[0.22] hover:bg-white/[0.05]"
      >
        <button
          type="button"
          onClick={start}
          aria-label={`${action.text}: ${set.title}`}
          className="flex flex-1 flex-col px-4 pb-4 pt-4 text-left touch-manipulation active:bg-white/[0.04] sm:px-5 sm:pt-5"
        >
          <span className="text-[12px] font-medium text-white">
            {[
              categoryName[set.category] ?? set.category,
              cap(set.difficulty),
              `${set.count} cards`,
              set.estimatedTime.replace('mins', 'min'),
            ].join(' · ')}
          </span>
          <span className="mt-1.5 text-[17px] font-semibold leading-snug tracking-tight text-white">
            {set.title}
          </span>
          <span className="mt-1 line-clamp-2 text-[13.5px] leading-snug text-white">
            {set.description}
          </span>
          {started && (
            <span className="mt-4 block h-[3px] overflow-hidden rounded-full bg-white/[0.1]">
              <span
                className="block h-full rounded-full bg-emerald-400"
                style={{ width: `${Math.max(set.progressPercentage, 2)}%` }}
              />
            </span>
          )}
        </button>
        <div className="flex items-center justify-between gap-2 border-t border-white/[0.06] pl-4 pr-2 sm:pl-5">
          <span className="min-w-0 truncate text-[12.5px] font-medium text-white">
            {set.completed
              ? 'All mastered'
              : started
                ? `${set.masteredCards} of ${set.count} mastered`
                : 'Not started'}
          </span>
          <span className="flex shrink-0 items-center">
            <button
              type="button"
              onClick={() => handleChooseMode(set.id)}
              className="h-11 rounded-lg px-2.5 text-[12.5px] font-medium text-white touch-manipulation hover:underline active:bg-white/[0.06]"
            >
              Options
            </button>
            <button
              type="button"
              onClick={start}
              aria-label={`${action.text}: ${set.title}`}
              className="flex h-11 items-center px-1 touch-manipulation"
            >
              <span
                className={cn(
                  'rounded-full border px-3.5 py-1.5 text-[13px] font-semibold transition-colors active:scale-[0.97]',
                  action.cls
                )}
              >
                {action.text}
              </span>
            </button>
          </span>
        </div>
      </div>
    );
  };

  return (
    <PullToRefresh onRefresh={handleRefresh} isRefreshing={isRefreshing}>
      <HubPage ground="landing">
        <HubMasthead
          section={backTo === '/study-centre' ? 'Study Centre' : 'Revision'}
          title="Flashcards"
          onBack={goBack}
        />
        <HubBody>
          <AchievementUnlockToast achievements={recentlyUnlocked} />

          {/* ── What to do now ── */}
          <section className="relative -mx-4 overflow-hidden card-landing max-sm:!rounded-none max-sm:!border-x-0 px-5 py-6 sm:mx-0 sm:rounded-3xl sm:px-8 sm:py-8">
            <span
              aria-hidden
              className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-elec-yellow/0 via-elec-yellow/70 to-elec-yellow/0"
            />
            <div className="flex flex-col gap-6 lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,380px)] lg:items-end lg:gap-x-10">
              <div className="min-w-0">
                <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-elec-yellow">
                  Flashcards
                </p>
                <h1 className="mt-1.5 text-[28px] font-bold leading-[1.1] tracking-tight text-white sm:text-[38px]">
                  {dueTodayCount > 0
                    ? `${dueTodayCount} ${dueTodayCount === 1 ? 'card' : 'cards'} to review`
                    : !setsWithProgress.some((s) => s.lastStudiedAt)
                      ? 'Start your first deck'
                      : 'All caught up'}
                </h1>
                <p className="mt-2.5 max-w-2xl text-[15px] leading-relaxed text-white">
                  {dueTodayCount > 0
                    ? 'These are the cards you’re about to forget. A few minutes now keeps them stuck.'
                    : 'Quick recall for cable colours, BS 7671 regs, EICR codes, safe isolation and fault finding. Tap a deck to start; swipe right for cards you know.'}
                </p>
              </div>
              <div className="min-w-0">
                {dueTodayCount > 0 ? (
                  <button
                    type="button"
                    onClick={handleStartDueToday}
                    className="flex min-h-[56px] w-full items-center justify-between gap-3 rounded-xl bg-elec-yellow px-4 py-3 text-left text-black transition-transform touch-manipulation active:scale-[0.99]"
                  >
                    <span>
                      <span className="block text-[16px] font-bold leading-tight">
                        Review {dueTodayCount} {dueTodayCount === 1 ? 'card' : 'cards'}
                      </span>
                      <span className="mt-0.5 block text-[12.5px] font-medium">
                        About {minutes} {minutes === 1 ? 'minute' : 'minutes'}, every deck in one go
                      </span>
                    </span>
                    <ArrowRight className="h-5 w-5 shrink-0" aria-hidden />
                  </button>
                ) : recommended ? (
                  <button
                    type="button"
                    onClick={() =>
                      handleStartFlashcards(recommended.id, !!recommended.lastStudiedAt, 0)
                    }
                    className="flex min-h-[56px] w-full items-center justify-between gap-3 rounded-xl bg-elec-yellow px-4 py-3 text-left text-black transition-transform touch-manipulation active:scale-[0.99]"
                  >
                    <span className="min-w-0">
                      <span className="block text-[16px] font-bold leading-tight">
                        {recommended.lastStudiedAt ? 'Carry on' : 'Start with'}
                      </span>
                      <span className="mt-0.5 block truncate text-[12.5px] font-medium">
                        {recommended.title}
                      </span>
                    </span>
                    <ArrowRight className="h-5 w-5 shrink-0" aria-hidden />
                  </button>
                ) : null}
              </div>
            </div>
          </section>

          {/* ── Three figures that matter ── */}
          <div className="grid grid-cols-3 gap-2 sm:gap-3">
            {[
              {
                label: 'Due today',
                value: String(dueTodayCount),
                sub: dueTodayCount ? 'cards waiting' : 'nothing waiting',
                tone: dueTodayCount ? 'text-orange-400' : 'text-white',
              },
              {
                label: 'Mastered',
                value: String(masteredCards),
                sub: `of ${totalCards.toLocaleString()} cards`,
                tone: masteredCards ? 'text-emerald-400' : 'text-white',
              },
              {
                label: 'Day streak',
                value: streakLoading ? '–' : String(streakInfo.currentStreak),
                sub: streakInfo.studiedToday ? 'studied today' : 'study today to keep it',
                tone: 'text-white',
              },
            ].map((f) => (
              <div
                key={f.label}
                className="min-w-0 rounded-2xl border border-white/[0.12] bg-white/[0.04] px-3.5 py-3 sm:px-5 sm:py-4"
              >
                <p className="text-[12.5px] font-semibold text-white">{f.label}</p>
                <p className={cn('mt-1 text-[26px] font-black leading-none tabular-nums', f.tone)}>
                  {f.value}
                </p>
                <p className="mt-1 text-[12px] font-medium leading-snug text-white">{f.sub}</p>
              </div>
            ))}
          </div>

          {/* ── Carry on ── */}
          {inProgress.length > 0 && (
            <section className="space-y-3" aria-labelledby="fc-carry-on">
              <h2
                id="fc-carry-on"
                className="text-[18px] font-bold tracking-tight text-white sm:text-[20px]"
              >
                Carry on
              </h2>
              <div className="grid gap-2.5 sm:grid-cols-2 sm:gap-3 lg:grid-cols-3">
                {inProgress.map(deckCard)}
              </div>
            </section>
          )}

          {/* ── Every deck ── */}
          <section className="space-y-3" aria-labelledby="fc-all">
            <div className="flex items-baseline justify-between gap-3">
              <h2
                id="fc-all"
                className="text-[18px] font-bold tracking-tight text-white sm:text-[20px]"
              >
                All decks
              </h2>
              <span className="text-[13px] font-medium text-white">
                {filteredSets.length} {filteredSets.length === 1 ? 'deck' : 'decks'}
              </span>
            </div>
            <label className="relative block">
              <span className="sr-only">Search decks</span>
              <Search
                className="pointer-events-none absolute left-1 top-1/2 h-4 w-4 -translate-y-1/2 text-white"
                aria-hidden
              />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search decks: Zs, EV, safe isolation…"
                className="input-underline h-11 w-full rounded-none border-0 border-b border-white/[0.15] bg-transparent pl-7 pr-1 text-base font-medium text-white placeholder:text-white/25 caret-elec-yellow transition-colors hover:border-white/[0.3] focus:border-elec-yellow focus:outline-none focus:ring-0 focus-visible:ring-0 [color-scheme:dark] touch-manipulation"
              />
            </label>
            <div role="group" aria-label="Category" className="flex flex-wrap gap-2">
              {CATEGORIES.map((cat) => {
                const n =
                  cat.id === 'all'
                    ? setsWithProgress.length
                    : setsWithProgress.filter((s) => s.category === cat.id).length;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    aria-pressed={activeCategory === cat.id}
                    onClick={() => setActiveCategory(activeCategory === cat.id ? 'all' : cat.id)}
                    className={chipCn(activeCategory === cat.id)}
                  >
                    {pillLabel[cat.id] ?? cat.label}
                    <span className="ml-1.5 tabular-nums">{n}</span>
                  </button>
                );
              })}
            </div>
            {filteredSets.length === 0 ? (
              <p className="rounded-2xl border border-white/[0.12] p-5 text-[14px] text-white">
                No decks match that. Try another word or clear the filter.
              </p>
            ) : (
              <div className="grid gap-2.5 sm:grid-cols-2 sm:gap-3 lg:grid-cols-3">
                {/* Carry-on decks aren't repeated here unless you're searching or filtering. */}
                {(q || activeCategory !== 'all'
                  ? filteredSets
                  : filteredSets.filter((x) => !inProgress.some((p) => p.id === x.id))
                ).map(deckCard)}
              </div>
            )}
          </section>

          {/* The long view: achievements beside progress and tips on a computer. */}
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,380px)] lg:items-start">
            <FlashcardAchievements achievements={fcAchievements} stats={achievementStats} />
            <div className="space-y-6">
              <WeeklyProgressCard
                totalCardsReviewed={streak.totalCardsReviewed}
                currentStreak={streak.currentStreak}
                masteredSetsCount={completedSets}
                totalSets={totalSets}
                overallProgress={overallProgress}
              />
              <StudyTipsCard />
            </div>
          </div>

          <StudyModeSelector
            open={showModeSelector}
            onOpenChange={(open) => {
              setShowModeSelector(open);
              if (!open) setSelectedSet(null);
            }}
            onSelectMode={handleSelectMode}
            deckTitle={setsWithProgress.find((x) => x.id === selectedSet)?.title}
            cardCount={setsWithProgress.find((x) => x.id === selectedSet)?.count}
            recommended={
              setsWithProgress.find((x) => x.id === selectedSet)?.lastStudiedAt
                ? 'spaced'
                : 'sequential'
            }
          />
        </HubBody>
      </HubPage>
    </PullToRefresh>
  );
};

export default OnJobFlashcards;
