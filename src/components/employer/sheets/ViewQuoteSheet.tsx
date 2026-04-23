import { useState, useEffect } from 'react';
import { copyToClipboard } from '@/utils/clipboard';
import { openExternalUrl } from '@/utils/open-external-url';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  FileText,
  Send,
  Copy,
  Trash2,
  Check,
  X,
  Phone,
  Mail,
  Calendar,
  Clock,
  Loader2,
  Link as LinkIcon,
  CheckCircle2,
  XCircle,
  ExternalLink,
  Signature,
  Download,
  Package,
} from 'lucide-react';
import { useSendQuote, useUpdateQuote, useDeleteQuote } from '@/hooks/useFinance';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useHaptic } from '@/hooks/useHaptic';
import type { Quote } from '@/services/financeService';
import { format } from 'date-fns';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import {
  SheetShell,
  FormCard,
  FormGrid,
  Field,
  PrimaryButton,
  SecondaryButton,
  DestructiveButton,
  Pill,
  Eyebrow,
  inputClass,
} from '@/components/employer/editorial';

interface ViewQuoteSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  quote: Quote | null;
  onConvertToInvoice?: (quote: Quote) => void;
}

interface QuoteAcceptance {
  id: string;
  status: string;
  client_name: string;
  client_notes: string | null;
  signature_data: string | null;
  responded_at: string | null;
  access_token: string;
  expires_at: string;
}

