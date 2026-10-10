import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { copyToClipboard } from '@/utils/clipboard';
import { openExternalUrl } from '@/utils/open-external-url';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import {
  ResponsiveFormModal,
  ResponsiveFormModalContent,
  ResponsiveFormModalHeader,
  ResponsiveFormModalTitle,
  ResponsiveFormModalBody,
} from '@/components/ui/responsive-form-modal';
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
  Briefcase,
  ChevronRight,
} from 'lucide-react';
import { useSendQuote, useUpdateQuote, useDeleteQuote, useCreateQuote } from '@/hooks/useFinance';
import { useCompanyProfile } from '@/hooks/useCompanyProfile';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useHaptic } from '@/hooks/useHaptic';
import { computeQuoteTotals } from '@/utils/quote-calculations';
import type { Quote } from '@/services/financeService';
import { format } from 'date-fns';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { createJobFromQuote, linkQuoteToJob } from '@/services/quoteChainService';
import { FirmJobPicker } from '@/components/employer/smart-docs/FirmJobPicker';
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
import { RequestSignatureSheet } from '@/components/employer/sheets/RequestSignatureSheet';
import { getQuoteCustomerLink, setQuoteClientEmail } from '@/services/financeService';
import { useQuoteAttribution } from '@/hooks/useQuoteAttribution';
import { QuotePaymentStages } from '@/components/employer/quotes/PaymentStages';
import { QuotePriceMoves } from '@/components/employer/wholesalers/QuotePriceMoves';

