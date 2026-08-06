/**
 * Hub primitives — the shared shell every hub page is built from.
 *
 * Inspection & Testing and the Business Hub had grown two near-identical
 * copies of a masthead, an alert row and a tool grid, and they had already
 * drifted: one used numbered `01 · AT A GLANCE` eyebrows over flat cells in a
 * hairline grid with invisible filler cells to plug the last row, the other
 * used plain headings over real cards. Extracted here so a third page can't
 * start a third dialect.
 *
 * The shape is what Inspection & Testing settled on, because it is the one
 * that survived contact with the job:
 *
 *   masthead → (alert, only if something is wrong) → quick start → tool grids
 *
 * No hero. The editorial hero — date eyebrow, a slogan rotating on hour and
 * day-of-year, and a verdict paragraph restating the numbers below it — cost
 * roughly 300px before an electrician reached a single tool. What was actually
 * load-bearing in it was the alert, so that is all that survives, and only
 * when it has something to say.
 *
 * Cards come from `card-recipe`, so press feel, focus ring and the volt rule
 * are defined once.
 */
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { containerVariants, itemVariants } from '@/components/college/primitives';
import { useHaptic } from '@/hooks/useHaptic';
import { CARD_BASE, CARD_NEUTRAL, CARD_PRIMARY } from '@/components/ui/card-recipe';

// ─────────────────────────────────────────────────────────────────────────
// Masthead
// ─────────────────────────────────────────────────────────────────────────

/**
 * Sticky text-only masthead. `section` is the small caps word on the left of
 * the rule (hidden on phones, where the space is worth more than the context)
 * and `title` names the page.
 */
