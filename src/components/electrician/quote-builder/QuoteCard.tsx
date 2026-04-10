import { Trash2, Check, Pencil } from 'lucide-react';
import { cn } from '@/lib/utils';
import { SwipeableCard } from '@/components/ui/SwipeableCard';
import { format, differenceInDays, isPast } from 'date-fns';

interface QuoteCardQuote {
  id: string;
  quoteNumber?: string;
  client?: { name: string; email?: string };
  jobDetails?: { title?: string; description?: string };
  total: number;
  status: string;
  acceptance_status?: string;
  invoice_raised?: boolean;
  expiryDate?: string | Date;
  createdAt?: string | Date;
  updatedAt?: string | Date;
  first_sent_at?: string | Date;
  email_opened_at?: string | Date;
  email_open_count?: number;
  reminder_count?: number;
}

interface QuoteCardProps {
  quote: QuoteCardQuote;
  onTap: () => void;
  onDelete: () => void;
  onEdit: () => void;
  onAccept?: () => void;
}

function getStatusGradient(status: string, acceptanceStatus?: string, invoiced?: boolean): string {
  if (invoiced) return 'from-blue-500 via-blue-400 to-cyan-400';
  if (acceptanceStatus === 'accepted' || status === 'approved')
    return 'from-emerald-500 via-emerald-400 to-green-400';
  if (acceptanceStatus === 'rejected' || status === 'rejected')
    return 'from-red-500 via-rose-400 to-pink-400';
  if (status === 'sent' || status === 'pending')
    return 'from-amber-500 via-amber-400 to-yellow-400';
  return 'from-elec-yellow/40 via-elec-yellow/20 to-amber-400/10';
}

function getStatusBadge(
  status: string,
  acceptanceStatus?: string,
  invoiced?: boolean
): { label: string; style: string } {
  if (invoiced) return { label: 'INVOICED', style: 'bg-blue-500/15 text-blue-400' };
  if (acceptanceStatus === 'accepted' || status === 'approved')
    return { label: 'APPROVED', style: 'bg-emerald-500/15 text-emerald-400' };
  if (acceptanceStatus === 'rejected' || status === 'rejected')
    return { label: 'DECLINED', style: 'bg-red-500/15 text-red-400' };
  if (status === 'sent' || status === 'pending')
    return { label: 'SENT', style: 'bg-amber-500/15 text-amber-400' };
  return { label: 'DRAFT', style: 'bg-white/[0.08] text-white' };
}

function formatQuoteDate(date?: string | Date): string {
  if (!date) return '';
  try {
    return format(new Date(date), 'd MMM');
  } catch {
    return '';
  }
}

export function QuoteCard({ quote, onTap, onDelete, onEdit, onAccept }: QuoteCardProps) {
  const statusBadge = getStatusBadge(quote.status, quote.acceptance_status, quote.invoice_raised);
  const gradient = getStatusGradient(quote.status, quote.acceptance_status, quote.invoice_raised);

  const expiryDate = quote.expiryDate ? new Date(quote.expiryDate) : null;
  const daysUntilExpiry = expiryDate ? differenceInDays(expiryDate, new Date()) : null;
  const isExpired = expiryDate ? isPast(expiryDate) : false;
  const isExpiringSoon =
    daysUntilExpiry !== null && daysUntilExpiry >= 0 && daysUntilExpiry <= 7 && !isExpired;

  const canAccept =
    (quote.status === 'sent' || quote.status === 'pending') &&
    quote.acceptance_status !== 'accepted' &&
    !quote.invoice_raised;

  const cardContent = (
    <button
      type="button"
      onClick={onTap}
      className="block w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-elec-yellow/50 rounded-2xl touch-manipulation cursor-pointer"
    >
      <div className="group relative overflow-hidden active:scale-[0.98] transition-all duration-200 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
        {/* Gradient accent */}
        <div className={cn('absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r', gradient)} />

        <div className="relative z-10 p-4">
          {/* Row 1: Client name + Amount */}
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <h3 className="text-[15px] font-semibold text-white leading-tight truncate">
                {quote.client?.name || 'No client'}
              </h3>
              {quote.jobDetails?.title && (
                <p className="mt-0.5 text-[12px] text-white leading-tight truncate">
                  {quote.jobDetails.title}
                </p>
              )}
            </div>
            <p className="text-[20px] font-bold text-elec-yellow flex-shrink-0 tabular-nums leading-none">
              £{quote.total?.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
          </div>

          {/* Row 2: Badges */}
          <div className="flex items-center gap-1.5 mt-2.5 flex-wrap">
            <span className={cn('text-[10px] font-bold px-2 py-0.5 rounded', statusBadge.style)}>
              {statusBadge.label}
            </span>
            {quote.quoteNumber && (
              <span className="font-mono text-[10px] text-white px-1.5 py-0.5 rounded bg-white/[0.04]">
                {quote.quoteNumber}
              </span>
            )}
            {(quote.email_open_count ?? 0) > 0 && (
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-500/15 text-blue-400">
                Viewed{(quote.email_open_count ?? 0) > 1 ? ` ${quote.email_open_count}×` : ''}
              </span>
            )}
            {(quote.reminder_count ?? 0) > 0 && (
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-purple-500/15 text-purple-400">
                {quote.reminder_count} Reminder{quote.reminder_count !== 1 ? 's' : ''}
              </span>
            )}
            {isExpiringSoon && (
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-orange-500/15 text-orange-400">
                {daysUntilExpiry === 0 ? 'Expires Today' : `${daysUntilExpiry}d Left`}
              </span>
            )}
            {isExpired && quote.status !== 'approved' && !quote.invoice_raised && (
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-red-500/15 text-red-400">
                Expired
              </span>
            )}
            <span className="text-[11px] text-white ml-auto flex-shrink-0">
              {formatQuoteDate(quote.updatedAt || quote.createdAt)}
            </span>
          </div>
        </div>
      </div>
    </button>
  );

  return (
    <SwipeableCard
      leftAction={{
        icon: <Trash2 className="w-5 h-5" />,
        bgColor: 'bg-red-500',
        onAction: onDelete,
        label: 'Delete quote',
      }}
      rightAction={
        canAccept && onAccept
          ? {
              icon: <Check className="w-5 h-5" />,
              bgColor: 'bg-emerald-500',
              onAction: onAccept,
              label: 'Accept quote',
            }
          : {
              icon: <Pencil className="w-5 h-5" />,
              bgColor: 'bg-elec-yellow',
              textColor: 'text-black',
              onAction: onEdit,
              label: 'Edit quote',
            }
      }
    >
      {cardContent}
    </SwipeableCard>
  );
}
