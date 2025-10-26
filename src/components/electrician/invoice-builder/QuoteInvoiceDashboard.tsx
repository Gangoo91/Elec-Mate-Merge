import { useState, useMemo, useEffect } from "react";
import { useQuoteStorage } from "@/hooks/useQuoteStorage";
import { useInvoiceStorage } from "@/hooks/useInvoiceStorage";
import { QuotesReadyPanel } from "./QuotesReadyPanel";
import { InvoiceStatusPanel } from "./InvoiceStatusPanel";
import { Quote } from "@/types/quote";
import { Card, CardContent } from "@/components/ui/card";
import { Receipt, FileCheck, TrendingUp, PoundSterling } from "lucide-react";
import { InvoiceDecisionDialog } from "./InvoiceDecisionDialog";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

export const QuoteInvoiceDashboard = () => {
  const navigate = useNavigate();
  const { savedQuotes } = useQuoteStorage();
  const { invoices, saveInvoice, fetchInvoices } = useInvoiceStorage();
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

  // Calculate stats with improved categorization
  const stats = useMemo(() => {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    const thisMonthInvoices = invoices.filter((inv) => {
      const invDate = inv.invoice_date ? new Date(inv.invoice_date) : null;
      return invDate && invDate.getMonth() === currentMonth && invDate.getFullYear() === currentYear;
    });

    const sentInvoices = invoices.filter(
      (inv) => inv.invoice_status === 'sent' && (!inv.invoice_due_date || new Date(inv.invoice_due_date) >= now)
    );

    const overdueInvoices = invoices.filter(
      (inv) => inv.invoice_status !== 'paid' && inv.invoice_due_date && new Date(inv.invoice_due_date) < now
    );

    const paidInvoices = invoices.filter((inv) => inv.invoice_status === 'paid');

    return {
      totalInvoicesThisMonth: thisMonthInvoices.length,
      outstandingValue: sentInvoices.reduce((sum, inv) => sum + (inv.total || 0), 0),
      overdueValue: overdueInvoices.reduce((sum, inv) => sum + (inv.total || 0), 0),
      overdueCount: overdueInvoices.length,
      paidValue: paidInvoices.reduce((sum, inv) => sum + (inv.total || 0), 0),
    };
  }, [invoices]);

  // Auto-detect overdue invoices on load
  useEffect(() => {
    const checkOverdueInvoices = async () => {
      const now = new Date();
      const overdueInvoices = invoices.filter(
        inv => inv.invoice_status === 'sent' && 
               inv.invoice_due_date && 
               new Date(inv.invoice_due_date) < now
      );

      if (overdueInvoices.length > 0) {
        // Update status to 'overdue' in database
        const updates = overdueInvoices.map(inv =>
          supabase
            .from('quotes')
            .update({ invoice_status: 'overdue' })
            .eq('id', inv.id)
        );

        await Promise.all(updates);
        
        toast({
          title: 'Overdue Invoices Detected',
          description: `${overdueInvoices.length} invoice${overdueInvoices.length > 1 ? 's are' : ' is'} now overdue`,
          variant: 'destructive',
        });

        // Refresh to show updated statuses
        fetchInvoices();
      }
    };

    checkOverdueInvoices();
  }, [invoices, fetchInvoices]);

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
    <div className="space-y-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {/* Ready for Invoice - Yellow Theme */}
        <Card className="relative overflow-hidden border-elec-yellow/30 hover:border-elec-yellow/50 transition-all hover:shadow-lg hover:shadow-elec-yellow/10 hover:scale-105 group">
          <CardContent className="p-8">
            <div className="mb-4 flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-elec-yellow to-yellow-400 rounded-full blur-xl opacity-20 group-hover:opacity-30 transition-opacity" />
                <div className="relative w-16 h-16 flex items-center justify-center rounded-full bg-gradient-to-br from-elec-yellow/20 to-yellow-400/20 border border-elec-yellow/30">
                  <PoundSterling className="h-8 w-8 text-elec-yellow" />
                </div>
              </div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-4xl md:text-5xl font-bold text-elec-yellow">
                {quotesReady.length}
              </div>
              <div className="text-sm font-medium text-muted-foreground">
                Ready for Invoice
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Invoices This Month - Blue Theme */}
        <Card className="relative overflow-hidden border-blue-400/30 hover:border-blue-400/50 transition-all hover:shadow-lg hover:shadow-blue-400/10 hover:scale-105 group">
          <CardContent className="p-8">
            <div className="mb-4 flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-blue-400 rounded-full blur-xl opacity-20 group-hover:opacity-30 transition-opacity" />
                <div className="relative w-16 h-16 flex items-center justify-center rounded-full bg-gradient-to-br from-blue-500/20 to-blue-400/20 border border-blue-400/30">
                  <FileCheck className="h-8 w-8 text-blue-400" />
                </div>
              </div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-4xl md:text-5xl font-bold text-blue-400">
                {stats.totalInvoicesThisMonth}
              </div>
              <div className="text-sm font-medium text-muted-foreground">
                Invoices This Month
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Outstanding - Orange Theme */}
        <Card className="relative overflow-hidden border-orange-400/30 hover:border-orange-400/50 transition-all hover:shadow-lg hover:shadow-orange-400/10 hover:scale-105 group">
          <CardContent className="p-8">
            <div className="mb-4 flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-orange-400 rounded-full blur-xl opacity-20 group-hover:opacity-30 transition-opacity" />
                <div className="relative w-16 h-16 flex items-center justify-center rounded-full bg-gradient-to-br from-orange-500/20 to-orange-400/20 border border-orange-400/30">
                  <TrendingUp className="h-8 w-8 text-orange-400" />
                </div>
              </div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-3xl md:text-4xl font-bold text-orange-400">
                {formatCurrency(stats.outstandingValue)}
              </div>
              <div className="text-sm font-medium text-muted-foreground">
                Outstanding
              </div>
              {stats.overdueCount > 0 && (
                <div className="text-xs text-destructive font-semibold pt-1">
                  {stats.overdueCount} overdue • {formatCurrency(stats.overdueValue)}
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Paid - Green Theme */}
        <Card className="relative overflow-hidden border-green-400/30 hover:border-green-400/50 transition-all hover:shadow-lg hover:shadow-green-400/10 hover:scale-105 group">
          <CardContent className="p-8">
            <div className="mb-4 flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-green-500 to-green-400 rounded-full blur-xl opacity-20 group-hover:opacity-30 transition-opacity" />
                <div className="relative w-16 h-16 flex items-center justify-center rounded-full bg-gradient-to-br from-green-500/20 to-green-400/20 border border-green-400/30">
                  <Receipt className="h-8 w-8 text-green-400" />
                </div>
              </div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-3xl md:text-4xl font-bold text-green-400">
                {formatCurrency(stats.paidValue)}
              </div>
              <div className="text-sm font-medium text-muted-foreground">
                Paid
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <QuotesReadyPanel quotes={quotesReady} onRaiseInvoice={handleRaiseInvoice} />
        <InvoiceStatusPanel invoices={invoices} onRefresh={fetchInvoices} />
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
