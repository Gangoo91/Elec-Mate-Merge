/**
 * ProgressDashboard — Apprentice learning tracker.
 *
 * Pure learning-side surface. Portfolio AC coverage, OJT hours, KSB
 * tracking and EPA readiness all live on dedicated pages now —
 * duplicating them here was noise. This page focuses on what the other
 * surfaces don't:
 *
 *   • Predicted EPA grade band (from quiz + mastery + trajectory)
 *   • Per-topic mastery with quiz × flashcard blended score
 *   • Skill radar — strong/weak by category
 *   • Flashcard mastery wheel — set-by-set
 *   • XP / streak gamification
 *   • Recent activity
 *
 * Editorial style: single yellow accent, monochrome chrome, monospace
 * numbers. Wide on desktop.
 */

import { useEffect, useMemo } from 'react';
import { XPHeroCard } from './XPHeroCard';
import { AchievementGallery } from './AchievementGallery';
import { SkillRadarChart } from './SkillRadarChart';
import { FlashcardMasteryWheel } from './FlashcardMasteryWheel';
import { RecentActivityFeed } from './RecentActivityFeed';
import { EPAGradePredictor } from './EPAGradePredictor';
import { Am2ReadinessRow } from '@/components/apprentice/am2/Am2ReadinessRing';
import { TopicMasteryList, type TopicRow } from './TopicMasteryList';
import { useUnifiedProgress } from '@/hooks/useUnifiedProgress';
import { useAchievementChecker } from '@/hooks/useAchievementChecker';
import { useQuizResults } from '@/hooks/useQuizResults';
import { useFlashcardProgress } from '@/hooks/useFlashcardProgress';
import { flashcardSetMeta } from '@/data/flashcards';
import { getFlashcardsForCategory } from '@/data/contentMapping';
import {
  Eyebrow,
  SectionHeader,
} from '@/components/apprentice-hub/portfolio/PortfolioPrimitives';

