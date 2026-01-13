import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export type LeaveType = "annual" | "sick" | "unpaid" | "compassionate" | "training" | "bank_holiday";
export type LeaveStatus = "pending" | "approved" | "rejected" | "cancelled";

export interface HolidayAllowance {
  id: string;
  user_id: string;
  employee_id: string;
  year: number;
  total_days: number;
  carried_over: number;
  used_days: number;
  pending_days: number;
  created_at: string;
  updated_at: string;
  // Joined data
  employee?: {
    id: string;
    name: string;
    role: string;
  };
}

export interface LeaveRequest {
  id: string;
  user_id: string;
  employee_id: string;
  leave_type: LeaveType;
  start_date: string;
  end_date: string;
  half_day?: "am" | "pm";
  total_days: number;
  status: LeaveStatus;
  reason?: string;
  approved_by?: string;
  approved_date?: string;
  rejected_reason?: string;
  created_at: string;
  updated_at: string;
  // Joined data
  employee?: {
    id: string;
    name: string;
  };
}

// For compatibility with existing components
export interface LeaveRequestDisplay extends LeaveRequest {
  employeeId: string;
  employeeName: string;
  type: LeaveType;
  startDate: string;
  endDate: string;
  totalDays: number;
  halfDay?: "am" | "pm";
}

export type CreateLeaveRequestInput = {
  employee_id: string;
  leave_type: LeaveType;
  start_date: string;
  end_date: string;
  half_day?: "am" | "pm";
  total_days: number;
  reason?: string;
};

// Transform database record to display format
function toDisplayFormat(request: LeaveRequest): LeaveRequestDisplay {
  return {
    ...request,
    employeeId: request.employee_id,
    employeeName: request.employee?.name || "Unknown",
    type: request.leave_type,
    startDate: request.start_date,
    endDate: request.end_date,
    totalDays: request.total_days,
    halfDay: request.half_day,
  };
}

