import { Trash2, Check, Pencil, MoreVertical, Download, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { differenceInDays } from 'date-fns';
import { isInvoiceOverdue, getInvoiceDaysOverdue, getInvoiceOutstanding } from '@/utils/invoice-status';
import { formatCardAmount, formatCardAge } from '@/lib/format';
import { PANEL } from '@/components/electrician/shared/surfaces';
import type { Quote } from '@/types/quote';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface InvoiceCardProps {
  invoice: Quote;
  onTap: () => void;
  onMarkPaid: () => void;
  onDownloadPDF: () => void;
  onEdit: () => void;
  onDelete: () => void;
  isMarkingPaid?: boolean;
  isDownloading?: boolean;
  isDeleting?: boolean;
}

export function InvoiceCard({
  invoice,
  onTap,
  onMarkPaid,
  onDownloadPDF,
  onEdit,
  onDelete,
  isMarkingPaid,
  isDownloading,
  isDeleting,
}: InvoiceCardProps) {
  const isPaid = invoice.invoice_status === 'paid';
  const isDraft = invoice.invoice_status === 'draft' || !invoice.invoice_status;
  const overdue = isInvoiceOverdue(invoice);
  const totalPaid = invoice.total_paid || 0;
  const isPartPaid = !isPaid && totalPaid > 0.005;
  const outstanding = getInvoiceOutstanding(invoice);

  const paidLateDays =
    isPaid && invoice.invoice_paid_at && invoice.invoice_due_date
      ? Math.max(
          0,
          differenceInDays(new Date(invoice.invoice_paid_at), new Date(invoice.invoice_due_date))
        )
      : 0;

  const daysOverdue = getInvoiceDaysOverdue(invoice);

  const daysToDue =
    !isPaid && !overdue && invoice.invoice_due_date
      ? differenceInDays(new Date(invoice.invoice_due_date), new Date())
      : null;

  const status = isPaid
    ? { label: 'Paid', dot: 'bg-emerald-400', text: 'text-emerald-400', wash: 'from-emerald-500/[0.08]' }
    : overdue
      ? { label: 'Overdue', dot: 'bg-red-400', text: 'text-red-400', wash: 'from-red-500/[0.08]' }
      : isDraft
        ? { label: 'Draft', dot: 'bg-white/75', text: 'text-white/85', wash: 'from-white/[0.05]' }
        : { label: 'Sent', dot: 'bg-blue-400', text: 'text-blue-400', wash: 'from-blue-500/[0.08]' };

  // One cue per card — most urgent first
  const cue = overdue
    ? { text: `Overdue ${daysOverdue}d — chase it`, cls: 'text-red-400' }
    : isPartPaid
      ? { text: `${formatCardAmount(outstanding)} still owed`, cls: 'text-amber-400' }
      : daysToDue !== null && daysToDue <= 7 && daysToDue >= 0
        ? { text: daysToDue === 0 ? 'Due today' : `Due in ${daysToDue}d`, cls: 'text-orange-400' }
        : isPaid && paidLateDays > 0
          ? { text: `Paid ${paidLateDays}d late`, cls: 'text-white/55' }
          : isDraft
            ? { text: 'Not sent yet', cls: 'text-white/55' }
            : null;

  const busy = isMarkingPaid || isDownloading || isDeleting;

  return (
    <div
      className={cn(
        PANEL,
        'relative h-full overflow-hidden',
        isDeleting && 'opacity-50'
      )}
    >
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
        className="relative block w-full h-full text-left p-3.5 pb-3 touch-manipulation select-none active:scale-[0.98] transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-elec-yellow/50 rounded-2xl"
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
          {isPartPaid && (
            <span className="text-[10px] font-semibold text-amber-400">Part-paid</span>
          )}
          {invoice.external_invoice_provider && (
            <span className="text-[10px] font-semibold text-white/45 capitalize">
              · {invoice.external_invoice_provider}
            </span>
          )}
        </div>

        {/* Client + job */}
        <h3 className="mt-2.5 text-[15px] font-semibold text-white leading-tight truncate">
          {invoice.client?.name || 'No client'}
        </h3>
        <p className="mt-0.5 text-[11px] text-white/75 leading-tight truncate min-h-[15px]">
          {invoice.jobDetails?.title || invoice.invoice_number || ' '}
        </p>

        {/* Amount — outstanding when part-paid, total otherwise */}
        <p className="mt-2.5 text-[22px] font-bold text-elec-yellow tabular-nums leading-none tracking-tight">
          {formatCardAmount(isPartPaid ? outstanding : invoice.total || 0)}
        </p>
        {isPartPaid && (
          <p className="text-[10px] text-white/50 tabular-nums mt-0.5">
            of {formatCardAmount(invoice.total || 0)} · {formatCardAmount(totalPaid)} received
          </p>
        )}

        {/* Footer — cue + age */}
        <div className="mt-3 pt-2 border-t border-white/[0.08] flex items-center justify-between gap-2">
          {cue ? (
            <span className={cn('text-[10px] font-semibold truncate', cue.cls)}>{cue.text}</span>
          ) : (
            <span className="text-[10px] text-white/45 font-mono truncate">
              {invoice.invoice_number || ''}
            </span>
          )}
          <span className="text-[10px] text-white/65 tabular-nums flex-shrink-0">
            {formatCardAge(invoice.invoice_date || invoice.createdAt)}
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
              aria-label="Invoice actions"
              disabled={busy}
              className="h-11 w-11 flex items-center justify-center rounded-xl text-white/65 hover:text-white hover:bg-white/[0.06] active:scale-[0.95] transition-all touch-manipulation disabled:opacity-50"
            >
              {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <MoreVertical className="h-4 w-4" />}
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="z-[100] min-w-[170px] bg-elec-gray border-white/10"
          >
            {!isPaid && (
              <DropdownMenuItem
                onClick={onMarkPaid}
                className="h-11 text-[14px] text-emerald-400 touch-manipulation focus:bg-emerald-500/10 focus:text-emerald-400"
              >
                <Check className="h-4 w-4 mr-2" />
                Mark as paid
              </DropdownMenuItem>
            )}
            <DropdownMenuItem
              onClick={onDownloadPDF}
              className="h-11 text-[14px] text-white touch-manipulation focus:bg-white/[0.06] focus:text-white"
            >
              <Download className="h-4 w-4 mr-2 text-white/60" />
              Download PDF
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={onEdit}
              className="h-11 text-[14px] text-white touch-manipulation focus:bg-white/[0.06] focus:text-white"
            >
              <Pencil className="h-4 w-4 mr-2 text-white/60" />
              Edit
            </DropdownMenuItem>
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
