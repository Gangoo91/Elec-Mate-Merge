import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import {
  collegeConversationService,
  collegeMessageService,
  collegeChatHelpers,
  CollegeConversation,
  CollegeMessage,
} from '@/services/collegeChatService';

// Query Keys
const COLLEGE_CONVERSATIONS_KEY = ['college-conversations'];
const COLLEGE_MESSAGES_KEY = ['college-messages'];

// =====================================================
// CONVERSATIONS
// =====================================================

/**
 * Hook to get all college conversations for current user
 */
export function useCollegeConversations() {
  const queryClient = useQueryClient();

  // Real-time subscription
  useEffect(() => {
    const channel = supabase
      .channel('college-conversations-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'college',
          table: 'conversations',
        },
        () => {
          queryClient.invalidateQueries({ queryKey: COLLEGE_CONVERSATIONS_KEY });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [queryClient]);

  const query = useQuery({
    queryKey: COLLEGE_CONVERSATIONS_KEY,
    queryFn: collegeConversationService.getMyConversations,
  });

  // Compute total unread
  const totalUnread = (query.data || []).reduce((sum, conv) => {
    // This is simplified - in real app, compare participant IDs with auth.uid()
    return sum + (conv.unread_1 || 0) + (conv.unread_2 || 0);
  }, 0);

  return {
    ...query,
    totalUnread,
  };
}

/**
 * Hook to get conversations for a specific student
 */
export function useStudentConversations(studentId: string | undefined) {
  return useQuery({
    queryKey: [...COLLEGE_CONVERSATIONS_KEY, 'student', studentId],
    queryFn: () => studentId ? collegeConversationService.getStudentConversations(studentId) : [],
    enabled: !!studentId,
  });
}

/**
 * Hook to get or create a student-tutor conversation
 */
export function useGetOrCreateStudentTutorConversation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      institutionId,
      studentUserId,
      tutorUserId,
      studentId,
    }: {
      institutionId: string;
      studentUserId: string;
      tutorUserId: string;
      studentId?: string;
    }) => collegeConversationService.getOrCreateStudentTutorConversation(
      institutionId,
      studentUserId,
      tutorUserId,
      studentId
    ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: COLLEGE_CONVERSATIONS_KEY });
    },
  });
}

/**
 * Hook to get or create a college-employer conversation
 */
export function useGetOrCreateCollegeEmployerConversation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      institutionId,
      staffUserId,
      employerUserId,
      studentId,
    }: {
      institutionId: string;
      staffUserId: string;
      employerUserId: string;
      studentId?: string;
    }) => collegeConversationService.getOrCreateCollegeEmployerConversation(
      institutionId,
      staffUserId,
      employerUserId,
      studentId
    ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: COLLEGE_CONVERSATIONS_KEY });
    },
  });
}

/**
 * Hook to archive a conversation
 */
export function useArchiveCollegeConversation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: collegeConversationService.archiveConversation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: COLLEGE_CONVERSATIONS_KEY });
    },
  });
}

// =====================================================
// MESSAGES
// =====================================================

/**
 * Hook to get messages for a conversation with real-time updates
 */
export function useCollegeMessages(conversationId: string | undefined) {
  const queryClient = useQueryClient();
  const [messages, setMessages] = useState<CollegeMessage[]>([]);

  // Real-time subscription
  useEffect(() => {
    if (!conversationId) return;

    const unsubscribe = collegeMessageService.subscribeToMessages(
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
    queryKey: [...COLLEGE_MESSAGES_KEY, conversationId],
    queryFn: () => conversationId ? collegeMessageService.getMessages(conversationId) : [],
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
 * Hook to send a college message
 */
export function useSendCollegeMessage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: collegeMessageService.sendMessage,
    onMutate: async (variables) => {
      const queryKey = [...COLLEGE_MESSAGES_KEY, variables.conversation_id];
      await queryClient.cancelQueries({ queryKey });

      const tempMessage: CollegeMessage = {
        id: `temp-${Date.now()}`,
        conversation_id: variables.conversation_id,
        sender_id: '',
        content: variables.content,
        message_type: variables.message_type || 'text',
        metadata: variables.metadata || {},
        is_confidential: variables.is_confidential || false,
        visible_to_student: variables.visible_to_student !== false,
        sent_at: new Date().toISOString(),
        read_at: null,
        created_at: new Date().toISOString(),
      };

      queryClient.setQueryData<CollegeMessage[]>(queryKey, (old) => {
        if (!old) return [tempMessage];
        return [...old, tempMessage];
      });

      return { queryKey };
    },
    onSuccess: (data, variables, context) => {
      if (context?.queryKey) {
        queryClient.setQueryData<CollegeMessage[]>(context.queryKey, (old) => {
          if (!old) return [data];
          return old.map(m => m.id.startsWith('temp-') ? data : m);
        });
      }
      queryClient.invalidateQueries({ queryKey: COLLEGE_CONVERSATIONS_KEY });
    },
  });
}

/**
 * Hook to mark messages as read
 */
export function useMarkCollegeMessagesAsRead() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: collegeMessageService.markAsRead,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: COLLEGE_CONVERSATIONS_KEY });
    },
  });
}

/**
 * Hook to send a progress update
 */
export function useSendProgressUpdate() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      conversationId,
      progressData,
    }: {
      conversationId: string;
      progressData: {
        type: 'assessment' | 'attendance' | 'milestone';
        title: string;
        details: string;
        score?: number;
      };
    }) => collegeMessageService.sendProgressUpdate(conversationId, progressData),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: [...COLLEGE_MESSAGES_KEY, variables.conversationId] });
      queryClient.invalidateQueries({ queryKey: COLLEGE_CONVERSATIONS_KEY });
    },
  });
}

// =====================================================
// HELPERS
// =====================================================

/**
 * Hook to get the current user's college type
 */
export function useCollegeUserType() {
  return useQuery({
    queryKey: ['college-user-type'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return null;
      return collegeChatHelpers.getUserType(user.id);
    },
  });
}

/**
 * Hook to get participant details
 */
export function useParticipantDetails(userId: string | undefined, type: 'student' | 'staff' | 'employer' | undefined) {
  return useQuery({
    queryKey: ['participant-details', userId, type],
    queryFn: () => userId && type ? collegeChatHelpers.getParticipantDetails(userId, type) : null,
    enabled: !!userId && !!type,
  });
}

/**
 * Hook to get college conversation stats
 */
export function useCollegeChatStats() {
  return useQuery({
    queryKey: [...COLLEGE_CONVERSATIONS_KEY, 'stats'],
    queryFn: collegeConversationService.getStats,
  });
}
