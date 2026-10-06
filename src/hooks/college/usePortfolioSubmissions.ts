import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

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
  status: string;
  submittedAt: string;
  submissionCount: number;
  evidenceCount: number;
  totalTimeLogged: number;
  daysAwaitingReview: number;
  priority: 'high' | 'medium' | 'low';
}

export interface SubmissionDetails {
  id: string;
  studentId: string;
  studentName: string;
  qualificationId: string;
  qualificationTitle: string;
  categoryId: string;
  categoryName: string;
  status: string;
  submittedAt: string;
  submissionCount: number;

  // Content
  portfolioItems: SubmissionPortfolioItem[];
  previousFeedback?: string;
  previousGrade?: string;

  // Review info
  reviewedAt?: string;
  reviewedBy?: string;
  assessorFeedback?: string;
  grade?: string;
  signedOffAt?: string;
  signedOffBy?: string;
}

export interface SubmissionPortfolioItem {
  id: string;
  title: string;
  description: string;
  status: string;
  evidenceFiles: EvidenceFile[];
  skillsDemonstrated: string[];
  reflectionNotes?: string;
  timeSpent: number;
  createdAt: string;
}

export interface EvidenceFile {
  id: string;
  fileName: string;
  fileType: string;
  fileSize: number;
  fileUrl: string;
  uploadedAt: string;
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
  const { toast } = useToast();

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

      // Get pending submissions
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

      // Get student profiles
      const { data: profiles } = await supabase
        .from('profiles')
        .select('id, full_name')
        .in('id', studentIds);

      // Get evidence counts per submission category
      const { data: portfolioItems } = await supabase
        .from('portfolio_items')
        .select('user_id, category, time_spent')
        .in('user_id', studentIds);

