import React, { useEffect, useMemo, useState } from 'react';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { FileSpreadsheet, Loader2 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { useHaptic } from '@/hooks/useHaptic';
import { useCompanyProfile } from '@/hooks/useCompanyProfile';
import {
  exportInvoiceSummaryXlsx,
  fetchAllInvoicesForExport,
  filterInvoicesForExport,
  type ExportInvoiceRow,
} from '@/utils/invoiceExcelExport';

interface InvoiceExportSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

type PresetKey = 'tax-year' | 'last-tax-year' | 'this-month' | 'all-time' | 'custom';

const dateInput = (d: Date) => d.toISOString().split('T')[0];

/** UK tax year starts 6 April. */
const taxYearStart = (ref: Date): Date => {
  const y =
    ref.getMonth() > 3 || (ref.getMonth() === 3 && ref.getDate() >= 6)
      ? ref.getFullYear()
      : ref.getFullYear() - 1;
  return new Date(y, 3, 6);
};

/**
 * Export invoices to an Excel "Invoice Summary" over a selectable issued-date
 * range — ELE-1328. Fetches the account's FULL invoice history itself (the
 * page list is capped/stale), so the spreadsheet is authoritative.
 */
const InvoiceExportSheet: React.FC<InvoiceExportSheetProps> = ({ open, onOpenChange }) => {
  const haptic = useHaptic();
  const { companyProfile } = useCompanyProfile();
  const [preset, setPreset] = useState<PresetKey>('tax-year');
  const [customFrom, setCustomFrom] = useState('');
  const [customTo, setCustomTo] = useState('');
  const [isExporting, setIsExporting] = useState(false);
  const [rows, setRows] = useState<ExportInvoiceRow[] | null>(null);
  const [loadError, setLoadError] = useState(false);

  const now = useMemo(() => new Date(), []);

  // Load the full account history when the sheet opens (fresh each open —
  // an invoice raised a minute ago must be in the export).
  useEffect(() => {
    if (!open) return;
    let cancelled = false;
    setRows(null);
    setLoadError(false);
    fetchAllInvoicesForExport()
      .then((data) => {
        if (!cancelled) setRows(data);
      })
      .catch((error) => {
        console.error('[InvoiceExportSheet] fetch failed:', error);
        if (!cancelled) setLoadError(true);
      });
    return () => {
      cancelled = true;
    };
  }, [open]);

  const range = useMemo(() => {
    switch (preset) {
      case 'tax-year':
        return { from: taxYearStart(now), to: now };
      case 'last-tax-year': {
        const thisStart = taxYearStart(now);
        const lastStart = new Date(thisStart.getFullYear() - 1, 3, 6);
        const lastEnd = new Date(thisStart.getFullYear(), 3, 5);
        return { from: lastStart, to: lastEnd };
      }
      case 'this-month':
        return { from: new Date(now.getFullYear(), now.getMonth(), 1), to: now };
      case 'all-time': {
        const dates = (rows ?? [])
          .map((r) => r.date?.getTime())
          .filter((t): t is number => typeof t === 'number');
        const from = dates.length ? new Date(Math.min(...dates)) : new Date(2020, 0, 1);
        return { from, to: now };
      }
      case 'custom': {
        const from = customFrom ? new Date(customFrom) : null;
        const to = customTo ? new Date(customTo) : null;
        if (!from || !to || isNaN(from.getTime()) || isNaN(to.getTime())) return null;
        return { from, to };
      }
    }
  }, [preset, customFrom, customTo, rows, now]);

  const matchCount = useMemo(
    () => (rows && range ? filterInvoicesForExport(rows, range).length : 0),
    [rows, range]
  );

  const handleExport = async () => {
    if (!rows) return;
    if (!range) {
      toast({
        title: 'Pick a date range',
        description: 'Choose both a from and to date.',
        variant: 'destructive',
      });
      return;
    }
    if (matchCount === 0) {
      toast({
        title: 'Nothing to export',
        description: 'No invoices were issued in that date range.',
      });
      return;
    }
    setIsExporting(true);
    try {
      const count = await exportInvoiceSummaryXlsx(
        rows,
        companyProfile?.company_name || '',
        range
      );
      haptic.success();
      toast({
        title: 'Export ready',
        description: `${count} invoice${count === 1 ? '' : 's'} exported to Excel.`,
      });
      onOpenChange(false);
    } catch (error) {
      console.error('[InvoiceExportSheet] export failed:', error);
      toast({
        title: 'Export failed',
        description: 'Could not build the Excel file. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsExporting(false);
    }
  };

  const presets: { key: PresetKey; label: string; sub: string }[] = [
    { key: 'tax-year', label: 'This tax year', sub: 'From 6 Apr' },
    { key: 'last-tax-year', label: 'Last tax year', sub: '6 Apr – 5 Apr' },
    { key: 'this-month', label: 'This month', sub: 'Month to date' },
    { key: 'all-time', label: 'All time', sub: 'Every invoice' },
  ];

  const loading = open && rows === null && !loadError;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="p-0 rounded-t-2xl overflow-hidden lg:left-64">
        <div className="mx-auto mt-2 h-1 w-9 rounded-full bg-white/20" aria-hidden />
        <div className="p-4 pb-8 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-emerald-500/15 flex items-center justify-center">
              <FileSpreadsheet className="h-5 w-5 text-emerald-400" />
            </div>
            <div className="flex-1">
              <p className="text-[15px] font-semibold text-white">Export to Excel</p>
              <p className="text-[12px] text-white/60">
                Invoice summary for your records or accountant
              </p>
            </div>
            {loading && <Loader2 className="h-4 w-4 animate-spin text-white/50" />}
          </div>

          {loadError && (
            <div className="p-3 rounded-lg border border-red-500/30 bg-red-500/10 text-red-300 text-[12px]">
              Couldn't load your invoices — check your connection and reopen this sheet.
            </div>
          )}

          <div className="grid grid-cols-2 gap-1.5">
            {presets.map((p) => (
              <button
                key={p.key}
                type="button"
                onClick={() => {
                  haptic.light();
                  setPreset(p.key);
                }}
                className={cn(
                  'h-14 rounded-xl px-3 text-left touch-manipulation active:scale-[0.98] transition-all',
                  preset === p.key
                    ? 'bg-elec-yellow/15 border border-elec-yellow/30 text-elec-yellow'
                    : 'bg-white/[0.04] border border-white/[0.08] text-white'
                )}
              >
                <p className="text-[13px] font-semibold">{p.label}</p>
                <p className="text-[10px] opacity-60">{p.sub}</p>
              </button>
            ))}
            <button
              type="button"
              onClick={() => {
                haptic.light();
                setPreset('custom');
              }}
              className={cn(
                'col-span-2 h-11 rounded-xl px-3 text-left touch-manipulation active:scale-[0.98] transition-all text-[13px] font-semibold',
                preset === 'custom'
                  ? 'bg-elec-yellow/15 border border-elec-yellow/30 text-elec-yellow'
                  : 'bg-white/[0.04] border border-white/[0.08] text-white'
              )}
            >
              Custom range
            </button>
          </div>

          {preset === 'custom' && (
            <div className="grid grid-cols-2 gap-2">
              <Input
                type="date"
                value={customFrom}
                max={dateInput(now)}
                onChange={(e) => setCustomFrom(e.target.value)}
                className="h-11 text-base touch-manipulation bg-white/[0.06] border-white/[0.08] text-white"
              />
              <Input
                type="date"
                value={customTo}
                max={dateInput(now)}
                onChange={(e) => setCustomTo(e.target.value)}
                className="h-11 text-base touch-manipulation bg-white/[0.06] border-white/[0.08] text-white"
              />
            </div>
          )}

          <button
            type="button"
            onClick={handleExport}
            disabled={isExporting || loading || loadError || !range}
            className="h-12 w-full touch-manipulation bg-elec-yellow text-black font-semibold text-sm rounded-xl active:scale-[0.98] transition-transform disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isExporting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" /> Building spreadsheet…
              </>
            ) : loading ? (
              'Loading your invoices…'
            ) : (
              `Export ${matchCount} invoice${matchCount === 1 ? '' : 's'}`
            )}
          </button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default InvoiceExportSheet;
