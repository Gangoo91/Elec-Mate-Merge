import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import { cn } from '@/lib/utils';

/* ==========================================================================
   Quality, IQA, safeguarding and compliance: small chart pieces shared by
   the Quality & Compliance screens (7 Oct 2026 College Hub redesign). They
   sit inside the kit's COLLEGE_CARD / VIS_CARD surfaces and read figures the
   screen already holds, so the picture and the list can never disagree.
   ========================================================================== */

/** Tones used across the quality screens. Orange = behind, green = done. */
export type Tone = 'good' | 'warn' | 'bad' | 'info' | 'neutral' | 'volt';

export const TONE_BG: Record<Tone, string> = {
  good: 'bg-emerald-500',
  warn: 'bg-orange-400',
  bad: 'bg-red-500',
  info: 'bg-sky-400',
  neutral: 'bg-white/70',
  volt: 'bg-elec-yellow',
};

export const TONE_HEX: Record<Tone, string> = {
  good: 'hsl(142 69% 48%)',
  warn: 'hsl(27 96% 61%)',
  bad: 'hsl(0 84% 60%)',
  info: 'hsl(199 89% 60%)',
  neutral: 'rgba(255,255,255,0.7)',
  volt: 'hsl(47 100% 50%)',
};

const PILL: Record<Tone, string> = {
  good: 'border-emerald-400/40 bg-emerald-500/15 text-white',
  warn: 'border-orange-400/50 bg-orange-500/15 text-white',
  bad: 'border-red-400/50 bg-red-500/15 text-white',
  info: 'border-sky-400/40 bg-sky-500/15 text-white',
  neutral: 'border-white/[0.14] bg-white/[0.06] text-white',
  volt: 'border-elec-yellow/50 bg-elec-yellow/15 text-white',
};

/** A small status pill. Text stays white; the tone is in the border and dot. */
export function StatusPill({ tone = 'neutral', children, className }: { tone?: Tone; children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex h-6 shrink-0 items-center gap-1.5 rounded-full border px-2.5 text-[11.5px] font-semibold',
        PILL[tone],
        className
      )}
    >
      <span className={cn('h-1.5 w-1.5 rounded-full', TONE_BG[tone])} aria-hidden />
      {children}
    </span>
  );
}

/** Dashed placeholder where a chart would sit but there is nothing to draw yet. */
export function ChartEmpty({ text, className }: { text: string; className?: string }) {
  return (
    <div
      className={cn(
        'flex h-36 items-center justify-center rounded-2xl border border-dashed border-white/[0.12] px-4 text-center text-[12.5px] text-white',
        className
      )}
    >
      {text}
    </div>
  );
}

export interface BarRow {
  /** React key when labels can repeat (two staff with the same name). */
  id?: string;
  label: string;
  n: number;
  tone?: Tone;
  sub?: string;
  onClick?: () => void;
}

