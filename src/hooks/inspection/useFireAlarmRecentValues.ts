/**
 * Hook: useFireAlarmRecentValues
 *
 * Queries the user's last 20 fire alarm reports and extracts unique values
 * for commonly re-entered fields (system make, panel location, zone names,
 * ARC name). Returns arrays of suggestions for use with HTML datalist elements.
 */

import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface RecentValues {
  systemMakes: string[];
  panelLocations: string[];
  zoneNames: string[];
  arcNames: string[];
}

const EMPTY: RecentValues = {
  systemMakes: [],
  panelLocations: [],
  zoneNames: [],
  arcNames: [],
};

export function useFireAlarmRecentValues() {
  const [recentValues, setRecentValues] = useState<RecentValues>(EMPTY);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function fetchRecentValues() {
      setIsLoading(true);
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();
        if (!session?.user?.id) return;

        const { data, error } = await supabase
          .from('reports')
          .select('data')
          .eq('user_id', session.user.id)
          .eq('report_type', 'fire-alarm')
          .is('deleted_at', null)
          .order('updated_at', { ascending: false })
          .limit(20);

        if (error || !data || cancelled) return;

        const makes = new Set<string>();
        const locations = new Set<string>();
        const zones = new Set<string>();
        const arcs = new Set<string>();

        for (const row of data) {
          const d = row.data as any;
          if (!d) continue;

          if (d.systemMake) makes.add(d.systemMake);
          if (d.panelLocation) locations.add(d.panelLocation);
          if (d.arcName) arcs.add(d.arcName);

          if (Array.isArray(d.zones)) {
            for (const zone of d.zones) {
              if (zone?.zoneName) zones.add(zone.zoneName);
            }
          }
        }

        if (!cancelled) {
          setRecentValues({
            systemMakes: Array.from(makes).slice(0, 10),
            panelLocations: Array.from(locations).slice(0, 10),
            zoneNames: Array.from(zones).slice(0, 10),
            arcNames: Array.from(arcs).slice(0, 10),
          });
        }
      } catch (err) {
        console.error('[useFireAlarmRecentValues] Error:', err);
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }

    fetchRecentValues();
    return () => {
      cancelled = true;
    };
  }, []);

  return { recentValues, isLoading };
}
