import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { getActingEmployerId } from '@/lib/actingEmployer';

/* Kit register history (ELE-1978): one row per PAT test or calibration in
   employer_tool_checks. The newest check of each kind updates the tool's own
   due dates by trigger, so "next due" is still read from the tool. */

export type ToolCheckType = 'pat' | 'calibration';

export interface ToolCheck {
  id: string;
  tool_id: string;
  check_type: ToolCheckType;
  checked_on: string;
  result: 'pass' | 'fail';
  next_due: string | null;
  certificate_ref: string | null;
  notes: string | null;
  recorded_by_name: string | null;
  created_at: string;
}

export function useToolChecks(toolId: string | null | undefined) {
  return useQuery({
    queryKey: ['tool-checks', toolId],
    enabled: !!toolId,
    queryFn: async (): Promise<ToolCheck[]> => {
      // Cast: table postdates the last types.ts regeneration.
      const { data, error } = await supabase
        .from('employer_tool_checks' as never)
        .select('*')
        .eq('tool_id', toolId as string)
        .order('checked_on', { ascending: false })
        .order('created_at', { ascending: false });
      if (error) throw error;
      return (data ?? []) as unknown as ToolCheck[];
    },
  });
}

export function useLogToolCheck() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (input: {
      tool_id: string;
      check_type: ToolCheckType;
      checked_on: string;
      result: 'pass' | 'fail';
      next_due: string | null;
      certificate_ref?: string | null;
      notes?: string | null;
    }) => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error('Not signed in');
      const firm = (await getActingEmployerId(user.id)) ?? user.id;
      const { error } = await supabase.from('employer_tool_checks' as never).insert({
        ...input,
        employer_id: firm,
        next_due: input.result === 'pass' ? input.next_due : null,
        certificate_ref: input.certificate_ref?.trim() || null,
        notes: input.notes?.trim() || null,
      } as never);
      if (error) throw error;
    },
    onSuccess: (_d, input) => {
      qc.invalidateQueries({ queryKey: ['tool-checks', input.tool_id] });
      qc.invalidateQueries({ queryKey: ['company-tools'] });
      toast.success(
        input.result === 'fail'
          ? 'Logged as failed. The item is marked Under repair.'
          : input.check_type === 'pat'
            ? 'PAT test logged'
            : 'Calibration logged'
      );
    },
    onError: () => toast.error('Could not log that check. Try again.'),
  });
}