/** Horizontal bars: one per category, scaled to the biggest. */
export function BarList({
  rows,
  max: maxIn,
  suffix = '',
  wideLabels,
}: {
  rows: BarRow[];
  max?: number;
  suffix?: string;
  /** Longer labels (sentences): give the label column more room. */
  wideLabels?: boolean;
}) {
  const max = Math.max(1, maxIn ?? Math.max(0, ...rows.map((r) => r.n)));
  return (
    <ul className="space-y-3">
      {rows.map((r) => {
        const inner = (
          <>
            <span className="min-w-0">
              <span className="block truncate text-[12.5px] text-white">{r.label}</span>
              {r.sub && <span className="block truncate text-[11.5px] text-white">{r.sub}</span>}
            </span>
            <span className="h-2.5 overflow-hidden rounded-full bg-white/[0.08]">
              <motion.span
                className={cn('block h-full rounded-full', TONE_BG[r.tone ?? 'volt'])}
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(100, (r.n / max) * 100)}%` }}
                transition={{ duration: 0.7, ease: 'easeOut' }}
              />
            </span>
            <span className="text-right text-[13px] font-semibold tabular-nums text-white">
              {r.n}
              {suffix}
            </span>
          </>
        );
        const cls = cn(
          'grid w-full items-center gap-3 text-left',
          wideLabels
            ? 'grid-cols-[minmax(0,11rem)_1fr_2.25rem] sm:grid-cols-[minmax(0,16rem)_1fr_2.75rem]'
            : 'grid-cols-[minmax(0,8.5rem)_1fr_2.75rem]'
        );
        return (
          <li key={r.id ?? r.label}>
            {r.onClick ? (
              <button type="button" onClick={r.onClick} className={cn(cls, 'min-h-11 touch-manipulation rounded-lg hover:bg-white/[0.04]')}>
                {inner}
              </button>
            ) : (
              <div className={cls}>{inner}</div>
            )}
          </li>
        );
      })}
    </ul>
  );
}

export interface Segment {
  label: string;
  n: number;
  tone: Tone;
  onClick?: () => void;
}

/** One stacked bar that splits a whole into states, with a tappable key. */
export function SegmentBar({ segments, emptyText = 'Nothing to show yet' }: { segments: Segment[]; emptyText?: string }) {
  const total = segments.reduce((s, x) => s + x.n, 0);
  if (total === 0) return <ChartEmpty text={emptyText} className="h-20" />;
  return (
    <div>
      <div className="flex h-3.5 w-full overflow-hidden rounded-full bg-white/[0.08]">
        {segments
          .filter((s) => s.n > 0)
          .map((s) => (
            <motion.span
              key={s.label}
              className={cn('h-full', TONE_BG[s.tone])}
              initial={{ width: 0 }}
              animate={{ width: `${(s.n / total) * 100}%` }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              title={`${s.label}: ${s.n}`}
            />
          ))}
      </div>
      <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1">
        {segments.map((s) => {
          const body = (
            <>
              <span className={cn('h-2.5 w-2.5 rounded-full', TONE_BG[s.tone])} aria-hidden />
              <span className="text-[12.5px] text-white">{s.label}</span>
              <span className="text-[12.5px] font-semibold tabular-nums text-white">{s.n}</span>
            </>
          );
          return (
            <li key={s.label}>
              {s.onClick ? (
                <button type="button" onClick={s.onClick} className="inline-flex min-h-11 items-center gap-1.5 touch-manipulation">
                  {body}
                </button>
              ) : (
                <span className="inline-flex min-h-11 items-center gap-1.5">{body}</span>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/** A donut with the total in the middle and a key beside it. */
export function Donut({
  segments,
  centre,
  centreSub,
  emptyText = 'Nothing to show yet',
}: {
  segments: Segment[];
  centre?: string;
  centreSub?: string;
  emptyText?: string;
}) {
  const total = segments.reduce((s, x) => s + x.n, 0);
  if (total === 0) return <ChartEmpty text={emptyText} />;
  const data = segments.filter((s) => s.n > 0);
  return (
    <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-center">
      <div className="relative h-[140px] w-[140px] shrink-0">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={data} dataKey="n" nameKey="label" innerRadius={46} outerRadius={66} paddingAngle={data.length > 1 ? 2 : 0} stroke="none" isAnimationActive>
              {data.map((s) => (
                <Cell key={s.label} fill={TONE_HEX[s.tone]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{ backgroundColor: 'hsl(0 0% 8%)', border: '1px solid rgba(255,255,255,0.14)', borderRadius: '0.75rem', fontSize: 12 }}
              labelStyle={{ color: 'white' }}
              itemStyle={{ color: 'white' }}
            />
          </PieChart>
        </ResponsiveContainer>
        <span className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-[22px] font-bold leading-none tabular-nums text-white">{centre ?? total}</span>
          {centreSub && <span className="mt-1 text-[11px] text-white">{centreSub}</span>}
        </span>
      </div>
      <ul className="w-full min-w-0 space-y-1">
        {segments.map((s) => {
          const body = (
            <>
              <span className={cn('h-2.5 w-2.5 shrink-0 rounded-full', TONE_BG[s.tone])} aria-hidden />
              <span className="min-w-0 flex-1 truncate text-[12.5px] text-white">{s.label}</span>
              <span className="text-[13px] font-semibold tabular-nums text-white">{s.n}</span>
            </>
          );
          return (
            <li key={s.label}>
              {s.onClick ? (
                <button type="button" onClick={s.onClick} className="flex min-h-11 w-full items-center gap-2 rounded-lg px-1 text-left touch-manipulation hover:bg-white/[0.04]">
                  {body}
                </button>
              ) : (
                <span className="flex min-h-11 items-center gap-2 px-1">{body}</span>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/** Download rows as a CSV that opens cleanly in Excel. */
export function downloadCsv(filename: string, header: string[], rows: unknown[][]) {
  const q = (v: unknown) => {
    const t = v == null ? '' : String(v);
    return /[",\n]/.test(t) ? `"${t.replace(/"/g, '""')}"` : t;
  };
  const lines = [header.map(q).join(','), ...rows.map((r) => r.map(q).join(','))];
  const blob = new Blob(['﻿', lines.join('\n')], { type: 'text/csv;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
