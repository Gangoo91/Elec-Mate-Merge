import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

// Types
export interface ReviewFeedback {
  submissionId: string;
  feedback: string;
  grade?: 'pass' | 'merit' | 'distinction' | 'refer' | 'not_yet_competent';
  strengthsNoted?: string;
  areasForImprovement?: string;
  actionRequired?: string;
}

export interface SignOffData {
  submissionId: string;
  signatureData?: string;
  confirmationNotes?: string;
}

export interface ObservationData {
  studentId: string;
  qualificationId: string;
  observationDate: string;
  location: string;
  activityTitle: string;
  activityDescription: string;
  outcome: 'competent' | 'not_yet_competent' | 'deferred';
  feedbackStrengths?: string;
  feedbackAreasForDevelopment?: string;
  ksbsObserved?: string[];
}

// Hook for assessor review and sign-off actions
export function useAssessorActions() {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Start reviewing a submission
  const startReview = useMutation({
    mutationFn: async (submissionId: string) => {
      const { error } = await supabase
        .from('portfolio_submissions')
        .update({
          status: 'under_review',
          reviewed_by: user?.id,
          review_started_at: new Date().toISOString()
        })
        .eq('id', submissionId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['submission-queue'] });
      queryClient.invalidateQueries({ queryKey: ['submission-detail'] });
    }
  });

  // Submit review feedback
  const submitFeedback = useMutation({
    mutationFn: async (data: ReviewFeedback) => {
      const updates: any = {
        status: data.grade === 'refer' || data.grade === 'not_yet_competent'
          ? 'feedback_given'
          : 'approved',
        reviewed_at: new Date().toISOString(),
        reviewed_by: user?.id,
        assessor_feedback: data.feedback,
        grade: data.grade,
        strengths_noted: data.strengthsNoted,
        areas_for_improvement: data.areasForImprovement,
        action_required: data.actionRequired
      };

      const { error } = await supabase
        .from('portfolio_submissions')
        .update(updates)
        .eq('id', data.submissionId);

      if (error) throw error;

      // Create notification for student
      await supabase.from('notifications').insert({
        user_id: (await supabase
          .from('portfolio_submissions')
          .select('user_id')
          .eq('id', data.submissionId)
          .single()).data?.user_id,
        title: 'Portfolio Feedback Received',
        message: `Your assessor has reviewed your portfolio submission. Grade: ${data.grade || 'Pending'}`,
        type: 'portfolio',
        link: `/apprentice/ojt`
      });
    },
    onSuccess: () => {
      toast({
        title: 'Feedback Submitted',
        description: 'Your review feedback has been saved and the student notified.'
      });
      queryClient.invalidateQueries({ queryKey: ['submission-queue'] });
      queryClient.invalidateQueries({ queryKey: ['submission-detail'] });
      queryClient.invalidateQueries({ queryKey: ['college-portfolios'] });
    },
    onError: (error: any) => {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive'
      });
    }
  });

  // Sign off a submission
  const signOff = useMutation({
    mutationFn: async (data: SignOffData) => {
      // Update submission status
      const { error: subError } = await supabase
        .from('portfolio_submissions')
        .update({
          status: 'signed_off',
          signed_off_at: new Date().toISOString(),
          signed_off_by: user?.id
        })
        .eq('id', data.submissionId);

      if (subError) throw subError;

      // Create signature record
      const { data: submission } = await supabase
        .from('portfolio_submissions')
        .select('user_id, category_id, qualification_id')
        .eq('id', data.submissionId)
        .single();

      if (submission) {
        const { error: sigError } = await supabase
          .from('portfolio_signatures')
          .insert({
            user_id: submission.user_id,
            submission_id: data.submissionId,
            signed_by: user?.id,
            signature_type: 'assessor_sign_off',
            signature_data: data.signatureData,
            notes: data.confirmationNotes
          });

        if (sigError) throw sigError;

        // Update coverage matrix
        await supabase
          .from('unit_coverage_matrix')
          .update({
            status: 'complete',
            verified_at: new Date().toISOString(),
            verified_by: user?.id
          })
          .eq('user_id', submission.user_id)
          .eq('category_id', submission.category_id)
          .eq('qualification_id', submission.qualification_id);
      }
    },
    onSuccess: () => {
      toast({
        title: 'Signed Off',
        description: 'Portfolio category has been signed off successfully.'
      });
      queryClient.invalidateQueries({ queryKey: ['submission-queue'] });
      queryClient.invalidateQueries({ queryKey: ['submission-detail'] });
      queryClient.invalidateQueries({ queryKey: ['college-portfolios'] });
      queryClient.invalidateQueries({ queryKey: ['student-portfolio-detail'] });
    },
    onError: (error: any) => {
      toast({
        title: 'Sign-off Failed',
        description: error.message,
        variant: 'destructive'
      });
    }
  });

  // Request more evidence
  const requestMoreEvidence = useMutation({
    mutationFn: async ({
      submissionId,
      request
    }: {
      submissionId: string;
      request: string;
    }) => {
      const { error } = await supabase
        .from('portfolio_submissions')
        .update({
          status: 'feedback_given',
          reviewed_at: new Date().toISOString(),
          reviewed_by: user?.id,
          assessor_feedback: request,
          action_required: 'Additional evidence required'
        })
        .eq('id', submissionId);

      if (error) throw error;
    },
    onSuccess: () => {
      toast({
        title: 'Request Sent',
        description: 'Student has been notified to provide additional evidence.'
      });
      queryClient.invalidateQueries({ queryKey: ['submission-queue'] });
    }
  });

  // Create assessor observation
  const createObservation = useMutation({
    mutationFn: async (data: ObservationData) => {
      const { error } = await supabase
        .from('assessor_observations')
        .insert({
          user_id: data.studentId,
          qualification_id: data.qualificationId,
          assessor_id: user?.id,
          observation_date: data.observationDate,
          location: data.location,
          activity_title: data.activityTitle,
          activity_description: data.activityDescription,
          outcome: data.outcome,
          feedback_strengths: data.feedbackStrengths,
          feedback_areas_for_development: data.feedbackAreasForDevelopment,
          ksbs_observed: data.ksbsObserved,
          assessor_signed: true,
          student_acknowledged: false
        });

      if (error) throw error;
    },
    onSuccess: () => {
      toast({
        title: 'Observation Recorded',
        description: 'Direct observation has been saved to the student portfolio.'
      });
      queryClient.invalidateQueries({ queryKey: ['student-portfolio-detail'] });
    },
    onError: (error: any) => {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive'
      });
    }
  });

  // Verify KSB mapping
  const verifyKSBMapping = useMutation({
    mutationFn: async ({
      mappingId,
      coverageLevel
    }: {
      mappingId: string;
      coverageLevel: 'partial' | 'full';
    }) => {
      const { error } = await supabase
        .from('evidence_ksb_mapping')
        .update({
          mapping_status: 'verified',
          coverage_level: coverageLevel,
          verified_by: user?.id,
          verified_at: new Date().toISOString()
        })
        .eq('id', mappingId);

      if (error) throw error;
    },
    onSuccess: () => {
      toast({
        title: 'KSB Verified',
        description: 'KSB mapping has been verified.'
      });
      queryClient.invalidateQueries({ queryKey: ['student-portfolio-detail'] });
    }
  });

  return {
    startReview,
    submitFeedback,
    signOff,
    requestMoreEvidence,
    createObservation,
    verifyKSBMapping
  };
}

export default useAssessorActions;
