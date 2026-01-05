import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
      border: "border-red-500/20",
      icon: "text-red-500",
      iconBg: "bg-red-500/20"
    },
    warning: {
      bg: "bg-amber-500/10",
      border: "border-amber-500/20",
      icon: "text-amber-500",
      iconBg: "bg-amber-500/20"
    },
    info: {
      bg: "bg-blue-500/10",
      border: "border-blue-500/20",
      icon: "text-blue-500",
      iconBg: "bg-blue-500/20"
    }
  };

  const style = colors[type];

  return (
    <button
      onClick={onAction}
      className={`
        w-full flex items-center gap-3 p-3 sm:p-4 rounded-lg
        ${style.bg} border ${style.border}
        hover:bg-opacity-80 active:scale-[0.99]
        transition-all duration-200 text-left
      `}
    >
      {/* Icon */}
      <div className={`p-2 rounded-full ${style.iconBg} ${style.icon} flex-shrink-0`}>
        {type === "urgent" ? <AlertCircle className="h-4 w-4 sm:h-5 sm:w-5" /> :
         type === "warning" ? <Clock className="h-4 w-4 sm:h-5 sm:w-5" /> :
         <FileText className="h-4 w-4 sm:h-5 sm:w-5" />}
      </div>

      {/* Content */}
      <div className="flex-grow min-w-0">
        <p className="text-sm sm:text-base font-medium text-foreground truncate">{title}</p>
        <p className="text-xs sm:text-sm text-gray-400 truncate">{description}</p>
      </div>

      {/* Action arrow */}
      <div className="flex-shrink-0 flex items-center gap-1 text-elec-yellow">
        <span className="text-xs sm:text-sm font-medium hidden sm:inline">{action}</span>
        <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
      </div>
    </button>
  );
}

export function ActionRequired() {
  const navigate = useNavigate();
  const { savedQuotes } = useQuoteStorage();
  const { invoices } = useInvoiceStorage();

  const actionItems: ActionItemProps[] = [];

  // Check for overdue invoices
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

  // Check for pending quotes needing response
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

  // If no action items, show all clear
  if (actionItems.length === 0) {
    return (
      <Card className="bg-elec-gray/50 border-elec-yellow/10">
        <CardContent className="p-4 sm:p-6">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="p-2.5 sm:p-3 rounded-full bg-green-500/10 flex-shrink-0">
              <CheckCircle2 className="h-5 w-5 sm:h-6 sm:w-6 text-green-500" />
            </div>
            <div className="min-w-0">
              <p className="text-sm sm:text-base font-medium text-foreground">All Clear</p>
              <p className="text-xs sm:text-sm text-gray-400">No urgent actions required</p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-elec-gray/50 border-elec-yellow/10">
      <CardHeader className="p-4 pb-2 sm:p-6 sm:pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base sm:text-lg font-semibold text-foreground flex items-center gap-2">
            <AlertCircle className="h-4 w-4 sm:h-5 sm:w-5 text-elec-yellow flex-shrink-0" />
            <span className="truncate">Action Required</span>
          </CardTitle>
          <Badge variant="outline" className="bg-red-500/10 text-red-400 border-red-500/20 text-xs flex-shrink-0">
            {actionItems.length}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-2 sm:p-6 sm:pt-0 space-y-2 sm:space-y-3">
        {actionItems.slice(0, 4).map((item, index) => (
          <ActionItem key={index} {...item} />
        ))}
        {actionItems.length > 4 && (
          <Button
            variant="ghost"
            className="w-full text-elec-yellow hover:text-elec-dark hover:bg-elec-yellow text-sm"
            onClick={() => navigate("/electrician/quotes")}
          >
            View All ({actionItems.length - 4} more)
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
