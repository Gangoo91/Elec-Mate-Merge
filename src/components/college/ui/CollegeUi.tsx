import { useEffect, useState, type ReactNode } from 'react';
import { motion } from 'framer-motion';
import { Check, ChevronDown, ChevronRight, MoreHorizontal } from 'lucide-react';
import { cn } from '@/lib/utils';
import { itemVariants } from '@/components/college/primitives';
import { PageHelpButton, type PageHelpContent } from '@/components/hub/PageHelp';
import { Sheet, SheetContent, SheetDescription, SheetTitle } from '@/components/ui/sheet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

/* ==========================================================================
   College Hub design kit (7 Oct 2026). Andrew: "everything in the college hub
   needs to be done and redesigned". Every College Hub screen is built from
   these, so the whole hub reads as one product:

   - Ground: the page sits on the landing background (HubPage ground="landing").
   - Cards: the landing-page surface (card-surface), rounded-2xl, hairline
     border, edge to edge on a phone (8 Oct 2026; was a rounded-3xl gradient).
     Edge to edge on phones, inset from sm: up.
   - Headings: white, typography only. Yellow is for the one action or the
     one number that matters, never for section labels.
   - Desktop is always wide: grids, not a narrow centred column.
   - Every page explains itself: a "?" in the header (PageHelp).
   - All text is white. Orange means behind or late; green means done.
   ========================================================================== */

/**
 * The one card surface. Use for every panel on a College Hub screen.
 * `.card-surface` is a custom utility emitted after Tailwind's own, so its
 * 16px radius and side borders beat plain `rounded-none` / `border-x-0`;
 * the phone-only overrides need `!` to go edge to edge.
 */
export const COLLEGE_CARD =
  '-mx-4 card-surface max-sm:!rounded-none max-sm:!border-x-0 p-5 sm:mx-0 sm:rounded-2xl sm:border-x sm:p-6';

/** The same surface for a list: no padding, rows divided by hairlines. */
export const COLLEGE_LIST =
  '-mx-4 overflow-hidden card-surface max-sm:!rounded-none max-sm:!border-x-0 divide-y divide-white/[0.06] sm:mx-0 sm:rounded-2xl sm:border-x';

/** A tappable row inside COLLEGE_LIST. */
export const COLLEGE_ROW =
  'flex min-h-[60px] w-full items-center gap-3 px-5 py-3 text-left transition-colors touch-manipulation hover:bg-white/[0.04] active:bg-white/[0.07] sm:px-6';

/** Buttons. Primary is the one solid volt action on a screen. */
export const COLLEGE_BTN_PRIMARY =
  'inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-elec-yellow px-4 text-[13.5px] font-semibold text-black transition-opacity touch-manipulation hover:opacity-90 disabled:cursor-not-allowed disabled:bg-white/[0.08] disabled:text-white disabled:hover:opacity-100';
export const COLLEGE_BTN =
  'inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-white/[0.14] px-4 text-[13.5px] font-semibold text-white transition-colors touch-manipulation hover:border-elec-yellow disabled:opacity-40';
export const COLLEGE_LINK =
  'inline-flex h-11 items-center px-1 text-[13px] font-semibold text-elec-yellow touch-manipulation';

/**
 * Chips for 2–6 choices (filters, tabs). 44px, gloved-thumb size (ELE-1891).
 * The chosen chip is white, not solid yellow (10 Oct): yellow is kept for the
 * one action on a screen, and white matches the joined toggles.
 */
export const chipCn = (on: boolean) =>
  cn(
    'h-11 shrink-0 rounded-full border px-3.5 text-[12.5px] transition-colors touch-manipulation',
    on
      ? 'border-white bg-white font-semibold text-black'
      : 'border-white/[0.12] bg-white/[0.06] font-medium text-white hover:border-white/[0.3]'
  );

/**
 * The page eyebrow: 13px, sentence case, no letter-spacing (10 Oct). Spaced
 * capitals read as generated and were the phone audit's most common flag.
 */
