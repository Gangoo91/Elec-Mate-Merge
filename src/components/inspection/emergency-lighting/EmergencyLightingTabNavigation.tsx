import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Loader2 } from 'lucide-react';
import { EmergencyLightingFormData } from '@/types/emergency-lighting';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { createInvoiceFromCertificate } from '@/utils/certificateToQuote';

interface EmergencyLightingTabNavigationProps {
  currentTab: string;
  currentTabIndex: number;
  totalTabs: number;
  canNavigateNext: boolean;
  canNavigatePrevious: boolean;
  navigateNext: () => void;
  navigatePrevious: () => void;
  getProgressPercentage: () => number;
  isCurrentTabComplete: boolean;
  onGenerateCertificate?: () => void;
  canGenerateCertificate?: boolean;
  reportId?: string | null;
  formData?: EmergencyLightingFormData & { pdfUrl?: string };
}

const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

const EmergencyLightingTabNavigation: React.FC<EmergencyLightingTabNavigationProps> = ({
  currentTabIndex,
  totalTabs,
  canNavigateNext,
  canNavigatePrevious,
  navigateNext,
  navigatePrevious,
  getProgressPercentage,
  onGenerateCertificate,
  canGenerateCertificate = true,
  reportId,
  formData,
}) => {
  const navigate = useNavigate();
  const progress = getProgressPercentage();
  const isLastTab = currentTabIndex === totalTabs - 1;

  const [showEmailDialog, setShowEmailDialog] = useState(false);
  const [emailRecipient, setEmailRecipient] = useState('');
  const [isSendingEmail, setIsSendingEmail] = useState(false);

  const handleNext = () => {
    navigateNext();
    scrollToTop();
  };
  const handlePrevious = () => {
    navigatePrevious();
    scrollToTop();
  };

  const handleEmailCertificate = () => {
    if (!reportId) {
      toast.error('Please save the certificate first.');
      return;
    }
    if (formData?.clientEmail) setEmailRecipient(formData.clientEmail);
    setShowEmailDialog(true);
  };

  const handleSendEmail = async () => {
    if (!emailRecipient || !emailRecipient.includes('@')) {
      toast.error('Enter a valid email.');
      return;
    }
    setIsSendingEmail(true);
    try {
      const { data: result, error: fnError } = await supabase.functions.invoke(
        'send-certificate-resend',
        { body: { reportId, recipientEmail: emailRecipient } }
      );
      if (fnError) {
        try {
          const p = JSON.parse(fnError.message);
          throw new Error(p.error || p.message || fnError.message);
        } catch {
          throw new Error(fnError.message);
        }
      }
      if (!result?.success) throw new Error(result?.error || 'Failed to send');
      toast.success(`Certificate sent to ${emailRecipient}`);
      setShowEmailDialog(false);
      setEmailRecipient('');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to send.');
    } finally {
      setIsSendingEmail(false);
    }
  };

  const handleCreateInvoice = () => {
    if (!formData) return;
    const url = createInvoiceFromCertificate({
      clientName: formData.clientName || '',
      clientEmail: formData.clientEmail || '',
      clientPhone: formData.clientTelephone || '',
      clientAddress: formData.clientAddress || '',
      installationAddress: formData.premisesAddress || '',
      certificateType: 'Emergency Lighting',
      certificateReference: formData.certificateNumber || '',
      reportId: reportId || undefined,
      pdfUrl: formData.pdfUrl || undefined,
    });
    navigate(url);
  };

  return (
    <>
      <div className="sticky bottom-0 left-0 right-0 bg-background/95 backdrop-blur-md border-t border-white/[0.08] p-4">
        {/* Progress bar */}
        <div className="mb-3">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[10px] text-white">
              Section {currentTabIndex + 1} of {totalTabs}
            </span>
            <span className="text-[10px] font-medium text-white">{progress}%</span>
          </div>
          <div className="h-1 bg-white/[0.12] rounded-full overflow-hidden">
            <div
              className="h-full bg-elec-yellow rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Navigation */}
        {isLastTab ? (
          <div className="space-y-2">
            <Button
              onClick={onGenerateCertificate}
              disabled={!canGenerateCertificate}
              className="w-full h-11 bg-elec-yellow/20 border border-elec-yellow/40 text-elec-yellow hover:bg-elec-yellow/30 text-xs font-semibold touch-manipulation active:scale-[0.98] rounded-lg"
            >
              Generate Certificate
            </Button>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={!canNavigatePrevious}
                className="flex-1 h-11 border-white/[0.12] text-white hover:bg-white/[0.06] text-xs font-semibold touch-manipulation active:scale-[0.98] rounded-lg"
              >
                Previous
              </Button>
              <Button
                variant="outline"
                onClick={handleEmailCertificate}
                className="flex-1 h-11 border-white/[0.12] text-white hover:bg-white/[0.06] text-xs font-semibold touch-manipulation active:scale-[0.98] rounded-lg"
              >
                Email
              </Button>
              <Button
                variant="outline"
                onClick={handleCreateInvoice}
                className="flex-1 h-11 border-white/[0.12] text-white hover:bg-white/[0.06] text-xs font-semibold touch-manipulation active:scale-[0.98] rounded-lg"
              >
                Invoice
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={!canNavigatePrevious}
              className="flex-1 h-11 border-white/[0.12] text-white hover:bg-white/[0.06] text-xs font-semibold touch-manipulation active:scale-[0.98] rounded-lg"
            >
              Previous
            </Button>
            <Button
              onClick={handleNext}
              disabled={!canNavigateNext}
              className="flex-1 h-11 bg-elec-yellow/20 border border-elec-yellow/40 text-elec-yellow hover:bg-elec-yellow/30 text-xs font-semibold touch-manipulation active:scale-[0.98] rounded-lg"
            >
              Next
            </Button>
          </div>
        )}
      </div>

      {/* Email Dialog */}
      <Dialog open={showEmailDialog} onOpenChange={setShowEmailDialog}>
        <DialogContent className="bg-[#1a1a1e] border-white/[0.08] text-white">
          <DialogHeader>
            <DialogTitle className="text-white">Email Certificate</DialogTitle>
            <DialogDescription className="text-white/70">
              The certificate will be generated and sent as a PDF attachment.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3 py-2">
            <Input
              type="email"
              placeholder="client@example.com"
              value={emailRecipient}
              onChange={(e) => setEmailRecipient(e.target.value)}
              disabled={isSendingEmail}
              className="h-11 text-base bg-white/[0.06] border-white/[0.08] text-white touch-manipulation"
            />
            {formData?.clientEmail && emailRecipient !== formData.clientEmail && (
              <button
                onClick={() => setEmailRecipient(formData.clientEmail)}
                className="w-full h-11 rounded-lg bg-white/[0.04] border border-white/[0.08] text-xs text-white touch-manipulation active:scale-[0.98]"
              >
                Use: {formData.clientEmail}
              </button>
            )}
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowEmailDialog(false)}
              disabled={isSendingEmail}
              className="border-white/[0.12] text-white h-11"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSendEmail}
              disabled={isSendingEmail || !emailRecipient}
              className="bg-elec-yellow/20 border border-elec-yellow/40 text-elec-yellow h-11"
            >
              {isSendingEmail ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Sending...
                </>
              ) : (
                'Send'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EmergencyLightingTabNavigation;
