/**
 * Admin overview primitives.
 *
 * The overview is one accent and hairlines: yellow marks the revenue line and
 * links, green marks a delta that went the right way, everything else is
 * white on the page surface. No card borders, no coloured card edges, no
 * pills — sections separate with hairlines and rows are 56px on desktop and
 * 60px on a phone. All text is white; hierarchy comes from size and weight.
 *
 * Chart colours are literal because they are validated as a set against the
 * page surface (#1c1c1c), not theme tokens.
 */

import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

export const ACCENT = 'hsl(47 100% 50%)';
export const GOOD = '#0ca30c';
export const SERIOUS = '#ec835a';
export const DE_EMPHASIS = 'rgba(255,255,255,0.28)';
export const SURFACE = 'hsl(0 0% 11%)';
export const HAIRLINE = 'rgba(255,255,255,0.08)';
export const GRID = '#2c2c2a';
/** Ordinal greys, lightest first — for part-to-whole bars with no story. */
export const GREYS = [
  'rgba(255,255,255,0.78)',
  'rgba(255,255,255,0.58)',
  'rgba(255,255,255,0.42)',
  'rgba(255,255,255,0.30)',
  'rgba(255,255,255,0.20)',
  'rgba(255,255,255,0.13)',
] as const;

/*
  Categorical slots, validated as a set on the dark surface (dataviz palette,
  dark column). Assigned to entities in fixed order and never cycled:
  Stripe = blue, stores = aqua; plans in the order below.
*/
export const BLUE = '#3987e5';
export const ORANGE = '#d95926';
export const AQUA = '#199e70';
export const YELLOW = '#c98500';
export const MAGENTA = '#d55181';
export const VIOLET = '#9085e9';
/** Blue ordinal ramp (dark surface, no step darker than 600) for "how many where". */
export const BLUE_RAMP = ['#3987e5', '#2a78d6', '#256abf', '#1c5cab', '#184f95', '#184f95'] as const;

export const gbp = (v: number, dp = 0) =>
  '£' + v.toLocaleString('en-GB', { minimumFractionDigits: dp, maximumFractionDigits: dp });

/* ── charts that are not charts ────────────────────────── */

/** 12-to-31 point trend in the de-emphasis grey; the last step and end dot in the accent. */
export function Sparkline({
  series,
  width = 72,
  height = 28,
  accent = ACCENT,
  className,
}: {
  series: number[];
  width?: number;
  height?: number;
  accent?: string;
  className?: string;
}) {
  if (series.length < 2) return <span style={{ width, height }} className="shrink-0" />;
  const lo = Math.min(...series);
  const hi = Math.max(...series);
  const range = hi - lo || 1;
  const n = series.length;
  const pts = series.map((v, i) => [
    2 + (i * (width - 4)) / (n - 1),
    2 + (height - 4) * (1 - (v - lo) / range),
  ]);
  const d = pts.map(([x, y], i) => `${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`).join(' ');
  const [x1, y1] = pts[n - 2];
  const [x2, y2] = pts[n - 1];
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      aria-hidden
      className={cn('block shrink-0', className)}
    >
      <path
        d={d}
        fill="none"
        stroke={DE_EMPHASIS}
        strokeWidth={1.5}
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <path
        d={`M${x1.toFixed(1)},${y1.toFixed(1)} L${x2.toFixed(1)},${y2.toFixed(1)}`}
        fill="none"
        stroke={accent}
        strokeWidth={1.5}
        strokeLinecap="round"
      />
      <circle cx={x2} cy={y2} r={3.5} fill={accent} stroke={SURFACE} strokeWidth={2} />
    </svg>
  );
}

/** Three or four ordered months as thin columns; the latest in the accent. */
export function MonthBars({
  items,
  width = 72,
  height = 28,
}: {
  items: Array<{ label: string; value: number }>;
  width?: number;
  height?: number;
}) {
  if (items.length === 0) return <span style={{ width, height }} className="shrink-0" />;
  const n = items.length;
  const bw = Math.min(14, Math.floor((width - (n - 1) * 6) / n));
  const hi = Math.max(...items.map((i) => i.value), 1);
  let x = width - (bw * n + 6 * (n - 1));
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} aria-hidden className="block shrink-0">
      {items.map((it, i) => {
        const bh = Math.max(3, Math.round(((height - 2) * it.value) / hi));
        const rect = (
          <rect
            key={it.label}
            x={x}
            y={height - bh}
            width={bw}
            height={bh}
            rx={2}
            fill={i === n - 1 ? ACCENT : DE_EMPHASIS}
          >
            <title>{`${it.label}: ${it.value}%`}</title>
          </rect>
        );
        x += bw + 6;
        return rect;
      })}
    </svg>
  );
}

