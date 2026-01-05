import { Card } from "@/components/ui/card";
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
      bg: "bg-red-500/10",
      border: "border-red-500/30",
      icon: "text-red-400",
      iconBg: "bg-red-500/15"
    },
    warning: {
      bg: "bg-amber-500/10",
      border: "border-amber-500/30",
      icon: "text-amber-400",
      iconBg: "bg-amber-500/15"
    },
    info: {
      bg: "bg-blue-500/10",
      border: "border-blue-500/30",
      icon: "text-blue-400",
      iconBg: "bg-blue-500/15"
    }
  };

  const style = colors[type];

  return (
    <button
      onClick={onAction}
      className={`
        w-full flex items-center gap-3 p-3 rounded-xl
        ${style.bg} border ${style.border}
        hover:opacity-90 active:scale-[0.99]
        transition-all duration-150 text-left
        touch-manipulation
      `}
    >
      <div className={`p-2 rounded-lg ${style.iconBg} ${style.icon} flex-shrink-0`}>
        {type === "urgent" ? <AlertCircle className="h-4 w-4" /> :
         type === "warning" ? <Clock className="h-4 w-4" /> :
         <FileText className="h-4 w-4" />}
      </div>

      <div className="flex-grow min-w-0">
        <p className="text-sm font-medium text-white truncate">{title}</p>
        <p className="text-xs text-white/50 truncate">{description}</p>
      </div>

      <div className="flex-shrink-0 flex items-center gap-1 text-elec-yellow">
        <span className="text-xs font-medium hidden sm:inline">{action}</span>
        <ChevronRight className="h-4 w-4" />
      </div>
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
      <Card className="p-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-green-500/10 border border-green-500/20 flex-shrink-0">
            <CheckCircle2 className="h-5 w-5 text-green-400" />
          </div>
          <div className="min-w-0">
            <p className="text-sm font-medium text-white">All Clear</p>
            <p className="text-xs text-white/50">No urgent actions required</p>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card>
      <div className="p-4 pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-elec-yellow/10 border border-elec-yellow/20">
              <AlertCircle className="h-4 w-4 text-elec-yellow" />
            </div>
            <span className="text-sm font-semibold text-white">Action Required</span>
          </div>
          <Badge className="bg-red-500/15 text-red-400 border border-red-500/30 text-[10px] font-semibold px-1.5 py-0.5">
            {actionItems.length}
          </Badge>
        </div>
      </div>
      <div className="px-4 pb-4 space-y-2">
        {actionItems.slice(0, 4).map((item, index) => (
          <ActionItem key={index} {...item} />
        ))}
        {actionItems.length > 4 && (
          <Button
            variant="ghost"
            className="w-full text-elec-yellow hover:text-black hover:bg-elec-yellow text-xs h-9"
            onClick={() => navigate("/electrician/quotes")}
          >
            View All ({actionItems.length - 4} more)
          </Button>
        )}
      </div>
    </Card>
  );
}
