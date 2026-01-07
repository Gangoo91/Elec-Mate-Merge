import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

// Types
export interface GatewayStatus {
  studentId: string;
  studentName: string;
  qualificationId: string;
  qualificationTitle: string;

  // Portfolio
  portfolioComplete: boolean;
  portfolioSignedOff: boolean;
  portfolioSignedOffAt?: string;

  // OJT Hours
  ojtHoursRequired: number;
  ojtHoursCompleted: number;
  ojtHoursVerified: boolean;
  ojtHoursVerifiedAt?: string;

  // Functional Skills
  englishLevel2Achieved: boolean;
  englishLevel2Date?: string;
  mathsLevel2Achieved: boolean;
  mathsLevel2Date?: string;

  // Stakeholder Sign-off
  employerSatisfied: boolean;
  employerSignedAt?: string;
  employerSignedBy?: string;
  providerSatisfied: boolean;
  providerSignedAt?: string;
  providerSignedBy?: string;

  // Gateway Meeting
  gatewayMeetingHeld: boolean;
  gatewayMeetingDate?: string;
  gatewayNotes?: string;

  // Final Status
  gatewayPassed: boolean;
  gatewayPassedDate?: string;
  epaEligible: boolean;
  epaBookedDate?: string;

  // Progress
  overallProgress: number;
  readinessStatus: 'not_ready' | 'nearly_ready' | 'ready' | 'gateway_passed';
}

export interface GatewayChecklistItem {
  key: string;
  label: string;
  description: string;
  completed: boolean;
  completedDate?: string;
  required: boolean;
}

