import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Download, Eye, Calendar, Check, X, Receipt, User, ArrowRight, CheckCheck, Trash2 } from 'lucide-react';
import { Quote } from '@/types/quote';
import { format } from 'date-fns';
import { QuoteSendDropdown } from '@/components/electrician/quote-builder/QuoteSendDropdown';
import { Card, CardContent } from '@/components/ui/card';

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
        label: '🧾 Invoiced',
        icon: Receipt
      };
    }

    // Work complete + Accepted = Ready to invoice
    if (isWorkComplete(quote) && quote.acceptance_status === 'accepted') {
      return {
        color: 'bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300 animate-pulse',
        label: '✅ Ready to Invoice',
        icon: CheckCheck
      };
    }

    // Accepted + Work pending = In progress
    if (quote.acceptance_status === 'accepted' && !isWorkComplete(quote)) {
      return {
        color: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300',
        label: '🟢 Approved - Work Pending',
        icon: Check
      };
    }

    // Sent + Awaiting response
    if (quote.status === 'sent' && quote.acceptance_status !== 'accepted' && quote.acceptance_status !== 'rejected') {
      return {
        color: 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300',
        label: '🔵 Sent - Awaiting Client',
        icon: ArrowRight
      };
    }

    // Rejected
    if (quote.acceptance_status === 'rejected') {
      return {
        color: 'bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300',
        label: '🔴 Declined',
        icon: X
      };
    }

    // Draft
    if (quote.status === 'draft') {
      return {
        color: 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300',
        label: '🟡 Ready to Send to Client',
        icon: ArrowRight
      };
    }

    // Default
    return {
      color: 'bg-slate-100 text-slate-700 dark:bg-slate-950 dark:text-slate-300',
      label: quote.status,
      icon: Eye
    };
  };

  return (
    <div className="lg:hidden space-y-4">
      {quotes.map((quote) => {
        const statusInfo = getStatusInfo(quote);
        const StatusIcon = statusInfo.icon;
        
        return (
          <div
            key={quote.id}
            id={`quote-${quote.id}`}
            className={`relative bg-elec-card rounded-2xl overflow-hidden hover:shadow-2xl transition-all border ${
              quote.acceptance_status === 'accepted' 
                ? 'border-green-500/30 border-l-4 border-l-green-500/60' 
                : quote.acceptance_status === 'rejected'
                  ? 'border-red-500/30 border-l-4 border-l-red-500/60'
                  : 'border-primary/20 border-l-4 border-l-primary/60'
            }`}
          >
            {/* Content Container */}
            <div className="relative p-3">
              {/* Top Row: Quote Number & Enhanced Status Badge */}
              <div className="flex items-start justify-between mb-3 pb-2 border-b border-primary/20">
                <div className="flex flex-col gap-2 w-full">
                  <div className="flex items-center gap-2">
                    <h3 className="text-base sm:text-lg font-bold text-foreground">
                      #{quote.quoteNumber}
                    </h3>
                    <Badge className={`text-xs ${statusInfo.color} border-0 flex items-center gap-1`}>
                      <StatusIcon className="h-3 w-3" />
                      {statusInfo.label}
                    </Badge>
                  </div>
                  
                  {/* Show acceptance details for accepted quotes */}
                  {quote.acceptance_status === 'accepted' && quote.accepted_by_name && (
                    <div className="text-xs text-muted-foreground">
                      ✍️ Signed by {quote.accepted_by_name}
                      {quote.accepted_at && ` on ${format(new Date(quote.accepted_at), 'dd MMM yyyy')}`}
                    </div>
                  )}
                  
                  {hasInvoiceRaised(quote) && onViewInvoice && (
                    <button
                      onClick={() => onViewInvoice(quote)}
                      className="text-xs bg-blue-600/20 text-blue-300 border border-blue-600/30 hover:bg-blue-600/30 px-2 py-1 rounded-full w-fit flex items-center gap-1 transition-colors"
                    >
                      <Receipt className="h-3 w-3" />
                      View Invoice #{quote.invoice_number}
                    </button>
                  )}
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onNavigate(`/electrician/quote-builder/${quote.id}`)}
                  className="h-7 w-7 sm:h-8 sm:w-8 text-muted-foreground hover:text-foreground flex-shrink-0"
                  aria-label="View quote"
                >
                  <Eye className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                </Button>
              </div>

            {/* Middle Row: Client Info (left) | Date & Items (right) */}
            <div className="flex items-start justify-between mb-4 gap-3">
              {/* Left: Client Icon + Info */}
              <div className="flex items-center gap-1.5 sm:gap-2 flex-1 min-w-0">
                <div className="w-10 h-10 flex items-center justify-center flex-shrink-0 p-0">
                  <User className="h-10 w-10 sm:h-14 sm:w-14 text-muted-foreground/40" strokeWidth={1.5} />
                </div>
                <div className="min-w-0 flex-1 text-left">
                  <div className="text-xs sm:text-sm text-muted-foreground mb-0.5">Client</div>
                  <div className="text-sm sm:text-base text-foreground font-medium truncate">
                    {quote.client.name}
                  </div>
                </div>
              </div>
              
              {/* Right: Dates */}
              <div className="text-right space-y-2 flex-shrink-0">
                <div>
                  <div className="text-xs text-muted-foreground mb-0.5">Created</div>
                  <div className="text-xs sm:text-sm text-foreground font-medium">
                    {format(new Date(quote.createdAt), "dd MMM yyyy")}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground mb-0.5">Items</div>
                  <div className="text-xs sm:text-sm text-foreground font-semibold">
                    {quote.items.length} item{quote.items.length !== 1 ? 's' : ''}
                  </div>
                </div>
              </div>
            </div>

            {/* Total Amount - Centered and Prominent */}
            <div className="text-center mb-4 py-3 bg-background/40 rounded-lg border border-primary/10">
              <div className="text-xs sm:text-sm text-muted-foreground mb-1 font-normal">Total Amount</div>
              <div className="text-2xl sm:text-3xl font-bold text-primary">
                {formatCurrency(quote.total)}
              </div>
            </div>

            {/* Bottom Action Bar - Grid Layout */}
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => handleRegeneratePDF(quote)}
                disabled={loadingAction === `pdf-${quote.id}`}
                className="bg-background/40 hover:bg-background/60 border border-primary/20 text-foreground py-2.5 sm:py-3 rounded-lg flex items-center justify-center gap-1.5 sm:gap-2 transition-colors disabled:opacity-50 touch-manipulation"
              >
                <Download className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                <span className="text-xs sm:text-sm font-medium">
                  {loadingAction === `pdf-${quote.id}` ? 'Loading' : 'PDF'}
                </span>
              </button>

              <button
                onClick={() => onNavigate(`/electrician/quotes/view/${quote.id}`)}
                className="bg-background/40 hover:bg-background/60 border border-primary/20 text-foreground py-2.5 sm:py-3 rounded-lg flex items-center justify-center gap-1.5 sm:gap-2 transition-colors touch-manipulation"
              >
                <Eye className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                <span className="text-xs sm:text-sm font-medium">View</span>
              </button>

              <button
                onClick={() => onDeleteQuote(quote)}
                className="bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-600 py-2.5 sm:py-3 rounded-lg flex items-center justify-center gap-1.5 sm:gap-2 transition-colors touch-manipulation"
              >
                <Trash2 className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                <span className="text-xs sm:text-sm font-medium">Delete</span>
              </button>

              {/* Show QuoteSendDropdown as a grid button */}
              <div className="col-span-2">
                <QuoteSendDropdown 
                  quote={quote}
                  onSuccess={() => handleStatusUpdate(quote.id, 'sent')}
                  disabled={!quote.client?.email}
                />
              </div>

              {/* Accept/Reject Actions - Only for 'sent' quotes */}
              {quote.status === 'sent' && quote.acceptance_status !== 'accepted' && quote.acceptance_status !== 'rejected' && (
                <>
                  <button
                    onClick={() => handleActionClick(quote, 'accept')}
                    disabled={loadingAction === `action-${quote.id}`}
                    className="bg-green-500/10 hover:bg-green-500/20 border border-green-500/30 text-green-600 py-2.5 sm:py-3 rounded-lg flex items-center justify-center gap-1.5 sm:gap-2 transition-colors disabled:opacity-50 touch-manipulation"
                  >
                    <Check className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    <span className="text-xs sm:text-sm font-medium">Accept</span>
                  </button>

                  <button
                    onClick={() => handleActionClick(quote, 'reject')}
                    disabled={loadingAction === `action-${quote.id}`}
                    className="bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-600 py-2.5 sm:py-3 rounded-lg flex items-center justify-center gap-1.5 sm:gap-2 transition-colors disabled:opacity-50 touch-manipulation"
                  >
                    <X className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    <span className="text-xs sm:text-sm font-medium">Reject</span>
                  </button>
                </>
              )}

              {/* Quick "Mark Work Complete" button for approved quotes */}
              {quote.acceptance_status === 'accepted' && !isWorkComplete(quote) && !hasInvoiceRaised(quote) && onMarkWorkComplete && (
                <button
                  onClick={() => onMarkWorkComplete(quote)}
                  disabled={loadingAction === `work-complete-${quote.id}`}
                  className="col-span-2 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-600 py-2.5 sm:py-3 rounded-lg flex items-center justify-center gap-1.5 sm:gap-2 transition-colors disabled:opacity-50 touch-manipulation font-semibold"
                >
                  <CheckCheck className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  <span className="text-xs sm:text-sm">
                    {loadingAction === `work-complete-${quote.id}` ? 'Updating...' : 'Mark Work Complete'}
                  </span>
                </button>
              )}

              {/* Send to Invoice - Only for work complete + accepted quotes */}
              {canRaiseInvoice(quote) && (
                <button
                  onClick={() => onInvoiceAction(quote)}
                  disabled={loadingAction === `invoice-${quote.id}`}
                  className="col-span-2 bg-gradient-to-r from-elec-yellow to-yellow-400 hover:from-elec-yellow/90 hover:to-yellow-400/90 text-black py-2.5 sm:py-3 rounded-lg flex items-center justify-center gap-1.5 sm:gap-2 transition-colors disabled:opacity-50 touch-manipulation font-semibold"
                >
                  <Receipt className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  <span className="text-xs sm:text-sm">
                    {loadingAction === `invoice-${quote.id}` ? 'Creating...' : 'Raise Invoice'}
                  </span>
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
