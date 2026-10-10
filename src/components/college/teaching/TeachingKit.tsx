import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { containerVariants, itemVariants } from '@/components/college/primitives';
import { PageHelpButton, type PageHelpContent } from '@/components/hub/PageHelp';
import {
  ActionMenu,
  CHOICE_OFF,
  CHOICE_ON,
  COLLEGE_EYEBROW,
  CollegeSectionTitle,
  JoinedToggle,
  TextTabs,
  choiceCn,
} from '@/components/college/ui/CollegeUi';
import { UsesAi } from '@/components/college/ui/UsesAi';

/* ==========================================================================
   Teaching, curriculum and resources: the building blocks shared by the hub
   pages and sections in this area.

   8 Oct 2026: rebuilt on the language Andrew approved for the College Hub
   home and the lesson plans list (7 Oct):
   - a header like home: eyebrow, big title, ONE sentence carrying the counts,
     the "?" beside the title and the page's one primary action on the right.
     No row of figure tiles repeating the sentence.
   - the landing card surface (card-surface / card-surface-interactive,
     rounded-2xl, hairline border), edge to edge on a phone, with the yellow
     top line on hover only.
   - no decorative coloured left bars on rows; status is a chip coloured by
     border and text only (green done, orange needs action, neutral).
   ========================================================================== */

/* ── Surfaces ─────────────────────────────────────────────────────────── */

/** A tappable card: the landing HubCard surface, edge to edge on a phone. Pair with <TopLine />. */
export const TEACH_CARD =
  'group relative -mx-4 flex h-full flex-col overflow-hidden card-surface-interactive !rounded-none !border-x-0 !border-white/[0.08] text-left transition-colors touch-manipulation hover:!border-white/[0.16] focus-within:!border-white/[0.16] sm:mx-0 sm:!rounded-2xl sm:!border-x';

/** A static panel: edge to edge on a phone, inset and rounded from sm: up. */
export const TEACH_PANEL =
  '-mx-4 overflow-hidden card-surface !rounded-none !border-x-0 !border-white/[0.08] sm:mx-0 sm:!rounded-2xl sm:!border-x';

/** The same panel for a list: rows divided by hairlines. */
export const TEACH_LIST = cn(TEACH_PANEL, 'divide-y divide-white/[0.06]');

/** A tappable row inside TEACH_LIST. */
export const TEACH_ROW =
  'flex min-h-[60px] w-full items-center gap-3 px-4 py-3 text-left transition-colors touch-manipulation hover:bg-white/[0.04] active:bg-white/[0.07] sm:px-5';

/** The landing card's yellow top line, on hover and focus only. */
export function TopLine() {
  return (
    <span
      aria-hidden
      className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-elec-yellow via-amber-400 to-orange-400 opacity-0 transition-opacity duration-200 group-hover:opacity-80 group-focus-within:opacity-80"
    />
  );
}

/** Buttons: one solid yellow per screen; everything else outlined. */
export const TEACH_BTN_PRIMARY =
  'inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-elec-yellow px-5 text-[13.5px] font-bold text-black transition-transform touch-manipulation active:scale-[0.98] disabled:opacity-50';
export const TEACH_BTN =
  'inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-white/[0.18] px-4 text-[13px] font-semibold text-white transition-colors touch-manipulation hover:border-white/[0.4] active:scale-[0.98] disabled:opacity-50';

/* ── Words over numbers ───────────────────────────────────────────────── */

export type Tone = 'done' | 'action' | 'neutral';

/** Status in words, coloured by border and text only. */
export function StatusChip({
  tone = 'neutral',
  children,
  className,
}: {
  tone?: Tone;
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        'inline-flex h-7 shrink-0 items-center whitespace-nowrap rounded-full border px-2.5 text-[12px] font-semibold',
        tone === 'done'
          ? 'border-emerald-400/70 text-emerald-400'
          : tone === 'action'
            ? 'border-orange-400/70 text-orange-400'
            : 'border-white/[0.2] text-white',
        className
      )}
    >
      {children}
    </span>
  );
}

