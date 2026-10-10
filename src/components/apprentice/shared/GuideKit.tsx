/**
 * GuideKit — the frame for the apprentice guide and on-the-job tool pages
 * (toolbox, rights and pay, safety fundamentals, professional development,
 * on-the-job tools). Same design language as the College Hub home and
 * My college (10 Oct 2026):
 *
 * - The page sits on the landing ground with a real 26px title and one
 *   sentence under it, not just the 13px masthead line.
 * - A list of guides is one joined list of rows on a phone (title, the whole
 *   description, a chevron) and a grid of same-height cards from sm: up.
 *   No spaced capitals, no gold edge on every card, no text cut to a stub.
 * - Figures are a status line: bold numbers with plain words, hairlines
 *   between, 2x2 on a phone.
 * - All text white. Yellow is for the one number or action that matters.
 */
import type { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight, Phone, type LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { itemVariants } from '@/components/college/primitives';
import { HubBody, HubMasthead, HubPage } from '@/components/hub/HubPrimitives';
import { CollegePageHeader, CollegeSectionTitle } from '@/components/college/ui/CollegeUi';

/* ── Surfaces ───────────────────────────────────────────────────────── */

/** A card that lays out its own padding: edge to edge on a phone. */
export const GUIDE_FRAME =
  '-mx-4 overflow-hidden border-y border-white/[0.08] bg-gradient-to-b from-white/[0.07] to-white/[0.025] sm:mx-0 sm:rounded-2xl sm:border-x';

/** The same card with padding, for a block of reading. */
export const GUIDE_CARD = cn(GUIDE_FRAME, 'p-4 sm:p-5');

/** Small label above a list inside a card (was a spaced-capitals eyebrow). */
export const GUIDE_LABEL = 'text-[13px] font-semibold text-white';

/* ── Page ───────────────────────────────────────────────────────────── */

/**
 * Masthead (Back · area) then a proper page header, then the body.
 * `area` is the short name in the masthead bar ("Toolbox"); `title` is the
 * page's own name at 26px. When `area` is left out the masthead repeats the
 * title, which is what a top-level hub wants.
 */
export function GuidePage({
  section = 'Apprentice',
  area,
  title,
  eyebrow,
  description,
  backTo = '/apprentice',
  onBack,
  trailing,
  children,
}: {
  section?: string;
  area?: string;
  title: string;
  eyebrow?: string;
  description?: ReactNode;
  backTo?: string;
  onBack?: () => void;
  trailing?: ReactNode;
  children: ReactNode;
}) {
  return (
    <HubPage ground="landing">
      <HubMasthead
        section={section}
        title={area ?? title}
        backTo={backTo}
        onBack={onBack}
        trailing={trailing}
      />
      <HubBody>
        <CollegePageHeader eyebrow={eyebrow} title={title} description={description} />
        {children}
      </HubBody>
    </HubPage>
  );
}

/* ── Index of guides ────────────────────────────────────────────────── */

export interface GuideLink {
  id: string;
  title: string;
  description?: ReactNode;
  /** A quiet footer: "10 min read", "Open hub". */
  meta?: string;
  /** A short status word beside the title: "Start here", "April 2026". */
  badge?: string;
  icon?: LucideIcon;
  to?: string;
  onClick?: () => void;
}

/**
 * A set of guides: one joined list on a phone, a grid of same-height cards
 * from sm: up. `columns` is the widest layout (2 or 3).
 */
export function GuideIndex({
  title,
  sub,
  items,
  columns = 3,
}: {
  title?: ReactNode;
  sub?: ReactNode;
  items: GuideLink[];
  columns?: 2 | 3;
}) {
  const navigate = useNavigate();
  if (items.length === 0) return null;
  return (
    <motion.section variants={itemVariants} className="space-y-3">
      {title && <CollegeSectionTitle title={title} sub={sub} />}
      <ul
        className={cn(
          '-mx-4 divide-y divide-white/[0.06] border-y border-white/[0.08] bg-gradient-to-b from-white/[0.07] to-white/[0.025]',
          'sm:mx-0 sm:grid sm:auto-rows-fr sm:grid-cols-2 sm:gap-3 sm:divide-y-0 sm:border-0 sm:bg-none',
          // Four in three columns leaves one alone on the second row; 2x2 is even.
          columns === 3 && items.length !== 4 && 'xl:grid-cols-3'
        )}
      >
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <li key={item.id} className="h-full">
              <button
                type="button"
                onClick={() => {
                  if (item.onClick) item.onClick();
                  else if (item.to) navigate(item.to);
                }}
                className={cn(
                  'group relative flex h-full min-h-[64px] w-full items-start gap-3 px-4 py-3.5 text-left touch-manipulation transition-colors',
                  'hover:bg-white/[0.04] active:bg-white/[0.07]',
                  'sm:flex-col sm:gap-0 sm:rounded-2xl sm:border sm:border-white/[0.08] sm:bg-gradient-to-b sm:from-white/[0.07] sm:to-white/[0.025] sm:p-5 sm:hover:border-white/[0.18]'
                )}
              >
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 top-0 hidden h-px bg-elec-yellow opacity-0 transition-opacity group-hover:opacity-100 sm:block"
                />
                <span className="flex w-full min-w-0 flex-1 flex-col">
                  <span className="flex w-full items-start justify-between gap-3">
                    <span className="inline-flex min-w-0 items-start gap-2 text-[15px] font-semibold leading-snug text-white">
                      {Icon && (
                        <Icon
                          className="mt-[2px] h-[18px] w-[18px] shrink-0"
                          strokeWidth={1.5}
                          aria-hidden
                        />
                      )}
                      <span className="min-w-0 break-words">{item.title}</span>
                    </span>
                    <ChevronRight
                      className="mt-0.5 h-4 w-4 shrink-0 text-white transition-transform group-hover:translate-x-0.5 group-hover:text-elec-yellow"
                      aria-hidden
                    />
                  </span>
                  {item.badge && (
                    <span className="mt-1.5 inline-flex h-6 w-fit shrink-0 items-center whitespace-nowrap rounded-full border border-white/[0.18] px-2.5 text-[12px] font-semibold text-white">
                      {item.badge}
                    </span>
                  )}
                  {item.description && (
                    <span className="mt-1 block text-[13.5px] leading-snug text-white sm:mt-2">
                      {item.description}
                    </span>
                  )}
                  {item.meta && (
                    <span className="mt-1.5 block text-[13px] font-medium text-elec-yellow sm:mt-auto sm:pt-3">
                      {item.meta}
                    </span>
                  )}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </motion.section>
  );
}

/* ── Figures ────────────────────────────────────────────────────────── */

/** A status line of 2–4 figures: bold number, plain words, hairlines between. */
export function GuideFacts({
  items,
  className,
}: {
  items: { label: string; value: string }[];
  className?: string;
}) {
  return (
    <motion.dl
      variants={itemVariants}
      className={cn(
        GUIDE_FRAME,
        items.length === 3 ? 'grid grid-cols-3' : 'grid grid-cols-2',
        items.length >= 4 ? 'lg:grid-cols-4' : items.length === 3 ? 'lg:grid-cols-3' : '',
        className
      )}
    >
      {items.map((s, i) => (
        <div
          key={s.label}
          className={cn(
            'flex flex-col-reverse justify-end border-white/[0.08] px-4 py-3.5 sm:px-5',
            // 2x2 on a phone: hairline right of the left column, under the top row.
            // Three figures sit in one row; four go 2x2 on a phone.
            items.length === 3
              ? i < 2 && 'border-r'
              : [i % 2 === 0 && 'border-r', i < items.length - 2 && 'border-b'],
            // One row from lg: a hairline between each, none underneath.
            items.length > 2 && 'lg:border-b-0',
            items.length > 2 && i < items.length - 1 && 'lg:border-r'
          )}
        >
          <dt className="mt-1.5 text-[13px] font-medium text-white">{s.label}</dt>
          <dd
            className={cn(
              'text-[22px] font-bold leading-none tabular-nums tracking-tight sm:text-[26px]',
              i === 0 ? 'text-elec-yellow' : 'text-white'
            )}
          >
            {s.value}
          </dd>
        </div>
      ))}
    </motion.dl>
  );
}

/* ── Helplines ──────────────────────────────────────────────────────── */

/** One-tap phone numbers: a joined list of rows with the number on the right. */
export function GuideHelplines({
  title,
  sub,
  lines,
  tone = 'default',
}: {
  title?: ReactNode;
  sub?: ReactNode;
  lines: { name: string; detail?: string; number: string; tel: string }[];
  /** `alert` for emergency numbers: red hairline and red numbers. */
  tone?: 'default' | 'alert';
}) {
  return (
    <motion.section variants={itemVariants} className="space-y-3">
      {title && <CollegeSectionTitle title={title} sub={sub} />}
      <ul
        className={cn(
          GUIDE_FRAME,
          'divide-y divide-white/[0.06] sm:grid sm:grid-cols-2 sm:divide-y-0 [&>li]:border-white/[0.06] sm:[&>li:nth-child(n+3)]:border-t sm:[&>li:nth-child(even)]:border-l',
          tone === 'alert' && 'border-red-500/30'
        )}
      >
        {lines.map((l) => (
          <li key={l.tel}>
            <a
              href={`tel:${l.tel}`}
              className="flex min-h-[64px] items-center gap-3 px-4 py-3 touch-manipulation transition-colors hover:bg-white/[0.04] active:bg-white/[0.07] sm:px-5"
            >
              <Phone
                className="h-[18px] w-[18px] shrink-0 text-white"
                strokeWidth={1.5}
                aria-hidden
              />
              <span className="min-w-0 flex-1">
                <span className="block text-[15px] font-semibold text-white">{l.name}</span>
                {l.detail && <span className="block text-[13px] text-white">{l.detail}</span>}
              </span>
              <span
                className={cn(
                  'shrink-0 text-[15px] font-semibold tabular-nums',
                  tone === 'alert' ? 'text-red-300' : 'text-elec-yellow'
                )}
              >
                {l.number}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </motion.section>
  );
}

/* ── Labels (drop-ins for the portfolio Eyebrow / SectionHeader) ────── */

/** Small label over a heading or a list. Sentence case, 13px: no spaced capitals. */
export const Eyebrow = ({ children, className }: { children: ReactNode; className?: string }) => (
  <span className={cn('text-[13px] font-semibold text-elec-yellow', className)}>{children}</span>
);

/** A section heading: optional label, the title, one line under it. */
export const SectionHeader = ({
  eyebrow,
  title,
  meta,
  action,
}: {
  eyebrow?: string;
  title: string;
  meta?: string;
  action?: ReactNode;
}) => (
  <div className="flex items-end justify-between gap-3 pb-1">
    <div className="min-w-0 space-y-1">
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h3 className="text-[18px] font-semibold leading-tight tracking-tight text-white sm:text-[20px]">
        {title}
      </h3>
      {meta && <p className="text-[13px] leading-snug text-white">{meta}</p>}
    </div>
    {action && <div className="flex-shrink-0">{action}</div>}
  </div>
);

/* ── Quick actions ──────────────────────────────────────────────────── */

/**
 * The two or three things someone opens a hub to start. The one `primary`
 * action is solid yellow and takes the full width on a phone; the rest are
 * outlined. Each says what is behind it in a line under the title.
 */
export function GuideActions({
  items,
}: {
  items: { title: string; description?: string; onClick: () => void; primary?: boolean }[];
}) {
  return (
    <motion.div
      variants={itemVariants}
      className={cn(
        'grid grid-cols-2 gap-2.5 sm:gap-3',
        items.length >= 3 ? 'sm:grid-cols-3' : 'sm:grid-cols-2'
      )}
    >
      {items.map((a, i) => (
        <button
          key={a.title}
          type="button"
          onClick={a.onClick}
          className={cn(
            'flex min-h-[72px] flex-col justify-center rounded-2xl px-4 py-3 text-left transition-colors touch-manipulation',
            a.primary
              ? 'bg-elec-yellow text-black hover:opacity-90 active:opacity-80'
              : 'border border-white/[0.14] text-white hover:border-white/[0.3] active:bg-white/[0.06]',
            // Phones: the main action gets the whole row; an odd one left over fills its row too.
            a.primary && 'max-sm:col-span-2',
            !a.primary &&
              i === items.length - 1 &&
              items.filter((x) => !x.primary).length % 2 === 1 &&
              'max-sm:col-span-2'
          )}
        >
          <span className="text-[15px] font-semibold leading-snug">{a.title}</span>
          {a.description && (
            <span className="mt-0.5 text-[13px] leading-snug">{a.description}</span>
          )}
        </button>
      ))}
    </motion.div>
  );
}
