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
      return null;
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
            className={`relative bg-elec-card rounded-2xl overflow-hidden hover:shadow-2xl transition-all border ${
              invoice.invoice_status === 'paid' 
                ? 'border-green-500/30 border-l-4 border-l-green-500/60' 
                : 'border-primary/20 border-l-4 border-l-primary/60'
            }`}
          >
            
            {/* Content Container */}
            <div className="relative p-3">
              {/* Top Row: Invoice Number & Status Badge */}
              <div className="flex items-start justify-between mb-3 pb-2 border-b border-primary/20">
                <div className="flex items-center gap-2 w-full">
                  <h3 className="text-base sm:text-lg font-bold text-foreground">
                    #{invoice.invoice_number || invoice.quoteNumber}
                  </h3>
                  {getStatusBadge(invoice)}
                </div>
                {invoice.invoice_status === 'paid' ? (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onInvoiceAction(invoice)}
                    className="h-7 w-7 sm:h-8 sm:w-8 text-muted-foreground hover:text-foreground flex-shrink-0"
                    aria-label="View invoice"
                  >
                    <Eye className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  </Button>
                ) : (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onInvoiceAction(invoice)}
                    className="h-7 w-7 sm:h-8 sm:w-8 text-muted-foreground hover:text-foreground flex-shrink-0"
                    aria-label="Edit invoice"
                  >
                    <Edit className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  </Button>
                )}
              </div>

              {/* Middle Row: Logo + Client Info (left) | Dates (right) */}
              <div className="flex items-start justify-between mb-4 gap-3">
                {/* Left: Logo + Client */}
                <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center flex-shrink-0">
                    <FileText className="h-10 w-10 sm:h-14 sm:w-14 text-muted-foreground/40" strokeWidth={1.5} />
                  </div>
                  <div className="min-w-0 flex-1 text-left">
                    <div className="text-xs sm:text-sm text-muted-foreground mb-0.5 text-left">Client</div>
                    <div className="text-sm sm:text-base text-foreground font-medium truncate text-left">
                      {invoice.client?.name || 'N/A'}
                    </div>
                  </div>
                </div>
                
                {/* Right: Dates */}
                <div className="text-right space-y-2 flex-shrink-0">
                  {invoice.invoice_date && (
                    <div>
                      <div className="text-xs text-muted-foreground mb-0.5">Issued</div>
                      <div className="text-xs sm:text-sm text-foreground font-medium">
                        {format(new Date(invoice.invoice_date), "dd MMM yyyy")}
                      </div>
                    </div>
                  )}
                  {invoice.invoice_due_date && (
                    <div>
                      <div className="text-xs text-muted-foreground mb-0.5">Due Date</div>
                      <div className="text-xs sm:text-sm text-foreground font-semibold">
                        {format(new Date(invoice.invoice_due_date), "dd MMM yyyy")}
                      </div>
                    </div>
                  )}
                </div>
              </div>


              {/* Total Amount - Centered */}
              <div className="text-center mb-3 -mt-3">
                <div className="text-xs sm:text-sm text-muted-foreground mb-1 font-normal">Total Amount</div>
                <div className="text-2xl sm:text-3xl font-bold text-primary">
                  {formatCurrency(invoice.total)}
                </div>
              </div>

              {/* Bottom Action Bar - Three Dark Rounded Buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onDownloadPDF(invoice)}
                  disabled={downloadingPdfId === invoice.id}
                  className="flex-1 bg-background/40 hover:bg-background/60 border border-primary/20 text-foreground py-2.5 sm:py-3 rounded-lg flex items-center justify-center gap-1.5 sm:gap-2 transition-colors disabled:opacity-50 touch-manipulation"
                >
                  <Download className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  <span className="text-xs sm:text-sm font-medium">
                    {downloadingPdfId === invoice.id ? 'Loading' : 'PDF'}
                  </span>
                </button>

                {invoice.invoice_status !== 'paid' ? (
                  <>
                    <button
                      onClick={() => onSendInvoice(invoice)}
                      disabled={sendingInvoiceId === invoice.id}
                      className="flex-1 bg-background/40 hover:bg-background/60 border border-primary/20 text-foreground py-2.5 sm:py-3 rounded-lg flex items-center justify-center gap-1.5 sm:gap-2 transition-colors disabled:opacity-50 touch-manipulation"
                    >
                      <Mail className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                      <span className="text-xs sm:text-sm font-medium">
                        {sendingInvoiceId === invoice.id ? 'Sending' : 'Send'}
                      </span>
                    </button>

                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <button
                          disabled={markingPaidId === invoice.id}
                          className="flex-1 bg-background/40 hover:bg-background/60 border border-primary/20 text-foreground py-2.5 sm:py-3 rounded-lg flex items-center justify-center gap-1.5 sm:gap-2 transition-colors disabled:opacity-50 touch-manipulation"
                        >
                          <CheckCircle className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                          <span className="text-xs sm:text-sm font-medium">Paid</span>
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
                      className="flex-1 bg-background/20 border border-primary/10 text-muted-foreground/40 py-2.5 sm:py-3 rounded-lg flex items-center justify-center gap-1.5 sm:gap-2 touch-manipulation"
                    >
                      <Mail className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                      <span className="text-xs sm:text-sm font-medium">Send</span>
                    </button>
                    <button
                      disabled
                      className="flex-1 bg-background/20 border border-primary/10 text-muted-foreground/40 py-2.5 sm:py-3 rounded-lg flex items-center justify-center gap-1.5 sm:gap-2 touch-manipulation"
                    >
                      <CheckCircle className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                      <span className="text-xs sm:text-sm font-medium">Paid</span>
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