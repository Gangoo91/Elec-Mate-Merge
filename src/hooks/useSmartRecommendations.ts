/**
 * useSmartRecommendations
 *
 * Intelligent "what's next" engine that connects all features.
 * Analyses flashcard mastery, quiz scores, diary entries, portfolio,
 * OJT hours, and spaced repetition to generate prioritised suggestions.
 *
 * Smart ranking considers:
 * - Topic importance for the qualification
 * - Cross-referencing quiz activity with flashcard sets
 * - Daily rotation for variety
 * - Momentum bonus for partially-started sets
 */

import { useMemo } from 'react';
import { useQuizResults } from '@/hooks/useQuizResults';
import { useFlashcardProgress } from '@/hooks/useFlashcardProgress';
import { useStudyStreak } from '@/hooks/useStudyStreak';
import { useApprenticeData } from '@/hooks/useApprenticeData';
import { flashcardSetMeta } from '@/data/flashcards';
import { getRelatedContent, getFlashcardsForCategory } from '@/data/contentMapping';

export interface SmartRecommendation {
  id: string;
  title: string;
  description: string;
  actionLabel: string;
  actionPath: string;
  priority: number;
  type: 'flashcard' | 'quiz' | 'diary' | 'portfolio' | 'ojt' | 'spaced-rep' | 'general';
  icon: string;
}

/**
 * Topic importance for UK electrical apprenticeship (higher = more critical).
 * BS 7671 and Safety are the foundation of everything; Cable Colours is
 * basic identification that's typically picked up on site.
 */
const SET_IMPORTANCE: Record<string, number> = {
  'bs7671-regulations': 40,
  'safe-isolation': 40,
  'circuit-protection': 35,
  'earthing-bonding': 35,
  'eicr-codes': 30,
  'test-instruments': 30,
  'fault-finding': 30,
  'electrical-science': 25,
  'wiring-systems': 20,
  'first-second-fix': 20,
  'environmental-tech': 20,
  'cable-colors': 10,
};

