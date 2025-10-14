import { Quote } from "@/types/quote";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Receipt, User, Calendar, ArrowRight, FileText, Eye } from "lucide-react";
import { format, isPast } from "date-fns";
import { useNavigate } from "react-router-dom";

interface LinkedInvoicesPanelProps {
  invoices: Quote[];
}

export const LinkedInvoicesPanel = ({ invoices }: LinkedInvoicesPanelProps) => {
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
        <Badge variant="destructive" className="text-xs">
          Overdue
        </Badge>
      );
    }

    if (status === "sent") {
      return (
        <Badge variant="secondary" className="text-xs bg-blue-600/20 text-blue-300 border-blue-600/30">
          Sent
        </Badge>
      );
    }

    if (status === "draft") {
      return (
        <Badge variant="outline" className="text-xs">
          Draft
        </Badge>
      );
    }

    if (status === "paid") {
      return (
        <Badge variant="success" className="text-xs">
          Paid
        </Badge>
      );
    }

    return null;
  };

  if (invoices.length === 0) {
    return (
      <Card className="border-elec-yellow/20">
        <CardHeader>
          <CardTitle className="text-lg">Recent Invoices</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 space-y-2">
            <Receipt className="h-12 w-12 text-muted-foreground mx-auto opacity-50" />
            <p className="text-muted-foreground">No invoices raised yet</p>
            <p className="text-xs text-muted-foreground">
              Raised invoices will appear here
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-elec-yellow/20">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Recent Invoices</CardTitle>
          <Badge variant="secondary" className="text-xs">
            {invoices.length} total
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {invoices.map((invoice) => (
          <div
            key={invoice.id}
            className="p-4 rounded-lg border border-elec-yellow/20 bg-card/50 hover:bg-card transition-colors space-y-3"
          >
            {/* Header with Quote-Invoice Link */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Badge variant="outline" className="text-xs">
                  Quote #{invoice.quoteNumber}
                </Badge>
                <ArrowRight className="h-3 w-3" />
                <Badge variant="default" className="text-xs bg-blue-600/20 text-blue-300 border-blue-600/30">
                  <Receipt className="h-3 w-3 mr-1" />
                  {invoice.invoice_number}
                </Badge>
              </div>
              
              <div className="flex items-start justify-between gap-3">
                {getStatusBadge(invoice)}
                <span className="text-lg font-bold text-elec-yellow shrink-0">
                  {formatCurrency(invoice.total)}
                </span>
              </div>
            </div>

            {/* Client Info */}
            <div className="flex items-center gap-2 text-sm">
              <User className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium truncate">{invoice.client.name}</span>
            </div>

            {/* Meta Info */}
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              {invoice.invoice_date && (
                <>
                  <div className="flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5" />
                    <span>{format(new Date(invoice.invoice_date), "dd MMM yyyy")}</span>
                  </div>
                  <span className="text-border">•</span>
                </>
              )}
              {invoice.invoice_due_date && (
                <div className="flex items-center gap-1.5">
                  <span>Due: {format(new Date(invoice.invoice_due_date), "dd MMM")}</span>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate(`/electrician/quotes?highlight=${invoice.id}`)}
                className="flex-1 text-xs border border-elec-yellow/20 hover:bg-elec-yellow/10"
              >
                <FileText className="h-3 w-3 mr-1" />
                View Quote
              </Button>
              <Button
                variant="default"
                size="sm"
                onClick={() => navigate(`/electrician/invoices?highlight=${invoice.id}`)}
                className="flex-1 text-xs bg-elec-yellow hover:bg-elec-yellow/90 text-black border-0"
              >
                <Eye className="h-3 w-3 mr-1" />
                View Invoice
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
