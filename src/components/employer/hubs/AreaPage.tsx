/**
 * The area page template (10 Oct 2026). Andrew: "less icons, they look AI
 * generated and we need to look like a proper app, really well designed".
 *
 * Quality from type, spacing and restraint, not from icons and boxes:
 *  - figures set straight on the page, divided by hairlines (StatLine);
 *  - one container per job to be done, rows divided by hairlines (ListPanel);
 *  - colour only where it means something: yellow = in progress / today,
 *    red = late or a problem, white = everything else. Solid, never a tint;
 *  - the area's pages as one plain index (PageIndex), no icons or chevrons.
 * All text is full white (house rule); hierarchy comes from size and weight.
 */
import type { ReactNode } from 'react';
import { format, parseISO } from 'date-fns';
import { cn } from '@/lib/utils';

const hairline = 'border-white/[0.08]';

/** The one container style on an area page: calm, flat, a hairline edge. */
export const areaCard =
  '-mx-4 border-y border-white/[0.08] bg-white/[0.035] sm:mx-0 sm:rounded-2xl sm:border';

/* ── Section heading ─────────────────────────────────────────────────── */

export function SectionHead({
  title,
  meta,
  action,
  onAction,
}: {
  title: string;
  meta?: ReactNode;
  action?: string;
  onAction?: () => void;
}) {
  return (
    <div className="mb-3 flex items-baseline justify-between gap-3">
      <div className="flex min-w-0 items-baseline gap-2.5">
        <h2 className="text-[17px] font-semibold tracking-tight text-white">{title}</h2>
        {meta && <span className="truncate text-[13px] text-white">{meta}</span>}
      </div>
      {action && onAction && (
        <button
          type="button"
          onClick={onAction}
          className="-my-3 h-11 shrink-0 text-[13.5px] font-semibold text-elec-yellow touch-manipulation hover:underline underline-offset-4"
        >
          {action}
        </button>
      )}
    </div>
  );
}

/* ── Figures on the page ─────────────────────────────────────────────── */

export interface Stat {
  label: string;
  value: ReactNode;
  sub?: string;
  tone?: 'red';
  onOpen?: () => void;
}

/** Figures set on the page, not in a card: large numbers, hairline dividers. */
export function StatLine({ stats }: { stats: Stat[] }) {
  return (
    <div className={cn('grid grid-cols-2 border-y sm:grid-cols-4', hairline)}>
      {stats.map((s, i) => {
        const Tag = s.onOpen ? 'button' : 'div';
        return (
          <Tag
            key={s.label}
            {...(s.onOpen ? { type: 'button' as const, onClick: s.onOpen } : {})}
            className={cn(
              'min-w-0 py-4 text-left sm:py-5',
              i % 2 === 1 ? 'pl-4 sm:pl-6' : 'pr-4',
              i % 2 === 1 && cn('border-l', hairline),
              i >= 2 && cn('border-t sm:border-t-0', hairline),
              i >= 1 && 'sm:pl-6',
              i === 2 && cn('sm:border-l', hairline),
              s.onOpen && 'touch-manipulation transition-opacity hover:opacity-80'
            )}
          >
            <span className="block text-[13px] font-medium text-white">{s.label}</span>
            <span
              className={cn(
                'mt-1 block text-[28px] font-semibold leading-none tracking-tight tabular-nums sm:text-[32px]',
                s.tone === 'red' ? 'text-red-400' : 'text-white'
              )}
            >
              {s.value}
            </span>
            {s.sub && <span className="mt-1.5 block text-[12.5px] leading-snug text-white">{s.sub}</span>}
          </Tag>
        );
      })}
    </div>
  );
}

/* ── The week as a calendar ──────────────────────────────────────────── */

export interface CalendarJob {
  id: string;
  title: string;
  client?: string | null;
  crew: string[];
  /** in = in progress today/this week; late = past end or no crew; booked = otherwise. */
  state: 'in' | 'late' | 'booked';
  note?: string;
  onOpen?: () => void;
}
export interface CalendarDay {
  date: string;
  jobs: CalendarJob[];
}

