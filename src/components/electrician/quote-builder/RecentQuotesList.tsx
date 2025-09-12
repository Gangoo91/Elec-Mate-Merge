import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MobileButton } from '@/components/ui/mobile-button';
import { Badge } from '@/components/ui/badge';
import { FileText, Download, Trash2, Eye, Calendar, Check, Mail, Tag, Clock, X } from 'lucide-react';
import { Quote, QuoteTag } from '@/types/quote';
import { generateQuotePDF } from './QuotePDFGenerator';
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
  const [loadingAction, setLoadingAction] = useState<string>('');
  const [selectedQuote, setSelectedQuote] = useState<Quote | null>(null);
  const [confirmAction, setConfirmAction] = useState<'accept' | 'reject' | null>(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const handleRegeneratePDF = (quote: Quote) => {
    try {
      generateQuotePDF(quote);
      toast({
        title: "PDF Generated",
        description: `Quote ${quote.quoteNumber} has been downloaded.`,
        variant: "success"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate PDF. Please try again.",
        variant: "destructive"
      });
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
        <Card key={quote.id} className="border-elec-yellow/20 bg-elec-gray hover:bg-elec-gray/90 transition-colors">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              {/* Quote Details */}
              <div className="flex-1 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 flex-wrap">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-elec-yellow/10">
                      <FileText className="h-4 w-4 text-elec-yellow" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{quote.quoteNumber}</h3>
                      <p className="text-sm text-muted-foreground">{quote.client.name}</p>
                    </div>
                  </div>
                  <Badge variant={getStatusVariant(quote.status)} className="w-fit">
                    {quote.status.charAt(0).toUpperCase() + quote.status.slice(1)}
                  </Badge>
                  {quote.tags && quote.tags.length > 0 && (
                    <div className="flex gap-1 flex-wrap">
                      {quote.tags.map((tag) => (
                        <Badge key={tag} variant={getTagVariant(tag)} className="text-xs">
                          <Tag className="h-3 w-3 mr-1" />
                          {getTagLabel(tag)}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{formatCurrency(quote.total)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>{format(quote.createdAt, 'dd MMM yyyy')}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <span>{quote.items.length} item{quote.items.length !== 1 ? 's' : ''}</span>
                  </div>
                  {quote.lastReminderSentAt && (
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-xs">Last reminder: {quote.lastReminderSentAt.toLocaleDateString()}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2">
                {/* Inline Accept/Reject for sent quotes */}
                {quote.status === 'sent' && onUpdateQuoteStatus && (
                  <div className="flex items-center gap-2">
                    <MobileButton
                      size="sm"
                      variant="elec"
                      onClick={() => handleActionClick(quote, 'accept')}
                      disabled={loadingAction.startsWith(`action-${quote.id}`)}
                      loading={loadingAction === `action-${quote.id}`}
                      aria-label={`Accept quote ${quote.quoteNumber}`}
                      icon={<Check className="h-4 w-4" />}
                    >
                      Accept
                    </MobileButton>
                    <MobileButton
                      size="sm"
                      variant="destructive"
                      onClick={() => handleActionClick(quote, 'reject')}
                      disabled={loadingAction.startsWith(`action-${quote.id}`)}
                      loading={loadingAction === `action-${quote.id}`}
                      aria-label={`Reject quote ${quote.quoteNumber}`}
                      icon={<X className="h-4 w-4" />}
                    >
                      Reject
                    </MobileButton>
                  </div>
                )}

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleRegeneratePDF(quote)}
                  className="hover:bg-elec-yellow/10"
                >
                  <Download className="h-4 w-4 mr-1" />
                  PDF
                </Button>
                
                {/* Status Management Dropdown - hidden when status is 'sent' */}
                {onUpdateQuoteStatus && quote.status !== 'sent' && (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="hover:bg-elec-yellow/10"
                        disabled={loadingAction.startsWith(`status-${quote.id}`)}
                      >
                        <Check className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
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
                      {quote.status === 'approved' && quote.tags?.includes('awaiting_payment') && (
                        <DropdownMenuItem onClick={() => handleStatusUpdate(quote.id, 'approved', [])}>
                          Mark as Paid
                        </DropdownMenuItem>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}

                {/* Payment Reminder Dropdown */}
                {onSendPaymentReminder && quote.tags?.includes('awaiting_payment') && (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="hover:bg-elec-yellow/10"
                        disabled={loadingAction.startsWith(`reminder-${quote.id}`)}
                      >
                        <Mail className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
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