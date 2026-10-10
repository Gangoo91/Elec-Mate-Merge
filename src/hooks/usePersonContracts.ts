import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { getActingEmployerId } from '@/lib/actingEmployer';

/* ==========================================================================
   usePersonContracts — ELE-1982. Contracts live with People.

   - person_contracts(employee): status only (no document, no pay) for the
     person's record. Office managers can see it.
   - send_person_contract(...): owner/admin only (contracts carry pay).
     Fills the template, files it on the person and opens the signing
     request; this hook then emails the link through send-signature-request
     (the branded signing email) when there is an address.
   - my_contracts(): the worker's own, for Worker Tools → Sign-offs.
   - customer terms: company_profiles.quote_terms of the firm, which the quote
     PDF and the client's accept page already show (ELE-1149).
   ========================================================================== */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const rpc = supabase.rpc.bind(supabase) as unknown as (
  fn: string,
  args?: Record<string, unknown>
) => Promise<{ data: any; error: { message?: string } | null }>;

export type SignStatus = 'Pending' | 'Sent' | 'Viewed' | 'Signed' | 'Declined' | 'Expired';

export interface PersonContract {
  id: string;
  title: string;
  category: string | null;
  status: string;
  start_date: string | null;
  end_date: string | null;
  created_at: string;
  employer_signed_at: string | null;
  request_id: string | null;
  sign_status: SignStatus | null;
  sent_at: string | null;
  signed_at: string | null;
  signer_email: string | null;
}

export const personContractsKey = (employeeId?: string | null) => ['person-contracts', employeeId];

export function usePersonContracts(employeeId?: string | null) {
  return useQuery({
    queryKey: personContractsKey(employeeId),
    enabled: !!employeeId,
    queryFn: async (): Promise<PersonContract[]> => {
      const { data, error } = await rpc('person_contracts', { p_employee_id: employeeId });
      if (error) throw new Error(error.message || 'Could not load contracts');
      return Array.isArray(data) ? data : [];
    },
  });
}

export interface SendPersonContractInput {
  employeeId: string;
  templateId: string;
  values: Record<string, string>;
  startDate?: string;
  endDate?: string;
  signerEmail?: string;
  message?: string;
}

export interface SendPersonContractResult {
  contractId: string;
  requestId: string;
  accessToken: string;
  emailed: boolean;
  emailError: string | null;
  workerLinked: boolean;
}

export function useSendPersonContract() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input: SendPersonContractInput): Promise<SendPersonContractResult> => {
      const values: Record<string, string> = {};
      for (const [k, v] of Object.entries(input.values)) {
        if (v && v.trim()) values[k] = v.trim();
      }
      const { data, error } = await rpc('send_person_contract', {
        p_employee_id: input.employeeId,
        p_template_id: input.templateId,
        p_values: values,
        p_start_date: input.startDate || null,
        p_end_date: input.endDate || null,
        p_signer_email: input.signerEmail?.trim() || null,
        p_message: input.message?.trim() || null,
      });
      if (error) throw new Error(error.message || 'Could not send the contract');

      let emailed = false;
      let emailError: string | null = null;
      if (data?.signer_email && data?.request_id) {
        const { error: sendErr } = await supabase.functions.invoke('send-signature-request', {
          body: { signatureRequestId: data.request_id, kind: 'initial' },
        });
        if (sendErr)
          emailError = 'The contract is ready, but the email did not send. Copy the link instead.';
        else emailed = true;
      }
      return {
        contractId: data.contract_id,
        requestId: data.request_id,
        accessToken: data.access_token,
        emailed,
        emailError,
        workerLinked: !!data.worker_linked,
      };
    },
    onSuccess: (_r, input) => {
      queryClient.invalidateQueries({ queryKey: personContractsKey(input.employeeId) });
      queryClient.invalidateQueries({ queryKey: ['contracts'] });
      queryClient.invalidateQueries({ queryKey: ['signatureRequests'] });
      queryClient.invalidateQueries({ queryKey: ['contract-signature-request'] });
    },
  });
}

/* ---------------------------------------------------------------- worker side */

export interface MyContract {
  contract_id: string;
  title: string;
  category: string | null;
  firm: string;
  start_date: string | null;
  end_date: string | null;
  status: SignStatus;
  token: string | null;
  sent_at: string;
  signed_at: string | null;
  expires_at: string | null;
  employer_signed: boolean;
}

export function useMyContracts() {
  return useQuery({
    queryKey: ['my-contracts'],
    staleTime: 30_000,
    queryFn: async (): Promise<MyContract[]> => {
      const { data, error } = await rpc('my_contracts');
      if (error) throw new Error(error.message || 'Could not load your contracts');
      return Array.isArray(data) ? data : [];
    },
  });
}

/* ---------------------------------------------------------------- customer terms */

export function useFirmCustomerTerms() {
  return useQuery({
    queryKey: ['firm-customer-terms'],
    queryFn: async (): Promise<{ quoteTerms: string | null; hasProfile: boolean }> => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return { quoteTerms: null, hasProfile: false };
      const firm = (await getActingEmployerId(user.id)) ?? user.id;
      const { data, error } = await supabase
        .from('company_profiles')
        .select('quote_terms')
        .eq('user_id', firm)
        .maybeSingle();
      if (error) throw error;
      return { quoteTerms: data?.quote_terms ?? null, hasProfile: !!data };
    },
  });
}

export function useSetFirmCustomerTerms() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (quoteTerms: string) => {
      const { data, error } = await rpc('set_firm_customer_terms', { p_terms: quoteTerms });
      if (error) throw new Error(error.message || 'Could not save the terms');
      if (data?.error === 'no_company_profile') {
        throw new Error('Add your company details in Settings first, then set your terms.');
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['firm-customer-terms'] });
      queryClient.invalidateQueries({ queryKey: ['company-profile'] });
    },
  });
}
