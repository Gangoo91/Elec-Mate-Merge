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
      // Validate invoice ID before making API call
      if (!invoiceId || invoiceId === 'undefined' || invoiceId === 'null') {
        console.error('syncInvoice called with invalid invoiceId:', invoiceId);
        toast.error('Invalid invoice - please try again');
        return false;
      }

      // Validate UUID format
      const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
      if (!uuidRegex.test(invoiceId)) {
        console.error('syncInvoice called with malformed invoiceId:', invoiceId);
        toast.error('Invalid invoice ID format');
        return false;
      }

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

      console.log('%c=== ACCOUNTING SYNC START ===', 'background: blue; color: white; font-size: 14px;');
      console.log('Invoice ID:', invoiceId);
      console.log('Provider:', targetProvider);

      const response = await supabase.functions.invoke('accounting-sync-invoice', {
        headers: { Authorization: `Bearer ${session.session.access_token}` },
        body: { invoiceId, provider: targetProvider },
      });

      // Log full response for debugging - use console.warn for visibility
      console.log('%c=== SYNC RESPONSE ===', 'background: green; color: white; font-size: 14px;');
      console.warn('Full response object:', response);
      console.warn('Response error:', response.error);
      console.warn('Response data:', response.data);

      // Check for error in response data (we now return 200 with success: false for errors)
      if (response.data?.success === false || response.data?.error) {
        console.log('%c=== SYNC ERROR ===', 'background: red; color: white; font-size: 16px;');
        console.error('Full error response:', JSON.stringify(response.data, null, 2));
        // Show the main error in toast, and log the detail
        const mainError = response.data?.error || 'Failed to sync invoice';
        const detail = response.data?.detail;
        console.error('%cERROR DETAIL:', 'color: red; font-weight: bold;', detail);
        // Show truncated detail in toast for visibility
        const toastMsg = detail ? `${mainError}: ${detail.substring(0, 200)}` : mainError;
        toast.error(toastMsg, { duration: 10000 }); // Longer duration to read error
        return false;
      }

      if (response.error) {
        // Log full error details for debugging
        console.error('Sync invoice response error:', response.error);
        console.error('Sync invoice response data:', response.data);

        // Try to get error detail from response data if available
        const errorDetail = response.data?.detail || response.data?.error || response.error.message || 'Failed to sync invoice';
        console.error('Error detail extracted:', errorDetail);
        throw new Error(errorDetail);
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
