import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { containerVariants, itemVariants } from '@/components/college/primitives';
import { PageHelpButton, type PageHelpContent } from '@/components/hub/PageHelp';
import { CollegeSectionTitle } from '@/components/college/ui/CollegeUi';

/* Layout pieces for the Quality & Compliance screens: the screen wrapper,
   header, card surfaces, "start something" actions, grouped link cards and
   work rows.

   8 Oct 2026, in the language Andrew approved on the College Hub home and
   the lesson plans list: the landing card surface (card-surface, rounded-2xl,
   hairline border), edge to edge on a phone, the yellow top line on hover
   only, no coloured left bars, status chips coloured by border and text only,
   and a header whose one sentence carries the counts instead of a row of
   four figure tiles. */

/* ── Surfaces ───────────────────────────────────────────────────────── */

/** A panel: the landing card surface, edge to edge on a phone. */
export const QCARD =
  '-mx-4 max-sm:!rounded-none max-sm:!border-x-0 border-y border-white/[0.08] card-surface p-4 sm:mx-0 sm:rounded-2xl sm:border sm:p-5';

/** The same surface for a list: no padding, rows divided by hairlines. */
export const QLIST =
  '-mx-4 overflow-hidden max-sm:!rounded-none max-sm:!border-x-0 border-y border-white/[0.08] card-surface divide-y divide-white/[0.06] sm:mx-0 sm:rounded-2xl sm:border';

/** A tappable row inside QLIST. */
export const QROW =
  'flex min-h-[60px] w-full items-center gap-3 px-4 py-3 text-left transition-colors touch-manipulation hover:bg-white/[0.04] active:bg-white/[0.07] sm:px-5';

/** A card you can tap: lifts its border on hover and shows the top line. */
export const QCARD_INTERACTIVE =
  'group relative flex flex-col overflow-hidden card-surface-interactive rounded-2xl !border-white/[0.08] text-left transition-colors touch-manipulation hover:!border-white/[0.16] focus-within:!border-white/[0.16]';

/** The landing card's top line, on hover and focus only. */
export const QTOP_LINE =
  'pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-elec-yellow via-amber-400 to-orange-400 opacity-0 transition-opacity duration-200 group-hover:opacity-80 group-focus-visible:opacity-80 group-focus-within:opacity-80';

/** Buttons: one solid yellow action per screen, the rest outline. */
export const QBTN_PRIMARY =
  'inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-elec-yellow px-5 text-[13.5px] font-bold text-black transition-transform touch-manipulation active:scale-[0.98] disabled:bg-white/[0.08] disabled:text-white';
export const QBTN =
  'inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-white/[0.18] px-4 text-[13px] font-semibold text-white transition-colors touch-manipulation hover:border-white/[0.4] active:scale-[0.98] disabled:opacity-50';

/** A horizontal chip row that scrolls on a phone rather than wrapping. */
export const QCHIP_ROW =
  '-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0 [&::-webkit-scrollbar]:hidden';

export function QualityScreen({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={cn('space-y-8 sm:space-y-10', className)}
    >
      {children}
    </motion.div>
  );
}

/* ── Header ─────────────────────────────────────────────────────────── */

/**
 * The College Hub home's header shape: eyebrow, big title, ONE sentence
 * carrying the key counts, an optional quieter line under it, the "?" help
 * beside the title, and the page's actions on the right (the one primary
 * last, full width under the sentence on a phone).
 */
export function QualityHeader({
  eyebrow,
  title,
  summary,
  sub,
  help,
  actions,
  primary,
}: {
  eyebrow: string;
  title: string;
  summary?: ReactNode;
  sub?: ReactNode;
  help?: PageHelpContent;
  /** Outline actions, shown before the primary. */
  actions?: ReactNode;
  /** The page's one solid yellow action. */
  primary?: ReactNode;
}) {
  const hasRight = !!(actions || primary || help);
  return (
    <motion.header
      variants={itemVariants}
      initial="hidden"
      animate="visible"
      className="grid min-w-0 grid-cols-1 gap-x-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end"
    >
      <div className="min-w-0">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <p className="text-[13px] font-semibold leading-snug text-elec-yellow">{eyebrow}</p>
            <h1 className="mt-2 text-[28px] font-bold leading-[1.1] tracking-tight text-white sm:text-[36px]">
              {title}
            </h1>
          </div>
          {help && <PageHelpButton help={help} className="shrink-0 lg:hidden" />}
        </div>
        {summary && (
          <p className="mt-2 max-w-3xl text-[16px] leading-relaxed text-white">{summary}</p>
        )}
        {sub && <div className="mt-1 max-w-3xl text-[13px] leading-relaxed text-white">{sub}</div>}
      </div>
      {hasRight && (
        <div className="mt-4 flex flex-wrap items-center gap-2 lg:mt-0 lg:flex-nowrap">
          {help && <PageHelpButton help={help} className="hidden shrink-0 lg:inline-flex" />}
          {actions}
          {primary && (
            <div className="w-full sm:w-auto [&>*]:w-full sm:[&>*]:w-auto">{primary}</div>
          )}
        </div>
      )}
    </motion.header>
  );
}