export const COLLEGE_EYEBROW = 'text-[13px] font-semibold leading-snug text-elec-yellow';

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
          {/* Sentence case (10 Oct): spaced capitals read as generated. */}
          {eyebrow && <p className={COLLEGE_EYEBROW}>{eyebrow}</p>}
          {help && <PageHelpButton help={help} className="-mt-2 lg:hidden" />}
        </div>
        <h1
          className={cn(
            'text-[26px] font-bold leading-tight tracking-tight text-white sm:text-[32px]',
            eyebrow && 'mt-1.5'
          )}
        >
          {title}
        </h1>
        {description && (
          <p className="mt-2 max-w-3xl text-[14.5px] leading-relaxed text-white">{description}</p>
        )}
      </div>
      {(actions || help) && (
        // Phone (10 Oct): the actions wrap below the title and share the
        // width; the one solid yellow action takes a whole row.
        <div className="flex shrink-0 flex-wrap items-center gap-2 max-sm:w-full max-sm:[&>*]:flex-1 max-sm:[&>.bg-elec-yellow]:basis-full">
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
    <motion.h2
      variants={itemVariants}
      className="text-[17px] font-semibold tracking-tight text-white"
    >
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
      className={cn(
        'grid grid-cols-2 gap-3',
        items.length >= 4 ? 'lg:grid-cols-4' : items.length === 3 ? 'lg:grid-cols-3' : '',
        className
      )}
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
          'block card-surface rounded-2xl px-4 py-3.5 text-left',
          s.warn && 'border-orange-400/40'
        );
        return s.onClick ? (
          <button
            key={s.label}
            type="button"
            onClick={s.onClick}
            className={cn(cls, 'touch-manipulation transition-colors hover:border-white/[0.2]')}
          >
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
    // Left-aligned and full width at every size (10 Oct): no narrow centred
    // block in a wide page.
    <div className={cn(COLLEGE_CARD, 'flex flex-col items-start gap-3 text-left sm:py-8')}>
      <p className="text-[15px] font-semibold text-white">{title}</p>
      {body && <p className="text-[13.5px] leading-relaxed text-white">{body}</p>}
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
        // Edge to edge on phones like COLLEGE_CARD; the explicit width (not w-full)
        // lets it span the gutters in both a grid track and plain block flow.
        '-mx-4 group flex min-h-[112px] w-[calc(100%+2rem)] flex-col card-surface-interactive max-sm:!rounded-none max-sm:!border-x-0 p-5 text-left touch-manipulation',
        'sm:mx-0 sm:w-full sm:rounded-2xl sm:border-x',
        warn && 'border-orange-400/40'
      )}
    >
      <span className="flex w-full items-start justify-between gap-3">
        <span className="text-[14.5px] font-semibold leading-snug text-white">{title}</span>
        <ChevronRight
          className="mt-0.5 h-4 w-4 shrink-0 text-white transition-transform group-hover:translate-x-0.5 group-hover:text-elec-yellow"
          aria-hidden
        />
      </span>
      {figure && (
        <span
          className={cn(
            'mt-3 text-[26px] font-bold leading-none tabular-nums',
            warn ? 'text-orange-400' : 'text-white'
          )}
        >
          {figure}
        </span>
      )}
      {body && (
        <span className="mt-auto block pt-2 text-[12.5px] leading-snug text-white">{body}</span>
      )}
    </motion.button>
  );
}

