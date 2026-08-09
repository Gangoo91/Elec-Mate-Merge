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
import { ChevronRight, Minus, TrendingDown, TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import { containerVariants, itemVariants } from '@/components/college/primitives';
import { useHaptic } from '@/hooks/useHaptic';
import PushNotificationPrompt from '@/components/notifications/PushNotificationPrompt';
import { CARD_BASE, CARD_NEUTRAL, CARD_PRIMARY, CARD_SURFACE } from '@/components/ui/card-recipe';

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
      <div className="mx-auto max-w-[1600px] px-4 lg:px-8">
        <div className="flex h-12 items-center gap-4 sm:gap-6">
          {/* -ml-2 + px-2 keeps the 44px target without visually indenting the
              label: the tap area extends left into the container padding. The
              bare text button measured 19px tall on a phone. */}
          <button
            type="button"
            onClick={() => navigate(backTo)}
            className="-ml-2 flex h-11 shrink-0 items-center whitespace-nowrap px-2 text-[12.5px] font-medium text-white transition-colors touch-manipulation"
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
export const HubAlertLine = ({
  text,
  action = 'View',
  onClick,
}: {
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
 *
 * Volt, not white. A page of tool cards with nothing outstanding has no live
 * figures on it, so every accent the design reserves for data goes unused and
 * the whole screen is grey on black. The section headings are the one element
 * that is always present, always structural, and never a number — so colouring
 * them puts the brand on every screen without spending the accent that means
 * "this needs you".
 *
 * It is also the only safe place for it. Volt as TEXT is exact; volt as a
 * surface or a wash goes muddy brown on this ground, which is why the cards
 * themselves stay neutral until they have something to say.
 */
export const HubSectionHeading = ({ children }: { children: React.ReactNode }) => (
  <motion.h2
    variants={itemVariants}
    className="text-[15px] font-semibold tracking-tight text-elec-yellow"
  >
    {children}
  </motion.h2>
);

// ─────────────────────────────────────────────────────────────────────────
// Work list
// ─────────────────────────────────────────────────────────────────────────

export interface HubWorkItem {
  id: string;
  title: string;
  /** Why it is on the list. Never a restatement of the title. */
  reason: string;
  /** Right-hand figure — an amount, an age. Optional. */
  trailing?: string;
  /** Volt on the rule and the figure. Reserve it for real cost of delay. */
  urgent?: boolean;
  to: string;
}

/**
 * The ranked list of things that need doing — a hub's answer to "what now".
 *
 * Lives here rather than in either hub because both grew one and they would
 * have drifted within a week; this file exists because that already happened
 * once with the masthead and the tool grid.
 *
 * Deliberately NOT tabbed. Tabs hide the second-most-urgent item behind a
 * click, and the entire purpose is that you should not have to hunt for what
 * is next. Ranking is each page's business — pass items already sorted.
 *
 * Renders nothing when the list is empty. A card saying "nothing to do" is
 * still a card between the reader and their tools, and a short page on a quiet
 * day is the reward for staying on top of it.
 */
export const HubWorkList = ({
  label = 'Needs you',
  items,
  visible = 5,
  unit = 'thing',
}: {
  label?: string;
  items: HubWorkItem[];
  visible?: number;
  /** Noun for the count in the heading — "thing", "certificate". */
  unit?: string;
}) => {
  const navigate = useNavigate();
  const haptic = useHaptic();
  if (items.length === 0) return null;

  const shown = items.slice(0, visible);
  const hidden = items.length - shown.length;
  const count = `${items.length} ${items.length === 1 ? unit : `${unit}s`}`;

  const go = (to: string) => {
    haptic.light();
    navigate(to);
  };

  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-3"
    >
      <motion.div variants={itemVariants} className="flex items-end justify-between gap-4">
        <HubSectionHeading>{label}</HubSectionHeading>
        {/* The count in the heading makes the section scannable from the KPI
            row above without reading a single row — volt when any of it is
            genuinely costing something, so the number itself carries the
            warning. */}
        <span
          className={cn(
            'text-[11px] font-semibold tabular-nums',
            items.some((i) => i.urgent) ? 'text-elec-yellow' : 'text-white'
          )}
        >
          {count}
        </span>
      </motion.div>

      <motion.div
        variants={itemVariants}
        className={cn(
          '-mx-4 overflow-hidden border-y border-elec-yellow/35 sm:mx-0 sm:rounded-2xl sm:border-x',
          CARD_SURFACE
        )}
      >
        <ul className="divide-y divide-white/[0.10]">
          {shown.map((item) => (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => go(item.to)}
                className="flex w-full items-center gap-3 px-4 py-3.5 text-left transition-colors touch-manipulation hover:bg-white/[0.06] active:bg-white/[0.09] sm:px-5"
              >
                {/* A rule, not a dot or a pill. What kind of thing this is is
                    already legible from the words; this only has to separate
                    one row from the next at a glance. */}
                <span
                  aria-hidden="true"
                  className={cn(
                    'h-8 w-[3px] shrink-0 rounded-full',
                    item.urgent ? 'bg-elec-yellow' : 'bg-white/[0.25]'
                  )}
                />

                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[14px] font-semibold leading-tight text-white">
                    {item.title}
                  </span>
                  <span className="mt-0.5 block truncate text-[12px] leading-tight text-white">
                    {item.reason}
                  </span>
                </span>

                {item.trailing && (
                  <span
                    className={cn(
                      'shrink-0 text-[13px] font-semibold tabular-nums',
                      item.urgent ? 'text-elec-yellow' : 'text-white'
                    )}
                  >
                    {item.trailing}
                  </span>
                )}

                <ChevronRight className="h-4 w-4 shrink-0 text-white" aria-hidden="true" />
              </button>
            </li>
          ))}
        </ul>

        {/* Goes where the NEXT hidden item lives, not to a fixed page — a
            static link sent you somewhere empty whenever the overflow was a
            different kind of work from the last visible row. */}
        {hidden > 0 && (
          <button
            type="button"
            onClick={() => go(items[visible].to)}
            className="flex h-11 w-full items-center justify-center border-t border-white/[0.10] text-[12.5px] font-semibold text-white transition-colors touch-manipulation hover:bg-white/[0.06] active:bg-white/[0.09]"
          >
            {hidden} more
          </button>
        )}
      </motion.div>
    </motion.section>
  );
};

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
export const HubQuickStart = ({ label, items }: { label: string; items: HubQuickAction[] }) => {
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
        className="grid grid-cols-2 gap-2.5 sm:grid-cols-[repeat(auto-fit,minmax(240px,1fr))] sm:gap-3"
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
              'min-h-[104px] p-4',
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
  /**
   * The live figure for this area — "£6,027", "24", "136 on file".
   *
   * This is the CARD, not a footnote on it. The grid used to lead with a
   * sentence explaining the tool ("Invoices — Billing, payments and
   * reminders") and put the only real information, the overdue total, at
   * 11px along the bottom edge. Nobody opening their own business hub needs
   * to be told what an invoice is; they need to know they are owed £6,027.
   */
  value?: string;
  /** What the figure means — "overdue", "open", "on file". */
  valueLabel?: string;
  /**
   * Fallback for areas with nothing to count yet. Shown INSTEAD of the value,
   * never alongside it, so a card is either reporting or inviting — not both.
   */
  description?: string;
  to?: string;
  onClick?: () => void;
  /** Turns the figure volt. Reserve it for work that is actually outstanding. */
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
  /**
   * `two` / `three` / `four` are a FLOOR on card width, not a column count —
   * the grid is `auto-fit`, so a wide window fills with as many as will go.
   *
   * `pair` is different: exactly two columns at every width. Site Safety wants
   * a true 2x2 block, and auto-fit cannot express that — at 1456px even the
   * `two` setting lays out five across. Opt-in so the eight other hubs that
   * use this grid keep filling the width as before.
   */
  columns?: 'two' | 'three' | 'four' | 'pair';
}) => {
  const navigate = useNavigate();
  const haptic = useHaptic();
  if (cards.length === 0) return null;

  // Wide screens earn more columns rather than wider cards — past about
  // 340px a tool card is mostly empty space, and fewer cards per screen means
  // more scrolling for no gain.
  // `columns` is now only a floor on how wide a card may get — the row always
  // fills. A fixed four-column grid left a three-card group with an empty
  // quarter, which reads as a mistake rather than a layout.
  const colClass =
    columns === 'pair'
      ? 'sm:grid-cols-2'
      : columns === 'two'
        ? 'sm:grid-cols-[repeat(auto-fit,minmax(280px,1fr))]'
        : 'sm:grid-cols-[repeat(auto-fit,minmax(240px,1fr))]';

  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-3"
    >
      {/* Callers that supply their own heading row (EditorialHubGrid pairs one
          with a "Customise" action) pass an empty label — rendering the
          heading anyway left an empty <h2> in the accessibility tree. */}
      {label && <HubSectionHeading>{label}</HubSectionHeading>}

      {/* Phones lay out two-up, so an odd group leaves the last card sitting
          alone beside a hole. Letting it span the pair closes the gap and
          matches how the rest of the app treats a final row on mobile —
          full-bleed rather than half a row of nothing. Desktop is unaffected:
          auto-fit already collapses the empty tracks there. */}
      <motion.div
        variants={itemVariants}
        className={cn(
          'grid grid-cols-2 gap-2.5 sm:gap-3',
          colClass,
          cards.length % 2 === 1 &&
            columns !== 'pair' &&
            '[&>*:last-child]:col-span-2 sm:[&>*:last-child]:col-span-1'
        )}
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
              'relative flex h-full flex-col overflow-hidden min-h-[132px] p-3.5 sm:p-4',
              // Every card wears the gold edge now (see CARD_NEUTRAL); one
              // with work outstanding wears a brighter one. Degree, not
              // presence — that is what keeps the signal readable once the
              // colour is no longer exclusive to it.
              card.alert && 'border-elec-yellow/70',
              // Desktop only — a 1px rise on hover reads as the card lifting
              // toward the cursor. Deliberately not on touch, where there is
              // no hover state and the press-scale already answers the tap.
              'lg:hover:-translate-y-0.5'
            )}
          >
            {/* A 1px volt line catching the top edge, on every card — this is
                the light the gold border is reflecting, and without it the
                border reads as an outline drawn round a flat shape rather than
                an edge with a highlight on it.
                Outstanding work burns brighter (70% vs 28%), so the grid is
                still scannable for "what needs me" without reading a label. */}
            <span
              aria-hidden
              className={cn(
                'pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-elec-yellow/0 to-elec-yellow/0',
                card.alert ? 'via-elec-yellow/90' : 'via-elec-yellow/55'
              )}
            />
            {card.eyebrow && (
              <span className="min-w-0 truncate text-[10px] font-semibold uppercase tracking-[0.16em] text-white">
                {card.eyebrow}
              </span>
            )}

            <span
              className={cn(
                'flex items-center justify-between gap-2 text-[14.5px] font-semibold leading-tight tracking-tight text-white transition-colors group-hover:text-elec-yellow',
                card.eyebrow && 'mt-1.5'
              )}
            >
              {/* Two lines, and long unbroken tokens break rather than run out
                  of the card. A RAMS titled `consumer_unit_change - 33 Gable
                  Rd` is one 20-character word as far as the browser is
                  concerned, and it was overflowing the card edge on a phone.
                  Four-line titles were also what made cards in the same
                  section different heights. */}
              <span className="line-clamp-2 min-w-0 break-words [overflow-wrap:anywhere]">
                {card.title}
              </span>
              <ChevronRight
                className="h-3.5 w-3.5 shrink-0 text-white/55 transition-transform group-hover:translate-x-0.5 group-hover:text-elec-yellow"
                aria-hidden
              />
            </span>

            {/* Reporting or inviting, never both. A card with something to say
                says it in figures; one with nothing yet says what it is for. */}
            {card.value ? (
              <>
                <span
                  className={cn(
                    'mt-2 text-[26px] font-semibold leading-none tabular-nums tracking-tight sm:text-[30px]',
                    card.alert ? 'text-elec-yellow' : 'text-white'
                  )}
                >
                  {card.value}
                </span>
                {card.valueLabel && (
                  <span className="mt-1.5 text-[11.5px] leading-snug text-white">
                    {card.valueLabel}
                  </span>
                )}
              </>
            ) : (
              // Two lines here too. "AI-powered risk assessments and method
              // statements." ran to three on a phone while the card beside it
              // ran to two, which is what made a 2x2 block look ragged.
              <span className="mt-2 line-clamp-2 text-[12px] leading-snug text-white sm:text-[12.5px]">
                {card.description}
              </span>
            )}

            <span className="flex-grow" />
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
  // pb-24 plus the iOS home-indicator inset. A fixed 96px is right on a phone
  // with a hardware button and 34px short on one without, which leaves the
  // last row of cards sitting under the indicator.
  <div
    className="-mt-3 min-h-screen bg-elec-dark pb-24 sm:-mt-4 md:-mt-6"
    style={{ paddingBottom: 'calc(6rem + env(safe-area-inset-bottom, 0px))' }}
  >
    {children}
  </div>
);