export function ProgressDashboard() {
  const {
    loading,
    skillRadar,
    flashcardInsights,
    totalMasteredCards,
    totalFlashcards,
    quizStats,
    streak,
  } = useUnifiedProgress();

  const { results: quizResults, getPerformanceByCategory } = useQuizResults();
  const { getSetProgress } = useFlashcardProgress();
  const { checkAchievements, getAllAchievements, getUnlockedCount, getTotalCount, nextUp } =
    useAchievementChecker();

  useEffect(() => {
    checkAchievements();
  }, [checkAchievements]);

  /* ─── Derive recent score + trend for the predictor ──────────────── */
  const recentQuizScore = useMemo<number | null>(() => {
    if (!quizResults?.length) return null;
    return quizResults[0]?.score ?? null;
  }, [quizResults]);

  const trend = useMemo<'improving' | 'declining' | 'stable' | 'no-data'>(() => {
    if (!quizResults || quizResults.length < 4) return 'no-data';
    const recent = quizResults.slice(0, 3);
    const prior = quizResults.slice(3, 6);
    if (!prior.length) return 'no-data';
    const avg = (xs: typeof recent) => xs.reduce((s, q) => s + (q.score || 0), 0) / xs.length;
    const r = avg(recent);
    const p = avg(prior);
    if (r - p > 5) return 'improving';
    if (p - r > 5) return 'declining';
    return 'stable';
  }, [quizResults]);

  /* ─── Build topic rows: blend quiz % and flashcard mastery ───────── */
  const topics = useMemo<TopicRow[]>(() => {
    const perCat = getPerformanceByCategory();
    const rows: TopicRow[] = perCat.map((cat) => {
      const related = getFlashcardsForCategory(cat.subject);
      const setIds = related.map((r) => r.flashcardSetId);
      let masteryPct: number | null = null;
      let lastStudiedAt: string | null = null;
      let setIdForCta: string | null = null;
      if (setIds.length) {
        let totalMastered = 0;
        let totalCards = 0;
        for (const setId of setIds) {
          const meta = flashcardSetMeta.find((s) => s.id === setId);
          if (!meta) continue;
          const progress = getSetProgress(setId, meta.count);
          totalMastered += progress.masteredCards;
          totalCards += meta.count;
          if (!setIdForCta) setIdForCta = setId;
          if (progress.lastStudiedAt) {
            const candidate = progress.lastStudiedAt;
            if (!lastStudiedAt || candidate > lastStudiedAt) lastStudiedAt = candidate;
          }
        }
        if (totalCards > 0) {
          masteryPct = Math.round((totalMastered / totalCards) * 100);
        }
      }
      return {
        label: cat.subject,
        quizScore: cat.score > 0 ? cat.score : null,
        masteryPct,
        flashcardSetId: setIdForCta,
        lastStudiedAt,
      };
    });
    return rows;
  }, [getPerformanceByCategory, getSetProgress]);

  const weakestTopic = useMemo<string | null>(() => {
    const scored = topics
      .filter((t) => t.quizScore != null)
      .sort((a, b) => (a.quizScore ?? 0) - (b.quizScore ?? 0));
    return scored[0]?.label ?? null;
  }, [topics]);

  const flashcardMasteryPct =
    totalFlashcards > 0 ? Math.round((totalMasteredCards / totalFlashcards) * 100) : 0;

  /* ─── Loading state ──────────────────────────────────────────────── */
  if (loading) {
    return (
      <div className="py-5 space-y-4">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="h-32 bg-white/[0.03] rounded-xl border border-white/[0.06] animate-pulse"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="py-5 sm:py-6 lg:py-8 space-y-6 lg:space-y-8">
      {/* Predicted EPA grade — full-width hero: the headline "will I pass?" signal */}
      <EPAGradePredictor
        quizAverage={quizStats.averageScore}
        flashcardMasteryPct={flashcardMasteryPct}
        recentQuizScore={recentQuizScore}
        trend={trend}
        weakestTopic={weakestTopic}
      />

      {/* XP hero + KPI strip — one row on desktop */}
      <div className="grid gap-5 lg:grid-cols-[360px_minmax(0,1fr)] lg:gap-8 lg:items-start">
        <XPHeroCard />
        <KpiStrip
          quizCount={quizStats.totalQuizzes}
          quizAvg={quizStats.averageScore}
          mastered={totalMasteredCards}
          totalCards={totalFlashcards}
          streakDays={streak.currentStreak}
          achievementsUnlocked={getUnlockedCount()}
          achievementsTotal={getTotalCount()}
        />
      </div>

      {/* Achievements gallery — rarity tiers finally on display.
          The Today page's next-badge row deep-links here. */}
      <AchievementGallery
        achievements={getAllAchievements()}
        unlockedCount={getUnlockedCount()}
        totalCount={getTotalCount()}
        nextUp={nextUp}
      />

      {/* AM2 readiness — compact link row into the simulator */}
      <Am2ReadinessRow />

      {/* Topic mastery — full width */}
      <TopicMasteryList topics={topics} />

      {/* Charts side-by-side on lg+ */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-7">
        <SkillRadarChart data={skillRadar} />
        <FlashcardMasteryWheel
          sets={flashcardInsights}
          totalMastered={totalMasteredCards}
          totalCards={totalFlashcards}
        />
      </div>

      {/* Recent activity */}
      <RecentActivityFeed />
    </div>
  );
}

/* ─── KPI strip — 4-cell grid, monospace numbers ──────────────────── */

function KpiStrip({
  quizCount,
  quizAvg,
  mastered,
  totalCards,
  streakDays,
  achievementsUnlocked,
  achievementsTotal,
}: {
  quizCount: number;
  quizAvg: number;
  mastered: number;
  totalCards: number;
  streakDays: number;
  achievementsUnlocked: number;
  achievementsTotal: number;
}) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 lg:gap-3">
      <Cell
        label="Quizzes"
        value={quizCount}
        sub={quizCount > 0 ? `${Math.round(quizAvg)}% avg` : 'No attempts yet'}
      />
      <Cell
        label="Cards mastered"
        value={mastered}
        sub={totalCards > 0 ? `of ${totalCards}` : 'Start a set'}
      />
      <Cell
        label="Study streak"
        value={`${streakDays}${streakDays > 0 ? 'd' : ''}`}
        sub={streakDays >= 7 ? 'On a roll' : streakDays > 0 ? 'Keep it going' : 'Study today'}
        highlight={streakDays >= 7}
      />
      <Cell
        label="Achievements"
        value={`${achievementsUnlocked}/${achievementsTotal}`}
        sub={achievementsUnlocked > 0 ? 'Unlocked' : 'Earn your first'}
      />
    </div>
  );
}

function Cell({
  label,
  value,
  sub,
  highlight,
}: {
  label: string;
  value: string | number;
  sub?: string;
  highlight?: boolean;
}) {
  return (
    <div className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)] p-3 sm:p-4 space-y-1.5">
      <Eyebrow>{label}</Eyebrow>
      <div
        className={`text-[22px] sm:text-[26px] font-mono font-semibold tabular-nums leading-none ${highlight ? 'text-elec-yellow' : 'text-white'}`}
      >
        {value}
      </div>
      {sub && <span className="text-[11px] text-white/55 block">{sub}</span>}
    </div>
  );
}

// Re-export so the SectionHeader symbol isn't tree-shaken away unused
export { SectionHeader };

export default ProgressDashboard;
