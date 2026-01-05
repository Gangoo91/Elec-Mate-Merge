import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MobileButton } from "@/components/ui/mobile-button";
import { Badge } from "@/components/ui/badge";
import { FileText, Send, Edit, Eye, Bell, AlertCircle } from "lucide-react";
import { Quote } from "@/types/quote";
import { useNavigate } from "react-router-dom";
import { format, isPast } from "date-fns";

interface InvoicesDashboardCardProps {
  invoices: Quote[];
}

export const InvoicesDashboardCard = ({ invoices }: InvoicesDashboardCardProps) => {
  const navigate = useNavigate();

  // Filter for invoices needing action (exclude paid)
  const activeInvoices = invoices.filter(
    (invoice) => invoice.invoice_status !== "paid"
  );

  // Sort by priority: overdue > sent > draft
  const sortedInvoices = [...activeInvoices].sort((a, b) => {
    const aOverdue = a.invoice_due_date && isPast(new Date(a.invoice_due_date));
    const bOverdue = b.invoice_due_date && isPast(new Date(b.invoice_due_date));
    
    if (aOverdue && !bOverdue) return -1;
    if (!aOverdue && bOverdue) return 1;
    
    const statusOrder = { overdue: 0, sent: 1, draft: 2 };
    return (statusOrder[a.invoice_status as keyof typeof statusOrder] || 3) - 
           (statusOrder[b.invoice_status as keyof typeof statusOrder] || 3);
  });

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

  const handleInvoiceAction = (invoice: Quote) => {
    // Navigate to invoice quote builder for editing
    navigate(`/electrician/invoice-quote-builder/${invoice.id}`);
  };

  const getActionButton = (invoice: Quote) => {
    const isOverdue = invoice.invoice_due_date && isPast(new Date(invoice.invoice_due_date));
    const status = invoice.invoice_status;

    if (isOverdue || status === "overdue") {
      return {
        text: "Send Reminder",
        icon: <Bell className="h-4 w-4" />,
        className: "bg-red-600 hover:bg-red-700 text-foreground border-red-600 font-medium",
        ariaLabel: `Send payment reminder for invoice ${invoice.invoice_number}`,
      };
    }

    if (status === "sent") {
      return {
        text: "View Invoice",
        icon: <Eye className="h-4 w-4" />,
        className: "bg-blue-600 hover:bg-blue-700 text-foreground border-blue-600 font-medium",
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

  if (sortedInvoices.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Completed Invoices
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-center py-4">
            No invoices require action
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Completed Invoices ({sortedInvoices.length})
        </CardTitle>
      </CardHeader>
      <CardContent className="mobile-card-spacing">
        {sortedInvoices.map((invoice) => {
          const actionButton = getActionButton(invoice);
          
          return (
            <div
              key={invoice.id}
              className="mobile-card border border-elec-yellow/20 rounded-lg mobile-interactive overflow-hidden"
            >
              {/* Mobile-First Layout with contained overflow */}
              <div className="space-y-4 min-w-0 w-full">
                {/* Header Section - Invoice Info */}
                <div className="flex flex-col space-y-2 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 min-w-0">
                    <h4 className="mobile-heading text-lg font-semibold truncate min-w-0 flex-1">
                      Invoice #{invoice.invoice_number || invoice.quoteNumber}
                    </h4>
                    <div className="flex-shrink-0">
                      {getStatusBadge(invoice)}
                    </div>
                  </div>
                  <div className="space-y-1">
                    <p className="mobile-text text-muted-foreground truncate min-w-0">
                      Client: {invoice.client?.name || 'N/A'}
                    </p>
                    {invoice.invoice_due_date && (
                      <p className="mobile-text text-sm text-muted-foreground truncate min-w-0">
                        Due: {format(new Date(invoice.invoice_due_date), "dd MMM yyyy")}
                      </p>
                    )}
                  </div>
                </div>

                {/* Amount Section - Prominent Display */}
                <div className="py-2">
                  <p className="text-2xl sm:text-3xl font-bold text-primary">
                    {formatCurrency(invoice.total)}
                  </p>
                </div>

                {/* Action Button - Fully Contained Layout */}
                <div className="w-full">
                  {/* Mobile: Full-width button */}
                  <div className="flex sm:hidden w-full">
                    <MobileButton
                      size="default"
                      variant="elec"
                      onClick={() => handleInvoiceAction(invoice)}
                      icon={actionButton.icon}
                      className={`w-full touch-target ${actionButton.className} min-w-0`}
                      aria-label={actionButton.ariaLabel}
                    >
                      <span className="truncate">{actionButton.text}</span>
                    </MobileButton>
                  </div>

                  {/* Desktop/Tablet: Compact button aligned right */}
                  <div className="hidden sm:flex justify-end w-full max-w-full">
                    <MobileButton
                      size="sm"
                      variant="elec"
                      onClick={() => handleInvoiceAction(invoice)}
                      icon={actionButton.icon}
                      className={`${actionButton.className} px-3 py-2 flex-shrink-0`}
                      aria-label={actionButton.ariaLabel}
                    >
                      {actionButton.text}
                    </MobileButton>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};
