import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

export type ModuleType = "coshh" | "near-miss" | "observation" | "permit";

export interface SafetyFormTemplate {
  id: string;
  user_id: string;
  name: string;
  description: string | null;
  module_type: ModuleType;
  template_data: Record<string, unknown>;
  version: number;
  previous_version_id: string | null;
  is_default: boolean;
  usage_count: number;
  created_at: string;
  updated_at: string;
}

/**
 * Fetch all templates for a given module type.
 */
export function useSafetyFormTemplates(moduleType: ModuleType) {
  const { session } = useAuth();

  const query = useQuery({
    queryKey: ["safety-form-templates", moduleType, session?.user?.id],
    queryFn: async (): Promise<SafetyFormTemplate[]> => {
      if (!session?.user?.id) return [];

      const { data, error } = await supabase
        .from("safety_form_templates")
        .select("*")
        .eq("user_id", session.user.id)
        .eq("module_type", moduleType)
        .order("usage_count", { ascending: false });

      if (error) {
        if (error.code === "42P01") return [];
        throw error;
      }
      return (data || []) as SafetyFormTemplate[];
    },
    enabled: !!session?.user?.id,
  });

  return {
    templates: query.data || [],
    isLoading: query.isLoading,
    refetch: query.refetch,
  };
}

/**
 * Save current form data as a new template.
 */
export function useSaveAsTemplate() {
  const { session } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: {
      name: string;
      description?: string;
      moduleType: ModuleType;
      templateData: Record<string, unknown>;
    }) => {
      if (!session?.user?.id) throw new Error("Not authenticated");

      const { data, error } = await supabase
        .from("safety_form_templates")
        .insert({
          user_id: session.user.id,
          name: input.name,
          description: input.description || null,
          module_type: input.moduleType,
          template_data: input.templateData,
          version: 1,
          is_default: false,
          usage_count: 0,
        })
        .select()
        .single();

      if (error) throw error;
      return data as SafetyFormTemplate;
    },
    onSuccess: (_data, variables) => {
      toast.success("Template saved");
      queryClient.invalidateQueries({
        queryKey: ["safety-form-templates", variables.moduleType],
      });
    },
    onError: (err: Error) => {
      toast.error(`Failed to save template: ${err.message}`);
    },
  });
}

/**
 * Update an existing template — creates a new version, links to previous.
 */
export function useUpdateTemplate() {
  const { session } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: {
      templateId: string;
      name: string;
      description?: string;
      moduleType: ModuleType;
      templateData: Record<string, unknown>;
      currentVersion: number;
    }) => {
      if (!session?.user?.id) throw new Error("Not authenticated");

      // Create new version that references the old one
      const { data, error } = await supabase
        .from("safety_form_templates")
        .insert({
          user_id: session.user.id,
          name: input.name,
          description: input.description || null,
          module_type: input.moduleType,
          template_data: input.templateData,
          version: input.currentVersion + 1,
          previous_version_id: input.templateId,
          is_default: false,
          usage_count: 0,
        })
        .select()
        .single();

      if (error) throw error;
      return data as SafetyFormTemplate;
    },
    onSuccess: (_data, variables) => {
      toast.success(`Template updated (v${variables.currentVersion + 1})`);
      queryClient.invalidateQueries({
        queryKey: ["safety-form-templates", variables.moduleType],
      });
    },
    onError: (err: Error) => {
      toast.error(`Failed to update template: ${err.message}`);
    },
  });
}

/**
 * Delete a template.
 */
export function useDeleteTemplate() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: { id: string; moduleType: ModuleType }) => {
      const { error } = await supabase
        .from("safety_form_templates")
        .delete()
        .eq("id", input.id);

      if (error) throw error;
    },
    onSuccess: (_data, variables) => {
      toast.success("Template deleted");
      queryClient.invalidateQueries({
        queryKey: ["safety-form-templates", variables.moduleType],
      });
    },
    onError: (err: Error) => {
      toast.error(`Failed to delete template: ${err.message}`);
    },
  });
}

/**
 * Increment usage count when a template is loaded.
 */
export function useIncrementTemplateUsage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: { id: string; moduleType: ModuleType; currentCount: number }) => {
      const { error } = await supabase
        .from("safety_form_templates")
        .update({ usage_count: input.currentCount + 1 })
        .eq("id", input.id);

      if (error) throw error;
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["safety-form-templates", variables.moduleType],
      });
    },
  });
}
