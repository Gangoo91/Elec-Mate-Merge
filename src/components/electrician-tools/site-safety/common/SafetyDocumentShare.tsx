import { useState } from 'react';
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
    await exportPDF(pdfType as any, recordId, extraData);
  };

  const handleWhatsApp = () => {
    const message = encodeURIComponent(
      `Safety Document: "${documentTitle}" — generated via Elec-Mate`
    );
    window.open(`https://wa.me/?text=${message}`, '_blank');
  };

  const handleEmail = () => {
    const subject = encodeURIComponent(`Safety Document: ${documentTitle}`);
    const body = encodeURIComponent(
      `Hi,\n\nPlease find the attached safety document: "${documentTitle}"\n\nGenerated via Elec-Mate.`
    );
    window.open(`mailto:?subject=${subject}&body=${body}`, '_self');
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
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

            <div className="p-5 space-y-4">
              {/* Download PDF — primary action */}
              <Button
                type="button"
                onClick={handleDownloadPDF}
                disabled={isExporting}
                className="w-full h-14 rounded-xl font-semibold text-base touch-manipulation bg-elec-yellow text-black hover:bg-elec-yellow/90"
              >
                {isExporting ? (
                  <Loader2 className="h-5 w-5 animate-spin mr-2" />
                ) : (
                  <Download className="h-5 w-5 mr-2" />
                )}
                {isExporting ? 'Generating PDF...' : 'Download PDF'}
              </Button>

              {/* Share options grid */}
              <div className="grid grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={handleWhatsApp}
                  className={cn(
                    'flex flex-col items-center gap-2 p-4 rounded-xl border transition-all',
                    'bg-white/[0.04] border-white/10 hover:bg-white/[0.08] active:scale-[0.97]',
                    'touch-manipulation min-h-[80px]'
                  )}
                >
                  <MessageCircle className="h-5 w-5 text-green-400" />
                  <span className="text-xs font-medium text-white">WhatsApp</span>
                </button>

                <button
                  type="button"
                  onClick={handleEmail}
                  className={cn(
                    'flex flex-col items-center gap-2 p-4 rounded-xl border transition-all',
                    'bg-white/[0.04] border-white/10 hover:bg-white/[0.08] active:scale-[0.97]',
                    'touch-manipulation min-h-[80px]'
                  )}
                >
                  <Mail className="h-5 w-5 text-blue-400" />
                  <span className="text-xs font-medium text-white">Email</span>
                </button>

                <button
                  type="button"
                  onClick={handleNativeShare}
                  className={cn(
                    'flex flex-col items-center gap-2 p-4 rounded-xl border transition-all',
                    'bg-white/[0.04] border-white/10 hover:bg-white/[0.08] active:scale-[0.97]',
                    'touch-manipulation min-h-[80px]'
                  )}
                >
                  <ExternalLink className="h-5 w-5 text-purple-400" />
                  <span className="text-xs font-medium text-white">More...</span>
                </button>
              </div>

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
