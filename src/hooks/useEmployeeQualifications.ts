import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export type QualificationType =
  | "ecs_card"
  | "18th_edition"
  | "2391"
  | "2394"
  | "2395"
  | "nvq_l3"
  | "cscs"
  | "cpcs"
  | "first_aid"
  | "ipaf"
  | "pasma"
  | "asbestos"
  | "confined_space"
  | "driving_licence"
  | "cpc"
  | "other";

export type QualificationStatus = "active" | "expiring" | "expired" | "pending_renewal";

export interface EmployeeQualification {
  id: string;
  user_id: string;
  employee_id: string;
  qualification_type: QualificationType;
  qualification_name: string;
  issuing_body?: string;
  certificate_number?: string;
  issue_date?: string;
  expiry_date?: string;
  status: QualificationStatus;
  file_url?: string;
  verified: boolean;
  verified_at?: string;
  verified_by?: string;
  reminder_sent_30: boolean;
  reminder_sent_7: boolean;
  notes?: string;
  created_at: string;
  updated_at: string;
  // Joined data
  employee?: {
    id: string;
    name: string;
  };
}

export type CreateQualificationInput = Omit<
  EmployeeQualification,
  "id" | "user_id" | "created_at" | "updated_at" | "employee" | "status" | "verified" | "verified_at" | "verified_by" | "reminder_sent_30" | "reminder_sent_7"
>;

export type UpdateQualificationInput = Partial<CreateQualificationInput>;

// Fetch all qualifications for the current user's employees
export function useEmployeeQualifications() {
  return useQuery({
    queryKey: ["employee-qualifications"],
    queryFn: async (): Promise<EmployeeQualification[]> => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { data, error } = await supabase
        .from("employee_qualifications")
        .select(`
          *,
          employee:employer_employees(id, name)
        `)
        .eq("user_id", user.id)
        .order("expiry_date", { ascending: true, nullsFirst: false });

      if (error) throw error;
      return data as EmployeeQualification[];
    },
  });
}

// Fetch qualifications for a specific employee
export function useEmployeeQualificationsByEmployee(employeeId: string | undefined) {
  return useQuery({
    queryKey: ["employee-qualifications", employeeId],
    queryFn: async (): Promise<EmployeeQualification[]> => {
      if (!employeeId) return [];

      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { data, error } = await supabase
        .from("employee_qualifications")
        .select(`
          *,
          employee:employer_employees(id, name)
        `)
        .eq("user_id", user.id)
        .eq("employee_id", employeeId)
        .order("expiry_date", { ascending: true, nullsFirst: false });

      if (error) throw error;
      return data as EmployeeQualification[];
    },
    enabled: !!employeeId,
  });
}

// Fetch qualifications that are expiring soon (within 30 days)
export function useExpiringQualifications() {
  return useQuery({
    queryKey: ["employee-qualifications", "expiring"],
    queryFn: async (): Promise<EmployeeQualification[]> => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const thirtyDaysFromNow = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0];

      const { data, error } = await supabase
        .from("employee_qualifications")
        .select(`
          *,
          employee:employer_employees(id, name)
        `)
        .eq("user_id", user.id)
        .lte("expiry_date", thirtyDaysFromNow)
        .in("status", ["active", "expiring"])
        .order("expiry_date", { ascending: true });

      if (error) throw error;
      return data as EmployeeQualification[];
    },
  });
}

// Get qualification statistics
export function useQualificationStats() {
  return useQuery({
    queryKey: ["employee-qualifications", "stats"],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { data, error } = await supabase
        .from("employee_qualifications")
        .select("id, status, expiry_date")
        .eq("user_id", user.id);

      if (error) throw error;

      const today = new Date().toISOString().split("T")[0];
      const thirtyDaysFromNow = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0];

      const stats = {
        total: data.length,
        active: data.filter(q => q.status === "active").length,
        expiring: data.filter(q =>
          q.expiry_date &&
          q.expiry_date >= today &&
          q.expiry_date <= thirtyDaysFromNow
        ).length,
        expired: data.filter(q => q.status === "expired").length,
      };

      return stats;
    },
  });
}

