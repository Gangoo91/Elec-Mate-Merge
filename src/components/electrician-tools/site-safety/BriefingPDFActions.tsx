import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { FileText, Download, Printer, Loader2, ExternalLink } from "lucide-react";

interface BriefingPDFActionsProps {
  briefing: any;
  companyProfile?: any;
}

export const BriefingPDFActions = ({ briefing, companyProfile }: BriefingPDFActionsProps) => {
  const { toast } = useToast();
  const [generating, setGenerating] = useState(false);
  const [pdfUrl, setPdfUrl] = useState(briefing.pdf_url || "");

  const handleGeneratePDF = async () => {
    setGenerating(true);
    try {
      console.log('[BRIEFING-PDF] Generating PDF for briefing:', briefing.id);

      const { data, error } = await supabase.functions.invoke('generate-pdf-monkey', {
        body: {
          briefing: briefing,
          companyProfile: companyProfile,
          briefing_mode: true
        }
      });

      if (error) throw error;

      if (data.success) {
        setPdfUrl(data.downloadUrl);

        // Update database with PDF URL
        await supabase
          .from('team_briefings')
          .update({
            pdf_url: data.downloadUrl,
            pdf_document_id: data.documentId,
            pdf_generated_at: new Date().toISOString()
          })
          .eq('id', briefing.id);

        toast({
          title: "PDF Generated",
          description: "Your briefing PDF is ready to view or download.",
        });
      } else {
        throw new Error(data.message || 'PDF generation failed');
      }
    } catch (error: any) {
      console.error('PDF generation error:', error);
      toast({
        title: "PDF Generation Failed",
        description: error.message || "Failed to generate PDF. Please try again.",
        variant: "destructive",
      });
    } finally {
      setGenerating(false);
    }
  };

  const handleViewPDF = () => {
    if (pdfUrl) {
      window.open(pdfUrl, '_blank');
    }
  };

  const handleDownloadPDF = () => {
    if (pdfUrl) {
      const link = document.createElement('a');
      link.href = pdfUrl;
      link.download = `Briefing-${briefing.job_name || briefing.briefing_name}-${new Date(briefing.briefing_date).toISOString().split('T')[0]}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handlePrintPDF = () => {
    if (pdfUrl) {
      const iframe = document.createElement('iframe');
      iframe.style.display = 'none';
      iframe.src = pdfUrl;
      document.body.appendChild(iframe);
      iframe.onload = () => {
        iframe.contentWindow?.print();
      };
    }
  };

  if (!pdfUrl && !generating) {
    return (
      <Button
        onClick={handleGeneratePDF}
        variant="outline"
        size="sm"
        className="w-full border-elec-yellow/50 text-elec-yellow hover:bg-elec-yellow hover:text-background"
      >
        <FileText className="h-4 w-4 mr-2" />
        Generate PDF
      </Button>
    );
  }

  if (generating) {
    return (
      <Button disabled size="sm" className="w-full">
        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
        Generating PDF...
      </Button>
    );
  }

  return (
    <div className="flex flex-col sm:flex-row gap-2 w-full">
      <Button
        onClick={handleViewPDF}
        size="sm"
        className="flex-1 bg-elec-yellow text-background hover:bg-elec-yellow/90"
      >
        <ExternalLink className="h-4 w-4 mr-2" />
        View PDF
      </Button>

      <Button
        onClick={handleDownloadPDF}
        variant="outline"
        size="sm"
        className="flex-1 border-elec-yellow/50 text-elec-yellow hover:bg-elec-yellow/10"
      >
        <Download className="h-4 w-4 mr-2" />
        Download
      </Button>

      <Button
        onClick={handlePrintPDF}
        variant="outline"
        size="sm"
        className="flex-1 border-elec-yellow/50 text-elec-yellow hover:bg-elec-yellow/10"
      >
        <Printer className="h-4 w-4 mr-2" />
        Print
      </Button>
    </div>
  );
};
