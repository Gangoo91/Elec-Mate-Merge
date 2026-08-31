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
import { toLocalISODate } from '@/lib/localDate';
import { useDiaryStreak } from '@/hooks/site-diary/useDiaryStreak';
import { storageGetSync, storageSetSync } from '@/utils/storage';
import { moodFill } from '@/lib/site-diary/mood';

const COLLAPSE_KEY = 'elec-mate-diary-weekly-collapsed';

/** Returns colour class for mood dot */
/** Single definition — see `@/lib/site-diary/mood`. */
const moodDotColour = moodFill;

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
    return storageGetSync(COLLAPSE_KEY) === 'true';
  });

  const toggleCollapsed = () => {
    const next = !collapsed;
    setCollapsed(next);
    storageSetSync(COLLAPSE_KEY, String(next));
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

    const thisWeekStr = toLocalISODate(startOfThisWeek);
    const lastWeekStr = toLocalISODate(startOfLastWeek);

    /*
     * This week is bounded at BOTH ends.
     *
     * It used to be `e.date >= thisWeekStr` with no upper bound, so anything
     * dated after today — and the form has a free date picker — landed in "this
     * week". Last week was already bounded on both sides, so the week-on-week
     * comparison was measuring two different shapes of range.
     */
    const endOfThisWeek = new Date(startOfThisWeek);
    endOfThisWeek.setDate(endOfThisWeek.getDate() + 7);
    const endOfThisWeekStr = toLocalISODate(endOfThisWeek);

    const thisWeekEntries = entries.filter(
      (e) => e.date >= thisWeekStr && e.date < endOfThisWeekStr
    );
    const lastWeekEntries = entries.filter((e) => e.date >= lastWeekStr && e.date < thisWeekStr);

    /* Days, not entries. There is no unique index on (user_id, date), so two
       entries on one day counted as two days under the old `.length`. */
    const countDays = (list: SiteDiaryEntry[]) => new Set(list.map((e) => e.date)).size;

    const allTasks = thisWeekEntries.flatMap((e) => e.tasks_completed);
    const allSkills = Array.from(new Set(thisWeekEntries.flatMap((e) => e.skills_practised)));
    const sites = Array.from(new Set(thisWeekEntries.map((e) => e.site_name)));

    // Mood trend for Mon-Fri (5 dots)
    const moodTrend: (number | null)[] = [];
    for (let i = 0; i < 5; i++) {
      const checkDate = new Date(startOfThisWeek);
      checkDate.setDate(checkDate.getDate() + i);
      const checkStr = toLocalISODate(checkDate);
      const dayEntry = thisWeekEntries.find((e) => e.date === checkStr);
      moodTrend.push(dayEntry?.mood_rating || null);
    }

    return {
      thisWeek: {
        daysLogged: countDays(thisWeekEntries),
        totalTasks: allTasks.length,
        skills: allSkills,
        sites,
        moodTrend,
      },
      lastWeek: {
        daysLogged: countDays(lastWeekEntries),
      },
    };
  }, [entries]);

  if (thisWeek.daysLogged === 0 && lastWeek.daysLogged === 0) {
    return null;
  }

  const entryDiff = thisWeek.daysLogged - lastWeek.daysLogged;

  return (
    <div className="rounded-xl overflow-hidden bg-white/[0.06] border border-white/[0.10]">
      {/* Header - always visible, toggles collapse */}
      <button
        onClick={toggleCollapsed}
        className="w-full flex items-center justify-between px-4 py-3 touch-manipulation min-h-[44px]"
      >
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/70">
            This week
          </span>
          {collapsed && (
            <span className="text-[12px] text-white/85 font-mono">
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
          <div className="grid grid-cols-4 gap-2 sm:gap-3">
            <div className="text-center py-2 rounded-lg border border-white/[0.10] bg-white/[0.06]">
              <div className="text-[16px] font-mono text-white">{thisWeek.daysLogged}</div>
              <div className="text-[10px] uppercase tracking-[0.18em] text-white/70 mt-0.5">
                Days
              </div>
            </div>
            <div className="text-center py-2 rounded-lg border border-white/[0.10] bg-white/[0.06]">
              <div className="text-[16px] font-mono text-white">{thisWeek.totalTasks}</div>
              <div className="text-[10px] uppercase tracking-[0.18em] text-white/70 mt-0.5">
                Tasks
              </div>
            </div>
            <div className="text-center py-2 rounded-lg border border-white/[0.10] bg-white/[0.06]">
              <div className="text-[16px] font-mono text-white">{thisWeek.skills.length}</div>
              <div className="text-[10px] uppercase tracking-[0.18em] text-white/70 mt-0.5">
                Skills
              </div>
            </div>
            <div className="text-center py-2 rounded-lg border border-white/[0.10] bg-white/[0.06]">
              <div className="text-[16px] font-mono text-white">{thisWeek.sites.length}</div>
              <div className="text-[10px] uppercase tracking-[0.18em] text-white/70 mt-0.5">
                Sites
              </div>
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
                  className="px-2 py-0.5 rounded text-[10px] font-medium bg-white/[0.06] border border-purple-500/20 text-purple-400"
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
                      ? 'bg-white/[0.06] border-orange-500/30 text-orange-400'
                      : 'bg-white/[0.07] border-white/[0.10] text-white'
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
            <p className="text-[11px] text-white italic">{streakMessage}</p>
          </div>

          {/* AI weekly summary */}
          {aiSummary && (
            <div className="pt-1 border-t border-white/[0.10]">
              <p className="text-[11px] text-white leading-relaxed">{aiSummary}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
