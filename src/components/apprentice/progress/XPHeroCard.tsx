/**
 * XPHeroCard
 *
 * Top-of-dashboard card showing level, XP ring, streak, daily goal.
 */

import { useState } from 'react';
import { Settings2 } from 'lucide-react';
import { XPProgressRing } from '@/components/apprentice/XPProgressRing';
import { DailyGoalSelector } from '@/components/apprentice/DailyGoalSelector';
import { useLearningXP } from '@/hooks/useLearningXP';
import { useStudyStreak } from '@/hooks/useStudyStreak';

export function XPHeroCard() {
  const {
    totalXP,
    level,
    levelTitle,
    xpToday,
    dailyGoal,
    xpProgress,
    xpToNextLevel,
    setDailyGoal,
  } = useLearningXP();
  const { streak } = useStudyStreak();
  const [showGoalSelector, setShowGoalSelector] = useState(false);

  return (
    <>
      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5">
        <div className="flex items-center gap-5">
          <XPProgressRing
            xpToday={xpToday}
            dailyGoal={dailyGoal}
            level={level}
            levelTitle={levelTitle}
            totalXP={totalXP}
            size={110}
            onTap={() => setShowGoalSelector(true)}
          />

          <div className="flex-1 space-y-3">
            <div className="space-y-1">
              <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                {levelTitle}
              </span>
              <p className="text-[13px] text-white/85 font-mono">
                {totalXP.toLocaleString()} XP total
              </p>
            </div>

            <div>
              <div className="flex justify-between text-[11px] text-white/55 mb-1 font-mono">
                <span>Level {level}</span>
                <span>{xpToNextLevel > 0 ? `${xpToNextLevel} XP to next` : 'Max level'}</span>
              </div>
              <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                <div
                  className="h-full bg-elec-yellow rounded-full transition-all duration-500"
                  style={{ width: `${xpProgress}%` }}
                />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5 text-[12px] text-white/85 font-mono">
                <span className="text-white">{streak.currentStreak}</span>
                <span className="text-white/55">day streak</span>
              </div>

              <button
                onClick={() => setShowGoalSelector(true)}
                className="flex items-center gap-1 text-[11px] text-white/55 hover:text-white h-9 px-2 rounded-lg active:bg-white/[0.05] touch-manipulation font-mono"
              >
                <Settings2 className="h-3 w-3" />
                <span>{dailyGoal} XP/day</span>
              </button>
            </div>
          </div>
        </div>
      </div>

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
