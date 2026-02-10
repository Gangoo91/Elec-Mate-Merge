/**
 * ProgressDashboard
 *
 * Unified "My Progress" tab combining XP, skills, flashcards,
 * OJT hours, achievements, and recent activity.
 */

import { useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { TrendingUp, Trophy, Clock } from 'lucide-react';
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
      {/* XP Hero Card */}
      <XPHeroCard />

      {/* Overall Progress */}
      <Card className="bg-gradient-to-br from-elec-gray to-elec-card border-white/[0.06]">
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-3">
            <div className="p-1.5 rounded-lg bg-purple-500/10">
              <TrendingUp className="h-4 w-4 text-purple-400" />
            </div>
            <h3 className="font-semibold text-white text-sm">Overall Progress</h3>
            <span className="ml-auto text-lg font-bold text-elec-yellow">{overallPercent}%</span>
          </div>

          {/* Progress bar */}
          <div className="h-2.5 bg-white/[0.06] rounded-full overflow-hidden mb-3">
            <div
              className="h-full bg-gradient-to-r from-elec-yellow to-green-500 rounded-full transition-all duration-700"
              style={{ width: `${overallPercent}%` }}
            />
          </div>

          {/* Quick stats grid */}
          <div className="grid grid-cols-4 gap-2">
            <div className="text-center p-2 rounded-lg bg-white/[0.03]">
              <div className="text-sm font-bold text-elec-yellow">{quizStats.totalQuizzes}</div>
              <div className="text-[10px] text-white/90">Quizzes</div>
            </div>
            <div className="text-center p-2 rounded-lg bg-white/[0.03]">
              <div className="text-sm font-bold text-blue-400">{totalMasteredCards}</div>
              <div className="text-[10px] text-white/90">Cards</div>
            </div>
            <div className="text-center p-2 rounded-lg bg-white/[0.03]">
              <div className="text-sm font-bold text-green-400">{ojtHours.logged}h</div>
              <div className="text-[10px] text-white/90">OJT</div>
            </div>
            <div className="text-center p-2 rounded-lg bg-white/[0.03]">
              <div className="text-sm font-bold text-orange-400">{streak.currentStreak}</div>
              <div className="text-[10px] text-white/90">Streak</div>
            </div>
          </div>

          {/* Progress Breakdown */}
          <div className="space-y-2 mt-4 pt-3 border-t border-white/[0.06]">
            {[
              { label: 'Quizzes', value: Math.round(componentScores.quizScore), weight: '25%', colour: 'bg-elec-yellow' },
              { label: 'Flashcards', value: Math.round(componentScores.flashcardScore), weight: '15%', colour: 'bg-blue-400' },
              { label: 'OJT Hours', value: Math.round(componentScores.ojtScore), weight: '15%', colour: 'bg-cyan-400' },
              { label: 'Portfolio ACs', value: Math.round(componentScores.portfolioScore), weight: '15%', colour: 'bg-green-400' },
              { label: 'KSBs', value: Math.round(componentScores.ksbScore), weight: '10%', colour: 'bg-purple-400' },
              { label: 'Study Streak', value: Math.round(componentScores.streakScore), weight: '10%', colour: 'bg-orange-400' },
              { label: 'EPA Readiness', value: Math.round(componentScores.epaScore), weight: '10%', colour: 'bg-pink-400' },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-2">
                <span className="text-[11px] text-white/70 w-24 shrink-0 truncate">{item.label}</span>
                <div className="flex-1 h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
                  <div
                    className={`h-full ${item.colour} rounded-full transition-all duration-500`}
                    style={{ width: `${item.value}%` }}
                  />
                </div>
                <span className="text-[11px] text-white/90 w-8 text-right tabular-nums">{item.value}%</span>
                <span className="text-[10px] text-white/60 w-7 text-right">{item.weight}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Mid-section: 2-column on desktop */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Skill Radar */}
        <SkillRadarChart data={skillRadar} />

        {/* Flashcard Mastery */}
        <FlashcardMasteryWheel
          sets={flashcardInsights}
          totalMastered={totalMasteredCards}
          totalCards={totalFlashcards}
        />

        {/* OJT Hours Card */}
        <Card className="bg-gradient-to-br from-elec-gray to-elec-card border-white/[0.06]">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="p-1.5 rounded-lg bg-cyan-500/10">
                <Clock className="h-4 w-4 text-cyan-400" />
              </div>
              <h3 className="font-semibold text-white text-sm">OJT Hours</h3>
            </div>

            <div className="flex items-end gap-4">
              <div className="flex-1">
                <div className="text-3xl font-bold text-white">{ojtHours.logged}</div>
                <div className="text-sm text-white/90">of {ojtHours.target.toLocaleString()} hours</div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-cyan-400">{ojtHours.percentComplete}%</div>
                <div className="text-xs text-white/70">complete</div>
              </div>
            </div>

            <div className="mt-3 h-2 bg-white/[0.06] rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full transition-all duration-700"
                style={{ width: `${Math.min(ojtHours.percentComplete, 100)}%` }}
              />
            </div>
          </CardContent>
        </Card>

        {/* Achievements summary */}
        <Card className="bg-gradient-to-br from-elec-gray to-elec-card border-white/[0.06]">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-1">
              <div className="p-1.5 rounded-lg bg-elec-yellow/10">
                <Trophy className="h-4 w-4 text-elec-yellow" />
              </div>
              <h3 className="font-semibold text-white text-sm">Achievements</h3>
              <span className="ml-auto text-sm font-bold text-elec-yellow">
                {getUnlockedCount()}/{getTotalCount()}
              </span>
            </div>
            <div className="h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-elec-yellow to-amber-600 rounded-full transition-all duration-500"
                style={{ width: `${(getUnlockedCount() / getTotalCount()) * 100}%` }}
              />
            </div>
            <p className="text-xs text-white/70 mt-2">
              {getUnlockedCount() === 0
                ? 'Start learning to unlock achievements'
                : `${getTotalCount() - getUnlockedCount()} achievements remaining`}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <RecentActivityFeed />
    </div>
  );
}

export default ProgressDashboard;
