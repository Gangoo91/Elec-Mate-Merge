/**
 * DiaryWeeklySummary
 *
 * Premium-looking collapsible card aggregating the current week's activity.
 * Gradient accent top bar, mood trend dots (Mon-Fri), sites visited count,
 * and "this week vs last week" comparison.
 */

import { useMemo, useState } from 'react';
import { ChevronDown, ChevronUp, TrendingUp, TrendingDown, Minus, Flame } from 'lucide-react';
import type { SiteDiaryEntry } from '@/hooks/site-diary/useSiteDiaryEntries';
import { useDiaryStreak } from '@/hooks/site-diary/useDiaryStreak';

const COLLAPSE_KEY = 'elec-mate-diary-weekly-collapsed';

/** Returns colour class for mood dot */
function moodDotColour(mood: number | null | undefined): string {
  if (!mood) return 'bg-white/15';
  if (mood >= 4) return 'bg-green-400';
  if (mood === 3) return 'bg-amber-400';
  return 'bg-red-400';
}

interface DiaryWeeklySummaryProps {
  entries: SiteDiaryEntry[];
}

export function DiaryWeeklySummary({
  entries,
  aiSummary,
}: DiaryWeeklySummaryProps & { aiSummary?: string | null }) {
  const { currentStreak, milestones, nextMilestone, daysToNextMilestone, streakMessage } =
    useDiaryStreak(entries);
  const [collapsed, setCollapsed] = useState(() => {
    try {
      return localStorage.getItem(COLLAPSE_KEY) === 'true';
    } catch {
      return false;
    }
  });

  const toggleCollapsed = () => {
    const next = !collapsed;
    setCollapsed(next);
    try {
      localStorage.setItem(COLLAPSE_KEY, String(next));
    } catch {
      /* ignore */
    }
  };

  const { thisWeek, lastWeek } = useMemo(() => {
    const now = new Date();
    const startOfThisWeek = new Date(now);
    const day = startOfThisWeek.getDay();
    const diff = day === 0 ? 6 : day - 1; // Monday-based week
    startOfThisWeek.setDate(startOfThisWeek.getDate() - diff);
    startOfThisWeek.setHours(0, 0, 0, 0);

    const startOfLastWeek = new Date(startOfThisWeek);
    startOfLastWeek.setDate(startOfLastWeek.getDate() - 7);

    const thisWeekStr = startOfThisWeek.toISOString().split('T')[0];
    const lastWeekStr = startOfLastWeek.toISOString().split('T')[0];

    const thisWeekEntries = entries.filter((e) => e.date >= thisWeekStr);
    const lastWeekEntries = entries.filter((e) => e.date >= lastWeekStr && e.date < thisWeekStr);

    const allTasks = thisWeekEntries.flatMap((e) => e.tasks_completed);
    const allSkills = Array.from(new Set(thisWeekEntries.flatMap((e) => e.skills_practised)));
    const sites = Array.from(new Set(thisWeekEntries.map((e) => e.site_name)));

    // Mood trend for Mon-Fri (5 dots)
    const moodTrend: (number | null)[] = [];
    for (let i = 0; i < 5; i++) {
      const checkDate = new Date(startOfThisWeek);
      checkDate.setDate(checkDate.getDate() + i);
      const checkStr = checkDate.toISOString().split('T')[0];
      const dayEntry = thisWeekEntries.find((e) => e.date === checkStr);
      moodTrend.push(dayEntry?.mood_rating || null);
    }

    return {
      thisWeek: {
        daysLogged: thisWeekEntries.length,
        totalTasks: allTasks.length,
        skills: allSkills,
        sites,
        moodTrend,
      },
      lastWeek: {
        daysLogged: lastWeekEntries.length,
      },
    };
  }, [entries]);

  if (thisWeek.daysLogged === 0 && lastWeek.daysLogged === 0) {
    return null;
  }

  const entryDiff = thisWeek.daysLogged - lastWeek.daysLogged;

  return (
    <div className="rounded-xl overflow-hidden bg-white/[0.03] border border-white/[0.06]">
      {/* Gradient accent top bar */}
      <div className="h-1 bg-gradient-to-r from-elec-yellow via-amber-500 to-orange-500" />

      {/* Header - always visible, toggles collapse */}
      <button
        onClick={toggleCollapsed}
        className="w-full flex items-center justify-between px-4 py-3 touch-manipulation"
      >
        <div className="flex items-center gap-3">
          <h3 className="text-sm font-semibold text-white">This Week</h3>
          {/* Compact stats when collapsed */}
          {collapsed && (
            <span className="text-xs text-white">
              {thisWeek.daysLogged} day{thisWeek.daysLogged !== 1 ? 's' : ''} ·{' '}
              {thisWeek.totalTasks} tasks
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          {/* Week comparison arrow */}
          {entryDiff !== 0 && (
            <div
              className={`flex items-center gap-0.5 text-[11px] font-medium ${
                entryDiff > 0 ? 'text-green-400' : 'text-red-400'
              }`}
            >
              {entryDiff > 0 ? (
                <TrendingUp className="h-3 w-3" />
              ) : (
                <TrendingDown className="h-3 w-3" />
              )}
              {entryDiff > 0 ? '+' : ''}
              {entryDiff}
            </div>
          )}
          {entryDiff === 0 && thisWeek.daysLogged > 0 && lastWeek.daysLogged > 0 && (
            <div className="flex items-center gap-0.5 text-[11px] font-medium text-white">
              <Minus className="h-3 w-3" /> same
            </div>
          )}
          {collapsed ? (
            <ChevronDown className="h-4 w-4 text-white" />
          ) : (
            <ChevronUp className="h-4 w-4 text-white" />
          )}
        </div>
      </button>

      {/* Expandable content */}
      {!collapsed && (
        <div className="px-4 pb-4 space-y-3">
          {/* Stats grid */}
          <div className="grid grid-cols-4 gap-2 sm:gap-3">
            <div className="text-center py-2 rounded-lg bg-white/[0.03]">
              <div className="text-lg sm:text-xl font-bold text-elec-yellow">
                {thisWeek.daysLogged}
              </div>
              <div className="text-[10px] text-white">Days</div>
            </div>
            <div className="text-center py-2 rounded-lg bg-white/[0.03]">
              <div className="text-lg sm:text-xl font-bold text-green-400">
                {thisWeek.totalTasks}
              </div>
              <div className="text-[10px] text-white">Tasks</div>
            </div>
            <div className="text-center py-2 rounded-lg bg-white/[0.03]">
              <div className="text-lg sm:text-xl font-bold text-purple-400">
                {thisWeek.skills.length}
              </div>
              <div className="text-[10px] text-white">Skills</div>
            </div>
            <div className="text-center py-2 rounded-lg bg-white/[0.03]">
              <div className="text-lg sm:text-xl font-bold text-cyan-400">
                {thisWeek.sites.length}
              </div>
              <div className="text-[10px] text-white">Sites</div>
            </div>
          </div>

          {/* Mood trend dots (Mon-Fri) */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[10px] text-white uppercase tracking-wider font-medium">
                Mood this week
              </span>
            </div>
            <div className="flex items-center gap-2">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map((day, i) => (
                <div key={day} className="flex flex-col items-center gap-1 flex-1">
                  <div className={`w-3 h-3 rounded-full ${moodDotColour(thisWeek.moodTrend[i])}`} />
                  <span className="text-[9px] text-white">{day}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Skills used this week */}
          {thisWeek.skills.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {thisWeek.skills.slice(0, 5).map((skill) => (
                <span
                  key={skill}
                  className="px-2 py-0.5 rounded text-[10px] font-medium bg-purple-500/10 border border-purple-500/20 text-purple-400"
                >
                  {skill}
                </span>
              ))}
            </div>
          )}

          {/* Streak milestone badges */}
          <div className="space-y-2 pt-1">
            <div className="flex items-center gap-1.5">
              <Flame className="h-3 w-3 text-orange-400" />
              <span className="text-[10px] text-white uppercase tracking-wider font-medium">
                Streak milestones
              </span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {milestones.map((m) => (
                <span
                  key={m.days}
                  className={`px-2 py-1 rounded-lg text-[10px] font-medium border ${
                    m.reached
                      ? 'bg-orange-500/15 border-orange-500/30 text-orange-400'
                      : 'bg-white/[0.03] border-white/[0.06] text-white/30'
                  }`}
                >
                  {m.icon} {m.label}
                </span>
              ))}
            </div>

            {/* Next milestone progress */}
            {nextMilestone && currentStreak > 0 && (
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-white">
                    {currentStreak}/{nextMilestone} days
                  </span>
                  <span className="text-[10px] text-orange-400">
                    {daysToNextMilestone} more to go!
                  </span>
                </div>
                <div className="h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-orange-500 to-elec-yellow transition-all duration-500"
                    style={{ width: `${Math.min((currentStreak / nextMilestone) * 100, 100)}%` }}
                  />
                </div>
              </div>
            )}

            {/* Motivational message */}
            <p className="text-[11px] text-white/70 italic">{streakMessage}</p>
          </div>

          {/* AI weekly summary */}
          {aiSummary && (
            <div className="pt-1 border-t border-white/[0.06]">
              <p className="text-[11px] text-white/80 leading-relaxed">{aiSummary}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
