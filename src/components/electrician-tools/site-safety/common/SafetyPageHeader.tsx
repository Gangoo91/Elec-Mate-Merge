/**
 * SafetyPageHeader + SafetyStatStrip — the landing chrome for Site Safety.
 *
 * The safety modules were rendering `PageHero` and `StatStrip` from
 * `@/components/college/primitives`, and both carry the superseded "deck" style
 * the design system says to kill on sight:
 *
 *   - a gradient hairline across the top of the hero (primitives:202)
 *   - an uppercase, letterspaced gold eyebrow above the title (primitives:209)
 *   - stat labels numbered `01 · ACTIVE`, `02 · EXPIRING` … (primitives:348)
 *   - stats boxed into a bordered 4-up panel with per-tone gradient washes
 *
 * On a phone that costs most of the first screen before a single permit is
 * visible, and the numbering is pure decoration — nobody refers to "stat 03".
 *
 * These are deliberately NOT changes to the college primitives. That module is
 * imported by roughly a thousand files across the Study Centre, College Hub,
 * apprentice courses and settings; restyling it there would change the whole
 * app. These are site-safety-local and drop-in: same props, so a page swaps its
 * import and nothing else.
 */

import { type ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { useHaptic } from '@/hooks/useHaptic';

interface SafetyPageHeaderProps {
  /** Accepted for drop-in parity with PageHero and deliberately NOT rendered —
   *  an uppercase kicker restating the page title is the thing being removed. */
  eyebrow?: string;
  title: ReactNode;
  description?: string;
  actions?: ReactNode;
}

export function SafetyPageHeader({ title, description, actions }: SafetyPageHeaderProps) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div className="min-w-0 flex-1">
        <h1 className="text-[22px] font-bold leading-tight tracking-tight text-white sm:text-[26px]">
          {title}
        </h1>
        {description && (
          <p className="mt-1.5 max-w-[62ch] text-[13px] leading-relaxed text-white">
            {description}
          </p>
        )}
      </div>
      {actions && <div className="shrink-0">{actions}</div>}
    </div>
  );
}

export interface SafetyStat {
  value: number | string;
  label: string;
  sub?: string;
  onClick?: () => void;
  /** Highlights the figure in volt — use for the one number that matters. */
  accent?: boolean;
}

interface SafetyStatStripProps {
  stats: SafetyStat[];
  className?: string;
}

/**
 * Stats as figures, not as a panel.
 *
 * The value leads at a size you can read across a van cab, the label sits under
 * it in full white, and a rule separates the row from the list below. No boxes,
 * no numbering, no colour washes. `tabular-nums` keeps the figures from
 * jittering as counts change.
 */
export function SafetyStatStrip({ stats, className }: SafetyStatStripProps) {
  const haptic = useHaptic();

  return (
    // A grid, not a flex wrap. Only some stats carry a `sub` line, and in a
    // flex row that left the labels sitting at different heights and the whole
    // group bunched into the left third of a wide screen. Equal columns keep
    // the figures on one baseline and spread them across the width.
    <div
      className={cn(
        // Capped rather than stretched. Spread across a 2200px window the four
        // figures sat ~1400px apart and stopped reading as one group — you
        // scanned them as four unrelated numbers.
        'grid max-w-3xl grid-cols-2 gap-x-6 gap-y-5 border-b border-white/[0.1] pb-5 sm:grid-cols-4',
        className
      )}
      onPointerDown={(e) => {
        if ((e.target as HTMLElement).closest('button')) haptic.light();
      }}
    >
      {stats.map((stat) => {
        const body = (
          <>
            <span
              className={cn(
                'block text-[26px] font-bold leading-none tabular-nums tracking-tight',
                stat.accent ? 'text-elec-yellow' : 'text-white'
              )}
            >
              {stat.value}
            </span>
            <span className="mt-2 block text-[13px] text-white">{stat.label}</span>
            {/* Always rendered so a stat WITH a sub-line and one without still
                share a baseline across the row. */}
            <span className="mt-0.5 block min-h-[15px] text-[11px] text-white">
              {stat.sub ?? '\u00A0'}
            </span>
          </>
        );

        // Tappable stats are real buttons — they filter the list beneath. The
        // underline marks them as actionable without adding a control.
        return stat.onClick ? (
          <button
            key={stat.label}
            type="button"
            onClick={stat.onClick}
            className="touch-manipulation text-left underline-offset-4 transition-opacity hover:underline active:opacity-70"
          >
            {body}
          </button>
        ) : (
          <div key={stat.label} className="text-left">
            {body}
          </div>
        );
      })}
    </div>
  );
}
