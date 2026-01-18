import { useState, useRef } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useCertificateImport } from '@/hooks/useCertificateImport';
import { useToast } from '@/hooks/use-toast';
import { Upload, FileText, Download, AlertCircle, CheckCircle2 } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface CertificateImportDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onImportComplete: () => void;
}

export const CertificateImportDialog = ({
  open,
  onOpenChange,
  onImportComplete,
}: CertificateImportDialogProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [importResult, setImportResult] = useState<{
    success: number;
    failed: number;
    errors: Array<{ row: any; error: string }>;
  } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { isImporting, progress, importCertificates, downloadSampleCSV } = useCertificateImport();
  const { toast } = useToast();

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setImportResult(null);
    }
  };

  const handleImport = async () => {
    if (!selectedFile) return;

    try {
      const result = await importCertificates(selectedFile);
      setImportResult(result);

      if (result.success > 0) {
        toast({
          title: 'Import completed',
          description: `Successfully imported ${result.success} certificate${result.success > 1 ? 's' : ''}${
            result.failed > 0 ? ` (${result.failed} failed)` : ''
          }`,
        });
        onImportComplete();
      } else {
        toast({
          title: 'Import failed',
          description: 'No certificates were imported. Please check the error details.',
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: 'Import failed',
        description: error instanceof Error ? error.message : 'An unknown error occurred',
        variant: 'destructive',
      });
    }
  };

  const handleClose = () => {
    setSelectedFile(null);
    setImportResult(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Import Certificates</DialogTitle>
          <DialogDescription>
            Import certificate metadata from a CSV or Excel file. Customers will be automatically matched or
            created.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Sample Template */}
          <div className="rounded-lg border border-border bg-muted/30 p-4">
            <div className="flex items-start gap-3">
              <FileText className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div className="flex-1 space-y-2">
                <p className="text-sm font-medium">Need a template?</p>
                <p className="text-sm text-muted-foreground">
                  Download our sample CSV to see the required format and example data.
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={downloadSampleCSV}
                  className="gap-2"
                >
                  <Download className="h-4 w-4" />
                  Download Sample CSV
                </Button>
              </div>
            </div>
          </div>

          {/* Required Fields Info */}
          <div className="rounded-lg border border-border p-4">
            <h4 className="text-sm font-medium mb-2">Required Fields:</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• <strong>Certificate Number</strong> - Must be unique</li>
              <li>• <strong>Customer Name</strong> - Will be matched or created automatically</li>
              <li>• <strong>Report Type</strong> - EICR, EIC, or Minor Works</li>
            </ul>
            <h4 className="text-sm font-medium mt-4 mb-2">Optional Fields:</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Status, Inspection Date, Installation Address, Inspector Name, Client Name</li>
            </ul>
          </div>

          {/* File Upload */}
          <div className="space-y-3">
            <input
              ref={fileInputRef}
              type="file"
              accept=".csv,.xlsx,.xls"
              onChange={handleFileSelect}
              className="hidden"
              id="certificate-file-input"
            />
            <label
              htmlFor="certificate-file-input"
              className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-border rounded-lg cursor-pointer hover:border-primary/50 hover:bg-accent/50 active:bg-accent/70 transition-all touch-manipulation"
            >
              <Upload className="h-8 w-8 text-muted-foreground mb-2" />
              <p className="text-sm font-medium">
                {selectedFile ? selectedFile.name : 'Click to select CSV or Excel file'}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Supported formats: .csv, .xlsx, .xls
              </p>
            </label>
          </div>

          {/* Progress Bar */}
          {isImporting && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Importing certificates...</span>
                <span className="font-medium">{progress}%</span>
              </div>
              <Progress value={progress} />
            </div>
          )}

          {/* Import Results */}
          {importResult && (
            <div className="space-y-3">
              {importResult.success > 0 && (
                <Alert>
                  <CheckCircle2 className="h-4 w-4" />
                  <AlertDescription>
                    Successfully imported {importResult.success} certificate{importResult.success > 1 ? 's' : ''}
                  </AlertDescription>
                </Alert>
              )}

              {importResult.failed > 0 && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    <div className="space-y-2">
                      <p className="font-medium">
                        {importResult.failed} certificate{importResult.failed > 1 ? 's' : ''} failed to import:
                      </p>
                      <div className="max-h-40 overflow-y-auto space-y-1">
                        {importResult.errors.slice(0, 10).map((error, idx) => (
                          <div key={idx} className="text-xs">
                            <span className="font-medium">
                              {error.row?.certificate_number || 'Unknown'}:
                            </span>{' '}
                            {error.error}
                          </div>
                        ))}
                        {importResult.errors.length > 10 && (
                          <p className="text-xs italic">
                            ... and {importResult.errors.length - 10} more error{importResult.errors.length - 10 > 1 ? 's' : ''}
                          </p>
                        )}
                      </div>
                    </div>
                  </AlertDescription>
                </Alert>
              )}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-4 border-t border-border">
            <Button variant="outline" onClick={handleClose} disabled={isImporting}>
              {importResult ? 'Close' : 'Cancel'}
            </Button>
            <Button
              onClick={handleImport}
              disabled={!selectedFile || isImporting}
            >
              {isImporting ? 'Importing...' : 'Import Certificates'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
