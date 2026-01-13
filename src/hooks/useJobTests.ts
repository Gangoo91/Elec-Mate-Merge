import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export type TestType =
  | "Continuity"
  | "Insulation Resistance"
  | "Polarity"
  | "Earth Fault Loop Impedance"
  | "RCD"
  | "Prospective Fault Current"
  | "Ring Final Circuit"
  | "Functional Test"
  | "Visual Inspection"
  | "Other";

export type TestResult = "Pending" | "Pass" | "Fail" | "N/A" | "Limited";

export interface JobTest {
  id: string;
  user_id: string;
  job_id: string;
  test_type: TestType;
  circuit_ref?: string;
  circuit_description?: string;
  tested_by?: string;
  test_date?: string;
  result: TestResult;
  reading?: string;
  unit?: string;
  min_value?: string;
  max_value?: string;
  instrument_used?: string;
  instrument_serial?: string;
  notes?: string;
  photos: string[];
  verified_by?: string;
  verified_at?: string;
  created_at: string;
  updated_at: string;
  // Joined data
  job?: {
    id: string;
    title: string;
    client: string;
  };
  tester?: {
    id: string;
    name: string;
  };
}

export type CreateJobTestInput = Omit<JobTest, "id" | "user_id" | "created_at" | "updated_at" | "job" | "tester">;
export type UpdateJobTestInput = Partial<CreateJobTestInput>;

// Standard test types with their units
export const TEST_TYPE_CONFIG: Record<TestType, { unit: string; minLabel?: string; maxLabel?: string }> = {
  "Continuity": { unit: "Ω", maxLabel: "Max R" },
  "Insulation Resistance": { unit: "MΩ", minLabel: "Min IR" },
  "Polarity": { unit: "", },
  "Earth Fault Loop Impedance": { unit: "Ω", maxLabel: "Max Zs" },
  "RCD": { unit: "ms", maxLabel: "Max time" },
  "Prospective Fault Current": { unit: "kA", maxLabel: "Max PFC" },
  "Ring Final Circuit": { unit: "Ω", },
  "Functional Test": { unit: "", },
  "Visual Inspection": { unit: "", },
  "Other": { unit: "", },
};

// Fetch all job tests for the current user
export function useJobTests() {
  return useQuery({
    queryKey: ["jobTests"],
    queryFn: async (): Promise<JobTest[]> => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { data, error } = await supabase
        .from("job_tests")
        .select(`
          *,
          job:employer_jobs(id, title, client),
          tester:employer_employees!job_tests_tested_by_fkey(id, name)
        `)
        .eq("user_id", user.id)
        .order("test_date", { ascending: false });

      if (error) throw error;
      return data as JobTest[];
    },
  });
}

// Fetch job tests for a specific job
export function useJobTestsByJob(jobId: string | undefined) {
  return useQuery({
    queryKey: ["jobTests", "job", jobId],
    queryFn: async (): Promise<JobTest[]> => {
      if (!jobId) return [];

      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { data, error } = await supabase
        .from("job_tests")
        .select(`
          *,
          job:employer_jobs(id, title, client),
          tester:employer_employees!job_tests_tested_by_fkey(id, name)
        `)
        .eq("user_id", user.id)
        .eq("job_id", jobId)
        .order("circuit_ref", { ascending: true })
        .order("test_type", { ascending: true });

      if (error) throw error;
      return data as JobTest[];
    },
    enabled: !!jobId,
  });
}

// Fetch pending tests only
export function usePendingJobTests() {
  return useQuery({
    queryKey: ["jobTests", "pending"],
    queryFn: async (): Promise<JobTest[]> => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { data, error } = await supabase
        .from("job_tests")
        .select(`
          *,
          job:employer_jobs(id, title, client),
          tester:employer_employees!job_tests_tested_by_fkey(id, name)
        `)
        .eq("user_id", user.id)
        .eq("result", "Pending")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as JobTest[];
    },
  });
}

// Fetch failed tests only
export function useFailedJobTests() {
  return useQuery({
    queryKey: ["jobTests", "failed"],
    queryFn: async (): Promise<JobTest[]> => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { data, error } = await supabase
        .from("job_tests")
        .select(`
          *,
          job:employer_jobs(id, title, client),
          tester:employer_employees!job_tests_tested_by_fkey(id, name)
        `)
        .eq("user_id", user.id)
        .eq("result", "Fail")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as JobTest[];
    },
  });
}

// Fetch a single job test by ID
export function useJobTest(id: string | undefined) {
  return useQuery({
    queryKey: ["jobTests", id],
    queryFn: async (): Promise<JobTest | null> => {
      if (!id) return null;

      const { data, error } = await supabase
        .from("job_tests")
        .select(`
          *,
          job:employer_jobs(id, title, client),
          tester:employer_employees!job_tests_tested_by_fkey(id, name)
        `)
        .eq("id", id)
        .single();

      if (error) throw error;
      return data as JobTest;
    },
    enabled: !!id,
  });
}

