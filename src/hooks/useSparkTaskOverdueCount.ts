import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

/**
 * Lightweight hook: returns only the overdue task count.
 * Used on BusinessHub to show a badge without loading all task data.
 */
export function useSparkTaskOverdueCount() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    (async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (!user) return;

        // ELE-1058 — exclude snoozed tasks and auto-generated chase/follow-up
        // reminders (tagged ['chase'] / ['follow-up']). Those are surfaced under
        // Invoices/Quotes; counting them here nagged users with "overdue tasks"
        // when they had nothing to action. Overdue sets per user are tiny, so we
        // fetch the few rows and filter in JS (same predicate as the edge fns).
        const now = new Date();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const { data: rows, error } = await (supabase as any)
          .from('spark_tasks')
          .select('id, tags, snoozed_until')
          .eq('user_id', user.id)
          .eq('status', 'open')
          .lt('due_at', now.toISOString());

        if (!error && Array.isArray(rows)) {
          const isReminder = (tags: string[] | null) =>
            Array.isArray(tags) && tags.some((t) => t === 'chase' || t === 'follow-up');
          const actionable = rows.filter(
            (t: { tags: string[] | null; snoozed_until: string | null }) =>
              !(t.snoozed_until && new Date(t.snoozed_until) > now) && !isReminder(t.tags)
          );
          setCount(actionable.length);
        }
      } catch {
        // Silent — badge is optional
      }
    })();
  }, []);

  return count;
}
