import { useEffect, useState } from 'react';

import { supabase } from '@/integrations/supabase/client';

type UseUserCountOptions = {
  /** Subscribe to realtime profile changes. Defaults to true. */
  realtime?: boolean;
  /** Initial placeholder shown before the fetch resolves. */
  initial?: string;
};

/**
 * Returns a live UK-electrician count rounded down to the nearest 10,
 * suffixed with "+" (e.g. "750+"). Used on the landing page and auth flows
 * so the number stays consistent across the entire public-facing surface.
 *
 * Uses the `public.get_profile_count()` RPC (security definer) because the
 * `profiles` table has row-level security that blocks anonymous SELECTs —
 * without the RPC, logged-out visitors to the landing page would silently
 * see the `initial` fallback forever.
 *
 * The default is deliberately conservative (`700+`) so that if the fetch
 * fails we UNDER-report rather than over-claim.
 */
export const useUserCount = ({ realtime = true, initial = '700+' }: UseUserCountOptions = {}) => {
  const [userCount, setUserCount] = useState(initial);

  useEffect(() => {
    let cancelled = false;

    const fetchCount = async () => {
      const { data, error } = await supabase.rpc('get_profile_count');
      if (cancelled || error) return;
      const count = typeof data === 'number' ? data : Number(data);
      if (Number.isFinite(count) && count > 0) {
        const rounded = Math.floor(count / 10) * 10;
        setUserCount(`${rounded}+`);
      }
    };

    void fetchCount();

    if (!realtime) {
      return () => {
        cancelled = true;
      };
    }

    const channel = supabase
      .channel(`user-count-${Math.random().toString(36).slice(2)}`)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'profiles' }, () => {
        void fetchCount();
      })
      .subscribe();

    return () => {
      cancelled = true;
      void supabase.removeChannel(channel);
    };
  }, [realtime]);

  return userCount;
};
