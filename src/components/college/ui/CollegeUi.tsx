import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { itemVariants } from '@/components/college/primitives';
import { PageHelpButton, type PageHelpContent } from '@/components/hub/PageHelp';

/* ==========================================================================
   College Hub design kit (7 Oct 2026). Andrew: "everything in the college hub
   needs to be done and redesigned". Every College Hub screen is built from
   these, so the whole hub reads as one product:

   - Ground: the page sits on the landing background (HubPage ground="landing").
   - Cards: one surface, rounded-3xl, hairline border, soft top-lit gradient.
     Edge to edge on phones, inset from sm: up.
   - Headings: white, typography only. Yellow is for the one action or the
     one number that matters, never for section labels.
   - Desktop is always wide: grids, not a narrow centred column.
   - Every page explains itself: a "?" in the header (PageHelp).
   - All text is white. Orange means behind or late; green means done.
   ========================================================================== */

/** The one card surface. Use for every panel on a College Hub screen. */
export const COLLEGE_CARD =
  '-mx-4 border-y border-white/[0.08] bg-gradient-to-b from-white/[0.07] to-white/[0.025] p-5 sm:mx-0 sm:rounded-3xl sm:border-x sm:p-6';

/** The same surface for a list: no padding, rows divided by hairlines. */
export const COLLEGE_LIST =
  '-mx-4 overflow-hidden border-y border-white/[0.08] bg-gradient-to-b from-white/[0.07] to-white/[0.025] divide-y divide-white/[0.06] sm:mx-0 sm:rounded-3xl sm:border-x';

/** A tappable row inside COLLEGE_LIST. */
export const COLLEGE_ROW =
  'flex min-h-[60px] w-full items-center gap-3 px-5 py-3 text-left transition-colors touch-manipulation hover:bg-white/[0.04] active:bg-white/[0.07] sm:px-6';

/** Buttons. Primary is the one solid volt action on a screen. */
export const COLLEGE_BTN_PRIMARY =
  'inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-elec-yellow px-4 text-[13.5px] font-semibold text-black transition-opacity touch-manipulation hover:opacity-90 disabled:opacity-40';
export const COLLEGE_BTN =
  'inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-white/[0.14] px-4 text-[13.5px] font-semibold text-white transition-colors touch-manipulation hover:border-elec-yellow disabled:opacity-40';
export const COLLEGE_LINK =
  'inline-flex h-11 items-center px-1 text-[13px] font-semibold text-elec-yellow touch-manipulation';

/** Chips for 2–6 choices (filters, tabs). 44px, gloved-thumb size (ELE-1891). */
export const chipCn = (on: boolean) =>
  cn(
    'h-11 shrink-0 rounded-full border px-3.5 text-[12.5px] transition-colors touch-manipulation',
    on
      ? 'border-elec-yellow bg-elec-yellow font-semibold text-black'
      : 'border-white/[0.12] bg-white/[0.06] font-medium text-white hover:border-white/[0.3]'
  );

/* ── Page header ────────────────────────────────────────────────────── */

/**
 * The top of every College Hub screen: eyebrow, title, one sentence on what
 * the page is for, the "?" help, and the page's actions on the right.
 */
export function CollegePageHeader({
  eyebrow,
  title,
  description,
  help,
  actions,
}: {
  eyebrow?: string;
  title: string;
  description?: ReactNode;
  help?: PageHelpContent;
  actions?: ReactNode;
}) {
  return (
    <motion.header
      variants={itemVariants}
      initial="hidden"
      animate="visible"
      className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between"
    >
      <div className="min-w-0">
        <div className="flex items-start justify-between gap-3">
          {eyebrow && (
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-elec-yellow">{eyebrow}</p>
          )}
          {help && <PageHelpButton help={help} className="-mt-2 lg:hidden" />}
        </div>
        <h1 className={cn('text-[26px] font-bold leading-tight tracking-tight text-white sm:text-[32px]', eyebrow && 'mt-1.5')}>
          {title}
        </h1>
        {description && <p className="mt-2 max-w-3xl text-[14.5px] leading-relaxed text-white">{description}</p>}
      </div>
      {(actions || help) && (
        <div className="flex shrink-0 flex-wrap items-center gap-2">
          {actions}
          {help && <PageHelpButton help={help} className="hidden lg:inline-flex" />}
        </div>
      )}
    </motion.header>
  );
}

/* ── Section title ──────────────────────────────────────────────────── */