// Get job test statistics
export function useJobTestStats() {
  return useQuery({
    queryKey: ["jobTests", "stats"],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { data, error } = await supabase
        .from("job_tests")
        .select("id, result, test_type, job_id")
        .eq("user_id", user.id);

      if (error) throw error;

      const stats = {
        total: data.length,
        pending: data.filter(t => t.result === "Pending").length,
        pass: data.filter(t => t.result === "Pass").length,
        fail: data.filter(t => t.result === "Fail").length,
        na: data.filter(t => t.result === "N/A").length,
        uniqueJobs: new Set(data.map(t => t.job_id)).size,
        passRate: data.length > 0
          ? Math.round((data.filter(t => t.result === "Pass").length / data.filter(t => t.result !== "Pending" && t.result !== "N/A").length) * 100)
          : 0,
      };

      return stats;
    },
  });
}

// Create a new job test
export function useCreateJobTest() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (input: CreateJobTestInput): Promise<JobTest> => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { data, error } = await supabase
        .from("job_tests")
        .insert({ ...input, user_id: user.id })
        .select(`
          *,
          job:employer_jobs(id, title, client),
          tester:employer_employees!job_tests_tested_by_fkey(id, name)
        `)
        .single();

      if (error) throw error;
      return data as JobTest;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["jobTests"] });
      toast({
        title: "Test recorded",
        description: "The test result has been saved successfully.",
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

// Batch create job tests
export function useBatchCreateJobTests() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (inputs: CreateJobTestInput[]): Promise<JobTest[]> => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const testsWithUser = inputs.map(input => ({ ...input, user_id: user.id }));

      const { data, error } = await supabase
        .from("job_tests")
        .insert(testsWithUser)
        .select(`
          *,
          job:employer_jobs(id, title, client),
          tester:employer_employees!job_tests_tested_by_fkey(id, name)
        `);

      if (error) throw error;
      return data as JobTest[];
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["jobTests"] });
      toast({
        title: "Tests recorded",
        description: `${data.length} test results have been saved.`,
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

// Update an existing job test
export function useUpdateJobTest() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ id, ...input }: UpdateJobTestInput & { id: string }): Promise<JobTest> => {
      const { data, error } = await supabase
        .from("job_tests")
        .update({ ...input, updated_at: new Date().toISOString() })
        .eq("id", id)
        .select(`
          *,
          job:employer_jobs(id, title, client),
          tester:employer_employees!job_tests_tested_by_fkey(id, name)
        `)
        .single();

      if (error) throw error;
      return data as JobTest;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["jobTests"] });
      queryClient.invalidateQueries({ queryKey: ["jobTests", data.id] });
      toast({
        title: "Test updated",
        description: "The test result has been updated successfully.",
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

// Record test result
export function useRecordTestResult() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ id, result, reading, notes }: { id: string; result: TestResult; reading?: string; notes?: string }): Promise<JobTest> => {
      const updates: Partial<JobTest> = {
        result,
        updated_at: new Date().toISOString()
      };

      if (reading) updates.reading = reading;
      if (notes) updates.notes = notes;

      const { data, error } = await supabase
        .from("job_tests")
        .update(updates)
        .eq("id", id)
        .select(`
          *,
          job:employer_jobs(id, title, client),
          tester:employer_employees!job_tests_tested_by_fkey(id, name)
        `)
        .single();

      if (error) throw error;
      return data as JobTest;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["jobTests"] });
      queryClient.invalidateQueries({ queryKey: ["jobTests", data.id] });
      toast({
        title: "Result recorded",
        description: `Test marked as ${data.result}.`,
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

// Verify a job test
export function useVerifyJobTest() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (id: string): Promise<JobTest> => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { data, error } = await supabase
        .from("job_tests")
        .update({
          verified_by: user.id,
          verified_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })
        .eq("id", id)
        .select(`
          *,
          job:employer_jobs(id, title, client),
          tester:employer_employees!job_tests_tested_by_fkey(id, name)
        `)
        .single();

      if (error) throw error;
      return data as JobTest;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["jobTests"] });
      queryClient.invalidateQueries({ queryKey: ["jobTests", data.id] });
      toast({
        title: "Test verified",
        description: "The test result has been verified.",
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

// Delete a job test
export function useDeleteJobTest() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (id: string): Promise<void> => {
      const { error } = await supabase
        .from("job_tests")
        .delete()
        .eq("id", id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["jobTests"] });
      toast({
        title: "Test deleted",
        description: "The test record has been removed.",
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
