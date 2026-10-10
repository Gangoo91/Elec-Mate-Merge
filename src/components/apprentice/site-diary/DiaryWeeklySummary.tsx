/**
 * DiaryWeeklySummary — "This week": Mon–Fri at a glance.
 *
 * 6 Oct 2026 rebuild (it replaces the stats ribbon, the old weekly summary
 * tiles and the streak milestones, which showed the streak three times and
 * vanished entirely once you'd lapsed). Every day does something when tapped:
 *   - logged → shows that day's entries in the history;
 *   - today → opens the log;
 *   - a gap → log it, or mark it College / Off / Holiday / Sick, so a college
 *     day stops counting as "missed" (useDiaryDayMarks);
 *   - a marked day → change or clear the mark.
 * On a Monday or Tuesday, last week's unlogged days are offered too — Friday
 * was otherwise only reachable through the calendar.
 * Training is stated honestly: signed off, waiting (for the tutor when the
 * learner has a college, otherwise for the supervisor they must ask), not
 * accepted, or not sent — and links to the OTJ hub, where it counts.
 */
import { useState } from 'react';
import { Check, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { TONE_DOT, type DiaryTone } from '@/lib/site-diary/statusColour';
import { toLocalISODate } from '@/lib/localDate';
import { formatMinutes, type SiteDiaryEntry } from '@/hooks/site-diary/useSiteDiaryEntries';
import { DAY_MARKS, dayMarkShort, type DayMarkKind } from '@/hooks/site-diary/useDiaryDayMarks';
import type { OtjState } from './DiaryEntryCard';

interface Props {
  entries: SiteDiaryEntry[];
  otjStatus: Record<string, OtjState>;
  marks: Record<string, DayMarkKind>;
  collegeLinked: boolean;
  streakMessage: string | null;
  /** Log an entry for a day (today or a past gap). */
  onLogDay: (date: string | null) => void;
  /** Show a logged day's entries in the history. */
  onShowDay: (date: string) => void;
  onMarkDay: (date: string, kind: DayMarkKind | null) => void;
  onOpenOtjHub: () => void;
}

const shortDay = (d: Date) => d.toLocaleDateString('en-GB', { weekday: 'short' });
const longDay = (iso: string) =>
  new Date(iso + 'T00:00:00').toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'short',
  });

