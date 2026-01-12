import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export type TrainingType = "Induction" | "Safety" | "CPD" | "Apprenticeship" | "Certification" | "Refresher";
export type TrainingStatus = "Pending" | "In Progress" | "Completed" | "Expired" | "Failed";

export interface TrainingRecord {
  id: string;
  user_id: string;
  employee_id?: string;
  training_name: string;
  training_type?: TrainingType;
  provider?: string;
  description?: string;
  start_date?: string;
  completed_date?: string;
  expiry_date?: string;
  certificate_number?: string;
  certificate_url?: string;
  status: TrainingStatus;
  notes?: string;
  created_at: string;
  updated_at: string;
  // Joined data
  employee?: {
    id: string;
    name: string;
  };
}

export type CreateTrainingRecordInput = Omit<TrainingRecord, "id" | "user_id" | "created_at" | "updated_at" | "employee">;
export type UpdateTrainingRecordInput = Partial<CreateTrainingRecordInput>;

// Fetch all training records for the current user
export function useTrainingRecords() {
  return useQuery({
    queryKey: ["trainingRecords"],
    queryFn: async (): Promise<TrainingRecord[]> => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { data, error } = await supabase
        .from("training_records")
        .select(`
          *,
          employee:employer_employees(id, name)
        `)
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as TrainingRecord[];
    },
  });
}

// Fetch training records by status
export function useTrainingRecordsByStatus(status: TrainingStatus) {
  return useQuery({
    queryKey: ["trainingRecords", "status", status],
    queryFn: async (): Promise<TrainingRecord[]> => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { data, error } = await supabase
        .from("training_records")
        .select(`
          *,
          employee:employer_employees(id, name)
        `)
        .eq("user_id", user.id)
        .eq("status", status)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as TrainingRecord[];
    },
  });
}

// Fetch training records for a specific employee
export function useTrainingRecordsByEmployee(employeeId: string | undefined) {
  return useQuery({
    queryKey: ["trainingRecords", "employee", employeeId],
    queryFn: async (): Promise<TrainingRecord[]> => {
      if (!employeeId) return [];

      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { data, error } = await supabase
        .from("training_records")
        .select(`
          *,
          employee:employer_employees(id, name)
        `)
        .eq("user_id", user.id)
        .eq("employee_id", employeeId)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as TrainingRecord[];
    },
    enabled: !!employeeId,
  });
}

// Get training statistics
export function useTrainingStats() {
  return useQuery({
    queryKey: ["trainingRecords", "stats"],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { data, error } = await supabase
        .from("training_records")
        .select("id, status, expiry_date")
        .eq("user_id", user.id);

      if (error) throw error;

      const today = new Date().toISOString().split("T")[0];
      const thirtyDaysFromNow = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0];

      const stats = {
        total: data.length,
        completed: data.filter(t => t.status === "Completed").length,
        inProgress: data.filter(t => t.status === "In Progress").length,
        pending: data.filter(t => t.status === "Pending").length,
        expired: data.filter(t => t.status === "Expired" || (t.expiry_date && t.expiry_date < today)).length,
        expiringsSoon: data.filter(t =>
          t.expiry_date &&
          t.expiry_date >= today &&
          t.expiry_date <= thirtyDaysFromNow
        ).length,
      };

      return stats;
    },
  });
}

// Create a new training record
export function useCreateTrainingRecord() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (input: CreateTrainingRecordInput): Promise<TrainingRecord> => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { data, error } = await supabase
        .from("training_records")
        .insert({ ...input, user_id: user.id })
        .select(`
          *,
          employee:employer_employees(id, name)
        `)
        .single();

      if (error) throw error;
      return data as TrainingRecord;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["trainingRecords"] });
      toast({
        title: "Training added",
        description: "The training record has been created successfully.",
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

// Update an existing training record
export function useUpdateTrainingRecord() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ id, ...input }: UpdateTrainingRecordInput & { id: string }): Promise<TrainingRecord> => {
      const { data, error } = await supabase
        .from("training_records")
        .update({ ...input, updated_at: new Date().toISOString() })
        .eq("id", id)
        .select(`
          *,
          employee:employer_employees(id, name)
        `)
        .single();

      if (error) throw error;
      return data as TrainingRecord;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["trainingRecords"] });
      toast({
        title: "Training updated",
        description: "The training record has been updated successfully.",
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

// Update training status
export function useUpdateTrainingStatus() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ id, status, completed_date }: { id: string; status: TrainingStatus; completed_date?: string }): Promise<TrainingRecord> => {
      const updates: Partial<TrainingRecord> = {
        status,
        updated_at: new Date().toISOString()
      };

      if (status === "Completed" && !completed_date) {
        updates.completed_date = new Date().toISOString().split("T")[0];
      } else if (completed_date) {
        updates.completed_date = completed_date;
      }

      const { data, error } = await supabase
        .from("training_records")
        .update(updates)
        .eq("id", id)
        .select(`
          *,
          employee:employer_employees(id, name)
        `)
        .single();

      if (error) throw error;
      return data as TrainingRecord;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["trainingRecords"] });
      toast({
        title: "Status updated",
        description: `Training marked as ${data.status}.`,
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

// Delete a training record
export function useDeleteTrainingRecord() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (id: string): Promise<void> => {
      const { error } = await supabase
        .from("training_records")
        .delete()
        .eq("id", id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["trainingRecords"] });
      toast({
        title: "Training deleted",
        description: "The training record has been removed.",
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
