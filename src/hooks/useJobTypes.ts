
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export const useJobTypes = () => {
  return useQuery({
    queryKey: ['job-types'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('job_pricing_baseline')
        .select('job_type, job_category, unit')
        .order('job_category, job_type');

      if (error) throw error;

      // Group by category for better UX
      const grouped = data.reduce((acc: Record<string, any[]>, item) => {
        if (!acc[item.job_category]) {
          acc[item.job_category] = [];
        }
        
        // Avoid duplicates (same job_type might have different complexity levels)
        const exists = acc[item.job_category].find(existing => 
          existing.job_type === item.job_type
        );
        
        if (!exists) {
          acc[item.job_category].push(item);
        }
        
        return acc;
      }, {});

      return {
        all: data,
        byCategory: grouped,
        types: [...new Set(data.map(item => item.job_type))].sort()
      };
    },
    staleTime: 1000 * 60 * 30, // Cache for 30 minutes
  });
};
