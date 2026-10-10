/**
 * The live panels the six Employer Hub area pages share (10 Oct 2026).
 * Andrew: "the pages are pretty bare and should be excellent". Each hub now
 * opens on a live picture of its area, drawn from these parts so the six pages
 * read as one family, in the Overview's language: calm panels, white text,
 * yellow only where something needs doing now, red for a problem, emerald
 * for done.
 *
 * Presentation only: nothing here fetches data or decides what a person may
 * see. Money is passed in only when the caller may see it.
 */
import { useId, useMemo, useState, type ComponentType, type ReactNode } from 'react';
import { format, isToday, parseISO } from 'date-fns';
import { cn } from '@/lib/utils';
import {
  colClass,
  twoColClass,
  panel,
  PanelTitle,
  Row,
  Rows,
  StatusPill,
  type PillTone,
} from '@/components/employer/pageParts/PageParts';

type IconType = ComponentType<{ className?: string }>;

/* ── Surface ────────────────────────────────────────────────────────── */

/**
 * The premium card the hub panels sit on (Andrew, 10 Oct: "make the cards feel
 * more premium"): a richer top-lit gradient, a soft inner highlight on the top
 * edge and a deep, quiet shadow so the card lifts off the page. Edge to edge
 * on a phone, inset and rounded from sm up. Never translucent yellow.
 */
export const premiumCard =
  '-mx-4 border-y border-white/[0.09] bg-gradient-to-b from-white/[0.085] to-white/[0.035] ' +
  'shadow-[inset_0_1px_0_rgba(255,255,255,0.07),0_18px_40px_-24px_rgba(0,0,0,0.9)] ' +
  'sm:mx-0 sm:rounded-[20px] sm:border';

/* ── Hub header ─────────────────────────────────────────────────────── */

/**
 * The area page's header: its trade icon on a solid brand-yellow tile (the
 * page's one splash of brand colour), the title and the live status line,
 * with the page's actions on the right. Solid yellow only, never a tint.
 */
export function HubHero({
  icon: Icon,
  title,
  description,
  actions,
}: {
  icon: IconType;
  title: string;
  description?: ReactNode;
  actions?: ReactNode;
}) {
  return (
    <header className="relative flex flex-col gap-4 pt-2 pb-1 sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:pt-4">
      <div className="flex min-w-0 items-center gap-4">
        <span
          aria-hidden
          className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-elec-yellow shadow-[0_12px_32px_-12px_hsl(var(--elec-yellow)/0.6)] sm:h-16 sm:w-16"
        >
          <Icon className="h-8 w-8 text-black sm:h-9 sm:w-9 [&_.stroke-elec-yellow]:stroke-black [&_.fill-elec-yellow]:fill-black" />
        </span>
        <div className="min-w-0">
          <h1 className="text-[28px] font-semibold leading-tight tracking-tight text-white sm:text-[34px]">
            {title}
          </h1>
          {description && (
            <p className="mt-1 max-w-2xl text-[14px] leading-snug text-white sm:text-[15px]">
              {description}
            </p>
          )}
        </div>
      </div>
      {actions && <div className="flex shrink-0 flex-wrap items-center gap-2">{actions}</div>}
    </header>
  );
}

/* ── Layout ─────────────────────────────────────────────────────────── */

/**
 * A column of live panels. Unlike `colClass` it is a flex column, so a panel
 * can move to the top on a phone (`phoneFirst`) when it is the most urgent.
 */
export const liveColClass = 'min-w-0 flex flex-col gap-6 sm:gap-8';
export const phoneFirst = 'max-lg:order-first';

/**
 * Bottom room on a phone so the floating Ask Mate button (bottom-20, 48px)
 * never sits on the last row once the page is scrolled to the end.
 */
export const matePad = 'pb-40 sm:pb-24';

/**
 * The area's pages, below the live view, on the same two-column grid as the
 * live panels (so the column edges line up), one after the other on a phone.
 */
export function LinkColumns({ left, right }: { left: ReactNode; right: ReactNode }) {
  return (
    <div className={twoColClass}>
      <div className={colClass}>{left}</div>
      <div className={colClass}>{right}</div>
    </div>
  );
}

/** A titled panel: the Overview's 16px title above an edge-to-edge card. */
export function LivePanel({
  title,
  meta,
  action,
  onAction,
  children,
  className,
  bodyClassName,
  help,
  fill = false,
}: {
  title: string;
  meta?: ReactNode;
  action?: string;
  onAction?: () => void;
  children: ReactNode;
  className?: string;
  bodyClassName?: string;
  help?: string;
  /** Stretch to the row's height, so panels side by side are the same size. */
  fill?: boolean;
}) {
  return (
    <section className={cn(fill && 'flex h-full flex-col', className)} data-help={help}>
      <PanelTitle title={title} meta={meta} action={action} onAction={onAction} />
      <div
        className={cn(
          premiumCard,
          'overflow-hidden',
          fill && 'flex flex-1 flex-col',
          bodyClassName
        )}
      >
        {children}
      </div>
    </section>
  );
}

