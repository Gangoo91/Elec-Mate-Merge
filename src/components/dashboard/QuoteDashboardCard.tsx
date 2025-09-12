import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, Clock, FileText } from "lucide-react";
import { Quote } from "@/types/quote";
import { useQuoteStorage } from "@/hooks/useQuoteStorage";
import { ConfirmationDialog } from "@/components/ui/confirmation-dialog";
import { toast } from "sonner";

interface QuoteDashboardCardProps {
  quotes: Quote[];
}

export const QuoteDashboardCard = ({ quotes }: QuoteDashboardCardProps) => {
  const { updateQuoteStatus } = useQuoteStorage();
  const [selectedQuote, setSelectedQuote] = useState<Quote | null>(null);
  const [action, setAction] = useState<"accept" | "reject" | null>(null);
  const [loading, setLoading] = useState(false);

  // Filter for active quotes that can be accepted/rejected
  const activeQuotes = quotes.filter(
    (quote) => 
      (quote.status === "sent" || quote.status === "pending") &&
      quote.acceptance_status === "pending"
  );

  const handleActionClick = (quote: Quote, actionType: "accept" | "reject") => {
    setSelectedQuote(quote);
    setAction(actionType);
  };

  const handleConfirmAction = async () => {
    if (!selectedQuote || !action) return;

    setLoading(true);
    try {
      const newStatus = action === "accept" ? "completed" : "rejected";
      const newAcceptanceStatus = action === "accept" ? "accepted" : "rejected";
      
      const success = await updateQuoteStatus(
        selectedQuote.id,
        newStatus,
        selectedQuote.tags,
        newAcceptanceStatus
      );

      if (success) {
        toast.success(
          `Quote ${action === "accept" ? "accepted" : "rejected"} successfully`
        );
      } else {
        toast.error(`Failed to ${action} quote`);
      }
    } catch (error) {
      console.error(`Error ${action}ing quote:`, error);
      toast.error(`Failed to ${action} quote`);
    } finally {
      setLoading(false);
      setSelectedQuote(null);
      setAction(null);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-GB", {
      style: "currency",
      currency: "GBP",
    }).format(amount);
  };

  const getStatusBadge = (quote: Quote) => {
    if (quote.acceptance_status === "accepted") {
      return (
        <Badge variant="secondary" className="bg-green-100 text-green-800 border-green-200">
          <CheckCircle className="h-3 w-3 mr-1" />
          Accepted
        </Badge>
      );
    }
    if (quote.acceptance_status === "rejected") {
      return (
        <Badge variant="destructive">
          <XCircle className="h-3 w-3 mr-1" />
          Rejected
        </Badge>
      );
    }
    return (
      <Badge variant="outline">
        <Clock className="h-3 w-3 mr-1" />
        Pending
      </Badge>
    );
  };

  if (activeQuotes.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Active Quotes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-center py-4">
            No active quotes require action
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Active Quotes ({activeQuotes.length})
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {activeQuotes.map((quote) => (
            <div
              key={quote.id}
              className="border border-elec-yellow/20 rounded-lg p-4 space-y-3"
            >
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
                <div className="space-y-1 flex-1">
                  <h4 className="font-medium text-lg">Quote #{quote.quoteNumber}</h4>
                  <p className="text-sm text-muted-foreground">
                    Client: {quote.client.name}
                  </p>
                  <p className="text-xl font-bold text-primary">
                    {formatCurrency(quote.total)}
                  </p>
                </div>
                <div className="flex flex-col items-start sm:items-end gap-2">
                  {getStatusBadge(quote)}
                </div>
              </div>
              
              {/* Prominent Action Buttons */}
              <div className="border-t pt-4">
                <p className="text-sm font-medium text-muted-foreground mb-3">
                  Quote Action Required
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    size="lg"
                    variant="default"
                    onClick={() => handleActionClick(quote, "accept")}
                    className="flex-1 h-12 text-base font-medium bg-green-600 hover:bg-green-700 text-white"
                    aria-label={`Accept quote ${quote.quoteNumber} from ${quote.client.name}`}
                  >
                    <CheckCircle className="h-5 w-5 mr-2" />
                    Accept Quote
                  </Button>
                  <Button
                    size="lg"
                    variant="destructive"
                    onClick={() => handleActionClick(quote, "reject")}
                    className="flex-1 h-12 text-base font-medium"
                    aria-label={`Reject quote ${quote.quoteNumber} from ${quote.client.name}`}
                  >
                    <XCircle className="h-5 w-5 mr-2" />
                    Reject Quote
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <ConfirmationDialog
        open={!!selectedQuote && !!action}
        onOpenChange={() => {
          if (!loading) {
            setSelectedQuote(null);
            setAction(null);
          }
        }}
        title={`${action === "accept" ? "Accept" : "Reject"} Quote`}
        description={
          selectedQuote
            ? `Are you sure you want to ${action} quote #${selectedQuote.quoteNumber} for ${selectedQuote.client.name}?`
            : ""
        }
        confirmText={action === "accept" ? "Accept Quote" : "Reject Quote"}
        variant={action === "reject" ? "destructive" : "default"}
        onConfirm={handleConfirmAction}
        loading={loading}
      />
    </>
  );
};