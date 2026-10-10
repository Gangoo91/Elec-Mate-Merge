/**
 * Study Centre leaderboard and XP — redesigned 9 Oct 2026.
 *
 * Andrew: "completely redesign this XP page, it needs to be amazing and feel
 * excellent for users". And on the XP behind it: "we're going to do
 * competitions on it… A work, B be 100% accurate".
 *
 * The XP is server-owned (migrations 20261009170000/171000): one ledger,
 * every amount set by the server, once per item per period, daily caps,
 * staff/test accounts excluded, ties to whoever got there first. This page
 * shows that honestly:
 *
 *   1. The competition — the month, a live countdown, the podium.
 *   2. You — XP this period, level ring, rank, the gap to the next place and
 *      to the top three, and your XP day by day.
 *   3. Your XP, line by line — every award from the ledger with what earned
 *      it, including the ones that earned nothing and why ("already earned
 *      today", "daily cap"). If a total looks wrong, the reason is right here.
 *   4. The board, the people around you, how XP is earned, and awards.
 *
 * Landing-page surfaces (StudyKit), College Hub layout and buttons, no
 * translucent yellow fills (they render brown on this ground).
 */
import { useState, useEffect, useCallback, useMemo, useRef, type ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  BookOpen,
  ChevronDown,
  ChevronRight,
  Crown,
  FileCheck2,
  Flame,
  GraduationCap,
  Layers,
  PlayCircle,
  Award,
  Target,
  TrendingDown,
  TrendingUp,
  Share2,
  Trophy,
  Zap,
} from 'lucide-react';

import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useLearningXP } from '@/hooks/useLearningXP';
import { paperName } from '@/hooks/study-centre/useMockHistory';
import { ACHIEVEMENT_DEFINITIONS } from '@/data/achievementDefinitions';
import { AwardsSection } from '@/components/study-centre/awards/AwardsSection';
import { LEVELS, XP_DAILY_CAP, XP_EARNING_GUIDE } from '@/data/xpConfig';
import useSEO from '@/hooks/useSEO';
import { cn } from '@/lib/utils';

import { HubPage, HubBody, HubMasthead } from '@/components/hub/HubPrimitives';
import { PageHelpButton, type PageHelpContent } from '@/components/hub/PageHelp';
import {
  COLLEGE_BTN,
  COLLEGE_BTN_PRIMARY,
  CollegeSectionTitle,
  chipCn,
} from '@/components/college/ui/CollegeUi';
import { Hairline, SC_CARD, SC_LIST } from '@/components/study-centre/ui/StudyKit';
import { Sheet, SheetContent, SheetTitle } from '@/components/ui/sheet';
import { toast } from 'sonner';

// ─── Types ─────────────────────────────────────────────────────────────
interface Entry {
  user_id: string;
  full_name: string;
  avatar_url: string | null;
  xp: number;
  streak: number;
  quiz_count: number;
  awards: number;
}
type Period = 'month' | 'week' | 'all';
type League = 'all' | 'apprentices' | 'electricians';
const LEAGUES: { key: League; label: string }[] = [
  { key: 'all', label: 'Everyone' },
  { key: 'apprentices', label: 'Apprentices' },
  { key: 'electricians', label: 'Electricians' },
];
interface LedgerRow {
  activity_type: string;
  source_id?: string | null;
  source_title: string | null;
  xp_earned: number;
  created_at: string;
  voided_at: string | null;
  metadata: { xp_reason?: string } | null;
}

const VISIBLE = 10;

// ─── UK calendar ───────────────────────────────────────────────────────
/** A Date whose local fields read as the Europe/London wall clock. */
function londonNow(): Date {
  return new Date(new Date().toLocaleString('en-US', { timeZone: 'Europe/London' }));
}
function londonDayKey(iso: string): string {
  return new Date(iso).toLocaleDateString('en-CA', { timeZone: 'Europe/London' });
}
function periodBounds(period: Period) {
  const now = londonNow();
  if (period === 'month') {
    const start = new Date(now.getFullYear(), now.getMonth(), 1);
    const end = new Date(now.getFullYear(), now.getMonth() + 1, 1);
    const month = now.toLocaleDateString('en-GB', { month: 'long' });
    return { start, end, label: month, since: `since 1 ${month}`, title: `${month} competition` };
  }
  if (period === 'week') {
    const dow = (now.getDay() + 6) % 7; // Monday = 0
    const start = new Date(now.getFullYear(), now.getMonth(), now.getDate() - dow);
    const end = new Date(start.getFullYear(), start.getMonth(), start.getDate() + 7);
    return { start, end, label: 'This week', since: 'since Monday', title: 'This week' };
  }
  return {
    start: new Date(2000, 0, 1),
    end: null as Date | null,
    label: 'All time',
    since: 'all time',
    title: 'All-time board',
  };
}
/** The real instant (UTC ISO) a London wall-clock date starts at. */
function londonStartIso(d: Date): string {
  const guess = Date.UTC(d.getFullYear(), d.getMonth(), d.getDate());
  const asLondon = new Date(new Date(guess).toLocaleString('en-US', { timeZone: 'Europe/London' }));
  const asUtc = new Date(new Date(guess).toLocaleString('en-US', { timeZone: 'UTC' }));
  return new Date(guess - (asLondon.getTime() - asUtc.getTime())).toISOString();
}

function useCountdown(end: Date | null) {
  const [, tick] = useState(0);
  useEffect(() => {
    if (!end) return;
    const t = setInterval(() => tick((n) => n + 1), 30000);
    return () => clearInterval(t);
  }, [end]);
  if (!end) return null;
  // The real moment the period ends (London midnight), not a wall-clock
  // subtraction, which runs an hour out across a clock change.
  const ms = Math.max(0, new Date(londonStartIso(end)).getTime() - Date.now());
  return {
    days: Math.floor(ms / 86400000),
    hours: Math.floor((ms % 86400000) / 3600000),
    mins: Math.floor((ms % 3600000) / 60000),
  };
}

