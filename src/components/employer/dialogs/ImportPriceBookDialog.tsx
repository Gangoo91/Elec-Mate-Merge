import React, { useCallback, useState } from 'react';
import { Upload, AlertCircle } from 'lucide-react';
import Papa from 'papaparse';
import { toast } from 'sonner';
import { FormSheet } from '@/components/forms/FormSheet';
import {
  inputCn,
  labelCn,
  cardCn,
  buttonPrimaryCn,
  buttonSecondaryCn,
} from '@/components/forms/fieldStyles';
import { cn } from '@/lib/utils';
import { useImportFirmPriceBook, gbp, type PriceBookImportRow } from '@/hooks/useFirmPriceBook';

/* ==========================================================================
   CSV / Excel import into the ONE firm price book (ELE-1991).

   Names already in the book get their prices updated; new names are added
   to the owner's "Price Book" list, shared with the Electrical Hub. Owners
   and admins import BUY prices with a markup; an office manager imports
   SELL prices only (they never see or set buy prices).
   ========================================================================== */

interface ImportPriceBookDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** false for office managers: the price column is the sell price. */
  moneyVisible: boolean;
  defaultMarkup: number;
}

interface ParsedRow {
  name: string;
  price: number;
  unit?: string;
  category?: string;
  supplier?: string;
}

