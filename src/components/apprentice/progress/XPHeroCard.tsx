/**
 * XPHeroCard
 *
 * Top-of-dashboard card showing level, XP ring, streak, daily goal.
 */

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Flame, Settings2 } from 'lucide-react';
import { XPProgressRing } from '@/components/apprentice/XPProgressRing';
import { DailyGoalSelector } from '@/components/apprentice/DailyGoalSelector';
import { useLearningXP } from '@/hooks/useLearningXP';
import { useStudyStreak } from '@/hooks/useStudyStreak';

export function XPHeroCard() {
  const { totalXP, level, levelTitle, xpToday, dailyGoal, xpProgress, xpToNextLevel, setDailyGoal } = useLearningXP();
  const { streak } = useStudyStreak();
  const [showGoalSelector, setShowGoalSelector] = useState(false);

  return (
    <>
      <Card className="bg-gradient-to-br from-elec-gray to-elec-card border-elec-yellow/20 overflow-hidden relative">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-elec-yellow/5 rounded-full blur-3xl" />

        <CardContent className="p-5 relative">
          <div className="flex items-center gap-5">
            {/* XP Ring */}
            <XPProgressRing
              xpToday={xpToday}
              dailyGoal={dailyGoal}
              level={level}
              levelTitle={levelTitle}
              totalXP={totalXP}
              size={110}
              onTap={() => setShowGoalSelector(true)}
            />

            {/* Stats */}
            <div className="flex-1 space-y-3">
              {/* Title + level */}
              <div>
                <h3 className="text-lg font-bold text-white">{levelTitle}</h3>
                <p className="text-sm text-white/90">
                  {totalXP.toLocaleString()} XP total
                </p>
              </div>

              {/* Level progress bar */}
              <div>
                <div className="flex justify-between text-xs text-white/90 mb-1">
                  <span>Level {level}</span>
                  <span>{xpToNextLevel > 0 ? `${xpToNextLevel} XP to next` : 'Max level'}</span>
                </div>
                <div className="h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-elec-yellow to-amber-500 rounded-full transition-all duration-500"
                    style={{ width: `${xpProgress}%` }}
                  />
                </div>
              </div>

              {/* Streak + Goal */}
              <div className="flex items-center gap-4">
                {/* Streak */}
                <div className="flex items-center gap-1.5">
                  <Flame className="h-4 w-4 text-orange-400" />
                  <span className="text-sm font-semibold text-white">
                    {streak.currentStreak}
                  </span>
                  <span className="text-xs text-white/90">day streak</span>
                </div>

                {/* Daily goal button */}
                <button
                  onClick={() => setShowGoalSelector(true)}
                  className="flex items-center gap-1 text-xs text-white/90 hover:text-white h-11 px-2 rounded-lg active:bg-white/[0.05] touch-manipulation"
                >
                  <Settings2 className="h-3 w-3" />
                  <span>{dailyGoal} XP/day</span>
                </button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <DailyGoalSelector
        open={showGoalSelector}
        onOpenChange={setShowGoalSelector}
        currentGoal={dailyGoal}
        onSelect={setDailyGoal}
      />
    </>
  );
}

export default XPHeroCard;