// ─── Names, avatars ────────────────────────────────────────────────────
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
function Avatar({
  entry,
  size = 40,
  ring,
}: {
  entry: Pick<Entry, 'full_name' | 'avatar_url'>;
  size?: number;
  ring?: string;
}) {
  const style = { width: size, height: size, fontSize: Math.round(size * 0.32) };
  return entry.avatar_url ? (
    <img
      src={entry.avatar_url}
      alt=""
      loading="lazy"
      style={style}
      className={cn('shrink-0 rounded-full object-cover', ring)}
    />
  ) : (
    <span
      style={style}
      className={cn(
        'flex shrink-0 items-center justify-center rounded-full bg-white/[0.12] font-bold text-white',
        ring
      )}
    >
      {initials(entry.full_name)}
    </span>
  );
}

// ─── What earned XP ────────────────────────────────────────────────────
const SOURCE: Record<string, { label: string; icon: typeof Zap }> = {
  mock_exam: { label: 'Mock exam', icon: GraduationCap },
  quiz_completed: { label: 'Quiz', icon: Target },
  tutor_quiz: { label: 'Tutor quiz', icon: Target },
  study_module: { label: 'Course section', icon: BookOpen },
  flashcard_session: { label: 'Flashcards', icon: Layers },
  video_watched: { label: 'Video', icon: PlayCircle },
  path_completed: { label: 'Learning path', icon: Trophy },
  portfolio_evidence: { label: 'Portfolio evidence', icon: FileCheck2 },
  site_diary_entry: { label: 'Site diary', icon: FileCheck2 },
  achievement: { label: 'Award', icon: Award },
  weekly_plan: { label: 'Weekly plan', icon: Trophy },
};
const REASON: Record<string, string> = {
  already_awarded: 'Already earned today',
  type_cap: 'Cap for this activity reached',
  day_cap: 'Daily cap reached',
  daily_cap: 'Daily cap reached',
  duplicate: 'Double tap, not counted',
};
function when(iso: string): string {
  const d = new Date(iso);
  const mins = Math.round((Date.now() - d.getTime()) / 60000);
  if (mins < 1) return 'Just now';
  if (mins < 60) return `${mins} min ago`;
  if (londonDayKey(iso) === londonDayKey(new Date().toISOString()))
    return d.toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'Europe/London',
    });
  return d.toLocaleDateString('en-GB', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    timeZone: 'Europe/London',
  });
}

/** Some sources log a slug ("targeted-weak-spots"); show it as words. */
// Award rows: the award's own name, not the stored "Achievement: first-quiz".
const AWARD_TITLE = new Map(ACHIEVEMENT_DEFINITIONS.map((d) => [d.id, d.title]));

function niceTitle(t: string | null): string {
  if (!t) return '';
  if (/\s/.test(t) || !/[-_]/.test(t)) return t;
  return paperName({ exam_name: null, exam_slug: t });
}

// ─── Level ring ────────────────────────────────────────────────────────
function LevelRing({
  level,
  progress,
  size = 96,
}: {
  level: number;
  progress: number;
  size?: number;
}) {
  const r = (size - 10) / 2;
  const c = 2 * Math.PI * r;
  const p = Math.min(100, Math.max(0, progress)) / 100;
  return (
    <div
      className="relative shrink-0"
      style={{ width: size, height: size }}
      role="img"
      aria-label={`Level ${level}, ${Math.round(progress)}% of the way to the next`}
    >
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="rgba(255,255,255,0.12)"
          strokeWidth="7"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="#FFD000"
          strokeWidth="7"
          strokeLinecap="round"
          strokeDasharray={`${c * p} ${c}`}
          style={{ transition: 'stroke-dasharray 700ms ease' }}
        />
      </svg>
      <span className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-[13px] font-semibold text-white">Level</span>
        <span className="text-[30px] font-black leading-none tabular-nums text-white">{level}</span>
      </span>
    </div>
  );
}

// ─── Daily bars ────────────────────────────────────────────────────────
interface Day {
  key: string;
  label: string;
  xp: number;
  today: boolean;
  future: boolean;
}
function DailyBars({ days }: { days: Day[] }) {
  const max = Math.max(50, ...days.map((d) => d.xp));
  return (
    <div
      className="flex h-24 items-end gap-[3px] sm:gap-1"
      role="img"
      aria-label={`XP per day: ${days
        .filter((d) => !d.future)
        .map((d) => `${d.label} ${d.xp}`)
        .join(', ')}`}
    >
      {days.map((d) => (
        <div key={d.key} className="flex h-full min-w-0 flex-1 flex-col justify-end">
          <div
            className={cn(
              'w-full rounded-t-[3px]',
              d.future
                ? 'bg-white/[0.06]'
                : d.xp > 0
                  ? d.today
                    ? 'bg-elec-yellow'
                    : 'bg-white/75'
                  : 'bg-white/[0.14]'
            )}
            style={{ height: d.future ? 3 : `${Math.max(d.xp > 0 ? 8 : 3, (d.xp / max) * 100)}%` }}
          />
        </div>
      ))}
    </div>
  );
}