export const HubMasthead = ({
  section = 'Electrician',
  title,
  backTo = '/electrician',
}: {
  section?: string;
  title: string;
  backTo?: string;
}) => {
  const navigate = useNavigate();
  return (
    <div className="sticky top-0 z-50 border-b border-white/[0.06] bg-elec-dark/95 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="flex h-12 items-center gap-4 sm:gap-6">
          <button
            type="button"
            onClick={() => navigate(backTo)}
            className="touch-manipulation whitespace-nowrap text-[12.5px] font-medium text-white transition-colors"
          >
            ← Back
          </button>
          <div className="flex min-w-0 flex-1 items-baseline gap-2.5">
            <span className="hidden text-[10px] font-medium uppercase tracking-[0.18em] text-white sm:inline">
              {section}
            </span>
            <span className="hidden h-3 w-px bg-white/10 sm:inline" aria-hidden />
            <h1 className="truncate text-[13px] font-semibold tracking-tight text-white sm:text-sm">
              {title}
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────
// Alert line
// ─────────────────────────────────────────────────────────────────────────

/**
 * One compact row for the single thing that genuinely needs attention today.
 *
 * Render nothing when there is nothing wrong — the default page is masthead
 * straight into work. The whole row is the tap target.
 *
 * Volt is the WORDS, not the surface: a translucent volt wash goes muddy brown
 * on this ground, and a neutral surface also stops this competing with the
 * solid volt card in the quick-start strip below it.
 */
export const HubAlertLine = ({ text, action = 'View', onClick }: {
  text: string;
  action?: string;
  onClick: () => void;
}) => {
  const haptic = useHaptic();
  return (
    <motion.button
      variants={itemVariants}
      initial="hidden"
      animate="visible"
      type="button"
      onClick={() => {
        haptic.light();
        onClick();
      }}
      className={cn(
        CARD_BASE,
        CARD_NEUTRAL,
        'min-h-11 w-full flex-row items-center justify-between gap-3 px-4 py-3'
      )}
    >
      <span className="min-w-0 text-[13px] font-semibold leading-snug text-elec-yellow">
        {text}
      </span>
      <span className="shrink-0 text-[12px] font-bold text-elec-yellow">{action}</span>
    </motion.button>
  );
};

// ─────────────────────────────────────────────────────────────────────────
// Section heading
// ─────────────────────────────────────────────────────────────────────────

/**
 * Hierarchy comes from type and spacing. No icons, no coloured dots, no
 * gradient bars, and no `01 ·` numbering — the numbers implied an order the
 * groups never had.
 */
export const HubSectionHeading = ({ children }: { children: React.ReactNode }) => (
  <motion.h2
    variants={itemVariants}
    className="text-[15px] font-semibold tracking-tight text-white"
  >
    {children}
  </motion.h2>
);

// ─────────────────────────────────────────────────────────────────────────
// Quick start
// ─────────────────────────────────────────────────────────────────────────

export interface HubQuickAction {
  title: string;
  description: string;
  onClick: () => void;
  /** The most-reached-for action gets the one solid volt card in the group. */
  primary?: boolean;
}

/**
 * The handful of things someone opens this page to START. Two-up on phones so
 * a four-item list is one thumb-reach rather than two screens of scrolling.
 *
 * The whole card is the button — no "Start →" link inside it, which would be a
 * smaller target for the same job.
 */
export const HubQuickStart = ({
  label,
  items,
}: {
  label: string;
  items: HubQuickAction[];
}) => {
  const haptic = useHaptic();
  if (items.length === 0) return null;

  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-3"
    >
      <HubSectionHeading>{label}</HubSectionHeading>

      <motion.div
        variants={itemVariants}
        className="grid grid-cols-2 gap-2.5 sm:gap-3 lg:grid-cols-4"
      >
        {items.map((q) => (
          <button
            key={q.title}
            type="button"
            onClick={() => {
              haptic.light();
              q.onClick();
            }}
            className={cn(
              CARD_BASE,
              q.primary ? CARD_PRIMARY : CARD_NEUTRAL,
              'p-4',
              'lg:hover:-translate-y-0.5'
            )}
          >
            <span
              className={cn(
                'text-[16px] font-bold leading-tight tracking-tight transition-colors sm:text-[17px]',
                q.primary ? 'text-black' : 'text-white group-hover:text-elec-yellow'
              )}
            >
              {q.title}
            </span>
            <span
              className={cn(
                'mt-1 text-[11.5px] leading-snug',
                q.primary ? 'text-black/70' : 'text-white'
              )}
            >
              {q.description}
            </span>
          </button>
        ))}
      </motion.div>
    </motion.section>
  );
};

// ─────────────────────────────────────────────────────────────────────────
// Tool grid
// ─────────────────────────────────────────────────────────────────────────

export interface HubTool {
  id: string;
  /**
   * Category word, ONLY when it says something the title doesn't.
   *
   * Optional on purpose. Every card used to carry one, which produced
   * "QUOTES / Quotes", "INVOICES / Invoices", "TASKS / Tasks" — a line of
   * type repeating the line beneath it on eight cards out of eleven. Pass it
   * for "Repeat work" over "Renewal book"; leave it off for "Quotes".
   */
  eyebrow?: string;
  title: string;
  description: string;
  to?: string;
  onClick?: () => void;
  /** Live number for this area — a count next to the thing it counts. */
  meta?: string;
  /** Turns `meta` volt. Reserve it for work that is actually outstanding. */
  alert?: boolean;
}

/**
 * The standard group of tool cards.
 *
 * Two-up on phones throughout: these were a single column of 220px-tall cards,
 * so one group could run to five screens. `columns` caps the widest layout —
 * 'four' suits long lists on a desktop monitor, where three columns inside
 * max-w-7xl leaves cards wider than their content.
 *
 * Card heights are intrinsic. The previous grid pinned every row to
 * 185px/240px, which left short cards half empty and clipped long ones.
 */
export const HubToolGrid = ({
  label,
  cards,
  columns = 'three',
}: {
  label: string;
  cards: HubTool[];
  columns?: 'two' | 'three' | 'four';
}) => {
  const navigate = useNavigate();
  const haptic = useHaptic();
  if (cards.length === 0) return null;

  const colClass =
    columns === 'two'
      ? 'sm:grid-cols-2'
      : columns === 'four'
        ? 'sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
        : 'sm:grid-cols-2 lg:grid-cols-3';

  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-3"
    >
      <HubSectionHeading>{label}</HubSectionHeading>

      <motion.div
        variants={itemVariants}
        className={cn('grid grid-cols-2 gap-2.5 sm:gap-3', colClass)}
      >
        {cards.map((card) => (
          <button
            key={card.id}
            type="button"
            onClick={() => {
              haptic.light();
              if (card.onClick) card.onClick();
              else if (card.to) navigate(card.to);
            }}
            className={cn(
              CARD_BASE,
              CARD_NEUTRAL,
              'p-3.5 sm:p-4',
              // Desktop only — a 1px rise on hover reads as the card lifting
              // toward the cursor. Deliberately not on touch, where there is
              // no hover state and the press-scale already answers the tap.
              'lg:hover:-translate-y-0.5'
            )}
          >
            {card.eyebrow && (
              <span className="min-w-0 truncate text-[10px] font-semibold uppercase tracking-[0.16em] text-white">
                {card.eyebrow}
              </span>
            )}

            <span
              className={cn(
                'text-[15px] font-bold leading-tight tracking-tight text-white transition-colors group-hover:text-elec-yellow sm:text-[17px]',
                card.eyebrow && 'mt-1.5'
              )}
            >
              {card.title}
            </span>
            <span className="mt-1 text-[11.5px] leading-snug text-white sm:text-[12.5px]">
              {card.description}
            </span>

            <span className="flex-grow" />

            {/* The live value is the point of the footer, so it is set at
                reading size rather than the old 11px caption. What used to sit
                opposite it was the word "Open", repeated on every card down
                the page — the whole card is already the button, so the word
                added nothing but noise. A chevron carries the same affordance
                at a fraction of the visual weight. */}
            <span className="mt-3 flex items-center justify-between gap-2 border-t border-white/[0.10] pt-2.5">
              <span
                className={cn(
                  'min-w-0 truncate text-[12px] tabular-nums sm:text-[12.5px]',
                  card.alert ? 'font-semibold text-elec-yellow' : 'text-white'
                )}
              >
                {card.meta ?? ''}
              </span>
              <ChevronRight
                className="h-4 w-4 shrink-0 text-elec-yellow transition-transform group-hover:translate-x-0.5"
                aria-hidden
              />
            </span>
          </button>
        ))}
      </motion.div>
    </motion.section>
  );
};

// ─────────────────────────────────────────────────────────────────────────
// Page shell
// ─────────────────────────────────────────────────────────────────────────

/**
 * Standard page frame. `space-y-8` is deliberately tighter than the old
 * `space-y-12/16`: that rhythm existed to give a full-screen hero room to
 * breathe, and with the hero gone it only pushed the tools further down.
 */
export const HubPage = ({ children }: { children: React.ReactNode }) => (
  <div className="-mt-3 min-h-screen bg-elec-dark pb-24 sm:-mt-4 md:-mt-6">
    {children}
  </div>
);

export const HubBody = ({ children }: { children: React.ReactNode }) => (
  <div className="mx-auto max-w-7xl space-y-8 px-4 py-4 sm:space-y-10 lg:px-8">{children}</div>
);
