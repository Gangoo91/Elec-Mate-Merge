/**
 * useUnifiedProgress
 *
 * Master hook combining all progress data into one view.
 * Updated formula includes portfolio, diary, streaks, EPA.
 */

import { useMemo, useState, useEffect } from 'react';
import { useApprenticeData } from '@/hooks/useApprenticeData';
import { useQuizResults, type PerformanceByCategory } from '@/hooks/useQuizResults';
import { useFlashcardProgress } from '@/hooks/useFlashcardProgress';
import { useLearningXP } from '@/hooks/useLearningXP';
import { useStudyStreak } from '@/hooks/useStudyStreak';
import { useStudentQualification } from '@/hooks/useStudentQualification';
import { useKSBTracking } from '@/hooks/qualification/useKSBTracking';
import { useEPAReadiness } from '@/hooks/epa/useEPAReadiness';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { flashcardSetMeta as flashcardSets } from '@/data/flashcards';

export interface SkillAxis {
  subject: string;
  score: number;
  fullMark: 100;
}

export type QuizTrend = 'improving' | 'declining' | 'stable' | 'no-data';

export function useUnifiedProgress() {
  const { user } = useAuth();
  const { stats, isLoading: dataLoading } = useApprenticeData();
  const { results: quizResults, getPerformanceByCategory, getOverallStats, isLoading: quizLoading } = useQuizResults();
  const { getSetProgress, loading: flashcardLoading } = useFlashcardProgress();
  const xp = useLearningXP();
  const { streak, loading: streakLoading } = useStudyStreak();

  // New data sources
  const { qualificationCode, qualificationId, isLoading: qualLoading } = useStudentQualification();
  const { getOverallCompletion, isLoading: ksbLoading } = useKSBTracking({ qualificationId: qualificationId ?? undefined });
  const { data: epaData, isLoading: epaLoading } = useEPAReadiness(qualificationCode ?? undefined, qualificationId);

  // Portfolio AC coverage
  const [portfolioACCoverage, setPortfolioACCoverage] = useState(0);

  useEffect(() => {
    if (!user || !qualificationCode) {
      setPortfolioACCoverage(0);
      return;
    }

    const calcACCoverage = async () => {
      try {
        // Get total ACs for this qualification
        const { data: reqData } = await supabase
          .from('qualification_requirements' as any)
          .select('assessment_criteria')
          .eq('qualification_code', qualificationCode);

        const allACs = new Set<string>();
        (reqData as any[] ?? []).forEach((row: any) => {
          const criteria = row.assessment_criteria as string[] | null;
          criteria?.forEach((ac: string) => allACs.add(ac));
        });

        if (allACs.size === 0) {
          setPortfolioACCoverage(0);
          return;
        }

        // Get evidenced ACs from portfolio items
        const { data: portfolioData } = await supabase
          .from('portfolio_items')
          .select('assessment_criteria_met')
          .eq('user_id', user.id);

        const evidencedACs = new Set<string>();
        (portfolioData ?? []).forEach((item) => {
          const met = item.assessment_criteria_met as string[] | null;
          met?.forEach((ac: string) => evidencedACs.add(ac));
        });

        setPortfolioACCoverage(Math.round((evidencedACs.size / allACs.size) * 100));
      } catch {
        setPortfolioACCoverage(0);
      }
    };

    calcACCoverage();
  }, [user, qualificationCode]);

  const ksbCompletion = useMemo(() => getOverallCompletion(), [getOverallCompletion]);
  const epaReadiness = useMemo(() => epaData?.overallScore ?? 0, [epaData]);

  const loading = dataLoading || quizLoading || flashcardLoading || xp.loading || streakLoading || qualLoading || ksbLoading || epaLoading;

  // ─── Quiz stats ────────────────────────────────────────────
  const quizCategories = useMemo(() => getPerformanceByCategory(), [getPerformanceByCategory]);
  const quizStats = useMemo(() => getOverallStats(), [getOverallStats]);

  // ─── Quiz trend (compare last 3 vs previous 3) ────────────
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

  // ─── Strongest / weakest categories ────────────────────────
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

  // ─── Days since last quiz ──────────────────────────────────
  const daysSinceLastQuiz = useMemo(() => {
    if (quizResults.length === 0) return null;
    const lastDate = new Date(quizResults[0].completed_at);
    return Math.floor((Date.now() - lastDate.getTime()) / (1000 * 60 * 60 * 24));
  }, [quizResults]);

  // ─── Personalised insight ──────────────────────────────────
  const insightText = useMemo(() => {
    const insights: string[] = [];
    if (quizTrend === 'improving') {
      insights.push('Your quiz scores are improving — your hard work is paying off.');
    }
    if (strongestCategory && strongestCategory.score >= 80) {
      insights.push(`${strongestCategory.subject} is your strongest area at ${strongestCategory.score}%.`);
    }
    if (quizTrend === 'declining') {
      insights.push('Your recent quiz scores have dipped. A revision session could help.');
    }
    if (daysSinceLastQuiz !== null && daysSinceLastQuiz >= 7) {
      insights.push(`It's been ${daysSinceLastQuiz} days since your last quiz. Time for a refresher?`);
    }
    return insights[0] || null;
  }, [quizTrend, strongestCategory, daysSinceLastQuiz]);

  // ─── Flashcard insights ────────────────────────────────────
  const flashcardInsights = useMemo(() => {
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

  const totalMasteredCards = useMemo(
    () => flashcardInsights.reduce((sum, s) => sum + s.masteredCards, 0),
    [flashcardInsights]
  );

  const totalFlashcards = useMemo(
    () => flashcardInsights.reduce((sum, s) => sum + s.totalCards, 0),
    [flashcardInsights]
  );

  // ─── Skill radar (6 axes) ─────────────────────────────────
  const skillRadar = useMemo((): SkillAxis[] => {
    const catMap: Record<string, number> = {};
    quizCategories.forEach((c) => { catMap[c.subject] = c.score; });

    return [
      { subject: 'Regulations', score: catMap['Regulations'] ?? 0, fullMark: 100 },
      { subject: 'Safety', score: catMap['Safety'] ?? 0, fullMark: 100 },
      { subject: 'Testing', score: catMap['Testing'] ?? 0, fullMark: 100 },
      { subject: 'Design', score: catMap['Design'] ?? 0, fullMark: 100 },
      { subject: 'Theory', score: Math.round((totalMasteredCards / Math.max(totalFlashcards, 1)) * 100), fullMark: 100 },
      { subject: 'Practical', score: Math.min(stats.ojtHours.percentComplete, 100), fullMark: 100 },
    ];
  }, [quizCategories, totalMasteredCards, totalFlashcards, stats.ojtHours]);

  // ─── Updated overall progress formula ─────────────────────
  // Component scores (exposed individually for breakdown bars)
  const componentScores = useMemo(() => {
    // Quiz performance: 25%
    const quizScore = quizStats.averageScore;

    // Flashcard mastery: 15%
    const masteredSets = flashcardInsights.filter((s) => s.progressPercent >= 80).length;
    const flashcardScore = flashcardSets.length > 0
      ? (masteredSets / flashcardSets.length) * 100
      : 0;

    // OJT hours: 15%
    const ojtScore = Math.min(stats.ojtHours.percentComplete, 100);

    // Portfolio AC coverage: 15%
    const portfolioScore = portfolioACCoverage;

    // KSB completion: 10%
    const ksbScore = ksbCompletion;

    // Study engagement: 10% (streak / 30, capped)
    const streakScore = Math.min((streak.currentStreak / 30) * 100, 100);

    // EPA readiness: 10%
    const epaScore = epaReadiness;

    return { quizScore, flashcardScore, ojtScore, portfolioScore, ksbScore, streakScore, epaScore };
  }, [quizStats, flashcardInsights, stats.ojtHours, portfolioACCoverage, ksbCompletion, streak, epaReadiness]);

  const overallPercent = useMemo(() => {
    const { quizScore, flashcardScore, ojtScore, portfolioScore, ksbScore, streakScore, epaScore } = componentScores;
    return Math.round(
      quizScore * 0.25 +
      flashcardScore * 0.15 +
      ojtScore * 0.15 +
      portfolioScore * 0.15 +
      ksbScore * 0.10 +
      streakScore * 0.10 +
      epaScore * 0.10
    );
  }, [componentScores]);

  return {
    loading,
    // XP data
    xp,
    // Streak
    streak,
    // Quiz
    quizStats,
    quizCategories,
    quizTrend,
    strongestCategory,
    weakestCategory,
    daysSinceLastQuiz,
    // Flashcards
    flashcardInsights,
    totalMasteredCards,
    totalFlashcards,
    // OJT
    ojtHours: stats.ojtHours,
    // New data sources
    portfolioACCoverage,
    ksbCompletion,
    epaReadiness,
    qualificationCode,
    componentScores,
    // Computed
    skillRadar,
    overallPercent,
    insightText,
  };
}
