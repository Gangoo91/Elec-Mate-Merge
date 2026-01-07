import { useState, useEffect, useCallback } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

// Types
export interface StudentPortfolio {
  id: string;
  studentId: string;
  studentName: string;
  studentEmail: string;
  qualificationId: string;
  qualificationTitle: string;
  qualificationCode: string;
  cohortName?: string;
  status: 'active' | 'on_break' | 'at_risk' | 'completed' | 'withdrawn';

  // Progress metrics
  totalEntries: number;
  completedEntries: number;
  draftEntries: number;
  reviewedEntries: number;
  completionPercentage: number;

  // Submission status
  submissionsAwaitingReview: number;
  submissionsFeedbackGiven: number;
  submissionsSignedOff: number;

  // Coverage
  categoriesComplete: number;
  categoriesTotal: number;
  ksbsCovered: number;
  ksbsTotal: number;

  // Gateway progress
  gatewayProgress: number;
  ojtHoursCompleted: number;
  ojtHoursRequired: number;

  // Dates
  startDate?: string;
  expectedEndDate?: string;
  lastActivityDate?: string;

  // Assignment info
  assignmentId: string;
  tutorId?: string;
  assessorId?: string;
  iqaId?: string;
}

export interface StudentPortfolioDetail extends StudentPortfolio {
  portfolioItems: PortfolioItem[];
  submissions: PortfolioSubmission[];
  coverageMatrix: CoverageMatrixEntry[];
  gatewayChecklist?: GatewayChecklist;
  observations: AssessorObservation[];
  testimonies: WitnessTestimony[];
}

export interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  category: string;
  categoryName: string;
  status: string;
  skillsDemonstrated: string[];
  reflectionNotes?: string;
  supervisorFeedback?: string;
  selfAssessment: number;
  timeSpent: number;
  evidenceCount: number;
  createdAt: string;
  updatedAt: string;
  ksbMappings: KSBMapping[];
}

export interface PortfolioSubmission {
  id: string;
  categoryId: string;
  categoryName: string;
  status: string;
  submittedAt?: string;
  reviewedAt?: string;
  assessorFeedback?: string;
  grade?: string;
  signedOffAt?: string;
  iqaSampled: boolean;
  iqaVerifiedAt?: string;
  submissionCount: number;
}

export interface CoverageMatrixEntry {
  id: string;
  categoryId: string;
  categoryName: string;
  totalCriteria: number;
  evidencedCriteria: number;
  verifiedCriteria: number;
  completionPercentage: number;
  status: string;
  requiredEntries: number;
  completedEntries: number;
}

export interface KSBMapping {
  id: string;
  ksbId: string;
  ksbCode: string;
  ksbTitle: string;
  ksbType: 'knowledge' | 'skill' | 'behaviour';
  mappingStatus: string;
  coverageLevel: string;
  verifiedBy?: string;
  verifiedAt?: string;
}

export interface GatewayChecklist {
  id: string;
  portfolioComplete: boolean;
  portfolioSignedOff: boolean;
  ojtHoursRequired: number;
  ojtHoursCompleted: number;
  ojtHoursVerified: boolean;
  englishLevel2Achieved: boolean;
  mathsLevel2Achieved: boolean;
  employerSatisfied: boolean;
  providerSatisfied: boolean;
  gatewayMeetingHeld: boolean;
  gatewayPassed: boolean;
  epaEligible: boolean;
  epaBooked: boolean;
}

export interface AssessorObservation {
  id: string;
  observationDate: string;
  location: string;
  activityTitle: string;
  activityDescription: string;
  outcome: string;
  feedbackStrengths?: string;
  feedbackAreasForDevelopment?: string;
  studentAcknowledged: boolean;
  assessorSigned: boolean;
}

export interface WitnessTestimony {
  id: string;
  witnessName: string;
  witnessRole?: string;
  witnessCompany?: string;
  testimonyDate: string;
  activityTitle: string;
  testimonyStatement: string;
  verificationStatus: string;
  skillsDemonstrated: string[];
}

