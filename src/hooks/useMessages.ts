import { useQuery, useMutation, useQueryClient, useInfiniteQuery } from '@tanstack/react-query';
import { useEffect, useCallback, useRef, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import {
  getMessages,
  sendMessage,
  markMessageAsRead,
  markMessageAsDelivered,
  editMessage,
  deleteMessage,
  addReaction,
  removeReaction,
  searchMessages,
  Message,
  MessageReaction,
} from '@/services/conversationService';

// Query keys
const MESSAGES_KEY = ['messages'];
const CONVERSATIONS_KEY = ['conversations'];

const PAGE_SIZE = 50;

/**
 * Hook to fetch messages for a conversation with real-time updates
 */
export const useMessages = (conversationId: string) => {
  const queryClient = useQueryClient();
  const isSubscribed = useRef(false);

  // Set up real-time subscription for new messages
  useEffect(() => {
    if (!conversationId || isSubscribed.current) return;

    isSubscribed.current = true;

    const channel = supabase
      .channel(`messages-${conversationId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'employer_messages',
          filter: `conversation_id=eq.${conversationId}`
        },
        (payload) => {
          // Add new message to cache optimistically
          queryClient.setQueryData<Message[]>(
            [...MESSAGES_KEY, conversationId],
            (old) => {
              if (!old) return [payload.new as Message];
              // Avoid duplicates
              if (old.some(m => m.id === (payload.new as Message).id)) return old;
              return [...old, payload.new as Message];
            }
          );
          // Also invalidate conversations to update preview
          queryClient.invalidateQueries({ queryKey: CONVERSATIONS_KEY });
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'employer_messages',
          filter: `conversation_id=eq.${conversationId}`
        },
        (payload) => {
          // Update message in cache (for read receipts)
          queryClient.setQueryData<Message[]>(
            [...MESSAGES_KEY, conversationId],
            (old) => {
              if (!old) return old;
              return old.map(m =>
                m.id === (payload.new as Message).id ? (payload.new as Message) : m
              );
            }
          );
        }
      )
      .subscribe();

    return () => {
      isSubscribed.current = false;
      supabase.removeChannel(channel);
    };
  }, [conversationId, queryClient]);

  return useQuery({
    queryKey: [...MESSAGES_KEY, conversationId],
    queryFn: () => getMessages(conversationId),
    enabled: !!conversationId,
    staleTime: 0, // Always fetch fresh
  });
};

/**
 * Hook to fetch messages with infinite scroll (pagination)
 */
export const useInfiniteMessages = (conversationId: string) => {
  const queryClient = useQueryClient();

  // Set up real-time subscription
  useEffect(() => {
    if (!conversationId) return;

    const channel = supabase
      .channel(`messages-infinite-${conversationId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'employer_messages',
          filter: `conversation_id=eq.${conversationId}`
        },
        () => {
          queryClient.invalidateQueries({ queryKey: [...MESSAGES_KEY, 'infinite', conversationId] });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [conversationId, queryClient]);

  return useInfiniteQuery({
    queryKey: [...MESSAGES_KEY, 'infinite', conversationId],
    queryFn: async ({ pageParam = 0 }) => {
      const messages = await getMessages(conversationId, {
        limit: PAGE_SIZE,
        offset: pageParam,
      });
      return {
        messages,
        nextOffset: messages.length === PAGE_SIZE ? pageParam + PAGE_SIZE : undefined,
      };
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextOffset,
    enabled: !!conversationId,
  });
};

/**
 * Hook to send a message with optimistic updates
 */
export const useSendMessage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: sendMessage,
    // Optimistic update - add message immediately
    onMutate: async (newMessage) => {
      const queryKey = [...MESSAGES_KEY, newMessage.conversation_id];

      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey });

      // Snapshot previous value
      const previousMessages = queryClient.getQueryData<Message[]>(queryKey);

      // Optimistically add new message
      const optimisticMessage: Message = {
        id: `temp-${Date.now()}`,
        conversation_id: newMessage.conversation_id,
        sender_type: newMessage.sender_type,
        sender_id: newMessage.sender_id,
        content: newMessage.content,
        message_type: newMessage.message_type || 'text',
        metadata: newMessage.metadata || {},
        sent_at: new Date().toISOString(),
        delivered_at: null,
        read_at: null,
        created_at: new Date().toISOString(),
      };

      queryClient.setQueryData<Message[]>(queryKey, (old) => {
        if (!old) return [optimisticMessage];
        return [...old, optimisticMessage];
      });

      return { previousMessages, queryKey };
    },
    // On error, rollback
    onError: (err, newMessage, context) => {
      if (context?.queryKey && context?.previousMessages) {
        queryClient.setQueryData(context.queryKey, context.previousMessages);
      }
    },
    // On success, replace optimistic message with real one
    onSuccess: (data, variables, context) => {
      if (context?.queryKey) {
        queryClient.setQueryData<Message[]>(context.queryKey, (old) => {
          if (!old) return [data];
          return old.map(m => (m.id.startsWith('temp-') ? data : m));
        });
      }
      // Invalidate conversations to update preview
      queryClient.invalidateQueries({ queryKey: CONVERSATIONS_KEY });
    },
  });
};