const edge = { in: 'border-l-elec-yellow', late: 'border-l-red-400', booked: 'border-l-white' } as const;

function JobBlock({ job, wide }: { job: CalendarJob; wide?: boolean }) {
  const Tag = job.onOpen ? 'button' : 'div';
  return (
    <Tag
      {...(job.onOpen ? { type: 'button' as const, onClick: job.onOpen } : {})}
      className={cn(
        'block w-full rounded-md border-l-[3px] bg-white/[0.07] py-1.5 pl-2.5 pr-2 text-left touch-manipulation transition-colors hover:bg-white/[0.11]',
        edge[job.state]
      )}
    >
      <span className={cn('block text-[12.5px] font-semibold leading-snug text-white', wide ? 'line-clamp-1 text-[14px]' : 'line-clamp-2')}>
        {job.title}
      </span>
      <span className="mt-0.5 block truncate text-[11.5px] text-white">
        {[job.crew.length ? job.crew.join(' ') : 'No crew', job.note].filter(Boolean).join(' · ')}
      </span>
    </Tag>
  );
}

/**
 * Monday to Sunday. Desktop: a calendar grid, today's date in a solid yellow
 * circle as calendar apps do. Phone: an agenda of the days with work.
 */
export function WeekCalendar({ days }: { days: CalendarDay[] }) {
  const todayKey = format(new Date(), 'yyyy-MM-dd');
  const withWork = days.filter((d) => d.jobs.length > 0);
  return (
    <div className={cn(areaCard, 'overflow-hidden')}>
      <div className={cn('hidden grid-cols-7 divide-x md:grid', 'divide-white/[0.08]')}>
        {days.map((d) => {
          const isToday = d.date === todayKey;
          const dt = parseISO(d.date);
          return (
            <div key={d.date} className="min-h-[176px] min-w-0">
              <div className={cn('flex items-center justify-between border-b px-3 py-2.5', hairline)}>
                <span className="text-[12.5px] font-medium text-white">{format(dt, 'EEE')}</span>
                <span
                  className={cn(
                    'flex h-7 min-w-7 items-center justify-center rounded-full px-1.5 text-[14px] font-semibold tabular-nums',
                    isToday ? 'bg-elec-yellow text-black' : 'text-white'
                  )}
                >
                  {format(dt, 'd')}
                </span>
              </div>
              <div className="space-y-1.5 p-2">
                {d.jobs.slice(0, 3).map((j) => (
                  <JobBlock key={j.id} job={j} />
                ))}
                {d.jobs.length > 3 && (
                  <p className="px-1 text-[12px] font-semibold text-white">+{d.jobs.length - 3} more</p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className={cn('divide-y md:hidden', 'divide-white/[0.08]')}>
        {withWork.length === 0 && (
          <p className="px-4 py-4 text-[14px] text-white">Nothing booked Monday to Sunday.</p>
        )}
        {withWork.map((d) => {
          const isToday = d.date === todayKey;
          const dt = parseISO(d.date);
          return (
            <div key={d.date} className="flex gap-3 px-4 py-3">
              <div className="w-10 shrink-0 text-center">
                <span className="block text-[12px] font-medium text-white">{format(dt, 'EEE')}</span>
                <span
                  className={cn(
                    'mx-auto mt-0.5 flex h-8 w-8 items-center justify-center rounded-full text-[15px] font-semibold tabular-nums',
                    isToday ? 'bg-elec-yellow text-black' : 'text-white'
                  )}
                >
                  {format(dt, 'd')}
                </span>
              </div>
              <div className="min-w-0 flex-1 space-y-1.5">
                {d.jobs.map((j) => (
                  <JobBlock key={j.id} job={j} wide />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/** The colour key under the calendar, in words. */
export function CalendarKey() {
  const item = (cls: string, text: string) => (
    <span className="flex items-center gap-2 text-[12.5px] text-white">
      <span className={cn('h-3 w-[3px] rounded-full', cls)} />
      {text}
    </span>
  );
  return (
    <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5">
      {item('bg-elec-yellow', 'In progress')}
      {item('bg-white', 'Booked')}
      {item('bg-red-400', 'Late or no crew')}
    </div>
  );
}

/* ── A list in one container ─────────────────────────────────────────── */

export interface ListItem {
  key: string;
  title: ReactNode;
  detail?: ReactNode;
  /** Right-hand status in words; red when it is a problem. */
  status?: string;
  tone?: 'red' | 'yellow';
  date?: string;
  onOpen?: () => void;
}

/** One container, rows divided by hairlines, a plain sentence when empty. */
export function ListPanel({
  items,
  empty,
  footer,
  className,
}: {
  items: ListItem[];
  empty: ReactNode;
  footer?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn(areaCard, 'flex flex-col overflow-hidden', className)}>
      {items.length === 0 ? (
        <p className="px-4 py-4 text-[14px] leading-relaxed text-white sm:px-5">{empty}</p>
      ) : (
        <ul className={cn('divide-y', 'divide-white/[0.08]')}>
          {items.map((it) => {
            const Tag = it.onOpen ? 'button' : 'div';
            return (
              <li key={it.key}>
                <Tag
                  {...(it.onOpen ? { type: 'button' as const, onClick: it.onOpen } : {})}
                  className="flex min-h-[60px] w-full items-center gap-4 px-4 py-3 text-left touch-manipulation transition-colors hover:bg-white/[0.04] sm:px-5"
                >
                  {it.date && (
                    <span className="w-11 shrink-0 text-center">
                      <span className="block text-[11.5px] font-medium text-white">{format(parseISO(it.date), 'EEE')}</span>
                      <span className="block text-[17px] font-semibold tabular-nums leading-tight text-white">
                        {format(parseISO(it.date), 'd')}
                      </span>
                    </span>
                  )}
                  <span className="min-w-0 flex-1">
                    <span className="block text-[14.5px] font-semibold leading-snug text-white">{it.title}</span>
                    {it.detail && <span className="mt-0.5 block text-[13px] leading-snug text-white">{it.detail}</span>}
                  </span>
                  {it.status && (
                    <span
                      className={cn(
                        'shrink-0 text-[13px] font-semibold',
                        it.tone === 'red' ? 'text-red-400' : it.tone === 'yellow' ? 'text-elec-yellow' : 'text-white'
                      )}
                    >
                      {it.status}
                    </span>
                  )}
                </Tag>
              </li>
            );
          })}
        </ul>
      )}
      {footer && <div className={cn('mt-auto border-t px-4 py-3 sm:px-5', hairline)}>{footer}</div>}
    </div>
  );
}

/* ── Pipeline as one proportional bar ───────────────────────────────── */

export interface PipeStage {
  key: string;
  label: string;
  count: number;
  onOpen?: () => void;
}

/**
 * Stages as one bar split by how many jobs sit at each, labels and counts
 * underneath. The stage holding most live work is yellow, the rest white
 * shades by position; empty stages take no width.
 */
export function PipelineBar({ stages }: { stages: PipeStage[] }) {
  const total = stages.reduce((n, s) => n + s.count, 0);
  const shade = ['bg-white/30', 'bg-white/45', 'bg-white/60', 'bg-white/75', 'bg-elec-yellow', 'bg-white/90'];
  return (
    <div className={cn(areaCard, 'px-4 py-4 sm:px-5 sm:py-5')}>
      <div className="flex h-2.5 w-full overflow-hidden rounded-full bg-white/[0.08]">
        {total > 0 &&
          stages.map((s, i) =>
            s.count > 0 ? (
              <span
                key={s.key}
                className={cn('h-full', shade[i] ?? 'bg-white/60', i > 0 && 'border-l-2 border-[hsl(0_0%_10%)]')}
                style={{ width: `${(s.count / total) * 100}%` }}
              />
            ) : null
          )}
      </div>
      <div className="mt-4 grid grid-cols-3 gap-y-3 sm:grid-cols-6">
        {stages.map((s) => {
          const Tag = s.onOpen ? 'button' : 'div';
          return (
            <Tag
              key={s.key}
              {...(s.onOpen ? { type: 'button' as const, onClick: s.onOpen } : {})}
              className="min-w-0 text-left touch-manipulation"
            >
              <span className="block text-[12.5px] font-medium text-white">{s.label}</span>
              <span
                className={cn(
                  'mt-0.5 block text-[22px] leading-tight tabular-nums text-white',
                  s.count > 0 ? 'font-semibold' : 'font-normal'
                )}
              >
                {s.count}
              </span>
            </Tag>
          );
        })}
      </div>
    </div>
  );
}

/* ── The area's pages as one index ──────────────────────────────────── */

export interface IndexLink {
  title: string;
  detail?: ReactNode;
  value?: string;
  problem?: boolean;
  onClick: () => void;
}
export interface IndexGroup {
  title: string;
  links: IndexLink[];
}

/**
 * Every page in the area at once: one container, a column per group divided
 * by hairlines, plain rows with a figure on the right where it helps.
 */
export function PageIndex({ groups }: { groups: IndexGroup[] }) {
  return (
    <div className={cn(areaCard, 'grid overflow-hidden md:grid-cols-2 xl:grid-cols-4')}>
      {groups.map((g, gi) => (
        <div
          key={g.title}
          className={cn(
            'min-w-0 py-2',
            gi > 0 && cn('border-t md:border-t-0', hairline),
            gi % 2 === 1 && cn('md:border-l', hairline),
            gi >= 2 && cn('md:border-t xl:border-t-0', hairline),
            gi > 0 && cn('xl:border-l', hairline)
          )}
        >
          <h3 className="px-4 pt-2 pb-1.5 text-[13px] font-semibold text-white sm:px-5">{g.title}</h3>
          <ul>
            {g.links.map((l) => (
              <li key={l.title}>
                <button
                  type="button"
                  onClick={l.onClick}
                  className="flex min-h-[52px] w-full items-center gap-3 px-4 py-2 text-left touch-manipulation transition-colors hover:bg-white/[0.04] sm:px-5"
                >
                  <span className="min-w-0 flex-1">
                    <span className="block text-[14.5px] font-medium leading-snug text-white">{l.title}</span>
                    {l.detail && (
                      <span className={cn('block text-[12.5px] leading-snug', l.problem ? 'font-semibold text-red-400' : 'text-white')}>
                        {l.detail}
                      </span>
                    )}
                  </span>
                  {l.value && <span className="shrink-0 text-[14px] font-semibold tabular-nums text-white">{l.value}</span>}
                </button>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

/* ── Stat cards ──────────────────────────────────────────────────────── */

export interface StatCardItem extends Stat {
  /** 0 to 1: draws a slim yellow bar (e.g. how full the week is). */
  progress?: number;
  /** The card is a filter that is switched on: a solid yellow edge. */
  selected?: boolean;
}

/** Card surface shared by stat cards and page tiles. */
const tileCls =
  'rounded-2xl border border-white/[0.09] bg-gradient-to-b from-white/[0.065] to-white/[0.025] ' +
  'shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] transition-colors';

/** The page's key figures as four equal cards. */
export function StatCards({ stats }: { stats: StatCardItem[] }) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
      {stats.map((s) => {
        const Tag = s.onOpen ? 'button' : 'div';
        return (
          <Tag
            key={s.label}
            {...(s.onOpen
              ? {
                  type: 'button' as const,
                  onClick: s.onOpen,
                  ...(s.selected !== undefined ? { 'aria-pressed': s.selected } : {}),
                }
              : {})}
            className={cn(
              tileCls,
              'flex min-h-[124px] min-w-0 flex-col p-4 text-left sm:p-5',
              s.onOpen && 'touch-manipulation hover:border-white/[0.18] hover:from-white/[0.08]',
              s.selected && 'border-elec-yellow shadow-[inset_0_0_0_1px_hsl(47_100%_50%)] hover:border-elec-yellow'
            )}
          >
            <span className="text-[13px] font-medium text-white">{s.label}</span>
            <span
              className={cn(
                'mt-2 text-[28px] font-semibold leading-none tracking-tight tabular-nums sm:text-[32px]',
                s.tone === 'red' ? 'text-red-400' : 'text-white'
              )}
            >
              {s.value}
            </span>
            <span className="mt-auto pt-3">
              {s.progress !== undefined && (
                <span className="mb-2 block h-1.5 w-full overflow-hidden rounded-full bg-white/[0.09]">
                  <span
                    className={cn('block h-full rounded-full', s.tone === 'red' ? 'bg-red-400' : 'bg-elec-yellow')}
                    style={{ width: `${Math.max(0, Math.min(1, s.progress)) * 100}%` }}
                  />
                </span>
              )}
              {s.sub && <span className="block text-[12.5px] leading-snug text-white">{s.sub}</span>}
            </span>
          </Tag>
        );
      })}
    </div>
  );
}

/* ── Page tiles ──────────────────────────────────────────────────────── */

/**
 * The area's pages as cards: a heading per group, then a grid of equal tiles,
 * each a page with one line about it and its figure top-right. No icons.
 */
/**
 * Columns that fill the row: as many as there are tiles up to `max`, otherwise
 * the count (never under 2) that leaves the fewest empty places, widest first.
 * So 4 tiles sit 4 across, 9 sit 3 by 3, and no row trails off into a gap.
 */
function fitColumns(n: number, max: number): number {
  if (n <= max) return Math.max(1, n);
  let best = max;
  let bestGap = Infinity;
  for (let c = max; c >= 2; c--) {
    const gap = Math.ceil(n / c) * c - n;
    if (gap < bestGap) {
      best = c;
      bestGap = gap;
    }
  }
  return best;
}

const LG_COLS = ['', 'lg:grid-cols-1', 'lg:grid-cols-2', 'lg:grid-cols-3'];
const XL_COLS = ['', 'xl:grid-cols-1', 'xl:grid-cols-2', 'xl:grid-cols-3', 'xl:grid-cols-4', 'xl:grid-cols-5'];

/**
 * The area's pages as cards: a heading per group, then tiles that fill the
 * full width of the row, each a page with one line about it and its figure
 * top-right. No icons. Two across on a phone; an odd last tile spans both.
 */
export function PageTiles({ groups }: { groups: IndexGroup[] }) {
  return (
    <div className="space-y-7">
      {groups.map((g) => {
        const n = g.links.length;
        return (
          <div key={g.title}>
            <h3 className="mb-3 text-[14px] font-semibold text-white">{g.title}</h3>
            <div className={cn('grid grid-cols-2 gap-2.5 sm:gap-3', LG_COLS[fitColumns(n, 3)], XL_COLS[fitColumns(n, 5)])}>
              {g.links.map((l, i) => (
                <button
                  key={l.title}
                  type="button"
                  onClick={l.onClick}
                  className={cn(
                    tileCls,
                    'flex min-h-[92px] min-w-0 flex-col p-3.5 text-left touch-manipulation hover:border-white/[0.18] hover:from-white/[0.08] sm:min-h-[96px] sm:p-4',
                    // Phone: an odd last tile takes the whole row rather than sit alone.
                    n % 2 === 1 && i === n - 1 && 'col-span-2 lg:col-span-1'
                  )}
                >
                  <span className="flex flex-col gap-0.5 sm:flex-row sm:items-start sm:justify-between sm:gap-3">
                    <span className="min-w-0 text-[14.5px] font-semibold leading-snug text-white sm:text-[15px]">{l.title}</span>
                    {l.value && (
                      <span className="text-[12.5px] font-semibold tabular-nums text-white sm:shrink-0 sm:text-[13px]">
                        {l.value}
                      </span>
                    )}
                  </span>
                  {l.detail && (
                    <span
                      className={cn(
                        'mt-auto pt-2 text-[13px] leading-snug',
                        l.problem ? 'font-semibold text-red-400' : 'text-white'
                      )}
                    >
                      {l.detail}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
