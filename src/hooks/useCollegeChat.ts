import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { realtimeChannelName } from '@/lib/realtimeChannel';
import {
  collegeMessageService,
  collegeChatHelpers,
  CollegeConversation,
  CollegeMessage,
} from '@/services/collegeChatService';

// Query Keys (the conversations key now only refreshes the learner threads' counts)
const COLLEGE_CONVERSATIONS_KEY = ['college-conversations'];
const COLLEGE_MESSAGES_KEY = ['college-messages'];

// =====================================================
// CONVERSATIONS
// =====================================================

/**
 * The College tab's conversation list.
 *
 * ELE-1918: college_conversations is retired ([LEGACY — DO NOT USE], 0 rows
 * ever, nothing creates a thread there). Nothing reads it any more: the list
 * is always empty and the count comes from the canonical learner threads
 * (student_message_threads), so it matches the bell.
 */
export function useCollegeConversations(enabled: boolean = true) {
  const learnerThreads = useCollegeLearnerThreads(enabled);
  return {
    data: [] as CollegeConversation[],
    isLoading: false,
    totalUnread: learnerThreads.totalUnread,
  };
}

/* ── Learner messages: the canonical tables (ELE-1889) ────────────────────
 * Learner and tutor messages live in student_message_threads /
 * student_messages: the learner's Messages screen, Student 360's Messages
 * area, get_college_inbox and the bell all read them. The College tab of
 * the messages sheet used to list only college_conversations, which no
 * learner screen writes to (0 rows ever), so a tutor saw no learner
 * messages there. It now lists the canonical threads, and (ELE-1918)
 * college_conversations is retired altogether.
 * ------------------------------------------------------------------------ */

export interface CollegeLearnerThread {
  id: string;
  /** college_students.id */
  studentId: string;
  learner: string;
  subject: string | null;
  preview: string | null;
  lastMessageAt: string | null;
  unread: number;
}

const LEARNER_THREADS_KEY = ['college-learner-threads'];

export function useCollegeLearnerThreads(enabled: boolean = true) {
  const queryClient = useQueryClient();
  useEffect(() => {
    if (!enabled) return;
    const channel = supabase
      .channel(realtimeChannelName('college-learner-threads'))
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'student_message_threads' },
        () => {
          queryClient.invalidateQueries({ queryKey: LEARNER_THREADS_KEY });
        }
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [queryClient, enabled]);

  const query = useQuery({
    queryKey: LEARNER_THREADS_KEY,
    enabled,
    staleTime: 30_000,
    queryFn: async (): Promise<CollegeLearnerThread[]> => {
      // RLS: staff read threads for learners at their own college only.
      const { data: threads, error } = await supabase
        .from('student_message_threads')
        .select('id, student_id, subject, last_message_at, unread_count_tutor, created_at')
        .order('last_message_at', { ascending: false, nullsFirst: false })
        .limit(50);
      if (error) throw error;
      const rows = (threads ?? []) as Array<{
        id: string;
        student_id: string;
        subject: string | null;
        last_message_at: string | null;
        unread_count_tutor: number | null;
        created_at: string;
      }>;
      if (rows.length === 0) return [];
      const ids = Array.from(new Set(rows.map((r) => r.student_id)));
      const threadIds = rows.map((r) => r.id);
      const [{ data: learners }, { data: last }] = await Promise.all([
        supabase.from('college_students').select('id, name').in('id', ids),
        supabase
          .from('student_messages')
          .select('thread_id, body, created_at')
          .in('thread_id', threadIds)
          .order('created_at', { ascending: false })
          .limit(200),
      ]);
      const nameById = new Map(
        ((learners ?? []) as Array<{ id: string; name: string | null }>).map((l) => [
          l.id,
          l.name ?? 'Learner',
        ])
      );
      const previewByThread = new Map<string, string>();
      for (const m of (last ?? []) as Array<{ thread_id: string; body: string | null }>) {
        if (!previewByThread.has(m.thread_id) && m.body)
          previewByThread.set(m.thread_id, m.body.replace(/\s+/g, ' ').slice(0, 140));
      }
      return rows.map((r) => ({
        id: r.id,
        studentId: r.student_id,
        learner: nameById.get(r.student_id) ?? 'Learner',
        subject: r.subject,
        preview: previewByThread.get(r.id) ?? null,
        lastMessageAt: r.last_message_at ?? r.created_at,
        unread: r.unread_count_tutor ?? 0,
      }));
    },
  });
  const totalUnread = (query.data ?? []).reduce((n, t) => n + t.unread, 0);
  return { ...query, totalUnread };
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

    const unsubscribe = collegeMessageService.subscribeToMessages(conversationId, (newMessage) => {
      setMessages((old) => {
        if (old.some((m) => m.id === newMessage.id)) return old;
        return [...old, newMessage];
      });
    });

    return unsubscribe;
  }, [conversationId]);

  const query = useQuery({
    queryKey: [...COLLEGE_MESSAGES_KEY, conversationId],
    queryFn: () => (conversationId ? collegeMessageService.getMessages(conversationId) : []),
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
          return old.map((m) => (m.id.startsWith('temp-') ? data : m));
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
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return null;
      return collegeChatHelpers.getUserType(user.id);
    },
  });
}

/**
 * Hook to get participant details
 */
export function useParticipantDetails(
  userId: string | undefined,
  type: 'student' | 'staff' | 'employer' | undefined
) {
  return useQuery({
    queryKey: ['participant-details', userId, type],
    queryFn: () => (userId && type ? collegeChatHelpers.getParticipantDetails(userId, type) : null),
    enabled: !!userId && !!type,
  });
}

/**
 * Hook to get college conversation stats
 */
export function useCollegeChatStats() {
  // ELE-1918: college_conversations is retired; there is nothing to count.
  return { data: { total: 0, unread: 0 } };
}
