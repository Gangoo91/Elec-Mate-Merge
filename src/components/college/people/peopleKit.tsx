import type { LiHTMLAttributes, ReactNode } from 'react';
import {
  useCollegeScope,
  type CollegeScopeLevel,
} from '@/components/college/scope/useCollegeScope';
import { CollegeScopeTabs } from '@/components/college/scope/CollegeScopeSwitch';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  ActionMenu,
  FilterSheetButton as KitFilterSheetButton,
  JoinedToggle as KitJoinedToggle,
  TEXT_TAB_RAIL,
  TabMark,
  TextTabs,
  textTabCn,
  useNarrow,
} from '@/components/college/ui/CollegeUi';
import { Sheet, SheetContent, SheetDescription, SheetTitle } from '@/components/ui/sheet';

/* ==========================================================================
   People kit (7 Oct 2026). Small pieces shared by the People, cohort, staff
   and settings screens so every roster reads the same way:

     name · one line of context · figures · chevron · ⋯

   8 Oct 2026 ("make it excellent"): the coloured rule at the start of each
   row is gone (the risk or status is already said in words on the row), the
   list and card surfaces are the landing card (card-surface, rounded-2xl,
   yellow top line on hover only), and chip rows scroll sideways on a phone
   instead of wrapping into a wall of pills.

   Built on the College Hub design kit (CollegeUi.tsx). All text is white;
   orange means behind, red only for a critical learner, green means done.
   ========================================================================== */

export const norm = (s: string | null | undefined) => (s ?? '').trim().toLowerCase();

/**
 * Who counts as teaching staff and who as support staff. ONE definition for
 * the People hub figures and the Tutors / Support staff pages, so the number
 * on the card matches the list it opens: tutors and heads of department who
 * are not archived, matched without caring about case.
 */
type StaffLike = { role?: string | null; status?: string | null };
const TEACHING_ROLES = new Set(['tutor', 'head_of_department']);
export const isTeachingStaff = (s: StaffLike) =>
  TEACHING_ROLES.has(norm(s.role)) && norm(s.status) !== 'archived';
export const isSupportStaff = (s: StaffLike) =>
  !TEACHING_ROLES.has(norm(s.role)) && norm(s.status) !== 'archived';

export const plural = (n: number, one: string, many = `${one}s`) => `${n} ${n === 1 ? one : many}`;

/** A list of rows on the landing card surface. Edge to edge on a phone. */
export const PEOPLE_LIST =
  'card-surface -mx-4 divide-y divide-white/[0.06] overflow-hidden !rounded-none !border-x-0 !border-y !border-white/[0.08] sm:mx-0 sm:!rounded-2xl sm:!border';

/** A card that opens something: the landing surface, lifting on hover. */
export const PEOPLE_CARD =
  'card-surface-interactive group relative -mx-4 flex h-full flex-col overflow-hidden !rounded-none !border-x-0 !border-y !border-white/[0.08] text-left touch-manipulation hover:!border-white/[0.16] focus-within:!border-white/[0.16] sm:mx-0 sm:!rounded-2xl sm:!border';

/** A still card (a form panel, a settings block). */
export const PEOPLE_PANEL =
  'card-surface -mx-4 !rounded-none !border-x-0 !border-y !border-white/[0.08] p-4 sm:mx-0 sm:!rounded-2xl sm:!border sm:p-5';

/** The landing card's thin top line, shown on hover and focus only. */
export const TOP_LINE =
  'pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-elec-yellow via-amber-400 to-orange-400 opacity-0 transition-opacity duration-200 group-hover:opacity-80 group-focus-within:opacity-80';

/** A status in words, coloured by its border and text only. */
export function StatusChip({
  children,
  tone = 'neutral',
}: {
  children: ReactNode;
  tone?: 'done' | 'action' | 'neutral';
}) {
  return (
    <span
      className={cn(
        'inline-flex shrink-0 items-center rounded-full border px-2 py-0.5 text-[12px] font-semibold leading-tight',
        tone === 'done'
          ? 'border-emerald-400/50 text-emerald-300'
          : tone === 'action'
            ? 'border-orange-400/50 text-orange-300'
            : 'border-white/[0.18] text-white'
      )}
    >
      {children}
    </span>
  );
}

/**
 * A destination card (title, one figure, one line), on the landing surface.
 * The People hub and Settings use it for their "go somewhere" grids.
 */