/** A footer line inside a panel: one sentence and an optional yellow link. */
export function PanelFoot({
  children,
  action,
  onAction,
  tone,
}: {
  children: ReactNode;
  action?: string;
  onAction?: () => void;
  tone?: 'red';
}) {
  const body = (
    <>
      <span
        className={cn(
          'min-w-0 flex-1 text-[13px] leading-snug',
          tone === 'red' ? 'font-semibold text-red-300' : 'text-white'
        )}
      >
        {children}
      </span>
      {action && (
        <span className="shrink-0 text-[13px] font-semibold text-elec-yellow">{action}</span>
      )}
    </>
  );
  const cls =
    'flex min-h-[48px] w-full items-center gap-3 border-t border-white/[0.07] px-4 py-2.5 text-left sm:px-5';
  return onAction ? (
    <button
      type="button"
      onClick={onAction}
      className={cn(cls, 'touch-manipulation transition-colors hover:bg-white/[0.04]')}
    >
      {body}
    </button>
  ) : (
    <div className={cls}>{body}</div>
  );
}

/* ── Empty state ────────────────────────────────────────────────────── */

/**
 * A calm empty state for a live panel: the area's own icon, one short title,
 * one sentence and at most one quiet button. Drawn inside the panel.
 */
export function PanelEmpty({
  icon: Icon,
  title,
  text,
  action,
  onAction,
}: {
  icon?: IconType;
  title: string;
  text: ReactNode;
  action?: string;
  onAction?: () => void;
}) {
  return (
    <div className="flex items-start gap-3.5 px-4 py-5 sm:px-5">
      {Icon && (
        <span aria-hidden className="flex h-10 w-8 shrink-0 items-center justify-center">
          <Icon className="h-7 w-7" />
        </span>
      )}
      <div className="min-w-0 flex-1">
        <p className="text-[15px] font-semibold leading-snug text-white">{title}</p>
        <p className="mt-0.5 text-[13px] leading-snug text-white">{text}</p>
        {action && onAction && (
          <button
            type="button"
            onClick={onAction}
            className="mt-3 h-11 rounded-xl border border-white/[0.14] bg-white/[0.06] px-4 text-[14px] font-semibold text-white touch-manipulation hover:bg-white/[0.1]"
          >
            {action}
          </button>
        )}
      </div>
    </div>
  );
}

/* ── Link rows ──────────────────────────────────────────────────────── */

export interface HubLink {
  title: string;
  detail?: ReactNode;
  /** A meaningful right-hand figure: a count, a £ figure or a next date. */
  value?: ReactNode;
  /** One short line under the value ("overdue", "to approve"). */
  valueSub?: ReactNode;
  valueTone?: 'red' | 'volt' | 'green';
  /** At most one pill per row; it replaces the value's sub line. */
  pill?: { tone: PillTone; text: string };
  /** The detail line reads as a problem (red). */
  problem?: boolean;
  help?: string;
  onClick: () => void;
}

const valueToneClass = (t?: HubLink['valueTone']) =>
  t === 'red'
    ? 'text-red-400'
    : t === 'volt'
      ? 'text-elec-yellow'
      : t === 'green'
        ? 'text-emerald-400'
        : 'text-white';

/** A group of hub link rows under a title, each with its figure on the right. */
export function LinkGroup({
  title,
  meta,
  links,
  className,
  icon: Icon,
  fill = false,
}: {
  title: string;
  meta?: ReactNode;
  links: HubLink[];
  className?: string;
  /** The group's own trade icon, drawn in the card's header. */
  icon?: IconType;
  /** Stretch to the row's height, so a set of groups reads as matching cards. */
  fill?: boolean;
}) {
  return (
    <section className={cn(premiumCard, 'overflow-hidden', fill && 'flex h-full flex-col', className)}>
      <header className="flex items-center gap-3 border-b border-white/[0.07] px-4 py-3.5 sm:px-5">
        {Icon && <Icon className="h-6 w-6" />}
        <h2 className="min-w-0 flex-1 text-[15.5px] font-semibold tracking-tight text-white">{title}</h2>
        {meta && <span className="shrink-0 text-[12.5px] text-white">{meta}</span>}
      </header>
      <div className={cn(fill && 'flex-1')}>
        <Rows>
          {links.map((l) => (
            <Row
              key={l.title}
              data-help={l.help}
              title={l.title}
              detail={
                l.detail ? (
                  <span className={l.problem ? 'font-semibold text-red-300' : undefined}>
                    {l.detail}
                  </span>
                ) : undefined
              }
              wrapDetail
              amount={
                l.value !== undefined && l.value !== null ? (
                  // One line ("1 active", "£0 · 0 unpaid"); may wrap on a phone.
                  <span className="block max-w-[9.5rem] text-right sm:max-w-none sm:whitespace-nowrap">
                    <span className={valueToneClass(l.valueTone)}>{l.value}</span>
                    {l.valueSub && (
                      <span className="text-[13px] font-medium text-white">
                        {typeof l.value === 'string' && l.value.startsWith('£') ? ' · ' : ' '}
                        {l.valueSub}
                      </span>
                    )}
                  </span>
                ) : undefined
              }
              status={l.pill ? <StatusPill tone={l.pill.tone}>{l.pill.text}</StatusPill> : undefined}
              chevron
              onClick={l.onClick}
            />
          ))}
        </Rows>
      </div>
    </section>
  );
}

