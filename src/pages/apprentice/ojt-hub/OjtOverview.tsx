/**
 * The top of the off-the-job page: one hero for where the apprentice stands,
 * and one card that shows off the time the app recorded while they learned.
 *
 * Replaces four KPI tiles, a source-mix bar and a forecast panel that all
 * restated the same numbers in different words. Every figure here comes from
 * get_otj_summary / get_app_learning_breakdown — the same numbers their tutor
 * and employer see.
 */
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { CARD_SURFACE } from '@/components/ui/card-recipe';
import type { AppLearningBreakdown, OtjSummary } from '@/hooks/useOtjSummary';
import {
  OTJ_COUNTS,
  OTJ_DOES_NOT_COUNT,
  OTJ_RULES,
  OTJ_RULES_SOURCE,
} from '@/data/otjActivityTypes';

const cardCn = cn(
  '-mx-4 rounded-none border-y border-white/[0.08] p-5 sm:mx-0 sm:rounded-2xl sm:border-x sm:p-6',
  CARD_SURFACE
);

const fmtH = (h: number | null | undefined) => {
  const v = Number(h ?? 0);
  if (!Number.isFinite(v) || v <= 0) return '0h';
  if (v < 1) return `${Math.round(v * 60)}m`;
  return v < 10
    ? `${v.toFixed(1).replace(/\.0$/, '')}h`
    : `${Math.round(v).toLocaleString('en-GB')}h`;
};

const fmtMins = (m: number) => {
  if (m <= 0) return '0m';
  if (m < 60) return `${m}m`;
  const h = Math.floor(m / 60);
  const r = m % 60;
  return r ? `${h}h ${r}m` : `${h}h`;
};

const fmtLongDate = (iso: string | null) =>
  iso
    ? new Date(`${iso}T12:00:00`).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : '';

/* ── Hero ──────────────────────────────────────────────────────────────── */

interface HeroProps {
  summary: OtjSummary | null;
  /** Fallback target while the summary loads, or when no programme is set. */
  fallbackRequired: number;
  weekHours: number;
  waitingHours: number;
  /** Funding rules para 89: off-the-job training every calendar month. */
  trainedThisMonth: boolean;
  onAddTraining: () => void;
  onWeek: () => void;
  onCounted: () => void;
  onApproved: () => void;
  onWaiting: () => void;
  onSetProgramme: () => void;
}

