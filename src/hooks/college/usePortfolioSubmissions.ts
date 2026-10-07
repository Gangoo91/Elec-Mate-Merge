import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

// Types
export interface SubmissionQueueItem {
  id: string;
  studentId: string;
  studentName: string;
  studentEmail: string;
  qualificationId: string;
  qualificationTitle: string;
  categoryId: string;
  categoryName: string;
  /** What the row is called: the first item sent (+ "and N more"), else the category. */
  title: string;
  /** portfolio_submission_items, oldest first. Empty for a pre-junction category send. */
  itemIds: string[];
  itemTitles: string[];
  /** Distinct criteria the learner claimed on the items sent. */
  criteriaCount: number;
  status: string;
  submittedAt: string;
  submissionCount: number;
  evidenceCount: number;
  totalTimeLogged: number;
  daysAwaitingReview: number;
  priority: 'high' | 'medium' | 'low';
}

export type SubmissionQueueScope = 'mine' | 'college';

interface SubmissionQueueResult {
  items: SubmissionQueueItem[];
  /** 'mine' = learners assigned to this assessor; 'college' = the staff
      member has no assessor assignments, so this is every learner at their
      college (TutorToday's fallback, so a new tutor never sees an empty
      queue while submissions sit waiting). */
  scope: SubmissionQueueScope;
}