/* ── Work rows (a queue with one pill each) ─────────────────────────── */

export interface WorkItem {
  key: string;
  title: ReactNode;
  detail?: ReactNode;
  pill?: { tone: PillTone; text: string };
  lead?: ReactNode;
  onOpen?: () => void;
}

/** Rows of things to act on, each with one pill. */
export function WorkRows({ items }: { items: WorkItem[] }) {
  return (
    <Rows>
      {items.map((i) => (
        <Row
          key={i.key}
          lead={i.lead}
          title={i.title}
          detail={i.detail}
          status={i.pill ? <StatusPill tone={i.pill.tone}>{i.pill.text}</StatusPill> : undefined}
          onClick={i.onOpen}
        />
      ))}
    </Rows>
  );
}

/* ── Ranked rows ────────────────────────────────────────────────────── */

export interface RankedItem {
  key: string;
  title: string;
  detail?: ReactNode;
  value: string;
  /** 0..1, the row's share of the largest; drawn as a slim bar. */
  share: number;
  pill?: { tone: PillTone; text: string };
  onOpen?: () => void;
}

/**
 * A short ranked list (who owes most, top clients): each row carries its value
 * on the right and a slim bar for its size against the largest.
 */
export function RankedRows({ items }: { items: RankedItem[] }) {
  return (
    <ol className="divide-y divide-white/[0.07]">
      {items.map((i, n) => {
        const body = (
          <>
            <span
              aria-hidden
              className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-white/[0.16] text-[12.5px] font-semibold tabular-nums text-white"
            >
              {n + 1}
            </span>
            <span className="min-w-0 flex-1">
              <span className="flex items-baseline gap-3">
                <span className="min-w-0 flex-1 truncate text-[15px] font-semibold text-white">
                  {i.title}
                </span>
                <span className="shrink-0 text-[15px] font-semibold tabular-nums text-white">
                  {i.value}
                </span>
              </span>
              <span className="mt-1.5 block h-1 overflow-hidden rounded-full bg-white/[0.08]">
                <span
                  className="block h-full rounded-full bg-white/70"
                  style={{ width: `${Math.max(4, Math.min(100, i.share * 100))}%` }}
                />
              </span>
              {(i.detail || i.pill) && (
                <span className="mt-1.5 flex items-center gap-2">
                  {i.detail && (
                    <span className="min-w-0 flex-1 truncate text-[13px] text-white">
                      {i.detail}
                    </span>
                  )}
                  {i.pill && (
                    <StatusPill tone={i.pill.tone} className="ml-auto">
                      {i.pill.text}
                    </StatusPill>
                  )}
                </span>
              )}
            </span>
          </>
        );
        const cls = 'flex w-full min-h-[64px] items-start gap-3 px-4 py-3 text-left sm:px-5';
        return (
          <li key={i.key}>
            {i.onOpen ? (
              <button
                type="button"
                onClick={i.onOpen}
                className={cn(
                  cls,
                  'touch-manipulation transition-colors hover:bg-white/[0.04] active:bg-white/[0.06]'
                )}
              >
                {body}
              </button>
            ) : (
              <div className={cls}>{body}</div>
            )}
          </li>
        );
      })}
    </ol>
  );
}

/* ── Timeline ───────────────────────────────────────────────────────── */

export interface TimelineItem {
  key: string;
  /** yyyy-mm-dd (or ISO). Null = no date. */
  date: string | null;
  title: ReactNode;
  detail?: ReactNode;
  pill?: { tone: PillTone; text: string };
  onOpen?: () => void;
}

const asDate = (d: string) => parseISO(d.length === 10 ? `${d}T12:00:00` : d);

