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
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { createInvoiceFromCertificate } from '@/utils/certificateToQuote';

interface EVChargingTabNavigationProps {
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
  formData?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  whatsApp?: any;
}

const EVChargingTabNavigation: React.FC<EVChargingTabNavigationProps> = ({
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

  // Email dialog state
  const [showEmailDialog, setShowEmailDialog] = useState(false);
  const [emailRecipient, setEmailRecipient] = useState('');
  const [isSendingEmail, setIsSendingEmail] = useState(false);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const handleNavigateNext = () => { navigateNext(); scrollToTop(); };
  const handleNavigatePrevious = () => { navigatePrevious(); scrollToTop(); };

  const handleEmailCertificate = () => {
    if (!reportId) {
      toast.error('Please save the certificate first before emailing.');
      return;
    }
    if (formData?.clientEmail) setEmailRecipient(formData.clientEmail);
    setShowEmailDialog(true);
  };

  const handleSendEmail = async () => {
    if (!emailRecipient || !emailRecipient.includes('@')) {
      toast.error('Please enter a valid email address.');
      return;
    }
    setIsSendingEmail(true);
    try {
      const { data: result, error: fnError } = await supabase.functions.invoke(
        'send-certificate-resend',
        { body: { reportId, recipientEmail: emailRecipient } }
      );
      if (fnError) {
        let errorMessage = fnError.message;
        try { const parsed = JSON.parse(fnError.message); errorMessage = parsed.error || parsed.message || fnError.message; } catch { /* keep */ }
        throw new Error(errorMessage);
      }
      if (!result?.success) throw new Error(result?.error || 'Failed to send');
      toast.success(`Certificate sent to ${emailRecipient}`);
      setShowEmailDialog(false);
      setEmailRecipient('');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to send certificate email.');
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
      installationAddress: formData.installationAddress || '',
      certificateType: 'EV Charging',
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
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] text-white">
              {currentTabIndex + 1}/{totalTabs}
            </span>
            <span className="text-[10px] font-medium text-white">{progress}%</span>
          </div>
          <div className="h-1 bg-white/[0.12] rounded-full overflow-hidden">
            <div
              className="h-full bg-elec-yellow transition-all duration-300 rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {isLastTab ? (
          <div className="space-y-2">
            {/* Generate Certificate */}
            <Button
              onClick={onGenerateCertificate}
              disabled={!canGenerateCertificate}
              className="w-full h-11 text-xs font-semibold touch-manipulation active:scale-[0.98] rounded-lg bg-elec-yellow/20 border border-elec-yellow/40 text-elec-yellow"
            >
              Generate Certificate
            </Button>

            {/* Action row: Email + Invoice + Previous */}
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={handleNavigatePrevious}
                disabled={!canNavigatePrevious}
                className="flex-1 h-11 text-xs font-semibold touch-manipulation active:scale-[0.98] rounded-lg border-white/[0.12] text-white"
              >
                Previous
              </Button>
              <button
                onClick={handleEmailCertificate}
                className="h-11 px-4 rounded-lg bg-white/[0.04] border border-white/[0.08] text-xs font-medium text-white hover:bg-white/[0.08] touch-manipulation active:scale-[0.98] transition-all"
              >
                Email
              </button>
              <button
                onClick={handleCreateInvoice}
                className="h-11 px-4 rounded-lg bg-white/[0.04] border border-white/[0.08] text-xs font-medium text-white hover:bg-white/[0.08] touch-manipulation active:scale-[0.98] transition-all"
              >
                Invoice
              </button>
            </div>
          </div>
        ) : (
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={handleNavigatePrevious}
              disabled={!canNavigatePrevious}
              className="flex-1 h-11 text-xs font-semibold touch-manipulation active:scale-[0.98] rounded-lg border-white/[0.12] text-white"
            >
              Previous
            </Button>
            <Button
              onClick={handleNavigateNext}
              disabled={!canNavigateNext}
              className="flex-1 h-11 text-xs font-semibold touch-manipulation active:scale-[0.98] rounded-lg bg-elec-yellow/20 border border-elec-yellow/40 text-elec-yellow"
            >
              Next
            </Button>
          </div>
        )}
      </div>

      {/* Email Dialog */}
      <Dialog open={showEmailDialog} onOpenChange={setShowEmailDialog}>
        <DialogContent className="max-w-[90vw] sm:max-w-md bg-[#111114] border border-white/[0.08] rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-white text-base font-bold">Email Certificate</DialogTitle>
            <DialogDescription className="text-white text-sm">
              Enter the recipient's email address.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3 py-3">
            <div>
              <label htmlFor="ev-email" className="text-white text-xs mb-1.5 block">
                Recipient Email
              </label>
              <Input
                id="ev-email"
                type="email"
                placeholder="client@example.com"
                value={emailRecipient}
                onChange={(e) => setEmailRecipient(e.target.value)}
                disabled={isSendingEmail}
                className="h-11 text-base touch-manipulation bg-white/[0.06] border-white/[0.08] text-white"
              />
            </div>
            {formData?.clientEmail && emailRecipient !== formData.clientEmail && (
              <button
                onClick={() => setEmailRecipient(formData.clientEmail)}
                className="w-full h-11 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white text-xs font-medium hover:bg-white/[0.08] touch-manipulation active:scale-[0.98] transition-all"
              >
                Use Client Email: {formData.clientEmail}
              </button>
            )}
          </div>
          <DialogFooter className="flex-col gap-2 sm:flex-col">
            <Button
              onClick={handleSendEmail}
              disabled={isSendingEmail || !emailRecipient}
              className="w-full h-11 rounded-xl bg-elec-yellow/15 border border-elec-yellow/25 text-elec-yellow font-medium hover:bg-elec-yellow/25 active:scale-[0.98] transition-all touch-manipulation"
            >
              {isSendingEmail ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" />Sending...</> : 'Send Certificate'}
            </Button>
            <Button
              variant="outline"
              onClick={() => setShowEmailDialog(false)}
              disabled={isSendingEmail}
              className="w-full h-11 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white font-medium hover:bg-white/[0.08] active:scale-[0.98] transition-all touch-manipulation"
            >
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EVChargingTabNavigation;
