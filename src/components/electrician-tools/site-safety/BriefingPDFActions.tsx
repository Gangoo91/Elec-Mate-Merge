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
  const [polling, setPolling] = useState(false);
  const [pollAttempts, setPollAttempts] = useState(0);

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

  // Check URL validity on mount (only run once, not on pdfUrl changes)
  useEffect(() => {
    const checkUrl = async () => {
      if (pdfUrl && !generating && !polling) {
        // Add 2 second delay to allow AWS S3 URL to propagate
        await new Promise(resolve => setTimeout(resolve, 2000));
        const isValid = await validatePdfUrl(pdfUrl);
        if (!isValid) {
          console.log('[PDF-URL] URL invalid or expired, clearing state');
          setPdfUrl("");
        }
      }
    };
    checkUrl();
  }, []); // Only run on mount

  // Client-side polling for long-running PDF generation
  const pollDocumentStatus = async (documentId: string, maxAttempts = 20): Promise<any> => {
    console.log('[PDF-POLL] Starting client-side polling for documentId:', documentId);
    
    for (let i = 0; i < maxAttempts; i++) {
      setPollAttempts(i + 1);
      await new Promise(resolve => setTimeout(resolve, 3000)); // 3 seconds between polls
      
      console.log(`[PDF-POLL] Attempt ${i + 1}/${maxAttempts}`);
      
      const { data, error } = await supabase.functions.invoke('generate-pdf-monkey', {
        body: { documentId, mode: 'status' }
      });
      
      if (error) {
        console.error('[PDF-POLL] Error checking status:', error);
        throw error;
      }
      
      console.log('[PDF-POLL] Status response:', data);
      
      if (data.success && data.downloadUrl) {
        console.log('[PDF-POLL] PDF ready!');
        return data;
      }
      
      if (data.status === 'failure') {
        throw new Error('PDF generation failed on server');
      }
    }
    
    throw new Error('PDF generation timed out after 60 seconds of polling');
  };

  const handleGeneratePDF = async () => {
    setGenerating(true);
    setPollAttempts(0);
    
    try {
      console.log('[BRIEFING-PDF] Starting PDF generation for briefing:', briefing.id);

      const { data, error } = await supabase.functions.invoke('generate-pdf-monkey', {
        body: {
          briefing: briefing,
          companyProfile: companyProfile,
          briefing_mode: true
        }
      });

      if (error) throw error;

      // Case A: Success - PDF ready immediately (< 60 seconds)
      if (data.success && data.downloadUrl) {
        console.log('[BRIEFING-PDF] PDF generated successfully');
        setPdfUrl(data.downloadUrl);
        
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
        return;
      }
      
      // Case B: Timeout - PDF still generating (60-120 seconds)
      if (!data.success && data.documentId) {
        console.log('[BRIEFING-PDF] Edge function timed out, starting client-side polling');
        
        toast({
          title: "PDF Generation in Progress",
          description: "This is taking longer than expected. Please wait...",
        });
        
        setPolling(true);
        const polledData = await pollDocumentStatus(data.documentId);
        setPolling(false);
        
        if (polledData.downloadUrl) {
          console.log('[BRIEFING-PDF] PDF ready after polling');
          setPdfUrl(polledData.downloadUrl);
          
          await supabase
            .from('team_briefings')
            .update({
              pdf_url: polledData.downloadUrl,
              pdf_document_id: polledData.documentId,
              pdf_generated_at: new Date().toISOString()
            })
            .eq('id', briefing.id);

          toast({
            title: "PDF Generated",
            description: "Your briefing PDF is ready to view or download.",
          });
          return;
        }
      }
      
      // Case C: Failure
      throw new Error(data.message || 'PDF generation failed');
      
    } catch (error: any) {
      console.error('[BRIEFING-PDF] Generation error:', error);
      
      let errorMessage = "Failed to generate PDF. Please try again.";
      
      if (error.message.includes('timed out')) {
        errorMessage = "PDF generation is taking unusually long. Please try again later.";
      } else if (error.message.includes('network') || error.message.includes('fetch')) {
        errorMessage = "Network error occurred. Please check your connection.";
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      toast({
        title: "PDF Generation Failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setGenerating(false);
      setPolling(false);
      setPollAttempts(0);
    }
  };

  const handleViewPDF = async () => {
    if (!pdfUrl) return;
    
    // Check expiry first (lightweight check)
    if (isUrlExpired(pdfUrl)) {
      toast({
        title: "PDF Expired",
        description: "Regenerating your PDF...",
      });
      await handleGeneratePDF();
      return;
    }
    
    // Directly open PDF - don't validate with HEAD request (causes CORS issues)
    window.open(pdfUrl, '_blank');
  };

  const handleDownloadPDF = async () => {
    if (!pdfUrl) return;
    
    // Check expiry first (lightweight check)
    if (isUrlExpired(pdfUrl)) {
      toast({
        title: "PDF Expired",
        description: "Regenerating your PDF...",
      });
      await handleGeneratePDF();
      return;
    }

    setValidating(true);
    try {
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
      
      // If download fails, might be expired - try regenerating
      if (error.message.includes('fetch')) {
        toast({
          title: "PDF Expired",
          description: "Regenerating your PDF...",
        });
        await handleGeneratePDF();
      } else {
        toast({
          title: "Download Failed",
          description: "Please try again or regenerate the PDF.",
          variant: "destructive",
        });
      }
    } finally {
      setValidating(false);
    }
  };

  const handlePrintPDF = async () => {
    if (!pdfUrl) return;
    
    // Check expiry first (lightweight check)
    if (isUrlExpired(pdfUrl)) {
      toast({
        title: "PDF Expired",
        description: "Regenerating your PDF...",
      });
      await handleGeneratePDF();
      return;
    }
    
    setValidating(true);
    try {
      const iframe = document.createElement('iframe');
      iframe.style.display = 'none';
      iframe.src = pdfUrl;
      document.body.appendChild(iframe);
      iframe.onload = () => {
        iframe.contentWindow?.print();
      };
      
      // Clean up after 1 minute
      setTimeout(() => {
        document.body.removeChild(iframe);
      }, 60000);
    } catch (error: any) {
      console.error('[PDF-PRINT] Error:', error);
      toast({
        title: "Print Failed",
        description: "Please try again or regenerate the PDF.",
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
        className="w-full h-11 touch-manipulation border-elec-yellow/50 text-elec-yellow hover:bg-elec-yellow hover:text-background"
      >
        <FileText className="h-4 w-4 mr-2" />
        Generate PDF
      </Button>
    );
  }

  if (generating || polling) {
    return (
      <Button disabled className="w-full h-11 touch-manipulation">
        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
        {polling 
          ? `Still generating... (${pollAttempts * 3}s)` 
          : 'Generating PDF...'}
      </Button>
    );
  }

  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="flex flex-col sm:flex-row gap-2">
        <Button
          onClick={handleViewPDF}
          disabled={validating || generating}
          className="flex-1 h-11 touch-manipulation bg-elec-yellow text-background hover:bg-elec-yellow/90"
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
          disabled={validating || generating}
          className="flex-1 h-11 touch-manipulation border-elec-yellow/50 text-elec-yellow hover:bg-elec-yellow/10"
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
          disabled={validating || generating}
          className="flex-1 h-11 touch-manipulation border-elec-yellow/50 text-elec-yellow hover:bg-elec-yellow/10"
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
        disabled={generating || validating}
        className="w-full h-11 touch-manipulation text-xs text-elec-light/60 hover:text-elec-yellow"
      >
        <RefreshCw className="h-3 w-3 mr-1" />
        Regenerate PDF
      </Button>
    </div>
  );
};
