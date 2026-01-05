import React, { useState, useCallback } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Upload, FileSpreadsheet, Check, AlertCircle } from "lucide-react";
import { useBulkImportPriceBook } from "@/hooks/useFinance";
import { toast } from "sonner";
import Papa from 'papaparse';
import * as XLSX from 'xlsx';

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
      reader.onload = (e) => {
        try {
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

    // Auto-detect columns from headers
    const headers = Object.keys(rows[0]).map(h => h.toLowerCase().trim());
    
    const findColumn = (patterns: string[]) => {
      const header = headers.find(h => patterns.some(p => h.includes(p)));
      return header ? Object.keys(rows[0]).find(k => k.toLowerCase().trim() === header) : null;
    };

    const nameCol = findColumn(['name', 'description', 'product', 'item', 'material']);
    const skuCol = findColumn(['sku', 'code', 'part', 'ref', 'number']);
    const priceCol = findColumn(['price', 'cost', 'buy', 'trade', 'net']);
    const categoryCol = findColumn(['category', 'cat', 'type', 'group']);

    if (!nameCol || !priceCol) {
      return [];
    }

    return rows
      .map(row => {
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
      const items = parsedData.map(item => ({
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

      // Simulate progress
      const progressInterval = setInterval(() => {
        setProgress(p => Math.min(p + 10, 90));
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
    <Sheet open={open} onOpenChange={(isOpen) => {
      if (!isOpen) resetDialog();
      onOpenChange(isOpen);
    }}>
      <SheetContent side="bottom" className="h-[70dvh] p-0 overflow-hidden">
        <div className="flex flex-col h-full">
          {/* Header */}
          <SheetHeader className="shrink-0 px-4 py-3 border-b border-border">
            <SheetTitle className="flex items-center gap-2">
              <FileSpreadsheet className="h-5 w-5 text-elec-yellow" />
              Import Price Book
            </SheetTitle>
            <SheetDescription>
              Upload a CSV or Excel file with your prices
            </SheetDescription>
          </SheetHeader>

          {/* Content */}
          <div className="flex-1 overflow-auto p-4 space-y-4">
            {/* Drop Zone */}
            <div
              onDrop={handleDrop}
              onDragOver={(e) => e.preventDefault()}
              className="border-2 border-dashed border-border rounded-xl p-8 text-center cursor-pointer hover:border-elec-yellow/50 hover:bg-muted/50 transition-colors"
              onClick={() => document.getElementById('file-input')?.click()}
            >
              <input
                id="file-input"
                type="file"
                accept=".csv,.xlsx,.xls"
                onChange={handleFileChange}
                className="hidden"
              />
              <Upload className="h-10 w-10 mx-auto text-muted-foreground mb-3" />
              <p className="text-sm font-medium">
                {file ? file.name : 'Tap to select file'}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                CSV or Excel with name & price columns
              </p>
            </div>

            {/* Error */}
            {error && (
              <div className="flex items-start gap-2 p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
                <AlertCircle className="h-4 w-4 text-destructive shrink-0 mt-0.5" />
                <p className="text-sm text-destructive">{error}</p>
              </div>
            )}

            {/* Results */}
            {parsedData.length > 0 && !error && (
              <div className="space-y-4">
                <div className="flex items-center gap-2 p-3 bg-elec-yellow/10 border border-elec-yellow/20 rounded-lg">
                  <Check className="h-4 w-4 text-elec-yellow" />
                  <p className="text-sm font-medium">
                    Found {parsedData.length.toLocaleString()} items
                  </p>
                </div>

                {/* Markup */}
                <div className="space-y-2">
                  <Label>Markup Percentage</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      value={markup}
                      onChange={(e) => setMarkup(Number(e.target.value))}
                      className="w-24"
                      min={0}
                      max={500}
                    />
                    <span className="text-sm text-muted-foreground">%</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Sell price = Buy price + {markup}%
                  </p>
                </div>

                {/* Preview */}
                <div className="space-y-2">
                  <Label>Preview (first 3 items)</Label>
                  <div className="space-y-2">
                    {parsedData.slice(0, 3).map((item, i) => (
                      <div key={i} className="flex justify-between items-center p-2 bg-muted/50 rounded-lg text-sm">
                        <span className="truncate flex-1 mr-2">{item.name}</span>
                        <span className="text-muted-foreground shrink-0">
                          £{item.buy_price.toFixed(2)} → £{(item.buy_price * (1 + markup / 100)).toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Progress */}
            {isImporting && (
              <div className="space-y-2">
                <Progress value={progress} className="h-2" />
                <p className="text-xs text-center text-muted-foreground">
                  Importing... {progress}%
                </p>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="shrink-0 border-t border-border px-4 py-3 pb-safe bg-elec-gray">
            <Button
              onClick={handleImport}
              disabled={parsedData.length === 0 || isImporting || !!error}
              className="w-full"
            >
              {isImporting ? (
                'Importing...'
              ) : parsedData.length > 0 ? (
                <>
                  <Check className="h-4 w-4 mr-2" />
                  Import {parsedData.length.toLocaleString()} Items
                </>
              ) : (
                'Select a file'
              )}
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