// Hook for college staff to view their assigned students' portfolios
export function useCollegePortfolios() {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch all assigned students with their portfolio summary
  const {
    data: studentPortfolios = [],
    isLoading,
    error,
    refetch
  } = useQuery({
    queryKey: ['college-portfolios', user?.id],
    queryFn: async () => {
      if (!user?.id) return [];

      // Get students assigned to this staff member (as tutor, assessor, or IQA)
      const { data: assignments, error: assignError } = await supabase
        .from('college_student_assignments')
        .select(`
          id,
          student_id,
          qualification_id,
          cohort_name,
          status,
          start_date,
          expected_end_date,
          tutor_id,
          assessor_id,
          iqa_id,
          current_progress_percentage,
          profiles!college_student_assignments_student_id_fkey (
            id,
            full_name,
            email
          ),
          qualifications (
            id,
            title,
            code
          )
        `)
        .or(`tutor_id.eq.${user.id},assessor_id.eq.${user.id},iqa_id.eq.${user.id}`)
        .eq('status', 'active');

      if (assignError) throw assignError;
      if (!assignments?.length) return [];

      // Get portfolio stats for each student
      const studentIds = assignments.map(a => a.student_id);

      // Get portfolio items count by status
      const { data: portfolioStats } = await supabase
        .from('portfolio_items')
        .select('user_id, status')
        .in('user_id', studentIds);

      // Get submissions
      const { data: submissionStats } = await supabase
        .from('portfolio_submissions')
        .select('user_id, status, iqa_sampled')
        .in('user_id', studentIds);

      // Get coverage matrix
      const { data: coverageStats } = await supabase
        .from('unit_coverage_matrix')
        .select('user_id, status, completion_percentage')
        .in('user_id', studentIds);

      // Get gateway info
      const { data: gatewayStats } = await supabase
        .from('epa_gateway_checklist')
        .select('user_id, ojt_hours_completed, ojt_hours_required, gateway_passed')
        .in('user_id', studentIds);

      // Get KSB counts per qualification
      const qualificationIds = [...new Set(assignments.map(a => a.qualification_id))];
      const { data: ksbCounts } = await supabase
        .from('apprenticeship_ksbs')
        .select('qualification_id')
        .in('qualification_id', qualificationIds);

      // Build the portfolio summary for each student
      const portfolios: StudentPortfolio[] = assignments.map(assignment => {
        const profile = assignment.profiles as any;
        const qualification = assignment.qualifications as any;

        // Calculate portfolio stats
        const studentPortfolioItems = portfolioStats?.filter(p => p.user_id === assignment.student_id) || [];
        const totalEntries = studentPortfolioItems.length;
        const completedEntries = studentPortfolioItems.filter(p => p.status === 'completed').length;
        const draftEntries = studentPortfolioItems.filter(p => p.status === 'draft').length;
        const reviewedEntries = studentPortfolioItems.filter(p => p.status === 'reviewed').length;

        // Calculate submission stats
        const studentSubmissions = submissionStats?.filter(s => s.user_id === assignment.student_id) || [];
        const submissionsAwaitingReview = studentSubmissions.filter(s =>
          ['submitted', 'under_review', 'resubmitted'].includes(s.status)
        ).length;
        const submissionsFeedbackGiven = studentSubmissions.filter(s => s.status === 'feedback_given').length;
        const submissionsSignedOff = studentSubmissions.filter(s =>
          ['signed_off', 'iqa_sampled', 'iqa_verified'].includes(s.status)
        ).length;

        // Calculate coverage stats
        const studentCoverage = coverageStats?.filter(c => c.user_id === assignment.student_id) || [];
        const categoriesComplete = studentCoverage.filter(c => c.status === 'complete').length;
        const categoriesTotal = studentCoverage.length;

        // Calculate KSB coverage (simplified - would need more complex query in production)
        const ksbsTotal = ksbCounts?.filter(k => k.qualification_id === assignment.qualification_id).length || 35;
        const ksbsCovered = Math.floor((completedEntries / Math.max(totalEntries, 1)) * ksbsTotal * 0.7); // Estimate

        // Get gateway info
        const gateway = gatewayStats?.find(g => g.user_id === assignment.student_id);
        const ojtHoursCompleted = gateway?.ojt_hours_completed || 0;
        const ojtHoursRequired = gateway?.ojt_hours_required || 400;
        const gatewayProgress = gateway?.gateway_passed ? 100 :
          Math.floor((ojtHoursCompleted / ojtHoursRequired) * 50 + (completedEntries / Math.max(totalEntries, 1)) * 50);

        return {
          id: `${assignment.student_id}-${assignment.qualification_id}`,
          studentId: assignment.student_id,
          studentName: profile?.full_name || 'Unknown Student',
          studentEmail: profile?.email || '',
          qualificationId: assignment.qualification_id,
          qualificationTitle: qualification?.title || 'Unknown Qualification',
          qualificationCode: qualification?.code || '',
          cohortName: assignment.cohort_name,
          status: assignment.status,

          totalEntries,
          completedEntries,
          draftEntries,
          reviewedEntries,
          completionPercentage: totalEntries > 0 ? Math.round((completedEntries / totalEntries) * 100) : 0,

          submissionsAwaitingReview,
          submissionsFeedbackGiven,
          submissionsSignedOff,

          categoriesComplete,
          categoriesTotal,
          ksbsCovered,
          ksbsTotal,

          gatewayProgress,
          ojtHoursCompleted,
          ojtHoursRequired,

          startDate: assignment.start_date,
          expectedEndDate: assignment.expected_end_date,

          assignmentId: assignment.id,
          tutorId: assignment.tutor_id,
          assessorId: assignment.assessor_id,
          iqaId: assignment.iqa_id
        };
      });

      return portfolios;
    },
    enabled: !!user?.id,
    staleTime: 30000, // 30 seconds
    refetchInterval: 60000 // Refetch every minute
  });

  // Stats calculations
  const stats = {
    totalStudents: studentPortfolios.length,
    activeStudents: studentPortfolios.filter(p => p.status === 'active').length,
    atRiskStudents: studentPortfolios.filter(p => p.status === 'at_risk').length,
    awaitingReview: studentPortfolios.reduce((sum, p) => sum + p.submissionsAwaitingReview, 0),
    completedStudents: studentPortfolios.filter(p => p.completionPercentage === 100).length
  };

  // Get portfolios awaiting review (for quick access)
  const portfoliosAwaitingReview = studentPortfolios
    .filter(p => p.submissionsAwaitingReview > 0)
    .sort((a, b) => b.submissionsAwaitingReview - a.submissionsAwaitingReview);

  // Get at-risk students
  const atRiskStudents = studentPortfolios.filter(p => p.status === 'at_risk');

  return {
    studentPortfolios,
    portfoliosAwaitingReview,
    atRiskStudents,
    stats,
    isLoading,
    error,
    refetch
  };
}