/* ==========================================================================
   Choice and menu controls (10 Oct 2026). One canonical version of each,
   consolidated from the six area copies (hours, quality, assessment,
   teaching, people). The area files re-export these, so their imports keep
   working. Design language (docs/college-mobile-standard.md):

   - TextTabs       filters over a list: quiet text tabs with counts and a
                    yellow underline, a sideways rail on a phone. Not pills.
   - JoinedToggle   a choice of 2 to 4: one rounded box, the chosen option
                    white (or its verdict colour).
   - TileGrid       a pick from many or long-named options: equal outlined
                    tiles, one column on a small phone, the chosen tile white.
   - FilterSheetButton  one button that says what is chosen and opens a
                    bottom sheet of options (standard rule 10).
   - ActionMenu     a row's "more" menu: a dropdown on a computer, a bottom
                    sheet of 52 px rows on a phone (rule 7).
   - ActionSheet    a short list of actions as a bottom sheet sized to its
                    content.
   - CollegeSheet   the handle, title and scrolling body those sheets share.
   ========================================================================== */

/**
 * How a set of choices is announced:
 *   pressed  a group of toggle buttons (aria-pressed): filters
 *   tabs     a tablist (role=tab, aria-selected): each choice swaps the panel
 *   radio    a radiogroup (role=radio, aria-checked): a single setting
 */
export type ChoiceSemantics = 'pressed' | 'tabs' | 'radio';

function choiceAria(semantics: ChoiceSemantics, on: boolean) {
  if (semantics === 'tabs') return { role: 'tab' as const, 'aria-selected': on };
  if (semantics === 'radio') return { role: 'radio' as const, 'aria-checked': on };
  return { 'aria-pressed': on };
}
const GROUP_ROLE: Record<ChoiceSemantics, 'group' | 'tablist' | 'radiogroup'> = {
  pressed: 'group',
  tabs: 'tablist',
  radio: 'radiogroup',
};

/** True below `md` (a phone), where menus become bottom sheets. */
export function useNarrow(query = '(max-width: 767px)') {
  const [narrow, setNarrow] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(query).matches
  );
  useEffect(() => {
    const mql = window.matchMedia(query);
    const on = () => setNarrow(mql.matches);
    on();
    mql.addEventListener('change', on);
    return () => mql.removeEventListener('change', on);
  }, [query]);
  return narrow;
}

/* ── Text tabs ──────────────────────────────────────────────────────── */

/** The rail behind TextTabs: edge to edge on a phone, scrolls sideways, no scrollbar. */
export const TEXT_TAB_RAIL =
  '-mx-4 flex overflow-x-auto border-b border-white/[0.08] px-2 [scrollbar-width:none] sm:mx-0 sm:px-0 [&::-webkit-scrollbar]:hidden';
const TEXT_TAB_RAIL_INSET =
  'flex overflow-x-auto border-b border-white/[0.08] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden';

/** One text tab, for lists that build their own (keep the rail and TabMark with it). */
export const textTabCn = (on: boolean) =>
  cn(
    'relative inline-flex h-12 shrink-0 items-center gap-1.5 whitespace-nowrap px-3 text-[13.5px] text-white transition-colors touch-manipulation active:bg-white/[0.05]',
    on ? 'font-semibold' : 'font-medium hover:text-elec-yellow'
  );

/** The yellow underline under the chosen text tab. */
export function TabMark({ on }: { on: boolean }) {
  return (
    <span
      aria-hidden
      className={cn(
        'absolute inset-x-3 bottom-0 h-[2px] rounded-full',
        on ? 'bg-elec-yellow' : 'bg-transparent'
      )}
    />
  );
}

export interface TextTabItem<K extends string> {
  key: K;
  label: ReactNode;
  count?: number | null;
  /** Orange count: something is overdue or missing behind this tab. */
  warn?: boolean;
  /** Read to screen readers when the label alone is not enough. */
  ariaLabel?: string;
}

/**
 * Quiet text tabs with counts and a yellow underline: the "Needs you" tabs on
 * the College Hub home. 48 px tall, one sideways rail on a phone.
 */
