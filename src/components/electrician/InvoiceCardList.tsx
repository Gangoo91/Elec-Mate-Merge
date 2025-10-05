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
            className="bg-elec-card border border-elec-yellow/20 rounded-lg overflow-hidden hover:border-elec-yellow/30 hover:shadow-md transition-all border-l-2 border-l-elec-yellow/50"
          >
            {/* Content */}
            <div className="p-2.5 space-y-1.5">
              {/* Header - Compact */}
              <div className="flex items-center justify-between gap-2">
                <span className="text-sm font-bold">#{invoice.invoice_number || invoice.quoteNumber}</span>
                {getStatusBadge(invoice)}
              </div>

              {/* Client */}
              <div className="text-sm">
                <span className="text-muted-foreground">Client:</span>{' '}
                <span className="font-semibold">{invoice.client?.name || 'N/A'}</span>
              </div>

              {/* Dates - Inline */}
              <div className="text-xs text-muted-foreground">
                {invoice.invoice_date && (
                  <>
                    Issued: {format(new Date(invoice.invoice_date), "dd MMM")}
                    {invoice.invoice_due_date && <> • </>}
                  </>
                )}
                {invoice.invoice_due_date && (
                  <>Due: {format(new Date(invoice.invoice_due_date), "dd MMM yyyy")}</>
                )}
              </div>

              {/* Amount - Simple */}
              <div className="text-base font-bold pt-0.5">
                Total: {formatCurrency(invoice.total)}
              </div>

              {/* Action Buttons */}
              <div className="space-y-1.5">
                {/* Primary Action */}
                <MobileButton
                  size="default"
                  variant="elec"
                  onClick={() => onInvoiceAction(invoice)}
                  icon={actionButton.icon}
                  className={`w-full sm:w-auto sm:min-w-[140px] ${actionButton.className}`}
                  aria-label={actionButton.ariaLabel}
                >
                  {actionButton.text}
                </MobileButton>

                {/* Secondary Actions */}
                <div className="flex flex-wrap gap-1.5">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onDownloadPDF(invoice)}
                    disabled={downloadingPdfId === invoice.id}
                    className="text-xs h-7 flex-1 sm:flex-none sm:max-w-[100px]"
                  >
                    <Download className="h-3.5 w-3.5 sm:mr-1.5" />
                    <span className="hidden sm:inline">
                      {downloadingPdfId === invoice.id ? 'Loading...' : 'PDF'}
                    </span>
                  </Button>

                  {invoice.invoice_status !== 'paid' && (
                    <>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => onSendInvoice(invoice)}
                        disabled={sendingInvoiceId === invoice.id}
                        className="text-xs h-7 flex-1 sm:flex-none sm:max-w-[100px]"
                      >
                        <Mail className="h-3.5 w-3.5 sm:mr-1.5" />
                        <span className="hidden sm:inline">
                          {sendingInvoiceId === invoice.id ? 'Sending...' : 'Send'}
                        </span>
                      </Button>

                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            size="sm"
                            variant="outline"
                            disabled={markingPaidId === invoice.id}
                            className="text-xs h-7 flex-1 sm:flex-none sm:max-w-[100px]"
                          >
                            <CheckCircle className="h-3.5 w-3.5 sm:mr-1.5" />
                            <span className="hidden sm:inline">Paid</span>
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