/** Part-to-whole: fills separated by a 2px gap in the surface colour, never a stroke. */
export function StackBar({
  segments,
  height = 8,
}: {
  segments: Array<{ value: number; color: string; label?: string }>;
  height?: number;
}) {
  const shown = segments.filter((s) => s.value > 0);
  if (shown.length === 0) return <div style={{ height }} className="rounded-full bg-white/[0.08]" />;
  return (
    <div className="flex overflow-hidden" style={{ height, gap: 2, borderRadius: height / 2 }}>
      {shown.map((s, i) => (
        <div key={i} style={{ flex: s.value, background: s.color }} title={s.label} />
      ))}
    </div>
  );
}

export function Legend({
  items,
  className,
}: {
  items: Array<{ label: string; value: string | number; color: string }>;
  className?: string;
}) {
  return (
    <div className={cn('mt-2 flex flex-wrap gap-x-4 gap-y-1.5', className)}>
      {items.map((it) => (
        <span key={it.label} className="inline-flex items-center gap-1.5 whitespace-nowrap text-[12px] text-white">
          <span className="h-2 w-2 shrink-0 rounded-[2px]" style={{ background: it.color }} />
          {it.label} <b className="font-semibold tabular-nums">{it.value}</b>
        </span>
      ))}
    </div>
  );
}

/* ── figures ───────────────────────────────────────────── */

export function Delta({
  dir,
  tone = 'neutral',
  size = 12,
  children,
}: {
  dir: 'up' | 'down' | 'flat';
  tone?: 'good' | 'bad' | 'neutral';
  size?: number;
  children: ReactNode;
}) {
  const color = tone === 'good' ? GOOD : tone === 'bad' ? SERIOUS : '#ffffff';
  return (
    <span
      className="inline-flex items-center gap-[3px] font-semibold"
      style={{ color, fontSize: size }}
    >
      {dir !== 'flat' && (
        <svg
          width={size - 1}
          height={size - 1}
          viewBox="0 0 24 24"
          fill="none"
          stroke={color}
          strokeWidth={1.75}
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          {dir === 'up' ? (
            <>
              <path d="M12 19V5" />
              <path d="M5 12l7-7 7 7" />
            </>
          ) : (
            <>
              <path d="M12 5v14" />
              <path d="M5 12l7 7 7-7" />
            </>
          )}
        </svg>
      )}
      {children}
    </span>
  );
}

/** Stat tile: label · value beside a small trend · delta · definition. */
export function KpiTile({
  label,
  value,
  delta,
  definition,
  viz,
  onClick,
  className,
}: {
  label: string;
  value: ReactNode;
  delta?: ReactNode;
  definition?: ReactNode;
  viz?: ReactNode;
  onClick?: () => void;
  className?: string;
}) {
  const Tag = onClick ? 'button' : 'div';
  return (
    <Tag
      onClick={onClick}
      className={cn(
        'flex min-w-0 flex-col gap-1.5 py-4 pr-4 text-left text-white lg:py-[18px] lg:pr-6',
        onClick && 'touch-manipulation transition-opacity hover:opacity-80 active:opacity-60',
        className
      )}
    >
      <div className="text-[12px] font-medium leading-4 lg:text-[13px]">{label}</div>
      <div className="flex items-end justify-between gap-2.5">
        <div className="text-[26px] font-semibold leading-[30px] tracking-[-0.02em] lg:text-[30px] lg:leading-[34px]">
          {value}
        </div>
        {viz}
      </div>
      <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[12px] leading-4">
        {delta}
        {definition && <span className="text-[11px] lg:text-[12px]">{definition}</span>}
      </div>
    </Tag>
  );
}

/** A large number with a label under it, for the "what people did today" strip. */
export function Fig({
  value,
  label,
  sub,
  onClick,
}: {
  value: ReactNode;
  label: string;
  sub?: string;
  onClick?: () => void;
}) {
  const Tag = onClick ? 'button' : 'div';
  return (
    <Tag
      onClick={onClick}
      className={cn(
        'flex min-w-0 flex-col gap-0.5 text-left text-white',
        onClick && 'touch-manipulation transition-opacity hover:opacity-80'
      )}
    >
      <div className="text-[22px] font-semibold leading-[26px] tracking-[-0.02em]">{value}</div>
      <div className="text-[12px] leading-4">
        {label}
        {sub && (
          <>
            <br />
            {sub}
          </>
        )}
      </div>
    </Tag>
  );
}

