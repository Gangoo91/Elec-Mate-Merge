import { useQuery, useMutation, useQueryClient, QueryClient, keepPreviousData } from '@tanstack/react-query';
import { useEffect, useRef, useCallback } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import {
  PeerConversation,
  PeerMessage,
  PeerSupporter,
  peerConversationService,
  peerMessageService,
  peerSupporterService,
} from '@/services/peerSupportService';
import { getUserPresence, UserPresence } from '@/services/presenceService';

// Query Keys
const PEER_CONVERSATIONS_KEY = ['peer-conversations'];
const PEER_MESSAGES_KEY = ['peer-messages'];
const PEER_PROFILE_KEY = ['peer-supporter-profile'];
const AVAILABLE_SUPPORTERS_KEY = ['available-supporters'];

// =====================================================
// PREFETCH (for hover/navigation optimization)
// =====================================================

/**
 * Prefetch Mental Health Mates data before user navigates
 * Call this on hover over nav item for instant page load
 */
export function prefetchPeerSupportData(queryClient: QueryClient) {
  // Prefetch conversations
  queryClient.prefetchQuery({
    queryKey: PEER_CONVERSATIONS_KEY,
    queryFn: () => peerConversationService.getMyConversations(),
    staleTime: 30000,
  });

  // Prefetch available supporters
  queryClient.prefetchQuery({
    queryKey: [...AVAILABLE_SUPPORTERS_KEY, undefined],
    queryFn: () => peerSupporterService.getAvailableSupporters(),
    staleTime: 30000,
  });

  // Prefetch user's supporter profile
  queryClient.prefetchQuery({
    queryKey: PEER_PROFILE_KEY,
    queryFn: () => peerSupporterService.getMyProfile(),
    staleTime: 60000,
  });
}

// =====================================================
// CONVERSATIONS
// =====================================================

/**
 * Hook to get all peer support conversations for current user
 * Includes real-time subscription for new messages to update unread badges
 */
export function usePeerConversations() {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  // Subscribe to ALL new peer messages to update conversation list/badges in real-time
  useEffect(() => {
    if (!user?.id) return;

    const channel = supabase
      .channel('peer-messages-global')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'mental_health_peer_messages',
        },
        (payload) => {
          const newMessage = payload.new as { sender_id: string; conversation_id: string };
          // If message is from someone else, refresh conversations to update unread badge
          if (newMessage.sender_id !== user.id) {
            queryClient.invalidateQueries({ queryKey: PEER_CONVERSATIONS_KEY });
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user?.id, queryClient]);

  return useQuery({
    queryKey: PEER_CONVERSATIONS_KEY,
    queryFn: () => peerConversationService.getMyConversations(),
    staleTime: 30000, // Cache for 30 seconds
    gcTime: 5 * 60 * 1000, // Keep in cache for 5 minutes
    placeholderData: keepPreviousData, // Show previous data while refetching
  });
}

/**
 * Hook to start a new conversation with a supporter
 */
export function useStartPeerConversation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (supporterId: string) => peerConversationService.startConversation(supporterId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PEER_CONVERSATIONS_KEY });
    },
  });
}

/**
 * Hook to end a conversation
 */
export function useEndPeerConversation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (conversationId: string) => peerConversationService.endConversation(conversationId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PEER_CONVERSATIONS_KEY });
    },
  });
}

// =====================================================
// SUPPORTER PROFILE
// =====================================================

/**
 * Hook to get current user's peer supporter profile (cached)
 */
export function usePeerSupporterProfile() {
  const { user } = useAuth();

  return useQuery({
    queryKey: PEER_PROFILE_KEY,
    queryFn: () => peerSupporterService.getMyProfile(),
    enabled: !!user,
    staleTime: 60000, // Cache for 1 minute
    gcTime: 5 * 60 * 1000, // Keep in cache for 5 minutes
    placeholderData: keepPreviousData, // Show previous data while refetching
  });
}

/**
 * Hook to get available supporters (cached)
 */
