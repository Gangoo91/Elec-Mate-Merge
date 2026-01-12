import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Download, Eye, Calendar, Check, X, Receipt, User, ArrowRight, CheckCheck, Trash2, RefreshCw, Send } from 'lucide-react';
import { Quote } from '@/types/quote';
import { format } from 'date-fns';
import { QuoteSendDropdown } from '@/components/electrician/quote-builder/QuoteSendDropdown';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface QuoteCardViewProps {
  quotes: Quote[];
  loadingAction: string;
  handleRegeneratePDF: (quote: Quote) => void;
  handleActionClick: (quote: Quote, action: 'accept' | 'reject') => void;
  handleStatusUpdate: (quoteId: string, status: Quote['status'], tags?: Quote['tags']) => void;
  onNavigate: (path: string) => void;
  hasInvoiceRaised: (quote: Quote) => boolean;
  getAcceptanceStatusBadge: (quote: Quote) => JSX.Element;
  formatCurrency: (amount: number) => string;
  canRaiseInvoice: (quote: Quote) => boolean;
  onInvoiceAction: (quote: Quote) => void;
  onMarkWorkComplete?: (quote: Quote) => void;
  onViewInvoice?: (quote: Quote) => void;
  onDeleteQuote: (quote: Quote) => void;
}

const QuoteCardView: React.FC<QuoteCardViewProps> = ({
  quotes,
  loadingAction,
  handleRegeneratePDF,
  handleActionClick,
  handleStatusUpdate,
  onNavigate,
  hasInvoiceRaised,
  getAcceptanceStatusBadge,
  formatCurrency,
  canRaiseInvoice,
  onInvoiceAction,
  onMarkWorkComplete,
  onViewInvoice,
  onDeleteQuote,
}) => {
  const isWorkComplete = (quote: Quote) => {
    return quote.tags?.includes('work_done');
  };

  const getStatusInfo = (quote: Quote) => {
    // Invoice already raised - highest priority
    if (hasInvoiceRaised(quote)) {
      return {
        color: 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300',
        borderColor: 'border-l-blue-500',
        label: 'Invoiced',
        icon: Receipt
      };
    }

    // Work complete + Accepted = Ready to invoice
    if (isWorkComplete(quote) && quote.acceptance_status === 'accepted') {
      return {
        color: 'bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300',
        borderColor: 'border-l-green-500',
        label: 'Ready to Invoice',
        icon: CheckCheck
      };
    }

    // Accepted + Work pending = In progress
    if (quote.acceptance_status === 'accepted' && !isWorkComplete(quote)) {
      return {
        color: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300',
        borderColor: 'border-l-green-500',
        label: 'Approved',
        icon: Check
      };
    }

    // Sent + Awaiting response
    if (quote.status === 'sent' && quote.acceptance_status !== 'accepted' && quote.acceptance_status !== 'rejected') {
      return {
        color: 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300',
        borderColor: 'border-l-amber-500',
        label: 'Sent',
        icon: Send
      };
    }

    // Rejected
    if (quote.acceptance_status === 'rejected') {
      return {
        color: 'bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300',
        borderColor: 'border-l-red-500',
        label: 'Declined',
        icon: X
      };
    }

    // Draft
    if (quote.status === 'draft') {
      return {
        color: 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300',
        borderColor: 'border-l-muted-foreground/40',
        label: 'Draft',
        icon: Eye
      };
    }

    // Default
    return {
      color: 'bg-slate-100 text-slate-700 dark:bg-slate-950 dark:text-slate-300',
      borderColor: 'border-l-muted-foreground/40',
      label: quote.status,
      icon: Eye
    };
  };

  // Check if quote can be resent (sent but not yet accepted/rejected)
  const canResend = (quote: Quote) => {
    return quote.status === 'sent' &&
           quote.acceptance_status !== 'accepted' &&
           quote.acceptance_status !== 'rejected';
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
      {quotes.map((quote) => {
        const statusInfo = getStatusInfo(quote);
        const StatusIcon = statusInfo.icon;

        return (
          <div
            key={quote.id}
            id={`quote-${quote.id}`}
            className={cn(
              "relative bg-card rounded-xl overflow-hidden transition-all border border-border/50 border-l-4 min-h-[80px]",
              statusInfo.borderColor
            )}
          >
            {/* Content Container */}
            <div className="relative p-4">
              {/* Top Row: Quote Number & Status */}
              <div className="flex items-start justify-between mb-3">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-base font-bold">#{quote.quoteNumber}</h3>
                    <Badge className={`text-[10px] ${statusInfo.color} border-0 flex items-center gap-1`}>
                      <StatusIcon className="h-3 w-3" />
                      <span className="hidden sm:inline">{statusInfo.label}</span>
                    </Badge>
                  </div>
                  {quote.acceptance_status === 'accepted' && quote.accepted_by_name && (
                    <p className="text-[10px] text-muted-foreground">
                      Signed by {quote.accepted_by_name}
                    </p>
                  )}
                  {hasInvoiceRaised(quote) && onViewInvoice && (
                    <button
                      onClick={() => onViewInvoice(quote)}
                      className="text-[10px] text-blue-400 hover:text-blue-300 flex items-center gap-1"
                    >
                      <Receipt className="h-3 w-3" />
                      Invoice #{quote.invoice_number}
                    </button>
                  )}
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onNavigate(`/electrician/quote-builder/${quote.id}`)}
                  className="h-8 w-8 text-muted-foreground hover:text-foreground"
                >
                  <Eye className="h-4 w-4" />
                </Button>
              </div>

              {/* Client and Amount Row */}
              <div className="flex items-center justify-between py-3 border-y border-border/30 mb-3">
                <div className="flex items-center gap-2 min-w-0 flex-1">
                  <User className="h-8 w-8 text-muted-foreground/50 flex-shrink-0" strokeWidth={1.5} />
                  <div className="min-w-0">
                    <p className="text-sm font-medium truncate">{quote.client.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {format(new Date(quote.createdAt), "dd MMM")} • {quote.items.length} items
                    </p>
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-lg font-bold text-elec-yellow">{formatCurrency(quote.total)}</p>
                </div>
              </div>

              {/* Action Buttons - Compact Grid */}
              <div className="space-y-2">
                {/* Primary Actions Row */}
                <div className="flex gap-2">
                  <button
                    onClick={() => handleRegeneratePDF(quote)}
                    disabled={loadingAction === `pdf-${quote.id}`}
                    className="flex-1 h-10 bg-elec-gray hover:bg-elec-gray/80 border border-border/50 rounded-lg flex items-center justify-center gap-1.5 text-xs font-medium disabled:opacity-50"
                  >
                    <Download className="h-3.5 w-3.5" />
                    PDF
                  </button>
                  <button
                    onClick={() => onNavigate(`/electrician/quotes/view/${quote.id}`)}
                    className="flex-1 h-10 bg-elec-gray hover:bg-elec-gray/80 border border-border/50 rounded-lg flex items-center justify-center gap-1.5 text-xs font-medium"
                  >
                    <Eye className="h-3.5 w-3.5" />
                    View
                  </button>
                  <button
                    onClick={() => onDeleteQuote(quote)}
                    className="h-10 w-10 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-500 rounded-lg flex items-center justify-center"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>

                {/* Send Options - Only for non-sent quotes */}
                {!canResend(quote) && (
                  <QuoteSendDropdown
                    quote={quote}
                    onSuccess={() => handleStatusUpdate(quote.id, 'sent')}
                    disabled={!quote.client?.email}
                  />
                )}

                {/* Conditional Action Buttons */}
                {quote.acceptance_status === 'accepted' && !isWorkComplete(quote) && !hasInvoiceRaised(quote) && onMarkWorkComplete && (
                  <button
                    onClick={() => onMarkWorkComplete(quote)}
                    disabled={loadingAction === `work-complete-${quote.id}`}
                    className="w-full h-10 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-500 rounded-lg flex items-center justify-center gap-2 text-xs font-semibold disabled:opacity-50"
                  >
                    <CheckCheck className="h-4 w-4" />
                    {loadingAction === `work-complete-${quote.id}` ? 'Updating...' : 'Mark Work Complete'}
                  </button>
                )}

                {/* Resend + Accept/Reject for sent quotes awaiting response */}
                {canResend(quote) && (
                  <div className="space-y-2">
                    {/* Prominent Resend Button */}
                    <QuoteSendDropdown
                      quote={quote}
                      onSuccess={() => handleStatusUpdate(quote.id, 'sent')}
                      disabled={!quote.client?.email}
                      variant="resend"
                    />

                    {/* Accept/Reject if you have response from client */}
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleActionClick(quote, 'accept')}
                        disabled={loadingAction === `action-${quote.id}`}
                        className="flex-1 h-10 bg-green-500/10 hover:bg-green-500/20 border border-green-500/30 text-green-500 rounded-lg flex items-center justify-center gap-1.5 text-xs font-medium disabled:opacity-50 touch-manipulation"
                      >
                        <Check className="h-3.5 w-3.5" />
                        Accept
                      </button>
                      <button
                        onClick={() => handleActionClick(quote, 'reject')}
                        disabled={loadingAction === `action-${quote.id}`}
                        className="flex-1 h-10 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-500 rounded-lg flex items-center justify-center gap-1.5 text-xs font-medium disabled:opacity-50 touch-manipulation"
                      >
                        <X className="h-3.5 w-3.5" />
                        Reject
                      </button>
                    </div>
                  </div>
                )}

                {canRaiseInvoice(quote) && (
                  <button
                    onClick={() => onInvoiceAction(quote)}
                    disabled={loadingAction === `invoice-${quote.id}`}
                    className="w-full h-11 bg-elec-yellow hover:bg-elec-yellow/90 text-elec-dark rounded-lg flex items-center justify-center gap-2 text-sm font-bold disabled:opacity-50"
                  >
                    <Receipt className="h-4 w-4" />
                    {loadingAction === `invoice-${quote.id}` ? 'Creating...' : 'Raise Invoice'}
                  </button>
                )}
              </div>
          </div>
        </div>
      )})}
    </div>
  );
};

export default QuoteCardView;