/* ── Panel ──────────────────────────────────────────────────────────── */

/** A titled panel on the landing surface. */
export function QPanel({
  title,
  sub,
  action,
  children,
  className,
}: {
  title?: ReactNode;
  sub?: ReactNode;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.section variants={itemVariants} className={cn(QCARD, className)}>
      {(title || action) && (
        <div className="mb-4 flex items-start justify-between gap-3">
          <div className="min-w-0">
            {title && (
              <h3 className="text-[15px] font-semibold tracking-tight text-white">{title}</h3>
            )}
            {sub && <p className="mt-0.5 text-[12.5px] leading-snug text-white">{sub}</p>}
          </div>
          {action && <div className="-my-2 shrink-0">{action}</div>}
        </div>
      )}
      {children}
    </motion.section>
  );
}

/** A one-line notice on the landing surface (read-only access, a warning). */
export function QNotice({
  tone = 'neutral',
  children,
  action,
}: {
  tone?: 'neutral' | 'warn';
  children: ReactNode;
  action?: ReactNode;
}) {
  return (
    <motion.div
      variants={itemVariants}
      className={cn(
        QCARD,
        'flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between',
        tone === 'warn' && 'sm:!border-orange-400/50 !border-y-orange-400/50'
      )}
    >
      <div className="min-w-0 text-[13.5px] leading-relaxed text-white">{children}</div>
      {action && <div className="shrink-0">{action}</div>}
    </motion.div>
  );
}

/* ── Start something ────────────────────────────────────────────────── */

export interface QuickAction {
  title: string;
  body: string;
  onClick: () => void;
  primary?: boolean;
}

/** "Start something": one solid volt action, the rest quiet cards. */
export function QuickActions({ items }: { items: QuickAction[] }) {
  return (
    <motion.div
      variants={itemVariants}
      className={cn(
        'grid grid-cols-2 items-stretch gap-2 sm:gap-3',
        items.length >= 5
          ? 'lg:grid-cols-5'
          : items.length === 4
            ? 'lg:grid-cols-4'
            : items.length === 3
              ? 'lg:grid-cols-3'
              : ''
      )}
    >
      {items.map((a) => (
        <button
          key={a.title}
          type="button"
          onClick={a.onClick}
          className={cn(
            'min-h-[88px] justify-between p-4 sm:p-5',
            a.primary
              ? 'group relative flex flex-col rounded-2xl border border-elec-yellow bg-elec-yellow text-left text-black transition-opacity touch-manipulation hover:opacity-90'
              : cn(QCARD_INTERACTIVE, 'text-white')
          )}
        >
          {!a.primary && <span aria-hidden className={QTOP_LINE} />}
          <span className="flex w-full items-start justify-between gap-2">
            <span className="text-[14.5px] font-semibold leading-snug">{a.title}</span>
            <ChevronRight
              className={cn(
                'mt-0.5 h-4 w-4 shrink-0 transition-transform group-hover:translate-x-0.5',
                a.primary ? 'text-black' : 'text-white'
              )}
              aria-hidden
            />
          </span>
          <span
            className={cn(
              'mt-2 block text-[12.5px] leading-snug',
              a.primary ? 'text-black' : 'text-white'
            )}
          >
            {a.body}
          </span>
        </button>
      ))}
    </motion.div>
  );
}

/* ── Link cards ─────────────────────────────────────────────────────── */

export interface LinkItem {
  title: string;
  body?: ReactNode;
  /** A short status in words ("4 expired", "Nothing due"), never a bare number. */
  status?: string;
  warn?: boolean;
  onClick: () => void;
}

