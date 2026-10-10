import type { ReactNode } from 'react';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { initialsOf } from '@/components/college/assessment/AssessmentKit';

/* ==========================================================================
   CLearnerRow — one learner on a progress, plan or hours list. The inbox row
   shape (initials, name, chips, one line of context) with a figure and a
   thin bar on the right, so a long list reads at a glance. `menu` sits
   outside the tap target (a "…" for quick actions).
   ========================================================================== */

export function CLearnerRow({
  name,
  chips,
  mine,
  sub,
  figure,
  figureSub,
  pct,
  tone = 'plain',
  onOpen,
  menu,
}: {
  name: string;
  chips?: Array<{ label: string; warn?: boolean }>;
  mine?: boolean;
  sub?: ReactNode;
  figure?: string;
  figureSub?: string;
  /** 0–100 for the bar under the figure; omit for no bar. */
  pct?: number | null;
  /** warn = orange (behind / at risk), good = green (done / on track). */
  tone?: 'plain' | 'warn' | 'good';
  onOpen: () => void;
  menu?: ReactNode;
}) {
  const barCls =
    tone === 'warn' ? 'bg-orange-400' : tone === 'good' ? 'bg-emerald-400' : 'bg-white';
  return (
    <li className="flex items-stretch">
      <button
        type="button"
        onClick={onOpen}
        className="flex min-h-[64px] min-w-0 flex-1 items-center gap-3 px-4 py-3 text-left transition-colors touch-manipulation hover:bg-white/[0.04] active:bg-white/[0.07] sm:gap-4 sm:px-5"
      >
        {/* Neutral initials (orange text and the figure say who is behind);
            the name has its own line, chips sit under it (10 Oct 2026). */}
        <span
          aria-hidden="true"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/[0.1] text-[13px] font-bold text-white"
        >
          {initialsOf(name)}
        </span>
        <span className="min-w-0 flex-1">
          <span className="block break-words text-[15px] font-semibold leading-snug text-white">
            {name}
          </span>
          {(chips?.length || mine) && (
            <span className="mt-1 flex flex-wrap items-center gap-x-1.5 gap-y-1">
              {chips?.map((c) => (
                <span
                  key={c.label}
                  className={cn(
                    'shrink-0 rounded-full border px-2 py-px text-[12px] font-semibold',
                    c.warn
                      ? 'border-orange-400/60 text-orange-300'
                      : 'border-white/[0.16] text-white'
                  )}
                >
                  {c.label}
                </span>
              ))}
              {mine && (
                <span className="shrink-0 rounded-full border border-white/[0.4] px-2 py-px text-[12px] font-semibold text-white">
                  Yours
                </span>
              )}
            </span>
          )}
          {sub && (
            <span className="mt-1 line-clamp-2 block text-[12.5px] leading-snug text-white">
              {sub}
            </span>
          )}
        </span>
        {figure !== undefined && (
          <span className="flex w-[72px] shrink-0 flex-col items-end gap-1.5 sm:w-[96px]">
            <span
              className={cn(
                'text-[15px] font-bold tabular-nums',
                tone === 'warn'
                  ? 'text-orange-400'
                  : tone === 'good'
                    ? 'text-emerald-400'
                    : 'text-white'
              )}
            >
              {figure}
            </span>
            {pct !== undefined && pct !== null && (
              <span className="block h-1.5 w-full overflow-hidden rounded-full bg-white/[0.08]">
                <span
                  className={cn('block h-full rounded-full', barCls)}
                  style={{ width: `${Math.max(0, Math.min(100, pct))}%` }}
                />
              </span>
            )}
            {figureSub && <span className="text-[12px] text-white">{figureSub}</span>}
          </span>
        )}
        {!menu && <ChevronRight className="h-4 w-4 shrink-0 text-white" aria-hidden="true" />}
      </button>
      {menu}
    </li>
  );
}
