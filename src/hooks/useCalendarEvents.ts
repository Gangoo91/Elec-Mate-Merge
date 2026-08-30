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
      // Nudge the always-on Google sync so the change lands there in seconds.
      window.dispatchEvent(new CustomEvent('elecmate:gcal-sync'));
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
      // Nudge the always-on Google sync so the change lands there in seconds.
      window.dispatchEvent(new CustomEvent('elecmate:gcal-sync'));
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
      // Nudge the always-on Google sync so the change lands there in seconds.
      window.dispatchEvent(new CustomEvent('elecmate:gcal-sync'));
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
export function useCalendarEvents(dateFrom: string, dateTo: string, enabled = true) {
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
          /*
           * The embed names its foreign key EXPLICITLY, and must keep doing so.
           *
           * On 27 Aug a second relationship between these tables was added
           * (`spark_projects.calendar_event_id`), which made a bare
           * `project:spark_projects(...)` ambiguous. PostgREST answers
           * ambiguity with PGRST201 and fails the ENTIRE request — so every
           * event disappeared from every calendar for ten hours, while the
           * clash check went on finding them because it embeds nothing.
           *
           * The offending constraint has been dropped, but naming the key here
           * means the same shape of change can never do this again.
           */
          `
          *,
          customer:customers(id, name),
          job:employer_jobs(id, title),
          project:spark_projects!calendar_events_project_id_fkey(id, title)
        `
        )
        .eq('user_id', user.id)
        .neq('sync_status', 'pending_delete')
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
    // Both conditions, in one place. There was already an `enabled` here
    // guarding an empty range; adding a second key silently replaced it —
    // esbuild keeps the last and the range guard would have gone.
    enabled: enabled && !!dateFrom && !!dateTo,
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
          project:spark_projects!calendar_events_project_id_fkey(id, title)
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
          project:spark_projects!calendar_events_project_id_fkey(id, title)
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
      // Nudge the always-on Google sync so the change lands there in seconds.
      window.dispatchEvent(new CustomEvent('elecmate:gcal-sync'));
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
      // Nudge the always-on Google sync so the change lands there in seconds.
      window.dispatchEvent(new CustomEvent('elecmate:gcal-sync'));
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

      // An event that also lives in Google/Outlook can't just be deleted
      // locally — the next pull would re-import it. Tombstone it instead;
      // the sync engine deletes it at the provider, then drops the row.
      const { data: row } = await supabase
        .from('calendar_events')
        .select('google_event_id, outlook_event_id')
        .eq('id', id)
        .eq('user_id', user.id)
        .maybeSingle();

      const linkedToProvider = !!(
        (row as { google_event_id?: string | null; outlook_event_id?: string | null } | null)
          ?.google_event_id ||
        (row as { outlook_event_id?: string | null } | null)?.outlook_event_id
      );

      if (linkedToProvider) {
        const { error } = await supabase
          .from('calendar_events')
          .update({ sync_status: 'pending_delete' } as never)
          .eq('id', id)
          .eq('user_id', user.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('calendar_events')
          .delete()
          .eq('id', id)
          .eq('user_id', user.id);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['calendar-events'] });
      // Nudge the always-on Google sync so the change lands there in seconds.
      window.dispatchEvent(new CustomEvent('elecmate:gcal-sync'));
      toast({ title: 'Event deleted' });
    },
    onError: (error: Error) => {
      console.error('Failed to delete calendar event:', error);
      toast({ title: 'Failed to delete event', variant: 'destructive' });
    },
  });
}

/**
 * Save a job that runs across several, possibly non-contiguous, days (ELE-1649).
 *
 * Writes the model described in `splitJob.ts`: one ordinary event per day, the
 * earliest acting as the anchor and the rest carrying `parent_event_id`. There
 * is no separate parent row, so nothing else in the calendar has to know this
 * shape exists.
 *
 * Handles create and edit through one path, because an edit is a diff: days
 * still wanted are updated in place (keeping their Google ids, so the
 * electrician's own calendar does not churn), new days are inserted, and
 * dropped days are removed.
 *
 * ⚠️ Dropped days are TOMBSTONED, not deleted, when they exist at a provider —
 * the same rule as `useDeleteCalendarEvent`. Hard-deleting a row that Google
 * still holds means the next pull re-imports it, and the day the user just
 * removed reappears.
 */
export interface SaveSplitJobInput {
  /** Fields common to every day. `start_at`/`end_at` are ignored — days win. */
  base: CreateCalendarEventInput;
  /** The days on site, any order. */
  days: Date[];
  /** The job's current day-rows, when editing. Omit when creating. */
  existing?: CalendarEvent[];
}

const dayBounds = (day: Date) => {
  const start = new Date(day.getFullYear(), day.getMonth(), day.getDate(), 0, 0, 0);
  const end = new Date(day.getFullYear(), day.getMonth(), day.getDate(), 23, 59, 59);
  return { start_at: start.toISOString(), end_at: end.toISOString() };
};

const localDayKey = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

