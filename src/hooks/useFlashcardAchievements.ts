import { useState, useCallback, useMemo, useRef, useEffect } from 'react';
import { useFlashcardProgress } from './useFlashcardProgress';
import { useStudyStreak } from './useStudyStreak';
import { flashcardSetDefinitions, flashcardSetMeta } from '@/data/flashcards';
import { FLASHCARD_ACHIEVEMENTS, type FlashcardAchievementDef } from '@/data/flashcardAchievements';

export interface FlashcardAchievementStatus {
  def: FlashcardAchievementDef;
  unlocked: boolean;
  /** 0-100 */
  progress: number;
  current: number;
  target: number;
}

interface SessionReport {
  accuracy: number;
  durationSeconds: number;
  cardCount: number;
  mode: string;
}

const STORAGE_KEY = 'elec-mate:fc-achievements';

/** Read persisted session-level flags from localStorage */
function readSessionFlags(): {
  perfectSession: boolean;
  quickReview: boolean;
} {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    /* ignore */
  }
  return { perfectSession: false, quickReview: false };
}

function writeSessionFlags(flags: { perfectSession: boolean; quickReview: boolean }) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(flags));
  } catch {
    /* ignore */
  }
}

export function useFlashcardAchievements() {
  const { progress, getSetProgress } = useFlashcardProgress();
  const { streak } = useStudyStreak();

  const [sessionFlags, setSessionFlags] = useState(readSessionFlags);
  const [recentlyUnlocked, setRecentlyUnlocked] = useState<FlashcardAchievementDef[]>([]);
  const prevUnlockedRef = useRef<Set<string>>(new Set());

  /** Count fully mastered sets (100% progress) */
  const masteredSetCount = useMemo(() => {
    return flashcardSetMeta.reduce((count, set) => {
      const p = getSetProgress(set.id, set.count);
      return p.progressPercentage === 100 ? count + 1 : count;
    }, 0);
  }, [getSetProgress]);

  /** Count mastered sets for a specific level */
  const getMasteredCountForLevel = useCallback(
    (level: 'Level 2' | 'Level 3') => {
      const levelSets = flashcardSetDefinitions.filter(
        (s) => s.level === level || s.level === 'Both'
      );
      return levelSets.reduce((count, set) => {
        const p = getSetProgress(set.id, set.count);
        return p.progressPercentage === 100 ? count + 1 : count;
      }, 0);
    },
    [getSetProgress]
  );

  /** Total level set counts for progress denominators */
  const levelSetCounts = useMemo(() => {
    const l2 = flashcardSetDefinitions.filter(
      (s) => s.level === 'Level 2' || s.level === 'Both'
    ).length;
    const l3 = flashcardSetDefinitions.filter(
      (s) => s.level === 'Level 3' || s.level === 'Both'
    ).length;
    return { l2, l3 };
  }, []);

  /** Evaluate all 14 achievements */
  const achievements: FlashcardAchievementStatus[] = useMemo(() => {
    return FLASHCARD_ACHIEVEMENTS.map((def) => {
      const c = def.condition;
      let current = 0;
      let target = c.target;
      let unlocked = false;

      switch (c.type) {
        case 'first_session':
          current = streak.totalSessions;
          unlocked = current >= 1;
          break;

        case 'cards_reviewed':
          current = streak.totalCardsReviewed;
          unlocked = current >= target;
          break;

        case 'set_mastered':
          current = masteredSetCount > 0 ? 1 : 0;
          target = 1;
          unlocked = current >= 1;
          break;

        case 'sets_mastered_count':
          current = masteredSetCount;
          unlocked = current >= target;
          break;

        case 'all_sets_mastered':
          current = masteredSetCount;
          target = flashcardSetMeta.length;
          unlocked = current >= target;
          break;

        case 'streak_days':
          current = Math.max(streak.currentStreak, streak.longestStreak);
          unlocked = current >= target;
          break;

        case 'perfect_session':
          current = sessionFlags.perfectSession ? target : 0;
          unlocked = sessionFlags.perfectSession;
          break;

        case 'quick_review':
          current = sessionFlags.quickReview ? target : 0;
          unlocked = sessionFlags.quickReview;
          break;

        case 'level_mastered': {
          const level = c.level!;
          const mastered = getMasteredCountForLevel(level);
          const total = level === 'Level 2' ? levelSetCounts.l2 : levelSetCounts.l3;
          current = mastered;
          target = total;
          unlocked = mastered >= total;
          break;
        }
      }

      const progress = target > 0 ? Math.min(Math.round((current / target) * 100), 100) : 0;

      return { def, unlocked, progress, current, target };
    });
  }, [streak, masteredSetCount, sessionFlags, getMasteredCountForLevel, levelSetCounts]);

  /** Detect newly unlocked achievements */
  useEffect(() => {
    const currentUnlocked = new Set(achievements.filter((a) => a.unlocked).map((a) => a.def.id));
    const newlyUnlocked = achievements.filter(
      (a) => a.unlocked && !prevUnlockedRef.current.has(a.def.id)
    );

    if (
      newlyUnlocked.length > 0 &&
      prevUnlockedRef.current.size > 0 // Don't toast on initial load
    ) {
      setRecentlyUnlocked(newlyUnlocked.map((a) => a.def));
      const timer = setTimeout(() => setRecentlyUnlocked([]), 5000);
      return () => clearTimeout(timer);
    }

    prevUnlockedRef.current = currentUnlocked;
  }, [achievements]);

  /** Called from the study session completion screen */
  const reportSession = useCallback(
    (report: SessionReport) => {
      const flags = { ...sessionFlags };
      let changed = false;

      // Perfect session: 100% accuracy with 10+ cards
      if (!flags.perfectSession && report.accuracy === 100 && report.cardCount >= 10) {
        flags.perfectSession = true;
        changed = true;
      }

      // Quick review: under 2 minutes in quick mode
      if (!flags.quickReview && report.mode === 'quick' && report.durationSeconds < 120) {
        flags.quickReview = true;
        changed = true;
      }

      if (changed) {
        writeSessionFlags(flags);
        setSessionFlags(flags);
      }
    },
    [sessionFlags]
  );

  /** Stats summary */
  const stats = useMemo(() => {
    const total = achievements.length;
    const unlocked = achievements.filter((a) => a.unlocked).length;
    return { total, unlocked, percentage: Math.round((unlocked / total) * 100) };
  }, [achievements]);

  return {
    achievements,
    recentlyUnlocked,
    reportSession,
    stats,
  };
}
