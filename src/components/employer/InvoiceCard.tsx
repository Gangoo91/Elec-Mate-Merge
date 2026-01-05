import { Receipt, Check, AlertTriangle, Clock, CheckCircle, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { SwipeableRow } from "@/components/ui/swipeable-row";
import type { Invoice } from "@/services/financeService";

interface InvoiceCardProps {
  invoice: Invoice;
  onView: (invoice: Invoice) => void;
  onMarkPaid: (id: string) => void;
  isMarkingPaid?: boolean;
}

const getStatusBorderColour = (status: string, isOverdue: boolean): string => {
  if (isOverdue && status !== "Paid") return "border-l-destructive";
  switch (status) {
    case "Draft":
      return "border-l-muted-foreground/50";
    case "Pending":
      return "border-l-warning";
    case "Paid":
      return "border-l-success";
    case "Overdue":
      return "border-l-destructive";
    default:
      return "border-l-muted-foreground/50";
  }
};

const statusConfig: Record<string, { icon: React.ReactNode; className: string }> = {
  Draft: { icon: <Receipt className="h-3 w-3" />, className: "bg-muted text-muted-foreground border-transparent" },
  Pending: { icon: <Clock className="h-3 w-3" />, className: "bg-warning/15 text-warning border-warning/30" },
  Paid: { icon: <CheckCircle className="h-3 w-3" />, className: "bg-success/15 text-success border-success/30" },
  Overdue: { icon: <AlertTriangle className="h-3 w-3" />, className: "bg-destructive/15 text-destructive border-destructive/30" },
};

export function InvoiceCard({ invoice, onView, onMarkPaid, isMarkingPaid }: InvoiceCardProps) {
  const config = statusConfig[invoice.status] || statusConfig.Pending;
  
  // Calculate days overdue or until due
  const daysUntilDue = invoice.due_date 
    ? Math.ceil((new Date(invoice.due_date).getTime() - Date.now()) / (1000 * 60 * 60 * 24))
    : null;
  const isOverdue = daysUntilDue !== null && daysUntilDue < 0 && invoice.status !== "Paid";
  const isDueSoon = daysUntilDue !== null && daysUntilDue >= 0 && daysUntilDue <= 7;

  const leftAction = {
    icon: <ChevronRight className="h-5 w-5" />,
    label: "View",
    onClick: () => onView(invoice)
  };

  const rightAction = (invoice.status === "Pending" || invoice.status === "Overdue" || isOverdue)
    ? { icon: <Check className="h-5 w-5" />, label: "Paid", onClick: () => onMarkPaid(invoice.id), variant: "success" as const }
    : undefined;

  // Format amount with exactly 2 decimal places
  const formattedAmount = Number(invoice.amount).toLocaleString("en-GB", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });

  // Determine display status (show Overdue if past due even if status is Pending)
  const displayStatus = isOverdue && invoice.status === "Pending" ? "Overdue" : invoice.status;
  const displayConfig = statusConfig[displayStatus] || config;

  return (
    <SwipeableRow leftAction={leftAction} rightAction={rightAction}>
      <div 
        className={cn(
          "bg-elec-gray border border-l-4 rounded-xl p-4 active:bg-accent/50 transition-all touch-feedback",
          getStatusBorderColour(invoice.status, isOverdue),
          isOverdue && invoice.status !== "Paid" && "bg-destructive/5"
        )}
        onClick={() => onView(invoice)}
      >
        {/* Top Row - Status & Amount */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <Badge 
            variant="outline" 
            className={cn("gap-1.5 px-2.5 py-1 text-xs font-medium", displayConfig.className)}
          >
            {displayConfig.icon}
            {displayStatus}
          </Badge>
          <span className={cn(
            "text-xl font-bold tabular-nums",
            invoice.status === "Paid" ? "text-success" : isOverdue ? "text-destructive" : "text-foreground"
          )}>
            £{formattedAmount}
          </span>
        </div>

        {/* Middle - Invoice Number & Client */}
        <div className="space-y-1.5 mb-3">
          <span className="inline-block font-mono text-[11px] text-muted-foreground bg-muted/50 px-1.5 py-0.5 rounded">
            {invoice.invoice_number}
          </span>
          <h3 className="text-base font-semibold text-foreground truncate">
            {invoice.client}
          </h3>
          {invoice.project && (
            <p className="text-sm text-muted-foreground truncate">{invoice.project}</p>
          )}
        </div>

        {/* Footer - Due/Paid Info */}
        <div className="flex items-center justify-between pt-3 border-t border-border/50">
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            {invoice.paid_date ? (
              <span className="flex items-center gap-1 text-success font-medium">
                <CheckCircle className="h-3 w-3" />
                Paid {new Date(invoice.paid_date).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}
              </span>
            ) : invoice.due_date && (
              <span className={cn(
                "flex items-center gap-1",
                isOverdue && "text-destructive font-medium",
                isDueSoon && !isOverdue && "text-warning font-medium"
              )}>
                <Clock className="h-3 w-3" />
                {isOverdue 
                  ? `${Math.abs(daysUntilDue!)}d overdue`
                  : isDueSoon 
                    ? `Due in ${daysUntilDue}d`
                    : `Due ${new Date(invoice.due_date).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}`
                }
              </span>
            )}
          </div>
          <ChevronRight className="h-4 w-4 text-muted-foreground/50" />
        </div>
      </div>
    </SwipeableRow>
  );
}
