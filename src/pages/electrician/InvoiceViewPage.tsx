import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { cn } from '@/lib/utils';
import { Loader2, ArrowLeft, MoreHorizontal, Mail, Phone, Pencil, Copy, Download, Check, Bell, RefreshCw, Trash2, Send } from 'lucide-react';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { useEffect, useState, useMemo, Fragment } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Quote } from '@/types/quote';
import { computeQuoteTotals } from '@/utils/quote-calculations';
import { isInvoiceOverdue as invoiceIsOverdue, getInvoiceDaysOverdue } from '@/utils/invoice-status';
import { format, isPast, differenceInDays, addHours } from 'date-fns';
import { toast } from '@/hooks/use-toast';
import CertificateGenerationDialog from '@/components/inspection/CertificateGenerationDialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { InvoiceSendDropdown } from '@/components/electrician/invoice-builder/InvoiceSendDropdown';
import { useAccountingIntegrations } from '@/hooks/useAccountingIntegrations';
import { PANEL } from '@/components/electrician/shared/surfaces';

const InvoiceViewPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [invoice, setInvoice] = useState<Quote | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isMarkingPaid, setIsMarkingPaid] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [showGenerationDialog, setShowGenerationDialog] = useState(false);
  const [generatedPdfUrl, setGeneratedPdfUrl] = useState<string | null>(null);
  const [pdfFilename, setPdfFilename] = useState('Invoice.pdf');
  const [generationError, setGenerationError] = useState<string | null>(null);
  const [showMarkPaidDialog, setShowMarkPaidDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showActionsSheet, setShowActionsSheet] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [isRefreshingFromProvider, setIsRefreshingFromProvider] = useState(false);
  const [totalPaid, setTotalPaid] = useState<number>(0);
  const { hasConnectedProvider, syncInvoice, refreshInvoiceStatus, integrations } =
    useAccountingIntegrations();

  const connectedProvider = integrations.find((i) => i.status === 'connected');
  const providerName = connectedProvider?.provider
    ? connectedProvider.provider.charAt(0).toUpperCase() + connectedProvider.provider.slice(1)
    : 'Accounting';
  const alreadySynced = !!(invoice?.external_invoice_id);

  const handleSyncToAccounting = async () => {
    if (!invoice) return;
    setIsSyncing(true);
    try {
      const success = await syncInvoice(invoice.id);
      if (success) {
        toast({ title: `Synced to ${providerName}`, description: `Invoice ${invoice.invoice_number} has been synced.` });
        fetchInvoice();
      }
    } catch {
      toast({ title: 'Sync failed', variant: 'destructive' });
    } finally {
      setIsSyncing(false);
    }
  };

  // Pull payment status FROM the accounting provider (e.g. Xero) — used when
  // the user has marked the invoice paid externally and wants Elec-Mate to
  // catch up. ELE-872.
  const handleRefreshStatusFromProvider = async () => {
    if (!invoice) return;
    setIsRefreshingFromProvider(true);
    try {
      const result = await refreshInvoiceStatus(invoice.id);
      if (result?.updated) {
        // Status changed — pull the fresh row so the page reflects it.
        await fetchInvoice();
      }
    } finally {
      setIsRefreshingFromProvider(false);
    }
  };

  const formatCurrency = (amount: number | undefined | null) => {
    const safeAmount = typeof amount === 'number' && !isNaN(amount) ? amount : 0;
    return new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(safeAmount);
  };

  const pollPdfDownloadUrl = async (
    documentId: string,
    accessToken: string
  ): Promise<string | null> => {
    for (let i = 0; i < 45; i++) {
      const { data } = await supabase.functions.invoke('generate-pdf-monkey', {
        body: { documentId, mode: 'status' },
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      if (data?.downloadUrl) return data.downloadUrl;
      await new Promise((res) => setTimeout(res, 2000));
    }
    return null;
  };

  useEffect(() => {
    fetchInvoice();
  }, [id]);

  const fetchInvoice = async () => {
    try {
      setIsLoading(true);
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        toast({ title: 'Authentication required', description: 'Please sign in to view invoice', variant: 'destructive' });
        return;
      }

      const { data, error } = await supabase
        .from('quotes')
        .select('*')
        .eq('user_id', user.id)
        .eq('id', id)
        .eq('invoice_raised', true)
        .single();

      if (error) throw error;

      const quoteData = {
        id: data.id,
        quoteNumber: data.quote_number,
        client: data.client_data as any,
        items: data.items as any,
        settings: data.settings as any,
        subtotal: parseFloat(String(data.subtotal)),
        overhead: parseFloat(String(data.overhead)),
        profit: parseFloat(String(data.profit)),
        vatAmount: parseFloat(String(data.vat_amount)),
        total: parseFloat(String(data.total)),
        status: data.status as any,
        tags: (data.tags || []) as any,
        createdAt: new Date(data.created_at),
        updatedAt: new Date(data.updated_at),
        expiryDate: new Date(data.expiry_date),
        notes: data.notes,
        invoice_raised: data.invoice_raised,
        invoice_number: data.invoice_number,
        invoice_date: data.invoice_date ? new Date(data.invoice_date) : undefined,
        invoice_due_date: data.invoice_due_date ? new Date(data.invoice_due_date) : undefined,
        invoice_status: data.invoice_status as any,
        invoice_paid_at: data.invoice_paid_at,
        invoice_sent_at: data.invoice_sent_at,
        work_completion_date: data.work_completion_date ? new Date(data.work_completion_date) : undefined,
        jobDetails: data.job_details as any,
        pdf_url: data.pdf_url,
        pdf_generated_at: data.pdf_generated_at,
        external_invoice_id: data.external_invoice_id,
        external_invoice_provider: data.external_invoice_provider,
        external_invoice_url: data.external_invoice_url,
        external_invoice_synced_at: data.external_invoice_synced_at ? new Date(data.external_invoice_synced_at) : undefined,
        reminder_count: data.reminder_count || 0,
        last_reminder_sent_at: data.last_reminder_sent_at,
        additional_invoice_items: data.additional_invoice_items as any,
      };

      setInvoice(quoteData);
      setTotalPaid(data.total_paid != null ? parseFloat(String(data.total_paid)) : 0);
    } catch (error) {
      console.error('Error fetching invoice:', error);
      toast({ title: 'Error loading invoice', description: 'Failed to load invoice.', variant: 'destructive' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownloadPDF = async () => {
    if (!invoice) return;
    setIsDownloading(true);
    setGeneratedPdfUrl(null);
    setGenerationError(null);
    setShowGenerationDialog(true);

    try {
      const pdfIsCurrent =
        invoice.pdf_url &&
        invoice.pdf_generated_at &&
        new Date(invoice.pdf_generated_at) >= new Date(invoice.updatedAt);

      if (pdfIsCurrent) {
        setGeneratedPdfUrl(invoice.pdf_url);
        setPdfFilename(`Invoice-${invoice.invoice_number || invoice.id}.pdf`);
        setIsDownloading(false);
        return;
      }

      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { data: companyData } = await supabase
        .from('company_profiles')
        .select('*')
        .eq('user_id', user.id)
        .single();

      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error('User not authenticated');

      const { data: pdfData, error: pdfError } = await supabase.functions.invoke(
        'generate-pdf-monkey',
        {
          body: { quote: invoice, companyProfile: companyData, invoice_mode: true },
          headers: { Authorization: `Bearer ${session.access_token}` },
        }
      );

      let pdfUrl: string | undefined = pdfData?.downloadUrl;
      const documentId: string | undefined = pdfData?.documentId;
      if (!pdfUrl && documentId) {
        pdfUrl = (await pollPdfDownloadUrl(documentId, session.access_token)) || undefined;
      }

      if (pdfError || !pdfUrl) throw new Error('Failed to generate PDF');

      if (pdfUrl && documentId) {
        await supabase
          .from('quotes')
          .update({ pdf_document_id: documentId, pdf_url: pdfUrl, pdf_generated_at: new Date().toISOString() })
          .eq('id', invoice.id);
      }

      setGeneratedPdfUrl(pdfUrl);
      setPdfFilename(`Invoice-${invoice.invoice_number || invoice.id}.pdf`);
    } catch (error) {
      console.error('Error generating invoice PDF:', error);
      setGenerationError(error instanceof Error ? error.message : 'Failed to generate invoice PDF');
      toast({ title: 'Error', description: 'Failed to generate invoice PDF.', variant: 'destructive' });
    } finally {
      setIsDownloading(false);
    }
  };

  const handleMarkAsPaid = async () => {
    if (!invoice) return;
    setIsMarkingPaid(true);
    try {
      const { error } = await supabase
        .from('quotes')
        .update({ invoice_status: 'paid', invoice_paid_at: new Date().toISOString() })
        .eq('id', invoice.id);
      if (error) throw error;
      toast({ title: 'Invoice marked as paid', description: `Invoice ${invoice.invoice_number} has been marked as paid.` });
      setShowMarkPaidDialog(false);
      fetchInvoice();
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to mark invoice as paid.', variant: 'destructive' });
    } finally {
      setIsMarkingPaid(false);
    }
  };

  const handleDelete = async () => {
    if (!invoice) return;
    setIsDeleting(true);
    try {
      const { error } = await supabase
        .from('quotes')
        .update({ invoice_raised: false, invoice_number: null, invoice_status: null, invoice_date: null, invoice_due_date: null })
        .eq('id', invoice.id);
      if (error) throw error;
      toast({ title: 'Invoice deleted', description: `Invoice ${invoice.invoice_number} has been removed.` });
      navigate('/electrician/invoices');
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to delete invoice.', variant: 'destructive' });
    } finally {
      setIsDeleting(false);
      setShowDeleteDialog(false);
    }
  };

  const handleChase = async (reminderType: 'gentle' | 'firm' | 'final' = 'gentle') => {
    if (!invoice) return;
    try {
      const { error } = await supabase.functions.invoke('send-payment-reminder', {
        body: { invoiceId: invoice.id, reminderType },
      });
      if (error) throw error;
      toast({ title: 'Reminder sent', description: `Payment reminder sent to ${invoice.client?.email}` });
      fetchInvoice();
    } catch {
      toast({ title: 'Failed to send', variant: 'destructive' });
    }
  };

  // === DERIVED STATE ===
  // Single source of truth (utils/invoice-status): paid wins → explicit
  // 'overdue' status → due date + 24h grace. The old local version had no
  // grace and ignored the cron-set status, so the card and the page could
  // disagree about the same invoice.
  const getDaysOverdue = () => {
    if (!invoice || !invoiceIsOverdue(invoice)) return null;
    const days = getInvoiceDaysOverdue(invoice);
    return days > 0 ? days : null;
  };

  const cisT = useMemo(
    () =>
      computeQuoteTotals(
        ((invoice?.items as any) || []) as any,
        (invoice?.settings as any) || null,
        { applyOverheadAndProfit: true }
      ),
    [invoice]
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-elec-yellow" />
      </div>
    );
  }

  if (!invoice) {
    return (
      <div className="min-h-screen bg-background p-4">
        <button onClick={() => navigate('/electrician/invoices')} className="flex items-center gap-2 text-white mb-8 touch-manipulation">
          <ArrowLeft className="h-5 w-5" /> Back to Invoices
        </button>
        <div className="text-center py-12">
          <p className="text-lg font-semibold text-white">Invoice not found</p>
          <p className="text-sm text-white mt-1">It may have been deleted.</p>
        </div>
      </div>
    );
  }

  const daysOverdue = getDaysOverdue();
  const isPaid = invoice.invoice_status === 'paid';
  const isOverdue = invoiceIsOverdue(invoice);
  const isSent = invoice.invoice_status === 'sent';
  const isDraft = invoice.invoice_status === 'draft' || !invoice.invoice_status;
  // Outstanding is measured against the amount actually due — net payable when
  // CIS is withheld, otherwise the stored total (preserves prior behaviour).
  const amountDue = cisT.cisAmount > 0 ? cisT.netPayable : invoice.total;
  const outstanding = Math.max(0, amountDue - totalPaid);
  const isPartPaid = !isPaid && totalPaid > 0.005;
  // ELE-1023: allow draft → paid directly. Sparks often send invoices externally
  // (WhatsApp/in person) and get paid immediately, so the strict draft→sent→paid
  // flow left them stuck. Any non-paid invoice can now be marked paid.
  const canMarkPaid = !isPaid;

  const statusBadge = isPaid
    ? { label: 'Paid', dot: 'bg-emerald-400', text: 'text-emerald-400', pill: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/25', wash: 'from-emerald-500/[0.14]' }
    : isOverdue
      ? { label: 'Overdue', dot: 'bg-red-400', text: 'text-red-400', pill: 'bg-red-500/15 text-red-400 border-red-500/25', wash: 'from-red-500/[0.12]' }
      : isSent
        ? { label: 'Sent', dot: 'bg-blue-400', text: 'text-blue-400', pill: 'bg-blue-500/15 text-blue-400 border-blue-500/25', wash: 'from-blue-500/[0.14]' }
        : { label: 'Draft', dot: 'bg-white/75', text: 'text-white/85', pill: 'bg-white/[0.08] text-white/85 border-white/[0.15]', wash: 'from-white/[0.06]' };


  // All items combined
  const allItems = [
    ...(invoice.items || []),
    ...((invoice as any).additional_invoice_items || []),
  ];

  // Timeline events
  const timelineEvents: { label: string; date?: string; colour: string; active: boolean }[] = [];
  timelineEvents.push({
    label: 'Created',
    date: invoice.invoice_date ? format(new Date(invoice.invoice_date), 'd MMM') : format(new Date(invoice.createdAt), 'd MMM'),
    colour: 'bg-white',
    active: true,
  });
  if ((invoice as any).invoice_sent_at) {
    timelineEvents.push({ label: 'Sent', date: format(new Date((invoice as any).invoice_sent_at), 'd MMM'), colour: 'bg-blue-400', active: true });
  } else if (isSent || isOverdue || isPaid) {
    timelineEvents.push({ label: 'Sent', colour: 'bg-blue-400', active: true });
  } else {
    timelineEvents.push({ label: 'Sent', colour: 'bg-white/20', active: false });
  }
  if (invoice.invoice_due_date) {
    timelineEvents.push({
      label: isOverdue ? `${daysOverdue}d overdue` : 'Due',
      date: format(new Date(invoice.invoice_due_date), 'd MMM'),
      colour: isOverdue ? 'bg-red-400' : 'bg-amber-400',
      active: true,
    });
  }
  if ((invoice as any).reminder_count > 0) {
    timelineEvents.push({
      label: `${(invoice as any).reminder_count} Chase${(invoice as any).reminder_count !== 1 ? 's' : ''}`,
      colour: 'bg-purple-400',
      active: true,
    });
  }
  if (isPaid) {
    timelineEvents.push({
      label: 'Paid',
      date: (invoice as any).invoice_paid_at ? format(new Date((invoice as any).invoice_paid_at), 'd MMM') : undefined,
      colour: 'bg-emerald-400',
      active: true,
    });
  } else {
    timelineEvents.push({ label: 'Paid', colour: 'bg-white/20', active: false });
  }

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Invoice {invoice.invoice_number} | Elec-Mate</title>
      </Helmet>

      {/* Sticky header — matching QuoteViewPage exactly */}
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-md border-b border-white/[0.06]">
        <div className="flex items-center h-12 px-4 lg:px-6 gap-3">
          <button
            onClick={() => navigate('/electrician/invoices')}
            className="h-10 w-10 -ml-2 flex items-center justify-center rounded-xl hover:bg-white/[0.05] active:scale-[0.95] touch-manipulation flex-shrink-0"
          >
            <ArrowLeft className="h-5 w-5 text-white" />
          </button>
          <span className="font-mono text-[13px] text-white/85 flex-1 min-w-0 truncate">{invoice.invoice_number}</span>
          <span className="flex items-center gap-1.5 flex-shrink-0">
            <span className={cn('h-1.5 w-1.5 rounded-full', statusBadge.dot)} />
            <span className={cn('text-[11px] font-semibold uppercase tracking-[0.08em]', statusBadge.text)}>
              {statusBadge.label}
            </span>
          </span>
          <button
            onClick={() => setShowActionsSheet(true)}
            className="h-10 px-3.5 flex items-center gap-1.5 rounded-xl bg-white/[0.08] border border-white/[0.12] text-[12px] font-semibold text-white hover:bg-white/[0.12] active:scale-[0.97] transition-all touch-manipulation flex-shrink-0"
          >
            Actions
            <MoreHorizontal className="h-4 w-4 text-white/80" />
          </button>
        </div>
      </header>

      <div className="px-4 py-5 pb-10 lg:px-6 space-y-4">

        {/* === HERO PANEL === */}
        <div className="relative overflow-hidden rounded-3xl border border-white/[0.10] bg-gradient-to-b from-white/[0.07] to-white/[0.03] shadow-[0_12px_32px_rgba(0,0,0,0.4)]">
          <div className={cn('absolute inset-0 bg-gradient-to-br via-transparent to-transparent pointer-events-none', statusBadge.wash)} />
          <div className="relative p-4 sm:p-6">
            <div className="flex items-center justify-between gap-3">
              <span className="font-mono text-[12px] text-white/75 px-2.5 py-1 rounded-lg bg-white/[0.06] border border-white/[0.08]">
                {invoice.invoice_number}
              </span>
              <span className={cn('inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.06em] px-2.5 py-1 rounded-full border', statusBadge.pill)}>
                <span className={cn('h-1.5 w-1.5 rounded-full', statusBadge.dot)} />
                {statusBadge.label}
              </span>
            </div>

            <p className="text-[10px] text-white/60 uppercase tracking-[0.18em] mt-4">Amount due</p>
            <p className="mt-1.5 text-[38px] sm:text-[46px] font-bold text-elec-yellow leading-none tracking-tight tabular-nums">
              {formatCurrency(isPartPaid ? outstanding : amountDue)}
            </p>
            {isPartPaid && (
              <p className="text-[12px] font-medium text-white/70 mt-1.5 tabular-nums">
                {formatCurrency(totalPaid)} received of {formatCurrency(invoice.total)}
              </p>
            )}
            <p className="text-[17px] font-semibold text-white mt-3">{invoice.client?.name || 'No client'}</p>
            {invoice.jobDetails?.title && (
              <p className="text-[13px] text-white/70 mt-0.5">{invoice.jobDetails.title}</p>
            )}

            {/* Fact chips */}
            <div className="flex items-center gap-2 mt-4 flex-wrap">
              {invoice.invoice_date && (
                <span className="text-[11px] font-medium text-white/75 px-2.5 py-1 rounded-lg bg-white/[0.05] border border-white/[0.08]">
                  Issued {format(new Date(invoice.invoice_date), 'd MMM yyyy')}
                </span>
              )}
              {isOverdue && daysOverdue ? (
                <span className="text-[11px] font-semibold text-red-400 px-2.5 py-1 rounded-lg bg-red-500/[0.08] border border-red-500/20">
                  {daysOverdue}d overdue
                </span>
              ) : invoice.invoice_due_date && !isPaid ? (
                <span className="text-[11px] font-medium text-white/75 px-2.5 py-1 rounded-lg bg-white/[0.05] border border-white/[0.08]">
                  Due {format(new Date(invoice.invoice_due_date), 'd MMM yyyy')}
                </span>
              ) : null}
              {isPaid && (invoice as any).invoice_paid_at && (
                <span className="text-[11px] font-medium text-emerald-400 px-2.5 py-1 rounded-lg bg-emerald-500/[0.08] border border-emerald-500/15">
                  Paid {format(new Date((invoice as any).invoice_paid_at), 'd MMM yyyy')}
                </span>
              )}
              {(invoice as any).external_invoice_provider && (
                <span className="text-[11px] font-medium text-white/75 px-2.5 py-1 rounded-lg bg-white/[0.05] border border-white/[0.08] capitalize">
                  Synced · {(invoice as any).external_invoice_provider}
                </span>
              )}
            </div>

            {/* Progress stepper */}
            <div className="mt-4 pt-4 sm:mt-5 sm:pt-5 border-t border-white/[0.08]">
              <div className="flex items-start">
                {timelineEvents.map((event, i) => (
                  <Fragment key={i}>
                    {i > 0 && (
                      <div className={cn('flex-1 h-[2px] mt-[5px] min-w-3 rounded-full', event.active ? 'bg-white/30' : 'bg-white/[0.10]')} />
                    )}
                    <div className="flex flex-col items-center gap-1.5 flex-shrink-0 max-w-[72px] px-1">
                      <span className={cn('h-3 w-3 rounded-full ring-4', event.active ? cn(event.colour, 'ring-white/[0.06]') : 'bg-white/[0.10] ring-transparent border border-white/[0.2]')} />
                      <span className={cn('text-[10px] font-medium text-center leading-tight', event.active ? 'text-white/90' : 'text-white/45')}>
                        {event.label}
                      </span>
                      {event.date && <span className="text-[9px] text-white/55 tabular-nums">{event.date}</span>}
                    </div>
                  </Fragment>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* === NEXT STEP BANNER === */}
        {(isOverdue || isPartPaid || isDraft) && !isPaid && (
          <button
            onClick={() => setShowActionsSheet(true)}
            className={cn(PANEL, 'w-full flex items-center justify-between gap-3 px-4 py-3.5 touch-manipulation active:scale-[0.99] transition-all text-left select-none')}
          >
            <span className="flex items-center gap-2.5 min-w-0">
              <span className={cn('h-1.5 w-1.5 rounded-full flex-shrink-0', isOverdue ? 'bg-red-400' : isPartPaid ? 'bg-amber-400' : 'bg-white/60')} />
              <span className="text-[13px] text-white/90 leading-snug">
                {isOverdue
                  ? `${daysOverdue}d overdue — send a payment reminder before it drifts`
                  : isPartPaid
                    ? `${formatCurrency(outstanding)} still outstanding — chase or mark paid`
                    : 'Draft — send it or mark it sent when it goes out'}
              </span>
            </span>
            <span className={cn('text-[12px] font-semibold flex-shrink-0', isOverdue ? 'text-red-400' : 'text-elec-yellow')}>
              {isOverdue ? 'Chase →' : 'Actions →'}
            </span>
          </button>
        )}

        {/* === CLIENT — full width === */}
        <div className={cn(PANEL, 'p-4 sm:p-5')}>
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <div className="h-11 w-11 rounded-full bg-elec-yellow/15 border border-elec-yellow/20 flex items-center justify-center flex-shrink-0">
                <span className="text-[14px] font-bold text-elec-yellow">
                  {(invoice.client?.name || '?').split(' ').map((w) => w[0]).slice(0, 2).join('').toUpperCase()}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[15px] font-semibold text-white truncate">{invoice.client?.name || 'No client'}</p>
                {(invoice.client?.address || invoice.client?.postcode) && (
                  <p className="text-[12px] text-white/60 truncate">
                    {[invoice.client?.address, invoice.client?.postcode].filter(Boolean).join(', ')}
                  </p>
                )}
              </div>
            </div>
            {(invoice.client?.email || invoice.client?.phone) && (
              <div className="flex gap-2 sm:flex-shrink-0">
                {invoice.client?.email && (
                  <a
                    href={`mailto:${invoice.client.email}`}
                    className="flex-1 sm:flex-initial h-10 sm:px-5 flex items-center justify-center gap-2 rounded-xl bg-white/[0.06] border border-white/[0.08] text-[12px] font-medium text-white touch-manipulation active:scale-[0.97] transition-all"
                  >
                    <Mail className="h-3.5 w-3.5 text-white/70" /> Email
                  </a>
                )}
                {invoice.client?.phone && (
                  <a
                    href={`tel:${invoice.client.phone}`}
                    className="flex-1 sm:flex-initial h-10 sm:px-5 flex items-center justify-center gap-2 rounded-xl bg-white/[0.06] border border-white/[0.08] text-[12px] font-medium text-white touch-manipulation active:scale-[0.97] transition-all"
                  >
                    <Phone className="h-3.5 w-3.5 text-white/70" /> Call
                  </a>
                )}
              </div>
            )}
          </div>
        </div>

        {/* === JOB + META — two equal boxes when a job scope exists === */}
        <div
          className={cn(
            'gap-4 space-y-4 lg:space-y-0',
            invoice.jobDetails?.description || invoice.jobDetails?.location
              ? 'lg:grid lg:grid-cols-2 lg:items-stretch'
              : ''
          )}
        >
          {(invoice.jobDetails?.description || invoice.jobDetails?.location) && (
            <div>
              <div className={cn(PANEL, 'p-4 sm:p-5 h-full')}>
                <h2 className="text-[14px] font-semibold text-white mb-2">
                  {invoice.jobDetails?.title || 'Job'}
                </h2>
                {invoice.jobDetails?.description && (
                  <p className="text-[13px] text-white/80 whitespace-pre-line leading-relaxed">
                    {invoice.jobDetails.description}
                  </p>
                )}
                {invoice.jobDetails?.location && (
                  <p className="text-[12px] text-white/55 mt-2">{invoice.jobDetails.location}</p>
                )}
              </div>
            </div>
          )}
          <div
            className={cn(
              'gap-4',
              invoice.jobDetails?.description || invoice.jobDetails?.location
                ? 'flex flex-col'
                : 'grid lg:grid-cols-2 space-y-4 lg:space-y-0'
            )}
          >
            {/* Dates */}
            <div className={cn(PANEL, 'p-4 sm:p-5')}>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <p className="text-[10px] text-white/55 uppercase tracking-wider mb-1.5">Issued</p>
                  <p className="text-[13px] font-semibold text-white tabular-nums">
                    {invoice.invoice_date ? format(new Date(invoice.invoice_date), 'd MMM yy') : '—'}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] text-white/55 uppercase tracking-wider mb-1.5">Due</p>
                  <p className={cn('text-[13px] font-semibold tabular-nums', isOverdue ? 'text-red-400' : 'text-white')}>
                    {invoice.invoice_due_date ? format(new Date(invoice.invoice_due_date), 'd MMM yy') : '—'}
                  </p>
                </div>
                {isPaid && (invoice as any).invoice_paid_at ? (
                  <div>
                    <p className="text-[10px] text-white/55 uppercase tracking-wider mb-1.5">Paid</p>
                    <p className="text-[13px] font-semibold text-emerald-400 tabular-nums">
                      {format(new Date((invoice as any).invoice_paid_at), 'd MMM yy')}
                    </p>
                  </div>
                ) : (
                  <div>
                    <p className="text-[10px] text-white/55 uppercase tracking-wider mb-1.5">Terms</p>
                    <p className="text-[13px] font-semibold text-white truncate">
                      {(invoice.settings as any)?.paymentTerms || '—'}
                    </p>
                  </div>
                )}
              </div>
              {/* Late payment interest — lives with the dates it derives from */}
              {isOverdue && daysOverdue && daysOverdue > 0 && (
                <div className="flex items-center justify-between mt-4 pt-3 border-t border-white/[0.08]">
                  <p className="text-[12px] text-white/70">{daysOverdue} days late · 8.5% statutory</p>
                  <span className="text-[14px] font-bold text-red-400 tabular-nums">
                    +{formatCurrency((invoice.total * 0.085 * daysOverdue) / 365)}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* === LINE ITEMS — full width === */}
        {allItems.length > 0 && (
          <div className={cn(PANEL, 'p-4 sm:p-5')}>
            <div className="flex items-center justify-between mb-1">
              <h2 className="text-[14px] font-semibold text-white">Line items</h2>
              <span className="text-[11px] text-white/65 px-2 py-0.5 rounded-md bg-white/[0.06] tabular-nums">
                {allItems.length}
              </span>
            </div>
            <div className="space-y-0 divide-y divide-white/[0.06]">
              {allItems.map((item: any, index: number) => {
                const lineTotal = item.totalPrice || (item.quantity || 0) * (item.unitPrice || item.price || 0);
                return (
                  <div key={item.id || index} className="flex items-start justify-between gap-4 py-3">
                    <div className="flex items-start gap-3 flex-1 min-w-0">
                      <div className={cn(
                        'w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0',
                        item.category === 'labour' ? 'bg-blue-400' :
                        item.category === 'materials' ? 'bg-emerald-400' :
                        item.category === 'equipment' ? 'bg-purple-400' : 'bg-white/70'
                      )} />
                      <div className="flex-1 min-w-0">
                        <p className="text-[14px] text-white font-medium">{item.description || item.name}</p>
                        <p className="text-[12px] text-white/60 mt-0.5 tabular-nums">
                          {item.quantity} {item.unit || 'units'} × {formatCurrency(item.unitPrice || item.price || 0)}
                        </p>
                      </div>
                    </div>
                    <p className="text-[14px] font-semibold text-white flex-shrink-0 tabular-nums">
                      {formatCurrency(lineTotal)}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Pricing breakdown */}
            <div className="mt-4 pt-4 border-t border-white/[0.08] space-y-2">
              <div className="flex justify-between text-[13px]">
                <span className="text-white/65">Subtotal</span>
                <span className="text-white tabular-nums">{formatCurrency(invoice.subtotal)}</span>
              </div>
              {(invoice.overhead ?? 0) > 0 && (
                <div className="flex justify-between text-[13px]">
                  <span className="text-white/65">Overhead</span>
                  <span className="text-white tabular-nums">{formatCurrency(invoice.overhead)}</span>
                </div>
              )}
              {(invoice.profit ?? 0) > 0 && (
                <div className="flex justify-between text-[13px]">
                  <span className="text-white/65">Profit</span>
                  <span className="text-white tabular-nums">{formatCurrency(invoice.profit)}</span>
                </div>
              )}
              {(invoice.vatAmount ?? 0) > 0 && (
                <div className="flex justify-between text-[13px]">
                  <span className="text-white/65">VAT ({invoice.settings?.vatRate || 20}%)</span>
                  <span className="text-white tabular-nums">{formatCurrency(invoice.vatAmount)}</span>
                </div>
              )}
              {cisT.reverseCharge && (
                <div className="flex justify-between text-[13px]">
                  <span className="text-white/65">VAT — reverse charge</span>
                  <span className="text-white tabular-nums">£0.00</span>
                </div>
              )}
              <div className="flex justify-between items-center mt-3 px-3.5 py-3 rounded-xl bg-elec-yellow/[0.08] border border-elec-yellow/[0.15]">
                <span className="text-[14px] font-bold text-white">Total</span>
                <span className="text-[22px] font-bold text-elec-yellow tabular-nums tracking-tight">{formatCurrency(invoice.total)}</span>
              </div>
              {cisT.cisAmount > 0 && (
                <>
                  <div className="flex justify-between items-baseline pt-1 text-[13px]">
                    <span className="text-white/80">Less: CIS ({cisT.cisRate}% on labour)</span>
                    <span className="text-red-300 tabular-nums">−{formatCurrency(cisT.cisAmount)}</span>
                  </div>
                  <div className="flex justify-between items-baseline">
                    <span className="text-[14px] font-semibold text-white">Amount due</span>
                    <span className="text-[18px] font-bold text-elec-yellow tabular-nums">{formatCurrency(cisT.netPayable)}</span>
                  </div>
                </>
              )}
              {isPartPaid && (
                <>
                  <div className="flex justify-between items-baseline pt-1">
                    <span className="text-[13px] text-emerald-300">Deposit / paid</span>
                    <span className="text-[13px] text-emerald-300 tabular-nums">−{formatCurrency(totalPaid)}</span>
                  </div>
                  <div className="flex justify-between items-baseline">
                    <span className="text-[14px] font-semibold text-white">Outstanding</span>
                    <span className="text-[18px] font-bold text-elec-yellow tabular-nums">{formatCurrency(outstanding)}</span>
                  </div>
                </>
              )}
              {cisT.reverseCharge && (
                <p className="text-[11px] text-white/55 mt-2 leading-relaxed">
                  Reverse charge: customer to account to HMRC for the VAT — {formatCurrency(cisT.notionalVat)} @ {invoice.settings?.vatRate ?? 20}%.
                </p>
              )}
            </div>
          </div>
        )}

        {/* === NOTES === */}
        {invoice.notes && (
          <div className={cn(PANEL, 'p-4 sm:p-5')}>
            <h2 className="text-[14px] font-semibold text-white mb-2">Notes</h2>
            <p className="text-[13px] text-white/80 whitespace-pre-line leading-relaxed">{invoice.notes}</p>
          </div>
        )}

        {/* === ACCOUNTING SYNC STATUS === */}
        {(alreadySynced || hasConnectedProvider) && (
          <div className={cn(PANEL, 'p-4 sm:p-5')}>
            <h2 className="text-[14px] font-semibold text-white mb-3">Accounting</h2>
            {alreadySynced ? (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[14px] font-medium text-white">
                      Synced to {(invoice as any).external_invoice_provider
                        ? (invoice as any).external_invoice_provider.charAt(0).toUpperCase() + (invoice as any).external_invoice_provider.slice(1)
                        : providerName}
                    </p>
                    {(invoice as any).external_invoice_synced_at && (
                      <p className="text-[12px] text-white/50 mt-0.5">
                        {format(new Date((invoice as any).external_invoice_synced_at), 'd MMM yyyy, HH:mm')}
                      </p>
                    )}
                  </div>
                  <span className="text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-emerald-500/15 text-emerald-400 border border-emerald-500/20">Synced</span>
                </div>
                <button
                  onClick={handleRefreshStatusFromProvider}
                  disabled={isRefreshingFromProvider}
                  className="w-full flex items-center justify-between py-3 touch-manipulation active:scale-[0.99] disabled:opacity-50 border-t border-white/[0.06]"
                >
                  <div className="text-left">
                    <p className="text-[14px] font-medium text-blue-400">
                      {isRefreshingFromProvider
                        ? `Checking ${(invoice as any).external_invoice_provider || providerName}…`
                        : `Sync status from ${(invoice as any).external_invoice_provider
                            ? (invoice as any).external_invoice_provider.charAt(0).toUpperCase() + (invoice as any).external_invoice_provider.slice(1)
                            : providerName}`}
                    </p>
                    <p className="text-[11px] text-white/50 mt-0.5">
                      Pull the latest payment status if marked paid in your accounting software
                    </p>
                  </div>
                  <span className="text-[12px] text-white/50">↻</span>
                </button>
              </div>
            ) : (
              <button
                onClick={handleSyncToAccounting}
                disabled={isSyncing}
                className="w-full flex items-center justify-between py-3 touch-manipulation active:scale-[0.99] disabled:opacity-50"
              >
                <p className="text-[14px] font-medium text-blue-400">
                  {isSyncing ? 'Syncing...' : `Sync to ${providerName}`}
                </p>
                <span className="text-[12px] text-white/50">→</span>
              </button>
            )}
          </div>
        )}

      </div>

      {/* === STICKY ACTION BAR === */}
      <div className="sticky bottom-0 z-40 bg-background/95 backdrop-blur-md border-t border-white/[0.08]">
        <div className="flex gap-2 p-3 pb-[max(12px,env(safe-area-inset-bottom))] lg:px-6">
          <div className="flex-1">
            <InvoiceSendDropdown invoice={invoice} onSuccess={fetchInvoice} refreshKey={0} compact />
          </div>
          {canMarkPaid ? (
            <button
              onClick={() => setShowMarkPaidDialog(true)}
              disabled={isMarkingPaid}
              className="flex-1 h-12 rounded-xl bg-emerald-500 text-white text-[14px] font-semibold touch-manipulation active:scale-[0.97] transition-all disabled:opacity-50"
            >
              {isMarkingPaid ? 'Marking…' : 'Mark as Paid'}
              <span className="sm:hidden font-bold tabular-nums"> · {formatCurrency(isPartPaid ? outstanding : amountDue)}</span>
            </button>
          ) : (
            <button
              onClick={handleDownloadPDF}
              disabled={isDownloading}
              className="flex-1 h-12 rounded-xl bg-white/[0.08] border border-white/[0.12] text-white text-[14px] font-semibold touch-manipulation active:scale-[0.97] transition-all disabled:opacity-50"
            >
              {isDownloading ? 'Generating…' : 'Download PDF'}
            </button>
          )}
        </div>
      </div>

      {/* === ACTIONS BOTTOM SHEET === */}
      <Sheet open={showActionsSheet} onOpenChange={setShowActionsSheet}>
        <SheetContent
          side="bottom"
          className="rounded-t-2xl p-0 max-h-[85vh] overflow-y-auto overscroll-contain border-t border-white/[0.10]"
        >
          <div className="w-full px-4 sm:px-6 pt-3 pb-[max(20px,env(safe-area-inset-bottom))]">
            <div className="mx-auto h-1 w-10 rounded-full bg-white/[0.15] mb-4" />

            {/* Context header */}
            <div className="flex items-center justify-between gap-3 pb-3 mb-3 border-b border-white/[0.08]">
              <div className="min-w-0">
                <p className="text-[14px] font-semibold text-white truncate">{invoice.client?.name || 'No client'}</p>
                <p className="text-[11px] text-white/55 font-mono truncate">{invoice.invoice_number}</p>
              </div>
              <p className="text-[18px] font-bold text-elec-yellow tabular-nums flex-shrink-0">
                {formatCurrency(isPartPaid ? outstanding : amountDue)}
              </p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
              {!isPaid && (
                <button
                  onClick={() => { setShowActionsSheet(false); navigate(`/electrician/invoice-quote-builder/${invoice.id}`); }}
                  className="flex flex-col items-start gap-2.5 p-3.5 rounded-xl border touch-manipulation active:scale-[0.98] transition-all text-left select-none bg-white/[0.04] border-white/[0.08] hover:bg-white/[0.06]"
                >
                  <span className="h-10 w-10 rounded-xl flex items-center justify-center bg-white/[0.06] border border-white/[0.08]">
                    <Pencil className="h-4 w-4 text-white/85" />
                  </span>
                  <span>
                    <span className="block text-[13px] font-semibold text-white">Edit invoice</span>
                    <span className="block text-[11px] text-white/55 mt-0.5">Items, prices and details</span>
                  </span>
                </button>
              )}

              {isDraft && (
                <button
                  onClick={async () => {
                    setShowActionsSheet(false);
                    const { error } = await supabase.from('quotes').update({ invoice_status: 'sent', invoice_sent_at: new Date().toISOString() }).eq('id', invoice.id);
                    if (error) { toast({ title: 'Failed to update', variant: 'destructive' }); }
                    else { toast({ title: 'Invoice marked as sent' }); fetchInvoice(); }
                  }}
                  className="flex flex-col items-start gap-2.5 p-3.5 rounded-xl border touch-manipulation active:scale-[0.98] transition-all text-left select-none bg-blue-500/[0.06] border-blue-500/[0.15] hover:bg-blue-500/[0.1]"
                >
                  <span className="h-10 w-10 rounded-xl flex items-center justify-center bg-blue-500/15 border border-blue-500/20">
                    <Send className="h-4 w-4 text-blue-400" />
                  </span>
                  <span>
                    <span className="block text-[13px] font-semibold text-blue-400">Mark as sent</span>
                    <span className="block text-[11px] text-white/55 mt-0.5">Sent outside the app</span>
                  </span>
                </button>
              )}

              <button
                onClick={() => {
                  setShowActionsSheet(false);
                  const sessionId = `dup-${Date.now()}`;
                  sessionStorage.setItem(sessionId, JSON.stringify({
                    quoteData: {
                      client: invoice.client,
                      jobDetails: invoice.jobDetails,
                      items: [...(invoice.items || []), ...((invoice as any).additional_invoice_items || [])],
                      settings: invoice.settings,
                      notes: invoice.notes,
                    },
                  }));
                  navigate(`/electrician/invoice-builder/create?quoteSessionId=${sessionId}`);
                }}
                className="flex flex-col items-start gap-2.5 p-3.5 rounded-xl border touch-manipulation active:scale-[0.98] transition-all text-left select-none bg-white/[0.04] border-white/[0.08] hover:bg-white/[0.06]"
              >
                <span className="h-10 w-10 rounded-xl flex items-center justify-center bg-white/[0.06] border border-white/[0.08]">
                  <Copy className="h-4 w-4 text-white/85" />
                </span>
                <span>
                  <span className="block text-[13px] font-semibold text-white">Duplicate</span>
                  <span className="block text-[11px] text-white/55 mt-0.5">New invoice from this one</span>
                </span>
              </button>

              <button
                onClick={() => { setShowActionsSheet(false); handleDownloadPDF(); }}
                className="flex flex-col items-start gap-2.5 p-3.5 rounded-xl border touch-manipulation active:scale-[0.98] transition-all text-left select-none bg-white/[0.04] border-white/[0.08] hover:bg-white/[0.06]"
              >
                <span className="h-10 w-10 rounded-xl flex items-center justify-center bg-white/[0.06] border border-white/[0.08]">
                  <Download className="h-4 w-4 text-white/85" />
                </span>
                <span>
                  <span className="block text-[13px] font-semibold text-white">Download PDF</span>
                  <span className="block text-[11px] text-white/55 mt-0.5">Client-ready document</span>
                </span>
              </button>

              {isOverdue && (
                <>
                  <button
                    onClick={() => { setShowActionsSheet(false); handleChase('gentle'); }}
                    className="flex flex-col items-start gap-2.5 p-3.5 rounded-xl border touch-manipulation active:scale-[0.98] transition-all text-left select-none bg-amber-500/[0.06] border-amber-500/[0.15] hover:bg-amber-500/[0.1]"
                  >
                    <span className="h-10 w-10 rounded-xl flex items-center justify-center bg-amber-500/15 border border-amber-500/20">
                      <Bell className="h-4 w-4 text-amber-400" />
                    </span>
                    <span>
                      <span className="block text-[13px] font-semibold text-amber-400">Gentle reminder</span>
                      <span className="block text-[11px] text-white/55 mt-0.5">A friendly nudge</span>
                    </span>
                  </button>
                  <button
                    onClick={() => { setShowActionsSheet(false); handleChase('firm'); }}
                    className="flex flex-col items-start gap-2.5 p-3.5 rounded-xl border touch-manipulation active:scale-[0.98] transition-all text-left select-none bg-amber-500/[0.06] border-amber-500/[0.15] hover:bg-amber-500/[0.1]"
                  >
                    <span className="h-10 w-10 rounded-xl flex items-center justify-center bg-amber-500/15 border border-amber-500/20">
                      <Bell className="h-4 w-4 text-amber-400" />
                    </span>
                    <span>
                      <span className="block text-[13px] font-semibold text-amber-400">Firm reminder</span>
                      <span className="block text-[11px] text-white/55 mt-0.5">Payment now due</span>
                    </span>
                  </button>
                  <button
                    onClick={() => { setShowActionsSheet(false); handleChase('final'); }}
                    className="flex flex-col items-start gap-2.5 p-3.5 rounded-xl border touch-manipulation active:scale-[0.98] transition-all text-left select-none bg-red-500/[0.05] border-red-500/[0.15] hover:bg-red-500/[0.08]"
                  >
                    <span className="h-10 w-10 rounded-xl flex items-center justify-center bg-red-500/15 border border-red-500/20">
                      <Bell className="h-4 w-4 text-red-400" />
                    </span>
                    <span>
                      <span className="block text-[13px] font-semibold text-red-400">Final notice</span>
                      <span className="block text-[11px] text-white/55 mt-0.5">Before further action</span>
                    </span>
                  </button>
                </>
              )}

              {hasConnectedProvider && (
                <button
                  onClick={() => { setShowActionsSheet(false); handleSyncToAccounting(); }}
                  disabled={isSyncing}
                  className="flex flex-col items-start gap-2.5 p-3.5 rounded-xl border touch-manipulation active:scale-[0.98] transition-all text-left select-none bg-white/[0.04] border-white/[0.08] hover:bg-blue-500/[0.06] disabled:opacity-50"
                >
                  <span className="h-10 w-10 rounded-xl flex items-center justify-center bg-blue-500/15 border border-blue-500/20">
                    <RefreshCw className={cn('h-4 w-4 text-blue-400', isSyncing && 'animate-spin')} />
                  </span>
                  <span>
                    <span className="block text-[13px] font-semibold text-white">
                      {isSyncing ? 'Syncing…' : alreadySynced ? `Re-sync · ${providerName}` : `Sync to ${providerName}`}
                    </span>
                    <span className="block text-[11px] text-white/55 mt-0.5">
                      {alreadySynced ? 'Push the latest version' : 'Send to your accounts'}
                    </span>
                  </span>
                </button>
              )}

              {alreadySynced && (
                <button
                  onClick={() => { setShowActionsSheet(false); handleRefreshStatusFromProvider(); }}
                  disabled={isRefreshingFromProvider}
                  className="flex flex-col items-start gap-2.5 p-3.5 rounded-xl border touch-manipulation active:scale-[0.98] transition-all text-left select-none bg-white/[0.04] border-white/[0.08] hover:bg-blue-500/[0.06] disabled:opacity-50"
                >
                  <span className="h-10 w-10 rounded-xl flex items-center justify-center bg-blue-500/15 border border-blue-500/20">
                    <RefreshCw className={cn('h-4 w-4 text-blue-400', isRefreshingFromProvider && 'animate-spin')} />
                  </span>
                  <span>
                    <span className="block text-[13px] font-semibold text-white">
                      {isRefreshingFromProvider ? 'Checking…' : 'Pull payment status'}
                    </span>
                    <span className="block text-[11px] text-white/55 mt-0.5">If paid in your accounts</span>
                  </span>
                </button>
              )}
            </div>

            {/* Destructive — separated */}
            <div className="border-t border-white/[0.08] mt-3 pt-3">
              <button
                onClick={() => { setShowActionsSheet(false); setShowDeleteDialog(true); }}
                className="w-full flex items-center gap-3 h-12 px-3 rounded-xl hover:bg-red-500/[0.06] active:bg-red-500/[0.1] touch-manipulation transition-all"
              >
                <Trash2 className="h-4 w-4 text-red-400 flex-shrink-0" />
                <span className="text-[13px] font-semibold text-red-400">Delete invoice</span>
                <span className="text-[11px] text-white/45 ml-auto">The original quote is preserved</span>
              </button>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Mark as Paid Dialog */}
      <AlertDialog open={showMarkPaidDialog} onOpenChange={setShowMarkPaidDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Mark Invoice as Paid?</AlertDialogTitle>
            <AlertDialogDescription>
              This will mark invoice {invoice.invoice_number} as paid. The payment date will be recorded as today.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isMarkingPaid}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleMarkAsPaid}
              disabled={isMarkingPaid}
              className="bg-emerald-600 hover:bg-emerald-700"
            >
              {isMarkingPaid ? 'Marking...' : 'Mark as Paid'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Delete Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Invoice {invoice.invoice_number}?</AlertDialogTitle>
            <AlertDialogDescription>
              This will remove the invoice. The original quote will be preserved.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={isDeleting}
              className="bg-destructive hover:bg-destructive/90"
            >
              {isDeleting ? 'Deleting...' : 'Delete'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <CertificateGenerationDialog
        open={showGenerationDialog}
        onOpenChange={setShowGenerationDialog}
        isGenerating={isDownloading}
        pdfUrl={generatedPdfUrl}
        pdfFilename={pdfFilename}
        errorMessage={generationError}
        documentLabel="Invoice"
      />
    </div>
  );
};

export default InvoiceViewPage;
