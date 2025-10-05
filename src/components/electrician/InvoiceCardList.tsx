import { Quote } from "@/types/quote";
import { Badge } from "@/components/ui/badge";
import { MobileButton } from "@/components/ui/mobile-button";
import { Button } from "@/components/ui/button";
import { Eye, Edit, Download, Mail, CheckCircle, Bell, AlertCircle, Send, FileText } from "lucide-react";
import { format, isPast } from "date-fns";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface InvoiceCardListProps {
  invoices: Quote[];
  onInvoiceAction: (invoice: Quote) => void;
  onDownloadPDF: (invoice: Quote) => void;
  onSendInvoice: (invoice: Quote) => void;
  onMarkAsPaid: (invoice: Quote) => void;
  sendingInvoiceId: string | null;
  markingPaidId: string | null;
  downloadingPdfId: string | null;
}

const InvoiceCardList = ({
  invoices,
  onInvoiceAction,
  onDownloadPDF,
  onSendInvoice,
  onMarkAsPaid,
  sendingInvoiceId,
  markingPaidId,
  downloadingPdfId,
}: InvoiceCardListProps) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-GB", {
      style: "currency",
      currency: "GBP",
    }).format(amount);
  };

  const getStatusBadge = (invoice: Quote) => {
    const status = invoice.invoice_status;
    const isOverdue = invoice.invoice_due_date && isPast(new Date(invoice.invoice_due_date));

    if (isOverdue || status === "overdue") {
      return (
        <Badge variant="destructive" className="bg-red-50 text-red-700 border-red-200 dark:bg-red-950 dark:text-red-300 dark:border-red-800">
          <AlertCircle className="h-3 w-3 mr-1" />
          Overdue
        </Badge>
      );
    }

    if (status === "sent") {
      return (
        <Badge variant="secondary" className="bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950 dark:text-blue-300 dark:border-blue-800">
          <Send className="h-3 w-3 mr-1" />
          Sent
        </Badge>
      );
    }

    if (status === "draft") {
      return (
        <Badge variant="outline" className="bg-slate-50 text-slate-700 border-slate-200 dark:bg-slate-950 dark:text-slate-300 dark:border-slate-800">
          <Edit className="h-3 w-3 mr-1" />
          Draft
        </Badge>
      );
    }

    if (status === "paid") {
      return (
        <Badge variant="secondary" className="bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-800">
          <FileText className="h-3 w-3 mr-1" />
          Paid
        </Badge>
      );
    }

    return null;
  };

  const getActionButton = (invoice: Quote) => {
    const isOverdue = invoice.invoice_due_date && isPast(new Date(invoice.invoice_due_date));
    const status = invoice.invoice_status;

    if (isOverdue || status === "overdue") {
      return {
        text: "Send Reminder",
        icon: <Bell className="h-4 w-4" />,
        className: "bg-red-600 hover:bg-red-700 text-white border-red-600 font-medium",
        ariaLabel: `Send payment reminder for invoice ${invoice.invoice_number}`,
      };
    }

    if (status === "sent") {
      return {
        text: "View Invoice",
        icon: <Eye className="h-4 w-4" />,
        className: "bg-blue-600 hover:bg-blue-700 text-white border-blue-600 font-medium",
        ariaLabel: `View invoice ${invoice.invoice_number}`,
      };
    }

    if (status === "draft") {
      return {
        text: "Edit Invoice",
        icon: <Edit className="h-4 w-4" />,
        className: "bg-elec-yellow hover:bg-elec-yellow/90 text-black border-elec-yellow font-medium",
        ariaLabel: `Edit invoice ${invoice.invoice_number}`,
      };
    }

    return {
      text: "View Invoice",
      icon: <Eye className="h-4 w-4" />,
      className: "bg-elec-yellow hover:bg-elec-yellow/90 text-black border-elec-yellow font-medium",
      ariaLabel: `View invoice ${invoice.invoice_number}`,
    };
  };

  return (
    <div className="lg:hidden space-y-4">
      {invoices.map((invoice) => {
        const actionButton = getActionButton(invoice);

        return (
          <div
            key={invoice.id}
            className="relative bg-elec-card rounded-2xl overflow-hidden hover:shadow-2xl transition-all border border-primary/20 border-l-2 border-l-primary/20"
          >
            {/* Dark overlay - exact match to reference */}
            <div className="absolute inset-0 bg-black/70 backdrop-blur-[2px]" />
            
            {/* Content Container */}
            <div className="relative z-10 p-4">
              {/* Top Row: Invoice Number & Status Badge */}
              <div className="flex items-start justify-between mb-6">
                <h3 className="text-xl font-bold text-white">
                  #{invoice.invoice_number || invoice.quoteNumber}
                </h3>
                {getStatusBadge(invoice)}
              </div>

              {/* Middle Row: Logo + Client Info (left) | Dates (right) */}
              <div className="flex items-start justify-between mb-8">
                {/* Left: Logo + Client */}
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 flex items-center justify-center">
                    <FileText className="h-16 w-16 text-white/40" strokeWidth={1.5} />
                  </div>
                  <div>
                    <div className="text-sm text-white/60 mb-1">Client</div>
                    <div className="text-base text-white font-medium">
                      {invoice.client?.name || 'N/A'}
                    </div>
                  </div>
                </div>
                
                {/* Right: Dates */}
                <div className="text-right space-y-3">
                  {invoice.invoice_date && (
                    <div>
                      <div className="text-sm text-white/60 mb-1">Issued</div>
                      <div className="text-sm text-white font-medium">
                        {format(new Date(invoice.invoice_date), "dd MMM yyyy")}
                      </div>
                    </div>
                  )}
                  {invoice.invoice_due_date && (
                    <div>
                      <div className="text-sm text-white/60 mb-1">Due Date</div>
                      <div className="text-sm text-white font-semibold">
                        {format(new Date(invoice.invoice_due_date), "dd MMM yyyy")}
                      </div>
                    </div>
                  )}
                </div>
              </div>


              {/* Total Amount - Centered, White Text */}
              <div className="text-center mb-6">
                <div className="text-sm text-white/60 mb-2 font-normal">Total Amount</div>
                <div className="text-4xl font-bold text-white">
                  {formatCurrency(invoice.total)}
                </div>
              </div>

              {/* Primary Action Button - Yellow, Centered, Rounded */}
              <div className="mb-4">
                <button
                  onClick={() => onInvoiceAction(invoice)}
                  className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-colors"
                  aria-label={actionButton.ariaLabel}
                >
                  {actionButton.icon}
                  {actionButton.text}
                </button>
              </div>


              {/* Bottom Action Bar - Three Dark Rounded Buttons */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => onDownloadPDF(invoice)}
                  disabled={downloadingPdfId === invoice.id}
                  className="flex-1 bg-black/40 hover:bg-black/60 backdrop-blur-sm text-white py-3 rounded-xl flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
                >
                  <Download className="h-4 w-4" />
                  <span className="text-sm font-medium">
                    {downloadingPdfId === invoice.id ? 'Loading' : 'PDF'}
                  </span>
                </button>

                {invoice.invoice_status !== 'paid' ? (
                  <>
                    <button
                      onClick={() => onSendInvoice(invoice)}
                      disabled={sendingInvoiceId === invoice.id}
                      className="flex-1 bg-black/40 hover:bg-black/60 backdrop-blur-sm text-white py-3 rounded-xl flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
                    >
                      <Mail className="h-4 w-4" />
                      <span className="text-sm font-medium">
                        {sendingInvoiceId === invoice.id ? 'Sending' : 'Send'}
                      </span>
                    </button>

                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <button
                          disabled={markingPaidId === invoice.id}
                          className="flex-1 bg-black/40 hover:bg-black/60 backdrop-blur-sm text-white py-3 rounded-xl flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
                        >
                          <CheckCircle className="h-4 w-4" />
                          <span className="text-sm font-medium">Paid</span>
                        </button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Mark invoice as paid?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This will mark invoice {invoice.invoice_number} as paid.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => onMarkAsPaid(invoice)}>
                            Confirm
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </>
                ) : (
                  <>
                    <button
                      disabled
                      className="flex-1 bg-black/20 backdrop-blur-sm text-white/40 py-3 rounded-xl flex items-center justify-center gap-2"
                    >
                      <Mail className="h-4 w-4" />
                      <span className="text-sm font-medium">Send</span>
                    </button>
                    <button
                      disabled
                      className="flex-1 bg-black/20 backdrop-blur-sm text-white/40 py-3 rounded-xl flex items-center justify-center gap-2"
                    >
                      <CheckCircle className="h-4 w-4" />
                      <span className="text-sm font-medium">Paid</span>
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default InvoiceCardList;