/**
 * Hook to mark a message as delivered
 */
export const useMarkAsDelivered = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: markMessageAsDelivered,
    onSuccess: (_, messageId) => {
      // The real-time subscription will handle the update
    },
  });
};

/**
 * Hook to mark a message as read
 */
export const useMarkAsRead = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: markMessageAsRead,
    onSuccess: () => {
      // Invalidate to update read receipts
      queryClient.invalidateQueries({ queryKey: CONVERSATIONS_KEY });
    },
  });
};

/**
 * Hook to mark all messages in a conversation as read
 */
export const useMarkAllAsRead = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      conversationId,
      userType,
    }: {
      conversationId: string;
      userType: 'employer' | 'electrician';
    }) => {
      // Mark all unread messages as read
      await supabase
        .from('employer_messages')
        .update({ read_at: new Date().toISOString() })
        .eq('conversation_id', conversationId)
        .neq('sender_type', userType)
        .is('read_at', null);

      // Reset unread count on conversation
      const unreadField = userType === 'employer' ? 'unread_employer' : 'unread_electrician';
      await supabase
        .from('employer_conversations')
        .update({ [unreadField]: 0 })
        .eq('id', conversationId);
    },
    onMutate: async ({ conversationId, userType }) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: CONVERSATIONS_KEY });

      // Snapshot the previous value
      const previousConversations = queryClient.getQueryData(CONVERSATIONS_KEY);

      // Optimistically update the conversation's unread count to 0
      const unreadField = userType === 'employer' ? 'unread_employer' : 'unread_electrician';
      queryClient.setQueryData(CONVERSATIONS_KEY, (old: any[] | undefined) => {
        if (!old) return old;
        return old.map(c => c.id === conversationId
          ? { ...c, [unreadField]: 0 }
          : c
        );
      });

      return { previousConversations };
    },
    onError: (err, variables, context) => {
      // Rollback on error
      if (context?.previousConversations) {
        queryClient.setQueryData(CONVERSATIONS_KEY, context.previousConversations);
      }
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: [...MESSAGES_KEY, variables.conversationId] });
      queryClient.invalidateQueries({ queryKey: CONVERSATIONS_KEY });
    },
  });
};

/**
 * Hook for typing indicator using Supabase Presence
 * Fixed: Uses useState for isOtherTyping to trigger re-renders
 */
