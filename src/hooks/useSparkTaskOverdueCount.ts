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

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const { count: total, error } = await (supabase as any)
          .from('spark_tasks')
          .select('id', { count: 'exact', head: true })
          .eq('user_id', user.id)
          .eq('status', 'open')
          .lt('due_at', new Date().toISOString());

        if (!error && total !== null) setCount(total);
      } catch {
        // Silent — badge is optional
      }
    })();
  }, []);

  return count;
}
