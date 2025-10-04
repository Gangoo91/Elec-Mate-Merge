import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MobileButton } from '@/components/ui/mobile-button';
import { Badge } from '@/components/ui/badge';
import { FileText, Download, Trash2, Eye, Calendar, Check, Mail, Tag, Clock, X, Receipt, User, MoreVertical } from 'lucide-react';
import { Quote, QuoteTag } from '@/types/quote';
import { useCompanyProfile } from '@/hooks/useCompanyProfile';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { ConfirmationDialog } from '@/components/ui/confirmation-dialog';
import { InvoiceDecisionDialog } from '@/components/electrician/invoice-builder/InvoiceDecisionDialog';
import { useInvoiceStorage } from '@/hooks/useInvoiceStorage';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
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

  const canRaiseInvoice = (quote: Quote) => {
    return quote.status === 'approved' && quote.tags?.includes('work_done') && !quote.invoice_raised;
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
      const { data, error } = await supabase.functions.invoke('generate-pdf-monkey', {
        body: {
          quote,
          companyProfile: effectiveCompanyProfile
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
      const invoiceData = {
        id: quoteForInvoice.id,
        invoice_number: `INV-${Date.now()}`,
        invoice_date: new Date(),
        invoice_due_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        invoice_status: 'draft' as const,
        invoice_raised: true,
      };

      const success = await saveInvoice(invoiceData);
      
      if (success) {
        toast({
          title: "Invoice Created",
          description: "Invoice has been generated successfully from quote data",
        });
        setShowInvoiceDecision(false);
        setQuoteForInvoice(null);
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

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP'
    }).format(amount);
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
    <div className="space-y-3">
      {displayQuotes.map((quote) => (
        <Card key={quote.id} className="border-elec-yellow/20 rounded-lg overflow-hidden bg-elec-card hover:border-elec-yellow/30 transition-all duration-200">
          {/* Hero Section - Price & Status */}
          <div className="bg-gradient-to-br from-elec-gray to-elec-gray/80 p-5 border-b border-elec-yellow/10">
            <div className="flex items-start justify-between gap-3 mb-3">
              <Badge variant="outline" className="border-elec-yellow/40 bg-elec-dark/50">
                {quote.quoteNumber}
              </Badge>
              <Badge variant={getStatusVariant(quote.status)} className="shrink-0">
                {quote.status.charAt(0).toUpperCase() + quote.status.slice(1)}
              </Badge>
            </div>
            
            {/* Large Price Display */}
            <div className="text-4xl font-bold text-elec-yellow">
              {formatCurrency(quote.total)}
            </div>
          </div>

          {/* Client & Essential Info */}
          <div className="p-5 space-y-4 border-b border-elec-yellow/10">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-elec-yellow shrink-0" />
              <span className="font-medium truncate">{quote.client.name}</span>
            </div>
            
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5 text-elec-yellow" />
                <span>{format(quote.createdAt, 'dd MMM yyyy')}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <FileText className="h-3.5 w-3.5 text-elec-yellow" />
                <span>{quote.items.length} item{quote.items.length !== 1 ? 's' : ''}</span>
              </div>
            </div>
            
            {/* Tags - Only show if present */}
            {quote.tags && quote.tags.length > 0 && (
              <div className="flex gap-1.5 flex-wrap">
                {quote.tags.map((tag) => (
                  <Badge key={tag} variant={getTagVariant(tag)} className="text-xs">
                    <Tag className="h-3 w-3 mr-1" />
                    {getTagLabel(tag)}
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {/* Actions Section - Simplified */}
          <div className="p-5">
            <div className="flex gap-2">
              {/* Primary Action - Context Aware */}
              {canRaiseInvoice(quote) ? (
                <MobileButton
                  variant="elec"
                  size="default"
                  className="flex-1 h-10"
                  onClick={() => {
                    setQuoteForInvoice(quote);
                    setShowInvoiceDecision(true);
                  }}
                  icon={<Receipt className="h-4 w-4" />}
                >
                  Raise Invoice
                </MobileButton>
              ) : quote.status === 'sent' && onUpdateQuoteStatus ? (
                <>
                  <MobileButton
                    variant="elec"
                    size="default"
                    onClick={() => handleActionClick(quote, 'accept')}
                    disabled={loadingAction.startsWith(`action-${quote.id}`)}
                    icon={<Check className="h-4 w-4" />}
                    className="flex-1 h-10 bg-green-600 hover:bg-green-700 text-white border-0"
                  >
                    Accept
                  </MobileButton>
                  <MobileButton
                    variant="outline"
                    size="default"
                    onClick={() => handleActionClick(quote, 'reject')}
                    disabled={loadingAction.startsWith(`action-${quote.id}`)}
                    icon={<X className="h-4 w-4" />}
                    className="flex-1 h-10 border-red-500/30 text-red-500 hover:bg-red-500/10"
                  >
                    Reject
                  </MobileButton>
                </>
              ) : (
                <MobileButton
                  variant="elec"
                  size="default"
                  className="flex-1 h-10"
                  onClick={() => handleRegeneratePDF(quote)}
                  disabled={loadingAction === `pdf-${quote.id}`}
                  icon={<Download className="h-4 w-4" />}
                >
                  {loadingAction === `pdf-${quote.id}` ? 'Generating...' : 'Download PDF'}
                </MobileButton>
              )}
              
              {/* More Actions Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <MobileButton
                    variant="outline"
                    size="icon"
                    className="shrink-0 h-10 w-10"
                  >
                    <MoreVertical className="h-4 w-4" />
                  </MobileButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 bg-popover z-50">
                  {/* Download PDF if not primary action */}
                  {!(quote.status !== 'sent' && !canRaiseInvoice(quote)) && (
                    <>
                      <DropdownMenuItem onClick={() => handleRegeneratePDF(quote)} disabled={loadingAction === `pdf-${quote.id}`}>
                        <Download className="h-4 w-4 mr-2" />
                        Download PDF
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                    </>
                  )}
                  
                  {/* Status Updates */}
                  {onUpdateQuoteStatus && quote.status !== 'sent' && (
                    <>
                      {quote.status === 'pending' && (
                        <>
                          <DropdownMenuItem onClick={() => handleStatusUpdate(quote.id, 'pending', ['job_not_complete'])}>
                            <Clock className="h-4 w-4 mr-2" />
                            Mark Job Not Complete
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleStatusUpdate(quote.id, 'pending', ['awaiting_payment'])}>
                            <Clock className="h-4 w-4 mr-2" />
                            Mark Awaiting Payment
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleStatusUpdate(quote.id, 'approved')}>
                            <Check className="h-4 w-4 mr-2" />
                            Mark as Approved
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                        </>
                      )}
                      {quote.status === 'approved' && !quote.tags?.includes('work_done') && (
                        <>
                          <DropdownMenuItem onClick={() => handleStatusUpdate(quote.id, 'approved', ['work_done'])}>
                            <Check className="h-4 w-4 mr-2" />
                            Mark Work Complete
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                        </>
                      )}
                    </>
                  )}
                  
                  {/* Payment Reminders */}
                  {onSendPaymentReminder && quote.tags?.includes('awaiting_payment') && (
                    <>
                      <DropdownMenuItem onClick={() => handleSendReminder(quote.id, 'gentle')}>
                        <Mail className="h-4 w-4 mr-2" />
                        Send Gentle Reminder
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleSendReminder(quote.id, 'firm')}>
                        <Mail className="h-4 w-4 mr-2" />
                        Send Firm Reminder
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleSendReminder(quote.id, 'final')}>
                        <Mail className="h-4 w-4 mr-2" />
                        Send Final Notice
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                    </>
                  )}
                  
                  {/* Delete */}
                  <DropdownMenuItem 
                    onClick={() => handleDeleteQuote(quote)}
                    className="text-red-500 focus:text-red-500"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete Quote
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </Card>
      ))}
      
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