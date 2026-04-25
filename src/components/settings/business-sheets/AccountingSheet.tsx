import React from 'react';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { ACCOUNTING_PROVIDERS } from '@/types/accounting';
import { useAccountingIntegrations } from '@/hooks/useAccountingIntegrations';
import { Eyebrow } from '@/components/college/primitives';

interface AccountingSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const AccountingSheet = ({ open, onOpenChange }: AccountingSheetProps) => {
  const {
    loading: accountingLoading,
    connecting: accountingConnecting,
    connectProvider,
    disconnectProvider,
    isProviderConnected,
    getIntegration,
  } = useAccountingIntegrations();

  const xeroProvider = ACCOUNTING_PROVIDERS['xero'];
  const xeroConnected = isProviderConnected('xero');
  const xeroIntegration = getIntegration('xero');

  const qbProvider = ACCOUNTING_PROVIDERS['quickbooks'];
  const qbConnected = isProviderConnected('quickbooks');
  const qbIntegration = getIntegration('quickbooks');

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        className="h-[85vh] p-0 rounded-t-2xl overflow-hidden border-white/[0.06] bg-[#0a0a0a]"
      >
        <div className="flex flex-col h-full bg-[#0a0a0a]">
          <div className="flex justify-center pt-3 pb-1">
            <div className="w-10 h-1 rounded-full bg-white/20" />
          </div>

          <header className="px-5 sm:px-6 pb-4">
            <Eyebrow>Integrations</Eyebrow>
            <h2 className="mt-1.5 text-xl font-semibold text-white tracking-tight">
              Accounting software
            </h2>
            <p className="mt-1 text-[13px] text-white">
              Connect your accounting provider to sync invoices automatically.
            </p>
          </header>

          <div className="flex-1 overflow-y-auto px-5 sm:px-6 pb-6 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Xero */}
              <div
                className={
                  xeroConnected
                    ? 'relative overflow-hidden rounded-2xl border border-[#13B5EA]/30 bg-[#13B5EA]/10 p-4'
                    : 'relative overflow-hidden rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_12%)] p-4 hover:bg-[hsl(0_0%_15%)] transition-colors'
                }
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="w-11 h-11 rounded-xl overflow-hidden shrink-0">
                    <img
                      loading="lazy"
                      src="/logos/xero.svg"
                      alt="Xero"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {xeroConnected && (
                    <span className="text-[11px] font-medium uppercase tracking-[0.15em] text-emerald-400">
                      Connected
                    </span>
                  )}
                </div>
                <h4 className="text-[15px] font-semibold text-white">{xeroProvider.name}</h4>
                <p className="text-[12px] text-white/65 mt-0.5 mb-3">
                  {xeroConnected
                    ? xeroIntegration?.tenantName || 'Organisation connected'
                    : xeroProvider.description}
                </p>
                {xeroConnected ? (
                  <button
                    type="button"
                    onClick={() => {
                      if (window.confirm('Disconnect Xero? You can reconnect anytime.')) {
                        disconnectProvider('xero');
                      }
                    }}
                    disabled={accountingConnecting}
                    className="w-full h-11 rounded-xl border border-red-500/30 text-red-400 text-[13px] font-medium hover:bg-red-500/10 transition-colors touch-manipulation disabled:opacity-50"
                  >
                    {accountingConnecting ? 'Working…' : 'Disconnect'}
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => connectProvider('xero')}
                    disabled={accountingConnecting || accountingLoading}
                    className="w-full h-11 rounded-xl bg-[#13B5EA] hover:bg-[#0ea5d9] text-white text-[13px] font-semibold transition-colors touch-manipulation disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {accountingConnecting ? 'Connecting…' : 'Connect Xero'}
                  </button>
                )}
              </div>

              {/* QuickBooks */}
              <div
                className={
                  qbConnected
                    ? 'relative overflow-hidden rounded-2xl border border-[#2CA01C]/30 bg-[#2CA01C]/10 p-4'
                    : 'relative overflow-hidden rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_12%)] p-4 hover:bg-[hsl(0_0%_15%)] transition-colors'
                }
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="w-11 h-11 rounded-xl overflow-hidden shrink-0">
                    <img
                      loading="lazy"
                      src="/logos/quickbooks.svg"
                      alt="QuickBooks"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {qbConnected ? (
                    <span className="text-[11px] font-medium uppercase tracking-[0.15em] text-emerald-400">
                      Connected
                    </span>
                  ) : (
                    <span className="text-[11px] font-medium uppercase tracking-[0.15em] text-amber-400">
                      £38/mo plan
                    </span>
                  )}
                </div>
                <h4 className="text-[15px] font-semibold text-white">{qbProvider.name}</h4>
                <p className="text-[12px] text-white/65 mt-0.5 mb-3">
                  {qbConnected ? (
                    qbIntegration?.tenantName || 'Company connected'
                  ) : (
                    <>
                      {qbProvider.description}
                      <span className="block text-amber-400 mt-1 font-medium">
                        Requires Business Pro subscription
                      </span>
                    </>
                  )}
                </p>
                {qbConnected ? (
                  <button
                    type="button"
                    onClick={() => {
                      if (window.confirm('Disconnect QuickBooks? You can reconnect anytime.')) {
                        disconnectProvider('quickbooks');
                      }
                    }}
                    disabled={accountingConnecting}
                    className="w-full h-11 rounded-xl border border-red-500/30 text-red-400 text-[13px] font-medium hover:bg-red-500/10 transition-colors touch-manipulation disabled:opacity-50"
                  >
                    {accountingConnecting ? 'Working…' : 'Disconnect'}
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => connectProvider('quickbooks')}
                    disabled={accountingConnecting || accountingLoading}
                    className="w-full h-11 rounded-xl bg-[#2CA01C] hover:bg-[#249017] text-white text-[13px] font-semibold transition-colors touch-manipulation disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {accountingConnecting ? 'Connecting…' : 'Connect QuickBooks'}
                  </button>
                )}
              </div>

              {/* Sage — coming soon */}
              <div className="relative overflow-hidden rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_12%)] p-4 opacity-60">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-11 h-11 rounded-xl overflow-hidden shrink-0">
                    <img
                      loading="lazy"
                      src="/logos/sage.svg"
                      alt="Sage"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="text-[11px] font-medium uppercase tracking-[0.15em] text-cyan-400">
                    Coming soon
                  </span>
                </div>
                <h4 className="text-[15px] font-semibold text-white">Sage</h4>
                <p className="text-[12px] text-white/65 mt-0.5 mb-3">Enterprise accounting</p>
                <button
                  type="button"
                  disabled
                  className="w-full h-11 rounded-xl border border-white/[0.06] bg-white/[0.04] text-white text-[13px] font-medium cursor-not-allowed"
                >
                  Coming soon
                </button>
              </div>
            </div>

            <div className="rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_12%)] px-4 py-3">
              <p className="text-[12px] text-white/65 leading-relaxed">
                Once connected, sync invoices directly to your accounting software. Contacts and
                line items are created automatically.
              </p>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default AccountingSheet;