/** A destination card on the landing surface. */
export function LinkCard({ title, body, status, warn, onClick }: LinkItem) {
  return (
    <motion.button
      variants={itemVariants}
      type="button"
      onClick={onClick}
      className={cn(QCARD_INTERACTIVE, 'w-full p-4 sm:min-h-[104px] sm:p-5')}
    >
      <span aria-hidden className={QTOP_LINE} />
      <span className="flex w-full items-start justify-between gap-3">
        <span className="text-[14.5px] font-semibold leading-snug text-white">{title}</span>
        <ChevronRight
          className="mt-0.5 h-4 w-4 shrink-0 text-white transition-transform group-hover:translate-x-0.5"
          aria-hidden
        />
      </span>
      {status && (
        <span className="mt-2">
          <StatusChip tone={warn ? 'warn' : 'neutral'}>{status}</StatusChip>
        </span>
      )}
      {body && (
        <span className="mt-auto block pt-2 text-[12.5px] leading-snug text-white">{body}</span>
      )}
    </motion.button>
  );
}

/** A titled group of destination cards, level in each row. */
export function LinkGroup({
  title,
  sub,
  items,
  cols,
}: {
  title: string;
  sub?: string;
  items: LinkItem[];
  cols?: 2 | 3 | 4;
}) {
  // Rows always fill: two cards share a row rather than leave a gap.
  const c = cols ?? (items.length <= 2 ? 2 : items.length % 3 === 0 && items.length < 8 ? 3 : 4);
  return (
    <section className="space-y-4">
      <CollegeSectionTitle title={title} sub={sub} />
      <motion.div
        variants={containerVariants}
        className={cn(
          'grid grid-cols-1 items-stretch gap-2 sm:grid-cols-2 sm:gap-3',
          c === 2 ? 'xl:grid-cols-2' : c === 3 ? 'xl:grid-cols-3' : 'xl:grid-cols-4'
        )}
      >
        {items.map((i) => (
          <LinkCard key={i.title} {...i} />
        ))}
      </motion.div>
    </section>
  );
}

/* ── Chips ──────────────────────────────────────────────────────────── */

/** A status chip: border and text only. Green done, orange needs action, neutral otherwise. */
export function StatusChip({
  tone = 'neutral',
  children,
  className,
}: {
  tone?: 'good' | 'warn' | 'neutral';
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        'inline-flex h-6 shrink-0 items-center rounded-full border px-2.5 text-[12px] font-semibold',
        tone === 'good'
          ? 'border-emerald-400/60 text-emerald-300'
          : tone === 'warn'
            ? 'border-orange-400/60 text-orange-300'
            : 'border-white/[0.18] text-white',
        className
      )}
    >
      {children}
    </span>
  );
}

/* ── Work rows ──────────────────────────────────────────────────────── */

export interface WorkRow {
  id: string;
  title: string;
  sub?: ReactNode;
  trailing?: ReactNode;
  /** Behind or late: shown in the trailing text colour, never as a bar. */
  warn?: boolean;
  onClick?: () => void;
}

/** Rows inside the one list surface. */
export function WorkRows({ rows }: { rows: WorkRow[] }) {
  return (
    <motion.ul variants={itemVariants} className={QLIST}>
      {rows.map((r) => {
        const inner = (
          <>
            <span className="min-w-0 flex-1">
              <span className="block text-[14.5px] font-semibold leading-tight text-white sm:truncate">
                {r.title}
              </span>
              {r.sub && (
                <span className="mt-1 block text-[12.5px] leading-snug text-white sm:truncate">
                  {r.sub}
                </span>
              )}
            </span>
            {r.trailing && (
              <span
                className={cn(
                  'shrink-0 text-[13px] font-semibold tabular-nums',
                  r.warn ? 'text-orange-300' : 'text-white'
                )}
              >
                {r.trailing}
              </span>
            )}
            {r.onClick && <ChevronRight className="h-4 w-4 shrink-0 text-white" aria-hidden />}
          </>
        );
        return (
          <li key={r.id}>
            {r.onClick ? (
              <button type="button" onClick={r.onClick} className={QROW}>
                {inner}
              </button>
            ) : (
              <div className="flex min-h-[60px] w-full items-center gap-3 px-4 py-3 sm:px-5">
                {inner}
              </div>
            )}
          </li>
        );
      })}
    </motion.ul>
  );
}

export function QualityLoading() {
  return (
    <div className="flex items-center justify-center py-24">
      <div className="h-6 w-6 animate-spin rounded-full border-2 border-elec-yellow border-t-transparent" />
    </div>
  );
}
