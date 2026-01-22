import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Quote } from '@/types/quote';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Loader2, Edit, Trash2, Download, ArrowLeft, CheckCircle, Clock, FileText, Send, Receipt, User, MapPin, Calendar, Phone, Mail, AlertTriangle, XCircle, Bell, MailOpen, Eye, ChevronRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
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
import { cn } from '@/lib/utils';

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

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.04 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 500, damping: 30 } }
  };

  return (
    <motion.div
      className="min-h-screen bg-background pb-8"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      <Helmet>
        <title>View Quote {quote.quoteNumber} | Professional Electrical Quote</title>
        <meta
          name="description"
          content={`View details for electrical quote ${quote.quoteNumber} for ${quote.client?.name || 'client'}`}
        />
        <link rel="canonical" href={canonical} />
      </Helmet>

      {/* iOS-style Header */}
      <header className="sticky top-0 z-50 bg-white/[0.02] backdrop-blur-xl border-b border-white/[0.06]">
        <div className="flex items-center gap-3 px-4 h-14">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/electrician/quotes')}
            className="h-10 w-10 -ml-2 touch-manipulation active:scale-95 hover:bg-white/5"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className={cn(
            "w-9 h-9 rounded-xl flex items-center justify-center",
            quote.acceptance_status === 'accepted' ? 'bg-emerald-500' :
            quote.acceptance_status === 'declined' ? 'bg-red-500' :
            isExpired ? 'bg-amber-500' :
            quote.status === 'sent' ? 'bg-blue-500' : 'bg-zinc-500'
          )}>
            <StatusIcon className="h-5 w-5 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="text-base font-semibold text-white truncate">{quote.quoteNumber}</h1>
            <p className="text-[11px] text-white/50">{statusInfo?.label}</p>
          </div>
          <div className="text-right">
            <p className="text-lg font-bold text-elec-yellow">{formatCurrency(quote.total)}</p>
          </div>
        </div>
      </header>

      <div className="px-4 py-4 space-y-4">
        {/* Status Banner */}
        {quote.acceptance_status === 'accepted' && (
          <motion.div variants={itemVariants} className="flex items-center gap-3 p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20">
            <div className="w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center flex-shrink-0">
              <CheckCircle className="h-5 w-5 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[15px] font-medium text-emerald-400">Quote Accepted</p>
              <p className="text-[13px] text-white/50">
                {quote.accepted_at && format(new Date(quote.accepted_at), 'dd MMM yyyy')}
                {quote.accepted_by_name && ` by ${quote.accepted_by_name}`}
              </p>
            </div>
          </motion.div>
        )}

        {quote.invoice_raised && (
          <motion.div variants={itemVariants} className="flex items-center gap-3 p-3.5 rounded-2xl bg-elec-yellow/10 border border-elec-yellow/20">
            <div className="w-10 h-10 rounded-xl bg-elec-yellow flex items-center justify-center flex-shrink-0">
              <Receipt className="h-5 w-5 text-black" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[15px] font-medium text-elec-yellow">Invoice Raised</p>
              <p className="text-[13px] text-white/50">Invoice #{quote.invoice_number}</p>
            </div>
          </motion.div>
        )}

        {/* Quick Actions - iOS grouped list style */}
        <motion.div variants={itemVariants}>
          <p className="text-[13px] font-medium text-white/40 uppercase tracking-wider px-1 mb-2">
            Actions
          </p>
          <div className="rounded-2xl bg-white/[0.03] border border-white/[0.06] overflow-hidden divide-y divide-white/[0.06]">
            <button
              onClick={handleDownloadPDF}
              disabled={isDownloading}
              className="flex items-center gap-3 p-3.5 w-full touch-manipulation active:bg-white/[0.04] transition-colors"
            >
              <div className="w-10 h-10 rounded-xl bg-blue-500 flex items-center justify-center flex-shrink-0">
                {isDownloading ? <Loader2 className="h-5 w-5 text-white animate-spin" /> : <Download className="h-5 w-5 text-white" />}
              </div>
              <div className="flex-1 min-w-0 text-left">
                <p className="text-[15px] font-medium text-white">Download PDF</p>
                <p className="text-[13px] text-white/50">Get a copy of this quote</p>
              </div>
              <ChevronRight className="h-4 w-4 text-white/20" />
            </button>

            <div className="flex items-center gap-3 p-3.5 touch-manipulation">
              <div className="w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center flex-shrink-0">
                <Send className="h-5 w-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[15px] font-medium text-white text-left">Send Quote</p>
                <p className="text-[13px] text-white/50 text-left">Email or WhatsApp</p>
              </div>
              <QuoteSendDropdown
                quote={quote}
                onSuccess={() => toast({ title: "Quote sent", variant: "success" })}
                disabled={!quote.client?.email || !quote.id}
                className="h-9 px-4"
              />
            </div>

            <button
              onClick={() => navigate(`/electrician/quote-builder/${quote.id}`)}
              className="flex items-center gap-3 p-3.5 w-full touch-manipulation active:bg-white/[0.04] transition-colors"
            >
              <div className="w-10 h-10 rounded-xl bg-amber-500 flex items-center justify-center flex-shrink-0">
                <Edit className="h-5 w-5 text-white" />
              </div>
              <div className="flex-1 min-w-0 text-left">
                <p className="text-[15px] font-medium text-white">Edit Quote</p>
                <p className="text-[13px] text-white/50">Make changes</p>
              </div>
              <ChevronRight className="h-4 w-4 text-white/20" />
            </button>

            <button
              onClick={() => setShowDeleteDialog(true)}
              className="flex items-center gap-3 p-3.5 w-full touch-manipulation active:bg-white/[0.04] transition-colors"
            >
              <div className="w-10 h-10 rounded-xl bg-red-500 flex items-center justify-center flex-shrink-0">
                <Trash2 className="h-5 w-5 text-white" />
              </div>
              <div className="flex-1 min-w-0 text-left">
                <p className="text-[15px] font-medium text-red-400">Delete Quote</p>
                <p className="text-[13px] text-white/50">Remove permanently</p>
              </div>
              <ChevronRight className="h-4 w-4 text-white/20" />
            </button>
          </div>
        </motion.div>

        {/* Convert to Invoice - Show for accepted quotes not yet invoiced */}
        {quote.acceptance_status === 'accepted' && !quote.invoice_raised && (
          <motion.div variants={itemVariants}>
            <button
              onClick={handleConvertToInvoice}
              disabled={isConverting}
              className="flex items-center gap-3 p-3.5 w-full rounded-2xl bg-emerald-500/10 border border-emerald-500/20 touch-manipulation active:bg-emerald-500/20 transition-colors"
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center flex-shrink-0">
                {isConverting ? <Loader2 className="h-5 w-5 text-white animate-spin" /> : <Receipt className="h-5 w-5 text-white" />}
              </div>
              <div className="flex-1 min-w-0 text-left">
                <p className="text-[15px] font-medium text-emerald-400">Convert to Invoice</p>
                <p className="text-[13px] text-white/50">Create invoice from this quote</p>
              </div>
              <ChevronRight className="h-4 w-4 text-emerald-400/50" />
            </button>
          </motion.div>
        )}

        {/* Email Tracking - Show for sent quotes awaiting response */}
        {quote.status === 'sent' && quote.acceptance_status === 'pending' && emailTracking?.first_sent_at && (
          <motion.div variants={itemVariants}>
            <p className="text-[13px] font-medium text-white/40 uppercase tracking-wider px-1 mb-2">
              Email Tracking
            </p>
            <div className="rounded-2xl bg-white/[0.03] border border-white/[0.06] overflow-hidden">
              <div className="grid grid-cols-4 divide-x divide-white/[0.06]">
                <div className="p-3 text-center">
                  <Send className="h-4 w-4 mx-auto mb-1 text-blue-400" />
                  <p className="text-[11px] text-white/40">Sent</p>
                  <p className="text-[13px] font-semibold text-white">
                    {format(new Date(emailTracking.first_sent_at), 'd MMM')}
                  </p>
                </div>
                <div className="p-3 text-center">
                  <Eye className="h-4 w-4 mx-auto mb-1 text-white/40" />
                  <p className="text-[11px] text-white/40">Opens</p>
                  <p className={cn("text-[13px] font-semibold", emailTracking.email_opened_at ? 'text-blue-400' : 'text-white/30')}>
                    {emailTracking.email_opened_at ? (emailTracking.email_open_count || 1) : '—'}
                  </p>
                </div>
                <div className="p-3 text-center">
                  <Bell className="h-4 w-4 mx-auto mb-1 text-white/40" />
                  <p className="text-[11px] text-white/40">Reminders</p>
                  <p className={cn("text-[13px] font-semibold", (emailTracking.reminder_count || 0) > 0 ? 'text-purple-400' : 'text-white')}>
                    {emailTracking.reminder_count || 0}/2
                  </p>
                </div>
                <div className="p-3 text-center">
                  <Clock className="h-4 w-4 mx-auto mb-1 text-white/40" />
                  <p className="text-[11px] text-white/40">Expires</p>
                  <p className={cn("text-[13px] font-semibold", isExpired ? 'text-red-400' : daysUntilExpiry !== null && daysUntilExpiry <= 3 ? 'text-amber-400' : 'text-white')}>
                    {isExpired ? 'Expired' : daysUntilExpiry === 0 ? 'Today' : `${daysUntilExpiry}d`}
                  </p>
                </div>
              </div>
              <div className="px-4 py-3 border-t border-white/[0.06] bg-white/[0.02]">
                <p className="text-[12px] text-center text-white/40">
                  {emailTracking.email_opened_at ? (
                    <span className="text-blue-400">Client viewed your quote — awaiting decision</span>
                  ) : (
                    'Auto-reminders at 3 & 7 days if no response'
                  )}
                </p>
              </div>
              {!isExpired && (emailTracking.reminder_count || 0) < 2 && (
                <button
                  onClick={handleSendReminder}
                  disabled={isSendingReminder}
                  className="flex items-center justify-center gap-2 w-full p-3.5 border-t border-white/[0.06] touch-manipulation active:bg-white/[0.04] transition-colors"
                >
                  {isSendingReminder ? <Loader2 className="h-4 w-4 animate-spin text-white/50" /> : <Bell className="h-4 w-4 text-white/50" />}
                  <span className="text-[15px] font-medium text-white">Send Reminder</span>
                </button>
              )}
            </div>
          </motion.div>
        )}

        {/* Client Details */}
        <motion.div variants={itemVariants}>
          <p className="text-[13px] font-medium text-white/40 uppercase tracking-wider px-1 mb-2">
            Client Details
          </p>
          <div className="rounded-2xl bg-white/[0.03] border border-white/[0.06] overflow-hidden divide-y divide-white/[0.06]">
            <div className="flex items-center gap-3 p-3.5">
              <div className="w-10 h-10 rounded-xl bg-purple-500 flex items-center justify-center flex-shrink-0">
                <User className="h-5 w-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[15px] font-medium text-white">{quote.client?.name || 'No client name'}</p>
                <p className="text-[13px] text-white/50">Client Name</p>
              </div>
            </div>
            {quote.client?.email && (
              <a href={`mailto:${quote.client.email}`} className="flex items-center gap-3 p-3.5 touch-manipulation active:bg-white/[0.04] transition-colors">
                <div className="w-10 h-10 rounded-xl bg-blue-500 flex items-center justify-center flex-shrink-0">
                  <Mail className="h-5 w-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[15px] font-medium text-white">{quote.client.email}</p>
                  <p className="text-[13px] text-white/50">Email</p>
                </div>
                <ChevronRight className="h-4 w-4 text-white/20" />
              </a>
            )}
            {quote.client?.phone && (
              <a href={`tel:${quote.client.phone}`} className="flex items-center gap-3 p-3.5 touch-manipulation active:bg-white/[0.04] transition-colors">
                <div className="w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center flex-shrink-0">
                  <Phone className="h-5 w-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[15px] font-medium text-white">{quote.client.phone}</p>
                  <p className="text-[13px] text-white/50">Phone</p>
                </div>
                <ChevronRight className="h-4 w-4 text-white/20" />
              </a>
            )}
            {quote.client?.address && (
              <div className="flex items-center gap-3 p-3.5">
                <div className="w-10 h-10 rounded-xl bg-orange-500 flex items-center justify-center flex-shrink-0">
                  <MapPin className="h-5 w-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[15px] font-medium text-white">{quote.client.address}</p>
                  <p className="text-[13px] text-white/50">Address</p>
                </div>
              </div>
            )}
          </div>
        </motion.div>

        {/* Job Details */}
        {quote.jobDetails?.description && (
          <motion.div variants={itemVariants}>
            <p className="text-[13px] font-medium text-white/40 uppercase tracking-wider px-1 mb-2">
              Job Details
            </p>
            <div className="rounded-2xl bg-white/[0.03] border border-white/[0.06] p-4">
              {quote.jobDetails.title && (
                <h3 className="text-[15px] font-semibold text-white mb-2">{quote.jobDetails.title}</h3>
              )}
              <p className="text-[14px] text-white/70 whitespace-pre-wrap">{quote.jobDetails.description}</p>
              {quote.jobDetails.location && (
                <div className="flex items-center gap-2 mt-3 pt-3 border-t border-white/[0.06]">
                  <MapPin className="h-4 w-4 text-white/40" />
                  <span className="text-[13px] text-white/50">{quote.jobDetails.location}</span>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* Quote Dates */}
        <motion.div variants={itemVariants}>
          <p className="text-[13px] font-medium text-white/40 uppercase tracking-wider px-1 mb-2">
            Quote Dates
          </p>
          <div className="rounded-2xl bg-white/[0.03] border border-white/[0.06] overflow-hidden divide-y divide-white/[0.06]">
            <div className="flex items-center gap-3 p-3.5">
              <div className="w-10 h-10 rounded-xl bg-cyan-500 flex items-center justify-center flex-shrink-0">
                <Calendar className="h-5 w-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[15px] font-medium text-white">{format(new Date(quote.createdAt), 'dd MMM yyyy')}</p>
                <p className="text-[13px] text-white/50">Created</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3.5">
              <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0", isExpired ? 'bg-red-500' : 'bg-amber-500')}>
                <Clock className="h-5 w-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className={cn("text-[15px] font-medium", isExpired ? 'text-red-400' : 'text-white')}>
                  {format(new Date(quote.expiryDate), 'dd MMM yyyy')}
                </p>
                <p className="text-[13px] text-white/50">
                  {isExpired ? 'Expired' : daysUntilExpiry !== null && daysUntilExpiry <= 7 ? `${daysUntilExpiry} days left` : 'Valid Until'}
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Line Items */}
        <motion.div variants={itemVariants}>
          <p className="text-[13px] font-medium text-white/40 uppercase tracking-wider px-1 mb-2">
            Line Items ({quote.items?.length || 0})
          </p>
          <div className="rounded-2xl bg-white/[0.03] border border-white/[0.06] overflow-hidden divide-y divide-white/[0.06]">
            {quote.items?.map((item, index) => (
              <div key={index} className="p-3.5">
                <div className="flex justify-between items-start gap-3">
                  <div className="flex-1 min-w-0">
                    <p className="text-[15px] font-medium text-white leading-tight">{item.name || item.description}</p>
                    <p className="text-[13px] text-white/50 mt-0.5">
                      {item.quantity} × {formatCurrency(item.unitPrice || item.price)}
                    </p>
                  </div>
                  <p className="text-[15px] font-semibold text-elec-yellow whitespace-nowrap">
                    {formatCurrency(item.total || (item.quantity * (item.unitPrice || item.price || 0)))}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Quote Summary */}
        <motion.div variants={itemVariants}>
          <p className="text-[13px] font-medium text-white/40 uppercase tracking-wider px-1 mb-2">
            Summary
          </p>
          <div className="rounded-2xl bg-white/[0.03] border border-white/[0.06] p-4 space-y-3">
            <div className="flex justify-between text-[14px]">
              <span className="text-white/50">Subtotal</span>
              <span className="text-white">{formatCurrency(quote.subtotal)}</span>
            </div>
            {(quote.overhead ?? 0) > 0 && (
              <div className="flex justify-between text-[14px]">
                <span className="text-white/50">Overhead</span>
                <span className="text-white">{formatCurrency(quote.overhead)}</span>
              </div>
            )}
            {(quote.profit ?? 0) > 0 && (
              <div className="flex justify-between text-[14px]">
                <span className="text-white/50">Profit</span>
                <span className="text-white">{formatCurrency(quote.profit)}</span>
              </div>
            )}
            {(quote.vatAmount ?? 0) > 0 && (
              <div className="flex justify-between text-[14px]">
                <span className="text-white/50">VAT</span>
                <span className="text-white">{formatCurrency(quote.vatAmount)}</span>
              </div>
            )}
            <div className="flex justify-between pt-3 border-t border-white/[0.06]">
              <span className="text-[16px] font-semibold text-white">Total</span>
              <span className="text-[18px] font-bold text-elec-yellow">{formatCurrency(quote.total)}</span>
            </div>
          </div>
        </motion.div>

        {/* Notes */}
        {quote.notes && (
          <motion.div variants={itemVariants}>
            <p className="text-[13px] font-medium text-white/40 uppercase tracking-wider px-1 mb-2">
              Notes
            </p>
            <div className="rounded-2xl bg-white/[0.03] border border-white/[0.06] p-4">
              <p className="text-[14px] text-white/70 whitespace-pre-wrap">{quote.notes}</p>
            </div>
          </motion.div>
        )}
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent className="rounded-2xl">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Quote {quote.quoteNumber}?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the quote
              and all associated data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting} className="rounded-xl">Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={isDeleting}
              className="bg-destructive hover:bg-destructive/90 rounded-xl"
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
    </motion.div>
  );
};

export default QuoteViewPage;
