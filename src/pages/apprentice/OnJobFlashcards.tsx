import { useState, useMemo } from 'react';
import { SmartBackButton } from '@/components/ui/smart-back-button';
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
import FlashcardSetCard from '@/components/apprentice/flashcards/FlashcardSetCard';
import DueTodayCard from '@/components/apprentice/flashcards/DueTodayCard';
import StudyModeSelector from '@/components/apprentice/flashcards/StudyModeSelector';
import FlashcardStudySession from '@/components/apprentice/flashcards/FlashcardStudySession';
import FlashcardAchievements from '@/components/apprentice/flashcards/FlashcardAchievements';
import WeeklyProgressCard from '@/components/apprentice/flashcards/WeeklyProgressCard';
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

const LEVEL_TABS: { id: string; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'Level 2', label: 'Level 2' },
  { id: 'Level 3', label: 'Level 3' },
];

const CATEGORIES = [
  { id: 'all', label: 'All' },
  { id: 'Regulations', label: 'Regs' },
  { id: 'Testing & Inspection', label: 'Testing' },
  { id: 'Installation', label: 'Install' },
  { id: 'Basic Theory', label: 'Theory' },
  { id: 'Safety', label: 'Safety' },
  { id: 'Green Technology', label: 'Green' },
] as const;

const OnJobFlashcards = () => {
  const { profile } = useAuth();

  // Auto-default level tab from profile
  const defaultLevel = (() => {
    const lvl = profile?.apprentice_level;
    if (lvl === 'Level 2' || lvl === 'Level 3') return lvl;
    return 'all';
  })();

  const [selectedSet, setSelectedSet] = useState<string | null>(null);
  const [showModeSelector, setShowModeSelector] = useState(false);
  const [studySession, setStudySession] = useState<{
    setId: string;
    mode: string;
    dueCardIds?: string[];
  } | null>(null);
  const [activeLevel, setActiveLevel] = useState(defaultLevel);
  const [activeCategory, setActiveCategory] = useState('all');

  const { streak, loading: streakLoading, getStreakDisplay } = useStudyStreak();
  const { getSetProgress, getDueCards, loading: progressLoading } = useFlashcardProgress();
  const { achievements: fcAchievements, stats: achievementStats } = useFlashcardAchievements();

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

  /** Check if a set matches the selected level filter */
  const matchesLevel = (setLevel: FlashcardLevel, filter: string) => {
    if (filter === 'all') return true;
    return setLevel === filter || setLevel === 'Both';
  };

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
    const levelSets = flashcardSetsUI.filter((s) => matchesLevel(s.level, activeLevel));
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

  // Level-filtered sets
  const levelFilteredSets = flashcardSetsUI.filter((s) => matchesLevel(s.level, activeLevel));

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
      colour: 'text-green-400',
    },
    {
      label: 'Progress',
      value: `${overallProgress}%`,
      icon: TrendingUp,
      colour: 'text-blue-400',
    },
    {
      label: 'Streak',
      value: streakLoading ? '-' : `${streakInfo.currentStreak}`,
      icon: Flame,
      colour: streakInfo.currentStreak > 0 ? 'text-orange-400' : 'text-white',
    },
  ];

  return (
    <div className="max-w-3xl mx-auto px-4 pb-20 space-y-5 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between pt-4">
        <SmartBackButton />
        <div className="flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-elec-yellow" />
          <h1 className="text-lg font-bold text-white">Flashcards & Microlearning</h1>
        </div>
      </div>

      {/* Level tabs */}
      <div className="flex gap-2">
        {LEVEL_TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveLevel(tab.id)}
            className={`
              flex-1 py-2 rounded-lg text-sm font-medium
              border touch-manipulation active:scale-[0.96] transition-all
              ${
                activeLevel === tab.id
                  ? 'bg-elec-yellow/20 border-elec-yellow/40 text-elec-yellow'
                  : 'bg-white/5 border-white/10 text-white'
              }
            `}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-4 gap-2">
        {statPills.map((pill) => {
          const PillIcon = pill.icon;
          return (
            <div
              key={pill.label}
              className="bg-white/5 border border-white/10 rounded-xl p-2.5 text-center"
            >
              <PillIcon className={`h-4 w-4 mx-auto mb-1 ${pill.colour}`} />
              <div className={`text-sm font-bold ${pill.colour}`}>{pill.value}</div>
              <div className="text-[10px] text-white">{pill.label}</div>
            </div>
          );
        })}
      </div>

      {/* Due Today card */}
      <DueTodayCard dueCount={dueTodayCount} onStart={handleStartDueToday} />

      {/* Streak reminder */}
      {!streakInfo.studiedToday && (
        <div className="flex items-center gap-3 p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl">
          <Clock className="h-5 w-5 text-amber-400 flex-shrink-0" />
          <p className="text-sm text-white">Complete a session today to keep your streak alive.</p>
        </div>
      )}

      {/* Category toggle grid */}
      <div className="flex flex-wrap gap-2">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => setActiveCategory(activeCategory === cat.id ? 'all' : cat.id)}
            className={`
              px-3 py-1.5 rounded-lg text-xs font-medium
              border touch-manipulation active:scale-[0.96] transition-all
              ${
                activeCategory === cat.id
                  ? 'bg-elec-yellow/20 border-elec-yellow/40 text-elec-yellow'
                  : 'bg-white/5 border-white/10 text-white'
              }
            `}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Flashcard set list */}
      <div className="space-y-2">
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

      {/* Tip banner */}
      <div className="flex items-center gap-3 p-3 bg-white/5 border border-white/10 rounded-xl">
        <Lightbulb className="h-4 w-4 text-elec-yellow flex-shrink-0" />
        <p className="text-xs text-white">
          <span className="font-medium text-elec-yellow">Tip:</span> Study 10-15 minutes daily with
          spaced repetition for best results.
        </p>
      </div>

      {/* Bottom sheet mode selector */}
      <StudyModeSelector
        open={showModeSelector}
        onOpenChange={(open) => {
          setShowModeSelector(open);
          if (!open) setSelectedSet(null);
        }}
        onSelectMode={handleSelectMode}
      />
    </div>
  );
};

export default OnJobFlashcards;