export function OjtHeroCard({
  summary,
  fallbackRequired,
  weekHours,
  waitingHours,
  trainedThisMonth,
  onAddTraining,
  onWeek,
  onCounted,
  onApproved,
  onWaiting,
  onSetProgramme,
}: HeroProps) {
  const required = summary?.required_hours ?? fallbackRequired;
  const counted = summary?.counted_hours ?? 0;
  const planned = summary?.planned_to_date_hours ?? null;
  const pct = required > 0 ? Math.min(100, (counted / required) * 100) : 0;
  const plannedPct =
    required > 0 && planned != null ? Math.min(100, (planned / required) * 100) : null;
  const complete = required > 0 && counted >= required;

  const status = complete
    ? { word: 'Complete', tone: 'text-elec-yellow' }
    : summary?.risk === 'on_track'
      ? { word: 'On track', tone: 'text-elec-yellow' }
      : summary?.risk === 'slightly_behind'
        ? { word: 'Just behind', tone: 'text-white' }
        : summary?.risk === 'behind'
          ? { word: 'Behind', tone: 'text-red-300' }
          : { word: 'Set your dates', tone: 'text-white' };

  const forecastLine = complete
    ? 'Every hour you need is banked. Anything more is a bonus.'
    : summary?.forecast_at_end_hours != null && summary.end_date
      ? `On this pace you reach ${fmtH(summary.forecast_at_end_hours)} by ${fmtLongDate(summary.end_date)}.${
          summary.weekly_needed_hours
            ? ` About ${fmtH(summary.weekly_needed_hours)} a week gets you there.`
            : ''
        }`
      : summary?.start_date
        ? 'Your pace shows once you are four weeks in. Every minute you learn in the app already counts.'
        : 'Add your programme dates and we will show where you should be by now.';

  return (
    <section className={cardCn} aria-label="Your off-the-job hours">
      <div className="flex items-start justify-between gap-4">
        <p className="text-[12px] font-semibold text-elec-yellow">Off-the-job hours</p>
        <span className={cn('text-[13px] font-semibold', status.tone)}>{status.word}</span>
      </div>

      <button
        type="button"
        onClick={onCounted}
        className="mt-3 flex items-baseline gap-2 text-left touch-manipulation"
      >
        <span className="text-[44px] font-bold leading-none tracking-tight text-white tabular-nums sm:text-[52px]">
          {fmtH(counted)}
        </span>
        <span className="text-[16px] font-medium text-white">
          of {Math.round(required).toLocaleString('en-GB')}h
        </span>
      </button>

      {/* Progress, with where they should be today marked on it */}
      <div className="relative mt-5">
        <div className="h-3 overflow-hidden rounded-full bg-white/[0.10]">
          <div
            className="h-full rounded-full bg-elec-yellow transition-[width] duration-700"
            style={{ width: `${Math.max(pct, counted > 0 ? 1.5 : 0)}%` }}
          />
        </div>
        {plannedPct != null && plannedPct > 0 && (
          <div
            className="absolute -top-1.5 h-6 w-[2px] rounded bg-white"
            style={{ left: `calc(${plannedPct}% - 1px)` }}
            aria-hidden="true"
          />
        )}
      </div>
      <div className="mt-2 flex items-center justify-between text-[13px] text-white">
        <span>{Math.round(pct)}% done</span>
        {planned != null && planned > 0 ? (
          <span>Where you should be today: {fmtH(planned)}</span>
        ) : summary?.required_source === 'not_set' || !summary?.start_date ? (
          <button
            type="button"
            onClick={onSetProgramme}
            className="-my-2 inline-flex h-11 items-center px-1 font-semibold text-elec-yellow touch-manipulation"
          >
            Set your programme dates
          </button>
        ) : null}
      </div>

      <p className="mt-4 text-[14px] leading-relaxed text-white">{forecastLine}</p>

      <div className="mt-4 flex items-center justify-between gap-3 rounded-xl border border-white/[0.12] px-3.5 py-2.5">
        <span className="flex items-center gap-2.5 text-[13px] text-white">
          <span
            className={cn(
              'h-2 w-2 shrink-0 rounded-full',
              trainedThisMonth ? 'bg-elec-yellow' : 'bg-orange-400'
            )}
            aria-hidden="true"
          />
          {trainedThisMonth
            ? `Training this ${new Date().toLocaleDateString('en-GB', { month: 'long' })}: done`
            : `No training yet this ${new Date().toLocaleDateString('en-GB', { month: 'long' })}. The rules expect some every month.`}
        </span>
        {!trainedThisMonth && (
          <button
            type="button"
            onClick={onAddTraining}
            className="h-11 shrink-0 text-[13px] font-semibold text-elec-yellow"
          >
            Add
          </button>
        )}
      </div>

      <div className="mt-5 grid grid-cols-3 divide-x divide-white/[0.12] border-t border-white/[0.12] pt-4">
        {[
          { label: 'This week', value: fmtH(weekHours), onClick: onWeek },
          { label: 'Approved', value: fmtH(summary?.verified_hours), onClick: onApproved },
          { label: 'Waiting sign-off', value: fmtH(waitingHours), onClick: onWaiting },
        ].map((s) => (
          <button
            key={s.label}
            type="button"
            onClick={s.onClick}
            className="min-h-11 px-2 text-left touch-manipulation first:pl-0 sm:px-4"
          >
            <span className="block text-[20px] font-semibold tabular-nums text-white">
              {s.value}
            </span>
            <span className="mt-0.5 block text-[12px] text-white">{s.label}</span>
          </button>
        ))}
      </div>
    </section>
  );
}

/* ── Learning in the app ──────────────────────────────────────────────── */

const AREA_ROUTE: Record<string, string> = {
  'Study Centre': '/study-centre',
  'Mock exams': '/study-centre/mock-exams',
  Flashcards: '/study-centre/flashcards',
  'AM2 simulator': '/apprentice/am2-simulator',
  'EPA practice': '/apprentice/epa-simulator',
  Videos: '/apprentice/learning-videos',
  Revision: '/apprentice/revision',
};

export interface LeftOutItem {
  date: string;
  minutes: number;
  reason: string | null;
}

