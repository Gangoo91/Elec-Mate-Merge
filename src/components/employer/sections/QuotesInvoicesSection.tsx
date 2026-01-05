import { useState } from "react";
import { FileText, Send, Plus, Search, Eye, Check, TrendingUp, AlertTriangle, Receipt, PoundSterling } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DataTable } from "@/components/employer/DataTable";
import { StatusBadge } from "@/components/employer/StatusBadge";
import { Skeleton } from "@/components/ui/skeleton";
import { PullToRefresh } from "@/components/ui/pull-to-refresh";
import { QuoteCard } from "@/components/employer/QuoteCard";
import { InvoiceCard } from "@/components/employer/InvoiceCard";
import { useQuotes, useInvoices, useSendQuote, useMarkInvoicePaid } from "@/hooks/useFinance";
import { CreateQuoteDialog } from "@/components/employer/dialogs/CreateQuoteDialog";
import { CreateInvoiceDialog } from "@/components/employer/dialogs/CreateInvoiceDialog";
import { ViewQuoteSheet } from "@/components/employer/sheets/ViewQuoteSheet";
import { ViewInvoiceSheet } from "@/components/employer/sheets/ViewInvoiceSheet";
import { useIsMobile } from "@/hooks/use-mobile";
import { useQueryClient } from "@tanstack/react-query";
import { cn } from "@/lib/utils";
import type { Quote, Invoice } from "@/services/financeService";

