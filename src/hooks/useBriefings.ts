import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export type BriefingType = "Toolbox Talk" | "Site Induction" | "Safety Briefing" | "Method Statement" | "Emergency Procedures" | "PPE Reminder";
export type BriefingStatus = "Scheduled" | "Completed" | "Cancelled";

export interface BriefingAttendee {
  id: string;
  briefing_id: string;
  employee_id: string;
  acknowledged: boolean;
  acknowledged_at?: string;
  signature_url?: string;
  notes?: string;
  created_at: string;
  // Joined data
  employee?: {
    id: string;
    name: string;
  };
}

export interface Briefing {
  id: string;
  user_id: string;
  job_id?: string;
  title: string;
  briefing_type?: BriefingType;
  content?: string;
  date: string;
  time?: string;
  location?: string;
  presenter?: string;
  status: BriefingStatus;
  notes?: string;
  created_at: string;
  updated_at: string;
  // Joined data
  job?: {
    id: string;
    title: string;
  };
  attendees?: BriefingAttendee[];
  attendee_count?: number;
  acknowledged_count?: number;
}

export type CreateBriefingInput = Omit<Briefing, "id" | "user_id" | "created_at" | "updated_at" | "job" | "attendees" | "attendee_count" | "acknowledged_count">;
export type UpdateBriefingInput = Partial<CreateBriefingInput>;

// Fetch all briefings for the current user
export function useBriefings() {
  return useQuery({
    queryKey: ["briefings"],
    queryFn: async (): Promise<Briefing[]> => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      // Get briefings with job info
      const { data: briefings, error: briefingsError } = await supabase
        .from("briefings")
        .select(`
          *,
          job:jobs(id, title)
        `)
        .eq("user_id", user.id)
        .order("date", { ascending: false });

      if (briefingsError) throw briefingsError;

      // Get attendee counts for each briefing
      const briefingIds = briefings.map(b => b.id);
      if (briefingIds.length === 0) return briefings as Briefing[];

      const { data: attendeeCounts, error: countError } = await supabase
        .from("briefing_attendees")
        .select("briefing_id, acknowledged")
        .in("briefing_id", briefingIds);

      if (countError) throw countError;

      // Calculate counts per briefing
      const countsMap = new Map<string, { total: number; acknowledged: number }>();
      attendeeCounts?.forEach(a => {
        const current = countsMap.get(a.briefing_id) || { total: 0, acknowledged: 0 };
        current.total++;
        if (a.acknowledged) current.acknowledged++;
        countsMap.set(a.briefing_id, current);
      });

      // Merge counts into briefings
      return briefings.map(b => ({
        ...b,
        attendee_count: countsMap.get(b.id)?.total || 0,
        acknowledged_count: countsMap.get(b.id)?.acknowledged || 0,
      })) as Briefing[];
    },
  });
}

// Fetch upcoming briefings (scheduled)
export function useUpcomingBriefings() {
  return useQuery({
    queryKey: ["briefings", "upcoming"],
    queryFn: async (): Promise<Briefing[]> => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const today = new Date().toISOString().split("T")[0];

      const { data, error } = await supabase
        .from("briefings")
        .select(`
          *,
          job:jobs(id, title)
        `)
        .eq("user_id", user.id)
        .eq("status", "Scheduled")
        .gte("date", today)
        .order("date", { ascending: true });

      if (error) throw error;
      return data as Briefing[];
    },
  });
}

// Fetch a single briefing with attendees
export function useBriefingWithAttendees(briefingId: string | undefined) {
  return useQuery({
    queryKey: ["briefings", briefingId],
    queryFn: async (): Promise<Briefing | null> => {
      if (!briefingId) return null;

      const { data: briefing, error: briefingError } = await supabase
        .from("briefings")
        .select(`
          *,
          job:jobs(id, title)
        `)
        .eq("id", briefingId)
        .single();

      if (briefingError) throw briefingError;

      // Get attendees
      const { data: attendees, error: attendeesError } = await supabase
        .from("briefing_attendees")
        .select(`
          *,
          employee:employer_employees(id, name)
        `)
        .eq("briefing_id", briefingId)
        .order("created_at", { ascending: true });

      if (attendeesError) throw attendeesError;

      return {
        ...briefing,
        attendees: attendees as BriefingAttendee[],
        attendee_count: attendees?.length || 0,
        acknowledged_count: attendees?.filter(a => a.acknowledged).length || 0,
      } as Briefing;
    },
    enabled: !!briefingId,
  });
}

