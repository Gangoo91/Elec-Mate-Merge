import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export interface ProgressLog {
  id: string;
  user_id: string;
  job_id: string;
  date: string;
  weather?: string;
  temperature?: string;
  workers_on_site: number;
  work_completed?: string;
  work_planned?: string;
  materials_used?: string;
  issues_encountered?: string;
  delays?: string;
  visitor_log?: string;
  photos: string[];
  signed_off: boolean;
  signed_off_by?: string;
  signed_off_at?: string;
  created_at: string;
  updated_at: string;
  // Joined data
  job?: {
    id: string;
    title: string;
    client: string;
  };
}

export type CreateProgressLogInput = Omit<ProgressLog, "id" | "user_id" | "created_at" | "updated_at" | "job">;
export type UpdateProgressLogInput = Partial<CreateProgressLogInput>;

// Fetch all progress logs for the current user
export function useProgressLogs() {
  return useQuery({
    queryKey: ["progressLogs"],
    queryFn: async (): Promise<ProgressLog[]> => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { data, error } = await supabase
        .from("progress_logs")
        .select(`
          *,
          job:employer_jobs(id, title, client)
        `)
        .eq("user_id", user.id)
        .order("date", { ascending: false });

      if (error) throw error;
      return data as ProgressLog[];
    },
  });
}

// Fetch progress logs for a specific job
export function useJobProgressLogs(jobId: string | undefined) {
  return useQuery({
    queryKey: ["progressLogs", "job", jobId],
    queryFn: async (): Promise<ProgressLog[]> => {
      if (!jobId) return [];

      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { data, error } = await supabase
        .from("progress_logs")
        .select(`
          *,
          job:employer_jobs(id, title, client)
        `)
        .eq("user_id", user.id)
        .eq("job_id", jobId)
        .order("date", { ascending: false });

      if (error) throw error;
      return data as ProgressLog[];
    },
    enabled: !!jobId,
  });
}

// Fetch a single progress log by ID
export function useProgressLog(id: string | undefined) {
  return useQuery({
    queryKey: ["progressLogs", id],
    queryFn: async (): Promise<ProgressLog | null> => {
      if (!id) return null;

      const { data, error } = await supabase
        .from("progress_logs")
        .select(`
          *,
          job:employer_jobs(id, title, client)
        `)
        .eq("id", id)
        .single();

      if (error) throw error;
      return data as ProgressLog;
    },
    enabled: !!id,
  });
}

// Fetch progress logs for a date range
export function useProgressLogsByDateRange(startDate?: string, endDate?: string) {
  return useQuery({
    queryKey: ["progressLogs", "dateRange", startDate, endDate],
    queryFn: async (): Promise<ProgressLog[]> => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      let query = supabase
        .from("progress_logs")
        .select(`
          *,
          job:employer_jobs(id, title, client)
        `)
        .eq("user_id", user.id);

      if (startDate) {
        query = query.gte("date", startDate);
      }
      if (endDate) {
        query = query.lte("date", endDate);
      }

      const { data, error } = await query.order("date", { ascending: false });

      if (error) throw error;
      return data as ProgressLog[];
    },
    enabled: !!startDate || !!endDate,
  });
}

// Get progress log statistics
export function useProgressLogStats() {
  return useQuery({
    queryKey: ["progressLogs", "stats"],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { data, error } = await supabase
        .from("progress_logs")
        .select("id, date, signed_off, workers_on_site, job_id")
        .eq("user_id", user.id);

      if (error) throw error;

      const today = new Date().toISOString().split("T")[0];
      const thisWeekStart = new Date();
      thisWeekStart.setDate(thisWeekStart.getDate() - 7);
      const weekAgo = thisWeekStart.toISOString().split("T")[0];

      const stats = {
        total: data.length,
        thisWeek: data.filter(l => l.date >= weekAgo).length,
        today: data.filter(l => l.date === today).length,
        signedOff: data.filter(l => l.signed_off).length,
        pending: data.filter(l => !l.signed_off).length,
        uniqueJobs: new Set(data.map(l => l.job_id)).size,
        totalWorkers: data.reduce((sum, l) => sum + (l.workers_on_site || 0), 0),
      };

      return stats;
    },
  });
}

// Create a new progress log
export function useCreateProgressLog() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (input: CreateProgressLogInput): Promise<ProgressLog> => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { data, error } = await supabase
        .from("progress_logs")
        .insert({ ...input, user_id: user.id })
        .select(`
          *,
          job:employer_jobs(id, title, client)
        `)
        .single();

      if (error) throw error;
      return data as ProgressLog;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["progressLogs"] });
      toast({
        title: "Progress log created",
        description: "The daily log has been saved successfully.",
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

// Update an existing progress log
export function useUpdateProgressLog() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ id, ...input }: UpdateProgressLogInput & { id: string }): Promise<ProgressLog> => {
      const { data, error } = await supabase
        .from("progress_logs")
        .update({ ...input, updated_at: new Date().toISOString() })
        .eq("id", id)
        .select(`
          *,
          job:employer_jobs(id, title, client)
        `)
        .single();

      if (error) throw error;
      return data as ProgressLog;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["progressLogs"] });
      queryClient.invalidateQueries({ queryKey: ["progressLogs", data.id] });
      toast({
        title: "Progress log updated",
        description: "The daily log has been updated successfully.",
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

// Sign off a progress log
export function useSignOffProgressLog() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (id: string): Promise<ProgressLog> => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { data, error } = await supabase
        .from("progress_logs")
        .update({
          signed_off: true,
          signed_off_by: user.id,
          signed_off_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })
        .eq("id", id)
        .select(`
          *,
          job:employer_jobs(id, title, client)
        `)
        .single();

      if (error) throw error;
      return data as ProgressLog;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["progressLogs"] });
      queryClient.invalidateQueries({ queryKey: ["progressLogs", data.id] });
      toast({
        title: "Log signed off",
        description: "The progress log has been signed off.",
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

// Delete a progress log
export function useDeleteProgressLog() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (id: string): Promise<void> => {
      const { error } = await supabase
        .from("progress_logs")
        .delete()
        .eq("id", id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["progressLogs"] });
      toast({
        title: "Progress log deleted",
        description: "The daily log has been removed.",
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
