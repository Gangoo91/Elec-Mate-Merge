import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

/* ==========================================================================
   useSafeguardingQueue — the DSL's source-of-truth list of safeguarding
   concerns across their college.

   This is the surface that makes safeguarding safe: a concern is SEEN here the
   moment it's logged, independent of whether any push notification was
   delivered. RLS ("pastoral: safeguarding leads read") scopes the rows with
   _safeguarding_reader: active, non-archived DSLs and deputies of the same
   college, or, when the college has no such lead with an account, its admins
   and heads of department (the people tg_notify_safeguarding alerts instead).
   This hook asks the same function, to tell "no open concerns" apart from
   "you can't see concerns" in the UI.
   ========================================================================== */

export interface SafeguardingConcern {
  id: string;
  studentId: string;
  studentName: string;
  /** Learner's date of birth, for the under-18 flag (ELE-1911). */
  studentDob: string | null;
  authorName: string;
  title: string | null;
  body: string;
  actionRequired: string | null;
  actionByDate: string | null;
  actionCompletedAt: string | null;
  acknowledgedAt: string | null;
  /** Closed by a lead with what was done (close_safeguarding_concern). */
  closedAt: string | null;
  closureNote: string | null;
  createdAt: string;
  isOpen: boolean;
  isAcknowledged: boolean;
}

interface QueueResult {
  isDsl: boolean;
  viaFallback: boolean;
  concerns: SafeguardingConcern[];
}

export interface SafeguardingQueue {
  loading: boolean;
  /** Can read and act on concerns (a lead, or the no-lead fallback). */
  isDsl: boolean;
  /** Reading as an admin / head of department because no lead is set. */
  viaFallback: boolean;
  concerns: SafeguardingConcern[];
  openConcerns: SafeguardingConcern[];
  openCount: number;
}

export function useSafeguardingQueue(): SafeguardingQueue {
  const { user, profile } = useAuth();

  const { data, isLoading } = useQuery<QueueResult>({
    queryKey: ['safeguarding-queue', user?.id, profile?.college_id ?? null],
    enabled: !!user?.id,
    queryFn: async () => {
      // Can I read concerns? Ask the same function the read policy uses.
      const collegeId = profile?.college_id ?? null;
      if (!collegeId) return { isDsl: false, viaFallback: false, concerns: [] };
      const [{ data: canRead }, { data: me }] = await Promise.all([
        supabase.rpc('_safeguarding_reader' as never, { p_college: collegeId } as never),
        supabase
          .from('college_staff')
          .select('is_dsl, is_deputy_dsl')
          .eq('user_id', user!.id)
          .eq('college_id', collegeId)
          .is('archived_at', null)
          .limit(1),
      ]);
      const isDsl = canRead === true;
      if (!isDsl) return { isDsl: false, viaFallback: false, concerns: [] };
      const m = ((me ?? []) as Array<{ is_dsl?: boolean; is_deputy_dsl?: boolean }>)[0];
      const viaFallback = !(m?.is_dsl || m?.is_deputy_dsl);

      // RLS returns only same-college safeguarding rows to this DSL.
      const { data: rows, error } = await supabase
        .from('pastoral_notes')
        .select(
          'id, student_id, title, body, action_required, action_by_date, action_completed_at, acknowledged_at, closed_at, closure_note, created_at, student:college_students(name, date_of_birth), author:college_staff!pastoral_notes_author_id_fkey(name)'
        )
        .eq('visibility', 'safeguarding')
        .order('created_at', { ascending: false });
      if (error) throw error;

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const concerns: SafeguardingConcern[] = (rows ?? []).map((r: any) => ({
        id: r.id,
        studentId: r.student_id,
        studentName: r.student?.name ?? 'Learner',
        studentDob: r.student?.date_of_birth ?? null,
        authorName: r.author?.name ?? 'A staff member',
        title: r.title,
        body: r.body,
        actionRequired: r.action_required,
        actionByDate: r.action_by_date,
        actionCompletedAt: r.action_completed_at,
        acknowledgedAt: r.acknowledged_at,
        closedAt: r.closed_at ?? null,
        closureNote: r.closure_note ?? null,
        createdAt: r.created_at,
        isOpen: !r.closed_at && !r.action_completed_at,
        isAcknowledged: !!r.acknowledged_at,
      }));

      return { isDsl: true, viaFallback, concerns };
    },
  });

  const isDsl = data?.isDsl ?? false;
  const viaFallback = data?.viaFallback ?? false;
  const concerns = data?.concerns ?? [];
  const openConcerns = concerns.filter((c) => c.isOpen);

  return {
    loading: isLoading,
    isDsl,
    viaFallback,
    concerns,
    openConcerns,
    openCount: openConcerns.length,
  };
}
