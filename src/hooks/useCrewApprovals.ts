import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

/**
 * A supervisor's own crew (people who name them as workplace supervisor):
 * their pending timesheets, expenses and leave (ELE-1831). The server only
 * returns and only decides rows for that crew.
 */
export interface CrewTimesheet {
  id: string;
  name: string;
  date: string;
  total_hours: number | null;
  notes: string | null;
}
export interface CrewExpense {
  id: string;
  name: string;
  amount: number;
  category: string | null;
  description: string | null;
  submitted_date: string | null;
}
export interface CrewLeave {
  id: string;
  name: string;
  type: string | null;
  start_date: string;
  end_date: string;
  total_days: number | null;
  half_day: boolean | null;
  reason: string | null;
}
export interface CrewApprovals {
  crew_count: number;
  timesheets: CrewTimesheet[];
  expenses: CrewExpense[];
  leave: CrewLeave[];
}

export type CrewKind = 'timesheet' | 'expense' | 'leave';

export function useCrewApprovals() {
  const { user } = useAuth();
  return useQuery({
    queryKey: ['crew-approvals', user?.id],
    enabled: !!user,
    staleTime: 60 * 1000,
    queryFn: async (): Promise<CrewApprovals> => {
      // Cast: this RPC postdates the last types.ts regeneration.
      const { data, error } = await supabase.rpc('get_crew_approvals' as never);
      if (error) throw error;
      return (
        (data as unknown as CrewApprovals) ?? {
          crew_count: 0,
          timesheets: [],
          expenses: [],
          leave: [],
        }
      );
    },
  });
}

export const crewPendingCount = (c?: CrewApprovals) =>
  c ? c.timesheets.length + c.expenses.length + c.leave.length : 0;

export function useDecideCrewRequest() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (v: { kind: CrewKind; id: string; approve: boolean; reason?: string }) => {
      const { error } = await supabase.rpc(
        'decide_crew_request' as never,
        { p_kind: v.kind, p_id: v.id, p_approve: v.approve, p_reason: v.reason ?? null } as never
      );
      // PostgrestError isn't an Error instance; rethrow so the page can show it.
      if (error) throw new Error(error.message);
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: ['crew-approvals'] }),
  });
}
