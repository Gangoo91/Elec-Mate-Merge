/**
 * Outlook (Microsoft 365) calendar sync — mirror of useGoogleCalendarSync.
 * Status reads outlook_calendar_tokens directly; connect/disconnect/sync go
 * through the same provider-aware edge functions as Google.
 */
import { useState, useCallback, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { openExternalUrl } from '@/utils/open-external-url';
import type { GoogleCalendarStatus } from '@/types/calendar';

const SUPABASE_URL = 'https://jtwygbeceundfgnkirof.supabase.co';

export function useOutlookCalendarSync() {
  const [status, setStatus] = useState<GoogleCalendarStatus>({
    connected: false,
    syncEnabled: false,
  });
  const [loading, setLoading] = useState(true);
  const [connecting, setConnecting] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const { toast } = useToast();

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
        .from('outlook_calendar_tokens')
        .select('outlook_email, sync_enabled, last_sync_at')
        .eq('user_id', user.id)
        .maybeSingle();

      if (!tokenData) {
        setStatus({ connected: false, syncEnabled: false });
      } else {
        setStatus({
          connected: true,
          email: tokenData.outlook_email ?? undefined,
          lastSyncAt: tokenData.last_sync_at ?? undefined,
          syncEnabled: tokenData.sync_enabled ?? false,
        });
      }
    } catch (error) {
      console.error('Failed to fetch Outlook calendar status:', error);
      setStatus({ connected: false, syncEnabled: false });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshStatus();
  }, [refreshStatus]);

  // Detect return from the OAuth window (web focus / native resume).
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
    window.addEventListener('capacitor:resume', handleResume);
    return () => {
      window.removeEventListener('focus', handleResume);
      window.removeEventListener('capacitor:resume', handleResume);
    };
  }, [connecting, refreshStatus]);

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
        body: JSON.stringify({ provider: 'outlook' }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Failed to start OAuth flow');
      }

      const { authUrl } = await response.json();
      await openExternalUrl(authUrl);
    } catch (error: unknown) {
      console.error('Failed to connect Outlook Calendar:', error);
      toast({
        title: error instanceof Error ? error.message : 'Failed to connect',
        variant: 'destructive',
      });
      setConnecting(false);
    }
  }, [toast]);

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
        body: JSON.stringify({ provider: 'outlook' }),
      });

      if (!response.ok) throw new Error('Failed to disconnect');

      setStatus({ connected: false, syncEnabled: false });
      toast({ title: 'Outlook Calendar disconnected' });
    } catch (error: unknown) {
      console.error('Failed to disconnect Outlook Calendar:', error);
      toast({
        title: error instanceof Error ? error.message : 'Failed to disconnect',
        variant: 'destructive',
      });
    }
  }, [toast]);

  const syncNow = useCallback(async () => {
    try {
      setSyncing(true);
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) throw new Error('Not authenticated');

      const response = await fetch(`${SUPABASE_URL}/functions/v1/sync-outlook-calendar`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${session.access_token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) throw new Error('Sync failed');

      const data = await response.json();
      toast({ title: `Synced ${data.pulled ?? 0} pulled, ${data.pushed ?? 0} pushed` });
      await refreshStatus();
    } catch (error: unknown) {
      console.error('Outlook calendar sync failed:', error);
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
    refreshStatus,
  };
}
