import React, { useState, useCallback } from 'react';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Upload, Check, AlertCircle } from 'lucide-react';
import { useBulkImportPriceBook } from '@/hooks/useFinance';
import { toast } from 'sonner';
import Papa from 'papaparse';
import {
  SheetShell,
  FormCard,
  Field,
  PrimaryButton,
  SecondaryButton,
  inputClass,
} from '@/components/employer/editorial';

interface ImportPriceBookDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface ParsedItem {
  name: string;
  sku: string | undefined;
  buy_price: number;
  category: string;
}

export function ImportPriceBookDialog({ open, onOpenChange }: ImportPriceBookDialogProps) {
  const [file, setFile] = useState<File | null>(null);
  const [parsedData, setParsedData] = useState<ParsedItem[]>([]);
  const [markup, setMarkup] = useState(30);
  const [isImporting, setIsImporting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const bulkImportMutation = useBulkImportPriceBook();

  const resetDialog = () => {
    setFile(null);
    setParsedData([]);
    setMarkup(30);
    setIsImporting(false);
    setProgress(0);
    setError(null);
  };

  const parseFile = useCallback((file: File) => {
    setError(null);
    const ext = file.name.split('.').pop()?.toLowerCase();

    if (ext === 'csv') {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          const items = processRows(results.data as Record<string, string>[]);
          setParsedData(items);
          if (items.length === 0) {
            setError('No valid items found. Ensure your file has columns for name and price.');
          }
        },
        error: (err) => setError(`Failed to parse CSV: ${err.message}`),
      });
    } else if (ext === 'xlsx' || ext === 'xls') {
      const reader = new FileReader();
      reader.onload = async (e) => {
        try {
          const XLSX = await import('xlsx');
          const data = e.target?.result;
          const workbook = XLSX.read(data, { type: 'array' });
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];
          const jsonData = XLSX.utils.sheet_to_json<Record<string, string>>(worksheet);
          const items = processRows(jsonData);
          setParsedData(items);
          if (items.length === 0) {
            setError('No valid items found. Ensure your file has columns for name and price.');
          }
        } catch (err: any) {
          setError(`Failed to parse Excel: ${err.message}`);
        }
      };
      reader.readAsArrayBuffer(file);
    } else {
      setError('Please upload a CSV or Excel file');
    }
  }, []);

  const processRows = (rows: Record<string, string>[]): ParsedItem[] => {
    if (rows.length === 0) return [];

    const headers = Object.keys(rows[0]).map((h) => h.toLowerCase().trim());

    const findColumn = (patterns: string[]) => {
      const header = headers.find((h) => patterns.some((p) => h.includes(p)));
      return header ? Object.keys(rows[0]).find((k) => k.toLowerCase().trim() === header) : null;
    };

    const nameCol = findColumn(['name', 'description', 'product', 'item', 'material']);
    const skuCol = findColumn(['sku', 'code', 'part', 'ref', 'number']);
    const priceCol = findColumn(['price', 'cost', 'buy', 'trade', 'net']);
    const categoryCol = findColumn(['category', 'cat', 'type', 'group']);

    if (!nameCol || !priceCol) {
      return [];
    }

    return rows
      .map((row) => {
        const name = row[nameCol]?.toString().trim();
        const priceStr = row[priceCol]?.toString().replace(/[£$,]/g, '').trim();
        const price = parseFloat(priceStr);

        if (!name || isNaN(price) || price <= 0) return null;

        return {
          name,
          sku: skuCol ? row[skuCol]?.toString().trim() : undefined,
          buy_price: price,
          category: categoryCol ? row[categoryCol]?.toString().trim() : 'Materials',
        };
      })
      .filter((item): item is ParsedItem => item !== null);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      parseFile(selectedFile);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      setFile(droppedFile);
      parseFile(droppedFile);
    }
  };

  const handleImport = async () => {
    if (parsedData.length === 0) return;

    setIsImporting(true);
    setProgress(0);

    try {
      const items = parsedData.map((item) => ({
        name: item.name,
        sku: item.sku || null,
        buy_price: item.buy_price,
        sell_price: Math.round(item.buy_price * (1 + markup / 100) * 100) / 100,
        category: item.category || 'Materials',
        unit: 'each',
        supplier_id: null,
        stock_level: 0,
        reorder_level: 10,
      }));

      const progressInterval = setInterval(() => {
        setProgress((p) => Math.min(p + 10, 90));
      }, 200);

      await bulkImportMutation.mutateAsync(items);

      clearInterval(progressInterval);
      setProgress(100);

      toast.success(`Successfully imported ${items.length} items`);

      setTimeout(() => {
        onOpenChange(false);
        resetDialog();
      }, 500);
    } catch (err: any) {
      setError(`Import failed: ${err.message}`);
      setIsImporting(false);
    }
  };

  return (
    <Sheet
      open={open}
      onOpenChange={(isOpen) => {
        if (!isOpen) resetDialog();
        onOpenChange(isOpen);
      }}
    >
      <SheetContent side="bottom" className="h-[78dvh] p-0 overflow-hidden">
        <SheetShell
          eyebrow="Price book"
          title="Import materials"
          description="Upload a CSV or Excel file with your prices."
          footer={
            <>
              <SecondaryButton onClick={() => onOpenChange(false)} fullWidth>
                Cancel
              </SecondaryButton>
              <PrimaryButton
                onClick={handleImport}
                disabled={parsedData.length === 0 || isImporting || !!error}
                fullWidth
              >
                {isImporting ? (
                  'Importing...'
                ) : parsedData.length > 0 ? (
                  <>
                    <Check className="h-4 w-4 mr-1.5" />
                    Import {parsedData.length.toLocaleString()} items
                  </>
                ) : (
                  'Select a file'
                )}
              </PrimaryButton>
            </>
          }
        >
          <FormCard eyebrow="Source file">
            <div
              onDrop={handleDrop}
              onDragOver={(e) => e.preventDefault()}
              onClick={() => document.getElementById('file-input')?.click()}
              className="border border-dashed border-white/[0.12] rounded-xl bg-[hsl(0_0%_9%)] p-8 text-center cursor-pointer hover:border-elec-yellow/50 hover:bg-[hsl(0_0%_11%)] active:bg-[hsl(0_0%_13%)] transition-all touch-manipulation"
            >
              <input
                id="file-input"
                type="file"
                accept=".csv,.xlsx,.xls"
                onChange={handleFileChange}
                className="hidden"
              />
              <Upload className="h-10 w-10 mx-auto text-white mb-3" />
              <p className="text-[13px] font-medium text-white">
                {file ? file.name : 'Tap to select file'}
              </p>
              <p className="text-[11px] text-white mt-1">
                CSV or Excel with name & price columns
              </p>
            </div>

            {error && (
              <div className="flex items-start gap-2 p-3 bg-red-500/10 border border-red-500/20 rounded-xl">
                <AlertCircle className="h-4 w-4 text-red-400 shrink-0 mt-0.5" />
                <p className="text-[12px] text-red-300">{error}</p>
              </div>
            )}
          </FormCard>

          {parsedData.length > 0 && !error && (
            <>
              <FormCard eyebrow="Results">
                <div className="flex items-center gap-2 p-3 bg-elec-yellow/10 border border-elec-yellow/20 rounded-xl">
                  <Check className="h-4 w-4 text-elec-yellow" />
                  <p className="text-[13px] font-medium text-white">
                    Found {parsedData.length.toLocaleString()} items
                  </p>
                </div>
                <Field label="Markup percentage" hint={`Sell price = Buy price + ${markup}%`}>
                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      value={markup}
                      onChange={(e) => setMarkup(Number(e.target.value))}
                      className={`${inputClass} w-28`}
                      min={0}
                      max={500}
                    />
                    <span className="text-[12px] text-white">%</span>
                  </div>
                </Field>
              </FormCard>

              <FormCard eyebrow="Preview (first 3)">
                <div className="space-y-1.5">
                  {parsedData.slice(0, 3).map((item, i) => (
                    <div
                      key={i}
                      className="flex justify-between items-center p-2.5 bg-[hsl(0_0%_9%)] border border-white/[0.06] rounded-lg text-[12px]"
                    >
                      <span className="truncate flex-1 mr-2 text-white">{item.name}</span>
                      <span className="text-white shrink-0 tabular-nums">
                        £{item.buy_price.toFixed(2)} → £
                        {(item.buy_price * (1 + markup / 100)).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
              </FormCard>
            </>
          )}

          {isImporting && (
            <FormCard eyebrow="Progress">
              <Progress value={progress} className="h-2" />
              <p className="text-[11px] text-center text-white">Importing... {progress}%</p>
            </FormCard>
          )}
        </SheetShell>
      </SheetContent>
    </Sheet>
  );
}
