/**
 * Employer automations (ELE-1987): the firm's "when this, do that" rules.
 *
 * Everything goes through firm-scoped RPCs. The server decides who may turn a
 * rule on (customer or money rules: owner and admins only), records who did,
 * and runs the rules from triggers and a 10-minute tick. This hook only reads
 * and toggles.
 */
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export const AUTOMATIONS_KEY = 'employer-automations';

export type AutomationRuleKey =
  | 'eicr_job_pack'
  | 'job_assigned_tell_customer'
  | 'job_complete_draft_invoice'
  | 'job_complete_review_request'
  | 'timesheet_friday_reminder'
  | 'timesheet_waiting_reminder'
  | 'invoice_unpaid_reminder'
  | 'cert_signed_next_inspection';

export type AutomationRunStatus = 'queued' | 'sending' | 'done' | 'skipped' | 'failed';

export interface AutomationRuleState {
  key: AutomationRuleKey;
  enabled: boolean;
  enabled_at: string | null;
  changed_by: string | null;
  changed_at: string | null;
}

export interface AutomationRun {
  id: string;
  rule: AutomationRuleKey;
  status: AutomationRunStatus;
  summary: string;
  job_id: string | null;
  created_at: string;
  finished_at: string | null;
}

export interface AutomationPreview {
  count: number | null;
  line: string;
  ready?: boolean;
}

export interface EmployerAutomations {
  firm_id: string;
  can_manage_sensitive: boolean;
  paused: boolean;
  paused_by: string | null;
  paused_at: string | null;
  rules: AutomationRuleState[];
  stats: Partial<Record<AutomationRuleKey, { runs_30d: number; last_run_at: string | null }>>;
  runs: AutomationRun[];
  preview: Partial<Record<AutomationRuleKey, AutomationPreview>>;
}

// The RPCs postdate the last types.ts regeneration.
const rpc = (name: string, args?: Record<string, unknown>) =>
  (supabase.rpc as unknown as (n: string, a?: Record<string, unknown>) => Promise<{
    data: unknown;
    error: { message: string } | null;
  }>)(name, args);

export function useEmployerAutomations() {
  const { user } = useAuth();
  return useQuery({
    queryKey: [AUTOMATIONS_KEY, user?.id],
    enabled: !!user,
    staleTime: 30 * 1000,
    // Runs land from the tick and from other people's actions: keep it fresh
    // while the page is open.
    refetchInterval: 60 * 1000,
    queryFn: async (): Promise<EmployerAutomations> => {
      const { data, error } = await rpc('get_employer_automations');
      if (error) throw new Error(error.message);
      return data as EmployerAutomations;
    },
  });
}

/** Light count for the hub card: rules switched on. RLS scopes it to the firm. */
export function useAutomationsOnCount() {
  const { user } = useAuth();
  return useQuery({
    queryKey: [AUTOMATIONS_KEY, 'on-count', user?.id],
    enabled: !!user,
    staleTime: 60 * 1000,
    queryFn: async () => {
      const { count, error } = await (supabase as unknown as {
        from: (t: string) => {
          select: (c: string, o: { count: 'exact'; head: true }) => {
            eq: (k: string, v: boolean) => Promise<{ count: number | null; error: { message: string } | null }>;
          };
        };
      })
        .from('employer_automation_rules')
        .select('id', { count: 'exact', head: true })
        .eq('enabled', true);
      if (error) throw new Error(error.message);
      return count ?? 0;
    },
  });
}

export function useSetAutomation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ rule, enabled }: { rule: AutomationRuleKey; enabled: boolean }) => {
      const { error } = await rpc('set_employer_automation', { p_rule: rule, p_enabled: enabled });
      if (error) throw new Error(error.message);
    },
    onSettled: () => qc.invalidateQueries({ queryKey: [AUTOMATIONS_KEY] }),
  });
}

export function useSetAutomationsPaused() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (paused: boolean) => {
      const { error } = await rpc('set_employer_automations_paused', { p_paused: paused });
      if (error) throw new Error(error.message);
    },
    onSettled: () => qc.invalidateQueries({ queryKey: [AUTOMATIONS_KEY] }),
  });
}
