import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

type PDFType =
  | "permit"
  | "coshh"
  | "inspection"
  | "accident"
  | "near-miss"
  | "equipment"
  | "fire-watch"
  | "observation"
  | "pre-use-check"
  | "site-diary"
  | "safe-isolation";

const EDGE_FUNCTION_MAP: Record<PDFType, string> = {
  permit: "generate-permit-pdf",
  coshh: "generate-coshh-pdf",
  inspection: "generate-inspection-pdf",
  accident: "generate-accident-pdf",
  "near-miss": "generate-near-miss-pdf",
  equipment: "generate-equipment-pdf",
  "fire-watch": "generate-fire-watch-pdf",
  observation: "generate-observation-pdf",
  "pre-use-check": "generate-pre-use-check-pdf",
  "site-diary": "generate-site-diary-pdf",
  "safe-isolation": "generate-safe-isolation-pdf",
};

export function useSafetyPDFExport() {
  const [isExporting, setIsExporting] = useState(false);
  const [exportingId, setExportingId] = useState<string | null>(null);
  const { toast } = useToast();

  const exportPDF = async (type: PDFType, recordId: string, data?: Record<string, unknown>) => {
    setIsExporting(true);
    setExportingId(recordId);

    try {
      const functionName = EDGE_FUNCTION_MAP[type];

      const { data: result, error } = await supabase.functions.invoke(
        functionName,
        {
          body: { recordId, ...data },
        }
      );

      if (error) throw error;

      if (result?.url) {
        window.open(result.url, "_blank");
        toast({
          title: "PDF Generated",
          description: "Your document has been opened in a new tab.",
        });
      } else if (result?.useFallback) {
        toast({
          title: "PDF Service Unavailable",
          description:
            "The PDF service is not currently configured. Please try again later.",
          variant: "destructive",
        });
      }

      return result;
    } catch (err) {
      console.error(`PDF export failed for ${type}:`, err);
      toast({
        title: "Export Failed",
        description: "Could not generate PDF. Please try again.",
        variant: "destructive",
      });
      return null;
    } finally {
      setIsExporting(false);
      setExportingId(null);
    }
  };

  return { exportPDF, isExporting, exportingId };
}
