import { useState, useEffect, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Flame, Star, Target, Trophy, Zap } from 'lucide-react';

import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useLearningXP } from '@/hooks/useLearningXP';
import { useStudyStreak } from '@/hooks/useStudyStreak';
import { useQuizResults } from '@/hooks/useQuizResults';
import { ACHIEVEMENT_DEFINITIONS } from '@/data/achievementDefinitions';
import useSEO from '@/hooks/useSEO';
import { cn } from '@/lib/utils';

import {
  PageFrame,
  PageHero,
  StatStrip,
  ListCard,
  ListRow,
  Eyebrow,
  EmptyState,
  LoadingState,
} from '@/components/college/primitives';

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
  { key: 'quizzes', label: 'Quizzes', icon: Target },
  { key: 'achievements', label: 'Awards', icon: Star },
];

const TIME_TABS: { key: TimeFilter; label: string }[] = [
  { key: 'week', label: 'This week' },
  { key: 'month', label: 'This month' },
  { key: 'all', label: 'All time' },
];

export default function LeaderboardPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const xpData = useLearningXP();
  const streakData = useStudyStreak();
  const quizData = useQuizResults();

  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState<SortKey>('xp');
  const [unlockedAchievements, setUnlockedAchievements] = useState<string[]>([]);
  const [showAllRankings, setShowAllRankings] = useState(false);
  const [showAllAchievements, setShowAllAchievements] = useState(false);
  const [timeFilter, setTimeFilter] = useState<TimeFilter>('all');

  useSEO({ title: 'Leaderboard | Study Centre | Elec-Mate' });

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

  useEffect(() => {
    setLoading(true);
    fetchLeaderboard();
  }, [fetchLeaderboard]);

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

  const userRank = sortedEntries.findIndex((e) => e.user_id === user?.id) + 1;
  const currentStreak = streakData?.streak?.currentStreak || 0;
  const quizResults = quizData?.results || [];
  const quizAvg =
    quizResults.length > 0
      ? Math.round(
          quizResults.reduce(
            (acc: number, r: any) => acc + (r.score || r.percentage || 0),
            0
          ) / quizResults.length
        )
      : 0;
  const totalXP = xpData?.totalXP ?? 0;
  const level = xpData?.level ?? 1;
  const xpProgress = xpData?.xpProgress ?? 0;
  const allAchievements = ACHIEVEMENT_DEFINITIONS || [];

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('/study-centre')}
            className="inline-flex items-center gap-2 h-10 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Study centre
          </button>

          <PageHero
            eyebrow="Study centre"
            title="Leaderboard"
            description="Where you sit, what you've earned and what's next — across every learner on the platform."
            tone="yellow"
            actions={
              userRank > 0 ? (
                <span className="inline-flex items-center gap-1.5 h-9 px-3 rounded-full bg-elec-yellow/15 border border-elec-yellow/30 text-elec-yellow text-[12px] font-semibold">
                  <Trophy className="h-3.5 w-3.5" />
                  Rank #{userRank}
                </span>
              ) : undefined
            }
          />

          {/* Snapshot */}
          <StatStrip
            columns={4}
            stats={[
              {
                label: 'Your XP',
                value: totalXP.toLocaleString(),
                sub: `Level ${level} · ${Math.round(xpProgress)}%`,
              },
              {
                label: 'Streak',
                value: currentStreak,
                sub: currentStreak > 0 ? 'days' : 'Start today',
              },
              {
                label: 'Quiz avg',
                value: quizResults.length > 0 ? `${quizAvg}%` : '—',
                sub:
                  quizResults.length > 0
                    ? `${quizResults.length} taken`
                    : 'Take your first',
              },
              {
                label: 'Awards',
                value: `${unlockedAchievements.length}/${allAchievements.length}`,
                sub: 'unlocked',
              },
            ]}
          />

          {/* XP progress to next level */}
          {xpData?.xpToNextLevel != null && xpData.xpToNextLevel > 0 && (
            <div className="rounded-2xl bg-[hsl(0_0%_12%)] border border-white/[0.06] p-5">
              <div className="flex items-center justify-between gap-3 mb-2">
                <div>
                  <Eyebrow>Level {level}</Eyebrow>
                  <div className="mt-1 text-[15px] font-semibold text-white">
                    {Math.round(xpProgress)}% to level {level + 1}
                  </div>
                </div>
                <span className="text-[12px] text-white">{xpData.xpToNextLevel} XP to go</span>
              </div>
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-elec-yellow to-amber-500 rounded-full transition-all duration-500"
                  style={{ width: `${xpProgress}%` }}
                />
              </div>
            </div>
          )}

          {/* Time filter */}
          <div>
            <Eyebrow className="mb-2">Window</Eyebrow>
            <div className="flex gap-1 p-1 rounded-xl bg-[hsl(0_0%_10%)] border border-white/[0.06]">
              {TIME_TABS.map(({ key, label }) => (
                <button
                  key={key}
                  onClick={() => setTimeFilter(key)}
                  className={cn(
                    'flex-1 h-10 rounded-lg text-[12.5px] font-medium transition-all touch-manipulation',
                    timeFilter === key
                      ? 'bg-elec-yellow text-black'
                      : 'text-white hover:bg-white/[0.06]'
                  )}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Sort tabs — horizontal-scroll on mobile so all four fit cleanly */}
          <div>
            <Eyebrow className="mb-2">Rank by</Eyebrow>
            <div className="flex gap-2 overflow-x-auto -mx-1 px-1 pb-1 [&::-webkit-scrollbar]:hidden">
              {SORT_TABS.map(({ key, label, icon: Icon }) => (
                <button
                  key={key}
                  onClick={() => setSortBy(key)}
                  className={cn(
                    'shrink-0 inline-flex items-center justify-center gap-1.5 h-10 px-4 rounded-full text-[12.5px] font-medium transition-all touch-manipulation',
                    sortBy === key
                      ? 'bg-elec-yellow/15 text-elec-yellow border border-elec-yellow/30'
                      : 'bg-white/[0.04] text-white border border-white/[0.08] hover:bg-white/[0.08]'
                  )}
                >
                  <Icon className="h-3.5 w-3.5" />
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Rankings */}
          <ListCard>
            <div className="relative px-5 sm:px-6 py-3.5 sm:py-4 border-b border-white/[0.06]">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-elec-yellow/70 via-amber-400/70 to-orange-400/70 opacity-70" />
              <div className="flex items-center justify-between gap-2">
                <div className="text-[13px] font-semibold text-white">Top learners</div>
                <span className="text-[11px] text-white">
                  {sortedEntries.length} {sortedEntries.length === 1 ? 'learner' : 'learners'}
                </span>
              </div>
            </div>
            {loading ? (
              <LoadingState className="py-10" />
            ) : sortedEntries.length === 0 ? (
              <EmptyState
                title="No learners yet"
                description="Start a quiz or finish a section — be the first on the board."
                action="Browse courses"
                onAction={() => navigate('/study-centre')}
              />
            ) : (
              <div>
                {(showAllRankings ? sortedEntries : sortedEntries.slice(0, 5)).map((entry, idx) => {
                  const rank = idx + 1;
                  const isCurrentUser = entry.user_id === user?.id;

                  const primaryValue =
                    sortBy === 'xp'
                      ? entry.total_xp.toLocaleString()
                      : sortBy === 'streak'
                        ? entry.streak
                        : sortBy === 'quizzes'
                          ? `${Math.round(entry.quiz_avg)}%`
                          : entry.achievement_count;
                  const primaryLabel =
                    sortBy === 'xp'
                      ? 'XP'
                      : sortBy === 'streak'
                        ? 'days'
                        : sortBy === 'quizzes'
                          ? 'avg'
                          : 'awards';

                  const medal =
                    rank === 1
                      ? 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30'
                      : rank === 2
                        ? 'bg-zinc-300/20 text-zinc-200 border-zinc-300/30'
                        : rank === 3
                          ? 'bg-amber-700/20 text-amber-500 border-amber-700/30'
                          : 'bg-white/[0.04] text-white border-white/[0.08]';

                  return (
                    <ListRow
                      key={entry.user_id}
                      lead={
                        <div className="flex items-center gap-3">
                          <div
                            className={cn(
                              'h-8 w-8 rounded-full border flex items-center justify-center text-[12px] font-bold shrink-0',
                              medal
                            )}
                          >
                            {rank}
                          </div>
                          {entry.avatar_url ? (
                            <img
                              src={entry.avatar_url}
                              alt=""
                              className="h-9 w-9 rounded-full object-cover shrink-0"
                            />
                          ) : (
                            <div className="h-9 w-9 rounded-full bg-white/10 flex items-center justify-center text-[11px] font-bold text-white shrink-0">
                              {getInitials(entry.full_name)}
                            </div>
                          )}
                        </div>
                      }
                      title={
                        <span className={isCurrentUser ? 'text-elec-yellow' : 'text-white'}>
                          {formatName(entry.full_name)}
                          {isCurrentUser && (
                            <span className="ml-1 text-[11px] text-white">(you)</span>
                          )}
                        </span>
                      }
                      subtitle={
                        <span className="flex items-center gap-2 text-[11.5px] text-white">
                          {entry.streak > 0 && (
                            <span className="inline-flex items-center gap-0.5 text-orange-400">
                              <Flame className="h-3 w-3" />
                              {entry.streak}
                            </span>
                          )}
                          {entry.quiz_count > 0 && <span>{entry.quiz_count} quizzes</span>}
                          {entry.achievement_count > 0 && (
                            <span className="inline-flex items-center gap-0.5 text-purple-300">
                              <Star className="h-3 w-3" />
                              {entry.achievement_count}
                            </span>
                          )}
                        </span>
                      }
                      trailing={
                        <div className="text-right">
                          <div className="text-[15px] font-semibold text-white leading-none">
                            {primaryValue}
                          </div>
                          <div className="text-[10px] text-white mt-1 uppercase tracking-wider">
                            {primaryLabel}
                          </div>
                        </div>
                      }
                      className={isCurrentUser ? 'bg-elec-yellow/[0.05]' : undefined}
                    />
                  );
                })}
                {sortedEntries.length > 5 && (
                  <button
                    onClick={() => setShowAllRankings(!showAllRankings)}
                    className="w-full py-3.5 text-[12.5px] font-medium text-elec-yellow hover:text-white transition-colors touch-manipulation border-t border-white/[0.06]"
                  >
                    {showAllRankings ? 'Show less' : `View all ${sortedEntries.length} learners`}
                  </button>
                )}
              </div>
            )}
          </ListCard>

          {/* Achievements */}
          {allAchievements.length > 0 && (
            <ListCard>
              <div className="relative px-5 sm:px-6 py-3.5 sm:py-4 border-b border-white/[0.06]">
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-purple-500/70 via-violet-400/70 to-indigo-400/70 opacity-70" />
                <div className="flex items-center justify-between gap-2">
                  <div className="text-[13px] font-semibold text-white">Achievements</div>
                  <span className="text-[11.5px] font-semibold text-elec-yellow">
                    {unlockedAchievements.length}/{allAchievements.length}
                  </span>
                </div>
                <div className="mt-3 h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-elec-yellow to-amber-500 rounded-full transition-all duration-500"
                    style={{
                      width: `${(unlockedAchievements.length / allAchievements.length) * 100}%`,
                    }}
                  />
                </div>
              </div>
              <div>
                {(showAllAchievements ? allAchievements : allAchievements.slice(0, 5)).map(
                  (ach: any) => {
                    const unlocked = unlockedAchievements.includes(ach.id);
                    return (
                      <ListRow
                        key={ach.id}
                        lead={
                          <div
                            className={cn(
                              'h-8 w-8 rounded-lg flex items-center justify-center text-[13px] font-bold shrink-0',
                              unlocked
                                ? 'bg-elec-yellow/15 text-elec-yellow border border-elec-yellow/30'
                                : 'bg-white/[0.04] text-white border border-white/[0.08]'
                            )}
                          >
                            {unlocked ? '✓' : '?'}
                          </div>
                        }
                        title={
                          <span className={unlocked ? 'text-white' : 'text-white/60'}>
                            {ach.title}
                          </span>
                        }
                        subtitle={
                          <span className={unlocked ? 'text-white' : 'text-white/40'}>
                            {ach.description}
                          </span>
                        }
                        trailing={
                          <span
                            className={cn(
                              'text-[11px] font-semibold',
                              unlocked ? 'text-elec-yellow' : 'text-white/40'
                            )}
                          >
                            +{ach.xpBonus} XP
                          </span>
                        }
                      />
                    );
                  }
                )}
                {allAchievements.length > 5 && (
                  <button
                    onClick={() => setShowAllAchievements(!showAllAchievements)}
                    className="w-full py-3.5 text-[12.5px] font-medium text-elec-yellow hover:text-white transition-colors touch-manipulation border-t border-white/[0.06]"
                  >
                    {showAllAchievements
                      ? 'Show less'
                      : `View all ${allAchievements.length} achievements`}
                  </button>
                )}
              </div>
            </ListCard>
          )}
        </PageFrame>
      </div>
    </div>
  );
}
