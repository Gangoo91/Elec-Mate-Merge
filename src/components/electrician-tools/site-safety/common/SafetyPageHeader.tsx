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
import { HubKpi } from '@/components/hub/HubPrimitives';

interface SafetyPageHeaderProps {
  /** Accepted for drop-in parity with PageHero and deliberately NOT rendered —
   *  an uppercase kicker restating the page title is the thing being removed. */
  eyebrow?: string;
  /**
   * Also accepted and NOT rendered. On `PageHero` this drove a per-page
   * gradient wash behind the title. That wash is the single loudest piece of
   * the editorial style being removed, so honouring it would defeat the point
   * — but the prop stays in the type so eighteen call sites did not each need
   * an edit to drop it, which is a sweep with its own risk.
   */
  tone?: string;
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
  /**
   * Accepted and NOT rendered. `StatStrip` painted each stat its own tone, so
   * a four-stat row arrived in four colours and none of them meant anything —
   * the eye had no focal point. One volt `accent` replaces the whole scheme.
   */
  tone?: string;
}

interface SafetyStatStripProps {
  stats: SafetyStat[];
  className?: string;
  /**
   * Accepted and NOT rendered — the layout is two-up by design (see below).
   * Kept so existing `columns={4}` call sites still typecheck.
   */
  columns?: number;
}

/**
 * Stats as HUB CARDS, two-up.
 *
 * This was a row of bare figures under a rule; before that it was the
 * college-primitives `StatStrip`, a bordered 4-up panel with `01 · ACTIVE`
 * numbering and per-tone gradient washes. Neither matched the cards the rest
 * of the app is built from, so Site Safety looked like a different product to
 * the page you arrived from.
 *
 * It now renders `HubKpi` — the real shared primitive, not a local lookalike.
 * That matters more than it sounds: a safety-local copy of a card drifts from
 * the original the first time either is touched, and this hub already carries
 * the scars of that (see `SafetyList`, `EditableList`, `fieldClasses`). Using
 * the primitive means the surface, the volt hairline, the press feel and the
 * focus ring stay correct here by construction.
 *
 * Two columns at every width, not four. `HubKpiRow` goes to `lg:grid-cols-4`,
 * which suits a dashboard of trends; a safety module has four counts that are
 * read as pairs — live vs expiring, pass vs fail — and a 2x2 block keeps them
 * next to the thing they compare against instead of strung across the window.
 */
export function SafetyStatStrip({ stats, className }: SafetyStatStripProps) {
  return (
    <div
      className={cn(
        // Two-up on a phone, four across from `lg`. It was `max-w-3xl` and
        // fixed at two columns, which capped the row at 768px inside a shell
        // that runs to 2240px — so on a desktop the stats sat bunched in the
        // left third with the whole right half of the screen empty, and the
        // filter bar beneath them ran twice as wide. A 2x2 block is right on a
        // handset; on a monitor four counts belong on one line.
        'grid grid-cols-2 gap-2.5 sm:gap-3 lg:grid-cols-4',
        className
      )}
    >
      {stats.map((stat, i) => (
        <HubKpi
          key={stat.label}
          label={stat.label}
          // HubKpi takes a string — the figure is the card, and a number here
          // would render the same but lose the caller's own formatting.
          value={String(stat.value)}
          verdict={stat.sub}
          // One volt figure per block. `accent` on more than one is a rainbow
          // and the row loses its focal point, so the first accented stat wins
          // and any later one is rendered plain.
          accent={stat.accent && stats.findIndex((x) => x.accent) === i}
          onClick={stat.onClick}
        />
      ))}
    </div>
  );
}