/**
 * Marks a feature that sends something to an AI model: the College Hub's one
 * UsesAi pill (ELE-1929), at this area's 12px minimum and chip height.
 */
export function AiMarker({ className, onYellow }: { className?: string; onYellow?: boolean }) {
  return (
    <UsesAi
      className={cn(
        'h-6 px-2 text-[12px] font-semibold',
        // Inside a solid yellow button: black, so it can be read.
        onYellow && '!border-black/30 !text-black [&_svg]:!text-black',
        className
      )}
    />
  );
}

export const plural = (n: number, one: string, many = `${one}s`) => `${n} ${n === 1 ? one : many}`;

/* ── Screen and header ────────────────────────────────────────────────── */

/** Wraps a screen's blocks with the hub's vertical rhythm and stagger. */
export function TeachingScreen({
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

/**
 * The College Hub home's header: eyebrow, title with the "?" beside it, one
 * sentence that carries the counts, an optional quiet second line, and the
 * page's actions on the right (full width under the sentence on a phone).
 */
export function TeachingHeader({
  eyebrow,
  title,
  summary,
  sub,
  help,
  actions,
}: {
  eyebrow: string;
  title: ReactNode;
  summary?: ReactNode;
  sub?: ReactNode;
  help: PageHelpContent;
  actions?: ReactNode;
}) {
  return (
    <motion.header
      variants={itemVariants}
      initial="hidden"
      animate="visible"
      className="grid min-w-0 grid-cols-1 gap-x-6 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end"
    >
      <div className="min-w-0">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <p className={COLLEGE_EYEBROW}>{eyebrow}</p>
            <h1 className="mt-2 break-words text-[28px] font-bold leading-[1.1] tracking-tight text-white sm:text-[36px]">
              {title}
            </h1>
          </div>
          <PageHelpButton help={help} className="shrink-0 sm:hidden" />
        </div>
        {summary && (
          <p className="mt-2 max-w-3xl text-[16px] leading-relaxed text-white">{summary}</p>
        )}
        {sub && <p className="mt-1 text-[13px] text-white">{sub}</p>}
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-2 sm:mt-0 sm:flex-nowrap">
        <PageHelpButton help={help} className="hidden shrink-0 sm:inline-flex" />
        {actions}
      </div>
    </motion.header>
  );
}

/* ── Start something / destinations ───────────────────────────────────── */

export interface QuickAction {
  title: string;
  body: string;
  onClick: () => void;
  primary?: boolean;
  ai?: boolean;
}

/** "Start something": one solid yellow action, the rest as landing cards. */
export function QuickActions({ items }: { items: QuickAction[] }) {
  return (
    <motion.div
      variants={itemVariants}
      className={cn(
        'grid grid-cols-1 items-stretch gap-3 sm:grid-cols-2',
        items.length >= 4 ? 'lg:grid-cols-4' : items.length === 3 ? 'lg:grid-cols-3' : ''
      )}
    >
      {items.map((a) =>
        a.primary ? (
          <button
            key={a.title}
            type="button"
            onClick={a.onClick}
            className="group flex h-full min-h-[88px] flex-col justify-between rounded-2xl border border-elec-yellow bg-elec-yellow p-4 text-left text-black transition-opacity touch-manipulation hover:opacity-90 sm:p-5"
          >
            <span className="flex w-full items-start justify-between gap-2">
              <span className="text-[14.5px] font-bold leading-snug">{a.title}</span>
              <ChevronRight className="mt-0.5 h-4 w-4 shrink-0 text-black" aria-hidden />
            </span>
            <span className="mt-2 block text-[12.5px] leading-snug text-black">{a.body}</span>
          </button>
        ) : (
          <button
            key={a.title}
            type="button"
            onClick={a.onClick}
            className={cn(TEACH_CARD, 'min-h-[88px] justify-between p-4 sm:p-5')}
          >
            <TopLine />
            <span className="flex w-full items-start justify-between gap-2">
              <span className="text-[14.5px] font-semibold leading-snug text-white">{a.title}</span>
              <ChevronRight
                className="mt-0.5 h-4 w-4 shrink-0 text-white transition-transform group-hover:translate-x-0.5"
                aria-hidden
              />
            </span>
            <span className="mt-2 flex items-end justify-between gap-2">
              <span className="block text-[12.5px] leading-snug text-white">{a.body}</span>
              {a.ai && <AiMarker />}
            </span>
          </button>
        )
      )}
    </motion.div>
  );
}

export interface LinkItem {
  title: string;
  body?: ReactNode;
  /** A short status in words ("9 drafts"), shown as a chip. */
  status?: { label: string; tone?: Tone };
  ai?: boolean;
  onClick: () => void;
}

/** A titled group of destination cards, level in each row. */
export function LinkGroup({
  title,
  sub,
  items,
}: {
  title: string;
  sub?: string;
  items: LinkItem[];
}) {
  return (
    <section className="space-y-4">
      <CollegeSectionTitle title={title} sub={sub} />
      <motion.div
        variants={containerVariants}
        className={cn(
          'grid grid-cols-1 items-stretch gap-3 sm:grid-cols-2',
          items.length >= 4 ? 'xl:grid-cols-4' : items.length === 3 ? 'xl:grid-cols-3' : ''
        )}
      >
        {items.map((i) => (
          <motion.button
            key={i.title}
            variants={itemVariants}
            type="button"
            onClick={i.onClick}
            className={cn(TEACH_CARD, 'p-4 sm:min-h-[112px] sm:p-5')}
          >
            <TopLine />
            <span className="flex w-full items-start justify-between gap-3">
              <span className="text-[14.5px] font-semibold leading-snug text-white">{i.title}</span>
              <ChevronRight
                className="mt-0.5 h-4 w-4 shrink-0 text-white transition-transform group-hover:translate-x-0.5"
                aria-hidden
              />
            </span>
            {i.body && (
              <span className="mt-1.5 block text-[12.5px] leading-snug text-white">{i.body}</span>
            )}
            {(i.status || i.ai) && (
              <span className="mt-auto flex flex-wrap items-center gap-2 pt-3">
                {i.status && <StatusChip tone={i.status.tone}>{i.status.label}</StatusChip>}
                {i.ai && <AiMarker />}
              </span>
            )}
          </motion.button>
        ))}
      </motion.div>
    </section>
  );
}

/* ── Rows ─────────────────────────────────────────────────────────────── */

export interface WorkRow {
  id: string;
  title: string;
  sub?: ReactNode;
  /** Right-hand text, e.g. a date. */
  trailing?: ReactNode;
  /** Status in words, as a chip. */
  status?: { label: string; tone?: Tone };
  onClick?: () => void;
}

/** A list of rows inside the one list surface. */
export function WorkRows({ rows }: { rows: WorkRow[] }) {
  return (
    <motion.ul variants={itemVariants} className={TEACH_LIST}>
      {rows.map((r) => {
        const inner = (
          <>
            {/* Phone: the title wraps to two lines and the chip sits under
                the text, so nothing that carries meaning is cut off. */}
            <span className="min-w-0 flex-1">
              <span className="line-clamp-2 text-[14.5px] font-semibold leading-tight text-white sm:line-clamp-1">
                {r.title}
              </span>
              {r.sub && (
                <span className="mt-1 line-clamp-2 text-[12.5px] leading-tight text-white sm:line-clamp-1">
                  {r.sub}
                </span>
              )}
              {r.status && (
                <StatusChip tone={r.status.tone} className="mt-1.5 sm:hidden">
                  {r.status.label}
                </StatusChip>
              )}
            </span>
            {r.status && (
              <StatusChip tone={r.status.tone} className="hidden sm:inline-flex">
                {r.status.label}
              </StatusChip>
            )}
            {r.trailing && (
              <span className="shrink-0 text-right text-[12.5px] font-medium text-white">
                {r.trailing}
              </span>
            )}
            {r.onClick && <ChevronRight className="h-4 w-4 shrink-0 text-white" aria-hidden />}
          </>
        );
        return (
          <li key={r.id}>
            {r.onClick ? (
              <button type="button" onClick={r.onClick} className={TEACH_ROW}>
                {inner}
              </button>
            ) : (
              <div className={cn(TEACH_ROW, 'hover:bg-transparent active:bg-transparent')}>
                {inner}
              </div>
            )}
          </li>
        );
      })}
    </motion.ul>
  );
}

/** An honest empty state on the panel surface. */
export function TeachingEmpty({
  title,
  body,
  action,
}: {
  title: string;
  body?: ReactNode;
  action?: ReactNode;
}) {
  return (
    <div
      className={cn(
        TEACH_PANEL,
        'flex flex-col items-start gap-3 p-5 sm:items-center sm:px-8 sm:py-10 sm:text-center'
      )}
    >
      <p className="text-[15px] font-semibold text-white">{title}</p>
      {body && <p className="max-w-xl text-[13.5px] leading-relaxed text-white">{body}</p>}
      {action}
    </div>
  );
}

/** Spinner used while a screen's first data arrives. */
export function TeachingLoading() {
  return (
    <div className="flex items-center justify-center py-24">
      <div className="h-6 w-6 animate-spin rounded-full border-2 border-elec-yellow border-t-transparent" />
    </div>
  );
}

/* ── Choice controls and menus: the College Hub kit ─────────────────────
   10 Oct 2026: TeachToggle, TeachTabs, TeachMenu and choiceCn are now thin
   adapters over the one kit in CollegeUi.tsx (JoinedToggle, TextTabs,
   ActionMenu, choiceCn). Same props, roles and behaviour as before. */

/**
 * A choice of 2 to 4 as one joined control (Andrew, 10 Oct): rounded-xl
 * border, chosen option white. Scrolls sideways on a phone if the labels run
 * long, never wraps to two rows.
 */
export function TeachToggle<T extends string>({
  value,
  options,
  onChange,
  label,
  className,
}: {
  value: T;
  options: { value: NoInfer<T>; label: ReactNode }[];
  onChange: (v: NoInfer<T>) => void;
  label: string;
  className?: string;
}) {
  return (
    <JoinedToggle<T>
      options={options.map((o) => ({ key: o.value, label: o.label }))}
      value={value}
      onChange={onChange}
      label={label}
      className={cn('shrink-0', className)}
    />
  );
}

/**
 * Filters over a list: quiet text tabs with counts and a yellow underline,
 * the "Needs you" shape on the College Hub home. Not pills.
 */
export function TeachTabs<T extends string>({
  value,
  tabs,
  onChange,
  label,
  className,
}: {
  value: T;
  tabs: { value: NoInfer<T>; label: ReactNode; count?: number }[];
  onChange: (v: NoInfer<T>) => void;
  label: string;
  className?: string;
}) {
  return (
    <TextTabs<T>
      items={tabs.map((t) => ({ key: t.value, label: t.label, count: t.count }))}
      value={value}
      onChange={onChange}
      label={label}
      asTabs
      className={className}
    />
  );
}

export interface TeachMenuItem {
  label: string;
  onClick: () => void;
  destructive?: boolean;
  disabled?: boolean;
}

/**
 * A "More" menu: a bottom sheet on a phone (thumb reach, Android back closes
 * it), a dropdown from md: up. `trigger` must be a single button element.
 */
export function TeachMenu({
  title,
  items,
  trigger,
}: {
  title: string;
  items: TeachMenuItem[];
  trigger: (props: { onClick?: () => void }) => ReactNode;
}) {
  return (
    <ActionMenu
      title={title}
      trigger={trigger}
      items={items.map((m, i) => ({
        label: m.label,
        onSelect: m.onClick,
        disabled: m.disabled,
        tone: m.destructive ? 'danger' : undefined,
        separated: !!m.destructive && i > 0,
      }))}
    />
  );
}

/** A pick-one (or pick-some) chip in a sheet; the chosen one white. From the kit. */
export { choiceCn, CHOICE_ON, CHOICE_OFF };
