import { useState } from 'react';
import { Capacitor } from '@capacitor/core';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Download,
  MessageCircle,
  Mail,
  Copy,
  Check,
  Loader2,
  X,
  ExternalLink,
  Share2,
  FileText,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { openExternalUrl } from '@/utils/open-external-url';
import { useSafetyPDFExport } from '@/hooks/useSafetyPDFExport';

type PDFType =
  | 'permit'
  | 'coshh'
  | 'inspection'
  | 'accident'
  | 'near-miss'
  | 'pre-use-check'
  | 'safe-isolation'
  | 'fire-watch'
  | 'observation'
  | 'site-diary'
  | 'equipment'
  | 'riddor-report'
  | 'method-statement'
  | 'briefing'
  | 'safety-document';

interface SafetyDocumentShareProps {
  /** Which PDF type to generate */
  pdfType: PDFType;
  /** Record ID for the document */
  recordId: string;
  /** Human-readable document title */
  documentTitle: string;
  /** Optional extra data to pass to the edge function */
  extraData?: Record<string, unknown>;
  /** Called when user closes the sheet */
  onClose: () => void;
  /** Whether sheet is open */
  open: boolean;
}

export function SafetyDocumentShare({
  pdfType,
  recordId,
  documentTitle,
  extraData,
  onClose,
  open,
}: SafetyDocumentShareProps) {
  const { toast } = useToast();
  const { exportPDF, isExporting } = useSafetyPDFExport();
  const [copied, setCopied] = useState(false);

  const handleDownloadPDF = async () => {
    await exportPDF(pdfType as any, recordId, extraData, documentTitle);
  };

  const handleWhatsApp = async () => {
    if (Capacitor.isNativePlatform()) {
      // On native: generate PDF then open the iOS/Android share sheet —
      // user can tap WhatsApp (or any other app) from there.
      await exportPDF(pdfType as any, recordId, extraData, documentTitle);
    } else {
      // Web fallback: wa.me pre-filled text (can't attach files via web)
      const message = encodeURIComponent(
        `Safety Document: "${documentTitle}" — generated via Elec-Mate`
      );
      await openExternalUrl(`https://wa.me/?text=${message}`);
    }
  };

  const handleEmail = async () => {
    if (Capacitor.isNativePlatform()) {
      // On native: generate PDF then open the share sheet — user taps Mail.
      await exportPDF(pdfType as any, recordId, extraData, documentTitle);
    } else {
      // Web fallback: mailto with attachment instructions
      const subject = encodeURIComponent(`Safety Document: ${documentTitle}`);
      const body = encodeURIComponent(
        `Hi,\n\nPlease find the attached safety document: "${documentTitle}"\n\nGenerated via Elec-Mate.`
      );
      window.open(`mailto:?subject=${subject}&body=${body}`, '_self');
    }
  };

  const handleNativeShare = async () => {
    if (Capacitor.isNativePlatform()) {
      // On native: generate PDF then open the share sheet.
      await exportPDF(pdfType as any, recordId, extraData, documentTitle);
    } else if (navigator.share) {
      try {
        await navigator.share({
          title: documentTitle,
          text: `Safety Document: ${documentTitle}`,
        });
      } catch {
        // User cancelled
      }
    } else {
      handleCopyTitle();
    }
  };

  const handleCopyTitle = async () => {
    try {
      await navigator.clipboard.writeText(documentTitle);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      toast({ title: 'Copied', description: 'Document title copied to clipboard' });
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!open) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
          className="absolute bottom-0 left-0 right-0 max-h-[70vh] bg-[#111827] rounded-t-2xl overflow-hidden safe-area-pb"
        >
          {/* Handle */}
          <div className="flex justify-center pt-3 pb-1">
            <div className="w-10 h-1 rounded-full bg-white/20" />
          </div>

          <div className="overflow-y-auto max-h-[60vh]">
            {/* Header */}
            <div className="px-5 pt-3 pb-4 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-elec-yellow/20 flex items-center justify-center">
                  <Share2 className="h-5 w-5 text-elec-yellow" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Export & Share</h3>
                  <p className="text-sm text-white truncate max-w-[200px]">{documentTitle}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center touch-manipulation"
              >
                <X className="h-4 w-4 text-white" />
              </button>
            </div>

            <div className="p-5 space-y-3">
              {/* Export PDF — single primary action (on native, opens share sheet) */}
              <Button
                type="button"
                onClick={handleDownloadPDF}
                disabled={isExporting}
                className="w-full h-14 rounded-xl font-semibold text-base touch-manipulation bg-elec-yellow text-black hover:bg-elec-yellow/90"
              >
                {isExporting ? (
                  <Loader2 className="h-5 w-5 animate-spin mr-2" />
                ) : (
                  <FileText className="h-5 w-5 mr-2" />
                )}
                {isExporting ? 'Generating PDF...' : 'Export PDF'}
              </Button>
              <p className="text-[11px] text-white text-center">
                {Capacitor.isNativePlatform()
                  ? 'Opens share sheet — send via WhatsApp, email, AirDrop, or save to Files'
                  : 'Opens PDF in a new tab for download or printing'}
              </p>

              {/* Close */}
              <Button
                type="button"
                variant="ghost"
                onClick={onClose}
                className="w-full h-12 text-white hover:text-white touch-manipulation"
              >
                Close
              </Button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