/**
 * `max-w-[1600px]`, not `max-w-7xl`. The app already spends ~240px on the
 * sidebar, so a 1280px cap left a wide monitor showing a narrow column of
 * content with dead space beside it, and forced the tool grids down to three
 * columns when there was room for five.
 */
export const HubBody = ({ children }: { children: React.ReactNode }) => (
  <div className="mx-auto max-w-[1600px] space-y-8 px-4 py-4 sm:space-y-10 lg:px-8">
    {/* Below the masthead, not above it. Rendering this in Layout put a
        dismissible permission prompt ahead of the page's own header. */}
    <PushNotificationPrompt context="Get notified about quotes, invoices, tasks and messages" />
    {children}
  </div>
);

// ─────────────────────────────────────────────────────────────────────────
// KPI
// ─────────────────────────────────────────────────────────────────────────

export interface HubKpiProps {
  /** Quiet label, top-left. */
  label: string;
  /** The figure. This is the card. */
  value: string;
  /** Change against the previous period, e.g. "+12.5%" or "+£1,204". */
  delta?: string;
  /** Which way that change points. `up` is not automatically good. */
  direction?: 'up' | 'down' | 'flat';
  /**
   * Whether the movement is good news. Owed-to-you rising is bad; paid-this-
   * month rising is good — so direction and sentiment are separate.
   */
  sentiment?: 'good' | 'bad' | 'neutral';
  /** One line of judgement — "Chase the oldest first". */
  verdict?: string;
  /** Quieter qualifier beneath it — "3 invoices, oldest 41 days". */
  context?: string;
  /**
   * Renders this row's figure in volt. **One per row, and only the first.**
   *
   * A KPI strip of four identical white numbers has no focal point — the eye
   * has to read all four to find out which one matters. One volt figure gives
   * the row an anchor and puts the brand colour where it means something.
   *
   * Two accents is a rainbow and no accent is a wall, so this is a deliberate
   * one-per-page decision, not a per-KPI style. It is the rule the original
   * stat strip used before this component replaced it.
   */
  accent?: boolean;
  onClick?: () => void;
}

