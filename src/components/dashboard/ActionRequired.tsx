import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, Clock, FileText, CheckCircle2, ChevronRight } from "lucide-react";
import { useQuoteStorage } from "@/hooks/useQuoteStorage";
import { useInvoiceStorage } from "@/hooks/useInvoiceStorage";
import { useNavigate } from "react-router-dom";
import { differenceInDays, isPast } from "date-fns";

interface ActionItemProps {
  type: "urgent" | "warning" | "info";
  title: string;
  description: string;
  action: string;
  onAction: () => void;
}

function ActionItem({ type, title, description, action, onAction }: ActionItemProps) {
  const colors = {
    urgent: {
      border: "border-l-red-500",
      icon: "text-red-400",
    },
    warning: {
      border: "border-l-amber-500",
      icon: "text-amber-400",
    },
    info: {
      border: "border-l-blue-500",
      icon: "text-blue-400",
    }
  };

  const style = colors[type];

  return (
    <button
      onClick={onAction}
      className={`
        w-full flex items-center gap-3 p-4 min-h-[56px]
        bg-white/5 border-l-4 ${style.border} rounded-lg
        active:bg-white/10
        transition-colors duration-150 text-left
        touch-manipulation
      `}
    >
      <div className={`${style.icon} flex-shrink-0`}>
        {type === "urgent" ? <AlertCircle className="h-5 w-5" /> :
         type === "warning" ? <Clock className="h-5 w-5" /> :
         <FileText className="h-5 w-5" />}
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-white truncate">{title}</p>
        <p className="text-xs text-white/50 truncate">{description}</p>
      </div>

      <ChevronRight className="h-5 w-5 text-white/30 flex-shrink-0" />
    </button>
  );
}

export function ActionRequired() {
  const navigate = useNavigate();
  const { savedQuotes } = useQuoteStorage();
  const { invoices } = useInvoiceStorage();

  const actionItems: ActionItemProps[] = [];

  const overdueInvoices = invoices?.filter(inv => {
    if (!inv.due_date || inv.invoice_status === "paid") return false;
    return isPast(new Date(inv.due_date));
  }) || [];

  overdueInvoices.slice(0, 2).forEach(inv => {
    const daysOverdue = differenceInDays(new Date(), new Date(inv.due_date!));
    actionItems.push({
      type: "urgent",
      title: `Invoice #${inv.invoice_number || inv.id?.slice(0, 6)}`,
      description: `${daysOverdue}d overdue · ${inv.client_name || "Client"}`,
      action: "View",
      onAction: () => navigate(`/electrician/invoices/${inv.id}`)
    });
  });

  const pendingQuotes = savedQuotes?.filter(q =>
    q.status === "sent" && q.acceptance_status === "pending"
  ) || [];

  pendingQuotes.slice(0, 2).forEach(quote => {
    actionItems.push({
      type: "warning",
      title: `Quote #${quote.quote_number || quote.id?.slice(0, 6)}`,
      description: `£${quote.total?.toLocaleString() || 0} · ${quote.client_name || "Client"}`,
      action: "Follow Up",
      onAction: () => navigate(`/electrician/quotes/${quote.id}`)
    });
  });

  if (actionItems.length === 0) {
    return (
      <div className="flex items-center gap-3 p-4 bg-white/5 rounded-xl">
        <CheckCircle2 className="h-5 w-5 text-green-400 flex-shrink-0" />
        <div className="min-w-0">
          <p className="text-sm font-medium text-white">All Clear</p>
          <p className="text-xs text-white/50">No urgent actions required</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <AlertCircle className="h-4 w-4 text-amber-400" />
          <span className="text-sm font-semibold text-white">Action Required</span>
        </div>
        <Badge className="bg-amber-500/15 text-amber-400 border-0 text-xs font-semibold px-2 py-0.5">
          {actionItems.length}
        </Badge>
      </div>

      {/* Action Items */}
      <div className="space-y-2">
        {actionItems.slice(0, 4).map((item, index) => (
          <ActionItem key={index} {...item} />
        ))}
        {actionItems.length > 4 && (
          <Button
            variant="ghost"
            className="w-full text-elec-yellow hover:text-black hover:bg-elec-yellow text-xs h-11 touch-manipulation"
            onClick={() => navigate("/electrician/quotes")}
          >
            View All ({actionItems.length - 4} more)
          </Button>
        )}
      </div>
    </div>
  );
}
