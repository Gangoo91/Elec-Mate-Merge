/**
 * Maintenance contracts (ELE-430) — the electrician-defined half of the
 * renewals machine. A contract is a cadence (quarterly PAT, six-monthly fire
 * alarm service…); the nightly job materialises each upcoming visit as a
 * diary task, optionally a draft invoice, and — only when the contract's own
 * `auto_email_customer` flag was ticked — a branded reminder email with the
 * one-tap booking link. Certificates drive the other half automatically.
 */
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

export type ContractFrequency =
  | 'weekly'
  | 'monthly'
  | 'quarterly'
  | 'six_monthly'
  | 'annually'
  | 'two_yearly'
  | 'three_yearly'
  | 'five_yearly'
  | 'custom';

export type ContractClientType = 'domestic' | 'business';

export type ContractStatus = 'active' | 'paused' | 'ended';

export interface MaintenanceContract {
  id: string;
  customer_id: string | null;
  customer_name: string;
  job_type: string;
  description: string | null;
  frequency: ContractFrequency;
  frequency_custom_days: number | null;
  start_date: string;
  end_date: string | null;
  next_due_date: string;
  reminder_days_before: number;
  auto_create_invoice: boolean;
  default_invoice_amount: number | null;
  auto_email_customer: boolean;
  client_type: ContractClientType;
  sent_for_signature_at: string | null;
  client_signed_at: string | null;
  client_signed_name: string | null;
  status: ContractStatus;
  created_at: string;
}

export interface NewContract {
  customer_id: string | null;
  customer_name: string;
  job_type: string;
  description?: string | null;
  frequency: ContractFrequency;
  frequency_custom_days?: number | null;
  start_date: string;
  end_date?: string | null;
  reminder_days_before?: number;
  auto_create_invoice?: boolean;
  default_invoice_amount?: number | null;
  auto_email_customer?: boolean;
  client_type?: ContractClientType;
}

export const FREQUENCY_LABELS: Record<ContractFrequency, string> = {
  weekly: 'Weekly',
  monthly: 'Monthly',
  quarterly: 'Quarterly',
  six_monthly: 'Every 6 months',
  annually: 'Annually',
  two_yearly: 'Every 2 years',
  three_yearly: 'Every 3 years',
  five_yearly: 'Every 5 years',
  custom: 'Custom',
};

export function useMaintenanceContracts() {
  const queryClient = useQueryClient();

  const { data: contracts = [], isLoading } = useQuery({
    queryKey: ['maintenance-contracts'],
    queryFn: async (): Promise<MaintenanceContract[]> => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return [];

      const { data, error } = await supabase
        .from('maintenance_contracts')
        .select('*')
        .eq('user_id', user.id)
        .order('next_due_date', { ascending: true });
      if (error) throw error;
      return (data || []) as unknown as MaintenanceContract[];
    },
  });

  const create = useMutation({
    mutationFn: async (input: NewContract) => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error('Not signed in');

      const { error } = await supabase.from('maintenance_contracts').insert({
        user_id: user.id,
        customer_id: input.customer_id,
        customer_name: input.customer_name,
        job_type: input.job_type,
        description: input.description || null,
        frequency: input.frequency,
        frequency_custom_days:
          input.frequency === 'custom' ? input.frequency_custom_days || 30 : null,
        start_date: input.start_date,
        end_date: input.end_date || null,
        // The first visit is due on the start date; the nightly job advances
        // it from there.
        next_due_date: input.start_date,
        reminder_days_before: input.reminder_days_before ?? 7,
        auto_create_invoice: input.auto_create_invoice ?? false,
        // Stored whenever given, not only when auto-invoicing — the agreement
        // PDF prints it as the per-visit price either way.
        default_invoice_amount: input.default_invoice_amount ?? null,
        auto_email_customer: input.auto_email_customer ?? false,
        client_type: input.client_type ?? 'domestic',
      });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['maintenance-contracts'] });
      toast({ title: 'Contract set up — visits will appear in your tasks automatically' });
    },
    onError: (error: Error) => {
      toast({ title: `Could not save the contract: ${error.message}`, variant: 'destructive' });
    },
  });

  const setStatus = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: ContractStatus }) => {
      const { error } = await supabase
        .from('maintenance_contracts')
        .update({ status, updated_at: new Date().toISOString() })
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['maintenance-contracts'] }),
    onError: (error: Error) => {
      toast({ title: `Could not update the contract: ${error.message}`, variant: 'destructive' });
    },
  });

  return {
    contracts,
    isLoading,
    createContract: create.mutate,
    creating: create.isPending,
    setStatus: setStatus.mutate,
  };
}