/* ── structure ─────────────────────────────────────────── */

/**
 * A panel: the app's lit card surface, one level deep, never nested.
 * Full-bleed on a phone, inset and rounded from `sm:` up. `tone` paints a
 * single top hairline in a meaning-bearing colour (the revenue panel only).
 */
export function Panel({
  children,
  className,
  tone,
  padded = true,
}: {
  children: ReactNode;
  className?: string;
  tone?: 'accent';
  padded?: boolean;
}) {
  return (
    <section
      className={cn(
        'relative -mx-4 overflow-hidden rounded-none border-y border-white/[0.14] sm:mx-0 sm:rounded-2xl sm:border-x',
        'bg-gradient-to-br from-white/[0.11] via-white/[0.065] to-white/[0.04]',
        'shadow-[inset_0_1px_0_0_rgba(255,255,255,0.13),0_2px_10px_-4px_rgba(0,0,0,0.7)]',
        padded && 'p-4 sm:p-5 lg:p-6',
        className
      )}
    >
      {tone === 'accent' && (
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-elec-yellow/70 via-elec-yellow/20 to-transparent" />
      )}
      {children}
    </section>
  );
}

export function Hairline({ className }: { className?: string }) {
  return <div className={cn('h-px w-full bg-white/[0.08]', className)} />;
}

export function SectionHead({
  title,
  meta,
  action,
  onAction,
  className,
}: {
  title: string;
  meta?: ReactNode;
  action?: string;
  onAction?: () => void;
  className?: string;
}) {
  return (
    <div className={cn('flex min-h-11 items-baseline justify-between gap-3', className)}>
      <div className="flex min-w-0 flex-wrap items-baseline gap-x-2.5 gap-y-0.5">
        <h2 className="m-0 text-[15px] font-semibold leading-5 text-white">{title}</h2>
        {meta && <span className="text-[12px] leading-4 text-white">{meta}</span>}
      </div>
      {action && onAction && (
        <button
          onClick={onAction}
          className="h-11 shrink-0 touch-manipulation whitespace-nowrap text-[13px] font-semibold text-elec-yellow transition-opacity hover:opacity-80"
        >
          {action}
        </button>
      )}
    </div>
  );
}

export function RoundAvatar({ initials, online }: { initials: string; online?: boolean }) {
  return (
    <div className="relative shrink-0">
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/[0.08] text-[11px] font-semibold text-white">
        {initials}
      </div>
      {online && (
        <span
          className="absolute -bottom-px -right-px h-2 w-2 rounded-full border-2"
          style={{ background: GOOD, borderColor: SURFACE }}
        />
      )}
    </div>
  );
}

/** One person, one line of context, and whatever the section needs on the right. */
export function PersonRow({
  initials,
  name,
  sub,
  cells,
  unread,
  online,
  onClick,
}: {
  initials: string;
  name: ReactNode;
  sub: ReactNode;
  cells?: ReactNode;
  unread?: boolean;
  online?: boolean;
  onClick?: () => void;
}) {
  const Tag = onClick ? 'button' : 'div';
  return (
    <Tag
      onClick={onClick}
      className={cn(
        'flex min-h-[60px] w-full items-center gap-3 border-t border-white/[0.08] text-left text-white lg:min-h-14',
        onClick && 'touch-manipulation transition-colors hover:bg-white/[0.03] active:bg-white/[0.06]'
      )}
    >
      <div className="relative">
        <RoundAvatar initials={initials} online={online} />
        {unread && (
          <span
            className="absolute -right-px -top-px h-1.5 w-1.5 rounded-full"
            style={{ background: ACCENT }}
          />
        )}
      </div>
      <div className="min-w-0 flex-1">
        <div
          className={cn(
            'truncate text-[14px] leading-[18px]',
            unread ? 'font-semibold' : 'font-medium'
          )}
        >
          {name}
        </div>
        <div className="mt-0.5 truncate text-[12px] leading-4">{sub}</div>
      </div>
      <div className="flex shrink-0 items-center gap-3.5">
        {cells}
        {onClick && <Chevron />}
      </div>
    </Tag>
  );
}

