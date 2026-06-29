import { useEffect, useState } from 'react';

import { supabase } from '@/integrations/supabase/client';

type PublicStats = {
  /** e.g. "1,110+" — registered UK sparks, rounded down to the nearest 10. */
  users: string;
  /** e.g. "1,080+" — certificates/reports issued, rounded down to the nearest 10. */
  certs: string;
  /** e.g. "£830k+" — total value quoted through the app, floored conservatively. */
  quoted: string;
};

/**
 * Live trust-pill stats for the landing page, via the `get_public_stats()`
 * SECURITY DEFINER RPC (profiles/reports/quotes RLS blocks anonymous SELECTs).
 *
 * Fallbacks are deliberately conservative so a failed fetch UNDER-reports
 * rather than over-claims — same principle as useUserCount.
 */
const FALLBACK: PublicStats = { users: '1,000+', certs: '970+', quoted: '£800k+' };

const roundDown = (count: number) =>
  `${Math.floor(count / 10) * 10}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '+';

/**
 * Format the quoted total, always rounding DOWN so we never over-claim:
 *   - under £1m → floor to the nearest £10k → "£830k+"
 *   - £1m+      → floor to the nearest £100k → "£1.0m+"
 * Rolls to "£1.0m+" automatically the moment quotes genuinely cross £1m.
 */
const formatQuoted = (total: number): string => {
  if (!Number.isFinite(total) || total <= 0) return FALLBACK.quoted;
  if (total >= 1_000_000) {
    const millions = Math.floor(total / 100_000) / 10;
    return `£${millions.toFixed(1)}m+`;
  }
  return `£${Math.floor(total / 10_000) * 10}k+`;
};

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
      const quoted = Number(row.quotes_total);
      setStats({
        users: Number.isFinite(profiles) && profiles > 0 ? roundDown(profiles) : FALLBACK.users,
        certs: Number.isFinite(reports) && reports > 0 ? roundDown(reports) : FALLBACK.certs,
        quoted: Number.isFinite(quoted) && quoted > 0 ? formatQuoted(quoted) : FALLBACK.quoted,
      });
    };

    void fetchStats();

    return () => {
      cancelled = true;
    };
  }, []);

  return stats;
};
