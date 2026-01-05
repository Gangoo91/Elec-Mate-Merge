import { FileText, Send, Clock, CheckCircle, XCircle, Mail, ChevronRight, UserCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { SwipeableRow } from "@/components/ui/swipeable-row";
import type { Quote } from "@/services/financeService";

interface QuoteCardProps {
  quote: Quote;
  onView: (quote: Quote) => void;
  onSend: (id: string) => void;
  isSending?: boolean;
}

const getStatusBorderColour = (status: string): string => {
  switch (status) {
    case "Draft":
      return "border-l-muted-foreground/50";
    case "Sent":
      return "border-l-warning";
    case "Approved":
    case "Client Accepted":
      return "border-l-success";
    case "Rejected":
      return "border-l-destructive";
    default:
      return "border-l-muted-foreground/50";
  }
};

const statusConfig: Record<string, { icon: React.ReactNode; className: string }> = {
  Draft: { icon: <FileText className="h-3 w-3" />, className: "bg-muted text-muted-foreground border-transparent" },
  Sent: { icon: <Mail className="h-3 w-3" />, className: "bg-warning/15 text-warning border-warning/30" },
  Approved: { icon: <CheckCircle className="h-3 w-3" />, className: "bg-success/15 text-success border-success/30" },
  "Client Accepted": { icon: <UserCheck className="h-3 w-3" />, className: "bg-success/15 text-success border-success/30" },
  Rejected: { icon: <XCircle className="h-3 w-3" />, className: "bg-destructive/15 text-destructive border-destructive/30" },
};

export function QuoteCard({ quote, onView, onSend, isSending }: QuoteCardProps) {
  const config = statusConfig[quote.status] || statusConfig.Draft;
  const lineItems = Array.isArray(quote.line_items) ? quote.line_items : [];
  const itemCount = lineItems.length;
  
  // Calculate days until expiry
  const daysLeft = quote.valid_until 
    ? Math.ceil((new Date(quote.valid_until).getTime() - Date.now()) / (1000 * 60 * 60 * 24))
    : null;
  const isExpired = daysLeft !== null && daysLeft < 0;
  const isExpiringSoon = daysLeft !== null && daysLeft >= 0 && daysLeft <= 7;

  const leftAction = {
    icon: <ChevronRight className="h-5 w-5" />,
    label: "View",
    onClick: () => onView(quote)
  };

  const rightAction = quote.status === "Draft" 
    ? { icon: <Send className="h-5 w-5" />, label: "Send", onClick: () => onSend(quote.id), variant: "success" as const }
    : undefined;

  // Format value with exactly 2 decimal places
  const formattedValue = Number(quote.value).toLocaleString("en-GB", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });

  return (
    <SwipeableRow leftAction={leftAction} rightAction={rightAction}>
      <div 
        className={cn(
          "bg-elec-gray border border-l-4 rounded-xl p-4 active:bg-accent/50 transition-all touch-feedback",
          getStatusBorderColour(quote.status)
        )}
        onClick={() => onView(quote)}
      >
        {/* Top Row - Status & Value */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <Badge 
            variant="outline" 
            className={cn("gap-1.5 px-2.5 py-1 text-xs font-medium", config.className)}
          >
            {config.icon}
            {quote.status}
          </Badge>
          <span className="text-xl font-bold text-elec-yellow tabular-nums">
            £{formattedValue}
          </span>
        </div>

        {/* Middle - Quote Number & Client */}
        <div className="space-y-1.5 mb-3">
          <span className="inline-block font-mono text-[11px] text-muted-foreground bg-muted/50 px-1.5 py-0.5 rounded">
            {quote.quote_number}
          </span>
          <h3 className="text-base font-semibold text-foreground truncate">
            {quote.client}
          </h3>
          {quote.description && (
            <p className="text-sm text-muted-foreground truncate">{quote.description}</p>
          )}
        </div>

        {/* Footer - Meta Info */}
        <div className="flex items-center justify-between pt-3 border-t border-border/50">
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            {itemCount > 0 && (
              <span>{itemCount} item{itemCount > 1 ? "s" : ""}</span>
            )}
            {quote.sent_date && (
              <span className="flex items-center gap-1">
                <Send className="h-3 w-3" />
                {new Date(quote.sent_date).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}
              </span>
            )}
            {quote.valid_until && (
              <span className={cn(
                "flex items-center gap-1",
                isExpired && "text-destructive font-medium",
                isExpiringSoon && !isExpired && "text-warning font-medium"
              )}>
                <Clock className="h-3 w-3" />
                {isExpired 
                  ? "Expired" 
                  : isExpiringSoon 
                    ? `${daysLeft}d left`
                    : new Date(quote.valid_until).toLocaleDateString("en-GB", { day: "numeric", month: "short" })
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
