import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export type IssueType = "Snag" | "Variation" | "RFI" | "Defect" | "Delay" | "Other";
export type IssueSeverity = "Low" | "Medium" | "High" | "Critical";
export type IssueStatus = "Open" | "In Progress" | "Resolved" | "Closed" | "Rejected";

export interface JobIssue {
  id: string;
  user_id: string;
  job_id: string;
  title: string;
  description?: string;
  issue_type: IssueType;
  severity: IssueSeverity;
  status: IssueStatus;
  assigned_to?: string;
  reported_by?: string;
  location?: string;
  due_date?: string;
  photos: string[];
  resolution_notes?: string;
  resolved_by?: string;
  resolved_at?: string;
  created_at: string;
  updated_at: string;
  // Joined data
  job?: {
    id: string;
    title: string;
    client: string;
  };
  assigned_employee?: {
    id: string;
    name: string;
  };
}

export type CreateJobIssueInput = Omit<JobIssue, "id" | "user_id" | "created_at" | "updated_at" | "job" | "assigned_employee">;
export type UpdateJobIssueInput = Partial<CreateJobIssueInput>;

// Fetch all job issues for the current user
export function useJobIssues() {
  return useQuery({
    queryKey: ["jobIssues"],
    queryFn: async (): Promise<JobIssue[]> => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { data, error } = await supabase
        .from("job_issues")
        .select(`
          *,
          job:jobs(id, title, client),
          assigned_employee:employer_employees!job_issues_assigned_to_fkey(id, name)
        `)
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as JobIssue[];
    },
  });
}

// Fetch job issues for a specific job
export function useJobIssuesByJob(jobId: string | undefined) {
  return useQuery({
    queryKey: ["jobIssues", "job", jobId],
    queryFn: async (): Promise<JobIssue[]> => {
      if (!jobId) return [];

      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { data, error } = await supabase
        .from("job_issues")
        .select(`
          *,
          job:jobs(id, title, client),
          assigned_employee:employer_employees!job_issues_assigned_to_fkey(id, name)
        `)
        .eq("user_id", user.id)
        .eq("job_id", jobId)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as JobIssue[];
    },
    enabled: !!jobId,
  });
}

// Fetch open issues only
export function useOpenJobIssues() {
  return useQuery({
    queryKey: ["jobIssues", "open"],
    queryFn: async (): Promise<JobIssue[]> => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { data, error } = await supabase
        .from("job_issues")
        .select(`
          *,
          job:jobs(id, title, client),
          assigned_employee:employer_employees!job_issues_assigned_to_fkey(id, name)
        `)
        .eq("user_id", user.id)
        .in("status", ["Open", "In Progress"])
        .order("severity", { ascending: true })
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as JobIssue[];
    },
  });
}

// Fetch a single job issue by ID
export function useJobIssue(id: string | undefined) {
  return useQuery({
    queryKey: ["jobIssues", id],
    queryFn: async (): Promise<JobIssue | null> => {
      if (!id) return null;

      const { data, error } = await supabase
        .from("job_issues")
        .select(`
          *,
          job:jobs(id, title, client),
          assigned_employee:employer_employees!job_issues_assigned_to_fkey(id, name)
        `)
        .eq("id", id)
        .single();

      if (error) throw error;
      return data as JobIssue;
    },
    enabled: !!id,
  });
}

// Get job issue statistics
export function useJobIssueStats() {
  return useQuery({
    queryKey: ["jobIssues", "stats"],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { data, error } = await supabase
        .from("job_issues")
        .select("id, status, severity, issue_type")
        .eq("user_id", user.id);

      if (error) throw error;

      const stats = {
        total: data.length,
        open: data.filter(i => i.status === "Open").length,
        inProgress: data.filter(i => i.status === "In Progress").length,
        resolved: data.filter(i => i.status === "Resolved").length,
        closed: data.filter(i => i.status === "Closed").length,
        critical: data.filter(i => i.severity === "Critical").length,
        high: data.filter(i => i.severity === "High").length,
        snags: data.filter(i => i.issue_type === "Snag").length,
        variations: data.filter(i => i.issue_type === "Variation").length,
        defects: data.filter(i => i.issue_type === "Defect").length,
      };

      return stats;
    },
  });
}

// Create a new job issue
export function useCreateJobIssue() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (input: CreateJobIssueInput): Promise<JobIssue> => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { data, error } = await supabase
        .from("job_issues")
        .insert({ ...input, user_id: user.id })
        .select(`
          *,
          job:jobs(id, title, client),
          assigned_employee:employer_employees!job_issues_assigned_to_fkey(id, name)
        `)
        .single();

      if (error) throw error;
      return data as JobIssue;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["jobIssues"] });
      toast({
        title: "Issue created",
        description: "The job issue has been logged successfully.",
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

// Update an existing job issue
export function useUpdateJobIssue() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ id, ...input }: UpdateJobIssueInput & { id: string }): Promise<JobIssue> => {
      const { data, error } = await supabase
        .from("job_issues")
        .update({ ...input, updated_at: new Date().toISOString() })
        .eq("id", id)
        .select(`
          *,
          job:jobs(id, title, client),
          assigned_employee:employer_employees!job_issues_assigned_to_fkey(id, name)
        `)
        .single();

      if (error) throw error;
      return data as JobIssue;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["jobIssues"] });
      queryClient.invalidateQueries({ queryKey: ["jobIssues", data.id] });
      toast({
        title: "Issue updated",
        description: "The job issue has been updated successfully.",
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

// Update issue status
export function useUpdateJobIssueStatus() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ id, status, resolution_notes }: { id: string; status: IssueStatus; resolution_notes?: string }): Promise<JobIssue> => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const updates: Partial<JobIssue> = {
        status,
        updated_at: new Date().toISOString()
      };

      if (status === "Resolved" || status === "Closed") {
        updates.resolved_at = new Date().toISOString();
        updates.resolved_by = user.id;
        if (resolution_notes) {
          updates.resolution_notes = resolution_notes;
        }
      }

      const { data, error } = await supabase
        .from("job_issues")
        .update(updates)
        .eq("id", id)
        .select(`
          *,
          job:jobs(id, title, client),
          assigned_employee:employer_employees!job_issues_assigned_to_fkey(id, name)
        `)
        .single();

      if (error) throw error;
      return data as JobIssue;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["jobIssues"] });
      queryClient.invalidateQueries({ queryKey: ["jobIssues", data.id] });
      toast({
        title: "Status updated",
        description: `Issue marked as ${data.status}.`,
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

// Fetch issues by type (Snag, Defect, etc.)
export function useJobIssuesByType(types: IssueType[]) {
  return useQuery({
    queryKey: ["jobIssues", "types", types],
    queryFn: async (): Promise<JobIssue[]> => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { data, error } = await supabase
        .from("job_issues")
        .select(`
          *,
          job:jobs(id, title, client),
          assigned_employee:employer_employees!job_issues_assigned_to_fkey(id, name)
        `)
        .eq("user_id", user.id)
        .in("issue_type", types)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as JobIssue[];
    },
  });
}

// Delete a job issue
export function useDeleteJobIssue() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (id: string): Promise<void> => {
      const { error } = await supabase
        .from("job_issues")
        .delete()
        .eq("id", id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["jobIssues"] });
      toast({
        title: "Issue deleted",
        description: "The job issue has been removed.",
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