export function ViewQuoteSheet({
  open,
  onOpenChange,
  quote,
  onConvertToInvoice,
}: ViewQuoteSheetProps) {
  const sendQuoteMutation = useSendQuote();
  const updateQuoteMutation = useUpdateQuote();
  const deleteQuoteMutation = useDeleteQuote();
  const haptic = useHaptic();
  const [showEmailDialog, setShowEmailDialog] = useState(false);
  const [showLinkDialog, setShowLinkDialog] = useState(false);
  const [recipientEmail, setRecipientEmail] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [isGeneratingLink, setIsGeneratingLink] = useState(false);
  const [acceptLink, setAcceptLink] = useState<string | null>(null);
  const [acceptance, setAcceptance] = useState<QuoteAcceptance | null>(null);
  const [, setLoadingAcceptance] = useState(false);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);

  useEffect(() => {
    if (quote) {
      setRecipientEmail((quote as any).client_email || '');
    }
  }, [quote]);

  useEffect(() => {
    if (open && quote) {
      loadAcceptanceData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, quote?.id]);

  const loadAcceptanceData = async () => {
    if (!quote) return;

    setLoadingAcceptance(true);
    try {
      const { data, error } = await supabase
        .from('employer_quote_acceptances')
        .select('*')
        .eq('quote_id', quote.id)
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (error) throw error;
      setAcceptance(data);

      if (data?.access_token) {
        setAcceptLink(`${window.location.origin}/quote/${data.access_token}`);
      }
    } catch (err) {
      console.error('Error loading acceptance:', err);
    } finally {
      setLoadingAcceptance(false);
    }
  };

  if (!quote) return null;

  const lineItems = Array.isArray(quote.line_items) ? quote.line_items : [];
  const subtotal = lineItems.reduce((sum: number, item: any) => sum + (item.total || 0), 0);

  const statusTone: Record<string, 'amber' | 'blue' | 'emerald' | 'red' | 'yellow'> = {
    Draft: 'amber',
    Sent: 'amber',
    Approved: 'emerald',
    'Client Accepted': 'emerald',
    Rejected: 'red',
    'Client Declined': 'red',
  };

  const handleApprove = () => {
    haptic.success();
    updateQuoteMutation.mutate({ id: quote.id, updates: { status: 'Approved' } });
  };

  const handleReject = () => {
    haptic.warning();
    updateQuoteMutation.mutate({ id: quote.id, updates: { status: 'Rejected' } });
  };

  const handleGenerateAcceptLink = async () => {
    setIsGeneratingLink(true);
    try {
      const { data, error } = await supabase.functions.invoke('generate-quote-accept-link', {
        body: {
          quoteId: quote.id,
          clientEmail: (quote as any).client_email,
          clientName: quote.client,
          expiryDays: 30,
          baseUrl: window.location.origin,
        },
      });

      if (error) throw error;

      if (data.portalUrl) {
        setAcceptLink(data.portalUrl);
        setShowLinkDialog(true);
        toast.success('Accept link generated');
        loadAcceptanceData();
      }
    } catch (err: any) {
      console.error('Error generating link:', err);
      toast.error(err.message || 'Failed to generate link');
    } finally {
      setIsGeneratingLink(false);
    }
  };

  const handleCopyLink = async () => {
    if (acceptLink) {
      await copyToClipboard(acceptLink);
      toast.success('Link copied to clipboard');
    }
  };

  const handleSendEmail = async (email?: string) => {
    const targetEmail = email || recipientEmail || (quote as any).client_email;

    if (!targetEmail) {
      setShowEmailDialog(true);
      return;
    }

    setIsSending(true);

    try {
      let linkToInclude = acceptLink;
      if (!linkToInclude) {
        const { data: linkData, error: linkError } = await supabase.functions.invoke(
          'generate-quote-accept-link',
          {
            body: {
              quoteId: quote.id,
              clientEmail: targetEmail,
              clientName: quote.client,
              expiryDays: 30,
              baseUrl: window.location.origin,
            },
          }
        );

        if (linkError) throw linkError;
        linkToInclude = linkData.portalUrl;
        setAcceptLink(linkToInclude);
      }

      const { error } = await supabase.functions.invoke('send-finance-document', {
        body: {
          type: 'quote',
          documentId: quote.id,
          recipientEmail: targetEmail,
          recipientName: quote.client,
          acceptLink: linkToInclude,
        },
      });

      if (error) throw error;

      if (!(quote as any).client_email && targetEmail) {
        await supabase
          .from('employer_quotes')
          .update({ client_email: targetEmail })
          .eq('id', quote.id);
      }

      toast.success(`Quote sent to ${targetEmail}`);
      setShowEmailDialog(false);
      setRecipientEmail('');

      sendQuoteMutation.mutate(quote.id);
      loadAcceptanceData();
    } catch (error: any) {
      console.error('Error sending quote:', error);
      toast.error(error.message || 'Failed to send quote');
    } finally {
      setIsSending(false);
    }
  };

  const handleSend = () => {
    const clientEmail = (quote as any).client_email;
    if (clientEmail) {
      handleSendEmail(clientEmail);
    } else {
      setShowEmailDialog(true);
    }
  };

  const handleConvert = () => {
    if (onConvertToInvoice) {
      onConvertToInvoice(quote);
      onOpenChange(false);
    }
  };

  const isClientAccepted = quote.status === 'Client Accepted';
  const isClientDeclined = quote.status === 'Client Declined';

  return (
    <>
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent
          side="bottom"
          className="h-[85vh] p-0 overflow-hidden bg-[hsl(0_0%_8%)]"
        >
          <SheetShell
            eyebrow={quote.quote_number}
            title={quote.client}
            description={
              <span className="flex items-center gap-2">
                <Pill tone={statusTone[quote.status] ?? 'amber'}>{quote.status}</Pill>
                <span>Value £{Number(quote.value).toLocaleString()}</span>
              </span>
            }
            footer={
              quote.status === 'Draft' ? (
                <>
                  <SecondaryButton onClick={() => onOpenChange(false)} fullWidth>
                    Close
                  </SecondaryButton>
                  <PrimaryButton onClick={handleSend} disabled={isSending} fullWidth>
                    {isSending ? (
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    ) : (
                      <Send className="h-4 w-4 mr-2" />
                    )}
                    Send email
                  </PrimaryButton>
                </>
              ) : quote.status === 'Sent' ? (
                <>
                  <SecondaryButton
                    onClick={handleReject}
                    disabled={updateQuoteMutation.isPending}
                    fullWidth
                  >
                    <X className="h-4 w-4 mr-2" />
                    Reject
                  </SecondaryButton>
                  <PrimaryButton
                    onClick={handleApprove}
                    disabled={updateQuoteMutation.isPending}
                    fullWidth
                  >
                    <Check className="h-4 w-4 mr-2" />
                    Approve
                  </PrimaryButton>
                </>
              ) : quote.status === 'Approved' || isClientAccepted ? (
                <>
                  <SecondaryButton onClick={() => onOpenChange(false)} fullWidth>
                    Close
                  </SecondaryButton>
                  <PrimaryButton onClick={handleConvert} fullWidth>
                    <FileText className="h-4 w-4 mr-2" />
                    Convert to invoice
                  </PrimaryButton>
                </>
              ) : (
                <SecondaryButton onClick={() => onOpenChange(false)} fullWidth>
                  Close
                </SecondaryButton>
              )
            }
          >
            {isClientAccepted && acceptance && (
              <div className="rounded-2xl bg-emerald-500/10 border border-emerald-500/25 p-4">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-6 w-6 text-emerald-400 flex-shrink-0" />
                  <div className="flex-1 space-y-2">
                    <div>
                      <p className="font-semibold text-emerald-400">Client accepted</p>
                      <p className="text-sm text-white">
                        {acceptance.client_name} accepted on{' '}
                        {acceptance.responded_at &&
                          format(new Date(acceptance.responded_at), "d MMM yyyy 'at' HH:mm")}
                      </p>
                    </div>
                    {acceptance.client_notes && (
                      <div className="text-sm text-white">
                        <span className="text-white">Notes: </span>
                        {acceptance.client_notes}
                      </div>
                    )}
                    {acceptance.signature_data && (
                      <div className="space-y-1">
                        <span className="text-sm text-white flex items-center gap-1">
                          <Signature className="h-3 w-3" /> Client signature
                        </span>
                        <img
                          src={acceptance.signature_data}
                          alt="Client signature"
                          className="h-12 bg-[hsl(0_0%_9%)] rounded-lg border border-white/[0.06] p-1"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {isClientDeclined && acceptance && (
              <div className="rounded-2xl bg-red-500/10 border border-red-500/25 p-4">
                <div className="flex items-start gap-3">
                  <XCircle className="h-6 w-6 text-red-400 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="font-semibold text-red-400">Client declined</p>
                    <p className="text-sm text-white">
                      {acceptance.client_name} declined on{' '}
                      {acceptance.responded_at &&
                        format(new Date(acceptance.responded_at), "d MMM yyyy 'at' HH:mm")}
                    </p>
                    {acceptance.client_notes && (
                      <div className="text-sm mt-2 text-white">
                        <span className="text-white">Reason: </span>
                        {acceptance.client_notes}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {quote.status === 'Sent' && (
              <FormCard eyebrow="Client accept link">
                {acceptLink ? (
                  <div className="flex gap-2">
                    <Input value={acceptLink} readOnly className={inputClass} />
                    <SecondaryButton size="sm" onClick={handleCopyLink}>
                      <Copy className="h-4 w-4" />
                    </SecondaryButton>
                    <SecondaryButton size="sm" onClick={() => openExternalUrl(acceptLink)}>
                      <ExternalLink className="h-4 w-4" />
                    </SecondaryButton>
                  </div>
                ) : (
                  <SecondaryButton
                    onClick={handleGenerateAcceptLink}
                    disabled={isGeneratingLink}
                    fullWidth
                  >
                    {isGeneratingLink ? (
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    ) : (
                      <LinkIcon className="h-4 w-4 mr-2" />
                    )}
                    Generate accept link
                  </SecondaryButton>
                )}
                {acceptance && acceptance.status === 'pending' && (
                  <p className="text-xs text-white mt-2">
                    Awaiting client response. Expires{' '}
                    {format(new Date(acceptance.expires_at), 'd MMM yyyy')}
                  </p>
                )}
              </FormCard>
            )}

            <FormCard eyebrow="Details">
              {(quote as any).job_title && (
                <div className="bg-elec-yellow/10 rounded-xl p-3">
                  <Eyebrow>Project</Eyebrow>
                  <p className="font-semibold text-elec-yellow text-lg mt-0.5">
                    {(quote as any).job_title}
                  </p>
                </div>
              )}
              {(quote as any).client_address && (
                <div>
                  <Eyebrow>Client address</Eyebrow>
                  <p className="font-medium text-white whitespace-pre-line mt-0.5">
                    {(quote as any).client_address}
                  </p>
                </div>
              )}
              {quote.description && (
                <div>
                  <Eyebrow>Description</Eyebrow>
                  <p className="font-medium text-white mt-0.5">{quote.description}</p>
                </div>
              )}
              <FormGrid cols={2}>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-white" />
                  <div>
                    <Eyebrow>Created</Eyebrow>
                    <p className="font-medium text-white text-sm">
                      {new Date(quote.created_at).toLocaleDateString('en-GB')}
                    </p>
                  </div>
                </div>
                {quote.sent_date && (
                  <div className="flex items-center gap-2">
                    <Send className="h-4 w-4 text-white" />
                    <div>
                      <Eyebrow>Sent</Eyebrow>
                      <p className="font-medium text-white text-sm">
                        {new Date(quote.sent_date).toLocaleDateString('en-GB')}
                      </p>
                    </div>
                  </div>
                )}
                {quote.valid_until && (
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-white" />
                    <div>
                      <Eyebrow>Valid until</Eyebrow>
                      <p className="font-medium text-white text-sm">
                        {new Date(quote.valid_until).toLocaleDateString('en-GB')}
                      </p>
                    </div>
                  </div>
                )}
              </FormGrid>
            </FormCard>

            {lineItems.filter((item: any) => item.type === 'labour').length > 0 && (
              <FormCard eyebrow="Labour">
                <div className="flex items-center gap-2 mb-1">
                  <Clock className="h-4 w-4 text-white" />
                  <Eyebrow>Labour</Eyebrow>
                </div>
                <div className="divide-y divide-white/[0.06] -mx-1">
                  {lineItems
                    .filter((item: any) => item.type === 'labour')
                    .map((item: any, idx: number) => (
                      <div
                        key={item.id || idx}
                        className="flex justify-between items-center px-1 py-3"
                      >
                        <div className="min-w-0 flex-1">
                          <p className="font-medium text-sm text-white truncate">
                            {item.description}
                          </p>
                          <p className="text-xs text-white mt-0.5">
                            {item.quantity} hrs × £{Number(item.unitPrice || 0).toFixed(2)}/hr
                          </p>
                        </div>
                        <span className="font-bold text-white shrink-0 tabular-nums">
                          £{Number(item.total || 0).toFixed(2)}
                        </span>
                      </div>
                    ))}
                </div>
              </FormCard>
            )}

            {lineItems.filter((item: any) => item.type !== 'labour').length > 0 && (
              <FormCard eyebrow="Materials">
                <div className="flex items-center gap-2 mb-1">
                  <Package className="h-4 w-4 text-white" />
                  <Eyebrow>Materials</Eyebrow>
                </div>
                <div className="divide-y divide-white/[0.06] -mx-1">
                  {lineItems
                    .filter((item: any) => item.type !== 'labour')
                    .map((item: any, idx: number) => (
                      <div
                        key={item.id || idx}
                        className="flex justify-between items-center px-1 py-3"
                      >
                        <div className="min-w-0 flex-1">
                          <p className="font-medium text-sm text-white truncate">
                            {item.description}
                          </p>
                          <p className="text-xs text-white mt-0.5">
                            {item.quantity} {item.unit} × £
                            {Number(item.unitPrice || 0).toFixed(2)}
                          </p>
                        </div>
                        <span className="font-bold text-white shrink-0 tabular-nums">
                          £{Number(item.total || 0).toFixed(2)}
                        </span>
                      </div>
                    ))}
                </div>
              </FormCard>
            )}

            <div className="rounded-2xl p-4 bg-elec-yellow/10 border border-elec-yellow/30 space-y-2">
              <div className="flex justify-between items-center text-sm">
                <span className="text-white">Subtotal</span>
                <span className="font-medium text-white tabular-nums">£{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-white">VAT @ 20%</span>
                <span className="font-medium text-white tabular-nums">
                  £{(subtotal * 0.2).toFixed(2)}
                </span>
              </div>
              <div className="h-px w-full bg-white/[0.08] my-2" />
              <div className="flex justify-between items-center">
                <span className="text-lg font-medium text-white">Total inc. VAT</span>
                <span className="text-2xl font-bold text-elec-yellow tabular-nums">
                  £{Number(quote.value).toLocaleString('en-GB', { minimumFractionDigits: 2 })}
                </span>
              </div>
            </div>

            {quote.notes && (
              <FormCard eyebrow="Notes">
                <p className="text-sm text-white whitespace-pre-wrap">{quote.notes}</p>
              </FormCard>
            )}

            <FormGrid cols={3}>
              <SecondaryButton
                onClick={() => {
                  const phone = (quote as any).client_phone;
                  if (phone) {
                    window.location.href = `tel:${phone}`;
                  } else {
                    toast.info('No phone number on file for this client');
                  }
                }}
                fullWidth
              >
                <Phone className="h-4 w-4 mr-1" />
                Call
              </SecondaryButton>
              <SecondaryButton onClick={() => setShowEmailDialog(true)} fullWidth>
                <Mail className="h-4 w-4 mr-1" />
                Email
              </SecondaryButton>
              <SecondaryButton
                disabled={isGeneratingPdf}
                onClick={async () => {
                  setIsGeneratingPdf(true);
                  try {
                    const { data, error } = await supabase.functions.invoke(
                      'generate-quote-pdf',
                      {
                        body: { quoteId: quote.id },
                      }
                    );
                    if (error) throw error;

                    const viewWindow = window.open('', '_blank');
                    if (viewWindow) {
                      viewWindow.document.write(data.html);
                      viewWindow.document.close();
                      viewWindow.focus();
                    }
                    toast.success('Quote opened - use the button to print/save as PDF');
                  } catch (err: any) {
                    toast.error(err.message || 'Failed to generate quote');
                  } finally {
                    setIsGeneratingPdf(false);
                  }
                }}
                fullWidth
              >
                {isGeneratingPdf ? (
                  <Loader2 className="h-4 w-4 animate-spin mr-1" />
                ) : (
                  <Download className="h-4 w-4 mr-1" />
                )}
                PDF
              </SecondaryButton>
            </FormGrid>

            <FormGrid cols={2}>
              <SecondaryButton fullWidth>
                <Copy className="h-4 w-4 mr-2" />
                Duplicate
              </SecondaryButton>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <DestructiveButton fullWidth>
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </DestructiveButton>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Delete quote?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This will permanently delete quote {quote.quote_number} for {quote.client}
                      . This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      className="bg-destructive hover:bg-destructive/90"
                      onClick={() => {
                        haptic.heavy();
                        deleteQuoteMutation.mutate(quote.id, {
                          onSuccess: () => onOpenChange(false),
                        });
                      }}
                    >
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </FormGrid>
          </SheetShell>
        </SheetContent>
      </Sheet>

      <Dialog open={showEmailDialog} onOpenChange={setShowEmailDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Send quote to client</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <Field label="Client email address" required>
              <Input
                type="email"
                placeholder="client@example.com"
                value={recipientEmail}
                onChange={(e) => setRecipientEmail(e.target.value)}
                className={inputClass}
              />
            </Field>
            <p className="text-sm text-white">
              This will send quote {quote.quote_number} for £{Number(quote.value).toLocaleString()}{' '}
              to the client with an accept/decline link.
            </p>
          </div>
          <DialogFooter>
            <SecondaryButton onClick={() => setShowEmailDialog(false)}>Cancel</SecondaryButton>
            <PrimaryButton onClick={() => handleSendEmail()} disabled={!recipientEmail || isSending}>
              {isSending ? (
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
              ) : (
                <Send className="h-4 w-4 mr-2" />
              )}
              Send email
            </PrimaryButton>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showLinkDialog} onOpenChange={setShowLinkDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Quote accept link generated</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <p className="text-sm text-white">
              Share this link with your client so they can review and accept the quote online.
            </p>
            <div className="flex gap-2">
              <Input value={acceptLink || ''} readOnly className={inputClass} />
              <SecondaryButton onClick={handleCopyLink}>
                <Copy className="h-4 w-4" />
              </SecondaryButton>
            </div>
          </div>
          <DialogFooter>
            <SecondaryButton onClick={() => setShowLinkDialog(false)}>Close</SecondaryButton>
            <PrimaryButton onClick={() => openExternalUrl(acceptLink || '')}>
              <ExternalLink className="h-4 w-4 mr-2" />
              Preview portal
            </PrimaryButton>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
