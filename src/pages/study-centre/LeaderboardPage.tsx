/**
 * LeaderboardPage — Full leaderboard with hero, podium, tabs, achievements.
 */

import React, { useState, useEffect, useCallback } from 'react';
import { ArrowLeft, Trophy, Flame, Zap, Target, ChevronRight, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useLearningXP } from '@/hooks/useLearningXP';
import { useStudyStreak } from '@/hooks/useStudyStreak';
import { useQuizResults } from '@/hooks/useQuizResults';
import { ACHIEVEMENT_DEFINITIONS } from '@/data/achievementDefinitions';
import useSEO from '@/hooks/useSEO';

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

type SortKey = 'xp' | 'streak' | 'quizzes' | 'achievements';

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
  const [timeFilter, setTimeFilter] = useState<'week' | 'month' | 'all'>('all');

  useSEO({ title: 'Leaderboard | Study Centre | Elec-Mate' });

  // Fetch leaderboard
  const fetchLeaderboard = useCallback(async () => {
    try {
      const { data, error } = await supabase.rpc('get_study_leaderboard' as any, { time_filter: timeFilter });
      if (!error && data) {
        // Map RPC column names to our interface
        setEntries((data as any[]).map((d: any) => ({
          user_id: d.uid,
          full_name: d.display_name,
          avatar_url: d.avatar,
          sections_completed: d.sections_done || 0,
          total_xp: d.xp || 0,
          streak: d.current_streak || 0,
          quiz_count: d.quizzes_taken || 0,
          quiz_avg: parseFloat(d.avg_quiz_score) || 0,
          achievement_count: d.awards || 0,
        })));
      }
    } catch {
      // Fail silently
    } finally {
      setLoading(false);
    }
  }, [timeFilter]);

  // Fetch user's achievements
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
  }, [fetchLeaderboard, timeFilter]);

  // Sort entries
  const sortedEntries = [...entries].sort((a, b) => {
    switch (sortBy) {
      case 'xp': return b.total_xp - a.total_xp;
      case 'streak': return b.streak - a.streak;
      case 'quizzes': return b.quiz_avg - a.quiz_avg;
      case 'achievements': return b.achievement_count - a.achievement_count;
    }
  });

  // Find current user's rank
  const userRank = sortedEntries.findIndex((e) => e.user_id === user?.id) + 1;
  const currentStreak = streakData?.streak?.currentStreak || 0;
  const quizResults = quizData?.results || [];
  const quizAvg = quizResults.length > 0
    ? Math.round(quizResults.reduce((acc: number, r: any) => acc + (r.score || r.percentage || 0), 0) / quizResults.length)
    : 0;

  const allAchievements = ACHIEVEMENT_DEFINITIONS || [];

  return (
    <div className="-mt-3 sm:-mt-4 md:-mt-6 bg-background pb-24">
      <div className="max-w-4xl mx-auto lg:px-8">
        {/* Header */}
        <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-white/[0.06]">
          <div className="px-4 py-2">
            <div className="flex items-center gap-3 h-11">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate('/study-centre')}
                className="text-white hover:text-white hover:bg-white/10 rounded-xl h-11 w-11 touch-manipulation"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <h1 className="text-base font-semibold text-white">Leaderboard</h1>
            </div>
          </div>
        </div>

        <div className="px-4 py-4 space-y-5">
          {/* Hero — Your Rank */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl bg-gradient-to-br from-elec-yellow/10 via-white/[0.03] to-amber-600/5 border border-elec-yellow/20 p-5"
          >
            <div className="flex items-center gap-4">
              {/* Rank */}
              <div className="flex flex-col items-center">
                <span className="text-3xl font-black text-elec-yellow">
                  {userRank > 0 ? `#${userRank}` : '—'}
                </span>
                <span className="text-[10px] text-white font-medium uppercase tracking-wider">
                  {sortedEntries.length > 0 ? `of ${sortedEntries.length}` : 'Rank'}
                </span>
              </div>

              <div className="w-px h-12 bg-white/10" />

              {/* Stats */}
              <div className="flex-1 grid grid-cols-3 gap-3">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1">
                    <Zap className="h-3.5 w-3.5 text-elec-yellow" />
                    <span className="text-lg font-bold text-white">{xpData.totalXP}</span>
                  </div>
                  <p className="text-[10px] text-white">XP</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1">
                    <Flame className="h-3.5 w-3.5 text-orange-400" />
                    <span className="text-lg font-bold text-white">{currentStreak}</span>
                  </div>
                  <p className="text-[10px] text-white">Streak</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1">
                    <Star className="h-3.5 w-3.5 text-purple-400" />
                    <span className="text-lg font-bold text-white">{unlockedAchievements.length}</span>
                  </div>
                  <p className="text-[10px] text-white">Awards</p>
                </div>
              </div>
            </div>

            {/* XP Progress Bar */}
            {xpData.xpToNextLevel > 0 && (
              <div className="mt-4">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] text-white font-medium">Level {xpData.level}</span>
                  <span className="text-[10px] text-white">{Math.round(xpData.xpProgress)}% to Level {xpData.level + 1}</span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-elec-yellow to-amber-500 rounded-full transition-all duration-500"
                    style={{ width: `${xpData.xpProgress}%` }}
                  />
                </div>
              </div>
            )}
          </motion.div>

          {/* Time Filter */}
          <div className="flex gap-1 p-1 rounded-xl" style={{ background: 'hsl(0 0% 10%)' }}>
            {([
              { key: 'week', label: 'This Week' },
              { key: 'month', label: 'This Month' },
              { key: 'all', label: 'All Time' },
            ] as const).map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setTimeFilter(key)}
                className={cn(
                  'flex-1 py-2 rounded-lg text-xs font-medium transition-all touch-manipulation',
                  timeFilter === key
                    ? 'bg-elec-yellow text-black'
                    : 'text-white hover:bg-white/[0.06]'
                )}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Sort Tabs */}
          <div className="flex gap-2">
            {([
              { key: 'xp', label: 'XP', icon: Zap },
              { key: 'streak', label: 'Streak', icon: Flame },
              { key: 'quizzes', label: 'Quizzes', icon: Target },
              { key: 'achievements', label: 'Awards', icon: Star },
            ] as const).map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => setSortBy(key)}
                className={cn(
                  'flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-medium transition-all touch-manipulation',
                  sortBy === key
                    ? 'bg-elec-yellow/15 text-elec-yellow border border-elec-yellow/25'
                    : 'bg-white/[0.04] text-white border border-white/[0.06] hover:bg-white/[0.08]'
                )}
              >
                <Icon className="h-3.5 w-3.5" />
                {label}
              </button>
            ))}
          </div>

          {/* Rankings */}
          <div className="rounded-2xl overflow-hidden" style={{ background: 'hsl(0 0% 12%)', border: '1px solid rgba(255,255,255,0.06)' }}>
            {loading ? (
              <div className="py-12 text-center text-sm text-white/40">Loading...</div>
            ) : sortedEntries.length === 0 ? (
              <div className="py-12 text-center text-sm text-white">
                No learners yet. Start studying to be first!
              </div>
            ) : (
              <div className="divide-y divide-white/[0.04]">
                {(showAllRankings ? sortedEntries : sortedEntries.slice(0, 5)).map((entry, idx) => {
                  const rank = idx + 1;
                  const isCurrentUser = entry.user_id === user?.id;
                  const medalColors = [
                    'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
                    'bg-gray-300/20 text-gray-300 border-gray-300/30',
                    'bg-amber-700/20 text-amber-600 border-amber-700/30',
                  ];

                  const primaryValue = sortBy === 'xp' ? entry.total_xp
                    : sortBy === 'streak' ? entry.streak
                    : sortBy === 'quizzes' ? Math.round(entry.quiz_avg)
                    : entry.achievement_count;

                  const primaryLabel = sortBy === 'xp' ? 'XP'
                    : sortBy === 'streak' ? 'days'
                    : sortBy === 'quizzes' ? '%'
                    : 'awards';

                  return (
                    <div
                      key={entry.user_id}
                      className={cn(
                        'flex items-center gap-3 px-4 py-3',
                        isCurrentUser && 'bg-elec-yellow/[0.06]'
                      )}
                    >
                      {rank <= 3 ? (
                        <div className={cn('w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border', medalColors[rank - 1])}>
                          {rank}
                        </div>
                      ) : (
                        <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium text-white/50 bg-white/[0.04]">
                          {rank}
                        </div>
                      )}

                      {entry.avatar_url ? (
                        <img src={entry.avatar_url} alt="" className="w-9 h-9 rounded-full object-cover" />
                      ) : (
                        <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-xs font-bold text-white">
                          {getInitials(entry.full_name)}
                        </div>
                      )}

                      <div className="flex-1 min-w-0">
                        <p className={cn('text-sm font-medium truncate', isCurrentUser ? 'text-elec-yellow' : 'text-white')}>
                          {formatName(entry.full_name)}
                          {isCurrentUser && <span className="text-xs ml-1 text-white/50">(you)</span>}
                        </p>
                        <div className="flex items-center gap-2 mt-0.5">
                          {entry.streak > 0 && (
                            <span className="flex items-center gap-0.5 text-[10px] text-orange-400">
                              <Flame className="h-2.5 w-2.5" />{entry.streak}
                            </span>
                          )}
                          {entry.quiz_count > 0 && (
                            <span className="text-[10px] text-white/50">{entry.quiz_count} quizzes</span>
                          )}
                        </div>
                      </div>

                      <div className="text-right flex-shrink-0">
                        <span className="text-base font-bold text-white">{primaryValue}</span>
                        <span className="text-[10px] text-white/50 ml-1">{primaryLabel}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
            {!loading && sortedEntries.length > 5 && (
              <button
                onClick={() => setShowAllRankings(!showAllRankings)}
                className="w-full py-3 text-xs font-medium text-elec-yellow hover:text-white transition-colors touch-manipulation"
                style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}
              >
                {showAllRankings ? 'Show less' : `View all ${sortedEntries.length} learners`}
              </button>
            )}
          </div>

          {/* Achievements */}
          {allAchievements.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center justify-between px-0.5">
                <h3 className="text-xs font-medium text-white uppercase tracking-wider">
                  Achievements
                </h3>
                <span className="text-xs text-elec-yellow font-semibold">
                  {unlockedAchievements.length}/{allAchievements.length}
                </span>
              </div>

              {/* Progress bar */}
              <div className="h-2 rounded-full overflow-hidden" style={{ background: 'hsl(0 0% 12%)' }}>
                <div
                  className="h-full bg-gradient-to-r from-elec-yellow to-amber-500 rounded-full transition-all duration-500"
                  style={{ width: `${(unlockedAchievements.length / allAchievements.length) * 100}%` }}
                />
              </div>

              {/* Achievement list — clean rows, no icons */}
              <div className="rounded-2xl overflow-hidden" style={{ background: 'hsl(0 0% 12%)', border: '1px solid rgba(255,255,255,0.06)' }}>
                {(showAllAchievements ? allAchievements : allAchievements.slice(0, 5)).map((ach: any, idx: number) => {
                  const unlocked = unlockedAchievements.includes(ach.id);
                  const categoryColors: Record<string, string> = {
                    flashcards: 'text-blue-400',
                    quizzes: 'text-green-400',
                    streaks: 'text-orange-400',
                    ojt: 'text-purple-400',
                    portfolio: 'text-cyan-400',
                    diary: 'text-pink-400',
                    xp: 'text-elec-yellow',
                    epa: 'text-red-400',
                  };
                  return (
                    <div
                      key={ach.id}
                      className={cn(
                        'flex items-center gap-3 px-4 py-3',
                        idx < allAchievements.length - 1 && 'border-b border-white/[0.04]',
                        !unlocked && 'opacity-30'
                      )}
                    >
                      <div className={cn(
                        'w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold flex-shrink-0',
                        unlocked ? 'bg-elec-yellow/15 text-elec-yellow' : 'bg-white/[0.04] text-white/30'
                      )}>
                        {unlocked ? '✓' : '?'}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-white truncate">{ach.title}</p>
                        <p className={cn('text-[10px] truncate', categoryColors[ach.category] || 'text-white/50')}>
                          {ach.description}
                        </p>
                      </div>
                      <span className="text-[10px] text-elec-yellow font-semibold flex-shrink-0">
                        +{ach.xpBonus} XP
                      </span>
                    </div>
                  );
                })}
                {allAchievements.length > 5 && (
                  <button
                    onClick={() => setShowAllAchievements(!showAllAchievements)}
                    className="w-full py-3 text-xs font-medium text-elec-yellow hover:text-white transition-colors touch-manipulation"
                    style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}
                  >
                    {showAllAchievements ? 'Show less' : `View all ${allAchievements.length} achievements`}
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
