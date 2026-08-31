import { useState, useMemo, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PageFrame, PageHero, itemVariants } from '@/components/college/primitives';
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
  Sparkles,
  type LucideIcon,
} from 'lucide-react';
import FlashcardSetCard from '@/components/apprentice/flashcards/FlashcardSetCard';
import DueTodayCard from '@/components/apprentice/flashcards/DueTodayCard';
import StudyModeSelector from '@/components/apprentice/flashcards/StudyModeSelector';
import StudyTipsCard from '@/components/apprentice/flashcards/StudyTipsCard';
import FlashcardStudySession from '@/components/apprentice/flashcards/FlashcardStudySession';
import FlashcardAchievements from '@/components/apprentice/flashcards/FlashcardAchievements';
import AchievementUnlockToast from '@/components/apprentice/flashcards/AchievementUnlockToast';
import WeeklyProgressCard from '@/components/apprentice/flashcards/WeeklyProgressCard';
import { PullToRefresh } from '@/components/ui/pull-to-refresh';
import { cn } from '@/lib/utils';
import { CARD_SURFACE } from '@/components/ui/card-recipe';
import { Skeleton } from '@/components/ui/skeleton';
import { useStudyStreak } from '@/hooks/useStudyStreak';
import { useFlashcardProgress } from '@/hooks/useFlashcardProgress';
import { useFlashcardAchievements } from '@/hooks/useFlashcardAchievements';
import { useAuth } from '@/contexts/AuthContext';
import { flashcardSetDefinitions, type FlashcardLevel } from '@/data/flashcards';

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
  } | null>(null);
  const [activeCategory, setActiveCategory] = useState('all');

  const {
    streak,
    loading: streakLoading,
    getStreakDisplay,
    refetch: refetchStreak,
  } = useStudyStreak();
  const {
    getSetProgress,
    getDueCards,
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

  const handleStartFlashcards = (setId: string) => {
    setSelectedSet(setId);
    setShowModeSelector(true);
  };

  const handleSelectMode = (mode: string) => {
    if (selectedSet) {
      setStudySession({ setId: selectedSet, mode });
      setShowModeSelector(false);
    }
  };

  const handleExitStudySession = () => {
    setStudySession(null);
    setSelectedSet(null);
  };

  /** Start a "Due Today" review session across all level-filtered sets */
  const handleStartDueToday = () => {
    // Gather all due cards across visible sets, start with the first set that has due cards
    const levelSets = flashcardSetsUI;
    for (const set of levelSets) {
      const due = getDueCards(set.id);
      if (due.length > 0) {
        setStudySession({
          setId: set.id,
          mode: 'spaced',
          dueCardIds: due,
        });
        return;
      }
    }
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
      completed: progress.progressPercentage === 100,
      lastStudied: formatLastStudied(progress.lastStudied),
    };
  });
  const completedSets = setsWithProgress.filter((s) => s.completed).length;
  const masteredCards = setsWithProgress.reduce((sum, s) => sum + (s.masteredCards || 0), 0);
  const overallProgress = totalCards > 0 ? Math.round((masteredCards / totalCards) * 100) : 0;

  // Count due-today cards across level-filtered sets
  const dueTodayCount = levelFilteredSets.reduce((sum, set) => sum + getDueCards(set.id).length, 0);

  // Filter by category (composes with level filter)
  const filteredSets = useMemo(() => {
    if (activeCategory === 'all') return setsWithProgress;
    return setsWithProgress.filter((s) => s.category === activeCategory);
  }, [activeCategory, setsWithProgress]);

  // Show study session if active
  if (studySession) {
    return (
      <div className="animate-fade-in">
        <FlashcardStudySession
          setId={studySession.setId}
          studyMode={studySession.mode}
          onExit={handleExitStudySession}
          dueCardIds={studySession.dueCardIds}
        />
      </div>
    );
  }

  // Loading skeleton
  if (progressLoading || streakLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 pb-20 space-y-5 pt-4 animate-fade-in">
        <div className="flex items-center justify-between">
          <Skeleton className="h-9 w-9 rounded-lg" />
          <Skeleton className="h-6 w-52" />
        </div>
        <div className="flex gap-2">
          <Skeleton className="flex-1 h-9 rounded-lg" />
          <Skeleton className="flex-1 h-9 rounded-lg" />
          <Skeleton className="flex-1 h-9 rounded-lg" />
        </div>
        <div className="grid grid-cols-4 gap-2">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-20 rounded-xl" />
          ))}
        </div>
        <Skeleton className="h-16 rounded-xl" />
        {[1, 2, 3, 4].map((i) => (
          <Skeleton key={i} className="h-24 rounded-xl" />
        ))}
      </div>
    );
  }

  // First-time welcome state for new users
  if (streak.totalSessions === 0 && masteredCards === 0) {
    // Fall through to the normal view but we'll show a welcome banner
  }

  const statPills = [
    {
      label: 'Sets',
      value: `${completedSets}/${totalSets}`,
      icon: CheckCircle,
      colour: 'text-elec-yellow',
    },
    {
      label: 'Mastered',
      value: `${masteredCards}`,
      icon: Brain,
      colour: 'text-elec-yellow',
    },
    {
      label: 'Progress',
      value: `${overallProgress}%`,
      icon: TrendingUp,
      colour: 'text-elec-yellow',
    },
    {
      label: 'Streak',
      value: streakLoading ? '-' : `${streakInfo.currentStreak}`,
      icon: Flame,
      colour: streakInfo.currentStreak > 0 ? 'text-elec-yellow' : 'text-white',
    },
  ];

  return (
    <PullToRefresh onRefresh={handleRefresh} isRefreshing={isRefreshing}>
      <PageFrame className="space-y-5 px-4 sm:space-y-6 sm:px-6 lg:space-y-6 lg:px-8">
        {/* Achievement unlock toast */}
        <AchievementUnlockToast achievements={recentlyUnlocked} />

        <motion.div variants={itemVariants}>
          <Button
            variant="ghost"
            onClick={goBack}
            className="text-white hover:text-white hover:bg-white/[0.05] active:bg-white/[0.08] -ml-2 h-11 touch-manipulation"
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            Back
          </Button>
        </motion.div>

        <motion.div variants={itemVariants}>
          {/* Eyebrow is not "Apprentice" — the level gating came out and the
              page is now reached from the Study Centre by qualified
              electricians and course learners as well. */}
          <PageHero
            eyebrow="Revision · Microlearning"
            title="Flashcards"
            description="Quick recall for cable colours, BS 7671 regs, EICR codes, safe isolation, fault finding — the kind of facts you need on your tongue, not in a book."
            tone="yellow"
          />
        </motion.div>

        {/* First-time welcome banner */}
        {streak.totalSessions === 0 && masteredCards === 0 && (
          <div
            className={cn(
              'flex items-center gap-3 rounded-2xl border border-elec-yellow/35 p-4',
              CARD_SURFACE
            )}
          >
            <Sparkles className="h-6 w-6 flex-shrink-0 text-elec-yellow" />
            <div>
              <p className="text-sm font-semibold text-white">Welcome to Flashcards</p>
              <p className="mt-0.5 text-xs text-white">
                Pick a set below to start studying. Swipe right for cards you know, left to practise
                again.
              </p>
            </div>
          </div>
        )}

        {/* Stats row */}
        <div className="grid grid-cols-4 gap-2">
          {statPills.map((pill) => {
            const PillIcon = pill.icon;
            return (
              <div
                key={pill.label}
                className={cn(
                  'rounded-2xl border border-elec-yellow/35 px-2 py-3 text-center',
                  CARD_SURFACE
                )}
              >
                <PillIcon className={cn('mx-auto mb-1.5 h-4 w-4', pill.colour)} />
                <div className={cn('text-[19px] font-bold leading-none tabular-nums', pill.colour)}>
                  {pill.value}
                </div>
                <div className="mt-1.5 text-[10px] font-medium uppercase tracking-[0.14em] text-white">
                  {pill.label}
                </div>
              </div>
            );
          })}
        </div>

        {/* Due Today card */}
        <DueTodayCard dueCount={dueTodayCount} onStart={handleStartDueToday} />

        {/* Streak reminder */}
        {!streakInfo.studiedToday && (
          <div
            className={cn(
              'flex items-center gap-3 rounded-2xl border border-orange-400 p-3.5',
              CARD_SURFACE
            )}
          >
            <Clock className="h-5 w-5 flex-shrink-0 text-orange-300" />
            <p className="text-sm text-white">
              Complete a session today to keep your streak alive.
            </p>
          </div>
        )}

        {/* Category toggle grid */}
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveCategory(activeCategory === cat.id ? 'all' : cat.id)}
              className={cn(
                'min-h-[44px] rounded-full border px-4 text-xs font-semibold',
                'touch-manipulation transition-all active:scale-[0.96]',
                activeCategory === cat.id
                  ? 'border-elec-yellow bg-elec-yellow text-black'
                  : cn('border-elec-yellow/35 text-white', CARD_SURFACE)
              )}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Flashcard set list */}
        <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
          {filteredSets.map((set) => (
            <FlashcardSetCard key={set.id} set={set} onStart={handleStartFlashcards} />
          ))}
          {filteredSets.length === 0 && (
            <p className="text-center text-white py-8">No sets in this category.</p>
          )}
        </div>

        {/* Weekly progress card */}
        <WeeklyProgressCard
          totalCardsReviewed={streak.totalCardsReviewed}
          currentStreak={streak.currentStreak}
          masteredSetsCount={completedSets}
          totalSets={totalSets}
          overallProgress={overallProgress}
        />

        {/* Achievements */}
        <FlashcardAchievements achievements={fcAchievements} stats={achievementStats} />

        {/* Study tips (expandable) */}
        <StudyTipsCard />

        {/* Bottom sheet mode selector */}
        <StudyModeSelector
          open={showModeSelector}
          onOpenChange={(open) => {
            setShowModeSelector(open);
            if (!open) setSelectedSet(null);
          }}
          onSelectMode={handleSelectMode}
        />
      </PageFrame>
    </PullToRefresh>
  );
};

export default OnJobFlashcards;