export function AppLearningCard({
  data,
  leftOut = [],
}: {
  data: AppLearningBreakdown | null;
  /** App learning a tutor left out, with their reason (newest first). */
  leftOut?: LeftOutItem[];
}) {
  const navigate = useNavigate();

  // The last seven days, zero-filled, oldest first.
  const week = useMemo(() => {
    const byDay = new Map((data?.days ?? []).map((d) => [d.day, d.minutes]));
    const out: Array<{ key: string; label: string; minutes: number; today: boolean }> = [];
    for (let i = 6; i >= 0; i -= 1) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const key = d.toLocaleDateString('en-CA', { timeZone: 'Europe/London' });
      out.push({
        key,
        label: d.toLocaleDateString('en-GB', { weekday: 'narrow' }),
        minutes: byDay.get(key) ?? 0,
        today: i === 0,
      });
    }
    return out;
  }, [data]);

  const weekMinutes = week.reduce((n, d) => n + d.minutes, 0);
  const maxDay = Math.max(30, ...week.map((d) => d.minutes));
  const areas = (data?.areas ?? []).filter((a) => a.minutes > 0);
  const maxArea = Math.max(1, ...areas.map((a) => a.minutes));
  const total = data?.total_minutes ?? 0;
  const approved = data?.approved_minutes ?? 0;
  const quizMinutes = data?.quiz_minutes ?? 0;
  const quizConfirmed = data?.quiz_confirmed_minutes ?? 0;

  return (
    <section className={cardCn} aria-label="Learning in the app">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-[17px] font-semibold tracking-tight text-white">
            Learning in the app
          </h2>
          <p className="mt-1 text-[13px] leading-snug text-white">
            Recorded as you learn. Tracked time counts towards your hours; quizzes and mocks count
            once you confirm them.
          </p>
        </div>
        <div className="shrink-0 text-right">
          <p className="text-[22px] font-semibold tabular-nums text-elec-yellow">
            {fmtMins(weekMinutes)}
          </p>
          <p className="text-[12px] text-white">last 7 days</p>
        </div>
      </div>

      {/* Seven-day chart */}
      <div
        className="mt-5 grid h-32 grid-cols-7 items-end gap-2"
        role="img"
        aria-label="Minutes learned each day this week"
      >
        {week.map((d) => {
          const h = d.minutes > 0 ? Math.max(6, (d.minutes / maxDay) * 100) : 3;
          return (
            <div key={d.key} className="flex h-full flex-col items-center justify-end gap-1.5">
              <span className="text-[12.5px] font-semibold tabular-nums text-white">
                {d.minutes > 0 ? fmtMins(d.minutes) : ''}
              </span>
              <div
                className={cn(
                  'w-full max-w-[34px] rounded-md',
                  d.minutes > 0 ? 'bg-elec-yellow' : 'bg-white/[0.12]',
                  d.today && d.minutes > 0 && 'ring-2 ring-white/70'
                )}
                style={{ height: `${h}%` }}
              />
              <span
                className={cn('text-[12px]', d.today ? 'font-bold text-elec-yellow' : 'text-white')}
              >
                {d.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Where the time went */}
      <div className="mt-6 border-t border-white/[0.12] pt-5">
        <div className="mb-3 flex items-baseline justify-between">
          <h3 className="text-[14px] font-semibold text-white">Last 30 days by area</h3>
          <span className="text-[13px] font-semibold tabular-nums text-white">
            {fmtMins(total)}
          </span>
        </div>
        {areas.length === 0 ? (
          <p className="text-[14px] leading-relaxed text-white">
            Study a course, sit a mock, run through flashcards or practise on the AM2 simulator.
            Your time appears here and counts towards your hours.
          </p>
        ) : (
          <ul className="space-y-1">
            {areas.map((a) => {
              const to = AREA_ROUTE[a.area];
              const row = (
                <>
                  <span className="w-28 shrink-0 truncate text-[13px] text-white sm:w-36">
                    {a.area}
                  </span>
                  <span className="h-2.5 flex-1 overflow-hidden rounded-full bg-white/[0.08]">
                    <span
                      className="block h-full rounded-full bg-elec-yellow"
                      style={{ width: `${Math.max(3, (a.minutes / maxArea) * 100)}%` }}
                    />
                  </span>
                  <span className="w-14 shrink-0 text-right text-[13px] font-semibold tabular-nums text-white">
                    {fmtMins(a.minutes)}
                  </span>
                  {to ? (
                    <ChevronRight className="h-4 w-4 shrink-0 text-white" aria-hidden="true" />
                  ) : (
                    <span className="w-4" />
                  )}
                </>
              );
              return (
                <li key={a.area}>
                  {to ? (
                    <button
                      type="button"
                      onClick={() => navigate(to)}
                      className="flex min-h-11 w-full items-center gap-3 rounded-lg text-left touch-manipulation active:bg-white/[0.06]"
                    >
                      {row}
                    </button>
                  ) : (
                    <div className="flex min-h-11 items-center gap-3">{row}</div>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </div>

      {quizMinutes > 0 && (
        <div className="mt-4 rounded-xl border border-white/[0.12] px-3.5 py-3">
          <p className="text-[13px] font-semibold text-white">
            Quizzes and mocks: {fmtMins(quizMinutes)}
          </p>
          <p className="mt-1 text-[13px] leading-snug text-white">
            Timed from start to finish, up to an hour each, without counting any minute twice.
            {quizConfirmed >= quizMinutes
              ? ' You have confirmed this time onto your hours.'
              : ' This time goes on your hours when you confirm it in Hours to confirm.'}
          </p>
          {quizConfirmed < quizMinutes && (
            <button
              type="button"
              onClick={() =>
                document.getElementById('confirm')?.scrollIntoView({ behavior: 'smooth' })
              }
              className="mt-2 inline-flex h-11 items-center gap-1 text-[13px] font-semibold text-elec-yellow touch-manipulation"
            >
              Go to Hours to confirm
              <ChevronRight className="h-4 w-4" aria-hidden="true" />
            </button>
          )}
        </div>
      )}

      {leftOut.length > 0 && (
        <div className="mt-4 rounded-xl border border-white/[0.12] px-3.5 py-3">
          <p className="text-[13px] font-semibold text-white">Left out by your tutor</p>
          <ul className="mt-2 space-y-2">
            {leftOut.slice(0, 3).map((l) => (
              <li key={`${l.date}-${l.minutes}`} className="text-[13px] leading-snug text-white">
                <span className="font-semibold">
                  {new Date(`${l.date}T12:00:00`).toLocaleDateString('en-GB', {
                    weekday: 'short',
                    day: 'numeric',
                    month: 'short',
                  })}{' '}
                  · {fmtMins(l.minutes)}
                </span>
                {l.reason ? ` · ${l.reason.replace(/^Left out by [^:]+:\s*/, '')}` : ''}
              </li>
            ))}
          </ul>
          <p className="mt-2 text-[12px] text-white">
            This time does not count. Ask your tutor if you think it should.
          </p>
        </div>
      )}

      {total > 0 && (
        <p className="mt-4 rounded-xl border border-white/[0.12] px-3.5 py-3 text-[14px] leading-relaxed text-white">
          {approved >= total
            ? 'Your tutor has approved all of it.'
            : approved > 0
              ? `Your tutor has approved ${fmtMins(approved)} of this. The rest counts while it waits for them.`
              : 'Your tutor approves this from their hours page. It counts while it waits.'}
        </p>
      )}
    </section>
  );
}

/* ── The requirements, in plain English ───────────────────────────────── */

export function OjtRequirementsCard() {
  return (
    <section className={cardCn} aria-label="What counts as off-the-job training">
      <h2 className="text-[17px] font-semibold tracking-tight text-white">What counts</h2>
      <p className="mt-1 text-[13px] leading-snug text-white">
        Off-the-job training is learning for your apprenticeship, away from doing your normal job.
      </p>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {OTJ_RULES.map((r) => (
          <div key={r.title} className="rounded-xl border border-white/[0.12] p-3.5">
            <h3 className="text-[14px] font-semibold text-white">{r.title}</h3>
            <p className="mt-1 text-[14px] leading-relaxed text-white">{r.body}</p>
          </div>
        ))}
      </div>

      <div className="mt-5 grid gap-5 border-t border-white/[0.12] pt-5 sm:grid-cols-2">
        <div>
          <p className="text-[12px] font-semibold text-elec-yellow">Counts</p>
          <ul className="mt-2 space-y-2">
            {OTJ_COUNTS.map((t) => (
              <li key={t} className="flex gap-2.5 text-[13px] leading-snug text-white">
                <span
                  className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-elec-yellow"
                  aria-hidden="true"
                />
                {t}
              </li>
            ))}
            <li className="flex gap-2.5 text-[13px] leading-snug text-white">
              <span
                className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-elec-yellow"
                aria-hidden="true"
              />
              Learning in Elec-Mate: courses, mocks, flashcards, the AM2 and EPA simulators
            </li>
          </ul>
        </div>
        <div>
          <p className="text-[12px] font-semibold text-white">Does not count</p>
          <ul className="mt-2 space-y-2">
            {OTJ_DOES_NOT_COUNT.map((t) => (
              <li key={t} className="flex gap-2.5 text-[13px] leading-snug text-white">
                <span
                  className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-white/50"
                  aria-hidden="true"
                />
                {t}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <p className="mt-5 text-[14px] leading-relaxed text-white">Source: {OTJ_RULES_SOURCE}.</p>
    </section>
  );
}
