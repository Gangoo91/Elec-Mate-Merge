import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MobileButton } from "@/components/ui/mobile-button";
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
      const newStatus = action === "accept" ? "approved" : "rejected";
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
        <Badge variant="secondary" className="bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-800">
          <CheckCircle className="h-3 w-3 mr-1" />
          Accepted
        </Badge>
      );
    }
    if (quote.acceptance_status === "rejected") {
      return (
        <Badge variant="destructive" className="bg-red-50 text-red-700 border-red-200 dark:bg-red-950 dark:text-red-300 dark:border-red-800">
          <XCircle className="h-3 w-3 mr-1" />
          Rejected
        </Badge>
      );
    }
    return (
      <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950 dark:text-amber-300 dark:border-amber-800">
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
        <CardContent className="mobile-card-spacing">
          {activeQuotes.map((quote) => (
            <div
              key={quote.id}
              className="mobile-card border border-elec-yellow/20 rounded-lg mobile-interactive overflow-hidden"
            >
              {/* Mobile-First Layout with contained overflow */}
              <div className="space-y-4 min-w-0 w-full">
                {/* Header Section - Quote Info */}
                <div className="flex flex-col space-y-2 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 min-w-0">
                    <h4 className="mobile-heading text-lg font-semibold truncate min-w-0 flex-1">
                      Quote #{quote.quoteNumber}
                    </h4>
                    <div className="flex-shrink-0">
                      {getStatusBadge(quote)}
                    </div>
                  </div>
                  <p className="mobile-text text-muted-foreground truncate min-w-0">
                    Client: {quote.client.name}
                  </p>
                </div>

                {/* Amount Section - Prominent Display */}
                <div className="py-2">
                  <p className="text-2xl sm:text-3xl font-bold text-primary">
                    {formatCurrency(quote.total)}
                  </p>
                </div>

                {/* Action Buttons - Fully Contained Layout */}
                <div className="w-full">
                  {/* Mobile: Full-width stacked buttons */}
                  <div className="flex flex-col sm:hidden gap-3 w-full">
                    <MobileButton
                      size="default"
                      variant="elec"
                      onClick={() => handleActionClick(quote, "accept")}
                      icon={<CheckCircle className="h-4 w-4" />}
                      className="w-full touch-target bg-green-600 hover:bg-green-700 text-white border-green-600 font-medium min-w-0"
                      aria-label={`Accept quote ${quote.quoteNumber} from ${quote.client.name}`}
                    >
                      <span className="truncate">Accept Quote</span>
                    </MobileButton>
                    <MobileButton
                      size="default"
                      variant="elec-outline"
                      onClick={() => handleActionClick(quote, "reject")}
                      icon={<XCircle className="h-4 w-4" />}
                      className="w-full touch-target border-red-500 text-red-600 hover:bg-red-500 hover:text-white font-medium min-w-0"
                      aria-label={`Reject quote ${quote.quoteNumber} from ${quote.client.name}`}
                    >
                      <span className="truncate">Reject Quote</span>
                    </MobileButton>
                  </div>

                  {/* Desktop/Tablet: Compact side-by-side buttons with proper containment */}
                  <div className="hidden sm:flex gap-2 justify-end w-full max-w-full">
                    <MobileButton
                      size="sm"
                      variant="elec"
                      onClick={() => handleActionClick(quote, "accept")}
                      icon={<CheckCircle className="h-4 w-4" />}
                      className="bg-green-600 hover:bg-green-700 text-white border-green-600 font-medium px-3 py-2 flex-shrink-0"
                      aria-label={`Accept quote ${quote.quoteNumber} from ${quote.client.name}`}
                    >
                      Accept
                    </MobileButton>
                    <MobileButton
                      size="sm"
                      variant="elec-outline"
                      onClick={() => handleActionClick(quote, "reject")}
                      icon={<XCircle className="h-4 w-4" />}
                      className="border-red-500 text-red-600 hover:bg-red-500 hover:text-white font-medium px-3 py-2 flex-shrink-0"
                      aria-label={`Reject quote ${quote.quoteNumber} from ${quote.client.name}`}
                    >
                      Reject
                    </MobileButton>
                  </div>
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