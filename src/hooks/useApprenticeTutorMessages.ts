import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export interface TutorThreadSummary {
  id: string;
  subject: string | null;
  last_message_at: string | null;
  unread_count_student: number | null;
}

/**
 * Apprentice-side view of their tutor message threads (student_message_threads /
 * student_messages — the real tutor↔apprentice channel), for surfacing in the
 * top-right inbox. Maps the auth user → college_students.id → their threads.
 */
export function useApprenticeTutorMessages(enabled: boolean) {
  const { user } = useAuth();

  const query = useQuery({
    queryKey: ['apprentice-tutor-threads', user?.id],
    enabled: enabled && !!user?.id,
    staleTime: 30 * 1000,
    queryFn: async (): Promise<TutorThreadSummary[]> => {
      const { data: cs } = await supabase
        .from('college_students')
        .select('id')
        .eq('user_id', user!.id)
        .maybeSingle();
      if (!cs?.id) return [];

      const { data: threads } = await supabase
        .from('student_message_threads')
        .select('id, subject, last_message_at, unread_count_student')
        .eq('student_id', cs.id)
        .order('last_message_at', { ascending: false, nullsFirst: false });

      return (threads ?? []) as TutorThreadSummary[];
    },
  });

  const threads = query.data ?? [];
  const unread = threads.reduce((sum, t) => sum + (t.unread_count_student || 0), 0);

  return { threads, unread, isLoading: query.isLoading };
}
