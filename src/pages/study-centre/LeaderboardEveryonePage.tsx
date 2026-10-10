/**
 * Everyone — the whole XP board in one table (10 Oct 2026).
 *
 * Andrew: "a full list page of where everyone is on XP and this month, days,
 * year, week etc… we did have this". The leaderboard shows a podium and the
 * top 50 for one period; this shows every learner on the board with all the
 * periods side by side: today, this week, this month, this year, all time,
 * plus days studied, streak and level.
 *
 * Every figure and rank comes from study_board_table, which ranks exactly as
 * the leaderboard does (same people, same XP, ties to whoever got there
 * first) — so a rank here is the rank there. Calendar periods, UK time.
 */
import { useEffect, useMemo, useRef, useState, type MutableRefObject, type ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import type { SupabaseClient } from '@supabase/supabase-js';
import { ArrowDown, Flame, Search, SlidersHorizontal, Trophy } from 'lucide-react';
import { supabase as typedSupabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import useSEO from '@/hooks/useSEO';
import { cn } from '@/lib/utils';
import { HubBody, HubMasthead, HubPage } from '@/components/hub/HubPrimitives';
import { PageHelpButton, type PageHelpContent } from '@/components/hub/PageHelp';
import { COLLEGE_BTN, COLLEGE_BTN_PRIMARY, chipCn } from '@/components/college/ui/CollegeUi';
import { Sheet, SheetContent, SheetDescription, SheetTitle } from '@/components/ui/sheet';
import { Hairline, SC_CARD, SC_LIST, ScStats } from '@/components/study-centre/ui/StudyKit';

const supabase = typedSupabase as unknown as SupabaseClient;

interface Person {
  uid: string;
  display_name: string | null;
  avatar: string | null;
  level: number;
  streak: number;
  xp_today: number;
  xp_week: number;
  xp_month: number;
  xp_year: number;
  xp_all: number;
  days_week: number;
  days_month: number;
  days_year: number;
  days_all: number;
  last_active: string | null;
  rank_today: number | null;
  rank_week: number | null;
  rank_month: number | null;
  rank_year: number | null;
  rank_all: number | null;
}

type Period = 'today' | 'week' | 'month' | 'year' | 'all';
type League = 'all' | 'apprentices' | 'electricians';
/** What the table is ranked by, within the chosen period. */
type By = 'xp' | 'days' | 'streak';

const BYS: { key: By; label: string }[] = [
  { key: 'xp', label: 'XP' },
  { key: 'days', label: 'Days studied' },
  { key: 'streak', label: 'Streak' },
];

const LEAGUES: { key: League; label: string }[] = [
  { key: 'all', label: 'Everyone' },
  { key: 'apprentices', label: 'Apprentices' },
  { key: 'electricians', label: 'Electricians' },
];

const PAGE = 100;

interface PeriodDef {
  key: Period;
  label: string;
  short: string;
  since: string;
  /** What the Days column counts for this period. A single day is always 1, so Today shows the week. */
  days: string;
}

function periods(): PeriodDef[] {
  const now = new Date();
  const month = new Intl.DateTimeFormat('en-GB', {
    month: 'long',
    timeZone: 'Europe/London',
  }).format(now);
  const year = new Intl.DateTimeFormat('en-GB', {
    year: 'numeric',
    timeZone: 'Europe/London',
  }).format(now);
  return [
    { key: 'today', label: 'Today', short: 'Today', since: 'today', days: 'this week' },
    { key: 'week', label: 'This week', short: 'Week', since: 'this week', days: 'this week' },
    {
      key: 'month',
      label: month,
      short: month.slice(0, 3),
      since: `in ${month}`,
      days: `in ${month}`,
    },
    { key: 'year', label: year, short: year, since: `in ${year}`, days: `in ${year}` },
    { key: 'all', label: 'All time', short: 'All time', since: 'ever', days: 'in all' },
  ];
}

const xpOf = (p: Person, k: Period) =>
  k === 'today'
    ? p.xp_today
    : k === 'week'
      ? p.xp_week
      : k === 'month'
        ? p.xp_month
        : k === 'year'
          ? p.xp_year
          : p.xp_all;
const rankOf = (p: Person, k: Period) =>
  k === 'today'
    ? p.rank_today
    : k === 'week'
      ? p.rank_week
      : k === 'month'
        ? p.rank_month
        : k === 'year'
          ? p.rank_year
          : p.rank_all;
const daysOf = (p: Person, k: Period) =>
  k === 'today' || k === 'week'
    ? p.days_week
    : k === 'month'
      ? p.days_month
      : k === 'year'
        ? p.days_year
        : p.days_all;

function formatName(fullName: string | null): string {
  if (!fullName) return 'Learner';
  const parts = fullName
    .trim()
    .split(/\s+/)
    .map((p) => p.charAt(0).toUpperCase() + p.slice(1).toLowerCase());
  return parts.length === 1 ? parts[0] : `${parts[0]} ${parts[parts.length - 1][0]}.`;
}

function initials(fullName: string | null): string {
  if (!fullName) return '?';
  const p = fullName.trim().split(/\s+/);
  return (p.length === 1 ? p[0][0] : `${p[0][0]}${p[p.length - 1][0]}`)?.toUpperCase() || '?';
}

function Avatar({ p, size = 36 }: { p: Person; size?: number }) {
  const style = { width: size, height: size, fontSize: Math.max(11, Math.round(size * 0.32)) };
  return p.avatar ? (
    <img
      src={p.avatar}
      alt=""
      loading="lazy"
      style={style}
      className="shrink-0 rounded-full object-cover"
    />
  ) : (
    <span
      style={style}
      className="flex shrink-0 items-center justify-center rounded-full bg-white/[0.12] font-bold text-white"
    >
      {initials(p.display_name)}
    </span>
  );
}

// Calendar days in UK time, so "today" means today, not "in the last 24 hours".
const ukDay = new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/London' });

function lastSeen(iso: string | null): string {
  if (!iso) return '';
  const days = Math.round(
    (Date.parse(ukDay.format(new Date())) - Date.parse(ukDay.format(new Date(iso)))) / 86400000
  );
  if (days <= 0) return 'Active today';
  if (days === 1) return 'Active yesterday';
  if (days < 7) return `Active ${days} days ago`;
  if (days < 60) return `Active ${Math.floor(days / 7)} wk ago`;
  return `Active ${Math.floor(days / 30)} mo ago`;
}

// Every heading shares the height and underline slot of the sortable ones, so they line up.
const HEAD =
  'flex h-9 items-center border-b-2 border-transparent text-[12.5px] font-semibold text-white';

const n = (v: number) => (v > 0 ? v.toLocaleString() : '–');

/** The figure a row is ranked on. */
const valueOf = (p: Person, period: Period, by: By) =>
  by === 'xp' ? xpOf(p, period) : by === 'days' ? daysOf(p, period) : p.streak;

/**
 * Sortable column heading (desktop). The active one is a solid yellow pill with
 * an arrow, so it reads as "sorted by this" at a glance.
 */
function SortHead({
  label,
  active,
  onClick,
  title,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
  title: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      title={title}
      className={cn(
        'inline-flex h-9 items-center gap-1 justify-self-end rounded-full px-3 text-[12.5px] font-semibold transition-colors touch-manipulation outline-none focus-visible:ring-2 focus-visible:ring-elec-yellow focus-visible:ring-offset-2 focus-visible:ring-offset-[#1c1c1c]',
        active
          ? 'bg-elec-yellow text-black'
          : 'border border-white/[0.12] text-white hover:border-white/[0.3] hover:bg-white/[0.06] active:bg-white/[0.1]'
      )}
    >
      {label}
      {active && <ArrowDown className="h-3.5 w-3.5" aria-hidden />}
    </button>
  );
}

/** A labelled row of chips at the top of the page. */
function FilterGroup({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
      <p className="w-20 shrink-0 text-[13px] font-semibold text-white">{label}</p>
      <div role="group" aria-label={label} className="flex flex-wrap gap-2">
        {children}
      </div>
    </div>
  );
}

// ── A row: phone layout below lg, table columns from lg ───────────────
function Row({
  p,
  pos,
  period,
  by,
  P,
  mine,
  flash,
  meRef,
}: {
  p: Person;
  pos: number | null;
  period: Period;
  by: By;
  P: PeriodDef[];
  mine: boolean;
  flash: boolean;
  meRef: MutableRefObject<HTMLLIElement | null>;
}) {
  const rank = pos;
  const days = daysOf(p, period);
  const xp = xpOf(p, period);
  const lead = by === 'xp' ? xp : by === 'days' ? days : p.streak;
  const leadUnit =
    by === 'xp' ? 'XP' : by === 'days' ? (days === 1 ? 'day' : 'days') : 'day streak';
  const cur = P.find((x) => x.key === period)!;
  return (
    <li
      ref={mine ? meRef : undefined}
      className={cn(
        'relative transition-colors',
        mine && 'bg-white/[0.06]',
        mine && flash && 'bg-white/[0.14]'
      )}
    >
      {mine && (
        <span aria-hidden className="absolute inset-y-2 left-0 w-1 rounded-r-full bg-elec-yellow" />
      )}

      {/* Phone and tablet: who and this period's XP, then every other period on its own line */}
      <div className="px-5 py-3 sm:px-6 lg:hidden">
        <div className="flex items-center gap-3">
          <span className="w-9 shrink-0 text-[15px] font-bold tabular-nums text-white">
            {rank ?? '–'}
          </span>
          <Avatar p={p} />
          <span className="min-w-0 flex-1">
            <span className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
              <span className="break-words text-[15px] font-semibold leading-snug text-white">
                {formatName(p.display_name)}
              </span>
              {mine && (
                <span className="shrink-0 rounded-full bg-elec-yellow px-2 py-0.5 text-[12px] font-bold text-black">
                  You
                </span>
              )}
            </span>
            <span className="mt-0.5 block text-[13px] leading-snug text-white">
              {[
                `Level ${p.level}`,
                by !== 'xp' ? `${xp.toLocaleString()} XP ${cur.since}` : null,
                by !== 'days' && days > 0
                  ? `${days} ${days === 1 ? 'day' : 'days'} ${cur.days}`
                  : null,
                by !== 'streak' && p.streak > 1 ? `${p.streak}\u2011day streak` : null,
              ]
                .filter(Boolean)
                .join(' · ')}
            </span>
          </span>
          <span className="shrink-0 text-right">
            <span className="block text-[18px] font-bold tabular-nums leading-none text-white">
              {lead.toLocaleString()}
            </span>
            <span className="mt-1 block text-[12px] font-semibold text-white">{leadUnit}</span>
          </span>
        </div>
        <div className="mt-2.5 grid grid-cols-4 gap-2 pl-12 tabular-nums text-white">
          {P.filter((x) => x.key !== period).map((x) => (
            <span key={x.key} className="min-w-0">
              <span className="block text-[12px] font-medium leading-tight">{x.short}</span>
              <span className="mt-0.5 block text-[14px] font-semibold">{n(xpOf(p, x.key))}</span>
            </span>
          ))}
        </div>
      </div>

      {/* Desktop table row */}
      <div className="hidden min-h-[56px] items-center gap-3 px-6 py-2 lg:grid lg:grid-cols-[48px_minmax(0,1fr)_repeat(5,92px)_80px_88px]">
        <span className="text-[15px] font-bold tabular-nums text-white">{rank ?? '–'}</span>
        <span className="flex min-w-0 items-center gap-3">
          <Avatar p={p} size={32} />
          <span className="min-w-0">
            <span className="flex items-center gap-2">
              <span
                className="truncate text-[14px] font-semibold text-white"
                title={formatName(p.display_name)}
              >
                {formatName(p.display_name)}
              </span>
              {mine && (
                <span className="shrink-0 rounded-full bg-elec-yellow px-2 py-0.5 text-[12px] font-bold text-black">
                  You
                </span>
              )}
            </span>
            <span className="block truncate text-[12px] text-white">
              Level {p.level} · {lastSeen(p.last_active)}
            </span>
          </span>
        </span>
        {P.map((x) => (
          <span
            key={x.key}
            className={cn(
              'text-right text-[14px] tabular-nums',
              by === 'xp' && x.key === period
                ? 'font-bold text-elec-yellow'
                : x.key === period
                  ? 'font-semibold text-white'
                  : 'font-medium text-white'
            )}
          >
            {n(xpOf(p, x.key))}
          </span>
        ))}
        <span
          className={cn(
            'text-right text-[14px] tabular-nums',
            by === 'days' ? 'font-bold text-elec-yellow' : 'font-medium text-white'
          )}
        >
          {n(days)}
        </span>
        <span
          className={cn(
            'flex items-center justify-end gap-1 text-[14px] tabular-nums',
            by === 'streak' ? 'font-bold text-elec-yellow' : 'font-medium text-white'
          )}
        >
          {p.streak > 0 ? (
            <>
              <Flame className="h-3.5 w-3.5 text-orange-400" aria-hidden />
              {p.streak}
            </>
          ) : (
            '–'
          )}
        </span>
      </div>
    </li>
  );
}

const HELP: PageHelpContent = {
  id: 'study-leaderboard-everyone',
  title: 'Everyone on the board',
  what: 'Every learner on the leaderboard, with their XP today, this week, this month, this year and all time side by side.',
  steps: [
    {
      title: 'Pick a period, then what to rank by',
      body: 'Period sets the window: today, this week, this month, this year or all time. Rank by sets the order: XP (the same ranks as the leaderboard), days studied in that period, or current streak. On a computer you can also tap any column heading.',
    },
    {
      title: 'Find someone',
      body: 'Search by name, or tap “Find me” to jump to your own row.',
    },
    {
      title: 'Read the figures',
      body: 'Days is how many days someone studied in the period you picked (on Today, it shows this week). Periods run on UK time: weeks start Monday, months on the 1st. Awards only count towards all time.',
    },
  ],
};

export default function LeaderboardEveryonePage() {
  useSEO(
    'Everyone on the board | Study Centre',
    'Every learner’s XP today, this week, month, year and all time.'
  );
  const navigate = useNavigate();
  const { user } = useAuth();
  const [league, setLeague] = useState<League>('all');
  const [period, setPeriod] = useState<Period>('month');
  const [by, setBy] = useState<By>('xp');
  // Phone: the filters live in a bottom sheet behind one summary line.
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [rows, setRows] = useState<Person[] | null>(null);
  const [failed, setFailed] = useState(false);
  const [shown, setShown] = useState(PAGE);
  const [showResting, setShowResting] = useState(false);
  const meRef = useRef<HTMLLIElement | null>(null);
  const [flash, setFlash] = useState(false);
  // Bumped by "Find me". The scroll waits for the render that reveals the row.
  const [seek, setSeek] = useState(0);

  const P = useMemo(periods, []);
  const cur = P.find((x) => x.key === period)!;

  useEffect(() => {
    if (!user) return;
    let stale = false;
    setRows(null);
    setFailed(false);
    void supabase.rpc('study_board_table', { league }).then(({ data, error }) => {
      if (stale) return;
      if (error) {
        setFailed(true);
        setRows([]);
        return;
      }
      setRows((data ?? []) as Person[]);
    });
    return () => {
      stale = true;
    };
  }, [user, league]);

  // Ranked first, then everyone with nothing to rank on by all-time XP.
  // By XP the position is the server's board rank (ties to whoever got there
  // first); by days or streak it is the order here, XP breaking ties.
  const { ranked, resting, posOf } = useMemo(() => {
    const all = rows ?? [];
    const has = (p: Person) =>
      by === 'xp' ? rankOf(p, period) !== null : valueOf(p, period, by) > 0;
    const r = all
      .filter(has)
      .sort((a, b) =>
        by === 'xp'
          ? (rankOf(a, period) ?? 0) - (rankOf(b, period) ?? 0)
          : valueOf(b, period, by) - valueOf(a, period, by) ||
            xpOf(b, period) - xpOf(a, period) ||
            b.xp_all - a.xp_all
      );
    const rest = all.filter((p) => !has(p)).sort((a, b) => b.xp_all - a.xp_all);
    const pos = new Map<string, number>();
    r.forEach((p, i) => pos.set(p.uid, by === 'xp' ? (rankOf(p, period) ?? i + 1) : i + 1));
    return { ranked: r, resting: rest, posOf: pos };
  }, [rows, period, by]);

  const byWhat =
    by === 'xp' ? `XP ${cur.since}` : by === 'days' ? `days studied ${cur.days}` : 'current streak';
  const unit = (v: number) =>
    by === 'xp'
      ? `${v.toLocaleString()} XP`
      : by === 'days'
        ? `${v} ${v === 1 ? 'day' : 'days'}`
        : `${v}\u2011day streak`;

  const q = query.trim().toLowerCase();
  const match = (p: Person) => !q || (p.display_name ?? '').toLowerCase().includes(q);
  const rankedShown = ranked.filter(match);
  const restingShown = resting.filter(match);

  const me = rows?.find((p) => p.uid === user?.id) ?? null;
  const myRank = me ? (posOf.get(me.uid) ?? null) : null;
  const activeToday = (rows ?? []).filter((p) => p.xp_today > 0).length;
  const top = ranked[0];

  const findMe = () => {
    if (!me) return;
    setQuery('');
    if (myRank === null) setShowResting(true);
    else if (myRank > shown) setShown(Math.ceil(myRank / PAGE) * PAGE);
    setSeek((v) => v + 1);
  };

  useEffect(() => {
    if (!seek) return;
    meRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    setFlash(true);
    const t = setTimeout(() => setFlash(false), 1600);
    return () => clearTimeout(t);
  }, [seek]);

  const pickPeriod = (k: Period) => {
    setPeriod(k);
    setShown(PAGE);
    setShowResting(false);
  };
  const pickBy = (k: By) => {
    setBy(k);
    setShown(PAGE);
    setShowResting(false);
  };
  // A period heading on the table ranks by that period's XP.
  const sortByPeriod = (k: Period) => {
    pickPeriod(k);
    setBy('xp');
  };

  const filters = (
    <>
      <FilterGroup label="Period">
        {P.map((x) => (
          <button
            key={x.key}
            type="button"
            aria-pressed={period === x.key}
            onClick={() => pickPeriod(x.key)}
            className={chipCn(period === x.key)}
          >
            {x.label}
          </button>
        ))}
      </FilterGroup>
      <FilterGroup label="Rank by">
        {BYS.map((b) => (
          <button
            key={b.key}
            type="button"
            aria-pressed={by === b.key}
            onClick={() => pickBy(b.key)}
            className={chipCn(by === b.key)}
          >
            {b.label}
          </button>
        ))}
      </FilterGroup>
      <FilterGroup label="Who">
        {LEAGUES.map((l) => (
          <button
            key={l.key}
            type="button"
            aria-pressed={league === l.key}
            onClick={() => {
              setLeague(l.key);
              setShown(PAGE);
              setShowResting(false);
            }}
            className={chipCn(league === l.key)}
          >
            {l.label}
          </button>
        ))}
      </FilterGroup>
    </>
  );

  return (
    <HubPage ground="landing">
      <HubMasthead section="Study Centre" title="Everyone" backTo="/study-centre/leaderboard" />
      <HubBody>
        <div className="space-y-6">
          {/* ── Header ─────────────────────────────────────────────── */}
          <section className="relative -mx-4 overflow-hidden card-landing max-sm:!rounded-none max-sm:!border-x-0 px-5 py-6 sm:mx-0 sm:rounded-3xl sm:px-8 sm:py-8">
            <Hairline />
            <div className="flex items-start justify-between gap-3">
              <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-elec-yellow">
                Leaderboard
              </p>
              <PageHelpButton help={HELP} className="-mt-2" />
            </div>
            <h1 className="mt-1.5 text-[30px] font-bold leading-[1.05] tracking-tight text-white sm:text-[40px]">
              Everyone on the board
            </h1>
            <p className="mt-2 max-w-2xl text-[14.5px] leading-relaxed text-white">
              {rows
                ? `${rows.length.toLocaleString()} learners, ranked by ${byWhat}.${by === 'xp' ? ' Same ranks as the leaderboard.' : ''} UK time.`
                : 'Loading everyone’s XP…'}
            </p>

            {/* Tablet and up: the filters inline. */}
            <div className="mt-6 hidden space-y-4 border-t border-white/[0.1] pt-5 sm:block">
              {filters}
            </div>
            {/* Phone: one line saying what is showing, and a Filter button. */}
            <button
              type="button"
              onClick={() => setFiltersOpen(true)}
              className="mt-5 flex min-h-[52px] w-full items-center justify-between gap-3 rounded-2xl border border-white/[0.14] bg-white/[0.04] px-4 py-2.5 text-left touch-manipulation active:bg-white/[0.1] sm:hidden"
            >
              <span className="min-w-0">
                <span className="block text-[12px] font-medium text-white">Showing</span>
                <span className="block text-[14.5px] font-semibold leading-snug text-white">
                  {[
                    cur.label,
                    BYS.find((b) => b.key === by)!.label,
                    LEAGUES.find((l) => l.key === league)!.label,
                  ].join(' · ')}
                </span>
              </span>
              <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-elec-yellow px-3.5 py-2 text-[13px] font-semibold text-black">
                <SlidersHorizontal className="h-4 w-4" aria-hidden />
                Filter
              </span>
            </button>
          </section>

          {/* ── Figures ────────────────────────────────────────────── */}
          {rows && rows.length > 0 && (
            <ScStats
              items={[
                {
                  label: by === 'streak' ? 'On a streak' : `On the board ${cur.since}`,
                  value: ranked.length.toLocaleString(),
                  sub:
                    ranked.length === rows.length
                      ? 'everyone with XP'
                      : `of ${rows.length.toLocaleString()} learners`,
                },
                {
                  label: 'Your place',
                  value: myRank ? `#${myRank}` : '–',
                  sub: me
                    ? `${unit(valueOf(me, period, by))}${by === 'streak' ? '' : ` ${by === 'days' ? cur.days : cur.since}`}`
                    : 'Not on the board yet',
                  onClick: me ? findMe : undefined,
                },
                {
                  label:
                    by === 'streak'
                      ? 'Longest streak'
                      : `Top ${by === 'days' ? cur.days : cur.since}`,
                  value: top ? valueOf(top, period, by).toLocaleString() : '–',
                  sub: top ? formatName(top.display_name) : 'Nobody yet',
                },
                {
                  label: 'Studied today',
                  value: activeToday.toLocaleString(),
                  sub: 'learners with XP today',
                },
              ]}
            />
          )}

          {/* ── Search + find me ───────────────────────────────────── */}
          <div className="flex items-end gap-3">
            <label className="relative min-w-0 flex-1">
              <span className="sr-only">Search by name</span>
              <Search
                className="pointer-events-none absolute left-1 top-1/2 h-4 w-4 -translate-y-1/2 text-white"
                aria-hidden
              />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by name"
                className="input-underline h-11 w-full rounded-none border-0 border-b border-white/[0.15] bg-transparent pl-7 pr-1 text-base font-medium text-white placeholder:text-white/25 caret-elec-yellow transition-colors hover:border-white/[0.3] focus:border-elec-yellow focus-visible:ring-0 focus:ring-0 focus:outline-none [color-scheme:dark] touch-manipulation"
              />
            </label>
            {me && (
              <button type="button" onClick={findMe} className={cn(COLLEGE_BTN, 'shrink-0')}>
                <ArrowDown className="h-4 w-4" aria-hidden />
                Find me
              </button>
            )}
          </div>

          {/* ── The table ──────────────────────────────────────────── */}
          {rows === null ? (
            <div className={SC_LIST} aria-busy>
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="flex h-[68px] items-center gap-3 px-5 sm:px-6">
                  <div className="h-4 w-6 animate-pulse rounded bg-white/[0.1]" />
                  <div className="h-9 w-9 animate-pulse rounded-full bg-white/[0.1]" />
                  <div className="h-4 flex-1 animate-pulse rounded bg-white/[0.1]" />
                </div>
              ))}
            </div>
          ) : failed ? (
            <div className={SC_CARD}>
              <p className="text-[15px] font-semibold text-white">Couldn’t load the board.</p>
              <p className="mt-1 text-[13.5px] text-white">Check your connection and try again.</p>
            </div>
          ) : rows.length === 0 ? (
            <div className={cn(SC_CARD, 'text-center')}>
              <Trophy className="mx-auto h-8 w-8 text-elec-yellow" aria-hidden />
              <p className="mt-3 text-[16px] font-semibold text-white">Nobody on this board yet</p>
            </div>
          ) : (
            <div className={SC_LIST}>
              {/* Column headings (desktop): tap one to rank by it. */}
              <div className="hidden items-center gap-3 border-b border-white/[0.14] px-6 py-2 lg:grid lg:grid-cols-[48px_minmax(0,1fr)_repeat(5,92px)_80px_88px]">
                <span className={HEAD}>#</span>
                <span className={HEAD}>Learner</span>
                {P.map((x) => (
                  <SortHead
                    key={x.key}
                    label={x.short}
                    active={by === 'xp' && period === x.key}
                    onClick={() => sortByPeriod(x.key)}
                    title={`Rank by XP ${x.since}`}
                  />
                ))}
                <SortHead
                  label="Days"
                  active={by === 'days'}
                  onClick={() => pickBy('days')}
                  title={`Rank by days studied ${cur.days}`}
                />
                <SortHead
                  label="Streak"
                  active={by === 'streak'}
                  onClick={() => pickBy('streak')}
                  title="Rank by current streak"
                />
              </div>

              {!q && ranked.length === 0 && (
                <div className="px-5 py-8 text-center sm:px-6">
                  <p className="text-[15px] font-semibold text-white">
                    {by === 'streak'
                      ? 'Nobody is on a streak right now'
                      : by === 'days'
                        ? `Nobody has studied ${cur.days} yet`
                        : `Nobody has XP ${cur.since} yet`}
                  </p>
                  <p className="mt-1 text-[13.5px] text-white">
                    The first answer {by === 'streak' ? 'today' : cur.since} puts someone at the
                    top.
                  </p>
                </div>
              )}
              <ul className="divide-y divide-white/[0.07]">
                {rankedShown.slice(0, q ? undefined : shown).map((p) => (
                  <Row
                    key={p.uid}
                    p={p}
                    pos={posOf.get(p.uid) ?? null}
                    period={period}
                    by={by}
                    P={P}
                    mine={p.uid === user?.id}
                    flash={flash}
                    meRef={meRef}
                  />
                ))}
              </ul>
              {!q && rankedShown.length > shown && (
                <button
                  type="button"
                  onClick={() => setShown((s) => s + PAGE)}
                  className="flex h-12 w-full items-center justify-center text-[13.5px] font-semibold text-elec-yellow touch-manipulation hover:bg-white/[0.05] active:bg-white/[0.1]"
                >
                  Show {Math.min(PAGE, rankedShown.length - shown)} more ·{' '}
                  {(rankedShown.length - shown).toLocaleString()} still to see
                </button>
              )}

              {restingShown.length > 0 && (
                <>
                  <button
                    type="button"
                    onClick={() => setShowResting((v) => !v)}
                    aria-expanded={showResting || !!q}
                    className="flex min-h-[52px] w-full items-center justify-between gap-3 border-t border-white/[0.14] px-5 text-left touch-manipulation hover:bg-white/[0.05] active:bg-white/[0.1] sm:px-6"
                  >
                    <span className="text-[13px] font-semibold text-white">
                      {by === 'streak'
                        ? 'No streak right now'
                        : by === 'days'
                          ? `Not studied ${cur.days}`
                          : `No XP ${cur.since} yet`}{' '}
                      · {restingShown.length.toLocaleString()}
                    </span>
                    <span className="text-[13px] font-semibold text-elec-yellow">
                      {showResting || q ? 'Hide' : 'Show'}
                    </span>
                  </button>
                  {(showResting || q) && (
                    <ul className="divide-y divide-white/[0.07]">
                      {restingShown.map((p) => (
                        <Row
                          key={p.uid}
                          p={p}
                          pos={null}
                          period={period}
                          by={by}
                          P={P}
                          mine={p.uid === user?.id}
                          flash={flash}
                          meRef={meRef}
                        />
                      ))}
                    </ul>
                  )}
                </>
              )}

              {q && rankedShown.length + restingShown.length === 0 && (
                <p className="px-5 py-6 text-[14px] text-white sm:px-6">
                  Nobody called “{query.trim()}” on this board.
                </p>
              )}
            </div>
          )}

          <button
            type="button"
            onClick={() => navigate('/study-centre/leaderboard')}
            className={cn(COLLEGE_BTN, 'w-full sm:w-auto')}
          >
            Back to the leaderboard
          </button>
        </div>
        <Sheet open={filtersOpen} onOpenChange={setFiltersOpen}>
          <SheetContent
            side="bottom"
            className="flex h-auto max-h-[88dvh] flex-col rounded-t-2xl border-white/[0.1] bg-background p-0"
          >
            <div
              aria-hidden
              className="mx-auto mt-2.5 h-1 w-10 shrink-0 rounded-full bg-white/[0.25]"
            />
            <div className="shrink-0 px-5 pb-2 pt-4">
              <SheetTitle className="text-[20px] font-bold text-white">Filter the board</SheetTitle>
              <SheetDescription className="mt-1 text-[13.5px] text-white">
                Pick the period, what to rank by, and who to include.
              </SheetDescription>
            </div>
            <div className="min-h-0 flex-1 space-y-5 overflow-y-auto overscroll-contain px-5 py-3">
              {filters}
            </div>
            <div className="shrink-0 border-t border-white/[0.1] px-5 pb-[max(1rem,env(safe-area-inset-bottom))] pt-3">
              <button
                type="button"
                onClick={() => setFiltersOpen(false)}
                className={cn(COLLEGE_BTN_PRIMARY, 'h-12 w-full text-[14.5px]')}
              >
                {rows ? `Show ${ranked.length.toLocaleString()} learners` : 'Show results'}
              </button>
            </div>
          </SheetContent>
        </Sheet>
      </HubBody>
    </HubPage>
  );
}
