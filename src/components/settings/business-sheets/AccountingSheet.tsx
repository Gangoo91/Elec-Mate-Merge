import React from 'react';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Calculator, Loader2, CheckCircle } from 'lucide-react';
import { ACCOUNTING_PROVIDERS } from '@/types/accounting';
import { useAccountingIntegrations } from '@/hooks/useAccountingIntegrations';

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

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="h-[85vh] p-0 rounded-t-2xl overflow-hidden">
        <div className="flex flex-col h-full bg-background">
          <div className="flex justify-center pt-3 pb-1">
            <div className="w-10 h-1 rounded-full bg-white/20" />
          </div>

          <div className="px-5 pb-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
              <Calculator className="h-5 w-5 text-purple-400" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Accounting Software</h2>
              <p className="text-xs text-white">Connect your accounting provider</p>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-5 pb-6 space-y-4">
            <p className="text-[13px] text-white">
              Connect your accounting software to automatically sync invoices
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Xero */}
              {(() => {
                const provider = ACCOUNTING_PROVIDERS['xero'];
                const integration = getIntegration('xero');
                const isConnected = isProviderConnected('xero');
                return (
                  <div
                    className={`relative overflow-hidden rounded-xl border transition-all ${
                      isConnected
                        ? 'bg-gradient-to-br from-[#13B5EA]/10 to-[#13B5EA]/5 border-[#13B5EA]/30'
                        : 'bg-white/[0.03] border-white/[0.08] hover:border-[#13B5EA]/30'
                    }`}
                  >
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0">
                          <img loading="lazy" src="/logos/xero.svg" alt="Xero" className="w-full h-full object-cover" />
                        </div>
                        {isConnected && (
                          <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-green-500/20">
                            <CheckCircle className="h-3 w-3 text-green-400" />
                            <span className="text-[11px] text-green-400 font-medium">Connected</span>
                          </div>
                        )}
                      </div>
                      <h4 className="text-[15px] font-semibold text-white">{provider.name}</h4>
                      <p className="text-[12px] text-white mt-0.5 mb-3">
                        {isConnected ? integration?.tenantName || 'Organisation connected' : provider.description}
                      </p>
                      {isConnected ? (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => { if (window.confirm('Disconnect Xero? You can reconnect anytime.')) disconnectProvider('xero'); }}
                          disabled={accountingConnecting}
                          className="w-full h-9 text-[12px] text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg border border-red-500/20"
                        >
                          {accountingConnecting ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : 'Disconnect'}
                        </Button>
                      ) : (
                        <Button
                          type="button"
                          onClick={() => connectProvider('xero')}
                          disabled={accountingConnecting || accountingLoading}
                          className="w-full h-9 text-[12px] font-medium bg-[#13B5EA] hover:bg-[#0ea5d9] text-white rounded-lg"
                        >
                          {accountingConnecting ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : 'Connect Xero'}
                        </Button>
                      )}
                    </div>
                  </div>
                );
              })()}

              {/* QuickBooks */}
              {(() => {
                const provider = ACCOUNTING_PROVIDERS['quickbooks'];
                const integration = getIntegration('quickbooks');
                const isConnected = isProviderConnected('quickbooks');
                return (
                  <div
                    className={`relative overflow-hidden rounded-xl border transition-all ${
                      isConnected
                        ? 'bg-gradient-to-br from-[#2CA01C]/10 to-[#2CA01C]/5 border-[#2CA01C]/30'
                        : 'bg-white/[0.03] border-white/[0.08] hover:border-[#2CA01C]/30'
                    }`}
                  >
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0">
                          <img loading="lazy" src="/logos/quickbooks.svg" alt="QuickBooks" className="w-full h-full object-cover" />
                        </div>
                        {isConnected ? (
                          <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-green-500/20">
                            <CheckCircle className="h-3 w-3 text-green-400" />
                            <span className="text-[11px] text-green-400 font-medium">Connected</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-amber-500/20 border border-amber-500/30">
                            <span className="text-[10px] text-amber-400 font-semibold">£38/mo plan</span>
                          </div>
                        )}
                      </div>
                      <h4 className="text-[15px] font-semibold text-white">{provider.name}</h4>
                      <p className="text-[12px] text-white mt-0.5 mb-3">
                        {isConnected ? (
                          integration?.tenantName || 'Company connected'
                        ) : (
                          <>{provider.description}<span className="block text-amber-400/80 mt-1 font-medium">Requires Business Pro subscription</span></>
                        )}
                      </p>
                      {isConnected ? (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => { if (window.confirm('Disconnect QuickBooks? You can reconnect anytime.')) disconnectProvider('quickbooks'); }}
                          disabled={accountingConnecting}
                          className="w-full h-9 text-[12px] text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg border border-red-500/20"
                        >
                          {accountingConnecting ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : 'Disconnect'}
                        </Button>
                      ) : (
                        <Button
                          type="button"
                          onClick={() => connectProvider('quickbooks')}
                          disabled={accountingConnecting || accountingLoading}
                          className="w-full h-9 text-[12px] font-medium bg-[#2CA01C] hover:bg-[#249017] text-white rounded-lg"
                        >
                          {accountingConnecting ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : 'Connect QuickBooks'}
                        </Button>
                      )}
                    </div>
                  </div>
                );
              })()}

              {/* Sage - Coming Soon */}
              <div className="relative overflow-hidden rounded-xl border border-white/[0.06] bg-white/[0.02] opacity-60">
                <div className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0">
                      <img loading="lazy" src="/logos/sage.svg" alt="Sage" className="w-full h-full object-cover" />
                    </div>
                    <span className="px-2 py-1 rounded-full bg-white/[0.06] text-[10px] font-medium text-white">Coming Soon</span>
                  </div>
                  <h4 className="text-[15px] font-semibold text-white">Sage</h4>
                  <p className="text-[12px] text-white mt-0.5 mb-3">Enterprise accounting</p>
                  <Button type="button" disabled className="w-full h-9 text-[12px] font-medium bg-white/[0.05] text-white rounded-lg cursor-not-allowed">
                    Coming Soon
                  </Button>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-lg bg-purple-500/5 border border-purple-500/10">
              <Calculator className="h-4 w-4 text-purple-400 flex-shrink-0" />
              <p className="text-[11px] text-white leading-relaxed">
                Once connected, sync invoices directly to your accounting software. Contacts and line items are created automatically.
              </p>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default AccountingSheet;