// Get briefing statistics
export function useBriefingStats() {
  return useQuery({
    queryKey: ["briefings", "stats"],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      // Get briefings
      const { data: briefings, error } = await supabase
        .from("briefings")
        .select("id, status, date")
        .eq("user_id", user.id);

      if (error) throw error;

      // Get attendee data
      const briefingIds = briefings.map(b => b.id);
      let totalAttendees = 0;
      let totalAcknowledged = 0;

      if (briefingIds.length > 0) {
        const { data: attendees, error: attendeesError } = await supabase
          .from("briefing_attendees")
          .select("briefing_id, acknowledged")
          .in("briefing_id", briefingIds);

        if (attendeesError) throw attendeesError;

        const completedBriefingIds = new Set(
          briefings.filter(b => b.status === "Completed").map(b => b.id)
        );

        attendees?.forEach(a => {
          if (completedBriefingIds.has(a.briefing_id)) {
            totalAttendees++;
            if (a.acknowledged) totalAcknowledged++;
          }
        });
      }

      const today = new Date().toISOString().split("T")[0];

      const stats = {
        total: briefings.length,
        completed: briefings.filter(b => b.status === "Completed").length,
        scheduled: briefings.filter(b => b.status === "Scheduled" && b.date >= today).length,
        cancelled: briefings.filter(b => b.status === "Cancelled").length,
        avgAttendance: totalAttendees > 0 ? Math.round((totalAcknowledged / totalAttendees) * 100) : 100,
        totalAttendees,
        totalAcknowledged,
      };

      return stats;
    },
  });
}

// Create a new briefing
export function useCreateBriefing() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (input: CreateBriefingInput): Promise<Briefing> => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { data, error } = await supabase
        .from("briefings")
        .insert({ ...input, user_id: user.id })
        .select(`
          *,
          job:jobs(id, title)
        `)
        .single();

      if (error) throw error;
      return data as Briefing;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["briefings"] });
      toast({
        title: "Briefing created",
        description: `${data.title} has been scheduled.`,
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

// Update a briefing
export function useUpdateBriefing() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ id, ...input }: UpdateBriefingInput & { id: string }): Promise<Briefing> => {
      const { data, error } = await supabase
        .from("briefings")
        .update({ ...input, updated_at: new Date().toISOString() })
        .eq("id", id)
        .select(`
          *,
          job:jobs(id, title)
        `)
        .single();

      if (error) throw error;
      return data as Briefing;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["briefings"] });
      toast({
        title: "Briefing updated",
        description: "The briefing has been updated successfully.",
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

// Mark briefing as completed
export function useCompleteBriefing() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (id: string): Promise<Briefing> => {
      const { data, error } = await supabase
        .from("briefings")
        .update({
          status: "Completed",
          updated_at: new Date().toISOString()
        })
        .eq("id", id)
        .select(`
          *,
          job:jobs(id, title)
        `)
        .single();

      if (error) throw error;
      return data as Briefing;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["briefings"] });
      toast({
        title: "Briefing completed",
        description: `${data.title} has been marked as completed.`,
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

// Delete a briefing
export function useDeleteBriefing() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (id: string): Promise<void> => {
      const { error } = await supabase
        .from("briefings")
        .delete()
        .eq("id", id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["briefings"] });
      toast({
        title: "Briefing deleted",
        description: "The briefing has been removed.",
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

// Add attendee to briefing
export function useAddBriefingAttendee() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ briefingId, employeeId }: { briefingId: string; employeeId: string }): Promise<BriefingAttendee> => {
      const { data, error } = await supabase
        .from("briefing_attendees")
        .insert({
          briefing_id: briefingId,
          employee_id: employeeId,
        })
        .select(`
          *,
          employee:employer_employees(id, name)
        `)
        .single();

      if (error) throw error;
      return data as BriefingAttendee;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["briefings"] });
      toast({
        title: "Attendee added",
        description: "The team member has been added to the briefing.",
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

// Remove attendee from briefing
export function useRemoveBriefingAttendee() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (id: string): Promise<void> => {
      const { error } = await supabase
        .from("briefing_attendees")
        .delete()
        .eq("id", id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["briefings"] });
      toast({
        title: "Attendee removed",
        description: "The team member has been removed from the briefing.",
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

// Acknowledge attendance (sign in)
export function useAcknowledgeAttendance() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ id, signatureUrl }: { id: string; signatureUrl?: string }): Promise<BriefingAttendee> => {
      const { data, error } = await supabase
        .from("briefing_attendees")
        .update({
          acknowledged: true,
          acknowledged_at: new Date().toISOString(),
          signature_url: signatureUrl,
        })
        .eq("id", id)
        .select(`
          *,
          employee:employer_employees(id, name)
        `)
        .single();

      if (error) throw error;
      return data as BriefingAttendee;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["briefings"] });
      toast({
        title: "Attendance recorded",
        description: "The attendance has been acknowledged.",
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

// Add multiple attendees at once
export function useAddMultipleAttendees() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ briefingId, employeeIds }: { briefingId: string; employeeIds: string[] }): Promise<void> => {
      const attendees = employeeIds.map(employeeId => ({
        briefing_id: briefingId,
        employee_id: employeeId,
      }));

      const { error } = await supabase
        .from("briefing_attendees")
        .upsert(attendees, { onConflict: "briefing_id,employee_id" });

      if (error) throw error;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["briefings"] });
      toast({
        title: "Attendees added",
        description: `${variables.employeeIds.length} team members added to the briefing.`,
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