export function useSaveSplitJob() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ base, days, existing = [] }: SaveSplitJobInput): Promise<CalendarEvent> => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');
      if (days.length === 0) throw new Error('A split job needs at least one day');

      const { data: tokenData } = await supabase
        .from('google_calendar_tokens')
        .select('sync_enabled')
        .eq('user_id', user.id)
        .maybeSingle();
      const syncStatus = tokenData?.sync_enabled ? 'pending_push' : 'local_only';

      const wanted = [...days].sort((a, b) => a.getTime() - b.getTime());
      const wantedKeys = new Set(wanted.map(localDayKey));
      const existingByKey = new Map(
        existing.map((e) => [localDayKey(new Date(e.start_at)), e] as const)
      );

      // ── 1. Who anchors the job now ─────────────────────────────────────
      // The earliest SURVIVING day, or a fresh id when nothing survives.
      const dropped = existing.filter((e) => !wantedKeys.has(localDayKey(new Date(e.start_at))));
      const survivors = wanted
        .map((d) => existingByKey.get(localDayKey(d)))
        .filter((e): e is CalendarEvent => !!e);
      const anchorRow = survivors[0];
      const anchorId = anchorRow?.id ?? crypto.randomUUID();
      if (!anchorRow) noteLocalEvent(anchorId);

      /*
       * ── 2. Detach survivors BEFORE deleting anything ───────────────────
       *
       * 🔴 `parent_event_id` is ON DELETE CASCADE (verified against the live
       * schema). Dropping the anchor day first would take every other day of
       * the job with it — a three-day job measured down to zero rows from one
       * delete. So the survivors are re-pointed at the new anchor while the
       * old one still exists, and only then is it removed.
       */
      const oldAnchorDropped = dropped.some((d) => !d.parent_event_id);
      if (oldAnchorDropped && anchorRow) {
        await supabase
          .from('calendar_events')
          .update({ parent_event_id: null } as never)
          .eq('id', anchorRow.id)
          .eq('user_id', user.id);
        await Promise.all(
          survivors
            .filter((s) => s.id !== anchorRow.id)
            .map((s) =>
              supabase
                .from('calendar_events')
                .update({ parent_event_id: anchorRow.id } as never)
                .eq('id', s.id)
                .eq('user_id', user.id)
            )
        );
      }

      // ── 3. Days no longer wanted ───────────────────────────────────────
      await Promise.all(
        dropped.map((row) => {
          const linked = !!(
            row.google_event_id || (row as { outlook_event_id?: string }).outlook_event_id
          );
          return linked
            ? supabase
                .from('calendar_events')
                .update({ sync_status: 'pending_delete' } as never)
                .eq('id', row.id)
                .eq('user_id', user.id)
            : supabase.from('calendar_events').delete().eq('id', row.id).eq('user_id', user.id);
        })
      );

      // ── 4. Update the days we are keeping ──────────────────────────────
      // Updated in place rather than deleted and recreated, so each surviving
      // day keeps its google_event_id — otherwise moving one day of a job
      // would churn every entry in the electrician's own Google Calendar.
      await Promise.all(
        wanted
          .map((day) => ({ day, row: existingByKey.get(localDayKey(day)) }))
          .filter((x): x is { day: Date; row: CalendarEvent } => !!x.row)
          .map(({ day, row }) =>
            supabase
              .from('calendar_events')
              .update({
                ...base,
                ...dayBounds(day),
                all_day: true,
                // Re-anchoring: if the old anchor was dropped, the earliest
                // survivor is promoted and everything else re-points at it.
                parent_event_id: row.id === anchorId ? null : anchorId,
                sync_status: syncStatus,
              } as never)
              .eq('id', row.id)
              .eq('user_id', user.id)
          )
      );

      // ── 5. Insert the new days ─────────────────────────────────────────
      const newDays = wanted.filter((d) => !existingByKey.has(localDayKey(d)));
      if (newDays.length > 0) {
        const rows = newDays.map((day) => {
          const isAnchor = !anchorRow && localDayKey(day) === localDayKey(wanted[0]);
          const id = isAnchor ? anchorId : crypto.randomUUID();
          noteLocalEvent(id);
          return {
            ...base,
            ...dayBounds(day),
            all_day: true,
            id,
            user_id: user.id,
            parent_event_id: isAnchor ? null : anchorId,
            sync_status: syncStatus,
          };
        });
        const { error } = await supabase.from('calendar_events').insert(rows as never);
        if (error) throw error;
      }

      // The anchor is what the caller shows and tells the customer about.
      const { data, error } = await supabase
        .from('calendar_events')
        .select('*')
        .eq('id', anchorId)
        .eq('user_id', user.id)
        .single();
      if (error) throw error;
      return data as CalendarEvent;
    },
    onSuccess: (anchor) => {
      queryClient.invalidateQueries({ queryKey: ['calendar-events'] });
      window.dispatchEvent(new CustomEvent('elecmate:gcal-sync'));
      toast({ title: 'Job booked in' });
      if (anchor?.user_id) {
        void trackUserEvent(anchor.user_id, 'feature_use', {
          eventName: 'calendar_split_job_saved',
        });
      }
    },
    onError: (error: Error) => {
      console.error('Failed to save split job:', error);
      toast({ title: 'Could not save those days', variant: 'destructive' });
    },
  });
}
