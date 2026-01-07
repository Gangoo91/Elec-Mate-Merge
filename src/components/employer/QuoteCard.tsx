import { FileText, Send, Clock, CheckCircle, XCircle, Mail, ChevronRight, UserCheck, AlertTriangle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { SwipeableRow } from "@/components/ui/swipeable-row";
import { getQuotePriorityBadge } from "@/utils/financeSorting";
import type { Quote } from "@/services/financeService";

interface QuoteCardProps {
  quote: Quote;
  onView: (quote: Quote) => void;
  onSend: (id: string) => void;
  isSending?: boolean;
}

const getStatusConfig = (status: string) => {
  const configs: Record<string, { icon: React.ReactNode; className: string; borderClass: string }> = {
    Draft: {
      icon: <FileText className="h-3.5 w-3.5" />,
      className: "bg-muted text-muted-foreground border-transparent",
      borderClass: "border-l-muted-foreground/50"
    },
    Sent: {
      icon: <Mail className="h-3.5 w-3.5" />,
      className: "bg-warning/15 text-warning border-warning/30",
      borderClass: "border-l-warning"
    },
    Approved: {
      icon: <CheckCircle className="h-3.5 w-3.5" />,
      className: "bg-success/15 text-success border-success/30",
      borderClass: "border-l-success"
    },
    "Client Accepted": {
      icon: <UserCheck className="h-3.5 w-3.5" />,
      className: "bg-success/15 text-success border-success/30",
      borderClass: "border-l-success"
    },
    "Client Declined": {
      icon: <XCircle className="h-3.5 w-3.5" />,
      className: "bg-destructive/15 text-destructive border-destructive/30",
      borderClass: "border-l-destructive"
    },
    Rejected: {
      icon: <XCircle className="h-3.5 w-3.5" />,
      className: "bg-destructive/15 text-destructive border-destructive/30",
      borderClass: "border-l-destructive"
    },
  };
  return configs[status] || configs.Draft;
};

export function QuoteCard({ quote, onView, onSend, isSending }: QuoteCardProps) {
  const statusConfig = getStatusConfig(quote.status);
  const lineItems = Array.isArray(quote.line_items) ? quote.line_items : [];
  const itemCount = lineItems.length;
  const priorityBadge = getQuotePriorityBadge(quote);

  // Calculate days until expiry
  const daysLeft = quote.valid_until
    ? Math.ceil((new Date(quote.valid_until).getTime() - Date.now()) / (1000 * 60 * 60 * 24))
    : null;
  const isExpired = daysLeft !== null && daysLeft < 0;
  const isExpiringSoon = daysLeft !== null && daysLeft >= 0 && daysLeft <= 7;

  // Swipe actions
  const leftAction = {
    icon: <ChevronRight className="h-5 w-5" />,
    label: "View",
    onClick: () => onView(quote)
  };

  const rightAction = quote.status === "Draft"
    ? { icon: <Send className="h-5 w-5" />, label: "Send", onClick: () => onSend(quote.id), variant: "success" as const }
    : undefined;

  // Format value
  const formattedValue = Number(quote.value).toLocaleString("en-GB", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });

  // Check if needs attention
  const needsAttention = quote.status === "Client Declined" || (isExpiringSoon && quote.status === "Sent");

  return (
    <SwipeableRow leftAction={leftAction} rightAction={rightAction}>
      <div
        className={cn(
          "bg-card border border-l-4 rounded-2xl overflow-hidden transition-all",
          "active:scale-[0.98] active:bg-accent/30",
          statusConfig.borderClass,
          needsAttention && "ring-2 ring-warning/30"
        )}
        onClick={() => onView(quote)}
      >
        {/* Priority Banner - only show for actionable items */}
        {priorityBadge && (priorityBadge.variant === "destructive" || priorityBadge.variant === "warning") && (
          <div className={cn(
            "px-4 py-2 text-xs font-medium flex items-center gap-2",
            priorityBadge.variant === "destructive" && "bg-destructive/10 text-destructive",
            priorityBadge.variant === "warning" && "bg-warning/10 text-warning"
          )}>
            <AlertTriangle className="h-3.5 w-3.5" />
            {priorityBadge.label}
          </div>
        )}

        <div className="p-4">
          {/* Top Row - Status & Value */}
          <div className="flex items-start justify-between gap-4 mb-3">
            <Badge
              variant="outline"
              className={cn(
                "gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg",
                statusConfig.className
              )}
            >
              {statusConfig.icon}
              {quote.status}
            </Badge>
            <span className="text-2xl font-bold text-primary tabular-nums tracking-tight">
              £{formattedValue}
            </span>
          </div>

          {/* Quote Number */}
          <div className="mb-2">
            <span className="inline-block font-mono text-[11px] text-muted-foreground bg-muted/60 px-2 py-1 rounded-md">
              {quote.quote_number}
            </span>
          </div>

          {/* Client & Description */}
          <div className="space-y-1 mb-4">
            <h3 className="text-lg font-semibold text-foreground leading-tight">
              {quote.client}
            </h3>
            {(quote.job_title || quote.description) && (
              <p className="text-sm text-muted-foreground line-clamp-1">
                {quote.job_title || quote.description}
              </p>
            )}
          </div>

          {/* Footer - Meta Info */}
          <div className="flex items-center justify-between pt-3 border-t border-border/40">
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              {itemCount > 0 && (
                <span className="flex items-center gap-1">
                  <span className="font-medium text-foreground">{itemCount}</span>
                  {itemCount === 1 ? "item" : "items"}
                </span>
              )}
              {quote.sent_date && (
                <span className="flex items-center gap-1.5">
                  <Send className="h-3.5 w-3.5" />
                  {new Date(quote.sent_date).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}
                </span>
              )}
              {quote.valid_until && (
                <span className={cn(
                  "flex items-center gap-1.5",
                  isExpired && "text-destructive font-medium",
                  isExpiringSoon && !isExpired && "text-warning font-medium"
                )}>
                  <Clock className="h-3.5 w-3.5" />
                  {isExpired
                    ? "Expired"
                    : isExpiringSoon
                      ? `${daysLeft}d left`
                      : new Date(quote.valid_until).toLocaleDateString("en-GB", { day: "numeric", month: "short" })
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
