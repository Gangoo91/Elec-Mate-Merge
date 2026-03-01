import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import type {
  CalendarEvent,
  CreateCalendarEventInput,
  UpdateCalendarEventInput,
} from '@/types/calendar';

// Fetch events for a date range
export function useCalendarEvents(dateFrom: string, dateTo: string) {
  return useQuery({
    queryKey: ['calendar-events', dateFrom, dateTo],
    queryFn: async (): Promise<CalendarEvent[]> => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('calendar_events')
        .select(
          `
          *,
          customer:customers(id, name),
          job:employer_jobs(id, title)
        `
        )
        .eq('user_id', user.id)
        .gte('start_at', dateFrom)
        .lte('start_at', dateTo)
        .order('start_at', { ascending: true });

      if (error) throw error;
      return (data ?? []) as CalendarEvent[];
    },
    enabled: !!dateFrom && !!dateTo,
  });
}

// Fetch today's events
export function useTodayEvents() {
  const today = new Date();
  const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate()).toISOString();
  const endOfDay = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
    23,
    59,
    59,
    999
  ).toISOString();

  return useQuery({
    queryKey: ['calendar-events', 'today'],
    queryFn: async (): Promise<CalendarEvent[]> => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('calendar_events')
        .select(
          `
          *,
          customer:customers(id, name),
          job:employer_jobs(id, title)
        `
        )
        .eq('user_id', user.id)
        .gte('start_at', startOfDay)
        .lte('start_at', endOfDay)
        .order('start_at', { ascending: true });

      if (error) throw error;
      return (data ?? []) as CalendarEvent[];
    },
  });
}

// Fetch upcoming events (next N days)
export function useUpcomingEvents(days: number = 7) {
  const now = new Date().toISOString();
  const future = new Date(Date.now() + days * 24 * 60 * 60 * 1000).toISOString();

  return useQuery({
    queryKey: ['calendar-events', 'upcoming', days],
    queryFn: async (): Promise<CalendarEvent[]> => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('calendar_events')
        .select(
          `
          *,
          customer:customers(id, name),
          job:employer_jobs(id, title)
        `
        )
        .eq('user_id', user.id)
        .gte('start_at', now)
        .lte('start_at', future)
        .order('start_at', { ascending: true });

      if (error) throw error;
      return (data ?? []) as CalendarEvent[];
    },
  });
}

// Create event
export function useCreateCalendarEvent() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (input: CreateCalendarEventInput): Promise<CalendarEvent> => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      // Check if Google is connected to set sync_status
      const { data: tokenData } = await supabase
        .from('google_calendar_tokens')
        .select('sync_enabled')
        .eq('user_id', user.id)
        .maybeSingle();

      const syncStatus = tokenData?.sync_enabled ? 'pending_push' : 'local_only';

      const { data, error } = await supabase
        .from('calendar_events')
        .insert({
          ...input,
          user_id: user.id,
          sync_status: syncStatus,
        })
        .select()
        .single();

      if (error) throw error;
      return data as CalendarEvent;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['calendar-events'] });
      toast({ title: 'Event created' });
    },
    onError: (error: Error) => {
      console.error('Failed to create calendar event:', error);
      toast({ title: 'Failed to create event', variant: 'destructive' });
    },
  });
}

// Update event
export function useUpdateCalendarEvent() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({
      id,
      updates,
    }: {
      id: string;
      updates: UpdateCalendarEventInput;
    }): Promise<CalendarEvent> => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      // Check if Google is connected to mark for push
      const { data: tokenData } = await supabase
        .from('google_calendar_tokens')
        .select('sync_enabled')
        .eq('user_id', user.id)
        .maybeSingle();

      const extraFields: Record<string, string> = {};
      if (tokenData?.sync_enabled) {
        extraFields.sync_status = 'pending_push';
      }

      const { data, error } = await supabase
        .from('calendar_events')
        .update({ ...updates, ...extraFields })
        .eq('id', id)
        .eq('user_id', user.id)
        .select()
        .single();

      if (error) throw error;
      return data as CalendarEvent;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['calendar-events'] });
      toast({ title: 'Event updated' });
    },
    onError: (error: Error) => {
      console.error('Failed to update calendar event:', error);
      toast({ title: 'Failed to update event', variant: 'destructive' });
    },
  });
}

// Delete event
export function useDeleteCalendarEvent() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (id: string): Promise<void> => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { error } = await supabase
        .from('calendar_events')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['calendar-events'] });
      toast({ title: 'Event deleted' });
    },
    onError: (error: Error) => {
      console.error('Failed to delete calendar event:', error);
      toast({ title: 'Failed to delete event', variant: 'destructive' });
    },
  });
}
