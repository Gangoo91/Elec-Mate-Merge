import { Trash2, Check, Pencil, MoreVertical, Eye, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { isQuoteWon, isQuoteLost, isQuoteInvoiced } from '@/utils/quote-status';
import { format, differenceInDays, isPast } from 'date-fns';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface QuoteCardQuote {
  id: string;
  quoteNumber?: string;
  client?: { name: string; email?: string; address?: string; postcode?: string };
  jobDetails?: { title?: string; description?: string };
  total: number;
  status: string;
  acceptance_status?: string;
  invoice_raised?: boolean;
  version_number?: number;
  expiryDate?: string | Date;
  createdAt?: string | Date;
  updatedAt?: string | Date;
  first_sent_at?: string | Date;
  email_opened_at?: string | Date;
  email_open_count?: number;
  reminder_count?: number;
  items?: unknown[];
}

interface QuoteCardProps {
  quote: QuoteCardQuote;
  onTap: () => void;
  onDelete: () => void;
  onEdit: () => void;
  onAccept?: () => void;
}

function formatAge(date?: string | Date): string {
  if (!date) return '';
  try {
    const d = new Date(date);
    const days = differenceInDays(new Date(), d);
    if (days <= 0) return 'Today';
    if (days === 1) return '1d ago';
    if (days <= 30) return `${days}d ago`;
    return format(d, 'd MMM');
  } catch {
    return '';
  }
}

function formatAmount(value: number): string {
  const hasPence = Math.round((value || 0) * 100) % 100 !== 0;
  return `£${(value || 0).toLocaleString('en-GB', {
    minimumFractionDigits: hasPence ? 2 : 0,
    maximumFractionDigits: hasPence ? 2 : 0,
  })}`;
}

export function QuoteCard({ quote, onTap, onDelete, onEdit, onAccept }: QuoteCardProps) {
  const isWon = isQuoteWon(quote);
  const isLost = isQuoteLost(quote);
  const isInvoiced = isQuoteInvoiced(quote);
  const isSent = quote.status === 'sent' || quote.status === 'pending';
  const isSettled = isWon || isLost || isInvoiced;

  const status = isInvoiced
    ? { label: 'Invoiced', dot: 'bg-blue-400', text: 'text-blue-400', wash: 'from-blue-500/[0.08]' }
    : isWon
      ? { label: 'Won', dot: 'bg-emerald-400', text: 'text-emerald-400', wash: 'from-emerald-500/[0.08]' }
      : isLost
        ? { label: 'Declined', dot: 'bg-red-400', text: 'text-red-400', wash: 'from-red-500/[0.07]' }
        : isSent
          ? { label: 'Sent', dot: 'bg-amber-400', text: 'text-amber-400', wash: 'from-amber-500/[0.08]' }
          : quote.status === 'superseded'
            ? { label: 'Superseded', dot: 'bg-white/50', text: 'text-white/70', wash: 'from-white/[0.04]' }
            : { label: 'Draft', dot: 'bg-white/75', text: 'text-white/85', wash: 'from-white/[0.05]' };

  const expiryDate = quote.expiryDate ? new Date(quote.expiryDate) : null;
  const daysUntilExpiry = expiryDate ? differenceInDays(expiryDate, new Date()) : null;
  const isExpired = expiryDate ? isPast(expiryDate) : false;
  const isExpiringSoon =
    daysUntilExpiry !== null && daysUntilExpiry >= 0 && daysUntilExpiry <= 7 && !isExpired;

  const openCount = quote.email_open_count ?? 0;

  // Next-step cue — one per card, most urgent first
  const cue = isExpired && !isSettled
    ? { text: 'Expired', cls: 'text-red-400', icon: null }
    : isExpiringSoon && !isSettled
      ? {
          text: daysUntilExpiry === 0 ? 'Expires today' : `Expires in ${daysUntilExpiry}d`,
          cls: 'text-orange-400',
          icon: null,
        }
      : isWon && !isInvoiced
        ? { text: 'Ready to invoice', cls: 'text-emerald-400', icon: 'arrow' as const }
        : isSent && openCount > 0
          ? {
              text: openCount > 1 ? `Viewed ${openCount}×` : 'Viewed',
              cls: 'text-blue-400',
              icon: 'eye' as const,
            }
          : isSent
            ? { text: 'Not opened yet', cls: 'text-white/55', icon: null }
            : !isSettled && quote.status === 'draft'
              ? { text: 'Not sent yet', cls: 'text-white/55', icon: null }
              : null;

  const canAccept = isSent && !isWon && !isInvoiced;

  return (
    <div className="relative h-full rounded-2xl border border-white/[0.10] bg-gradient-to-b from-white/[0.07] to-white/[0.03] shadow-[0_8px_24px_rgba(0,0,0,0.35)] overflow-hidden">
      {/* Status wash */}
      <div
        className={cn(
          'absolute inset-x-0 top-0 h-16 bg-gradient-to-b to-transparent pointer-events-none',
          status.wash
        )}
      />

      <button
        type="button"
        onClick={onTap}
        className="relative block w-full h-full text-left p-3.5 pb-3 touch-manipulation active:scale-[0.98] transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-elec-yellow/50 rounded-2xl"
      >
        {/* Status */}
        <div className="flex items-center gap-1.5 pr-9">
          <span className={cn('h-1.5 w-1.5 rounded-full flex-shrink-0', status.dot)} />
          <span
            className={cn(
              'text-[10px] font-semibold uppercase tracking-[0.08em] truncate',
              status.text
            )}
          >
            {status.label}
          </span>
          {(quote.version_number ?? 1) > 1 && (
            <span className="text-[10px] font-semibold text-white/65 tabular-nums">
              v{quote.version_number}
            </span>
          )}
        </div>

        {/* Client + job */}
        <h3 className="mt-2.5 text-[15px] font-semibold text-white leading-tight truncate">
          {quote.client?.name || 'No client'}
        </h3>
        <p className="mt-0.5 text-[11px] text-white/75 leading-tight truncate min-h-[15px]">
          {quote.jobDetails?.title || quote.quoteNumber || ' '}
        </p>

        {/* Amount */}
        <p className="mt-2.5 text-[22px] font-bold text-elec-yellow tabular-nums leading-none tracking-tight">
          {formatAmount(quote.total)}
        </p>

        {/* Footer — next step + age */}
        <div className="mt-3 pt-2 border-t border-white/[0.08] flex items-center justify-between gap-2">
          {cue ? (
            <span
              className={cn(
                'inline-flex items-center gap-1 text-[10px] font-semibold truncate',
                cue.cls
              )}
            >
              {cue.icon === 'eye' && <Eye className="h-3 w-3 flex-shrink-0" />}
              {cue.text}
              {cue.icon === 'arrow' && <ArrowRight className="h-3 w-3 flex-shrink-0" />}
            </span>
          ) : (
            <span className="text-[10px] text-white/45 font-mono truncate">
              {quote.quoteNumber || ''}
            </span>
          )}
          <span className="flex items-center gap-1.5 flex-shrink-0">
            {(quote.reminder_count ?? 0) > 0 && (
              <span className="text-[10px] font-semibold text-purple-400 tabular-nums">
                {quote.reminder_count}× chased
              </span>
            )}
            <span className="text-[10px] text-white/65 tabular-nums">
              {formatAge(quote.updatedAt || quote.createdAt)}
            </span>
          </span>
        </div>
      </button>

      {/* Actions menu */}
      <div className="absolute top-0.5 right-0.5 z-10">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              onClick={(e) => e.stopPropagation()}
              aria-label="Quote actions"
              className="h-11 w-11 flex items-center justify-center rounded-xl text-white/65 hover:text-white hover:bg-white/[0.06] active:scale-[0.95] transition-all touch-manipulation"
            >
              <MoreVertical className="h-4 w-4" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="z-[100] min-w-[160px] bg-elec-gray border-white/10"
          >
            <DropdownMenuItem
              onClick={onEdit}
              className="h-11 text-[14px] text-white touch-manipulation focus:bg-white/[0.06] focus:text-white"
            >
              <Pencil className="h-4 w-4 mr-2 text-white/60" />
              Edit
            </DropdownMenuItem>
            {canAccept && onAccept && (
              <DropdownMenuItem
                onClick={onAccept}
                className="h-11 text-[14px] text-emerald-400 touch-manipulation focus:bg-emerald-500/10 focus:text-emerald-400"
              >
                <Check className="h-4 w-4 mr-2" />
                Mark accepted
              </DropdownMenuItem>
            )}
            <DropdownMenuSeparator className="bg-white/[0.08]" />
            <DropdownMenuItem
              onClick={onDelete}
              className="h-11 text-[14px] text-red-400 touch-manipulation focus:bg-red-500/10 focus:text-red-400"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
