import { Quote } from "@/types/quote";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, Edit, Download, Mail, CheckCircle, Bell, AlertCircle, Send, FileText, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
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

interface InvoiceTableViewProps {
  invoices: Quote[];
  onInvoiceAction: (invoice: Quote) => void;
  onDownloadPDF: (invoice: Quote) => void;
  onSendInvoice: (invoice: Quote) => void;
  onMarkAsPaid: (invoice: Quote) => void;
  sendingInvoiceId: string | null;
  markingPaidId: string | null;
  downloadingPdfId: string | null;
}

const InvoiceTableView = ({
  invoices,
  onInvoiceAction,
  onDownloadPDF,
  onSendInvoice,
  onMarkAsPaid,
  sendingInvoiceId,
  markingPaidId,
  downloadingPdfId,
}: InvoiceTableViewProps) => {
  const navigate = useNavigate();
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

  if (invoices.length === 0) {
    return null;
  }

  return (
    <div className="hidden lg:block overflow-hidden">
      <div className="border rounded-lg border-elec-yellow/20 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Invoice #</TableHead>
              <TableHead>Quote Ref</TableHead>
              <TableHead>Client</TableHead>
              <TableHead>Issued Date</TableHead>
              <TableHead>Due Date</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoices.map((invoice) => {
              const status = invoice.invoice_status;
              const isOverdue = invoice.invoice_due_date && isPast(new Date(invoice.invoice_due_date));

              return (
                <TableRow key={invoice.id} id={`invoice-${invoice.id}`} className="hover:bg-muted/50 transition-all">
                  <TableCell className="font-medium">
                    #{invoice.invoice_number || invoice.quoteNumber}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => navigate(`/electrician/quotes?highlight=${invoice.id}`)}
                      className="h-auto p-1 text-xs font-mono hover:text-elec-yellow"
                    >
                      <FileText className="h-3 w-3 mr-1" />
                      #{invoice.quoteNumber}
                    </Button>
                  </TableCell>
                  <TableCell className="max-w-[200px] truncate">
                    {invoice.client?.name || 'N/A'}
                  </TableCell>
                  <TableCell>
                    {invoice.invoice_date 
                      ? format(new Date(invoice.invoice_date), "dd MMM yyyy")
                      : 'N/A'
                    }
                  </TableCell>
                  <TableCell>
                    {invoice.invoice_due_date
                      ? format(new Date(invoice.invoice_due_date), "dd MMM yyyy")
                      : 'N/A'
                    }
                  </TableCell>
                  <TableCell className="font-bold">
                    {formatCurrency(invoice.total)}
                  </TableCell>
                  <TableCell>
                    {getStatusBadge(invoice)}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      {/* View/Edit Button */}
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => onInvoiceAction(invoice)}
                        className="h-8 w-8 p-0"
                        aria-label={status === 'draft' ? 'Edit invoice' : 'View invoice'}
                      >
                        {status === 'draft' ? (
                          <Edit className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>

                      {/* Download PDF */}
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => onDownloadPDF(invoice)}
                        disabled={downloadingPdfId === invoice.id}
                        className="h-8 w-8 p-0"
                        aria-label="Download PDF"
                      >
                        <Download className="h-4 w-4" />
                      </Button>

                      {/* Send Invoice */}
                      {status !== 'paid' && (
                        <>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => onSendInvoice(invoice)}
                            disabled={sendingInvoiceId === invoice.id}
                            className="h-8 w-8 p-0"
                            aria-label={isOverdue ? 'Send reminder' : 'Send invoice'}
                          >
                            {isOverdue ? (
                              <Bell className="h-4 w-4 text-red-600" />
                            ) : (
                              <Mail className="h-4 w-4" />
                            )}
                          </Button>

                          {/* Mark as Paid */}
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button
                                size="sm"
                                variant="ghost"
                                disabled={markingPaidId === invoice.id}
                                className="h-8 w-8 p-0"
                                aria-label="Mark as paid"
                              >
                                <CheckCircle className="h-4 w-4" />
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
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default InvoiceTableView;