export function Chevron() {
  return (
    <svg
      width={16}
      height={16}
      viewBox="0 0 24 24"
      fill="none"
      stroke="#fff"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className="shrink-0"
    >
      <path d="M9 6l6 6-6 6" />
    </svg>
  );
}

export function StateDot({ label, color }: { label: string; color: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 whitespace-nowrap text-[12px] font-medium text-white">
      <span className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: color }} />
      {label}
    </span>
  );
}

export function Money({ children }: { children: ReactNode }) {
  return (
    <span className="whitespace-nowrap text-[13px] font-semibold tabular-nums text-white">
      {children}
    </span>
  );
}

/** Horizontal bar for a magnitude beside a row: quiet days, waiting time. */
export function QuietBar({ days, max = 200 }: { days: number | null; max?: number }) {
  const w = 72;
  const never = days === null;
  const bw = never ? w : Math.max(4, Math.round((w * Math.min(days, max)) / max));
  return (
    <div className="hidden items-center justify-end gap-2 sm:flex" style={{ width: w + 44 }}>
      <div className="h-1 rounded-full bg-white/[0.08]" style={{ width: w }}>
        <div
          className="h-1 rounded-full"
          style={{ width: bw, background: never ? ACCENT : GREYS[2] }}
        />
      </div>
      <span className="w-9 text-right text-[12px] tabular-nums text-white">
        {never ? 'never' : `${days}d`}
      </span>
    </div>
  );
}

/** Segmented control. Options may carry a count and an unread mark. */
export function Segmented<K extends string | number>({
  options,
  value,
  onChange,
  size = 'sm',
  className,
}: {
  options: Array<{ key: K; label: string; count?: number | string; mark?: boolean }>;
  value: K;
  onChange: (k: K) => void;
  size?: 'sm' | 'lg';
  className?: string;
}) {
  return (
    <div className={cn('flex rounded-[10px] bg-white/[0.06] p-[3px]', className)}>
      {options.map((o) => {
        const on = o.key === value;
        return (
          <button
            key={o.key}
            onClick={() => onChange(o.key)}
            aria-pressed={on}
            className={cn(
              'relative flex touch-manipulation flex-col items-center justify-center rounded-[8px] text-white transition-colors',
              size === 'lg' ? 'h-11 flex-1' : 'h-11 px-3 sm:h-8 sm:px-2.5',
              on && 'bg-white/[0.14]'
            )}
          >
            <span className="text-[13px] font-semibold leading-4">{o.label}</span>
            {size === 'lg' && o.count !== undefined && (
              <span className="text-[11px] leading-[13px] tabular-nums">{o.count}</span>
            )}
            {o.mark && (
              <span
                className="absolute right-2.5 top-2 h-1.5 w-1.5 rounded-full"
                style={{ background: ACCENT }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}

/** One item of the "Needs you today" queue. */
export function NeedsItem({
  title,
  detail,
  count,
  action,
  onClick,
  last,
  urgent,
}: {
  title: string;
  detail: string;
  count: number;
  action: string;
  onClick: () => void;
  last?: boolean;
  /** The count in the accent: this is a queue, and the number is the job. */
  urgent?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'group flex min-h-[60px] w-full touch-manipulation items-center gap-3 py-2.5 text-left text-white transition-colors hover:bg-white/[0.03] active:bg-white/[0.06]',
        'border-b border-white/[0.08] lg:min-h-0 lg:border-b-0 lg:py-4 lg:pr-6',
        !last && 'lg:border-r lg:border-white/[0.08]',
        last && 'border-b-0'
      )}
    >
      <div className="min-w-0 flex-1">
        <div className="text-[14px] font-medium leading-[18px]">{title}</div>
        <div className="mt-0.5 text-[12px] leading-4">{detail}</div>
        <div className="mt-1.5 hidden items-center gap-1 text-[13px] font-semibold text-elec-yellow lg:inline-flex">
          {action}
          <span className="transition-transform group-hover:translate-x-0.5">→</span>
        </div>
      </div>
      <div
        className={cn(
          'text-[24px] font-semibold leading-none tracking-[-0.02em] lg:text-[28px]',
          urgent && 'text-elec-yellow'
        )}
      >
        {count}
      </div>
      <span className="lg:hidden">
        <Chevron />
      </span>
    </button>
  );
}
