import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export type PolicyCategory = "Safety" | "HR" | "Legal" | "Operations";
export type PolicyStatus = "Draft" | "Active" | "Review Due" | "Archived";

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
    queryKey: ["policyTemplates"],
    queryFn: async (): Promise<PolicyTemplate[]> => {
      const { data, error } = await supabase
        .from("employer_policy_templates")
        .select("*")
        .eq("is_active", true)
        .order("sort_order", { ascending: true });

      if (error) throw error;
      return data as PolicyTemplate[];
    },
  });
}

// Fetch policy templates by category
export function usePolicyTemplatesByCategory(category: PolicyCategory) {
  return useQuery({
    queryKey: ["policyTemplates", "category", category],
    queryFn: async (): Promise<PolicyTemplate[]> => {
      const { data, error } = await supabase
        .from("employer_policy_templates")
        .select("*")
        .eq("is_active", true)
        .eq("category", category)
        .order("sort_order", { ascending: true });

      if (error) throw error;
      return data as PolicyTemplate[];
    },
  });
}

// Fetch a single policy template
export function usePolicyTemplate(id: string | undefined) {
  return useQuery({
    queryKey: ["policyTemplates", id],
    queryFn: async (): Promise<PolicyTemplate | null> => {
      if (!id) return null;

      const { data, error } = await supabase
        .from("employer_policy_templates")
        .select("*")
        .eq("id", id)
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
    queryKey: ["userPolicies"],
    queryFn: async (): Promise<UserPolicy[]> => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { data, error } = await supabase
        .from("employer_policies")
        .select(`
          *,
          template:employer_policy_templates(*)
        `)
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as UserPolicy[];
    },
  });
}

// Fetch a single user policy
export function useUserPolicy(id: string | undefined) {
  return useQuery({
    queryKey: ["userPolicies", id],
    queryFn: async (): Promise<UserPolicy | null> => {
      if (!id) return null;

      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { data, error } = await supabase
        .from("employer_policies")
        .select(`
          *,
          template:employer_policy_templates(*)
        `)
        .eq("id", id)
        .eq("user_id", user.id)
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
    queryKey: ["userPolicies", "stats"],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { data, error } = await supabase
        .from("employer_policies")
        .select("id, status, review_date")
        .eq("user_id", user.id);

      if (error) throw error;

      const today = new Date().toISOString().split("T")[0];
      const thirtyDaysFromNow = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0];

      const stats = {
        total: data.length,
        active: data.filter(p => p.status === "Active").length,
        draft: data.filter(p => p.status === "Draft").length,
        reviewDue: data.filter(p =>
          p.status === "Review Due" ||
          (p.review_date && p.review_date <= today)
        ).length,
        reviewingSoon: data.filter(p =>
          p.review_date &&
          p.review_date > today &&
          p.review_date <= thirtyDaysFromNow
        ).length,
      };

      return stats;
    },
  });
}

// Check which templates have been adopted
export function useAdoptedTemplateIds() {
  return useQuery({
    queryKey: ["userPolicies", "adoptedTemplateIds"],
    queryFn: async (): Promise<string[]> => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return [];

      const { data, error } = await supabase
        .from("employer_policies")
        .select("template_id")
        .eq("user_id", user.id)
        .not("template_id", "is", null);

      if (error) throw error;
      return (data || []).map(p => p.template_id).filter(Boolean) as string[];
    },
  });
}

// Adopt a policy template (copy to user's policies)
export function useAdoptPolicy() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (input: AdoptPolicyInput): Promise<UserPolicy> => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      // Fetch the template
      const { data: template, error: templateError } = await supabase
        .from("employer_policy_templates")
        .select("*")
        .eq("id", input.template_id)
        .single();

      if (templateError) throw templateError;

      // Replace placeholder in content with company name if provided
      let content = template.content;
      if (input.company_name) {
        content = content.replace(/\[Company Name\]/g, input.company_name);
      }

      // Create user's policy from template
      const { data, error } = await supabase
        .from("employer_policies")
        .insert({
          user_id: user.id,
          template_id: input.template_id,
          name: template.name,
          content: content,
          status: "Active",
          company_name: input.company_name || null,
          adopted_at: new Date().toISOString(),
          review_date: input.review_date || null,
        })
        .select(`
          *,
          template:employer_policy_templates(*)
        `)
        .single();

      if (error) throw error;
      return data as UserPolicy;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["userPolicies"] });
      toast({
        title: "Policy adopted",
        description: `"${data.name}" has been added to your policies.`,
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
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
        .from("employer_policies")
        .update({
          ...input,
          updated_at: new Date().toISOString(),
        })
        .eq("id", id)
        .select(`
          *,
          template:employer_policy_templates(*)
        `)
        .single();

      if (error) throw error;
      return data as UserPolicy;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["userPolicies"] });
      toast({
        title: "Policy updated",
        description: `"${data.name}" has been updated.`,
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
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
      const { error } = await supabase
        .from("employer_policies")
        .delete()
        .eq("id", id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userPolicies"] });
      toast({
        title: "Policy removed",
        description: "The policy has been removed from your list.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}
