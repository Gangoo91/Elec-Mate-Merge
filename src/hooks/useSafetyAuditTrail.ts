import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export type AuditAction =
  | 'created'
  | 'updated'
  | 'status_changed'
  | 'deleted'
  | 'extended'
  | 'closed'
  | 'cancelled'
  | 'approved'
  | 'rejected';

export type AuditRecordType =
  | 'near_miss'
  | 'observation'
  | 'accident'
  | 'permit'
  | 'coshh'
  | 'inspection'
  | 'isolation'
  | 'fire_watch'
  | 'pre_use_check'
  | 'site_diary'
  | 'equipment';

export interface AuditTrailEntry {
  id: string;
  record_type: AuditRecordType;
  record_id: string;
  action: AuditAction;
  user_id: string;
  old_values: Record<string, unknown> | null;
  new_values: Record<string, unknown> | null;
  reason: string | null;
  created_at: string;
}

/**
 * Fetch audit trail entries for a specific safety record.
 */
export function useAuditTrail(recordType: AuditRecordType, recordId: string | null) {
  return useQuery({
    queryKey: ['safety-audit-trail', recordType, recordId],
    queryFn: async (): Promise<AuditTrailEntry[]> => {
      if (!recordId) return [];

      const { data, error } = await supabase
        .from('safety_audit_trail')
        .select('*')
        .eq('record_type', recordType)
        .eq('record_id', recordId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return (data ?? []) as unknown as AuditTrailEntry[];
    },
    enabled: !!recordId,
    staleTime: 30_000,
  });
}

/**
 * Manually log an audit trail entry (for actions not covered by DB triggers,
 * e.g. extending a permit, manual status updates from the frontend).
 */
export function useLogAuditEntry() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (entry: {
      record_type: AuditRecordType;
      record_id: string;
      action: AuditAction;
      old_values?: Record<string, unknown>;
      new_values?: Record<string, unknown>;
      reason?: string;
    }) => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('safety_audit_trail')
        .insert({
          ...entry,
          user_id: user.id,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['safety-audit-trail', variables.record_type, variables.record_id],
      });
    },
  });
}
