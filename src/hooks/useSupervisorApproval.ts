import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export type ApprovalStatus = 'not_required' | 'pending' | 'approved' | 'rejected';

export type ApprovableTable = 'safe_isolation_records' | 'pre_use_checks' | 'permits_to_work';

/** Query key mapping so we invalidate the correct list after approval. */
const QUERY_KEY_MAP: Record<ApprovableTable, string[]> = {
  safe_isolation_records: ['safe-isolation-records'],
  pre_use_checks: ['pre-use-checks'],
  permits_to_work: ['permits-to-work'],
};

export interface ApprovalPayload {
  table: ApprovableTable;
  recordId: string;
  action: 'approved' | 'rejected';
  approverName: string;
  approverSignature?: string;
  comments?: string;
}

export function useApproveRecord() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (payload: ApprovalPayload) => {
      const { data, error } = await supabase
        .from(payload.table)
        .update({
          approval_status: payload.action,
          approved_by: payload.approverName,
          approved_at: new Date().toISOString(),
          approval_comments: payload.comments || null,
          approval_signature: payload.approverSignature || null,
        })
        .eq('id', payload.recordId)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: (_data, variables) => {
      const keys = QUERY_KEY_MAP[variables.table];
      queryClient.invalidateQueries({ queryKey: keys });
      queryClient.invalidateQueries({ queryKey: ['safety-audit-trail'] });

      const verb = variables.action === 'approved' ? 'Approved' : 'Rejected';
      toast({
        title: `Record ${verb}`,
        description: `${verb} by ${variables.approverName}.`,
      });
    },
    onError: (error) => {
      toast({
        title: 'Approval Failed',
        description: error.message,
        variant: 'destructive',
      });
    },
  });
}

/**
 * Request approval — sets the record to pending.
 */
export function useRequestApproval() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ table, recordId }: { table: ApprovableTable; recordId: string }) => {
      const { data, error } = await supabase
        .from(table)
        .update({
          requires_approval: true,
          approval_status: 'pending',
        })
        .eq('id', recordId)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: (_data, variables) => {
      const keys = QUERY_KEY_MAP[variables.table];
      queryClient.invalidateQueries({ queryKey: keys });
      toast({
        title: 'Approval Requested',
        description: 'Record sent for supervisor approval.',
      });
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    },
  });
}
