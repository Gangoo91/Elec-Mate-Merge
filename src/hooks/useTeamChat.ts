import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import {
  teamChannelService,
  teamChannelMessageService,
  teamDMService,
  TeamChannel,
  TeamChannelMessage,
  TeamDirectMessage,
  TeamDMMessage,
} from '@/services/teamChatService';

// Query Keys
const TEAM_CHANNELS_KEY = ['team-channels'];
const TEAM_DMS_KEY = ['team-dms'];
const CHANNEL_MESSAGES_KEY = ['channel-messages'];
const DM_MESSAGES_KEY = ['dm-messages'];

// =====================================================
// CHANNELS
// =====================================================

/**
 * Hook to get all team channels for an employer
 */
export function useTeamChannels(employerId: string | undefined) {
  return useQuery({
    queryKey: [...TEAM_CHANNELS_KEY, employerId],
    queryFn: () => employerId ? teamChannelService.getChannels(employerId) : [],
    enabled: !!employerId,
  });
}

/**
 * Hook to get channels the current user is a member of
 */
export function useMyTeamChannels() {
  return useQuery({
    queryKey: [...TEAM_CHANNELS_KEY, 'my'],
    queryFn: teamChannelService.getMyChannels,
  });
}

/**
 * Hook to create a new channel
 */
export function useCreateChannel() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: teamChannelService.createChannel,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: TEAM_CHANNELS_KEY });
    },
  });
}

/**
 * Hook to manage channel members
 */
export function useChannelMembers(channelId: string | undefined) {
  return useQuery({
    queryKey: [...TEAM_CHANNELS_KEY, channelId, 'members'],
    queryFn: () => channelId ? teamChannelService.getMembers(channelId) : [],
    enabled: !!channelId,
  });
}

// =====================================================
// CHANNEL MESSAGES
// =====================================================

/**
 * Hook to get messages for a channel with real-time updates
 */
export function useChannelMessages(channelId: string | undefined) {
  const queryClient = useQueryClient();

  // Real-time subscription
  useEffect(() => {
    if (!channelId) return;

    const unsubscribe = teamChannelMessageService.subscribeToMessages(
      channelId,
      (newMessage) => {
        queryClient.setQueryData<TeamChannelMessage[]>(
          [...CHANNEL_MESSAGES_KEY, channelId],
          (old) => {
            if (!old) return [newMessage];
            if (old.some(m => m.id === newMessage.id)) return old;
            return [...old, newMessage];
          }
        );
      }
    );

    return unsubscribe;
  }, [channelId, queryClient]);

  return useQuery({
    queryKey: [...CHANNEL_MESSAGES_KEY, channelId],
    queryFn: () => channelId ? teamChannelMessageService.getMessages(channelId) : [],
    enabled: !!channelId,
  });
}

/**
 * Hook to send a message to a channel
 */
export function useSendChannelMessage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ channelId, content }: { channelId: string; content: string }) =>
      teamChannelMessageService.sendMessage(channelId, content),
    onSuccess: (data, variables) => {
      queryClient.setQueryData<TeamChannelMessage[]>(
        [...CHANNEL_MESSAGES_KEY, variables.channelId],
        (old) => {
          if (!old) return [data];
          if (old.some(m => m.id === data.id)) return old;
          return [...old, data];
        }
      );
    },
  });
}

// =====================================================
// DIRECT MESSAGES
// =====================================================

/**
 * Hook to get all DM conversations for current user
 */
export function useTeamDMConversations(employerId: string | undefined) {
  const queryClient = useQueryClient();

  // Real-time subscription for conversation updates
  useEffect(() => {
    if (!employerId) return;

    const channel = supabase
      .channel(`team-dms-${employerId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'team_direct_messages',
        },
        () => {
          queryClient.invalidateQueries({ queryKey: [...TEAM_DMS_KEY, employerId] });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [employerId, queryClient]);

  return useQuery({
    queryKey: [...TEAM_DMS_KEY, employerId],
    queryFn: () => employerId ? teamDMService.getConversations(employerId) : [],
    enabled: !!employerId,
  });
}

/**
 * Hook to get or create a DM conversation
 */
export function useGetOrCreateTeamDM() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ employerId, otherUserId }: { employerId: string; otherUserId: string }) =>
      teamDMService.getOrCreateConversation(employerId, otherUserId),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: [...TEAM_DMS_KEY, variables.employerId] });
    },
  });
}

/**
 * Hook to get messages for a DM conversation with real-time updates
 */
export function useTeamDMMessages(conversationId: string | undefined) {
  const queryClient = useQueryClient();
  const [messages, setMessages] = useState<TeamDMMessage[]>([]);

  // Real-time subscription
  useEffect(() => {
    if (!conversationId) return;

    const unsubscribe = teamDMService.subscribeToMessages(
      conversationId,
      (newMessage) => {
        setMessages((old) => {
          if (old.some(m => m.id === newMessage.id)) return old;
          return [...old, newMessage];
        });
      }
    );

    return unsubscribe;
  }, [conversationId]);

  const query = useQuery({
    queryKey: [...DM_MESSAGES_KEY, conversationId],
    queryFn: () => conversationId ? teamDMService.getMessages(conversationId) : [],
    enabled: !!conversationId,
  });

  // Sync query data with local state
  useEffect(() => {
    if (query.data) {
      setMessages(query.data);
    }
  }, [query.data]);

  return {
    ...query,
    data: messages,
  };
}

/**
 * Hook to send a DM
 */
export function useSendTeamDM() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ conversationId, content }: { conversationId: string; content: string }) =>
      teamDMService.sendMessage(conversationId, content),
    onMutate: async (variables) => {
      // Optimistic update
      const queryKey = [...DM_MESSAGES_KEY, variables.conversationId];
      await queryClient.cancelQueries({ queryKey });

      const tempMessage: TeamDMMessage = {
        id: `temp-${Date.now()}`,
        conversation_id: variables.conversationId,
        sender_id: '', // Will be replaced
        content: variables.content,
        message_type: 'text',
        metadata: {},
        sent_at: new Date().toISOString(),
        read_at: null,
        created_at: new Date().toISOString(),
      };

      queryClient.setQueryData<TeamDMMessage[]>(queryKey, (old) => {
        if (!old) return [tempMessage];
        return [...old, tempMessage];
      });

      return { queryKey };
    },
    onSuccess: (data, variables, context) => {
      // Replace optimistic message with real one
      if (context?.queryKey) {
        queryClient.setQueryData<TeamDMMessage[]>(context.queryKey, (old) => {
          if (!old) return [data];
          return old.map(m => m.id.startsWith('temp-') ? data : m);
        });
      }
      queryClient.invalidateQueries({ queryKey: TEAM_DMS_KEY });
    },
  });
}

/**
 * Hook to mark DM messages as read
 */
export function useMarkTeamDMAsRead() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (conversationId: string) => teamDMService.markAsRead(conversationId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TEAM_DMS_KEY });
    },
  });
}

// =====================================================
// COMBINED STATS
// =====================================================

/**
 * Hook to get total unread across all team chat
 */
export function useTeamChatUnread(employerId: string | undefined) {
  const { data: dms } = useTeamDMConversations(employerId);

  const totalUnread = (dms || []).reduce((sum, conv) => {
    // Need to determine which unread field applies to current user
    // This is simplified - in real app, compare with auth.uid()
    return sum + (conv.unread_1 || 0) + (conv.unread_2 || 0);
  }, 0);

  return totalUnread;
}