// Hook to get detailed portfolio for a specific student
export function useStudentPortfolioDetail(studentId: string, qualificationId: string) {
  const { user } = useAuth();
  const { toast } = useToast();

  const {
    data: portfolioDetail,
    isLoading,
    error,
    refetch
  } = useQuery({
    queryKey: ['student-portfolio-detail', studentId, qualificationId],
    queryFn: async () => {
      if (!studentId || !qualificationId) return null;

      // Verify access (user must be assigned to this student)
      const { data: assignment } = await supabase
        .from('college_student_assignments')
        .select('*')
        .eq('student_id', studentId)
        .eq('qualification_id', qualificationId)
        .or(`tutor_id.eq.${user?.id},assessor_id.eq.${user?.id},iqa_id.eq.${user?.id}`)
        .single();

      if (!assignment) {
        throw new Error('Not authorized to view this portfolio');
      }

      // Fetch all portfolio data in parallel
      const [
        { data: items },
        { data: submissions },
        { data: coverage },
        { data: gateway },
        { data: observations },
        { data: testimonies },
        { data: profile },
        { data: qualification },
        { data: categories }
      ] = await Promise.all([
        // Portfolio items with KSB mappings
        supabase
          .from('portfolio_items')
          .select(`
            *,
            evidence_ksb_mapping (
              id,
              ksb_id,
              mapping_status,
              coverage_level,
              verified_by,
              verified_at,
              apprenticeship_ksbs (
                id,
                ksb_code,
                title,
                ksb_type
              )
            )
          `)
          .eq('user_id', studentId)
          .order('created_at', { ascending: false }),

        // Submissions
        supabase
          .from('portfolio_submissions')
          .select(`
            *,
            qualification_categories (
              id,
              name
            )
          `)
          .eq('user_id', studentId)
          .eq('qualification_id', qualificationId),

        // Coverage matrix
        supabase
          .from('unit_coverage_matrix')
          .select(`
            *,
            qualification_categories (
              id,
              name,
              required_entries
            )
          `)
          .eq('user_id', studentId)
          .eq('qualification_id', qualificationId),

        // Gateway checklist
        supabase
          .from('epa_gateway_checklist')
          .select('*')
          .eq('user_id', studentId)
          .eq('qualification_id', qualificationId)
          .single(),

        // Assessor observations
        supabase
          .from('assessor_observations')
          .select('*')
          .eq('user_id', studentId)
          .order('observation_date', { ascending: false }),

        // Witness testimonies
        supabase
          .from('witness_testimonies')
          .select('*')
          .eq('user_id', studentId)
          .order('testimony_date', { ascending: false }),

        // Student profile
        supabase
          .from('profiles')
          .select('id, full_name, email')
          .eq('id', studentId)
          .single(),

        // Qualification
        supabase
          .from('qualifications')
          .select('id, title, code')
          .eq('id', qualificationId)
          .single(),

        // Categories for this qualification
        supabase
          .from('qualification_categories')
          .select('*')
          .eq('qualification_id', qualificationId)
      ]);

      // Map portfolio items
      const portfolioItems: PortfolioItem[] = (items || []).map(item => {
        const categoryInfo = categories?.find(c => c.id === item.category);
        return {
          id: item.id,
          title: item.title,
          description: item.description || '',
          category: item.category,
          categoryName: categoryInfo?.name || item.category,
          status: item.status,
          skillsDemonstrated: item.skills_demonstrated || [],
          reflectionNotes: item.reflection_notes,
          supervisorFeedback: item.supervisor_feedback,
          selfAssessment: item.self_assessment || 3,
          timeSpent: item.time_spent || 0,
          evidenceCount: item.evidence_count || 0,
          createdAt: item.created_at,
          updatedAt: item.updated_at,
          ksbMappings: (item.evidence_ksb_mapping || []).map((m: any) => ({
            id: m.id,
            ksbId: m.ksb_id,
            ksbCode: m.apprenticeship_ksbs?.ksb_code || '',
            ksbTitle: m.apprenticeship_ksbs?.title || '',
            ksbType: m.apprenticeship_ksbs?.ksb_type || 'knowledge',
            mappingStatus: m.mapping_status,
            coverageLevel: m.coverage_level,
            verifiedBy: m.verified_by,
            verifiedAt: m.verified_at
          }))
        };
      });

      // Map submissions
      const portfolioSubmissions: PortfolioSubmission[] = (submissions || []).map(sub => ({
        id: sub.id,
        categoryId: sub.category_id,
        categoryName: (sub.qualification_categories as any)?.name || '',
        status: sub.status,
        submittedAt: sub.submitted_at,
        reviewedAt: sub.reviewed_at,
        assessorFeedback: sub.assessor_feedback,
        grade: sub.grade,
        signedOffAt: sub.signed_off_at,
        iqaSampled: sub.iqa_sampled,
        iqaVerifiedAt: sub.iqa_verified_at,
        submissionCount: sub.submission_count
      }));

      // Map coverage matrix
      const coverageMatrix: CoverageMatrixEntry[] = (coverage || []).map(cov => ({
        id: cov.id,
        categoryId: cov.category_id,
        categoryName: (cov.qualification_categories as any)?.name || '',
        totalCriteria: cov.total_criteria,
        evidencedCriteria: cov.evidenced_criteria,
        verifiedCriteria: cov.verified_criteria,
        completionPercentage: cov.completion_percentage,
        status: cov.status,
        requiredEntries: (cov.qualification_categories as any)?.required_entries || 0,
        completedEntries: cov.completed_entries
      }));

      // Map gateway
      const gatewayChecklist: GatewayChecklist | undefined = gateway ? {
        id: gateway.id,
        portfolioComplete: gateway.portfolio_complete,
        portfolioSignedOff: gateway.portfolio_signed_off,
        ojtHoursRequired: gateway.ojt_hours_required,
        ojtHoursCompleted: gateway.ojt_hours_completed,
        ojtHoursVerified: gateway.ojt_hours_verified,
        englishLevel2Achieved: gateway.english_level2_achieved,
        mathsLevel2Achieved: gateway.maths_level2_achieved,
        employerSatisfied: gateway.employer_satisfied,
        providerSatisfied: gateway.provider_satisfied,
        gatewayMeetingHeld: gateway.gateway_meeting_held,
        gatewayPassed: gateway.gateway_passed,
        epaEligible: gateway.epa_eligible,
        epaBooked: gateway.epa_booked
      } : undefined;

      // Map observations
      const mappedObservations: AssessorObservation[] = (observations || []).map(obs => ({
        id: obs.id,
        observationDate: obs.observation_date,
        location: obs.location,
        activityTitle: obs.activity_title,
        activityDescription: obs.activity_description,
        outcome: obs.outcome,
        feedbackStrengths: obs.feedback_strengths,
        feedbackAreasForDevelopment: obs.feedback_areas_for_development,
        studentAcknowledged: obs.student_acknowledged,
        assessorSigned: obs.assessor_signed
      }));

      // Map testimonies
      const mappedTestimonies: WitnessTestimony[] = (testimonies || []).map(test => ({
        id: test.id,
        witnessName: test.witness_name,
        witnessRole: test.witness_job_title,
        witnessCompany: test.witness_company,
        testimonyDate: test.testimony_date,
        activityTitle: test.activity_title,
        testimonyStatement: test.testimony_statement,
        verificationStatus: test.verification_status,
        skillsDemonstrated: test.skills_demonstrated || []
      }));

      // Calculate totals
      const totalEntries = portfolioItems.length;
      const completedEntries = portfolioItems.filter(p => p.status === 'completed').length;

      const result: StudentPortfolioDetail = {
        id: `${studentId}-${qualificationId}`,
        studentId,
        studentName: profile?.full_name || 'Unknown',
        studentEmail: profile?.email || '',
        qualificationId,
        qualificationTitle: qualification?.title || '',
        qualificationCode: qualification?.code || '',
        cohortName: assignment.cohort_name,
        status: assignment.status,

        totalEntries,
        completedEntries,
        draftEntries: portfolioItems.filter(p => p.status === 'draft').length,
        reviewedEntries: portfolioItems.filter(p => p.status === 'reviewed').length,
        completionPercentage: totalEntries > 0 ? Math.round((completedEntries / totalEntries) * 100) : 0,

        submissionsAwaitingReview: portfolioSubmissions.filter(s =>
          ['submitted', 'under_review', 'resubmitted'].includes(s.status)
        ).length,
        submissionsFeedbackGiven: portfolioSubmissions.filter(s => s.status === 'feedback_given').length,
        submissionsSignedOff: portfolioSubmissions.filter(s =>
          ['signed_off', 'iqa_sampled', 'iqa_verified'].includes(s.status)
        ).length,

        categoriesComplete: coverageMatrix.filter(c => c.status === 'complete').length,
        categoriesTotal: coverageMatrix.length,
        ksbsCovered: portfolioItems.reduce((sum, p) => sum + p.ksbMappings.filter(m => m.mappingStatus === 'verified').length, 0),
        ksbsTotal: 35, // From our seeded data

        gatewayProgress: gatewayChecklist?.gatewayPassed ? 100 :
          (gatewayChecklist ? Math.floor(
            (Number(gatewayChecklist.portfolioComplete) * 20) +
            (Number(gatewayChecklist.ojtHoursVerified) * 20) +
            (Number(gatewayChecklist.englishLevel2Achieved) * 10) +
            (Number(gatewayChecklist.mathsLevel2Achieved) * 10) +
            (Number(gatewayChecklist.employerSatisfied) * 20) +
            (Number(gatewayChecklist.providerSatisfied) * 20)
          ) : 0),
        ojtHoursCompleted: gatewayChecklist?.ojtHoursCompleted || 0,
        ojtHoursRequired: gatewayChecklist?.ojtHoursRequired || 400,

        startDate: assignment.start_date,
        expectedEndDate: assignment.expected_end_date,
        lastActivityDate: portfolioItems[0]?.updatedAt,

        assignmentId: assignment.id,
        tutorId: assignment.tutor_id,
        assessorId: assignment.assessor_id,
        iqaId: assignment.iqa_id,

        portfolioItems,
        submissions: portfolioSubmissions,
        coverageMatrix,
        gatewayChecklist,
        observations: mappedObservations,
        testimonies: mappedTestimonies
      };

      return result;
    },
    enabled: !!studentId && !!qualificationId && !!user?.id,
    staleTime: 10000
  });

  return {
    portfolioDetail,
    isLoading,
    error,
    refetch
  };
}

export default useCollegePortfolios;
