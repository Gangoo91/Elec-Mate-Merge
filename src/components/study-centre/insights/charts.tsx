/**
 * Study Centre charts — small, labelled, one meaning per colour.
 *
 * Built for the Study Centre front page (10 Oct 2026, Andrew: "make the charts
 * look professional"). Rules they follow:
 *   - every mark has a reason: a goal or pass line is drawn and labelled, not
 *     implied;
 *   - colour carries one meaning each: yellow = goal hit, green = at or above
 *     the pass mark, orange = below it / needs doing, neutral white = the rest;
 *   - bars and dots are HTML, lines are SVG with non-scaling strokes, so
 *     nothing stretches at any width;
 *   - each chart has a text alternative for screen readers.
 */
import { cn } from '@/lib/utils';
import type { DayXP } from '@/hooks/study-centre/useDailyXP';

/* ── XP per day, with the daily goal ─────────────────────────────────── */

export function DailyXpChart({
  days,
  goal,
  className,
}: {
  days: DayXP[];
  goal: number;
  className?: string;
}) {
  const top = Math.max(goal * 1.3, ...days.map((d) => d.xp), 1);
  const goalPct = (goal / top) * 100;
  const studied = days.filter((d) => d.xp > 0).length;
  const met = days.filter((d) => d.xp >= goal).length;

  return (
    <figure className={cn('min-w-0', className)}>
      <figcaption className="sr-only">
        XP per day for the last {days.length} days. Studied on {studied} of them, daily goal of{' '}
        {goal} XP met on {met}. {days.map((d) => `${d.long}: ${d.xp} XP`).join('; ')}.
      </figcaption>
      {/* The plot leaves a gutter on the right for the goal's label, so the
          label never sits on a bar. */}
      <div aria-hidden className="relative mr-11 h-[88px]">
        {/* Goal line, labelled in the gutter */}
        <div
          className="absolute inset-x-0 border-t border-dashed border-white/50"
          style={{ bottom: `${goalPct}%` }}
        >
          <span className="absolute left-full top-0 ml-2 -translate-y-1/2 whitespace-nowrap text-[12px] font-semibold tabular-nums text-white">
            {goal}
          </span>
        </div>
        <div className="absolute inset-0 flex items-end gap-[3px] sm:gap-1">
          {days.map((d) => (
            <div
              key={d.key}
              title={`${d.long}: ${d.xp} XP`}
              className="flex h-full flex-1 items-end"
            >
              <div
                className={cn(
                  'w-full rounded-t-[3px]',
                  d.xp >= goal ? 'bg-elec-yellow' : d.xp > 0 ? 'bg-white/[0.5]' : 'bg-white/[0.12]',
                  d.today && d.xp < goal && 'bg-white/[0.75]'
                )}
                style={{ height: d.xp > 0 ? `${Math.max((d.xp / top) * 100, 4)}%` : '3px' }}
              />
            </div>
          ))}
        </div>
      </div>
      <div
        aria-hidden
        className="mr-11 mt-1.5 flex gap-[3px] border-t border-white/[0.14] pt-1.5 sm:gap-1"
      >
        {days.map((d) => (
          <span
            key={d.key}
            className={cn(
              'flex-1 text-center text-[12px] tabular-nums',
              d.today ? 'font-bold text-elec-yellow' : 'font-medium text-white'
            )}
          >
            {d.label}
          </span>
        ))}
      </div>
      <div
        aria-hidden
        className="mt-2.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-[12px] font-medium text-white"
      >
        <span className="inline-flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-[2px] bg-elec-yellow" />
          Goal met
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-[2px] bg-white/[0.5]" />
          Studied
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="w-3 border-t border-dashed border-white" />
          Daily goal
        </span>
      </div>
    </figure>
  );
}

/* ── Mock scores over time, against the pass mark ────────────────────── */

/** Score (0–100) to a y position (%), leaving room for the dots. */
const yOf = (pct: number) => 92 - (Math.min(100, Math.max(0, pct)) / 100) * 84;

export function ScoreTrend({
  scores,
  pass,
  className,
}: {
  /** Oldest → newest. */
  scores: number[];
  pass: number;
  className?: string;
}) {
  const n = scores.length;
  const xOf = (i: number) => (n === 1 ? 50 : 4 + (i / (n - 1)) * 92);
  const pts = scores.map((s, i) => `${xOf(i)},${yOf(s)}`).join(' ');
  const area = `${xOf(0)},100 ${pts} ${xOf(n - 1)},100`;

  return (
    <div className={cn('relative h-[52px]', className)} aria-hidden>
      {/* Pass line */}
      <div
        className="absolute inset-x-0 border-t border-dashed border-white/50"
        style={{ top: `${yOf(pass)}%` }}
      />
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full"
      >
        <polygon points={area} className="fill-white/[0.06]" />
        <polyline
          points={pts}
          fill="none"
          className="stroke-white/80"
          strokeWidth={1.75}
          strokeLinejoin="round"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      {scores.map((s, i) => (
        <span
          key={i}
          className={cn(
            'absolute -translate-x-1/2 -translate-y-1/2 rounded-full ring-2 ring-[#1e1e1e]',
            i === n - 1 ? 'h-2.5 w-2.5' : 'h-[7px] w-[7px]',
            s >= pass ? 'bg-emerald-400' : 'bg-orange-400'
          )}
          style={{ left: `${xOf(i)}%`, top: `${yOf(s)}%` }}
        />
      ))}
    </div>
  );
}

/* ── A labelled bar list (what's due, and from where) ─────────────────── */

export function BarList({
  rows,
  className,
}: {
  rows: { label: string; value: number; tone?: 'warn' | 'neutral' }[];
  className?: string;
}) {
  const max = Math.max(1, ...rows.map((r) => r.value));
  return (
    <div className={cn('space-y-2', className)}>
      {rows.map((r) => (
        <div key={r.label}>
          <div className="flex items-baseline justify-between gap-2 text-[12px] font-medium text-white">
            <span className="truncate">{r.label}</span>
            <span className="font-semibold tabular-nums">{r.value}</span>
          </div>
          <div className="mt-1 h-1.5 rounded-full bg-white/[0.1]" aria-hidden>
            <div
              className={cn(
                'h-full rounded-full',
                r.value === 0 ? '' : r.tone === 'warn' ? 'bg-orange-400' : 'bg-white/[0.6]'
              )}
              style={{ width: `${(r.value / max) * 100}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
