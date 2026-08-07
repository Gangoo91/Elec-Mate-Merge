/**
 * Live figures for the Business Hub tool cards.
 *
 * Eighteen of the hub's twenty-one tool cards used to carry a sentence
 * describing what the tool was for — "Snagging: track and resolve outstanding
 * snags", "Materials: stock and inventory levels" — which is the title again in
 * a longer form. A dashboard card that could report a number and instead
 * describes itself is a wasted slot, and twenty of them in a row is a menu, not
 * a dashboard.
 *
 * Most of what was missing is already on the page: open jobs, open snags,
 * customers and in-progress visits are all loaded by hooks BusinessHub already
 * calls. This covers the four that weren't, in count-only queries (`head: true`
 * fetches no rows) so the whole set costs four cheap round trips.
 *
 * Two of these are worth more than a count. `personal_inventory` carries a
 * `low_stock_threshold`, and `vehicle_tools` carries `calibration_due` and
 * `pat_test_due` — a tester that has gone out of calibration is a compliance
 * problem, not a housekeeping one, so those surface as alerts rather than
 * totals.
 */
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface HubToolCounts {
  photoProjects: number;
  materialsLists: number;
  /** Items at or below their low-stock threshold. */
  lowStock: number;
  stockItems: number;
  /** Tools with calibration or PAT due inside 30 days (or already past). */
  toolsDue: number;
  tools: number;
}

const EMPTY: HubToolCounts = {
  photoProjects: 0,
  materialsLists: 0,
  lowStock: 0,
  stockItems: 0,
  toolsDue: 0,
  tools: 0,
};

export function useHubToolCounts(): HubToolCounts {
  const { data } = useQuery({
    queryKey: ['hub-tool-counts'],
    queryFn: async (): Promise<HubToolCounts> => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return EMPTY;

      const soon = new Date();
      soon.setDate(soon.getDate() + 30);
      const soonIso = soon.toISOString();

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const db = supabase as any;
      const countOf = (q: { count: number | null }) => q.count ?? 0;

      const [photos, lists, stock, lowStock, tools, calDue, patDue] = await Promise.all([
        db
          .from('photo_projects')
          .select('id', { count: 'exact', head: true })
          .eq('user_id', user.id),
        db
          .from('materials_lists')
          .select('id', { count: 'exact', head: true })
          .eq('user_id', user.id),
        db
          .from('personal_inventory')
          .select('id', { count: 'exact', head: true })
          .eq('user_id', user.id),
        // PostgREST cannot compare two columns, so the threshold is read back
        // and the comparison done here. Rows without a threshold are not "low"
        // — a null threshold means nobody has said what low looks like.
        db
          .from('personal_inventory')
          .select('quantity, low_stock_threshold')
          .eq('user_id', user.id)
          .not('low_stock_threshold', 'is', null),
        db
          .from('vehicle_tools')
          .select('id', { count: 'exact', head: true })
          .eq('user_id', user.id),
        db
          .from('vehicle_tools')
          .select('id', { count: 'exact', head: true })
          .eq('user_id', user.id)
          .not('calibration_due', 'is', null)
          .lte('calibration_due', soonIso),
        db
          .from('vehicle_tools')
          .select('id', { count: 'exact', head: true })
          .eq('user_id', user.id)
          .not('pat_test_due', 'is', null)
          .lte('pat_test_due', soonIso),
      ]);

      const lowRows = (lowStock.data ?? []) as Array<{
        quantity: number | null;
        low_stock_threshold: number | null;
      }>;

      return {
        photoProjects: countOf(photos),
        materialsLists: countOf(lists),
        stockItems: countOf(stock),
        lowStock: lowRows.filter(
          (r) => Number(r.quantity ?? 0) <= Number(r.low_stock_threshold ?? 0)
        ).length,
        tools: countOf(tools),
        // A tool can be due for both. Counting the two queries separately would
        // report one tester as two jobs, so this is the wider of the two rather
        // than the sum — it never overstates.
        toolsDue: Math.max(countOf(calDue), countOf(patDue)),
      };
    },
    staleTime: 60_000,
  });

  return data ?? EMPTY;
}
