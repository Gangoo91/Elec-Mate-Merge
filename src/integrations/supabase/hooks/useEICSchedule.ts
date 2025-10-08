import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../client';
import { MultiCircuitDesign, ProjectInfo, SiteInfo } from '@/lib/eic/scheduleGenerator';

export interface EICScheduleResponse {
  success: boolean;
  schedule: any;
  data: any;
}

export function useGenerateEICSchedule() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      multiCircuitDesign,
      projectInfo,
      siteInfo
    }: {
      multiCircuitDesign: MultiCircuitDesign;
      projectInfo: ProjectInfo;
      siteInfo: SiteInfo;
    }): Promise<EICScheduleResponse> => {
      const { data, error } = await supabase.functions.invoke('generate-eic-schedule', {
        body: {
          multiCircuitDesign,
          projectInfo,
          siteInfo
        }
      });

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['eic-schedules'] });
    }
  });
}

export function useEICSchedules() {
  return useQuery({
    queryKey: ['eic-schedules'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('eic_schedules')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    }
  });
}

export function useEICSchedule(id: string) {
  return useQuery({
    queryKey: ['eic-schedule', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('eic_schedules')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      return data;
    },
    enabled: !!id
  });
}
