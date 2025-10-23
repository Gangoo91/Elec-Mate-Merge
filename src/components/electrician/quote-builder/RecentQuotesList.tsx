import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText } from 'lucide-react';
import { Quote, QuoteTag } from '@/types/quote';
import { useCompanyProfile } from '@/hooks/useCompanyProfile';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { ConfirmationDialog } from '@/components/ui/confirmation-dialog';
import { InvoiceDecisionDialog } from '@/components/electrician/invoice-builder/InvoiceDecisionDialog';
import { useInvoiceStorage } from '@/hooks/useInvoiceStorage';
import { Badge } from '@/components/ui/badge';
import QuoteTableView from '@/components/electrician/quote-builder/QuoteTableView';
import QuoteCardView from '@/components/electrician/quote-builder/QuoteCardView';
import { format } from 'date-fns';

interface RecentQuotesListProps {
  quotes: Quote[];
  onDeleteQuote: (quoteId: string) => Promise<boolean>;
  onUpdateQuoteStatus?: (quoteId: string, status: Quote['status'], tags?: Quote['tags'], acceptanceStatus?: Quote['acceptance_status']) => Promise<boolean>;
  onSendPaymentReminder?: (quoteId: string, reminderType: 'gentle' | 'firm' | 'final') => Promise<boolean>;
  showAll?: boolean;
}

