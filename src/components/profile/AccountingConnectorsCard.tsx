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

// Proper brand logos as SVG components
const XeroLogo = () => (
  <svg viewBox="0 0 512 512" className="h-7 w-7" fill="currentColor">
    <path d="M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256 256-114.6 256-256S397.4 0 256 0zm127.3 295.3l-67.9-67.9 67.9-67.9c8.3-8.3 8.3-21.8 0-30.2-8.3-8.3-21.8-8.3-30.2 0L285.2 197l-67.9-67.9c-8.3-8.3-21.8-8.3-30.2 0-8.3 8.3-8.3 21.8 0 30.2l67.9 67.9-67.9 67.9c-8.3 8.3-8.3 21.8 0 30.2 4.2 4.2 9.6 6.2 15.1 6.2s10.9-2.1 15.1-6.2l67.9-67.9 67.9 67.9c4.2 4.2 9.6 6.2 15.1 6.2s10.9-2.1 15.1-6.2c8.3-8.4 8.3-21.9 0-30.2z"/>
  </svg>
);

const QuickBooksLogo = () => (
  <svg viewBox="0 0 24 24" className="h-7 w-7" fill="currentColor">
    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zM9.5 16.5c-2.485 0-4.5-2.015-4.5-4.5s2.015-4.5 4.5-4.5c.828 0 1.5.672 1.5 1.5s-.672 1.5-1.5 1.5c-.827 0-1.5.673-1.5 1.5s.673 1.5 1.5 1.5h3c.828 0 1.5-.672 1.5-1.5V9c0-.828.672-1.5 1.5-1.5s1.5.672 1.5 1.5v3c0 2.485-2.015 4.5-4.5 4.5h-3zm5-9c2.485 0 4.5 2.015 4.5 4.5s-2.015 4.5-4.5 4.5c-.828 0-1.5-.672-1.5-1.5s.672-1.5 1.5-1.5c.827 0 1.5-.673 1.5-1.5s-.673-1.5-1.5-1.5h-3c-.828 0-1.5.672-1.5 1.5v3c0 .828-.672 1.5-1.5 1.5s-1.5-.672-1.5-1.5v-3c0-2.485 2.015-4.5 4.5-4.5h3z"/>
  </svg>
);

