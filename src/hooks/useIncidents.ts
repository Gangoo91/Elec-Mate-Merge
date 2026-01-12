import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

// Types based on database schema
export type IncidentType =
  | "near_miss"
  | "unsafe_practice"
  | "faulty_equipment"
  | "injury"
  | "property_damage"
  | "environmental"
  | "security"
  | "other";

export type SeverityLevel = "low" | "medium" | "high" | "critical";

export type IncidentStatus =
  | "draft"
  | "submitted"
  | "under_review"
  | "investigating"
  | "resolved"
  | "closed";

export interface Incident {
  id: string;
  user_id: string;
  incident_type: IncidentType;
  title: string;
  description: string;
  location: string;
  date_occurred: string;
  severity: SeverityLevel;
  status: IncidentStatus;
  immediate_action_taken?: string;
  potential_consequences?: string;
  witnesses?: string;
  supervisor_notified?: boolean;
  supervisor_name?: string;
  equipment_involved?: string;
  injuries_sustained?: string;
  first_aid_given?: boolean;
  photos_attached?: boolean;
  follow_up_required?: boolean;
  follow_up_notes?: string;
  created_at: string;
  updated_at: string;
  submitted_at?: string;
  resolved_at?: string;
}

export type CreateIncidentInput = Omit<Incident, "id" | "user_id" | "created_at" | "updated_at">;
export type UpdateIncidentInput = Partial<CreateIncidentInput>;

// Fetch all incidents for the current user
export function useIncidents() {
  return useQuery({
    queryKey: ["incidents"],
    queryFn: async (): Promise<Incident[]> => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { data, error } = await supabase
        .from("incidents")
        .select("*")
        .eq("user_id", user.id)
        .order("date_occurred", { ascending: false });

      if (error) throw error;
      return data as Incident[];
    },
  });
}

// Fetch a single incident by ID
export function useIncident(id: string | undefined) {
  return useQuery({
    queryKey: ["incidents", id],
    queryFn: async (): Promise<Incident | null> => {
      if (!id) return null;

      const { data, error } = await supabase
        .from("incidents")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;
      return data as Incident;
    },
    enabled: !!id,
  });
}

// Fetch incidents filtered by status
export function useIncidentsByStatus(status: IncidentStatus) {
  return useQuery({
    queryKey: ["incidents", "status", status],
    queryFn: async (): Promise<Incident[]> => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { data, error } = await supabase
        .from("incidents")
        .select("*")
        .eq("user_id", user.id)
        .eq("status", status)
        .order("date_occurred", { ascending: false });

      if (error) throw error;
      return data as Incident[];
    },
  });
}

// Get incident statistics
export function useIncidentStats() {
  return useQuery({
    queryKey: ["incidents", "stats"],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { data, error } = await supabase
        .from("incidents")
        .select("status, severity")
        .eq("user_id", user.id);

      if (error) throw error;

      const stats = {
        total: data.length,
        open: data.filter(i => !["resolved", "closed"].includes(i.status)).length,
        resolved: data.filter(i => i.status === "resolved").length,
        closed: data.filter(i => i.status === "closed").length,
        nearMisses: data.filter(i => i.status === "near_miss").length,
        critical: data.filter(i => i.severity === "critical").length,
        high: data.filter(i => i.severity === "high").length,
      };

      return stats;
    },
  });
}

// Create a new incident
export function useCreateIncident() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (input: CreateIncidentInput): Promise<Incident> => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { data, error } = await supabase
        .from("incidents")
        .insert({ ...input, user_id: user.id })
        .select()
        .single();

      if (error) throw error;
      return data as Incident;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["incidents"] });
      toast({
        title: "Incident reported",
        description: "The incident has been logged successfully.",
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

// Update an existing incident
export function useUpdateIncident() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ id, ...input }: UpdateIncidentInput & { id: string }): Promise<Incident> => {
      const { data, error } = await supabase
        .from("incidents")
        .update({ ...input, updated_at: new Date().toISOString() })
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return data as Incident;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["incidents"] });
      queryClient.invalidateQueries({ queryKey: ["incidents", data.id] });
      toast({
        title: "Incident updated",
        description: "The incident has been updated successfully.",
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

// Update incident status
export function useUpdateIncidentStatus() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ id, status }: { id: string; status: IncidentStatus }): Promise<Incident> => {
      const updates: Partial<Incident> = {
        status,
        updated_at: new Date().toISOString()
      };

      // Set timestamps for specific status changes
      if (status === "submitted") {
        updates.submitted_at = new Date().toISOString();
      } else if (status === "resolved" || status === "closed") {
        updates.resolved_at = new Date().toISOString();
      }

      const { data, error } = await supabase
        .from("incidents")
        .update(updates)
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return data as Incident;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["incidents"] });
      queryClient.invalidateQueries({ queryKey: ["incidents", data.id] });
      toast({
        title: "Status updated",
        description: `Incident marked as ${data.status.replace("_", " ")}.`,
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

// Delete an incident
export function useDeleteIncident() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (id: string): Promise<void> => {
      const { error } = await supabase
        .from("incidents")
        .delete()
        .eq("id", id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["incidents"] });
      toast({
        title: "Incident deleted",
        description: "The incident has been removed.",
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
