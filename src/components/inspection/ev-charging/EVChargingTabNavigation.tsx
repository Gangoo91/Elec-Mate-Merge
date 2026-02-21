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
import {
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  MessageCircle,
  Mail,
  PoundSterling,
  Loader2,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
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
  whatsApp?: {
    type: string;
    id: string;
    recipientPhone: string;
    recipientName: string;
    documentLabel: string;
  };
  // Email & Invoice props
  reportId?: string | null;
  formData?: any;
}

const EVChargingTabNavigation: React.FC<EVChargingTabNavigationProps> = ({
  currentTab,
  currentTabIndex,
  totalTabs,
  canNavigateNext,
  canNavigatePrevious,
  navigateNext,
  navigatePrevious,
  getProgressPercentage,
  isCurrentTabComplete,
  onGenerateCertificate,
  canGenerateCertificate = true,
  whatsApp,
  reportId,
  formData,
}) => {
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const progress = getProgressPercentage();
  const isLastTab = currentTabIndex === totalTabs - 1;

  // Email dialog state
  const [showEmailDialog, setShowEmailDialog] = useState(false);
  const [emailRecipient, setEmailRecipient] = useState('');
  const [isSendingEmail, setIsSendingEmail] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateNext = () => {
    navigateNext();
    scrollToTop();
  };

  const handleNavigatePrevious = () => {
    navigatePrevious();
    scrollToTop();
  };

  const handleEmailCertificate = () => {
    if (!reportId) {
      toast.error('Please save the certificate first before emailing.');
      return;
    }
    if (formData?.clientEmail) {
      setEmailRecipient(formData.clientEmail);
    }
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
        {
          body: {
            reportId: reportId,
            recipientEmail: emailRecipient,
          },
        }
      );

      if (fnError) {
        let errorMessage = fnError.message;
        try {
          const parsed = JSON.parse(fnError.message);
          errorMessage = parsed.error || parsed.message || fnError.message;
        } catch {
          // Keep original message
        }
        throw new Error(errorMessage);
      }

      if (!result?.success) {
        throw new Error(result?.error || 'Failed to send certificate email');
      }

      toast.success(`Certificate sent to ${emailRecipient}`);
      setShowEmailDialog(false);
      setEmailRecipient('');
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : 'Failed to send certificate email.'
      );
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
      <div
        className={cn(
          'sticky bottom-0 left-0 right-0 bg-[#242428] border-t border-border',
          isMobile ? 'p-3 mt-2' : 'p-4 sm:p-6 mt-6'
        )}
      >
        <div className={cn(isMobile ? '' : 'max-w-6xl mx-auto')}>
          {/* Progress bar */}
          <div className="mb-3">
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm text-white">
                Section {currentTabIndex + 1} of {totalTabs}
              </span>
              <span className="text-sm font-medium text-foreground">{progress}% complete</span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-green-500 transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Navigation buttons */}
          <div className="flex items-center justify-between gap-3">
            <Button
              variant="outline"
              onClick={handleNavigatePrevious}
              disabled={!canNavigatePrevious}
              className="h-12 px-6 touch-manipulation active:scale-[0.98] transition-transform"
            >
              <ChevronLeft className="h-5 w-5 mr-2" />
              Previous
            </Button>

            <div className="flex items-center gap-2">
              {isCurrentTabComplete && (
                <div className="flex items-center gap-1 text-green-500 text-sm">
                  <CheckCircle2 className="h-4 w-4" />
                  <span className="hidden sm:inline">Section complete</span>
                </div>
              )}
            </div>

            {isLastTab ? (
              <div className="flex items-center gap-2 flex-wrap justify-end">
                {/* Email */}
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleEmailCertificate}
                  className="h-11 w-11 touch-manipulation border-blue-500/30 text-blue-400 hover:bg-blue-500/10 active:scale-[0.98] transition-transform"
                  aria-label="Email certificate"
                >
                  <Mail className="h-5 w-5" />
                </Button>

                {/* Invoice */}
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleCreateInvoice}
                  className="h-11 w-11 touch-manipulation bg-emerald-500/10 border-emerald-500/30 hover:bg-emerald-500/20 text-emerald-400 active:scale-[0.98] transition-transform"
                  aria-label="Create invoice"
                >
                  <PoundSterling className="h-5 w-5" />
                </Button>

                {/* WhatsApp */}
                {whatsApp && (
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => {
                      const phone = whatsApp.recipientPhone.replace(/\D/g, '');
                      const ukPhone = phone.startsWith('0') ? `44${phone.slice(1)}` : phone;
                      const message = encodeURIComponent(
                        `Hi ${whatsApp.recipientName}, your ${whatsApp.documentLabel} is ready. I'll send the PDF shortly.`
                      );
                      window.open(`https://wa.me/${ukPhone}?text=${message}`, '_blank');
                    }}
                    className="h-11 w-11 touch-manipulation border-green-500/30 text-green-400 hover:bg-green-500/10 active:scale-[0.98] transition-transform"
                    aria-label="Share via WhatsApp"
                  >
                    <MessageCircle className="h-5 w-5" />
                  </Button>
                )}

                {/* Generate */}
                <Button
                  onClick={onGenerateCertificate}
                  disabled={!canGenerateCertificate}
                  className={cn(
                    'touch-manipulation bg-green-600 hover:bg-green-700 active:scale-[0.98] transition-transform',
                    isMobile ? 'flex-1 h-11' : 'h-12 px-6'
                  )}
                >
                  Generate Certificate
                </Button>
              </div>
            ) : (
              <Button
                onClick={handleNavigateNext}
                disabled={!canNavigateNext}
                className={cn(
                  'touch-manipulation active:scale-[0.98] transition-transform',
                  isMobile ? 'h-11 px-4' : 'h-12 px-6'
                )}
              >
                Next
                <ChevronRight className="h-5 w-5 ml-2" />
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Email Dialog */}
      <Dialog open={showEmailDialog} onOpenChange={setShowEmailDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Email EV Charging Certificate</DialogTitle>
            <DialogDescription>
              Enter the recipient's email address. The certificate will be generated and sent as a
              PDF attachment.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label htmlFor="ev-email" className="text-sm font-medium">
                Recipient Email
              </label>
              <Input
                id="ev-email"
                type="email"
                placeholder="client@example.com"
                value={emailRecipient}
                onChange={(e) => setEmailRecipient(e.target.value)}
                disabled={isSendingEmail}
                className="h-11 text-base touch-manipulation"
              />
            </div>
            {formData?.clientEmail && emailRecipient !== formData.clientEmail && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setEmailRecipient(formData.clientEmail)}
                className="w-full touch-manipulation h-11"
              >
                Use Client Email: {formData.clientEmail}
              </Button>
            )}
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowEmailDialog(false)}
              disabled={isSendingEmail}
              className="touch-manipulation h-11"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSendEmail}
              disabled={isSendingEmail || !emailRecipient}
              className="touch-manipulation h-11"
            >
              {isSendingEmail ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Mail className="h-4 w-4 mr-2" />
                  Send Certificate
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EVChargingTabNavigation;
