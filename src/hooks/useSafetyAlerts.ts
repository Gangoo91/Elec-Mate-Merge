import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface SafetyAlert {
  id: string;
  title: string;
  summary: string;
  content: string;
  category: string;
  severity: string;
  is_active: boolean;
  date_published: string;
  view_count: number | null;
  average_rating: number | null;
  created_at: string;
  updated_at: string;
}

export function useSafetyAlerts() {
  return useQuery({
    queryKey: ["safety-alerts"],
    queryFn: async (): Promise<SafetyAlert[]> => {
      const { data, error } = await supabase
        .from("safety_alerts")
        .select("*")
        .eq("is_active", true)
        .order("date_published", { ascending: false })
        .limit(20);

      if (error) throw error;
      return (data ?? []) as SafetyAlert[];
    },
    staleTime: 300_000,
  });
}
