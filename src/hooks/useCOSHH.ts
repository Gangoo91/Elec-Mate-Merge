import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export interface COSHHAssessment {
  id: string;
  user_id: string;
  substance_name: string;
  manufacturer: string | null;
  product_code: string | null;
  location_of_use: string | null;
  task_description: string | null;
  quantity_used: string | null;
  frequency_of_use: string | null;
  ghs_hazards: string[];
  exposure_routes: string[];
  health_effects: string | null;
  oel_value: string | null;
  control_measures: string[];
  ppe_required: string[];
  storage_requirements: string | null;
  spill_procedure: string | null;
  first_aid: string | null;
  disposal_method: string | null;
  monitoring_required: boolean;
  monitoring_details: string | null;
  risk_rating: "low" | "medium" | "high" | "very-high";
  assessed_by: string;
  assessment_date: string;
  review_date: string;
  pdf_url: string | null;
  created_at: string;
  updated_at: string;
}

export type CreateCOSHHInput = Omit<COSHHAssessment, "id" | "user_id" | "created_at" | "updated_at" | "pdf_url">;

export function useCOSHHAssessments() {
  return useQuery({
    queryKey: ["coshh-assessments"],
    queryFn: async (): Promise<COSHHAssessment[]> => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { data, error } = await supabase
        .from("coshh_assessments")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as COSHHAssessment[];
    },
  });
}

export function useCreateCOSHH() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (input: CreateCOSHHInput): Promise<COSHHAssessment> => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { data, error } = await supabase
        .from("coshh_assessments")
        .insert({ ...input, user_id: user.id })
        .select("*")
        .single();

      if (error) throw error;
      return data as COSHHAssessment;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["coshh-assessments"] });
      toast({ title: "Assessment saved", description: "COSHH assessment has been saved." });
    },
    onError: (error) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });
}

export function useUpdateCOSHH() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ id, ...input }: Partial<CreateCOSHHInput> & { id: string }): Promise<COSHHAssessment> => {
      const { data, error } = await supabase
        .from("coshh_assessments")
        .update(input)
        .eq("id", id)
        .select("*")
        .single();

      if (error) throw error;
      return data as COSHHAssessment;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["coshh-assessments"] });
      toast({ title: "Assessment updated", description: "COSHH assessment has been updated." });
    },
    onError: (error) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });
}

export function useDeleteCOSHH() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (id: string): Promise<void> => {
      const { error } = await supabase
        .from("coshh_assessments")
        .delete()
        .eq("id", id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["coshh-assessments"] });
      toast({ title: "Assessment deleted", description: "COSHH assessment has been removed." });
    },
    onError: (error) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });
}

export function useCOSHHOverdueReviews() {
  return useQuery({
    queryKey: ["coshh-assessments", "overdue"],
    queryFn: async (): Promise<COSHHAssessment[]> => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const today = new Date().toISOString().split("T")[0];

      const { data, error } = await supabase
        .from("coshh_assessments")
        .select("*")
        .eq("user_id", user.id)
        .lt("review_date", today)
        .order("review_date", { ascending: true });

      if (error) throw error;
      return data as COSHHAssessment[];
    },
  });
}
