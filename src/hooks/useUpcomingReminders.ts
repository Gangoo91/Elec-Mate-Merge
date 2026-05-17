import { useCallback, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface UpcomingReminder {
  id: string;
  customerId: string;
  customerName: string;
  title: string;
  dueAt: string;
  isOverdue: boolean;
}

// Returns uncompleted reminders due in the next 7 days OR already overdue,
// across all customers for the current user. Joins customers to get names.
export const useUpcomingReminders = () => {
  const [reminders, setReminders] = useState<UpcomingReminder[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const load = useCallback(async () => {
    setIsLoading(true);
    try {
      const sevenDaysAhead = new Date();
      sevenDaysAhead.setDate(sevenDaysAhead.getDate() + 7);

      const { data, error } = await supabase
        .from('customer_reminders')
        .select('id, customer_id, title, due_at, customers!inner(name)')
        .is('completed_at', null)
        .lte('due_at', sevenDaysAhead.toISOString())
        .order('due_at', { ascending: true })
        .limit(50);

      if (error) throw error;

      const now = Date.now();
      setReminders(
        (data || []).map((r) => {
          const due = new Date(r.due_at).getTime();
          // Supabase join returns customers as an object (single relation).
          const customers = (r as unknown as { customers: { name: string } | null }).customers;
          return {
            id: r.id,
            customerId: r.customer_id,
            customerName: customers?.name || 'Unknown',
            title: r.title,
            dueAt: r.due_at,
            isOverdue: due < now,
          };
        })
      );
    } catch {
      setReminders([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return { reminders, isLoading, refresh: load };
};
