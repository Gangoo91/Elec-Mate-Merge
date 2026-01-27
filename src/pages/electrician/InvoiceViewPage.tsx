import { useParams, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, Edit, CheckCircle, AlertCircle, ArrowLeft, User, Calendar, Clock, Phone, Mail, MapPin, FileText, Loader2, Send, Trash2, PoundSterling } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Quote } from "@/types/quote";
import { format, isPast, differenceInDays } from "date-fns";
import { toast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { InvoiceSendDropdown } from "@/components/electrician/invoice-builder/InvoiceSendDropdown";

const InvoiceViewPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [invoice, setInvoice] = useState<Quote | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isMarkingPaid, setIsMarkingPaid] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [showMarkPaidDialog, setShowMarkPaidDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const formatCurrency = (amount: number | undefined | null) => {
    const safeAmount = typeof amount === 'number' && !isNaN(amount) ? amount : 0;
    return new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP" }).format(safeAmount);
  };

  const pollPdfDownloadUrl = async (documentId: string, accessToken: string): Promise<string | null> => {
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
        work_completion_date: data.work_completion_date ? new Date(data.work_completion_date) : undefined,
        jobDetails: data.job_details as any,
        pdf_url: data.pdf_url,
        pdf_generated_at: data.pdf_generated_at,
        // External accounting sync fields
        external_invoice_id: data.external_invoice_id,
        external_invoice_provider: data.external_invoice_provider,
        external_invoice_url: data.external_invoice_url,
        external_invoice_synced_at: data.external_invoice_synced_at ? new Date(data.external_invoice_synced_at) : undefined,
      };

      setInvoice(quoteData);
    } catch (error) {
      console.error('Error fetching invoice:', error);
      toast({ title: 'Error loading invoice', description: 'Failed to load invoice. Please try again.', variant: 'destructive' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownloadPDF = async () => {
    if (!invoice) return;
    setIsDownloading(true);

    try {
      const pdfIsCurrent = invoice.pdf_url && invoice.pdf_generated_at &&
        new Date(invoice.pdf_generated_at) >= new Date(invoice.updatedAt);

      if (pdfIsCurrent) {
        window.open(invoice.pdf_url, '_blank');
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

      const { data: pdfData, error: pdfError } = await supabase.functions.invoke('generate-pdf-monkey', {
        body: { quote: invoice, companyProfile: companyData, invoice_mode: true },
        headers: { Authorization: `Bearer ${session.access_token}` }
      });

      let pdfUrl: string | undefined = pdfData?.downloadUrl;
      const documentId: string | undefined = pdfData?.documentId;
      if (!pdfUrl && documentId) {
        pdfUrl = await pollPdfDownloadUrl(documentId, session.access_token) || undefined;
      }

      if (pdfError || !pdfUrl) throw new Error('Failed to generate PDF');

      if (pdfUrl && documentId) {
        await supabase
          .from('quotes')
          .update({ pdf_document_id: documentId, pdf_url: pdfUrl, pdf_generated_at: new Date().toISOString() })
          .eq('id', invoice.id);
      }

      window.open(pdfUrl, '_blank');
    } catch (error) {
      console.error('Error generating invoice PDF:', error);
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
        .update({
          invoice_status: 'paid',
          invoice_paid_at: new Date().toISOString()
        })
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
      // Just remove the invoice flag, keeping the quote
      const { error } = await supabase
        .from('quotes')
        .update({
          invoice_raised: false,
          invoice_number: null,
          invoice_status: null,
          invoice_date: null,
          invoice_due_date: null
        })
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

  // Get status info for styling
  const getStatusInfo = () => {
    if (!invoice) return null;

    const isOverdue = invoice.invoice_due_date &&
      isPast(new Date(invoice.invoice_due_date)) &&
      invoice.invoice_status !== 'paid';

    if (invoice.invoice_status === 'paid') {
      return {
        gradient: 'from-emerald-500/20 via-emerald-600/10 to-transparent',
        badge: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
        label: 'Paid',
        icon: CheckCircle
      };
    }
    if (isOverdue || invoice.invoice_status === 'overdue') {
      return {
        gradient: 'from-red-500/20 via-red-600/10 to-transparent',
        badge: 'bg-red-500/20 text-red-400 border-red-500/30',
        label: 'Overdue',
        icon: AlertCircle
      };
    }
    if (invoice.invoice_status === 'sent') {
      return {
        gradient: 'from-blue-500/20 via-blue-600/10 to-transparent',
        badge: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
        label: 'Sent',
        icon: Send
      };
    }
    return {
      gradient: 'from-zinc-500/20 via-zinc-600/10 to-transparent',
      badge: 'bg-zinc-500/20 text-zinc-400 border-zinc-500/30',
      label: 'Draft',
      icon: FileText
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
          <FileText className="h-16 w-16 mx-auto text-muted-foreground/30" />
          <h2 className="text-2xl font-bold">Invoice Not Found</h2>
          <p className="text-muted-foreground">
            The invoice you're looking for doesn't exist or may have been deleted.
          </p>
          <Button onClick={() => navigate('/electrician/invoices')}>
            View All Invoices
          </Button>
        </div>
      </div>
    );
  }

  const statusInfo = getStatusInfo();
  const StatusIcon = statusInfo?.icon || FileText;
  const daysOverdue = getDaysOverdue();

  return (
    <div className="bg-background pb-24">
      <Helmet>
        <title>Invoice {invoice.invoice_number} | ElecMate</title>
      </Helmet>

      {/* Sticky Header */}
      <div className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/electrician/invoices')}
            className="h-10 touch-manipulation"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Invoices
          </Button>
          <Badge variant="outline" className={statusInfo?.badge}>
            <StatusIcon className="mr-1 h-3 w-3" />
            {statusInfo?.label}
          </Badge>
        </div>
      </div>

      {/* Main Content Container */}
      <div className="max-w-6xl mx-auto px-4">
        {/* Desktop: Two Column Header Layout */}
        <div className="mt-4 grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Hero Card - Takes 2 cols on desktop */}
          <div className={`lg:col-span-2 rounded-2xl bg-gradient-to-br ${statusInfo?.gradient} border p-6`}>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground font-medium">
                  {invoice.invoice_status === 'paid' ? 'Amount Paid' : 'Amount Due'}
                </p>
                <p className="text-4xl sm:text-5xl font-bold text-foreground">{formatCurrency(invoice.total)}</p>
                <p className="text-lg text-muted-foreground">{invoice.invoice_number}</p>
              </div>
              <div className="flex flex-wrap gap-2 sm:flex-col sm:items-end">
                {invoice.invoice_status === 'paid' && (
                  <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
                    <CheckCircle className="mr-1 h-3 w-3" />
                    Payment Received
                  </Badge>
                )}
                {daysOverdue && daysOverdue > 0 && (
                  <Badge className="bg-red-500/20 text-red-400 border-red-500/30">
                    <AlertCircle className="mr-1 h-3 w-3" />
                    {daysOverdue} {daysOverdue === 1 ? 'day' : 'days'} overdue
                  </Badge>
                )}
              </div>
            </div>
          </div>

          {/* Action Buttons - Stacked on right on desktop */}
          <div className="flex flex-col gap-2">
            <Button
              onClick={handleDownloadPDF}
              disabled={isDownloading}
              className="h-12 bg-primary hover:bg-primary/90 rounded-xl touch-manipulation"
            >
              {isDownloading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <>
                  <Download className="h-5 w-5 mr-2" />
                  Download PDF
                </>
              )}
            </Button>

            {invoice.invoice_status !== 'paid' ? (
              <InvoiceSendDropdown
                invoice={invoice}
                onSuccess={fetchInvoice}
                className="h-12 rounded-xl"
              />
            ) : (
              <Button
                variant="outline"
                className="h-12 rounded-xl bg-emerald-500/10 border-emerald-500/30 text-emerald-400 touch-manipulation"
                disabled
              >
                <CheckCircle className="h-5 w-5 mr-2" />
                Paid
              </Button>
            )}

            <Button
              variant="outline"
              onClick={() => navigate(`/electrician/invoice-quote-builder/${invoice.id}`)}
              className="h-12 rounded-xl touch-manipulation"
            >
              <Edit className="h-5 w-5 mr-2" />
              Edit Invoice
            </Button>

            {invoice.invoice_status !== 'paid' ? (
              <Button
                variant="outline"
                onClick={() => setShowMarkPaidDialog(true)}
                disabled={isMarkingPaid}
                className="h-12 rounded-xl text-emerald-400 hover:text-emerald-400 hover:bg-emerald-500/10 border-emerald-500/30 touch-manipulation"
              >
                {isMarkingPaid ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <>
                    <PoundSterling className="h-5 w-5 mr-2" />
                    Mark Paid
                  </>
                )}
              </Button>
            ) : (
              <Button
                variant="outline"
                onClick={() => setShowDeleteDialog(true)}
                className="h-12 rounded-xl text-destructive hover:text-destructive hover:bg-destructive/10 touch-manipulation"
              >
                <Trash2 className="h-5 w-5 mr-2" />
                Delete
              </Button>
            )}
          </div>
        </div>

        {/* Desktop: Invoice & Client Details Side by Side */}
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Invoice Details */}
          <div className="p-5 rounded-2xl bg-card border">
            <h3 className="text-sm font-semibold text-muted-foreground mb-4 flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Invoice Details
            </h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="space-y-1">
                <span className="text-xs text-muted-foreground uppercase tracking-wide">Invoice Number</span>
                <p className="font-semibold text-base">{invoice.invoice_number}</p>
              </div>
              <div className="space-y-1">
                <span className="text-xs text-muted-foreground uppercase tracking-wide">Status</span>
                <p className="font-semibold text-base capitalize">{invoice.invoice_status || 'Draft'}</p>
              </div>
              <div className="space-y-1">
                <span className="text-xs text-muted-foreground uppercase tracking-wide">Issue Date</span>
                <p className="font-medium flex items-center gap-1.5">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  {invoice.invoice_date ? format(invoice.invoice_date, 'dd MMM yyyy') : 'Not set'}
                </p>
              </div>
              <div className="space-y-1">
                <span className="text-xs text-muted-foreground uppercase tracking-wide">Due Date</span>
                <p className={`font-medium flex items-center gap-1.5 ${daysOverdue ? 'text-destructive' : ''}`}>
                  <Clock className="h-4 w-4" />
                  {invoice.invoice_due_date ? format(invoice.invoice_due_date, 'dd MMM yyyy') : 'Not set'}
                </p>
              </div>
            </div>
          </div>

          {/* Client Details */}
          <div className="p-5 rounded-2xl bg-card border">
            <h3 className="text-sm font-semibold text-muted-foreground mb-4 flex items-center gap-2">
              <User className="h-4 w-4" />
              Client Details
            </h3>
            <div className="space-y-3">
              <p className="font-semibold text-xl">{invoice.client?.name || 'No client name'}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {invoice.client?.email && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Mail className="h-4 w-4 flex-shrink-0" />
                    <a href={`mailto:${invoice.client.email}`} className="hover:text-primary truncate">
                      {invoice.client.email}
                    </a>
                  </div>
                )}
                {invoice.client?.phone && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Phone className="h-4 w-4 flex-shrink-0" />
                    <a href={`tel:${invoice.client.phone}`} className="hover:text-primary">
                      {invoice.client.phone}
                    </a>
                  </div>
                )}
              </div>
              {invoice.client?.address && (
                <div className="flex items-start gap-2 text-sm text-muted-foreground pt-1">
                  <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <span className="whitespace-pre-line">{invoice.client.address}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Desktop: Line Items & Summary Side by Side */}
        <div className="mt-4 grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Line Items - Takes 2 cols */}
          <div className="lg:col-span-2 p-5 rounded-2xl bg-card border">
            <h3 className="text-sm font-semibold text-muted-foreground mb-4">Line Items</h3>
            {/* Table header for desktop */}
            <div className="hidden sm:grid sm:grid-cols-12 gap-4 pb-2 border-b text-xs text-muted-foreground uppercase tracking-wide">
              <div className="col-span-6">Description</div>
              <div className="col-span-2 text-right">Qty</div>
              <div className="col-span-2 text-right">Unit Price</div>
              <div className="col-span-2 text-right">Total</div>
            </div>
            <div className="space-y-0 divide-y divide-border/50">
              {invoice.items?.map((item: any, index: number) => {
                const lineTotal = (item.quantity || 0) * (item.unitPrice || 0);
                return (
                  <div key={index} className="py-3">
                    {/* Mobile layout */}
                    <div className="sm:hidden flex justify-between items-start">
                      <div className="flex-1 min-w-0 pr-4">
                        <p className="font-medium">{item.description || item.name}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {item.quantity} × {formatCurrency(item.unitPrice || item.price || 0)}
                        </p>
                      </div>
                      <p className="font-semibold whitespace-nowrap">{formatCurrency(lineTotal)}</p>
                    </div>
                    {/* Desktop layout */}
                    <div className="hidden sm:grid sm:grid-cols-12 gap-4 items-center">
                      <div className="col-span-6">
                        <p className="font-medium">{item.description || item.name}</p>
                        {item.notes && <p className="text-xs text-muted-foreground mt-0.5">{item.notes}</p>}
                      </div>
                      <div className="col-span-2 text-right text-muted-foreground">{item.quantity}</div>
                      <div className="col-span-2 text-right text-muted-foreground">{formatCurrency(item.unitPrice || item.price || 0)}</div>
                      <div className="col-span-2 text-right font-semibold">{formatCurrency(lineTotal)}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Summary */}
          <div className="p-5 rounded-2xl bg-card border h-fit">
            <h3 className="text-sm font-semibold text-muted-foreground mb-4">Summary</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-medium">{formatCurrency(invoice.subtotal)}</span>
              </div>
              {(invoice.overhead ?? 0) > 0 && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Overhead</span>
                  <span className="font-medium">{formatCurrency(invoice.overhead)}</span>
                </div>
              )}
              {(invoice.profit ?? 0) > 0 && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Profit</span>
                  <span className="font-medium">{formatCurrency(invoice.profit)}</span>
                </div>
              )}
              {(invoice.vatAmount ?? 0) > 0 && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">VAT ({invoice.settings?.vatRate || 20}%)</span>
                  <span className="font-medium">{formatCurrency(invoice.vatAmount)}</span>
                </div>
              )}
              <div className="flex justify-between pt-3 border-t font-semibold text-lg">
                <span>Total</span>
                <span className="text-primary">{formatCurrency(invoice.total)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Notes */}
        {invoice.notes && (
          <div className="mt-4 p-5 rounded-2xl bg-card border">
            <h3 className="text-sm font-semibold text-muted-foreground mb-2">Notes</h3>
            <p className="text-sm whitespace-pre-wrap">{invoice.notes}</p>
          </div>
        )}
      </div>

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
    </div>
  );
};

export default InvoiceViewPage;
