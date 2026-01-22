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

// Electrical-related job title keywords (case-insensitive matching)
const ELECTRICAL_KEYWORDS = [
  'electrician',
  'electrical',
  'sparky',
  'wiring',
  'cable',
  'eicr',
  'ev charger',
  'ev installer',
  'solar',
  'pv installer',
  'fire alarm',
  'security systems',
  'data cabling',
  'testing and inspection',
  'jib',
  'niceic',
  'napit',
  '18th edition',
  'consumer unit',
  'rewire',
];

export const useLatestJobs = (limit: number = 5) => {
  return useQuery({
    queryKey: ['latest-jobs', limit],
    queryFn: async (): Promise<LatestJob[]> => {
      // Fetch more jobs to filter client-side for electrical roles
      const { data, error } = await supabase
        .from("job_listings")
        .select("id, title, company, location, salary, type, posted_date, external_url, source")
        .order("posted_date", { ascending: false })
        .limit(100); // Fetch more to ensure we get enough electrical jobs

      if (error) {
        console.error("Error fetching latest jobs:", error);
        throw error;
      }

      if (!data) return [];

      // Filter for electrical-related jobs only
      const electricalJobs = data.filter(job => {
        const titleLower = job.title?.toLowerCase() || '';
        return ELECTRICAL_KEYWORDS.some(keyword => titleLower.includes(keyword));
      });

      return electricalJobs.slice(0, limit);
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
  });
};
