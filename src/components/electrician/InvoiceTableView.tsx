import { useState } from "react";
import { Quote } from "@/types/quote";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, Edit, Download, Mail, CheckCircle, Bell, AlertCircle, Send, FileText, ArrowLeft, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
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
import { InvoiceSendDropdown } from "@/components/electrician/invoice-builder/InvoiceSendDropdown";
import { DeleteInvoiceDialog } from "@/components/electrician/invoice-builder/DeleteInvoiceDialog";

interface InvoiceTableViewProps {
  invoices: Quote[];
  onInvoiceAction: (invoice: Quote) => void;
  onDownloadPDF: (invoice: Quote) => void;
  onMarkAsPaid: (invoice: Quote) => void;
  onSendSuccess: () => void;
  onDeleteInvoice: (invoiceId: string) => void;
  markingPaidId: string | null;
  downloadingPdfId: string | null;
  deletingInvoiceId: string | null;
}

const InvoiceTableView = ({
  invoices,
  onInvoiceAction,
  onDownloadPDF,
  onMarkAsPaid,
  onSendSuccess,
  onDeleteInvoice,
  markingPaidId,
  downloadingPdfId,
  deletingInvoiceId,
}: InvoiceTableViewProps) => {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [invoiceToDelete, setInvoiceToDelete] = useState<Quote | null>(null);

  const handleDeleteClick = (invoice: Quote) => {
    setInvoiceToDelete(invoice);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (invoiceToDelete) {
      onDeleteInvoice(invoiceToDelete.id);
      setDeleteDialogOpen(false);
      setInvoiceToDelete(null);
    }
  };
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
              <TableHead className="text-right min-w-[160px]">Actions</TableHead>
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
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => navigate(`/electrician/quotes?highlight=${invoice.id}`)}
                            className="h-auto p-1 text-xs font-mono hover:text-elec-yellow"
                          >
                            <FileText className="h-3 w-3 mr-1" />
                            #{invoice.quoteNumber}
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>View original quote</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
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
                  <TableCell className="text-right min-w-[160px]">
                    <TooltipProvider>
                      <div className="flex items-center justify-end gap-3">
                        {/* View/Edit Button */}
                        <Tooltip>
                          <TooltipTrigger asChild>
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
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{status === 'draft' ? 'Edit invoice' : 'View invoice'}</p>
                          </TooltipContent>
                        </Tooltip>

                        {/* Download PDF */}
                        <Tooltip>
                          <TooltipTrigger asChild>
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
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Download PDF</p>
                          </TooltipContent>
                        </Tooltip>

                        {/* Send Invoice */}
                        {status !== 'paid' && (
                          <>
                            <InvoiceSendDropdown 
                              invoice={invoice}
                              onSuccess={onSendSuccess}
                              className="h-8 w-8 p-0"
                            />

                            {/* Mark as Paid */}
                            <Tooltip>
                              <TooltipTrigger asChild>
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
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Mark as paid</p>
                              </TooltipContent>
                            </Tooltip>

                            {/* Delete Invoice */}
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => handleDeleteClick(invoice)}
                                  disabled={deletingInvoiceId === invoice.id}
                                  className="h-8 w-8 p-0 hover:text-destructive"
                                  aria-label="Delete invoice"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Delete invoice</p>
                              </TooltipContent>
                            </Tooltip>
                          </>
                        )}
                      </div>
                    </TooltipProvider>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>

        {invoiceToDelete && (
          <DeleteInvoiceDialog
            open={deleteDialogOpen}
            onOpenChange={setDeleteDialogOpen}
            invoice={invoiceToDelete}
            onConfirm={handleDeleteConfirm}
            isDeleting={deletingInvoiceId === invoiceToDelete.id}
          />
        )}
      </div>
    </div>
  );
};

export default InvoiceTableView;
