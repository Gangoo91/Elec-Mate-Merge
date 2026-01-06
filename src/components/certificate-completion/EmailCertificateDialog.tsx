/**
 * EmailCertificateDialog
 *
 * Professional email modal for sending certificates.
 * Features email preview, recipient management, and loading states.
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Mail,
  Send,
  X,
  User,
  Loader2,
  CheckCircle,
  AlertCircle,
  ChevronDown,
  Paperclip,
  Building2,
  MapPin,
  Calendar,
  FileCheck,
  Zap
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { useHaptics } from '@/hooks/useHaptics';

export interface EmailCertificateDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  certificateType: 'EICR' | 'EIC';
  certificateNumber?: string;
  clientName?: string;
  clientEmail?: string;
  installationAddress?: string;
  inspectionDate?: string;
  overallAssessment?: string;
  companyName?: string;
  onSend: (email: string, cc?: string[], message?: string) => Promise<void>;
  isLoading?: boolean;
}

export const EmailCertificateDialog: React.FC<EmailCertificateDialogProps> = ({
  open,
  onOpenChange,
  certificateType,
  certificateNumber,
  clientName,
  clientEmail,
  installationAddress,
  inspectionDate,
  overallAssessment,
  companyName,
  onSend,
  isLoading = false,
}) => {
  const isMobile = useIsMobile();
  const haptics = useHaptics();

  const [recipient, setRecipient] = useState(clientEmail || '');
  const [showCc, setShowCc] = useState(false);
  const [cc, setCc] = useState('');
  const [customMessage, setCustomMessage] = useState('');
  const [sendStatus, setSendStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  // Reset state when dialog opens
  useEffect(() => {
    if (open) {
      setRecipient(clientEmail || '');
      setSendStatus('idle');
      setErrorMessage('');
    }
  }, [open, clientEmail]);

  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSend = async () => {
    if (!isValidEmail(recipient)) {
      haptics.error();
      setErrorMessage('Please enter a valid email address');
      return;
    }

    haptics.tap();
    setSendStatus('sending');
    setErrorMessage('');

    try {
      const ccEmails = cc.split(',').map(e => e.trim()).filter(e => isValidEmail(e));
      await onSend(recipient, ccEmails.length > 0 ? ccEmails : undefined, customMessage || undefined);

      haptics.success();
      setSendStatus('success');

      // Close after success
      setTimeout(() => {
        onOpenChange(false);
      }, 2000);
    } catch (error) {
      haptics.error();
      setSendStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Failed to send email');
    }
  };

  const handleUseClientEmail = () => {
    haptics.tap();
    if (clientEmail) {
      setRecipient(clientEmail);
    }
  };

  // Generate subject line
  const subject = `${certificateType} Certificate - ${installationAddress || 'Electrical Installation'}`;

  // Email preview content
  const EmailPreview = () => (
    <div className="rounded-xl border border-border/50 bg-background/50 overflow-hidden">
      {/* Preview header */}
      <div className="px-4 py-3 bg-muted/30 border-b border-border/50">
        <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
          <Mail className="h-4 w-4" />
          Email Preview
        </div>
      </div>

      {/* Email content */}
      <div className="p-4 space-y-4 text-sm">
        {/* Company header */}
        <div className="flex items-center gap-3 pb-3 border-b border-border/30">
          <div className="p-2 rounded-lg bg-elec-yellow/10 border border-elec-yellow/20">
            <Zap className="h-5 w-5 text-elec-yellow" />
          </div>
          <div>
            <p className="font-semibold text-foreground">{companyName || 'Your Company'}</p>
            <p className="text-xs text-muted-foreground">Electrical Services</p>
          </div>
        </div>

        {/* Certificate summary card */}
        <div className="p-4 rounded-lg bg-card border border-border/50 space-y-3">
          <div className="flex items-center gap-2">
            <Badge
              variant="outline"
              className={cn(
                'text-xs px-2 py-0.5',
                overallAssessment === 'satisfactory'
                  ? 'bg-green-500/10 border-green-500/30 text-green-400'
                  : overallAssessment === 'unsatisfactory'
                  ? 'bg-red-500/10 border-red-500/30 text-red-400'
                  : 'bg-amber-500/10 border-amber-500/30 text-amber-400'
              )}
            >
              <FileCheck className="h-3 w-3 mr-1" />
              {certificateType}
            </Badge>
            {certificateNumber && (
              <span className="text-xs font-mono text-muted-foreground">{certificateNumber}</span>
            )}
          </div>

          <div className="space-y-2">
            {installationAddress && (
              <div className="flex items-start gap-2 text-xs">
                <MapPin className="h-3.5 w-3.5 text-muted-foreground mt-0.5 shrink-0" />
                <span className="text-foreground">{installationAddress}</span>
              </div>
            )}
            {inspectionDate && (
              <div className="flex items-center gap-2 text-xs">
                <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                <span className="text-muted-foreground">
                  {new Date(inspectionDate).toLocaleDateString('en-GB', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  })}
                </span>
              </div>
            )}
          </div>

          {overallAssessment && (
            <div className={cn(
              'flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium',
              overallAssessment === 'satisfactory'
                ? 'bg-green-500/10 text-green-400'
                : 'bg-red-500/10 text-red-400'
            )}>
              {overallAssessment === 'satisfactory' ? (
                <CheckCircle className="h-4 w-4" />
              ) : (
                <AlertCircle className="h-4 w-4" />
              )}
              Assessment: {overallAssessment.toUpperCase()}
            </div>
          )}
        </div>

        {/* Body text */}
        <div className="space-y-2 text-muted-foreground">
          <p>Dear {clientName || 'Customer'},</p>
          <p>
            Please find attached your {certificateType === 'EICR' ? 'Electrical Installation Condition Report' : 'Electrical Installation Certificate'} for the above property.
          </p>
          {customMessage && (
            <p className="text-foreground italic">"{customMessage}"</p>
          )}
        </div>

        {/* Attachment notice */}
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-blue-500/5 border border-blue-500/20 text-xs text-blue-400">
          <Paperclip className="h-4 w-4" />
          PDF Certificate Attached
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-border/30 text-xs text-muted-foreground">
          <p>BS 7671:2018 Compliant Certificate</p>
          <p className="mt-1">Powered by Elec-Mate</p>
        </div>
      </div>
    </div>
  );

  const content = (
    <div className="space-y-6">
      {/* Recipient input */}
      <div className="space-y-2">
        <Label htmlFor="recipient" className="text-sm font-medium">
          Recipient Email
        </Label>
        <div className="space-y-2">
          <Input
            id="recipient"
            type="email"
            placeholder="client@example.com"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            disabled={sendStatus === 'sending'}
            className={cn(
              'h-12 text-base',
              errorMessage && !isValidEmail(recipient) && 'border-red-500/50 focus-visible:ring-red-500'
            )}
          />

          {clientEmail && recipient !== clientEmail && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleUseClientEmail}
              className="w-full justify-start gap-2 text-sm"
            >
              <User className="h-4 w-4" />
              Use Client Email: {clientEmail}
            </Button>
          )}
        </div>
      </div>

      {/* CC field (collapsible) */}
      <Collapsible open={showCc} onOpenChange={setShowCc}>
        <CollapsibleTrigger asChild>
          <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ChevronDown className={cn('h-4 w-4 transition-transform', showCc && 'rotate-180')} />
            Add CC recipients
          </button>
        </CollapsibleTrigger>
        <CollapsibleContent className="mt-2">
          <Input
            type="text"
            placeholder="cc1@example.com, cc2@example.com"
            value={cc}
            onChange={(e) => setCc(e.target.value)}
            disabled={sendStatus === 'sending'}
            className="h-11"
          />
          <p className="text-xs text-muted-foreground mt-1">Separate multiple emails with commas</p>
        </CollapsibleContent>
      </Collapsible>

      {/* Subject (read-only) */}
      <div className="space-y-2">
        <Label className="text-sm font-medium text-muted-foreground">Subject</Label>
        <div className="px-3 py-2.5 rounded-lg bg-muted/30 border border-border/50 text-sm">
          {subject}
        </div>
      </div>

      {/* Custom message (optional) */}
      <div className="space-y-2">
        <Label htmlFor="message" className="text-sm font-medium">
          Additional Message <span className="text-muted-foreground">(optional)</span>
        </Label>
        <textarea
          id="message"
          placeholder="Add a personal note to the client..."
          value={customMessage}
          onChange={(e) => setCustomMessage(e.target.value)}
          disabled={sendStatus === 'sending'}
          className="w-full h-20 px-3 py-2 text-sm rounded-lg border border-border bg-background resize-none focus:outline-none focus:ring-2 focus:ring-elec-yellow/20 focus:border-elec-yellow/50"
        />
      </div>

      {/* Email preview */}
      <EmailPreview />

      {/* Error message */}
      <AnimatePresence>
        {errorMessage && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="flex items-center gap-2 px-4 py-3 rounded-lg bg-red-500/10 border border-red-500/20 text-sm text-red-400"
          >
            <AlertCircle className="h-4 w-4 shrink-0" />
            {errorMessage}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Success message */}
      <AnimatePresence>
        {sendStatus === 'success' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="flex items-center gap-2 px-4 py-3 rounded-lg bg-green-500/10 border border-green-500/30 text-sm text-green-400"
          >
            <CheckCircle className="h-4 w-4 shrink-0" />
            Certificate sent successfully!
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  const footer = (
    <div className="flex gap-3">
      <Button
        variant="outline"
        onClick={() => onOpenChange(false)}
        disabled={sendStatus === 'sending'}
        className="flex-1 sm:flex-none"
      >
        Cancel
      </Button>
      <Button
        onClick={handleSend}
        disabled={!recipient || sendStatus === 'sending' || sendStatus === 'success'}
        className={cn(
          'flex-1 sm:flex-none gap-2',
          'bg-elec-yellow hover:bg-elec-yellow/90 text-black'
        )}
      >
        {sendStatus === 'sending' ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Sending...
          </>
        ) : sendStatus === 'success' ? (
          <>
            <CheckCircle className="h-4 w-4" />
            Sent!
          </>
        ) : (
          <>
            <Send className="h-4 w-4" />
            Send Certificate
          </>
        )}
      </Button>
    </div>
  );

  // Mobile: Use Sheet (bottom drawer)
  if (isMobile) {
    return (
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent side="bottom" className="h-[90vh] overflow-y-auto">
          <SheetHeader className="text-left">
            <SheetTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5 text-elec-yellow" />
              Email Certificate
            </SheetTitle>
          </SheetHeader>
          <div className="mt-6 space-y-6 pb-6">
            {content}
            <div className="pt-4 border-t border-border">
              {footer}
            </div>
          </div>
        </SheetContent>
      </Sheet>
    );
  }

  // Desktop: Use Dialog
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5 text-elec-yellow" />
            Email Certificate
          </DialogTitle>
          <DialogDescription>
            Send the {certificateType} certificate to your client via email.
          </DialogDescription>
        </DialogHeader>
        {content}
        <DialogFooter>
          {footer}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EmailCertificateDialog;
