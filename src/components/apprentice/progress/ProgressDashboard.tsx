/**
 * ProgressDashboard
 *
 * Unified "My Progress" tab combining XP, skills, flashcards,
 * OJT hours, achievements, and recent activity.
 */

import { useEffect } from 'react';
import { XPHeroCard } from './XPHeroCard';
import { SkillRadarChart } from './SkillRadarChart';
import { FlashcardMasteryWheel } from './FlashcardMasteryWheel';
import { RecentActivityFeed } from './RecentActivityFeed';
import { useUnifiedProgress } from '@/hooks/useUnifiedProgress';
import { useAchievementChecker } from '@/hooks/useAchievementChecker';

export function ProgressDashboard() {
  const {
    loading,
    overallPercent,
    skillRadar,
    flashcardInsights,
    totalMasteredCards,
    totalFlashcards,
    ojtHours,
    quizStats,
    streak,
    componentScores,
  } = useUnifiedProgress();

  const { checkAchievements, getUnlockedCount, getTotalCount } = useAchievementChecker();

  // Check achievements on mount
  useEffect(() => {
    checkAchievements();
  }, [checkAchievements]);

  if (loading) {
    return (
      <div className="p-4 space-y-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-32 bg-white/[0.03] rounded-2xl animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div className="p-4 pb-20 space-y-4 max-w-5xl mx-auto">
      <XPHeroCard />

      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 space-y-3">
        <div className="flex items-baseline justify-between">
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
            Overall progress
          </span>
          <span className="text-2xl font-mono text-white">{overallPercent}%</span>
        </div>

        <div className="h-1 bg-white/5 rounded-full overflow-hidden">
          <div
            className="h-full bg-elec-yellow rounded-full transition-all duration-700"
            style={{ width: `${overallPercent}%` }}
          />
        </div>

        <div className="grid grid-cols-4 gap-2">
          <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-2 text-center">
            <div className="text-[16px] font-mono text-white">{quizStats.totalQuizzes}</div>
            <div className="text-[10px] uppercase tracking-[0.18em] text-white/55 mt-0.5">
              Quizzes
            </div>
          </div>
          <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-2 text-center">
            <div className="text-[16px] font-mono text-white">{totalMasteredCards}</div>
            <div className="text-[10px] uppercase tracking-[0.18em] text-white/55 mt-0.5">
              Cards
            </div>
          </div>
          <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-2 text-center">
            <div className="text-[16px] font-mono text-white">{ojtHours.logged}h</div>
            <div className="text-[10px] uppercase tracking-[0.18em] text-white/55 mt-0.5">OJT</div>
          </div>
          <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-2 text-center">
            <div className="text-[16px] font-mono text-white">{streak.currentStreak}</div>
            <div className="text-[10px] uppercase tracking-[0.18em] text-white/55 mt-0.5">
              Streak
            </div>
          </div>
        </div>

        <div className="space-y-2 pt-3 border-t border-white/[0.06]">
          {[
            { label: 'Quizzes', value: Math.round(componentScores.quizScore), weight: '25%' },
            { label: 'Flashcards', value: Math.round(componentScores.flashcardScore), weight: '15%' },
            { label: 'OJT hours', value: Math.round(componentScores.ojtScore), weight: '15%' },
            { label: 'Portfolio ACs', value: Math.round(componentScores.portfolioScore), weight: '15%' },
            { label: 'KSBs', value: Math.round(componentScores.ksbScore), weight: '10%' },
            { label: 'Study streak', value: Math.round(componentScores.streakScore), weight: '10%' },
            { label: 'EPA readiness', value: Math.round(componentScores.epaScore), weight: '10%' },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-2">
              <span className="text-[12px] text-white/85 w-24 shrink-0 truncate">
                {item.label}
              </span>
              <div className="flex-1 h-1 bg-white/5 rounded-full overflow-hidden">
                <div
                  className="h-full bg-elec-yellow rounded-full transition-all duration-500"
                  style={{ width: `${item.value}%` }}
                />
              </div>
              <span className="text-[11px] text-white/85 w-8 text-right font-mono">
                {item.value}%
              </span>
              <span className="text-[10px] text-white/55 w-7 text-right font-mono">
                {item.weight}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <SkillRadarChart data={skillRadar} />

        <FlashcardMasteryWheel
          sets={flashcardInsights}
          totalMastered={totalMasteredCards}
          totalCards={totalFlashcards}
        />

        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 space-y-3">
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
            OJT hours
          </span>

          <div className="flex items-end gap-4">
            <div className="flex-1">
              <div className="text-3xl font-mono text-white">{ojtHours.logged}</div>
              <div className="text-[12px] text-white/55 font-mono">
                of {ojtHours.target.toLocaleString()} hours
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-mono text-elec-yellow">
                {ojtHours.percentComplete}%
              </div>
              <div className="text-[10px] uppercase tracking-[0.18em] text-white/55 mt-0.5">
                Complete
              </div>
            </div>
          </div>

          <div className="h-1 bg-white/5 rounded-full overflow-hidden">
            <div
              className="h-full bg-elec-yellow rounded-full transition-all duration-700"
              style={{ width: `${Math.min(ojtHours.percentComplete, 100)}%` }}
            />
          </div>
        </div>

        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 space-y-2">
          <div className="flex items-baseline justify-between">
            <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
              Achievements
            </span>
            <span className="text-[14px] text-elec-yellow font-mono">
              {getUnlockedCount()}/{getTotalCount()}
            </span>
          </div>
          <div className="h-1 bg-white/5 rounded-full overflow-hidden">
            <div
              className="h-full bg-elec-yellow rounded-full transition-all duration-500"
              style={{ width: `${(getUnlockedCount() / getTotalCount()) * 100}%` }}
            />
          </div>
          <p className="text-[12px] text-white/55 leading-relaxed">
            {getUnlockedCount() === 0
              ? 'Start learning to unlock achievements'
              : `${getTotalCount() - getUnlockedCount()} achievements remaining`}
          </p>
        </div>
      </div>

      <RecentActivityFeed />
    </div>
  );
}

export default ProgressDashboard;
