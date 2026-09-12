import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

/**
 * The seekers' side of Mental Health Mates.
 *
 * AdminPeerSafety was built entirely around `mental_health_peer_reports`, a
 * table that has never had a row in it. Nothing anywhere showed the
 * conversations themselves — so two people who opened a Mental Health Mates
 * chat and never got anywhere sat invisible for 112 and 39 days while the page
 * reported "nothing needs your attention".
 *
 * 🔴 Id trap: `mental_health_peer_conversations.supporter_id` holds the
 * SUPPORTER ROW id, while `seeker_id` and `messages.sender_id` hold USER ids.
 * Joining `supporter_id` to `profiles` silently returns nothing — the RPC
 * resolves it through `mental_health_peer_supporters` instead.
 */

export interface PeerConversation {
  conversation_id: string;
  status: string;
  started_at: string;
  ended_at: string | null;
  last_message_at: string | null;
  seeker_id: string;
  seeker_name: string | null;
  supporter_row_id: string | null;
  supporter_user_id: string | null;
  supporter_name: string | null;
  supporter_is_active: boolean;
  supporter_is_available: boolean;
  total_messages: number;
  seeker_messages: number;
  supporter_messages: number;
  /** null when the conversation has no messages at all. */
  last_sender_is_seeker: boolean | null;
  reports_on_conversation: number;
}

export const daysOpen = (iso: string): number =>
  Math.floor((Date.now() - new Date(iso).getTime()) / 86_400_000);

/**
 * A conversation nobody is having.
 *
 * Deliberately not called "unanswered": in both live cases the seeker sent
 * nothing either, so claiming they asked for help and were ignored would
 * overstate what the data supports. What is true is that the match was made,
 * the thread is still open, and not one message has ever been sent in it.
 */
export const isStalled = (c: PeerConversation): boolean =>
  c.status === 'active' && c.total_messages === 0;

/** Seeker spoke and the supporter never has. The one that is genuinely ignored. */
export const isIgnored = (c: PeerConversation): boolean =>
  c.status === 'active' && c.seeker_messages > 0 && c.supporter_messages === 0;

export interface PeerBlock {
  block_id: string;
  created_at: string;
  blocker_id: string;
  blocker_name: string | null;
  blocked_user_id: string;
  blocked_name: string | null;
  blocked_is_supporter: boolean;
  blocked_supporter_active: boolean;
}

/**
 * Someone blocking the person they were matched with.
 *
 * The same class of signal as a filed report, and the page could only see
 * reports. There are none of either today — which is exactly why neither would
 * have been noticed when the first one arrives.
 */
export function usePeerBlocks() {
  return useQuery<PeerBlock[]>({
    queryKey: ['admin-peer-blocks'],
    staleTime: 60_000,
    queryFn: async () => {
      const { data, error } = await supabase.rpc('admin_peer_blocks' as never);
      if (error) throw error;
      return (data ?? []) as unknown as PeerBlock[];
    },
  });
}

/**
 * Worst first, then oldest first inside each band.
 *
 * The RPC returns `started_at desc`, which is right for a log and wrong for a
 * queue: a healthy chat opened this morning sorted above someone who had been
 * waiting four months. Severity runs ignored (they spoke, nobody answered) →
 * stalled (nothing said either way) → still going → closed.
 *
 * Lives here rather than in the page so it can be exercised without a browser.
 */
export const bySeverity = (a: PeerConversation, b: PeerConversation): number => {
  const rank = (c: PeerConversation) =>
    isIgnored(c) ? 0 : isStalled(c) ? 1 : c.status === 'active' ? 2 : 3;
  return (
    rank(a) - rank(b) || new Date(a.started_at).getTime() - new Date(b.started_at).getTime()
  );
};

export function usePeerConversations() {
  return useQuery<PeerConversation[]>({
    queryKey: ['admin-peer-conversations'],
    staleTime: 60_000,
    queryFn: async () => {
      const { data, error } = await supabase.rpc('admin_peer_conversations' as never);
      if (error) throw error;
      return (data ?? []) as unknown as PeerConversation[];
    },
  });
}
