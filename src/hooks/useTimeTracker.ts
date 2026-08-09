import { useState, useEffect, useCallback, useRef } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useCompanyProfile } from '@/hooks/useCompanyProfile';
import { trackUserEvent } from '@/hooks/useActivityTracking';

export interface TimeSession {
  id: string;
  user_id: string;
  label: string | null;
  notes: string | null;
  started_at: string;
  ended_at: string | null;
  duration_seconds: number | null;
  hourly_rate: number | null;
  invoice_id: string | null;
  invoiced_at: string | null;
  project_id: string | null;
  /** Joined project — populated when the row was fetched with the embed. */
  project?: { id: string; title: string; customer_name?: string | null } | null;
  created_at: string;
  updated_at: string;
}

export const formatDuration = (seconds: number): string => {
  if (seconds < 0) seconds = 0;
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  // Sub-minute sessions used to floor to "0m", so a 55-second call-out showed
  // "0m" next to a real charge — it read as broken data rather than a short
  // job. A true zero still shows "0m"; anything billable shows its seconds.
  if (h === 0 && m === 0) return seconds === 0 ? '0m' : `${Math.floor(seconds)}s`;
  if (h === 0) return `${m}m`;
  return `${h}h ${String(m).padStart(2, '0')}m`;
};

export const formatDurationLong = (seconds: number): string => {
  if (seconds < 0) seconds = 0;
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  if (h === 0) return `${m} minute${m !== 1 ? 's' : ''}`;
  if (m === 0) return `${h} hour${h !== 1 ? 's' : ''}`;
  return `${h} hour${h !== 1 ? 's' : ''} ${m} minute${m !== 1 ? 's' : ''}`;
};

export const calculateValue = (seconds: number, rate: number): number => {
  const hours = seconds / 3600;
  return Math.round(hours * rate * 100) / 100;
};

const QUERY_KEY_ACTIVE = ['time-session-active'];
const QUERY_KEY_SESSIONS = ['time-sessions-recent'];

