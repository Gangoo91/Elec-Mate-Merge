/**
 * Study Centre leaderboard.
 *
 * Rebuilt on the hub primitives, and reordered around the one question the
 * page exists to answer: where am I, and who is above me?
 *
 * What was wrong beyond the styling:
 *
 *  - **The board was below the fold.** A full-height hero, a four-cell stat
 *    strip, an XP bar, a "Window" group and a "Rank by" group all came before
 *    the first ranked learner. On a laptop you scrolled past five blocks to
 *    reach the thing you opened.
 *  - **You could not see yourself.** It listed the top five and hid the rest
 *    behind "View all 312 learners". If you were 14th, the page told you
 *    "Rank #14" in a chip and then showed you five strangers. Your own row —
 *    the whole point — took a click to reach. Your row is now always rendered:
 *    in place when you are in the visible band, pinned beneath it when you are
 *    not.
 *  - **Five accent colours.** Gold/silver/bronze medals, an orange flame, a
 *    purple star and an indigo gradient, on a page whose house style allows
 *    one. Rank is carried by weight and a single volt for first place.
 *
 * Ranking, sorting and the time window are unchanged — they worked.
 */
import { useState, useEffect, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Flame, Star, Target, Zap } from 'lucide-react';

import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useLearningXP } from '@/hooks/useLearningXP';
import { useStudyStreak } from '@/hooks/useStudyStreak';
import { useQuizResults } from '@/hooks/useQuizResults';
import { ACHIEVEMENT_DEFINITIONS } from '@/data/achievementDefinitions';
import useSEO from '@/hooks/useSEO';
import { cn } from '@/lib/utils';

import {
  HubPage,
  HubBody,
  HubMasthead,
  HubSectionHeading,
  HubKpi,
  HubKpiRow,
} from '@/components/hub/HubPrimitives';
import { CARD_BASE, CARD_NEUTRAL } from '@/components/ui/card-recipe';

interface LeaderboardEntry {
  user_id: string;
  full_name: string;
  avatar_url: string | null;
  sections_completed: number;
  total_xp: number;
  streak: number;
  quiz_count: number;
  quiz_avg: number;
  achievement_count: number;
}

type SortKey = 'xp' | 'streak' | 'quizzes' | 'achievements';
type TimeFilter = 'week' | 'month' | 'all';

/** How many rows before we stop and pin the user's own. */
const VISIBLE = 10;

function formatName(fullName: string | null): string {
  if (!fullName) return 'Learner';
  const parts = fullName.trim().split(/\s+/);
  if (parts.length === 1) return parts[0];
  return `${parts[0]} ${parts[parts.length - 1][0]}.`;
}

function getInitials(fullName: string | null): string {
  if (!fullName) return '?';
  const parts = fullName.trim().split(/\s+/);
  if (parts.length === 1) return parts[0][0]?.toUpperCase() || '?';
  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
}

const SORT_TABS: { key: SortKey; label: string; icon: typeof Zap }[] = [
  { key: 'xp', label: 'XP', icon: Zap },
  { key: 'streak', label: 'Streak', icon: Flame },
  { key: 'quizzes', label: 'Quiz avg', icon: Target },
  { key: 'achievements', label: 'Awards', icon: Star },
];

const TIME_TABS: { key: TimeFilter; label: string }[] = [
  { key: 'week', label: 'This week' },
  { key: 'month', label: 'This month' },
  { key: 'all', label: 'All time' },
];

const chipCn = (active: boolean) =>
  cn(
    'inline-flex h-9 shrink-0 items-center gap-1.5 rounded-full border px-3.5 text-[12.5px] transition-colors touch-manipulation',
    'focus:outline-none focus-visible:ring-2 focus-visible:ring-elec-yellow/50',
    active
      ? 'border-elec-yellow bg-elec-yellow font-semibold text-black'
      : 'border-white/[0.12] bg-white/[0.05] font-medium text-white hover:border-white/[0.25]'
  );