export function useAvailableSupporters(excludeUserId?: string) {
  return useQuery({
    queryKey: [...AVAILABLE_SUPPORTERS_KEY, excludeUserId],
    queryFn: async () => {
      const supporters = await peerSupporterService.getAvailableSupporters();
      return excludeUserId
        ? supporters.filter(s => s.user_id !== excludeUserId)
        : supporters;
    },
    staleTime: 30000, // Cache for 30 seconds
    gcTime: 5 * 60 * 1000, // Keep in cache for 5 minutes
    placeholderData: keepPreviousData, // Show previous data while refetching
  });
}

// =====================================================
// MESSAGES
// =====================================================

/**
 * Hook to get messages for a conversation with real-time updates
 * This centralises state so both MessagesDropdown and PeerSupportHub share the same cache
 */
export function usePeerMessages(conversationId: string | undefined) {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  // Real-time subscription - updates React Query cache directly
  useEffect(() => {
    if (!conversationId) return;

    const unsubscribe = peerMessageService.subscribeToMessages(
      conversationId,
      (newMessage) => {
        queryClient.setQueryData<PeerMessage[]>(
          [...PEER_MESSAGES_KEY, conversationId],
          (old) => {
            if (!old) return [newMessage];
            // Deduplicate - don't add if message already exists
            if (old.some(m => m.id === newMessage.id)) return old;
            return [...old, newMessage];
          }
        );

        // If message is from someone else, refresh conversations to update unread badge
        if (newMessage.sender_id !== user?.id) {
          queryClient.invalidateQueries({ queryKey: PEER_CONVERSATIONS_KEY });
        }
      }
    );

    return unsubscribe;
  }, [conversationId, queryClient, user?.id]);

  return useQuery({
    queryKey: [...PEER_MESSAGES_KEY, conversationId],
    queryFn: () => conversationId ? peerMessageService.getMessages(conversationId) : [],
    enabled: !!conversationId,
    placeholderData: keepPreviousData, // Show previous messages while refetching
  });
}

/**
 * Hook to send a peer message with optimistic updates and push notification
 */
export function useSendPeerMessage() {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: ({ conversationId, content }: { conversationId: string; content: string }) =>
      peerMessageService.sendMessage(conversationId, content),
    onMutate: async (variables) => {
      // Cancel any outgoing refetches
      const queryKey = [...PEER_MESSAGES_KEY, variables.conversationId];
      await queryClient.cancelQueries({ queryKey });

      // Snapshot the previous value
      const previousMessages = queryClient.getQueryData<PeerMessage[]>(queryKey);

      // Create optimistic message
      const tempMessage: PeerMessage = {
        id: `temp-${Date.now()}`,
        conversation_id: variables.conversationId,
        sender_id: user?.id || '',
        content: variables.content,
        is_read: false,
        created_at: new Date().toISOString(),
      };

      // Optimistically add to cache
      queryClient.setQueryData<PeerMessage[]>(queryKey, (old) => {
        if (!old) return [tempMessage];
        return [...old, tempMessage];
      });

      return { queryKey, previousMessages };
    },
    onSuccess: async (data, variables, context) => {
      // Replace optimistic message with real one
      if (context?.queryKey) {
        queryClient.setQueryData<PeerMessage[]>(context.queryKey, (old) => {
          if (!old) return [data];
          // Replace temp message with real message, or add if not found
          const hasTemp = old.some(m => m.id.startsWith('temp-'));
          if (hasTemp) {
            return old.map(m => m.id.startsWith('temp-') ? data : m);
          }
          // Deduplicate
          if (old.some(m => m.id === data.id)) return old;
          return [...old, data];
        });
      }
      // Update conversations list (for last_message_at ordering)
      queryClient.invalidateQueries({ queryKey: PEER_CONVERSATIONS_KEY });

      // Send push notification to recipient
      try {
        const conversations = queryClient.getQueryData<PeerConversation[]>(PEER_CONVERSATIONS_KEY);
        const conversation = conversations?.find(c => c.id === variables.conversationId);
        if (conversation && user) {
          // Determine recipient (the other person in the conversation)
          const isSupporter = conversation.supporter?.user_id === user.id;
          const recipientId = isSupporter
            ? (conversation as any).seeker_id // User is supporter, recipient is seeker
            : conversation.supporter?.user_id; // User is seeker, recipient is supporter

          if (recipientId) {
            // Get sender's display name
            const profile = queryClient.getQueryData<PeerSupporter>(PEER_PROFILE_KEY);
            const senderName = profile?.display_name || 'Mental Health Mate';

            // Fire and forget - don't block on push notification
            supabase.functions.invoke('send-push-notification', {
              body: {
                userId: recipientId,
                title: senderName,
                body: data.content.length > 100 ? data.content.slice(0, 97) + '...' : data.content,
                type: 'peer',
                data: { conversationId: variables.conversationId }
              }
            }).catch(() => {
              // Silently fail - push notifications are best effort
            });
          }
        }
      } catch {
        // Silently fail - push notifications are best effort
      }
    },
    onError: (err, variables, context) => {
      // Rollback on error
      if (context?.previousMessages && context?.queryKey) {
        queryClient.setQueryData(context.queryKey, context.previousMessages);
      }
    },
  });
}

