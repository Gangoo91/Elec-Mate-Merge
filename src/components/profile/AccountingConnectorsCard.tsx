/**
 * AccountingConnectorsCard
 * Card component for managing accounting software integrations
 * Displays in Profile page alongside PaymentBankingCard
 */

import React, { useState, useEffect } from 'react';
import {
  Calculator,
  CheckCircle,
  AlertCircle,
  Clock,
  ChevronRight,
  Loader2,
  RefreshCw,
  Link2Off,
  ExternalLink,
} from 'lucide-react';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { motion } from 'framer-motion';
import { useAccountingIntegrations } from '@/hooks/useAccountingIntegrations';
import {
  AccountingProvider,
  ACCOUNTING_PROVIDERS,
  AccountingIntegration,
} from '@/types/accounting';
import { formatDistanceToNow } from 'date-fns';

// Provider logos as SVG components
const XeroLogo = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 16.894l-3.188-3.188 3.188-3.188a.75.75 0 10-1.06-1.06L12 12.645 9.166 9.81a.75.75 0 10-1.06 1.06l3.188 3.188-3.188 3.188a.75.75 0 101.06 1.06L12 14.118l2.834 2.836a.75.75 0 101.06-1.06z" />
  </svg>
);

const QuickBooksLogo = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 18.75a6.75 6.75 0 110-13.5 6.75 6.75 0 010 13.5zm0-10.5a3.75 3.75 0 100 7.5 3.75 3.75 0 000-7.5z" />
  </svg>
);

const SageLogo = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
  </svg>
);

const FreshBooksLogo = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 14H8v-2h4v2zm4-4H8v-2h8v2zm0-4H8V7h8v2z" />
  </svg>
);

const ProviderIcon = ({ provider }: { provider: AccountingProvider }) => {
  switch (provider) {
    case 'xero':
      return <XeroLogo />;
    case 'quickbooks':
      return <QuickBooksLogo />;
    case 'sage':
      return <SageLogo />;
    case 'freshbooks':
      return <FreshBooksLogo />;
    default:
      return <Calculator className="h-5 w-5" />;
  }
};

