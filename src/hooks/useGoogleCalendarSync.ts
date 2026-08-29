import { useState, useCallback, useEffect, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { openExternalUrl } from '@/utils/open-external-url';
import type { GoogleCalendarStatus } from '@/types/calendar';

const SUPABASE_URL = 'https://jtwygbeceundfgnkirof.supabase.co';

export function useGoogleCalendarSync() {
  const [status, setStatus] = useState<GoogleCalendarStatus>({
    connected: false,
    syncEnabled: false,
  });
  const [loading, setLoading] = useState(true);
  const [connecting, setConnecting] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const { toast } = useToast();

  // Refresh connection status — reads from DB directly (no edge function needed)
  const refreshStatus = useCallback(async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        setStatus({ connected: false, syncEnabled: false });
        setLoading(false);
        return;
      }

      const { data: tokenData } = await supabase
        .from('google_calendar_tokens')
        .select('google_email, sync_enabled, last_sync_at')
        .eq('user_id', user.id)
        .maybeSingle();

      if (!tokenData) {
        setStatus({ connected: false, syncEnabled: false });
      } else {
        setStatus({
          connected: true,
          email: tokenData.google_email ?? undefined,
          lastSyncAt: tokenData.last_sync_at ?? undefined,
          syncEnabled: tokenData.sync_enabled ?? false,
        });
      }
    } catch (error) {
      console.error('Failed to fetch calendar status:', error);
      setStatus({ connected: false, syncEnabled: false });
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial load
  useEffect(() => {
    refreshStatus();
  }, [refreshStatus]);

  // Listen for focus/resume to detect OAuth redirect return
  useEffect(() => {
    const handleResume = () => {
      if (connecting) {
        setTimeout(() => {
          refreshStatus();
          setConnecting(false);
        }, 1500);
      }
    };

    window.addEventListener('focus', handleResume);
    // On native, appStateChange fires reliably when app resumes from background
    window.addEventListener('capacitor:resume', handleResume);
    return () => {
      window.removeEventListener('focus', handleResume);
      window.removeEventListener('capacitor:resume', handleResume);
    };
  }, [connecting, refreshStatus]);

  // Connect Google Calendar (start OAuth flow)
  const connect = useCallback(async () => {
    try {
      setConnecting(true);
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) throw new Error('Not authenticated');

      const response = await fetch(`${SUPABASE_URL}/functions/v1/calendar-oauth-init`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${session.access_token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({}),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Failed to start OAuth flow');
      }

      const { authUrl } = await response.json();
      await openExternalUrl(authUrl);
    } catch (error: unknown) {
      console.error('Failed to connect Google Calendar:', error);
      toast({
        title: error instanceof Error ? error.message : 'Failed to connect',
        variant: 'destructive',
      });
      setConnecting(false);
    }
  }, [toast]);

  // Disconnect Google Calendar
  const disconnect = useCallback(async () => {
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) throw new Error('Not authenticated');

      const response = await fetch(`${SUPABASE_URL}/functions/v1/calendar-disconnect`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${session.access_token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) throw new Error('Failed to disconnect');

      setStatus({ connected: false, syncEnabled: false });
      toast({ title: 'Google Calendar disconnected' });
    } catch (error: unknown) {
      console.error('Failed to disconnect Google Calendar:', error);
      toast({
        title: error instanceof Error ? error.message : 'Failed to disconnect',
        variant: 'destructive',
      });
    }
  }, [toast]);

  // Silent auto-sync: no toasts, throttled to one run per 30s. Fired when
  // the diary opens, when the window regains focus, and after event changes —
  // the user should never have to think about Sync Now.
  const lastQuietSyncRef = useRef(0);
  const quietSync = useCallback(async (force = false) => {
    if (!status.connected) return;
    const now = Date.now();
    if (!force && now - lastQuietSyncRef.current < 30_000) return;
    lastQuietSyncRef.current = now;
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) return;
      await fetch(`${SUPABASE_URL}/functions/v1/sync-google-calendar`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${session.access_token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({}),
      });
    } catch (error) {
      // Silent by design — the 15-minute server sweep is the backstop.
      console.warn('Quiet calendar sync failed:', error);
    }
  }, [status.connected]);

  // Manual sync
  const syncNow = useCallback(async () => {
    try {
      setSyncing(true);
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) throw new Error('Not authenticated');

      const response = await fetch(`${SUPABASE_URL}/functions/v1/sync-google-calendar`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${session.access_token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) throw new Error('Sync failed');

      const data = await response.json();
      toast({
        title: data.skipped
          ? 'Already up to date'
          : `Synced ${data.pulled ?? 0} pulled, ${data.pushed ?? 0} pushed`,
      });
      await refreshStatus();
    } catch (error: unknown) {
      console.error('Calendar sync failed:', error);
      toast({
        title: error instanceof Error ? error.message : 'Sync failed',
        variant: 'destructive',
      });
    } finally {
      setSyncing(false);
    }
  }, [toast, refreshStatus]);

  return {
    status,
    loading,
    connecting,
    syncing,
    connect,
    disconnect,
    syncNow,
    quietSync,
    refreshStatus,
  };
}