/**
 * Hook to mark messages as read
 */
export function useMarkPeerMessagesAsRead() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (conversationId: string) => peerMessageService.markAsRead(conversationId),
    onMutate: async (conversationId) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: PEER_CONVERSATIONS_KEY });

      // Optimistically update unread_count to 0 for instant badge clearing
      queryClient.setQueryData<PeerConversation[]>(
        PEER_CONVERSATIONS_KEY,
        (old) => old?.map(c => c.id === conversationId ? { ...c, unread_count: 0 } : c)
      );
    },
    onSuccess: (_, conversationId) => {
      // Update local cache to mark messages as read
      queryClient.setQueryData<PeerMessage[]>(
        [...PEER_MESSAGES_KEY, conversationId],
        (old) => old?.map(m => ({ ...m, is_read: true }))
      );
      // Invalidate conversations to refresh unread counts/badges from server
      queryClient.invalidateQueries({ queryKey: PEER_CONVERSATIONS_KEY });
    },
  });
}

// =====================================================
// TYPING INDICATORS
// =====================================================

/**
 * Hook to manage typing indicator state via Supabase Realtime broadcast
 */
export function usePeerTyping(conversationId: string | undefined) {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const channelRef = useRef<ReturnType<typeof supabase.channel> | null>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Subscribe to typing events via broadcast
  useEffect(() => {
    if (!conversationId || !user) return;

    const channel = supabase
      .channel(`peer-typing-${conversationId}`)
      .on('broadcast', { event: 'typing' }, (payload) => {
        if (payload.payload.userId !== user.id) {
          queryClient.setQueryData(['peer-typing', conversationId], {
            isTyping: payload.payload.isTyping,
            userName: payload.payload.userName,
          });

          // Auto-clear typing after 3 seconds if no update
          if (typingTimeoutRef.current) {
            clearTimeout(typingTimeoutRef.current);
          }
          if (payload.payload.isTyping) {
            typingTimeoutRef.current = setTimeout(() => {
              queryClient.setQueryData(['peer-typing', conversationId], {
                isTyping: false,
                userName: null,
              });
            }, 3000);
          }
        }
      })
      .subscribe();

    channelRef.current = channel;

    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
      supabase.removeChannel(channel);
    };
  }, [conversationId, user, queryClient]);

  // Debounced setTyping function
  const setTyping = useCallback(async (isTyping: boolean, userName?: string) => {
    if (!conversationId || !user || !channelRef.current) return;

    await channelRef.current.send({
      type: 'broadcast',
      event: 'typing',
      payload: {
        userId: user.id,
        isTyping,
        userName: userName || 'Someone',
      },
    });
  }, [conversationId, user]);

  const typingState = queryClient.getQueryData<{ isTyping: boolean; userName: string | null }>(
    ['peer-typing', conversationId]
  ) || { isTyping: false, userName: null };

  return {
    isOtherTyping: typingState.isTyping,
    typingUserName: typingState.userName,
    setTyping,
  };
}

// =====================================================
// PRESENCE
// =====================================================

/**
 * Hook to get presence status for a user
 */
export function usePeerPresence(userId: string | undefined) {
  return useQuery({
    queryKey: ['user-presence', userId],
    queryFn: () => (userId ? getUserPresence(userId) : null),
    enabled: !!userId,
    refetchInterval: 30000, // Poll every 30 seconds
    staleTime: 10000, // Consider data fresh for 10 seconds
  });
}