/** Dated rows: a small calendar block, a title, one detail line and one pill. */
export function TimelineList({ items }: { items: TimelineItem[] }) {
  return (
    <ul className="divide-y divide-white/[0.07]">
      {items.map((i) => {
        const d = i.date ? asDate(i.date) : null;
        const today = d ? isToday(d) : false;
        const body = (
          <>
            <span
              aria-hidden
              className={cn(
                'flex w-12 shrink-0 flex-col items-center rounded-xl border bg-black/25 py-1.5',
                today ? 'border-elec-yellow' : 'border-white/[0.14]'
              )}
            >
              <span className="text-[11px] font-semibold leading-none text-elec-yellow">
                {d ? (today ? 'Today' : format(d, 'MMM')) : 'No date'}
              </span>
              <span className="mt-1 text-[18px] font-bold leading-none tabular-nums text-white">
                {d ? format(d, 'd') : '–'}
              </span>
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-[15px] font-semibold leading-snug text-white line-clamp-2 sm:line-clamp-1">
                {i.title}
              </span>
              {i.detail && (
                <span className="mt-0.5 block text-[13px] text-white line-clamp-2 sm:line-clamp-1">
                  {i.detail}
                </span>
              )}
            </span>
            {i.pill && <StatusPill tone={i.pill.tone}>{i.pill.text}</StatusPill>}
          </>
        );
        const cls = 'flex w-full min-h-[64px] items-center gap-3 px-4 py-3 text-left sm:px-5';
        return (
          <li key={i.key}>
            {i.onOpen ? (
              <button
                type="button"
                onClick={i.onOpen}
                className={cn(
                  cls,
                  'touch-manipulation transition-colors hover:bg-white/[0.04] active:bg-white/[0.06]'
                )}
              >
                {body}
              </button>
            ) : (
              <div className={cls}>{body}</div>
            )}
          </li>
        );
      })}
    </ul>
  );
}

/* ── Week strip ─────────────────────────────────────────────────────── */

export interface WeekDay {
  /** yyyy-mm-dd */
  date: string;
  /** The day's main count (jobs on). */
  count: number;
  /** A second short line ("3 crew"). */
  sub?: string;
  /** Something on this day needs doing (a job with nobody booked). */
  flag?: boolean;
}

/**
 * Monday to Sunday at a glance: each day's count, a short second line, today
 * ringed in yellow. Seven columns on a phone too (no sideways scroll).
 */
export function WeekStrip({
  days,
  unit,
  onOpen,
}: {
  days: WeekDay[];
  /** Singular and plural for the count, for screen readers ("job", "jobs"). */
  unit: [string, string];
  onOpen?: (date: string) => void;
}) {
  return (
    <div className="grid grid-cols-7 gap-px bg-white/[0.07]">
      {days.map((d) => {
        const dt = asDate(d.date);
        const today = isToday(dt);
        const label = `${format(dt, 'EEEE d MMMM')}: ${d.count} ${d.count === 1 ? unit[0] : unit[1]}${d.sub ? `, ${d.sub}` : ''}`;
        const body = (
          <>
            <span
              className={cn(
                'text-[12px] font-semibold leading-none',
                today ? 'text-elec-yellow' : 'text-white'
              )}
            >
              {format(dt, 'EEE')}
            </span>
            <span className="mt-1 text-[11.5px] leading-none tabular-nums text-white">
              {format(dt, 'd')}
            </span>
            <span
              className={cn(
                'mt-2.5 text-[22px] font-semibold leading-none tabular-nums',
                'text-white'
              )}
            >
              {d.count === 0 ? '–' : d.count}
            </span>
            <span className="mt-1.5 min-h-[14px] text-[11px] leading-none text-white">
              {d.sub ?? ''}
            </span>
            {d.flag && (
              <span aria-hidden className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500" />
            )}
          </>
        );
        const cls = cn(
          'relative flex min-h-[104px] min-w-0 flex-col items-center bg-[hsl(0_0%_13%)] px-0.5 pb-3 pt-3 text-center',
          today && 'shadow-[inset_0_0_0_2px_hsl(var(--elec-yellow))]'
        );
        return onOpen ? (
          <button
            key={d.date}
            type="button"
            aria-label={label}
            onClick={() => onOpen(d.date)}
            className={cn(cls, 'touch-manipulation transition-colors hover:bg-[hsl(0_0%_16%)]')}
          >
            {body}
          </button>
        ) : (
          <div key={d.date} aria-label={label} className={cls}>
            {body}
          </div>
        );
      })}
    </div>
  );
}

/* ── Stage row (a pipeline as counts) ───────────────────────────────── */

export interface Stage {
  key: string;
  label: string;
  count: number;
  onOpen?: () => void;
}

