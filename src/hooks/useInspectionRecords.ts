import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import type { Json } from '@/integrations/supabase/types';

export interface InspectionRecord {
  id: string;
  user_id: string;
  template_id: string;
  template_title: string;
  location: string | null;
  inspector_name: string;
  date: string;
  sections: Json;
  overall_result: 'pass' | 'fail' | 'advisory';
  pass_count: number;
  fail_count: number;
  na_count: number;
  total_items: number;
  additional_notes: string | null;
  pdf_url: string | null;
  photos: string[] | null;
  inspector_signature: string | null;
  inspector_signature_name: string | null;
  created_at: string;
  updated_at: string;
}

export type CreateInspectionRecordInput = Omit<
  InspectionRecord,
  | 'id'
  | 'user_id'
  | 'created_at'
  | 'updated_at'
  | 'pdf_url'
  | 'photos'
  | 'inspector_signature'
  | 'inspector_signature_name'
> & {
  photos?: string[];
  inspector_signature?: string;
  inspector_signature_name?: string;
};

export function useInspectionRecords() {
  return useQuery({
    queryKey: ['inspection-records'],
    queryFn: async (): Promise<InspectionRecord[]> => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('inspection_records')
        .select('*')
        .eq('user_id', user.id)
        .order('date', { ascending: false });

      if (error) throw error;
      return data as InspectionRecord[];
    },
  });
}

export function useCreateInspectionRecord() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (input: CreateInspectionRecordInput): Promise<InspectionRecord> => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('inspection_records')
        .insert({ ...input, user_id: user.id })
        .select('*')
        .single();

      if (error) throw error;
      return data as InspectionRecord;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['inspection-records'] });
      const resultLabel =
        data.overall_result === 'pass'
          ? 'PASS'
          : data.overall_result === 'fail'
            ? 'FAIL'
            : 'ADVISORY';
      toast({
        title: `Inspection completed — ${resultLabel}`,
        description: 'Inspection record has been saved.',
      });
    },
    onError: (error) => {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    },
  });
}

export interface InspectionComparison {
  current: InspectionRecord;
  previous: InspectionRecord | null;
  trend: 'improving' | 'declining' | 'stable' | 'first';
  passRateChange: number;
}

export function useInspectionComparison(templateId: string, location?: string | null) {
  return useQuery({
    queryKey: ['inspection-comparison', templateId, location],
    queryFn: async (): Promise<InspectionComparison | null> => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      let query = supabase
        .from('inspection_records')
        .select('*')
        .eq('user_id', user.id)
        .eq('template_id', templateId)
        .order('date', { ascending: false })
        .limit(2);

      if (location) {
        query = query.eq('location', location);
      }

      const { data, error } = await query;
      if (error) throw error;

      const records = data as InspectionRecord[];
      if (records.length === 0) return null;

      const current = records[0];
      const previous = records.length > 1 ? records[1] : null;

      const currentPassRate =
        current.total_items > 0 ? current.pass_count / current.total_items : 0;
      const previousPassRate =
        previous && previous.total_items > 0
          ? previous.pass_count / previous.total_items
          : 0;

      const passRateChange = previous
        ? Math.round((currentPassRate - previousPassRate) * 100)
        : 0;

      let trend: InspectionComparison['trend'] = 'first';
      if (previous) {
        if (passRateChange > 5) trend = 'improving';
        else if (passRateChange < -5) trend = 'declining';
        else trend = 'stable';
      }

      return { current, previous, trend, passRateChange };
    },
    enabled: !!templateId,
  });
}

export function useDeleteInspectionRecord() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (id: string): Promise<void> => {
      const { error } = await supabase.from('inspection_records').delete().eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['inspection-records'] });
      toast({ title: 'Record deleted', description: 'Inspection record has been removed.' });
    },
    onError: (error) => {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    },
  });
}
