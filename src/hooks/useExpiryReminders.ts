import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export type ReminderStatus = 'pending' | 'viewed' | 'contacted' | 'booked' | 'completed';

export interface ExpiryReminder {
  id: string;
  user_id: string;
  report_id: string;
  certificate_number: string;
  client_name: string | null;
  installation_address: string | null;
  inspection_date: string | null;
  expiry_date: string;
  reminder_status: ReminderStatus;
  contacted_at: string | null;
  booked_for_date: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
  status_history?: any[];
  tags?: string[];
  response_time_hours?: number;
}

export const useExpiryReminders = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: reminders, isLoading, error } = useQuery({
    queryKey: ['expiry-reminders'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('certificate_expiry_reminders')
        .select('*')
        .eq('user_id', user.id)
        .order('expiry_date', { ascending: true });

      if (error) throw error;
      return data as ExpiryReminder[];
    },
  });

  const updateReminder = useMutation({
    mutationFn: async ({
      id,
      updates,
    }: {
      id: string;
      updates: Partial<ExpiryReminder>;
    }) => {
      const { data, error } = await supabase
        .from('certificate_expiry_reminders')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['expiry-reminders'] });
      toast({
        title: 'Updated',
        description: 'Reminder updated successfully',
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  const markAsContacted = useMutation({
    mutationFn: async (id: string) => {
      const { data, error } = await supabase
        .from('certificate_expiry_reminders')
        .update({
          reminder_status: 'contacted',
          contacted_at: new Date().toISOString(),
        })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['expiry-reminders'] });
      toast({
        title: 'Marked as Contacted',
        description: 'Client has been marked as contacted',
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  const markAsBooked = useMutation({
    mutationFn: async ({
      id,
      bookedDate,
      notes,
    }: {
      id: string;
      bookedDate?: string;
      notes?: string;
    }) => {
      const { data, error } = await supabase
        .from('certificate_expiry_reminders')
        .update({
          reminder_status: 'booked',
          booked_for_date: bookedDate || null,
          notes: notes || null,
        })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['expiry-reminders'] });
      toast({
        title: 'Marked as Booked',
        description: 'Inspection has been marked as booked',
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  const deleteReminder = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('certificate_expiry_reminders')
        .delete()
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['expiry-reminders'] });
      toast({
        title: 'Deleted',
        description: 'Reminder deleted successfully',
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  const bulkUpdateStatus = useMutation({
    mutationFn: async ({
      ids,
      status,
    }: {
      ids: string[];
      status: ReminderStatus;
    }) => {
      const updates = ids.map((id) =>
        supabase
          .from('certificate_expiry_reminders')
          .update({ reminder_status: status })
          .eq('id', id)
      );

      const results = await Promise.all(updates);
      const errors = results.filter((r) => r.error);

      if (errors.length > 0) {
        throw new Error(`Failed to update ${errors.length} reminders`);
      }
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['expiry-reminders'] });
      toast({
        title: 'Updated',
        description: `${variables.ids.length} reminder${
          variables.ids.length === 1 ? '' : 's'
        } updated successfully`,
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  return {
    reminders: reminders || [],
    isLoading,
    error,
    updateReminder: updateReminder.mutateAsync,
    markAsContacted: markAsContacted.mutateAsync,
    markAsBooked: markAsBooked.mutateAsync,
    deleteReminder: deleteReminder.mutateAsync,
    bulkUpdateStatus: bulkUpdateStatus.mutateAsync,
  };
};