const AccountingConnectorsCard: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const {
    integrations,
    loading,
    connecting,
    hasConnectedProvider,
    connectProvider,
    disconnectProvider,
    refreshStatus,
    isProviderConnected,
    getIntegration,
  } = useAccountingIntegrations();

  // Check for success/error params in URL (after OAuth redirect)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const accountingSuccess = params.get('accounting');
    const accountingError = params.get('accounting_error');

    if (accountingSuccess) {
      // Remove params from URL
      const newUrl = window.location.pathname;
      window.history.replaceState({}, '', newUrl);
    }

    if (accountingError) {
      // Remove params from URL
      const newUrl = window.location.pathname;
      window.history.replaceState({}, '', newUrl);
    }
  }, []);

  // Get first connected integration for preview
  const connectedIntegration = integrations.find(i => i.status === 'connected');

  // Available providers to show
  const providers: AccountingProvider[] = ['xero', 'quickbooks', 'sage', 'freshbooks'];

  const handleConnect = async (provider: AccountingProvider) => {
    await connectProvider(provider);
  };

  const handleDisconnect = async (provider: AccountingProvider) => {
    if (window.confirm(`Disconnect ${ACCOUNTING_PROVIDERS[provider].name}? You can reconnect anytime.`)) {
      await disconnectProvider(provider);
    }
  };

  const getStatusIcon = (integration: AccountingIntegration | undefined) => {
    if (!integration) return null;

    switch (integration.status) {
      case 'connected':
        return <CheckCircle className="h-4 w-4 text-green-400" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-amber-400" />;
      case 'error':
        return <AlertCircle className="h-4 w-4 text-red-400" />;
      default:
        return null;
    }
  };

  const getStatusText = (integration: AccountingIntegration | undefined) => {
    if (!integration) return 'Not connected';

    switch (integration.status) {
      case 'connected':
        return integration.tenantName || 'Connected';
      case 'pending':
        return 'Setup incomplete';
      case 'error':
        return integration.error || 'Needs attention';
      default:
        return 'Not connected';
    }
  };

  return (
    <>
      <motion.div
        className="bg-white/[0.03] border border-white/[0.06] rounded-2xl overflow-hidden"
        whileTap={{ scale: 0.98 }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      >
        <button
          onClick={() => setIsEditing(true)}
          className="w-full flex items-center justify-between px-4 py-3.5 active:bg-white/[0.04] transition-colors touch-manipulation"
        >
          <div className="flex items-center gap-2.5">
            <div className="w-1.5 h-1.5 rounded-full bg-purple-400" />
            <span className="font-semibold text-[15px] text-white">Accounting Software</span>
          </div>
          <ChevronRight className="h-5 w-5 text-white/30" />
        </button>

        <div className="border-t border-white/[0.06]">
          {/* Preview of connected integrations */}
          <div className="flex items-center gap-3 px-4 py-3">
            <div className="w-8 h-8 rounded-lg bg-purple-500/15 flex items-center justify-center flex-shrink-0">
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin text-purple-400" />
              ) : connectedIntegration ? (
                <span className={ACCOUNTING_PROVIDERS[connectedIntegration.provider].logoColor}>
                  <ProviderIcon provider={connectedIntegration.provider} />
                </span>
              ) : (
                <Calculator className="h-4 w-4 text-purple-400" />
              )}
            </div>
            <div className="flex-1 min-w-0 text-left">
              <p className="text-[11px] font-medium text-white/50 uppercase tracking-wide">
                Invoice Sync
              </p>
              {loading ? (
                <div className="flex items-center gap-2">
                  <span className="text-[15px] text-white/50">Checking...</span>
                </div>
              ) : connectedIntegration ? (
                <div className="flex items-center gap-2">
                  {getStatusIcon(connectedIntegration)}
                  <span className="text-[15px] text-green-400">
                    {getStatusText(connectedIntegration)}
                  </span>
                </div>
              ) : (
                <span className="text-[15px] text-white">Not connected</span>
              )}
              {connectedIntegration?.lastSyncAt && (
                <p className="text-[12px] text-white/40">
                  Last sync: {formatDistanceToNow(new Date(connectedIntegration.lastSyncAt), { addSuffix: true })}
                </p>
              )}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Edit Sheet */}
      <Sheet open={isEditing} onOpenChange={setIsEditing}>
        <SheetContent side="bottom" className="h-[85vh] rounded-t-[20px] p-0 border-0 bg-[#1c1c1e]">
          <div className="flex justify-center pt-3 pb-2">
            <div className="w-9 h-1 rounded-full bg-white/20" />
          </div>

          <div className="flex items-center justify-between px-4 pb-4 border-b border-white/[0.08]">
            <button
              onClick={() => setIsEditing(false)}
              className="text-[17px] text-blue-400 font-normal active:opacity-50 touch-manipulation"
            >
              Done
            </button>
            <h2 className="text-[17px] font-semibold text-white">Accounting Software</h2>
            <button
              onClick={refreshStatus}
              disabled={loading}
              className="text-[17px] text-blue-400 active:opacity-50 touch-manipulation disabled:opacity-50"
            >
              {loading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <RefreshCw className="h-5 w-5" />
              )}
            </button>
          </div>

          <div className="px-4 py-6 space-y-4 momentum-scroll-y pb-32">
            <p className="text-[13px] text-white/50 mb-6">
              Connect your accounting software to automatically sync invoices. Your data stays secure with encrypted OAuth connections.
            </p>

            {/* Provider List */}
            {providers.map((providerId) => {
              const provider = ACCOUNTING_PROVIDERS[providerId];
              const integration = getIntegration(providerId);
              const isConnected = isProviderConnected(providerId);

              return (
                <motion.div
                  key={providerId}
                  className={`flex items-center gap-4 p-4 rounded-xl border transition-colors ${
                    isConnected
                      ? 'bg-white/[0.04] border-green-500/30'
                      : 'bg-white/[0.02] border-white/[0.08]'
                  }`}
                  whileTap={{ scale: 0.98 }}
                >
                  {/* Provider Logo */}
                  <div className={`w-12 h-12 rounded-xl ${provider.bgColor} flex items-center justify-center flex-shrink-0`}>
                    <span className={provider.logoColor}>
                      <ProviderIcon provider={providerId} />
                    </span>
                  </div>

                  {/* Provider Info */}
                  <div className="flex-1 min-w-0">
                    <p className="text-[15px] font-semibold text-white">{provider.name}</p>
                    {isConnected ? (
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <CheckCircle className="h-3.5 w-3.5 text-green-400" />
                        <span className="text-[13px] text-green-400">
                          {integration?.tenantName || 'Connected'}
                        </span>
                      </div>
                    ) : (
                      <p className="text-[13px] text-white/50">{provider.description}</p>
                    )}
                    {integration?.lastSyncAt && (
                      <p className="text-[11px] text-white/40 mt-0.5">
                        Synced {formatDistanceToNow(new Date(integration.lastSyncAt), { addSuffix: true })}
                      </p>
                    )}
                  </div>

                  {/* Action Button */}
                  {isConnected ? (
                    <button
                      onClick={() => handleDisconnect(providerId)}
                      disabled={connecting}
                      className="h-9 px-3 rounded-lg bg-red-500/15 border border-red-500/30 text-[13px] font-medium text-red-400 active:bg-red-500/25 touch-manipulation disabled:opacity-50 flex items-center gap-1.5"
                    >
                      {connecting ? (
                        <Loader2 className="h-3.5 w-3.5 animate-spin" />
                      ) : (
                        <Link2Off className="h-3.5 w-3.5" />
                      )}
                      <span className="hidden sm:inline">Disconnect</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => handleConnect(providerId)}
                      disabled={connecting}
                      className="h-9 px-4 rounded-lg bg-blue-500/15 border border-blue-500/30 text-[13px] font-medium text-blue-400 active:bg-blue-500/25 touch-manipulation disabled:opacity-50 flex items-center gap-1.5"
                    >
                      {connecting ? (
                        <Loader2 className="h-3.5 w-3.5 animate-spin" />
                      ) : (
                        <ExternalLink className="h-3.5 w-3.5" />
                      )}
                      Connect
                    </button>
                  )}
                </motion.div>
              );
            })}

            {/* Help Section */}
            <div className="mt-8 p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
              <h3 className="text-[13px] font-semibold text-white/70 mb-2">How it works</h3>
              <ul className="text-[12px] text-white/50 space-y-2">
                <li className="flex items-start gap-2">
                  <span className="w-4 h-4 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center text-[10px] mt-0.5 flex-shrink-0">1</span>
                  <span>Connect your accounting software with secure OAuth</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-4 h-4 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center text-[10px] mt-0.5 flex-shrink-0">2</span>
                  <span>When you send an invoice, tap "Sync to Accounting"</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-4 h-4 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center text-[10px] mt-0.5 flex-shrink-0">3</span>
                  <span>Invoice and client appear automatically in your accounting</span>
                </li>
              </ul>
            </div>

            {/* Security Note */}
            <p className="text-[11px] text-white/40 text-center mt-4">
              Elec-Mate uses encrypted OAuth tokens. We never see your accounting login details.
            </p>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default AccountingConnectorsCard;
