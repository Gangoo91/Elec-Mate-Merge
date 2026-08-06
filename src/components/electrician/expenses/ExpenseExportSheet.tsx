import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Download } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { AccountingProvider, ExpenseStats } from '@/types/expense';
import { cn } from '@/lib/utils';
import { chipBase, chipOff, chipOn, eyebrowCn } from '@/components/shared/surfaceStyles';
import { inputCn, labelCn } from '@/components/forms/fieldStyles';

const EXPORT_OPTIONS: { id: AccountingProvider; name: string; description: string }[] = [
  { id: 'xero', name: 'Xero', description: 'Standard Xero CSV format' },
  { id: 'sage', name: 'Sage', description: 'UK date format (DD/MM/YYYY)' },
  { id: 'quickbooks', name: 'QuickBooks', description: 'QuickBooks-compatible format' },
  { id: 'csv', name: 'Generic CSV', description: 'Standard spreadsheet format' },
];

interface ExpenseExportSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onExport: (format: AccountingProvider) => void;
  stats: ExpenseStats;
  expenseCount: number;
}

export function ExpenseExportSheet({
  open,
  onOpenChange,
  onExport,
  stats,
  expenseCount,
}: ExpenseExportSheetProps) {
  const [selectedFormat, setSelectedFormat] = useState<AccountingProvider>('csv');
  const [dateRange, setDateRange] = useState<'all' | 'month' | 'year' | 'custom'>('month');
  const [customStart, setCustomStart] = useState('');
  const [customEnd, setCustomEnd] = useState('');
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async () => {
    setIsExporting(true);
    try {
      onExport(selectedFormat);
      onOpenChange(false);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="h-[75vh] p-0 rounded-t-2xl overflow-hidden">
        <div className="flex flex-col h-full bg-background">
          <SheetHeader className="p-4 border-b border-white/[0.06] flex-shrink-0">
            <SheetTitle className="text-lg font-semibold">Download CSV</SheetTitle>
          </SheetHeader>

          <div className="flex-1 overflow-y-auto p-4 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-elec-yellow/10 border border-elec-yellow/20 rounded-xl p-4"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-white">Ready to Export</p>
                  <p className="text-2xl font-bold text-elec-yellow">
                    {expenseCount} {expenseCount === 1 ? 'expense' : 'expenses'}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-white">Total Value</p>
                  <p className="text-xl font-semibold text-foreground">
                    £{stats.monthlyAmount.toFixed(2)}
                  </p>
                </div>
              </div>
            </motion.div>

            <div className="space-y-3">
              <span className={eyebrowCn}>Date range</span>
              <div className="grid grid-cols-2 gap-2">
                {(
                  [
                    { id: 'month', label: 'This Month' },
                    { id: 'year', label: 'This Year' },
                    { id: 'all', label: 'All Time' },
                    { id: 'custom', label: 'Custom' },
                  ] as const
                ).map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => setDateRange(option.id)}
                    className={cn(chipBase, dateRange === option.id ? chipOn : chipOff)}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
              {dateRange === 'custom' && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="grid grid-cols-2 gap-3 pt-2"
                >
                  <div className="space-y-1">
                    <label className={labelCn} htmlFor="start-date">From</label>
                    <input
                      id="start-date"
                      type="date"
                      value={customStart}
                      onChange={(e) => setCustomStart(e.target.value)}
                      className={inputCn}
                    />
                  </div>
                  <div className="space-y-1">
                    <label className={labelCn} htmlFor="end-date">To</label>
                    <input
                      id="end-date"
                      type="date"
                      value={customEnd}
                      onChange={(e) => setCustomEnd(e.target.value)}
                      className={inputCn}
                    />
                  </div>
                </motion.div>
              )}
            </div>

            <div className="space-y-3">
              <span className={eyebrowCn}>Format</span>
              <div className="space-y-2">
                {EXPORT_OPTIONS.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => setSelectedFormat(option.id)}
                    className={cn(
                      'w-full flex items-center gap-3 p-3 rounded-xl border touch-manipulation active:scale-[0.98] transition-all',
                      selectedFormat === option.id
                        ? 'border-elec-yellow bg-elec-yellow/10'
                        : 'border-white/[0.06] bg-white/[0.02] hover:border-white/10'
                    )}
                  >
                    <div
                      className={cn(
                        'w-10 h-10 rounded-lg flex items-center justify-center text-lg font-bold',
                        selectedFormat === option.id
                          ? 'bg-elec-yellow/20 text-elec-yellow'
                          : 'bg-white/[0.05] text-white'
                      )}
                    >
                      {option.name.charAt(0)}
                    </div>
                    <div className="flex-1 text-left">
                      <p className="font-medium text-foreground">{option.name}</p>
                      <p className="text-xs text-white">{option.description}</p>
                    </div>
                    {selectedFormat === option.id && <Check className="h-5 w-5 text-elec-yellow" />}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="border-t border-white/[0.06] p-4 flex-shrink-0">
            <Button
              onClick={handleExport}
              disabled={isExporting}
              className="w-full h-12 bg-elec-yellow hover:bg-elec-yellow/90 text-black font-semibold touch-manipulation active:scale-[0.98]"
            >
              <Download className="h-5 w-5 mr-2" />
              {isExporting
                ? 'Exporting...'
                : `Download ${EXPORT_OPTIONS.find((o) => o.id === selectedFormat)?.name} CSV`}
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
