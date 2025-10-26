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
import { generateSequentialInvoiceNumber } from "@/utils/invoice-number-generator";

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

  // Real-time subscription for quote status updates
  useEffect(() => {
    console.log('📡 Setting up real-time quote subscription...');
    
    const channel = supabase
      .channel('quotes-realtime-updates')
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'quotes',
        },
        (payload) => {
          console.log('🔄 Real-time quote update received:', payload);
          
          const updatedQuote = payload.new as Quote;
          
          // Show success toast when quote is accepted
          if (updatedQuote.acceptance_status === 'accepted') {
            toast({
              title: "🎉 Quote Accepted!",
              description: `${updatedQuote.client?.name || 'Client'} accepted quote ${updatedQuote.quoteNumber}`,
              variant: "default",
            });
          }
          
          // Show notification when quote is rejected
          if (updatedQuote.acceptance_status === 'rejected') {
            toast({
              title: "Quote Declined",
              description: `${updatedQuote.client?.name || 'Client'} declined quote ${updatedQuote.quoteNumber}`,
              variant: "default",
            });
          }
          
          // Trigger a refresh to update the UI
          fetchInvoices();
        }
      )
      .subscribe((status) => {
        console.log('📡 Real-time subscription status:', status);
      });

    // Cleanup subscription on unmount
    return () => {
      console.log('🔌 Cleaning up real-time subscription...');
      supabase.removeChannel(channel);
    };
  }, [fetchInvoices]);

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
      const invoiceNumber = await generateSequentialInvoiceNumber();
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
    <div className="space-y-6 md:space-y-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-elec-yellow/20 hover:border-elec-yellow/40 transition-colors">
          <CardContent className="p-5 md:p-6 text-center space-y-2">
            <PoundSterling className="h-8 w-8 md:h-10 md:w-10 text-elec-yellow mx-auto" />
            <div className="text-2xl md:text-3xl font-bold text-primary">{quotesReady.length}</div>
            <div className="text-xs md:text-sm text-muted-foreground">Ready for Invoice</div>
          </CardContent>
        </Card>

        <Card className="border-elec-yellow/20 hover:border-elec-yellow/40 transition-colors">
          <CardContent className="p-5 md:p-6 text-center space-y-2">
            <FileCheck className="h-8 w-8 md:h-10 md:w-10 text-blue-400 mx-auto" />
            <div className="text-2xl md:text-3xl font-bold text-primary">{stats.totalInvoicesThisMonth}</div>
            <div className="text-xs md:text-sm text-muted-foreground">Invoices This Month</div>
          </CardContent>
        </Card>

        <Card className="border-elec-yellow/20 hover:border-elec-yellow/40 transition-colors">
          <CardContent className="p-5 md:p-6 text-center space-y-2">
            <TrendingUp className="h-8 w-8 md:h-10 md:w-10 text-orange-400 mx-auto" />
            <div className="text-2xl md:text-3xl font-bold text-primary">{formatCurrency(stats.outstandingValue)}</div>
            <div className="text-xs md:text-sm text-muted-foreground">Outstanding</div>
            {stats.overdueCount > 0 && (
              <div className="text-xs text-destructive font-medium mt-1">
                {stats.overdueCount} overdue • {formatCurrency(stats.overdueValue)}
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="border-elec-yellow/20 hover:border-elec-yellow/40 transition-colors">
          <CardContent className="p-5 md:p-6 text-center space-y-2">
            <PoundSterling className="h-8 w-8 md:h-10 md:w-10 text-green-400 mx-auto" />
            <div className="text-2xl md:text-3xl font-bold text-primary">{formatCurrency(stats.paidValue)}</div>
            <div className="text-xs md:text-sm text-muted-foreground">Paid</div>
          </CardContent>
        </Card>
      </div>

      {/* Main Dashboard - Stacked Vertically for Better Mobile */}
      <div className="space-y-6 md:space-y-8">
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