export function useSmartRecommendations(maxResults = 5) {
  const { results: quizResults, getPerformanceByCategory, getOverallStats } = useQuizResults();
  const { getSetProgress, getDueCards } = useFlashcardProgress();
  const { streak } = useStudyStreak();
  const { stats } = useApprenticeData();

  const recommendations = useMemo((): SmartRecommendation[] => {
    const recs: SmartRecommendation[] = [];
    const quizStats = getOverallStats();
    const quizCategories = getPerformanceByCategory();
    const dayOfYear = Math.floor(
      (Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24)
    );

    // ─── 1. Due flashcards from spaced repetition ──────────
    // Prioritise the most important set with due cards
    const setsWithDue = flashcardSetMeta
      .map((set) => ({ ...set, dueCount: getDueCards(set.id).length }))
      .filter((s) => s.dueCount > 0)
      .sort((a, b) => (SET_IMPORTANCE[b.id] ?? 15) - (SET_IMPORTANCE[a.id] ?? 15));

    if (setsWithDue.length > 0) {
      const totalDue = setsWithDue.reduce((sum, s) => sum + s.dueCount, 0);
      const topSet = setsWithDue[0];
      recs.push({
        id: 'due-cards',
        title: totalDue > topSet.dueCount
          ? `Review ${totalDue} due cards`
          : `Review ${topSet.title}`,
        description: totalDue > topSet.dueCount
          ? `${topSet.dueCount} in ${topSet.title} and ${totalDue - topSet.dueCount} more across other sets.`
          : `${topSet.dueCount} card${topSet.dueCount !== 1 ? 's' : ''} due for review to strengthen your memory.`,
        actionLabel: 'Review now',
        actionPath: '/apprentice/on-job-tools/flashcards',
        priority: 1,
        type: 'spaced-rep',
        icon: 'RotateCcw',
      });
    }

    // ─── 2. Flashcard sets with <50% mastery (smart ranking) ─
    // Scores each set by: importance + quiz cross-reference + momentum + rotation
    const lowMasterySets = flashcardSetMeta
      .map((set) => ({
        ...set,
        progress: getSetProgress(set.id, set.count),
      }))
      .filter((s) => s.progress.progressPercentage < 50);

    if (lowMasterySets.length > 0) {
      const scored = lowMasterySets.map((set, idx) => {
        let score = SET_IMPORTANCE[set.id] ?? 15;

        // Bonus: user has taken quizzes in the related category (reinforce with flashcards)
        const related = getRelatedContent(set.id);
        if (related) {
          const catPerf = quizCategories.find((c) => c.subject === related.quizCategory);
          if (catPerf && catPerf.score > 0) {
            score += 25;
          }
        }

        // Bonus: partially-started sets (user has momentum)
        if (set.progress.progressPercentage > 0) {
          score += 15;
        }

        // Daily rotation: small boost cycles through sets for variety
        if ((dayOfYear + idx) % Math.max(lowMasterySets.length, 1) === 0) {
          score += 5;
        }

        return { ...set, score };
      });

      scored.sort((a, b) => b.score - a.score);
      const best = scored[0];

      recs.push({
        id: `revise-${best.id}`,
        title: best.progress.progressPercentage > 0
          ? `Revise ${best.title}`
          : `Study ${best.title}`,
        description: best.progress.progressPercentage > 0
          ? `${best.progress.progressPercentage}% mastered — keep building on your progress.`
          : 'Key topic for your qualification. Start with a quick session.',
        actionLabel: 'Study now',
        actionPath: '/apprentice/on-job-tools/flashcards',
        priority: 3,
        type: 'flashcard',
        icon: 'Layers',
      });
    }

    // ─── 3. Quiz categories with <70% score ────────────────
    const weakCategories = quizCategories.filter((c) => c.score > 0 && c.score < 70);
    if (weakCategories.length > 0) {
      const weakest = weakCategories.sort((a, b) => a.score - b.score)[0];
      recs.push({
        id: `quiz-${weakest.subject}`,
        title: `Practise ${weakest.subject} quiz`,
        description: `Currently at ${weakest.score}%. Focus here for the biggest improvement.`,
        actionLabel: 'Take quiz',
        actionPath: '/study-centre/apprentice',
        priority: 2,
        type: 'quiz',
        icon: 'ClipboardCheck',
      });
    }

    // ─── 4. Flashcard set mastered → suggest related quiz ──
    // Limit to 1 cross-feature rec (pick the most impactful)
    let bestCross: SmartRecommendation | null = null;
    let bestCrossImportance = -1;

    flashcardSetMeta.forEach((set) => {
      const progress = getSetProgress(set.id, set.count);
      if (progress.progressPercentage >= 80) {
        const related = getRelatedContent(set.id);
        if (related) {
          const catScore = quizCategories.find((c) => c.subject === related.quizCategory);
          if (catScore && catScore.score < 80) {
            const importance = SET_IMPORTANCE[set.id] ?? 15;
            if (importance > bestCrossImportance) {
              bestCrossImportance = importance;
              bestCross = {
                id: `cross-${set.id}`,
                title: `Try a ${related.quizCategory} quiz`,
                description: `You've mastered ${set.title} flashcards. Test yourself with a related quiz.`,
                actionLabel: 'Take quiz',
                actionPath: '/study-centre/apprentice',
                priority: 4,
                type: 'quiz',
                icon: 'ArrowRight',
              };
            }
          }
        }
      }
    });

    if (bestCross) {
      recs.push(bestCross);
    }

    // ─── 5. No study activity in 3+ days ─────────────────
    const lastStudyDate = streak.lastStudyDate;
    if (lastStudyDate) {
      const daysSince = Math.floor(
        (Date.now() - new Date(lastStudyDate).getTime()) / (1000 * 60 * 60 * 24)
      );
      if (daysSince >= 3) {
        recs.push({
          id: 'diary-reminder',
          title: 'Reflect on your recent work',
          description: `It's been ${daysSince} days since your last study session. Write a diary entry.`,
          actionLabel: 'Write entry',
          actionPath: '/apprentice/site-diary',
          priority: 5,
          type: 'diary',
          icon: 'PenLine',
        });
      }
    }

    // ─── 6. OJT hours behind schedule ──────────────────────
    if (stats.ojtHours.percentComplete < 50) {
      recs.push({
        id: 'log-ojt',
        title: 'Log your on-the-job hours',
        description: `${stats.ojtHours.logged} of ${stats.ojtHours.target.toLocaleString()} hours logged. Keep tracking your experience.`,
        actionLabel: 'Log hours',
        actionPath: '/apprentice/hub?tab=hours',
        priority: 6,
        type: 'ojt',
        icon: 'Clock',
      });
    }

    // ─── 7. Quiz score >80% → suggest advancing ───────────
    // Pick the most important unstudied flashcard set related to a strong quiz category
    let bestAdvance: SmartRecommendation | null = null;
    let bestAdvanceImportance = -1;

    const strongCategories = quizCategories.filter((c) => c.score >= 80);
    strongCategories.forEach((cat) => {
      const relatedSets = getFlashcardsForCategory(cat.subject);
      relatedSets.forEach((r) => {
        const setMeta = flashcardSetMeta.find((s) => s.id === r.flashcardSetId);
        if (!setMeta) return;
        const progress = getSetProgress(r.flashcardSetId, setMeta.count);
        if (progress.progressPercentage < 50) {
          const importance = SET_IMPORTANCE[r.flashcardSetId] ?? 15;
          if (importance > bestAdvanceImportance) {
            bestAdvanceImportance = importance;
            bestAdvance = {
              id: `advance-${cat.subject}`,
              title: `Study ${setMeta.title}`,
              description: `You're scoring ${cat.score}% in ${cat.subject}. Deepen your knowledge with flashcards.`,
              actionLabel: 'Study now',
              actionPath: '/apprentice/on-job-tools/flashcards',
              priority: 7,
              type: 'flashcard',
              icon: 'TrendingUp',
            };
          }
        }
      });
    });

    if (bestAdvance) {
      recs.push(bestAdvance);
    }

    // ─── 8. Never taken a quiz ─────────────────────────────
    if (quizStats.totalQuizzes === 0) {
      recs.push({
        id: 'first-quiz',
        title: 'Take your first quiz',
        description: 'Test your knowledge and start tracking your progress.',
        actionLabel: 'Start quiz',
        actionPath: '/study-centre/apprentice',
        priority: 1,
        type: 'quiz',
        icon: 'Target',
      });
    }

    // Sort by priority and limit
    return recs
      .sort((a, b) => a.priority - b.priority)
      .slice(0, maxResults);
  }, [quizResults, getPerformanceByCategory, getOverallStats, getSetProgress, getDueCards, streak, stats]);

  return { recommendations };
}