export function TextTabs<K extends string>({
  items,
  value,
  onChange,
  label,
  asTabs = false,
  bleed = true,
  className,
}: {
  items: TextTabItem<NoInfer<K>>[];
  value: K;
  onChange: (key: NoInfer<K>) => void;
  /** The group's accessible name. */
  label: string;
  /** True when each tab swaps the panel below (role=tablist/tab), not a filter. */
  asTabs?: boolean;
  /** Run edge to edge on a phone. Off inside a padded card. */
  bleed?: boolean;
  className?: string;
}) {
  const semantics: ChoiceSemantics = asTabs ? 'tabs' : 'pressed';
  return (
    <div
      role={GROUP_ROLE[semantics]}
      aria-label={label}
      className={cn(bleed ? TEXT_TAB_RAIL : TEXT_TAB_RAIL_INSET, className)}
    >
      {items.map((t) => {
        const on = t.key === value;
        return (
          <button
            key={t.key}
            type="button"
            {...choiceAria(semantics, on)}
            aria-label={t.ariaLabel}
            onClick={() => onChange(t.key)}
            className={textTabCn(on)}
          >
            {t.label}
            {t.count != null && (
              <span className={cn('tabular-nums', t.warn && t.count > 0 && 'text-orange-300')}>
                {t.count}
              </span>
            )}
            <TabMark on={on} />
          </button>
        );
      })}
    </div>
  );
}

/* ── Joined toggle ──────────────────────────────────────────────────── */

export interface ToggleOption<K> {
  key: K;
  label: ReactNode;
  count?: number | null;
  ariaLabel?: string;
  disabled?: boolean;
  /** A verdict-style choice takes its colour when chosen instead of white. */
  tone?: 'good' | 'warn' | 'bad';
}

const TONE_ON: Record<NonNullable<ToggleOption<string>['tone']>, string> = {
  good: 'bg-emerald-500 text-black',
  warn: 'bg-orange-400 text-black',
  bad: 'bg-red-500 text-white',
};

/**
 * A choice of 2 to 4 as one joined control (QuickRegisterSheet's
 * morning/afternoon): rounded-xl border, p-0.5, the chosen option white on
 * black. Options are 44 px tall.
 *
 * `fit`:  auto   sized to the labels; scrolls sideways if they run long
 *         fill   fills the width, options share it equally
 *         phone  fills the width on a phone, sized to the labels from sm: up
 * `wrap`: long labels wrap to two lines instead of being cut (fill / phone).
 */
export function JoinedToggle<K extends string | number | null>({
  options,
  value,
  onChange,
  label,
  semantics = 'pressed',
  fit = 'auto',
  wrap = false,
  className,
}: {
  options: ToggleOption<NoInfer<K>>[];
  value: K | null;
  onChange: (key: NoInfer<K>) => void;
  label: string;
  semantics?: Exclude<ChoiceSemantics, 'tabs'>;
  fit?: 'auto' | 'fill' | 'phone';
  wrap?: boolean;
  className?: string;
}) {
  return (
    <div
      role={GROUP_ROLE[semantics]}
      aria-label={label}
      className={cn(
        'rounded-xl border border-white/[0.14] p-0.5',
        fit === 'auto' &&
          'inline-flex max-w-full overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
        fit === 'fill' && 'flex w-full',
        fit === 'phone' && 'flex w-full sm:inline-flex sm:w-auto',
        className
      )}
    >
      {options.map((o) => {
        const on = o.key === value;
        return (
          <button
            key={String(o.key)}
            type="button"
            {...choiceAria(semantics, on)}
            aria-label={o.ariaLabel}
            disabled={o.disabled}
            onClick={() => onChange(o.key)}
            className={cn(
              'inline-flex items-center justify-center gap-1.5 rounded-[10px] px-3 text-[13px] font-semibold transition-colors touch-manipulation disabled:opacity-40',
              wrap ? 'min-h-11 py-1 text-center leading-tight' : 'h-11 whitespace-nowrap',
              fit === 'auto' && 'shrink-0 sm:px-4',
              fit === 'fill' && 'min-w-0 flex-1',
              fit === 'phone' && 'min-w-0 flex-1 sm:flex-none sm:px-4',
              on
                ? (o.tone && TONE_ON[o.tone]) || 'bg-white text-black'
                : 'text-white hover:bg-white/[0.06] active:bg-white/[0.08]'
            )}
          >
            {fit === 'fill' && !wrap ? <span className="truncate">{o.label}</span> : o.label}
            {o.count != null && <span className="tabular-nums">{o.count}</span>}
          </button>
        );
      })}
    </div>
  );
}

