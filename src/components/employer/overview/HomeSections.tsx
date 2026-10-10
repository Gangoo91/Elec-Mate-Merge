/**
 * Employer Hub Overview — the boss's morning briefing (ELE-1939 / ELE-1819).
 *
 * Same language as the Worker Tools home Andrew approved on 6 Oct: a verdict
 * headline, one work queue where every row has its own action, figures as
 * two-up tiles on a phone, and quiet cards for everything else. All text is
 * full white; volt marks outstanding work, red marks a problem.
 */
import { useMemo, useState, type ReactNode } from 'react';
import { format, parseISO } from 'date-fns';
import { Check, ChevronRight, Copy, QrCode, Share2, Sparkles, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { areaIconFor } from '@/components/employer/overview/HubIcons';

export type Params = Record<string, string>;

/* ── Shared shells ────────────────────────────────────────────────────── */

export const panel =
  '-mx-4 sm:mx-0 border-y sm:border sm:rounded-2xl border-white/[0.08] bg-gradient-to-b from-white/[0.08] to-white/[0.04]';

export function PanelTitle({
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
    <div className="flex items-end justify-between gap-3 mb-3">
      <div className="flex min-w-0 items-baseline gap-2">
        <h2 className="text-[16px] font-semibold tracking-tight text-white">{title}</h2>
        {meta && <span className="text-[13px] text-white truncate">{meta}</span>}
      </div>
      {action && onAction && (
        <button
          type="button"
          onClick={onAction}
          className="h-11 -my-3 flex shrink-0 items-center gap-1 text-[13px] font-semibold text-elec-yellow touch-manipulation"
        >
          {action}
          <ChevronRight className="h-4 w-4" aria-hidden />
        </button>
      )}
    </div>
  );
}

/* ── Hero ─────────────────────────────────────────────────────────────── */

export function HomeHero({
  eyebrow,
  headline,
  summary,
  tools,
  actions,
  aside,
}: {
  eyebrow: string;
  headline: string;
  summary: string;
  tools: ReactNode;
  actions: ReactNode;
  /** Wide screens only: drawn to the right of the headline (the money strip). */
  aside?: ReactNode;
}) {
  return (
    <section className="pt-3 sm:pt-6">
      <div className="flex items-center justify-between gap-3">
        <p className="min-w-0 text-[11px] font-semibold text-elec-yellow truncate">
          {eyebrow}
        </p>
        <div className="-mr-1 flex shrink-0 items-center gap-1.5">{tools}</div>
      </div>
      <div
        className={cn(
          'mt-1.5 grid gap-4 lg:items-end',
          aside
            ? 'lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-8'
            : 'lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-8'
        )}
      >
        <div className="min-w-0">
          <h1 className="text-[26px] sm:text-[34px] font-semibold tracking-tight text-white leading-[1.1]">
            {headline}
          </h1>
          <p className="mt-1.5 max-w-2xl text-[14px] sm:text-[15px] leading-relaxed text-white">{summary}</p>
          {/* Phone: the main action full width, the rest share one row evenly. */}
          {aside && <div className="mt-4 flex flex-wrap gap-2 sm:flex-nowrap sm:items-center">{actions}</div>}
        </div>
        {aside ? (
          <div className="hidden min-w-0 lg:block">{aside}</div>
        ) : (
          <div className="flex flex-wrap gap-2 sm:flex-nowrap sm:items-center lg:shrink-0">{actions}</div>
        )}
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
      title={typeof children === 'string' ? children : undefined}
      className={cn(
        'h-11 sm:h-12 min-w-0 rounded-xl sm:rounded-2xl px-4 sm:px-5 text-[14.5px] sm:text-[15px] font-semibold touch-manipulation truncate whitespace-nowrap',
        primary
          ? 'basis-full sm:basis-auto sm:max-w-[22rem] bg-elec-yellow text-black'
          : 'flex-1 basis-0 sm:flex-none sm:basis-auto border border-white/[0.18] bg-white/[0.06] text-white'
      )}
    >
      {children}
    </button>
  );
}

/* ── To do ────────────────────────────────────────────────────────────── */

export interface HomeTodo {
  key: string;
  /** Group chip: Safety, People, Jobs, Money, Paperwork. */
  kind: string;
  title: string;
  detail: string;
  meta?: string;
  urgent?: boolean;
  action: string;
  section: string;
  params?: Params;
  badge: string;
  /** Lower = more urgent. */
  rank: number;
}

/** The area the task belongs to, drawn as its hub icon; a red dot when urgent. */
function TodoIcon({ section, urgent }: { section: string; urgent?: boolean }) {
  const Icon = areaIconFor(section);
  return (
    <span aria-hidden className="relative flex h-10 w-8 shrink-0 items-center justify-center">
      <Icon className="h-7 w-7" />
      {urgent && (
        <span className="absolute -right-0.5 top-1 h-2.5 w-2.5 rounded-full bg-red-500 ring-2 ring-[hsl(0_0%_10%)]" />
      )}
    </span>
  );
}

export function TodoList({
  items,
  onGo,
}: {
  items: HomeTodo[];
  onGo: (section: string, params?: Params) => void;
}) {
  const kinds = useMemo(() => {
    const m = new Map<string, number>();
    items.forEach((i) => m.set(i.kind, (m.get(i.kind) ?? 0) + 1));
    return [...m.entries()];
  }, [items]);
  const [kind, setKind] = useState<string | null>(null);
  const [all, setAll] = useState(false);
  const filtered = kind ? items.filter((i) => i.kind === kind) : items;
  // A long morning shows the six most urgent; the rest are one tap away.
  const LIMIT = 6;
  const shown = all || kind ? filtered : filtered.slice(0, LIMIT);
  const hiddenCount = filtered.length - shown.length;

  if (items.length === 0) {
    return (
      <div className={cn(panel, 'flex items-center gap-3 px-4 py-3.5 sm:px-5 sm:py-4')}>
        <span
          aria-hidden
          className="h-9 w-9 shrink-0 rounded-full bg-emerald-500 text-black flex items-center justify-center"
        >
          <Check className="h-5 w-5" />
        </span>
        <div className="min-w-0">
          <p className="text-[15px] font-semibold text-white">All clear</p>
          <p className="mt-0.5 text-[13px] text-white">
            Approvals, safety, expiring tickets and unbooked jobs land here.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={panel}>
      {items.length > 4 && kinds.length > 1 && (
        <div className="flex gap-2 overflow-x-auto overscroll-x-contain px-4 pt-3.5 pb-2 sm:px-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden border-b border-white/[0.07] after:shrink-0 after:w-2 after:content-['']">
          {[[null, items.length] as const, ...kinds].map(([k, n]) => (
            <button
              key={k ?? 'all'}
              type="button"
              onClick={() => setKind(k)}
              className={cn(
                'h-11 shrink-0 whitespace-nowrap rounded-full px-3.5 text-[13px] font-semibold border touch-manipulation',
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
      <ul className="divide-y divide-white/[0.07]">
        {shown.map((i) => (
          <li key={i.key} className="flex items-center gap-3 px-4 py-3.5 sm:px-5">
            <TodoIcon section={i.section} urgent={i.urgent} />
            <div className="min-w-0 flex-1">
              <p className="text-[15px] font-semibold leading-snug text-white">{i.title}</p>
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
              onClick={() => onGo(i.section, i.params)}
              className="h-11 shrink-0 rounded-xl bg-elec-yellow px-4 text-[14px] font-semibold text-black touch-manipulation"
            >
              {i.action}
            </button>
          </li>
        ))}
      </ul>
      {hiddenCount > 0 && (
        <button
          type="button"
          onClick={() => setAll(true)}
          className="h-12 w-full border-t border-white/[0.07] text-[14px] font-semibold text-elec-yellow touch-manipulation"
        >
          Show {hiddenCount} more
        </button>
      )}
    </div>
  );
}

/* ── Today: who's where ───────────────────────────────────────────────── */

export interface TodayRow {
  id: string;
  name: string;
  initials: string;
  where: string;
  status: string;
  tone: 'live' | 'booked' | 'away';
  onOpen?: () => void;
}

export function TodayPanel({
  rows,
  footer,
  empty,
}: {
  rows: TodayRow[];
  footer?: ReactNode;
  empty: ReactNode;
}) {
  if (rows.length === 0) {
    return <div className={cn(panel, 'px-4 py-4 sm:px-5')}>{empty}</div>;
  }
  return (
    <div className={panel}>
      <ul className="divide-y divide-white/[0.07]">
        {rows.map((r) => {
          const Row = r.onOpen ? 'button' : 'div';
          return (
            <li key={r.id}>
              <Row
                {...(r.onOpen ? { type: 'button' as const, onClick: r.onOpen } : {})}
                className="w-full flex items-center gap-3 px-4 py-3 sm:px-5 text-left min-h-[60px] touch-manipulation"
              >
                <span
                  aria-hidden
                  className={cn(
                    'relative h-10 w-10 shrink-0 rounded-full flex items-center justify-center text-[12.5px] font-bold',
                    r.tone === 'away'
                      ? 'border border-white/[0.18] text-white'
                      : 'bg-white/[0.1] text-white'
                  )}
                >
                  {r.initials}
                  {r.tone === 'live' && (
                    <span className="absolute -right-0.5 -bottom-0.5 h-3.5 w-3.5 rounded-full border-2 border-background bg-emerald-400" />
                  )}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[15px] font-semibold text-white truncate">{r.name}</span>
                  <span className="block text-[13px] text-white truncate">{r.where}</span>
                </span>
                <span
                  className={cn(
                    'shrink-0 rounded-full px-2.5 py-1 text-[12px] font-semibold',
                    r.tone === 'live'
                      ? 'bg-emerald-500 text-black'
                      : r.tone === 'away'
                        ? 'border border-white/[0.18] text-white'
                        : 'bg-white/[0.1] text-white'
                  )}
                >
                  {r.status}
                </span>
              </Row>
            </li>
          );
        })}
      </ul>
      {footer && <div className="border-t border-white/[0.07] px-4 py-1 sm:px-5">{footer}</div>}
    </div>
  );
}

/* ── Money: one compact strip (owner and admins only) ─────────────────── */

export interface Tile {
  label: string;
  value: string;
  sub: string;
  tone?: 'volt' | 'red' | 'green';
  onOpen: () => void;
}

const toneText = (t?: Tile['tone']) =>
  t === 'red' ? 'text-red-400' : t === 'volt' ? 'text-elec-yellow' : t === 'green' ? 'text-emerald-400' : 'text-white';
const toneSub = (t?: Tile['tone']) => (t === 'red' ? 'text-red-300' : 'text-white');

/**
 * Four figures in one card: 2×2 on a phone, one row from sm: up. Each cell
 * opens the screen behind the figure.
 */
export function MoneyStrip({
  tiles,
  title,
  meta,
  onTitle,
}: {
  tiles: Tile[];
  title: string;
  meta?: string;
  onTitle: () => void;
}) {
  return (
    <div className={cn(panel, 'overflow-hidden')}>
      <button
        type="button"
        onClick={onTitle}
        className="flex h-11 w-full items-center gap-2 px-4 text-left touch-manipulation hover:bg-white/[0.04] sm:px-5"
      >
        <span className="text-[14px] font-semibold text-white">{title}</span>
        {meta && <span className="min-w-0 truncate text-[12.5px] text-white">{meta}</span>}
        <span className="ml-auto flex shrink-0 items-center gap-1 text-[13px] font-semibold text-elec-yellow">
          Finance
          <ChevronRight className="h-4 w-4" aria-hidden />
        </span>
      </button>
      <div className="grid grid-cols-2 border-t border-white/[0.07] sm:grid-cols-4">
        {tiles.map((t, i) => (
          <button
            key={t.label}
            type="button"
            onClick={t.onOpen}
            className={cn(
              'flex min-h-[84px] min-w-0 flex-col px-4 py-3 text-left transition-colors touch-manipulation hover:bg-white/[0.04] sm:px-5',
              i % 2 === 1 && 'border-l border-white/[0.07]',
              i >= 2 && 'border-t border-white/[0.07] sm:border-t-0',
              i === 2 && 'sm:border-l'
            )}
          >
            <span className="text-[12px] font-semibold text-white">{t.label}</span>
            <span
              className={cn(
                'mt-1 block text-[20px] sm:text-[22px] font-semibold tabular-nums leading-tight tracking-tight truncate',
                toneText(t.tone)
              )}
            >
              {t.value}
            </span>
            <span className={cn('mt-0.5 block text-[11.5px] leading-snug line-clamp-2', toneSub(t.tone))}>
              {t.sub}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

/* ── The week ahead ───────────────────────────────────────────────────── */

export interface WeekItem {
  key: string;
  date: string;
  title: string;
  detail: string;
  flag?: string;
  urgent?: boolean;
  onOpen: () => void;
}

export function WeekAhead({ items, empty }: { items: WeekItem[]; empty: ReactNode }) {
  if (items.length === 0) return <div className={cn(panel, 'px-4 py-4 sm:px-5')}>{empty}</div>;
  return (
    <div className={panel}>
      <ul className="divide-y divide-white/[0.07]">
        {items.map((i) => {
          const d = parseISO(i.date);
          return (
            <li key={i.key}>
              <button
                type="button"
                onClick={i.onOpen}
                className="w-full flex items-center gap-3 px-4 py-3 sm:px-5 text-left touch-manipulation"
              >
                <span className="shrink-0 w-12 rounded-xl border border-white/[0.14] bg-black/30 py-1.5 text-center">
                  <span className="block text-[10.5px] font-bold uppercase text-elec-yellow">
                    {format(d, 'EEE')}
                  </span>
                  <span className="block text-[18px] font-bold leading-tight text-white">{format(d, 'd')}</span>
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[15px] font-semibold text-white truncate">{i.title}</span>
                  <span className="block text-[13px] text-white truncate">{i.detail}</span>
                </span>
                {i.flag && (
                  <span
                    className={cn(
                      'shrink-0 rounded-full px-2.5 py-1 text-[12px] font-semibold',
                      i.urgent ? 'bg-red-500 text-white' : 'bg-white/[0.1] text-white'
                    )}
                  >
                    {i.flag}
                  </span>
                )}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/* ── Grow: the quote page, small ──────────────────────────────────────── */

export function QuotePageCard({
  url,
  leadsWeek,
  newLeads,
  copied,
  onCopy,
  onShare,
  onQr,
  onLeads,
  onSetUp,
}: {
  url: string | null;
  leadsWeek: number;
  newLeads: number;
  copied: boolean;
  onCopy: () => void;
  onShare: () => void;
  onQr: () => void;
  onLeads: () => void;
  onSetUp: () => void;
}) {
  const small =
    'h-11 rounded-xl border border-white/[0.14] bg-white/[0.06] text-white text-[13px] font-semibold inline-flex items-center justify-center gap-1.5 touch-manipulation';
  return (
    <div className={cn(panel, 'p-4 sm:p-5')}>
      <button type="button" onClick={onLeads} className="w-full flex items-center gap-3 text-left touch-manipulation">
        <span className="min-w-0 flex-1">
          <span className="block text-[15px] font-semibold text-white">Your quote page</span>
          <span className="block text-[13px] text-white">
            {leadsWeek > 0
              ? `${leadsWeek} enquir${leadsWeek === 1 ? 'y' : 'ies'} this week`
              : 'No enquiries this week'}
            {newLeads > 0 ? ` · ${newLeads} enquir${newLeads === 1 ? 'y' : 'ies'} to reply to` : ''}
          </span>
        </span>
        <ChevronRight className="h-4 w-4 shrink-0 text-white" aria-hidden />
      </button>
      {url ? (
        <>
          <p className="mt-3 truncate rounded-xl border border-white/[0.1] bg-black/25 px-3 py-2.5 font-mono text-[12px] text-white">
            {url.replace(/^https?:\/\//, '')}
          </p>
          <div className="mt-2 grid grid-cols-3 gap-2">
            <button type="button" onClick={onCopy} className={small}>
              {copied ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
              {copied ? 'Copied' : 'Copy'}
            </button>
            <button type="button" onClick={onShare} className={small}>
              <Share2 className="h-4 w-4" /> Share
            </button>
            <button type="button" onClick={onQr} className={small}>
              <QrCode className="h-4 w-4" /> QR
            </button>
          </div>
        </>
      ) : (
        <button
          type="button"
          onClick={onSetUp}
          className="mt-3 h-11 w-full rounded-xl bg-elec-yellow text-[14px] font-semibold text-black touch-manipulation"
        >
          Turn on your quote page
        </button>
      )}
    </div>
  );
}

/* ── Mate: an input-shaped bar, not a card ────────────────────────────── */

export function AskMateBar({ onOpen }: { onOpen: () => void }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="w-full h-12 flex items-center gap-3 rounded-2xl border border-white/[0.16] bg-white/[0.06] px-4 text-left touch-manipulation hover:border-elec-yellow transition-colors"
    >
      <Sparkles className="h-4 w-4 shrink-0 text-elec-yellow" aria-hidden />
      <span className="min-w-0 flex-1 truncate text-[14.5px] text-white">
        Ask Mate… who&apos;s free tomorrow?
      </span>
      <span className="shrink-0 rounded-lg bg-elec-yellow px-2.5 py-1 text-[12px] font-bold text-black">Ask</span>
    </button>
  );
}

/* ── First five minutes ───────────────────────────────────────────────── */

export interface SetupStep {
  key: string;
  label: string;
  sub: string;
  done: boolean;
  action: string;
  onGo: () => void;
}

export function SetupChecklist({
  steps,
  done,
  total,
  title,
  onHide,
}: {
  /** The rows to draw; an established firm passes only what is left. */
  steps: SetupStep[];
  done: number;
  total: number;
  title: string;
  onHide?: () => void;
}) {
  const pct = Math.round((done / total) * 100);
  return (
    <div className={panel}>
      <div className="px-4 pt-4 sm:px-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-[15px] font-semibold text-white">{title}</p>
            <p className="mt-0.5 text-[13px] text-white">
              {done} of {total} done
            </p>
          </div>
          {onHide && (
            <button
              type="button"
              onClick={onHide}
              aria-label="Hide the setup list"
              className="-mr-2 -mt-2 inline-flex h-11 w-11 items-center justify-center rounded-full text-white touch-manipulation hover:bg-white/[0.06]"
            >
              <X className="h-4 w-4" aria-hidden />
            </button>
          )}
        </div>
        <div className="mt-3 h-2 rounded-full bg-white/[0.1] overflow-hidden" aria-hidden>
          <div className="h-full rounded-full bg-elec-yellow" style={{ width: `${pct}%` }} />
        </div>
      </div>
      <ul className="mt-2 divide-y divide-white/[0.07]">
        {steps.map((s) => (
          <li key={s.key} className="flex items-center gap-3 px-4 py-3 sm:px-5">
            <span
              aria-hidden
              className={cn(
                'h-8 w-8 shrink-0 rounded-full flex items-center justify-center',
                s.done ? 'bg-emerald-500 text-black' : 'border border-white/[0.3] text-white'
              )}
            >
              {s.done && <Check className="h-4 w-4" />}
            </span>
            <span className="min-w-0 flex-1">
              <span className={cn('block text-[15px] font-semibold text-white', s.done && 'line-through')}>
                {s.label}
              </span>
              <span className="block text-[13px] text-white">{s.sub}</span>
            </span>
            {!s.done && (
              <button
                type="button"
                onClick={s.onGo}
                className="h-11 shrink-0 rounded-xl bg-elec-yellow px-4 text-[14px] font-semibold text-black touch-manipulation"
              >
                {s.action}
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
