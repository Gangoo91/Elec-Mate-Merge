import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface SafetyResource {
  id: string;
  title: string;
  summary: string;
  category: string;
  file_type: string;
  file_url: string | null;
  file_bucket: string | null;
  file_path: string | null;
  file_size: string | null;
  is_active: boolean;
  date_published: string;
  download_count: number | null;
  view_count: number | null;
  average_rating: number | null;
  created_at: string;
  updated_at: string;
}

export function useSafetyResources(category?: string) {
  return useQuery({
    queryKey: ["safety-resources", category],
    queryFn: async (): Promise<SafetyResource[]> => {
      let query = supabase
        .from("safety_resources")
        .select("*")
        .eq("is_active", true)
        .order("date_published", { ascending: false });

      if (category) {
        query = query.eq("category", category);
      }

      const { data, error } = await query;
      if (error) throw error;
      return (data ?? []) as SafetyResource[];
    },
    staleTime: 300_000,
  });
}
