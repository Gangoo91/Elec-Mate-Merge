import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Quote } from '@/types/quote';
import { supabase } from '@/integrations/supabase/client';
import { Loader2, ArrowLeft, MoreHorizontal } from 'lucide-react';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { toast } from '@/hooks/use-toast';
import CertificateGenerationDialog from '@/components/inspection/CertificateGenerationDialog';
import { Helmet } from 'react-helmet';
import { QuoteSendDropdown } from '@/components/electrician/quote-builder/QuoteSendDropdown';
import { useCompanyProfile } from '@/hooks/useCompanyProfile';
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
import { format, differenceInDays, isPast } from 'date-fns';
import { cn } from '@/lib/utils';

/** Gradient section header — matches cert form pattern */
const SectionHeader = ({ title }: { title: string }) => (
  <div className="mb-3">
    <div className="h-[2px] w-full rounded-full bg-gradient-to-r from-elec-yellow/40 to-elec-yellow/10 mb-2" />
    <h2 className="text-[11px] font-bold text-white uppercase tracking-widest">{title}</h2>
  </div>
);

const QuoteViewPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [quote, setQuote] = useState<Quote | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [showGenerationDialog, setShowGenerationDialog] = useState(false);
  const [generatedPdfUrl, setGeneratedPdfUrl] = useState<string | null>(null);
  const [pdfFilename, setPdfFilename] = useState('Quote.pdf');
  const [generationError, setGenerationError] = useState<string | null>(null);
  const [isConverting, setIsConverting] = useState(false);
  const [isSendingReminder, setIsSendingReminder] = useState(false);
  const [isReverting, setIsReverting] = useState(false);
  const [showActionsSheet, setShowActionsSheet] = useState(false);
  const [showRevertDialog, setShowRevertDialog] = useState(false);
  const [emailTracking, setEmailTracking] = useState<{
    email_opened_at?: string;
    email_open_count?: number;
    first_sent_at?: string;
    reminder_count?: number;
  } | null>(null);
  const { companyProfile } = useCompanyProfile();

  const formatCurrency = (amount: number | undefined | null) => {
    const safeAmount = typeof amount === 'number' && !isNaN(amount) ? amount : 0;
    return new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(safeAmount);
  };

  // === DATA LOADING ===
  useEffect(() => {
    const loadQuote = async () => {
      if (!id) { setError(true); setLoading(false); return; }
      try {
        const { data, error } = await supabase.from('quotes').select('*').eq('id', id).single();
        if (error) throw error;
        if (!data) { setError(true); return; }

        const transformedQuote: Quote = {
          id: data.id, quoteNumber: data.quote_number,
          client: typeof data.client_data === 'string' ? JSON.parse(data.client_data) : data.client_data,
          items: typeof data.items === 'string' ? JSON.parse(data.items) : data.items,
          settings: typeof data.settings === 'string' ? JSON.parse(data.settings) : data.settings,
          jobDetails: data.job_details ? (typeof data.job_details === 'string' ? JSON.parse(data.job_details) : data.job_details) : undefined,
          subtotal: data.subtotal || 0, overhead: data.overhead || 0, profit: data.profit || 0,
          vatAmount: data.vat_amount || 0, total: data.total || 0, discountAmount: data.discount_amount || 0,
          status: data.status as Quote['status'], tags: data.tags as Quote['tags'],
          createdAt: new Date(data.created_at), updatedAt: new Date(data.updated_at),
          expiryDate: new Date(data.expiry_date), notes: data.notes || undefined,
          acceptance_status: data.acceptance_status as Quote['acceptance_status'],
          acceptance_method: data.acceptance_method as Quote['acceptance_method'],
          accepted_at: data.accepted_at ? new Date(data.accepted_at) : undefined,
          accepted_by_name: data.accepted_by_name || undefined,
          signature_url: data.signature_url || undefined,
          invoice_raised: data.invoice_raised || false,
          invoice_number: data.invoice_number || undefined,
          pdf_url: data.pdf_url || undefined,
          pdf_version: data.pdf_version || 0,
        };
        setQuote(transformedQuote);
        setEmailTracking({ first_sent_at: data.first_sent_at, reminder_count: data.reminder_count || 0 });

        const { data: viewData } = await supabase.from('quote_views').select('email_opened_at, email_open_count').eq('quote_id', data.id).maybeSingle();
        if (viewData) {
          setEmailTracking((prev) => ({ ...prev, email_opened_at: viewData.email_opened_at, email_open_count: viewData.email_open_count || 0 }));
        }
      } catch (err) {
        console.error('Error loading quote:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    loadQuote();
  }, [id]);

  // === HANDLERS ===
  const handleDownloadPDF = async () => {
    if (!quote) return;
    setIsDownloading(true); setGeneratedPdfUrl(null); setGenerationError(null); setShowGenerationDialog(true);
    try {
      const effectiveCompanyProfile = companyProfile || {
        id: 'default', user_id: 'default', company_name: 'Your Electrical Company',
        company_email: 'contact@yourcompany.com', company_phone: '0123 456 7890',
        company_address: '123 Business Street, London', primary_color: '#1e40af',
        secondary_color: '#3b82f6', currency: 'GBP', locale: 'en-GB',
        vat_number: 'GB123456789', payment_terms: 'Payment due within 30 days',
        created_at: new Date(), updated_at: new Date(),
      };
      const { data, error } = await supabase.functions.invoke('generate-pdf-monkey', { body: { quote, companyProfile: effectiveCompanyProfile } });
      if (error) throw error;
      let downloadUrl = data.downloadUrl;
      const documentId = data.documentId;
      if (!downloadUrl && documentId) {
        for (let i = 0; i < 18; i++) {
          await new Promise((resolve) => setTimeout(resolve, 5000));
          const { data: statusData } = await supabase.functions.invoke('generate-pdf-monkey', { body: { mode: 'status', documentId } });
          if (statusData?.downloadUrl) { downloadUrl = statusData.downloadUrl; break; }
        }
      }
      if (downloadUrl) {
        await supabase.from('quotes').update({ pdf_document_id: documentId, pdf_url: downloadUrl, pdf_generated_at: new Date().toISOString(), pdf_version: (quote.pdf_version || 0) + 1 }).eq('id', quote.id);
        setGeneratedPdfUrl(downloadUrl);
        setPdfFilename(`Quote-${quote.quoteNumber || quote.id}.pdf`);
        toast({ title: 'PDF ready' });
      } else { throw new Error('Failed to generate PDF'); }
    } catch (error: any) {
      setGenerationError(error?.message || 'PDF generation failed');
      toast({ title: 'PDF generation failed', variant: 'destructive' });
    } finally { setIsDownloading(false); }
  };

  const handleDelete = async () => {
    if (!quote) return;
    setIsDeleting(true);
    try {
      const { error } = await supabase.from('quotes').delete().eq('id', quote.id);
      if (error) throw error;
      toast({ title: 'Quote deleted' });
      navigate('/electrician/quotes');
    } catch (err) {
      toast({ title: 'Failed to delete', variant: 'destructive' });
    } finally { setIsDeleting(false); setShowDeleteDialog(false); }
  };

  const handleMarkAsAccepted = async () => {
    if (!quote) return;
    const { error } = await supabase.from('quotes').update({ acceptance_status: 'accepted', accepted_at: new Date().toISOString() }).eq('id', quote.id);
    if (error) { toast({ title: 'Failed', variant: 'destructive' }); }
    else {
      setQuote((prev) => prev ? { ...prev, acceptance_status: 'accepted', accepted_at: new Date().toISOString() } : prev);
      toast({ title: 'Quote accepted', description: 'You can now convert to an invoice.' });
    }
  };

  const handleRevertToSent = async () => {
    if (!quote) return;
    setIsReverting(true);
    try {
      const { error } = await supabase.from('quotes').update({ acceptance_status: 'pending', status: 'sent', accepted_at: null, accepted_by_name: null, updated_at: new Date().toISOString() }).eq('id', quote.id);
      if (error) throw error;
      setQuote((prev) => prev ? { ...prev, acceptance_status: 'pending', status: 'sent', accepted_at: undefined } : prev);
      toast({ title: 'Reverted to Sent' });
    } catch (err: any) { toast({ title: 'Failed', variant: 'destructive' }); }
    finally { setIsReverting(false); setShowRevertDialog(false); }
  };

  const handleConvertToInvoice = () => {
    if (!quote) return;
    navigate(`/electrician/invoice-quote-builder/${quote.id}`);
  };

  const handleSendReminder = async () => {
    if (!quote) return;
    setIsSendingReminder(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) { toast({ title: 'Not authenticated', variant: 'destructive' }); return; }
      const { data, error } = await supabase.functions.invoke('send-quote-reminder', {
        body: { quoteId: quote.id, reminderType: 'gentle' },
        headers: { Authorization: `Bearer ${session.access_token}` },
      });
      if (error) throw error;
      setEmailTracking((prev) => ({ ...prev, reminder_count: (prev?.reminder_count || 0) + 1 }));
      toast({ title: 'Reminder sent', description: data?.message || 'Follow-up sent to client' });
    } catch (err: any) { toast({ title: 'Failed to send reminder', variant: 'destructive' }); }
    finally { setIsSendingReminder(false); }
  };

  const handleDuplicate = async () => {
    if (!quote) return;
    navigate(`/electrician/quote-builder/create?duplicate=${quote.id}`);
    toast({ title: 'Duplicating quote', description: 'Edit the copy and save as new' });
  };

  // === DERIVED STATE ===
  const isExpired = quote?.expiryDate ? isPast(new Date(quote.expiryDate)) : false;
  const daysUntilExpiry = quote?.expiryDate ? differenceInDays(new Date(quote.expiryDate), new Date()) : null;
  const isAccepted = quote?.acceptance_status === 'accepted';
  const canAccept = (quote?.status === 'sent' || quote?.status === 'pending') && !isAccepted && !quote?.invoice_raised;
  const canConvertToInvoice = isAccepted && !quote?.invoice_raised;
  const canRevert = isAccepted && !quote?.invoice_raised;
  const canSendReminder = (quote?.status === 'sent' || quote?.status === 'pending') && !isAccepted && (emailTracking?.reminder_count || 0) < 3 && !isExpired;

  const getStatusBadge = () => {
    if (quote?.invoice_raised) return { label: 'Invoiced', style: 'bg-blue-500/15 text-blue-400 border border-blue-500/20' };
    if (isAccepted) return { label: 'Accepted', style: 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/20' };
    if (quote?.acceptance_status === 'rejected') return { label: 'Declined', style: 'bg-red-500/15 text-red-400 border border-red-500/20' };
    if (isExpired) return { label: 'Expired', style: 'bg-red-500/15 text-red-400 border border-red-500/20' };
    if (quote?.status === 'sent' || quote?.status === 'pending') return { label: 'Sent', style: 'bg-amber-500/15 text-amber-400 border border-amber-500/20' };
    return { label: 'Draft', style: 'bg-white/[0.08] text-white border border-white/[0.12]' };
  };

  const getGradient = () => {
    if (quote?.invoice_raised) return 'from-blue-500 via-blue-400 to-cyan-400';
    if (isAccepted) return 'from-emerald-500 via-emerald-400 to-green-400';
    if (quote?.acceptance_status === 'rejected') return 'from-red-500 via-rose-400 to-pink-400';
    if (quote?.status === 'sent' || quote?.status === 'pending') return 'from-amber-500 via-amber-400 to-yellow-400';
    return 'from-elec-yellow/60 via-elec-yellow/40 to-amber-400/20';
  };

  // === LOADING / ERROR ===
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-elec-yellow" />
      </div>
    );
  }

  if (error || !quote) {
    return (
      <div className="min-h-screen bg-background p-4">
        <button onClick={() => navigate('/electrician/quotes')} className="flex items-center gap-2 text-white mb-8 touch-manipulation">
          <ArrowLeft className="h-5 w-5" /> Back to Quotes
        </button>
        <div className="text-center py-12">
          <p className="text-lg font-semibold text-white">Quote not found</p>
          <p className="text-sm text-white mt-1">It may have been deleted.</p>
        </div>
      </div>
    );
  }

  const statusBadge = getStatusBadge();

  // Activity timeline events
  const timelineEvents: { label: string; date?: string; colour: string; active: boolean }[] = [];
  timelineEvents.push({
    label: 'Created',
    date: quote.createdAt ? format(new Date(quote.createdAt), 'd MMM') : undefined,
    colour: 'bg-white',
    active: true,
  });
  if (emailTracking?.first_sent_at) {
    timelineEvents.push({ label: 'Sent', date: format(new Date(emailTracking.first_sent_at), 'd MMM'), colour: 'bg-amber-400', active: true });
  } else if (quote.status !== 'draft') {
    timelineEvents.push({ label: 'Sent', colour: 'bg-amber-400', active: true });
  } else {
    timelineEvents.push({ label: 'Sent', colour: 'bg-white/20', active: false });
  }
  if (emailTracking?.email_open_count && emailTracking.email_open_count > 0) {
    timelineEvents.push({
      label: `Viewed ${emailTracking.email_open_count}×`,
      date: emailTracking.email_opened_at ? format(new Date(emailTracking.email_opened_at), 'd MMM') : undefined,
      colour: 'bg-blue-400', active: true,
    });
  } else {
    timelineEvents.push({ label: 'Viewed', colour: 'bg-white/20', active: false });
  }
  if ((emailTracking?.reminder_count ?? 0) > 0) {
    timelineEvents.push({
      label: `${emailTracking?.reminder_count} Reminder${(emailTracking?.reminder_count ?? 0) !== 1 ? 's' : ''}`,
      colour: 'bg-purple-400', active: true,
    });
  }
  if (isAccepted) {
    timelineEvents.push({
      label: 'Accepted',
      date: quote.accepted_at ? format(new Date(quote.accepted_at), 'd MMM') : undefined,
      colour: 'bg-emerald-400', active: true,
    });
  } else if (quote.acceptance_status === 'rejected') {
    timelineEvents.push({ label: 'Declined', colour: 'bg-red-400', active: true });
  } else {
    timelineEvents.push({ label: 'Awaiting', colour: 'bg-white/20', active: false });
  }
  if (quote.invoice_raised) {
    timelineEvents.push({ label: 'Invoiced', colour: 'bg-blue-400', active: true });
  }

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Quote {quote.quoteNumber} | Elec-Mate</title>
      </Helmet>

      {/* Sticky header */}
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-md">
        <div className={cn('h-[2px] bg-gradient-to-r', getGradient())} />
        <div className="flex items-center h-12 px-4 gap-3">
          <button
            onClick={() => navigate('/electrician/quotes')}
            className="h-9 w-9 -ml-1.5 flex items-center justify-center rounded-xl hover:bg-white/[0.05] active:scale-[0.95] touch-manipulation flex-shrink-0"
          >
            <ArrowLeft className="h-5 w-5 text-white" />
          </button>
          <span className="font-mono text-[13px] text-white flex-1 min-w-0 truncate">{quote.quoteNumber}</span>
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
            <p className="text-[11px] text-white uppercase tracking-widest mb-3">Total</p>
            <p className="text-[42px] font-bold text-elec-yellow leading-none tracking-tight">
              {formatCurrency(quote.total)}
            </p>
            <p className="text-[16px] font-semibold text-white mt-3">{quote.client?.name || 'No client'}</p>
            {quote.jobDetails?.title && (
              <p className="text-[13px] text-white mt-0.5">{quote.jobDetails.title}</p>
            )}
            <div className="flex items-center gap-3 mt-3">
              {quote.expiryDate && !quote.invoice_raised && (
                <span className={cn('text-[11px] font-medium', isExpired ? 'text-red-400' : 'text-white')}>
                  {isExpired ? 'Expired' : daysUntilExpiry !== null && daysUntilExpiry <= 7 ? `Expires in ${daysUntilExpiry}d` : `Expires ${format(new Date(quote.expiryDate), 'd MMM yyyy')}`}
                </span>
              )}
              {quote.invoice_raised && quote.invoice_number && (
                <span className="text-[11px] font-medium text-blue-400">Invoice {quote.invoice_number}</span>
              )}
            </div>
          </div>
        </div>

        {/* === PRIMARY ACTIONS === */}
        {(canAccept || canConvertToInvoice) && (
          <div className="space-y-2">
            {canAccept && (
              <button
                onClick={handleMarkAsAccepted}
                className="w-full h-[52px] rounded-2xl bg-gradient-to-r from-emerald-500 to-emerald-600 text-white text-[15px] font-semibold touch-manipulation active:scale-[0.98] transition-all shadow-lg shadow-emerald-500/20"
              >
                Mark as Accepted
              </button>
            )}
            {canConvertToInvoice && (
              <button
                onClick={handleConvertToInvoice}
                disabled={isConverting}
                className="w-full h-[52px] rounded-2xl bg-gradient-to-r from-elec-yellow to-amber-500 text-black text-[15px] font-semibold touch-manipulation active:scale-[0.98] transition-all shadow-lg shadow-elec-yellow/20"
              >
                Convert to Invoice
              </button>
            )}
          </div>
        )}

        {/* === QUICK ACTIONS — inline primary only === */}
        <div className="grid grid-cols-2 gap-2">
          <QuoteSendDropdown
            quote={quote}
            onSent={() => setQuote((prev) => prev ? { ...prev, status: 'sent' } : prev)}
          />
          <button
            onClick={handleDownloadPDF}
            disabled={isDownloading}
            className="h-11 rounded-xl bg-white/[0.06] border border-white/[0.08] text-[13px] font-medium text-white touch-manipulation active:scale-[0.97] active:bg-white/[0.1] transition-all disabled:opacity-50"
          >
            {isDownloading ? 'Generating...' : 'Download PDF'}
          </button>
        </div>

        {/* === TIMELINE === */}
        <div>
          <SectionHeader title="Timeline" />
          <div className="flex items-end gap-0 overflow-x-auto scrollbar-hide -mx-4 px-4">
            {timelineEvents.map((event, i) => (
              <div key={i} className="flex items-center flex-shrink-0">
                {i > 0 && (
                  <div className={cn('w-5 h-[2px] flex-shrink-0', event.active ? 'bg-white/20' : 'bg-white/[0.08]')} />
                )}
                <div className="flex flex-col items-center gap-1 py-1">
                  <div className={cn('w-2 h-2 rounded-full flex-shrink-0', event.colour)} />
                  <p className="text-[10px] font-medium whitespace-nowrap text-white">
                    {event.label}
                  </p>
                  {event.date && (
                    <p className="text-[9px] -mt-0.5 text-white">{event.date}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* === CLIENT === */}
        <div>
          <SectionHeader title="Client" />
          <div className="space-y-1">
            <p className="text-[16px] font-semibold text-white">{quote.client?.name || 'No client'}</p>
            {quote.client?.email && (
              <a href={`mailto:${quote.client.email}`} className="block text-[13px] text-elec-yellow touch-manipulation">
                {quote.client.email}
              </a>
            )}
            {quote.client?.phone && (
              <a href={`tel:${quote.client.phone}`} className="block text-[13px] text-elec-yellow touch-manipulation">
                {quote.client.phone}
              </a>
            )}
            {(quote.client?.address || quote.client?.postcode) && (
              <p className="text-[13px] text-white">
                {[quote.client?.address, quote.client?.postcode].filter(Boolean).join(', ')}
              </p>
            )}
          </div>
        </div>

        {/* === JOB === */}
        {quote.jobDetails?.title && (
          <div>
            <SectionHeader title="Job" />
            <p className="text-[15px] font-semibold text-white">{quote.jobDetails.title}</p>
            {quote.jobDetails.description && (
              <p className="text-[13px] text-white mt-1 whitespace-pre-line">{quote.jobDetails.description}</p>
            )}
            {quote.jobDetails.location && (
              <p className="text-[13px] text-white mt-1">{quote.jobDetails.location}</p>
            )}
          </div>
        )}

        {/* === DATES === */}
        <div>
          <SectionHeader title="Dates" />
          <div className="flex gap-8">
            <div>
              <p className="text-[10px] text-white uppercase tracking-widest mb-1">Created</p>
              <p className="text-[14px] font-medium text-white">{format(new Date(quote.createdAt), 'd MMM yyyy')}</p>
            </div>
            <div>
              <p className="text-[10px] text-white uppercase tracking-widest mb-1">Expires</p>
              <p className={cn('text-[14px] font-medium', isExpired ? 'text-red-400' : 'text-white')}>
                {format(new Date(quote.expiryDate), 'd MMM yyyy')}
              </p>
            </div>
            {quote.accepted_at && (
              <div>
                <p className="text-[10px] text-white uppercase tracking-widest mb-1">Accepted</p>
                <p className="text-[14px] font-medium text-emerald-400">{format(new Date(quote.accepted_at), 'd MMM yyyy')}</p>
              </div>
            )}
          </div>
        </div>

        {/* === LINE ITEMS === */}
        {quote.items && quote.items.length > 0 && (
          <div>
            <SectionHeader title={`Items (${quote.items.length})`} />
            <div className="space-y-0 divide-y divide-white/[0.06]">
              {quote.items.map((item) => (
                <div key={item.id} className="flex items-start justify-between gap-4 py-3">
                  <div className="flex items-start gap-3 flex-1 min-w-0">
                    <div className={cn(
                      'w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0',
                      item.category === 'labour' ? 'bg-blue-500' :
                      item.category === 'materials' ? 'bg-green-500' :
                      item.category === 'equipment' ? 'bg-purple-500' : 'bg-white'
                    )} />
                    <div className="flex-1 min-w-0">
                      <p className="text-[14px] text-white font-medium">{item.description}</p>
                      <p className="text-[12px] text-white mt-0.5">
                        {item.quantity} {item.unit || 'units'} × {formatCurrency(item.unitPrice)}
                      </p>
                    </div>
                  </div>
                  <p className="text-[14px] font-semibold text-white flex-shrink-0 tabular-nums">
                    {formatCurrency(item.totalPrice)}
                  </p>
                </div>
              ))}
            </div>

            {/* Pricing breakdown */}
            <div className="mt-4 pt-4 border-t border-white/[0.08] space-y-2">
              <div className="flex justify-between text-[13px]">
                <span className="text-white">Subtotal</span>
                <span className="text-white tabular-nums">{formatCurrency(quote.subtotal)}</span>
              </div>
              {quote.overhead > 0 && (
                <div className="flex justify-between text-[13px]">
                  <span className="text-white">Overhead ({quote.settings?.overheadPercentage || 0}%)</span>
                  <span className="text-white tabular-nums">{formatCurrency(quote.overhead)}</span>
                </div>
              )}
              {quote.profit > 0 && (
                <div className="flex justify-between text-[13px]">
                  <span className="text-white">Profit ({quote.settings?.profitPercentage || 0}%)</span>
                  <span className="text-white tabular-nums">{formatCurrency(quote.profit)}</span>
                </div>
              )}
              {quote.discountAmount > 0 && (
                <div className="flex justify-between text-[13px]">
                  <span className="text-white">Discount</span>
                  <span className="text-white tabular-nums">−{formatCurrency(quote.discountAmount)}</span>
                </div>
              )}
              {quote.vatAmount > 0 && (
                <div className="flex justify-between text-[13px]">
                  <span className="text-white">VAT ({quote.settings?.vatRate || 20}%)</span>
                  <span className="text-white tabular-nums">{formatCurrency(quote.vatAmount)}</span>
                </div>
              )}
              <div className="flex justify-between items-baseline pt-3 border-t border-white/[0.08]">
                <span className="text-[15px] font-bold text-white">Total</span>
                <span className="text-[22px] font-bold text-elec-yellow tabular-nums">{formatCurrency(quote.total)}</span>
              </div>
            </div>
          </div>
        )}

        {/* === NOTES === */}
        {quote.notes && (
          <div>
            <SectionHeader title="Notes" />
            <p className="text-[13px] text-white whitespace-pre-line leading-relaxed">{quote.notes}</p>
          </div>
        )}

        {/* === SIGNATURE === */}
        {isAccepted && quote.signature_url && (
          <div>
            <SectionHeader title="Signature" />
            <img
              src={quote.signature_url}
              alt="Customer signature"
              className="max-w-[220px] h-auto bg-white rounded-xl p-3"
            />
            {quote.accepted_by_name && (
              <p className="text-[12px] text-white mt-2">Signed by {quote.accepted_by_name}</p>
            )}
          </div>
        )}

      </div>

      {/* === DIALOGS === */}
      {/* Actions Bottom Sheet */}
      <Sheet open={showActionsSheet} onOpenChange={setShowActionsSheet}>
        <SheetContent side="bottom" className="rounded-t-2xl p-0 max-h-[60vh]">
          <div className="p-5 space-y-1">
            <p className="text-xs font-medium text-white uppercase tracking-wider mb-3 px-1">Actions</p>
            <button
              onClick={() => { setShowActionsSheet(false); navigate(`/electrician/quote-builder/${quote.id}`); }}
              className="w-full flex items-center justify-between h-12 px-4 rounded-xl hover:bg-white/[0.04] touch-manipulation active:scale-[0.99] transition-all"
            >
              <span className="text-[15px] font-medium text-white">Edit Quote</span>
              <span className="text-[12px] text-white">→</span>
            </button>
            <button
              onClick={() => { setShowActionsSheet(false); handleDuplicate(); }}
              className="w-full flex items-center justify-between h-12 px-4 rounded-xl hover:bg-white/[0.04] touch-manipulation active:scale-[0.99] transition-all"
            >
              <span className="text-[15px] font-medium text-white">Duplicate</span>
              <span className="text-[12px] text-white">→</span>
            </button>
            {canSendReminder && (
              <button
                onClick={() => { setShowActionsSheet(false); handleSendReminder(); }}
                disabled={isSendingReminder}
                className="w-full flex items-center justify-between h-12 px-4 rounded-xl hover:bg-white/[0.04] touch-manipulation active:scale-[0.99] transition-all disabled:opacity-50"
              >
                <span className="text-[15px] font-medium text-blue-400">{isSendingReminder ? 'Sending...' : 'Send Reminder'}</span>
              </button>
            )}
            {canRevert && (
              <button
                onClick={() => { setShowActionsSheet(false); setShowRevertDialog(true); }}
                className="w-full flex items-center justify-between h-12 px-4 rounded-xl hover:bg-white/[0.04] touch-manipulation active:scale-[0.99] transition-all"
              >
                <span className="text-[15px] font-medium text-amber-400">Revert to Draft</span>
              </button>
            )}
            <div className="border-t border-white/[0.06] mt-2 pt-2">
              <button
                onClick={() => { setShowActionsSheet(false); setShowDeleteDialog(true); }}
                className="w-full flex items-center h-12 px-4 rounded-xl hover:bg-red-500/[0.06] touch-manipulation active:scale-[0.99] transition-all"
              >
                <span className="text-[15px] font-medium text-red-400">Delete Quote</span>
              </button>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Quote {quote.quoteNumber}?</AlertDialogTitle>
            <AlertDialogDescription>This cannot be undone.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} disabled={isDeleting} className="bg-red-500 hover:bg-red-600">
              {isDeleting ? 'Deleting...' : 'Delete'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={showRevertDialog} onOpenChange={setShowRevertDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Revert to Sent?</AlertDialogTitle>
            <AlertDialogDescription>This will undo the acceptance.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleRevertToSent} disabled={isReverting} className="bg-amber-500 hover:bg-amber-600">
              {isReverting ? 'Reverting...' : 'Revert'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <CertificateGenerationDialog
        open={showGenerationDialog}
        onOpenChange={setShowGenerationDialog}
        pdfUrl={generatedPdfUrl}
        filename={pdfFilename}
        error={generationError}
        isGenerating={isDownloading}
        title="Quote PDF"
      />
    </div>
  );
};

export default QuoteViewPage;