/** The pipeline as one row of counts, in the order of the work. `narrow` keeps three a row. */
export function StageRow({ stages, narrow = false }: { stages: Stage[]; narrow?: boolean }) {
  const n = stages.length;
  return (
    <div
      className={cn(
        'grid gap-px bg-white/[0.07]',
        'grid-cols-3',
        !narrow && n === 4 && 'sm:grid-cols-4',
        !narrow && n === 5 && 'sm:grid-cols-5',
        !narrow && n >= 6 && 'sm:grid-cols-6'
      )}
    >
      {stages.map((s, i) => {
        const body = (
          <>
            <span className="text-[12px] font-semibold leading-tight text-white">{s.label}</span>
            <span
              className={cn(
                'mt-1.5 text-[22px] font-semibold leading-none tabular-nums',
                'text-white'
              )}
            >
              {s.count}
            </span>
            {!narrow && i < n - 1 && (
              <span
                aria-hidden
                className="absolute right-2 top-1/2 hidden -translate-y-1/2 text-[13px] text-white sm:block"
              >
                ›
              </span>
            )}
          </>
        );
        const cls =
          'relative flex min-h-[76px] min-w-0 flex-col justify-center bg-[hsl(0_0%_13%)] px-4 py-3 text-left';
        return s.onOpen ? (
          <button
            key={s.key}
            type="button"
            onClick={s.onOpen}
            className={cn(cls, 'touch-manipulation transition-colors hover:bg-[hsl(0_0%_16%)]')}
          >
            {body}
          </button>
        ) : (
          <div key={s.key} className={cls}>
            {body}
          </div>
        );
      })}
    </div>
  );
}

/* ── In-date share ──────────────────────────────────────────────────── */

/**
 * "9 of 11 in date": the true count with a segmented bar (one segment per
 * record up to 24, a continuous bar beyond), emerald in date, yellow due
 * soon, red expired. A legend names every colour.
 */
export function InDateBar({
  inDate,
  dueSoon,
  expired,
  noun,
}: {
  inDate: number;
  dueSoon: number;
  expired: number;
  noun: [string, string];
}) {
  const total = inDate + dueSoon + expired;
  const segs = useMemo(
    () => [
      ...Array(inDate).fill('bg-emerald-500'),
      ...Array(dueSoon).fill('bg-elec-yellow'),
      ...Array(expired).fill('bg-red-500'),
    ],
    [inDate, dueSoon, expired]
  );
  const pct = (n: number) => `${(n / Math.max(1, total)) * 100}%`;
  return (
    <div className="px-4 py-4 sm:px-5">
      <p className="text-[15px] font-semibold text-white">
        <span className="tabular-nums">{inDate + dueSoon}</span> of{' '}
        <span className="tabular-nums">{total}</span> {total === 1 ? noun[0] : noun[1]} in date
      </p>
      {total <= 24 ? (
        <div className="mt-3 flex gap-[2px]" aria-hidden>
          {segs.map((c, i) => (
            <span key={i} className={cn('h-2.5 min-w-0 flex-1 first:rounded-l-full last:rounded-r-full', c)} />
          ))}
        </div>
      ) : (
        <div className="mt-3 flex h-2.5 gap-[2px] overflow-hidden rounded-full" aria-hidden>
          {inDate > 0 && <span className="bg-emerald-500" style={{ width: pct(inDate) }} />}
          {dueSoon > 0 && <span className="bg-elec-yellow" style={{ width: pct(dueSoon) }} />}
          {expired > 0 && <span className="bg-red-500" style={{ width: pct(expired) }} />}
        </div>
      )}
      <div className="mt-2.5 flex flex-wrap gap-x-4 gap-y-1 text-[12.5px] text-white">
        <Key swatch="bg-emerald-500" label={`${inDate} in date`} />
        <Key swatch="bg-elec-yellow" label={`${dueSoon} due in 30 days`} />
        <Key swatch="bg-red-500" label={`${expired} expired`} />
      </div>
    </div>
  );
}

function Key({ swatch, label }: { swatch: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 tabular-nums">
      <span aria-hidden className={cn('h-2 w-2 rounded-full', swatch)} />
      {label}
    </span>
  );
}

/* ── Mini bar chart ─────────────────────────────────────────────────── */

export interface BarDatum {
  key: string;
  /** Axis label ("May"). */
  label: string;
  /** Full label for the readout ("May 2026"). */
  long: string;
  a: number;
  b: number;
}

/**
 * Two series as paired columns (money in, money out): one restrained chart.
 * Series A is the yellow accent, series B neutral. A readout line above the
 * plot names the month under the pointer (or tapped), defaulting to the
 * latest; a legend names both series and a hidden table carries every value.
 */