/* ── Choice chips and tiles ─────────────────────────────────────────── */

/**
 * A squared choice chip inside a sheet, the chosen one white. Yellow stays
 * for the sheet's one action. Use JoinedToggle for a choice of 2 to 4.
 */
export const CHOICE_ON = 'border-white bg-white font-semibold text-black';
export const CHOICE_OFF = 'border-white/[0.14] bg-transparent font-medium text-white';
export const choiceCn = (on: boolean) =>
  cn(
    'inline-flex h-11 shrink-0 items-center justify-center whitespace-nowrap rounded-xl border px-3.5 text-[13px] transition-colors touch-manipulation',
    on
      ? 'border-white bg-white font-semibold text-black'
      : 'border-white/[0.14] font-medium text-white hover:border-white/[0.3] active:bg-white/[0.06]'
  );

export interface TileOption<K extends string> {
  key: K;
  label: ReactNode;
  /** One short line under the label (a count, a date). */
  sub?: ReactNode;
  disabled?: boolean;
}

/**
 * Equal tiles for a pick from many (or long-named) options. One column on a
 * small phone, two from 400 px, three on a computer. `selected` is the chosen
 * key, or the chosen keys when `multiple`.
 */
export function TileGrid<K extends string>({
  options,
  selected,
  onToggle,
  label,
  multiple = false,
  className,
}: {
  options: TileOption<K>[];
  selected: K | K[] | null;
  onToggle: (key: K) => void;
  label: string;
  multiple?: boolean;
  className?: string;
}) {
  const isOn = (k: K) => (Array.isArray(selected) ? selected.includes(k) : selected === k);
  return (
    <div
      role="group"
      aria-label={label}
      className={cn('grid grid-cols-1 gap-2 min-[400px]:grid-cols-2 lg:grid-cols-3', className)}
    >
      {options.map((o) => {
        const on = isOn(o.key);
        return (
          <button
            key={o.key}
            type="button"
            aria-pressed={on}
            disabled={o.disabled}
            onClick={() => onToggle(o.key)}
            className={cn(
              'flex min-h-[52px] w-full items-center gap-3 rounded-xl border px-3.5 py-2.5 text-left transition-colors touch-manipulation disabled:opacity-40',
              on
                ? 'border-white bg-white text-black'
                : 'border-white/[0.14] text-white hover:border-white/[0.3] active:bg-white/[0.06]'
            )}
          >
            <span
              aria-hidden
              className={cn(
                'flex h-5 w-5 shrink-0 items-center justify-center border',
                multiple ? 'rounded-md' : 'rounded-full',
                on ? 'border-black bg-black text-white' : 'border-white/[0.4]'
              )}
            >
              {on && <Check className="h-3.5 w-3.5" strokeWidth={2.5} />}
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-[13.5px] font-semibold leading-snug">{o.label}</span>
              {o.sub && (
                <span
                  className={cn(
                    'mt-0.5 block text-[12.5px] leading-snug',
                    on ? 'text-black' : 'text-white'
                  )}
                >
                  {o.sub}
                </span>
              )}
            </span>
          </button>
        );
      })}
    </div>
  );
}

/* ── Sheets and menus ───────────────────────────────────────────────── */

/**
 * The bottom sheet every kit control opens: handle, title, one scrolling
 * body, clear of the home indicator. Radix, so Android back closes it.
 */
