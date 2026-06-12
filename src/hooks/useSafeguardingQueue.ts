import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

/* ==========================================================================
   useSafeguardingQueue — the DSL's source-of-truth list of safeguarding
   concerns across their college.

   This is the surface that makes safeguarding safe: a concern is SEEN here the
   moment it's logged, independent of whether any push notification was
   delivered. RLS ("pastoral: safeguarding leads read") already scopes the rows
   to DSLs/deputies of the same college, so this hook only adds the explicit
   "am I a DSL?" check needed to distinguish "no open concerns" from "you're not
   a designated lead" in the UI.
   ========================================================================== */

export interface SafeguardingConcern {
  id: string;
  studentId: string;
  studentName: string;
  authorName: string;
  title: string | null;
  body: string;
  actionRequired: string | null;
  actionByDate: string | null;
  actionCompletedAt: string | null;
  acknowledgedAt: string | null;
  createdAt: string;
  isOpen: boolean;
  isAcknowledged: boolean;
}

interface QueueResult {
  isDsl: boolean;
  concerns: SafeguardingConcern[];
}

export interface SafeguardingQueue {
  loading: boolean;
  isDsl: boolean;
  concerns: SafeguardingConcern[];
  openConcerns: SafeguardingConcern[];
  openCount: number;
}

export function useSafeguardingQueue(): SafeguardingQueue {
  const { user } = useAuth();

  const { data, isLoading } = useQuery<QueueResult>({
    queryKey: ['safeguarding-queue', user?.id],
    enabled: !!user?.id,
    queryFn: async () => {
      // Am I a designated lead? (own college_staff row is self-readable.)
      const { data: me } = await supabase
        .from('college_staff')
        .select('is_dsl, is_deputy_dsl')
        .eq('user_id', user!.id)
        .maybeSingle();
      const isDsl = Boolean(
        (me as { is_dsl?: boolean; is_deputy_dsl?: boolean } | null)?.is_dsl ||
          (me as { is_deputy_dsl?: boolean } | null)?.is_deputy_dsl
      );
      if (!isDsl) return { isDsl: false, concerns: [] };

      // RLS returns only same-college safeguarding rows to this DSL.
      const { data: rows, error } = await supabase
        .from('pastoral_notes')
        .select(
          'id, student_id, title, body, action_required, action_by_date, action_completed_at, acknowledged_at, created_at, student:college_students(name), author:college_staff(name)'
        )
        .eq('visibility', 'safeguarding')
        .order('created_at', { ascending: false });
      if (error) throw error;

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const concerns: SafeguardingConcern[] = (rows ?? []).map((r: any) => ({
        id: r.id,
        studentId: r.student_id,
        studentName: r.student?.name ?? 'Learner',
        authorName: r.author?.name ?? 'A staff member',
        title: r.title,
        body: r.body,
        actionRequired: r.action_required,
        actionByDate: r.action_by_date,
        actionCompletedAt: r.action_completed_at,
        acknowledgedAt: r.acknowledged_at,
        createdAt: r.created_at,
        isOpen: !r.action_completed_at,
        isAcknowledged: !!r.acknowledged_at,
      }));

      return { isDsl: true, concerns };
    },
  });

  const isDsl = data?.isDsl ?? false;
  const concerns = data?.concerns ?? [];
  const openConcerns = concerns.filter((c) => c.isOpen);

  return {
    loading: isLoading,
    isDsl,
    concerns,
    openConcerns,
    openCount: openConcerns.length,
  };
}