export function MiniBarChart({
  data,
  series,
  format: fmt,
  axisFormat,
}: {
  data: BarDatum[];
  series: [string, string];
  format: (n: number) => string;
  axisFormat?: (n: number) => string;
}) {
  const [sel, setSel] = useState<number>(data.length - 1);
  const tableId = useId();
  const cur = data[Math.min(Math.max(sel, 0), data.length - 1)];
  const max = Math.max(1, ...data.map((d) => Math.max(d.a, d.b)));
  const ticks = niceTicks(max);
  const top = ticks[ticks.length - 1] || 1;
  const axis = axisFormat ?? fmt;

  return (
    <div className="px-4 pb-4 pt-3.5 sm:px-5">
      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
        <div className="flex items-center gap-4 text-[12.5px] text-white">
          <span className="inline-flex items-center gap-1.5">
            <span aria-hidden className="h-2.5 w-2.5 rounded-[3px] bg-elec-yellow" />
            {series[0]}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span aria-hidden className="h-2.5 w-2.5 rounded-[3px] bg-white/45" />
            {series[1]}
          </span>
        </div>
        {cur && (
          <p className="text-[13px] text-white" aria-live="polite">
            <span className="font-semibold">{cur.long}</span>
            <span className="tabular-nums">
              {' · '}
              {series[0]} {fmt(cur.a)} · {series[1]} {fmt(cur.b)}
            </span>
          </p>
        )}
      </div>

      <div className="mt-6 flex gap-2" aria-describedby={tableId}>
        {/* Y axis: clean ticks, hairline grid. */}
        <div className="relative h-[148px] w-10 shrink-0" aria-hidden>
          {ticks.map((t) => (
            <span
              key={t}
              className="absolute right-0 -translate-y-1/2 text-[11px] tabular-nums text-white"
              style={{ bottom: `${(t / top) * 100}%` }}
            >
              {axis(t)}
            </span>
          ))}
        </div>
        <div className="min-w-0 flex-1">
          <div className="relative h-[148px]">
            {ticks.map((t) => (
              <span
                key={t}
                aria-hidden
                className={cn(
                  'absolute inset-x-0 h-px',
                  t === 0 ? 'bg-white/[0.22]' : 'bg-white/[0.07]'
                )}
                style={{ bottom: `${(t / top) * 100}%` }}
              />
            ))}
            <div className="absolute inset-0 flex">
              {data.map((d, i) => (
                <button
                  key={d.key}
                  type="button"
                  onMouseEnter={() => setSel(i)}
                  onFocus={() => setSel(i)}
                  onClick={() => setSel(i)}
                  aria-label={`${d.long}: ${series[0]} ${fmt(d.a)}, ${series[1]} ${fmt(d.b)}`}
                  className={cn(
                    'relative flex h-full min-w-0 flex-1 items-end justify-center gap-[2px] rounded-md touch-manipulation focus:outline-none focus-visible:ring-2 focus-visible:ring-elec-yellow/60',
                    i === sel && 'bg-white/[0.04]'
                  )}
                >
                  <span
                    className="w-full max-w-[16px] rounded-t-[4px] bg-elec-yellow"
                    style={{ height: d.a > 0 ? `max(2px, ${(d.a / top) * 100}%)` : 0 }}
                  />
                  <span
                    className="w-full max-w-[16px] rounded-t-[4px] bg-white/45"
                    style={{ height: d.b > 0 ? `max(2px, ${(d.b / top) * 100}%)` : 0 }}
                  />
                </button>
              ))}
            </div>
          </div>
          <div className="mt-2 flex" aria-hidden>
            {data.map((d, i) => (
              <span
                key={d.key}
                className={cn(
                  'min-w-0 flex-1 text-center text-[11.5px] text-white',
                  i === sel && 'font-semibold'
                )}
              >
                {d.label}
              </span>
            ))}
          </div>
        </div>
      </div>

      <table id={tableId} className="sr-only">
        <caption>
          {series[0]} and {series[1]} by month
        </caption>
        <thead>
          <tr>
            <th scope="col">Month</th>
            <th scope="col">{series[0]}</th>
            <th scope="col">{series[1]}</th>
          </tr>
        </thead>
        <tbody>
          {data.map((d) => (
            <tr key={d.key}>
              <th scope="row">{d.long}</th>
              <td>{fmt(d.a)}</td>
              <td>{fmt(d.b)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/** Three or four clean ticks from 0 to just above `max` (1, 2, 2.5 or 5 steps). */
function niceTicks(max: number): number[] {
  const raw = max / 3;
  const mag = Math.pow(10, Math.floor(Math.log10(raw)));
  const step = [1, 2, 2.5, 5, 10].map((m) => m * mag).find((s) => s >= raw) ?? 10 * mag;
  const out: number[] = [];
  for (let v = 0; v < max + step; v += step) {
    out.push(Math.round(v * 100) / 100);
    if (v >= max) break;
  }
  return out;
}

/* ── Small helpers ──────────────────────────────────────────────────── */

/** Whole days from today to a yyyy-mm-dd date (negative = past). */
export function daysFromToday(date: string): number {
  const d = asDate(date);
  const t = new Date();
  const a = Date.UTC(d.getFullYear(), d.getMonth(), d.getDate());
  const b = Date.UTC(t.getFullYear(), t.getMonth(), t.getDate());
  return Math.round((a - b) / 86_400_000);
}

/** "today", "in 3 days", "2 days ago". */
export function relDays(date: string): string {
  const n = daysFromToday(date);
  if (n === 0) return 'today';
  if (n === 1) return 'tomorrow';
  if (n === -1) return 'yesterday';
  return n > 0 ? `in ${n} days` : `${-n} days ago`;
}

/** Local yyyy-mm-dd for a Date (no UTC shift). */
export function ymd(d: Date): string {
  const m = `${d.getMonth() + 1}`.padStart(2, '0');
  const day = `${d.getDate()}`.padStart(2, '0');
  return `${d.getFullYear()}-${m}-${day}`;
}

/* ── Week schedule: the actual jobs each day ────────────────────────── */

export interface ScheduleJob {
  id: string;
  title: string;
  client?: string | null;
  /** Initials of the crew booked on it. */
  crew: string[];
  /** Starts this day, ends this day, or runs on through it. */
  span?: 'start' | 'end' | 'through' | 'single';
  problem?: boolean;
  onOpen?: () => void;
}

export interface ScheduleDay {
  date: string;
  jobs: ScheduleJob[];
}

function CrewDots({ crew }: { crew: string[] }) {
  if (crew.length === 0)
    return <span className="text-[11.5px] font-semibold text-red-300">No crew</span>;
  const shown = crew.slice(0, 3);
  return (
    <span className="flex items-center -space-x-1.5">
      {shown.map((c, i) => (
        <span
          key={`${c}-${i}`}
          className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-[hsl(0_0%_11%)] bg-white/[0.14] text-[10px] font-bold text-white"
        >
          {c}
        </span>
      ))}
      {crew.length > shown.length && (
        <span className="pl-2.5 text-[11.5px] font-semibold text-white">+{crew.length - shown.length}</span>
      )}
    </span>
  );
}

function ScheduleChip({ job, compact }: { job: ScheduleJob; compact?: boolean }) {
  const Tag = job.onOpen ? 'button' : 'div';
  return (
    <Tag
      {...(job.onOpen ? { type: 'button' as const, onClick: job.onOpen } : {})}
      className={cn(
        'block w-full rounded-xl border px-2.5 py-2 text-left transition-colors touch-manipulation',
        'border-white/[0.09] bg-white/[0.06]',
        // Late or no crew: a red edge, not a red card.
        job.problem && 'shadow-[inset_3px_0_0_rgb(248,113,113)]',
        job.onOpen && 'hover:bg-white/[0.09]'
      )}
    >
      <span className={cn('block text-[13px] font-semibold leading-snug text-white', compact ? 'line-clamp-2' : 'line-clamp-1')}>
        {job.title}
      </span>
      {job.client && (
        <span className="mt-0.5 block truncate text-[11.5px] leading-snug text-white">{job.client}</span>
      )}
      <span className="mt-1.5 flex items-center justify-between gap-2">
        <CrewDots crew={job.crew} />
        {job.span && job.span !== 'single' && (
          <span className="text-[11px] font-medium text-white">
            {job.span === 'start' ? 'Starts' : job.span === 'end' ? 'Ends' : 'On'}
          </span>
        )}
      </span>
    </Tag>
  );
}

/**
 * The week as a schedule: on a desktop seven day columns with each day's jobs
 * as small cards (job, client, crew); on a phone an agenda of the days that
 * have work, today first. Today is marked by its date in yellow and a lighter
 * column, never a box.
 */
export function WeekSchedule({ days, maxPerDay = 3 }: { days: ScheduleDay[]; maxPerDay?: number }) {
  const todayKey = ymd(new Date());
  const busy = days.filter((d) => d.jobs.length > 0 || d.date === todayKey);
  const quiet = days.filter((d) => d.jobs.length === 0 && d.date !== todayKey);
  return (
    <>
      {/* Desktop and tablet: seven columns */}
      <div className="hidden grid-cols-7 divide-x divide-white/[0.06] md:grid">
        {days.map((d) => {
          const isTodayCol = d.date === todayKey;
          const dt = parseISO(d.date);
          const extra = d.jobs.length - maxPerDay;
          return (
            <div
              key={d.date}
              className={cn(
                'relative min-h-[168px] min-w-0 px-2 pt-3 pb-3',
                isTodayCol && 'bg-white/[0.045] before:absolute before:inset-x-0 before:top-0 before:h-[3px] before:bg-elec-yellow'
              )}
            >
              <div className="mb-2.5 flex items-baseline justify-between px-0.5">
                <span className={cn('text-[12.5px] font-semibold', isTodayCol ? 'text-elec-yellow' : 'text-white')}>
                  {format(dt, 'EEE')}
                </span>
                <span className={cn('text-[18px] font-semibold tabular-nums leading-none', isTodayCol ? 'text-elec-yellow' : 'text-white')}>
                  {format(dt, 'd')}
                </span>
              </div>
              <div className="space-y-1.5">
                {d.jobs.slice(0, maxPerDay).map((j) => (
                  <ScheduleChip key={j.id} job={j} compact />
                ))}
                {extra > 0 && (
                  <p className="px-0.5 text-[12px] font-semibold text-white">+{extra} more</p>
                )}
                {d.jobs.length === 0 && (
                  <p className="px-0.5 pt-1 text-[12px] text-white">Free</p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Phone: an agenda of the days with work, today always shown */}
      <div className="divide-y divide-white/[0.07] md:hidden">
        {busy.map((d) => {
          const isTodayCol = d.date === todayKey;
          const dt = parseISO(d.date);
          return (
            <div key={d.date} className="flex gap-3 px-4 py-3">
              <div className="w-11 shrink-0 pt-0.5 text-center">
                <span className={cn('block text-[12px] font-semibold', isTodayCol ? 'text-elec-yellow' : 'text-white')}>
                  {isTodayCol ? 'Today' : format(dt, 'EEE')}
                </span>
                <span className={cn('block text-[20px] font-semibold tabular-nums leading-tight', isTodayCol ? 'text-elec-yellow' : 'text-white')}>
                  {format(dt, 'd')}
                </span>
              </div>
              <div className="min-w-0 flex-1 space-y-1.5">
                {d.jobs.length === 0 ? (
                  <p className="pt-2 text-[13px] text-white">Nothing booked</p>
                ) : (
                  d.jobs.map((j) => <ScheduleChip key={j.id} job={j} />)
                )}
              </div>
            </div>
          );
        })}
        {quiet.length > 0 && (
          <p className="px-4 py-3 text-[13px] leading-snug text-white">
            Free: {quiet.map((d) => format(parseISO(d.date), 'EEE d')).join(', ')}
          </p>
        )}
      </div>
    </>
  );
}

/* ── Flow row: a pipeline in one line ───────────────────────────────── */

export interface FlowStage {
  key: string;
  label: string;
  count: number;
  /** Optional value under the count (money only when the caller may see it). */
  sub?: string;
  current?: boolean;
  onOpen?: () => void;
}

/**
 * Stages left to right in one slim row with a chevron between each, so a
 * pipeline reads as a flow, not a grid of zeros. Scrolls sideways on a phone.
 */
export function FlowRow({ stages }: { stages: FlowStage[] }) {
  return (
    <div className="flex overflow-x-auto overscroll-x-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {stages.map((s, i) => {
        const Tag = s.onOpen ? 'button' : 'div';
        return (
          <div key={s.key} className="flex min-w-[118px] flex-1 items-center">
            <Tag
              {...(s.onOpen ? { type: 'button' as const, onClick: s.onOpen } : {})}
              className={cn(
                'flex min-h-[76px] w-full flex-col justify-center px-4 py-3 text-left touch-manipulation sm:px-5',
                s.onOpen && 'transition-colors hover:bg-white/[0.04]'
              )}
            >
              <span className="whitespace-nowrap text-[12.5px] font-semibold text-white">{s.label}</span>
              <span
                className={cn(
                  'mt-0.5 text-[24px] font-semibold tabular-nums leading-tight',
                  s.count > 0 ? 'text-elec-yellow' : 'text-white'
                )}
              >
                {s.count}
              </span>
              {s.sub && <span className="whitespace-nowrap text-[12px] text-white">{s.sub}</span>}
              <span
                aria-hidden
                className={cn(
                  'mt-2.5 block h-[3px] w-full rounded-full',
                  s.count > 0 ? 'bg-elec-yellow' : 'bg-white/[0.08]'
                )}
              />
            </Tag>
            {i < stages.length - 1 && (
              <svg aria-hidden viewBox="0 0 8 24" className="h-6 w-2 shrink-0 text-white/40" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M1 2l6 10-6 10" />
              </svg>
            )}
          </div>
        );
      })}
    </div>
  );
}
