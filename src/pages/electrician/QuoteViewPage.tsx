import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Quote } from '@/types/quote';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Loader2, Edit, Trash2, Download, ArrowLeft, CheckCircle, Clock, FileText, Send, Receipt, User, MapPin, Calendar, Phone, Mail, AlertTriangle, XCircle, Bell, MailOpen, Eye } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
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
} from "@/components/ui/alert-dialog";
import { format, differenceInDays, isPast } from 'date-fns';

const QuoteViewPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [quote, setQuote] = useState<Quote | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isConverting, setIsConverting] = useState(false);
  const [isSendingReminder, setIsSendingReminder] = useState(false);
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

  useEffect(() => {
    const loadQuote = async () => {
      if (!id) {
        setError(true);
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('quotes')
          .select('*')
          .eq('id', id)
          .single();

        if (error) throw error;

        if (!data) {
          setError(true);
          toast({
            title: "Quote Not Found",
            description: "The quote you're looking for doesn't exist or has been deleted.",
            variant: "destructive"
          });
        } else {
          const transformedQuote: Quote = {
            id: data.id,
            quoteNumber: data.quote_number,
            client: typeof data.client_data === 'string' ? JSON.parse(data.client_data) : data.client_data,
            items: typeof data.items === 'string' ? JSON.parse(data.items) : data.items,
            settings: typeof data.settings === 'string' ? JSON.parse(data.settings) : data.settings,
            jobDetails: data.job_details ? (typeof data.job_details === 'string' ? JSON.parse(data.job_details) : data.job_details) : undefined,
            subtotal: data.subtotal || 0,
            overhead: data.overhead || 0,
            profit: data.profit || 0,
            vatAmount: data.vat_amount || 0,
            total: data.total || 0,
            status: data.status as Quote['status'],
            tags: data.tags as Quote['tags'],
            createdAt: new Date(data.created_at),
            updatedAt: new Date(data.updated_at),
            expiryDate: new Date(data.expiry_date),
            notes: data.notes || undefined,
            acceptance_status: data.acceptance_status as Quote['acceptance_status'],
            acceptance_method: data.acceptance_method as Quote['acceptance_method'],
            accepted_at: data.accepted_at ? new Date(data.accepted_at) : undefined,
            accepted_by_name: data.accepted_by_name || undefined,
            accepted_by_email: data.accepted_by_email || undefined,
            invoice_raised: data.invoice_raised || false,
            invoice_number: data.invoice_number || undefined,
          };

          setQuote(transformedQuote);

          // Load email tracking data
          setEmailTracking({
            first_sent_at: data.first_sent_at,
            reminder_count: data.reminder_count || 0,
          });

          // Load email view tracking from quote_views
          const { data: viewData } = await supabase
            .from('quote_views')
            .select('email_opened_at, email_open_count')
            .eq('quote_id', data.id)
            .single();

          if (viewData) {
            setEmailTracking(prev => ({
              ...prev,
              email_opened_at: viewData.email_opened_at,
              email_open_count: viewData.email_open_count || 0,
            }));
          }
        }
      } catch (err) {
        console.error('Error loading quote:', err);
        setError(true);
        toast({
          title: "Error",
          description: "Failed to load quote. Please try again.",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    loadQuote();
  }, [id]);

  const handleDownloadPDF = async () => {
    if (!quote) return;

    setIsDownloading(true);
    try {
      const effectiveCompanyProfile = companyProfile || {
        id: "default",
        user_id: "default",
        company_name: "Your Electrical Company",
        company_email: "contact@yourcompany.com",
        company_phone: "0123 456 7890",
        company_address: "123 Business Street, London",
        primary_color: "#1e40af",
        secondary_color: "#3b82f6",
        currency: "GBP",
        locale: "en-GB",
        vat_number: "GB123456789",
        payment_terms: "Payment due within 30 days",
        created_at: new Date(),
        updated_at: new Date(),
      };

      const { data, error } = await supabase.functions.invoke("generate-pdf-monkey", {
        body: { quote, companyProfile: effectiveCompanyProfile },
      });

      if (error) throw error;

      let downloadUrl = data.downloadUrl;
      const documentId = data.documentId;

      if (!downloadUrl && documentId) {
        const maxAttempts = 18;
        for (let i = 0; i < maxAttempts; i++) {
          await new Promise((resolve) => setTimeout(resolve, 5000));
          const { data: statusData } = await supabase.functions.invoke("generate-pdf-monkey", {
            body: { mode: "status", documentId },
          });
          if (statusData?.downloadUrl) {
            downloadUrl = statusData.downloadUrl;
            break;
          }
        }
      }

      if (downloadUrl) {
        await supabase
          .from("quotes")
          .update({
            pdf_document_id: documentId,
            pdf_url: downloadUrl,
            pdf_generated_at: new Date().toISOString(),
            pdf_version: (quote.pdf_version || 0) + 1,
          })
          .eq("id", quote.id);

        window.open(downloadUrl, "_blank");
        toast({ title: "PDF ready", description: "Opening in new tab", variant: "success" });
      } else {
        throw new Error("Failed to generate PDF");
      }
    } catch (error: any) {
      console.error("PDF generation error:", error);
      toast({
        title: "PDF generation failed",
        description: error.message || "Please try again",
        variant: "destructive",
      });
    } finally {
      setIsDownloading(false);
    }
  };

  const handleDelete = async () => {
    if (!quote) return;

    setIsDeleting(true);
    try {
      const { error } = await supabase
        .from('quotes')
        .delete()
        .eq('id', quote.id);

      if (error) throw error;

      toast({
        title: "Quote Deleted",
        description: `Quote ${quote.quoteNumber} has been deleted successfully.`,
      });

      navigate('/electrician/quotes');
    } catch (err) {
      console.error('Error deleting quote:', err);
      toast({
        title: "Error",
        description: "Failed to delete quote. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsDeleting(false);
      setShowDeleteDialog(false);
    }
  };

  const handleConvertToInvoice = async () => {
    if (!quote) return;

    setIsConverting(true);
    try {
      // Navigate to invoice builder with quote data
      navigate(`/electrician/invoice-quote-builder/${quote.id}`);
    } catch (err) {
      console.error('Error converting to invoice:', err);
      toast({
        title: "Error",
        description: "Failed to convert quote to invoice.",
        variant: "destructive"
      });
    } finally {
      setIsConverting(false);
    }
  };

  const handleSendReminder = async () => {
    if (!quote) return;

    setIsSendingReminder(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        toast({
          title: "Not authenticated",
          description: "Please log in to send reminders",
          variant: "destructive"
        });
        return;
      }

      const { data, error } = await supabase.functions.invoke('send-quote-reminder', {
        body: { quoteId: quote.id, reminderType: 'gentle' },
        headers: { Authorization: `Bearer ${session.access_token}` }
      });

      if (error) {
        throw error;
      }

      // Update local tracking state
      setEmailTracking(prev => ({
        ...prev,
        reminder_count: (prev?.reminder_count || 0) + 1,
      }));

      toast({
        title: "Reminder Sent",
        description: data?.message || "Follow-up reminder sent to client",
      });
    } catch (err: any) {
      console.error('Error sending reminder:', err);
      toast({
        title: "Failed to send reminder",
        description: err.message || "Please try again",
        variant: "destructive"
      });
    } finally {
      setIsSendingReminder(false);
    }
  };

  // Get status info for styling
  const getStatusInfo = () => {
    if (quote?.acceptance_status === 'accepted') {
      return {
        gradient: 'from-emerald-500/20 via-emerald-600/10 to-transparent',
        badge: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
        label: 'Accepted',
        icon: CheckCircle
      };
    }
    if (quote?.acceptance_status === 'declined') {
      return {
        gradient: 'from-red-500/20 via-red-600/10 to-transparent',
        badge: 'bg-red-500/20 text-red-400 border-red-500/30',
        label: 'Declined',
        icon: XCircle
      };
    }
    if (quote?.expiryDate && isPast(new Date(quote.expiryDate))) {
      return {
        gradient: 'from-amber-500/20 via-amber-600/10 to-transparent',
        badge: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
        label: 'Expired',
        icon: AlertTriangle
      };
    }
    if (quote?.status === 'sent') {
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

  const statusInfo = quote ? getStatusInfo() : null;

  const canonical = `${window.location.origin}/electrician/quotes/view/${id}`;

  if (loading) {
    return (
      <div className="flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error || !quote) {
    return (
      <div className="bg-background p-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate('/electrician/quotes')}
          className="mb-4"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Quotes
        </Button>
        <div className="text-center py-12 space-y-4">
          <FileText className="h-16 w-16 mx-auto text-muted-foreground/30" />
          <h2 className="text-2xl font-bold">Quote Not Found</h2>
          <p className="text-muted-foreground">
            The quote you're looking for doesn't exist or may have been deleted.
          </p>
          <Button onClick={() => navigate('/electrician/quotes')}>
            View All Quotes
          </Button>
        </div>
      </div>
    );
  }

  const StatusIcon = statusInfo?.icon || FileText;
  const isExpired = quote.expiryDate && isPast(new Date(quote.expiryDate));
  const daysUntilExpiry = quote.expiryDate ? differenceInDays(new Date(quote.expiryDate), new Date()) : null;

  return (
    <div className="bg-background pb-24">
      <Helmet>
        <title>View Quote {quote.quoteNumber} | Professional Electrical Quote</title>
        <meta
          name="description"
          content={`View details for electrical quote ${quote.quoteNumber} for ${quote.client?.name || 'client'}`}
        />
        <link rel="canonical" href={canonical} />
      </Helmet>

      {/* Sticky Header */}
      <div className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b">
        <div className="px-4 py-3 flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/electrician/quotes')}
            className="h-10 touch-manipulation"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Quotes
          </Button>
          <Badge variant="outline" className={statusInfo?.badge}>
            <StatusIcon className="mr-1 h-3 w-3" />
            {statusInfo?.label}
          </Badge>
        </div>
      </div>

      {/* Hero Card */}
      <div className={`mx-4 mt-4 rounded-2xl bg-gradient-to-br ${statusInfo?.gradient} border p-6`}>
        <div className="text-center space-y-2">
          <p className="text-sm text-muted-foreground font-medium">Quote Total</p>
          <p className="text-4xl font-bold text-foreground">{formatCurrency(quote.total)}</p>
          <p className="text-lg text-muted-foreground">{quote.quoteNumber}</p>
          {quote.acceptance_status === 'accepted' && (
            <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30 mt-2">
              <CheckCircle className="mr-1 h-3 w-3" />
              Accepted {quote.accepted_at && format(new Date(quote.accepted_at), 'dd MMM yyyy')}
            </Badge>
          )}
          {isExpired && quote.acceptance_status !== 'accepted' && (
            <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30 mt-2">
              <AlertTriangle className="mr-1 h-3 w-3" />
              Expired {Math.abs(daysUntilExpiry || 0)} days ago
            </Badge>
          )}
          {!isExpired && daysUntilExpiry !== null && daysUntilExpiry <= 7 && quote.acceptance_status !== 'accepted' && (
            <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30 mt-2">
              <Clock className="mr-1 h-3 w-3" />
              Expires in {daysUntilExpiry} days
            </Badge>
          )}
        </div>
      </div>

      {/* Action Buttons Grid */}
      <div className="grid grid-cols-2 gap-3 mx-4 mt-4">
        <Button
          onClick={handleDownloadPDF}
          disabled={isDownloading}
          className="h-14 bg-primary hover:bg-primary/90 rounded-xl touch-manipulation"
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
        <QuoteSendDropdown
          quote={quote}
          onSuccess={() => toast({ title: "Quote sent", variant: "success" })}
          disabled={!quote.client?.email || !quote.id}
          className="h-14 rounded-xl"
        />
        <Button
          variant="outline"
          onClick={() => navigate(`/electrician/quote-builder/${quote.id}`)}
          className="h-14 rounded-xl touch-manipulation"
        >
          <Edit className="h-5 w-5 mr-2" />
          Edit Quote
        </Button>
        <Button
          variant="outline"
          onClick={() => setShowDeleteDialog(true)}
          className="h-14 rounded-xl text-destructive hover:text-destructive hover:bg-destructive/10 touch-manipulation"
        >
          <Trash2 className="h-5 w-5 mr-2" />
          Delete
        </Button>
      </div>

      {/* Convert to Invoice - Show for accepted quotes not yet invoiced */}
      {quote.acceptance_status === 'accepted' && !quote.invoice_raised && (
        <div className="mx-4 mt-4">
          <Button
            onClick={handleConvertToInvoice}
            disabled={isConverting}
            className="w-full h-14 bg-emerald-600 hover:bg-emerald-700 rounded-xl touch-manipulation"
          >
            {isConverting ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <>
                <Receipt className="h-5 w-5 mr-2" />
                Convert to Invoice
              </>
            )}
          </Button>
        </div>
      )}

      {/* Invoice Already Raised Badge */}
      {quote.invoice_raised && (
        <div className="mx-4 mt-4 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20">
          <div className="flex items-center gap-3">
            <Receipt className="h-5 w-5 text-emerald-400" />
            <div>
              <p className="font-medium text-emerald-400">Invoice Raised</p>
              {quote.invoice_number && (
                <p className="text-sm text-muted-foreground">Invoice #{quote.invoice_number}</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Email Tracking - Show for sent quotes awaiting response */}
      {quote.status === 'sent' && quote.acceptance_status === 'pending' && emailTracking?.first_sent_at && (
        <div className="mx-4 mt-4 p-4 rounded-2xl bg-card border">
          <h3 className="text-sm font-semibold text-muted-foreground mb-3 flex items-center gap-2">
            <Mail className="h-4 w-4" />
            Email Tracking
            {emailTracking.email_opened_at && (
              <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 ml-2">
                <MailOpen className="h-3 w-3 mr-1" />
                Viewed
              </Badge>
            )}
          </h3>

          <div className="grid grid-cols-2 gap-3 text-sm mb-4">
            <div className="p-3 rounded-xl bg-muted/30">
              <div className="flex items-center gap-2 text-muted-foreground text-xs mb-1">
                <Send className="h-3 w-3" />
                Sent
              </div>
              <p className="font-medium">
                {format(new Date(emailTracking.first_sent_at), 'dd MMM yyyy')}
              </p>
            </div>

            <div className="p-3 rounded-xl bg-muted/30">
              <div className="flex items-center gap-2 text-muted-foreground text-xs mb-1">
                <Eye className="h-3 w-3" />
                Email Opens
              </div>
              <p className={`font-medium ${emailTracking.email_opened_at ? 'text-blue-400' : 'text-muted-foreground'}`}>
                {emailTracking.email_opened_at ? (emailTracking.email_open_count || 1) : 'Not opened'}
              </p>
            </div>

            <div className="p-3 rounded-xl bg-muted/30">
              <div className="flex items-center gap-2 text-muted-foreground text-xs mb-1">
                <Bell className="h-3 w-3" />
                Reminders Sent
              </div>
              <p className={`font-medium ${(emailTracking.reminder_count || 0) > 0 ? 'text-purple-400' : ''}`}>
                {emailTracking.reminder_count || 0} of 2
              </p>
            </div>

            <div className="p-3 rounded-xl bg-muted/30">
              <div className="flex items-center gap-2 text-muted-foreground text-xs mb-1">
                <Clock className="h-3 w-3" />
                Expires
              </div>
              <p className={`font-medium ${isExpired ? 'text-destructive' : daysUntilExpiry !== null && daysUntilExpiry <= 3 ? 'text-amber-400' : ''}`}>
                {isExpired ? 'Expired' : daysUntilExpiry === 0 ? 'Today' : `${daysUntilExpiry} days`}
              </p>
            </div>
          </div>

          {/* Send Reminder Button */}
          {!isExpired && (emailTracking.reminder_count || 0) < 2 && (
            <Button
              onClick={handleSendReminder}
              disabled={isSendingReminder}
              variant="outline"
              className="w-full h-12 rounded-xl touch-manipulation"
            >
              {isSendingReminder ? (
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
              ) : (
                <Bell className="h-4 w-4 mr-2" />
              )}
              Send Reminder to Client
            </Button>
          )}

          {/* Status Message */}
          <div className="mt-3 text-xs text-muted-foreground">
            {emailTracking.email_opened_at ? (
              <span className="text-blue-400">Client has viewed your quote - awaiting their decision</span>
            ) : (
              <span>Automated reminders sent at 3 days and 7 days if no response</span>
            )}
          </div>
        </div>
      )}

      {/* Acceptance Details - Show if accepted */}
      {quote.acceptance_status === 'accepted' && (quote.accepted_by_name || quote.accepted_by_email) && (
        <div className="mx-4 mt-4 p-4 rounded-2xl bg-card border">
          <h3 className="text-sm font-semibold text-muted-foreground mb-3 flex items-center gap-2">
            <CheckCircle className="h-4 w-4" />
            Acceptance Details
          </h3>
          <div className="space-y-2 text-sm">
            {quote.accepted_by_name && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Accepted By</span>
                <span className="font-medium">{quote.accepted_by_name}</span>
              </div>
            )}
            {quote.accepted_by_email && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Email</span>
                <span className="font-medium">{quote.accepted_by_email}</span>
              </div>
            )}
            {quote.acceptance_method && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Method</span>
                <span className="font-medium capitalize">{quote.acceptance_method.replace(/_/g, ' ')}</span>
              </div>
            )}
            {quote.accepted_at && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Date</span>
                <span className="font-medium">{format(new Date(quote.accepted_at), 'dd MMM yyyy, HH:mm')}</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Client Details */}
      <div className="mx-4 mt-4 p-4 rounded-2xl bg-card border">
        <h3 className="text-sm font-semibold text-muted-foreground mb-3 flex items-center gap-2">
          <User className="h-4 w-4" />
          Client Details
        </h3>
        <div className="space-y-3">
          <p className="font-semibold text-lg">{quote.client?.name || 'No client name'}</p>
          {quote.client?.email && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Mail className="h-4 w-4" />
              <a href={`mailto:${quote.client.email}`} className="hover:text-primary">
                {quote.client.email}
              </a>
            </div>
          )}
          {quote.client?.phone && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Phone className="h-4 w-4" />
              <a href={`tel:${quote.client.phone}`} className="hover:text-primary">
                {quote.client.phone}
              </a>
            </div>
          )}
          {quote.client?.address && (
            <div className="flex items-start gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4 mt-0.5" />
              <span>{quote.client.address}</span>
            </div>
          )}
        </div>
      </div>

      {/* Job Details */}
      {quote.jobDetails && (
        <div className="mx-4 mt-4 p-4 rounded-2xl bg-card border">
          <h3 className="text-sm font-semibold text-muted-foreground mb-3 flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Job Details
          </h3>
          <div className="space-y-2 text-sm">
            {quote.jobDetails.description && (
              <div>
                <span className="text-muted-foreground">Description</span>
                <p className="font-medium mt-1">{quote.jobDetails.description}</p>
              </div>
            )}
            {quote.jobDetails.location && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Location</span>
                <span className="font-medium">{quote.jobDetails.location}</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Quote Dates */}
      <div className="mx-4 mt-4 p-4 rounded-2xl bg-card border">
        <h3 className="text-sm font-semibold text-muted-foreground mb-3 flex items-center gap-2">
          <Calendar className="h-4 w-4" />
          Quote Dates
        </h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-muted-foreground">Created</span>
            <p className="font-medium">{format(new Date(quote.createdAt), 'dd MMM yyyy')}</p>
          </div>
          <div>
            <span className="text-muted-foreground">Valid Until</span>
            <p className={`font-medium ${isExpired ? 'text-destructive' : ''}`}>
              {format(new Date(quote.expiryDate), 'dd MMM yyyy')}
            </p>
          </div>
        </div>
      </div>

      {/* Line Items */}
      <div className="mx-4 mt-4 p-4 rounded-2xl bg-card border">
        <h3 className="text-sm font-semibold text-muted-foreground mb-3">Line Items</h3>
        <div className="space-y-3">
          {quote.items?.map((item, index) => (
            <div key={index} className="flex justify-between items-start py-2 border-b border-border/50 last:border-0">
              <div className="flex-1 min-w-0 pr-4">
                <p className="font-medium truncate">{item.name || item.description}</p>
                {item.description && item.name && (
                  <p className="text-sm text-muted-foreground truncate">{item.description}</p>
                )}
                <p className="text-xs text-muted-foreground mt-1">
                  {item.quantity} × {formatCurrency(item.unitPrice || item.price)}
                </p>
              </div>
              <p className="font-semibold whitespace-nowrap">{formatCurrency(item.total || (item.quantity * (item.unitPrice || item.price || 0)))}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Quote Summary */}
      <div className="mx-4 mt-4 p-4 rounded-2xl bg-card border">
        <h3 className="text-sm font-semibold text-muted-foreground mb-3">Summary</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Subtotal</span>
            <span>{formatCurrency(quote.subtotal)}</span>
          </div>
          {(quote.overhead ?? 0) > 0 && (
            <div className="flex justify-between">
              <span className="text-muted-foreground">Overhead</span>
              <span>{formatCurrency(quote.overhead)}</span>
            </div>
          )}
          {(quote.profit ?? 0) > 0 && (
            <div className="flex justify-between">
              <span className="text-muted-foreground">Profit</span>
              <span>{formatCurrency(quote.profit)}</span>
            </div>
          )}
          {(quote.vatAmount ?? 0) > 0 && (
            <div className="flex justify-between">
              <span className="text-muted-foreground">VAT</span>
              <span>{formatCurrency(quote.vatAmount)}</span>
            </div>
          )}
          <div className="flex justify-between pt-2 border-t font-semibold text-base">
            <span>Total</span>
            <span className="text-primary">{formatCurrency(quote.total)}</span>
          </div>
        </div>
      </div>

      {/* Notes */}
      {quote.notes && (
        <div className="mx-4 mt-4 p-4 rounded-2xl bg-card border">
          <h3 className="text-sm font-semibold text-muted-foreground mb-2">Notes</h3>
          <p className="text-sm whitespace-pre-wrap">{quote.notes}</p>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Quote {quote.quoteNumber}?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the quote
              and all associated data.
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

export default QuoteViewPage;