// Hook for EPA Gateway management
export function useEPAGateway(studentId?: string, qualificationId?: string) {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Get gateway status for a specific student or all assigned students
  const {
    data: gatewayStatus,
    isLoading,
    error,
    refetch
  } = useQuery({
    queryKey: ['epa-gateway', studentId, qualificationId, user?.id],
    queryFn: async () => {
      if (!user?.id) return null;

      if (studentId && qualificationId) {
        // Get specific student gateway
        return await fetchSingleGateway(studentId, qualificationId);
      } else {
        // Get all assigned students' gateways
        return await fetchAllGateways();
      }
    },
    enabled: !!user?.id
  });

  async function fetchSingleGateway(studentId: string, qualificationId: string): Promise<GatewayStatus | null> {
    const { data: gateway, error } = await supabase
      .from('epa_gateway_checklist')
      .select('*')
      .eq('user_id', studentId)
      .eq('qualification_id', qualificationId)
      .single();

    if (error && error.code !== 'PGRST116') throw error;

    // Get student profile
    const { data: profile } = await supabase
      .from('profiles')
      .select('id, full_name')
      .eq('id', studentId)
      .single();

    // Get qualification
    const { data: qualification } = await supabase
      .from('qualifications')
      .select('id, title')
      .eq('id', qualificationId)
      .single();

    // Calculate progress
    const checklistItems = getChecklistItems(gateway);
    const completedItems = checklistItems.filter(item => item.completed && item.required);
    const requiredItems = checklistItems.filter(item => item.required);
    const progress = requiredItems.length > 0
      ? Math.round((completedItems.length / requiredItems.length) * 100)
      : 0;

    // Determine readiness status
    let readinessStatus: GatewayStatus['readinessStatus'] = 'not_ready';
    if (gateway?.gateway_passed) readinessStatus = 'gateway_passed';
    else if (progress >= 100) readinessStatus = 'ready';
    else if (progress >= 75) readinessStatus = 'nearly_ready';

    return {
      studentId,
      studentName: profile?.full_name || 'Unknown',
      qualificationId,
      qualificationTitle: qualification?.title || '',

      portfolioComplete: gateway?.portfolio_complete || false,
      portfolioSignedOff: gateway?.portfolio_signed_off || false,
      portfolioSignedOffAt: gateway?.portfolio_signed_off_at,

      ojtHoursRequired: gateway?.ojt_hours_required || 400,
      ojtHoursCompleted: gateway?.ojt_hours_completed || 0,
      ojtHoursVerified: gateway?.ojt_hours_verified || false,
      ojtHoursVerifiedAt: gateway?.ojt_hours_verified_at,

      englishLevel2Achieved: gateway?.english_level2_achieved || false,
      englishLevel2Date: gateway?.english_level2_date,
      mathsLevel2Achieved: gateway?.maths_level2_achieved || false,
      mathsLevel2Date: gateway?.maths_level2_date,

      employerSatisfied: gateway?.employer_satisfied || false,
      employerSignedAt: gateway?.employer_signed_at,
      employerSignedBy: gateway?.employer_signed_by,
      providerSatisfied: gateway?.provider_satisfied || false,
      providerSignedAt: gateway?.provider_signed_at,
      providerSignedBy: gateway?.provider_signed_by,

      gatewayMeetingHeld: gateway?.gateway_meeting_held || false,
      gatewayMeetingDate: gateway?.gateway_meeting_date,
      gatewayNotes: gateway?.gateway_notes,

      gatewayPassed: gateway?.gateway_passed || false,
      gatewayPassedDate: gateway?.gateway_passed_date,
      epaEligible: gateway?.epa_eligible || false,
      epaBookedDate: gateway?.epa_booked_date,

      overallProgress: progress,
      readinessStatus
    };
  }

  async function fetchAllGateways(): Promise<GatewayStatus[]> {
    // Get assigned students
    const { data: assignments } = await supabase
      .from('college_student_assignments')
      .select('student_id, qualification_id')
      .or(`tutor_id.eq.${user?.id},assessor_id.eq.${user?.id},iqa_id.eq.${user?.id}`)
      .eq('status', 'active');

    if (!assignments?.length) return [];

    const gateways: GatewayStatus[] = [];
    for (const assignment of assignments) {
      const gateway = await fetchSingleGateway(assignment.student_id, assignment.qualification_id);
      if (gateway) gateways.push(gateway);
    }

    return gateways;
  }

  function getChecklistItems(gateway: any): GatewayChecklistItem[] {
    return [
      {
        key: 'portfolio_complete',
        label: 'Portfolio Complete',
        description: 'All required portfolio evidence has been submitted',
        completed: gateway?.portfolio_complete || false,
        completedDate: gateway?.portfolio_signed_off_at,
        required: true
      },
      {
        key: 'portfolio_signed_off',
        label: 'Portfolio Signed Off',
        description: 'Portfolio has been signed off by assessor',
        completed: gateway?.portfolio_signed_off || false,
        completedDate: gateway?.portfolio_signed_off_at,
        required: true
      },
      {
        key: 'ojt_hours_verified',
        label: 'OJT Hours Verified',
        description: `${gateway?.ojt_hours_completed || 0}/${gateway?.ojt_hours_required || 400} hours completed and verified`,
        completed: gateway?.ojt_hours_verified || false,
        completedDate: gateway?.ojt_hours_verified_at,
        required: true
      },
      {
        key: 'english_level2',
        label: 'English Level 2',
        description: 'English functional skills Level 2 achieved',
        completed: gateway?.english_level2_achieved || false,
        completedDate: gateway?.english_level2_date,
        required: true
      },
      {
        key: 'maths_level2',
        label: 'Maths Level 2',
        description: 'Maths functional skills Level 2 achieved',
        completed: gateway?.maths_level2_achieved || false,
        completedDate: gateway?.maths_level2_date,
        required: true
      },
      {
        key: 'employer_satisfied',
        label: 'Employer Sign-off',
        description: 'Employer confirms apprentice is ready for EPA',
        completed: gateway?.employer_satisfied || false,
        completedDate: gateway?.employer_signed_at,
        required: true
      },
      {
        key: 'provider_satisfied',
        label: 'Provider Sign-off',
        description: 'Training provider confirms apprentice is ready for EPA',
        completed: gateway?.provider_satisfied || false,
        completedDate: gateway?.provider_signed_at,
        required: true
      },
      {
        key: 'gateway_meeting',
        label: 'Gateway Meeting',
        description: 'Gateway meeting held with all parties',
        completed: gateway?.gateway_meeting_held || false,
        completedDate: gateway?.gateway_meeting_date,
        required: true
      }
    ];
  }

  // Update gateway checklist item
  const updateChecklistItem = useMutation({
    mutationFn: async ({
      studentId,
      qualificationId,
      field,
      value,
      date
    }: {
      studentId: string;
      qualificationId: string;
      field: string;
      value: boolean;
      date?: string;
    }) => {
      // Check if record exists
      const { data: existing } = await supabase
        .from('epa_gateway_checklist')
        .select('id')
        .eq('user_id', studentId)
        .eq('qualification_id', qualificationId)
        .single();

      const updates: any = {
        [field]: value
      };

      // Add date field if applicable
      const dateFieldMap: Record<string, string> = {
        'english_level2_achieved': 'english_level2_date',
        'maths_level2_achieved': 'maths_level2_date',
        'employer_satisfied': 'employer_signed_at',
        'provider_satisfied': 'provider_signed_at',
        'gateway_meeting_held': 'gateway_meeting_date',
        'ojt_hours_verified': 'ojt_hours_verified_at',
        'portfolio_signed_off': 'portfolio_signed_off_at'
      };

      if (dateFieldMap[field] && value) {
        updates[dateFieldMap[field]] = date || new Date().toISOString();
      }

      // Add signed_by for provider/employer
      if (field === 'provider_satisfied' && value) {
        updates['provider_signed_by'] = user?.id;
      }

      if (existing) {
        const { error } = await supabase
          .from('epa_gateway_checklist')
          .update(updates)
          .eq('id', existing.id);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('epa_gateway_checklist')
          .insert({
            user_id: studentId,
            qualification_id: qualificationId,
            ...updates
          });

        if (error) throw error;
      }

      // Check if all items complete and auto-update gateway_passed
      await checkGatewayComplete(studentId, qualificationId);
    },
    onSuccess: () => {
      toast({
        title: 'Gateway Updated',
        description: 'Gateway checklist item has been updated.'
      });
      queryClient.invalidateQueries({ queryKey: ['epa-gateway'] });
      queryClient.invalidateQueries({ queryKey: ['college-portfolios'] });
    },
    onError: (error: any) => {
      toast({
        title: 'Update Failed',
        description: error.message,
        variant: 'destructive'
      });
    }
  });

  async function checkGatewayComplete(studentId: string, qualificationId: string) {
    const { data: gateway } = await supabase
      .from('epa_gateway_checklist')
      .select('*')
      .eq('user_id', studentId)
      .eq('qualification_id', qualificationId)
      .single();

    if (!gateway) return;

    const allComplete =
      gateway.portfolio_complete &&
      gateway.portfolio_signed_off &&
      gateway.ojt_hours_verified &&
      gateway.english_level2_achieved &&
      gateway.maths_level2_achieved &&
      gateway.employer_satisfied &&
      gateway.provider_satisfied &&
      gateway.gateway_meeting_held;

    if (allComplete && !gateway.gateway_passed) {
      await supabase
        .from('epa_gateway_checklist')
        .update({
          gateway_passed: true,
          gateway_passed_date: new Date().toISOString(),
          epa_eligible: true
        })
        .eq('id', gateway.id);
    }
  }

  // Update OJT hours
  const updateOJTHours = useMutation({
    mutationFn: async ({
      studentId,
      qualificationId,
      hours
    }: {
      studentId: string;
      qualificationId: string;
      hours: number;
    }) => {
      const { data: existing } = await supabase
        .from('epa_gateway_checklist')
        .select('id, ojt_hours_required')
        .eq('user_id', studentId)
        .eq('qualification_id', qualificationId)
        .single();

      const updates = {
        ojt_hours_completed: hours,
        ojt_hours_verified: hours >= (existing?.ojt_hours_required || 400)
      };

      if (existing) {
        const { error } = await supabase
          .from('epa_gateway_checklist')
          .update(updates)
          .eq('id', existing.id);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('epa_gateway_checklist')
          .insert({
            user_id: studentId,
            qualification_id: qualificationId,
            ojt_hours_required: 400,
            ...updates
          });

        if (error) throw error;
      }
    },
    onSuccess: () => {
      toast({
        title: 'Hours Updated',
        description: 'OJT hours have been updated.'
      });
      queryClient.invalidateQueries({ queryKey: ['epa-gateway'] });
    }
  });

  // Book EPA
  const bookEPA = useMutation({
    mutationFn: async ({
      studentId,
      qualificationId,
      epaDate
    }: {
      studentId: string;
      qualificationId: string;
      epaDate: string;
    }) => {
      const { error } = await supabase
        .from('epa_gateway_checklist')
        .update({
          epa_booked: true,
          epa_booked_date: epaDate
        })
        .eq('user_id', studentId)
        .eq('qualification_id', qualificationId);

      if (error) throw error;
    },
    onSuccess: () => {
      toast({
        title: 'EPA Booked',
        description: 'End Point Assessment has been scheduled.'
      });
      queryClient.invalidateQueries({ queryKey: ['epa-gateway'] });
    }
  });

  // Get checklist items for display
  const checklistItems = gatewayStatus && !Array.isArray(gatewayStatus)
    ? getChecklistItems(gatewayStatus)
    : [];

  return {
    gatewayStatus,
    checklistItems,
    isLoading,
    error,
    refetch,
    updateChecklistItem,
    updateOJTHours,
    bookEPA
  };
}

export default useEPAGateway;
