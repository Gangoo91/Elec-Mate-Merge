import { Quote } from "@/types/quote";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MobileButton } from "@/components/ui/mobile-button";
import { Receipt, User, Calendar, FileText, Check } from "lucide-react";
import { format } from "date-fns";

interface QuotesReadyPanelProps {
  quotes: Quote[];
  onRaiseInvoice: (quote: Quote) => void;
}

export const QuotesReadyPanel = ({ quotes, onRaiseInvoice }: QuotesReadyPanelProps) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-GB", {
      style: "currency",
      currency: "GBP",
    }).format(amount);
  };

  if (quotes.length === 0) {
    return (
      <Card className="border-elec-yellow/20">
        <CardHeader>
          <CardTitle className="text-lg">Quotes Ready for Invoice</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 space-y-2">
            <FileText className="h-12 w-12 text-muted-foreground mx-auto opacity-50" />
            <p className="text-muted-foreground">No quotes ready for invoicing</p>
            <p className="text-xs text-muted-foreground">
              Quotes with "Work Done" tag will appear here
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-elec-yellow/30 shadow-lg hover:shadow-xl transition-shadow rounded-xl">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Quotes Ready for Invoice</CardTitle>
          <Badge variant="secondary" className="text-xs">
            {quotes.length} ready
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {quotes.map((quote) => (
          <div
            key={quote.id}
            className="p-4 rounded-lg border border-elec-yellow/20 bg-card/50 hover:bg-card transition-colors space-y-3"
          >
            {/* Header */}
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-2 min-w-0 flex-1">
                <Badge variant="outline" className="text-xs font-medium">
                  {quote.quoteNumber}
                </Badge>
                <Badge variant="success" className="text-xs">
                  <Check className="h-3 w-3 mr-1" />
                  Work Done
                </Badge>
              </div>
              <span className="text-lg font-bold text-elec-yellow shrink-0">
                {formatCurrency(quote.total)}
              </span>
            </div>

            {/* Client Info */}
            <div className="flex items-center gap-2 text-sm">
              <User className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium truncate">{quote.client.name}</span>
            </div>

            {/* Meta Info */}
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5" />
                <span>{format(quote.createdAt, "dd MMM yyyy")}</span>
              </div>
              <span className="text-border">•</span>
              <div className="flex items-center gap-1.5">
                <FileText className="h-3.5 w-3.5" />
                <span>{quote.items.length} items</span>
              </div>
            </div>

            {/* Action Button */}
            <MobileButton
              variant="elec"
              size="sm"
              onClick={() => onRaiseInvoice(quote)}
              icon={<Receipt className="h-4 w-4" />}
              className="w-full bg-gradient-to-r from-elec-yellow to-yellow-400 text-black font-semibold"
            >
              Raise Invoice
            </MobileButton>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
