import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

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
  /** 'opss' = GOV.UK Product Safety Alerts, Reports and Recalls (sync-safety-alerts). */
  source?: string | null;
  source_url?: string | null;
  /** The notice's own risk level (serious/high/medium/low); null = not stated. */
  risk_level?: string | null;
  /** Recall / Safety alert / Safety report */
  alert_type?: string | null;
  /** Verbatim "Hazard:" line from the notice; '' if it has none, null if not fetched. */
  hazard?: string | null;
  /** Verbatim "Corrective action:" line from the notice. */
  corrective_action?: string | null;
}

export function useSafetyAlerts() {
  return useQuery({
    queryKey: ['safety-alerts'],
    queryFn: async (): Promise<SafetyAlert[]> => {
      const { data, error } = await supabase
        .from('safety_alerts')
        .select('*')
        .eq('is_active', true)
        .order('date_published', { ascending: false })
        .limit(150);

      if (error) throw error;
      return (data ?? []) as SafetyAlert[];
    },
    staleTime: 300_000,
  });
}
