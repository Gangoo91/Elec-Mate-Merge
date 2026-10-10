/**
 * Building blocks for the apprentice front doors (/apprentice and
 * /apprentice/today), 10 Oct 2026.
 *
 * Same language as the College Hub home (CollegeOverviewSection) and the
 * restyled college-linked apprentice screens: white typography for headings,
 * one card surface, edge to edge on a phone, a status line of figures instead
 * of a stack of tall number tiles, and lists on a phone that become a grid of
 * same-size cards on desktop.
 */
import type { ReactNode } from 'react';
import { ArrowRight, ChevronRight } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';

/* ── Surface ────────────────────────────────────────────────────────── */

/**
 * The one card surface on the apprentice front doors (Andrew, 10 Oct: "the
 * cards need to be excellent and feel premium"). A solid, slightly lit grey a
 * step above the 11% ground, a hairline edge, a faint highlight along the top
 * and a soft shadow underneath, so a card sits ON the page instead of being a
 * tinted patch of it. Edge to edge on a phone, rounded from sm:.
 */
export const HOME_SURFACE =
  'border-white/[0.07] bg-[linear-gradient(180deg,hsl(0_0%_14.5%)_0%,hsl(0_0%_12.75%)_100%)] ' +
  'shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06),0_1px_2px_0_rgba(0,0,0,0.45),0_16px_32px_-20px_rgba(0,0,0,0.8)]';

/** A full card: edge to edge on a phone, rounded and inset from sm:. */
export const HOME_CARD = cn(
  '-mx-4 overflow-hidden border-y sm:mx-0 sm:rounded-2xl sm:border-x',
  HOME_SURFACE
);

/** A small coloured marker beside a label: the category, never decoration. */
export function Marker({ className }: { className: string }) {
  return (
    <span className={cn('inline-block h-2 w-2 shrink-0 rounded-full', className)} aria-hidden />
  );
}

/* ── Greeting ───────────────────────────────────────────────────────── */

export const partOfDay = (): string => {
  const h = new Date().getHours();
  if (h < 12) return 'Morning';
  if (h < 18) return 'Afternoon';
  return 'Evening';
};

export const longDate = (): string =>
  new Date().toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' });

/* ── Section title ──────────────────────────────────────────────────── */

export function HomeSectionTitle({
  title,
  sub,
  action,
}: {
  title: string;
  sub?: ReactNode;
  action?: ReactNode;
}) {
  return (
    <div className="flex items-end justify-between gap-4">
      <div className="min-w-0">
        <h2 className="text-[17px] font-semibold tracking-tight text-white">{title}</h2>
        {sub && <p className="mt-0.5 text-[13px] leading-snug text-white">{sub}</p>}
      </div>
      {action && <div className="-my-2 flex shrink-0 items-center">{action}</div>}
    </div>
  );
}

/* ── Status line ────────────────────────────────────────────────────── */

export interface StatusFigure {
  /** The bold figure. */
  value: string;
  /** Plain words after it. */
  label: string;
  /** Orange: behind or late. */
  warn?: boolean;
  onClick?: () => void;
}

/**
 * Figures as bold numbers with plain words, a hairline between them on
 * desktop and a 2x2 grid on a phone. Each one can open its detail.
 */
