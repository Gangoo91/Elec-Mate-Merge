import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  Download,
  Eye,
  Calendar,
  Trash2,
  CheckCircle,
  AlertCircle,
  Send,
  Edit,
  CreditCard,
  PoundSterling,
  Clock,
  MoreHorizontal,
  FileText,
  User,
  Loader2,
  RefreshCw,
  Pencil,
} from 'lucide-react';
import { Quote } from '@/types/quote';
import { format, isPast, differenceInDays, addHours } from 'date-fns';
import { InvoiceSendDropdown } from '@/components/electrician/invoice-builder/InvoiceSendDropdown';
import { PaymentReminderButton } from '@/components/electrician/invoice-builder/PaymentReminderButton';
import { PartialPaymentDialog } from '@/components/electrician/invoice-builder/PartialPaymentDialog';
import { SwipeableCard } from '@/components/ui/SwipeableCard';
import { cn } from '@/lib/utils';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { useAccountingIntegrations } from '@/hooks/useAccountingIntegrations';
import { ACCOUNTING_PROVIDERS } from '@/types/accounting';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface InvoiceCardViewProps {
  invoices: Quote[];
  onInvoiceAction: (invoice: Quote) => void;
  onDownloadPDF: (invoice: Quote) => void;
  onMarkAsPaid: (invoice: Quote) => void;
  onSendSuccess: () => void;
  onDeleteInvoice: (invoiceId: string) => void;
  onShareWhatsApp?: (invoice: Quote) => void;
  onShareEmail?: (invoice: Quote) => void;
  markingPaidId: string | null;
  downloadingPdfId: string | null;
  deletingInvoiceId: string | null;
  formatCurrency: (amount: number) => string;
  stripeRefreshKey?: number;
}

