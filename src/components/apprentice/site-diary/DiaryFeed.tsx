/**
 * DiaryFeed — the diary's history, grouped by week.
 *
 * 6 Oct 2026 rebuild. A week is how an apprentice thinks about site work and
 * how a tutor reviews it, so each week gets a header — "w/c 29 Sep · 4 days ·
 * 3h training" — and its days as compact rows. The weekly reflection (the
 * diary coach, on demand) hangs off the week header; it used to be an
 * always-open card at the top of the page.
 *
 * Week headers and the reflection always use the WHOLE week (`allEntries`),
 * even while a search narrows the rows — a reflection asked for mid-search
 * used to be written from the matches only. Reflection is offered on this
 * week and last; older weeks keep one they already have. History shows 8
 * weeks, then "Show earlier weeks".
 */
import { useState } from 'react';
import { Loader2, RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils';
import { HOME_SURFACE } from '@/components/apprentice/ApprenticeHomeUi';
import { toLocalISODate, todayLocalISO } from '@/lib/localDate';
import { formatMinutes, type SiteDiaryEntry } from '@/hooks/site-diary/useSiteDiaryEntries';
import type { DiaryCoachInsight } from '@/hooks/site-diary/useDiaryCoach';
import { DiaryEntryCard, type OtjState } from './DiaryEntryCard';

export interface WeekGroup {
  /** Monday of the week, ISO. */
  key: string;
  entries: SiteDiaryEntry[];
  days: number;
  minutes: number;
}

/** Monday (ISO date) of the week a date falls in. */
export function weekKey(isoDate: string): string {
  const d = new Date(isoDate + 'T00:00:00');
  const dow = d.getDay();
  d.setDate(d.getDate() - (dow === 0 ? 6 : dow - 1));
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(
    d.getDate()
  ).padStart(2, '0')}`;
}

export function groupByWeek(entries: SiteDiaryEntry[]): WeekGroup[] {
  const map = new Map<string, SiteDiaryEntry[]>();
  for (const e of entries) {
    const k = weekKey(e.date);
    map.set(k, [...(map.get(k) ?? []), e]);
  }
  return [...map.entries()]
    .sort(([a], [b]) => b.localeCompare(a))
    .map(([key, list]) => ({
      key,
      entries: [...list].sort((a, b) => b.date.localeCompare(a.date)),
      days: new Set(list.map((e) => e.date)).size,
      minutes: list.reduce((n, e) => n + (e.training_minutes ?? 0), 0),
    }));
}

interface DiaryFeedProps {
  /** The rows to show (may be filtered). */
  entries: SiteDiaryEntry[];
  /** Every entry — week headers and reflections are about the whole week. */
  allEntries: SiteDiaryEntry[];
  onEntryTap: (entry: SiteDiaryEntry) => void;
  otjStatus: Record<string, OtjState>;
  /** Weekly reflection, per week key. */
  reflections: Record<string, DiaryCoachInsight | undefined>;
  reflectingWeek: string | null;
  reflectionError?: string | null;
  onReflect: (week: WeekGroup) => void;
}

const PAGE_WEEKS = 8;

export function DiaryFeed({
  entries,
  allEntries,
  onEntryTap,
  otjStatus,
  reflections,
  reflectingWeek,
  reflectionError,
  onReflect,
}: DiaryFeedProps) {
  const [weeksShown, setWeeksShown] = useState(PAGE_WEEKS);
  const [askedWeek, setAskedWeek] = useState<string | null>(null);
  const weeks = groupByWeek(entries);
  const full = new Map(groupByWeek(allEntries).map((w) => [w.key, w]));
  const thisWeek = weekKey(todayLocalISO());
  const lastWeekDate = new Date(thisWeek + 'T00:00:00');
  lastWeekDate.setDate(lastWeekDate.getDate() - 7);
  const lastWeek = toLocalISODate(lastWeekDate);
  // Gap lines only make sense on the whole history, not a search result.
  const filtering = entries.length !== allEntries.length;
  const shown = weeks.slice(0, weeksShown);
  const latest = allEntries.reduce<string | null>(
    (m, e) => (m === null || e.date > m ? e.date : m),
    null
  );

  return (
    <div>
      {!filtering && latest && weekKey(latest) < lastWeek && (
        <GapLine>
          Nothing logged since{' '}
          {new Date(latest + 'T00:00:00').toLocaleDateString('en-GB', {
            weekday: 'short',
            day: 'numeric',
            month: 'short',
          })}
        </GapLine>
      )}
      {shown.map((shownWeek, i) => {
        const w = full.get(shownWeek.key) ?? shownWeek;
        const start = new Date(w.key + 'T00:00:00');
        const wc = start.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
        const prev = i > 0 ? shown[i - 1] : null;
        const month = start.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' });
        const prevMonth = prev
          ? new Date(prev.key + 'T00:00:00').toLocaleDateString('en-GB', {
              month: 'long',
              year: 'numeric',
            })
          : null;
        const weeksBetween = prev
          ? Math.round(
              (new Date(prev.key + 'T00:00:00').getTime() - start.getTime()) / (7 * 86400000)
            ) - 1
          : 0;
        const insight = reflections[w.key];
        const busy = reflectingWeek === w.key;
        const canReflect = w.key === thisWeek || w.key === lastWeek;
        const weekName =
          w.key === thisWeek ? 'This week' : w.key === lastWeek ? 'Last week' : `Week of ${wc}`;
        return (
          <section key={w.key} className={cn(i > 0 && 'mt-7')}>
            {!filtering && weeksBetween > 0 && (
              <div className="-mt-3 mb-4">
                <GapLine>
                  {weeksBetween >= 8
                    ? `About ${Math.round(weeksBetween / 4.345)} months with nothing logged`
                    : `${weeksBetween} ${weeksBetween === 1 ? 'week' : 'weeks'} with nothing logged`}
                </GapLine>
              </div>
            )}
            {month !== prevMonth && (
              <h2 className="mb-3 text-[19px] font-bold tracking-tight text-white">{month}</h2>
            )}
            <div className="mb-2.5 flex items-center justify-between gap-3">
              <p className="text-[13px] font-semibold text-white">
                {weekName}
                <span className="font-normal">
                  {' · '}
                  {w.days} {w.days === 1 ? 'day' : 'days'}
                  {w.minutes > 0 && ` · ${formatMinutes(w.minutes)} training`}
                </span>
              </p>
              {canReflect && (
                <button
                  type="button"
                  onClick={() => {
                    setAskedWeek(w.key);
                    onReflect(w);
                  }}
                  disabled={busy}
                  className="-my-1 inline-flex h-10 shrink-0 items-center gap-1.5 rounded-xl border border-white/[0.14] px-3.5 text-[13px] font-semibold text-white touch-manipulation transition-colors hover:border-white/[0.3] disabled:opacity-60"
                >
                  {busy ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : insight ? (
                    <RefreshCw className="h-4 w-4" strokeWidth={1.5} />
                  ) : null}
                  {busy ? 'Writing…' : insight ? 'Write again' : 'Reflect on the week'}
                </button>
              )}
            </div>
            {reflectionError && askedWeek === w.key && !busy && (
              <p className="mb-2 text-[13px] text-white">
                Couldn’t write the reflection: {reflectionError}
              </p>
            )}

            {(insight || busy) && (
              <div className={cn('mb-3 space-y-2 rounded-2xl border p-4 sm:p-5', HOME_SURFACE)}>
                {insight ? (
                  <>
                    <p className="text-[12px] font-semibold text-white">Your week, reflected</p>
                    <p className="text-[14px] leading-relaxed text-white">{insight.weekSummary}</p>
                    {insight.recommendation && (
                      <p className="text-[13.5px] leading-relaxed text-white">
                        <span className="font-semibold">Next week: </span>
                        {insight.recommendation}
                      </p>
                    )}
                    {insight.suggestedEvidence && (
                      <p className="text-[13.5px] leading-relaxed text-white">
                        <span className="font-semibold">For your portfolio: </span>
                        {insight.suggestedEvidence}
                      </p>
                    )}
                    {insight.regulationTip && (
                      <p className="text-[13.5px] leading-relaxed text-white">
                        <span className="font-semibold">Regs: </span>
                        {insight.regulationTip}
                      </p>
                    )}
                    <p className="border-t border-white/[0.1] pt-2 text-[12px] text-white">
                      Written by AI from your entries — check it before you use it at a review.
                    </p>
                  </>
                ) : (
                  <p className="text-[13.5px] text-white">Reading your week…</p>
                )}
              </div>
            )}

            <div className="space-y-2">
              {shownWeek.entries.map((e) => (
                <DiaryEntryCard
                  key={e.id}
                  entry={e}
                  onTap={onEntryTap}
                  otjState={otjStatus[e.id]}
                />
              ))}
            </div>
          </section>
        );
      })}
      {weeks.length > weeksShown && (
        <button
          type="button"
          onClick={() => setWeeksShown((n) => n + PAGE_WEEKS)}
          className="mt-6 h-11 w-full rounded-xl border border-white/[0.22] text-[14px] font-semibold text-white touch-manipulation"
        >
          Show earlier weeks
        </button>
      )}
    </div>
  );
}

/** A quiet divider: where the diary went unwritten. */
function GapLine({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-5 flex items-center gap-3" role="note">
      <span className="h-px flex-1 bg-white/[0.12]" aria-hidden />
      <span className="text-[12px] font-medium text-white">{children}</span>
      <span className="h-px flex-1 bg-white/[0.12]" aria-hidden />
    </div>
  );
}

export default DiaryFeed;
