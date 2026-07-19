import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export type ContractType = 'Employment' | 'Subcontractor' | 'Client' | 'Supplier' | 'Apprentice';
export type ContractCategory =
  | 'Employment'
  | 'Subcontractor'
  | 'HR Letters'
  | 'Job Descriptions'
  | 'Performance'
  | 'Procedures'
  | 'Templates';
export type ContractStatus = 'Draft' | 'Active' | 'Expired' | 'Terminated' | 'Template';

export interface Contract {
  id: string;
  user_id: string;
  employee_id?: string;
  template_id?: string;
  contract_type?: ContractType;
  category?: ContractCategory;
  title: string;
  party_name?: string;
  description?: string;
  content?: string;
  start_date?: string;
  end_date?: string;
  value?: number;
  status: ContractStatus;
  file_url?: string;
  notes?: string;
  is_template: boolean;
  adopted_at?: string;
  // Employer counter-signature (columns land in the contract-signing
  // migration — treat as absent-safe until then)
  employer_signature?: string | null;
  employer_signed_by?: string | null;
  employer_signed_at?: string | null;
  created_at: string;
  updated_at: string;
  // Joined data
  employee?: {
    id: string;
    name: string;
  };
}

// System contract template (from employment_contract_templates table)
export interface EmploymentContractTemplate {
  id: string;
  name: string;
  category: 'Employment' | 'Subcontractor' | 'HR Letters';
  contract_type?: string;
  content: string;
  summary?: string;
  placeholders: string[];
  version: string;
  sort_order: number;
  is_active: boolean;
  created_at: string;
}

// employer_* counter-signature fields are written ONLY by
// useSignContractAsEmployer (they're not in the generated DB types yet) —
// keep them out of the create/update inputs so those spreads still typecheck.
export type CreateContractInput = Omit<
  Contract,
  | 'id'
  | 'user_id'
  | 'created_at'
  | 'updated_at'
  | 'employee'
  | 'employer_signature'
  | 'employer_signed_by'
  | 'employer_signed_at'
>;
export type UpdateContractInput = Partial<CreateContractInput>;

// Fetch all contracts for the current user (non-templates)
export function useContracts() {
  return useQuery({
    queryKey: ['contracts'],
    queryFn: async (): Promise<Contract[]> => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('contracts')
        .select(
          `
          *,
          employee:employer_employees(id, name)
        `
        )
        .eq('user_id', user.id)
        .eq('is_template', false)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as Contract[];
    },
  });
}

// Fetch contract templates only
export function useContractTemplates() {
  return useQuery({
    queryKey: ['contracts', 'templates'],
    queryFn: async (): Promise<Contract[]> => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('contracts')
        .select('*')
        .eq('user_id', user.id)
        .eq('is_template', true)
        .order('category', { ascending: true })
        .order('title', { ascending: true });

      if (error) throw error;
      return data as Contract[];
    },
  });
}

// Fetch active contracts
export function useActiveContracts() {
  return useQuery({
    queryKey: ['contracts', 'active'],
    queryFn: async (): Promise<Contract[]> => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('contracts')
        .select(
          `
          *,
          employee:employer_employees(id, name)
        `
        )
        .eq('user_id', user.id)
        .eq('is_template', false)
        .eq('status', 'Active')
        .order('start_date', { ascending: false });

      if (error) throw error;
      return data as Contract[];
    },
  });
}

// Get contract statistics
export function useContractStats() {
  return useQuery({
    queryKey: ['contracts', 'stats'],
    queryFn: async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('contracts')
        .select('id, status, is_template, end_date')
        .eq('user_id', user.id);

      if (error) throw error;

      const today = new Date().toISOString().split('T')[0];
      const thirtyDaysFromNow = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split('T')[0];

      const stats = {
        total: data.filter((c) => !c.is_template).length,
        templates: data.filter((c) => c.is_template).length,
        active: data.filter((c) => !c.is_template && c.status === 'Active').length,
        expired: data.filter(
          (c) => !c.is_template && (c.status === 'Expired' || (c.end_date && c.end_date < today))
        ).length,
        expiringSoon: data.filter(
          (c) =>
            !c.is_template && c.end_date && c.end_date >= today && c.end_date <= thirtyDaysFromNow
        ).length,
        draft: data.filter((c) => !c.is_template && c.status === 'Draft').length,
      };

      return stats;
    },
  });
}

