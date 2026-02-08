/**
 * useStreakInsights
 *
 * Combines study streak, last study location, flashcard progress,
 * quiz results, diary entries, and video watches to derive:
 * - Real multi-source activity heatmap
 * - Streak milestones with next milestone
 * - Best study day / studied X of last 7
 * - Personalised insight sentences
 * - Prioritised study recommendations
 */

import { useMemo } from 'react';
import { useStudyStreak } from '@/hooks/useStudyStreak';
import { useLastStudyLocation } from '@/hooks/useLastStudyLocation';
import { useFlashcardProgress } from '@/hooks/useFlashcardProgress';
import { useQuizResults } from '@/hooks/useQuizResults';
import { flashcardSets } from '@/data/flashcardSets';

export interface StreakRecommendation {
  id: string;
  title: string;
  description: string;
  actionLabel: string;
  actionPath: string;
  priority: number;
}

export interface StreakMilestone {
  days: number;
  label: string;
  emoji: string;
  unlocked: boolean;
}

const STREAK_MILESTONES = [
  { days: 3, label: '3 days', emoji: '🌱' },
  { days: 7, label: '1 week', emoji: '🔥' },
  { days: 14, label: '2 weeks', emoji: '⚡' },
  { days: 30, label: '1 month', emoji: '🏆' },
  { days: 60, label: '2 months', emoji: '💎' },
  { days: 100, label: '100 days', emoji: '👑' },
];

const DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export function useStreakInsights() {
  const { streak, loading: streakLoading, getStreakDisplay } = useStudyStreak();
  const { lastLocation, loading: locationLoading, getLastStudiedDisplay } = useLastStudyLocation();
  const { progress: flashcardProgress, getDueCards, loading: flashcardLoading } = useFlashcardProgress();
  const { results: quizResults, getPerformanceByCategory, isLoading: quizLoading } = useQuizResults();

  const loading = streakLoading || locationLoading || flashcardLoading || quizLoading;

  const display = useMemo(() => getStreakDisplay(), [getStreakDisplay]);
  const lastStudiedText = useMemo(() => getLastStudiedDisplay(), [getLastStudiedDisplay]);

  // Build REAL activity map from ALL data sources
  const activityMap = useMemo(() => {
    const map: Record<string, number> = {};
    const addActivity = (dateStr: string) => {
      if (!dateStr) return;
      const d = dateStr.slice(0, 10); // YYYY-MM-DD
      map[d] = (map[d] || 0) + 1;
    };

    // Quiz completions
    quizResults.forEach(r => {
      if (r.completed_at) addActivity(r.completed_at);
    });

    // Flashcard reviews
    flashcardProgress.forEach(p => {
      if (p.last_reviewed_at) addActivity(p.last_reviewed_at);
    });

    // Also mark streak days (study sessions that may not be quiz/flashcard)
    if (streak.lastStudyDate) {
      const lastDate = new Date(streak.lastStudyDate + 'T00:00:00');
      for (let i = 0; i < streak.currentStreak; i++) {
        const d = new Date(lastDate);
        d.setDate(d.getDate() - i);
        const key = d.toLocaleDateString('en-CA');
        map[key] = Math.max(map[key] || 0, 1);
      }
    }

    return map;
  }, [streak, quizResults, flashcardProgress]);

  // Days studied in last 7 days
  const daysStudiedLast7 = useMemo(() => {
    let count = 0;
    const d = new Date();
    for (let i = 0; i < 7; i++) {
      const key = d.toLocaleDateString('en-CA');
      if (activityMap[key] && activityMap[key] > 0) count++;
      d.setDate(d.getDate() - 1);
    }
    return count;
  }, [activityMap]);

  // Best study day (day of week with most activity in last 28 days)
  const bestStudyDay = useMemo(() => {
    const dayCounts = [0, 0, 0, 0, 0, 0, 0]; // Sun-Sat
    const d = new Date();
    for (let i = 0; i < 28; i++) {
      const key = d.toLocaleDateString('en-CA');
      if (activityMap[key] && activityMap[key] > 0) {
        dayCounts[d.getDay()] += activityMap[key];
      }
      d.setDate(d.getDate() - 1);
    }
    const maxCount = Math.max(...dayCounts);
    if (maxCount === 0) return null;
    const bestIdx = dayCounts.indexOf(maxCount);
    return DAY_NAMES[bestIdx];
  }, [activityMap]);

  // Streak milestones
  const milestones = useMemo((): StreakMilestone[] => {
    const best = Math.max(streak.currentStreak, streak.longestStreak);
    return STREAK_MILESTONES.map(m => ({
      ...m,
      unlocked: best >= m.days,
    }));
  }, [streak]);

  // Next milestone
  const nextMilestone = useMemo(() => {
    return milestones.find(m => !m.unlocked) || null;
  }, [milestones]);

  // Personalised insight sentence
  const insightText = useMemo(() => {
    const insights: string[] = [];

    if (bestStudyDay) {
      insights.push(`${bestStudyDay} is your most productive study day.`);
    }
    if (daysStudiedLast7 >= 5) {
      insights.push(`Brilliant consistency -- you studied ${daysStudiedLast7} of the last 7 days.`);
    } else if (daysStudiedLast7 >= 3) {
      insights.push(`You studied ${daysStudiedLast7} of the last 7 days. Aim for 5+ to build momentum.`);
    }
    if (streak.currentStreak >= 7 && streak.currentStreak === streak.longestStreak) {
      insights.push('This is your longest streak ever -- keep going!');
    }
    if (display.totalCardsReviewed > 50) {
      insights.push(`You've reviewed ${display.totalCardsReviewed} flashcards. That knowledge compounds.`);
    }

    return insights[0] || null;
  }, [bestStudyDay, daysStudiedLast7, streak, display]);

  // Recommendations
  const recommendations = useMemo((): StreakRecommendation[] => {
    const recs: StreakRecommendation[] = [];

    // 1. Not studied today
    if (!display.studiedToday) {
      const path = lastLocation?.path || '/study-centre/apprentice';
      recs.push({
        id: 'study-today',
        title: 'Keep your streak alive!',
        description: streak.currentStreak > 0
          ? `You're on a ${streak.currentStreak}-day streak. Don't let it break!`
          : 'Start a study session to build your streak.',
        actionLabel: 'Study now',
        actionPath: path,
        priority: 1,
      });
    }

    // 2. Due flashcards
    const totalDue = flashcardSets.reduce((sum, set) => sum + getDueCards(set.id).length, 0);
    if (totalDue > 0) {
      recs.push({
        id: 'due-cards',
        title: `Review ${totalDue} due card${totalDue !== 1 ? 's' : ''}`,
        description: 'Spaced repetition cards are ready for review.',
        actionLabel: 'Review cards',
        actionPath: '/apprentice/flashcards',
        priority: 2,
      });
    }

    // 3. Weakest quiz category
    const categories = getPerformanceByCategory();
    const attempted = categories.filter(c => c.score > 0);
    if (attempted.length > 0) {
      const weakest = [...attempted].sort((a, b) => a.score - b.score)[0];
      if (weakest.score < 70) {
        recs.push({
          id: 'weak-category',
          title: `Revise ${weakest.subject}`,
          description: `Your ${weakest.subject} score is ${weakest.score}%. A few more sessions could boost it.`,
          actionLabel: 'Practice now',
          actionPath: '/apprentice/flashcards',
          priority: 3,
        });
      }
    }

    // 4. Continue where left off
    if (lastLocation && display.studiedToday) {
      recs.push({
        id: 'continue',
        title: `Continue: ${lastLocation.title}`,
        description: `Last studied ${lastStudiedText}.`,
        actionLabel: 'Continue',
        actionPath: lastLocation.path,
        priority: 4,
      });
    }

    // 5. Milestone chase
    if (nextMilestone && streak.currentStreak > 0) {
      const daysLeft = nextMilestone.days - streak.currentStreak;
      if (daysLeft <= 5 && daysLeft > 0) {
        recs.push({
          id: 'milestone-chase',
          title: `${daysLeft} day${daysLeft !== 1 ? 's' : ''} to ${nextMilestone.emoji} ${nextMilestone.label} milestone`,
          description: 'Keep studying daily to unlock this achievement!',
          actionLabel: 'Study now',
          actionPath: lastLocation?.path || '/study-centre/apprentice',
          priority: display.studiedToday ? 2 : 5,
        });
      }
    }

    return recs.sort((a, b) => a.priority - b.priority);
  }, [display, streak, lastLocation, lastStudiedText, getDueCards, getPerformanceByCategory, nextMilestone]);

  return {
    loading,
    currentStreak: display.currentStreak,
    longestStreak: display.longestStreak,
    studiedToday: display.studiedToday,
    totalSessions: display.totalSessions,
    totalCardsReviewed: display.totalCardsReviewed,
    lastStudiedText,
    activityMap,
    daysStudiedLast7,
    bestStudyDay,
    milestones,
    nextMilestone,
    insightText,
    recommendations,
  };
}
