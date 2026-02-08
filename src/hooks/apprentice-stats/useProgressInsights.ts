/**
 * useProgressInsights
 *
 * Combines apprentice data, quiz results, and flashcard progress
 * to compute real overall progress with:
 * - Quiz score trends (improving/declining/stable)
 * - Strongest & weakest category highlights
 * - Total mastered cards across all sets
 * - Days since last quiz urgency
 * - Personalised insight sentence
 */

import { useMemo } from 'react';
import { useApprenticeData } from '@/hooks/useApprenticeData';
import { useQuizResults, type PerformanceByCategory } from '@/hooks/useQuizResults';
import { useFlashcardProgress } from '@/hooks/useFlashcardProgress';
import { flashcardSets } from '@/data/flashcardSets';

export interface FlashcardSetInsight {
  id: string;
  title: string;
  progressPercent: number;
  masteredCards: number;
  totalCards: number;
}

export interface ProgressRecommendation {
  id: string;
  title: string;
  description: string;
  actionLabel: string;
  actionPath: string;
  priority: number;
}

export type QuizTrend = 'improving' | 'declining' | 'stable' | 'no-data';

export function useProgressInsights() {
  const { stats, isLoading: dataLoading } = useApprenticeData();
  const { results: quizResults, getPerformanceByCategory, getOverallStats, isLoading: quizLoading } = useQuizResults();
  const { getSetProgress, loading: flashcardLoading } = useFlashcardProgress();

  const loading = dataLoading || quizLoading || flashcardLoading;

  // Quiz category performance
  const quizCategories = useMemo((): PerformanceByCategory[] => {
    return getPerformanceByCategory();
  }, [getPerformanceByCategory]);

  const quizStats = useMemo(() => getOverallStats(), [getOverallStats]);

  // Strongest and weakest categories
  const strongestCategory = useMemo(() => {
    const attempted = quizCategories.filter(c => c.score > 0);
    if (attempted.length === 0) return null;
    return [...attempted].sort((a, b) => b.score - a.score)[0];
  }, [quizCategories]);

  const weakestCategory = useMemo(() => {
    const attempted = quizCategories.filter(c => c.score > 0);
    if (attempted.length < 2) return null;
    return [...attempted].sort((a, b) => a.score - b.score)[0];
  }, [quizCategories]);

  // Quiz score trend: compare last 3 quizzes vs previous 3
  const quizTrend = useMemo((): QuizTrend => {
    if (quizResults.length < 4) return 'no-data';
    const recent = quizResults.slice(0, 3);
    const previous = quizResults.slice(3, 6);
    if (previous.length === 0) return 'no-data';
    const recentAvg = recent.reduce((s, r) => s + r.percentage, 0) / recent.length;
    const prevAvg = previous.reduce((s, r) => s + r.percentage, 0) / previous.length;
    const diff = recentAvg - prevAvg;
    if (diff > 5) return 'improving';
    if (diff < -5) return 'declining';
    return 'stable';
  }, [quizResults]);

  // Days since last quiz
  const daysSinceLastQuiz = useMemo(() => {
    if (quizResults.length === 0) return null;
    const lastDate = new Date(quizResults[0].completed_at);
    const now = new Date();
    return Math.floor((now.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24));
  }, [quizResults]);

  // Flashcard set insights
  const flashcardInsights = useMemo((): FlashcardSetInsight[] => {
    return flashcardSets.map((set) => {
      const progress = getSetProgress(set.id, set.count);
      return {
        id: set.id,
        title: set.title,
        progressPercent: progress.progressPercentage,
        masteredCards: progress.masteredCards,
        totalCards: set.count,
      };
    });
  }, [getSetProgress]);

  // Total mastered cards
  const totalMasteredCards = useMemo(() => {
    return flashcardInsights.reduce((sum, s) => sum + s.masteredCards, 0);
  }, [flashcardInsights]);

  const totalFlashcards = useMemo(() => {
    return flashcardInsights.reduce((sum, s) => sum + s.totalCards, 0);
  }, [flashcardInsights]);

  // Computed overall progress
  const overallPercent = useMemo(() => {
    const quizScore = Math.min(quizStats.totalQuizzes * 5, 100);
    const masteredSets = flashcardInsights.filter(s => s.progressPercent >= 80).length;
    const flashcardScore = flashcardSets.length > 0
      ? (masteredSets / flashcardSets.length) * 100
      : 0;
    const ojtScore = stats.ojtHours.percentComplete;
    return Math.round(quizScore * 0.4 + flashcardScore * 0.3 + ojtScore * 0.3);
  }, [quizStats, flashcardInsights, stats.ojtHours.percentComplete]);

  const ojtHours = stats.ojtHours;

  // Personalised insight
  const insightText = useMemo(() => {
    const insights: string[] = [];

    if (quizTrend === 'improving') {
      insights.push('Your quiz scores are improving -- your hard work is paying off.');
    }
    if (strongestCategory && strongestCategory.score >= 80) {
      insights.push(`${strongestCategory.subject} is your strongest area at ${strongestCategory.score}%.`);
    }
    if (totalMasteredCards > 0) {
      const pct = Math.round((totalMasteredCards / totalFlashcards) * 100);
      insights.push(`You've mastered ${totalMasteredCards} of ${totalFlashcards} flashcards (${pct}%).`);
    }
    if (quizTrend === 'declining') {
      insights.push('Your recent quiz scores have dipped. A revision session could help.');
    }
    if (daysSinceLastQuiz !== null && daysSinceLastQuiz >= 7) {
      insights.push(`It's been ${daysSinceLastQuiz} days since your last quiz. Time for a refresher?`);
    }

    return insights[0] || null;
  }, [quizTrend, strongestCategory, totalMasteredCards, totalFlashcards, daysSinceLastQuiz]);

  // Recommendations
  const recommendations = useMemo((): ProgressRecommendation[] => {
    const recs: ProgressRecommendation[] = [];

    // 1. Weakest quiz category
    if (weakestCategory && weakestCategory.score < 80) {
      recs.push({
        id: 'improve-quiz',
        title: `Improve your ${weakestCategory.subject} score`,
        description: `Currently at ${weakestCategory.score}%. Focus here for the biggest gain.`,
        actionLabel: 'Take a quiz',
        actionPath: '/study-centre/apprentice',
        priority: 1,
      });
    }

    // 2. Days since last quiz
    if (daysSinceLastQuiz !== null && daysSinceLastQuiz >= 7) {
      recs.push({
        id: 'quiz-overdue',
        title: 'Time for a quiz',
        description: `It's been ${daysSinceLastQuiz} days. Regular testing strengthens retention.`,
        actionLabel: 'Take a quiz',
        actionPath: '/study-centre/apprentice',
        priority: 2,
      });
    }

    // 3. OJT hours
    if (ojtHours.percentComplete < 50) {
      recs.push({
        id: 'log-ojt',
        title: 'Log your on-the-job hours',
        description: `${ojtHours.logged} of ${ojtHours.target.toLocaleString('en-GB')} hours logged. Keep tracking your site experience.`,
        actionLabel: 'Log hours',
        actionPath: '/apprentice/hub',
        priority: 3,
      });
    }

    // 4. Least studied flashcard set
    const leastStudied = [...flashcardInsights].sort((a, b) => a.progressPercent - b.progressPercent)[0];
    if (leastStudied && leastStudied.progressPercent < 50) {
      recs.push({
        id: 'study-flashcards',
        title: `Start ${leastStudied.title}`,
        description: `Only ${leastStudied.progressPercent}% mastered. Build your knowledge.`,
        actionLabel: 'Study now',
        actionPath: '/apprentice/flashcards',
        priority: 4,
      });
    }

    // 5. Career step
    if (overallPercent >= 30) {
      recs.push({
        id: 'career-step',
        title: 'Plan your next qualification',
        description: 'NVQ Level 3, AM2, or 18th Edition -- see what\'s next for you.',
        actionLabel: 'View career path',
        actionPath: '/apprentice/professional-development',
        priority: 5,
      });
    }

    return recs.sort((a, b) => a.priority - b.priority);
  }, [weakestCategory, daysSinceLastQuiz, ojtHours, flashcardInsights, overallPercent]);

  return {
    loading,
    overallPercent,
    quizCategories,
    quizStats,
    quizTrend,
    strongestCategory,
    weakestCategory,
    daysSinceLastQuiz,
    flashcardInsights,
    totalMasteredCards,
    totalFlashcards,
    ojtHours,
    insightText,
    recommendations,
  };
}
