import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import {
  applySafetyScope,
  firmWriteErrorMessage,
  safetyScopeKey,
  stampSafetyInsert,
  useSafetyScope,
  type FirmRecordFields,
} from '@/components/electrician-tools/site-safety/common/SafetyScope';

export interface COSHHAssessment extends FirmRecordFields {
  id: string;
  user_id: string;
  substance_name: string;
  manufacturer: string | null;
  product_code: string | null;
  location_of_use: string | null;
  task_description: string | null;
  quantity_used: string | null;
  frequency_of_use: string | null;
  ghs_hazards: string[];
  exposure_routes: string[];
  health_effects: string | null;
  oel_value: string | null;
  control_measures: string[];
  ppe_required: string[];
  storage_requirements: string | null;
  spill_procedure: string | null;
  first_aid: string | null;
  disposal_method: string | null;
  monitoring_required: boolean;
  monitoring_details: string | null;
  risk_rating: 'low' | 'medium' | 'high' | 'very-high';
  assessed_by: string;
  assessment_date: string;
  review_date: string;
  assessor_signature: string | null;
  reviewer_signature: string | null;
  reviewer_name: string | null;
  job_id: string | null;
  pdf_url: string | null;
  created_at: string;
  updated_at: string;
}

export type CreateCOSHHInput = Omit<
  COSHHAssessment,
  'id' | 'user_id' | 'created_at' | 'updated_at' | 'pdf_url'
> & {
  photos?: string[];
  /** Firm job (employer_jobs) — shares the assessment with the firm. */
  employer_job_id?: string | null;
};

export function useCOSHHAssessments() {
  // Personal: the user's own assessments. Employer Hub: the firm's (employer_id).
  const scope = useSafetyScope();
  return useQuery({
    queryKey: ['coshh-assessments', ...safetyScopeKey(scope)],
    queryFn: async (): Promise<COSHHAssessment[]> => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data, error } = await applySafetyScope(
        supabase.from('coshh_assessments').select('*'),
        scope,
        user.id
      ).order('created_at', { ascending: false });

      if (error) throw error;
      return data as COSHHAssessment[];
    },
  });
}

export function useCreateCOSHH() {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const scope = useSafetyScope();

  return useMutation({
    mutationFn: async (input: CreateCOSHHInput): Promise<COSHHAssessment> => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('coshh_assessments')
        // Firm scope stamps employer_id; the database checks it either way.
        // employer_* columns are live but not yet in the generated types.
        .insert(stampSafetyInsert({ ...input, user_id: user.id }, scope) as never)
        .select('*')
        .single();

      if (error) throw error;
      return data as COSHHAssessment;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['coshh-assessments'] });
      toast({ title: 'Assessment saved', description: 'COSHH assessment has been saved.' });
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: firmWriteErrorMessage(scope, error),
        variant: 'destructive',
      });
    },
  });
}

export function useUpdateCOSHH() {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const scope = useSafetyScope();

  return useMutation({
    mutationFn: async ({
      id,
      ...input
    }: Partial<CreateCOSHHInput> & { id: string }): Promise<COSHHAssessment> => {
      const { data, error } = await supabase
        .from('coshh_assessments')
        // employer_job_id is live but not yet in the generated types.
        .update(input as never)
        .eq('id', id)
        .select('*')
        .single();

      if (error) throw error;
      return data as COSHHAssessment;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['coshh-assessments'] });
      toast({ title: 'Assessment updated', description: 'COSHH assessment has been updated.' });
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: firmWriteErrorMessage(scope, error),
        variant: 'destructive',
      });
    },
  });
}

export function useDeleteCOSHH() {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const scope = useSafetyScope();

  return useMutation({
    mutationFn: async (id: string): Promise<void> => {
      const { error } = await supabase.from('coshh_assessments').delete().eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['coshh-assessments'] });
      toast({ title: 'Assessment deleted', description: 'COSHH assessment has been removed.' });
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: firmWriteErrorMessage(scope, error),
        variant: 'destructive',
      });
    },
  });
}

export function useCOSHHOverdueReviews() {
  const scope = useSafetyScope();
  return useQuery({
    queryKey: ['coshh-assessments', 'overdue', ...safetyScopeKey(scope)],
    queryFn: async (): Promise<COSHHAssessment[]> => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const today = new Date().toISOString().split('T')[0];

      const { data, error } = await applySafetyScope(
        supabase.from('coshh_assessments').select('*'),
        scope,
        user.id
      )
        .lt('review_date', today)
        .order('review_date', { ascending: true });

      if (error) throw error;
      return data as COSHHAssessment[];
    },
  });
}

export function useCOSHHUpcomingReviews(withinDays = 30) {
  const scope = useSafetyScope();
  return useQuery({
    queryKey: ['coshh-assessments', 'upcoming', withinDays, ...safetyScopeKey(scope)],
    queryFn: async (): Promise<COSHHAssessment[]> => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const today = new Date().toISOString().split('T')[0];
      const futureDate = new Date();
      futureDate.setDate(futureDate.getDate() + withinDays);
      const futureDateStr = futureDate.toISOString().split('T')[0];

      const { data, error } = await applySafetyScope(
        supabase.from('coshh_assessments').select('*'),
        scope,
        user.id
      )
        .gte('review_date', today)
        .lte('review_date', futureDateStr)
        .order('review_date', { ascending: true });

      if (error) throw error;
      return data as COSHHAssessment[];
    },
  });
}
