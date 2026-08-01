/**
 * useAdminInbox — the admin support inbox: every user conversation, grouped.
 *
 * ELE-1415/1417. There were three separate groupings of `admin_messages`:
 * this logic inline in AdminUserMessages, a weaker duplicate in
 * `useAdminConversations` (which had no consumers at all), and the user-side
 * `useAdminMessages`. Divergence between them is why the admin inbox and the
 * user MessagesSheet behaved and looked nothing alike. One hook now.
 *
 * Admin-only: relies on the `Admins can view all messages` RLS policy, so a
 * non-admin caller simply gets their own rows back and should not use this.
 */

import { useEffect } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { realtimeChannelName } from '@/lib/realtimeChannel';

export interface AdminInboxMessage {
  id: string;
  sender_id: string;
  recipient_id: string;
  subject: string;
  message: string;
  /** 'system_ack' is the automatic "we've got your message" note. */
  message_type: 'email' | 'in_app' | 'both' | 'system_ack';
  read_at: string | null;
  created_at: string;
  archived_at: string | null;
  sender: InboxProfile | null;
  recipient: InboxProfile | null;
}

interface InboxProfile {
  id: string;
  full_name: string | null;
  avatar_url: string | null;
  role: string | null;
  admin_role: string | null;
}

export interface AdminConversation {
  partnerId: string;
  partner: InboxProfile | null;
  lastMessage: AdminInboxMessage;
  unreadCount: number;
  messages: AdminInboxMessage[];
  /** Team inbox: inbound rows may be addressed to any admin's id. */
  hasInboundToAdmin: boolean;
  hasAdminReply: boolean;
  /**
   * The user spoke last, so they are waiting on us. This is the signal that
   * matters in a support inbox — "unread" misses the thread you opened and
   * never answered, which is exactly the one that gets dropped.
   */
  awaitingReply: boolean;
}

export const ADMIN_INBOX_QUERY_KEY = ['admin-user-messages'] as const;

export function useAdminInbox(enabled = true, view: 'inbox' | 'archived' = 'inbox') {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  // Live updates. Without this the inbox and any open thread only moved on the
  // 30s poll, so a reply from the person you are talking to took up to half a
  // minute to appear. Unique channel name per mount — see realtimeChannel.ts.
  useEffect(() => {
    if (!enabled || !user?.id) return;

    const channel = supabase
      .channel(realtimeChannelName('admin-inbox'))
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'admin_messages' },
        () => queryClient.invalidateQueries({ queryKey: ADMIN_INBOX_QUERY_KEY })
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [enabled, user?.id, queryClient]);

  return useQuery({
    queryKey: [...ADMIN_INBOX_QUERY_KEY, view],
    queryFn: async (): Promise<AdminConversation[]> => {
      if (!user?.id) return [];

      const { data, error } = await supabase
        .from('admin_messages')
        .select(
          `
          id,
          sender_id,
          recipient_id,
          subject,
          message,
          message_type,
          read_at,
          created_at,
          archived_at,
          sender:profiles!admin_messages_sender_id_fkey(id, full_name, avatar_url, role, admin_role),
          recipient:profiles!admin_messages_recipient_id_fkey(id, full_name, avatar_url, role, admin_role)
        `
        )
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching admin inbox:', error);
        return [];
      }

      const conversationMap = new Map<string, AdminConversation>();

      const rows = ((data as AdminInboxMessage[] | null) ?? []).filter((m) =>
        view === 'archived' ? !!m.archived_at : !m.archived_at
      );

      rows.forEach((msg) => {
        // Identify by admin ROLE, not by "is it me" — inbound messages are
        // addressed to one admin's id but the whole team owns the inbox.
        const senderIsAdmin = !!msg.sender?.admin_role || msg.sender_id === user.id;
        const partnerId = senderIsAdmin ? msg.recipient_id : msg.sender_id;
        const partner = senderIsAdmin ? msg.recipient : msg.sender;

        // Admin-to-admin chatter is not a support conversation.
        if (partner?.admin_role) return;

        if (!conversationMap.has(partnerId)) {
          conversationMap.set(partnerId, {
            partnerId,
            partner,
            lastMessage: msg,
            unreadCount: 0,
            messages: [],
            hasInboundToAdmin: false,
            hasAdminReply: false,
            awaitingReply: false,
          });
        }

        const conv = conversationMap.get(partnerId)!;
        conv.messages.push(msg);

        if (msg.recipient?.admin_role) {
          conv.hasInboundToAdmin = true;
          if (!msg.read_at) conv.unreadCount++;
        }
        // The automatic acknowledgement is admin-sent but nobody has actually
        // answered. Counting it as a reply would drop the conversation out of
        // "needs answering" and hide a real person waiting on us.
        if (senderIsAdmin && msg.message_type !== 'system_ack') conv.hasAdminReply = true;
      });

      conversationMap.forEach((conv) => {
        conv.messages.sort(
          (a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
        );
        // Acks are excluded from "who spoke last" for the same reason, and from
        // the list preview — the preview should show what the person said.
        const answerable = conv.messages.filter((m) => m.message_type !== 'system_ack');
        const last = answerable[answerable.length - 1];
        conv.awaitingReply = !!last && !(last.sender?.admin_role || last.sender_id === user.id);
        if (last) conv.lastMessage = last;
      });

      return Array.from(conversationMap.values());
    },
    enabled: enabled && !!user?.id,
    staleTime: 10 * 1000,
    refetchInterval: 30 * 1000,
  });
}

/** Sort for a support queue: needs answering, then unopened, then recency. */
export function sortAdminConversations(list: AdminConversation[]): AdminConversation[] {
  return [...list].sort((a, b) => {
    if (a.awaitingReply !== b.awaitingReply) return a.awaitingReply ? -1 : 1;
    const aUnread = a.unreadCount > 0;
    const bUnread = b.unreadCount > 0;
    if (aUnread !== bUnread) return aUnread ? -1 : 1;
    return (
      new Date(b.lastMessage.created_at).getTime() - new Date(a.lastMessage.created_at).getTime()
    );
  });
}

/**
 * Archive or restore a whole conversation. Archiving hides it from the inbox
 * and keeps every message — swiping a support thread away on a phone must not
 * destroy the record of what someone reported.
 */
export function useArchiveConversation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      messageIds,
      archived,
    }: {
      messageIds: string[];
      archived: boolean;
    }) => {
      if (!messageIds.length) return;
      const { error } = await supabase
        .from('admin_messages')
        .update({ archived_at: archived ? new Date().toISOString() : null })
        .in('id', messageIds);
      if (error) throw error;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ADMIN_INBOX_QUERY_KEY }),
  });
}