const SageLogo = () => (
  <svg viewBox="0 0 24 24" className="h-7 w-7" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9v-2h2v2zm0-4H9V7h2v5zm4 4h-2v-5h2v5zm0-7h-2V7h2v2z"/>
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
    default:
      return <Calculator className="h-7 w-7" />;
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
      const newUrl = window.location.pathname;
      window.history.replaceState({}, '', newUrl);
    }

    if (accountingError) {
      const newUrl = window.location.pathname;
      window.history.replaceState({}, '', newUrl);
    }
  }, []);

  // Get first connected integration for preview
  const connectedIntegration = integrations.find(i => i.status === 'connected');

  // Active providers - Xero and QuickBooks
  const activeProviders: AccountingProvider[] = ['xero', 'quickbooks'];
  // Coming soon - Sage only
  const comingSoonProviders: AccountingProvider[] = ['sage'];

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
                <span className="text-[15px] text-white/50">Checking...</span>
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
        <SheetContent side="bottom" className="h-[85vh] rounded-t-[20px] p-0 border-0 bg-[#0f0f13] flex flex-col">
          <div className="flex justify-center pt-3 pb-2 flex-shrink-0">
            <div className="w-9 h-1 rounded-full bg-white/20" />
          </div>

          <div className="flex items-center justify-between px-4 pb-4 border-b border-white/[0.08] flex-shrink-0">
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

          <div className="flex-1 overflow-y-auto overscroll-contain px-4 py-6 space-y-3">
            <p className="text-[13px] text-white/50 mb-4 text-center">
              Connect your accounting software to automatically sync invoices
            </p>

            {/* Active Providers - Xero & QuickBooks */}
            {activeProviders.map((providerId) => {
              const provider = ACCOUNTING_PROVIDERS[providerId];
              const integration = getIntegration(providerId);
              const isConnected = isProviderConnected(providerId);

              return (
                <motion.div
                  key={providerId}
                  className={`relative overflow-hidden rounded-2xl border transition-all ${
                    isConnected
                      ? 'bg-gradient-to-br from-green-500/10 to-green-600/5 border-green-500/30'
                      : 'bg-gradient-to-br from-white/[0.04] to-white/[0.02] border-white/[0.08] hover:border-white/[0.15]'
                  }`}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center gap-4 p-4">
                    {/* Provider Logo */}
                    <div
                      className={`w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 ${
                        providerId === 'xero'
                          ? 'bg-[#13B5EA]/20'
                          : 'bg-[#2CA01C]/20'
                      }`}
                    >
                      <span className={providerId === 'xero' ? 'text-[#13B5EA]' : 'text-[#2CA01C]'}>
                        <ProviderIcon provider={providerId} />
                      </span>
                    </div>

                    {/* Provider Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="text-[16px] font-semibold text-white">{provider.name}</p>
                        {isConnected && (
                          <span className="px-2 py-0.5 rounded-full bg-green-500/20 text-[10px] font-semibold text-green-400 uppercase">
                            Connected
                          </span>
                        )}
                        {providerId === 'quickbooks' && !isConnected && (
                          <span className="px-2 py-0.5 rounded-full bg-amber-500/20 border border-amber-500/30 text-[10px] font-semibold text-amber-400">
                            £38/mo plan
                          </span>
                        )}
                      </div>
                      {isConnected ? (
                        <div className="flex items-center gap-1.5 mt-1">
                          <CheckCircle className="h-3.5 w-3.5 text-green-400" />
                          <span className="text-[13px] text-green-400/80">
                            {integration?.tenantName || 'Connected'}
                          </span>
                        </div>
                      ) : (
                        <p className="text-[13px] text-white/40 mt-0.5">
                          {provider.description}
                          {providerId === 'quickbooks' && (
                            <span className="block text-amber-400/70 mt-0.5">
                              Requires Business Pro subscription
                            </span>
                          )}
                        </p>
                      )}
                      {integration?.lastSyncAt && (
                        <p className="text-[11px] text-white/30 mt-1">
                          Last synced {formatDistanceToNow(new Date(integration.lastSyncAt), { addSuffix: true })}
                        </p>
                      )}
                    </div>

                    {/* Action Button */}
                    {isConnected ? (
                      <button
                        onClick={() => handleDisconnect(providerId)}
                        disabled={connecting}
                        className="h-10 px-4 rounded-xl bg-red-500/10 border border-red-500/20 text-[13px] font-medium text-red-400 active:bg-red-500/20 touch-manipulation disabled:opacity-50 flex items-center gap-2"
                      >
                        {connecting ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Link2Off className="h-4 w-4" />
                        )}
                        <span className="hidden sm:inline">Disconnect</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => handleConnect(providerId)}
                        disabled={connecting}
                        className={`h-10 px-5 rounded-xl text-[13px] font-semibold touch-manipulation disabled:opacity-50 flex items-center gap-2 transition-all ${
                          providerId === 'xero'
                            ? 'bg-[#13B5EA] text-white hover:bg-[#0ea5d9] active:bg-[#0c96c7]'
                            : 'bg-[#2CA01C] text-white hover:bg-[#259018] active:bg-[#1f7a14]'
                        }`}
                      >
                        {connecting ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <ExternalLink className="h-4 w-4" />
                        )}
                        Connect
                      </button>
                    )}
                  </div>
                </motion.div>
              );
            })}

            {/* Coming Soon - Sage */}
            <div className="mt-6">
              <p className="text-[11px] font-medium text-white/30 uppercase tracking-wider mb-3 px-1">
                Coming Soon
              </p>

              {comingSoonProviders.map((providerId) => {
                const provider = ACCOUNTING_PROVIDERS[providerId];

                return (
                  <div
                    key={providerId}
                    className="relative overflow-hidden rounded-2xl border bg-white/[0.02] border-white/[0.05]"
                  >
                    <div className="flex items-center gap-4 p-4 opacity-50">
                      {/* Provider Logo */}
                      <div className="w-14 h-14 rounded-xl bg-[#00D639]/10 flex items-center justify-center flex-shrink-0">
                        <span className="text-[#00D639]/60">
                          <ProviderIcon provider={providerId} />
                        </span>
                      </div>

                      {/* Provider Info */}
                      <div className="flex-1 min-w-0">
                        <p className="text-[16px] font-semibold text-white/70">{provider.name}</p>
                        <p className="text-[13px] text-white/30 mt-0.5">{provider.description}</p>
                      </div>

                      {/* Coming Soon Badge */}
                      <span className="px-3 py-1.5 rounded-full bg-white/[0.05] border border-white/[0.08] text-[11px] font-semibold text-white/40 uppercase tracking-wide">
                        Soon
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Info Card */}
            <div className="mt-6 p-4 rounded-2xl bg-gradient-to-br from-purple-500/10 to-blue-500/5 border border-purple-500/20">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Calculator className="h-4 w-4 text-purple-400" />
                </div>
                <div>
                  <h3 className="text-[14px] font-semibold text-white mb-1">How it works</h3>
                  <p className="text-[12px] text-white/50 leading-relaxed">
                    When connected, you can sync invoices directly from the invoice page.
                    Contacts and line items are created automatically in your accounting software.
                  </p>
                </div>
              </div>
            </div>

            {/* Security Note */}
            <p className="text-[11px] text-white/30 text-center mt-4 pb-8">
              🔒 Secure OAuth connection • We never see your login details
            </p>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default AccountingConnectorsCard;
