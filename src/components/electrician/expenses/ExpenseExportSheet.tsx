import { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, Check, FileSpreadsheet, Calendar } from 'lucide-react';
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
import { cn } from '@/lib/utils';

// Accounting software options with metadata
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

interface ExpenseExportSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onExport: (format: AccountingProvider, expenses?: Expense[]) => void;
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
      // Export with selected format (filtering handled by parent)
      onExport(selectedFormat);
      onOpenChange(false);
    } finally {
      setIsExporting(false);
    }
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
                Export Format
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
                    {/* Icon placeholder - would use actual icons in production */}
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
              {isExporting ? 'Exporting...' : `Export to ${EXPORT_OPTIONS.find(o => o.id === selectedFormat)?.name}`}
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
