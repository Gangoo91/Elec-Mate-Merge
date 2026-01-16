import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Download, Eye, Calendar, User, Trash2, CheckCircle, AlertCircle, Receipt, Send, Edit, FileText, CreditCard, PoundSterling } from 'lucide-react';
import { Quote } from '@/types/quote';
import { format, isPast, differenceInDays } from 'date-fns';
import { InvoiceSendDropdown } from '@/components/electrician/invoice-builder/InvoiceSendDropdown';
import { PaymentReminderButton } from '@/components/electrician/invoice-builder/PaymentReminderButton';
import { PartialPaymentDialog } from '@/components/electrician/invoice-builder/PartialPaymentDialog';
import { SwipeableCard } from '@/components/ui/SwipeableCard';
import { cn } from '@/lib/utils';

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

  // Get days overdue info with severity escalation
  const getOverdueInfo = (invoice: Quote) => {
    if (!invoice.invoice_due_date) return null;
    const dueDate = new Date(invoice.invoice_due_date);
    const daysOverdue = differenceInDays(new Date(), dueDate);

    if (daysOverdue <= 0) return null;

    // Severity escalation: amber (1-7), orange (8-14), red (15+)
    let severity: 'warning' | 'danger' | 'critical' = 'warning';
    let color = 'text-amber-500 bg-amber-500/10 border-amber-500/20';

    if (daysOverdue > 14) {
      severity = 'critical';
      color = 'text-red-600 bg-red-500/20 border-red-500/30';
    } else if (daysOverdue > 7) {
      severity = 'danger';
      color = 'text-orange-500 bg-orange-500/15 border-orange-500/20';
    }

    return { daysOverdue, severity, color };
  };

  const getStatusInfo = (invoice: Quote) => {
    const isOverdue = invoice.invoice_due_date && isPast(new Date(invoice.invoice_due_date));
    const status = invoice.invoice_status;

    if (isOverdue || status === 'overdue') {
      return {
        color: 'bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300 border-red-200 dark:border-red-800',
        label: '⚠️ Overdue',
        icon: AlertCircle,
        borderColor: 'border-red-500/30 border-l-4 border-l-red-500/60'
      };
    }

    if (status === 'paid') {
      return {
        color: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800',
        label: '✅ Paid',
        icon: CheckCircle,
        borderColor: 'border-green-500/30 border-l-4 border-l-green-500/60'
      };
    }

    if (status === 'sent') {
      return {
        color: 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300 border-blue-200 dark:border-blue-800',
        label: '📤 Sent',
        icon: Send,
        borderColor: 'border-blue-500/30 border-l-4 border-l-blue-500/60'
      };
    }

    if (status === 'draft') {
      return {
        color: 'bg-slate-100 text-slate-700 dark:bg-slate-950 dark:text-slate-300 border-slate-200 dark:border-slate-800',
        label: '📝 Draft',
        icon: Edit,
        borderColor: 'border-slate-500/30 border-l-4 border-l-slate-500/60'
      };
    }

    return {
      color: 'bg-slate-100 text-slate-700 dark:bg-slate-950 dark:text-slate-300 border-slate-200 dark:border-slate-800',
      label: status,
      icon: Receipt,
      borderColor: 'border-primary/20 border-l-4 border-l-primary/60'
    };
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {invoices.map((invoice, index) => {
        const statusInfo = getStatusInfo(invoice);
        const StatusIcon = statusInfo.icon;
        const isOverdue = invoice.invoice_due_date && isPast(new Date(invoice.invoice_due_date));
        const overdueInfo = getOverdueInfo(invoice);
        const isPaid = invoice.invoice_status === 'paid';
        const canMarkPaid = invoice.invoice_status === 'sent' || invoice.invoice_status === 'overdue' || isOverdue;

        const clientData = invoice.client;

        return (
          <div
            key={invoice.id}
            className="animate-fade-in"
            style={{ animationDelay: `${index * 50}ms` }}
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
          <div
            id={`invoice-${invoice.id}`}
            className={`relative bg-elec-card rounded-2xl overflow-hidden hover:shadow-2xl transition-all border ${statusInfo.borderColor}`}
          >
            {/* Content Container */}
            <div className="relative p-6">
              {/* Header with invoice number and status */}
              <div className="flex items-start justify-between mb-4 pb-3 border-b border-primary/20">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-lg sm:text-xl font-bold">
                      {invoice.invoice_number}
                    </h3>
                    <Badge className={`text-xs ${statusInfo.color}`}>
                      <StatusIcon className="h-3 w-3 mr-1" />
                      {statusInfo.label}
                    </Badge>
                  </div>
                  {invoice.quoteNumber && (
                    <div className="text-xs text-muted-foreground flex items-center gap-1">
                      <Receipt className="h-3 w-3" />
                      From Quote #{invoice.quoteNumber}
                    </div>
                  )}
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onInvoiceAction(invoice)}
                  className="h-8 w-8 flex-shrink-0"
                >
                  <Eye className="h-4 w-4" />
                </Button>
              </div>

              {/* Client Information */}
              <div className="flex items-center gap-2 mb-4">
                <div className="w-12 h-12 flex items-center justify-center flex-shrink-0">
                  <User className="h-12 w-12 text-muted-foreground/40" strokeWidth={1.5} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-xs text-muted-foreground mb-0.5">Client</div>
                  <div className="text-base font-medium truncate">
                    {clientData?.name || 'Unknown Client'}
                  </div>
                  {clientData?.email && (
                    <div className="text-xs text-muted-foreground truncate">
                      {clientData.email}
                    </div>
                  )}
                </div>
              </div>

              {/* Amount Display */}
              <div className="text-center mb-4 py-4 bg-background/40 rounded-lg border border-primary/10">
                <div className="text-sm text-muted-foreground mb-1">Total Amount</div>
                <div className="text-3xl sm:text-4xl font-bold text-elec-yellow">
                  {formatCurrency(invoice.total)}
                </div>
              </div>

              {/* Invoice Details - 2 Column Layout */}
              <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                <div>
                  <div className="text-xs text-muted-foreground mb-1">Invoice Date</div>
                  <div className="text-foreground font-medium flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {invoice.invoice_date ? format(new Date(invoice.invoice_date), 'dd MMM yyyy') : 'N/A'}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground mb-1">Due Date</div>
                  <div className={`font-medium flex items-center gap-1 ${
                    isOverdue ? 'text-red-600 font-semibold' : 'text-foreground'
                  }`}>
                    <Calendar className="h-3 w-3" />
                    {invoice.invoice_due_date ? format(new Date(invoice.invoice_due_date), 'dd MMM yyyy') : 'N/A'}
                    {isOverdue && <AlertCircle className="h-3 w-3 ml-1" />}
                  </div>
                  {/* Days overdue badge */}
                  {overdueInfo && (
                    <div className={cn(
                      "flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium mt-2 border w-fit",
                      overdueInfo.color
                    )}>
                      <AlertCircle className="h-3 w-3" />
                      <span>{overdueInfo.daysOverdue} days overdue</span>
                    </div>
                  )}
                </div>
                <div>
                  <div className="text-xs text-muted-foreground mb-1">Items</div>
                  <div className="text-foreground font-medium flex items-center gap-1">
                    <FileText className="h-3 w-3" />
                    {invoice.items.length}
                  </div>
                </div>
              </div>

              {/* Action Buttons Grid */}
              <div className="grid grid-cols-2 gap-2">
                {/* PDF Download */}
                <Button
                  onClick={() => onDownloadPDF(invoice)}
                  disabled={downloadingPdfId === invoice.id}
                  variant="outline"
                  size="sm"
                  className="w-full"
                >
                  <Download className="h-4 w-4 mr-2" />
                  {downloadingPdfId === invoice.id ? 'Loading...' : 'PDF'}
                </Button>

                {/* View/Edit Invoice */}
                <Button
                  onClick={() => onInvoiceAction(invoice)}
                  variant="default"
                  size="sm"
                  className="w-full"
                >
                  <Eye className="h-4 w-4 mr-2" />
                  {invoice.invoice_status === 'draft' ? 'Edit' : 'View'}
                </Button>

                {/* Send Dropdown - Full Width */}
                <div className="col-span-2">
                  <InvoiceSendDropdown
                    invoice={invoice}
                    onSuccess={onSendSuccess}
                    disabled={!clientData?.email || invoice.invoice_status === 'paid'}
                    refreshKey={stripeRefreshKey}
                  />
                </div>

                {/* Payment Actions - Only for sent/overdue invoices */}
                {(invoice.invoice_status === 'sent' || invoice.invoice_status === 'overdue' || isOverdue) && (
                  <>
                    {/* Record Payment + Send Reminder Row */}
                    <Button
                      onClick={() => setPartialPaymentInvoice(invoice)}
                      variant="outline"
                      size="sm"
                      className="w-full border-emerald-500/30 text-emerald-500 hover:bg-emerald-500/10"
                    >
                      <PoundSterling className="h-4 w-4 mr-2" />
                      Record Payment
                    </Button>
                    <PaymentReminderButton
                      invoice={invoice}
                      onReminderSent={onSendSuccess}
                      className="w-full"
                    />
                    {/* Mark as Fully Paid */}
                    <Button
                      onClick={() => onMarkAsPaid(invoice)}
                      disabled={markingPaidId === invoice.id}
                      variant="default"
                      size="sm"
                      className="col-span-2 bg-green-600 hover:bg-green-700 text-foreground"
                    >
                      <CheckCircle className="h-4 w-4 mr-2" />
                      {markingPaidId === invoice.id ? 'Updating...' : 'Mark as Fully Paid'}
                    </Button>
                  </>
                )}

                {/* Delete */}
                <Button
                  onClick={() => onDeleteInvoice(invoice.id)}
                  disabled={deletingInvoiceId === invoice.id}
                  variant="destructive"
                  size="sm"
                  className="col-span-2"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  {deletingInvoiceId === invoice.id ? 'Deleting...' : 'Delete Invoice'}
                </Button>
              </div>
            </div>
          </div>
            </SwipeableCard>
          </div>
        );
      })}

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
