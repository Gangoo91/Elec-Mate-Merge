import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { getActingEmployerId } from '@/lib/actingEmployer';

/**
 * The firm's Site Safety picture (get_firm_safety_overview), read under the
 * manager's own RLS. Every figure is a count of real records; the score is
 * null ("not started") until there is evidence to build it from (ELE-1985).
 */
export interface FirmSafetyOverview {
  permits_live: number;
  isolations_open: number;
  fire_watch_follow_ups_due: number;
  coshh_total: number;
  coshh_reviews_overdue: number;
  near_misses_30d: number;
  accidents_30d: number;
  riddor_pending: number;
  briefings_30d: number;
  briefing_signatures_30d: number;
  rams_90d: number;
  rams_issued_90d: number;
  team_shared_90d: number;
  to_countersign: number;
  records_30d: number;
  score: number | null;
  parts: {
    briefings_signed: number | null;
    near_misses_closed: number | null;
    team_records_countersigned: number | null;
    coshh_in_date: number | null;
    rams_issued: number | null;
  };
}

/**
 * @param employerId the firm. Omit it to use the signed-in person's firm (the
 * same answer SafetyScopeProvider gives); pass null to switch the query off.
 */
export function useFirmSafetyOverview(employerId?: string | null) {
  const { user } = useAuth();
  const { data: resolved } = useQuery({
    queryKey: ['safety-scope-employer', user?.id],
    enabled: employerId === undefined && !!user?.id,
    staleTime: 5 * 60 * 1000,
    queryFn: async () => (await getActingEmployerId(user!.id)) ?? user!.id,
  });
  const firmId = employerId === undefined ? (resolved ?? null) : employerId;
  return useQuery({
    queryKey: ['firm-safety-overview', firmId],
    enabled: !!firmId,
    staleTime: 60 * 1000,
    queryFn: async (): Promise<FirmSafetyOverview> => {
      const { data, error } = await supabase.rpc(
        'get_firm_safety_overview' as never,
        { p_employer_id: firmId } as never
      );
      if (error) throw error;
      return data as unknown as FirmSafetyOverview;
    },
  });
}
