/**
 * Worker Tools home, laid out like the College Hub's Assessment page (Andrew,
 * 6 Oct): a headline that is a verdict, a work queue where every row has its
 * own action, a "your week" column of figures, dated "coming up" tiles, and
 * the tools as grouped list cards with counts.
 */
import { useMemo, useState, type ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { format, parseISO } from 'date-fns';
import { Check, ChevronRight, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';

/* ── Hero ─────────────────────────────────────────────────────────────── */

export function WorkerHero({
  eyebrow,
  headline,
  summary,
  actions,
}: {
  eyebrow: string;
  headline: string;
  summary: string;
  actions: ReactNode;
}) {
  return (
    <section className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between pt-1">
      <div className="min-w-0">
        <p className="text-[11px] font-semibold text-elec-yellow truncate">
          {eyebrow}
        </p>
        <h1 className="mt-1.5 text-[28px] sm:text-[36px] font-semibold tracking-tight text-white leading-[1.1]">
          {headline}
        </h1>
        <p className="mt-2 max-w-2xl text-[14px] sm:text-[15px] leading-relaxed text-white">
          {summary}
        </p>
      </div>
      {/* Phone: the main action full width, the rest two-up beneath it. */}
      <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:items-center shrink-0">
        {actions}
      </div>
    </section>
  );
}

export function HeroButton({
  children,
  onClick,
  primary,
}: {
  children: ReactNode;
  onClick: () => void;
  primary?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'h-12 rounded-2xl px-5 text-[15px] font-semibold touch-manipulation',
        primary
          ? 'col-span-2 sm:col-span-1 bg-elec-yellow text-black'
          : 'border border-white/[0.18] bg-white/[0.06] text-white'
      )}
    >
      {children}
    </button>
  );
}

/* ── Panel heading ────────────────────────────────────────────────────── */

