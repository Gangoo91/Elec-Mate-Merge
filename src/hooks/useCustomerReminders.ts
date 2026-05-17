import { useCallback, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface CustomerReminder {
  id: string;
  customerId: string;
  title: string;
  notes?: string;
  dueAt: string;
  completedAt?: string;
  createdAt: string;
  updatedAt: string;
}

interface AddReminderInput {
  title: string;
  notes?: string;
  dueAt: string;
}

export const useCustomerReminders = (customerId: string) => {
  const [reminders, setReminders] = useState<CustomerReminder[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const load = useCallback(async () => {
    if (!customerId) {
      setReminders([]);
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('customer_reminders')
        .select('*')
        .eq('customer_id', customerId)
        .order('due_at', { ascending: true });

      if (error) throw error;

      setReminders(
        (data || []).map((r) => ({
          id: r.id,
          customerId: r.customer_id,
          title: r.title,
          notes: r.notes || undefined,
          dueAt: r.due_at,
          completedAt: r.completed_at || undefined,
          createdAt: r.created_at,
          updatedAt: r.updated_at,
        }))
      );
    } catch {
      setReminders([]);
    } finally {
      setIsLoading(false);
    }
  }, [customerId]);

  useEffect(() => {
    load();
  }, [load]);

  const addReminder = async (input: AddReminderInput) => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { error } = await supabase.from('customer_reminders').insert({
        customer_id: customerId,
        user_id: user.id,
        title: input.title.trim(),
        notes: input.notes?.trim() || null,
        due_at: input.dueAt,
      });
      if (error) throw error;
      await load();
      toast({
        title: 'Reminder added',
        description: `Due ${new Date(input.dueAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}.`,
      });
    } catch (err) {
      toast({
        title: 'Failed to add reminder',
        description: err instanceof Error ? err.message : 'Try again.',
        variant: 'destructive',
      });
    }
  };

  const completeReminder = async (id: string) => {
    try {
      const { error } = await supabase
        .from('customer_reminders')
        .update({ completed_at: new Date().toISOString() })
        .eq('id', id);
      if (error) throw error;
      await load();
    } catch {
      toast({ title: 'Failed to mark complete', variant: 'destructive' });
    }
  };

  const deleteReminder = async (id: string) => {
    try {
      const { error } = await supabase.from('customer_reminders').delete().eq('id', id);
      if (error) throw error;
      await load();
    } catch {
      toast({ title: 'Failed to delete', variant: 'destructive' });
    }
  };

  return { reminders, isLoading, addReminder, completeReminder, deleteReminder, refresh: load };
};
