import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface MateFounderCount {
  count: number;
  cap: number;
  slots_left: number;
}

/**
 * Reads the live Mate founder programme count from the public
 * `mate_founder_count()` RPC. Used to drive both the FounderBanner and the
 * pricing copy across the sales view (so £29.99 is shown only while slots
 * remain, then automatically falls back to £39.99 after the 100 cap is hit).
 */
export function useMateFounderCount() {
  const [data, setData] = useState<MateFounderCount | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    (async () => {
      const { data: rows, error } = await supabase.rpc('mate_founder_count');
      if (!alive) return;
      if (!error) {
        const row = Array.isArray(rows) ? rows[0] : rows;
        if (row && typeof row.count === 'number') setData(row as MateFounderCount);
      }
      setIsLoading(false);
    })();
    return () => {
      alive = false;
    };
  }, []);

  return {
    data,
    isLoading,
    hasFounderSlots: !!(data && data.slots_left > 0),
  };
}
