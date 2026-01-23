/**
 * Hook for managing accounting software integrations
 * Handles OAuth flow, sync status, and provider management
 */

import { useState, useCallback, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import {
  AccountingIntegration,
  AccountingProvider,
  ACCOUNTING_PROVIDERS,
  getProviderDisplayName,
} from '@/types/accounting';

interface UseAccountingIntegrationsReturn {
  integrations: AccountingIntegration[];
  loading: boolean;
  connecting: boolean;
  hasConnectedProvider: boolean;

  // Actions
  connectProvider: (provider: AccountingProvider) => Promise<void>;
  disconnectProvider: (provider: AccountingProvider) => Promise<void>;
  syncInvoice: (invoiceId: string, provider?: AccountingProvider) => Promise<boolean>;
  refreshStatus: () => Promise<void>;

  // Helpers
  getIntegration: (provider: AccountingProvider) => AccountingIntegration | undefined;
  isProviderConnected: (provider: AccountingProvider) => boolean;
}

export const useAccountingIntegrations = (): UseAccountingIntegrationsReturn => {
  const [integrations, setIntegrations] = useState<AccountingIntegration[]>([]);
  const [loading, setLoading] = useState(true);
  const [connecting, setConnecting] = useState(false);
  const [hasConnectedProvider, setHasConnectedProvider] = useState(false);

  // Fetch current integration status
  const refreshStatus = useCallback(async () => {
    try {
      setLoading(true);
      const { data: session } = await supabase.auth.getSession();
      if (!session.session) {
        setIntegrations([]);
        setHasConnectedProvider(false);
        return;
      }

      const response = await supabase.functions.invoke('accounting-get-status', {
        headers: { Authorization: `Bearer ${session.session.access_token}` },
      });

      if (response.error) {
        console.error('Error fetching accounting status:', response.error);
        return;
      }

      setIntegrations(response.data?.integrations || []);
      setHasConnectedProvider(response.data?.hasConnectedProvider || false);
    } catch (error) {
      console.error('Error fetching accounting status:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial fetch and focus listener
  useEffect(() => {
    refreshStatus();

    // Re-check when window gains focus (after OAuth redirect)
    const handleFocus = () => refreshStatus();
    window.addEventListener('focus', handleFocus);

    return () => {
      window.removeEventListener('focus', handleFocus);
    };
  }, [refreshStatus]);

  // Connect to a provider (initiates OAuth flow)
  const connectProvider = useCallback(async (provider: AccountingProvider) => {
    try {
      setConnecting(true);
      const { data: session } = await supabase.auth.getSession();

      if (!session.session) {
        toast.error('Please log in to connect accounting software');
        return;
      }

      const response = await supabase.functions.invoke('accounting-oauth-init', {
        headers: { Authorization: `Bearer ${session.session.access_token}` },
        body: { provider },
      });

      if (response.error) {
        throw new Error(response.error.message || 'Failed to start connection');
      }

      if (response.data?.error) {
        toast.error(response.data.error);
        return;
      }

      const { authUrl } = response.data;
      if (authUrl) {
        // Redirect to provider OAuth page
        window.location.href = authUrl;
      } else {
        toast.error('Could not start connection flow');
      }
    } catch (error: any) {
      console.error(`Error connecting ${provider}:`, error);
      toast.error(error?.message || `Failed to connect ${getProviderDisplayName(provider)}`);
    } finally {
      setConnecting(false);
    }
  }, []);

  // Disconnect a provider
  const disconnectProvider = useCallback(async (provider: AccountingProvider) => {
    try {
      setConnecting(true);
      const { data: session } = await supabase.auth.getSession();

      if (!session.session) {
        toast.error('Please log in');
        return;
      }

      const response = await supabase.functions.invoke('accounting-disconnect', {
        headers: { Authorization: `Bearer ${session.session.access_token}` },
        body: { provider },
      });

      if (response.error) {
        throw new Error(response.error.message || 'Failed to disconnect');
      }

      toast.success(`${getProviderDisplayName(provider)} disconnected`);

      // Refresh status
      await refreshStatus();
    } catch (error: any) {
      console.error(`Error disconnecting ${provider}:`, error);
      toast.error(error?.message || `Failed to disconnect ${getProviderDisplayName(provider)}`);
    } finally {
      setConnecting(false);
    }
  }, [refreshStatus]);

  // Sync an invoice to connected accounting software
  const syncInvoice = useCallback(async (
    invoiceId: string,
    provider?: AccountingProvider
  ): Promise<boolean> => {
    try {
      const { data: session } = await supabase.auth.getSession();

      if (!session.session) {
        toast.error('Please log in to sync invoices');
        return false;
      }

      // If no provider specified, use first connected provider
      const targetProvider = provider || integrations.find(i => i.status === 'connected')?.provider;

      if (!targetProvider) {
        toast.error('No accounting software connected');
        return false;
      }

      const response = await supabase.functions.invoke('accounting-sync-invoice', {
        headers: { Authorization: `Bearer ${session.session.access_token}` },
        body: { invoiceId, provider: targetProvider },
      });

      if (response.error) {
        throw new Error(response.error.message || 'Failed to sync invoice');
      }

      if (response.data?.error) {
        toast.error(response.data.error);
        return false;
      }

      toast.success(`Invoice synced to ${getProviderDisplayName(targetProvider)}`);

      // Refresh status to update lastSyncAt
      await refreshStatus();

      return true;
    } catch (error: any) {
      console.error('Error syncing invoice:', error);
      toast.error(error?.message || 'Failed to sync invoice');
      return false;
    }
  }, [integrations, refreshStatus]);

  // Helper: Get integration by provider
  const getIntegration = useCallback((provider: AccountingProvider): AccountingIntegration | undefined => {
    return integrations.find(i => i.provider === provider);
  }, [integrations]);

  // Helper: Check if provider is connected
  const isProviderConnected = useCallback((provider: AccountingProvider): boolean => {
    return integrations.some(i => i.provider === provider && i.status === 'connected');
  }, [integrations]);

  return {
    integrations,
    loading,
    connecting,
    hasConnectedProvider,
    connectProvider,
    disconnectProvider,
    syncInvoice,
    refreshStatus,
    getIntegration,
    isProviderConnected,
  };
};

export default useAccountingIntegrations;