// Fetch all leave requests for the current user
export function useLeaveRequests() {
  return useQuery({
    queryKey: ["leaveRequests"],
    queryFn: async (): Promise<LeaveRequestDisplay[]> => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { data, error } = await supabase
        .from("employee_leave_requests")
        .select(`
          *,
          employee:employer_employees(id, name)
        `)
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return (data as LeaveRequest[]).map(toDisplayFormat);
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
}

// Fetch pending leave requests
export function usePendingLeaveRequests() {
  return useQuery({
    queryKey: ["leaveRequests", "pending"],
    queryFn: async (): Promise<LeaveRequestDisplay[]> => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { data, error } = await supabase
        .from("employee_leave_requests")
        .select(`
          *,
          employee:employer_employees(id, name)
        `)
        .eq("user_id", user.id)
        .eq("status", "pending")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return (data as LeaveRequest[]).map(toDisplayFormat);
    },
  });
}

// Fetch all holiday allowances for the current user
export function useHolidayAllowances() {
  return useQuery({
    queryKey: ["holidayAllowances"],
    queryFn: async (): Promise<HolidayAllowance[]> => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const currentYear = new Date().getFullYear();

      const { data, error } = await supabase
        .from("employee_holiday_allowances")
        .select(`
          *,
          employee:employer_employees(id, name, role)
        `)
        .eq("user_id", user.id)
        .eq("year", currentYear)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as HolidayAllowance[];
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
}

// Get allowance for a specific employee
export function useEmployeeAllowance(employeeId: string | undefined) {
  return useQuery({
    queryKey: ["holidayAllowances", "employee", employeeId],
    queryFn: async (): Promise<HolidayAllowance | null> => {
      if (!employeeId) return null;

      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const currentYear = new Date().getFullYear();

      const { data, error } = await supabase
        .from("employee_holiday_allowances")
        .select(`
          *,
          employee:employer_employees(id, name, role)
        `)
        .eq("user_id", user.id)
        .eq("employee_id", employeeId)
        .eq("year", currentYear)
        .maybeSingle();

      if (error) throw error;
      return data as HolidayAllowance | null;
    },
    enabled: !!employeeId,
  });
}

// Get leave statistics
export function useLeaveStats() {
  return useQuery({
    queryKey: ["leaveRequests", "stats"],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { data, error } = await supabase
        .from("employee_leave_requests")
        .select("id, status, leave_type, total_days")
        .eq("user_id", user.id);

      if (error) throw error;

      const stats = {
        total: data.length,
        pending: data.filter(r => r.status === "pending").length,
        approved: data.filter(r => r.status === "approved").length,
        rejected: data.filter(r => r.status === "rejected").length,
        cancelled: data.filter(r => r.status === "cancelled").length,
        totalDaysPending: data.filter(r => r.status === "pending").reduce((sum, r) => sum + r.total_days, 0),
        totalDaysApproved: data.filter(r => r.status === "approved").reduce((sum, r) => sum + r.total_days, 0),
      };

      return stats;
    },
  });
}

// Create a new leave request
export function useCreateLeaveRequest() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (input: CreateLeaveRequestInput): Promise<LeaveRequest> => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      // Create the leave request
      const { data, error } = await supabase
        .from("employee_leave_requests")
        .insert({
          ...input,
          user_id: user.id,
          status: "pending",
        })
        .select(`
          *,
          employee:employer_employees(id, name)
        `)
        .single();

      if (error) throw error;

      // Update pending days in allowance
      const currentYear = new Date().getFullYear();
      await supabase.rpc("increment_pending_days", {
        p_employee_id: input.employee_id,
        p_year: currentYear,
        p_days: input.total_days,
      }).catch(() => {
        // If RPC doesn't exist, do manual update
        return supabase
          .from("employee_holiday_allowances")
          .update({
            pending_days: supabase.rpc("coalesce", { value: "pending_days", default: 0 }) as unknown as number + input.total_days,
            updated_at: new Date().toISOString(),
          })
          .eq("employee_id", input.employee_id)
          .eq("year", currentYear);
      });

      return data as LeaveRequest;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["leaveRequests"] });
      queryClient.invalidateQueries({ queryKey: ["holidayAllowances"] });
      toast({
        title: "Request submitted",
        description: "The leave request has been submitted for approval.",
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

// Approve a leave request
export function useApproveLeaveRequest() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ id, approvedBy }: { id: string; approvedBy: string }): Promise<LeaveRequest> => {
      // Get the request first
      const { data: request, error: fetchError } = await supabase
        .from("employee_leave_requests")
        .select("*")
        .eq("id", id)
        .single();

      if (fetchError) throw fetchError;
      if (request.status !== "pending") throw new Error("Request is not pending");

      // Update the request
      const { data, error } = await supabase
        .from("employee_leave_requests")
        .update({
          status: "approved",
          approved_by: approvedBy,
          approved_date: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })
        .eq("id", id)
        .select(`
          *,
          employee:employer_employees(id, name)
        `)
        .single();

      if (error) throw error;

      // Update allowance - move from pending to used
      const currentYear = new Date().getFullYear();
      await supabase
        .from("employee_holiday_allowances")
        .update({
          used_days: supabase.sql`used_days + ${request.total_days}`,
          pending_days: supabase.sql`GREATEST(0, pending_days - ${request.total_days})`,
          updated_at: new Date().toISOString(),
        } as any)
        .eq("employee_id", request.employee_id)
        .eq("year", currentYear);

      return data as LeaveRequest;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["leaveRequests"] });
      queryClient.invalidateQueries({ queryKey: ["holidayAllowances"] });
      toast({
        title: "Leave approved",
        description: "The leave request has been approved.",
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

// Reject a leave request
export function useRejectLeaveRequest() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ id, reason }: { id: string; reason?: string }): Promise<LeaveRequest> => {
      // Get the request first
      const { data: request, error: fetchError } = await supabase
        .from("employee_leave_requests")
        .select("*")
        .eq("id", id)
        .single();

      if (fetchError) throw fetchError;
      if (request.status !== "pending") throw new Error("Request is not pending");

      // Update the request
      const { data, error } = await supabase
        .from("employee_leave_requests")
        .update({
          status: "rejected",
          rejected_reason: reason,
          updated_at: new Date().toISOString(),
        })
        .eq("id", id)
        .select(`
          *,
          employee:employer_employees(id, name)
        `)
        .single();

      if (error) throw error;

      // Update allowance - remove pending days
      const currentYear = new Date().getFullYear();
      await supabase
        .from("employee_holiday_allowances")
        .update({
          pending_days: supabase.sql`GREATEST(0, pending_days - ${request.total_days})`,
          updated_at: new Date().toISOString(),
        } as any)
        .eq("employee_id", request.employee_id)
        .eq("year", currentYear);

      return data as LeaveRequest;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["leaveRequests"] });
      queryClient.invalidateQueries({ queryKey: ["holidayAllowances"] });
      toast({
        title: "Leave rejected",
        description: "The leave request has been rejected.",
        variant: "destructive",
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

// Cancel a leave request
export function useCancelLeaveRequest() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (id: string): Promise<LeaveRequest> => {
      // Get the request first
      const { data: request, error: fetchError } = await supabase
        .from("employee_leave_requests")
        .select("*")
        .eq("id", id)
        .single();

      if (fetchError) throw fetchError;

      // Update the request
      const { data, error } = await supabase
        .from("employee_leave_requests")
        .update({
          status: "cancelled",
          updated_at: new Date().toISOString(),
        })
        .eq("id", id)
        .select(`
          *,
          employee:employer_employees(id, name)
        `)
        .single();

      if (error) throw error;

      // Restore days to allowance based on previous status
      const currentYear = new Date().getFullYear();
      if (request.status === "approved") {
        await supabase
          .from("employee_holiday_allowances")
          .update({
            used_days: supabase.sql`GREATEST(0, used_days - ${request.total_days})`,
            updated_at: new Date().toISOString(),
          } as any)
          .eq("employee_id", request.employee_id)
          .eq("year", currentYear);
      } else if (request.status === "pending") {
        await supabase
          .from("employee_holiday_allowances")
          .update({
            pending_days: supabase.sql`GREATEST(0, pending_days - ${request.total_days})`,
            updated_at: new Date().toISOString(),
          } as any)
          .eq("employee_id", request.employee_id)
          .eq("year", currentYear);
      }

      return data as LeaveRequest;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["leaveRequests"] });
      queryClient.invalidateQueries({ queryKey: ["holidayAllowances"] });
      toast({
        title: "Leave cancelled",
        description: "The leave request has been cancelled.",
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

// Create or update holiday allowance for an employee
export function useSetHolidayAllowance() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({
      employee_id,
      total_days,
      carried_over,
    }: {
      employee_id: string;
      total_days: number;
      carried_over?: number;
    }): Promise<HolidayAllowance> => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const currentYear = new Date().getFullYear();

      const { data, error } = await supabase
        .from("employee_holiday_allowances")
        .upsert(
          {
            user_id: user.id,
            employee_id,
            year: currentYear,
            total_days,
            carried_over: carried_over || 0,
            updated_at: new Date().toISOString(),
          },
          { onConflict: "employee_id,year" }
        )
        .select(`
          *,
          employee:employer_employees(id, name, role)
        `)
        .single();

      if (error) throw error;
      return data as HolidayAllowance;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["holidayAllowances"] });
      toast({
        title: "Allowance updated",
        description: "The holiday allowance has been saved.",
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
