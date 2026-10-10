import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { getActingEmployerId } from '@/lib/actingEmployer';

export type PolicyCategory = 'Safety' | 'HR' | 'Legal' | 'Operations';
export type PolicyStatus = 'Draft' | 'Active' | 'Review Due' | 'Archived';

// Policy template (system-provided)
export interface PolicyTemplate {
  id: string;
  name: string;
  category: PolicyCategory;
  content: string;
  summary: string | null;
  version: string;
  sort_order: number;
  is_active: boolean;
  created_at: string;
}

// User's adopted policy
export interface UserPolicy {
  id: string;
  user_id: string;
  template_id: string | null;
  name: string;
  content: string;
  status: PolicyStatus;
  company_name: string | null;
  adopted_at: string | null;
  review_date: string | null;
  approved_by: string | null;
  created_at: string;
  updated_at: string;
  /** ELE-1946: publishing to the team. Absent on an older server. */
  version?: number | null;
  published_version?: number | null;
  published_at?: string | null;
  ai_generated?: boolean | null;
  category?: string | null;
  // Joined data
  template?: PolicyTemplate | null;
}

export interface AdoptPolicyInput {
  template_id: string;
  company_name?: string;
  review_date?: string;
}

export interface UpdatePolicyInput {
  id: string;
  name?: string;
  content?: string;
  status?: PolicyStatus;
  company_name?: string;
  review_date?: string;
  approved_by?: string;
}

// Fetch all policy templates
export function usePolicyTemplates() {
  return useQuery({
    queryKey: ['policyTemplates'],
    queryFn: async (): Promise<PolicyTemplate[]> => {
      const { data, error } = await supabase
        .from('employer_policy_templates')
        .select('*')
        .eq('is_active', true)
        .order('sort_order', { ascending: true });

      if (error) throw error;
      return data as PolicyTemplate[];
    },
  });
}

// Fetch policy templates by category
export function usePolicyTemplatesByCategory(category: PolicyCategory) {
  return useQuery({
    queryKey: ['policyTemplates', 'category', category],
    queryFn: async (): Promise<PolicyTemplate[]> => {
      const { data, error } = await supabase
        .from('employer_policy_templates')
        .select('*')
        .eq('is_active', true)
        .eq('category', category)
        .order('sort_order', { ascending: true });

      if (error) throw error;
      return data as PolicyTemplate[];
    },
  });
}

// Fetch a single policy template
export function usePolicyTemplate(id: string | undefined) {
  return useQuery({
    queryKey: ['policyTemplates', id],
    queryFn: async (): Promise<PolicyTemplate | null> => {
      if (!id) return null;

      const { data, error } = await supabase
        .from('employer_policy_templates')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      return data as PolicyTemplate;
    },
    enabled: !!id,
  });
}

// Fetch user's adopted policies
export function useUserPolicies() {
  return useQuery({
    queryKey: ['userPolicies'],
    queryFn: async (): Promise<UserPolicy[]> => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      // The firm's policies, so co-admins see the same library (ELE-1946).
      const { data, error } = await supabase
        .from('employer_policies')
        .select(
          `
          *,
          template:employer_policy_templates(*)
        `
        )
        .eq('user_id', (await getActingEmployerId(user.id)) ?? user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as UserPolicy[];
    },
  });
}

// Fetch a single user policy
export function useUserPolicy(id: string | undefined) {
  return useQuery({
    queryKey: ['userPolicies', id],
    queryFn: async (): Promise<UserPolicy | null> => {
      if (!id) return null;

      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('employer_policies')
        .select(
          `
          *,
          template:employer_policy_templates(*)
        `
        )
        .eq('id', id)
        .eq('user_id', (await getActingEmployerId(user.id)) ?? user.id)
        .single();

      if (error) throw error;
      return data as UserPolicy;
    },
    enabled: !!id,
  });
}

// Get policy statistics
export function usePolicyStats() {
  return useQuery({
    queryKey: ['userPolicies', 'stats'],
    queryFn: async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('employer_policies')
        .select('id, status, review_date')
        .eq('user_id', (await getActingEmployerId(user.id)) ?? user.id);

      if (error) throw error;

      const today = new Date().toISOString().split('T')[0];
      const thirtyDaysFromNow = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split('T')[0];

      const stats = {
        total: data.length,
        active: data.filter((p) => p.status === 'Active').length,
        draft: data.filter((p) => p.status === 'Draft').length,
        reviewDue: data.filter(
          (p) => p.status === 'Review Due' || (p.review_date && p.review_date <= today)
        ).length,
        reviewingSoon: data.filter(
          (p) => p.review_date && p.review_date > today && p.review_date <= thirtyDaysFromNow
        ).length,
      };

      return stats;
    },
  });
}

// Check which templates have been adopted
export function useAdoptedTemplateIds() {
  return useQuery({
    queryKey: ['userPolicies', 'adoptedTemplateIds'],
    queryFn: async (): Promise<string[]> => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return [];

      const { data, error } = await supabase
        .from('employer_policies')
        .select('template_id')
        .eq('user_id', (await getActingEmployerId(user.id)) ?? user.id)
        .not('template_id', 'is', null);

      if (error) throw error;
      return (data || []).map((p) => p.template_id).filter(Boolean) as string[];
    },
  });
}

