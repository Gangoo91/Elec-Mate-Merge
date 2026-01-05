import React, { useState, useCallback } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Upload, FileSpreadsheet, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useCustomerImport, ImportResult } from '@/hooks/useCustomerImport';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface CustomerImportDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onImportComplete: () => void;
}

export const CustomerImportDialog = ({ 
  open, 
  onOpenChange,
  onImportComplete 
}: CustomerImportDialogProps) => {
  const { importCustomers, isImporting, importProgress } = useCustomerImport();
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [importResult, setImportResult] = useState<ImportResult | null>(null);

  const downloadSampleCSV = () => {
    const sampleData = [
      ['Name', 'Email', 'Phone', 'Address', 'Notes'],
      ['John Smith', 'john@example.com', '01234 567890', '123 Main St, London, SW1A 1AA', 'Preferred contact by email'],
      ['Jane Doe', 'jane@example.com', '07700 900123', '456 Oak Ave, Manchester, M1 1AA', 'VIP customer'],
    ];
    
    const csvContent = sampleData.map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');
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
      onImportComplete();
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
      <DialogContent className="w-[calc(100%-2rem)] max-w-[95vw] sm:max-w-2xl max-h-[90vh] overflow-y-auto bg-card border-border">
        <DialogHeader>
          <DialogTitle className="text-lg sm:text-xl text-foreground">Import Customers</DialogTitle>
          <DialogDescription className="text-sm text-neutral-400">
            Upload a CSV or Excel file containing your customer data
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3 sm:space-y-4">
          {/* File Upload Area */}
          {!importResult && (
            <>
              <div
                className={`border-2 border-dashed rounded-lg p-4 sm:p-6 md:p-8 text-center transition-colors ${
                  dragActive
                    ? 'border-elec-yellow bg-elec-yellow/10'
                    : 'border-border hover:border-neutral-500'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <FileSpreadsheet className="h-10 w-10 sm:h-12 sm:w-12 text-neutral-400 mx-auto mb-3 sm:mb-4" />
                <p className="text-sm sm:text-base text-foreground mb-2 break-all px-2">
                  {selectedFile ? selectedFile.name : 'Drag and drop your file here'}
                </p>
                <p className="text-xs sm:text-sm text-neutral-400 mb-3 sm:mb-4 px-2">
                  or click to browse (CSV, XLSX, XLS)
                </p>
                <input
                  type="file"
                  id="file-upload"
                  accept=".csv,.xlsx,.xls"
                  onChange={handleFileInput}
                  className="hidden"
                />
                <label htmlFor="file-upload">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => document.getElementById('file-upload')?.click()}
                    disabled={isImporting}
                    className="h-11 sm:h-10 px-4 sm:px-6"
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    <span className="text-sm sm:text-base">Choose File</span>
                  </Button>
                </label>
              </div>

              {/* Expected Format Info */}
              <Alert className="bg-muted border-border">
                <AlertCircle className="h-4 w-4 flex-shrink-0" />
                <AlertDescription className="text-xs sm:text-sm text-neutral-300 break-words">
                  <strong>Expected columns:</strong> Name (required), Email, Phone, Address, Notes
                </AlertDescription>
              </Alert>

              <Button
                variant="link"
                onClick={downloadSampleCSV}
                className="text-xs sm:text-sm text-elec-yellow hover:text-elec-yellow/80 p-0 h-auto font-normal"
              >
                Download sample CSV template
              </Button>

              {/* Import Progress */}
              {isImporting && (
                <div className="space-y-2">
                  <div className="flex justify-between text-xs sm:text-sm text-foreground">
                    <span className="truncate">Importing customers...</span>
                    <span className="ml-2 flex-shrink-0">{importProgress}%</span>
                  </div>
                  <Progress value={importProgress} className="h-2 sm:h-3" />
                </div>
              )}
            </>
          )}

          {/* Import Results */}
          {importResult && (
            <div className="space-y-4">
              <Alert className="bg-green-900/20 border-green-700">
                <CheckCircle2 className="h-4 w-4 text-green-400 flex-shrink-0" />
                <AlertDescription className="text-xs sm:text-sm text-green-100 break-words">
                  Successfully imported <strong>{importResult.successCount}</strong> customer{importResult.successCount !== 1 ? 's' : ''}
                </AlertDescription>
              </Alert>

              {importResult.errorCount > 0 && (
                <Alert className="bg-red-900/20 border-red-700">
                  <AlertCircle className="h-4 w-4 text-red-400 flex-shrink-0" />
                  <AlertDescription className="text-xs sm:text-sm text-red-100 break-words">
                    <strong>{importResult.errorCount}</strong> row{importResult.errorCount !== 1 ? 's' : ''} had errors and {importResult.errorCount !== 1 ? 'were' : 'was'} skipped
                  </AlertDescription>
                </Alert>
              )}

              {importResult.errors.length > 0 && (
                <div className="max-h-48 sm:max-h-64 overflow-y-auto bg-background rounded-lg p-3 sm:p-4">
                  <h4 className="text-xs sm:text-sm font-medium text-foreground mb-2 sticky top-0 bg-background pb-2">
                    Error Details:
                  </h4>
                  <div className="space-y-2 text-xs sm:text-sm text-neutral-300">
                    {importResult.errors.slice(0, 10).map((err, idx) => (
                      <div key={idx} className="break-words">
                        <span className="text-red-400">•</span> <strong className="text-foreground">{err.row.name || 'Unknown'}:</strong> {err.error}
                      </div>
                    ))}
                    {importResult.errors.length > 10 && (
                      <p className="text-muted-foreground mt-2 text-xs">
                        + {importResult.errors.length - 10} more error{importResult.errors.length - 10 !== 1 ? 's' : ''}
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-col-reverse sm:flex-row justify-end gap-2 sm:gap-3 pt-4">
            <Button
              variant="ghost"
              onClick={handleClose}
              disabled={isImporting}
              className="w-full sm:w-auto h-11 sm:h-10"
            >
              {importResult ? 'Close' : 'Cancel'}
            </Button>
            {!importResult && (
              <Button
                onClick={handleImport}
                disabled={!selectedFile || isImporting}
                className="w-full sm:w-auto h-11 sm:h-10 bg-elec-yellow hover:bg-elec-yellow/90 text-neutral-900 font-medium"
              >
                {isImporting && (
                  <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-neutral-900 border-t-transparent" />
                )}
                {isImporting ? 'Importing...' : 'Import Customers'}
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
