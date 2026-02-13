import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface FireWatchChecklistItem {
  id: string;
  label: string;
  checked: boolean;
}

export interface FireWatchRecord {
  id: string;
  permit_id: string | null;
  user_id: string;
  start_time: string;
  end_time: string | null;
  duration_minutes: number;
  checklist: FireWatchChecklistItem[];
  completed_by: string | null;
  completed_signature: string | null;
  status: "active" | "completed" | "extended";
  created_at: string;
}

export function useFireWatchRecords() {
  return useQuery({
    queryKey: ["fire-watch-records"],
    queryFn: async (): Promise<FireWatchRecord[]> => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { data, error } = await supabase
        .from("fire_watch_records")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return (data ?? []) as unknown as FireWatchRecord[];
    },
    staleTime: 30_000,
  });
}
