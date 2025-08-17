
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

      // Fallback data for comprehensive job types
      const fallbackData = [
        // EV Charging
        { job_type: 'EV Charger Install (7kW)', job_category: 'EV Charging', unit: 'per job' },
        { job_type: 'EV Charger Install (22kW)', job_category: 'EV Charging', unit: 'per job' },
        { job_type: 'EV Charger Circuit Install', job_category: 'EV Charging', unit: 'per job' },
        
        // Installation & Wiring
        { job_type: 'Outside Socket Installation', job_category: 'Installation & Wiring', unit: 'per job' },
        { job_type: 'Downlight Installation', job_category: 'Installation & Wiring', unit: 'per point' },
        { job_type: 'Smoke/Heat Alarm Install', job_category: 'Installation & Wiring', unit: 'each' },
        { job_type: 'Extractor Fan Installation', job_category: 'Installation & Wiring', unit: 'per job' },
        { job_type: 'Oven/Hob Connection', job_category: 'Installation & Wiring', unit: 'per job' },
        { job_type: 'Cooker Circuit Install', job_category: 'Installation & Wiring', unit: 'per job' },
        { job_type: 'Electric Shower Installation', job_category: 'Installation & Wiring', unit: 'per job' },
        { job_type: 'Garden Office Supply', job_category: 'Installation & Wiring', unit: 'per job' },
        { job_type: 'Garage Supply Installation', job_category: 'Installation & Wiring', unit: 'per job' },
        
        // Emergency & Call-outs
        { job_type: 'Emergency Call-out (first hour)', job_category: 'Emergency & Call-outs', unit: 'per hour' },
        { job_type: 'Out of Hours Call-out', job_category: 'Emergency & Call-outs', unit: 'per hour' },
        { job_type: 'Fault Finding', job_category: 'Emergency & Call-outs', unit: 'per hour' },
        
        // Consumer Units & Boards
        { job_type: 'Consumer Unit Replacement', job_category: 'Consumer Units & Boards', unit: 'per job' },
        { job_type: 'Additional Circuit Installation', job_category: 'Consumer Units & Boards', unit: 'per circuit' },
        { job_type: 'RCD Protection Upgrade', job_category: 'Consumer Units & Boards', unit: 'per job' },
        
        // Testing & Certification
        { job_type: 'EICR Testing', job_category: 'Testing & Certification', unit: 'per property' },
        { job_type: 'PAT Testing', job_category: 'Testing & Certification', unit: 'per appliance' },
        { job_type: 'Electrical Installation Certificate', job_category: 'Testing & Certification', unit: 'per certificate' },
      ];

      // Use database data if available, otherwise use fallback
      const finalData = data.length > 0 ? data : fallbackData;

      // Group by category for better UX
      const grouped = finalData.reduce((acc: Record<string, any[]>, item) => {
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
        all: finalData,
        byCategory: grouped,
        types: [...new Set(finalData.map(item => item.job_type))].sort()
      };
    },
    staleTime: 1000 * 60 * 30, // Cache for 30 minutes
  });
};