export function CollegeSheet({
  open,
  onOpenChange,
  title,
  description,
  children,
  className,
}: {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  title: string;
  description?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        className={cn(
          'flex max-h-[88dvh] flex-col gap-0 rounded-t-2xl border-white/[0.08] bg-[hsl(0_0%_8%)] p-0 pb-[env(safe-area-inset-bottom)] lg:mx-auto lg:max-w-2xl',
          className
        )}
      >
        <div
          aria-hidden
          className="mx-auto mt-2.5 h-1 w-10 shrink-0 rounded-full bg-white/[0.25]"
        />
        <div className="shrink-0 px-5 pb-2 pr-14 pt-3">
          <SheetTitle className="line-clamp-2 text-left text-[17px] font-semibold leading-snug text-white">
            {title}
          </SheetTitle>
          {description ? (
            <SheetDescription className="mt-0.5 text-left text-[13px] text-white">
              {description}
            </SheetDescription>
          ) : (
            <SheetDescription className="sr-only">{title}</SheetDescription>
          )}
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain pb-3">{children}</div>
      </SheetContent>
    </Sheet>
  );
}

export interface ActionItem {
  label: string;
  onSelect: () => void;
  /** danger: deletes or removes (red). warn: undoes or sends work back (orange). */
  tone?: 'danger' | 'warn';
  disabled?: boolean;
  /** A hairline above this item. */
  separated?: boolean;
}

const actionToneCn = (tone?: ActionItem['tone']) =>
  tone === 'danger' ? 'text-red-300' : tone === 'warn' ? 'text-orange-400' : 'text-white';

/** The rows of an ActionSheet. `asMenu` announces them as a menu. */
function ActionRows({
  title,
  items,
  asMenu,
  close,
}: {
  title: string;
  items: ActionItem[];
  asMenu: boolean;
  close: () => void;
}) {
  return (
    <ul role={asMenu ? 'menu' : undefined} aria-label={asMenu ? title : undefined}>
      {items.map((m) => (
        <li
          key={m.label}
          role={asMenu ? 'none' : undefined}
          className={cn(m.separated && 'mt-1 border-t border-white/[0.08] pt-1')}
        >
          <button
            type="button"
            role={asMenu ? 'menuitem' : undefined}
            disabled={m.disabled}
            onClick={() => {
              close();
              m.onSelect();
            }}
            className={cn(
              'flex min-h-[52px] w-full items-center px-5 text-left text-[15px] font-medium transition-colors touch-manipulation hover:bg-white/[0.04] active:bg-white/[0.07] disabled:opacity-40',
              actionToneCn(m.tone)
            )}
          >
            {m.label}
          </button>
        </li>
      ))}
    </ul>
  );
}

/** A short list of actions as a bottom sheet sized to its content. */
export function ActionSheet({
  open,
  onOpenChange,
  title,
  description,
  items,
  asMenu = false,
}: {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  title: string;
  description?: ReactNode;
  items: ActionItem[];
  /** Announce the rows as a menu (role=menu / menuitem). */
  asMenu?: boolean;
}) {
  return (
    <CollegeSheet open={open} onOpenChange={onOpenChange} title={title} description={description}>
      <ActionRows title={title} items={items} asMenu={asMenu} close={() => onOpenChange(false)} />
    </CollegeSheet>
  );
}

/**
 * A "more" menu for a row or a page. A dropdown from `md:` up; on a phone a
 * bottom sheet of 52 px rows titled with what it acts on (rule 7). `trigger`
 * renders one button element and must spread the props it is given; leave it
 * out for the standard ⋯ icon button (44 px, named by `triggerLabel`).
 */
