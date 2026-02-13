import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useEffect } from "react";
import type { Json } from "@/integrations/supabase/types";

export type PermitType = "hot-work" | "confined-space" | "electrical-isolation" | "working-at-height" | "excavation";
export type PermitStatus = "active" | "expired" | "cancelled" | "closed";

export interface PermitToWork {
  id: string;
  user_id: string;
  type: PermitType;
  title: string;
  location: string;
  description: string | null;
  issuer_name: string;
  issuer_signature: string | null;
  receiver_name: string;
  receiver_signature: string | null;
  hazards: Json;
  precautions: string[];
  ppe_required: string[];
  start_time: string;
  end_time: string;
  duration_hours: number;
  status: PermitStatus;
  emergency_procedures: string | null;
  additional_notes: string | null;
  closed_at: string | null;
  closed_by: string | null;
  pdf_url: string | null;
  created_at: string;
  updated_at: string;
}

export type CreatePermitInput = Omit<PermitToWork, "id" | "user_id" | "created_at" | "updated_at" | "pdf_url" | "closed_at" | "closed_by">;

export function usePermits() {
  return useQuery({
    queryKey: ["permits-to-work"],
    queryFn: async (): Promise<PermitToWork[]> => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { data, error } = await supabase
        .from("permits_to_work")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as PermitToWork[];
    },
  });
}

export function useActivePermits() {
  return useQuery({
    queryKey: ["permits-to-work", "active"],
    queryFn: async (): Promise<PermitToWork[]> => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { data, error } = await supabase
        .from("permits_to_work")
        .select("*")
        .eq("user_id", user.id)
        .eq("status", "active")
        .order("end_time", { ascending: true });

      if (error) throw error;
      return data as PermitToWork[];
    },
  });
}

export function useCreatePermit() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (input: CreatePermitInput): Promise<PermitToWork> => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { data, error } = await supabase
        .from("permits_to_work")
        .insert({ ...input, user_id: user.id })
        .select("*")
        .single();

      if (error) throw error;
      return data as PermitToWork;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["permits-to-work"] });
      toast({ title: "Permit issued", description: "Permit to work has been issued successfully." });
    },
    onError: (error) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });
}

export function useClosePermit() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ id, closedBy }: { id: string; closedBy?: string }): Promise<PermitToWork> => {
      const { data, error } = await supabase
        .from("permits_to_work")
        .update({
          status: "closed" as const,
          closed_at: new Date().toISOString(),
          closed_by: closedBy,
        })
        .eq("id", id)
        .select("*")
        .single();

      if (error) throw error;
      return data as PermitToWork;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["permits-to-work"] });
      toast({ title: "Permit closed", description: "Permit has been closed." });
    },
    onError: (error) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });
}

export function useCancelPermit() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (id: string): Promise<PermitToWork> => {
      const { data, error } = await supabase
        .from("permits_to_work")
        .update({ status: "cancelled" as const })
        .eq("id", id)
        .select("*")
        .single();

      if (error) throw error;
      return data as PermitToWork;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["permits-to-work"] });
      toast({ title: "Permit cancelled", description: "Permit has been cancelled." });
    },
    onError: (error) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });
}

// Auto-expire permits that have passed their end_time
export function usePermitExpiryCheck() {
  const queryClient = useQueryClient();

  useEffect(() => {
    const expirePermits = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const now = new Date().toISOString();

      const { error } = await supabase
        .from("permits_to_work")
        .update({ status: "expired" as const })
        .eq("user_id", user.id)
        .eq("status", "active")
        .lt("end_time", now);

      if (!error) {
        queryClient.invalidateQueries({ queryKey: ["permits-to-work"] });
      }
    };

    expirePermits();
    const interval = setInterval(expirePermits, 60000);
    return () => clearInterval(interval);
  }, [queryClient]);
}
