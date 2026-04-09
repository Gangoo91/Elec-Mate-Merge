import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Download,
  Edit,
  CheckCircle,
  AlertCircle,
  ArrowLeft,
  User,
  Calendar,
  Clock,
  Phone,
  Mail,
  MapPin,
  FileText,
  Loader2,
  Send,
  Trash2,
  PoundSterling,
} from 'lucide-react';
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

  const formatCurrency = (amount: number | undefined | null) => {
    const safeAmount = typeof amount === 'number' && !isNaN(amount) ? amount : 0;
    return new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(
      safeAmount
    );
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
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        toast({
          title: 'Authentication required',
          description: 'Please sign in to view invoice',
          variant: 'destructive',
        });
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
        work_completion_date: data.work_completion_date
          ? new Date(data.work_completion_date)
          : undefined,
        jobDetails: data.job_details as any,
        pdf_url: data.pdf_url,
        pdf_generated_at: data.pdf_generated_at,
        // External accounting sync fields
        external_invoice_id: data.external_invoice_id,
        external_invoice_provider: data.external_invoice_provider,
        external_invoice_url: data.external_invoice_url,
        external_invoice_synced_at: data.external_invoice_synced_at
          ? new Date(data.external_invoice_synced_at)
          : undefined,
      };

      setInvoice(quoteData);
    } catch (error) {
      console.error('Error fetching invoice:', error);
      toast({
        title: 'Error loading invoice',
        description: 'Failed to load invoice. Please try again.',
        variant: 'destructive',
      });
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

      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { data: companyData } = await supabase
        .from('company_profiles')
        .select('*')
        .eq('user_id', user.id)
        .single();

      const {
        data: { session },
      } = await supabase.auth.getSession();
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
          .update({
            pdf_document_id: documentId,
            pdf_url: pdfUrl,
            pdf_generated_at: new Date().toISOString(),
          })
          .eq('id', invoice.id);
      }

      setGeneratedPdfUrl(pdfUrl);
      setPdfFilename(`Invoice-${invoice.invoice_number || invoice.id}.pdf`);
    } catch (error) {
      console.error('Error generating invoice PDF:', error);
      setGenerationError(error instanceof Error ? error.message : 'Failed to generate invoice PDF');
      toast({
        title: 'Error',
        description: 'Failed to generate invoice PDF.',
        variant: 'destructive',
      });
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
        .update({
          invoice_status: 'paid',
          invoice_paid_at: new Date().toISOString(),
        })
        .eq('id', invoice.id);

      if (error) throw error;

      toast({
        title: 'Invoice marked as paid',
        description: `Invoice ${invoice.invoice_number} has been marked as paid.`,
      });
      setShowMarkPaidDialog(false);
      fetchInvoice();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to mark invoice as paid.',
        variant: 'destructive',
      });
    } finally {
      setIsMarkingPaid(false);
    }
  };

  const handleDelete = async () => {
    if (!invoice) return;
    setIsDeleting(true);

    try {
      // Just remove the invoice flag, keeping the quote
      const { error } = await supabase
        .from('quotes')
        .update({
          invoice_raised: false,
          invoice_number: null,
          invoice_status: null,
          invoice_date: null,
          invoice_due_date: null,
        })
        .eq('id', invoice.id);

      if (error) throw error;

      toast({
        title: 'Invoice deleted',
        description: `Invoice ${invoice.invoice_number} has been removed.`,
      });
      navigate('/electrician/invoices');
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to delete invoice.', variant: 'destructive' });
    } finally {
      setIsDeleting(false);
      setShowDeleteDialog(false);
    }
  };

  // Get status info for styling
  const getStatusInfo = () => {
    if (!invoice) return null;

    const isOverdue =
      invoice.invoice_due_date &&
      isPast(addHours(new Date(invoice.invoice_due_date), 24)) &&
      invoice.invoice_status !== 'paid';

    if (invoice.invoice_status === 'paid') {
      return {
        gradient: 'from-emerald-500/20 via-emerald-600/10 to-transparent',
        badge: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
        label: 'Paid',
        icon: CheckCircle,
      };
    }
    if (isOverdue || invoice.invoice_status === 'overdue') {
      return {
        gradient: 'from-red-500/20 via-red-600/10 to-transparent',
        badge: 'bg-red-500/20 text-red-400 border-red-500/30',
        label: 'Overdue',
        icon: AlertCircle,
      };
    }
    if (invoice.invoice_status === 'sent') {
      return {
        gradient: 'from-blue-500/20 via-blue-600/10 to-transparent',
        badge: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
        label: 'Sent',
        icon: Send,
      };
    }
    return {
      gradient: 'from-zinc-500/20 via-zinc-600/10 to-transparent',
      badge: 'bg-zinc-500/20 text-zinc-400 border-zinc-500/30',
      label: 'Draft',
      icon: FileText,
    };
  };

  const getDaysOverdue = () => {
    if (!invoice?.invoice_due_date || invoice.invoice_status === 'paid') return null;
    const days = differenceInDays(new Date(), new Date(invoice.invoice_due_date));
    return days > 0 ? days : null;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!invoice) {
    return (
      <div className="bg-background p-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate('/electrician/invoices')}
          className="mb-4"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Invoices
        </Button>
        <div className="text-center py-12 space-y-4">
          <FileText className="h-16 w-16 mx-auto text-white/30" />
          <h2 className="text-2xl font-bold">Invoice Not Found</h2>
          <p className="text-white">
            The invoice you're looking for doesn't exist or may have been deleted.
          </p>
          <Button onClick={() => navigate('/electrician/invoices')}>View All Invoices</Button>
        </div>
      </div>
    );
  }

  const statusInfo = getStatusInfo();
  const daysOverdue = getDaysOverdue();
  const isPaid = invoice.invoice_status === 'paid';
  const isOverdue = !!daysOverdue && daysOverdue > 0;
  const isSent = invoice.invoice_status === 'sent';
  const isDraft = invoice.invoice_status === 'draft';
  const canMarkPaid = isSent || isOverdue;

  const getGradient = () => {
    if (isPaid) return 'from-emerald-500 via-emerald-400 to-green-400';
    if (isOverdue) return 'from-red-500 via-rose-400 to-pink-400';
    if (isSent) return 'from-blue-500 via-blue-400 to-cyan-400';
    return 'from-slate-400 via-slate-300 to-gray-400';
  };

  const getStatusBadge = () => {
    if (isPaid) return { label: 'Paid', style: 'bg-emerald-500/15 text-emerald-400' };
    if (isOverdue) return { label: 'Overdue', style: 'bg-red-500/15 text-red-400' };
    if (isSent) return { label: 'Sent', style: 'bg-blue-500/15 text-blue-400' };
    return { label: 'Draft', style: 'bg-white/10 text-white' };
  };

  const statusBadge = getStatusBadge();

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Invoice {invoice.invoice_number} | Elec-Mate</title>
      </Helmet>

      {/* Header — matching QuoteViewPage */}
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-md">
        <div className={cn('h-[2px] bg-gradient-to-r', getGradient())} />
        <div className="flex items-center h-12 px-4 gap-2">
          <button onClick={() => navigate('/electrician/invoices')} className="h-9 w-9 -ml-2 flex items-center justify-center rounded-xl hover:bg-white/[0.05] active:scale-[0.98] touch-manipulation flex-shrink-0">
            <ArrowLeft className="h-5 w-5" />
          </button>
          <span className="font-mono text-[13px] text-white flex-1">{invoice.invoice_number}</span>
          <button onClick={() => setShowDeleteDialog(true)} className="text-[12px] text-red-400/60 font-medium touch-manipulation">
            Delete
          </button>
        </div>
      </header>

      <div className="px-4 py-5 space-y-5 pb-24">
        {/* Hero card — amount + status + client */}
        <div className="relative rounded-2xl bg-gradient-to-br from-white/[0.06] to-white/[0.02] border border-white/[0.1] overflow-hidden p-5">
          <div className={cn('absolute inset-x-0 top-0 h-1 bg-gradient-to-r opacity-80', getGradient())} />
          <div className="flex items-start justify-between mb-3">
            <span className={cn('text-[11px] font-bold px-2.5 py-1 rounded-lg', statusBadge.style)}>{statusBadge.label}</span>
            {daysOverdue && daysOverdue > 0 && (
              <span className="text-[11px] font-medium text-red-400">{daysOverdue}d overdue</span>
            )}
          </div>
          <p className="text-[32px] font-bold text-elec-yellow leading-none">{formatCurrency(invoice.total)}</p>
          <p className="text-[15px] font-semibold text-white mt-2">{invoice.client?.name || 'Unknown Client'}</p>
          {invoice.invoice_date && (
            <p className="text-[12px] text-white mt-0.5">Issued {format(new Date(invoice.invoice_date), 'd MMM yyyy')}</p>
          )}
        </div>

        {/* Primary CTA */}
        {canMarkPaid && (
          <button
            onClick={() => setShowMarkPaidDialog(true)}
            disabled={isMarkingPaid}
            className="w-full h-[52px] rounded-2xl bg-gradient-to-r from-emerald-500 to-emerald-600 text-white text-[15px] font-semibold touch-manipulation active:scale-[0.98] transition-all shadow-lg shadow-emerald-500/20"
          >
            Mark as Paid
          </button>
        )}

        {/* Quick actions — matching QuoteViewPage grid */}
        <div className="grid grid-cols-3 gap-2">
          {isDraft && (
            <button
              onClick={() => navigate(`/electrician/invoice-quote-builder/${invoice.id}`)}
              className="h-12 rounded-xl bg-white/[0.06] border border-white/[0.1] text-[13px] font-medium text-white touch-manipulation active:scale-[0.97] active:bg-white/[0.1] transition-all"
            >
              Edit
            </button>
          )}
          <InvoiceSendDropdown invoice={invoice} onSuccess={fetchInvoice} refreshKey={0} compact />
          <button
            onClick={handleDownloadPDF}
            disabled={isDownloading}
            className="h-12 rounded-xl bg-white/[0.06] border border-white/[0.1] text-[13px] font-medium text-white touch-manipulation active:scale-[0.97] active:bg-white/[0.1] transition-all disabled:opacity-50"
          >
            {isDownloading ? 'Generating...' : 'PDF'}
          </button>

        </div>

        {/* Date stats — compact row */}
        <div className="flex items-center gap-0 rounded-xl bg-white/[0.03] border border-white/[0.06] overflow-hidden">
          <div className="flex-1 py-2.5 text-center">
            <p className="text-[10px] text-white">Issued</p>
            <p className="text-[13px] font-semibold text-white">
              {invoice.invoice_date ? format(new Date(invoice.invoice_date), 'd MMM') : '—'}
            </p>
          </div>
          <div className="w-px h-8 bg-white/[0.06]" />
          <div className="flex-1 py-2.5 text-center">
            <p className="text-[10px] text-white">Due</p>
            <p className={cn('text-[13px] font-semibold', isOverdue ? 'text-red-400' : 'text-white')}>
              {invoice.invoice_due_date ? format(new Date(invoice.invoice_due_date), 'd MMM') : '—'}
            </p>
          </div>
          <div className="w-px h-8 bg-white/[0.06]" />
          <div className="flex-1 py-2.5 text-center">
            <p className="text-[10px] text-white">Items</p>
            <p className="text-[13px] font-semibold text-white">{invoice.items?.length || 0}</p>
          </div>
          {isPaid && invoice.invoice_paid_at && (
            <>
              <div className="w-px h-8 bg-white/[0.06]" />
              <div className="flex-1 py-2.5 text-center">
                <p className="text-[10px] text-white">Paid</p>
                <p className="text-[13px] font-semibold text-emerald-400">
                  {format(new Date(invoice.invoice_paid_at), 'd MMM')}
                </p>
              </div>
            </>
          )}
        </div>

        {/* Client — grouped card matching QuoteViewPage */}
        <div className="rounded-2xl bg-white/[0.03] border border-white/[0.06] overflow-hidden">
          <div className="p-4">
            <h3 className="text-[10px] text-white uppercase tracking-wider mb-2">Client</h3>
            <p className="text-[15px] font-semibold text-white">{invoice.client?.name || 'No client'}</p>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1">
              {invoice.client?.email && (
                <a href={`mailto:${invoice.client.email}`} className="text-[12px] text-elec-yellow underline underline-offset-2 touch-manipulation">
                  {invoice.client.email}
                </a>
              )}
              {invoice.client?.phone && (
                <a href={`tel:${invoice.client.phone}`} className="text-[12px] text-elec-yellow underline underline-offset-2 touch-manipulation">
                  {invoice.client.phone}
                </a>
              )}
            </div>
            {invoice.client?.address && (
              <p className="text-[12px] text-white mt-1">{invoice.client.address}</p>
            )}
          </div>
        </div>

        {/* Line Items */}
        <div className="rounded-2xl bg-white/[0.03] border border-white/[0.06] overflow-hidden">
          <div className="p-4">
            <h3 className="text-[10px] text-white uppercase tracking-wider mb-3">Items</h3>
            <div className="space-y-3">
              {invoice.items?.map((item: any, index: number) => {
                const lineTotal = (item.quantity || 0) * (item.unitPrice || item.price || 0);
                return (
                  <div key={index} className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <p className="text-[13px] text-white">{item.description || item.name}</p>
                      <p className="text-[11px] text-white mt-0.5">
                        {item.quantity} × {formatCurrency(item.unitPrice || item.price || 0)}
                      </p>
                    </div>
                    <p className="text-[13px] font-semibold text-white flex-shrink-0">
                      {formatCurrency(lineTotal)}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Summary */}
            <div className="border-t border-white/[0.06] p-4 space-y-2">
              <div className="flex justify-between text-[13px]">
                <span className="text-white">Subtotal</span>
                <span className="font-medium text-white">{formatCurrency(invoice.subtotal)}</span>
              </div>
              {(invoice.overhead ?? 0) > 0 && (
                <div className="flex justify-between text-[13px]">
                  <span className="text-white">Overhead</span>
                  <span className="text-white">{formatCurrency(invoice.overhead)}</span>
                </div>
              )}
              {(invoice.profit ?? 0) > 0 && (
                <div className="flex justify-between text-[13px]">
                  <span className="text-white">Profit</span>
                  <span className="text-white">{formatCurrency(invoice.profit)}</span>
                </div>
              )}
              {(invoice.vatAmount ?? 0) > 0 && (
                <div className="flex justify-between text-[13px]">
                  <span className="text-white">VAT ({invoice.settings?.vatRate || 20}%)</span>
                  <span className="text-white">{formatCurrency(invoice.vatAmount)}</span>
                </div>
              )}
              <div className="flex justify-between pt-2 border-t border-white/[0.06] text-[15px] font-bold">
                <span className="text-white">Total</span>
                <span className="text-elec-yellow">{formatCurrency(invoice.total)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Notes */}
        {invoice.notes && (
          <div className="rounded-2xl bg-white/[0.03] border border-white/[0.06] overflow-hidden p-4">
            <h3 className="text-[10px] text-white uppercase tracking-wider mb-2">Notes</h3>
            <p className="text-[13px] text-white whitespace-pre-wrap">{invoice.notes}</p>
          </div>
        )}
      </div>

      {/* Mark as Paid Dialog */}
      <AlertDialog open={showMarkPaidDialog} onOpenChange={setShowMarkPaidDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Mark Invoice as Paid?</AlertDialogTitle>
            <AlertDialogDescription>
              This will mark invoice {invoice.invoice_number} as paid. The payment date will be
              recorded as today.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isMarkingPaid}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleMarkAsPaid}
              disabled={isMarkingPaid}
              className="bg-emerald-600 hover:bg-emerald-700"
            >
              {isMarkingPaid ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Marking...
                </>
              ) : (
                'Mark as Paid'
              )}
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
              {isDeleting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                'Delete'
              )}
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
