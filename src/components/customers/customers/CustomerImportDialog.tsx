import React, { useState, useCallback, useRef } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';
import { useCustomerImport, ImportResult } from '@/hooks/useCustomerImport';
import { cn } from '@/lib/utils';

interface CustomerImportDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onImportComplete?: () => void;
}

export const CustomerImportDialog = ({
  open,
  onOpenChange,
  onImportComplete,
}: CustomerImportDialogProps) => {
  const { importCustomers, isImporting, importProgress } = useCustomerImport();
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [importResult, setImportResult] = useState<ImportResult | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const downloadSampleCSV = () => {
    const sampleData = [
      ['Name', 'Email', 'Phone', 'Address', 'Notes'],
      [
        'John Smith',
        'john@example.com',
        '01234 567890',
        '123 Main St, London, SW1A 1AA',
        'Preferred contact by email',
      ],
      [
        'Jane Doe',
        'jane@example.com',
        '07700 900123',
        '456 Oak Ave, Manchester, M1 1AA',
        'Landlord — three rentals',
      ],
    ];

    const csvContent =
      '\ufeff' + sampleData.map((row) => row.map((cell) => `"${cell}"`).join(',')).join('\r\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'customer-import-template.csv';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setSelectedFile(e.dataTransfer.files[0]);
    }
  }, []);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleImport = async () => {
    if (!selectedFile) return;

    try {
      const result = await importCustomers(selectedFile);
      setImportResult(result);
      onImportComplete?.();
    } catch (error) {
      console.error('Import error:', error);
    }
  };

  const handleClose = () => {
    setSelectedFile(null);
    setImportResult(null);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-h-[90vh] w-[calc(100%-2rem)] max-w-[95vw] overflow-y-auto rounded-2xl border border-white/[0.1] bg-[#111114] shadow-2xl sm:max-w-xl">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold tracking-tight text-white">
            Import customers
          </DialogTitle>
          <DialogDescription className="text-[13px] text-white/55">
            Bring your book across from a CSV or Excel export — Tradify, ServiceM8, Jobber, Xero
            and most others work as-is.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3 sm:space-y-4">
          {/* File pick / drop zone — the whole surface is the target */}
          {!importResult && (
            <>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                disabled={isImporting}
                className={cn(
                  'w-full rounded-2xl border-2 border-dashed p-6 text-center transition-colors touch-manipulation sm:p-8',
                  dragActive
                    ? 'border-elec-yellow bg-white/[0.06]'
                    : selectedFile
                      ? 'border-elec-yellow/60 bg-gradient-to-b from-white/[0.07] to-white/[0.03]'
                      : 'border-white/[0.15] bg-gradient-to-b from-white/[0.05] to-white/[0.02] hover:border-white/[0.3]'
                )}
              >
                {selectedFile ? (
                  <>
                    <p className="break-all px-2 text-[14px] font-semibold text-white">
                      {selectedFile.name}
                    </p>
                    <p className="mt-1 text-[12.5px] text-white/55">
                      {(selectedFile.size / 1024).toFixed(0)} KB — tap to choose a different file
                    </p>
                  </>
                ) : (
                  <>
                    <p className="text-[14px] font-semibold text-white">Choose a file</p>
                    <p className="mt-1 text-[12.5px] text-white/55">
                      or drag and drop — CSV, XLSX or XLS
                    </p>
                  </>
                )}
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept=".csv,.xlsx,.xls"
                onChange={handleFileInput}
                className="hidden"
              />

              {/* Expected format */}
              <div className="rounded-2xl border border-white/[0.1] bg-white/[0.04] p-4">
                <p className="text-[12.5px] leading-relaxed text-white/70">
                  <span className="font-semibold text-white">Columns:</span> Name (required),
                  Email, Phone, Address, Notes. Anyone already in your book — same email or phone —
                  is skipped, never duplicated.
                </p>
                <button
                  type="button"
                  onClick={downloadSampleCSV}
                  className="mt-2 flex h-9 items-center text-[13px] font-semibold text-elec-yellow transition-colors hover:text-elec-yellow/80 touch-manipulation"
                >
                  Download template
                </button>
              </div>

              {/* Import progress */}
              {isImporting && (
                <div className="space-y-2">
                  <div className="flex justify-between text-[13px] text-white">
                    <span className="truncate">Importing…</span>
                    <span className="ml-2 flex-shrink-0 tabular-nums">{importProgress}%</span>
                  </div>
                  <Progress value={importProgress} className="h-2" />
                </div>
              )}
            </>
          )}

          {/* Import results */}
          {importResult && (
            <div className="space-y-3">
              <div className="rounded-2xl border border-green-500/25 bg-green-500/[0.08] p-4">
                <p className="text-[14px] font-semibold text-green-400">
                  {importResult.successCount} customer
                  {importResult.successCount !== 1 ? 's' : ''} imported
                </p>
                {importResult.skippedCount > 0 && (
                  <p className="mt-1 text-[12.5px] text-white/65">
                    {importResult.skippedCount} already in your book — skipped, not duplicated.
                  </p>
                )}
              </div>

              {importResult.errors.length > 0 && (
                  <div className="rounded-2xl border border-red-500/25 bg-red-500/[0.08] p-4">
                    <p className="text-[13px] font-semibold text-red-400">
                      {importResult.errors.length} row
                      {importResult.errors.length !== 1 ? 's' : ''} skipped with errors
                    </p>
                    <div className="mt-2 max-h-48 space-y-1.5 overflow-y-auto">
                      {importResult.errors.slice(0, 10).map((err, idx) => (
                        <p key={idx} className="break-words text-[12.5px] text-white/70">
                          <span className="font-semibold text-white">
                            {err.row.name || 'Unknown'}:
                          </span>{' '}
                          {err.error}
                        </p>
                      ))}
                      {importResult.errors.length > 10 && (
                        <p className="text-[12px] text-white/50">
                          +{importResult.errors.length - 10} more
                        </p>
                      )}
                    </div>
                  </div>
                )}
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-col-reverse gap-2 pt-2 sm:flex-row sm:justify-end sm:gap-3">
            <button
              onClick={handleClose}
              disabled={isImporting}
              className="h-11 w-full rounded-xl border border-white/[0.1] bg-white/[0.04] text-[14px] font-medium text-white transition-colors hover:bg-white/[0.08] disabled:opacity-40 touch-manipulation sm:w-auto sm:px-5"
            >
              {importResult ? 'Done' : 'Cancel'}
            </button>
            {!importResult && (
              <button
                onClick={handleImport}
                disabled={!selectedFile || isImporting}
                className="h-11 w-full rounded-xl bg-elec-yellow text-[14px] font-semibold text-black transition-all hover:bg-elec-yellow/90 active:scale-[0.98] disabled:opacity-50 touch-manipulation sm:w-auto sm:px-6"
              >
                {isImporting ? 'Importing…' : 'Import customers'}
              </button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
