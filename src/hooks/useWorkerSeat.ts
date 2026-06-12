import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

/**
 * E1 seats model: a worker linked to an employer-tier company holds a SEAT —
 * Worker Tools access is covered by the employer's £9.99/seat, no personal
 * subscription needed. Checked via the has_active_worker_seat() definer fn
 * (seat row + employer's tier verified server-side).
 */
export const useWorkerSeat = (userId: string | undefined) => {
  return useQuery({
    queryKey: ['worker-seat', userId],
    queryFn: async (): Promise<boolean> => {
      const { data, error } = await supabase.rpc('has_active_worker_seat');
      if (error) return false;
      return !!data;
    },
    enabled: !!userId,
    staleTime: 5 * 60 * 1000,
  });
};
