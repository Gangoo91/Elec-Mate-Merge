import { format, parseISO } from 'date-fns';
import { AlertCircle, Clock, ChevronRight, PoundSterling } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { OverdueInvoice, ExpiringQuote } from '@/hooks/useFinanceAlerts';

interface OverdueInvoiceCardProps {
  invoice: OverdueInvoice;
  onNavigate?: () => void;
}

interface ExpiringQuoteCardProps {
  quote: ExpiringQuote;
  onNavigate?: () => void;
}

function formatGbp(amount: number): string {
  return new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(amount);
}

export function OverdueInvoiceCard({ invoice, onNavigate }: OverdueInvoiceCardProps) {
  const isVeryOverdue = invoice.daysOverdue > 30;

  return (
    <button
      onClick={onNavigate}
      className={cn(
        'w-full text-left rounded-2xl border p-4 transition-all active:scale-[0.98]',
        isVeryOverdue ? 'border-red-500/40 bg-red-500/10' : 'border-orange-500/40 bg-orange-500/10'
      )}
    >
      {isVeryOverdue && (
        <div className="text-xs font-semibold px-3 py-1 rounded-t-xl -mx-4 -mt-4 mb-3 text-center bg-red-500/30 text-red-300 animate-pulse">
          ⚠️ Seriously overdue — chase this now
        </div>
      )}

      <div className="flex items-start gap-3">
        <div
          className={cn(
            'w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0',
            isVeryOverdue ? 'bg-red-500/20 text-red-400' : 'bg-orange-500/20 text-orange-400'
          )}
        >
          <AlertCircle className="w-5 h-5" />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <span className="text-sm font-semibold text-foreground truncate">
              {invoice.clientName}
            </span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-muted/40 text-muted-foreground">
              {invoice.quoteNumber}
            </span>
          </div>
          <p className="text-xs text-muted-foreground">
            Due {format(parseISO(invoice.invoiceDueDate), 'dd MMM yyyy')}
          </p>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          <div className="text-right">
            <p
              className={cn(
                'text-sm font-bold',
                isVeryOverdue ? 'text-red-400' : 'text-orange-400'
              )}
            >
              {formatGbp(invoice.total)}
            </p>
            <p
              className={cn(
                'text-xs font-medium',
                isVeryOverdue ? 'text-red-400/80' : 'text-orange-400/80'
              )}
            >
              {invoice.daysOverdue}d overdue
            </p>
          </div>
          <ChevronRight className="w-4 h-4 text-muted-foreground" />
        </div>
      </div>
    </button>
  );
}

export function ExpiringQuoteCard({ quote, onNavigate }: ExpiringQuoteCardProps) {
  const isExpiringSoon = quote.daysUntilExpiry <= 2;

  return (
    <button
      onClick={onNavigate}
      className={cn(
        'w-full text-left rounded-2xl border p-4 transition-all active:scale-[0.98]',
        isExpiringSoon
          ? 'border-orange-500/40 bg-orange-500/10'
          : 'border-amber-500/40 bg-amber-500/10'
      )}
    >
      <div className="flex items-start gap-3">
        <div
          className={cn(
            'w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0',
            isExpiringSoon ? 'bg-orange-500/20 text-orange-400' : 'bg-amber-500/20 text-amber-400'
          )}
        >
          <Clock className="w-5 h-5" />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <span className="text-sm font-semibold text-foreground truncate">
              {quote.clientName}
            </span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-muted/40 text-muted-foreground">
              {quote.quoteNumber}
            </span>
          </div>
          <p className="text-xs text-muted-foreground">
            Quote expires {format(parseISO(quote.expiryDate), 'dd MMM yyyy')} — no response yet
          </p>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          <div className="text-right">
            <p
              className={cn(
                'text-sm font-bold',
                isExpiringSoon ? 'text-orange-400' : 'text-amber-400'
              )}
            >
              {formatGbp(quote.total)}
            </p>
            <p
              className={cn(
                'text-xs font-medium',
                isExpiringSoon ? 'text-orange-400/80' : 'text-amber-400/80'
              )}
            >
              {quote.daysUntilExpiry === 0
                ? 'Expires today'
                : `${quote.daysUntilExpiry}d left`}
            </p>
          </div>
          <ChevronRight className="w-4 h-4 text-muted-foreground" />
        </div>
      </div>
    </button>
  );
}