/** White, typography only. Replaces the yellow HubSectionHeading in the College Hub. */
export function CollegeSectionTitle({
  title,
  sub,
  action,
  id,
}: {
  title: ReactNode;
  sub?: ReactNode;
  action?: ReactNode;
  id?: string;
}) {
  return (
    <div id={id} className="flex scroll-mt-20 items-end justify-between gap-4">
      <div className="min-w-0">
        <h2 className="text-[17px] font-semibold tracking-tight text-white">{title}</h2>
        {sub && <p className="mt-0.5 text-[13px] leading-snug text-white">{sub}</p>}
      </div>
      {action && <div className="-my-2 flex shrink-0 items-center gap-1">{action}</div>}
    </div>
  );
}

/** Children-only variant of CollegeSectionTitle, a drop-in for HubSectionHeading. */
export function CollegeHeading({ children }: { children: ReactNode }) {
  return (
    <motion.h2 variants={itemVariants} className="text-[17px] font-semibold tracking-tight text-white">
      {children}
    </motion.h2>
  );
}

/* ── Figures ────────────────────────────────────────────────────────── */

export interface CollegeStat {
  label: string;
  value: string;
  sub?: string;
  warn?: boolean;
  good?: boolean;
  onClick?: () => void;
}

/** A row of 2–4 headline figures, each its own tile. */
export function CollegeStats({ items, className }: { items: CollegeStat[]; className?: string }) {
  return (
    <motion.dl
      variants={itemVariants}
      initial="hidden"
      animate="visible"
      className={cn('grid grid-cols-2 gap-3', items.length >= 4 ? 'lg:grid-cols-4' : items.length === 3 ? 'lg:grid-cols-3' : '', className)}
    >
      {items.map((s) => {
        const body = (
          <>
            <dt className="text-[12.5px] font-medium text-white">{s.label}</dt>
            <dd
              className={cn(
                'mt-1.5 text-[28px] font-bold leading-none tabular-nums',
                s.warn ? 'text-orange-400' : s.good ? 'text-emerald-400' : 'text-white'
              )}
            >
              {s.value}
            </dd>
            {s.sub && <dd className="mt-1.5 truncate text-[12px] text-white">{s.sub}</dd>}
          </>
        );
        const cls = cn(
          'block rounded-2xl border border-white/[0.08] bg-gradient-to-b from-white/[0.07] to-white/[0.025] px-4 py-3.5 text-left',
          s.warn && 'border-orange-400/40'
        );
        return s.onClick ? (
          <button key={s.label} type="button" onClick={s.onClick} className={cn(cls, 'touch-manipulation transition-colors hover:border-white/[0.2]')}>
            {body}
          </button>
        ) : (
          <div key={s.label} className={cls}>
            {body}
          </div>
        );
      })}
    </motion.dl>
  );
}

/* ── Empty state ────────────────────────────────────────────────────── */

export function CollegeEmpty({
  title,
  body,
  action,
}: {
  title: string;
  body?: ReactNode;
  action?: ReactNode;
}) {
  return (
    <div className={cn(COLLEGE_CARD, 'flex flex-col items-start gap-3 sm:items-center sm:py-10 sm:text-center')}>
      <p className="text-[15px] font-semibold text-white">{title}</p>
      {body && <p className="max-w-xl text-[13.5px] leading-relaxed text-white">{body}</p>}
      {action}
    </div>
  );
}

/* ── Link card: a destination with a figure ─────────────────────────── */

export function CollegeLinkCard({
  title,
  body,
  figure,
  warn,
  onClick,
}: {
  title: string;
  body?: ReactNode;
  figure?: string;
  warn?: boolean;
  onClick: () => void;
}) {
  return (
    <motion.button
      variants={itemVariants}
      type="button"
      onClick={onClick}
      className={cn(
        'group flex min-h-[112px] w-full flex-col rounded-3xl border border-white/[0.08] bg-gradient-to-b from-white/[0.07] to-white/[0.025] p-5 text-left transition-colors touch-manipulation hover:border-white/[0.2]',
        warn && 'border-orange-400/40'
      )}
    >
      <span className="flex w-full items-start justify-between gap-3">
        <span className="text-[14.5px] font-semibold leading-snug text-white">{title}</span>
        <ChevronRight className="mt-0.5 h-4 w-4 shrink-0 text-white transition-transform group-hover:translate-x-0.5 group-hover:text-elec-yellow" aria-hidden />
      </span>
      {figure && (
        <span className={cn('mt-3 text-[26px] font-bold leading-none tabular-nums', warn ? 'text-orange-400' : 'text-white')}>{figure}</span>
      )}
      {body && <span className="mt-auto block pt-2 text-[12.5px] leading-snug text-white">{body}</span>}
    </motion.button>
  );
}
