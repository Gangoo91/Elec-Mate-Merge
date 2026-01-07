import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

// Types
export interface SamplingCandidate {
  id: string;
  studentId: string;
  studentName: string;
  qualificationId: string;
  qualificationTitle: string;
  categoryId: string;
  categoryName: string;
  assessorId: string;
  assessorName: string;
  signedOffAt: string;
  grade: string;
  submissionCount: number;
}

export interface SamplingRecord {
  id: string;
  studentId: string;
  studentName: string;
  qualificationId: string;
  categoryId: string;
  categoryName: string;
  submissionId: string;
  sampledAt: string;
  sampledBy: string;
  samplerName: string;
  verificationStatus: 'pending' | 'verified' | 'concerns_raised';
  verifiedAt?: string;
  iqaNotes?: string;
  assessorFeedbackQuality?: 'excellent' | 'good' | 'adequate' | 'needs_improvement';
  gradingAccuracy?: 'accurate' | 'questionable' | 'inaccurate';
  actionRequired?: string;
}

// Hook for IQA sampling workflow
export function useIQASampling() {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Get submissions eligible for sampling (signed off but not sampled)
  const {
    data: candidates = [],
    isLoading: loadingCandidates,
    refetch: refetchCandidates
  } = useQuery({
    queryKey: ['iqa-sampling-candidates', user?.id],
    queryFn: async () => {
      if (!user?.id) return [];

      // Get students where this user is IQA
      const { data: assignments } = await supabase
        .from('college_student_assignments')
        .select('student_id, qualification_id, assessor_id')
        .eq('iqa_id', user.id)
        .eq('status', 'active');

      if (!assignments?.length) return [];

      const studentIds = assignments.map(a => a.student_id);

      // Get signed off submissions not yet sampled
      const { data: submissions, error } = await supabase
        .from('portfolio_submissions')
        .select(`
          id,
          user_id,
          qualification_id,
          category_id,
          signed_off_at,
          signed_off_by,
          grade,
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
        .eq('status', 'signed_off')
        .eq('iqa_sampled', false)
        .order('signed_off_at', { ascending: true });

      if (error) throw error;

      // Get profiles for students and assessors
      const allUserIds = [
        ...studentIds,
        ...new Set((submissions || []).map(s => s.signed_off_by).filter(Boolean))
      ];

      const { data: profiles } = await supabase
        .from('profiles')
        .select('id, full_name')
        .in('id', allUserIds);

      const candidates: SamplingCandidate[] = (submissions || []).map(sub => {
        const studentProfile = profiles?.find(p => p.id === sub.user_id);
        const assessorProfile = profiles?.find(p => p.id === sub.signed_off_by);
        const assignment = assignments.find(
          a => a.student_id === sub.user_id && a.qualification_id === sub.qualification_id
        );

        return {
          id: sub.id,
          studentId: sub.user_id,
          studentName: studentProfile?.full_name || 'Unknown',
          qualificationId: sub.qualification_id,
          qualificationTitle: (sub.qualifications as any)?.title || '',
          categoryId: sub.category_id,
          categoryName: (sub.qualification_categories as any)?.name || '',
          assessorId: sub.signed_off_by || '',
          assessorName: assessorProfile?.full_name || 'Unknown',
          signedOffAt: sub.signed_off_at,
          grade: sub.grade || '',
          submissionCount: sub.submission_count
        };
      });

      return candidates;
    },
    enabled: !!user?.id,
    staleTime: 30000
  });

  // Get existing sampling records
  const {
    data: samplingRecords = [],
    isLoading: loadingRecords,
    refetch: refetchRecords
  } = useQuery({
    queryKey: ['iqa-sampling-records', user?.id],
    queryFn: async () => {
      if (!user?.id) return [];

      const { data, error } = await supabase
        .from('iqa_sampling_records')
        .select(`
          *,
          portfolio_submissions (
            category_id,
            qualification_categories (
              name
            )
          ),
          profiles!iqa_sampling_records_sampled_by_fkey (
            full_name
          )
        `)
        .eq('sampled_by', user.id)
        .order('sampled_at', { ascending: false });

      if (error) throw error;

      // Get student profiles
      const studentIds = [...new Set((data || []).map(r => r.user_id))];
      const { data: studentProfiles } = await supabase
        .from('profiles')
        .select('id, full_name')
        .in('id', studentIds);

      return (data || []).map(record => ({
        id: record.id,
        studentId: record.user_id,
        studentName: studentProfiles?.find(p => p.id === record.user_id)?.full_name || 'Unknown',
        qualificationId: record.qualification_id,
        categoryId: record.portfolio_submissions?.category_id || '',
        categoryName: record.portfolio_submissions?.qualification_categories?.name || '',
        submissionId: record.submission_id,
        sampledAt: record.sampled_at,
        sampledBy: record.sampled_by,
        samplerName: (record.profiles as any)?.full_name || 'Unknown',
        verificationStatus: record.verification_status,
        verifiedAt: record.verified_at,
        iqaNotes: record.iqa_notes,
        assessorFeedbackQuality: record.assessor_feedback_quality,
        gradingAccuracy: record.grading_accuracy,
        actionRequired: record.action_required
      })) as SamplingRecord[];
    },
    enabled: !!user?.id
  });

  // Sample a submission
  const sampleSubmission = useMutation({
    mutationFn: async (submissionId: string) => {
      // Get submission details
      const { data: submission } = await supabase
        .from('portfolio_submissions')
        .select('user_id, qualification_id')
        .eq('id', submissionId)
        .single();

      if (!submission) throw new Error('Submission not found');

      // Create sampling record
      const { error: recordError } = await supabase
        .from('iqa_sampling_records')
        .insert({
          user_id: submission.user_id,
          qualification_id: submission.qualification_id,
          submission_id: submissionId,
          sampled_by: user?.id,
          sampled_at: new Date().toISOString(),
          verification_status: 'pending'
        });

      if (recordError) throw recordError;

      // Update submission
      const { error: subError } = await supabase
        .from('portfolio_submissions')
        .update({
          status: 'iqa_sampled',
          iqa_sampled: true,
          iqa_sampled_at: new Date().toISOString(),
          iqa_sampled_by: user?.id
        })
        .eq('id', submissionId);

      if (subError) throw subError;
    },
    onSuccess: () => {
      toast({
        title: 'Submission Sampled',
        description: 'The submission has been added to your sampling queue.'
      });
      queryClient.invalidateQueries({ queryKey: ['iqa-sampling-candidates'] });
      queryClient.invalidateQueries({ queryKey: ['iqa-sampling-records'] });
    },
    onError: (error: any) => {
      toast({
        title: 'Sampling Failed',
        description: error.message,
        variant: 'destructive'
      });
    }
  });

  // Complete verification
  const completeVerification = useMutation({
    mutationFn: async ({
      recordId,
      verificationStatus,
      notes,
      feedbackQuality,
      gradingAccuracy,
      actionRequired
    }: {
      recordId: string;
      verificationStatus: 'verified' | 'concerns_raised';
      notes?: string;
      feedbackQuality?: string;
      gradingAccuracy?: string;
      actionRequired?: string;
    }) => {
      // Update sampling record
      const { error: recordError } = await supabase
        .from('iqa_sampling_records')
        .update({
          verification_status: verificationStatus,
          verified_at: new Date().toISOString(),
          iqa_notes: notes,
          assessor_feedback_quality: feedbackQuality,
          grading_accuracy: gradingAccuracy,
          action_required: actionRequired
        })
        .eq('id', recordId);

      if (recordError) throw recordError;

      // Get submission ID to update
      const { data: record } = await supabase
        .from('iqa_sampling_records')
        .select('submission_id')
        .eq('id', recordId)
        .single();

      if (record) {
        // Update submission status
        const { error: subError } = await supabase
          .from('portfolio_submissions')
          .update({
            status: 'iqa_verified',
            iqa_verified_at: new Date().toISOString()
          })
          .eq('id', record.submission_id);

        if (subError) throw subError;
      }
    },
    onSuccess: () => {
      toast({
        title: 'Verification Complete',
        description: 'IQA verification has been recorded.'
      });
      queryClient.invalidateQueries({ queryKey: ['iqa-sampling-records'] });
      queryClient.invalidateQueries({ queryKey: ['college-portfolios'] });
    },
    onError: (error: any) => {
      toast({
        title: 'Verification Failed',
        description: error.message,
        variant: 'destructive'
      });
    }
  });

  // Get sampling stats
  const stats = {
    pendingCandidates: candidates.length,
    pendingVerification: samplingRecords.filter(r => r.verificationStatus === 'pending').length,
    verified: samplingRecords.filter(r => r.verificationStatus === 'verified').length,
    concernsRaised: samplingRecords.filter(r => r.verificationStatus === 'concerns_raised').length,
    totalSampled: samplingRecords.length
  };

  return {
    candidates,
    samplingRecords,
    stats,
    isLoading: loadingCandidates || loadingRecords,
    sampleSubmission,
    completeVerification,
    refetchCandidates,
    refetchRecords
  };
}

export default useIQASampling;