export const useTypingIndicator = (conversationId: string, userId: string, userType: 'employer' | 'electrician') => {
  const channelRef = useRef<ReturnType<typeof supabase.channel> | null>(null);
  const isTypingRef = useRef(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const otherTypingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Track if other party is typing - using useState for reactivity!
  const [isOtherTyping, setIsOtherTyping] = useState(false);

  const setTyping = useCallback((typing: boolean) => {
    if (!channelRef.current || isTypingRef.current === typing) return;

    isTypingRef.current = typing;

    // Clear existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Broadcast typing state
    channelRef.current.send({
      type: 'broadcast',
      event: 'typing',
      payload: { userId, userType, isTyping: typing },
    });

    // Auto-clear typing after 3 seconds of inactivity
    if (typing) {
      timeoutRef.current = setTimeout(() => {
        setTyping(false);
      }, 3000);
    }
  }, [userId, userType]);

  useEffect(() => {
    if (!conversationId || !userId) return;

    channelRef.current = supabase.channel(`typing-${conversationId}`, {
      config: { presence: { key: `${userType}-${userId}` } },
    });

    channelRef.current
      .on('broadcast', { event: 'typing' }, ({ payload }) => {
        if (payload.userType !== userType) {
          setIsOtherTyping(payload.isTyping);

          // Auto-clear other typing after 4 seconds (in case they disconnect)
          if (otherTypingTimeoutRef.current) {
            clearTimeout(otherTypingTimeoutRef.current);
          }
          if (payload.isTyping) {
            otherTypingTimeoutRef.current = setTimeout(() => {
              setIsOtherTyping(false);
            }, 4000);
          }
        }
      })
      .subscribe();

    return () => {
      if (channelRef.current) {
        supabase.removeChannel(channelRef.current);
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      if (otherTypingTimeoutRef.current) {
        clearTimeout(otherTypingTimeoutRef.current);
      }
    };
  }, [conversationId, userId, userType]);

  return {
    setTyping,
    isOtherTyping,
  };
};

/**
 * Hook to edit a message
 */
export const useEditMessage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ messageId, content }: { messageId: string; content: string; conversationId: string }) =>
      editMessage(messageId, content),
    onMutate: async ({ messageId, content, conversationId }) => {
      const queryKey = [...MESSAGES_KEY, conversationId];
      await queryClient.cancelQueries({ queryKey });
      const previousMessages = queryClient.getQueryData<Message[]>(queryKey);

      queryClient.setQueryData<Message[]>(queryKey, (old) => {
        if (!old) return old;
        return old.map(m => m.id === messageId ? { ...m, content, edited_at: new Date().toISOString() } : m);
      });

      return { previousMessages, queryKey };
    },
    onError: (err, variables, context) => {
      if (context?.queryKey && context?.previousMessages) {
        queryClient.setQueryData(context.queryKey, context.previousMessages);
      }
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: CONVERSATIONS_KEY });
    },
  });
};

/**
 * Hook to delete a message
 */
export const useDeleteMessage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ messageId }: { messageId: string; conversationId: string }) =>
      deleteMessage(messageId),
    onMutate: async ({ messageId, conversationId }) => {
      const queryKey = [...MESSAGES_KEY, conversationId];
      await queryClient.cancelQueries({ queryKey });
      const previousMessages = queryClient.getQueryData<Message[]>(queryKey);

      queryClient.setQueryData<Message[]>(queryKey, (old) => {
        if (!old) return old;
        return old.filter(m => m.id !== messageId);
      });

      return { previousMessages, queryKey };
    },
    onError: (err, variables, context) => {
      if (context?.queryKey && context?.previousMessages) {
        queryClient.setQueryData(context.queryKey, context.previousMessages);
      }
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: CONVERSATIONS_KEY });
    },
  });
};

/**
 * Hook to add a reaction to a message
 */
export const useAddReaction = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ messageId, emoji, userId }: { messageId: string; emoji: string; userId: string; conversationId: string }) =>
      addReaction(messageId, emoji, userId),
    onSuccess: (_, { conversationId }) => {
      queryClient.invalidateQueries({ queryKey: [...MESSAGES_KEY, conversationId] });
    },
  });
};

/**
 * Hook to remove a reaction from a message
 */
export const useRemoveReaction = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ reactionId }: { reactionId: string; conversationId: string }) =>
      removeReaction(reactionId),
    onSuccess: (_, { conversationId }) => {
      queryClient.invalidateQueries({ queryKey: [...MESSAGES_KEY, conversationId] });
    },
  });
};

/**
 * Hook to search messages
 */
export const useMessageSearch = (conversationId: string, query: string) => {
  return useQuery({
    queryKey: [...MESSAGES_KEY, 'search', conversationId, query],
    queryFn: () => searchMessages(conversationId, query),
    enabled: !!conversationId && !!query && query.length >= 2,
    staleTime: 30000, // Cache search results for 30 seconds
  });
};