export function ImportPriceBookDialog({
  open,
  onOpenChange,
  moneyVisible,
  defaultMarkup,
}: ImportPriceBookDialogProps) {
  const [fileName, setFileName] = useState<string | null>(null);
  const [rows, setRows] = useState<ParsedRow[]>([]);
  const [markup, setMarkup] = useState(String(defaultMarkup));
  const [error, setError] = useState<string | null>(null);
  const importMutation = useImportFirmPriceBook();

  const reset = () => {
    setFileName(null);
    setRows([]);
    setMarkup(String(defaultMarkup));
    setError(null);
  };

  const processRows = (data: Record<string, unknown>[]): ParsedRow[] => {
    if (data.length === 0) return [];
    const keys = Object.keys(data[0]);
    const find = (patterns: string[]) =>
      keys.find((k) => patterns.some((p) => k.toLowerCase().trim().includes(p))) ?? null;
    const nameCol = find(['name', 'description', 'product', 'item', 'material']);
    const priceCol = moneyVisible
      ? find(['buy', 'cost', 'trade', 'net', 'price'])
      : find(['sell', 'price', 'rate']);
    const unitCol = find(['unit', 'uom']);
    const catCol = find(['category', 'group', 'type']);
    const supCol = find(['supplier', 'merchant', 'wholesaler']);
    if (!nameCol || !priceCol) return [];
    return data
      .map((r): ParsedRow | null => {
        const name = String(r[nameCol] ?? '').trim();
        const price = parseFloat(String(r[priceCol] ?? '').replace(/[£$,\s]/g, ''));
        if (!name || Number.isNaN(price) || price <= 0) return null;
        return {
          name,
          price,
          unit: unitCol ? String(r[unitCol] ?? '').trim() || undefined : undefined,
          category: catCol ? String(r[catCol] ?? '').trim() || undefined : undefined,
          supplier: supCol ? String(r[supCol] ?? '').trim() || undefined : undefined,
        };
      })
      .filter((x): x is ParsedRow => x !== null);
  };

  const parseFile = useCallback(
    (file: File) => {
      setError(null);
      setFileName(file.name);
      const ext = file.name.split('.').pop()?.toLowerCase();
      const done = (parsed: ParsedRow[]) => {
        setRows(parsed);
        if (parsed.length === 0) {
          setError(
            moneyVisible
              ? 'No rows found. The file needs a name column and a price (buy/cost) column.'
              : 'No rows found. The file needs a name column and a sell price column.'
          );
        }
      };
      if (ext === 'csv') {
        Papa.parse(file, {
          header: true,
          skipEmptyLines: true,
          complete: (res) => done(processRows(res.data as Record<string, unknown>[])),
          error: (err) => setError(`Couldn't read that CSV: ${err.message}`),
        });
      } else if (ext === 'xlsx' || ext === 'xls') {
        const reader = new FileReader();
        reader.onload = async (e) => {
          try {
            const XLSX = await import('xlsx');
            const wb = XLSX.read(e.target?.result, { type: 'array' });
            const ws = wb.Sheets[wb.SheetNames[0]];
            done(processRows(XLSX.utils.sheet_to_json<Record<string, unknown>>(ws)));
          } catch {
            setError("Couldn't read that spreadsheet.");
          }
        };
        reader.readAsArrayBuffer(file);
      } else {
        setError('Upload a CSV or Excel file.');
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [moneyVisible]
  );

  const markupPct = Math.max(0, Number(markup) || 0);
  const sellFor = (r: ParsedRow) =>
    moneyVisible ? Math.round(r.price * (1 + markupPct / 100) * 100) / 100 : r.price;

  const handleImport = async () => {
    const payload: PriceBookImportRow[] = rows.map((r) => ({
      name: r.name,
      unit: r.unit,
      category: r.category ?? null,
      supplier: r.supplier ?? null,
      ...(moneyVisible
        ? { buy: r.price, markup: markupPct, sell: sellFor(r) }
        : { sell: r.price }),
    }));
    try {
      const res = await importMutation.mutateAsync(payload);
      toast.success(
        `${res.added.toLocaleString()} added, ${res.updated.toLocaleString()} updated${res.skipped ? `, ${res.skipped.toLocaleString()} skipped` : ''}`
      );
      reset();
      onOpenChange(false);
    } catch {
      /* hook toasts */
    }
  };

  return (
    <FormSheet
      open={open}
      onOpenChange={(o) => {
        if (!o) reset();
        onOpenChange(o);
      }}
      eyebrow="Price book"
      title="Import prices"
      description={
        moneyVisible
          ? 'A merchant price list or your own sheet. Items already in the book get the new price; the rest are added.'
          : 'A sheet of sell prices. Items already in the book get the new price; the rest are added.'
      }
      width="wide"
      footer={
        <div className="flex gap-2">
          <button type="button" onClick={() => onOpenChange(false)} className={cn(buttonSecondaryCn, 'flex-1 px-4')}>
            Cancel
          </button>
          <button
            type="button"
            onClick={handleImport}
            disabled={rows.length === 0 || !!error || importMutation.isPending}
            className={cn(buttonPrimaryCn, 'flex-[2] px-4')}
          >
            {importMutation.isPending
              ? 'Importing…'
              : rows.length > 0
                ? `Import ${rows.length.toLocaleString()} item${rows.length === 1 ? '' : 's'}`
                : 'Choose a file'}
          </button>
        </div>
      }
    >
      <div className="lg:grid lg:grid-cols-2 lg:gap-6 space-y-5 lg:space-y-0">
        <section className={cardCn}>
          <h2 className="text-[15px] font-semibold text-white">The file</h2>
          <label
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e: React.DragEvent) => {
              e.preventDefault();
              const f = e.dataTransfer.files[0];
              if (f) parseFile(f);
            }}
            className="flex min-h-[120px] cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-white/[0.2] px-4 py-6 text-center touch-manipulation hover:border-elec-yellow"
          >
            <Upload className="h-7 w-7 text-white" aria-hidden />
            <span className="text-[14px] font-medium text-white">{fileName ?? 'Choose a CSV or Excel file'}</span>
            <span className="text-[12px] text-white">
              Columns: name, {moneyVisible ? 'buy price' : 'sell price'}; optional unit, category, supplier
            </span>
            <input
              type="file"
              accept=".csv,.xlsx,.xls"
              className="sr-only"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) parseFile(f);
                e.target.value = '';
              }}
            />
          </label>
          {error && (
            <div className="flex items-start gap-2 rounded-xl border border-orange-500/30 bg-orange-500/10 px-3.5 py-3">
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-orange-300" aria-hidden />
              <p className="text-[13px] text-orange-300">{error}</p>
            </div>
          )}
          {moneyVisible && (
            <div>
              <label className={labelCn} htmlFor="import-markup">
                Markup on buy price (%)
              </label>
              <input
                id="import-markup"
                type="text"
                inputMode="decimal"
                value={markup}
                onChange={(e) => /^\d*\.?\d*$/.test(e.target.value) && setMarkup(e.target.value)}
                className={cn(inputCn, 'max-w-[10rem]')}
              />
              <p className="mt-1 text-[12px] text-white">Sell price = buy price + {markupPct}%.</p>
            </div>
          )}
        </section>

        {rows.length > 0 && !error && (
          <section className={cardCn}>
            <h2 className="text-[15px] font-semibold text-white">
              {rows.length.toLocaleString()} item{rows.length === 1 ? '' : 's'} found
            </h2>
            <ul className="divide-y divide-white/[0.08]">
              {rows.slice(0, 6).map((r, i) => (
                <li key={i} className="flex items-center justify-between gap-3 py-2.5">
                  <span className="min-w-0 truncate text-[14px] text-white">{r.name}</span>
                  <span className="shrink-0 text-[13px] tabular-nums text-white">
                    {moneyVisible ? `${gbp(r.price)} → ${gbp(sellFor(r))}` : gbp(r.price)}
                  </span>
                </li>
              ))}
            </ul>
            {rows.length > 6 && (
              <p className="text-[12px] text-white">and {(rows.length - 6).toLocaleString()} more</p>
            )}
          </section>
        )}
      </div>
    </FormSheet>
  );
}
