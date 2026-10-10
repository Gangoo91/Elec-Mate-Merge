/**
 * The apprentice learning screens' kit (calculators, guides, testing, BS 7671,
 * videos, courses) — 10 Oct 2026 phone redesign.
 *
 * The shared recipes these screens used (`panel-recipe.ts`) carry a volt edge
 * on every panel and spaced 10px capitals on every label, so a page read as a
 * stack of gold boxes with tiny shouting headings. This kit follows the College
 * Hub's design language instead (docs/college-mobile-standard.md): neutral
 * edge-to-edge cards, sentence-case labels, rows not tiles, one solid volt
 * action per screen, joined toggles for 2–4 choices.
 */
import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, type LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  COLLEGE_CARD,
  COLLEGE_LIST,
  COLLEGE_ROW,
  COLLEGE_BTN,
  COLLEGE_BTN_PRIMARY,
  chipCn,
} from '@/components/college/ui/CollegeUi';

/** Card surface — edge to edge on a phone, inset and rounded from `sm:`. */
export const LEARN_CARD = COLLEGE_CARD;
/** Same surface as a list of hairline-divided rows. */
export const LEARN_LIST = COLLEGE_LIST;
export const LEARN_ROW = COLLEGE_ROW;
export const LEARN_BTN = COLLEGE_BTN;
export const LEARN_BTN_PRIMARY = COLLEGE_BTN_PRIMARY;
export const learnChip = chipCn;

/** A panel nested inside a card — a level down, white hairline. */
export const LEARN_INSET = 'rounded-xl border border-white/[0.12] bg-white/[0.04] p-3.5 sm:p-4';
/** A callout: neutral face, solid bar on the left (never a tinted fill). */
export const LEARN_CALLOUT =
  'rounded-xl border border-white/[0.12] border-l-[3px] border-l-elec-yellow bg-white/[0.04] p-3.5 sm:p-4';
export const LEARN_CALLOUT_DANGER =
  'rounded-xl border border-white/[0.12] border-l-[3px] border-l-red-500 bg-white/[0.04] p-3.5 sm:p-4';

/** Labels heading a card or a block — sentence case, never spaced capitals. */
export const LEARN_LABEL = 'text-[13px] font-semibold leading-snug text-white';
export const LEARN_LABEL_ACCENT = 'text-[13px] font-semibold leading-snug text-elec-yellow';
export const LEARN_LABEL_DANGER = 'text-[13px] font-semibold leading-snug text-red-300';

/** Small inline tag (“On this page”, “Live test”). 12px, outlined, sentence case. */
export const learnTag = (tone: 'neutral' | 'accent' | 'danger' = 'neutral') =>
  cn(
    'inline-flex items-center rounded-md border px-1.5 py-0.5 align-middle text-[12px] font-medium leading-none',
    tone === 'accent' && 'border-elec-yellow/60 text-elec-yellow',
    tone === 'danger' && 'border-red-400/60 text-red-300',
    tone === 'neutral' && 'border-white/[0.18] text-white'
  );

/** Joined toggle for 2–4 choices — chosen option white on black text. */
export const LEARN_SEG_GROUP =
  'inline-flex w-full rounded-xl border border-white/[0.14] p-0.5 sm:w-auto';
export const learnSeg = (on: boolean) =>
  cn(
    'inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-[10px] px-4 text-[13.5px] transition-colors touch-manipulation sm:flex-none',
    on ? 'bg-white font-semibold text-black' : 'font-medium text-white hover:bg-white/[0.06]'
  );

/** Section title — white type, no icon, no bar. */
export function LearnSectionTitle({
  title,
  sub,
  action,
}: {
  title: ReactNode;
  sub?: ReactNode;
  action?: ReactNode;
}) {
  return (
    <div className="flex items-end justify-between gap-4">
      <div className="min-w-0">
        <h2 className="text-[17px] font-semibold tracking-tight text-white">{title}</h2>
        {sub && <p className="mt-0.5 text-[13px] leading-snug text-white">{sub}</p>}
      </div>
      {action && <div className="-my-2 flex shrink-0 items-center gap-1">{action}</div>}
    </div>
  );
}

export interface LearnLinkItem {
  id: string;
  title: string;
  detail?: ReactNode;
  icon?: LucideIcon;
  to?: string;
  onClick?: () => void;
  active?: boolean;
  /** Right-hand figure or status ("3 of 9"). */
  meta?: ReactNode;
}

/**
 * A list of destinations as rows — a white line icon beside the title, the
 * detail under it, a chevron. Replaces icon-over-title tile grids.
 * `columns` lays the rows out as equal cards from `lg:` up.
 */
export function LearnLinkList({
  items,
  columns = 1,
  className,
}: {
  items: LearnLinkItem[];
  columns?: 1 | 2 | 3;
  className?: string;
}) {
  const grid = columns > 1;
  return (
    <ul
      className={cn(
        grid
          ? cn(
              LEARN_LIST,
              'sm:grid sm:gap-0 sm:divide-y-0',
              columns === 2 ? 'sm:grid-cols-2' : 'sm:grid-cols-2 lg:grid-cols-3',
              'sm:[&>li]:border-b sm:[&>li]:border-white/[0.06]'
            )
          : LEARN_LIST,
        className
      )}
    >
      {items.map((it) => {
        const Icon = it.icon;
        const inner = (
          <>
            {Icon && (
              <Icon
                aria-hidden
                strokeWidth={1.5}
                className={cn(
                  'mt-0.5 h-5 w-5 shrink-0 self-start',
                  it.active ? 'text-elec-yellow' : 'text-white'
                )}
              />
            )}
            <span className="min-w-0 flex-1">
              <span
                className={cn(
                  'block text-[15px] font-semibold leading-snug',
                  it.active ? 'text-elec-yellow' : 'text-white'
                )}
              >
                {it.title}
              </span>
              {it.detail && (
                <span className="mt-0.5 block text-[13px] leading-snug text-white">
                  {it.detail}
                </span>
              )}
            </span>
            {it.meta && (
              <span className="shrink-0 text-[13px] font-semibold tabular-nums text-white">
                {it.meta}
              </span>
            )}
            <ChevronRight
              aria-hidden
              className={cn(
                'h-4 w-4 shrink-0 text-white transition-transform',
                it.active && 'rotate-90 text-elec-yellow'
              )}
            />
          </>
        );
        const rowCn = cn(
          LEARN_ROW,
          'h-full items-center',
          it.active && 'shadow-[inset_3px_0_0_0_hsl(var(--elec-yellow))]'
        );
        return (
          <li key={it.id} className="h-full">
            {it.to ? (
              <Link to={it.to} className={rowCn}>
                {inner}
              </Link>
            ) : (
              <button
                type="button"
                onClick={it.onClick}
                aria-expanded={it.active}
                className={rowCn}
              >
                {inner}
              </button>
            )}
          </li>
        );
      })}
    </ul>
  );
}
