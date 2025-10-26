import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Download, Eye, Calendar, User, Mail, Phone, Trash2, CheckCircle, AlertCircle, Receipt, Send, Edit } from 'lucide-react';
import { Quote } from '@/types/quote';
import { format, isPast } from 'date-fns';
import { InvoiceSendDropdown } from '@/components/electrician/invoice-builder/InvoiceSendDropdown';

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
}) => {
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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {invoices.map((invoice) => {
        const statusInfo = getStatusInfo(invoice);
        const StatusIcon = statusInfo.icon;
        const isOverdue = invoice.invoice_due_date && isPast(new Date(invoice.invoice_due_date));
        
        const clientData = invoice.client;

        return (
          <div
            key={invoice.id}
            id={`invoice-${invoice.id}`}
            className={`relative bg-elec-card rounded-2xl overflow-hidden hover:shadow-2xl transition-all border ${statusInfo.borderColor}`}
          >
            {/* Content Container */}
            <div className="relative p-4">
              {/* Top Row: Invoice Number & Status Badge */}
              <div className="flex items-start justify-between mb-3 pb-3 border-b border-primary/20">
                <div className="flex flex-col gap-2 w-full">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-lg font-bold text-foreground">
                      {invoice.invoice_number}
                    </h3>
                    <Badge className={`text-xs ${statusInfo.color} border-0 flex items-center gap-1`}>
                      <StatusIcon className="h-3 w-3" />
                      {statusInfo.label}
                    </Badge>
                  </div>
                  
                  {/* Quote Reference if available */}
                  {invoice.quoteNumber && (
                    <div className="text-xs text-muted-foreground">
                      From Quote #{invoice.quoteNumber}
                    </div>
                  )}
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onInvoiceAction(invoice)}
                  className="h-8 w-8 text-muted-foreground hover:text-foreground flex-shrink-0"
                  aria-label={`View invoice ${invoice.invoice_number}`}
                >
                  <Eye className="h-4 w-4" />
                </Button>
              </div>

              {/* Client Info */}
              <div className="flex items-start gap-2 mb-4">
                <div className="w-10 h-10 flex items-center justify-center flex-shrink-0">
                  <User className="h-10 w-10 text-muted-foreground/40" strokeWidth={1.5} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-xs text-muted-foreground mb-0.5">Client</div>
                  <div className="text-base text-foreground font-medium truncate">
                    {clientData?.name || 'Unknown Client'}
                  </div>
                  {clientData?.email && (
                    <div className="text-xs text-muted-foreground flex items-center gap-1 mt-1 truncate">
                      <Mail className="h-3 w-3 flex-shrink-0" />
                      <span className="truncate">{clientData.email}</span>
                    </div>
                  )}
                  {clientData?.phone && (
                    <div className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5 truncate">
                      <Phone className="h-3 w-3 flex-shrink-0" />
                      <span className="truncate">{clientData.phone}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Total Amount - Prominent */}
              <div className="text-center mb-4 py-4 bg-background/40 rounded-lg border border-primary/10">
                <div className="text-sm text-muted-foreground mb-1 font-normal">Total Amount</div>
                <div className="text-3xl font-bold text-elec-yellow">
                  {formatCurrency(invoice.total)}
                </div>
              </div>

              {/* Dates Info */}
              <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
                <div>
                  <div className="text-xs text-muted-foreground mb-1">Invoice Date</div>
                  <div className="text-foreground font-medium flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {invoice.invoice_date ? format(new Date(invoice.invoice_date), 'dd MMM yyyy') : 'N/A'}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground mb-1">Due Date</div>
                  <div className={`font-medium flex items-center gap-1 ${isOverdue ? 'text-red-600' : 'text-foreground'}`}>
                    <Calendar className="h-3 w-3" />
                    {invoice.invoice_due_date ? format(new Date(invoice.invoice_due_date), 'dd MMM yyyy') : 'N/A'}
                  </div>
                </div>
              </div>

              {/* Items Count */}
              <div className="text-xs text-muted-foreground mb-4">
                {invoice.items.length} item{invoice.items.length !== 1 ? 's' : ''}
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
                  />
                </div>

                {/* Mark as Paid - Only for sent/overdue invoices */}
                {(invoice.invoice_status === 'sent' || invoice.invoice_status === 'overdue' || isOverdue) && (
                  <Button
                    onClick={() => onMarkAsPaid(invoice)}
                    disabled={markingPaidId === invoice.id}
                    variant="default"
                    size="sm"
                    className="col-span-2 bg-green-600 hover:bg-green-700 text-white"
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    {markingPaidId === invoice.id ? 'Updating...' : 'Mark as Paid'}
                  </Button>
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
        );
      })}
    </div>
  );
};

export default InvoiceCardView;