export function QuotesInvoicesSection() {
  const [showCreateQuote, setShowCreateQuote] = useState(false);
  const [showCreateInvoice, setShowCreateInvoice] = useState(false);
  const [selectedQuote, setSelectedQuote] = useState<Quote | null>(null);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [convertQuote, setConvertQuote] = useState<Quote | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("quotes");
  
  const { data: quotes = [], isLoading: quotesLoading, refetch: refetchQuotes } = useQuotes();
  const { data: invoices = [], isLoading: invoicesLoading, refetch: refetchInvoices } = useInvoices();
  const sendQuoteMutation = useSendQuote();
  const markPaidMutation = useMarkInvoicePaid();
  const isMobile = useIsMobile();
  const queryClient = useQueryClient();

  const handleRefresh = async () => {
    await Promise.all([
      queryClient.invalidateQueries({ queryKey: ['quotes'] }),
      queryClient.invalidateQueries({ queryKey: ['invoices'] })
    ]);
  };

  const filteredQuotes = quotes.filter(q =>
    q.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (q.description?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
    q.quote_number.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredInvoices = invoices.filter(inv =>
    inv.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (inv.project?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
    inv.invoice_number.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Stats calculations
  const totalQuoteValue = quotes.filter(q => q.status !== "Rejected").reduce((acc, q) => acc + Number(q.value), 0);
  const approvedQuoteValue = quotes.filter(q => q.status === "Approved").reduce((acc, q) => acc + Number(q.value), 0);
  const approvedCount = quotes.filter(q => q.status === "Approved").length;
  const totalInvoiced = invoices.reduce((acc, inv) => acc + Number(inv.amount), 0);
  const paidAmount = invoices.filter(inv => inv.status === "Paid").reduce((acc, inv) => acc + Number(inv.amount), 0);
  const overdueAmount = invoices.filter(inv => inv.status === "Overdue").reduce((acc, inv) => acc + Number(inv.amount), 0);
  const overdueCount = invoices.filter(inv => inv.status === "Overdue").length;
  const paidPercentage = totalInvoiced > 0 ? Math.round((paidAmount / totalInvoiced) * 100) : 0;

  const isLoading = quotesLoading || invoicesLoading;

  const handleConvertToInvoice = (quote: Quote) => {
    setConvertQuote(quote);
    setShowCreateInvoice(true);
  };

  // Desktop table columns
  const quoteColumns = [
    { key: "quote_number", label: "Quote #" },
    { key: "client", label: "Client" },
    { 
      key: "description", 
      label: "Description",
      render: (item: Quote) => {
        const lineItems = Array.isArray(item.line_items) ? item.line_items : [];
        const itemCount = lineItems.length;
        return (
          <div className="min-w-0">
            <p className="truncate max-w-[200px]">{item.description || '-'}</p>
            {itemCount > 0 && (
              <p className="text-xs text-muted-foreground">{itemCount} line item{itemCount > 1 ? 's' : ''}</p>
            )}
          </div>
        );
      }
    },
    { 
      key: "value", 
      label: "Value",
      render: (item: Quote) => (
        <span className="font-semibold text-elec-yellow">£{Number(item.value).toLocaleString()}</span>
      )
    },
    { 
      key: "sent_date", 
      label: "Sent",
      render: (item: Quote) => (
        <span>{item.sent_date ? new Date(item.sent_date).toLocaleDateString("en-GB") : "-"}</span>
      )
    },
    { 
      key: "valid_until", 
      label: "Expires",
      render: (item: Quote) => {
        if (!item.valid_until) return <span>-</span>;
        const validDate = new Date(item.valid_until);
        const now = new Date();
        const daysLeft = Math.ceil((validDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
        const isExpired = daysLeft < 0;
        const isExpiringSoon = daysLeft >= 0 && daysLeft <= 7;
        
        return (
          <div>
            <span>{validDate.toLocaleDateString("en-GB")}</span>
            {isExpired && <p className="text-xs text-destructive">Expired</p>}
            {isExpiringSoon && <p className="text-xs text-warning">{daysLeft} days left</p>}
          </div>
        );
      }
    },
    { 
      key: "status", 
      label: "Status",
      render: (item: Quote) => {
        const statusMap: Record<string, string> = {
          "Draft": "pending",
          "Sent": "warning",
          "Approved": "approved",
          "Rejected": "rejected"
        };
        return <StatusBadge status={statusMap[item.status] || item.status} />;
      }
    },
    {
      key: "actions",
      label: "",
      render: (item: Quote) => (
        <div className="flex gap-1">
          <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); setSelectedQuote(item); }}><Eye className="h-4 w-4" /></Button>
          {item.status === "Draft" && (
            <Button 
              variant="ghost" 
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                sendQuoteMutation.mutate(item.id);
              }}
              disabled={sendQuoteMutation.isPending}
            >
              <Send className="h-4 w-4" />
            </Button>
          )}
        </div>
      )
    }
  ];

  const invoiceColumns = [
    { key: "invoice_number", label: "Invoice #" },
    { key: "client", label: "Client" },
    { key: "project", label: "Project" },
    { 
      key: "amount", 
      label: "Amount",
      render: (item: Invoice) => (
        <span className="font-semibold">£{Number(item.amount).toLocaleString()}</span>
      )
    },
    { 
      key: "due_date", 
      label: "Due Date",
      render: (item: Invoice) => (
        <span>{item.due_date ? new Date(item.due_date).toLocaleDateString("en-GB") : "-"}</span>
      )
    },
    { 
      key: "paid_date", 
      label: "Paid Date",
      render: (item: Invoice) => (
        <span>{item.paid_date ? new Date(item.paid_date).toLocaleDateString("en-GB") : "-"}</span>
      )
    },
    { 
      key: "status", 
      label: "Status",
      render: (item: Invoice) => {
        const statusMap: Record<string, string> = {
          "Paid": "completed",
          "Pending": "pending",
          "Overdue": "expired"
        };
        return <StatusBadge status={statusMap[item.status] || item.status} />;
      }
    },
    {
      key: "actions",
      label: "",
      render: (item: Invoice) => (
        <div className="flex gap-1">
          <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); setSelectedInvoice(item); }}><Eye className="h-4 w-4" /></Button>
          {item.status === "Pending" && (
            <Button 
              variant="ghost" 
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                markPaidMutation.mutate(item.id);
              }}
              disabled={markPaidMutation.isPending}
            >
              <Check className="h-4 w-4" />
            </Button>
          )}
        </div>
      )
    }
  ];

  if (isLoading) {
    return (
      <div className="space-y-4 animate-fade-in px-4 md:px-0">
        <div className="flex flex-col gap-3">
          <Skeleton className="h-11 w-full" />
          <div className="flex gap-2">
            <Skeleton className="h-10 flex-1" />
            <Skeleton className="h-10 flex-1" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-24 rounded-xl" />
          ))}
        </div>
        <Skeleton className="h-12 w-full rounded-xl" />
        <div className="space-y-3">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-32 rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  const content = (
    <div className="space-y-4 animate-fade-in">
      {/* Sticky Search Header */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm pb-3 -mx-4 px-4 md:mx-0 md:px-0 pt-1">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search quotes & invoices..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-11 bg-elec-gray border-border"
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2">
        <Button 
          variant="outline" 
          className="flex-1 h-11 gap-2"
          onClick={() => setShowCreateQuote(true)}
        >
          <FileText className="h-4 w-4" />
          New Quote
        </Button>
        <Button 
          className="flex-1 h-11 gap-2"
          onClick={() => setShowCreateInvoice(true)}
        >
          <Plus className="h-4 w-4" />
          Create Invoice
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3">
        <Card className="overflow-hidden">
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">Total Quoted</p>
                <p className="text-2xl font-bold text-elec-yellow">£{(totalQuoteValue / 1000).toFixed(0)}k</p>
                <p className="text-xs text-success font-medium">{approvedCount} approved</p>
              </div>
              <div className="h-10 w-10 rounded-full bg-elec-yellow/10 flex items-center justify-center">
                <FileText className="h-5 w-5 text-elec-yellow" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden">
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">Total Invoiced</p>
                <p className="text-2xl font-bold text-foreground">£{(totalInvoiced / 1000).toFixed(0)}k</p>
                <p className="text-xs text-muted-foreground">{invoices.length} invoices</p>
              </div>
              <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                <Receipt className="h-5 w-5 text-muted-foreground" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden">
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">Paid</p>
                <p className="text-2xl font-bold text-success">£{(paidAmount / 1000).toFixed(0)}k</p>
                <p className="text-xs text-success font-medium">{paidPercentage}% collected</p>
              </div>
              <div className="h-10 w-10 rounded-full bg-success/10 flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-success" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className={cn(
          "overflow-hidden transition-all",
          overdueAmount > 0 && "border-destructive/50 bg-destructive/5"
        )}>
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">Overdue</p>
                <p className={cn(
                  "text-2xl font-bold",
                  overdueAmount > 0 ? "text-destructive" : "text-muted-foreground"
                )}>
                  £{(overdueAmount / 1000).toFixed(0)}k
                </p>
                {overdueCount > 0 && (
                  <p className="text-xs text-destructive font-medium">{overdueCount} overdue</p>
                )}
              </div>
              <div className={cn(
                "h-10 w-10 rounded-full flex items-center justify-center",
                overdueAmount > 0 ? "bg-destructive/10" : "bg-muted"
              )}>
                <AlertTriangle className={cn(
                  "h-5 w-5",
                  overdueAmount > 0 ? "text-destructive" : "text-muted-foreground"
                )} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-3">
        <TabsList className="w-full h-12 p-1 bg-muted/50">
          <TabsTrigger value="quotes" className="flex-1 h-full gap-2 data-[state=active]:bg-background">
            <FileText className="h-4 w-4" />
            Quotes ({quotes.length})
          </TabsTrigger>
          <TabsTrigger value="invoices" className="flex-1 h-full gap-2 data-[state=active]:bg-background">
            <Receipt className="h-4 w-4" />
            Invoices ({invoices.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="quotes" className="mt-0 space-y-3">
          {isMobile ? (
            filteredQuotes.length > 0 ? (
              <div className="space-y-3">
                {filteredQuotes.map((quote) => (
                  <QuoteCard
                    key={quote.id}
                    quote={quote}
                    onView={setSelectedQuote}
                    onSend={(id) => sendQuoteMutation.mutate(id)}
                    isSending={sendQuoteMutation.isPending}
                  />
                ))}
              </div>
            ) : (
              <Card className="p-8 text-center">
                <FileText className="h-12 w-12 mx-auto text-muted-foreground/50 mb-3" />
                <p className="text-muted-foreground font-medium">No quotes found</p>
                <p className="text-sm text-muted-foreground mt-1">Create your first quote to get started</p>
                <Button className="mt-4" onClick={() => setShowCreateQuote(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  New Quote
                </Button>
              </Card>
            )
          ) : (
            <DataTable
              title="All Quotes"
              data={filteredQuotes}
              columns={quoteColumns}
            />
          )}
        </TabsContent>

        <TabsContent value="invoices" className="mt-0 space-y-3">
          {isMobile ? (
            filteredInvoices.length > 0 ? (
              <div className="space-y-3">
                {filteredInvoices.map((invoice) => (
                  <InvoiceCard
                    key={invoice.id}
                    invoice={invoice}
                    onView={setSelectedInvoice}
                    onMarkPaid={(id) => markPaidMutation.mutate(id)}
                    isMarkingPaid={markPaidMutation.isPending}
                  />
                ))}
              </div>
            ) : (
              <Card className="p-8 text-center">
                <Receipt className="h-12 w-12 mx-auto text-muted-foreground/50 mb-3" />
                <p className="text-muted-foreground font-medium">No invoices found</p>
                <p className="text-sm text-muted-foreground mt-1">Create your first invoice to get started</p>
                <Button className="mt-4" onClick={() => setShowCreateInvoice(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Invoice
                </Button>
              </Card>
            )
          ) : (
            <DataTable
              title="All Invoices"
              data={filteredInvoices}
              columns={invoiceColumns}
            />
          )}
        </TabsContent>
      </Tabs>

      <CreateQuoteDialog open={showCreateQuote} onOpenChange={setShowCreateQuote} />
      <CreateInvoiceDialog open={showCreateInvoice} onOpenChange={setShowCreateInvoice} fromQuote={convertQuote || undefined} />
      <ViewQuoteSheet open={!!selectedQuote} onOpenChange={(open) => !open && setSelectedQuote(null)} quote={selectedQuote} onConvertToInvoice={handleConvertToInvoice} />
      <ViewInvoiceSheet open={!!selectedInvoice} onOpenChange={(open) => !open && setSelectedInvoice(null)} invoice={selectedInvoice} />
    </div>
  );

  if (isMobile) {
    return (
      <PullToRefresh onRefresh={handleRefresh} className="px-4 pb-20">
        {content}
      </PullToRefresh>
    );
  }

  return content;
}