/**
 * A line's total. Hub-made lines store `total`; lines made in the Electrical
 * Hub store `totalPrice`. Falls back to quantity × unit price.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const lineTotal = (item: any): number => {
  const t = Number(item?.total ?? item?.totalPrice);
  if (Number.isFinite(t)) return t;
  return (Number(item?.quantity) || 0) * (Number(item?.unitPrice) || 0);
};

/** £3,652.80: thousands separators, always two decimals. */
const money = (v: number | string | null | undefined) =>
  `£${Number(v || 0).toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
/** 6 Aug 2026, the way dates read across the app. */
const day = (d: string | Date) => format(new Date(d), 'd MMM yyyy');
const SINGULAR: Record<string, string> = {
  units: 'unit',
  hrs: 'hr',
  hours: 'hour',
  metres: 'metre',
  lengths: 'length',
  rolls: 'roll',
  packs: 'pack',
  boxes: 'box',
  items: 'item',
  days: 'day',
};
const PLURAL: Record<string, string> = Object.fromEntries(
  Object.entries(SINGULAR).map(([many, one]) => [one, many])
);
/** "1 unit", "2 units", "1 hr": the unit agrees with the quantity. */
const qtyUnit = (q: number | string, unit: string | null | undefined) => {
  const n = Number(q);
  const u = (unit || '').trim();
  if (!u) return String(q);
  const lower = u.toLowerCase();
  const word = n === 1 ? (SINGULAR[lower] ?? u) : (PLURAL[lower] ?? u);
  return `${q} ${word}`;
};

interface ViewQuoteSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  quote: Quote | null;
  onConvertToInvoice?: (quote: Quote) => void;
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
  const createQuoteMutation = useCreateQuote();
  const { companyProfile } = useCompanyProfile();
  const haptic = useHaptic();
  const [showEmailDialog, setShowEmailDialog] = useState(false);
  const [showLinkDialog, setShowLinkDialog] = useState(false);
  const [recipientEmail, setRecipientEmail] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [isGeneratingLink, setIsGeneratingLink] = useState(false);
  const [acceptLink, setAcceptLink] = useState<string | null>(null);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [showSignatureRequest, setShowSignatureRequest] = useState(false);
  const [, setSearchParams] = useSearchParams();
  // ELE-2083: who raised and who sent it (nothing shown for older quotes).
  const attribution = useQuoteAttribution(quote?.id ? [quote.id] : []).map.get(quote?.id ?? '');
  const byLine = [
    attribution?.created_by_name ? `Raised by ${attribution.created_by_name}` : null,
    attribution?.sent_by_name ? `Sent by ${attribution.sent_by_name}` : null,
  ]
    .filter(Boolean)
    .join(' · ');

  // Pivot to the linked job — JobsSection consumes ?job=<id> and opens it.
  // ELE-2065: an accepted quote becomes a firm job only when someone asks.
  const queryClient = useQueryClient();
  const [creatingJob, setCreatingJob] = useState(false);
  const handleCreateJob = async () => {
    if (!quote) return;
    setCreatingJob(true);
    try {
      const { job_id, created } = await createJobFromQuote(quote.id);
      haptic.success();
      toast.success(created ? 'Job created. Give it a date on the board.' : 'Opening the job');
      queryClient.invalidateQueries({ queryKey: ['quotes'] });
      queryClient.invalidateQueries({ queryKey: ['won-quotes-without-job'] });
      queryClient.invalidateQueries({ queryKey: ['employer-jobs'] });
      onOpenChange(false);
      setSearchParams({ section: 'jobs', job: job_id });
    } catch (err) {
      toast.error((err as Error).message || 'Could not make a job from this quote');
    } finally {
      setCreatingJob(false);
    }
  };

  // ELE-2065: once invoiced, the quote is done; open its invoice instead.
  const handleOpenInvoice = () => {
    if (!quote?.converted_invoice_id) return;
    onOpenChange(false);
    setSearchParams({ section: 'quotes', invoice: quote.converted_invoice_id });
  };

  // ELE-2065 §3A #11: a quote made outside the job (Electrical Hub builder, a
  // client record) can be put on the job, so the job's money sees it.
  const [linkedJobId, setLinkedJobId] = useState<string | null>(quote?.job_id ?? null);
  const [linkingJob, setLinkingJob] = useState(false);
  useEffect(() => {
    setLinkedJobId(quote?.job_id ?? null);
  }, [quote?.id, quote?.job_id]);
  const handleLinkJob = async (jobId: string | null) => {
    if (!quote || jobId === linkedJobId) return;
    const before = linkedJobId;
    setLinkingJob(true);
    setLinkedJobId(jobId);
    try {
      const r = await linkQuoteToJob(quote.id, jobId);
      haptic.success();
      toast.success(
        jobId
          ? r.invoice_moved
            ? 'Quote and its invoice are on the job now'
            : 'Quote is on the job now'
          : 'Quote taken off the job'
      );
      queryClient.invalidateQueries({ queryKey: ['quotes'] });
      queryClient.invalidateQueries({ queryKey: ['invoices'] });
      queryClient.invalidateQueries({ queryKey: ['job-hub-summary'] });
      queryClient.invalidateQueries({ queryKey: ['won-quotes-without-job'] });
    } catch (err) {
      setLinkedJobId(before);
      toast.error((err as Error).message || 'Could not link the quote to that job');
    } finally {
      setLinkingJob(false);
    }
  };

  const handleViewJob = () => {
    if (!linkedJobId) return;
    onOpenChange(false);
    setSearchParams({ section: 'jobs', job: linkedJobId });
  };

  useEffect(() => {
    if (quote) {
      setRecipientEmail((quote as any).client_email || '');
    }
  }, [quote]);

  useEffect(() => {
    if (open && quote) {
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, quote?.id]);

  // ELE-1823: deposit on acceptance — awaiting or paid, from the quote row
  // the accept page and the Stripe webhook write to.
  const { data: deposit } = useQuery({
    queryKey: ['quote-deposit', quote?.id],
    enabled: open && !!quote?.id,
    staleTime: 15_000,
    queryFn: async () => {
      const { data, error } = await supabase
        .from('quotes')
        .select('deposit_required, deposit_amount_pennies, deposit_paid_at, acceptance_status')
        .eq('id', quote!.id)
        .maybeSingle();
      if (error) throw error;
      return data as {
        deposit_required: boolean | null;
        deposit_amount_pennies: number | null;
        deposit_paid_at: string | null;
        acceptance_status: string | null;
      } | null;
    },
  });

  if (!quote) return null;

  const lineItems = Array.isArray(quote.line_items) ? quote.line_items : [];
  const subtotal =
    quote.subtotal != null
      ? Number(quote.subtotal)
      : lineItems.reduce((sum: number, item: any) => sum + lineTotal(item), 0);
  const vatRate = Number(quote.vat_rate ?? 20);
  const reverseCharge = Boolean(quote.reverse_charge);
  const vatAmount =
    quote.vat_amount != null
      ? Number(quote.vat_amount)
      : reverseCharge
        ? 0
        : subtotal * (vatRate / 100);
  // CIS isn't stored on the row — work it out exactly as the Electrical Hub
  // does, from the line items and the quote's own settings.
  const cisAmount =
    Number(quote.cis_amount) ||
    (quote.cis_enabled && quote.settings
      ? computeQuoteTotals(quote.line_items || [], quote.settings as never).cisAmount
      : 0);
  const amountPayable = Number(quote.value) - cisAmount;

  const statusTone: Record<string, 'amber' | 'blue' | 'emerald' | 'red' | 'yellow'> = {
    Draft: 'amber',
    Sent: 'amber',
    Approved: 'emerald',
    'Client Accepted': 'emerald',
    Converted: 'emerald',
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
      // The same customer page the Electrical Hub sends: view, sign, accept,
      // pay the deposit. (generate-quote-accept-link read a legacy table.)
      const link = await getQuoteCustomerLink(quote);
      setAcceptLink(link);
      setShowLinkDialog(true);
    } catch (err) {
      toast.error((err as Error).message || 'Could not make the link');
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
    const targetEmail = (email || recipientEmail || quote.client_email || '').trim();

    if (!targetEmail) {
      setShowEmailDialog(true);
      return;
    }

    setIsSending(true);
    try {
      // The email goes to the address on the quote, so save a new one first.
      if (targetEmail !== (quote.client_email ?? '').trim()) {
        await setQuoteClientEmail(quote.id, targetEmail);
      }
      // One send: PDF, email with the accept link, open tracking. Previously
      // this ran a dead link generator, a second email function AND this, so
      // it failed — or would have sent the customer two emails.
      await sendQuoteMutation.mutateAsync(quote.id);
      toast.success(`Quote sent to ${targetEmail}`);
      setShowEmailDialog(false);
      setRecipientEmail('');
    } catch (error) {
      toast.error((error as Error).message || 'Failed to send quote');
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

  const isStaged =
    Array.isArray((quote.settings as { stages?: unknown[] } | null | undefined)?.stages) &&
    ((quote.settings as { stages?: unknown[] }).stages ?? []).length > 0;

  const handleConvert = () => {
    if (onConvertToInvoice) {
      onConvertToInvoice(quote);
      onOpenChange(false);
    }
  };

  const handleDuplicate = async () => {
    haptic.light();
    try {
      const validUntil = new Date();
      validUntil.setDate(validUntil.getDate() + 30);
      const created = await createQuoteMutation.mutateAsync({
        // Allocated by the database on insert (ELE-1947).
        quote_number: '',
        client: quote.client,
        client_address: quote.client_address ?? null,
        client_email: quote.client_email ?? null,
        client_phone: quote.client_phone ?? null,
        job_title: quote.job_title ?? null,
        description: quote.description,
        value: Number(quote.value),
        status: 'Draft',
        sent_date: null,
        valid_until: validUntil.toISOString().split('T')[0],
        job_id: quote.job_id ?? null,
        created_by: quote.created_by ?? 'Admin',
        line_items: quote.line_items,
        notes: quote.notes,
        vat_rate: quote.vat_rate,
        reverse_charge: quote.reverse_charge,
        cis_enabled: quote.cis_enabled,
        cis_rate: quote.cis_rate,
        subtotal: quote.subtotal,
        vat_amount: quote.vat_amount,
        cis_amount: quote.cis_amount,
        // Payment terms, deposit, discount and the rest come across too.
        settings: quote.settings,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as any);
      toast.success(`Duplicated as ${created?.quote_number ?? 'a new draft'}`);
      onOpenChange(false);
    } catch (err) {
      console.error('Error duplicating quote:', err);
    }
  };

  const acceptanceStatus = (quote.acceptance_status ?? '').toLowerCase();
  const isClientAccepted =
    acceptanceStatus === 'accepted' ||
    acceptanceStatus === 'accepted_pending_deposit' ||
    quote.status === 'Client Accepted';
  const isClientDeclined =
    acceptanceStatus === 'rejected' ||
    acceptanceStatus === 'declined' ||
    quote.status === 'Client Declined';
  const respondedAt = quote.accepted_at ? new Date(quote.accepted_at) : null;
  // A name or signature means the customer answered on the public page;
  // otherwise someone in the office marked it.
  const customerAccepted = !!quote.accepted_by_name || !!quote.signature_url;

  return (
    <>
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent side="bottom" className="h-[85vh] p-0 overflow-hidden bg-[hsl(0_0%_8%)]">
          <SheetShell
            eyebrow={quote.quote_number}
            title={quote.client}
            description={
              <span className="flex items-center gap-2">
                <Pill tone={statusTone[quote.status] ?? 'amber'}>
                  {quote.converted_invoice_id
                    ? `Invoiced${quote.converted_invoice_number ? ` · ${quote.converted_invoice_number}` : ''}`
                    : quote.status}
                </Pill>
                <span>Value {money(quote.value)}</span>
              </span>
            }
            footer={
              // The house footer: one row, secondary left, one yellow right,
              // natural widths on a desktop.
              <div className="flex w-full items-center gap-2 sm:justify-end">
              {quote.status === 'Draft' ? (
                <>
                  <SecondaryButton onClick={() => onOpenChange(false)} className="flex-1 sm:flex-none">
                    Close
                  </SecondaryButton>
                  <PrimaryButton
                    data-help="quotes.send-email"
                    onClick={handleSend}
                    disabled={isSending}
                    className="flex-1 sm:flex-none"
                  >
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
                    className="flex-1 sm:flex-none"
                  >
                    <X className="h-4 w-4 mr-2" />
                    Reject
                  </SecondaryButton>
                  <PrimaryButton
                    onClick={handleApprove}
                    disabled={updateQuoteMutation.isPending}
                    className="flex-1 sm:flex-none"
                  >
                    <Check className="h-4 w-4 mr-2" />
                    Approve
                  </PrimaryButton>
                </>
              ) : quote.converted_invoice_id ? (
                <>
                  <SecondaryButton onClick={() => onOpenChange(false)} className="flex-1 sm:flex-none">
                    Close
                  </SecondaryButton>
                  <PrimaryButton onClick={handleOpenInvoice} className="flex-1 sm:flex-none">
                    <FileText className="h-4 w-4 mr-2" />
                    Open invoice
                  </PrimaryButton>
                </>
              ) : (quote.status === 'Approved' || isClientAccepted) && isStaged ? (
                // ELE-2065: a staged quote is invoiced stage by stage (Payment
                // stages above); converting the whole quote would bill it twice.
                <SecondaryButton onClick={() => onOpenChange(false)} className="flex-1 sm:flex-none">
                  Close
                </SecondaryButton>
              ) : quote.status === 'Approved' || isClientAccepted ? (
                <>
                  <SecondaryButton onClick={() => onOpenChange(false)} className="flex-1 sm:flex-none">
                    Close
                  </SecondaryButton>
                  <PrimaryButton data-help="quotes.convert" onClick={handleConvert} className="flex-1 sm:flex-none">
                    <FileText className="h-4 w-4 mr-2" />
                    Convert to invoice
                  </PrimaryButton>
                </>
              ) : (
                <SecondaryButton onClick={() => onOpenChange(false)} className="flex-1 sm:flex-none">
                  Close
                </SecondaryButton>
              )}
              </div>
            }
          >
            {/* Desktop: the quote itself on the left, details and actions on the right. */}
            <div className="space-y-4 lg:grid lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:items-start lg:gap-5 lg:space-y-0">
              <div className="min-w-0 space-y-4">
                {isClientAccepted && (
                  <div className="rounded-2xl bg-emerald-500/10 border border-emerald-500/25 p-4">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="h-6 w-6 text-emerald-400 flex-shrink-0" />
                      <div className="flex-1 space-y-2">
                        <div>
                          <p className="font-semibold text-emerald-400">
                            {customerAccepted ? 'Customer accepted' : 'Marked as approved'}
                          </p>
                          <p className="text-sm text-white">
                            {customerAccepted
                              ? `${quote.accepted_by_name || 'The customer'} accepted`
                              : 'Approved by your office'}
                            {respondedAt && ` on ${format(respondedAt, "d MMM yyyy 'at' HH:mm")}`}
                          </p>
                        </div>
                        {deposit &&
                          (deposit.deposit_paid_at ||
                            deposit.acceptance_status === 'accepted_pending_deposit' ||
                            deposit.deposit_required) && (
                            <p
                              className={
                                deposit.deposit_paid_at
                                  ? 'text-sm font-medium text-emerald-400'
                                  : 'text-sm font-medium text-orange-300'
                              }
                            >
                              {deposit.deposit_paid_at
                                ? `Deposit${deposit.deposit_amount_pennies ? ` £${(deposit.deposit_amount_pennies / 100).toLocaleString('en-GB', { minimumFractionDigits: 2 })}` : ''} paid by card on ${format(new Date(deposit.deposit_paid_at), "d MMM 'at' HH:mm")}`
                                : `Waiting for the${deposit.deposit_amount_pennies ? ` £${(deposit.deposit_amount_pennies / 100).toLocaleString('en-GB', { minimumFractionDigits: 2 })}` : ''} deposit`}
                            </p>
                          )}
                        {quote.signature_url?.startsWith('data:image') && (
                          <div className="space-y-1">
                            <span className="text-sm text-white flex items-center gap-1">
                              <Signature className="h-3 w-3" /> Customer signature
                            </span>
                            <img
                              src={quote.signature_url}
                              alt="Customer signature"
                              className="h-12 bg-white rounded-lg border border-white/[0.06] p-1"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* ELE-2065: staged payments; nothing for a quote without stages. */}
                <QuotePaymentStages quoteId={quote.id} />

                {isClientDeclined && (
                  <div className="rounded-2xl bg-red-500/10 border border-red-500/25 p-4">
                    <div className="flex items-start gap-3">
                      <XCircle className="h-6 w-6 text-red-400 flex-shrink-0" />
                      <div className="flex-1">
                        <p className="font-semibold text-red-400">Declined</p>
                        <p className="text-sm text-white">
                          {quote.accepted_by_name
                            ? `${quote.accepted_by_name} declined`
                            : 'Declined'}
                          {respondedAt && ` on ${format(respondedAt, "d MMM yyyy 'at' HH:mm")}`}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {!isClientAccepted && !isClientDeclined && quote.status !== 'Draft' && (
                  <FormCard bleed eyebrow="Customer link">
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
                        Get the customer link
                      </SecondaryButton>
                    )}
                    <p className="text-xs text-white mt-2">
                      The customer can view, sign and accept the quote on this page.
                    </p>
                  </FormCard>
                )}

                {lineItems.filter((item: any) => item.type === 'labour').length > 0 && (
                  <FormCard bleed eyebrow="Labour">
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
                                {qtyUnit(item.quantity, 'hrs')} × {money(item.unitPrice)}/hr
                              </p>
                            </div>
                            <span className="font-bold text-white shrink-0 tabular-nums">
                              {money(lineTotal(item))}
                            </span>
                          </div>
                        ))}
                    </div>
                  </FormCard>
                )}

                <QuotePriceMoves quoteId={quote.id} />

                {lineItems.filter((item: any) => item.type !== 'labour').length > 0 && (
                  <FormCard bleed eyebrow="Materials">
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
                                {qtyUnit(item.quantity, item.unit)} × {money(item.unitPrice)}
                              </p>
                            </div>
                            <span className="font-bold text-white shrink-0 tabular-nums">
                              {money(lineTotal(item))}
                            </span>
                          </div>
                        ))}
                    </div>
                  </FormCard>
                )}

                <div className="rounded-2xl p-4 bg-white/[0.06] border border-elec-yellow/30 space-y-2">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-white">Subtotal</span>
                    <span className="font-medium text-white tabular-nums">
                      {money(subtotal)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-white">
                      {reverseCharge ? 'VAT, reverse charge' : `VAT at ${vatRate}%`}
                    </span>
                    <span className="font-medium text-white tabular-nums">
                      {money(vatAmount)}
                    </span>
                  </div>
                  <div className="h-px w-full bg-white/[0.08] my-2" />
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-medium text-white">Total inc. VAT</span>
                    <span className="text-2xl font-bold text-elec-yellow tabular-nums">
                      {money(quote.value)}
                    </span>
                  </div>
                  {cisAmount > 0 && (
                    <>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-white">
                          Less CIS ({Number(quote.cis_rate ?? 20)}% of labour)
                        </span>
                        <span className="font-medium text-red-400 tabular-nums">
                          −{money(cisAmount)}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-white">Amount payable</span>
                        <span className="text-lg font-semibold text-white tabular-nums">
                          {money(amountPayable)}
                        </span>
                      </div>
                    </>
                  )}
                  {reverseCharge && (
                    <p className="text-[11px] text-white leading-relaxed pt-1">
                      Reverse charge: customer to account to HMRC for the VAT of{' '}
                      {money(subtotal * (vatRate / 100))} ({vatRate}%). VAT Act 1994, s.55A.
                    </p>
                  )}
                </div>
              </div>
              <div className="min-w-0 space-y-4">
                <FormCard bleed eyebrow="Details">
                  {(quote as any).job_title && (
                    <div className="bg-white/[0.06] rounded-xl p-3">
                      <Eyebrow>Project</Eyebrow>
                      <p className="font-semibold text-elec-yellow text-lg mt-0.5">
                        {(quote as any).job_title}
                      </p>
                    </div>
                  )}
                  {!linkedJobId && (quote.status === 'Approved' || isClientAccepted) && (
                    <button
                      type="button"
                      onClick={handleCreateJob}
                      disabled={creatingJob}
                      className="flex w-full items-center gap-2 min-h-11 rounded-xl bg-white/[0.03] border border-white/[0.06] px-3.5 py-2.5 text-left touch-manipulation transition-colors hover:bg-white/[0.08] disabled:opacity-60"
                    >
                      {creatingJob ? (
                        <Loader2 className="h-4 w-4 animate-spin text-elec-yellow shrink-0" />
                      ) : (
                        <Briefcase className="h-4 w-4 text-elec-yellow shrink-0" />
                      )}
                      <span className="min-w-0">
                        <span className="block text-[13px] font-medium text-white">
                          Create job from this quote
                        </span>
                        <span className="block text-[12px] text-white">
                          Client, site and scope filled in, ready to give a date
                        </span>
                      </span>
                      <ChevronRight className="ml-auto h-4 w-4 text-white shrink-0" />
                    </button>
                  )}
                  {linkedJobId && (
                    <button
                      type="button"
                      onClick={handleViewJob}
                      className="flex w-full items-center gap-2 min-h-11 rounded-xl bg-white/[0.03] border border-white/[0.06] px-3.5 py-2.5 text-left touch-manipulation transition-colors hover:bg-white/[0.08]"
                    >
                      <Briefcase className="h-4 w-4 text-elec-yellow shrink-0" />
                      <span className="text-[13px] font-medium text-white">View linked job</span>
                      <ChevronRight className="ml-auto h-4 w-4 text-white shrink-0" />
                    </button>
                  )}
                  <div data-help="quotes.link-job">
                    <Eyebrow>{linkedJobId ? 'On job' : 'Link to a job'}</Eyebrow>
                    <div className="mt-1.5">
                      <FirmJobPicker
                        value={linkedJobId}
                        onChange={(id) => void handleLinkJob(id)}
                        placeholder={linkingJob ? 'Saving…' : 'Pick the job this quote is for'}
                        allowNone="Not on a job"
                      />
                    </div>
                    {!linkedJobId && (
                      <p className="mt-1.5 text-[12.5px] leading-snug text-white">
                        Its money then shows on the job, and Invoice this job can use it.
                      </p>
                    )}
                  </div>
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
                          {day(quote.created_at)}
                        </p>
                      </div>
                    </div>
                    {quote.sent_date && (
                      <div className="flex items-center gap-2">
                        <Send className="h-4 w-4 text-white" />
                        <div>
                          <Eyebrow>Sent</Eyebrow>
                          <p className="font-medium text-white text-sm">
                            {day(quote.sent_date)}
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
                            {day(quote.valid_until)}
                          </p>
                        </div>
                      </div>
                    )}
                  </FormGrid>
                  {byLine && <p className="text-[13px] text-white">{byLine}</p>}
                </FormCard>

                {quote.notes && (
                  <FormCard bleed eyebrow="Notes">
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
                    onClick={() => {
                      // Render the printable quote locally — the deployed
                      // generate-quote-pdf is the electrician template renderer
                      // and knows nothing about employer quotes
                      const items = Array.isArray(quote.line_items) ? quote.line_items : [];
                      // Escape EVERY user-entered string (client names like
                      // "Smith & Sons <Ltd>" must not break or inject markup).
                      const esc = (s: string) =>
                        s
                          .replace(/&/g, '&amp;')
                          .replace(/</g, '&lt;')
                          .replace(/>/g, '&gt;')
                          .replace(/"/g, '&quot;');
                      const rows = items
                        .map(
                          (i: { description?: string; quantity?: number; total?: number }) =>
                            `<tr><td>${esc(i.description || '')}</td><td>${i.quantity ?? 1}</td><td style="text-align:right">${money(i.total || 0)}</td></tr>`
                        )
                        .join('');
                      // Branded header/footer from the company profile so the
                      // client-facing artifact matches the invoice PDF standard.
                      const companyName = companyProfile?.company_name?.trim() || '';
                      const logoUrl =
                        companyProfile?.logo_url || companyProfile?.logo_data_url || '';
                      const contactBits = [
                        companyProfile?.company_phone,
                        companyProfile?.company_email,
                        companyProfile?.company_website,
                      ]
                        .filter(Boolean)
                        .map((v) => esc(String(v)))
                        .join(' · ');
                      const headerHtml = companyName
                        ? `<div class="brand">${logoUrl ? `<img src="${esc(logoUrl)}" alt="${esc(companyName)}" style="max-height:56px;max-width:180px;object-fit:contain"/>` : ''}<div><div style="font-size:18px;font-weight:700">${esc(companyName)}</div>${companyProfile?.company_address ? `<div style="font-size:12px;color:#64748b;white-space:pre-line">${esc(companyProfile.company_address)}</div>` : ''}${contactBits ? `<div style="font-size:12px;color:#64748b">${contactBits}</div>` : ''}</div></div><hr style="border:none;border-top:2px solid #f59e0b;margin:16px 0"/>`
                        : '';
                      const footerHtml = companyName
                        ? `<p style="margin-top:32px;font-size:11px;color:#94a3b8">${esc(companyName)}${companyProfile?.company_registration ? ` · Company No. ${esc(companyProfile.company_registration)}` : ''}${companyProfile?.vat_number ? ` · VAT No. ${esc(companyProfile.vat_number)}` : ''}</p>`
                        : '';
                      const html = `<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Quote ${esc(quote.quote_number)}</title>