/**
 * A dashboard KPI, not a launcher tile.
 *
 * Four layers, in the order the eye wants them: label, figure, what moved,
 * what to do about it. The hub's cards previously reported a state and stopped
 * — "£6,027 overdue" with no sense of whether that is getting better or worse,
 * and no view on what to do next. A number without movement or judgement is a
 * fact, not a dashboard.
 *
 * `direction` and `sentiment` are deliberately separate. Money owed to you
 * going UP is bad news; money paid going up is good. Colour follows sentiment,
 * the arrow follows direction.
 */
export const HubKpi = ({
  label,
  value,
  delta,
  direction = 'flat',
  sentiment = 'neutral',
  verdict,
  context,
  accent = false,
  onClick,
}: HubKpiProps) => {
  const haptic = useHaptic();
  const Arrow = direction === 'up' ? TrendingUp : direction === 'down' ? TrendingDown : Minus;
  const deltaTone =
    sentiment === 'good'
      ? 'text-emerald-300 border-emerald-400/30'
      : sentiment === 'bad'
        ? 'text-red-300 border-red-400/30'
        : 'text-white border-white/[0.18]';

  const Tag = onClick ? 'button' : 'div';
  return (
    <Tag
      {...(onClick
        ? {
            type: 'button' as const,
            onClick: () => {
              haptic.light();
              onClick();
            },
          }
        : {})}
      className={cn(
        /*
         * Phones get a ROW, not a card: label left, figure right, one line of
         * verdict beneath. Two-up cards at 390px gave each KPI 154px, which
         * wrapped "Chase the oldest first" onto two lines — so this went
         * one-up. But one-up with a label, a 26px figure, a verdict AND a
         * context line came to ~200px per KPI: four of them filled the whole
         * first screen of the dashboard before anything actionable.
         *
         * Tighter padding, tighter gaps, and the context line is desktop-only
         * (see below). ~110px each instead of ~200px, and the figure is still
         * the biggest thing on the row.
         */
        'relative overflow-hidden rounded-2xl border text-left',
        CARD_SURFACE,
        accent ? 'border-elec-yellow/70' : 'border-elec-yellow/35',
        'grid grid-cols-[1fr_auto] items-baseline gap-x-3 gap-y-0.5 px-4 py-3',
        'sm:flex sm:flex-col sm:items-stretch sm:p-5',
        onClick &&
          'touch-manipulation select-none transition-[background-image,background-color,border-color,transform] duration-150 ease-out active:scale-[0.98] hover:border-elec-yellow/40 hover:from-white/[0.19] hover:via-white/[0.11] hover:to-white/[0.07] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-elec-yellow/60 lg:hover:-translate-y-0.5'
      )}
    >
      {/* A 1px volt line, not a volt surface. A translucent volt FILL goes
          muddy brown on this ground; a hairline stays yellow because there is
          nothing behind it to muddy. */}
      <span
        aria-hidden
        className={cn(
          'pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-elec-yellow/0 to-elec-yellow/0',
          accent ? 'via-elec-yellow/90' : 'via-elec-yellow/55'
        )}
      />

      <span className="flex min-w-0 items-center gap-2 text-[13px] font-medium text-white sm:text-[12px]">
        {label}
        {delta && (
          <span
            className={cn(
              'inline-flex shrink-0 items-center gap-1 rounded-full border px-2 py-0.5 text-[11px] font-semibold tabular-nums sm:ml-auto',
              deltaTone
            )}
          >
            <Arrow className="h-3 w-3" aria-hidden />
            {delta}
          </span>
        )}
      </span>

      <span
        className={cn(
          'text-[26px] font-semibold leading-none tabular-nums tracking-tight sm:mt-2 sm:text-[34px]',
          accent ? 'text-elec-yellow' : 'text-white'
        )}
      >
        {value}
      </span>

      {verdict && (
        <span className="col-span-2 flex min-w-0 items-center gap-1.5 text-[12.5px] font-medium text-white sm:mt-3">
          <span className="truncate sm:whitespace-normal">{verdict}</span>
          {direction !== 'flat' && <Arrow className="h-3.5 w-3.5 shrink-0" aria-hidden />}
        </span>
      )}
      {context && (
        <span className="col-span-2 hidden text-[11.5px] leading-snug text-white sm:mt-1 sm:block">
          {context}
        </span>
      )}
    </Tag>
  );
};

/** Four-up on desktop, two-up on a phone. Four is the cap on purpose. */
export const HubKpiRow = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    variants={itemVariants}
    initial="hidden"
    animate="visible"
    // ONE per line on a phone. Two-up gave each KPI 154px, which wrapped the
    // label onto three lines with the figure colliding into it. Full width
    // lets the row layout work as intended — label left, figure right — and
    // four short rows read faster than four cramped cards.
    className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 sm:gap-3 lg:grid-cols-4"
  >
    {children}
  </motion.div>
);
