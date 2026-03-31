/**
 * StudyLeaderboard — Top learners with opt-out toggle.
 *
 * Shows top 10 learners by sections completed. Users appear by default
 * and can toggle visibility with an eye icon directly on the card.
 * Names displayed as "Andrew M." (first name + last initial) for privacy.
 */

import React, { useState, useEffect, useCallback } from 'react';
import { Trophy, Eye, EyeOff, Flame, Zap, Medal } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';

interface LeaderboardEntry {
  user_id: string;
  full_name: string;
  avatar_url: string | null;
  sections_completed: number;
  total_xp: number;
  streak: number;
}

function formatDisplayName(fullName: string | null): string {
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

const medalColors = [
  'bg-yellow-500/20 text-yellow-400 border-yellow-500/30', // 1st — gold
  'bg-gray-300/20 text-gray-300 border-gray-300/30',       // 2nd — silver
  'bg-amber-700/20 text-amber-600 border-amber-700/30',    // 3rd — bronze
];

export function StudyLeaderboard() {
  const { user } = useAuth();
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(true);
  const [showAll, setShowAll] = useState(false);

  // Fetch leaderboard data
  const fetchLeaderboard = useCallback(async () => {
    try {
      // Get visible users with their progress
      const { data, error } = await supabase
        .rpc('get_study_leaderboard' as any)
        .limit(10);

      if (error) {
        // RPC might not exist yet — fall back to simple query
        console.warn('Leaderboard RPC not available, using fallback query');
        const { data: fallbackData } = await supabase
          .from('profiles')
          .select('id, full_name, avatar_url, leaderboard_visible')
          .eq('leaderboard_visible', true)
          .not('full_name', 'is', null)
          .limit(10);

        if (fallbackData) {
          setEntries(
            fallbackData.map((p: any) => ({
              user_id: p.id,
              full_name: p.full_name || 'Learner',
              avatar_url: p.avatar_url,
              sections_completed: 0,
              total_xp: 0,
              streak: 0,
            }))
          );
        }
        return;
      }

      setEntries((data as any) || []);
    } catch (err) {
      console.error('Error fetching leaderboard:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch user's visibility setting
  useEffect(() => {
    if (!user) return;
    supabase
      .from('profiles')
      .select('leaderboard_visible')
      .eq('id', user.id)
      .single()
      .then(({ data }) => {
        setIsVisible(data?.leaderboard_visible ?? true);
      });
  }, [user]);

  useEffect(() => {
    fetchLeaderboard();
  }, [fetchLeaderboard]);

  // Toggle visibility
  const toggleVisibility = async () => {
    if (!user) return;
    const newValue = !isVisible;
    setIsVisible(newValue);
    await supabase
      .from('profiles')
      .update({ leaderboard_visible: newValue })
      .eq('id', user.id);
    fetchLeaderboard();
  };

  const displayEntries = showAll ? entries : entries.slice(0, 5);
  const userOnBoard = entries.some((e) => e.user_id === user?.id);

  return (
    <div className="rounded-2xl bg-white/[0.04] border border-white/10 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.06]">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-lg bg-elec-yellow/10 border border-elec-yellow/20">
            <Trophy className="h-4 w-4 text-elec-yellow" />
          </div>
          <h3 className="text-sm font-semibold text-white">Top Learners</h3>
        </div>
        <button
          onClick={toggleVisibility}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium transition-all touch-manipulation active:scale-95
            bg-white/[0.04] border border-white/10 text-white hover:bg-white/[0.08]"
        >
          {isVisible ? (
            <>
              <Eye className="h-3 w-3" />
              Visible
            </>
          ) : (
            <>
              <EyeOff className="h-3 w-3 text-white/50" />
              Hidden
            </>
          )}
        </button>
      </div>

      {/* Entries */}
      {loading ? (
        <div className="px-4 py-8 text-center text-sm text-white/40">Loading...</div>
      ) : entries.length === 0 ? (
        <div className="px-4 py-8 text-center text-sm text-white">
          No learners on the board yet. Start studying to be first!
        </div>
      ) : (
        <div className="divide-y divide-white/[0.04]">
          {displayEntries.map((entry, idx) => {
            const isCurrentUser = entry.user_id === user?.id;
            const rank = idx + 1;

            return (
              <div
                key={entry.user_id}
                className={cn(
                  'flex items-center gap-3 px-4 py-2.5 transition-colors',
                  isCurrentUser && 'bg-elec-yellow/[0.06]'
                )}
              >
                {/* Rank */}
                {rank <= 3 ? (
                  <div
                    className={cn(
                      'w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border',
                      medalColors[rank - 1]
                    )}
                  >
                    {rank}
                  </div>
                ) : (
                  <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium text-white/50 bg-white/[0.04]">
                    {rank}
                  </div>
                )}

                {/* Avatar */}
                {entry.avatar_url ? (
                  <img
                    src={entry.avatar_url}
                    alt=""
                    className="w-8 h-8 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-xs font-bold text-white">
                    {getInitials(entry.full_name)}
                  </div>
                )}

                {/* Name */}
                <div className="flex-1 min-w-0">
                  <p className={cn('text-sm font-medium truncate', isCurrentUser ? 'text-elec-yellow' : 'text-white')}>
                    {formatDisplayName(entry.full_name)}
                    {isCurrentUser && <span className="text-xs ml-1 text-white/50">(you)</span>}
                  </p>
                </div>

                {/* Stats */}
                <div className="flex items-center gap-3 flex-shrink-0">
                  {entry.streak > 0 && (
                    <div className="flex items-center gap-1 text-xs text-orange-400">
                      <Flame className="h-3 w-3" />
                      {entry.streak}
                    </div>
                  )}
                  <div className="flex items-center gap-1 text-xs text-elec-yellow font-medium">
                    <Zap className="h-3 w-3" />
                    {entry.total_xp || 0}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Show more */}
      {entries.length > 5 && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="w-full py-2.5 text-xs font-medium text-elec-yellow hover:bg-white/[0.04] transition-colors touch-manipulation border-t border-white/[0.04]"
        >
          {showAll ? 'Show less' : `View all ${entries.length}`}
        </button>
      )}

      {/* Not on board prompt */}
      {!loading && !userOnBoard && !isVisible && (
        <div className="px-4 py-3 border-t border-white/[0.04] bg-white/[0.02]">
          <p className="text-xs text-white">
            You're hidden from the leaderboard.{' '}
            <button onClick={toggleVisibility} className="text-elec-yellow font-medium touch-manipulation">
              Show me
            </button>
          </p>
        </div>
      )}
    </div>
  );
}

export default StudyLeaderboard;