<style>body{font-family:-apple-system,'Segoe UI',Roboto,sans-serif;color:#0f172a;max-width:760px;margin:0 auto;padding:40px}h1{font-size:22px}.brand{display:flex;gap:16px;align-items:center}table{width:100%;border-collapse:collapse;margin:20px 0}th,td{text-align:left;padding:10px 0;border-bottom:1px solid #e2e8f0;font-size:14px}th{font-size:11px;text-transform:uppercase;color:#64748b}.total{font-size:24px;font-weight:700;text-align:right;margin-top:16px}.actions{position:fixed;bottom:24px;right:24px}.actions button{padding:12px 24px;font-weight:600;border-radius:10px;border:none;cursor:pointer;background:#f59e0b}@media print{.actions{display:none}}</style></head>
<body>${headerHtml}<h1>Quote ${esc(quote.quote_number)}</h1><p>${esc(quote.client)}${quote.description ? ` · ${esc(quote.description)}` : ''}</p>
${quote.valid_until ? `<p style="font-size:13px;color:#64748b">Valid until ${day(quote.valid_until)}</p>` : ''}
${rows ? `<table><thead><tr><th>Description</th><th>Qty</th><th style="text-align:right">Amount</th></tr></thead><tbody>${rows}</tbody></table>` : ''}
<p style="text-align:right;font-size:14px;color:#475569;margin:4px 0">Subtotal: ${money(subtotal)}<br/>${reverseCharge ? 'VAT, reverse charge: £0.00' : `VAT (${vatRate}%): ${money(vatAmount)}`}</p>
<p class="total">Total: ${money(Number(quote.value))}</p>
${cisAmount > 0 ? `<p style="text-align:right;font-size:14px;color:#475569;margin:4px 0">Less CIS (${Number(quote.cis_rate ?? 20)}% of labour): −${money(cisAmount)}<br/><strong>Amount payable: ${money(amountPayable)}</strong></p>` : ''}
${reverseCharge ? `<p style="font-size:12px;color:#64748b;margin-top:16px">VAT reverse charge applies. Customer to account to HMRC for the VAT of ${money(subtotal * (vatRate / 100))} (${vatRate}%). This quotation shows £0 VAT. Do not pay the VAT to the supplier. VAT Act 1994, s.55A.</p>` : ''}
${footerHtml}
<div class="actions"><button onclick="window.print()">Print / Save as PDF</button></div></body></html>`;
                      const viewWindow = window.open('', '_blank');
                      if (viewWindow) {
                        viewWindow.document.write(html);
                        viewWindow.document.close();
                        viewWindow.focus();
                        toast.success('Quote opened. Use the button to print or save as PDF');
                      } else {
                        toast.error('Pop-up blocked. Allow pop-ups to view the quote');
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

                <SecondaryButton onClick={() => setShowSignatureRequest(true)} fullWidth>
                  <Signature className="h-4 w-4 mr-2" />
                  Request signature
                </SecondaryButton>

                <FormGrid cols={2}>
                  <SecondaryButton
                    onClick={handleDuplicate}
                    disabled={createQuoteMutation.isPending}
                    fullWidth
                  >
                    {createQuoteMutation.isPending ? (
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    ) : (
                      <Copy className="h-4 w-4 mr-2" />
                    )}
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
              </div>
            </div>
          </SheetShell>
        </SheetContent>
      </Sheet>

      <ResponsiveFormModal open={showEmailDialog} onOpenChange={setShowEmailDialog}>
        <ResponsiveFormModalContent className="bg-[hsl(0_0%_8%)] border-white/[0.08]">
          <ResponsiveFormModalHeader>
            <ResponsiveFormModalTitle className="text-white">
              Send quote to client
            </ResponsiveFormModalTitle>
          </ResponsiveFormModalHeader>
          <ResponsiveFormModalBody className="pb-6">
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
                This will send quote {quote.quote_number} for {money(quote.value)} to the client with
                an accept or decline link.
              </p>
            </div>
            <div className="flex gap-2 pb-2">
              <SecondaryButton onClick={() => setShowEmailDialog(false)} fullWidth>
                Cancel
              </SecondaryButton>
              <PrimaryButton
                onClick={() => handleSendEmail()}
                disabled={!recipientEmail || isSending}
                fullWidth
              >
                {isSending ? (
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                ) : (
                  <Send className="h-4 w-4 mr-2" />
                )}
                Send email
              </PrimaryButton>
            </div>
          </ResponsiveFormModalBody>
        </ResponsiveFormModalContent>
      </ResponsiveFormModal>

      <ResponsiveFormModal open={showLinkDialog} onOpenChange={setShowLinkDialog}>
        <ResponsiveFormModalContent className="bg-[hsl(0_0%_8%)] border-white/[0.08]">
          <ResponsiveFormModalHeader>
            <ResponsiveFormModalTitle className="text-white">
              Quote accept link generated
            </ResponsiveFormModalTitle>
          </ResponsiveFormModalHeader>
          <ResponsiveFormModalBody className="pb-6">
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
            <div className="flex gap-2 pb-2">
              <SecondaryButton onClick={() => setShowLinkDialog(false)} fullWidth>
                Close
              </SecondaryButton>
              <PrimaryButton onClick={() => openExternalUrl(acceptLink || '')} fullWidth>
                <ExternalLink className="h-4 w-4 mr-2" />
                Preview portal
              </PrimaryButton>
            </div>
          </ResponsiveFormModalBody>
        </ResponsiveFormModalContent>
      </ResponsiveFormModal>

      <RequestSignatureSheet
        open={showSignatureRequest}
        onOpenChange={setShowSignatureRequest}
        documentType="Quote"
        documentId={quote.id}
        documentTitle={`Quote ${quote.quote_number}`}
        jobId={linkedJobId ?? undefined}
        defaultName={quote.client}
        defaultEmail={quote.client_email}
        defaultPhone={quote.client_phone}
      />
    </>
  );
}
