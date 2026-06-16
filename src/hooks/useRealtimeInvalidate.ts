/**
 * useRealtimeInvalidate
 *
 * Subscribe to Supabase `postgres_changes` on one or more tables and invalidate
 * the given react-query keys whenever a change streams in. This is the single
 * canonical pattern for "make this query live" — it replaces the hand-rolled
 * supabase.channel(...).on(...).subscribe() + removeChannel boilerplate that was
 * copy-pasted across the app.
 *
 * - Uses realtimeChannelName() so the channel name is process-unique (a fixed
 *   name throws on remount/HMR). Safe for postgres_changes (rows are decided by
 *   the filter, not the name) — do NOT use for presence/broadcast.
 * - Pass `enabled: false` (e.g. while an id is still loading) to skip subscribing.
 * - Cleans up the channel on unmount / dependency change.
 *
 * Example:
 *   useRealtimeInvalidate(
 *     'worker-leave',
 *     [{ table: 'employer_leave_requests', filter: `employee_id=eq.${employeeId}` }],
 *     [['my-leave-requests', employeeId], ['my-leave-allowance', employeeId]],
 *     Boolean(employeeId),
 *   );
 */
import { useEffect } from 'react';
import { useQueryClient, type QueryKey } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { realtimeChannelName } from '@/lib/realtimeChannel';

export interface RealtimeSub {
  table: string;
  /** postgres_changes row filter, e.g. `employee_id=eq.${id}`. Omit for table-wide. */
  filter?: string;
  /** Defaults to all change events. */
  event?: '*' | 'INSERT' | 'UPDATE' | 'DELETE';
}

export function useRealtimeInvalidate(
  base: string,
  subs: RealtimeSub[],
  keys: QueryKey[],
  enabled = true
): void {
  const queryClient = useQueryClient();

  // Serialise the array inputs so callers can pass inline literals without
  // re-subscribing every render.
  const subsKey = JSON.stringify(subs);
  const keysKey = JSON.stringify(keys);

  useEffect(() => {
    if (!enabled) return;

    const parsedSubs: RealtimeSub[] = JSON.parse(subsKey);
    const parsedKeys: QueryKey[] = JSON.parse(keysKey);
    if (parsedSubs.length === 0) return;

    let channel = supabase.channel(realtimeChannelName(base));
    for (const s of parsedSubs) {
      channel = channel.on(
        'postgres_changes',
        {
          event: s.event ?? '*',
          schema: 'public',
          table: s.table,
          ...(s.filter ? { filter: s.filter } : {}),
        },
        () => {
          for (const k of parsedKeys) queryClient.invalidateQueries({ queryKey: k });
        }
      );
    }
    channel.subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [base, subsKey, keysKey, enabled, queryClient]);
}
