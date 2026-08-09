import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface PeerSupporter {
  supporter_id: string;
  user_id: string;
  display_name: string | null;
  email: string | null;
  is_active: boolean;
  is_available: boolean;
  training_level: string | null;
  topics: string[] | null;
  total_conversations: number;
  last_active_at: string | null;
  joined_at: string | null;
  live_conversations: number;
  messages_sent: number;
  reports_against: number;
}

export interface PeerSupportOverview {
  supporters: PeerSupporter[];
  active: number;
  available: number;
  liveConversations: number;
  /**
   * Listed as available to someone in distress, but not seen in 30 days.
   * The pairing that matters: `is_available` is what a seeker is shown, and
   * nothing anywhere reconciles it against whether the person still turns up.
   */
  staleAvailable: PeerSupporter[];
}

const STALE_DAYS = 30;

export const daysSince = (iso: string | null): number | null => {
  if (!iso) return null;
  return Math.floor((Date.now() - new Date(iso).getTime()) / 86_400_000);
};

/**
 * The state of peer support, not just its complaints.
 *
 * AdminPeerSafety reads `mental_health_peer_reports` and nothing else, so on
 * any normal day — zero reports — every figure reads 0 and the page says
 * nothing needs attention. It also offers "deactivate this supporter" as an
 * action while never listing the supporters, so the action is unreachable.
 */
export function usePeerSupportOverview() {
  return useQuery<PeerSupportOverview>({
    queryKey: ['admin-peer-support-overview'],
    staleTime: 60_000,
    queryFn: async () => {
      const { data, error } = await supabase.rpc('admin_peer_support_overview' as never);
      if (error) throw error;
      const supporters = (data ?? []) as unknown as PeerSupporter[];

      return {
        supporters,
        active: supporters.filter((s) => s.is_active).length,
        available: supporters.filter((s) => s.is_active && s.is_available).length,
        liveConversations: supporters.reduce((t, s) => t + s.live_conversations, 0),
        staleAvailable: supporters.filter((s) => {
          if (!s.is_active || !s.is_available) return false;
          const d = daysSince(s.last_active_at);
          return d === null || d > STALE_DAYS;
        }),
      };
    },
  });
}
