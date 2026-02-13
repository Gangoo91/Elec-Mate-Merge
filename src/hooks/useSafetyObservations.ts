import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export interface SafetyObservation {
  id: string;
  user_id: string;
  observation_type: "positive" | "improvement_needed";
  person_observed: string | null;
  category: string;
  description: string;
  location: string | null;
  photo_url: string | null;
  created_at: string;
}

export const OBSERVATION_CATEGORIES = [
  "PPE Usage",
  "Housekeeping",
  "Safe Working Practice",
  "Tool Handling",
  "Communication",
  "Risk Awareness",
  "Manual Handling",
  "Working at Height",
  "Electrical Safety",
  "Other",
];

export function useSafetyObservations() {
  return useQuery({
    queryKey: ["safety-observations"],
    queryFn: async (): Promise<SafetyObservation[]> => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { data, error } = await supabase
        .from("safety_observations")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return (data ?? []) as unknown as SafetyObservation[];
    },
    staleTime: 30_000,
  });
}

export function useCreateObservation() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (observation: {
      observation_type: "positive" | "improvement_needed";
      person_observed?: string;
      category: string;
      description: string;
      location?: string;
      photo_url?: string;
    }) => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { data, error } = await supabase
        .from("safety_observations")
        .insert({
          user_id: user.id,
          ...observation,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["safety-observations"] });
      toast({
        title: "Observation Recorded",
        description: "Safety observation has been logged.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Could not save observation.",
        variant: "destructive",
      });
    },
  });
}
