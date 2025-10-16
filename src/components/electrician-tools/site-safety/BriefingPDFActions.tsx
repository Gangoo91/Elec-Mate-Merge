import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { FileText, Download, Printer, Loader2, ExternalLink, RefreshCw } from "lucide-react";

interface BriefingPDFActionsProps {
  briefing: any;
  companyProfile?: any;
}

export const BriefingPDFActions = ({ briefing, companyProfile }: BriefingPDFActionsProps) => {
  const { toast } = useToast();
  const [generating, setGenerating] = useState(false);
  const [validating, setValidating] = useState(false);
  const [pdfUrl, setPdfUrl] = useState(briefing.pdf_url || "");

  // Check if AWS S3 URL is expired or about to expire
  const isUrlExpired = (url: string): boolean => {
    if (!url) return true;
    try {
      const urlObj = new URL(url);
      const expiresParam = urlObj.searchParams.get('X-Amz-Expires');
      const dateParam = urlObj.searchParams.get('X-Amz-Date');
      
      if (expiresParam && dateParam) {
        const expirySeconds = parseInt(expiresParam);
        const startDate = new Date(
          dateParam.replace(/(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})Z/, '$1-$2-$3T$4:$5:$6Z')
        );
        const expiryDate = new Date(startDate.getTime() + expirySeconds * 1000);
        const now = new Date();
        const fiveMinutesFromNow = new Date(now.getTime() + 5 * 60 * 1000);
        
        const isExpired = expiryDate < fiveMinutesFromNow;
        console.log('[PDF-URL] Expiry check:', { expiryDate, fiveMinutesFromNow, isExpired });
        
        // Regenerate if expired or expiring within 5 minutes
        return isExpired;
      }
    } catch (error) {
      console.error('[PDF-URL] Error parsing URL:', error);
      return true;
    }
    return false;
  };

  // Validate if PDF URL is still accessible
  const validatePdfUrl = async (url: string): Promise<boolean> => {
    if (!url || isUrlExpired(url)) {
      return false;
    }
    
    try {
      const response = await fetch(url, { method: 'HEAD' });
      return response.ok;
    } catch (error) {
      console.error('[PDF-URL] Validation failed:', error);
      return false;
    }
  };

  // Check URL validity on mount
  useEffect(() => {
    const checkUrl = async () => {
      if (pdfUrl) {
        const isValid = await validatePdfUrl(pdfUrl);
        if (!isValid) {
          console.log('[PDF-URL] URL invalid or expired, clearing state');
          setPdfUrl("");
        }
      }
    };
    checkUrl();
  }, [pdfUrl]);

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

  const handleViewPDF = async () => {
    if (!pdfUrl) return;
    
    setValidating(true);
    try {
      const isValid = await validatePdfUrl(pdfUrl);
      
      if (!isValid) {
        toast({
          title: "PDF Expired",
          description: "Regenerating your PDF...",
        });
        await handleGeneratePDF();
        return;
      }
      
      window.open(pdfUrl, '_blank');
    } catch (error: any) {
      toast({
        title: "Failed to Open PDF",
        description: error.message || "Please try regenerating the PDF.",
        variant: "destructive",
      });
    } finally {
      setValidating(false);
    }
  };

  const handleDownloadPDF = async () => {
    if (!pdfUrl) return;
    
    setValidating(true);
    try {
      const isValid = await validatePdfUrl(pdfUrl);
      
      if (!isValid) {
        toast({
          title: "PDF Expired",
          description: "Regenerating your PDF...",
        });
        await handleGeneratePDF();
        return;
      }

      // Fetch PDF as blob to bypass CORS issues
      const response = await fetch(pdfUrl);
      if (!response.ok) throw new Error('Failed to fetch PDF');
      
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = `Briefing-${briefing.job_name || briefing.briefing_name}-${new Date(briefing.briefing_date).toISOString().split('T')[0]}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Clean up blob URL
      setTimeout(() => URL.revokeObjectURL(blobUrl), 100);
      
      toast({
        title: "PDF Downloaded",
        description: "Your briefing PDF has been downloaded.",
      });
    } catch (error: any) {
      console.error('[PDF-DOWNLOAD] Error:', error);
      toast({
        title: "Download Failed",
        description: error.message || "Please try regenerating the PDF.",
        variant: "destructive",
      });
    } finally {
      setValidating(false);
    }
  };

  const handlePrintPDF = async () => {
    if (!pdfUrl) return;
    
    setValidating(true);
    try {
      const isValid = await validatePdfUrl(pdfUrl);
      
      if (!isValid) {
        toast({
          title: "PDF Expired",
          description: "Regenerating your PDF...",
        });
        await handleGeneratePDF();
        return;
      }
      
      const iframe = document.createElement('iframe');
      iframe.style.display = 'none';
      iframe.src = pdfUrl;
      document.body.appendChild(iframe);
      iframe.onload = () => {
        iframe.contentWindow?.print();
      };
    } catch (error: any) {
      toast({
        title: "Print Failed",
        description: error.message || "Please try regenerating the PDF.",
        variant: "destructive",
      });
    } finally {
      setValidating(false);
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
    <div className="flex flex-col gap-2 w-full">
      <div className="flex flex-col sm:flex-row gap-2">
        <Button
          onClick={handleViewPDF}
          size="sm"
          disabled={validating || generating}
          className="flex-1 bg-elec-yellow text-background hover:bg-elec-yellow/90"
        >
          {validating ? (
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          ) : (
            <ExternalLink className="h-4 w-4 mr-2" />
          )}
          View PDF
        </Button>

        <Button
          onClick={handleDownloadPDF}
          variant="outline"
          size="sm"
          disabled={validating || generating}
          className="flex-1 border-elec-yellow/50 text-elec-yellow hover:bg-elec-yellow/10"
        >
          {validating ? (
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          ) : (
            <Download className="h-4 w-4 mr-2" />
          )}
          Download
        </Button>

        <Button
          onClick={handlePrintPDF}
          variant="outline"
          size="sm"
          disabled={validating || generating}
          className="flex-1 border-elec-yellow/50 text-elec-yellow hover:bg-elec-yellow/10"
        >
          {validating ? (
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          ) : (
            <Printer className="h-4 w-4 mr-2" />
          )}
          Print
        </Button>
      </div>
      
      <Button
        onClick={handleGeneratePDF}
        variant="ghost"
        size="sm"
        disabled={generating || validating}
        className="w-full text-xs text-elec-light/60 hover:text-elec-yellow"
      >
        <RefreshCw className="h-3 w-3 mr-1" />
        Regenerate PDF
      </Button>
    </div>
  );
};
