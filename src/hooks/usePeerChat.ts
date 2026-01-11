import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect, useRef, useCallback } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import {
  PeerConversation,
  PeerMessage,
  peerConversationService,
  peerMessageService,
} from '@/services/peerSupportService';
import { getUserPresence, UserPresence } from '@/services/presenceService';

// Query Keys
const PEER_CONVERSATIONS_KEY = ['peer-conversations'];
const PEER_MESSAGES_KEY = ['peer-messages'];

// =====================================================
// CONVERSATIONS
// =====================================================

/**
 * Hook to get all peer support conversations for current user
 */
export function usePeerConversations() {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: PEER_CONVERSATIONS_KEY,
    queryFn: () => peerConversationService.getMyConversations(),
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
// MESSAGES
// =====================================================

/**
 * Hook to get messages for a conversation with real-time updates
 * This centralises state so both MessagesDropdown and PeerSupportHub share the same cache
 */
export function usePeerMessages(conversationId: string | undefined) {
  const queryClient = useQueryClient();

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
      }
    );

    return unsubscribe;
  }, [conversationId, queryClient]);

  return useQuery({
    queryKey: [...PEER_MESSAGES_KEY, conversationId],
    queryFn: () => conversationId ? peerMessageService.getMessages(conversationId) : [],
    enabled: !!conversationId,
  });
}

/**
 * Hook to send a peer message with optimistic updates
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
    onSuccess: (data, variables, context) => {
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
    onSuccess: (_, conversationId) => {
      // Update local cache to mark messages as read
      queryClient.setQueryData<PeerMessage[]>(
        [...PEER_MESSAGES_KEY, conversationId],
        (old) => old?.map(m => ({ ...m, is_read: true }))
      );
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
