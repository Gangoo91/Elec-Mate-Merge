/**
 * Small shared pieces for the mock exam history screens (ELE-1815).
 * Colour is solid only — a pass is green, below the pass mark is orange — never
 * a translucent fill (those go muddy brown on this ground).
 */
import { cn } from '@/lib/utils';

/** The landing-page surface, same as the College Hub kit (ELE-2024). */
export const MH_CARD = 'card-landing rounded-2xl';

export function fmtWhen(iso: string): string {
  const d = new Date(iso);
  const today = new Date();
  const start = (x: Date) => new Date(x.getFullYear(), x.getMonth(), x.getDate()).getTime();
  const days = Math.round((start(today) - start(d)) / 86400000);
  if (days <= 0) return 'Today';
  if (days === 1) return 'Yesterday';
  if (days < 7) return d.toLocaleDateString('en-GB', { weekday: 'long' });
  return d.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: d.getFullYear() === today.getFullYear() ? undefined : 'numeric',
  });
}

export function fmtDuration(sec: number): string {
  const m = Math.round(sec / 60);
  if (m < 60) return `${m} min`;
  return `${Math.floor(m / 60)}h ${m % 60}m`;
}

/** The score, coloured by the result: green pass, orange below the mark. */
export function ScoreBadge({
  pct,
  passed,
  size = 'md',
}: {
  pct: number;
  passed: boolean;
  size?: 'sm' | 'md' | 'lg';
}) {
  return (
    <span
      className={cn(
        'inline-flex shrink-0 items-center justify-center rounded-xl font-bold tabular-nums text-black',
        passed ? 'bg-emerald-400' : 'bg-orange-400',
        size === 'sm' && 'h-9 min-w-[3.25rem] px-2 text-[14px]',
        size === 'md' && 'h-11 min-w-[4rem] px-2.5 text-[17px]',
        size === 'lg' && 'h-16 min-w-[6rem] px-3 text-[28px]'
      )}
    >
      {pct}%
    </span>
  );
}

/** Change against the attempt before, as words a learner reads at a glance. */
export function Delta({ now, before }: { now: number; before: number | null | undefined }) {
  if (before === null || before === undefined) return null;
  const d = now - before;
  if (d === 0)
    return <span className="text-[12px] font-semibold text-white">Same as last time</span>;
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 text-[12px] font-semibold',
        d > 0 ? 'text-emerald-400' : 'text-orange-400'
      )}
    >
      {d > 0 ? '▲' : '▼'} {Math.abs(d)} on last time
    </span>
  );
}

/**
 * The hero trend: scores oldest → newest across the full card width, the pass
 * mark as a labelled dashed line, every sitting a dot (green pass, orange not).
 * Scales to its container; height is fixed so it reads the same on a phone.
 */
export function TrendChart({
  values,
  passMark = 60,
  className,
}: {
  values: number[];
  passMark?: number;
  className?: string;
}) {
  if (values.length < 2) return null;
  const w = 320;
  const h = 96;
  const padY = 10;
  const x = (i: number) => (i / (values.length - 1)) * (w - 16) + 8;
  const y = (v: number) => h - padY - (Math.max(0, Math.min(100, v)) / 100) * (h - padY * 2);
  const line = values
    .map((v, i) => `${i ? 'L' : 'M'}${x(i).toFixed(1)},${y(v).toFixed(1)}`)
    .join(' ');
  const area = `${line} L${x(values.length - 1).toFixed(1)},${h} L${x(0).toFixed(1)},${h} Z`;
  return (
    <div
      className={cn('relative h-24 w-full', className)}
      role="img"
      aria-label={`Your last ${values.length} scores, oldest first: ${values.join('%, ')}%. Pass mark ${passMark}%.`}
    >
      <svg
        viewBox={`0 0 ${w} ${h}`}
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full overflow-visible"
        aria-hidden
      >
        <defs>
          <linearGradient id="mh-trend-fill" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#FFD000" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#FFD000" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={area} fill="url(#mh-trend-fill)" />
        <line
          x1="0"
          x2={w}
          y1={y(passMark)}
          y2={y(passMark)}
          stroke="white"
          strokeOpacity="0.35"
          strokeDasharray="4 4"
          vectorEffect="non-scaling-stroke"
        />
        <path
          d={line}
          fill="none"
          stroke="#FFD000"
          strokeWidth="2.5"
          strokeLinejoin="round"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      <span
        aria-hidden
        className="absolute right-0 -translate-y-full pb-0.5 text-[12px] font-semibold text-white"
        style={{ top: `${(y(passMark) / h) * 100}%` }}
      >
        Pass {passMark}%
      </span>
      {values.map((v, i) => (
        <span
          key={i}
          aria-hidden
          className={cn(
            'absolute -translate-x-1/2 -translate-y-1/2 rounded-full ring-2 ring-[#151515]',
            i === values.length - 1 ? 'h-3 w-3' : 'h-2 w-2',
            v >= passMark ? 'bg-emerald-400' : 'bg-orange-400'
          )}
          style={{ left: `${(x(i) / w) * 100}%`, top: `${(y(v) / h) * 100}%` }}
        />
      ))}
    </div>
  );
}

/** Scores oldest → newest as a small line, with the pass mark dashed. */
export function Sparkline({
  values,
  passMark = 60,
  className,
}: {
  values: number[];
  passMark?: number;
  className?: string;
}) {
  if (values.length < 2) return null;
  const w = 120;
  const h = 36;
  const x = (i: number) => (i / (values.length - 1)) * (w - 6) + 3;
  const y = (v: number) => h - 3 - (Math.max(0, Math.min(100, v)) / 100) * (h - 6);
  const d = values.map((v, i) => `${i ? 'L' : 'M'}${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(' ');
  const last = values[values.length - 1];
  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      className={cn('h-9 w-[120px]', className)}
      role="img"
      aria-label={`Scores over your last ${values.length} attempts, latest ${last}%`}
    >
      <line
        x1="0"
        x2={w}
        y1={y(passMark)}
        y2={y(passMark)}
        stroke="white"
        strokeOpacity="0.25"
        strokeDasharray="3 3"
      />
      <path d={d} fill="none" stroke="#FFD000" strokeWidth="2" strokeLinejoin="round" />
      <circle
        cx={x(values.length - 1)}
        cy={y(last)}
        r="3"
        fill={last >= passMark ? '#34d399' : '#fb923c'}
      />
    </svg>
  );
}