const InvoiceCardView: React.FC<InvoiceCardViewProps> = ({
  invoices,
  onInvoiceAction,
  onDownloadPDF,
  onMarkAsPaid,
  onSendSuccess,
  onDeleteInvoice,
  markingPaidId,
  downloadingPdfId,
  deletingInvoiceId,
  formatCurrency,
  stripeRefreshKey = 0,
}) => {
  const navigate = useNavigate();
  const [partialPaymentInvoice, setPartialPaymentInvoice] = useState<Quote | null>(null);
  const [actionsSheetInvoice, setActionsSheetInvoice] = useState<Quote | null>(null);
  const [syncingInvoiceId, setSyncingInvoiceId] = useState<string | null>(null);

  // Accounting integration hook
  const {
    integrations: accountingIntegrations,
    hasConnectedProvider: hasAccountingConnected,
    syncInvoice,
  } = useAccountingIntegrations();

  // Get the connected accounting provider
  const connectedProvider = accountingIntegrations.find((i) => i.status === 'connected');

  // Handle sync to accounting
  const handleSyncToAccounting = async (invoiceId: string) => {
    try {
      setSyncingInvoiceId(invoiceId);
      await syncInvoice(invoiceId);
    } finally {
      setSyncingInvoiceId(null);
    }
  };

  const getOverdueInfo = (invoice: Quote) => {
    if (!invoice.invoice_due_date || invoice.invoice_status === 'paid') return null;
    const dueDate = new Date(invoice.invoice_due_date);
    const daysOverdue = differenceInDays(new Date(), dueDate);
    if (daysOverdue <= 1) return null; // 24h grace period
    return { daysOverdue };
  };

  const getStatusConfig = (invoice: Quote) => {
    const isOverdue =
      invoice.invoice_due_date &&
      isPast(addHours(new Date(invoice.invoice_due_date), 24)) &&
      invoice.invoice_status !== 'paid';
    const status = invoice.invoice_status;

    if (isOverdue || status === 'overdue') {
      return {
        bg: 'bg-red-500/15',
        border: 'border-red-500/30',
        text: 'text-red-400',
        label: 'Overdue',
        icon: AlertCircle,
        dot: 'bg-red-500',
      };
    }
    if (status === 'paid') {
      let paidLabel = 'Paid';
      if (invoice.invoice_paid_at && invoice.invoice_due_date) {
        const daysLate = differenceInDays(
          new Date(invoice.invoice_paid_at),
          new Date(invoice.invoice_due_date)
        );
        if (daysLate > 0) {
          paidLabel = `Paid ${daysLate}d late`;
          return {
            bg: 'bg-amber-500/15',
            border: 'border-amber-500/30',
            text: 'text-amber-400',
            label: paidLabel,
            icon: CheckCircle,
            dot: 'bg-amber-500',
          };
        }
      }
      return {
        bg: 'bg-emerald-500/15',
        border: 'border-emerald-500/30',
        text: 'text-emerald-400',
        label: paidLabel,
        icon: CheckCircle,
        dot: 'bg-emerald-500',
      };
    }
    if (status === 'sent') {
      return {
        bg: 'bg-blue-500/15',
        border: 'border-blue-500/30',
        text: 'text-blue-400',
        label: 'Sent',
        icon: Send,
        dot: 'bg-blue-500',
      };
    }
    return {
      bg: 'bg-white/10',
      border: 'border-white/20',
      text: 'text-white',
      label: 'Draft',
      icon: Edit,
      dot: 'bg-white/50',
    };
  };

  return (
    <div className="space-y-3">
      {invoices.map((invoice, index) => {
        const statusConfig = getStatusConfig(invoice);
        const StatusIcon = statusConfig.icon;
        const isOverdue =
          invoice.invoice_due_date &&
          isPast(addHours(new Date(invoice.invoice_due_date), 24)) &&
          invoice.invoice_status !== 'paid';
        const overdueInfo = getOverdueInfo(invoice);
        const isPaid = invoice.invoice_status === 'paid';
        const canMarkPaid =
          invoice.invoice_status === 'sent' || invoice.invoice_status === 'overdue' || isOverdue;
        const clientData = invoice.client;

        return (
          <div
            key={invoice.id}
            className="animate-fade-in"
            style={{ animationDelay: `${index * 30}ms` }}
          >
            <SwipeableCard
              leftAction={{
                icon: <Trash2 className="h-5 w-5" />,
                bgColor: 'bg-red-500',
                onAction: () => onDeleteInvoice(invoice.id),
                label: 'Delete',
              }}
              rightAction={
                canMarkPaid
                  ? {
                      icon: <CreditCard className="h-5 w-5" />,
                      bgColor: 'bg-emerald-500',
                      onAction: () => onMarkAsPaid(invoice),
                      label: 'Paid',
                    }
                  : undefined
              }
              disabled={isPaid}
            >
              <button
                onClick={() => onInvoiceAction(invoice)}
                className="block w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-elec-yellow/50 rounded-2xl touch-manipulation cursor-pointer"
              >
                <div className="group relative overflow-hidden card-surface-interactive active:scale-[0.98] transition-all duration-200 rounded-2xl">
                  {/* Gradient accent — status-coloured */}
                  <div className={cn(
                    'absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r opacity-40 group-hover:opacity-100 transition-opacity duration-200',
                    isPaid ? 'from-emerald-500 via-emerald-400 to-green-400'
                      : isOverdue ? 'from-red-500 via-rose-400 to-pink-400'
                      : statusConfig.label === 'Sent' ? 'from-blue-500 via-blue-400 to-cyan-400'
                      : 'from-slate-400 via-slate-300 to-gray-400'
                  )} />

                  <div className="relative z-10 p-4">
                    {/* Row 1: Badges + date */}
                    <div className="flex items-center gap-1.5 mb-2 flex-wrap">
                      <span className={cn('text-[10px] font-bold px-2 py-0.5 rounded', statusConfig.bg, statusConfig.text)}>
                        {statusConfig.label.toUpperCase()}
                      </span>
                      {invoice.invoice_number && (
                        <span className="font-mono text-[10px] text-white/50 px-1.5 py-0.5 rounded bg-white/[0.04]">
                          {invoice.invoice_number}
                        </span>
                      )}
                      {isOverdue && overdueInfo && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-red-500/15 text-red-400">
                          {overdueInfo.daysOverdue}d Overdue
                        </span>
                      )}
                      <span className="text-[11px] text-white/50 ml-auto flex-shrink-0">
                        {invoice.invoice_date ? format(new Date(invoice.invoice_date), 'd MMM') : ''}
                      </span>
                    </div>

                    {/* Row 2: Client name */}
                    <h3 className="text-[15px] font-semibold text-white leading-tight group-hover:text-elec-yellow transition-colors truncate">
                      {clientData?.name || 'Unknown Client'}
                    </h3>

                    {/* Row 3: Items count */}
                    <p className="mt-0.5 text-[12px] text-white leading-tight truncate">
                      {invoice.items.length} item{invoice.items.length !== 1 ? 's' : ''}
                      {invoice.invoice_due_date && !isPaid && (
                        <span> · Due {format(new Date(invoice.invoice_due_date), 'd MMM')}</span>
                      )}
                    </p>

                    {/* Row 4: Amount */}
                    <div className="flex items-center justify-between mt-2">
                      <span className={cn(
                        'text-[15px] font-bold',
                        isPaid ? 'text-emerald-400' : isOverdue ? 'text-red-400' : 'text-elec-yellow'
                      )}>
                        {formatCurrency(invoice.total)}
                      </span>
                    </div>

                    {/* Row 5: Footer CTA */}
                    <div className="flex items-center justify-between mt-3">
                      <span className="text-[11px] font-medium text-elec-yellow">
                        {isPaid ? 'View' : invoice.invoice_status === 'draft' ? 'Continue Editing' : 'View Invoice'}
                      </span>
                      <div className="w-6 h-6 rounded-full bg-white/[0.05] border border-elec-yellow/20 flex items-center justify-center group-hover:bg-elec-yellow group-hover:border-elec-yellow transition-all duration-200">
                        <Eye className="w-3.5 h-3.5 text-white group-hover:text-black transition-all" />
                      </div>
                    </div>
                  </div>
                </div>
              </button>
            </SwipeableCard>
          </div>
        );
      })}

      {/* Actions Sheet */}
      <Sheet
        open={!!actionsSheetInvoice}
        onOpenChange={(open) => !open && setActionsSheetInvoice(null)}
      >
        <SheetContent
          side="bottom"
          className="h-auto max-h-[80vh] rounded-t-[28px] p-0 bg-[#0f0f0f] border-t border-white/10"
        >
          {/* Handle bar */}
          <div className="flex justify-center pt-3 pb-2">
            <div className="w-10 h-1 rounded-full bg-white/20" />
          </div>

          {actionsSheetInvoice && (
            <>
              {/* Invoice Summary Header */}
              <div className="px-5 pb-4 border-b border-white/[0.06]">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[13px] text-white font-medium">
                      {actionsSheetInvoice.invoice_number}
                    </p>
                    <p className="text-[15px] font-semibold text-white mt-0.5">
                      {actionsSheetInvoice.client?.name || 'Unknown Client'}
                    </p>
                  </div>
                  <p className="text-[22px] font-bold text-elec-yellow">
                    {formatCurrency(actionsSheetInvoice.total)}
                  </p>
                </div>
              </div>

              <div className="p-4 pb-10 space-y-2">
                {/* View Invoice - Always goes to view page */}
                <button
                  onClick={() => {
                    navigate(`/electrician/invoices/${actionsSheetInvoice.id}/view`);
                    setActionsSheetInvoice(null);
                  }}
                  className="w-full flex items-center gap-4 p-4 rounded-2xl bg-white/[0.03] hover:bg-white/[0.06] touch-manipulation active:scale-[0.98] transition-all"
                >
                  <div className="w-11 h-11 rounded-xl bg-blue-500/15 flex items-center justify-center">
                    <Eye className="h-5 w-5 text-blue-400" />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="text-[15px] font-semibold text-white">View Invoice</p>
                    <p className="text-[12px] text-white">View invoice details</p>
                  </div>
                </button>

                {/* Edit Invoice - Always goes to wizard */}
                <button
                  onClick={() => {
                    navigate(`/electrician/invoice-quote-builder/${actionsSheetInvoice.id}`);
                    setActionsSheetInvoice(null);
                  }}
                  className="w-full flex items-center gap-4 p-4 rounded-2xl bg-white/[0.03] hover:bg-white/[0.06] touch-manipulation active:scale-[0.98] transition-all"
                >
                  <div className="w-11 h-11 rounded-xl bg-amber-500/15 flex items-center justify-center">
                    <Pencil className="h-5 w-5 text-amber-400" />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="text-[15px] font-semibold text-white">Edit Invoice</p>
                    <p className="text-[12px] text-white">Modify invoice in wizard</p>
                  </div>
                </button>

                {/* Download PDF */}
                <button
                  onClick={() => {
                    onDownloadPDF(actionsSheetInvoice);
                    setActionsSheetInvoice(null);
                  }}
                  className="w-full flex items-center gap-4 p-4 rounded-2xl bg-white/[0.03] hover:bg-white/[0.06] touch-manipulation active:scale-[0.98] transition-all"
                >
                  <div className="w-11 h-11 rounded-xl bg-elec-yellow/15 flex items-center justify-center">
                    <Download className="h-5 w-5 text-elec-yellow" />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="text-[15px] font-semibold text-white">Download PDF</p>
                    <p className="text-[12px] text-white">Save to device</p>
                  </div>
                </button>

                {/* Mark as Sent - Only for draft invoices */}
                {actionsSheetInvoice.invoice_status === 'draft' && (
                  <button
                    onClick={async () => {
                      const id = actionsSheetInvoice.id;
                      setActionsSheetInvoice(null);
                      const { error } = await supabase
                        .from('quotes')
                        .update({
                          invoice_status: 'sent',
                          invoice_sent_at: new Date().toISOString(),
                        })
                        .eq('id', id);
                      if (error) {
                        toast.error('Could not update invoice status');
                      } else {
                        toast.success('Invoice marked as sent');
                        onSendSuccess();
                      }
                    }}
                    className="w-full flex items-center gap-4 p-4 rounded-2xl bg-white/[0.03] hover:bg-white/[0.06] touch-manipulation active:scale-[0.98] transition-all"
                  >
                    <div className="w-11 h-11 rounded-xl bg-blue-500/15 flex items-center justify-center">
                      <Send className="h-5 w-5 text-blue-400" />
                    </div>
                    <div className="flex-1 text-left">
                      <p className="text-[15px] font-semibold text-white">Mark as Sent</p>
                      <p className="text-[12px] text-white">Already sent this manually?</p>
                    </div>
                  </button>
                )}

                {/* Sync to Accounting - Only for paid invoices */}
                {actionsSheetInvoice.invoice_status === 'paid' &&
                  hasAccountingConnected &&
                  connectedProvider && (
                    <button
                      onClick={() => {
                        handleSyncToAccounting(actionsSheetInvoice.id);
                        setActionsSheetInvoice(null);
                      }}
                      disabled={syncingInvoiceId === actionsSheetInvoice.id}
                      className="w-full flex items-center gap-4 p-4 rounded-2xl bg-white/[0.03] hover:bg-white/[0.06] touch-manipulation active:scale-[0.98] transition-all"
                    >
                      <div
                        className={cn(
                          'w-11 h-11 rounded-xl flex items-center justify-center',
                          connectedProvider.provider === 'xero'
                            ? 'bg-[#13B5EA]/15'
                            : 'bg-[#2CA01C]/15'
                        )}
                      >
                        {syncingInvoiceId === actionsSheetInvoice.id ? (
                          <Loader2
                            className={cn(
                              'h-5 w-5 animate-spin',
                              connectedProvider.provider === 'xero'
                                ? 'text-[#13B5EA]'
                                : 'text-[#2CA01C]'
                            )}
                          />
                        ) : (
                          <RefreshCw
                            className={cn(
                              'h-5 w-5',
                              connectedProvider.provider === 'xero'
                                ? 'text-[#13B5EA]'
                                : 'text-[#2CA01C]'
                            )}
                          />
                        )}
                      </div>
                      <div className="flex-1 text-left">
                        <p className="text-[15px] font-semibold text-white">
                          Sync to {ACCOUNTING_PROVIDERS[connectedProvider.provider].name}
                        </p>
                        <p className="text-[12px] text-white">
                          {connectedProvider.tenantName || 'Send to accounting software'}
                        </p>
                      </div>
                    </button>
                  )}

                {/* Record Partial Payment */}
                {(actionsSheetInvoice.invoice_status === 'sent' ||
                  actionsSheetInvoice.invoice_status === 'overdue') && (
                  <button
                    onClick={() => {
                      setPartialPaymentInvoice(actionsSheetInvoice);
                      setActionsSheetInvoice(null);
                    }}
                    className="w-full flex items-center gap-4 p-4 rounded-2xl bg-white/[0.03] hover:bg-white/[0.06] touch-manipulation active:scale-[0.98] transition-all"
                  >
                    <div className="w-11 h-11 rounded-xl bg-emerald-500/15 flex items-center justify-center">
                      <PoundSterling className="h-5 w-5 text-emerald-400" />
                    </div>
                    <div className="flex-1 text-left">
                      <p className="text-[15px] font-semibold text-white">Record Payment</p>
                      <p className="text-[12px] text-white">Log partial or full payment</p>
                    </div>
                  </button>
                )}

                {/* Send Reminder */}
                {(actionsSheetInvoice.invoice_status === 'sent' ||
                  actionsSheetInvoice.invoice_status === 'overdue') && (
                  <div className="pt-1">
                    <PaymentReminderButton
                      invoice={actionsSheetInvoice}
                      onReminderSent={() => {
                        onSendSuccess();
                        setActionsSheetInvoice(null);
                      }}
                      className="w-full h-14 rounded-2xl text-[15px] font-semibold bg-amber-500/10 border-amber-500/20 hover:bg-amber-500/15"
                    />
                  </div>
                )}

                {/* Divider */}
                <div className="py-2">
                  <div className="h-px bg-white/[0.06]" />
                </div>

                {/* Delete */}
                <button
                  onClick={() => {
                    onDeleteInvoice(actionsSheetInvoice.id);
                    setActionsSheetInvoice(null);
                  }}
                  className="w-full flex items-center gap-4 p-4 rounded-2xl hover:bg-red-500/10 touch-manipulation active:scale-[0.98] transition-all"
                >
                  <div className="w-11 h-11 rounded-xl bg-red-500/15 flex items-center justify-center">
                    <Trash2 className="h-5 w-5 text-red-400" />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="text-[15px] font-semibold text-red-400">Delete Invoice</p>
                    <p className="text-[12px] text-white">This cannot be undone</p>
                  </div>
                </button>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>

      {/* Partial Payment Dialog */}
      {partialPaymentInvoice && (
        <PartialPaymentDialog
          invoice={partialPaymentInvoice}
          open={!!partialPaymentInvoice}
          onOpenChange={(open) => !open && setPartialPaymentInvoice(null)}
          onPaymentRecorded={() => {
            setPartialPaymentInvoice(null);
            onSendSuccess();
          }}
        />
      )}
    </div>
  );
};

export default InvoiceCardView;
