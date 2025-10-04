import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MobileButton } from "@/components/ui/mobile-button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { 
  History, 
  ChevronDown, 
  ChevronUp, 
  Search,
  CheckCircle,
  XCircle,
  Clock,
  Send,
  FileText,
  Eye,
  Receipt,
  CheckCheck
} from "lucide-react";
import { Quote } from "@/types/quote";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { ConfirmationDialog } from "@/components/ui/confirmation-dialog";
import { InvoiceDecisionDialog } from "@/components/electrician/invoice-builder/InvoiceDecisionDialog";
import { useInvoiceStorage } from "@/hooks/useInvoiceStorage";
import { toast } from "sonner";

interface QuotesHistorySectionProps {
  quotes: Quote[];
}

export const QuotesHistorySection = ({ quotes }: QuotesHistorySectionProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedQuote, setSelectedQuote] = useState<Quote | null>(null);
  const [showWorkCompleteDialog, setShowWorkCompleteDialog] = useState(false);
  const [showInvoiceDecisionDialog, setShowInvoiceDecisionDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { markWorkComplete, saveInvoice } = useInvoiceStorage();

  const filteredQuotes = useMemo(() => {
    return quotes.filter((quote) => {
      const matchesSearch = 
        quote.client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        quote.quoteNumber.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesStatus = 
        statusFilter === "all" || 
        quote.acceptance_status === statusFilter ||
        (statusFilter === "pending" && (quote.acceptance_status === "pending" || !quote.acceptance_status));
      
      return matchesSearch && matchesStatus;
    });
  }, [quotes, searchQuery, statusFilter]);

  const getStatusBadge = (quote: Quote) => {
    const status = quote.acceptance_status || "pending";
    
    switch (status) {
      case "accepted":
        return (
          <Badge variant="secondary" className="bg-green-100 text-green-800 border-green-200">
            <CheckCircle className="h-3 w-3 mr-1" />
            Accepted
          </Badge>
        );
      case "rejected":
        return (
          <Badge variant="destructive">
            <XCircle className="h-3 w-3 mr-1" />
            Rejected
          </Badge>
        );
      case "pending":
      default:
        return (
          <Badge variant="outline">
            <Clock className="h-3 w-3 mr-1" />
            Pending
          </Badge>
        );
    }
  };

  const getMainStatusBadge = (quote: Quote) => {
    switch (quote.status) {
      case "draft":
        return <Badge variant="outline">Draft</Badge>;
      case "sent":
        return (
          <Badge variant="secondary" className="bg-blue-100 text-blue-800 border-blue-200">
            <Send className="h-3 w-3 mr-1" />
            Sent
          </Badge>
        );
      case "pending":
        return (
          <Badge variant="outline">
            <Clock className="h-3 w-3 mr-1" />
            Pending
          </Badge>
        );
      case "approved":
        return (
          <Badge variant="secondary" className="bg-green-100 text-green-800 border-green-200">
            <CheckCircle className="h-3 w-3 mr-1" />
            Approved
          </Badge>
        );
      case "rejected":
        return (
          <Badge variant="destructive">
            <XCircle className="h-3 w-3 mr-1" />
            Rejected
          </Badge>
        );
      default:
        return <Badge variant="outline">{quote.status}</Badge>;
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-GB", {
      style: "currency",
      currency: "GBP",
    }).format(amount);
  };

  const getQuoteStats = () => {
    const total = quotes.length;
    const accepted = quotes.filter(q => q.acceptance_status === "accepted").length;
    const rejected = quotes.filter(q => q.acceptance_status === "rejected").length;
    const pending = quotes.filter(q => !q.acceptance_status || q.acceptance_status === "pending").length;
    
    return { total, accepted, rejected, pending };
  };

  const stats = getQuoteStats();

  const handleMarkWorkComplete = async () => {
    if (!selectedQuote) return;

    setLoading(true);
    try {
      const success = await markWorkComplete(selectedQuote.id);
      
      if (success) {
        toast.success('Work marked as complete');
        setShowWorkCompleteDialog(false);
        setSelectedQuote(null);
      } else {
        toast.error('Failed to mark work as complete');
      }
    } catch (error) {
      console.error('Error marking work complete:', error);
      toast.error('Failed to mark work as complete');
    } finally {
      setLoading(false);
    }
  };

  const handleRaiseInvoiceNoChanges = async () => {
    if (!selectedQuote) return;

    setLoading(true);
    try {
      // Generate invoice directly from quote data
      const invoiceData = {
        ...selectedQuote,
        originalQuoteId: selectedQuote.id,
        invoice_raised: true,
        invoice_number: `INV-${new Date().getFullYear()}-${Date.now().toString().slice(-6)}`,
        invoice_date: new Date(),
        invoice_due_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
        invoice_status: 'draft' as const,
        additional_invoice_items: [],
        work_completion_date: new Date(),
        items: selectedQuote.items.map(item => ({
          ...item,
          completionStatus: 'completed' as const,
          actualQuantity: item.quantity,
        })),
        settings: {
          ...selectedQuote.settings,
          paymentTerms: '30 days',
          dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        },
      };

      const success = await saveInvoice(invoiceData);
      
      if (success) {
        toast.success('Invoice generated successfully');
        setShowInvoiceDecisionDialog(false);
        setSelectedQuote(null);
        navigate('/electrician/quotes');
      } else {
        toast.error('Failed to generate invoice');
      }
    } catch (error) {
      console.error('Error generating invoice:', error);
      toast.error('Failed to generate invoice');
    } finally {
      setLoading(false);
    }
  };

  const handleRaiseInvoiceWithChanges = () => {
    if (!selectedQuote) return;
    
    setShowInvoiceDecisionDialog(false);
    navigate(`/electrician/invoice-quote-builder/${selectedQuote.id}`);
  };

  const isWorkComplete = (quote: Quote) => {
    return quote.tags?.includes('work_done');
  };

  const hasInvoiceRaised = (quote: Quote) => {
    return quote.invoice_raised === true;
  };

  return (
    <Card>
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors">
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <History className="h-5 w-5" />
                Quotes History ({stats.total})
              </div>
              {isOpen ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </CardTitle>
            {!isOpen && (
              <div className="flex gap-2 mt-2">
                <Badge variant="outline">Accepted: {stats.accepted}</Badge>
                <Badge variant="outline">Rejected: {stats.rejected}</Badge>
                <Badge variant="outline">Pending: {stats.pending}</Badge>
              </div>
            )}
          </CardHeader>
        </CollapsibleTrigger>
        
        <CollapsibleContent>
          <CardContent className="space-y-4">
            {/* Stats Summary */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-3 border rounded-lg">
                <div className="text-2xl font-bold">{stats.total}</div>
                <div className="text-sm text-muted-foreground">Total</div>
              </div>
              <div className="text-center p-3 border rounded-lg">
                <div className="text-2xl font-bold text-green-600">{stats.accepted}</div>
                <div className="text-sm text-muted-foreground">Accepted</div>
              </div>
              <div className="text-center p-3 border rounded-lg">
                <div className="text-2xl font-bold text-red-600">{stats.rejected}</div>
                <div className="text-sm text-muted-foreground">Rejected</div>
              </div>
              <div className="text-center p-3 border rounded-lg">
                <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
                <div className="text-sm text-muted-foreground">Pending</div>
              </div>
            </div>

            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by client name or quote number..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="accepted">Accepted</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Quotes List */}
            <div className="space-y-3">
              {filteredQuotes.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  {quotes.length === 0 ? "No quotes found" : "No quotes match your search criteria"}
                </div>
              ) : (
                filteredQuotes.map((quote) => (
                  <div
                    key={quote.id}
                    className="border border-elec-yellow/20 rounded-lg p-3 sm:p-4 space-y-3"
                  >
                    <div className="flex flex-col gap-3">
                      {/* Header: Quote number and badge */}
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className="font-semibold text-base sm:text-lg">
                            #{quote.quoteNumber}
                          </h4>
                          {getMainStatusBadge(quote)}
                        </div>
                        {getStatusBadge(quote)}
                      </div>

                      {/* Client and Price */}
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground truncate">
                          {quote.client.name}
                        </p>
                        <p className="text-xl sm:text-2xl font-bold">
                          {formatCurrency(quote.total)}
                        </p>
                      </div>
                      
                      {/* Dates in compact grid */}
                      <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
                        <span>Created: {format(quote.createdAt, "dd/MM/yy")}</span>
                        {quote.accepted_at && (
                          <span>
                            {quote.acceptance_status === "accepted" ? "Accepted" : "Rejected"}: {format(quote.accepted_at, "dd/MM/yy")}
                          </span>
                        )}
                      </div>
                    </div>
                    
                    {/* Action buttons - full width on mobile */}
                    <div className="flex flex-col sm:flex-row gap-2 pt-2 border-t border-elec-yellow/10">
                      <MobileButton
                        size="default"
                        variant="outline"
                        onClick={() => navigate(`/electrician/quotes?filter=${quote.status}`)}
                        icon={<Eye className="h-4 w-4" />}
                        className="w-full sm:w-auto"
                      >
                        View Details
                      </MobileButton>
                      
                      {/* Show Mark Work Complete button for accepted quotes */}
                      {quote.acceptance_status === 'accepted' && !isWorkComplete(quote) && (
                        <MobileButton
                          size="default"
                          variant="outline"
                          onClick={() => {
                            setSelectedQuote(quote);
                            setShowWorkCompleteDialog(true);
                          }}
                          icon={<CheckCheck className="h-4 w-4" />}
                          className="w-full sm:w-auto bg-blue-50 hover:bg-blue-100 text-blue-700 border-blue-200"
                        >
                          Mark Work Complete
                        </MobileButton>
                      )}
                      
                      {/* Show Raise Invoice button for completed work */}
                      {quote.acceptance_status === 'accepted' && isWorkComplete(quote) && !hasInvoiceRaised(quote) && (
                        <MobileButton
                          size="default"
                          variant="outline"
                          onClick={() => {
                            setSelectedQuote(quote);
                            setShowInvoiceDecisionDialog(true);
                          }}
                          icon={<Receipt className="h-4 w-4" />}
                          className="w-full sm:w-auto bg-green-50 hover:bg-green-100 text-green-700 border-green-200"
                        >
                          Raise Invoice
                        </MobileButton>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* View All Button */}
            {quotes.length > 0 && (
              <div className="text-center pt-4">
                <Button
                  variant="outline"
                  onClick={() => navigate("/electrician/quotes")}
                  className="flex items-center gap-2"
                >
                  <FileText className="h-4 w-4" />
                  View All Quotes
                </Button>
              </div>
            )}
          </CardContent>
        </CollapsibleContent>
      </Collapsible>

      {/* Work Complete Confirmation Dialog */}
      <ConfirmationDialog
        open={showWorkCompleteDialog}
        onOpenChange={setShowWorkCompleteDialog}
        title="Mark Work Complete"
        description={
          selectedQuote
            ? `Confirm that all work for quote #${selectedQuote.quoteNumber} has been completed. This will allow you to raise an invoice.`
            : ""
        }
        confirmText="Mark Complete"
        onConfirm={handleMarkWorkComplete}
        loading={loading}
      />

      {/* Invoice Decision Dialog */}
      <InvoiceDecisionDialog
        open={showInvoiceDecisionDialog}
        onOpenChange={setShowInvoiceDecisionDialog}
        onNoChanges={handleRaiseInvoiceNoChanges}
        onHasChanges={handleRaiseInvoiceWithChanges}
        loading={loading}
      />
    </Card>
  );
};