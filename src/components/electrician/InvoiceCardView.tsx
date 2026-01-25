import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Download, Eye, Calendar, Trash2, CheckCircle, AlertCircle, Send, Edit, CreditCard, PoundSterling, Clock, MoreHorizontal, FileText, User, Loader2, RefreshCw } from 'lucide-react';
import { Quote } from '@/types/quote';
import { format, isPast, differenceInDays } from 'date-fns';
import { InvoiceSendDropdown } from '@/components/electrician/invoice-builder/InvoiceSendDropdown';
import { PaymentReminderButton } from '@/components/electrician/invoice-builder/PaymentReminderButton';
import { PartialPaymentDialog } from '@/components/electrician/invoice-builder/PartialPaymentDialog';
import { SwipeableCard } from '@/components/ui/SwipeableCard';
import { cn } from '@/lib/utils';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { useAccountingIntegrations } from '@/hooks/useAccountingIntegrations';
import { ACCOUNTING_PROVIDERS } from '@/types/accounting';

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
  const connectedProvider = accountingIntegrations.find(i => i.status === 'connected');

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
    if (!invoice.invoice_due_date) return null;
    const dueDate = new Date(invoice.invoice_due_date);
    const daysOverdue = differenceInDays(new Date(), dueDate);
    if (daysOverdue <= 0) return null;
    return { daysOverdue };
  };

  const getStatusConfig = (invoice: Quote) => {
    const isOverdue = invoice.invoice_due_date && isPast(new Date(invoice.invoice_due_date)) && invoice.invoice_status !== 'paid';
    const status = invoice.invoice_status;

    if (isOverdue || status === 'overdue') {
      return {
        bg: 'bg-red-500/15',
        border: 'border-red-500/30',
        text: 'text-red-400',
        label: 'Overdue',
        icon: AlertCircle,
        dot: 'bg-red-500'
      };
    }
    if (status === 'paid') {
      return {
        bg: 'bg-emerald-500/15',
        border: 'border-emerald-500/30',
        text: 'text-emerald-400',
        label: 'Paid',
        icon: CheckCircle,
        dot: 'bg-emerald-500'
      };
    }
    if (status === 'sent') {
      return {
        bg: 'bg-blue-500/15',
        border: 'border-blue-500/30',
        text: 'text-blue-400',
        label: 'Sent',
        icon: Send,
        dot: 'bg-blue-500'
      };
    }
    return {
      bg: 'bg-white/10',
      border: 'border-white/20',
      text: 'text-white/90',
      label: 'Draft',
      icon: Edit,
      dot: 'bg-white/50'
    };
  };

  return (
    <div className="space-y-3">
      {invoices.map((invoice, index) => {
        const statusConfig = getStatusConfig(invoice);
        const StatusIcon = statusConfig.icon;
        const isOverdue = invoice.invoice_due_date && isPast(new Date(invoice.invoice_due_date)) && invoice.invoice_status !== 'paid';
        const overdueInfo = getOverdueInfo(invoice);
        const isPaid = invoice.invoice_status === 'paid';
        const canMarkPaid = invoice.invoice_status === 'sent' || invoice.invoice_status === 'overdue' || isOverdue;
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
                label: 'Delete'
              }}
              rightAction={canMarkPaid ? {
                icon: <CreditCard className="h-5 w-5" />,
                bgColor: 'bg-emerald-500',
                onAction: () => onMarkAsPaid(invoice),
                label: 'Paid'
              } : undefined}
              disabled={isPaid}
            >
              <button
                onClick={() => onInvoiceAction(invoice)}
                className={cn(
                  "w-full text-left rounded-2xl overflow-hidden touch-manipulation active:scale-[0.99] transition-all",
                  "bg-gradient-to-br from-[#1e1e1e] to-[#161616]",
                  "border",
                  isPaid ? "border-emerald-500/20" : isOverdue ? "border-red-500/20" : "border-white/[0.08]"
                )}
              >
                {/* Main Content */}
                <div className="p-4">
                  {/* Amount - Hero element */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      {/* Status Badge */}
                      <div className={cn(
                        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold mb-2",
                        statusConfig.bg, statusConfig.border, statusConfig.text, "border"
                      )}>
                        <div className={cn("w-1.5 h-1.5 rounded-full", statusConfig.dot)} />
                        {statusConfig.label}
                      </div>
                      {/* Invoice Number */}
                      <p className="text-[13px] text-white/80 font-medium">{invoice.invoice_number}</p>
                    </div>
                    {/* Amount */}
                    <div className="text-right">
                      <p className={cn(
                        "text-[26px] font-bold tracking-tight",
                        isPaid ? "text-emerald-400" : isOverdue ? "text-red-400" : "text-white"
                      )}>
                        {formatCurrency(invoice.total)}
                      </p>
                    </div>
                  </div>

                  {/* Client Info */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-elec-yellow/10 flex items-center justify-center flex-shrink-0">
                      <User className="h-5 w-5 text-elec-yellow" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-[15px] font-semibold text-white truncate">
                        {clientData?.name || 'Unknown Client'}
                      </p>
                      {clientData?.email && (
                        <p className="text-[13px] text-white/80 truncate">{clientData.email}</p>
                      )}
                    </div>
                  </div>

                  {/* Meta Row */}
                  <div className="flex items-center gap-3 flex-wrap">
                    <div className="flex items-center gap-1.5 text-[12px] text-white/90 bg-white/[0.05] px-2.5 py-1.5 rounded-lg">
                      <Calendar className="h-3.5 w-3.5" />
                      <span>{invoice.invoice_date ? format(new Date(invoice.invoice_date), 'dd MMM yy') : 'N/A'}</span>
                    </div>

                    {invoice.invoice_due_date && (
                      <div className={cn(
                        "flex items-center gap-1.5 text-[12px] px-2.5 py-1.5 rounded-lg",
                        isOverdue
                          ? "bg-red-500/10 text-red-400 font-medium"
                          : "bg-white/[0.05] text-white/90"
                      )}>
                        <Clock className="h-3.5 w-3.5" />
                        <span>
                          {isOverdue && overdueInfo
                            ? `${overdueInfo.daysOverdue}d overdue`
                            : `Due ${format(new Date(invoice.invoice_due_date), 'dd MMM')}`
                          }
                        </span>
                      </div>
                    )}

                    <div className="flex items-center gap-1.5 text-[12px] text-white/90 bg-white/[0.05] px-2.5 py-1.5 rounded-lg">
                      <FileText className="h-3.5 w-3.5" />
                      <span>{invoice.items.length} items</span>
                    </div>
                  </div>
                </div>

                {/* Action Bar - For unpaid invoices */}
                {!isPaid && (
                  <div
                    className="flex items-center gap-2 p-3 border-t border-white/[0.06]"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {/* Download PDF */}
                    <button
                      onClick={(e) => { e.stopPropagation(); onDownloadPDF(invoice); }}
                      disabled={downloadingPdfId === invoice.id}
                      className="flex items-center justify-center gap-2 h-10 px-4 rounded-xl bg-white/[0.08] hover:bg-white/[0.12] text-[13px] font-medium text-white touch-manipulation transition-all active:scale-[0.96]"
                    >
                      {downloadingPdfId === invoice.id ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Download className="h-4 w-4" />
                      )}
                      <span>PDF</span>
                    </button>

                    {/* Send */}
                    <div className="flex-1">
                      <InvoiceSendDropdown
                        invoice={invoice}
                        onSuccess={onSendSuccess}
                        disabled={!clientData?.email}
                        refreshKey={stripeRefreshKey}
                        compact
                      />
                    </div>

                    {canMarkPaid && (
                      <button
                        onClick={(e) => { e.stopPropagation(); onMarkAsPaid(invoice); }}
                        disabled={markingPaidId === invoice.id}
                        className="flex items-center justify-center gap-2 h-10 px-4 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 text-[13px] font-semibold text-emerald-400 touch-manipulation transition-all active:scale-[0.96]"
                      >
                        {markingPaidId === invoice.id ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <CheckCircle className="h-4 w-4" />
                        )}
                        <span>Paid</span>
                      </button>
                    )}

                    {/* More Actions */}
                    <button
                      onClick={(e) => { e.stopPropagation(); setActionsSheetInvoice(invoice); }}
                      className="flex items-center justify-center h-10 w-10 rounded-xl bg-white/[0.08] hover:bg-white/[0.12] text-white touch-manipulation transition-all active:scale-[0.96]"
                    >
                      <MoreHorizontal className="h-5 w-5" />
                    </button>
                  </div>
                )}

                {/* Action Bar - For PAID invoices (sync to accounting) */}
                {isPaid && (
                  <div
                    className="flex items-center gap-2 p-3 border-t border-emerald-500/20 bg-emerald-500/5"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {/* Paid Status */}
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/15">
                      <CheckCircle className="h-4 w-4 text-emerald-400" />
                      <span className="text-[13px] font-semibold text-emerald-400">Paid</span>
                    </div>

                    <div className="flex-1" />

                    {/* Download PDF */}
                    <button
                      onClick={(e) => { e.stopPropagation(); onDownloadPDF(invoice); }}
                      disabled={downloadingPdfId === invoice.id}
                      className="flex items-center justify-center gap-2 h-10 px-4 rounded-xl bg-white/[0.08] hover:bg-white/[0.12] text-[13px] font-medium text-white touch-manipulation transition-all active:scale-[0.96]"
                    >
                      {downloadingPdfId === invoice.id ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Download className="h-4 w-4" />
                      )}
                      <span>PDF</span>
                    </button>

                    {/* Sync to Accounting - Show for connected provider */}
                    {hasAccountingConnected && connectedProvider ? (
                      <button
                        onClick={(e) => { e.stopPropagation(); handleSyncToAccounting(invoice.id); }}
                        disabled={syncingInvoiceId === invoice.id}
                        className={cn(
                          "flex items-center justify-center gap-2 h-10 px-4 rounded-xl text-[13px] font-semibold touch-manipulation transition-all active:scale-[0.96]",
                          connectedProvider.provider === 'xero'
                            ? "bg-[#13B5EA]/20 hover:bg-[#13B5EA]/30 text-[#13B5EA]"
                            : "bg-[#2CA01C]/20 hover:bg-[#2CA01C]/30 text-[#2CA01C]"
                        )}
                      >
                        {syncingInvoiceId === invoice.id ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <RefreshCw className="h-4 w-4" />
                        )}
                        <span>{ACCOUNTING_PROVIDERS[connectedProvider.provider].name}</span>
                      </button>
                    ) : (
                      /* Not connected - show connect prompt */
                      <button
                        onClick={(e) => { e.stopPropagation(); window.location.href = '/electrician/settings?tab=business'; }}
                        className="flex items-center justify-center gap-2 h-10 px-4 rounded-xl bg-purple-500/15 hover:bg-purple-500/25 text-[13px] font-medium text-purple-400 touch-manipulation transition-all active:scale-[0.96]"
                      >
                        <RefreshCw className="h-4 w-4" />
                        <span>Sync</span>
                      </button>
                    )}
                  </div>
                )}
              </button>
            </SwipeableCard>
          </div>
        );
      })}

      {/* Actions Sheet */}
      <Sheet open={!!actionsSheetInvoice} onOpenChange={(open) => !open && setActionsSheetInvoice(null)}>
        <SheetContent side="bottom" className="h-auto max-h-[80vh] rounded-t-[28px] p-0 bg-[#0f0f0f] border-t border-white/10">
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
                    <p className="text-[13px] text-white/80 font-medium">{actionsSheetInvoice.invoice_number}</p>
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
                {/* View/Edit */}
                <button
                  onClick={() => { onInvoiceAction(actionsSheetInvoice); setActionsSheetInvoice(null); }}
                  className="w-full flex items-center gap-4 p-4 rounded-2xl bg-white/[0.03] hover:bg-white/[0.06] touch-manipulation active:scale-[0.98] transition-all"
                >
                  <div className="w-11 h-11 rounded-xl bg-blue-500/15 flex items-center justify-center">
                    <Eye className="h-5 w-5 text-blue-400" />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="text-[15px] font-semibold text-white">View Invoice</p>
                    <p className="text-[12px] text-white/80">View or edit details</p>
                  </div>
                </button>

                {/* Download PDF */}
                <button
                  onClick={() => { onDownloadPDF(actionsSheetInvoice); setActionsSheetInvoice(null); }}
                  className="w-full flex items-center gap-4 p-4 rounded-2xl bg-white/[0.03] hover:bg-white/[0.06] touch-manipulation active:scale-[0.98] transition-all"
                >
                  <div className="w-11 h-11 rounded-xl bg-elec-yellow/15 flex items-center justify-center">
                    <Download className="h-5 w-5 text-elec-yellow" />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="text-[15px] font-semibold text-white">Download PDF</p>
                    <p className="text-[12px] text-white/80">Save to device</p>
                  </div>
                </button>

                {/* Sync to Accounting - Only for paid invoices */}
                {actionsSheetInvoice.invoice_status === 'paid' && hasAccountingConnected && connectedProvider && (
                  <button
                    onClick={() => { handleSyncToAccounting(actionsSheetInvoice.id); setActionsSheetInvoice(null); }}
                    disabled={syncingInvoiceId === actionsSheetInvoice.id}
                    className="w-full flex items-center gap-4 p-4 rounded-2xl bg-white/[0.03] hover:bg-white/[0.06] touch-manipulation active:scale-[0.98] transition-all"
                  >
                    <div className={cn(
                      "w-11 h-11 rounded-xl flex items-center justify-center",
                      connectedProvider.provider === 'xero' ? "bg-[#13B5EA]/15" : "bg-[#2CA01C]/15"
                    )}>
                      {syncingInvoiceId === actionsSheetInvoice.id ? (
                        <Loader2 className={cn(
                          "h-5 w-5 animate-spin",
                          connectedProvider.provider === 'xero' ? "text-[#13B5EA]" : "text-[#2CA01C]"
                        )} />
                      ) : (
                        <RefreshCw className={cn(
                          "h-5 w-5",
                          connectedProvider.provider === 'xero' ? "text-[#13B5EA]" : "text-[#2CA01C]"
                        )} />
                      )}
                    </div>
                    <div className="flex-1 text-left">
                      <p className="text-[15px] font-semibold text-white">
                        Sync to {ACCOUNTING_PROVIDERS[connectedProvider.provider].name}
                      </p>
                      <p className="text-[12px] text-white/80">
                        {connectedProvider.tenantName || 'Send to accounting software'}
                      </p>
                    </div>
                  </button>
                )}

                {/* Record Partial Payment */}
                {(actionsSheetInvoice.invoice_status === 'sent' || actionsSheetInvoice.invoice_status === 'overdue') && (
                  <button
                    onClick={() => { setPartialPaymentInvoice(actionsSheetInvoice); setActionsSheetInvoice(null); }}
                    className="w-full flex items-center gap-4 p-4 rounded-2xl bg-white/[0.03] hover:bg-white/[0.06] touch-manipulation active:scale-[0.98] transition-all"
                  >
                    <div className="w-11 h-11 rounded-xl bg-emerald-500/15 flex items-center justify-center">
                      <PoundSterling className="h-5 w-5 text-emerald-400" />
                    </div>
                    <div className="flex-1 text-left">
                      <p className="text-[15px] font-semibold text-white">Record Payment</p>
                      <p className="text-[12px] text-white/80">Log partial or full payment</p>
                    </div>
                  </button>
                )}

                {/* Send Reminder */}
                {(actionsSheetInvoice.invoice_status === 'sent' || actionsSheetInvoice.invoice_status === 'overdue') && (
                  <div className="pt-1">
                    <PaymentReminderButton
                      invoice={actionsSheetInvoice}
                      onReminderSent={() => { onSendSuccess(); setActionsSheetInvoice(null); }}
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
                  onClick={() => { onDeleteInvoice(actionsSheetInvoice.id); setActionsSheetInvoice(null); }}
                  className="w-full flex items-center gap-4 p-4 rounded-2xl hover:bg-red-500/10 touch-manipulation active:scale-[0.98] transition-all"
                >
                  <div className="w-11 h-11 rounded-xl bg-red-500/15 flex items-center justify-center">
                    <Trash2 className="h-5 w-5 text-red-400" />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="text-[15px] font-semibold text-red-400">Delete Invoice</p>
                    <p className="text-[12px] text-white/90">This cannot be undone</p>
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