export default function LeaderboardPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const xpData = useLearningXP();
  const streakData = useStudyStreak();
  const quizData = useQuizResults();

  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  /**
   * The caller's own row, fetched separately.
   *
   * The board query is `LIMIT 50` against ~288 eligible learners, so most
   * people are not in it and their rank cannot be derived client-side. This
   * comes from `get_study_leaderboard_me`, which ranks with the same rules.
   */
  const [me, setMe] = useState<{
    rank: number;
    total: number;
    entry: LeaderboardEntry;
    /** Places gained since a week ago. Positive is up. Null until there's a baseline. */
    movement: number | null;
  } | null>(null);
  /** The few learners either side of you — the ones you can realistically catch. */
  const [neighbours, setNeighbours] = useState<
    { entry: LeaderboardEntry; rank: number; isMe: boolean }[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState<SortKey>('xp');
  const [unlockedAchievements, setUnlockedAchievements] = useState<string[]>([]);
  const [showAllRankings, setShowAllRankings] = useState(false);
  const [showAllAchievements, setShowAllAchievements] = useState(false);
  const [timeFilter, setTimeFilter] = useState<TimeFilter>('all');

  // useSEO appends "| Elec-Mate" itself.
  useSEO({ title: 'Leaderboard | Study Centre' });

  const fetchLeaderboard = useCallback(async () => {
    try {
      const { data, error } = await supabase.rpc('get_study_leaderboard' as any, {
        time_filter: timeFilter,
      });
      if (!error && data) {
        setEntries(
          (data as any[]).map((d: any) => ({
            user_id: d.uid,
            full_name: d.display_name,
            avatar_url: d.avatar,
            sections_completed: d.sections_done || 0,
            total_xp: d.xp || 0,
            streak: d.current_streak || 0,
            quiz_count: d.quizzes_taken || 0,
            quiz_avg: parseFloat(d.avg_quiz_score) || 0,
            achievement_count: d.awards || 0,
          }))
        );
      }
    } catch {
      /* silent — empty list renders the empty state */
    } finally {
      setLoading(false);
    }
  }, [timeFilter]);

  useEffect(() => {
    if (!user) return;
    supabase
      .from('user_achievements' as any)
      .select('achievement_id')
      .eq('user_id', user.id)
      .then(({ data }) => {
        if (data) setUnlockedAchievements((data as any).map((d: any) => d.achievement_id));
      });
  }, [user]);

  const fetchMyRank = useCallback(async () => {
    if (!user) {
      setMe(null);
      return;
    }
    try {
      // Typed, unlike the board call above — the generated types were
      // refreshed after this function was created.
      const { data, error } = await supabase.rpc('get_study_leaderboard_me', {
        time_filter: timeFilter,
      });
      const row = data?.[0];
      if (error || !row) {
        setMe(null);
        return;
      }
      setMe({
        rank: Number(row.my_rank) || 0,
        total: Number(row.total_learners) || 0,
        movement: row.movement === null || row.movement === undefined ? null : Number(row.movement),
        entry: {
          user_id: user.id,
          full_name: row.display_name,
          avatar_url: row.avatar,
          sections_completed: 0,
          total_xp: row.xp || 0,
          streak: row.current_streak || 0,
          quiz_count: Number(row.quizzes_taken) || 0,
          quiz_avg: Number(row.avg_quiz_score) || 0,
          achievement_count: Number(row.awards) || 0,
        },
      });
    } catch {
      setMe(null);
    }
  }, [user, timeFilter]);

  const fetchNeighbours = useCallback(async () => {
    if (!user) {
      setNeighbours([]);
      return;
    }
    try {
      const { data, error } = await supabase.rpc('get_study_leaderboard_around_me', {
        time_filter: timeFilter,
        span: 3,
      });
      if (error || !data) {
        setNeighbours([]);
        return;
      }
      setNeighbours(
        data.map((d) => ({
          rank: Number(d.pos) || 0,
          isMe: Boolean(d.is_me),
          entry: {
            user_id: d.uid,
            full_name: d.display_name,
            avatar_url: d.avatar,
            sections_completed: 0,
            total_xp: d.xp || 0,
            streak: d.current_streak || 0,
            quiz_count: Number(d.quizzes_taken) || 0,
            quiz_avg: Number(d.avg_quiz_score) || 0,
            achievement_count: Number(d.awards) || 0,
          },
        }))
      );
    } catch {
      setNeighbours([]);
    }
  }, [user, timeFilter]);

  useEffect(() => {
    setLoading(true);
    fetchLeaderboard();
    fetchMyRank();
    fetchNeighbours();
  }, [fetchLeaderboard, fetchMyRank, fetchNeighbours]);

  const sortedEntries = useMemo(
    () =>
      [...entries].sort((a, b) => {
        switch (sortBy) {
          case 'xp':
            return b.total_xp - a.total_xp;
          case 'streak':
            return b.streak - a.streak;
          case 'quizzes':
            return b.quiz_avg - a.quiz_avg;
          case 'achievements':
            return b.achievement_count - a.achievement_count;
        }
      }),
    [entries, sortBy]
  );

  const userIndex = sortedEntries.findIndex((e) => e.user_id === user?.id);
  const userRank = userIndex + 1;
  const currentStreak = streakData?.streak?.currentStreak || 0;
  const quizResults = quizData?.results || [];
  const quizAvg =
    quizResults.length > 0
      ? Math.round(
          quizResults.reduce((acc: number, r: any) => acc + (r.score || r.percentage || 0), 0) /
            quizResults.length
        )
      : 0;
  const totalXP = xpData?.totalXP ?? 0;
  const level = xpData?.level ?? 1;
  const xpProgress = xpData?.xpProgress ?? 0;
  const allAchievements = ACHIEVEMENT_DEFINITIONS || [];

  const visible = showAllRankings ? sortedEntries : sortedEntries.slice(0, VISIBLE);
  const inVisibleBand = visible.some((e) => e.user_id === user?.id);

  /**
   * Your row, pinned beneath the board when it isn't already in view.
   *
   * Two sources: if you're inside the top 50 the board payload has you, and
   * your position follows whatever the list is sorted by. If you're outside it,
   * only `get_study_leaderboard_me` knows where you are — and that ranks by XP,
   * which is the board's own ordering. So the pin is limited to the XP sort;
   * showing an XP rank next to a list sorted by streak would be a number that
   * doesn't match the rows above it.
   */
  const pinnedUser = inVisibleBand
    ? null
    : userIndex >= 0
      ? { entry: sortedEntries[userIndex], rank: userRank }
      : me && sortBy === 'xp'
        ? { entry: me.entry, rank: me.rank }
        : null;

  // Prefer the server's rank — it's exact for everyone, where the client-side
  // index only works for the 50 rows that made it into the payload.
  const displayRank = me?.rank || userRank;
  const displayTotal = me?.total || sortedEntries.length;
  const movement = me?.movement ?? null;

  const valueFor = (entry: LeaderboardEntry) =>
    sortBy === 'xp'
      ? entry.total_xp.toLocaleString()
      : sortBy === 'streak'
        ? String(entry.streak)
        : sortBy === 'quizzes'
          ? `${Math.round(entry.quiz_avg)}%`
          : String(entry.achievement_count);

  const unitFor =
    sortBy === 'xp' ? 'XP' : sortBy === 'streak' ? 'days' : sortBy === 'quizzes' ? 'avg' : 'awards';

  const Row = ({
    entry,
    rank,
    pinned = false,
  }: {
    entry: LeaderboardEntry;
    rank: number;
    pinned?: boolean;
  }) => {
    const isCurrentUser = entry.user_id === user?.id;
    return (
      <div
        className={cn(
          'flex min-h-[56px] items-center gap-3 px-4 py-2.5 sm:px-5',
          !pinned && 'border-t border-white/[0.06] first:border-t-0',
          isCurrentUser && 'bg-elec-yellow/[0.06]'
        )}
      >
        {/* Rank. First place is the only volt figure — a gold/silver/bronze
            ramp put three more colours on a one-accent page. */}
        <span
          className={cn(
            'w-7 shrink-0 text-[14px] font-bold tabular-nums',
            rank === 1 ? 'text-elec-yellow' : rank <= 3 ? 'text-white' : 'text-white/55'
          )}
        >
          {rank}
        </span>

        {entry.avatar_url ? (
          <img
            src={entry.avatar_url}
            alt=""
            loading="lazy"
            className="h-9 w-9 shrink-0 rounded-full object-cover"
          />
        ) : (
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/10 text-[11px] font-bold text-white">
            {getInitials(entry.full_name)}
          </span>
        )}

        <span className="min-w-0 flex-1">
          <span
            className={cn(
              'block truncate text-[14px] font-medium',
              isCurrentUser ? 'text-elec-yellow' : 'text-white'
            )}
          >
            {formatName(entry.full_name)}
            {isCurrentUser && <span className="ml-1.5 text-[11.5px] text-white">you</span>}
          </span>
          {/* One quiet line of context, no icons competing with the figure. */}
          <span className="block truncate text-[11.5px] text-white">
            {[
              entry.streak > 0 ? `${entry.streak}-day streak` : null,
              entry.quiz_count > 0 ? `${entry.quiz_count} quizzes` : null,
              entry.achievement_count > 0 ? `${entry.achievement_count} awards` : null,
            ]
              .filter(Boolean)
              .join(' · ') || 'Just getting started'}
          </span>
        </span>

        <span className="shrink-0 text-right">
          <span className="block text-[15px] font-semibold tabular-nums leading-none text-white">
            {valueFor(entry)}
          </span>
          <span className="mt-1 block text-[10px] uppercase tracking-wider text-white">
            {unitFor}
          </span>
        </span>
      </div>
    );
  };

  return (
    <HubPage>
      <HubMasthead section="Learning" title="Leaderboard" backTo="/study-centre" />

      <HubBody>
        {/* Your rank takes the row's single accent. On a leaderboard it is the
            figure the page exists to report. */}
        <HubKpiRow>
          {/*
            The board fetches 50 rows against ~288 eligible learners, so this
            used to read "—" for most people and, worse, explained it with
            "take a quiz to join the board" to learners who had already taken
            several. The rank now comes from the server for everyone.
          */}
          {/*
            Movement comes from `study_rank_snapshots`, not from arithmetic on
            the activity log — that log only reconciles with the XP total for 87
            of 204 learners, so a computed "moved up 3" would have been fiction
            for most people. Null until a snapshot a week old exists, and the
            delta is simply omitted rather than shown as zero: "no change" and
            "we don't know yet" are different claims.

            Climbing is `direction="up"` AND `sentiment="good"` — the primitive
            keeps those separate because rising is not always good news, but on
            a leaderboard it is.
          */}
          <HubKpi
            label="Your rank"
            value={displayRank > 0 ? `#${displayRank}` : '—'}
            accent
            delta={
              movement !== null && movement !== 0
                ? `${movement > 0 ? '+' : ''}${movement}`
                : undefined
            }
            direction={movement === null || movement === 0 ? 'flat' : movement > 0 ? 'up' : 'down'}
            sentiment={movement === null || movement === 0 ? 'neutral' : movement > 0 ? 'good' : 'bad'}
            verdict={
              displayRank > 0
                ? `of ${displayTotal} ${displayTotal === 1 ? 'learner' : 'learners'}`
                : 'Take a quiz to join the board'
            }
            context={
              displayRank === 1
                ? 'Top of the board'
                : movement !== null && movement !== 0
                  ? `${Math.abs(movement)} ${Math.abs(movement) === 1 ? 'place' : 'places'} ${movement > 0 ? 'up' : 'down'} this week`
                  : undefined
            }
          />
          <HubKpi
            label="Your XP"
            value={totalXP.toLocaleString()}
            verdict={`Level ${level}`}
            context={`${Math.round(xpProgress)}% to level ${level + 1}`}
          />
          <HubKpi
            label="Streak"
            value={String(currentStreak)}
            verdict={currentStreak > 0 ? `Day ${currentStreak}` : 'Start today'}
          />
          <HubKpi
            label="Awards"
            value={`${unlockedAchievements.length}/${allAchievements.length}`}
            verdict={
              quizResults.length > 0 ? `Quiz average ${quizAvg}%` : 'Take your first quiz'
            }
          />
        </HubKpiRow>

        {/*
          Learners near you, above the top ten on purpose.

          The top of any board is unreachable for almost everyone: 1st has
          19,135 XP. The people immediately above you are the ones you could
          actually pass this week, and they are the reason to open the app
          tomorrow. Only shown on the XP sort, since the window is ranked by XP,
          and only when there is somebody to show besides yourself.
        */}
        {sortBy === 'xp' && neighbours.length > 1 && (
          <section className="space-y-3">
            <HubSectionHeading>Learners near you</HubSectionHeading>
            <div className={cn(CARD_BASE, CARD_NEUTRAL, 'block overflow-hidden p-0')}>
              {neighbours.map((n) => (
                <Row key={n.entry.user_id} entry={n.entry} rank={n.rank} />
              ))}
            </div>
            {(() => {
              const idx = neighbours.findIndex((n) => n.isMe);
              const above = idx > 0 ? neighbours[idx - 1] : null;
              const gap = above ? above.entry.total_xp - neighbours[idx].entry.total_xp : 0;
              return above && gap > 0 ? (
                <p className="text-[12.5px] text-white">
                  {gap.toLocaleString()} XP behind {formatName(above.entry.full_name)} — one
                  section could close it.
                </p>
              ) : null;
            })()}
          </section>
        )}

        <section className="space-y-3">
          <HubSectionHeading>Top learners</HubSectionHeading>

          {/* Both filters in one block, above the board rather than as two
              separate labelled sections pushing it further down. */}
          <div className="flex flex-wrap gap-2">
            {TIME_TABS.map((t) => (
              <button
                key={t.key}
                type="button"
                onClick={() => setTimeFilter(t.key)}
                aria-pressed={timeFilter === t.key}
                className={chipCn(timeFilter === t.key)}
              >
                {t.label}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            {SORT_TABS.map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                type="button"
                onClick={() => setSortBy(key)}
                aria-pressed={sortBy === key}
                className={chipCn(sortBy === key)}
              >
                <Icon className="h-3.5 w-3.5" aria-hidden />
                {label}
              </button>
            ))}
          </div>

          <div className={cn(CARD_BASE, CARD_NEUTRAL, 'block overflow-hidden p-0')}>
            {loading ? (
              <p className="px-5 py-10 text-center text-[13px] text-white">Loading the board…</p>
            ) : sortedEntries.length === 0 ? (
              <div className="px-5 py-10 text-center">
                <p className="text-[15px] font-semibold text-white">No learners yet</p>
                <p className="mt-1.5 text-[13px] text-white">
                  Finish a section or take a quiz — be the first on the board.
                </p>
                <button
                  type="button"
                  onClick={() => navigate('/study-centre/browse')}
                  className="mt-4 inline-flex h-11 items-center rounded-xl bg-elec-yellow px-5 text-[13px] font-semibold text-black transition-colors hover:bg-elec-yellow/90 touch-manipulation"
                >
                  Find a course
                </button>
              </div>
            ) : (
              <>
                {visible.map((entry, idx) => (
                  <Row key={entry.user_id} entry={entry} rank={idx + 1} />
                ))}

                {/* Your row, pinned. Without this the page reported a rank it
                    then refused to show you. */}
                {pinnedUser && (
                  <div className="border-t border-white/[0.14] bg-white/[0.02]">
                    <p className="px-4 pt-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-white sm:px-5">
                      Your position
                    </p>
                    <Row entry={pinnedUser.entry} rank={pinnedUser.rank} pinned />
                  </div>
                )}

                {sortedEntries.length > VISIBLE && (
                  <button
                    type="button"
                    onClick={() => setShowAllRankings(!showAllRankings)}
                    className="w-full border-t border-white/[0.06] py-3.5 text-[12.5px] font-semibold text-elec-yellow transition-colors hover:bg-white/[0.04] touch-manipulation"
                  >
                    {/* Not "all N learners" — the board fetches 50 of ~288, so
                        "all" was claiming to show everyone while sitting
                        directly under "of 288 learners". */}
                    {showAllRankings
                      ? 'Show top 10'
                      : `Show the full top ${sortedEntries.length}`}
                  </button>
                )}
              </>
            )}
          </div>
        </section>

        {allAchievements.length > 0 && (
          <section className="space-y-3">
            <HubSectionHeading>
              Awards · {unlockedAchievements.length}/{allAchievements.length}
            </HubSectionHeading>

            <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-[repeat(auto-fill,minmax(260px,1fr))] sm:gap-3">
              {(showAllAchievements ? allAchievements : allAchievements.slice(0, 6)).map(
                (ach: any) => {
                  const unlocked = unlockedAchievements.includes(ach.id);
                  return (
                    <div
                      key={ach.id}
                      className={cn(
                        CARD_BASE,
                        CARD_NEUTRAL,
                        'p-4',
                        !unlocked && 'opacity-55'
                      )}
                    >
                      <span className="flex items-baseline justify-between gap-2">
                        <span className="text-[14px] font-semibold text-white">{ach.title}</span>
                        <span
                          className={cn(
                            'shrink-0 text-[11px] font-semibold tabular-nums',
                            unlocked ? 'text-elec-yellow' : 'text-white'
                          )}
                        >
                          +{ach.xpBonus} XP
                        </span>
                      </span>
                      <span className="mt-1 block text-[12.5px] leading-snug text-white">
                        {ach.description}
                      </span>
                      <span className="mt-2 block text-[11px] font-medium text-white">
                        {unlocked ? 'Unlocked' : 'Locked'}
                      </span>
                    </div>
                  );
                }
              )}
            </div>

            {allAchievements.length > 6 && (
              <button
                type="button"
                onClick={() => setShowAllAchievements(!showAllAchievements)}
                className="h-11 text-[12.5px] font-semibold text-elec-yellow transition-colors touch-manipulation"
              >
                {showAllAchievements ? 'Show less' : `View all ${allAchievements.length} awards`}
              </button>
            )}
          </section>
        )}
      </HubBody>
    </HubPage>
  );
}
