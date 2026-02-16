import { useState } from 'react';
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
  | 'riddor-report';

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
};

export function useSafetyPDFExport() {
  const [isExporting, setIsExporting] = useState(false);
  const [exportingId, setExportingId] = useState<string | null>(null);
  const { toast } = useToast();

  const exportPDF = async (type: PDFType, recordId: string, data?: Record<string, unknown>) => {
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
        // Try to read the error body for the actual message
        try {
          const ctx = (error as any).context;
          if (ctx && typeof ctx.json === 'function') {
            const body = await ctx.json();
            console.error('[PDF Export] Edge function error body:', body);
          }
        } catch (_) { /* ignore */ }
        throw error;
      }

      if (result?.url) {
        // JSON response with storage URL
        window.open(result.url, '_blank');
        toast({
          title: 'PDF Generated',
          description: 'Your document has been opened in a new tab.',
        });
      } else if (result?.pdf_base64) {
        // Base64 fallback (storage upload failed, PDF returned as base64)
        const byteChars = atob(result.pdf_base64);
        const byteNumbers = new Array(byteChars.length);
        for (let i = 0; i < byteChars.length; i++) {
          byteNumbers[i] = byteChars.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: 'application/pdf' });
        const blobUrl = URL.createObjectURL(blob);
        window.open(blobUrl, '_blank');
        toast({
          title: 'PDF Generated',
          description: 'Your document has been opened in a new tab.',
        });
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