export function PeopleLinkCard({
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
    <button type="button" onClick={onClick} className={cn(PEOPLE_CARD, 'min-h-[112px] p-4 sm:p-5')}>
      <span aria-hidden className={TOP_LINE} />
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
    </button>
  );
}

/** Underline search, the same field every College Hub list uses. */
export const SEARCH_CN =
  'input-underline h-11 w-full rounded-none border-0 border-b border-white/[0.15] bg-transparent px-1 text-base font-medium text-white caret-elec-yellow transition-colors placeholder:text-white placeholder:opacity-60 hover:border-white/[0.3] focus:border-elec-yellow focus:outline-none focus:ring-0 touch-manipulation';

/* Choice controls: thin adapters over the College Hub kit (CollegeUi.tsx,
   10 Oct 2026). Same props and roles as before. */
export { TEXT_TAB_RAIL, textTabCn, TabMark, useNarrow };

/** A choice of 2 to 4, as one joined toggle (the chosen option white). A radiogroup. */
export function JoinedToggle<T extends string | number | null>({
  label,
  items,
  value,
  onChange,
}: {
  label: string;
  items: Array<{ value: T; label: string }>;
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <KitJoinedToggle<T>
      options={items.map((i) => ({ key: i.value, label: i.label }))}
      value={value}
      onChange={onChange}
      label={label}
      semantics="radio"
    />
  );
}

/**
 * Filters over a list: quiet text tabs with counts and a yellow underline
 * (the "Needs you" tabs on the home page), not a row of pills.
 */
export function FilterChips<T extends string>({
  items,
  value,
  onChange,
  label,
}: {
  items: Array<{ value: T; label: string; count?: number }>;
  value: T;
  onChange: (v: T) => void;
  label: string;
}) {
  return (
    <TextTabs<T>
      items={items.map((c) => ({ key: c.value, label: c.label, count: c.count }))}
      value={value}
      onChange={onChange}
      label={label}
    />
  );
}

