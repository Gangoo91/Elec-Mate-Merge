import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

/* ──────────────────────────────────────────────────────────────────────
   Renewable Energy course — reusable diagram primitives ("kit").
   Themed for the dark course aesthetic, mobile-first, white text.
   Most Tier-1 diagrams are instances of one of these primitives + data.
   ────────────────────────────────────────────────────────────────────── */

export function DiagramFigure({
  eyebrow = 'Diagram',
  caption,
  children,
  className,
}: {
  eyebrow?: string;
  caption?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <figure className={cn('rounded-2xl bg-white/[0.02] border border-white/[0.10] p-4 sm:p-5 space-y-3', className)}>
      <div className="text-[10.5px] font-medium uppercase tracking-[0.18em] text-white/70">{eyebrow}</div>
      <div className="w-full overflow-hidden rounded-xl bg-[hsl(0_0%_9%)] p-3 sm:p-4">{children}</div>
      {caption ? <figcaption className="text-[12px] text-white/85 leading-relaxed">{caption}</figcaption> : null}
    </figure>
  );
}

/* ── Decision cascade — a vertical "check → outcome" guide ─────────────
   Fits earthing-tree, DNO G98/G99/G100, RCD-type selection, etc.        */
type Tone = 'go' | 'stop' | 'warn' | 'info';
const toneCls: Record<Tone, string> = {
  go: 'bg-emerald-500/15 text-emerald-300 border border-emerald-400/30',
  stop: 'bg-red-500/15 text-red-300 border border-red-400/30',
  warn: 'bg-elec-yellow/15 text-elec-yellow border border-elec-yellow/30',
  info: 'bg-sky-500/15 text-sky-200 border border-sky-400/30',
};

export interface DecisionStep {
  q: string;
  branches: { cond: string; to: string; tone: Tone }[];
}

export function DecisionCascade({
  steps,
  caption,
  eyebrow = 'Decision guide',
}: {
  steps: DecisionStep[];
  caption?: ReactNode;
  eyebrow?: string;
}) {
  return (
    <DiagramFigure eyebrow={eyebrow} caption={caption}>
      <div className="space-y-1.5">
        {steps.map((s, i) => (
          <div key={i}>
            <div className="rounded-lg border border-white/[0.12] bg-white/[0.03] px-3 py-2.5">
              <div className="flex items-start gap-2">
                <span className="mt-[2px] flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-elec-yellow/15 text-[9px] font-bold text-elec-yellow tabular-nums">{i + 1}</span>
                <span className="text-[12.5px] font-medium text-white leading-snug">{s.q}</span>
              </div>
              <div className="mt-2 space-y-1.5 pl-6">
                {s.branches.map((b, j) => (
                  <div key={j} className="flex items-center gap-2 text-[11.5px]">
                    <span className="min-w-[58px] shrink-0 text-white/75">{b.cond}</span>
                    <span className="text-white/35">→</span>
                    <span className={cn('rounded-md px-2 py-0.5 font-medium leading-tight', toneCls[b.tone])}>{b.to}</span>
                  </div>
                ))}
              </div>
            </div>
            {i < steps.length - 1 && (
              <div className="py-1 pl-[9px] text-[9.5px] font-medium uppercase tracking-[0.14em] text-white/40">↓ otherwise</div>
            )}
          </div>
        ))}
      </div>
    </DiagramFigure>
  );
}

/* ── Comparison grid — N options × attributes, with optional note ─────── */
export interface CompareColumn {
  name: string;
  swatch?: ReactNode;
  rows: { label: string; value: string }[];
  footer?: string;
}

export function ComparisonGrid({
  columns,
  note,
  caption,
  eyebrow = 'Comparison',
}: {
  columns: CompareColumn[];
  note?: ReactNode;
  caption?: ReactNode;
  eyebrow?: string;
}) {
  const cols = columns.length;
  return (
    <DiagramFigure eyebrow={eyebrow} caption={caption}>
      <div className={cn('grid grid-cols-1 gap-3', cols === 2 ? 'sm:grid-cols-2' : cols === 4 ? 'sm:grid-cols-2 lg:grid-cols-4' : 'sm:grid-cols-3')}>
        {columns.map((c) => (
          <div key={c.name} className="rounded-xl border border-white/10 bg-white/[0.02] p-3 space-y-2">
            <div className="flex items-center gap-2.5">
              {c.swatch}
              <div className="text-[13px] font-semibold text-white leading-tight">{c.name}</div>
            </div>
            <dl className="text-[11.5px] text-white/90 space-y-1">
              {c.rows.map((r) => (
                <div key={r.label} className="flex justify-between gap-2">
                  <dt className="text-white/65">{r.label}</dt>
                  <dd className="font-medium text-right">{r.value}</dd>
                </div>
              ))}
              {c.footer ? <div className="pt-1 text-white/80">{c.footer}</div> : null}
            </dl>
          </div>
        ))}
      </div>
      {note ? (
        <div className="mt-3 rounded-xl border border-elec-yellow/25 bg-elec-yellow/[0.06] p-3 text-[11.5px] text-white/85 leading-relaxed">{note}</div>
      ) : null}
    </DiagramFigure>
  );
}

/* ── Tag map — items each mapped to a set of tags (e.g. tech → chapters) ─ */
export interface TagMapItem {
  label: string;
  sub?: string;
  tags: string[];
}

export function TagMap({
  items,
  note,
  caption,
  eyebrow = 'Map',
}: {
  items: TagMapItem[];
  note?: ReactNode;
  caption?: ReactNode;
  eyebrow?: string;
}) {
  return (
    <DiagramFigure eyebrow={eyebrow} caption={caption}>
      <div className="space-y-2">
        {items.map((it) => (
          <div key={it.label} className="flex flex-col gap-1.5 rounded-lg border border-white/[0.10] bg-white/[0.03] px-3 py-2 sm:flex-row sm:items-center sm:gap-3">
            <div className="sm:w-[38%] sm:shrink-0">
              <div className="text-[12.5px] font-semibold text-white leading-tight">{it.label}</div>
              {it.sub ? <div className="text-[10.5px] text-white/55">{it.sub}</div> : null}
            </div>
            <div className="flex flex-wrap gap-1.5">
              {it.tags.map((t) => (
                <span key={t} className="rounded-md border border-sky-400/25 bg-sky-500/10 px-2 py-0.5 text-[10.5px] font-medium text-sky-200">{t}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
      {note ? (
        <div className="mt-3 rounded-xl border border-elec-yellow/25 bg-elec-yellow/[0.06] p-3 text-[11.5px] text-white/85 leading-relaxed">{note}</div>
      ) : null}
    </DiagramFigure>
  );
}