// Create a new contract
export function useCreateContract() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (input: CreateContractInput): Promise<Contract> => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('contracts')
        .insert({ ...input, user_id: user.id })
        .select(
          `
          *,
          employee:employer_employees(id, name)
        `
        )
        .single();

      if (error) throw error;
      return data as Contract;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['contracts'] });
      toast({
        title: data.is_template ? 'Template created' : 'Contract created',
        description: `${data.title} has been created successfully.`,
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

// Update an existing contract
export function useUpdateContract() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({
      id,
      ...input
    }: UpdateContractInput & { id: string }): Promise<Contract> => {
      const { data, error } = await supabase
        .from('contracts')
        .update({ ...input, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select(
          `
          *,
          employee:employer_employees(id, name)
        `
        )
        .single();

      if (error) throw error;
      return data as Contract;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contracts'] });
      toast({
        title: 'Contract updated',
        description: 'The contract has been updated successfully.',
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

// Update contract status
export function useUpdateContractStatus() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({
      id,
      status,
    }: {
      id: string;
      status: ContractStatus;
    }): Promise<Contract> => {
      const { data, error } = await supabase
        .from('contracts')
        .update({
          status,
          updated_at: new Date().toISOString(),
        })
        .eq('id', id)
        .select(
          `
          *,
          employee:employer_employees(id, name)
        `
        )
        .single();

      if (error) throw error;
      return data as Contract;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['contracts'] });
      toast({
        title: 'Status updated',
        description: `Contract marked as ${data.status}.`,
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

// Delete a contract
export function useDeleteContract() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (id: string): Promise<void> => {
      const { error } = await supabase.from('contracts').delete().eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contracts'] });
      toast({
        title: 'Contract deleted',
        description: 'The contract has been removed.',
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

// ============================================
// SYSTEM CONTRACT TEMPLATES
// ============================================

// Fetch all system contract templates
export function useEmploymentContractTemplates() {
  return useQuery({
    queryKey: ['employment-contract-templates'],
    queryFn: async (): Promise<EmploymentContractTemplate[]> => {
      const { data, error } = await supabase
        .from('employment_contract_templates')
        .select('*')
        .eq('is_active', true)
        .order('sort_order', { ascending: true });

      if (error) throw error;
      return data as EmploymentContractTemplate[];
    },
  });
}

// Fetch system templates by category
export function useEmploymentContractTemplatesByCategory(
  category: EmploymentContractTemplate['category']
) {
  return useQuery({
    queryKey: ['employment-contract-templates', category],
    queryFn: async (): Promise<EmploymentContractTemplate[]> => {
      const { data, error } = await supabase
        .from('employment_contract_templates')
        .select('*')
        .eq('is_active', true)
        .eq('category', category)
        .order('sort_order', { ascending: true });

      if (error) throw error;
      return data as EmploymentContractTemplate[];
    },
  });
}

// Get IDs of templates the user has already adopted
export function useAdoptedContractTemplateIds() {
  return useQuery({
    queryKey: ['contracts', 'adopted-template-ids'],
    queryFn: async (): Promise<string[]> => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('contracts')
        .select('template_id')
        .eq('user_id', user.id)
        .not('template_id', 'is', null);

      if (error) throw error;
      return data.map((c) => c.template_id).filter(Boolean) as string[];
    },
  });
}

// Adopt a system template (create user contract from template)
export interface AdoptContractTemplateInput {
  template_id: string;
  party_name?: string;
  employee_id?: string;
  start_date?: string;
  end_date?: string;
  placeholders?: Record<string, string>;
}

export function useAdoptContractTemplate() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (input: AdoptContractTemplateInput): Promise<Contract> => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      // Fetch the template
      const { data: template, error: templateError } = await supabase
        .from('employment_contract_templates')
        .select('*')
        .eq('id', input.template_id)
        .single();

      if (templateError) throw templateError;

      // Replace placeholders in content
      let content = template.content;
      if (input.placeholders) {
        for (const [key, value] of Object.entries(input.placeholders)) {
          content = content.replace(new RegExp(key.replace(/[[\]]/g, '\\$&'), 'g'), value);
        }
      }

      // Create the user contract
      const { data, error } = await supabase
        .from('contracts')
        .insert({
          user_id: user.id,
          template_id: input.template_id,
          title: template.name,
          contract_type: template.category === 'Subcontractor' ? 'Subcontractor' : 'Employment',
          // Keep the template's real category — a subcontractor agreement must
          // not be filed (or exported) as an employment contract.
          category: template.category,
          content,
          party_name: input.party_name,
          employee_id: input.employee_id,
          start_date: input.start_date,
          end_date: input.end_date,
          status: 'Active',
          is_template: false,
          adopted_at: new Date().toISOString(),
        })
        .select(
          `
          *,
          employee:employer_employees(id, name)
        `
        )
        .single();

      if (error) throw error;
      return data as Contract;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['contracts'] });
      toast({
        title: 'Contract adopted',
        description: `${data.title} has been added to your contracts.`,
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

// ============================================
// CONTRACT SIGNING
// ============================================

// The latest signature request linked to a contract. The employee path rides
// the existing Signatures rail (signature_requests + the public /sign/:token
// page) rather than a parallel contract-only system.
export interface ContractSignatureRequest {
  id: string;
  status: 'Pending' | 'Sent' | 'Viewed' | 'Signed' | 'Declined' | 'Expired';
  signer_name: string;
  signer_email?: string | null;
  signature_url?: string | null;
  signed_at?: string | null;
  access_token?: string | null;
  created_at: string;
}

export function useContractSignatureRequest(contractId?: string) {
  return useQuery({
    queryKey: ['contract-signature-request', contractId],
    enabled: !!contractId,
    queryFn: async (): Promise<ContractSignatureRequest | null> => {
      const { data, error } = await supabase
        .from('signature_requests')
        .select(
          'id, status, signer_name, signer_email, signature_url, signed_at, access_token, created_at'
        )
        .eq('document_type', 'Contract')
        .eq('document_id', contractId!)
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (error) throw error;
      return data as ContractSignatureRequest | null;
    },
  });
}

const SIGNING_COLUMNS_MISSING_MSG =
  'Contract signing is not available yet — the database update that stores employer signatures has not been applied. Nothing was saved.';

// Record the employer counter-signature on the contract itself. Pass
// activate=true to move a Draft to Active in the same write (only done when
// the employee has already signed, so "Active" stays honest).
export function useSignContractAsEmployer() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({
      id,
      signature,
      signedBy,
      activate,
    }: {
      id: string;
      signature: string;
      signedBy: string;
      activate?: boolean;
    }): Promise<Contract> => {
      const update: Record<string, unknown> = {
        employer_signature: signature,
        employer_signed_by: signedBy,
        employer_signed_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      if (activate) update.status = 'Active';

      // Cast: employer_* columns are added by the contract-signing migration
      // and are not in the generated types yet.
      const { data, error } = await supabase
        .from('contracts')
        .update(update as never)
        .eq('id', id)
        .select(
          `
          *,
          employee:employer_employees(id, name)
        `
        )
        .single();

      if (error) {
        // Graceful guard: the employer_* columns ship in a separate
        // migration — surface a clear message instead of a raw
        // schema-cache error if it has not landed yet.
        if (
          error.code === 'PGRST204' ||
          error.code === '42703' ||
          /employer_sign/i.test(error.message || '')
        ) {
          throw new Error(SIGNING_COLUMNS_MISSING_MSG);
        }
        throw error;
      }
      return data as Contract;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['contracts'] });
      toast({
        title: 'Contract signed',
        description:
          data.status === 'Active'
            ? 'Both parties have signed — contract is now Active.'
            : 'Your employer signature has been recorded.',
      });
    },
    onError: (error) => {
      toast({
        title: 'Could not sign contract',
        description: error.message,
        variant: 'destructive',
      });
    },
  });
}

// Update contract content
export function useUpdateContractContent() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ id, content }: { id: string; content: string }): Promise<Contract> => {
      const { data, error } = await supabase
        .from('contracts')
        .update({ content, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select(
          `
          *,
          employee:employer_employees(id, name)
        `
        )
        .single();

      if (error) throw error;
      return data as Contract;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contracts'] });
      toast({
        title: 'Contract saved',
        description: 'Your changes have been saved.',
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