export const useTimeTracker = () => {
  const queryClient = useQueryClient();
  const { companyProfile } = useCompanyProfile();
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const hourlyRate = companyProfile?.hourly_rate ?? 45;

  // Fetch active session
  const {
    data: activeSession,
    isLoading: isLoadingActive,
    error: activeError,
  } = useQuery({
    queryKey: QUERY_KEY_ACTIVE,
    queryFn: async (): Promise<TimeSession | null> => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return null;

      const { data, error } = await supabase
        .from('time_sessions')
        .select('*')
        .eq('user_id', user.id)
        .is('ended_at', null)
        .maybeSingle();

      if (error) throw error;
      return data as TimeSession | null;
    },
  });

  // Fetch recent completed sessions
  const {
    data: sessions = [],
    isLoading: isLoadingSessions,
    error: sessionsError,
  } = useQuery({
    queryKey: QUERY_KEY_SESSIONS,
    queryFn: async (): Promise<TimeSession[]> => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return [];

      const { data, error } = await supabase
        .from('time_sessions')
        .select('*')
        .eq('user_id', user.id)
        .not('ended_at', 'is', null)
        .order('created_at', { ascending: false })
        .limit(20);

      if (error) throw error;
      return (data ?? []) as TimeSession[];
    },
  });

  // Live elapsed timer — computed from started_at, accurate after resume
  useEffect(() => {
    if (activeSession?.started_at) {
      const updateElapsed = () => {
        const startMs = new Date(activeSession.started_at).getTime();
        const nowMs = Date.now();
        setElapsedSeconds(Math.max(0, Math.floor((nowMs - startMs) / 1000)));
      };
      updateElapsed();
      timerRef.current = setInterval(updateElapsed, 1000);
    } else {
      setElapsedSeconds(0);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [activeSession?.started_at]);

  // Start session — accepts optional label + project tag.
  const startMutation = useMutation({
    mutationFn: async (args: {
      label?: string;
      projectId?: string | null;
    }): Promise<TimeSession> => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('time_sessions')
        .insert({
          user_id: user.id,
          label: args.label || null,
          project_id: args.projectId || null,
          started_at: new Date().toISOString(),
          hourly_rate: hourlyRate,
        })
        .select()
        .single();

      if (error) throw error;
      return data as TimeSession;
    },
    onSuccess: (session) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY_ACTIVE });
      queryClient.invalidateQueries({ queryKey: QUERY_KEY_SESSIONS });
      // Logging billable time is a paid-tier action and emitted nothing.
      if (session?.user_id) {
        void trackUserEvent(session.user_id, 'feature_use', {
          eventName: 'time_session_logged',
          eventData: { duration_seconds: session.duration_seconds ?? 0 },
        });
      }
    },
  });

  // Log a diary block as a completed session (ELE-1472).
  //
  // Ian Mills is on one site all week and was keeping a calendar entry AND a
  // separate timer. This turns the entry he already made into billable time.
  //
  // The session is written COMPLETE — started_at/ended_at come from the event,
  // not from now() — so it never collides with a running timer and never shows
  // up as "active". `hourly_rate` is stamped at import for the same reason the
  // live timer stamps it: a rate change next month must not silently rewrite
  // what past work was worth.
  //
  // Double-logging is prevented by a unique index on
  // time_sessions.calendar_event_id, not by the button being disabled — a
  // double-tap, a retry or a second device would all defeat the button.
  const logCalendarEventMutation = useMutation({
    mutationFn: async (args: {
      eventId: string;
      projectId: string;
      startedAt: string;
      endedAt: string;
      label?: string | null;
      notes?: string | null;
    }): Promise<TimeSession> => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const start = new Date(args.startedAt);
      const end = new Date(args.endedAt);
      if (isNaN(start.getTime()) || isNaN(end.getTime())) throw new Error('Invalid date');
      if (end <= start) throw new Error('End time must be after start time');

      const durationSeconds = Math.floor((end.getTime() - start.getTime()) / 1000);

      // `as never`: types.ts predates migration 20260805150000, so
      // calendar_event_id is not in the generated Insert type yet. Cast at the
      // boundary rather than reaching for `any`, which would add to the
      // no-explicit-any debt. Drop both casts when types.ts is regenerated.
      const { data, error } = await supabase
        .from('time_sessions')
        .insert({
          user_id: user.id,
          project_id: args.projectId,
          calendar_event_id: args.eventId,
          label: args.label || null,
          notes: args.notes || null,
          started_at: start.toISOString(),
          ended_at: end.toISOString(),
          duration_seconds: durationSeconds,
          hourly_rate: hourlyRate,
        } as never)
        .select()
        .single();

      if (error) {
        // 23505 = the unique index fired: this block is already on the project.
        // Report it as the harmless duplicate it is rather than a failure.
        if ((error as { code?: string }).code === '23505') {
          throw new Error('That diary entry has already been logged.');
        }
        throw error;
      }

      // Attribute the event to the project so it reads as logged next time and
      // does not reappear in the unlogged list. Best-effort: the time is
      // already safely recorded, and failing here must not lose it.
      await supabase
        .from('calendar_events')
        .update({ project_id: args.projectId } as never)
        .eq('id', args.eventId)
        .eq('user_id', user.id);

      return data as TimeSession;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY_SESSIONS });
      queryClient.invalidateQueries({ queryKey: ['calendar-events'] });
      queryClient.invalidateQueries({ queryKey: ['project-diary-blocks'] });
    },
  });

  // Stop session
  const stopMutation = useMutation({
    mutationFn: async (): Promise<TimeSession> => {
      if (!activeSession) throw new Error('No active session');

      const endedAt = new Date();
      const startedAt = new Date(activeSession.started_at);
      const durationSeconds = Math.max(
        0,
        Math.floor((endedAt.getTime() - startedAt.getTime()) / 1000)
      );

      const { data, error } = await supabase
        .from('time_sessions')
        .update({
          ended_at: endedAt.toISOString(),
          duration_seconds: durationSeconds,
          updated_at: new Date().toISOString(),
        })
        .eq('id', activeSession.id)
        .select()
        .single();

      if (error) throw error;
      return data as TimeSession;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY_ACTIVE });
      queryClient.invalidateQueries({ queryKey: QUERY_KEY_SESSIONS });
    },
  });

  // Update label
  const updateLabelMutation = useMutation({
    mutationFn: async (label: string) => {
      if (!activeSession) throw new Error('No active session');
      const { error } = await supabase
        .from('time_sessions')
        .update({ label, updated_at: new Date().toISOString() })
        .eq('id', activeSession.id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY_ACTIVE });
    },
  });

  // Update notes
  const updateNotesMutation = useMutation({
    mutationFn: async (notes: string) => {
      if (!activeSession) throw new Error('No active session');
      const { error } = await supabase
        .from('time_sessions')
        .update({ notes, updated_at: new Date().toISOString() })
        .eq('id', activeSession.id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY_ACTIVE });
    },
  });

  // Update project tag — accepts null to untag. Refuses on invoiced sessions.
  const updateProjectMutation = useMutation({
    mutationFn: async ({
      sessionId,
      projectId,
    }: {
      sessionId: string;
      projectId: string | null;
    }) => {
      const { data: existing } = await supabase
        .from('time_sessions')
        .select('invoice_id')
        .eq('id', sessionId)
        .single();
      if (existing?.invoice_id) {
        throw new Error('Cannot retag an invoiced session');
      }
      const { error } = await supabase
        .from('time_sessions')
        .update({
          project_id: projectId,
          updated_at: new Date().toISOString(),
        })
        .eq('id', sessionId);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY_ACTIVE });
      queryClient.invalidateQueries({ queryKey: QUERY_KEY_SESSIONS });
    },
  });

  // Update times — start and/or end. Recomputes duration_seconds server-side.
  // Refuses to touch invoiced sessions (audit safety).
  const updateTimesMutation = useMutation({
    mutationFn: async ({
      sessionId,
      startedAt,
      endedAt,
    }: {
      sessionId: string;
      startedAt: string;
      endedAt: string;
    }) => {
      const start = new Date(startedAt);
      const end = new Date(endedAt);
      if (isNaN(start.getTime()) || isNaN(end.getTime())) {
        throw new Error('Invalid date');
      }
      if (end <= start) {
        throw new Error('End time must be after start time');
      }
      // Block edits to invoiced sessions
      const { data: existing } = await supabase
        .from('time_sessions')
        .select('invoice_id')
        .eq('id', sessionId)
        .single();
      if (existing?.invoice_id) {
        throw new Error('Cannot edit an invoiced session');
      }
      const durationSeconds = Math.floor((end.getTime() - start.getTime()) / 1000);
      const { error } = await supabase
        .from('time_sessions')
        .update({
          started_at: start.toISOString(),
          ended_at: end.toISOString(),
          duration_seconds: durationSeconds,
          updated_at: new Date().toISOString(),
        })
        .eq('id', sessionId);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY_ACTIVE });
      queryClient.invalidateQueries({ queryKey: QUERY_KEY_SESSIONS });
    },
  });

  // Mark invoiced
  const markInvoicedMutation = useMutation({
    mutationFn: async ({ sessionId, invoiceId }: { sessionId: string; invoiceId: string }) => {
      const { error } = await supabase
        .from('time_sessions')
        .update({
          invoice_id: invoiceId,
          invoiced_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })
        .eq('id', sessionId);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY_SESSIONS });
    },
  });

  // Delete session (don't delete invoiced sessions)
  const deleteMutation = useMutation({
    mutationFn: async (sessionId: string) => {
      // Check if session is invoiced
      const { data: session } = await supabase
        .from('time_sessions')
        .select('invoice_id')
        .eq('id', sessionId)
        .single();

      if (session?.invoice_id) {
        throw new Error('Cannot delete an invoiced session');
      }

      const { error } = await supabase.from('time_sessions').delete().eq('id', sessionId);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY_ACTIVE });
      queryClient.invalidateQueries({ queryKey: QUERY_KEY_SESSIONS });
    },
  });

  const startSession = useCallback(
    (label?: string, projectId?: string | null) =>
      startMutation.mutateAsync({ label, projectId }),
    [startMutation]
  );

  const updateProject = useCallback(
    (sessionId: string, projectId: string | null) =>
      updateProjectMutation.mutateAsync({ sessionId, projectId }),
    [updateProjectMutation]
  );

  const stopSession = useCallback(() => stopMutation.mutateAsync(), [stopMutation]);

  const updateLabel = useCallback(
    (label: string) => updateLabelMutation.mutateAsync(label),
    [updateLabelMutation]
  );

  const updateNotes = useCallback(
    (notes: string) => updateNotesMutation.mutateAsync(notes),
    [updateNotesMutation]
  );

  const updateTimes = useCallback(
    (sessionId: string, startedAt: string, endedAt: string) =>
      updateTimesMutation.mutateAsync({ sessionId, startedAt, endedAt }),
    [updateTimesMutation]
  );

  const markInvoiced = useCallback(
    (sessionId: string, invoiceId: string) =>
      markInvoicedMutation.mutateAsync({ sessionId, invoiceId }),
    [markInvoicedMutation]
  );

  const deleteSession = useCallback(
    (sessionId: string) => deleteMutation.mutateAsync(sessionId),
    [deleteMutation]
  );

  const logCalendarEvent = useCallback(
    (args: {
      eventId: string;
      projectId: string;
      startedAt: string;
      endedAt: string;
      label?: string | null;
      notes?: string | null;
    }) => logCalendarEventMutation.mutateAsync(args),
    [logCalendarEventMutation]
  );

  return {
    activeSession: activeSession ?? null,
    sessions,
    elapsedSeconds,
    hourlyRate,
    startSession,
    stopSession,
    updateLabel,
    updateNotes,
    updateTimes,
    updateProject,
    markInvoiced,
    deleteSession,
    logCalendarEvent,
    isLoggingCalendarEvent: logCalendarEventMutation.isPending,
    isLoading: isLoadingActive || isLoadingSessions,
    isStarting: startMutation.isPending,
    error: activeError || sessionsError,
  };
};
