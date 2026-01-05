import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { FileText, Mail, Loader2 } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { formatEICRJson } from '@/utils/eicrJsonFormatter';

interface DefectObservation {
  id: string;
  item: string;
  defectCode: 'C1' | 'C2' | 'C3' | 'FI' | 'N/A' | 'LIM';
  description: string;
  recommendation: string;
  rectified: boolean;
  inspectionItemId?: string;
}

interface EICRObservationsActionsProps {
  defectObservations: DefectObservation[];
  formData?: any;
  reportId?: string;
  onExportCompleteEICR: () => void;
  hasUnsavedChanges?: boolean;
}

const EICRObservationsActions = ({
  formData,
  reportId,
  onExportCompleteEICR,
  hasUnsavedChanges = false
}: EICRObservationsActionsProps) => {
  const { toast } = useToast();
  const [showEmailDialog, setShowEmailDialog] = useState(false);
  const [emailRecipient, setEmailRecipient] = useState('');
  const [isSendingEmail, setIsSendingEmail] = useState(false);

  const handleEmailCertificate = () => {
    if (formData?.clientEmail) {
      setEmailRecipient(formData.clientEmail);
    }
    setShowEmailDialog(true);
  };

  const handleSendEmail = async () => {
    if (!emailRecipient || !emailRecipient.includes('@')) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    setIsSendingEmail(true);

    try {
      
      // Generate a report ID if not provided
      const reportIdToUse = reportId || `EICR-${Date.now()}`;
      
      // Format the data properly before sending to edge function
      const formattedData = await formatEICRJson(formData, reportIdToUse);
      
      // Create a timeout promise (20 seconds)
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('TIMEOUT')), 20000)
      );

      // Race between the cloud generation and timeout
      const invokePromise = supabase.functions.invoke('generate-eicr-pdf', {
        body: { formData: formattedData }
      });

      const { data: pdfResult, error: pdfError } = await Promise.race([
        invokePromise,
        timeoutPromise
      ]) as any;
      
      // Check for various error conditions
      if (pdfError) {
        const status = pdfError.status || pdfError.code;
        if (status === 413) {
          throw new Error('PAYLOAD_TOO_LARGE');
        } else if (status === 429) {
          throw new Error('RATE_LIMIT');
        } else if (status === 401 || status === 403) {
          throw new Error('AUTH_ERROR');
        } else if (status >= 500) {
          throw new Error('SERVICE_ERROR');
        }
        throw new Error(pdfError.message || 'Failed to generate PDF');
      }

      if (!pdfResult?.success || !pdfResult?.pdfUrl) {
        throw new Error('NO_PDF_URL');
      }


      toast({
        title: "Certificate Generated Successfully", 
        description: "EICR certificate PDF has been generated",
      });

      setShowEmailDialog(false);
      setEmailRecipient('');

    } catch (error) {
      
      // Determine the specific error and provide appropriate fallback messaging
      const errorMessage = error instanceof Error ? error.message : 'UNKNOWN';
      
      if (errorMessage === 'TIMEOUT' || errorMessage === 'SERVICE_ERROR' || errorMessage === 'NO_PDF_URL') {
        toast({
          title: "Cloud Generator Unavailable",
          description: "Falling back to local export. You can still send this to your client.",
        });
        // Trigger local export fallback
        setShowEmailDialog(false);
        onExportCompleteEICR();
      } else if (errorMessage === 'PAYLOAD_TOO_LARGE') {
        toast({
          title: "Payload Too Large",
          description: "The certificate contains large images. Using local export instead.",
        });
        setShowEmailDialog(false);
        onExportCompleteEICR();
      } else if (errorMessage === 'RATE_LIMIT') {
        toast({
          title: "Rate Limit Reached",
          description: "Too many requests. Please try again in a moment or use local export.",
          variant: "destructive",
        });
      } else if (errorMessage === 'AUTH_ERROR') {
        toast({
          title: "Authentication Error",
          description: "Please sign in again and retry.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "PDF Generation Failed",
          description: "Falling back to local export.",
        });
        setShowEmailDialog(false);
        onExportCompleteEICR();
      }
    } finally {
      setIsSendingEmail(false);
    }
  };

  return (
    <>
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div className="flex flex-col gap-2">
        <p className="text-sm text-muted-foreground leading-relaxed">
          Observations are automatically populated from your inspection checklist. 
          Export when ready for professional BS7671 compliant documentation.
        </p>
        <p className="text-xs text-muted-foreground font-medium">
          {hasUnsavedChanges ? 'Auto-saving changes...' : 'All changes saved'}
        </p>
      </div>
      
      <div className="flex gap-2">
        <Button 
          onClick={handleEmailCertificate} 
          variant="outline"
          className="min-h-[44px] px-6 font-medium" 
          size="lg"
          data-email-eicr
        >
          <Mail className="h-4 w-4 mr-2" />
          Email EICR
        </Button>
        <Button 
          onClick={onExportCompleteEICR} 
          className="min-h-[44px] px-6 bg-elec-blue text-foreground hover:bg-elec-blue/90 font-medium" 
          size="lg"
        >
          <FileText className="h-4 w-4 mr-2" />
          Export Complete EICR
        </Button>
      </div>
    </div>

    <Dialog open={showEmailDialog} onOpenChange={setShowEmailDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Email EICR Certificate</DialogTitle>
          <DialogDescription>
            Enter the recipient's email address to send the EICR certificate.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">
              Recipient Email
            </label>
            <Input
              id="email"
              type="email"
              placeholder="client@example.com"
              value={emailRecipient}
              onChange={(e) => setEmailRecipient(e.target.value)}
              disabled={isSendingEmail}
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setShowEmailDialog(false)}
            disabled={isSendingEmail}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSendEmail}
            disabled={isSendingEmail}
          >
            {isSendingEmail && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Send Email
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
    </>
  );
};

export default EICRObservationsActions;