// Adopt a policy template (copy to user's policies)
export function useAdoptPolicy() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (input: AdoptPolicyInput): Promise<UserPolicy> => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      // Fetch the template
      const { data: template, error: templateError } = await supabase
        .from('employer_policy_templates')
        .select('*')
        .eq('id', input.template_id)
        .single();

      if (templateError) throw templateError;

      // Replace placeholder in content with company name if provided
      let content = template.content;
      if (input.company_name) {
        content = content.replace(/\[Company Name\]/g, input.company_name);
      }

      // Create user's policy from template
      const { data, error } = await supabase
        .from('employer_policies')
        .insert({
          user_id: (await getActingEmployerId(user.id)) ?? user.id,
          template_id: input.template_id,
          name: template.name,
          content: content,
          status: 'Active',
          company_name: input.company_name || null,
          adopted_at: new Date().toISOString(),
          review_date: input.review_date || null,
        })
        .select(
          `
          *,
          template:employer_policy_templates(*)
        `
        )
        .single();

      if (error) throw error;
      return data as UserPolicy;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['userPolicies'] });
      toast({
        title: 'Policy adopted',
        description: `"${data.name}" has been added to your policies.`,
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

// Update a user's policy
export function useUpdatePolicy() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ id, ...input }: UpdatePolicyInput): Promise<UserPolicy> => {
      const { data, error } = await supabase
        .from('employer_policies')
        .update({
          ...input,
          updated_at: new Date().toISOString(),
        })
        .eq('id', id)
        .select(
          `
          *,
          template:employer_policy_templates(*)
        `
        )
        .single();

      if (error) throw error;
      return data as UserPolicy;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['userPolicies'] });
      toast({
        title: 'Policy updated',
        description: `"${data.name}" has been updated.`,
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

// Delete a user's policy
export function useDeletePolicy() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (id: string): Promise<void> => {
      const { error } = await supabase.from('employer_policies').delete().eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userPolicies'] });
      toast({
        title: 'Policy removed',
        description: 'The policy has been removed from your list.',
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

// ── Publishing and acknowledgement (ELE-1946) ─────────────────────────────

export interface PolicyPerson {
  employee_id: string;
  name: string;
  on_app: boolean;
  email: string | null;
  phone: string | null;
  signed_at: string | null;
  location: unknown;
  last_version: number | null;
}

export interface PolicyAcknowledgement {
  signer_name: string;
  policy_version: number;
  signed_at: string;
  location: unknown;
  user_agent: string | null;
  signature: string | null;
}

export interface PolicyTracker {
  policy_id: string;
  version: number | null;
  published_at: string | null;
  people: PolicyPerson[];
  acknowledgements: PolicyAcknowledgement[];
}

/** Who has signed the published version, and every acknowledgement made. */
export function usePolicyTracker(policyId: string | null | undefined) {
  return useQuery({
    queryKey: ['userPolicies', 'tracker', policyId],
    enabled: !!policyId,
    queryFn: async (): Promise<PolicyTracker> => {
      const { data, error } = await supabase.rpc(
        'get_firm_policy_tracker' as never,
        { p_policy_id: policyId } as never
      );
      if (error) throw error;
      const t = (data ?? {}) as Partial<PolicyTracker>;
      return {
        policy_id: policyId as string,
        version: t.version ?? null,
        published_at: t.published_at ?? null,
        people: t.people ?? [],
        acknowledgements: t.acknowledgements ?? [],
      };
    },
  });
}

export interface PublishResult {
  version: number;
  notified: Array<{ employee_id: string; name: string }>;
  off_app: Array<{ employee_id: string; name: string; email: string | null; phone: string | null }>;
}

/** Publish (or publish a new version) and send it to the team to sign. */
export function usePublishPolicy() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (policyId: string): Promise<PublishResult> => {
      const { data, error } = await supabase.rpc(
        'publish_firm_policy' as never,
        { p_policy_id: policyId } as never
      );
      if (error) throw error;
      const r = (data ?? {}) as Partial<PublishResult>;
      return { version: r.version ?? 1, notified: r.notified ?? [], off_app: r.off_app ?? [] };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userPolicies'] });
      queryClient.invalidateQueries({ queryKey: ['firm-policy-status'] });
      queryClient.invalidateQueries({ queryKey: ['firm-signoff-attention'] });
    },
  });
}

export interface NewPolicyInput {
  name: string;
  content: string;
  category?: string | null;
  ai_generated?: boolean;
  review_date?: string | null;
  company_name?: string | null;
}

/** A policy written from scratch or drafted with AI, saved as a draft. */
export function useCreatePolicy() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input: NewPolicyInput): Promise<UserPolicy> => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');
      const { data, error } = await supabase
        .from('employer_policies')
        .insert({
          user_id: (await getActingEmployerId(user.id)) ?? user.id,
          name: input.name,
          content: input.content,
          status: 'Draft',
          company_name: input.company_name || null,
          review_date: input.review_date || null,
          adopted_at: new Date().toISOString(),
          category: input.category || null,
          ai_generated: !!input.ai_generated,
        } as never)
        .select('*, template:employer_policy_templates(*)')
        .single();
      if (error) throw error;
      return data as unknown as UserPolicy;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userPolicies'] });
      queryClient.invalidateQueries({ queryKey: ['firm-policy-status'] });
    },
  });
}
