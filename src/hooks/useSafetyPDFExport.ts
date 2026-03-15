import { useState } from 'react';
import { Capacitor } from '@capacitor/core';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Share } from '@capacitor/share';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

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

const EDGE_FUNCTION_MAP: Record<PDFType, string> = {
  permit: 'generate-permit-pdf',
  coshh: 'generate-coshh-pdf',
  inspection: 'generate-inspection-pdf',
  accident: 'generate-accident-pdf',
  'near-miss': 'generate-near-miss-pdf',
  'pre-use-check': 'generate-pre-use-check-pdf',
  'safe-isolation': 'generate-safe-isolation-pdf',
  'fire-watch': 'generate-fire-watch-pdf',
  observation: 'generate-observation-pdf',
  'site-diary': 'generate-site-diary-pdf',
  equipment: 'generate-equipment-pdf',
  'riddor-report': 'generate-riddor-report-pdf',
  'method-statement': 'generate-method-statement-pdf',
  briefing: 'generate-pdf-monkey',
  'safety-document': 'generate-safety-document-pdf',
};

/**
 * Deliver a PDF to the user.
 *
 * - Native (iOS/Android): downloads the file, saves it to the device cache,
 *   then opens the native share sheet so the user can save to Files,
 *   send via WhatsApp, email it, AirDrop it, etc.
 * - Web: falls back to window.open (new tab).
 *
 * @param urlOrBase64 Either a remote URL string or a base64 payload
 * @param isBase64    true when urlOrBase64 contains raw base64 data
 * @param filename    e.g. "PreStartSafetyChecklist.pdf"
 * @param shareTitle  Title shown in the native share sheet
 */
async function deliverPDF(
  urlOrBase64: string,
  isBase64: boolean,
  filename: string,
  shareTitle: string
): Promise<void> {
  if (Capacitor.isNativePlatform()) {
    let base64Data: string;

    if (isBase64) {
      base64Data = urlOrBase64;
    } else {
      // Fetch the PDF from the storage URL and convert to base64
      const response = await fetch(urlOrBase64);
      if (!response.ok) throw new Error(`Failed to fetch PDF: ${response.status}`);
      const blob = await response.blob();
      base64Data = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
          const result = reader.result as string;
          // Strip the data:application/pdf;base64, prefix
          resolve(result.includes(',') ? result.split(',')[1] : result);
        };
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
    }

    // Write to the device cache directory
    const saved = await Filesystem.writeFile({
      path: filename,
      data: base64Data,
      directory: Directory.Cache,
    });

    // Open the native iOS/Android share sheet with the file
    await Share.share({
      title: shareTitle,
      files: [saved.uri],
    });
  } else {
    // Web fallback — open PDF in a new tab
    if (!isBase64) {
      window.open(urlOrBase64, '_blank');
    } else {
      const byteChars = atob(urlOrBase64);
      const byteNumbers = new Array(byteChars.length);
      for (let i = 0; i < byteChars.length; i++) {
        byteNumbers[i] = byteChars.charCodeAt(i);
      }
      const blob = new Blob([new Uint8Array(byteNumbers)], { type: 'application/pdf' });
      window.open(URL.createObjectURL(blob), '_blank');
    }
  }
}

/** Sanitise a document title into a safe filename */
function toFilename(title: string): string {
  return title.replace(/[^a-zA-Z0-9-_ ]/g, '').replace(/\s+/g, '_') + '.pdf';
}

export function useSafetyPDFExport() {
  const [isExporting, setIsExporting] = useState(false);
  const [exportingId, setExportingId] = useState<string | null>(null);
  const { toast } = useToast();

  const exportPDF = async (
    type: PDFType,
    recordId: string,
    data?: Record<string, unknown>,
    documentTitle?: string
  ) => {
    console.log('[PDF Export] Starting:', type, recordId);
    setIsExporting(true);
    setExportingId(recordId);

    try {
      const functionName = EDGE_FUNCTION_MAP[type];
      console.log('[PDF Export] Calling edge function:', functionName);

      const { data: result, error } = await supabase.functions.invoke(functionName, {
        body: { recordId, ...data },
      });

      console.log('[PDF Export] Response:', { result, error });
      if (error) {
        try {
          const ctx = (error as any).context;
          if (ctx && typeof ctx.json === 'function') {
            const body = await ctx.json();
            console.error('[PDF Export] Edge function error body:', body);
          }
        } catch (_) {
          /* ignore */
        }
        throw error;
      }

      const filename = toFilename(documentTitle || type);
      const shareTitle = documentTitle || 'Safety Document';

      if (result?.url) {
        await deliverPDF(result.url, false, filename, shareTitle);
        if (!Capacitor.isNativePlatform()) {
          toast({
            title: 'PDF Generated',
            description: 'Your document has been opened in a new tab.',
          });
        }
      } else if (result?.pdf_base64) {
        await deliverPDF(result.pdf_base64, true, filename, shareTitle);
        if (!Capacitor.isNativePlatform()) {
          toast({
            title: 'PDF Generated',
            description: 'Your document has been opened in a new tab.',
          });
        }
      } else if (result?.useFallback) {
        toast({
          title: 'PDF Service Unavailable',
          description: 'The PDF service is not currently configured. Please try again later.',
          variant: 'destructive',
        });
      }

      return result;
    } catch (err) {
      console.error(`PDF export failed for ${type}:`, err);
      toast({
        title: 'Export Failed',
        description: 'Could not generate PDF. Please try again.',
        variant: 'destructive',
      });
      return null;
    } finally {
      setIsExporting(false);
      setExportingId(null);
    }
  };

  return { exportPDF, isExporting, exportingId };
}
