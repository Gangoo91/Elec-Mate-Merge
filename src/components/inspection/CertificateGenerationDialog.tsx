/**
 * CertificateGenerationDialog.tsx
 *
 * Reusable dialog for certificate / document PDF generation.
 *
 * Shows a spinner while generating, then a success state with a
 * "Download Certificate" button.  The button provides a **fresh user gesture**
 * which is required on iOS (WKWebView) to present the native share sheet
 * via Capacitor's Share plugin.
 */

import { Loader2, CheckCircle2, AlertCircle, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { openOrDownloadPdf } from '@/utils/pdf-download';

interface CertificateGenerationDialogProps {
  /** Controls visibility */
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** While true the spinner is shown */
  isGenerating: boolean;
  /** Set once generation succeeds */
  pdfUrl: string | null;
  /** Filename passed to openOrDownloadPdf */
  pdfFilename?: string;
  /** Optional error message */
  errorMessage?: string | null;
  /** Label shown in the title, e.g. "Certificate" or "Invoice" */
  documentLabel?: string;
}

export default function CertificateGenerationDialog({
  open,
  onOpenChange,
  isGenerating,
  pdfUrl,
  pdfFilename = 'document.pdf',
  errorMessage,
  documentLabel = 'Certificate',
}: CertificateGenerationDialogProps) {
  const handleDownload = async () => {
    if (!pdfUrl) return;
    try {
      await openOrDownloadPdf(pdfUrl, pdfFilename);
    } catch {
      // openOrDownloadPdf handles its own errors; swallow here so the
      // dialog stays open for the user to retry.
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-background border-white/10">
        <DialogHeader>
          <DialogTitle className="text-white">
            {isGenerating
              ? `Generating ${documentLabel}...`
              : errorMessage
                ? 'Generation Failed'
                : `${documentLabel} Ready`}
          </DialogTitle>
          <DialogDescription className="sr-only">Certificate generation progress and download</DialogDescription>
        </DialogHeader>

        <div className="flex flex-col items-center gap-4 py-4">
          {/* ── Generating ─────────────────────────────────────── */}
          {isGenerating && (
            <>
              <Loader2 className="h-10 w-10 animate-spin text-yellow-400" />
              <p className="text-sm text-white">
                Generating your {documentLabel.toLowerCase()}, please wait...
              </p>
            </>
          )}

          {/* ── Error ──────────────────────────────────────────── */}
          {!isGenerating && errorMessage && (
            <>
              <AlertCircle className="h-10 w-10 text-red-400" />
              <p className="text-sm text-white text-center">{errorMessage}</p>
              <Button
                variant="outline"
                className="h-11 touch-manipulation"
                onClick={() => onOpenChange(false)}
              >
                Close
              </Button>
            </>
          )}

          {/* ── Success ────────────────────────────────────────── */}
          {!isGenerating && !errorMessage && pdfUrl && (
            <>
              <CheckCircle2 className="h-10 w-10 text-green-400" />
              <p className="text-sm text-white">
                {documentLabel} generated successfully!
              </p>
              <Button
                onClick={handleDownload}
                className="h-11 touch-manipulation bg-yellow-500 hover:bg-yellow-600 text-black font-semibold w-full"
              >
                <Download className="mr-2 h-4 w-4" />
                Download {documentLabel}
              </Button>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