      // Build queue items
      const queueItems: SubmissionQueueItem[] = (submissionData || []).map(sub => {
        const profile = profiles?.find(p => p.id === sub.user_id);
        const categoryItems = portfolioItems?.filter(
          p => p.user_id === sub.user_id && p.category === sub.category_id
        ) || [];

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
          categoryName: (sub.qualification_categories as any)?.name || '',
          status: sub.status,
          submittedAt: sub.submitted_at,
          submissionCount: sub.submission_count,
          evidenceCount: categoryItems.length,
          totalTimeLogged: categoryItems.reduce((sum, i) => sum + (i.time_spent || 0), 0),
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

// Hook to get detailed submission for review
export function useSubmissionDetail(submissionId: string) {
  const { user } = useAuth();

  const {
    data: submission,
    isLoading,
    error,
    refetch
  } = useQuery({
    queryKey: ['submission-detail', submissionId],
    queryFn: async () => {
      if (!submissionId) return null;

      const { data: submissionData, error: subError } = await supabase
        .from('portfolio_submissions')
        .select(`
          *,
          qualification_categories (
            id,
            name
          ),
          qualifications (
            id,
            title
          )
        `)
        .eq('id', submissionId)
        .single();

      if (subError) throw subError;

      // Get student profile
      const { data: profile } = await supabase
        .from('profiles')
        .select('id, full_name')
        .eq('id', submissionData.user_id)
        .single();

      // Get portfolio items for this category
      const { data: items } = await supabase
        .from('portfolio_items')
        .select(`
          *,
          evidence_uploads (
            id,
            file_name,
            file_type,
            file_size,
            file_url,
            uploaded_at
          )
        `)
        .eq('user_id', submissionData.user_id)
        .eq('category', submissionData.category_id)
        .order('created_at', { ascending: false });

      const portfolioItems: SubmissionPortfolioItem[] = (items || []).map(item => ({
        id: item.id,
        title: item.title,
        description: item.description || '',
        status: item.status,
        skillsDemonstrated: item.skills_demonstrated || [],
        reflectionNotes: item.reflection_notes,
        timeSpent: item.time_spent || 0,
        createdAt: item.created_at,
        evidenceFiles: (item.evidence_uploads || []).map((f: any) => ({
          id: f.id,
          fileName: f.file_name,
          fileType: f.file_type,
          fileSize: f.file_size,
          fileUrl: f.file_url,
          uploadedAt: f.uploaded_at
        }))
      }));

      return {
        id: submissionData.id,
        studentId: submissionData.user_id,
        studentName: profile?.full_name || 'Unknown',
        qualificationId: submissionData.qualification_id,
        qualificationTitle: (submissionData.qualifications as any)?.title || '',
        categoryId: submissionData.category_id,
        categoryName: (submissionData.qualification_categories as any)?.name || '',
        status: submissionData.status,
        submittedAt: submissionData.submitted_at,
        submissionCount: submissionData.submission_count,
        portfolioItems,
        previousFeedback: submissionData.previous_feedback,
        previousGrade: submissionData.previous_grade,
        reviewedAt: submissionData.reviewed_at,
        reviewedBy: submissionData.reviewed_by,
        assessorFeedback: submissionData.assessor_feedback,
        grade: submissionData.grade,
        signedOffAt: submissionData.signed_off_at,
        signedOffBy: submissionData.signed_off_by
      } as SubmissionDetails;
    },
    enabled: !!submissionId && !!user?.id
  });

  return {
    submission,
    isLoading,
    error,
    refetch
  };
}

// Hook for students to submit portfolio categories
export function useStudentSubmissions() {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Get student's own submissions
  const {
    data: submissions = [],
    isLoading,
    refetch
  } = useQuery({
    queryKey: ['student-submissions', user?.id],
    queryFn: async () => {
      if (!user?.id) return [];

      const { data, error } = await supabase
        .from('portfolio_submissions')
        .select(`
          *,
          qualification_categories (
            id,
            name
          )
        `)
        .eq('user_id', user.id)
        .order('submitted_at', { ascending: false });

      if (error) throw error;
      return data || [];
    },
    enabled: !!user?.id
  });

  // Submit a category for review. `note` is the learner's optional message to
  // the assessor and lands in portfolio_submissions.submission_notes.
  const submitCategory = useMutation({
    mutationFn: async ({
      qualificationId,
      categoryId,
      note
    }: {
      qualificationId: string;
      categoryId: string;
      note?: string;
    }) => {
      const submissionNotes = note?.trim() ? note.trim() : null;
      // Check if submission exists
      const { data: existing } = await supabase
        .from('portfolio_submissions')
        .select('id, submission_count, assessor_feedback, grade')
        .eq('user_id', user?.id)
        .eq('qualification_id', qualificationId)
        .eq('category_id', categoryId)
        .single();

      if (existing) {
        // Update existing submission (resubmit)
        const { error } = await supabase
          .from('portfolio_submissions')
          .update({
            status: 'resubmitted',
            submitted_at: new Date().toISOString(),
            submission_count: (existing.submission_count ?? 0) + 1,
            previous_feedback: existing.assessor_feedback,
            previous_grade: existing.grade,
            assessor_feedback: null,
            grade: null,
            submission_notes: submissionNotes
          })
          .eq('id', existing.id);

        if (error) throw error;
      } else {
        // Create new submission
        const { error } = await supabase
          .from('portfolio_submissions')
          .insert({
            user_id: user?.id,
            qualification_id: qualificationId,
            category_id: categoryId,
            status: 'submitted',
            submitted_at: new Date().toISOString(),
            submission_count: 1,
            submission_notes: submissionNotes
          });

        if (error) throw error;
      }
    },
    onSuccess: () => {
      toast({
        title: 'Submitted for Review',
        description: 'Your portfolio category has been submitted for assessor review.'
      });
      queryClient.invalidateQueries({ queryKey: ['student-submissions'] });
      queryClient.invalidateQueries({ queryKey: ['submission-queue'] });
    },
    onError: (error: any) => {
      toast({
        title: 'Submission Failed',
        description: error.message,
        variant: 'destructive'
      });
    }
  });

  return {
    submissions,
    isLoading,
    refetch,
    submitCategory
  };
}

export default useSubmissionQueue;
