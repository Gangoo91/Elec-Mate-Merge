import { useEffect, useState } from 'react';

import { supabase } from '@/integrations/supabase/client';

type PublicStats = {
  /** e.g. "1,040+" — registered UK sparks, rounded down to the nearest 10. */
  users: string;
  /** e.g. "970+" — certificates/reports issued, rounded down to the nearest 10. */
  certs: string;
};

/**
 * Live trust-pill stats for the landing page, via the `get_public_stats()`
 * SECURITY DEFINER RPC (profiles/reports RLS blocks anonymous SELECTs).
 *
 * Fallbacks are deliberately conservative so a failed fetch UNDER-reports
 * rather than over-claims — same principle as useUserCount.
 */
const FALLBACK: PublicStats = { users: '1,000+', certs: '970+' };

const roundDown = (count: number) =>
  `${Math.floor(count / 10) * 10}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '+';

export const usePublicStats = () => {
  const [stats, setStats] = useState<PublicStats>(FALLBACK);

  useEffect(() => {
    let cancelled = false;

    const fetchStats = async () => {
      const { data, error } = await supabase.rpc('get_public_stats');
      if (cancelled || error) return;
      const row = Array.isArray(data) ? data[0] : data;
      if (!row) return;
      const profiles = Number(row.profiles_count);
      const reports = Number(row.reports_count);
      setStats({
        users: Number.isFinite(profiles) && profiles > 0 ? roundDown(profiles) : FALLBACK.users,
        certs: Number.isFinite(reports) && reports > 0 ? roundDown(reports) : FALLBACK.certs,
      });
    };

    void fetchStats();

    return () => {
      cancelled = true;
    };
  }, []);

  return stats;
};
