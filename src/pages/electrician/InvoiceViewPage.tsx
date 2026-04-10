import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { cn } from '@/lib/utils';
import { Loader2, ArrowLeft, MoreHorizontal } from 'lucide-react';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Quote } from '@/types/quote';
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

/** Gradient section header — matching QuoteViewPage */
const SectionHeader = ({ title }: { title: string }) => (
  <div className="mb-3">
    <div className="h-[2px] w-full rounded-full bg-gradient-to-r from-elec-yellow/40 to-elec-yellow/10 mb-2" />
    <h2 className="text-[11px] font-bold text-white uppercase tracking-widest">{title}</h2>
  </div>
);

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
  const getDaysOverdue = () => {
    if (!invoice?.invoice_due_date || invoice.invoice_status === 'paid') return null;
    const days = differenceInDays(new Date(), new Date(invoice.invoice_due_date));
    return days > 0 ? days : null;
  };

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
  const isOverdue = !!daysOverdue && daysOverdue > 0;
  const isSent = invoice.invoice_status === 'sent';
  const isDraft = invoice.invoice_status === 'draft' || !invoice.invoice_status;
  const canMarkPaid = !isPaid && !isDraft;

  const getGradient = () => {
    if (isPaid) return 'from-emerald-500 via-emerald-400 to-green-400';
    if (isOverdue) return 'from-red-500 via-rose-400 to-pink-400';
    if (isSent) return 'from-blue-500 via-blue-400 to-cyan-400';
    return 'from-elec-yellow/60 via-elec-yellow/40 to-amber-400/20';
  };

  const getStatusBadge = () => {
    if (isPaid) return { label: 'Paid', style: 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/20' };
    if (isOverdue) return { label: 'Overdue', style: 'bg-red-500/15 text-red-400 border border-red-500/20' };
    if (isSent) return { label: 'Sent', style: 'bg-blue-500/15 text-blue-400 border border-blue-500/20' };
    return { label: 'Draft', style: 'bg-white/[0.08] text-white border border-white/[0.12]' };
  };

  const statusBadge = getStatusBadge();

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
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-md">
        <div className={cn('h-[2px] bg-gradient-to-r', getGradient())} />
        <div className="flex items-center h-12 px-4 gap-3">
          <button
            onClick={() => navigate('/electrician/invoices')}
            className="h-9 w-9 -ml-1.5 flex items-center justify-center rounded-xl hover:bg-white/[0.05] active:scale-[0.95] touch-manipulation flex-shrink-0"
          >
            <ArrowLeft className="h-5 w-5 text-white" />
          </button>
          <span className="font-mono text-[13px] text-white flex-1 min-w-0 truncate">{invoice.invoice_number}</span>
          <span className={cn('text-[11px] font-semibold px-2.5 py-1 rounded-lg', statusBadge.style)}>{statusBadge.label}</span>
          <button
            onClick={() => setShowActionsSheet(true)}
            className="h-9 w-9 flex items-center justify-center rounded-xl hover:bg-white/[0.05] active:scale-[0.95] touch-manipulation flex-shrink-0"
          >
            <MoreHorizontal className="h-5 w-5 text-white" />
          </button>
        </div>
      </header>

      <div className="px-4 py-5 space-y-6 pb-8 max-w-3xl mx-auto lg:px-6">

        {/* === HERO === */}
        <div className="relative rounded-2xl overflow-hidden">
          <div className={cn('absolute inset-0 bg-gradient-to-br opacity-10', getGradient())} />
          <div className={cn('absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r', getGradient())} />
          <div className="relative p-5">
            <p className="text-[11px] text-white uppercase tracking-widest mb-3">Amount Due</p>
            <p className="text-[42px] font-bold text-elec-yellow leading-none tracking-tight">
              {formatCurrency(invoice.total)}
            </p>
            <p className="text-[16px] font-semibold text-white mt-3">{invoice.client?.name || 'No client'}</p>
            {invoice.jobDetails?.title && (
              <p className="text-[13px] text-white mt-0.5">{invoice.jobDetails.title}</p>
            )}
            <div className="flex items-center gap-3 mt-3">
              {invoice.invoice_date && (
                <span className="text-[11px] font-medium text-white">
                  Issued {format(new Date(invoice.invoice_date), 'd MMM yyyy')}
                </span>
              )}
              {isOverdue && daysOverdue && (
                <span className="text-[11px] font-medium text-red-400">{daysOverdue}d overdue</span>
              )}
            </div>
          </div>
        </div>

        {/* === PRIMARY CTA === */}
        {canMarkPaid && (
          <button
            onClick={() => setShowMarkPaidDialog(true)}
            disabled={isMarkingPaid}
            className="w-full h-[52px] rounded-2xl bg-gradient-to-r from-emerald-500 to-emerald-600 text-white text-[15px] font-semibold touch-manipulation active:scale-[0.98] transition-all shadow-lg shadow-emerald-500/20"
          >
            Mark as Paid
          </button>
        )}

        {/* === QUICK ACTIONS — inline primary only === */}
        <div className="grid grid-cols-2 gap-2">
          <InvoiceSendDropdown invoice={invoice} onSuccess={fetchInvoice} refreshKey={0} compact />
          <button
            onClick={handleDownloadPDF}
            disabled={isDownloading}
            className="h-11 rounded-xl bg-white/[0.06] border border-white/[0.08] text-[13px] font-medium text-white touch-manipulation active:scale-[0.97] active:bg-white/[0.1] transition-all disabled:opacity-50"
          >
            {isDownloading ? 'Generating...' : 'Download PDF'}
          </button>
        </div>

        {/* === TIMELINE — vertical stepper === */}
        <div>
          <SectionHeader title="Timeline" />
          <div className="space-y-0">
            {timelineEvents.map((event, i) => (
              <div key={i} className="flex items-stretch gap-3">
                {/* Dot + vertical line */}
                <div className="flex flex-col items-center w-4 flex-shrink-0">
                  <div className={cn(
                    'w-3 h-3 rounded-full flex-shrink-0 mt-0.5',
                    event.active ? event.colour : 'bg-white/[0.12] border border-white/[0.15]'
                  )} />
                  {i < timelineEvents.length - 1 && (
                    <div className={cn('w-[2px] flex-1 min-h-[20px] my-1', timelineEvents[i + 1].active ? 'bg-white/15' : 'bg-white/[0.06]')} />
                  )}
                </div>
                {/* Label + date */}
                <div className="flex items-baseline justify-between flex-1 pb-3">
                  <p className={cn('text-[13px] font-medium', event.active ? 'text-white' : 'text-white/30')}>
                    {event.label}
                  </p>
                  {event.date && (
                    <p className="text-[12px] text-white/50 tabular-nums">{event.date}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* === LATE PAYMENT INTEREST === */}
        {isOverdue && daysOverdue && daysOverdue > 0 && (
          <div>
            <SectionHeader title="Late Payment Interest" />
            <div className="flex items-center justify-between">
              <p className="text-[13px] text-white">
                {daysOverdue} days at 8.5% statutory rate
              </p>
              <span className="text-[15px] font-bold text-red-400">
                +{formatCurrency((invoice.total * 0.085 * daysOverdue) / 365)}
              </span>
            </div>
          </div>
        )}

        {/* === CLIENT === */}
        <div>
          <SectionHeader title="Client" />
          <div className="space-y-1">
            <p className="text-[16px] font-semibold text-white">{invoice.client?.name || 'No client'}</p>
            {invoice.client?.email && (
              <a href={`mailto:${invoice.client.email}`} className="block text-[13px] text-elec-yellow touch-manipulation">
                {invoice.client.email}
              </a>
            )}
            {invoice.client?.phone && (
              <a href={`tel:${invoice.client.phone}`} className="block text-[13px] text-elec-yellow touch-manipulation">
                {invoice.client.phone}
              </a>
            )}
            {(invoice.client?.address || invoice.client?.postcode) && (
              <p className="text-[13px] text-white">
                {[invoice.client?.address, invoice.client?.postcode].filter(Boolean).join(', ')}
              </p>
            )}
          </div>
        </div>

        {/* === JOB === */}
        {invoice.jobDetails?.title && (
          <div>
            <SectionHeader title="Job" />
            <p className="text-[15px] font-semibold text-white">{invoice.jobDetails.title}</p>
            {invoice.jobDetails.description && (
              <p className="text-[13px] text-white mt-1 whitespace-pre-line">{invoice.jobDetails.description}</p>
            )}
            {invoice.jobDetails.location && (
              <p className="text-[13px] text-white mt-1">{invoice.jobDetails.location}</p>
            )}
          </div>
        )}

        {/* === DATES === */}
        <div>
          <SectionHeader title="Dates" />
          <div className="flex gap-8">
            <div>
              <p className="text-[10px] text-white uppercase tracking-widest mb-1">Issued</p>
              <p className="text-[14px] font-medium text-white">
                {invoice.invoice_date ? format(new Date(invoice.invoice_date), 'd MMM yyyy') : '—'}
              </p>
            </div>
            <div>
              <p className="text-[10px] text-white uppercase tracking-widest mb-1">Due</p>
              <p className={cn('text-[14px] font-medium', isOverdue ? 'text-red-400' : 'text-white')}>
                {invoice.invoice_due_date ? format(new Date(invoice.invoice_due_date), 'd MMM yyyy') : '—'}
              </p>
            </div>
            {isPaid && (invoice as any).invoice_paid_at && (
              <div>
                <p className="text-[10px] text-white uppercase tracking-widest mb-1">Paid</p>
                <p className="text-[14px] font-medium text-emerald-400">
                  {format(new Date((invoice as any).invoice_paid_at), 'd MMM yyyy')}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* === LINE ITEMS === */}
        {allItems.length > 0 && (
          <div>
            <SectionHeader title={`Items (${allItems.length})`} />
            <div className="space-y-0 divide-y divide-white/[0.06]">
              {allItems.map((item: any, index: number) => {
                const lineTotal = item.totalPrice || (item.quantity || 0) * (item.unitPrice || item.price || 0);
                return (
                  <div key={item.id || index} className="flex items-start justify-between gap-4 py-3">
                    <div className="flex items-start gap-3 flex-1 min-w-0">
                      <div className={cn(
                        'w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0',
                        item.category === 'labour' ? 'bg-blue-500' :
                        item.category === 'materials' ? 'bg-green-500' :
                        item.category === 'equipment' ? 'bg-purple-500' : 'bg-white'
                      )} />
                      <div className="flex-1 min-w-0">
                        <p className="text-[14px] text-white font-medium">{item.description || item.name}</p>
                        <p className="text-[12px] text-white mt-0.5">
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
                <span className="text-white">Subtotal</span>
                <span className="text-white tabular-nums">{formatCurrency(invoice.subtotal)}</span>
              </div>
              {(invoice.overhead ?? 0) > 0 && (
                <div className="flex justify-between text-[13px]">
                  <span className="text-white">Overhead</span>
                  <span className="text-white tabular-nums">{formatCurrency(invoice.overhead)}</span>
                </div>
              )}
              {(invoice.profit ?? 0) > 0 && (
                <div className="flex justify-between text-[13px]">
                  <span className="text-white">Profit</span>
                  <span className="text-white tabular-nums">{formatCurrency(invoice.profit)}</span>
                </div>
              )}
              {(invoice.vatAmount ?? 0) > 0 && (
                <div className="flex justify-between text-[13px]">
                  <span className="text-white">VAT ({invoice.settings?.vatRate || 20}%)</span>
                  <span className="text-white tabular-nums">{formatCurrency(invoice.vatAmount)}</span>
                </div>
              )}
              <div className="flex justify-between items-baseline pt-3 border-t border-white/[0.08]">
                <span className="text-[15px] font-bold text-white">Total</span>
                <span className="text-[22px] font-bold text-elec-yellow tabular-nums">{formatCurrency(invoice.total)}</span>
              </div>
            </div>
          </div>
        )}

        {/* === NOTES === */}
        {invoice.notes && (
          <div>
            <SectionHeader title="Notes" />
            <p className="text-[13px] text-white whitespace-pre-line leading-relaxed">{invoice.notes}</p>
          </div>
        )}

      </div>

      {/* === ACTIONS BOTTOM SHEET === */}
      <Sheet open={showActionsSheet} onOpenChange={setShowActionsSheet}>
        <SheetContent side="bottom" className="rounded-t-2xl p-0 max-h-[60vh]">
          <div className="p-5 space-y-1">
            <p className="text-xs font-medium text-white uppercase tracking-wider mb-3 px-1">Actions</p>
            {!isPaid && (
              <button
                onClick={() => { setShowActionsSheet(false); navigate(`/electrician/invoice-quote-builder/${invoice.id}`); }}
                className="w-full flex items-center justify-between h-12 px-4 rounded-xl hover:bg-white/[0.04] touch-manipulation active:scale-[0.99] transition-all"
              >
                <span className="text-[15px] font-medium text-white">Edit Invoice</span>
                <span className="text-[12px] text-white">→</span>
              </button>
            )}
            {isOverdue && (
              <>
                <button
                  onClick={() => { setShowActionsSheet(false); handleChase('gentle'); }}
                  className="w-full flex items-center justify-between h-12 px-4 rounded-xl hover:bg-white/[0.04] touch-manipulation active:scale-[0.99] transition-all"
                >
                  <span className="text-[15px] font-medium text-amber-400">Send Gentle Reminder</span>
                </button>
                <button
                  onClick={() => { setShowActionsSheet(false); handleChase('firm'); }}
                  className="w-full flex items-center justify-between h-12 px-4 rounded-xl hover:bg-white/[0.04] touch-manipulation active:scale-[0.99] transition-all"
                >
                  <span className="text-[15px] font-medium text-amber-400">Send Firm Reminder</span>
                </button>
                <button
                  onClick={() => { setShowActionsSheet(false); handleChase('final'); }}
                  className="w-full flex items-center justify-between h-12 px-4 rounded-xl hover:bg-white/[0.04] touch-manipulation active:scale-[0.99] transition-all"
                >
                  <span className="text-[15px] font-medium text-red-400">Send Final Notice</span>
                </button>
              </>
            )}
            <div className="border-t border-white/[0.06] mt-2 pt-2">
              <button
                onClick={() => { setShowActionsSheet(false); setShowDeleteDialog(true); }}
                className="w-full flex items-center h-12 px-4 rounded-xl hover:bg-red-500/[0.06] touch-manipulation active:scale-[0.99] transition-all"
              >
                <span className="text-[15px] font-medium text-red-400">Delete Invoice</span>
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
