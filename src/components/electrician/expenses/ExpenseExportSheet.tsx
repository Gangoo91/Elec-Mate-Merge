import { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, Check, FileSpreadsheet, Calendar, CloudUpload, Link2, Loader2, RefreshCw } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AccountingProvider, Expense, ExpenseStats } from '@/types/expense';
import { AccountingProvider as AccountingSyncProvider, AccountingIntegration, ACCOUNTING_PROVIDERS } from '@/types/accounting';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

// Accounting software options with metadata for CSV export
const EXPORT_OPTIONS: {
  id: AccountingProvider;
  name: string;
  description: string;
  icon: string;
}[] = [
  {
    id: 'xero',
    name: 'Xero',
    description: 'Standard Xero CSV format',
    icon: '/icons/xero.svg',
  },
  {
    id: 'sage',
    name: 'Sage',
    description: 'UK date format (DD/MM/YYYY)',
    icon: '/icons/sage.svg',
  },
  {
    id: 'quickbooks',
    name: 'QuickBooks',
    description: 'QuickBooks-compatible format',
    icon: '/icons/quickbooks.svg',
  },
  {
    id: 'csv',
    name: 'Generic CSV',
    description: 'Standard spreadsheet format',
    icon: '/icons/csv.svg',
  },
];

// Provider logos and styling
const PROVIDER_DISPLAY: Record<AccountingSyncProvider, { logo: string; color: string; bgColor: string }> = {
  xero: { logo: '/logos/xero.svg', color: 'text-[#13B5EA]', bgColor: 'bg-[#13B5EA]/15' },
  quickbooks: { logo: '/logos/quickbooks.svg', color: 'text-[#2CA01C]', bgColor: 'bg-[#2CA01C]/15' },
  sage: { logo: '/logos/sage.svg', color: 'text-[#00D639]', bgColor: 'bg-[#00D639]/15' },
  freshbooks: { logo: '', color: 'text-[#0075DD]', bgColor: 'bg-[#0075DD]/15' },  // No logo yet
};

interface ExpenseExportSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onExport: (format: AccountingProvider, expenses?: Expense[]) => void;
  onSyncToProvider?: (provider: AccountingSyncProvider, expenseIds: string[]) => Promise<boolean>;
  stats: ExpenseStats;
  expenseCount: number;
  expenses?: Expense[];
  integrations?: AccountingIntegration[];
  isSyncing?: boolean;
}

