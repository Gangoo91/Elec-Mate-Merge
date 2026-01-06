import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect, useMemo } from 'react';
import { supabase } from '@/integrations/supabase/client';
import {
  getConversations,
  getConversationById,
  getOrCreateConversation,
  archiveConversation,
  markConversationAsRead,
  getConversationStats,
  getElectricianConversations,
  getElectricianConversationStats,
  Conversation,
  ElectricianConversation,
} from '@/services/conversationService';

// Query keys
const CONVERSATIONS_KEY = ['conversations'];
const CONVERSATION_STATS_KEY = ['conversations', 'stats'];

/**
 * Hook to fetch all conversations with real-time updates
 */
export const useConversations = () => {
  const queryClient = useQueryClient();

  // Set up real-time subscription
  useEffect(() => {
    const channel = supabase
      .channel('conversations-changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'employer_conversations' },
        () => {
          queryClient.invalidateQueries({ queryKey: CONVERSATIONS_KEY });
          queryClient.invalidateQueries({ queryKey: CONVERSATION_STATS_KEY });
        }
      )
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'employer_messages' },
        () => {
          // Refresh conversations when new message arrives
          queryClient.invalidateQueries({ queryKey: CONVERSATIONS_KEY });
          queryClient.invalidateQueries({ queryKey: CONVERSATION_STATS_KEY });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [queryClient]);

  const query = useQuery({
    queryKey: CONVERSATIONS_KEY,
    queryFn: getConversations,
  });

  // Compute total unread
  const totalUnread = useMemo(() => {
    return (query.data || []).reduce((sum, conv) => sum + (conv.unread_employer || 0), 0);
  }, [query.data]);

  return {
    ...query,
    totalUnread,
  };
};

/**
 * Hook to fetch a single conversation by ID
 */
export const useConversation = (id: string) => {
  const queryClient = useQueryClient();

  // Set up real-time subscription for this specific conversation
  useEffect(() => {
    if (!id) return;

    const channel = supabase
      .channel(`conversation-${id}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'employer_conversations',
          filter: `id=eq.${id}`
        },
        () => {
          queryClient.invalidateQueries({ queryKey: [...CONVERSATIONS_KEY, id] });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [id, queryClient]);

  return useQuery({
    queryKey: [...CONVERSATIONS_KEY, id],
    queryFn: () => getConversationById(id),
    enabled: !!id,
  });
};

/**
 * Hook to fetch conversation stats
 */
export const useConversationStats = () => {
  return useQuery({
    queryKey: CONVERSATION_STATS_KEY,
    queryFn: getConversationStats,
  });
};

/**
 * Hook to start a new conversation or get existing one
 */
export const useStartConversation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: {
      employer_id: string;
      electrician_profile_id: string;
      vacancy_id?: string;
      initiated_by: 'employer' | 'electrician';
    }) => getOrCreateConversation(params),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: CONVERSATIONS_KEY });
      queryClient.setQueryData([...CONVERSATIONS_KEY, data.id], data);
    },
  });
};

/**
 * Hook to archive a conversation
 */
export const useArchiveConversation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: archiveConversation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CONVERSATIONS_KEY });
      queryClient.invalidateQueries({ queryKey: CONVERSATION_STATS_KEY });
    },
  });
};

/**
 * Hook to mark conversation as read
 */
export const useMarkConversationAsRead = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, userType }: { id: string; userType: 'employer' | 'electrician' }) =>
      markConversationAsRead(id, userType),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: CONVERSATIONS_KEY });
      queryClient.invalidateQueries({ queryKey: [...CONVERSATIONS_KEY, variables.id] });
      queryClient.invalidateQueries({ queryKey: CONVERSATION_STATS_KEY });
    },
  });
};

/**
 * Helper hook to get conversations for a specific vacancy
 */
export const useVacancyConversations = (vacancyId: string) => {
  const { data: conversations, ...rest } = useConversations();

  const vacancyConversations = useMemo(() => {
    return (conversations || []).filter(conv => conv.vacancy_id === vacancyId);
  }, [conversations, vacancyId]);

  return {
    ...rest,
    data: vacancyConversations,
  };
};

/**
 * Helper hook to get conversation with a specific electrician
 */
export const useElectricianConversation = (electricianProfileId: string, vacancyId?: string) => {
  const { data: conversations, ...rest } = useConversations();

  const conversation = useMemo(() => {
    return (conversations || []).find(conv =>
      conv.electrician_profile_id === electricianProfileId &&
      (vacancyId ? conv.vacancy_id === vacancyId : true)
    );
  }, [conversations, electricianProfileId, vacancyId]);

  return {
    ...rest,
    data: conversation,
  };
};

// =====================================================
// Electrician-side Hooks
// =====================================================

const ELECTRICIAN_CONVERSATIONS_KEY = ['electrician-conversations'];
const ELECTRICIAN_CONVERSATION_STATS_KEY = ['electrician-conversations', 'stats'];

/**
 * Hook to fetch conversations for an electrician with real-time updates
 */
export const useElectricianConversations = (electricianProfileId: string | undefined) => {
  const queryClient = useQueryClient();

  // Set up real-time subscription
  useEffect(() => {
    if (!electricianProfileId) return;

    const channel = supabase
      .channel(`electrician-conversations-${electricianProfileId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'employer_conversations',
          filter: `electrician_profile_id=eq.${electricianProfileId}`
        },
        () => {
          queryClient.invalidateQueries({ queryKey: [...ELECTRICIAN_CONVERSATIONS_KEY, electricianProfileId] });
          queryClient.invalidateQueries({ queryKey: [...ELECTRICIAN_CONVERSATION_STATS_KEY, electricianProfileId] });
        }
      )
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'employer_messages' },
        () => {
          // Refresh conversations when new message arrives
          queryClient.invalidateQueries({ queryKey: [...ELECTRICIAN_CONVERSATIONS_KEY, electricianProfileId] });
          queryClient.invalidateQueries({ queryKey: [...ELECTRICIAN_CONVERSATION_STATS_KEY, electricianProfileId] });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [electricianProfileId, queryClient]);

  const query = useQuery({
    queryKey: [...ELECTRICIAN_CONVERSATIONS_KEY, electricianProfileId],
    queryFn: () => getElectricianConversations(electricianProfileId!),
    enabled: !!electricianProfileId,
  });

  // Compute total unread
  const totalUnread = useMemo(() => {
    return (query.data || []).reduce((sum, conv) => sum + (conv.unread_electrician || 0), 0);
  }, [query.data]);

  return {
    ...query,
    totalUnread,
  };
};

/**
 * Hook to fetch electrician conversation stats
 */
export const useElectricianConversationStats = (electricianProfileId: string | undefined) => {
  return useQuery({
    queryKey: [...ELECTRICIAN_CONVERSATION_STATS_KEY, electricianProfileId],
    queryFn: () => getElectricianConversationStats(electricianProfileId!),
    enabled: !!electricianProfileId,
  });
};