// Create a new qualification
export function useCreateQualification() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (input: CreateQualificationInput): Promise<EmployeeQualification> => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { data, error } = await supabase
        .from("employee_qualifications")
        .insert({ ...input, user_id: user.id })
        .select(`
          *,
          employee:employer_employees(id, name)
        `)
        .single();

      if (error) throw error;
      return data as EmployeeQualification;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["employee-qualifications"] });
      toast({
        title: "Qualification added",
        description: `${data.qualification_name} has been added.`,
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

// Update an existing qualification
export function useUpdateQualification() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ id, ...input }: UpdateQualificationInput & { id: string }): Promise<EmployeeQualification> => {
      const { data, error } = await supabase
        .from("employee_qualifications")
        .update({ ...input, updated_at: new Date().toISOString() })
        .eq("id", id)
        .select(`
          *,
          employee:employer_employees(id, name)
        `)
        .single();

      if (error) throw error;
      return data as EmployeeQualification;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employee-qualifications"] });
      toast({
        title: "Qualification updated",
        description: "The qualification has been updated.",
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

// Delete a qualification
export function useDeleteQualification() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (id: string): Promise<void> => {
      const { error } = await supabase
        .from("employee_qualifications")
        .delete()
        .eq("id", id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employee-qualifications"] });
      toast({
        title: "Qualification deleted",
        description: "The qualification has been removed.",
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

// Verify a qualification
export function useVerifyQualification() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (id: string): Promise<EmployeeQualification> => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { data, error } = await supabase
        .from("employee_qualifications")
        .update({
          verified: true,
          verified_at: new Date().toISOString(),
          verified_by: user.id,
          updated_at: new Date().toISOString(),
        })
        .eq("id", id)
        .select(`
          *,
          employee:employer_employees(id, name)
        `)
        .single();

      if (error) throw error;
      return data as EmployeeQualification;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employee-qualifications"] });
      toast({
        title: "Qualification verified",
        description: "The qualification has been marked as verified.",
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

// Sync ECS card from Elec-ID profile
export function useSyncEcsFromElecId() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (employeeId: string): Promise<EmployeeQualification | null> => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      // Fetch Elec-ID profile for this employee
      const { data: elecIdProfile, error: profileError } = await supabase
        .from("employer_elec_id_profiles")
        .select("ecs_card_type, ecs_expiry_date")
        .eq("user_id", user.id)
        .eq("employee_id", employeeId)
        .single();

      if (profileError) {
        if (profileError.code === "PGRST116") {
          throw new Error("No Elec-ID profile found for this employee");
        }
        throw profileError;
      }

      if (!elecIdProfile.ecs_card_type) {
        throw new Error("No ECS card information in Elec-ID profile");
      }

      // Check if ECS qualification already exists
      const { data: existing } = await supabase
        .from("employee_qualifications")
        .select("id")
        .eq("user_id", user.id)
        .eq("employee_id", employeeId)
        .eq("qualification_type", "ecs_card")
        .single();

      if (existing) {
        // Update existing
        const { data, error } = await supabase
          .from("employee_qualifications")
          .update({
            qualification_name: `ECS ${elecIdProfile.ecs_card_type} Card`,
            expiry_date: elecIdProfile.ecs_expiry_date,
            updated_at: new Date().toISOString(),
          })
          .eq("id", existing.id)
          .select(`
            *,
            employee:employer_employees(id, name)
          `)
          .single();

        if (error) throw error;
        return data as EmployeeQualification;
      } else {
        // Create new
        const { data, error } = await supabase
          .from("employee_qualifications")
          .insert({
            user_id: user.id,
            employee_id: employeeId,
            qualification_type: "ecs_card",
            qualification_name: `ECS ${elecIdProfile.ecs_card_type} Card`,
            issuing_body: "JIB/ECS",
            expiry_date: elecIdProfile.ecs_expiry_date,
          })
          .select(`
            *,
            employee:employer_employees(id, name)
          `)
          .single();

        if (error) throw error;
        return data as EmployeeQualification;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employee-qualifications"] });
      toast({
        title: "ECS card synced",
        description: "ECS card details have been synced from Elec-ID profile.",
      });
    },
    onError: (error) => {
      toast({
        title: "Sync failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}