export function PanelTitle({
  title,
  action,
  onAction,
}: {
  title: string;
  action?: string;
  onAction?: () => void;
}) {
  return (
    <div className="flex items-end justify-between gap-3 mb-3">
      <h2 className="text-[16px] font-semibold tracking-tight text-white">{title}</h2>
      {action && onAction && (
        <button
          type="button"
          onClick={onAction}
          className="h-11 -my-3 flex items-center gap-1 text-[13px] font-semibold text-elec-yellow touch-manipulation"
        >
          {action}
          <ChevronRight className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}

const panel =
  '-mx-4 sm:mx-0 border-y sm:border sm:rounded-2xl border-white/[0.12] bg-gradient-to-b from-white/[0.07] to-white/[0.03]';

/* ── To do now ────────────────────────────────────────────────────────── */

export interface TodoItem {
  key: string;
  kind: string;
  title: string;
  detail: string;
  /** Waiting / due line — red when urgent. */
  meta?: string;
  urgent?: boolean;
  action: string;
  to: string;
  /** One or two letters for the round badge. */
  badge: string;
}

export function TodoQueue({ items }: { items: TodoItem[] }) {
  const navigate = useNavigate();
  const kinds = useMemo(() => {
    const m = new Map<string, number>();
    items.forEach((i) => m.set(i.kind, (m.get(i.kind) ?? 0) + 1));
    return [...m.entries()];
  }, [items]);
  const [kind, setKind] = useState<string | null>(null);
  const shown = kind ? items.filter((i) => i.kind === kind) : items;

  if (items.length === 0) {
    return (
      <div
        className={cn(
          panel,
          'flex items-center gap-3 px-4 py-3.5 sm:block sm:px-5 sm:py-8 sm:text-center'
        )}
      >
        <span
          aria-hidden
          className="h-9 w-9 shrink-0 rounded-full bg-emerald-500 text-black flex items-center justify-center sm:hidden"
        >
          <Check className="h-5 w-5" />
        </span>
        <div>
          <p className="text-[15px] sm:text-[16px] font-semibold text-white">
            Nothing waiting on you
          </p>
          <p className="mt-0.5 sm:mt-1 text-[12.5px] sm:text-[13px] text-white">
            Sign-offs, safety actions and anything sent back land here.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={panel}>
      {kinds.length > 1 && (
        <div className="flex flex-wrap gap-2 px-4 pt-4 sm:px-5">
          {[[null, items.length] as const, ...kinds].map(([k, n]) => (
            <button
              key={k ?? 'all'}
              type="button"
              onClick={() => setKind(k)}
              className={cn(
                'h-11 rounded-full px-3.5 text-[13px] font-semibold border touch-manipulation',
                kind === k
                  ? 'bg-elec-yellow text-black border-elec-yellow'
                  : 'bg-white/[0.04] text-white border-white/[0.14]'
              )}
            >
              {k ?? 'All'} <span className="ml-1 tabular-nums">{n}</span>
            </button>
          ))}
        </div>
      )}
      <ul className="divide-y divide-white/[0.07] mt-2">
        {shown.map((i) => (
          <li key={i.key} className="flex items-center gap-3 px-4 py-3.5 sm:px-5">
            <span
              aria-hidden
              className={cn(
                'h-10 w-10 shrink-0 rounded-full flex items-center justify-center text-[13px] font-bold',
                i.urgent ? 'bg-red-500 text-white' : 'bg-elec-yellow text-black'
              )}
            >
              {i.badge}
            </span>
            <div className="min-w-0 flex-1">
              <p className="flex flex-wrap items-center gap-2">
                <span className="text-[15px] font-semibold text-white">{i.title}</span>
                <span className="rounded-full border border-white/[0.16] px-2 py-0.5 text-[11px] font-semibold text-white">
                  {i.kind}
                </span>
              </p>
              <p className="mt-0.5 text-[13px] text-white line-clamp-2">{i.detail}</p>
              {i.meta && (
                <p
                  className={cn(
                    'mt-0.5 text-[12.5px] font-medium',
                    i.urgent ? 'text-red-300' : 'text-elec-yellow'
                  )}
                >
                  {i.meta}
                </p>
              )}
            </div>
            <button
              type="button"
              onClick={() => navigate(i.to)}
              className="h-11 shrink-0 rounded-xl bg-elec-yellow px-4 text-[14px] font-semibold text-black touch-manipulation"
            >
              {i.action}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ── Your week ────────────────────────────────────────────────────────── */

export interface WeekRow {
  label: string;
  sub: string;
  value: string;
  /** volt for outstanding, red for a problem, green for good news. */
  tone?: 'volt' | 'red' | 'green';
  to: string;
}

const toneText = (t?: WeekRow['tone']) =>
  t === 'red'
    ? 'text-red-400'
    : t === 'volt'
      ? 'text-elec-yellow'
      : t === 'green'
        ? 'text-emerald-400'
        : 'text-white';

export function WeekList({ rows }: { rows: WeekRow[] }) {
  const navigate = useNavigate();
  return (
    <>
      {/* Phone: tiles, two-up — five tall rows were a screen and a half. */}
      <div className="grid grid-cols-2 gap-2 sm:hidden">
        {rows.map((r, i) => (
          <button
            key={r.label}
            type="button"
            onClick={() => navigate(r.to)}
            className={cn(
              'rounded-2xl border border-white/[0.12] bg-gradient-to-b from-white/[0.07] to-white/[0.03] p-3.5 text-left touch-manipulation',
              rows.length % 2 === 1 && i === rows.length - 1 && 'col-span-2'
            )}
          >
            <span className="block text-[12px] font-semibold text-white">{r.label}</span>
            <span
              className={cn(
                'mt-1.5 block text-[24px] font-semibold tabular-nums leading-none tracking-tight',
                toneText(r.tone)
              )}
            >
              {r.value}
            </span>
            <span
              className={cn(
                'mt-1.5 block text-[11.5px] leading-snug line-clamp-2',
                r.tone === 'red'
                  ? 'text-red-300'
                  : r.tone === 'volt'
                    ? 'text-elec-yellow'
                    : 'text-white'
              )}
            >
              {r.sub}
            </span>
          </button>
        ))}
      </div>
      <ul className={cn(panel, 'hidden sm:block divide-y divide-white/[0.07]')}>
        {rows.map((r) => (
          <li key={r.label}>
            <button
              type="button"
              onClick={() => navigate(r.to)}
              className="w-full flex items-center gap-3 px-4 py-4 sm:px-5 text-left touch-manipulation"
            >
              <span className="min-w-0 flex-1">
                <span className="block text-[15px] font-semibold text-white">{r.label}</span>
                <span
                  className={cn(
                    'block text-[12.5px]',
                    r.tone === 'red'
                      ? 'text-red-300'
                      : r.tone === 'volt'
                        ? 'text-elec-yellow'
                        : 'text-white'
                  )}
                >
                  {r.sub}
                </span>
              </span>
              <span
                className={cn(
                  'text-[26px] font-semibold tabular-nums tracking-tight',
                  r.tone === 'red'
                    ? 'text-red-400'
                    : r.tone === 'volt'
                      ? 'text-elec-yellow'
                      : r.tone === 'green'
                        ? 'text-emerald-400'
                        : 'text-white'
                )}
              >
                {r.value}
              </span>
              <ChevronRight className="h-4 w-4 text-white shrink-0" aria-hidden />
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}

/* ── Coming up ────────────────────────────────────────────────────────── */

export interface UpcomingItem {
  kind: 'job' | 'leave' | 'task' | 'expiry';
  date: string;
  title: string;
  detail: string | null;
  id: string | null;
}

const KIND_LABEL: Record<UpcomingItem['kind'], string> = {
  job: 'Job',
  leave: 'Leave',
  task: 'Task',
  expiry: 'Expiry',
};

export function ComingUp({ items, base }: { items: UpcomingItem[]; base: string }) {
  const navigate = useNavigate();
  if (items.length === 0) return null;
  const to = (i: UpcomingItem) =>
    i.kind === 'job'
      ? `${base}/jobs${i.id ? `?job=${i.id}` : ''}`
      : i.kind === 'leave'
        ? `${base}/leave`
        : i.kind === 'task'
          ? `${base}/tasks${i.id ? `?task=${i.id}` : ''}`
          : `${base}/credentials`;
  return (
    <section>
      <PanelTitle title="Coming up" />
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {items.slice(0, 6).map((i, n) => {
          const d = parseISO(i.date);
          return (
            <button
              key={`${i.kind}-${i.id ?? n}`}
              type="button"
              onClick={() => navigate(to(i))}
              className="flex items-start gap-3 rounded-2xl border border-white/[0.12] bg-gradient-to-b from-white/[0.07] to-white/[0.03] p-3.5 text-left touch-manipulation"
            >
              <span className="shrink-0 w-12 rounded-xl border border-white/[0.14] bg-black/30 py-1.5 text-center">
                <span className="block text-[10.5px] font-bold uppercase text-elec-yellow">
                  {format(d, 'EEE')}
                </span>
                <span className="block text-[18px] font-bold leading-tight text-white">
                  {format(d, 'd')}
                </span>
              </span>
              <span className="min-w-0">
                <span className="block text-[14px] font-semibold text-white line-clamp-2">
                  {i.title}
                </span>
                <span className="mt-0.5 flex items-center gap-1 text-[12px] text-white">
                  {i.kind === 'job' && i.detail && (
                    <MapPin className="h-3 w-3 shrink-0" aria-hidden />
                  )}
                  <span className="line-clamp-1">
                    {i.detail ? `${i.detail}` : KIND_LABEL[i.kind]}
                  </span>
                </span>
                <span className="mt-1 block text-[11px] font-semibold text-white">
                  {KIND_LABEL[i.kind]}
                </span>
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}

/* ── Tools ────────────────────────────────────────────────────────────── */

export interface ToolRow {
  id: string;
  title: string;
  description: string;
  badge?: number;
  to?: string;
  onClick?: () => void;
}

export interface ToolGroup {
  heading: string;
  rows: ToolRow[];
}

export function ToolGroups({ groups }: { groups: ToolGroup[] }) {
  const navigate = useNavigate();
  const visible = groups.filter((g) => g.rows.length > 0);
  return (
    <section>
      <PanelTitle title="Tools" />
      <div
        className={cn(
          'grid grid-cols-1 gap-3 sm:grid-cols-2',
          visible.length >= 4 ? 'xl:grid-cols-4' : 'xl:grid-cols-3'
        )}
      >
        {visible.map((g) => (
          <div
            key={g.heading}
            className="rounded-2xl border border-white/[0.12] bg-gradient-to-b from-white/[0.07] to-white/[0.03] overflow-hidden"
          >
            <p className="px-4 pt-4 pb-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-elec-yellow">
              {g.heading}
            </p>
            <ul className="divide-y divide-white/[0.07]">
              {g.rows.map((r) => (
                <li key={r.id}>
                  <button
                    type="button"
                    onClick={() => (r.onClick ? r.onClick() : r.to && navigate(r.to))}
                    className="w-full flex items-center gap-3 px-4 py-2.5 sm:py-3 text-left min-h-[56px] sm:min-h-[60px] touch-manipulation"
                  >
                    <span className="min-w-0 flex-1">
                      <span className="block text-[15px] font-semibold text-white">{r.title}</span>
                      <span className="block text-[12.5px] text-white line-clamp-1 sm:line-clamp-2">
                        {r.description}
                      </span>
                    </span>
                    {r.badge ? (
                      <span className="shrink-0 min-w-6 h-6 px-1.5 rounded-full bg-elec-yellow text-black text-[12px] font-bold flex items-center justify-center tabular-nums">
                        {r.badge}
                      </span>
                    ) : null}
                    <ChevronRight className="h-4 w-4 text-white shrink-0" aria-hidden />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ── Your shift: clock, this week as bars, next job ───────────────────── */

export function ShiftPanel({
  isClockedIn,
  duration,
  todaysHours,
  weekDays,
  weekHours,
  shiftJob,
  nextJob,
  onClock,
  onOpenJob,
}: {
  isClockedIn: boolean;
  duration: string;
  todaysHours: number;
  weekDays: { date: string; hours: number }[];
  weekHours: number;
  shiftJob?: string | null;
  nextJob?: { id: string; title: string; location: string | null; starts: string | null } | null;
  onClock: () => void;
  onOpenJob: (id: string) => void;
}) {
  const todayIso = format(new Date(), 'yyyy-MM-dd');
  // Scale to a working day so one short day doesn't look like a full one.
  const max = Math.max(8, ...weekDays.map((d) => Number(d.hours) || 0));
  const maps = nextJob?.location
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(nextJob.location)}`
    : null;

  return (
    <div className={cn(panel, 'overflow-hidden')}>
      <div className="grid gap-3 sm:gap-5 p-4 sm:p-5 sm:grid-cols-[auto_1fr] sm:items-end">
        <div>
          <p className="flex items-center justify-between gap-3 text-[12px] font-semibold text-white">
            {isClockedIn ? 'On the clock' : todaysHours > 0 ? 'Logged today' : 'Not clocked in'}
            <button
              type="button"
              onClick={onClock}
              className="h-11 -my-3 px-1 text-[13px] font-semibold text-elec-yellow underline underline-offset-4 touch-manipulation sm:hidden"
            >
              See timesheets
            </button>
          </p>
          <p
            className={cn(
              'mt-1 text-[38px] font-semibold tabular-nums leading-none tracking-tight',
              isClockedIn ? 'text-elec-yellow' : 'text-white'
            )}
          >
            {isClockedIn ? duration : `${todaysHours.toFixed(1)}h`}
          </p>
          <p className="mt-1.5 text-[13px] text-white">
            {isClockedIn && shiftJob ? `on ${shiftJob}` : `${weekHours}h this week`}
          </p>
          <button
            type="button"
            onClick={onClock}
            className="mt-3 h-11 -ml-1 px-1 text-[13px] font-semibold text-elec-yellow underline underline-offset-4 touch-manipulation hidden sm:inline-block"
          >
            See timesheets
          </button>
        </div>

        {weekDays.length === 7 && (
          <div
            aria-label="Hours this week"
            className="flex h-[104px] sm:h-[132px] items-end justify-between gap-2 sm:pl-6"
          >
            {weekDays.map((d) => {
              const hrs = Number(d.hours) || 0;
              const isToday = d.date === todayIso;
              return (
                <div key={d.date} className="flex flex-1 flex-col items-center gap-1.5">
                  <span className="h-4 text-[11px] font-semibold tabular-nums text-white">
                    {hrs > 0 ? hrs : ''}
                  </span>
                  <div className="flex h-[60px] sm:h-[84px] w-full max-w-[34px] items-end rounded-lg bg-white/[0.06]">
                    <div
                      className={cn(
                        'w-full rounded-lg',
                        isToday ? 'bg-elec-yellow' : 'bg-white/70'
                      )}
                      style={{ height: hrs > 0 ? `${Math.max(8, (hrs / max) * 100)}%` : '0%' }}
                    />
                  </div>
                  <span
                    className={cn(
                      'text-[11px] font-semibold',
                      isToday ? 'text-elec-yellow' : 'text-white'
                    )}
                  >
                    {format(parseISO(d.date), 'EEEEE')}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {nextJob && (
        <div className="flex items-stretch border-t border-white/[0.08]">
          <button
            type="button"
            onClick={() => onOpenJob(nextJob.id)}
            className="min-w-0 flex-1 px-4 py-3.5 text-left sm:px-5 touch-manipulation"
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-elec-yellow">
              Next job
              {nextJob.starts
                ? ` · ${format(parseISO(nextJob.starts), 'yyyy-MM-dd') === todayIso ? 'Today' : format(parseISO(nextJob.starts), 'EEE d MMM')}`
                : ''}
            </p>
            <p className="mt-1 text-[15px] font-semibold text-white line-clamp-1">
              {nextJob.title}
            </p>
            {nextJob.location && (
              <p className="mt-0.5 text-[13px] text-white line-clamp-1">{nextJob.location}</p>
            )}
          </button>
          {maps && (
            <a
              href={maps}
              target="_blank"
              rel="noreferrer"
              className="flex w-[92px] shrink-0 flex-col items-center justify-center gap-1 border-l border-white/[0.08] text-white touch-manipulation"
            >
              <MapPin className="h-5 w-5" aria-hidden />
              <span className="text-[12px] font-semibold">Directions</span>
            </a>
          )}
        </div>
      )}
    </div>
  );
}

/* ── Phone: the clock under your thumb ────────────────────────────────── */

/**
 * Once the hero's Clock in button has scrolled away, a slim bar pinned above
 * the bottom edge keeps it one tap away — the way a native app keeps its main
 * action reachable. Phones only.
 */
export function StickyClockBar({
  visible,
  isClockedIn,
  label,
  onClock,
}: {
  visible: boolean;
  isClockedIn: boolean;
  label: string;
  onClock: () => void;
}) {
  return (
    <div
      aria-hidden={!visible}
      className={cn(
        'fixed inset-x-0 bottom-0 z-40 sm:hidden transition-transform duration-200',
        visible ? 'translate-y-0' : 'translate-y-full pointer-events-none'
      )}
    >
      <div className="border-t border-white/[0.12] bg-[hsl(0_0%_8%)]/95 backdrop-blur px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
        <div className="flex items-center gap-3">
          <p className="min-w-0 flex-1 text-[13px] font-semibold text-white truncate">{label}</p>
          <button
            type="button"
            onClick={onClock}
            tabIndex={visible ? 0 : -1}
            className={cn(
              'h-11 shrink-0 rounded-xl px-5 text-[14px] font-semibold touch-manipulation',
              isClockedIn
                ? 'border border-white/[0.18] bg-white/[0.06] text-white'
                : 'bg-elec-yellow text-black'
            )}
          >
            {isClockedIn ? 'Clock out' : 'Clock in'}
          </button>
        </div>
      </div>
    </div>
  );
}
