import { useState, useEffect, useCallback, useRef } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useCompanyProfile } from '@/hooks/useCompanyProfile';

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
  created_at: string;
  updated_at: string;
}

export const formatDuration = (seconds: number): string => {
  if (seconds < 0) seconds = 0;
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
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

  // Start session
  const startMutation = useMutation({
    mutationFn: async (label?: string): Promise<TimeSession> => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('time_sessions')
        .insert({
          user_id: user.id,
          label: label || null,
          started_at: new Date().toISOString(),
          hourly_rate: hourlyRate,
        })
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
    (label?: string) => startMutation.mutateAsync(label),
    [startMutation]
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

  const markInvoiced = useCallback(
    (sessionId: string, invoiceId: string) =>
      markInvoicedMutation.mutateAsync({ sessionId, invoiceId }),
    [markInvoicedMutation]
  );

  const deleteSession = useCallback(
    (sessionId: string) => deleteMutation.mutateAsync(sessionId),
    [deleteMutation]
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
    markInvoiced,
    deleteSession,
    isLoading: isLoadingActive || isLoadingSessions,
    isStarting: startMutation.isPending,
    error: activeError || sessionsError,
  };
};
