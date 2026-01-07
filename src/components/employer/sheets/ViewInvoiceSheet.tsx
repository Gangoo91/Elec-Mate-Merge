import { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Progress } from "@/components/ui/progress";
import { 
  FileText, 
  Send, 
  Check, 
  Phone, 
  Mail,
  Calendar,
  Clock,
  AlertTriangle,
  PoundSterling,
  Download,
  Copy,
  ExternalLink,
  Loader2
} from "lucide-react";
import { useMarkInvoicePaid, useSendInvoice, useGenerateInvoicePdf } from "@/hooks/useFinance";
import { toast } from "sonner";
import type { Invoice } from "@/services/financeService";

interface ViewInvoiceSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  invoice: Invoice | null;
}

export function ViewInvoiceSheet({ open, onOpenChange, invoice }: ViewInvoiceSheetProps) {
  const markPaidMutation = useMarkInvoicePaid();
  const sendInvoiceMutation = useSendInvoice();
  const generatePdfMutation = useGenerateInvoicePdf();
  const [invoiceLink, setInvoiceLink] = useState<string | null>(null);

  if (!invoice) return null;

  const lineItems = Array.isArray(invoice.line_items) ? invoice.line_items : [];
  const isOverdue = invoice.status === "Overdue";
  const isPaid = invoice.status === "Paid";
  const isSent = invoice.status === "Sent" || invoice.status === "Pending";

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      "Draft": "bg-muted text-muted-foreground",
      "Pending": "bg-warning/20 text-warning",
      "Sent": "bg-blue-500/20 text-blue-400",
      "Paid": "bg-success/20 text-success",
      "Overdue": "bg-destructive/20 text-destructive"
    };
    return <Badge className={styles[status] || ""}>{status}</Badge>;
  };

  const handleMarkPaid = () => {
    markPaidMutation.mutate(invoice.id);
  };

  const handleSendInvoice = async () => {
    sendInvoiceMutation.mutate(invoice.id, {
      onSuccess: (data) => {
        if (data?.portalUrl) {
          setInvoiceLink(data.portalUrl);
        }
      }
    });
  };

  const handleCopyLink = async () => {
    if (invoiceLink) {
      await navigator.clipboard.writeText(invoiceLink);
      toast.success("Invoice link copied to clipboard");
    }
  };

  const handleDownloadPdf = () => {
    generatePdfMutation.mutate(invoice.id);
  };

  const daysUntilDue = invoice.due_date 
    ? Math.ceil((new Date(invoice.due_date).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
    : 0;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="h-[90vh] p-0 rounded-t-3xl">
        <div className="flex flex-col h-full">
          {/* Native drag indicator */}
          <div className="pt-2 pb-1 flex justify-center">
            <div className="w-10 h-1 rounded-full bg-muted-foreground/30" />
          </div>

          {/* Header */}
          <SheetHeader className="px-4 pb-4 border-b border-border">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  isOverdue ? 'bg-destructive/10' : isPaid ? 'bg-success/10' : 'bg-elec-yellow/10'
                }`}>
                  {isOverdue ? (
                    <AlertTriangle className="h-5 w-5 text-destructive" />
                  ) : isPaid ? (
                    <Check className="h-5 w-5 text-success" />
                  ) : (
                    <FileText className="h-5 w-5 text-elec-yellow" />
                  )}
                </div>
                <div>
                  <SheetTitle className="text-lg font-semibold">{invoice.invoice_number}</SheetTitle>
                  <p className="text-sm text-muted-foreground">{invoice.client}</p>
                </div>
              </div>
              {getStatusBadge(invoice.status)}
            </div>
          </SheetHeader>

          {/* Content */}
          <ScrollArea className="flex-1 px-4 py-4 pb-48">
            <div className="space-y-4">
              {/* Payment Status */}
              {!isPaid && (
                <Card className={`${isOverdue ? 'bg-destructive/10 border-destructive/20' : 'bg-warning/10 border-warning/20'}`}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className={`text-sm font-medium ${isOverdue ? 'text-destructive' : 'text-warning'}`}>
                        {isOverdue 
                          ? `${Math.abs(daysUntilDue)} days overdue` 
                          : daysUntilDue === 0 
                            ? 'Due today'
                            : `Due in ${daysUntilDue} days`}
                      </span>
                      <span className="text-lg font-bold">£{Number(invoice.amount).toLocaleString()}</span>
                    </div>
                    <Progress 
                      value={isPaid ? 100 : 0} 
                      className={`h-2 ${isOverdue ? 'bg-destructive/20' : 'bg-warning/20'}`}
                    />
                  </CardContent>
                </Card>
              )}

              {isPaid && (
                <Card className="bg-success/10 border-success/20">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Check className="h-5 w-5 text-success" />
                        <span className="font-medium text-success">Paid in Full</span>
                      </div>
                      <span className="text-lg font-bold text-success">£{Number(invoice.amount).toLocaleString()}</span>
                    </div>
                    {invoice.paid_date && (
                      <p className="text-sm text-muted-foreground mt-1">
                        Paid on {new Date(invoice.paid_date).toLocaleDateString('en-GB')}
                      </p>
                    )}
                  </CardContent>
                </Card>
              )}

              {/* Invoice Link (if generated) */}
              {invoiceLink && (
                <Card className="bg-blue-500/10 border-blue-500/20">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2 min-w-0">
                        <ExternalLink className="h-4 w-4 text-blue-400 shrink-0" />
                        <span className="text-sm text-blue-400 truncate">{invoiceLink}</span>
                      </div>
                      <Button variant="ghost" size="sm" onClick={handleCopyLink}>
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Details */}
              <Card className="bg-elec-gray">
                <CardContent className="p-4 space-y-3">
                  {invoice.project && (
                    <div>
                      <span className="text-sm text-muted-foreground">Project</span>
                      <p className="font-medium">{invoice.project}</p>
                    </div>
                  )}
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <span className="text-muted-foreground">Created</span>
                        <p className="font-medium">{new Date(invoice.created_at).toLocaleDateString('en-GB')}</p>
                      </div>
                    </div>
                    {invoice.due_date && (
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <span className="text-muted-foreground">Due Date</span>
                          <p className={`font-medium ${isOverdue ? 'text-destructive' : ''}`}>
                            {new Date(invoice.due_date).toLocaleDateString('en-GB')}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Line Items */}
              {lineItems.length > 0 && (
                <div className="space-y-2">
                  <h3 className="font-semibold text-sm">Line Items</h3>
                  <Card className="bg-elec-gray">
                    <CardContent className="p-0">
                      {lineItems.map((item: any, idx: number) => (
                        <div 
                          key={item.id || idx} 
                          className="flex justify-between items-center p-3 border-b border-border last:border-0"
                        >
                          <div className="min-w-0 flex-1">
                            <p className="font-medium text-sm truncate">{item.description}</p>
                            <p className="text-xs text-muted-foreground">
                              {item.quantity} {item.unit} × £{item.unitPrice?.toFixed(2)}
                            </p>
                          </div>
                          <span className="font-bold shrink-0">£{item.total?.toFixed(2)}</span>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* Total */}
              <Card className="bg-elec-yellow/10 border-elec-yellow/20">
                <CardContent className="p-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-medium">Total Amount</span>
                    <span className="text-2xl font-bold text-elec-yellow">£{Number(invoice.amount).toLocaleString()}</span>
                  </div>
                </CardContent>
              </Card>

              {/* Notes */}
              {invoice.notes && (
                <div className="space-y-2">
                  <h3 className="font-semibold text-sm">Payment Details / Notes</h3>
                  <Card className="bg-muted/30">
                    <CardContent className="p-3">
                      <p className="text-sm text-muted-foreground whitespace-pre-wrap">{invoice.notes}</p>
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* Quick Contact */}
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <Phone className="h-4 w-4 mr-2" />
                  Call Client
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <Mail className="h-4 w-4 mr-2" />
                  Email Client
                </Button>
              </div>
            </div>
          </ScrollArea>

          {/* Fixed Footer Actions */}
          <div className="absolute bottom-0 left-0 right-0 bg-background/95 backdrop-blur-sm border-t border-border">
            <div className="px-4 py-3 pb-safe space-y-2">
              {!isPaid && (
                <>
                  <Button onClick={handleMarkPaid} disabled={markPaidMutation.isPending} className="w-full h-12">
                    {markPaidMutation.isPending ? (
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    ) : (
                      <PoundSterling className="h-4 w-4 mr-2" />
                    )}
                    Mark as Paid
                  </Button>
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      variant="outline"
                      className="h-10"
                      onClick={handleSendInvoice}
                      disabled={sendInvoiceMutation.isPending}
                    >
                      {sendInvoiceMutation.isPending ? (
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      ) : (
                        <Send className="h-4 w-4 mr-2" />
                      )}
                      {isSent ? 'Resend' : 'Send Invoice'}
                    </Button>
                    <Button
                      variant="outline"
                      className="h-10"
                      onClick={handleDownloadPdf}
                      disabled={generatePdfMutation.isPending}
                    >
                      {generatePdfMutation.isPending ? (
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      ) : (
                        <Download className="h-4 w-4 mr-2" />
                      )}
                      Download PDF
                    </Button>
                  </div>
                </>
              )}
              {isPaid && (
                <Button
                  variant="outline"
                  className="w-full h-12"
                  onClick={handleDownloadPdf}
                  disabled={generatePdfMutation.isPending}
                >
                  {generatePdfMutation.isPending ? (
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  ) : (
                    <FileText className="h-4 w-4 mr-2" />
                  )}
                  Download / View PDF
                </Button>
              )}
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
