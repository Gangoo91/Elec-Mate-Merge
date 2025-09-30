import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MobileButton } from '@/components/ui/mobile-button';
import { Badge } from '@/components/ui/badge';
import { FileText, Download, Trash2, Eye, Calendar, Check, Mail, Tag, Clock, X, Receipt } from 'lucide-react';
import { Quote, QuoteTag } from '@/types/quote';
import { generateProfessionalQuotePDF } from '@/utils/quote-pdf-professional';
import { generateAIEnhancedQuotePDF } from '@/utils/ai-enhanced-quote-pdf';
import { useCompanyProfile } from '@/hooks/useCompanyProfile';
import { toast } from '@/hooks/use-toast';
import { ConfirmationDialog } from '@/components/ui/confirmation-dialog';
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
  const [loadingAction, setLoadingAction] = useState<string>('');
  const [selectedQuote, setSelectedQuote] = useState<Quote | null>(null);
  const [confirmAction, setConfirmAction] = useState<'accept' | 'reject' | null>(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

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

      // Ensure quote has basic required data
      const effectiveQuote = {
        ...quote,
        quoteNumber: quote.quoteNumber || `Q${Date.now()}`,
        createdAt: quote.createdAt || new Date(),
        expiryDate: quote.expiryDate || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        status: quote.status || 'draft',
        subtotal: quote.subtotal || 0,
        total: quote.total || 0,
        vatAmount: quote.vatAmount || 0,
        client: quote.client || {
          name: "Client Name",
          email: "client@example.com",
          phone: "0123 456 7890",
          address: "Client Address",
          postcode: "AB1 2CD"
        }
      };

      // Always use the regular professional PDF generator
      const success = generateProfessionalQuotePDF({
        quote: effectiveQuote,
        companyProfile: effectiveCompanyProfile
      });

      if (success) {
        toast({
          title: "PDF Generated",
          description: `Quote ${quote.quoteNumber} has been downloaded.`,
          variant: "success"
        });
      } else {
        toast({
          title: "Error",
          description: "Failed to generate PDF. Please try again.",
          variant: "destructive"
        });
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
    <div className="space-y-4">
      {displayQuotes.map((quote) => (
        <Card key={quote.id} className="border-elec-yellow/20 bg-elec-gray hover:shadow-lg transition-all duration-200">
          <CardContent className="p-0">
            {/* Header Section */}
            <div className="p-4 sm:p-6 border-b border-border/50">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="flex items-start gap-3 flex-1">
                  <div className="p-3 rounded-xl bg-elec-yellow/10 shrink-0">
                    <FileText className="h-5 w-5 text-elec-yellow" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <h3 className="font-bold text-lg">{quote.quoteNumber}</h3>
                      <Badge variant={getStatusVariant(quote.status)} className="text-xs">
                        {quote.status.charAt(0).toUpperCase() + quote.status.slice(1)}
                      </Badge>
                    </div>
                    <p className="text-muted-foreground mb-2">{quote.client.name}</p>
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
                </div>
                <div className="text-right shrink-0">
                  <div className="text-2xl font-bold text-elec-yellow">
                    {formatCurrency(quote.total)}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    Total Amount
                  </div>
                </div>
              </div>
            </div>

            {/* Info Section */}
            <div className="px-4 sm:px-6 py-4 bg-muted/30">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground shrink-0" />
                  <div>
                    <div className="text-xs text-muted-foreground">Created</div>
                    <div className="font-medium">{format(quote.createdAt, 'dd MMM yyyy')}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-muted-foreground shrink-0" />
                  <div>
                    <div className="text-xs text-muted-foreground">Items</div>
                    <div className="font-medium">{quote.items.length} item{quote.items.length !== 1 ? 's' : ''}</div>
                  </div>
                </div>
                {quote.lastReminderSentAt && (
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground shrink-0" />
                    <div>
                      <div className="text-xs text-muted-foreground">Last Reminder</div>
                      <div className="font-medium text-xs">{quote.lastReminderSentAt.toLocaleDateString()}</div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Actions Section */}
            <div className="p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                {/* Primary Actions */}
                <div className="flex items-center gap-2 flex-wrap flex-1">
                  {/* Accept/Reject for sent quotes */}
                  {quote.status === 'sent' && onUpdateQuoteStatus && (
                    <>
                      <Button
                        size="sm"
                        variant="default"
                        onClick={() => handleActionClick(quote, 'accept')}
                        disabled={loadingAction.startsWith(`action-${quote.id}`)}
                        className="bg-green-600 hover:bg-green-700 flex-1 sm:flex-initial"
                      >
                        <Check className="h-4 w-4 mr-2" />
                        Accept Quote
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleActionClick(quote, 'reject')}
                        disabled={loadingAction.startsWith(`action-${quote.id}`)}
                        className="flex-1 sm:flex-initial"
                      >
                        <X className="h-4 w-4 mr-2" />
                        Reject
                      </Button>
                    </>
                  )}

                  {/* Raise Invoice - prominent when available */}
                  {canRaiseInvoice(quote) && (
                    <Button
                      size="sm"
                      variant="default"
                      onClick={() => navigate(`/electrician/invoice-builder/${quote.id}`)}
                      className="bg-green-600 hover:bg-green-700 flex-1 sm:flex-initial"
                    >
                      <Receipt className="h-4 w-4 mr-2" />
                      Raise Invoice
                    </Button>
                  )}

                  {/* PDF Download */}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleRegeneratePDF(quote)}
                    disabled={loadingAction === `pdf-${quote.id}`}
                    className="hover:bg-elec-yellow/10"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    {loadingAction === `pdf-${quote.id}` ? 'Generating...' : 'Download PDF'}
                  </Button>
                </div>

                {/* Secondary Actions */}
                <div className="flex items-center gap-2 justify-end">
                  {/* Status Management */}
                  {onUpdateQuoteStatus && quote.status !== 'sent' && (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          className="hover:bg-elec-yellow/10"
                          disabled={loadingAction.startsWith(`status-${quote.id}`)}
                        >
                          <Check className="h-4 w-4 mr-2" />
                          Update Status
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-56 bg-popover z-50">
                        {quote.status === 'pending' && (
                          <>
                            <DropdownMenuItem onClick={() => handleStatusUpdate(quote.id, 'pending', ['job_not_complete'])}>
                              Mark as Job Not Complete
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleStatusUpdate(quote.id, 'pending', ['awaiting_payment'])}>
                              Mark as Awaiting Payment
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleStatusUpdate(quote.id, 'approved')}>
                              Mark as Approved
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => handleStatusUpdate(quote.id, 'pending', ['on_hold'])}>
                              Put On Hold
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleStatusUpdate(quote.id, 'pending', ['disputed'])}>
                              Mark as Disputed
                            </DropdownMenuItem>
                          </>
                        )}
                        {quote.status === 'approved' && !quote.tags?.includes('work_done') && (
                          <DropdownMenuItem onClick={() => handleStatusUpdate(quote.id, 'approved', ['work_done'])}>
                            Mark Work Complete
                          </DropdownMenuItem>
                        )}
                        {quote.status === 'approved' && quote.tags?.includes('awaiting_payment') && (
                          <DropdownMenuItem onClick={() => handleStatusUpdate(quote.id, 'approved', [])}>
                            Mark as Paid
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  )}

                  {/* Payment Reminders */}
                  {onSendPaymentReminder && quote.tags?.includes('awaiting_payment') && (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          className="hover:bg-elec-yellow/10"
                          disabled={loadingAction.startsWith(`reminder-${quote.id}`)}
                        >
                          <Mail className="h-4 w-4 mr-2" />
                          Send Reminder
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-52 bg-popover z-50">
                        <DropdownMenuItem onClick={() => handleSendReminder(quote.id, 'gentle')}>
                          Send Gentle Reminder
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleSendReminder(quote.id, 'firm')}>
                          Send Firm Reminder
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleSendReminder(quote.id, 'final')}>
                          Send Final Notice
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  )}

                  {/* Delete */}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDeleteQuote(quote)}
                    className="hover:bg-red-500/10 text-red-500 border-red-500/20"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
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
    </div>
  );
};

export default RecentQuotesList;