export function DiaryWeeklySummary({
  entries,
  otjStatus,
  marks,
  collegeLinked,
  streakMessage,
  onLogDay,
  onShowDay,
  onMarkDay,
  onOpenOtjHub,
}: Props) {
  const [picked, setPicked] = useState<string | null>(null);

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todayKey = toLocalISODate(today);
  const monday = new Date(today);
  const dow = monday.getDay();
  monday.setDate(monday.getDate() - (dow === 0 ? 6 : dow - 1));
  const days = Array.from({ length: 5 }, (_, i) => {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    return { key: toLocalISODate(d), label: shortDay(d) };
  });
  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);
  const sundayKey = toLocalISODate(sunday);
  const mondayKey = days[0].key;
  const loggedAll = new Set(entries.map((e) => e.date));
  const week = entries.filter((e) => e.date >= mondayKey && e.date <= sundayKey);

  // Monday/Tuesday: last week's weekdays with nothing logged or marked —
  // only for someone keeping the diary (something in the last fortnight).
  // Five blank days shown to someone back after months is noise, not a nudge.
  const fortnightAgo = new Date(monday);
  fortnightAgo.setDate(monday.getDate() - 14);
  // Entries BEFORE this week only: a first-ever entry today doesn't make
  // last week's blanks something they missed.
  const activeDiarist = entries.some(
    (e) => e.date >= toLocalISODate(fortnightAgo) && e.date < mondayKey
  );
  const lastWeekGaps =
    (dow === 1 || dow === 2) && activeDiarist
      ? Array.from({ length: 5 }, (_, i) => {
          const d = new Date(monday);
          d.setDate(monday.getDate() - 7 + i);
          const key = toLocalISODate(d);
          return { key, label: shortDay(d), gap: !loggedAll.has(key) && !marks[key] };
        })
      : [];
  const lastWeekGapCount = lastWeekGaps.filter((d) => d.gap).length;

  let sent = 0;
  let signed = 0;
  let rejected = 0;
  let notSent = 0;
  for (const e of week) {
    const m = e.training_minutes ?? 0;
    if (!m) continue;
    const st = otjStatus[e.id];
    if (st === 'verified' || st === 'verified_by_employer') signed += m;
    else if (st === 'pending') sent += m;
    else if (st === 'rejected') rejected += m;
    else if (!e.linked_otj_entry_id) notSent += m;
  }
  // Each part carries its status colour (see statusColour.ts).
  const trainingParts = (
    [
      signed ? { tone: 'done', text: `${formatMinutes(signed)} signed off` } : null,
      sent
        ? {
            tone: 'waiting',
            text: collegeLinked
              ? `${formatMinutes(sent)} waiting for sign-off`
              : `${formatMinutes(sent)} waiting — ask your supervisor to confirm`,
          }
        : null,
      rejected ? { tone: 'back', text: `${formatMinutes(rejected)} sent back to fix` } : null,
      notSent ? { tone: 'none', text: `${formatMinutes(notSent)} not sent yet` } : null,
    ] as Array<{ tone: DiaryTone; text: string } | null>
  ).filter((p): p is { tone: DiaryTone; text: string } => !!p);

  const gapCount = days.filter(
    (d) => d.key < todayKey && !loggedAll.has(d.key) && !marks[d.key]
  ).length;

  // A logged day shows that day. Anything else — a missed day, today, or a
  // day still to come — opens the same small panel: log it (not for future
  // days) or mark it, so a college day can be marked on the day and a booked
  // holiday ahead of time.
  const tap = (key: string) => {
    if (loggedAll.has(key)) onShowDay(key);
    else setPicked((p) => (p === key ? null : key));
  };

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-5 gap-2">
        {days.map((d) => {
          const isLogged = loggedAll.has(d.key);
          const mark = !isLogged ? marks[d.key] : undefined;
          const future = d.key > todayKey;
          const isToday = d.key === todayKey;
          const gap = !isLogged && !mark && !future && !isToday;
          return (
            <button
              key={d.key}
              type="button"
              onClick={() => tap(d.key)}
              aria-pressed={picked === d.key}
              aria-label={`${d.label}: ${
                isLogged
                  ? 'logged — show it'
                  : mark
                    ? `${dayMarkShort(mark)} — change`
                    : future
                      ? 'to come — mark it'
                      : isToday
                        ? 'today — log or mark it'
                        : 'nothing logged — add it'
              }`}
              className={cn(
                'flex h-14 flex-col items-center justify-center gap-1 rounded-xl border text-[13px] font-semibold touch-manipulation active:bg-white/[0.08]',
                // Logged takes its colour from the check, not a solid yellow
                // block (10 Oct: no solid yellow on every row).
                isLogged
                  ? 'border-emerald-400/60 bg-white/[0.06] text-white'
                  : mark
                    ? 'border-white/[0.35] bg-white/[0.08] text-white'
                    : isToday
                      ? 'border-elec-yellow text-white'
                      : gap
                        ? 'border-white/[0.35] text-white hover:border-white/60'
                        : 'cursor-default border-dashed border-white/[0.14] text-white',
                picked === d.key && 'border-white'
              )}
            >
              {d.label}
              <span className="flex h-3.5 items-center text-[12px] font-medium leading-none">
                {isLogged ? (
                  <Check className="h-4 w-4 text-emerald-400" strokeWidth={2.5} aria-hidden />
                ) : mark ? (
                  dayMarkShort(mark)
                ) : isToday ? (
                  'Today'
                ) : gap ? (
                  'Add'
                ) : null}
              </span>
            </button>
          );
        })}
      </div>

      {lastWeekGapCount > 0 && (
        <div className="space-y-1.5">
          <p className="text-[12.5px] font-semibold text-white">
            Last week · {lastWeekGapCount} {lastWeekGapCount === 1 ? 'day' : 'days'} not logged
          </p>
          <div className="grid grid-cols-5 gap-1.5">
            {lastWeekGaps.map((d) =>
              d.gap ? (
                <button
                  key={d.key}
                  type="button"
                  onClick={() => setPicked((p) => (p === d.key ? null : d.key))}
                  aria-pressed={picked === d.key}
                  aria-label={`Last ${d.label}: nothing logged — add it`}
                  className={cn(
                    'h-11 rounded-xl border text-[12px] font-semibold text-white touch-manipulation',
                    picked === d.key ? 'border-white' : 'border-white/[0.22] hover:border-white/60'
                  )}
                >
                  {d.label}
                </button>
              ) : (
                <span key={d.key} aria-hidden className="h-11" />
              )
            )}
          </div>
        </div>
      )}

      {picked && (
        <div className="space-y-2 rounded-xl border border-white/[0.14] p-3">
          <p className="text-[13px] font-semibold text-white">{longDay(picked)}</p>
          <div className="flex flex-wrap gap-2">
            {picked <= todayKey && (
              <button
                type="button"
                onClick={() => {
                  const d = picked;
                  setPicked(null);
                  onLogDay(d === todayKey ? null : d);
                }}
                className="h-11 rounded-xl border border-white bg-white px-4 text-[13.5px] font-semibold text-black touch-manipulation"
              >
                {picked === todayKey ? 'Log today' : 'Log this day'}
              </button>
            )}
            {DAY_MARKS.map((m) => {
              const on = marks[picked] === m.id;
              return (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => {
                    onMarkDay(picked, on ? null : m.id);
                    setPicked(null);
                  }}
                  aria-pressed={on}
                  className={cn(
                    'h-11 rounded-xl border px-3.5 text-[13.5px] touch-manipulation',
                    on
                      ? 'border-white bg-white font-semibold text-black'
                      : 'border-white/[0.18] bg-white/[0.06] font-medium text-white'
                  )}
                >
                  {m.label}
                </button>
              );
            })}
          </div>
          {marks[picked] && (
            <p className="text-[12.5px] text-white">Tap the highlighted one to clear it.</p>
          )}
        </div>
      )}

      {!picked && gapCount > 0 && (
        <p className="text-[12.5px] text-white">College day or off? Tap the day to mark it.</p>
      )}

      <button
        type="button"
        onClick={onOpenOtjHub}
        className="flex min-h-[48px] w-full items-center justify-between gap-3 rounded-xl border border-white/[0.14] px-3.5 py-2.5 text-left touch-manipulation hover:border-white/[0.3]"
      >
        <span className="min-w-0">
          <span className="block text-[13.5px] font-semibold text-white">Training this week</span>
          <span className="block text-[12.5px] text-white">
            {trainingParts.length ? (
              <span className="flex flex-wrap gap-x-3 gap-y-0.5">
                {trainingParts.map((p) => (
                  <span key={p.text} className="inline-flex items-center gap-1.5">
                    <span
                      aria-hidden
                      className={cn('h-2 w-2 shrink-0 rounded-full', TONE_DOT[p.tone])}
                    />
                    {p.text}
                  </span>
                ))}
              </span>
            ) : (
              'None this week. Open your off-the-job hours'
            )}
          </span>
        </span>
        <ChevronRight className="h-4 w-4 shrink-0 text-white" aria-hidden />
      </button>

      {streakMessage && <p className="text-[13px] text-white">{streakMessage}</p>}
    </div>
  );
}

export default DiaryWeeklySummary;
