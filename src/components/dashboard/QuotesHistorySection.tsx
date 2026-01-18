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
  CheckCheck,
  User,
  Calendar
} from "lucide-react";
import { Quote } from "@/types/quote";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { ConfirmationDialog } from "@/components/ui/confirmation-dialog";
import { cn } from "@/lib/utils";
import { InvoiceDecisionDialog } from "@/components/electrician/invoice-builder/InvoiceDecisionDialog";
import { useInvoiceStorage } from "@/hooks/useInvoiceStorage";
import { toast } from "sonner";
import { generateSequentialInvoiceNumber } from "@/utils/invoice-number-generator";

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

  const getUnifiedStatusBadge = (quote: Quote) => {
    const acceptanceStatus = quote.acceptance_status || "pending";
    const isWorkDone = quote.tags?.includes('work_done');
    const hasInvoice = quote.invoice_raised === true;
    
    // Priority hierarchy:
    // 1. Invoice raised
    if (hasInvoice) {
      return (
        <Badge className="bg-blue-500 text-foreground border-0 hover:bg-blue-600">
          <Receipt className="h-3 w-3 mr-1" />
          Invoiced
        </Badge>
      );
    }
    
    // 2. Work done + accepted = ready to invoice
    if (isWorkDone && acceptanceStatus === "accepted") {
      return (
        <Badge className="bg-green-500 text-foreground border-0 hover:bg-green-600 animate-pulse">
          <CheckCheck className="h-3 w-3 mr-1" />
          Ready to Invoice
        </Badge>
      );
    }
    
    // 3. Accepted but work pending
    if (acceptanceStatus === "accepted" && !isWorkDone) {
      return (
        <Badge className="bg-emerald-500 text-foreground border-0 hover:bg-emerald-600">
          <CheckCircle className="h-3 w-3 mr-1" />
          Approved - Work Pending
        </Badge>
      );
    }
    
    // 4. Rejected
    if (acceptanceStatus === "rejected") {
      return (
        <Badge className="bg-red-500 text-foreground border-0 hover:bg-red-600">
          <XCircle className="h-3 w-3 mr-1" />
          Rejected
        </Badge>
      );
    }
    
    // 5. Sent but not yet accepted/rejected
    if (quote.status === "sent") {
      return (
        <Badge className="bg-blue-500 text-foreground border-0 hover:bg-blue-600">
          <Send className="h-3 w-3 mr-1" />
          Sent - Awaiting Client
        </Badge>
      );
    }
    
    // 6. Draft
    if (quote.status === "draft") {
      return (
        <Badge variant="outline" className="border-muted-foreground/30">
          <FileText className="h-3 w-3 mr-1" />
          Draft
        </Badge>
      );
    }
    
    // Default
    return (
      <Badge variant="outline" className="border-elec-yellow/50">
        <Clock className="h-3 w-3 mr-1" />
        Pending
      </Badge>
    );
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
      const invoiceNumber = await generateSequentialInvoiceNumber();
      const invoiceData = {
        ...selectedQuote,
        originalQuoteId: selectedQuote.id,
        invoice_raised: true,
        invoice_number: invoiceNumber,
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
          <CardHeader className="cursor-pointer hover:bg-muted/50 active:bg-muted/70 transition-all touch-manipulation">
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
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 md:gap-4">
              <div className="text-center p-2 sm:p-2.5 md:p-3 border rounded-lg">
                <div className="text-xl sm:text-2xl font-bold">{stats.total}</div>
                <div className="text-xs sm:text-sm text-muted-foreground">Total</div>
              </div>
              <div className="text-center p-2 sm:p-2.5 md:p-3 border rounded-lg">
                <div className="text-xl sm:text-2xl font-bold text-green-600">{stats.accepted}</div>
                <div className="text-xs sm:text-sm text-muted-foreground">Accepted</div>
              </div>
              <div className="text-center p-2 sm:p-2.5 md:p-3 border rounded-lg">
                <div className="text-xl sm:text-2xl font-bold text-red-600">{stats.rejected}</div>
                <div className="text-xs sm:text-sm text-muted-foreground">Rejected</div>
              </div>
              <div className="text-center p-2 sm:p-2.5 md:p-3 border rounded-lg">
                <div className="text-xl sm:text-2xl font-bold text-yellow-600">{stats.pending}</div>
                <div className="text-xs sm:text-sm text-muted-foreground">Pending</div>
              </div>
            </div>

            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-3">
              <div className="relative flex-1">
                {!searchQuery && (
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                )}
                <Input
                  placeholder="Search by client name or quote number..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={cn(!searchQuery && "pl-10")}
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
            <div className="space-y-2 sm:space-y-3">
              {filteredQuotes.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  {quotes.length === 0 ? "No quotes found" : "No quotes match your search criteria"}
                </div>
              ) : (
                filteredQuotes.map((quote) => (
                  <div
                    key={quote.id}
                    className="border border-elec-yellow/20 rounded-lg overflow-hidden bg-elec-card"
                  >
                    {/* Hero Section - Price & Status */}
                    <div className="bg-gradient-to-br from-elec-gray to-elec-gray/80 p-3 sm:p-4 border-b border-elec-yellow/10">
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <Badge variant="outline" className="border-elec-yellow/40 bg-elec-dark/50">
                          #{quote.quoteNumber}
                        </Badge>
                        {getUnifiedStatusBadge(quote)}
                      </div>
                      <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-elec-light">
                        {formatCurrency(quote.total)}
                      </div>
                    </div>

                    {/* Client & Date Info */}
                    <div className="p-3 sm:p-4 space-y-2 sm:space-y-3 border-b border-elec-yellow/10">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-elec-yellow shrink-0" />
                        <span className="font-medium truncate">{quote.client.name}</span>
                      </div>
                      <div className="flex flex-col gap-2 text-xs text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-3.5 w-3.5 text-elec-yellow shrink-0" />
                          <span>Created {format(quote.createdAt, "dd MMM yyyy")}</span>
                        </div>
                        {quote.accepted_at && (
                          <div className="flex items-center gap-2">
                            {quote.acceptance_status === "accepted" ? (
                              <CheckCircle className="h-3.5 w-3.5 text-green-500 shrink-0" />
                            ) : (
                              <XCircle className="h-3.5 w-3.5 text-red-500 shrink-0" />
                            )}
                            <span>
                              {quote.acceptance_status === "accepted" ? "✍️ Signed" : "Rejected"} by {quote.accepted_by_name || 'client'} on {format(quote.accepted_at, "dd MMM yyyy")}
                            </span>
                          </div>
                        )}
                        {quote.acceptance_status === 'accepted' && !quote.accepted_at && (
                          <div className="text-xs text-amber-500 flex items-center gap-1">
                            <CheckCircle className="h-3.5 w-3.5" />
                            Awaiting digital signature
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="p-3 sm:p-4 space-y-2">
                      {/* Primary action based on quote state */}
                      {quote.acceptance_status === 'accepted' && isWorkComplete(quote) && !hasInvoiceRaised(quote) ? (
                        <MobileButton
                          variant="elec"
                          size="wide"
                          onClick={() => {
                            setSelectedQuote(quote);
                            setShowInvoiceDecisionDialog(true);
                          }}
                          icon={<Receipt className="h-4 w-4" />}
                        >
                          Raise Invoice
                        </MobileButton>
                      ) : quote.acceptance_status === 'accepted' && !isWorkComplete(quote) ? (
                        <MobileButton
                          variant="elec"
                          size="wide"
                          onClick={() => {
                            setSelectedQuote(quote);
                            setShowWorkCompleteDialog(true);
                          }}
                          icon={<CheckCheck className="h-4 w-4" />}
                        >
                          Mark Work Complete
                        </MobileButton>
                      ) : (
                        <MobileButton
                          variant="elec"
                          size="wide"
                          onClick={() => navigate(`/electrician/quotes?filter=${quote.status}`)}
                          icon={<Eye className="h-4 w-4" />}
                        >
                          View Details
                        </MobileButton>
                      )}
                      
                      {/* Secondary action - always show View Details if primary is different */}
                      {(quote.acceptance_status === 'accepted' || isWorkComplete(quote)) && (
                        <MobileButton
                          variant="outline"
                          size="wide"
                          onClick={() => navigate(`/electrician/quotes?filter=${quote.status}`)}
                          icon={<Eye className="h-4 w-4" />}
                        >
                          View Details
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