export function ExpenseExportSheet({
  open,
  onOpenChange,
  onExport,
  onSyncToProvider,
  stats,
  expenseCount,
  expenses = [],
  integrations = [],
  isSyncing = false,
}: ExpenseExportSheetProps) {
  const [selectedFormat, setSelectedFormat] = useState<AccountingProvider>('csv');
  const [dateRange, setDateRange] = useState<'all' | 'month' | 'year' | 'custom'>('month');
  const [customStart, setCustomStart] = useState('');
  const [customEnd, setCustomEnd] = useState('');
  const [isExporting, setIsExporting] = useState(false);
  const [syncingProvider, setSyncingProvider] = useState<AccountingSyncProvider | null>(null);

  // Get connected providers (Xero and QuickBooks only for expense sync)
  const connectedProviders = integrations.filter(
    i => i.status === 'connected' && (i.provider === 'xero' || i.provider === 'quickbooks')
  );

  // Get unsynced expenses
  const unsyncedExpenses = expenses.filter(exp => !exp.synced_to_accounting);
  const unsyncedCount = unsyncedExpenses.length;

  const handleExport = async () => {
    setIsExporting(true);
    try {
      onExport(selectedFormat);
      onOpenChange(false);
    } finally {
      setIsExporting(false);
    }
  };

  const handleSync = async (provider: AccountingSyncProvider) => {
    if (!onSyncToProvider) return;
    if (unsyncedCount === 0) {
      toast.info('All expenses are already synced');
      return;
    }

    setSyncingProvider(provider);
    try {
      const expenseIds = unsyncedExpenses.map(exp => exp.id);
      const success = await onSyncToProvider(provider, expenseIds);
      if (success) {
        toast.success(`Synced ${unsyncedCount} expense(s) to ${ACCOUNTING_PROVIDERS[provider].name}`);
      }
    } catch (error) {
      console.error('Sync error:', error);
      toast.error('Failed to sync expenses');
    } finally {
      setSyncingProvider(null);
    }
  };

  const formatLastSync = (lastSyncAt?: string) => {
    if (!lastSyncAt) return 'Never synced';
    const date = new Date(lastSyncAt);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
      if (diffHours === 0) {
        const diffMins = Math.floor(diffMs / (1000 * 60));
        return diffMins <= 1 ? 'Just now' : `${diffMins} minutes ago`;
      }
      return diffHours === 1 ? '1 hour ago' : `${diffHours} hours ago`;
    }
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="h-[85vh] p-0 rounded-t-2xl overflow-hidden">
        <div className="flex flex-col h-full bg-background">
          {/* Header */}
          <SheetHeader className="p-4 border-b border-white/[0.06] flex-shrink-0">
            <SheetTitle className="text-lg font-semibold">Export Expenses</SheetTitle>
          </SheetHeader>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-4 space-y-6">
            {/* Summary */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-elec-yellow/10 border border-elec-yellow/20 rounded-xl p-4"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Ready to Export</p>
                  <p className="text-2xl font-bold text-elec-yellow">
                    {expenseCount} {expenseCount === 1 ? 'expense' : 'expenses'}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Total Value</p>
                  <p className="text-xl font-semibold text-foreground">
                    £{stats.monthlyAmount.toFixed(2)}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Sync to Accounting Section - Only show if providers connected */}
            {connectedProviders.length > 0 && onSyncToProvider && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="space-y-3"
              >
                <Label className="flex items-center gap-2">
                  <CloudUpload className="h-4 w-4 text-muted-foreground" />
                  Sync to Accounting Software
                </Label>
                <div className="space-y-2">
                  {connectedProviders.map((integration) => {
                    const display = PROVIDER_DISPLAY[integration.provider];
                    const providerConfig = ACCOUNTING_PROVIDERS[integration.provider];
                    const isThisSyncing = syncingProvider === integration.provider;

                    return (
                      <div
                        key={integration.provider}
                        className="flex items-center gap-3 p-3 rounded-xl border border-white/[0.08] bg-white/[0.02]"
                      >
                        {/* Provider Logo */}
                        <div className={cn(
                          "w-10 h-10 rounded-lg flex items-center justify-center overflow-hidden",
                          display.bgColor
                        )}>
                          {display.logo ? (
                            <img
                              src={display.logo}
                              alt={providerConfig.name}
                              className="w-6 h-6 object-contain"
                            />
                          ) : (
                            <span className={cn("font-bold text-sm", display.color)}>
                              {providerConfig.name.charAt(0)}
                            </span>
                          )}
                        </div>

                        {/* Provider Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-foreground">
                              {providerConfig.name}
                            </span>
                            <span className="flex items-center gap-1 text-xs text-green-400">
                              <Link2 className="h-3 w-3" />
                              Connected
                            </span>
                          </div>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            {integration.tenantName || 'Organisation'} • Last sync: {formatLastSync(integration.lastSyncAt)}
                          </p>
                        </div>

                        {/* Sync Button */}
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleSync(integration.provider)}
                          disabled={isSyncing || isThisSyncing || unsyncedCount === 0}
                          className={cn(
                            "h-9 px-3 border-white/20 touch-manipulation active:scale-[0.98]",
                            unsyncedCount === 0 && "opacity-50"
                          )}
                        >
                          {isThisSyncing ? (
                            <>
                              <Loader2 className="h-4 w-4 mr-1.5 animate-spin" />
                              Syncing...
                            </>
                          ) : unsyncedCount === 0 ? (
                            <>
                              <Check className="h-4 w-4 mr-1.5 text-green-400" />
                              Synced
                            </>
                          ) : (
                            <>
                              <RefreshCw className="h-4 w-4 mr-1.5" />
                              Sync ({unsyncedCount})
                            </>
                          )}
                        </Button>
                      </div>
                    );
                  })}
                </div>

                {/* Unsynced count message */}
                {unsyncedCount > 0 && (
                  <p className="text-xs text-muted-foreground text-center">
                    {unsyncedCount} expense{unsyncedCount !== 1 ? 's' : ''} not yet synced to accounting software
                  </p>
                )}
              </motion.div>
            )}

            {/* Divider */}
            {connectedProviders.length > 0 && onSyncToProvider && (
              <div className="flex items-center gap-3">
                <div className="flex-1 h-px bg-white/[0.08]" />
                <span className="text-xs text-muted-foreground uppercase tracking-wider">or</span>
                <div className="flex-1 h-px bg-white/[0.08]" />
              </div>
            )}

            {/* Date Range Selection */}
            <div className="space-y-3">
              <Label className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                Date Range
              </Label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'month', label: 'This Month' },
                  { id: 'year', label: 'This Year' },
                  { id: 'all', label: 'All Time' },
                  { id: 'custom', label: 'Custom' },
                ].map((option) => (
                  <Button
                    key={option.id}
                    variant="outline"
                    onClick={() => setDateRange(option.id as typeof dateRange)}
                    className={cn(
                      "h-11 touch-manipulation active:scale-[0.98]",
                      dateRange === option.id && "border-elec-yellow bg-elec-yellow/10"
                    )}
                  >
                    {option.label}
                    {dateRange === option.id && (
                      <Check className="h-4 w-4 ml-2 text-elec-yellow" />
                    )}
                  </Button>
                ))}
              </div>

              {/* Custom Date Inputs */}
              {dateRange === 'custom' && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="grid grid-cols-2 gap-3 pt-2"
                >
                  <div className="space-y-1">
                    <Label htmlFor="start-date" className="text-xs">From</Label>
                    <Input
                      id="start-date"
                      type="date"
                      value={customStart}
                      onChange={(e) => setCustomStart(e.target.value)}
                      className="h-11 touch-manipulation"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="end-date" className="text-xs">To</Label>
                    <Input
                      id="end-date"
                      type="date"
                      value={customEnd}
                      onChange={(e) => setCustomEnd(e.target.value)}
                      className="h-11 touch-manipulation"
                    />
                  </div>
                </motion.div>
              )}
            </div>

            {/* Format Selection */}
            <div className="space-y-3">
              <Label className="flex items-center gap-2">
                <FileSpreadsheet className="h-4 w-4 text-muted-foreground" />
                Download CSV Format
              </Label>
              <div className="space-y-2">
                {EXPORT_OPTIONS.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => setSelectedFormat(option.id)}
                    className={cn(
                      "w-full flex items-center gap-3 p-3 rounded-xl border touch-manipulation active:scale-[0.98] transition-all",
                      selectedFormat === option.id
                        ? "border-elec-yellow bg-elec-yellow/10"
                        : "border-white/[0.06] bg-white/[0.02] hover:border-white/10"
                    )}
                  >
                    {/* Icon placeholder */}
                    <div className={cn(
                      "w-10 h-10 rounded-lg flex items-center justify-center text-lg font-bold",
                      selectedFormat === option.id ? "bg-elec-yellow/20 text-elec-yellow" : "bg-white/[0.05] text-muted-foreground"
                    )}>
                      {option.name.charAt(0)}
                    </div>
                    <div className="flex-1 text-left">
                      <p className="font-medium text-foreground">{option.name}</p>
                      <p className="text-xs text-muted-foreground">{option.description}</p>
                    </div>
                    {selectedFormat === option.id && (
                      <Check className="h-5 w-5 text-elec-yellow" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-white/[0.06] p-4 flex-shrink-0">
            <Button
              onClick={handleExport}
              disabled={isExporting}
              className="w-full h-12 bg-elec-yellow hover:bg-elec-yellow/90 text-black font-semibold touch-manipulation active:scale-[0.98]"
            >
              <Download className="h-5 w-5 mr-2" />
              {isExporting ? 'Exporting...' : `Download ${EXPORT_OPTIONS.find(o => o.id === selectedFormat)?.name} CSV`}
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
