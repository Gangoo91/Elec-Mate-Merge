import { useState } from "react";
import { useQuoteStorage } from "@/hooks/useQuoteStorage";
import { useInvoiceStorage } from "@/hooks/useInvoiceStorage";
import { QuotesReadyPanel } from "./QuotesReadyPanel";
import { LinkedInvoicesPanel } from "./LinkedInvoicesPanel";
import { Quote } from "@/types/quote";
import { Card, CardContent } from "@/components/ui/card";
import { Receipt, FileCheck, TrendingUp, DollarSign } from "lucide-react";
import { InvoiceDecisionDialog } from "./InvoiceDecisionDialog";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

export const QuoteInvoiceDashboard = () => {
  const navigate = useNavigate();
  const { savedQuotes } = useQuoteStorage();
  const { invoices, saveInvoice } = useInvoiceStorage();
  const [showInvoiceDecision, setShowInvoiceDecision] = useState(false);
  const [quoteForInvoice, setQuoteForInvoice] = useState<Quote | null>(null);
  const [loadingAction, setLoadingAction] = useState(false);

  // Quotes ready for invoice (approved + work_done + not yet invoiced)
  const quotesReady = savedQuotes.filter(
    (quote) =>
      quote.status === "approved" &&
      quote.tags?.includes("work_done") &&
      !quote.invoice_raised
  );

  // Recent invoices
  const recentInvoices = invoices.slice(0, 10);

  // Calculate stats
  const totalInvoicesThisMonth = invoices.filter((inv) => {
    const invDate = inv.invoice_date ? new Date(inv.invoice_date) : null;
    if (!invDate) return false;
    const now = new Date();
    return invDate.getMonth() === now.getMonth() && invDate.getFullYear() === now.getFullYear();
  }).length;

  const outstandingValue = invoices
    .filter((inv) => inv.invoice_status !== "paid")
    .reduce((sum, inv) => sum + inv.total, 0);

  const paidValue = invoices
    .filter((inv) => inv.invoice_status === "paid")
    .reduce((sum, inv) => sum + inv.total, 0);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-GB", {
      style: "currency",
      currency: "GBP",
    }).format(amount);
  };

  const handleRaiseInvoice = (quote: Quote) => {
    setQuoteForInvoice(quote);
    setShowInvoiceDecision(true);
  };

  const handleNoChanges = async () => {
    if (!quoteForInvoice) return;

    setLoadingAction(true);
    try {
      const invoiceNumber = `INV-${Date.now()}`;
      const dueDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
      const invoiceData = {
        ...quoteForInvoice,
        id: quoteForInvoice.id,
        invoice_number: invoiceNumber,
        invoice_date: new Date(),
        invoice_due_date: dueDate,
        invoice_status: "draft" as const,
        invoice_raised: true,
        settings: {
          ...quoteForInvoice.settings,
          paymentTerms: "30 days",
          dueDate: dueDate,
        },
      };

      const success = await saveInvoice(invoiceData);

      if (success) {
        toast({
          title: "Invoice Created",
          description: `${invoiceNumber} created successfully from quote ${quoteForInvoice.quoteNumber}`,
          variant: "success",
        });
        setShowInvoiceDecision(false);
        setQuoteForInvoice(null);
        navigate("/electrician/invoices");
      } else {
        toast({
          title: "Error",
          description: "Failed to create invoice",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error creating invoice:", error);
      toast({
        title: "Error",
        description: "Failed to create invoice",
        variant: "destructive",
      });
    } finally {
      setLoadingAction(false);
    }
  };

  const handleHasChanges = () => {
    if (!quoteForInvoice) return;
    setShowInvoiceDecision(false);
    navigate(`/electrician/invoice-quote-builder/${quoteForInvoice.id}`);
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-elec-yellow/20">
          <CardContent className="p-6 text-center space-y-2">
            <Receipt className="h-8 w-8 text-elec-yellow mx-auto" />
            <div className="text-2xl font-bold text-primary">{quotesReady.length}</div>
            <div className="text-sm text-muted-foreground">Ready for Invoice</div>
          </CardContent>
        </Card>

        <Card className="border-elec-yellow/20">
          <CardContent className="p-6 text-center space-y-2">
            <FileCheck className="h-8 w-8 text-blue-400 mx-auto" />
            <div className="text-2xl font-bold text-primary">{totalInvoicesThisMonth}</div>
            <div className="text-sm text-muted-foreground">Invoices This Month</div>
          </CardContent>
        </Card>

        <Card className="border-elec-yellow/20">
          <CardContent className="p-6 text-center space-y-2">
            <TrendingUp className="h-8 w-8 text-orange-400 mx-auto" />
            <div className="text-2xl font-bold text-primary">{formatCurrency(outstandingValue)}</div>
            <div className="text-sm text-muted-foreground">Outstanding</div>
          </CardContent>
        </Card>

        <Card className="border-elec-yellow/20">
          <CardContent className="p-6 text-center space-y-2">
            <DollarSign className="h-8 w-8 text-green-400 mx-auto" />
            <div className="text-2xl font-bold text-primary">{formatCurrency(paidValue)}</div>
            <div className="text-sm text-muted-foreground">Paid</div>
          </CardContent>
        </Card>
      </div>

      {/* Main Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <QuotesReadyPanel quotes={quotesReady} onRaiseInvoice={handleRaiseInvoice} />
        <LinkedInvoicesPanel invoices={recentInvoices} />
      </div>

      {/* Invoice Decision Dialog */}
      {quoteForInvoice && (
        <InvoiceDecisionDialog
          open={showInvoiceDecision}
          onOpenChange={setShowInvoiceDecision}
          onNoChanges={handleNoChanges}
          onHasChanges={handleHasChanges}
          loading={loadingAction}
        />
      )}
    </div>
  );
};
