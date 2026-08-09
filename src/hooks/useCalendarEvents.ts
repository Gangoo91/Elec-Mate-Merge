import { useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { realtimeChannelName } from '@/lib/realtimeChannel';
import { useToast } from '@/hooks/use-toast';
import { trackUserEvent } from '@/hooks/useActivityTracking';
import type {
  CalendarEvent,
  CreateCalendarEventInput,
  UpdateCalendarEventInput,
} from '@/types/calendar';

/**
 * Ids this tab has just written.
 *
 * The realtime INSERT handler announces new events, which is right when one
 * arrives from somewhere else — a public booking, the AI agent, another device
 * — and wrong when you just tapped Create yourself: the mutation already
 * toasted "Event created", so you got told twice about your own action.
 * Ids are dropped after a beat; the set never grows.
 */
const locallyCreatedIds = new Set<string>();

function noteLocalEvent(id: string) {
  locallyCreatedIds.add(id);
  setTimeout(() => locallyCreatedIds.delete(id), 10_000);
}

/**
 * Subscribe to calendar_events realtime changes and invalidate React Query cache.
 * Call this from any component that renders calendar data (e.g. CalendarPageContent).
 */
export function useCalendarRealtimeInvalidation() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  useEffect(() => {
    let channel: ReturnType<typeof supabase.channel> | null = null;

    const setup = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;

      channel = supabase
        .channel(realtimeChannelName('calendar-events-realtime'))
        .on(
          'postgres_changes',
          {
            event: 'INSERT',
            schema: 'public',
            table: 'calendar_events',
            filter: `user_id=eq.${user.id}`,
          },
          (payload) => {
            const evt = payload.new as Record<string, unknown>;
            const id = evt.id as string;
            if (!locallyCreatedIds.has(id)) {
              toast({
                title: 'New event',
                description: (evt.title as string) || 'Calendar event added',
                duration: 4000,
              });
            }
            queryClient.invalidateQueries({ queryKey: ['calendar-events'] });
          }
        )
        .on(
          'postgres_changes',
          {
            event: 'UPDATE',
            schema: 'public',
            table: 'calendar_events',
            filter: `user_id=eq.${user.id}`,
          },
          () => {
            queryClient.invalidateQueries({ queryKey: ['calendar-events'] });
          }
        )
        .on(
          'postgres_changes',
          {
            event: 'DELETE',
            schema: 'public',
            table: 'calendar_events',
            filter: `user_id=eq.${user.id}`,
          },
          () => {
            queryClient.invalidateQueries({ queryKey: ['calendar-events'] });
          }
        )
        .subscribe();
    };

    setup();

    return () => {
      if (channel) supabase.removeChannel(channel);
    };
  }, [queryClient, toast]);
}

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
          job:employer_jobs(id, title),
          project:spark_projects(id, title)
        `
        )
        .eq('user_id', user.id)
        // OVERLAP, not "starts inside". Filtering on start_at alone dropped
        // every event that began before the window — a job running Sat–Tue
        // simply vanished from the week you opened on the Monday. An event is
        // in range when it starts before the window ends AND ends after the
        // window begins.
        .lte('start_at', dateTo)
        .gte('end_at', dateFrom)
        .order('start_at', { ascending: true });

      if (error) throw error;
      // Through `unknown`: types.ts predates the project_id FK, so the generated
      // types resolve the `project:spark_projects(...)` embed to a
      // SelectQueryError rather than a row. The embed is valid — the FK exists
      // (calendar_events_project_id_fkey) — only the checked-in types are stale.
      // Drop the double cast when types.ts is regenerated.
      return (data ?? []) as unknown as CalendarEvent[];
    },
    enabled: !!dateFrom && !!dateTo,
    staleTime: 30_000,
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
          job:employer_jobs(id, title),
          project:spark_projects(id, title)
        `
        )
        .eq('user_id', user.id)
        // Overlap — a job that started yesterday and runs through today is on
        // today. See the note in useCalendarEvents.
        .lte('start_at', endOfDay)
        .gte('end_at', startOfDay)
        .order('start_at', { ascending: true });

      if (error) throw error;
      // Through `unknown`: types.ts predates the project_id FK, so the generated
      // types resolve the `project:spark_projects(...)` embed to a
      // SelectQueryError rather than a row. The embed is valid — the FK exists
      // (calendar_events_project_id_fkey) — only the checked-in types are stale.
      // Drop the double cast when types.ts is regenerated.
      return (data ?? []) as unknown as CalendarEvent[];
    },
    staleTime: 30_000,
  });
}

/**
 * Events from the start of today to `days` ahead.
 *
 * Anchored to midnight rather than to `now` so the window is stable across a
 * render and a job already under way still counts as on. Feeds the summary
 * strip, which has to read the same whichever month the grid is showing.
 */
export function useUpcomingEvents(days: number = 7) {
  const today = new Date();
  const from = new Date(today.getFullYear(), today.getMonth(), today.getDate()).toISOString();
  const to = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() + days,
    23,
    59,
    59,
    999
  ).toISOString();

  return useQuery({
    queryKey: ['calendar-events', 'upcoming', days, from],
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
          job:employer_jobs(id, title),
          project:spark_projects(id, title)
        `
        )
        .eq('user_id', user.id)
        .lte('start_at', to)
        .gte('end_at', from)
        .order('start_at', { ascending: true });

      if (error) throw error;
      // Through `unknown`: types.ts predates the project_id FK, so the generated
      // types resolve the `project:spark_projects(...)` embed to a
      // SelectQueryError rather than a row. The embed is valid — the FK exists
      // (calendar_events_project_id_fkey) — only the checked-in types are stale.
      // Drop the double cast when types.ts is regenerated.
      return (data ?? []) as unknown as CalendarEvent[];
    },
    staleTime: 30_000,
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

      // Id minted here rather than by the database so it can be registered as
      // ours BEFORE the row exists. Realtime is quick enough to deliver the
      // INSERT ahead of this promise resolving, and a note written in onSuccess
      // would land after the toast it was meant to suppress.
      const id = crypto.randomUUID();
      noteLocalEvent(id);

      // `as never`: types.ts predates migration 20260805150000, so it does not
      // know calendar_events.project_id exists (ELE-1472). Cast at the boundary
      // rather than reaching for `any`. Drop when types.ts is regenerated.
      const { data, error } = await supabase
        .from('calendar_events')
        .insert({
          ...input,
          id,
          user_id: user.id,
          sync_status: syncStatus,
        } as never)
        .select()
        .single();

      if (error) throw error;
      return data as CalendarEvent;
    },
    onSuccess: (created) => {
      queryClient.invalidateQueries({ queryKey: ['calendar-events'] });
      toast({ title: 'Event created' });
      if (created?.user_id) {
        void trackUserEvent(created.user_id, 'feature_use', {
          eventName: 'calendar_event_created',
        });
      }
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

      // Same stale-types cast as the insert above (ELE-1472).
      const { data, error } = await supabase
        .from('calendar_events')
        .update({ ...updates, ...extraFields } as never)
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
