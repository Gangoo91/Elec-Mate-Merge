import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export interface AccidentRecord {
  id: string;
  user_id: string;
  injured_name: string;
  injured_role: string | null;
  injured_employer: string | null;
  injured_address: string | null;
  incident_date: string;
  incident_time: string | null;
  location: string;
  location_detail: string | null;
  injury_type: string;
  body_part: string;
  severity: "minor" | "moderate" | "major" | "fatal";
  injury_description: string | null;
  incident_description: string;
  activity_at_time: string | null;
  cause: string | null;
  witnesses: string | null;
  first_aid_given: boolean;
  first_aid_details: string | null;
  first_aider_name: string | null;
  hospital_visit: boolean;
  hospital_name: string | null;
  time_off_work: boolean;
  days_off: number;
  return_date: string | null;
  reported_to: string | null;
  reported_date: string | null;
  is_riddor_reportable: boolean;
  riddor_category: string | null;
  riddor_reference: string | null;
  riddor_reported: boolean;
  recorded_by: string;
  additional_notes: string | null;
  corrective_actions: string | null;
  pdf_url: string | null;
  photo_urls: string[] | null;
  created_at: string;
  updated_at: string;
}

export type CreateAccidentRecordInput = Omit<AccidentRecord, "id" | "user_id" | "created_at" | "updated_at" | "pdf_url" | "photo_urls">;

export function useAccidentRecords() {
  return useQuery({
    queryKey: ["accident-records"],
    queryFn: async (): Promise<AccidentRecord[]> => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { data, error } = await supabase
        .from("accident_records")
        .select("*")
        .eq("user_id", user.id)
        .order("incident_date", { ascending: false });

      if (error) throw error;
      return data as AccidentRecord[];
    },
  });
}

export function useCreateAccidentRecord() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (input: CreateAccidentRecordInput): Promise<AccidentRecord> => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { data, error } = await supabase
        .from("accident_records")
        .insert({ ...input, user_id: user.id })
        .select("*")
        .single();

      if (error) throw error;
      return data as AccidentRecord;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["accident-records"] });
      if (data.is_riddor_reportable) {
        toast({
          title: "RIDDOR: Review required",
          description: "This incident may be reportable — review the RIDDOR guidance.",
          variant: "destructive",
        });
      } else {
        toast({ title: "Record saved", description: "Accident record has been saved." });
      }
    },
    onError: (error) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });
}

export function useDeleteAccidentRecord() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (id: string): Promise<void> => {
      const { error } = await supabase
        .from("accident_records")
        .delete()
        .eq("id", id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["accident-records"] });
      toast({ title: "Record deleted", description: "Accident record has been removed." });
    },
    onError: (error) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });
}

export function useRIDDORRecords() {
  return useQuery({
    queryKey: ["accident-records", "riddor"],
    queryFn: async (): Promise<AccidentRecord[]> => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { data, error } = await supabase
        .from("accident_records")
        .select("*")
        .eq("user_id", user.id)
        .eq("is_riddor_reportable", true)
        .order("incident_date", { ascending: false });

      if (error) throw error;
      return data as AccidentRecord[];
    },
  });
}
