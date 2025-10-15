import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Download, Eye, Calendar, Check, X, Receipt, User, ArrowRight } from 'lucide-react';
import { Quote } from '@/types/quote';
import { format } from 'date-fns';
import { QuoteSendDropdown } from '@/components/electrician/quote-builder/QuoteSendDropdown';

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
}) => {
  return (
    <div className="lg:hidden space-y-4">
      {quotes.map((quote) => (
        <div
          key={quote.id}
          className="p-4 rounded-lg border border-elec-yellow/20 bg-card/50 hover:bg-card transition-colors space-y-3"
        >
          {/* Header */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Badge variant="outline" className="text-xs">
                Quote #{quote.quoteNumber}
              </Badge>
              {hasInvoiceRaised(quote) && (
                <>
                  <ArrowRight className="h-3 w-3" />
                  <Badge variant="default" className="text-xs bg-blue-600/20 text-blue-300 border-blue-600/30">
                    <Receipt className="h-3 w-3 mr-1" />
                    Invoice Raised
                  </Badge>
                </>
              )}
            </div>
            
            <div className="flex items-start justify-between gap-3">
              {getAcceptanceStatusBadge(quote)}
              <span className="text-lg font-bold text-elec-yellow shrink-0">
                {formatCurrency(quote.total)}
              </span>
            </div>
          </div>

          {/* Client Info */}
          <div className="flex items-center gap-2 text-sm">
            <User className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium truncate">{quote.client.name}</span>
          </div>

          {/* Meta Info */}
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" />
              <span>{format(new Date(quote.createdAt), "dd MMM yyyy")}</span>
            </div>
            <span className="text-border">•</span>
            <div className="flex items-center gap-1.5">
              <span>{quote.items.length} item{quote.items.length !== 1 ? 's' : ''}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleRegeneratePDF(quote)}
              disabled={loadingAction === `pdf-${quote.id}`}
              className="flex-1 text-xs border border-elec-yellow/20 hover:bg-elec-yellow/10"
            >
              <Download className="h-3 w-3 mr-1" />
              {loadingAction === `pdf-${quote.id}` ? 'Downloading...' : 'Download'}
            </Button>
            <Button
              variant="default"
              size="sm"
              onClick={() => onNavigate(`/electrician/quote-builder/${quote.id}`)}
              className="flex-1 text-xs bg-elec-yellow hover:bg-elec-yellow/90 text-black border-0"
            >
              <Eye className="h-3 w-3 mr-1" />
              View Quote
            </Button>
          </div>

          {/* Send Button - Full Width */}
          <QuoteSendDropdown 
            quote={quote}
            onSuccess={() => handleStatusUpdate(quote.id, 'sent')}
            disabled={!quote.client?.email}
          />

          {/* Accept/Reject Actions - Only for 'sent' quotes */}
          {quote.status === 'sent' && quote.acceptance_status !== 'accepted' && quote.acceptance_status !== 'rejected' && (
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleActionClick(quote, 'accept')}
                disabled={loadingAction === `action-${quote.id}`}
                className="flex-1 text-xs border-green-600/30 text-green-400 hover:bg-green-600/10"
              >
                <Check className="h-3 w-3 mr-1" />
                {loadingAction === `action-${quote.id}` ? 'Processing...' : 'Accept Quote'}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleActionClick(quote, 'reject')}
                disabled={loadingAction === `action-${quote.id}`}
                className="flex-1 text-xs border-red-600/30 text-red-400 hover:bg-red-600/10"
              >
                <X className="h-3 w-3 mr-1" />
                Reject
              </Button>
            </div>
          )}

          {/* Send to Invoice - Only for ACCEPTED quotes */}
          {canRaiseInvoice(quote) && (
            <div className="pt-2 border-t border-elec-yellow/10">
              <Button
                variant="default"
                size="sm"
                onClick={() => onInvoiceAction(quote)}
                disabled={loadingAction === `invoice-${quote.id}`}
                className="w-full text-xs bg-gradient-to-r from-elec-yellow to-yellow-400 text-black font-semibold hover:from-elec-yellow/90 hover:to-yellow-400/90"
              >
                <Receipt className="h-3 w-3 mr-1" />
                {loadingAction === `invoice-${quote.id}` ? 'Creating Invoice...' : 'Send to Invoice'}
              </Button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default QuoteCardView;
