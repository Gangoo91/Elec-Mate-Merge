import { cn } from '@/lib/utils';

/* ==========================================================================
   Figures and age bands for the College Hub work queues (showcase pass,
   10 Oct 2026). Andrew's design language: figures as a status line (bold
   number, plain word, hairline between), and "how long has it waited" said
   once per group, not in orange on every row.
   ========================================================================== */

export interface Figure {
  n: string | number | null;
  label: string;
  tone?: 'warn' | 'good';
}

/**
 * One status line of figures. Spans only, so it can sit inside the page
 * header's description paragraph. Two columns on a phone, one line on wider
 * screens with a hairline between.
 */
export function FigureLine({ items, className }: { items: Figure[]; className?: string }) {
  const shown = items.filter((f) => f.label);
  return (
    <span
      className={cn(
        'grid grid-cols-2 gap-x-4 gap-y-2 text-[14px] text-white sm:flex sm:flex-wrap sm:items-center sm:gap-x-0 sm:gap-y-2',
        className
      )}
    >
      {shown.map((f, i) => (
        <span key={`${f.label}-${i}`} className="flex min-w-0 items-baseline gap-1.5">
          {i > 0 && (
            <span
              aria-hidden
              className="mx-4 hidden h-3.5 w-px self-center bg-white/[0.18] sm:inline-block"
            />
          )}
          {f.n !== null && (
            <b
              className={cn(
                'whitespace-nowrap text-[15.5px] font-semibold tabular-nums',
                f.tone === 'warn'
                  ? 'text-orange-300'
                  : f.tone === 'good'
                    ? 'text-emerald-300'
                    : 'text-white'
              )}
            >
              {f.n}
            </b>
          )}
          <span className={cn(f.tone === 'warn' && 'text-orange-300')}>{f.label}</span>
        </span>
      ))}
    </span>
  );
}

export type AgeBand = 'month' | 'week' | 'recent';

/** Over four weeks, over a week, or this week. Unknown ages count as recent. */
export const ageBand = (days: number | null | undefined): AgeBand =>
  days == null || days < 7 ? 'recent' : days >= 28 ? 'month' : 'week';

export const AGE_BAND_LABEL: Record<AgeBand, string> = {
  month: 'Waiting over 4 weeks',
  week: 'Waiting over a week',
  recent: 'This week',
};

export const AGE_BANDS: AgeBand[] = ['month', 'week', 'recent'];

/** Splits rows into age bands, oldest band first, keeping each band's order. */
export function bandRows<T>(rows: T[], days: (r: T) => number | null | undefined) {
  return AGE_BANDS.map((band) => ({
    band,
    rows: rows.filter((r) => ageBand(days(r)) === band),
  })).filter((g) => g.rows.length > 0);
}

/** "11 days", "Yesterday", "Today": the row's own age, in white. */
export const ageShort = (days: number | null | undefined) =>
  days == null ? null : days <= 0 ? 'today' : days === 1 ? 'yesterday' : `${days} days ago`;