export function ActionMenu({
  title,
  items,
  trigger,
  triggerLabel,
  align = 'end',
}: {
  title: string;
  items: ActionItem[];
  trigger?: (props: { onClick?: () => void }) => ReactNode;
  /** The ⋯ button's accessible name; defaults to "More actions for <title>". */
  triggerLabel?: string;
  align?: 'start' | 'end';
}) {
  const narrow = useNarrow();
  const [open, setOpen] = useState(false);
  const renderTrigger = (props: { onClick?: () => void }) =>
    trigger ? (
      trigger(props)
    ) : (
      <button
        type="button"
        aria-label={triggerLabel ?? `More actions for ${title}`}
        {...props}
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-white transition-colors touch-manipulation hover:bg-white/[0.06] active:bg-white/[0.1]"
      >
        <MoreHorizontal className="h-5 w-5" strokeWidth={1.5} aria-hidden />
      </button>
    );

  if (narrow) {
    return (
      <>
        {renderTrigger({ onClick: () => setOpen(true) })}
        <CollegeSheet open={open} onOpenChange={setOpen} title={title}>
          <ActionRows title={title} items={items} asMenu close={() => setOpen(false)} />
        </CollegeSheet>
      </>
    );
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{renderTrigger({})}</DropdownMenuTrigger>
      <DropdownMenuContent align={align} className="min-w-[220px]">
        {items.map((m) => (
          <div key={m.label}>
            {m.separated && <DropdownMenuSeparator />}
            <DropdownMenuItem
              disabled={m.disabled}
              className={cn(
                'h-11 touch-manipulation',
                actionToneCn(m.tone),
                m.tone === 'danger' && 'focus:text-red-200',
                m.tone === 'warn' && 'focus:text-orange-300'
              )}
              onClick={m.onSelect}
            >
              {m.label}
            </DropdownMenuItem>
          </div>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

/* ── Filter sheet button ────────────────────────────────────────────── */

export interface FilterOption<K extends string> {
  key: K;
  label: string;
  count?: number;
}

/**
 * A choice from more than a few options (a cohort, a tutor) as one button
 * that says what is chosen and opens a bottom sheet of rows. Standard rule 10:
 * never a row of selects or pills.
 */
export function FilterSheetButton<K extends string>({
  label,
  options,
  value,
  onChange,
  className,
}: {
  label: string;
  options: FilterOption<NoInfer<K>>[];
  value: K;
  onChange: (key: NoInfer<K>) => void;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const current = options.find((o) => o.key === value) ?? options[0];
  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        className={cn(
          'inline-flex h-11 max-w-full items-center gap-2 rounded-xl border border-white/[0.14] px-3.5 text-[13.5px] text-white transition-colors touch-manipulation hover:border-white/[0.3] active:bg-white/[0.05]',
          className
        )}
      >
        <span className="shrink-0 font-medium">{label}</span>
        <span className="min-w-0 truncate font-semibold">{current?.label}</span>
        <ChevronDown className="h-4 w-4 shrink-0" strokeWidth={1.5} aria-hidden />
      </button>
      <CollegeSheet open={open} onOpenChange={setOpen} title={label}>
        <ul className="divide-y divide-white/[0.06]">
          {options.map((o) => {
            const on = o.key === value;
            return (
              <li key={o.key}>
                <button
                  type="button"
                  onClick={() => {
                    onChange(o.key);
                    setOpen(false);
                  }}
                  aria-pressed={on}
                  className="flex min-h-[52px] w-full items-center gap-3 px-5 py-2 text-left text-[15px] text-white transition-colors touch-manipulation hover:bg-white/[0.04] active:bg-white/[0.07]"
                >
                  <span className={cn('min-w-0 flex-1', on ? 'font-semibold' : 'font-medium')}>
                    {o.label}
                  </span>
                  {typeof o.count === 'number' && (
                    <span className="shrink-0 text-[13px] tabular-nums">{o.count}</span>
                  )}
                  <Check
                    className={cn('h-4 w-4 shrink-0', on ? 'text-elec-yellow' : 'text-transparent')}
                    aria-hidden
                  />
                </button>
              </li>
            );
          })}
        </ul>
      </CollegeSheet>
    </>
  );
}