const RecentQuotesList: React.FC<RecentQuotesListProps> = ({ 
  quotes, 
  onDeleteQuote, 
  onUpdateQuoteStatus,
  onSendPaymentReminder,
  showAll = false
}) => {
  const navigate = useNavigate();
  const { companyProfile } = useCompanyProfile();
  const { saveInvoice } = useInvoiceStorage();
  const [loadingAction, setLoadingAction] = useState<string>('');
  const [selectedQuote, setSelectedQuote] = useState<Quote | null>(null);
  const [confirmAction, setConfirmAction] = useState<'accept' | 'reject' | null>(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [showInvoiceDecision, setShowInvoiceDecision] = useState(false);
  const [quoteForInvoice, setQuoteForInvoice] = useState<Quote | null>(null);
  
  
  // Poll PDF Monkey status until downloadUrl is ready

  // Poll PDF Monkey status until downloadUrl is ready
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

  const canRaiseInvoice = (quote: Quote) => {
    const isWorkComplete = quote.tags?.includes('work_done');
    return quote.acceptance_status === 'accepted' && isWorkComplete && !quote.invoice_raised;
  };

  const hasInvoiceRaised = (quote: Quote) => {
    return quote.invoice_raised === true;
  };
  
  const handleRegeneratePDF = async (quote: Quote) => {
    setLoadingAction(`pdf-${quote.id}`);
    try {
      // Create a default company profile if none exists
      const effectiveCompanyProfile = companyProfile || {
        id: 'default',
        user_id: 'default',
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
        updated_at: new Date()
      };

      toast({
        title: "Generating PDF",
        description: "Please wait whilst your professional quote PDF is being generated...",
      });

      // Call PDF Monkey edge function
      // Use invoice template if this quote has been converted to an invoice
      const isInvoice = quote.invoice_raised === true;
      
      const { data, error } = await supabase.functions.invoke('generate-pdf-monkey', {
        body: {
          quote,
          companyProfile: effectiveCompanyProfile,
          invoice_mode: isInvoice
        }
      });

      if (error) throw error;

      if (data.success && data.downloadUrl) {
        // Download the PDF
        const response = await fetch(data.downloadUrl);
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `quote-${quote.quoteNumber}.pdf`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);

        toast({
          title: "PDF Generated",
          description: `Quote ${quote.quoteNumber} has been downloaded successfully.`,
          variant: "success"
        });
      } else {
        throw new Error(data.message || 'PDF generation failed');
      }
    } catch (error) {
      console.error('PDF generation error:', error);
      toast({
        title: "Error",
        description: "Failed to generate PDF. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoadingAction('');
    }
  };

  const handleDeleteQuote = async (quote: Quote) => {
    if (window.confirm(`Are you sure you want to delete quote ${quote.quoteNumber}?`)) {
      const success = await onDeleteQuote(quote.id);
      if (success) {
        toast({
          title: "Quote Deleted",
          description: `Quote ${quote.quoteNumber} has been deleted.`,
          variant: "success"
        });
      } else {
        toast({
          title: "Error",
          description: "Failed to delete quote. Please try again.",
          variant: "destructive"
        });
      }
    }
  };

  const getStatusVariant = (status: Quote['status']) => {
    switch (status) {
      case 'draft':
        return 'secondary';
      case 'sent':
        return 'default';
      case 'pending':
        return 'outline';
      case 'approved':
        return 'success';
      case 'rejected':
        return 'destructive';
      default:
        return 'secondary';
    }
  };

  const getTagVariant = (tag: QuoteTag) => {
    switch (tag) {
      case 'awaiting_payment':
        return 'destructive';
      case 'job_not_complete':
        return 'default';
      case 'on_hold':
        return 'secondary';
      case 'disputed':
        return 'destructive';
      default:
        return 'secondary';
    }
  };

  const getTagLabel = (tag: QuoteTag) => {
    switch (tag) {
      case 'awaiting_payment':
        return 'Awaiting Payment';
      case 'job_not_complete':
        return 'Job Not Complete';
      case 'on_hold':
        return 'On Hold';
      case 'disputed':
        return 'Disputed';
      default:
        return tag;
    }
  };

  const handleActionClick = (quote: Quote, action: 'accept' | 'reject') => {
    setSelectedQuote(quote);
    setConfirmAction(action);
    setShowConfirmDialog(true);
  };

  const handleNoChanges = async () => {
    if (!quoteForInvoice) return;

    setLoadingAction(`invoice-${quoteForInvoice.id}`);
    try {
      const invoiceNumber = `INV-${Date.now()}`;
      const dueDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
      const invoiceData = {
        ...quoteForInvoice,
        id: quoteForInvoice.id,
        invoice_number: invoiceNumber,
        invoice_date: new Date(),
        invoice_due_date: dueDate,
        invoice_status: 'draft' as const,
        invoice_raised: true,
        settings: {
          ...quoteForInvoice.settings,
          paymentTerms: '30 days',
          dueDate: dueDate,
        },
      };

      const success = await saveInvoice(invoiceData);
      
      if (success) {
        toast({
          title: "Invoice Created",
          description: `${invoiceNumber} created successfully from quote ${quoteForInvoice.quoteNumber}`,
          variant: "success",
        });
        setShowInvoiceDecision(false);
        setQuoteForInvoice(null);
        navigate('/electrician/invoices');
      } else {
        toast({
          title: "Error",
          description: "Failed to create invoice",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Error creating invoice:', error);
      toast({
        title: "Error",
        description: "Failed to create invoice",
        variant: "destructive",
      });
    } finally {
      setLoadingAction('');
    }
  };

  const handleShareWhatsApp = async (quote: Quote) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { data: freshQuote, error: fetchError } = await supabase
        .from('quotes')
        .select('*')
        .eq('id', quote.id)
        .eq('user_id', user.id)
        .single();

      if (fetchError || !freshQuote) throw new Error('Failed to fetch latest quote data');

      const { data: companyData } = await supabase
        .from('company_profiles')
        .select('*')
        .eq('user_id', user.id)
        .single();

      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error('User not authenticated');

      toast({
        title: "Generating PDF",
        description: "Please wait...",
      });

      const { data: pdfData, error: pdfError } = await supabase.functions.invoke('generate-pdf-monkey', {
        body: {
          quote: freshQuote,
          companyProfile: companyData,
          invoice_mode: false,
          force_regenerate: true
        },
        headers: {
          Authorization: `Bearer ${session.access_token}`
        }
      });

      let pdfUrl = pdfData?.downloadUrl;
      const documentId = pdfData?.documentId;

      if (!pdfUrl && documentId) {
        pdfUrl = await pollPdfDownloadUrl(documentId, session.access_token) || undefined;
      }

      if (pdfError || !pdfUrl) throw new Error('Failed to generate PDF');

      if (documentId) {
        const newVersion = (freshQuote.pdf_version || 0) + 1;
        await supabase
          .from('quotes')
          .update({
            pdf_document_id: documentId,
            pdf_generated_at: new Date().toISOString(),
            pdf_version: newVersion
          })
          .eq('id', quote.id);
      }


      // Don't modify signed URLs - it breaks AWS S3 signature
      const pdfDownloadUrl = pdfUrl;


      const clientData = typeof freshQuote.client_data === 'string' 
        ? JSON.parse(freshQuote.client_data) 
        : freshQuote.client_data;
      const clientName = clientData?.name || 'Valued Client';
      const companyName = companyData?.company_name || 'Your Company';
      const totalAmount = freshQuote.total || 0;
      const validityDate = freshQuote.expiry_date 
        ? format(new Date(freshQuote.expiry_date), 'dd MMMM yyyy')
        : format(new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), 'dd MMMM yyyy');
      
      const jobDetails = typeof freshQuote.job_details === 'string' 
        ? JSON.parse(freshQuote.job_details) 
        : freshQuote.job_details;
      const jobTitle = jobDetails?.title || 'Electrical Work';
      
      const message = `📋 *Quote ${freshQuote.quote_number}*

Dear ${clientName},

Please find your quote for ${jobTitle}

💰 Total Amount: ${formatCurrency(totalAmount)}
Valid until: ${validityDate}

📥 Download Quote (PDF):
${pdfDownloadUrl}

If you have any questions, please don't hesitate to contact us.

Best regards,
${companyName}`;

      const clientPhone = clientData?.phone;
      let whatsappUrl: string;
      if (clientPhone && (clientPhone.startsWith('+44') || clientPhone.startsWith('44'))) {
        const cleanPhone = clientPhone.replace(/\s/g, '').replace(/^44/, '+44');
        whatsappUrl = `https://wa.me/${cleanPhone.replace('+', '')}?text=${encodeURIComponent(message)}`;
      } else {
        whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
      }

      const whatsappWindow = window.open(whatsappUrl, '_blank');
      
      if (!whatsappWindow || whatsappWindow.closed || typeof whatsappWindow.closed === 'undefined') {
        window.location.href = whatsappUrl;
      }

      toast({
        title: 'Opening WhatsApp',
        description: 'WhatsApp will open with your quote message',
        variant: 'success',
      });
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to share via WhatsApp',
        variant: 'destructive',
      });
    }
  };

  const handleShareEmail = async (quote: Quote) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { data: freshQuote, error: fetchError } = await supabase
        .from('quotes')
        .select('*')
        .eq('id', quote.id)
        .eq('user_id', user.id)
        .single();

      if (fetchError || !freshQuote) throw new Error('Failed to fetch latest quote data');

      const { data: companyData } = await supabase
        .from('company_profiles')
        .select('*')
        .eq('user_id', user.id)
        .single();

      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error('User not authenticated');

      toast({
        title: "Generating PDF",
        description: "Please wait...",
      });

      const { data: pdfData, error: pdfError } = await supabase.functions.invoke('generate-pdf-monkey', {
        body: {
          quote: freshQuote,
          companyProfile: companyData,
          invoice_mode: false,
          force_regenerate: true
        },
        headers: {
          Authorization: `Bearer ${session.access_token}`
        }
      });

      let pdfUrl = pdfData?.downloadUrl;
      const documentId = pdfData?.documentId;

      if (!pdfUrl && documentId) {
        pdfUrl = await pollPdfDownloadUrl(documentId, session.access_token) || undefined;
      }

      if (pdfError || !pdfUrl) throw new Error('Failed to generate PDF');

      if (documentId) {
        const newVersion = (freshQuote.pdf_version || 0) + 1;
        await supabase
          .from('quotes')
          .update({
            pdf_document_id: documentId,
            pdf_generated_at: new Date().toISOString(),
            pdf_version: newVersion
          })
          .eq('id', quote.id);
      }


      // Don't modify signed URLs - it breaks AWS S3 signature
      const pdfDownloadUrl = pdfUrl;


      const clientData = typeof freshQuote.client_data === 'string' 
        ? JSON.parse(freshQuote.client_data) 
        : freshQuote.client_data;
      const clientEmail = clientData?.email || '';
      const companyName = companyData?.company_name || 'Your Company';
      const totalAmount = freshQuote.total || 0;
      const validityDate = freshQuote.expiry_date 
        ? format(new Date(freshQuote.expiry_date), 'dd MMMM yyyy')
        : format(new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), 'dd MMMM yyyy');
      
      const jobDetails = typeof freshQuote.job_details === 'string' 
        ? JSON.parse(freshQuote.job_details) 
        : freshQuote.job_details;
      const jobTitle = jobDetails?.title || 'Electrical Work';

      const subject = `Quote ${freshQuote.quote_number} - ${jobTitle}`;
      const body = `Dear ${clientData?.name || 'Valued Client'},

Please find your quote for ${jobTitle}.

Total Amount: ${formatCurrency(totalAmount)}
Valid until: ${validityDate}

Download your quote here:
${pdfDownloadUrl}

If you have any questions, please contact us.

Best regards,
${companyName}`;

      const mailtoLink = `mailto:${clientEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      window.location.href = mailtoLink;

      toast({
        title: 'Opening Email',
        description: 'Your email client will open with the quote',
        variant: 'success',
      });
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to prepare email',
        variant: 'destructive',
      });
    }
  };

  const handleHasChanges = () => {
    if (!quoteForInvoice) return;
    setShowInvoiceDecision(false);
    navigate(`/electrician/invoice-quote-builder/${quoteForInvoice.id}`);
  };

  const handleConfirmAction = async () => {
    if (!selectedQuote || !confirmAction || !onUpdateQuoteStatus) return;
    
    setLoadingAction(`action-${selectedQuote.id}`);
    try {
      let success = false;
      
      if (confirmAction === 'accept') {
        success = await onUpdateQuoteStatus(selectedQuote.id, 'approved', [], 'accepted');
      } else if (confirmAction === 'reject') {
        success = await onUpdateQuoteStatus(selectedQuote.id, 'rejected', [], 'rejected');
      }
      
      if (success) {
        toast({
          title: confirmAction === 'accept' ? "Quote Accepted" : "Quote Rejected",
          description: `Quote ${selectedQuote.quoteNumber} has been ${confirmAction}ed successfully.`,
          variant: "success"
        });
      } else {
        throw new Error(`Failed to ${confirmAction} quote`);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to ${confirmAction} quote. Please try again.`,
        variant: "destructive"
      });
    } finally {
      setLoadingAction('');
      setShowConfirmDialog(false);
      setSelectedQuote(null);
      setConfirmAction(null);
    }
  };

  const handleStatusUpdate = async (quoteId: string, status: Quote['status'], tags?: Quote['tags']) => {
    if (!onUpdateQuoteStatus) return;
    
    setLoadingAction(`status-${quoteId}`);
    try {
      const success = await onUpdateQuoteStatus(quoteId, status, tags);
      if (success) {
        toast({
          title: "Status Updated",
          description: `Quote status has been updated to ${status}`,
          variant: "success"
        });
      } else {
        throw new Error('Failed to update status');
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update quote status",
        variant: "destructive"
      });
    } finally {
      setLoadingAction('');
    }
  };

  const handleSendReminder = async (quoteId: string, reminderType: 'gentle' | 'firm' | 'final') => {
    if (!onSendPaymentReminder) return;
    
    setLoadingAction(`reminder-${quoteId}`);
    try {
      const success = await onSendPaymentReminder(quoteId, reminderType);
      if (success) {
        toast({
          title: "Reminder Sent",
          description: `${reminderType} payment reminder has been sent`,
          variant: "success"
        });
      } else {
        throw new Error('Failed to send reminder');
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send payment reminder",
        variant: "destructive"
      });
    } finally {
      setLoadingAction('');
    }
  };

  const handleMarkWorkComplete = async (quote: Quote) => {
    if (!onUpdateQuoteStatus) return;
    
    setLoadingAction(`work-complete-${quote.id}`);
    try {
      const currentTags = quote.tags || [];
      const newTags = [...currentTags.filter(tag => tag !== 'work_done'), 'work_done'] as Quote['tags'];
      
      const success = await onUpdateQuoteStatus(quote.id, quote.status, newTags);
      
      if (success) {
        // Also update work completion date
        await supabase
          .from('quotes')
          .update({ work_completion_date: new Date().toISOString() })
          .eq('id', quote.id);
        
        toast({
          title: "Work Marked Complete",
          description: "You can now raise an invoice for this quote",
        });
      } else {
        throw new Error('Failed to mark work complete');
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to mark work complete",
        variant: "destructive"
      });
    } finally {
      setLoadingAction('');
    }
  };

  const handleViewInvoice = (quote: Quote) => {
    if (quote.invoice_raised && quote.id) {
      navigate(`/electrician/invoices/${quote.id}`);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP'
    }).format(amount);
  };

  const getAcceptanceStatusBadge = (quote: Quote) => {
    const acceptanceStatus = quote.acceptance_status;
    
    if (acceptanceStatus === "accepted") {
      return (
        <Badge variant="success" className="text-xs">
          Accepted
        </Badge>
      );
    }
    
    if (acceptanceStatus === "rejected") {
      return (
        <Badge variant="destructive" className="text-xs">
          Rejected
        </Badge>
      );
    }
    
    if (quote.status === "sent") {
      return (
        <Badge variant="secondary" className="text-xs bg-blue-600/20 text-blue-300 border-blue-600/30">
          Sent
        </Badge>
      );
    }
    
    if (quote.status === "draft") {
      return (
        <Badge variant="outline" className="text-xs">
          Draft
        </Badge>
      );
    }
    
    return (
      <Badge variant="outline" className="text-xs">
        Pending
      </Badge>
    );
  };

  if (quotes.length === 0) {
    return (
      <Card className="border-0 shadow-lg bg-gradient-to-br from-card to-card/50">
        <CardContent className="p-8">
          <div className="text-center py-12 space-y-6">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-full blur-2xl"></div>
              <FileText className="relative h-16 w-16 text-muted-foreground mx-auto" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-semibold">No quotes created yet</h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                Start building professional quotes for your electrical projects. Generated quotes will appear here.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  const displayQuotes = showAll ? quotes : quotes.slice(0, 10);

  return (
    <div className="space-y-4">
      {/* Desktop Table View */}
      <QuoteTableView
        quotes={displayQuotes}
        loadingAction={loadingAction}
        handleRegeneratePDF={handleRegeneratePDF}
        handleStatusUpdate={handleStatusUpdate}
        onNavigate={navigate}
        hasInvoiceRaised={hasInvoiceRaised}
        getAcceptanceStatusBadge={getAcceptanceStatusBadge}
        formatCurrency={formatCurrency}
        canRaiseInvoice={canRaiseInvoice}
        onInvoiceAction={(quote) => {
          setQuoteForInvoice(quote);
          setShowInvoiceDecision(true);
        }}
        onShareWhatsApp={handleShareWhatsApp}
        onShareEmail={handleShareEmail}
        onViewInvoice={handleViewInvoice}
      />

      {/* Mobile/Tablet Card View */}
      <QuoteCardView
        quotes={displayQuotes}
        loadingAction={loadingAction}
        handleRegeneratePDF={handleRegeneratePDF}
        handleActionClick={handleActionClick}
        handleStatusUpdate={handleStatusUpdate}
        onNavigate={navigate}
        hasInvoiceRaised={hasInvoiceRaised}
        getAcceptanceStatusBadge={getAcceptanceStatusBadge}
        formatCurrency={formatCurrency}
        canRaiseInvoice={canRaiseInvoice}
        onInvoiceAction={(quote) => {
          setQuoteForInvoice(quote);
          setShowInvoiceDecision(true);
        }}
        onMarkWorkComplete={handleMarkWorkComplete}
        onViewInvoice={handleViewInvoice}
      />
      
      {!showAll && quotes.length > 10 && (
        <Card className="border-elec-yellow/20 bg-elec-gray/50">
          <CardContent className="p-4 text-center">
            <p className="text-sm text-muted-foreground">
              Showing 10 of {quotes.length} quotes
            </p>
            <Button variant="outline" size="sm" className="mt-2">
              View All Quotes
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Confirmation Dialog */}
      <ConfirmationDialog
        open={showConfirmDialog}
        onOpenChange={setShowConfirmDialog}
        title={confirmAction === 'accept' ? 'Accept Quote' : 'Reject Quote'}
        description={
          confirmAction === 'accept'
            ? `Are you sure you want to accept quote ${selectedQuote?.quoteNumber}? This will mark the quote as approved and accepted.`
            : `Are you sure you want to reject quote ${selectedQuote?.quoteNumber}? This action cannot be undone.`
        }
        confirmText={confirmAction === 'accept' ? 'Accept Quote' : 'Reject Quote'}
        variant={confirmAction === 'reject' ? 'destructive' : 'default'}
        onConfirm={handleConfirmAction}
        loading={loadingAction.startsWith('action-')}
      />

      {/* Invoice Decision Dialog */}
      <InvoiceDecisionDialog
        open={showInvoiceDecision}
        onOpenChange={setShowInvoiceDecision}
        onNoChanges={handleNoChanges}
        onHasChanges={handleHasChanges}
        loading={loadingAction.startsWith('invoice-')}
      />
    </div>
  );
};

export default RecentQuotesList;