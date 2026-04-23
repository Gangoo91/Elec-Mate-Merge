import { SwipeableRow } from '@/components/ui/swipeable-row';
import { ChevronRight, Send } from 'lucide-react';
import { Pill, type Tone } from './editorial';
import { cn } from '@/lib/utils';
import { getQuotePriorityBadge } from '@/utils/financeSorting';
import type { Quote } from '@/services/financeService';

interface QuoteCardProps {
  quote: Quote;
  onView: (quote: Quote) => void;
  onSend: (id: string) => void;
  isSending?: boolean;
}

const statusToneMap: Record<string, Tone> = {
  Draft: 'amber',
  Sent: 'amber',
  Approved: 'emerald',
  'Client Accepted': 'emerald',
  'Client Declined': 'red',
  Rejected: 'red',
};

export function QuoteCard({ quote, onView, onSend, isSending: _isSending }: QuoteCardProps) {
  void _isSending;

  const lineItems = Array.isArray(quote.line_items) ? quote.line_items : [];
  const itemCount = lineItems.length;
  const priorityBadge = getQuotePriorityBadge(quote);
  const tone = statusToneMap[quote.status] ?? 'amber';

  const daysLeft = quote.valid_until
    ? Math.ceil((new Date(quote.valid_until).getTime() - Date.now()) / (1000 * 60 * 60 * 24))
    : null;
  const isExpired = daysLeft !== null && daysLeft < 0;
  const isExpiringSoon = daysLeft !== null && daysLeft >= 0 && daysLeft <= 7;

  const leftAction = {
    icon: <ChevronRight className="h-5 w-5" />,
    label: 'View',
    onClick: () => onView(quote),
  };

  const rightAction =
    quote.status === 'Draft'
      ? {
          icon: <Send className="h-5 w-5" />,
          label: 'Send',
          onClick: () => onSend(quote.id),
          variant: 'success' as const,
        }
      : undefined;

  const formattedValue = Number(quote.value).toLocaleString('en-GB', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const showPriority =
    priorityBadge &&
    (priorityBadge.variant === 'destructive' || priorityBadge.variant === 'warning');

  const expiryTone: Tone = isExpired ? 'red' : isExpiringSoon ? 'amber' : 'cyan';

  return (
    <SwipeableRow leftAction={leftAction} rightAction={rightAction}>
      <button
        type="button"
        onClick={() => onView(quote)}
        className={cn(
          'group block w-full text-left bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl overflow-hidden touch-manipulation',
          'hover:bg-[hsl(0_0%_15%)] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-elec-yellow/60'
        )}
      >
        {showPriority && (
          <div className="px-5 py-2.5 border-b border-white/[0.06] flex items-center gap-2">
            <Pill tone={priorityBadge.variant === 'destructive' ? 'red' : 'amber'}>
              {priorityBadge.label}
            </Pill>
          </div>
        )}

        <div className="p-5 space-y-4">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-white">
                {quote.quote_number}
              </div>
              <h3 className="mt-1.5 text-[15px] font-medium text-white truncate leading-tight">
                {quote.client}
              </h3>
              {(quote.job_title || quote.description) && (
                <p className="mt-0.5 text-[12px] text-white truncate">
                  {quote.job_title || quote.description}
                </p>
              )}
            </div>
            <div className="text-right shrink-0">
              <Pill tone={tone}>{quote.status}</Pill>
              <div className="mt-2 text-[22px] font-semibold tabular-nums tracking-[-0.01em] text-elec-yellow leading-none">
                £{formattedValue}
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between gap-3 text-[11px] text-white">
            <div className="flex items-center gap-3 min-w-0">
              {itemCount > 0 && (
                <span className="tabular-nums">
                  <span className="font-medium text-white">{itemCount}</span>{' '}
                  {itemCount === 1 ? 'item' : 'items'}
                </span>
              )}
              {quote.sent_date && (
                <span className="tabular-nums truncate">
                  Sent{' '}
                  {new Date(quote.sent_date).toLocaleDateString('en-GB', {
                    day: 'numeric',
                    month: 'short',
                  })}
                </span>
              )}
              {quote.valid_until && (
                <Pill tone={expiryTone}>
                  {isExpired
                    ? 'Expired'
                    : isExpiringSoon
                      ? `${daysLeft}d left`
                      : new Date(quote.valid_until).toLocaleDateString('en-GB', {
                          day: 'numeric',
                          month: 'short',
                        })}
                </Pill>
              )}
            </div>
            <span
              aria-hidden
              className="text-[13px] font-medium text-elec-yellow/90 group-hover:text-elec-yellow transition-colors shrink-0"
            >
              View →
            </span>
          </div>
        </div>
      </button>
    </SwipeableRow>
  );
}