/** The handle, title and scrolling body every bottom sheet in People shares. */
export function PeopleSheet({
  open,
  onOpenChange,
  title,
  description,
  children,
}: {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  title: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        className="flex max-h-[88dvh] flex-col gap-0 rounded-t-2xl border-white/[0.1] p-0 pb-[env(safe-area-inset-bottom)] lg:mx-auto lg:max-w-2xl"
      >
        <div
          aria-hidden
          className="mx-auto mt-2.5 h-1 w-10 shrink-0 rounded-full bg-white/[0.25]"
        />
        <div className="shrink-0 px-5 pb-2 pr-14 pt-3">
          <SheetTitle className="text-[17px] font-semibold leading-snug text-white">
            {title}
          </SheetTitle>
          {description ? (
            <SheetDescription className="mt-0.5 text-[13px] text-white">
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

/**
 * A choice from more than a few options (a cohort), as one button that says
 * what is chosen and opens a bottom sheet of rows (kit FilterSheetButton).
 */
export function FilterSheetButton<T extends string>({
  label,
  items,
  value,
  onChange,
}: {
  label: string;
  items: Array<{ value: T; label: string; count?: number }>;
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <KitFilterSheetButton<T>
      label={label}
      options={items.map((i) => ({ key: i.value, label: i.label, count: i.count }))}
      value={value}
      onChange={onChange}
    />
  );
}

/** Kept for call sites. Rows no longer draw a coloured rule; say the state in words. */
export type RuleTone = 'critical' | 'warn' | 'good' | 'quiet';

export interface RowFigure {
  label: string;
  value: string;
  warn?: boolean;
  good?: boolean;
  critical?: boolean;
}

export interface RowMenuItem {
  label: string;
  onClick: () => void;
  danger?: boolean;
  disabled?: boolean;
  /** Draw a separator above this item. */
  separated?: boolean;
}

/**
 * One person (or cohort) in a roster. The figures sit in fixed-width columns
 * on desktop so a long list scans down; on a phone they wrap under the name.
 */
export function PeopleRow({
  title,
  badge,
  sub,
  figures = [],
  onOpen,
  openLabel,
  menu,
  leading,
  selected,
  headed,
  liProps,
}: {
  title: string;
  badge?: ReactNode;
  sub?: ReactNode;
  tone?: RuleTone;
  figures?: RowFigure[];
  onOpen: () => void;
  openLabel?: string;
  menu?: RowMenuItem[];
  leading?: ReactNode;
  selected?: boolean;
  /** A PeopleListHead names the columns, so hide the per-figure label on desktop. */
  headed?: boolean;
  /** Extra handlers for the row itself (e.g. long-press), so callers never wrap the li. */
  liProps?: Omit<LiHTMLAttributes<HTMLLIElement>, 'className' | 'children'>;
}) {
  return (
    <li {...liProps} className={cn('flex items-stretch', selected && 'bg-white/[0.06]')}>
      <button
        type="button"
        onClick={onOpen}
        aria-label={openLabel ?? `Open ${title}`}
        className="flex min-h-[64px] min-w-0 flex-1 flex-col gap-2 py-3 pl-5 pr-2 text-left transition-colors touch-manipulation hover:bg-white/[0.04] active:bg-white/[0.07] sm:pl-6 md:flex-row md:items-center md:gap-4"
      >
        <span className="flex min-w-0 flex-1 items-center gap-3">
          {leading}
          <span className="min-w-0 flex-1">
            {/* The name keeps its own line on a phone; a badge wraps under it
                rather than cutting the name to a stub (standard rule 4). */}
            <span className="flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1">
              <span className="min-w-0 break-words text-[15px] font-semibold leading-snug text-white md:truncate md:text-[14.5px]">
                {title}
              </span>
              {badge}
            </span>
            {sub && (
              <span className="mt-1 line-clamp-2 block text-[13px] leading-snug text-white md:line-clamp-1 md:text-[12.5px]">
                {sub}
              </span>
            )}
          </span>
          <ChevronRight className="h-4 w-4 shrink-0 text-white md:hidden" aria-hidden />
        </span>
        {figures.length > 0 && (
          <span
            className={cn(
              'flex flex-wrap gap-x-4 gap-y-1 md:shrink-0 md:flex-nowrap md:gap-0',
              leading && 'pl-11 md:pl-0'
            )}
          >
            {figures.map((f) => (
              <span
                key={f.label}
                className="flex items-baseline gap-1.5 md:w-[92px] md:flex-col md:items-end md:gap-0.5"
              >
                <span
                  className={cn(
                    'text-[14px] font-semibold tabular-nums leading-none',
                    f.critical
                      ? 'text-red-300'
                      : f.warn
                        ? 'text-orange-400'
                        : f.good
                          ? 'text-emerald-400'
                          : 'text-white'
                  )}
                >
                  {f.value}
                </span>
                <span className={cn('text-[12px] leading-none text-white', headed && 'md:hidden')}>
                  {f.label}
                </span>
              </span>
            ))}
          </span>
        )}
        <ChevronRight className="hidden h-4 w-4 shrink-0 text-white md:block" aria-hidden />
      </button>
      {menu && menu.length > 0 && <RowMenu title={title} items={menu} />}
    </li>
  );
}

/**
 * The ⋯ on a row. A dropdown beside the row on a wide screen; on a phone a
 * bottom sheet of 52 px rows with the person's name at the top (rule 7:
 * menus with more than a few items become sheets).
 */
export function RowMenu({
  title,
  items,
  triggerLabel,
}: {
  title: string;
  items: RowMenuItem[];
  /** The ⋯ button's accessible name; defaults to "More actions for <title>". */
  triggerLabel?: string;
}) {
  const narrow = useNarrow();
  return (
    <div className={cn('flex items-center pr-2', !narrow && 'sm:pr-3')}>
      <ActionMenu
        title={title}
        triggerLabel={triggerLabel}
        items={items.map((m) => ({
          label: m.label,
          onSelect: m.onClick,
          tone: m.danger ? 'danger' : undefined,
          disabled: m.disabled,
          separated: m.separated,
        }))}
      />
    </div>
  );
}

/** Column headings over a PeopleRow list, desktop only. */
export function PeopleListHead({
  title,
  figures,
  menu = true,
}: {
  title: string;
  figures: string[];
  menu?: boolean;
}) {
  return (
    <div className="hidden items-center gap-4 border-b border-white/[0.06] py-2.5 pl-6 pr-2 md:flex">
      <span className="flex-1 text-[12.5px] font-semibold text-white">{title}</span>
      {figures.map((f) => (
        <span key={f} className="w-[92px] text-right text-[12.5px] font-semibold text-white">
          {f}
        </span>
      ))}
      <span className="w-4" aria-hidden />
      {menu && <span className="w-[52px]" aria-hidden />}
    </div>
  );
}

/** A small yellow "Yours" / grey status badge beside a name. */
export function NameBadge({
  children,
  tone = 'quiet',
}: {
  children: ReactNode;
  tone?: 'mine' | 'quiet' | 'warn';
}) {
  return (
    <span
      className={cn(
        'shrink-0 rounded-full px-2 py-0.5 text-[12px] font-bold',
        tone === 'mine'
          ? 'border border-elec-yellow/70 text-elec-yellow'
          : tone === 'warn'
            ? 'border border-orange-400/50 text-orange-300'
            : 'border border-white/[0.18] text-white'
      )}
    >
      {children}
    </span>
  );
}

/** Spinner block for a list that is still loading. */
export function ListLoading({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3 px-5 py-6 sm:px-6">
      <div className="h-5 w-5 animate-spin rounded-full border-2 border-elec-yellow border-t-transparent" />
      <span className="text-[13px] text-white">{label}</span>
    </div>
  );
}

/**
 * The one scope switch (ELE-1886): mine first, the whole college second.
 * Renders nothing when the viewer has nobody assigned, because "Mine" would
 * be an empty list.
 */
export function ScopeSwitch({
  scope,
  onChange,
  hasMine,
  mineCount,
  collegeCount,
}: {
  scope: 'mine' | 'college';
  onChange: (s: 'mine' | 'college') => void;
  hasMine: boolean;
  /** Kept for call sites; the shared tabs name the levels. */
  mineLabel?: string;
  mineCount: number;
  collegeCount: number;
}) {
  // The one College Hub setting (ELE-1886): Mine / My cohorts / Whole college.
  const { level } = useCollegeScope();
  if (!hasMine) return null;
  const narrowed: CollegeScopeLevel = level === 'cohorts' ? 'cohorts' : 'mine';
  return (
    <CollegeScopeTabs
      value={scope === 'college' ? 'college' : narrowed}
      counts={{ [narrowed]: mineCount, college: collegeCount }}
      onChange={(v) => onChange(v === 'college' ? 'college' : 'mine')}
    />
  );
}

export interface PeopleLinkItem {
  title: string;
  body?: ReactNode;
  figure?: string;
  warn?: boolean;
  onClick: () => void;
}

/**
 * A block of destinations. On a phone, one list of rows (name, one line,
 * the figure on the right), edge to edge; from `md:` up a grid of same-size
 * cards that fills its rows evenly at desktop width (10 Oct: no uneven
 * cards, no orphan in a half-empty row).
 */
export function PeopleLinks({ items }: { items: PeopleLinkItem[] }) {
  const xlCols =
    items.length % 5 === 0
      ? 'xl:grid-cols-5'
      : items.length % 3 === 0
        ? 'xl:grid-cols-3'
        : 'xl:grid-cols-4';
  return (
    <>
      <ul className={cn(PEOPLE_LIST, 'md:hidden')}>
        {items.map((l) => (
          <li key={l.title}>
            <button
              type="button"
              onClick={l.onClick}
              // Spoken as "Learners 27. The roster…", the same order as the desktop card.
              aria-label={`${l.title}${l.figure != null && l.figure !== '' ? ` ${l.figure}` : ''}${
                typeof l.body === 'string' && l.body ? `. ${l.body}` : ''
              }`}
              className="flex min-h-[64px] w-full items-center gap-3 px-5 py-3 text-left transition-colors touch-manipulation active:bg-white/[0.07]"
            >
              <span className="min-w-0 flex-1">
                <span className="block text-[15px] font-semibold leading-snug text-white">
                  {l.title}
                </span>
                {l.body && (
                  <span className="mt-0.5 block text-[13px] leading-snug text-white">{l.body}</span>
                )}
              </span>
              {l.figure && (
                <span
                  className={cn(
                    'shrink-0 text-[20px] font-bold tabular-nums',
                    l.warn ? 'text-orange-400' : 'text-white'
                  )}
                >
                  {l.figure}
                </span>
              )}
              <ChevronRight className="h-4 w-4 shrink-0 text-white" aria-hidden />
            </button>
          </li>
        ))}
      </ul>
      <div
        className={cn('hidden items-stretch gap-3 md:grid md:grid-cols-2 lg:grid-cols-3', xlCols)}
      >
        {items.map((l) => (
          <PeopleLinkCard key={l.title} {...l} />
        ))}
      </div>
    </>
  );
}
