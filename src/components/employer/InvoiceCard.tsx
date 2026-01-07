import { Receipt, Check, AlertTriangle, Clock, CheckCircle, ChevronRight, FileText } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { SwipeableRow } from "@/components/ui/swipeable-row";
import { getInvoicePriorityBadge } from "@/utils/financeSorting";
import type { Invoice } from "@/services/financeService";

interface InvoiceCardProps {
  invoice: Invoice;
  onView: (invoice: Invoice) => void;
  onMarkPaid: (id: string) => void;
  isMarkingPaid?: boolean;
}

const getStatusConfig = (status: string, isOverdue: boolean) => {
  const configs: Record<string, { icon: React.ReactNode; className: string; borderClass: string }> = {
    Draft: {
      icon: <FileText className="h-3.5 w-3.5" />,
      className: "bg-muted text-muted-foreground border-transparent",
      borderClass: "border-l-muted-foreground/50"
    },
    Pending: {
      icon: <Clock className="h-3.5 w-3.5" />,
      className: "bg-warning/15 text-warning border-warning/30",
      borderClass: "border-l-warning"
    },
    Sent: {
      icon: <Receipt className="h-3.5 w-3.5" />,
      className: "bg-blue-500/15 text-blue-500 border-blue-500/30",
      borderClass: "border-l-blue-500"
    },
    Paid: {
      icon: <CheckCircle className="h-3.5 w-3.5" />,
      className: "bg-success/15 text-success border-success/30",
      borderClass: "border-l-success"
    },
    Overdue: {
      icon: <AlertTriangle className="h-3.5 w-3.5" />,
      className: "bg-destructive/15 text-destructive border-destructive/30",
      borderClass: "border-l-destructive"
    },
  };

  // Override for overdue invoices
  if (isOverdue && status !== "Paid") {
    return configs.Overdue;
  }

  return configs[status] || configs.Pending;
};

export function InvoiceCard({ invoice, onView, onMarkPaid, isMarkingPaid }: InvoiceCardProps) {
  // Calculate days overdue or until due
  const daysUntilDue = invoice.due_date
    ? Math.ceil((new Date(invoice.due_date).getTime() - Date.now()) / (1000 * 60 * 60 * 24))
    : null;
  const isOverdue = daysUntilDue !== null && daysUntilDue < 0 && invoice.status !== "Paid";
  const isDueSoon = daysUntilDue !== null && daysUntilDue >= 0 && daysUntilDue <= 7;

  const statusConfig = getStatusConfig(invoice.status, isOverdue);
  const priorityBadge = getInvoicePriorityBadge(invoice);

  // Swipe actions
  const leftAction = {
    icon: <ChevronRight className="h-5 w-5" />,
    label: "View",
    onClick: () => onView(invoice)
  };

  const rightAction = (invoice.status === "Pending" || invoice.status === "Sent" || invoice.status === "Overdue" || isOverdue)
    ? { icon: <Check className="h-5 w-5" />, label: "Paid", onClick: () => onMarkPaid(invoice.id), variant: "success" as const }
    : undefined;

  // Format amount
  const formattedAmount = Number(invoice.amount).toLocaleString("en-GB", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });

  // Determine display status
  const displayStatus = isOverdue && invoice.status !== "Paid" ? "Overdue" : invoice.status;

  return (
    <SwipeableRow leftAction={leftAction} rightAction={rightAction}>
      <div
        className={cn(
          "bg-card border border-l-4 rounded-2xl overflow-hidden transition-all",
          "active:scale-[0.98] active:bg-accent/30",
          statusConfig.borderClass,
          isOverdue && invoice.status !== "Paid" && "ring-2 ring-destructive/30"
        )}
        onClick={() => onView(invoice)}
      >
        {/* Priority Banner - show for overdue or due soon */}
        {priorityBadge && priorityBadge.urgent && (
          <div className="px-4 py-2 bg-destructive/10 text-destructive text-xs font-medium flex items-center gap-2">
            <AlertTriangle className="h-3.5 w-3.5" />
            {priorityBadge.label} - Action Required
          </div>
        )}

        <div className="p-4">
          {/* Top Row - Status & Amount */}
          <div className="flex items-start justify-between gap-4 mb-3">
            <Badge
              variant="outline"
              className={cn(
                "gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg",
                statusConfig.className
              )}
            >
              {statusConfig.icon}
              {displayStatus}
            </Badge>
            <span className={cn(
              "text-2xl font-bold tabular-nums tracking-tight",
              invoice.status === "Paid" ? "text-success" : isOverdue ? "text-destructive" : "text-primary"
            )}>
              £{formattedAmount}
            </span>
          </div>

          {/* Invoice Number */}
          <div className="mb-2">
            <span className="inline-block font-mono text-[11px] text-muted-foreground bg-muted/60 px-2 py-1 rounded-md">
              {invoice.invoice_number}
            </span>
          </div>

          {/* Client & Project */}
          <div className="space-y-1 mb-4">
            <h3 className="text-lg font-semibold text-foreground leading-tight">
              {invoice.client}
            </h3>
            {invoice.project && (
              <p className="text-sm text-muted-foreground line-clamp-1">
                {invoice.project}
              </p>
            )}
          </div>

          {/* Footer - Due/Paid Info */}
          <div className="flex items-center justify-between pt-3 border-t border-border/40">
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              {invoice.paid_date ? (
                <span className="flex items-center gap-1.5 text-success font-medium">
                  <CheckCircle className="h-3.5 w-3.5" />
                  Paid {new Date(invoice.paid_date).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}
                </span>
              ) : invoice.due_date && (
                <span className={cn(
                  "flex items-center gap-1.5",
                  isOverdue && "text-destructive font-semibold",
                  isDueSoon && !isOverdue && "text-warning font-medium"
                )}>
                  <Clock className="h-3.5 w-3.5" />
                  {isOverdue
                    ? `${Math.abs(daysUntilDue!)}d overdue`
                    : isDueSoon
                      ? `Due in ${daysUntilDue}d`
                      : `Due ${new Date(invoice.due_date).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}`
                  }
                </span>
              )}
            </div>
            <div className="flex items-center gap-1 text-muted-foreground/60">
              <span className="text-xs">View</span>
              <ChevronRight className="h-4 w-4" />
            </div>
          </div>
        </div>
      </div>
    </SwipeableRow>
  );
}