const HELP: PageHelpContent = {
  id: 'study-leaderboard',
  title: 'Leaderboard and XP',
  what: 'Everyone’s XP for the month, the week or all time. Monthly competitions are decided on the month board: XP earned from the 1st to the last day of the month, UK time.',
  steps: [
    {
      title: 'Earn XP',
      body: 'Mock exams, quizzes, course sections, flashcards and more. Every rule is listed under “How XP is earned”.',
    },
    {
      title: 'Check your place',
      body: 'Your card shows your XP this period, your rank and how far you are behind the next person.',
    },
    {
      title: 'See every point',
      body: '“Your XP” lists every award and what earned it, including the ones that didn’t count and why.',
    },
  ],
  notes: [
    {
      title: 'Fair play',
      body: `XP is worked out by the server, not your phone. Each quiz, paper and section earns once per day, and there is a cap of ${XP_DAILY_CAP.toLocaleString()} XP a day. Repeats and double taps earn nothing.`,
    },
    { title: 'Ties', body: 'Two people on the same XP are ranked by who got there first.' },
    {
      title: 'Not on the board?',
      body: 'You need a name on your profile and your leaderboard setting switched on. Staff and test accounts are never ranked.',
    },
  ],
};

// ─── Page ──────────────────────────────────────────────────────────────
export default function LeaderboardPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const xp = useLearningXP();
  useSEO({ title: 'Leaderboard | Study Centre' });

  const [period, setPeriod] = useState<Period>('month');
  const [league, setLeague] = useState<League>('all');
  const [peek, setPeek] = useState<{ entry: Entry; rank: number } | null>(null);
  const [sharing, setSharing] = useState(false);
  const shareRef = useRef<HTMLDivElement>(null);
  const loadSeq = useRef(0);
  const [entries, setEntries] = useState<Entry[]>([]);
  const [me, setMe] = useState<{
    rank: number;
    total: number;
    entry: Entry;
    movement: number | null;
  } | null>(null);
  const [neighbours, setNeighbours] = useState<{ entry: Entry; rank: number; isMe: boolean }[]>([]);
  const [ledger, setLedger] = useState<LedgerRow[]>([]);
  const [eligibility, setEligibility] = useState<'ranked' | 'staff' | 'hidden' | 'unknown'>(
    'unknown'
  );
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);
  const [showAllFeed, setShowAllFeed] = useState(false);

  const bounds = periodBounds(period);
  const countdown = useCountdown(bounds.end);

  const load = useCallback(async () => {
    // Quick tab switches: only the latest request may paint.
    const seq = ++loadSeq.current;
    setLoading(true);
    const since =
      period === 'all' ? '2000-01-01T00:00:00Z' : londonStartIso(periodBounds(period).start);
    const [board, mine, near, rows] = await Promise.all([
      supabase.rpc('get_study_leaderboard' as any, { time_filter: period, league }),
      user
        ? supabase.rpc('get_study_leaderboard_me' as any, { time_filter: period, league })
        : Promise.resolve({ data: null }),
      user
        ? supabase.rpc('get_study_leaderboard_around_me' as any, {
            time_filter: period,
            span: 2,
            league,
          })
        : Promise.resolve({ data: null }),
      user
        ? supabase
            .from('learning_activity_log' as any)
            .select(
              'activity_type, source_id, source_title, xp_earned, created_at, voided_at, metadata'
            )
            .eq('user_id', user.id)
            .gte('created_at', since)
            .order('created_at', { ascending: false })
            .limit(period === 'all' ? 200 : 2000)
        : Promise.resolve({ data: null }),
    ]);
    if (seq !== loadSeq.current) return;
    const toEntry = (d: any): Entry => ({
      user_id: d.uid,
      full_name: d.display_name,
      avatar_url: d.avatar,
      xp: d.xp || 0,
      streak: d.current_streak || 0,
      quiz_count: Number(d.quizzes_taken) || 0,
      awards: Number(d.awards) || 0,
    });
    setEntries(((board.data as any[]) ?? []).map(toEntry));
    const m = (mine.data as any[] | null)?.[0];
    setMe(
      m && user
        ? {
            rank: Number(m.my_rank) || 0,
            total: Number(m.total_learners) || 0,
            movement: m.movement == null ? null : Number(m.movement),
            entry: toEntry({ ...m, uid: user.id }),
          }
        : null
    );
    setNeighbours(
      ((near.data as any[] | null) ?? []).map((d) => ({
        rank: Number(d.pos) || 0,
        isMe: Boolean(d.is_me),
        entry: toEntry(d),
      }))
    );
    setLedger(((rows.data as any[] | null) ?? []) as LedgerRow[]);
    setLoading(false);
  }, [period, league, user]);

  useEffect(() => {
    void load();
  }, [load]);

  useEffect(() => {
    if (!user) return;
    void supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .maybeSingle()
      .then(({ data }) => {
        const p = data as any;
        if (!p) return;
        setEligibility(
          p.admin_role || p.leaderboard_excluded
            ? 'staff'
            : p.leaderboard_visible === false || !p.full_name
              ? 'hidden'
              : 'ranked'
        );
      });
  }, [user]);

  // XP this period straight from the ledger rows listed below, so the figure
  // and the list can never disagree.
  // Awards count towards level and all time, never a week or month board
  // (server rule since 10 Oct: user_achievements is client-written).
  const counted = useMemo(
    () =>
      ledger.filter((r) => !r.voided_at && (period === 'all' || r.activity_type !== 'achievement')),
    [ledger, period]
  );
  // All time can run to thousands of rows: use the server's total there.
  const periodXp =
    period === 'all' ? xp.totalXP : counted.reduce((s, r) => s + (r.xp_earned || 0), 0);
  const todayKey = londonDayKey(new Date().toISOString());
  const todayXp = counted
    .filter((r) => londonDayKey(r.created_at) === todayKey)
    .reduce((s, r) => s + r.xp_earned, 0);

  const days: Day[] = useMemo(() => {
    if (period === 'all') return [];
    const by = new Map<string, number>();
    for (const r of counted) {
      const k = londonDayKey(r.created_at);
      by.set(k, (by.get(k) ?? 0) + r.xp_earned);
    }
    const s = periodBounds(period).start;
    const n = period === 'week' ? 7 : new Date(s.getFullYear(), s.getMonth() + 1, 0).getDate();
    return Array.from({ length: n }, (_, i) => {
      const d = new Date(s.getFullYear(), s.getMonth(), s.getDate() + i);
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
      return {
        key,
        label: d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }),
        xp: by.get(key) ?? 0,
        today: key === todayKey,
        future: key > todayKey,
      };
    });
  }, [counted, period, todayKey]);
  const pastDays = days.filter((d) => !d.future).length;
  const activeDays = days.filter((d) => d.xp > 0).length;
  const bestDay = days.reduce((b, d) => (d.xp > b.xp ? d : b), { xp: 0, label: '' } as Pick<
    Day,
    'xp' | 'label'
  >);

  const gaps = useMemo(() => {
    if (!me || me.rank <= 0) return null;
    const idx = neighbours.findIndex((n) => n.isMe);
    const above = idx > 0 ? neighbours[idx - 1] : null;
    const third = entries[2];
    return {
      next: above
        ? {
            name: formatName(above.entry.full_name),
            xp: Math.max(1, above.entry.xp - me.entry.xp + 1),
          }
        : null,
      podium: me.rank > 3 && third ? Math.max(1, third.xp - me.entry.xp + 1) : null,
    };
  }, [me, neighbours, entries]);

  const nextLevel = LEVELS.find((l) => l.level === xp.level + 1);
  const podium = entries.slice(0, 3);
  const rest = entries.slice(3, showAll ? entries.length : VISIBLE);
  const meInList = entries
    .slice(0, showAll ? entries.length : VISIBLE)
    .some((e) => e.user_id === user?.id);
  const feed = showAllFeed ? ledger : ledger.slice(0, 8);

  const rankLine =
    eligibility === 'staff'
      ? 'Staff account · not ranked'
      : eligibility === 'hidden'
        ? 'Hidden from the board'
        : me && me.rank > 0
          ? `Rank #${me.rank} of ${me.total}`
          : `Not ranked ${period === 'all' ? 'yet' : bounds.since}`;

  // A branded card of your rank, for WhatsApp, Instagram and the rest.
  const shareRank = async () => {
    if (!shareRef.current || !me) return;
    setSharing(true);
    try {
      const { default: html2canvas } = await import('html2canvas');
      const canvas = await html2canvas(shareRef.current, {
        backgroundColor: '#161616',
        scale: 2,
        useCORS: true,
      });
      const blob: Blob | null = await new Promise((r) => canvas.toBlob(r, 'image/png'));
      if (!blob) throw new Error('no image');
      const file = new File([blob], 'elec-mate-rank.png', { type: 'image/png' });
      const text = `I'm #${me.rank} on the Elec-Mate ${period === 'month' ? bounds.label + ' ' : ''}leaderboard. elec-mate.com`;
      const nav = navigator as Navigator & { canShare?: (d: ShareData) => boolean };
      if (nav.canShare?.({ files: [file] })) {
        await nav.share({ files: [file], text });
      } else {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'elec-mate-rank.png';
        a.click();
        setTimeout(() => URL.revokeObjectURL(url), 2000);
        toast('Your rank card is saved. Share it anywhere.');
      }
    } catch (e) {
      if ((e as Error)?.name !== 'AbortError') toast('Couldn’t make the card. Try again.');
    } finally {
      setSharing(false);
    }
  };

  const Row = ({ entry, rank }: { entry: Entry; rank: number }) => {
    const mine = entry.user_id === user?.id;
    return (
      <button
        type="button"
        onClick={() => setPeek({ entry, rank })}
        className={cn(
          'relative flex min-h-[64px] w-full items-center gap-3 px-5 py-3 text-left transition-colors touch-manipulation hover:bg-white/[0.05] active:bg-white/[0.1] sm:px-6',
          mine && 'bg-white/[0.06]'
        )}
      >
        {mine && (
          <span
            aria-hidden
            className="absolute inset-y-2 left-0 w-1 rounded-r-full bg-elec-yellow"
          />
        )}
        <span className="w-8 shrink-0 text-[15px] font-bold tabular-nums text-white">{rank}</span>
        <Avatar entry={entry} />
        <span className="min-w-0 flex-1">
          <span className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
            <span className="break-words text-[15px] font-semibold leading-snug text-white">
              {formatName(entry.full_name)}
            </span>
            {mine && (
              <span className="shrink-0 rounded-full bg-elec-yellow px-2 py-0.5 text-[12px] font-bold text-black">
                You
              </span>
            )}
          </span>
          <span className="mt-0.5 block text-[13px] leading-snug text-white">
            {[
              entry.streak > 0 ? `${entry.streak}\u2011day streak` : null,
              entry.quiz_count > 0
                ? `${entry.quiz_count} ${entry.quiz_count === 1 ? 'quiz' : 'quizzes'}`
                : null,
              entry.awards > 0
                ? `${entry.awards} ${entry.awards === 1 ? 'award' : 'awards'}`
                : null,
            ]
              .filter(Boolean)
              .join(' · ') || 'Just getting started'}
          </span>
        </span>
        <span className="shrink-0 text-right">
          <span className="block text-[16px] font-bold tabular-nums leading-none text-white">
            {entry.xp.toLocaleString()}
          </span>
          <span className="mt-1 block text-[13px] font-semibold text-white">XP</span>
        </span>
      </button>
    );
  };

  const Box = ({ label, value, sub }: { label: string; value: ReactNode; sub?: string }) => (
    <div className="min-w-0 rounded-xl border border-white/[0.12] bg-white/[0.03] px-3.5 py-3">
      <p className="text-[12px] font-semibold leading-snug text-white">{label}</p>
      <p className="mt-0.5 text-[20px] font-bold tabular-nums leading-tight text-white">{value}</p>
      {sub && <p className="line-clamp-2 text-[12px] leading-snug text-white">{sub}</p>}
    </div>
  );

  const ShowMore = ({
    open,
    onClick,
    more,
    less,
  }: {
    open: boolean;
    onClick: () => void;
    more: string;
    less: string;
  }) => (
    <button
      type="button"
      onClick={onClick}
      className="flex h-12 w-full items-center justify-center gap-1 text-[13.5px] font-semibold text-elec-yellow touch-manipulation hover:bg-white/[0.05] active:bg-white/[0.1]"
    >
      {open ? less : more}
      <ChevronDown
        className={cn('h-4 w-4 transition-transform', open && 'rotate-180')}
        aria-hidden
      />
    </button>
  );

  return (
    <HubPage ground="landing">
      <HubMasthead section="Study Centre" title="Leaderboard" backTo="/study-centre" />
      <HubBody>
        {/* ── 1. The competition ─────────────────────────────────────── */}
        <section className="relative -mx-4 overflow-hidden card-landing max-sm:!rounded-none max-sm:!border-x-0 px-5 py-6 sm:mx-0 sm:rounded-3xl sm:px-8 sm:py-8">
          <Hairline />
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="min-w-0">
              <div className="flex items-start justify-between gap-3">
                <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-elec-yellow">
                  Leaderboard
                </p>
                <PageHelpButton help={HELP} className="-mt-2 lg:hidden" />
              </div>
              <h1 className="mt-1.5 text-[30px] font-bold leading-[1.05] tracking-tight text-white sm:text-[40px]">
                {bounds.title}
              </h1>
              <p className="mt-2 max-w-xl text-[14.5px] leading-relaxed text-white">
                {period === 'all'
                  ? 'Every point ever earned. Worked out by the server, the same rules for everyone.'
                  : `XP earned ${bounds.since}, UK time. Worked out by the server, the same rules for everyone.`}
              </p>
            </div>
            <div className="flex items-end gap-3">
              {countdown && (
                <div
                  className="flex gap-2"
                  role="timer"
                  aria-label={`Ends in ${countdown.days} days ${countdown.hours} hours`}
                >
                  {(
                    [
                      [countdown.days, countdown.days === 1 ? 'day' : 'days'],
                      [countdown.hours, 'hrs'],
                      [countdown.mins, 'min'],
                    ] as const
                  ).map(([v, l]) => (
                    <div
                      key={l}
                      className="flex w-[66px] flex-col items-center rounded-2xl border border-white/[0.14] bg-white/[0.05] py-2.5 sm:w-[74px]"
                    >
                      <span className="text-[26px] font-black leading-none tabular-nums text-white sm:text-[30px]">
                        {String(v).padStart(2, '0')}
                      </span>
                      <span className="mt-1 text-[13px] font-semibold text-white">{l}</span>
                    </div>
                  ))}
                </div>
              )}
              <PageHelpButton help={HELP} className="hidden lg:inline-flex" />
            </div>
          </div>
          <div role="tablist" aria-label="Period" className="mt-6 flex flex-wrap gap-2">
            {(['month', 'week', 'all'] as const).map((p) => (
              <button
                key={p}
                type="button"
                role="tab"
                aria-selected={period === p}
                onClick={() => {
                  setPeriod(p);
                  setShowAll(false);
                  setShowAllFeed(false);
                }}
                className={chipCn(period === p)}
              >
                {periodBounds(p).label}
              </button>
            ))}
          </div>
          {/* Leagues: apprentices and qualified electricians ranked apart. */}
          <div role="tablist" aria-label="League" className="mt-2 flex flex-wrap gap-2">
            {LEAGUES.map((l) => (
              <button
                key={l.key}
                type="button"
                role="tab"
                aria-selected={league === l.key}
                onClick={() => {
                  setLeague(l.key);
                  setShowAll(false);
                }}
                className={cn(
                  'h-11 shrink-0 rounded-full border px-3.5 text-[12.5px] font-semibold transition-colors touch-manipulation',
                  league === l.key
                    ? 'border-white bg-white text-black'
                    : 'border-white/[0.14] text-white hover:border-white/[0.3] active:bg-white/[0.08]'
                )}
              >
                {l.label}
              </button>
            ))}
            <button
              type="button"
              onClick={() => navigate('/study-centre/leaderboard/all')}
              className="inline-flex h-11 shrink-0 items-center gap-1 rounded-full border border-elec-yellow px-3.5 text-[12.5px] font-semibold text-elec-yellow transition-colors touch-manipulation hover:bg-elec-yellow hover:text-black active:bg-elec-yellow active:text-black"
            >
              Full table
              <ChevronRight className="h-3.5 w-3.5" aria-hidden />
            </button>
          </div>
        </section>

        <div className="grid items-start gap-8 lg:grid-cols-3 lg:gap-6">
          <div className="min-w-0 space-y-8 lg:col-span-2">
            {/* ── 2. You ─────────────────────────────────────────────── */}
            {user && (
              <section aria-label="You" className={cn(SC_CARD, 'relative overflow-hidden')}>
                <Hairline />
                <div className="flex items-center gap-4 sm:gap-6">
                  <LevelRing level={xp.level} progress={xp.xpProgress} />
                  <div className="min-w-0 flex-1">
                    <p className="text-[12.5px] font-semibold text-white">{rankLine}</p>
                    <p className="mt-1 text-[36px] font-black leading-none tabular-nums text-white sm:text-[44px]">
                      {periodXp.toLocaleString()}
                      <span className="ml-1.5 text-[15px] font-bold">XP</span>
                    </p>
                    <p className="mt-1.5 text-[12.5px] text-white">
                      {period === 'all' ? 'All time' : bounds.since.replace(/^s/, 'S')} ·{' '}
                      {xp.levelTitle}
                      {nextLevel
                        ? ` · ${xp.xpToNextLevel.toLocaleString()} XP to level ${nextLevel.level}`
                        : ''}
                    </p>
                    {me?.movement != null && me.movement !== 0 && period !== 'all' && (
                      <p
                        className={cn(
                          'mt-1.5 inline-flex items-center gap-1 text-[12.5px] font-semibold',
                          me.movement > 0 ? 'text-emerald-400' : 'text-orange-400'
                        )}
                      >
                        {me.movement > 0 ? (
                          <TrendingUp className="h-4 w-4" />
                        ) : (
                          <TrendingDown className="h-4 w-4" />
                        )}
                        {Math.abs(me.movement)} {Math.abs(me.movement) === 1 ? 'place' : 'places'}{' '}
                        {me.movement > 0 ? 'up' : 'down'} on last week
                      </p>
                    )}
                  </div>
                </div>

                <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-4">
                  <Box
                    label="Today"
                    value={todayXp.toLocaleString()}
                    sub={`of ${XP_DAILY_CAP.toLocaleString()} a day`}
                  />
                  {gaps?.next ? (
                    <Box
                      label={`To pass ${gaps.next.name}`}
                      value={gaps.next.xp.toLocaleString()}
                      sub="XP"
                    />
                  ) : (
                    <Box
                      label="Rank"
                      value={me && me.rank > 0 ? (me.rank === 1 ? '1st' : `#${me.rank}`) : '—'}
                      sub={me?.rank === 1 ? 'Top of the board' : undefined}
                    />
                  )}
                  {gaps?.podium ? (
                    <Box label="To the top 3" value={gaps.podium.toLocaleString()} sub="XP" />
                  ) : (
                    <Box
                      label="Days active"
                      value={period === 'all' ? '—' : String(activeDays)}
                      sub={period === 'all' ? undefined : `of ${pastDays}`}
                    />
                  )}
                  <Box
                    label="Best day"
                    value={bestDay.xp > 0 ? bestDay.xp.toLocaleString() : '—'}
                    sub={bestDay.xp > 0 ? bestDay.label : 'No XP yet'}
                  />
                </div>

                {days.length > 0 && (
                  <div className="mt-5">
                    <div className="mb-2 flex items-baseline justify-between">
                      <p className="text-[12.5px] font-semibold text-white">Your XP day by day</p>
                      <p className="text-[12px] text-white">{bounds.label}</p>
                    </div>
                    <DailyBars days={days} />
                  </div>
                )}

                <div className="mt-5 flex flex-col gap-2 sm:flex-row">
                  <button
                    type="button"
                    onClick={() => navigate('/study-centre/mock-exams')}
                    className={cn(COLLEGE_BTN_PRIMARY, 'sm:flex-1')}
                  >
                    <GraduationCap className="h-4 w-4" aria-hidden />
                    Sit a mock · up to 150 XP
                  </button>
                  {me && me.rank > 0 ? (
                    <button
                      type="button"
                      onClick={() => void shareRank()}
                      disabled={sharing}
                      className={cn(COLLEGE_BTN, 'sm:flex-1')}
                    >
                      <Share2 className="h-4 w-4" aria-hidden />
                      {sharing ? 'Making your card…' : 'Share my rank'}
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => navigate('/study-centre')}
                      className={cn(COLLEGE_BTN, 'sm:flex-1')}
                    >
                      What to do next
                    </button>
                  )}
                </div>
              </section>
            )}

            {/* ── Podium ─────────────────────────────────────────────── */}
            {loading ? (
              <div className="grid grid-cols-3 items-end gap-3" aria-busy>
                {[150, 190, 130].map((h, i) => (
                  <div
                    key={i}
                    style={{ height: h }}
                    className="animate-pulse rounded-2xl card-landing"
                  />
                ))}
              </div>
            ) : entries.length === 0 ? (
              <div className={cn(SC_CARD, 'text-center')}>
                <Trophy className="mx-auto h-8 w-8 text-elec-yellow" aria-hidden />
                <p className="mt-3 text-[16px] font-semibold text-white">
                  Nobody on the board {period === 'all' ? 'yet' : bounds.since}
                </p>
                <p className="mt-1 text-[13.5px] text-white">
                  Sit a mock, finish a section or take a quiz to be first.
                </p>
              </div>
            ) : (
              <section aria-labelledby="lb-top" className="space-y-5">
                <CollegeSectionTitle id="lb-top" title="Top three" />
                <div className="grid grid-cols-3 items-end gap-2 pt-4 sm:gap-4">
                  {[podium[1], podium[0], podium[2]].map((e, i) => {
                    if (!e) return <div key={i} />;
                    const rank = i === 1 ? 1 : i === 0 ? 2 : 3;
                    const mine = e.user_id === user?.id;
                    return (
                      <div key={e.user_id} className="flex min-w-0 flex-col items-center">
                        <div className="relative mb-2">
                          {rank === 1 && (
                            <Crown
                              className="absolute -top-6 left-1/2 h-6 w-6 -translate-x-1/2 fill-elec-yellow text-elec-yellow"
                              aria-hidden
                            />
                          )}
                          <Avatar
                            entry={e}
                            size={rank === 1 ? 64 : 52}
                            ring={cn(
                              'ring-2 ring-offset-2 ring-offset-[#1c1c1c]',
                              rank === 1 ? 'ring-elec-yellow' : 'ring-white/40'
                            )}
                          />
                        </div>
                        <span className="line-clamp-2 w-full break-words text-center text-[13px] font-semibold leading-snug text-white sm:text-[14px]">
                          {mine ? 'You' : formatName(e.full_name)}
                        </span>
                        <span className="text-[15px] font-bold tabular-nums text-white sm:text-[17px]">
                          {e.xp.toLocaleString()} <span className="text-[12px]">XP</span>
                        </span>
                        <div
                          className={cn(
                            'relative mt-2 flex w-full items-start justify-center overflow-hidden rounded-t-2xl border border-b-0 pt-3',
                            rank === 1
                              ? 'h-[96px] border-elec-yellow bg-elec-yellow'
                              : rank === 2
                                ? 'h-[68px] card-landing !rounded-b-none'
                                : 'h-[50px] card-landing !rounded-b-none'
                          )}
                        >
                          <span
                            className={cn(
                              'text-[26px] font-black leading-none',
                              rank === 1 ? 'text-black' : 'text-white'
                            )}
                          >
                            {rank}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            )}

            {/* ── The board ──────────────────────────────────────────── */}
            {!loading && entries.length > 3 && (
              <section aria-labelledby="lb-rest" className="space-y-3">
                <CollegeSectionTitle
                  id="lb-rest"
                  title="The board"
                  sub={`Ranked by XP ${bounds.since}. Ties go to whoever got there first.`}
                />
                <div className={SC_LIST}>
                  {rest.map((e, i) => (
                    <Row key={e.user_id} entry={e} rank={i + 4} />
                  ))}
                  {!meInList && me && me.rank > 0 && (
                    <div className="border-t border-white/[0.14]">
                      <p className="px-5 pt-3 text-[13px] font-semibold text-white sm:px-6">
                        Your place
                      </p>
                      <Row entry={me.entry} rank={me.rank} />
                    </div>
                  )}
                  {entries.length > VISIBLE && (
                    <ShowMore
                      open={showAll}
                      onClick={() => setShowAll((v) => !v)}
                      more={`Show the top ${entries.length}`}
                      less="Show top 10"
                    />
                  )}
                  <button
                    type="button"
                    onClick={() => navigate('/study-centre/leaderboard/all')}
                    className="flex min-h-[56px] w-full items-center justify-between gap-3 px-5 text-left touch-manipulation hover:bg-white/[0.05] active:bg-white/[0.1] sm:px-6"
                  >
                    <span>
                      <span className="block text-[14px] font-semibold text-white">
                        Everyone, every period
                      </span>
                      <span className="block text-[12px] text-white">
                        Today, week, month, year and all time side by side
                      </span>
                    </span>
                    <ChevronRight className="h-4 w-4 shrink-0 text-elec-yellow" aria-hidden />
                  </button>
                </div>
              </section>
            )}
          </div>

          {/* ── Side ─────────────────────────────────────────────────── */}
          <div className="min-w-0 space-y-8">
            {/* 3. Every point, line by line */}
            {user && (
              <section aria-labelledby="lb-feed" className="space-y-3">
                <CollegeSectionTitle
                  id="lb-feed"
                  title="Your XP"
                  sub={`Every award ${period === 'all' ? 'ever' : bounds.since}, and why.`}
                />
                <div className={SC_LIST}>
                  {ledger.length === 0 ? (
                    <p className="px-5 py-6 text-[13.5px] text-white sm:px-6">
                      Nothing yet{period === 'all' ? '' : ` ${bounds.since}`}. Your first mock is
                      worth up to 150 XP.
                    </p>
                  ) : (
                    feed.map((r, i) => {
                      const src = SOURCE[r.activity_type] ?? { label: 'Activity', icon: Zap };
                      const Icon = src.icon;
                      const earned = r.xp_earned > 0 && !r.voided_at;
                      const awardOffBoard = r.activity_type === 'achievement' && period !== 'all';
                      const reason = r.voided_at
                        ? 'Not counted'
                        : awardOffBoard
                          ? 'Counts to your level, not this board'
                          : earned
                            ? null
                            : (REASON[r.metadata?.xp_reason ?? ''] ?? 'No XP');
                      return (
                        <div
                          key={`${r.created_at}-${i}`}
                          className="flex items-center gap-3 px-5 py-3 sm:px-6"
                        >
                          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/[0.08] ring-1 ring-white/[0.08]">
                            <Icon
                              className={cn('h-4 w-4', earned ? 'text-elec-yellow' : 'text-white')}
                              aria-hidden
                            />
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="line-clamp-2 text-[14px] font-semibold leading-snug text-white">
                              {(r.activity_type === 'achievement' &&
                                AWARD_TITLE.get(r.source_id ?? '')) ||
                                niceTitle(r.source_title) ||
                                src.label}
                            </span>
                            <span className="line-clamp-2 text-[12.5px] leading-snug text-white">
                              {src.label} · {when(r.created_at)}
                              {reason ? ` · ${reason}` : ''}
                            </span>
                          </span>
                          <span
                            className={cn(
                              'shrink-0 text-[14px] font-bold tabular-nums',
                              earned ? 'text-emerald-400' : 'text-white'
                            )}
                          >
                            {earned ? `+${r.xp_earned}` : '0'}
                          </span>
                        </div>
                      );
                    })
                  )}
                  {ledger.length > 8 && (
                    <ShowMore
                      open={showAllFeed}
                      onClick={() => setShowAllFeed((v) => !v)}
                      more={`Show all ${ledger.length}`}
                      less="Show fewer"
                    />
                  )}
                </div>
              </section>
            )}

            {neighbours.length > 1 && (
              <section aria-labelledby="lb-near" className="space-y-3">
                <CollegeSectionTitle
                  id="lb-near"
                  title="Around you"
                  sub="The people you can catch."
                />
                <div className={SC_LIST}>
                  {neighbours.map((n) => (
                    <Row key={n.entry.user_id} entry={n.entry} rank={n.rank} />
                  ))}
                </div>
              </section>
            )}

            <section aria-labelledby="lb-rules" className="space-y-3">
              <CollegeSectionTitle
                id="lb-rules"
                title="How XP is earned"
                sub="The same rules for everyone."
              />
              <div className={SC_LIST}>
                {XP_EARNING_GUIDE.map((r) => (
                  <div key={r.action} className="px-5 py-3 sm:px-6">
                    <span className="block text-[14px] font-semibold text-white">{r.action}</span>
                    <span className="mt-0.5 block text-[13px] font-bold text-elec-yellow">
                      {r.xp}
                    </span>
                    <span className="block text-[12px] text-white">{r.limit}</span>
                  </div>
                ))}
                <div className="flex items-center gap-2 px-5 py-3 sm:px-6">
                  <Flame className="h-4 w-4 shrink-0 text-orange-400" aria-hidden />
                  <span className="text-[12.5px] text-white">
                    Up to {XP_DAILY_CAP.toLocaleString()} XP a day. Repeats and double taps earn
                    nothing.
                  </span>
                </div>
              </div>
            </section>
          </div>
        </div>

        {/* ── Awards ─────────────────────────────────────────────────── */}
        <AwardsSection />

        {/* Tap a name: their card (the board's own figures; never their XP feed). */}
        <Sheet open={!!peek} onOpenChange={(o) => !o && setPeek(null)}>
          <SheetContent
            side="bottom"
            className="h-auto max-h-[88dvh] overflow-y-auto overscroll-contain rounded-t-2xl border-white/[0.1] bg-background p-0"
          >
            <div aria-hidden className="mx-auto mt-2.5 h-1 w-10 rounded-full bg-white/[0.25]" />
            {peek && (
              <div className="relative overflow-hidden px-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-5">
                <Hairline />
                <div className="flex items-center gap-4">
                  <Avatar
                    entry={peek.entry}
                    size={64}
                    ring="ring-2 ring-offset-2 ring-offset-[#1c1c1c] ring-elec-yellow"
                  />
                  <div className="min-w-0">
                    <SheetTitle className="break-words text-[22px] font-bold leading-tight text-white">
                      {peek.entry.user_id === user?.id ? 'You' : formatName(peek.entry.full_name)}
                    </SheetTitle>
                    <p className="text-[13px] font-medium text-white">
                      #{peek.rank} ·{' '}
                      {league === 'all'
                        ? ''
                        : league === 'apprentices'
                          ? 'Apprentices · '
                          : 'Electricians · '}
                      {bounds.label}
                    </p>
                  </div>
                </div>
                <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-4">
                  <Box
                    label="XP"
                    value={peek.entry.xp.toLocaleString()}
                    sub={period === 'all' ? 'all time' : bounds.since}
                  />
                  <Box
                    label="Streak"
                    value={peek.entry.streak > 0 ? `${peek.entry.streak}` : '—'}
                    sub={peek.entry.streak > 0 ? 'days' : 'Not right now'}
                  />
                  <Box
                    label="Quizzes"
                    value={String(peek.entry.quiz_count)}
                    sub={period === 'all' ? 'all time' : bounds.since}
                  />
                  <Box
                    label="Awards"
                    value={String(peek.entry.awards)}
                    sub={period === 'all' ? 'unlocked' : bounds.since}
                  />
                </div>
                {me &&
                  me.rank > 0 &&
                  peek.entry.user_id !== user?.id &&
                  peek.entry.xp > me.entry.xp && (
                    <p className="mt-4 rounded-xl border border-white/[0.12] px-4 py-3 text-[13.5px] text-white">
                      You’re{' '}
                      <span className="font-bold">
                        {(peek.entry.xp - me.entry.xp + 1).toLocaleString()} XP
                      </span>{' '}
                      from passing {formatName(peek.entry.full_name).split(' ')[0]}.
                    </p>
                  )}
                <button
                  type="button"
                  onClick={() => setPeek(null)}
                  className={cn(COLLEGE_BTN, 'mt-5 w-full')}
                >
                  Close
                </button>
              </div>
            )}
          </SheetContent>
        </Sheet>

        {/* Off-screen: the image "Share my rank" makes (1080 × 1350 at 2×). */}
        {me && me.rank > 0 && (
          <div aria-hidden className="pointer-events-none fixed -left-[10000px] top-0">
            <div
              ref={shareRef}
              style={{ width: 540, height: 675 }}
              className="relative flex flex-col justify-between overflow-hidden bg-[#161616] p-10 text-white"
            >
              <div className="absolute inset-x-0 top-0 h-1.5 bg-elec-yellow" />
              <div>
                <p className="text-[15px] font-bold uppercase tracking-[0.2em] text-elec-yellow">
                  Elec-Mate
                </p>
                <p className="mt-2 text-[26px] font-bold leading-tight">
                  {league === 'all'
                    ? ''
                    : league === 'apprentices'
                      ? 'Apprentices · '
                      : 'Electricians · '}
                  {period === 'month'
                    ? `${bounds.label} leaderboard`
                    : period === 'week'
                      ? 'This week'
                      : 'All-time leaderboard'}
                </p>
              </div>
              <div>
                <p className="text-[150px] font-black leading-none tracking-tight">#{me.rank}</p>
                <p className="mt-3 text-[24px] font-semibold">of {me.total} learners</p>
                <p className="mt-6 text-[44px] font-black leading-none">
                  {periodXp.toLocaleString()} <span className="text-[22px] font-bold">XP</span>
                </p>
                <p className="mt-2 text-[18px]">
                  Level {xp.level} · {xp.levelTitle}
                </p>
              </div>
              <div className="flex items-end justify-between">
                <p className="text-[16px] font-semibold">{formatName(me.entry.full_name)}</p>
                <p className="text-[16px] font-bold text-elec-yellow">elec-mate.com</p>
              </div>
            </div>
          </div>
        )}
      </HubBody>
    </HubPage>
  );
}
