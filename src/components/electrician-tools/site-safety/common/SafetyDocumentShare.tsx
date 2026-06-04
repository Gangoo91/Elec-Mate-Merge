import { Capacitor } from '@capacitor/core';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, Loader2, Share2, X } from 'lucide-react';
import { cn } from '@/lib/utils';
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
  pdfType: PDFType;
  recordId: string;
  documentTitle: string;
  extraData?: Record<string, unknown>;
  onClose: () => void;
  open: boolean;
}

const isNative = Capacitor.isNativePlatform();

export function SafetyDocumentShare({
  pdfType,
  recordId,
  documentTitle,
  extraData,
  onClose,
  open,
}: SafetyDocumentShareProps) {
  const { exportPDF, isExporting } = useSafetyPDFExport();

  const handlePDF = async () => {
    await exportPDF(pdfType as Parameters<typeof exportPDF>[0], recordId, extraData, documentTitle);
    // On native the iOS/Android share sheet opens — don't auto-close.
    // On web the download triggers — close the sheet after.
    if (!isNative) onClose();
  };

  if (!open) return null;

  return (
    <AnimatePresence>
      {/* Backdrop */}
      <motion.div
        key="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Sheet */}
      <motion.div
        key="sheet"
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 28, stiffness: 320 }}
        onClick={(e) => e.stopPropagation()}
        className="fixed bottom-0 left-0 right-0 z-[101] bg-[hsl(0_0%_8%)] rounded-t-3xl safe-area-pb"
      >
        {/* Pull handle */}
        <div className="flex justify-center pt-3 pb-2">
          <div className="w-9 h-1 rounded-full bg-white/20" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-1 pb-4 border-b border-white/[0.08]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-elec-yellow/15 flex items-center justify-center shrink-0">
              {isNative ? (
                <Share2 className="h-5 w-5 text-elec-yellow" />
              ) : (
                <Download className="h-5 w-5 text-elec-yellow" />
              )}
            </div>
            <div className="min-w-0">
              <p className="text-[13px] font-semibold text-white leading-tight">
                {isNative ? 'Share document' : 'Download PDF'}
              </p>
              <p className="text-[12px] text-white/50 truncate max-w-[220px] leading-tight mt-0.5">
                {documentTitle}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/[0.08] flex items-center justify-center shrink-0 touch-manipulation"
            aria-label="Close"
          >
            <X className="h-4 w-4 text-white/70" />
          </button>
        </div>

        {/* Actions */}
        <div className="px-5 pt-4 pb-5 space-y-3">
          {/* Primary action */}
          <button
            type="button"
            onClick={handlePDF}
            disabled={isExporting}
            className={cn(
              'w-full h-14 rounded-2xl font-semibold text-[15px] flex items-center justify-center gap-2.5 touch-manipulation transition-opacity',
              'bg-elec-yellow text-black',
              isExporting && 'opacity-60 cursor-not-allowed'
            )}
          >
            {isExporting ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                <span>Generating PDF…</span>
              </>
            ) : isNative ? (
              <>
                <Share2 className="h-5 w-5" />
                <span>Share PDF</span>
              </>
            ) : (
              <>
                <Download className="h-5 w-5" />
                <span>Download PDF</span>
              </>
            )}
          </button>

          {/* Context hint */}
          <p className="text-[11.5px] text-white/40 text-center leading-snug px-2">
            {isNative
              ? 'Saves to your device — share via WhatsApp, AirDrop, email, or save to Files'
              : 'Downloads a PDF to your device for printing or sharing'}
          </p>

          {/* Divider */}
          <div className="border-t border-white/[0.06] my-1" />

          {/* Close */}
          <button
            type="button"
            onClick={onClose}
            className="w-full h-11 rounded-xl text-[14px] font-medium text-white/60 hover:text-white touch-manipulation transition-colors"
          >
            Close
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