// Hook for assessors to view submission queue
export function useSubmissionQueue() {
  const { user } = useAuth();

  const {
    data: result = { items: [], scope: 'mine' } as SubmissionQueueResult,
    isLoading,
    error,
    refetch
  } = useQuery<SubmissionQueueResult>({
    queryKey: ['submission-queue', user?.id],
    queryFn: async () => {
      if (!user?.id) return { items: [], scope: 'mine' };

      // Get submissions for students assigned to this assessor.
      // college_student_assignments.student_id / assessor_id are AUTH uids
      // (= portfolio_submissions.user_id), so no id translation is needed.
      const { data: assignments } = await supabase
        .from('college_student_assignments')
        .select('student_id, qualification_id')
        .eq('assessor_id', user.id)
        .eq('status', 'active');

      let scope: SubmissionQueueScope = 'mine';
      let studentIds: string[] = [...new Set((assignments ?? []).map(a => a.student_id).filter(Boolean))];

      if (studentIds.length === 0) {
        // No assessor assignments — widen to every learner at this staff
        // member's college. RLS: "Staff at learner's college read submissions"
        // (supabase/migrations/20261006130000_college_staff_review_access.sql)
        // allows the read for unarchived college_staff at the learner's college.
        const { data: staffRow } = await supabase
          .from('college_staff')
          .select('college_id')
          .eq('user_id', user.id)
          .is('archived_at', null)
          .maybeSingle();
        const collegeId = (staffRow as { college_id?: string | null } | null)?.college_id ?? null;
        if (!collegeId) return { items: [], scope: 'mine' };
        const { data: roll } = await supabase
          .from('college_students')
          .select('user_id')
          .eq('college_id', collegeId);
        studentIds = [
          ...new Set(
            ((roll ?? []) as Array<{ user_id: string | null }>)
              .map(r => r.user_id)
              .filter((u): u is string => Boolean(u))
          ),
        ];
        scope = 'college';
        if (studentIds.length === 0) return { items: [], scope };
      }

      // Get pending submissions. Since ELE-1863 a submission names the
      // items it sends in portfolio_submission_items (category_id is often
      // null), so the row title and evidence count come from that junction.
      const { data: submissionData, error: subError } = await supabase
        .from('portfolio_submissions')
        .select(`
          id,
          user_id,
          qualification_id,
          category_id,
          status,
          submitted_at,
          submission_count,
          qualification_categories (
            id,
            name
          ),
          qualifications (
            id,
            title
          )
        `)
        .in('user_id', studentIds)
        .in('status', ['submitted', 'under_review', 'resubmitted'])
        .order('submitted_at', { ascending: true });

      if (subError) throw subError;
      const subs = submissionData || [];
      const subIds = subs.map(s => s.id);

      // Student profiles + the junction rows (RLS: staff who can assess the
      // learner; anyone else falls back to the category below).
      const [{ data: profiles }, { data: links }] = await Promise.all([
        supabase.from('profiles').select('id, full_name').in('id', studentIds),
        subIds.length
          ? supabase
              .from('portfolio_submission_items' as never)
              .select('submission_id, portfolio_item_id, added_at')
              .in('submission_id', subIds)
          : Promise.resolve({ data: [] as unknown[] }),
      ]);
      const linkRows = ((links ?? []) as unknown as Array<{
        submission_id: string;
        portfolio_item_id: string;
        added_at: string | null;
      }>).sort((a, b) => (a.added_at ?? '').localeCompare(b.added_at ?? ''));
      const itemIds = [...new Set(linkRows.map(l => l.portfolio_item_id))];

      const [{ data: linkedItems }, { data: crit }, { data: legacyItems }] = await Promise.all([
        itemIds.length
          ? supabase.from('portfolio_items').select('id, title, time_spent').in('id', itemIds)
          : Promise.resolve({ data: [] as unknown[] }),
        itemIds.length
          ? supabase
              .from('portfolio_item_criteria' as never)
              .select('portfolio_item_id, unit_code, ac_code, source')
              .in('portfolio_item_id', itemIds)
              .neq('source', 'ai_suggested')
          : Promise.resolve({ data: [] as unknown[] }),
        // Category submissions sent before the junction existed.
        subs.some(s => s.category_id)
          ? supabase
              .from('portfolio_items')
              .select('user_id, category, time_spent')
              .in('user_id', studentIds)
          : Promise.resolve({ data: [] as unknown[] }),
      ]);
      const itemById = new Map(
        ((linkedItems ?? []) as unknown as Array<{ id: string; title: string | null; time_spent: number | null }>).map(
          i => [i.id, i]
        )
      );
      const critByItem = new Map<string, string[]>();
      for (const c of (crit ?? []) as unknown as Array<{ portfolio_item_id: string; unit_code: string; ac_code: string }>) {
        const list = critByItem.get(c.portfolio_item_id) ?? [];
        list.push(`${c.unit_code}:${c.ac_code}`);
        critByItem.set(c.portfolio_item_id, list);
      }
      const itemsBySub = new Map<string, string[]>();
      for (const l of linkRows) {
        const list = itemsBySub.get(l.submission_id) ?? [];
        if (!list.includes(l.portfolio_item_id)) list.push(l.portfolio_item_id);
        itemsBySub.set(l.submission_id, list);
      }
      const legacy = (legacyItems ?? []) as unknown as Array<{ user_id: string; category: string | null; time_spent: number | null }>;

      // Build queue items
      const queueItems: SubmissionQueueItem[] = subs.map(sub => {
        const profile = profiles?.find(p => p.id === sub.user_id);
        const ids = itemsBySub.get(sub.id) ?? [];
        const sent = ids.map(id => itemById.get(id)).filter((i): i is NonNullable<typeof i> => !!i);
        const categoryItems = ids.length
          ? []
          : legacy.filter(p => p.user_id === sub.user_id && !!sub.category_id && p.category === sub.category_id);
        const categoryName = (sub.qualification_categories as any)?.name || '';
        const itemTitles = sent.map(i => i.title?.trim() || 'Untitled evidence');
        const criteria = new Set(ids.flatMap(id => critByItem.get(id) ?? []));
        const title = itemTitles.length
          ? itemTitles[0] + (itemTitles.length > 1 ? ` and ${itemTitles.length - 1} more` : '')
          : categoryName || 'Evidence for assessment';

        const daysAwaiting = Math.floor(
          (Date.now() - new Date(sub.submitted_at).getTime()) / (1000 * 60 * 60 * 24)
        );

        // Priority based on days waiting and resubmission count
        let priority: 'high' | 'medium' | 'low' = 'low';
        if (daysAwaiting > 7 || sub.submission_count > 2) priority = 'high';
        else if (daysAwaiting > 3 || sub.submission_count > 1) priority = 'medium';

        return {
          id: sub.id,
          studentId: sub.user_id,
          studentName: profile?.full_name || 'Unknown',
          studentEmail: '', // profiles has no email column; it was failing the whole lookup
          qualificationId: sub.qualification_id,
          qualificationTitle: (sub.qualifications as any)?.title || '',
          categoryId: sub.category_id,
          categoryName,
          title,
          itemIds: ids,
          itemTitles,
          criteriaCount: criteria.size,
          status: sub.status,
          submittedAt: sub.submitted_at,
          submissionCount: sub.submission_count,
          evidenceCount: ids.length || categoryItems.length,
          totalTimeLogged: (ids.length ? sent : categoryItems).reduce((sum, i) => sum + (i.time_spent || 0), 0),
          daysAwaitingReview: daysAwaiting,
          priority
        };
      });

      const items = queueItems.sort((a, b) => {
        const priorityOrder = { high: 0, medium: 1, low: 2 };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      });
      return { items, scope };
    },
    enabled: !!user?.id,
    staleTime: 30000,
    refetchInterval: 60000
  });

  const submissions = result.items;
  const scope = result.scope;

  const stats = {
    total: submissions.length,
    highPriority: submissions.filter(s => s.priority === 'high').length,
    mediumPriority: submissions.filter(s => s.priority === 'medium').length,
    lowPriority: submissions.filter(s => s.priority === 'low').length,
    avgDaysWaiting: submissions.length > 0
      ? Math.round(submissions.reduce((sum, s) => sum + s.daysAwaitingReview, 0) / submissions.length)
      : 0
  };

  return {
    submissions,
    scope,
    stats,
    isLoading,
    error,
    refetch
  };
}

export default useSubmissionQueue;
