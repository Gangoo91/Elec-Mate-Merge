/**
 * useDesignedCircuits.ts
 * Hook to fetch user's designed circuits from eic_schedules table
 * These are circuits created from the Circuit Designer that are pending use in EIC
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface DesignedCircuit {
  id: string;
  installation_address: string;
  installation_id: string;
  designer_name: string;
  design_date: string;
  status: 'pending' | 'in-progress' | 'completed' | 'archived';
  certificate_id?: string;
  created_at: string;
  schedule_data: {
    circuits: Array<{
      circuitNumber: string;
      circuitDescription: string;
      liveSize: string;
      cpcSize: string;
      protectiveDeviceType: string;
      protectiveDeviceRating: string;
      r1r2: string;
      zs: string;
      maxZs: string;
    }>;
    supply: {
      voltage: number;
      phases: string;
      earthingSystem: string;
      ze: number;
      pscc: number;
    };
    projectInfo: {
      projectName: string;
      installationType: string;
      clientName: string;
      totalLoad: number;
      diversifiedLoad: number;
    };
    source: string;
    generatedAt: string;
  };
}

export function useDesignedCircuits() {
  return useQuery({
    queryKey: ['designed-circuits'],
    queryFn: async (): Promise<DesignedCircuit[]> => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return [];

      const { data, error } = await supabase
        .from('eic_schedules')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Failed to fetch designed circuits:', error);
        throw error;
      }

      // Filter to only show circuit-designer sourced schedules
      // and parse the schedule_data
      return (data || [])
        .filter(item => {
          const scheduleData = item.schedule_data as any;
          return scheduleData?.source === 'circuit-designer';
        })
        .map(item => ({
          ...item,
          schedule_data: item.schedule_data as DesignedCircuit['schedule_data']
        }));
    }
  });
}

export function useDesignedCircuit(id: string) {
  return useQuery({
    queryKey: ['designed-circuit', id],
    queryFn: async (): Promise<DesignedCircuit | null> => {
      if (!id) return null;

      const { data, error } = await supabase
        .from('eic_schedules')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error('Failed to fetch designed circuit:', error);
        throw error;
      }

      return {
        ...data,
        schedule_data: data.schedule_data as DesignedCircuit['schedule_data']
      };
    },
    enabled: !!id
  });
}

export function useDeleteDesignedCircuit() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('eic_schedules')
        .delete()
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['designed-circuits'] });
    }
  });
}

export function useUpdateDesignedCircuitStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const { error } = await supabase
        .from('eic_schedules')
        .update({ status, updated_at: new Date().toISOString() })
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['designed-circuits'] });
    }
  });
}

/**
 * Link a design to a completed certificate and mark as completed
 */
export function useLinkDesignToCertificate() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ designId, certificateId }: { designId: string; certificateId: string }) => {
      const { error } = await supabase
        .from('eic_schedules')
        .update({
          certificate_id: certificateId,
          status: 'completed',
          updated_at: new Date().toISOString()
        })
        .eq('id', designId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['designed-circuits'] });
    }
  });
}

/**
 * Archive a completed design
 */
export function useArchiveDesign() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (designId: string) => {
      const { error } = await supabase
        .from('eic_schedules')
        .update({
          status: 'archived',
          updated_at: new Date().toISOString()
        })
        .eq('id', designId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['designed-circuits'] });
    }
  });
}