export function StatusLine({
  items,
  loading,
  className,
}: {
  items: StatusFigure[];
  loading?: boolean;
  className?: string;
}) {
  if (loading) {
    return (
      <div className={cn('grid grid-cols-2 gap-2 sm:flex sm:gap-6', className)} aria-hidden>
        {items.map((f) => (
          <div key={f.label} className="h-11 w-28 animate-pulse rounded-lg bg-white/[0.05]" />
        ))}
      </div>
    );
  }
  return (
    <div
      className={cn(
        'grid grid-cols-2 gap-x-3 text-[13.5px] text-white sm:flex sm:flex-wrap sm:items-center sm:gap-x-1',
        className
      )}
    >
      {items.map((f, i) => {
        const body = (
          <>
            <span
              className={cn(
                'text-[16px] font-semibold tabular-nums',
                f.warn ? 'text-orange-300' : 'text-white'
              )}
            >
              {f.value}
            </span>
            <span className={cn('min-w-0 leading-tight', f.warn && 'text-orange-300')}>
              {f.label}
            </span>
          </>
        );
        return (
          <div key={f.label} className="flex min-w-0 items-center">
            {i > 0 && (
              <span aria-hidden className="mr-1 hidden h-4 w-px bg-white/[0.18] sm:block" />
            )}
            {f.onClick ? (
              <button
                type="button"
                onClick={f.onClick}
                className="-ml-1 flex min-h-11 min-w-0 items-center gap-1.5 rounded-lg px-1 py-1 text-left transition-colors touch-manipulation hover:bg-white/[0.05] active:bg-white/[0.08] sm:px-2"
              >
                {body}
              </button>
            ) : (
              <div className="flex min-h-11 min-w-0 items-center gap-1.5 px-1 py-1 sm:px-2">
                {body}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

/* ── Quick actions ──────────────────────────────────────────────────── */

export interface HomeAction {
  title: string;
  /** What is waiting behind it, or what it does. */
  detail: string;
  icon: LucideIcon;
  onClick: () => void;
}

/**
 * The few things an apprentice starts from here. Outlined, same size, a
 * small line icon beside the label (not stacked over it). Two up on a
 * phone, four across on desktop. No solid yellow: the page's one yellow
 * action is the first row of "Do next".
 */
export function ActionTiles({ items, className }: { items: HomeAction[]; className?: string }) {
  return (
    <div
      className={cn(
        'grid grid-cols-2 gap-2.5',
        items.length >= 4 ? 'lg:grid-cols-4' : 'lg:grid-cols-3',
        className
      )}
    >
      {items.map(({ title, detail, icon: Icon, onClick }) => (
        <button
          key={title}
          type="button"
          onClick={onClick}
          className="group flex min-h-[84px] min-w-0 flex-col items-start rounded-2xl border border-white/[0.12] bg-white/[0.03] p-3.5 text-left transition-colors touch-manipulation hover:border-white/[0.3] active:bg-white/[0.07] sm:p-4"
        >
          <span className="flex w-full items-center gap-2">
            <Icon className="h-[18px] w-[18px] shrink-0 text-white" strokeWidth={1.5} aria-hidden />
            <span className="min-w-0 flex-1 text-[14.5px] font-semibold leading-tight text-white">
              {title}
            </span>
          </span>
          <span className="mt-1.5 line-clamp-2 text-[12.5px] leading-snug text-white">
            {detail}
          </span>
        </button>
      ))}
    </div>
  );
}

/* ── Destinations ───────────────────────────────────────────────────── */

export interface HomeLink {
  id: string;
  title: string;
  detail: string;
  /** A figure on the right on a phone, under the title on desktop. */
  figure?: string;
  figureLabel?: string;
  /** Something needs doing there (a dot beside the title). */
  alert?: boolean;
  onClick: () => void;
}

/**
 * A group of places to go. A hairline list on a phone (a name line and a
 * detail line, never cut to a stub); a grid of same-height cards from sm:.
 */
export function LinkGroup({ items, className }: { items: HomeLink[]; className?: string }) {
  const cols =
    items.length >= 4 ? 'lg:grid-cols-4' : items.length === 3 ? 'lg:grid-cols-3' : 'lg:grid-cols-2';
  return (
    <ul
      className={cn(
        '-mx-4 divide-y divide-white/[0.06] overflow-hidden border-y border-white/[0.08] bg-gradient-to-b from-white/[0.07] to-white/[0.025]',
        'sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-3 sm:divide-y-0 sm:overflow-visible sm:border-0 sm:bg-none',
        cols,
        className
      )}
    >
      {items.map((l) => (
        <li key={l.id} className="min-w-0">
          <button
            type="button"
            onClick={l.onClick}
            className={cn(
              'group flex w-full min-w-0 items-center gap-3 px-4 py-3.5 text-left transition-colors touch-manipulation hover:bg-white/[0.04] active:bg-white/[0.07]',
              'sm:h-full sm:min-h-[120px] sm:flex-col sm:items-stretch sm:gap-0 sm:rounded-2xl sm:border sm:border-white/[0.08] sm:bg-gradient-to-b sm:from-white/[0.07] sm:to-white/[0.025] sm:p-5 sm:hover:border-white/[0.2]'
            )}
          >
            <span className="min-w-0 flex-1 sm:flex-none">
              <span className="flex items-center gap-2">
                <span className="text-[15px] font-semibold leading-snug text-white">{l.title}</span>
                {l.alert && (
                  <span
                    className="h-2 w-2 shrink-0 rounded-full bg-orange-400"
                    aria-label="Needs doing"
                  />
                )}
                <ChevronRight
                  className="ml-auto hidden h-4 w-4 shrink-0 text-white transition-transform group-hover:translate-x-0.5 sm:block"
                  aria-hidden
                />
              </span>
              <span className="mt-0.5 line-clamp-2 text-[13px] leading-snug text-white sm:mt-1.5">
                {l.detail}
              </span>
            </span>
            {l.figure && (
              <span className="shrink-0 text-right sm:mt-auto sm:pt-4 sm:text-left">
                <span className="block text-[17px] font-semibold leading-none tabular-nums text-white sm:inline sm:text-[24px]">
                  {l.figure}
                </span>
                {l.figureLabel && (
                  <span className="mt-1 block text-[12px] text-white sm:ml-1.5 sm:mt-0 sm:inline sm:text-[13px]">
                    {l.figureLabel}
                  </span>
                )}
              </span>
            )}
            <ChevronRight className="h-4 w-4 shrink-0 text-white sm:hidden" aria-hidden />
          </button>
        </li>
      ))}
    </ul>
  );
}

/* ── One row card ───────────────────────────────────────────────────── */

/** A single tappable row on the card surface, edge to edge on a phone. */
export function HomeRowCard({
  icon: Icon,
  title,
  detail,
  meta,
  trailing,
  onClick,
  className,
}: {
  icon?: LucideIcon;
  title: ReactNode;
  detail?: ReactNode;
  /** A quiet third line (cohort, counts). */
  meta?: ReactNode;
  trailing?: ReactNode;
  onClick: () => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        '-mx-4 flex w-[calc(100%+2rem)] min-w-0 items-center gap-3 border-y px-4 py-4 text-left transition-colors touch-manipulation hover:border-white/[0.16] active:bg-white/[0.04]',
        'sm:mx-0 sm:w-full sm:rounded-2xl sm:border-x sm:px-5',
        HOME_SURFACE,
        className
      )}
    >
      {Icon && <Icon className="h-5 w-5 shrink-0 text-white" strokeWidth={1.5} aria-hidden />}
      <span className="min-w-0 flex-1">
        <span className="block text-[15px] font-semibold leading-snug text-white">{title}</span>
        {detail && (
          <span className="mt-0.5 line-clamp-2 text-[13px] leading-snug text-white">{detail}</span>
        )}
        {meta && <span className="mt-1 block text-[12.5px] font-medium text-white">{meta}</span>}
      </span>
      {trailing}
      <ChevronRight className="h-4 w-4 shrink-0 text-white" aria-hidden />
    </button>
  );
}

/* ── Progress panel ─────────────────────────────────────────────────── */

export interface ProgressCell {
  /** Solid colour for the marker and the bar, e.g. `bg-orange-400`. */
  colour: string;
  /** 0–100; shows a thin bar under the figure. */
  pct?: number;
  value: string;
  label: string;
  /** One quiet line under the figure. */
  meta?: string;
  onClick?: () => void;
}

/**
 * The apprentice's four figures as one designed strip: a small coloured
 * marker by the label, a big figure and, where there is a goal, a thin bar in
 * the same colour. One card, hairlines between the cells; 2x2 on a phone,
 * four across on desktop.
 */
export function ProgressPanel({
  items,
  loading,
  className,
}: {
  items: ProgressCell[];
  loading?: boolean;
  className?: string;
}) {
  const edge = (i: number) =>
    cn(
      'border-white/[0.07]',
      i === 0 && 'border-b border-r lg:border-b-0',
      i === 1 && 'border-b lg:border-b-0 lg:border-r',
      i === 2 && 'border-r'
    );
  return (
    <div className={cn(HOME_CARD, 'grid grid-cols-2 lg:grid-cols-4', className)}>
      {items.map((c, i) => {
        const body = loading ? (
          <span className="block space-y-3" aria-hidden>
            <span className="block h-4 w-24 animate-pulse rounded bg-white/[0.06]" />
            <span className="block h-8 w-16 animate-pulse rounded bg-white/[0.06]" />
          </span>
        ) : (
          <>
            <span className="flex items-center gap-2">
              <Marker className={c.colour} />
              <span className="min-w-0 text-[13px] font-medium leading-tight text-white">
                {c.label}
              </span>
            </span>
            <span className="mt-3 block text-[28px] font-bold leading-none tracking-tight tabular-nums text-white sm:text-[32px]">
              {c.value}
            </span>
            <span className="mt-auto block pt-4">
              {typeof c.pct === 'number' && (
                <span className="mb-2 block h-1 overflow-hidden rounded-full bg-white/[0.08]">
                  <span
                    className={cn('block h-full rounded-full transition-all', c.colour)}
                    style={{ width: `${Math.max(c.pct > 0 ? 2 : 0, Math.min(100, c.pct))}%` }}
                  />
                </span>
              )}
              {c.meta && (
                <span className="block text-[12.5px] leading-snug text-white">{c.meta}</span>
              )}
            </span>
          </>
        );
        const cell = cn('flex min-h-[136px] min-w-0 flex-col p-4 text-left sm:p-5', edge(i));
        return c.onClick && !loading ? (
          <button
            key={c.label}
            type="button"
            onClick={c.onClick}
            className={cn(
              cell,
              'touch-manipulation transition-colors hover:bg-white/[0.03] active:bg-white/[0.05]'
            )}
          >
            {body}
          </button>
        ) : (
          <div key={c.label} className={cell}>
            {body}
          </div>
        );
      })}
    </div>
  );
}

/* ── Start cards ────────────────────────────────────────────────────── */

export interface StartCard {
  title: string;
  /** What it does, in a line. */
  detail: string;
  onClick: () => void;
}

/**
 * The few things to start from the home, as equal cards: a name, a line of
 * what it does and an arrow in the corner. Two up on a phone and in the side
 * column; no icons (10 Oct: icon tiles read as generated).
 */
export function StartCards({ items, className }: { items: StartCard[]; className?: string }) {
  return (
    <div className={cn('grid grid-cols-2 gap-2.5 sm:gap-3', className)}>
      {items.map(({ title, detail, onClick }) => (
        <button
          key={title}
          type="button"
          onClick={onClick}
          className={cn(
            'group flex min-h-[124px] min-w-0 flex-col rounded-2xl border p-4 text-left touch-manipulation transition-[border-color,transform] duration-150 hover:border-white/[0.16] active:scale-[0.985] sm:p-5',
            HOME_SURFACE
          )}
        >
          <span className="text-[15px] font-semibold leading-snug text-white">{title}</span>
          <span className="mt-1 text-[13px] leading-snug text-white">{detail}</span>
          <span className="mt-auto flex justify-end pt-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/[0.12] text-white transition-colors group-hover:border-elec-yellow group-hover:bg-elec-yellow group-hover:text-black">
              <ArrowRight className="h-4 w-4" aria-hidden />
            </span>
          </span>
        </button>
      ))}
    </div>
  );
}

/* ── Directory ──────────────────────────────────────────────────────── */

export interface DirectoryGroup {
  title: string;
  /** One short line under the group name. */
  sub?: string;
  items: HomeLink[];
}

/**
 * Every place in the hub: one card per group, two across from lg:, stacked
 * on a phone. Inside a card, rows with hairlines between: the name, a short
 * line of what is there, a small figure pill when there is a count, an orange
 * marker when something is waiting.
 */
export function Directory({ groups, className }: { groups: DirectoryGroup[]; className?: string }) {
  return (
    <div className={cn('grid gap-5 lg:grid-cols-2 lg:gap-4', className)}>
      {groups.map((g) => (
        <section key={g.title} className={cn(HOME_CARD, 'flex flex-col')}>
          <header className="flex items-baseline justify-between gap-3 border-b border-white/[0.07] px-4 py-3.5 sm:px-5">
            <h3 className="text-[15px] font-semibold tracking-tight text-white">{g.title}</h3>
            {g.sub && <p className="hidden text-[12.5px] text-white sm:block">{g.sub}</p>}
          </header>
          <ul className="flex-1 divide-y divide-white/[0.06]">
            {g.items.map((l) => (
              <li key={l.id}>
                <button
                  type="button"
                  onClick={l.onClick}
                  className="group flex min-h-[64px] w-full min-w-0 items-center gap-3 px-4 py-3 text-left touch-manipulation transition-colors hover:bg-white/[0.03] active:bg-white/[0.05] sm:px-5"
                >
                  <span className="min-w-0 flex-1">
                    <span className="flex flex-wrap items-center gap-x-2 gap-y-1">
                      <span className="text-[15px] font-semibold leading-snug text-white">
                        {l.title}
                      </span>
                      {l.figure && (
                        <span className="inline-flex h-6 items-center rounded-full border border-white/[0.14] px-2 text-[12px] font-medium tabular-nums text-white">
                          {l.figure}
                          {l.figureLabel ? ` ${l.figureLabel}` : ''}
                        </span>
                      )}
                      {l.alert && <Marker className="bg-orange-400" />}
                    </span>
                    <span className="mt-0.5 block text-[13px] leading-snug text-white line-clamp-2 lg:line-clamp-1">
                      {l.detail}
                    </span>
                  </span>
                  <ChevronRight
                    className="h-4 w-4 shrink-0 text-white transition-transform group-hover:translate-x-0.5"
                    aria-hidden
                  />
                </button>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}

/* ── A sheet sized to its content ───────────────────────────────────── */

/**
 * A bottom sheet that is as tall as what it holds (up to 88dvh), for short
 * content: a badge, a recap. FormSheet is always 85vh, which left half a
 * screen of nothing under a few lines. Drag handle, the Radix close button,
 * a scrolling body and a footer above the home indicator.
 */
export function ContentSheet({
  open,
  onOpenChange,
  eyebrow,
  title,
  description,
  footer,
  children,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  eyebrow?: string;
  title: ReactNode;
  description?: string;
  footer?: ReactNode;
  children: ReactNode;
}) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        className="max-h-[88dvh] overflow-hidden rounded-t-2xl border-white/[0.06] bg-[hsl(0_0%_8%)] p-0"
      >
        <div className="flex max-h-[88dvh] flex-col">
          <div className="mx-auto mt-3 h-1 w-12 shrink-0 rounded-full bg-white/15" aria-hidden />
          <div
            className="overflow-y-auto overscroll-contain px-4 sm:px-6 lg:px-10"
            style={{
              paddingBottom: footer ? '1rem' : 'max(1.75rem, env(safe-area-inset-bottom))',
            }}
          >
            <div className="mx-auto w-full max-w-2xl lg:max-w-[88rem]">
              <SheetHeader className="pb-4 pt-2 text-left">
                <SheetTitle className="pr-10 text-left">
                  {eyebrow && (
                    <span className="block text-[13px] font-semibold text-elec-yellow">
                      {eyebrow}
                    </span>
                  )}
                  <span className="mt-1 block text-[22px] font-semibold leading-tight tracking-tight text-white sm:text-[24px]">
                    {title}
                  </span>
                </SheetTitle>
                <SheetDescription
                  className={description ? 'text-left text-[13.5px] text-white' : 'sr-only'}
                >
                  {description ?? (typeof title === 'string' ? title : 'Details')}
                </SheetDescription>
              </SheetHeader>
              {children}
            </div>
          </div>
          {footer && (
            <div
              className="shrink-0 border-t border-white/[0.08] px-4 pt-3 sm:px-6 lg:px-10"
              style={{ paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom))' }}
            >
              <div className="mx-auto w-full max-w-2xl lg:max-w-[88rem]">{footer}</div>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
