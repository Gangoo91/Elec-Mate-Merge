import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export interface IsolationStep {
  stepNumber: number;
  title: string;
  description: string;
  completed: boolean;
  completedAt?: string;
  photoUrl?: string;
  notes?: string;
}

export interface SafeIsolationRecord {
  id: string;
  user_id: string;
  rams_id: string | null;
  permit_id: string | null;
  site_address: string;
  circuit_description: string;
  distribution_board: string | null;
  isolation_device: string | null;
  lock_off_number: string | null;
  voltage_detector_serial: string | null;
  voltage_detector_calibration_date: string | null;
  proving_unit_used: boolean;
  steps: IsolationStep[];
  isolation_completed_at: string | null;
  isolator_name: string | null;
  isolator_signature: string | null;
  verifier_name: string | null;
  verifier_signature: string | null;
  re_energisation_at: string | null;
  re_energisation_by: string | null;
  status: "in_progress" | "isolated" | "re_energised" | "cancelled";
  created_at: string;
  updated_at: string;
}

const GS38_STEPS: Omit<IsolationStep, "completed" | "completedAt">[] = [
  {
    stepNumber: 1,
    title: "Identify Circuit",
    description:
      "Identify the circuit or equipment to be worked on. Confirm with drawings/schedules.",
  },
  {
    stepNumber: 2,
    title: "Identify Isolation Point",
    description:
      "Identify the means of disconnection — switch, fuse carrier, MCB, or isolator.",
  },
  {
    stepNumber: 3,
    title: "Prove Voltage Indicator",
    description:
      "Verify your voltage indicator works using a proving unit or known live source.",
  },
  {
    stepNumber: 4,
    title: "Isolate Circuit",
    description:
      "Disconnect the supply at the identified isolation point.",
  },
  {
    stepNumber: 5,
    title: "Secure Isolation",
    description:
      "Apply lock-off device and warning notice. Record lock-off number.",
  },
  {
    stepNumber: 6,
    title: "Prove Dead",
    description:
      "Test between all conductors and between each conductor and earth at the point of work.",
  },
  {
    stepNumber: 7,
    title: "Re-verify Indicator",
    description:
      "Re-test the voltage indicator against the proving unit to confirm it still works correctly.",
  },
  {
    stepNumber: 8,
    title: "Begin Work",
    description:
      "Circuit confirmed dead. Safe to commence work.",
  },
];

export function useSafeIsolationRecords() {
  return useQuery({
    queryKey: ["safe-isolation-records"],
    queryFn: async (): Promise<SafeIsolationRecord[]> => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { data, error } = await supabase
        .from("safe_isolation_records")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return (data ?? []) as unknown as SafeIsolationRecord[];
    },
    staleTime: 30_000,
  });
}

export function useCreateIsolationRecord() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (record: {
      site_address: string;
      circuit_description: string;
      distribution_board?: string;
      voltage_detector_serial?: string;
      voltage_detector_calibration_date?: string;
      rams_id?: string;
      permit_id?: string;
    }) => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const steps = GS38_STEPS.map((s) => ({
        ...s,
        completed: false,
      }));

      const { data, error } = await supabase
        .from("safe_isolation_records")
        .insert({
          user_id: user.id,
          ...record,
          steps,
          status: "in_progress",
        })
        .select()
        .single();

      if (error) throw error;
      return data as unknown as SafeIsolationRecord;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["safe-isolation-records"],
      });
      toast({
        title: "Isolation Record Created",
        description: "GS38 safe isolation procedure started.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Could not create isolation record.",
        variant: "destructive",
      });
    },
  });
}

export function useUpdateIsolationRecord() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      ...updates
    }: Partial<SafeIsolationRecord> & { id: string }) => {
      const { data, error } = await supabase
        .from("safe_isolation_records")
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["safe-isolation-records"],
      });
    },
  });
}

export { GS38_STEPS };
