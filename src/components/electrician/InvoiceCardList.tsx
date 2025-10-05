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
            className="relative bg-gradient-to-br from-background to-elec-card border border-elec-yellow/20 rounded-xl overflow-hidden hover:border-elec-yellow/40 hover:shadow-lg transition-all"
          >
            {/* Dark overlay for better contrast */}
            <div className="absolute inset-0 bg-gradient-to-b from-background/40 to-background/60 pointer-events-none" />
            
            {/* Content Container */}
            <div className="relative z-10">
              {/* Header - Invoice Number & Status */}
              <div className="px-4 pt-4 pb-3 flex items-start justify-between">
                <div className="flex items-center gap-3">
                  {/* Logo/Icon Placeholder */}
                  <div className="w-12 h-12 rounded-lg bg-elec-yellow/10 border border-elec-yellow/30 flex items-center justify-center">
                    <FileText className="h-6 w-6 text-elec-yellow" />
                  </div>
                  <div>
                    <h4 className="text-2xl font-bold text-foreground">
                      #{invoice.invoice_number || invoice.quoteNumber}
                    </h4>
                  </div>
                </div>
                {/* Status Badge - Top Right */}
                <div className="absolute top-4 right-4">
                  {getStatusBadge(invoice)}
                </div>
              </div>

              {/* Client & Dates Section */}
              <div className="px-4 pb-4 flex justify-between items-start gap-4">
                <div className="flex-1 min-w-0" />
                <div className="text-right space-y-2">
                  <div>
                    <div className="text-xs text-muted-foreground/80 mb-0.5">Client</div>
                    <div className="font-semibold text-sm">{invoice.client?.name || 'N/A'}</div>
                  </div>
                  {invoice.invoice_date && (
                    <div>
                      <div className="text-xs text-muted-foreground/80 mb-0.5">Issued</div>
                      <div className="text-sm font-medium">
                        {format(new Date(invoice.invoice_date), "dd MMM yyyy")}
                      </div>
                    </div>
                  )}
                  {invoice.invoice_due_date && (
                    <div>
                      <div className="text-xs text-muted-foreground/80 mb-0.5">Due Date</div>
                      <div className="text-sm font-semibold">
                        {format(new Date(invoice.invoice_due_date), "dd MMM yyyy")}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Total Amount - Centered */}
              <div className="px-4 pb-4">
                <div className="bg-background/40 backdrop-blur-sm border border-elec-yellow/20 rounded-lg p-4 text-center">
                  <div className="text-xs text-muted-foreground/80 mb-1.5 font-medium uppercase tracking-wider">Total Amount</div>
                  <div className="text-3xl font-bold text-foreground">
                    {formatCurrency(invoice.total)}
                  </div>
                </div>
              </div>

              {/* Primary Action Button - Centered */}
              <div className="px-4 pb-3">
                <MobileButton
                  size="lg"
                  variant="elec"
                  onClick={() => onInvoiceAction(invoice)}
                  icon={actionButton.icon}
                  className={`w-full ${actionButton.className}`}
                  aria-label={actionButton.ariaLabel}
                >
                  {actionButton.text}
                </MobileButton>
              </div>

              {/* Bottom Action Bar */}
              <div className="border-t border-elec-yellow/10 bg-background/20 backdrop-blur-sm">
                <div className="grid grid-cols-3 divide-x divide-elec-yellow/10">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => onDownloadPDF(invoice)}
                    disabled={downloadingPdfId === invoice.id}
                    className="h-12 rounded-none hover:bg-elec-yellow/10 flex flex-col gap-1 items-center justify-center"
                  >
                    <Download className="h-4 w-4" />
                    <span className="text-xs">
                      {downloadingPdfId === invoice.id ? 'Loading' : 'PDF'}
                    </span>
                  </Button>

                  {invoice.invoice_status !== 'paid' ? (
                    <>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => onSendInvoice(invoice)}
                        disabled={sendingInvoiceId === invoice.id}
                        className="h-12 rounded-none hover:bg-elec-yellow/10 flex flex-col gap-1 items-center justify-center"
                      >
                        <Mail className="h-4 w-4" />
                        <span className="text-xs">
                          {sendingInvoiceId === invoice.id ? 'Sending' : 'Send'}
                        </span>
                      </Button>

                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            size="sm"
                            variant="ghost"
                            disabled={markingPaidId === invoice.id}
                            className="h-12 rounded-none hover:bg-elec-yellow/10 flex flex-col gap-1 items-center justify-center"
                          >
                            <CheckCircle className="h-4 w-4" />
                            <span className="text-xs">Mark Paid</span>
                          </Button>
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
                      <div className="h-12 flex items-center justify-center">
                        <span className="text-xs text-muted-foreground">-</span>
                      </div>
                      <div className="h-12 flex items-center justify-center">
                        <span className="text-xs text-muted-foreground">-</span>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default InvoiceCardList;
