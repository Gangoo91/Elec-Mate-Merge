import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface LatestJob {
  id: string;
  title: string;
  company: string;
  location: string;
  salary?: string;
  type?: string;
  posted_date?: string;
  external_url?: string;
  source?: string;
}

export const useLatestJobs = (limit: number = 5) => {
  return useQuery({
    queryKey: ['latest-jobs', limit],
    queryFn: async (): Promise<LatestJob[]> => {
      const { data, error } = await supabase
        .from("job_listings")
        .select("id, title, company, location, salary, type, posted_date, external_url, source")
        .order("posted_date", { ascending: false })
        .limit(limit);

      if (error) {
        console.error("Error fetching latest jobs:", error);
        throw error;
      }

      return data || [];
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
  });
};
