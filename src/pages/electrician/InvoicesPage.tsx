import { useNavigate, useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  FileText, Send, Edit, Eye, AlertCircle, Plus, CheckCircle,
  TrendingUp, Search, ArrowLeft, X, RefreshCw, Clock, LayoutGrid, List, PoundSterling
} from "lucide-react";
import { useInvoiceStorage } from "@/hooks/useInvoiceStorage";
import { isPast } from "date-fns";
import { Quote } from "@/types/quote";
import { useState, useEffect, useMemo, useCallback } from "react";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import InvoiceCardView from "@/components/electrician/InvoiceCardView";
import InvoiceTableView from "@/components/electrician/InvoiceTableView";
import { EmptyStateGuide } from "@/components/electrician/shared/EmptyStateGuide";
import { cn } from "@/lib/utils";
import { VoiceHeaderButton } from "@/components/electrician/VoiceHeaderButton";
import { QuoteInvoiceAnalytics } from "@/components/electrician/analytics";
import StripeConnectBanner from "@/components/electrician/StripeConnectBanner";

const InvoicesPage = () => {
  const { invoices, isLoading, fetchInvoices, deleteInvoice } = useInvoiceStorage();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const highlightId = searchParams.get('highlight');
  const activeFilter = searchParams.get('filter') || 'all';

  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [viewMode, setViewMode] = useState<'card' | 'table'>('card');
  const [markingPaidId, setMarkingPaidId] = useState<string | null>(null);
  const [downloadingPdfId, setDownloadingPdfId] = useState<string | null>(null);
  const [deletingInvoiceId, setDeletingInvoiceId] = useState<string | null>(null);
  const [sharingWhatsAppId, setSharingWhatsAppId] = useState<string | null>(null);
  const [sharingEmailId, setSharingEmailId] = useState<string | null>(null);

  // Pull to refresh handler
  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    await fetchInvoices();
    setTimeout(() => setIsRefreshing(false), 500);
  }, [fetchInvoices]);

  // Poll PDF Monkey status
  const pollPdfDownloadUrl = async (documentId: string, accessToken: string): Promise<string | null> => {
    for (let i = 0; i < 45; i++) {
      const { data } = await supabase.functions.invoke('generate-pdf-monkey', {
        body: { documentId, mode: 'status' },
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      if (data?.downloadUrl) return data.downloadUrl;
      await new Promise((res) => setTimeout(res, 2000));
    }
    return null;
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-GB", {
      style: "currency",
      currency: "GBP",
    }).format(amount);
  };

  const handleFilterChange = (filter: string) => {
    if (filter === 'all') {
      setSearchParams({});
    } else {
      setSearchParams({ filter });
    }
  };

  const handleInvoiceAction = (invoice: Quote) => {
    const status = invoice.invoice_status;
    if (status === 'draft') {
      navigate(`/electrician/invoice-quote-builder/${invoice.id}`);
    } else {
      navigate(`/electrician/invoices/${invoice.id}/view`);
    }
  };

  const handleDownloadPDF = async (invoice: Quote) => {
    try {
      setDownloadingPdfId(invoice.id);

      const pdfIsCurrent = invoice.pdf_url && invoice.pdf_generated_at &&
        new Date(invoice.pdf_generated_at) >= new Date(invoice.updatedAt);

      if (pdfIsCurrent) {
        window.open(invoice.pdf_url, '_blank');
        setDownloadingPdfId(null);
        return;
      }

      toast({
        title: 'Generating PDF',
        description: `Creating latest version for invoice ${invoice.invoice_number}...`,
        duration: 5000,
      });

      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { data: companyData } = await supabase
        .from('company_profiles')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (!companyData) {
        toast({
          title: 'Company profile required',
          description: 'Please set up your company profile before generating invoices',
          variant: 'destructive',
        });
        return;
      }

      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error('User not authenticated');

      const { data: pdfData, error: pdfError } = await supabase.functions.invoke('generate-pdf-monkey', {
        body: { quote: invoice, companyProfile: companyData, invoice_mode: true },
        headers: { Authorization: `Bearer ${session.access_token}` }
      });

      let pdfUrl: string | undefined = pdfData?.downloadUrl;
      const documentId: string | undefined = pdfData?.documentId;
      if (!pdfUrl && documentId) {
        pdfUrl = await pollPdfDownloadUrl(documentId, session.access_token) || undefined;
      }

      if (pdfError || !pdfUrl) throw new Error('Failed to generate professional PDF');

      if (pdfUrl && documentId) {
        await supabase
          .from('quotes')
          .update({ pdf_document_id: documentId, pdf_url: pdfUrl, pdf_generated_at: new Date().toISOString() })
          .eq('id', invoice.id);
      }

      window.open(pdfUrl, '_blank');
      toast({ title: 'PDF downloaded', description: `Invoice ${invoice.invoice_number} downloaded successfully`, variant: 'success', duration: 3000 });
    } catch (error) {
      console.error('Error generating invoice PDF:', error);
      toast({ title: 'Error', description: 'Failed to generate invoice PDF. Please try again.', variant: 'destructive' });
    } finally {
      setDownloadingPdfId(null);
    }
  };

  const handleSendSuccess = async () => {
    await fetchInvoices();
  };

  const handleMarkAsPaid = async (invoice: Quote) => {
    try {
      setMarkingPaidId(invoice.id);
      const { error } = await supabase.from('quotes').update({ invoice_status: 'paid' }).eq('id', invoice.id);
      if (error) throw error;
      toast({ title: 'Invoice marked as paid', description: `Invoice ${invoice.invoice_number} has been marked as paid.` });
      await fetchInvoices();
    } catch (error) {
      console.error('Error marking invoice as paid:', error);
      toast({ title: 'Error', description: 'Failed to mark invoice as paid. Please try again.', variant: 'destructive' });
    } finally {
      setMarkingPaidId(null);
    }
  };

  const handleDeleteInvoice = async (invoiceId: string) => {
    setDeletingInvoiceId(invoiceId);
    const success = await deleteInvoice(invoiceId);
    if (success) await fetchInvoices();
    setDeletingInvoiceId(null);
  };

  const handleShareWhatsApp = async (invoice: Quote) => {
    setSharingWhatsAppId(invoice.id);
    try {
      toast({ title: 'Preparing PDF', description: 'Generating shareable link for WhatsApp...', duration: 5000 });
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error('User not authenticated');

      const { data: linkData, error: linkError } = await supabase.functions.invoke('generate-temporary-pdf-link', {
        body: { documentId: invoice.id, documentType: 'invoice' },
        headers: { Authorization: `Bearer ${session.access_token}` }
      });

      if (linkError || !linkData?.publicUrl) throw new Error('Failed to generate shareable PDF link');

      const clientData = typeof (invoice as any).client_data === 'string'
        ? JSON.parse((invoice as any).client_data)
        : (invoice as any).client_data;

      const message = `Hello ${clientData?.name || 'there'},\n\nHere is your invoice:\n\n📄 Invoice #${invoice.invoice_number}\n💷 Amount: ${formatCurrency(invoice.total)}\n\n📥 Download Invoice:\n${linkData.publicUrl}\n\nThank you for your business!`;

      window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank');
      toast({ title: 'Opening WhatsApp', description: 'Invoice ready to share via WhatsApp' });
    } catch (error) {
      console.error('Error sharing via WhatsApp:', error);
      toast({ title: 'Error', description: 'Failed to prepare invoice for WhatsApp. Please try again.', variant: 'destructive' });
    } finally {
      setSharingWhatsAppId(null);
    }
  };

  const handleShareEmail = async (invoice: Quote) => {
    setSharingEmailId(invoice.id);
    try {
      toast({ title: 'Preparing PDF', description: 'Generating shareable link for email...', duration: 5000 });
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error('User not authenticated');

      const { data: linkData, error: linkError } = await supabase.functions.invoke('generate-temporary-pdf-link', {
        body: { documentId: invoice.id, documentType: 'invoice' },
        headers: { Authorization: `Bearer ${session.access_token}` }
      });

      if (linkError || !linkData?.publicUrl) throw new Error('Failed to generate shareable PDF link');

      const { data: freshInvoice, error: fetchError } = await supabase.from('quotes').select('*').eq('id', invoice.id).single();
      if (fetchError || !freshInvoice) throw new Error('Failed to fetch invoice data');

      const clientData = typeof freshInvoice.client_data === 'string'
        ? JSON.parse(freshInvoice.client_data)
        : freshInvoice.client_data;

      const subject = `Invoice ${freshInvoice.invoice_number} - ${formatCurrency(freshInvoice.total)}`;
      const body = `Hello ${clientData?.name || 'there'},\n\nPlease find attached your invoice:\n\nInvoice #${freshInvoice.invoice_number}\nAmount: ${formatCurrency(freshInvoice.total)}\n\nDownload your invoice here:\n${linkData.publicUrl}\n\nThank you for your business!`;

      window.location.href = `mailto:${clientData?.email || ''}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      toast({ title: 'Opening Email', description: 'Invoice ready to send via email' });
    } catch (error) {
      console.error('Error sharing via email:', error);
      toast({ title: 'Error', description: 'Failed to prepare invoice for email. Please try again.', variant: 'destructive' });
    } finally {
      setSharingEmailId(null);
    }
  };

  // Calculate stats
  const stats = useMemo(() => {
    const draft = invoices.filter(i => i.invoice_status === 'draft');
    const sent = invoices.filter(i => i.invoice_status === 'sent');
    const overdue = invoices.filter(i => {
      const isOverdue = i.invoice_due_date && isPast(new Date(i.invoice_due_date));
      return isOverdue || i.invoice_status === 'overdue';
    });
    const paid = invoices.filter(i => i.invoice_status === 'paid');
    const monthlyPaid = paid.reduce((sum, inv) => {
      const total = typeof inv.total === 'number' && !isNaN(inv.total) ? inv.total : 0;
      return sum + total;
    }, 0);

    return {
      total: invoices.length,
      draft: draft.length,
      sent: sent.length,
      overdue: overdue.length,
      paid: paid.length,
      monthlyTotal: monthlyPaid,
    };
  }, [invoices]);

  // Filter invoices
  const filteredInvoices = useMemo(() => {
    let filtered = invoices;

    if (activeFilter !== 'all') {
      if (activeFilter === 'overdue') {
        filtered = filtered.filter(i => {
          const isOverdue = i.invoice_due_date && isPast(new Date(i.invoice_due_date));
          return isOverdue || i.invoice_status === 'overdue';
        });
      } else {
        filtered = filtered.filter(i => i.invoice_status === activeFilter);
      }
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(i =>
        i.client?.name?.toLowerCase().includes(query) ||
        i.jobDetails?.title?.toLowerCase().includes(query) ||
        i.invoice_number?.toLowerCase().includes(query)
      );
    }

    // Sort by priority: overdue > sent > draft > paid
    return [...filtered].sort((a, b) => {
      const aOverdue = a.invoice_due_date && isPast(new Date(a.invoice_due_date));
      const bOverdue = b.invoice_due_date && isPast(new Date(b.invoice_due_date));
      if (aOverdue && !bOverdue) return -1;
      if (!aOverdue && bOverdue) return 1;
      const statusOrder = { overdue: 0, sent: 1, draft: 2, paid: 3 };
      return (statusOrder[a.invoice_status as keyof typeof statusOrder] || 4) -
             (statusOrder[b.invoice_status as keyof typeof statusOrder] || 4);
    });
  }, [invoices, activeFilter, searchQuery]);

  const filters = [
    { id: 'all', label: 'All', count: invoices.length },
    { id: 'draft', label: 'Draft', count: stats.draft, icon: Edit, color: 'text-slate-400' },
    { id: 'sent', label: 'Sent', count: stats.sent, icon: Send, color: 'text-blue-400' },
    { id: 'overdue', label: 'Overdue', count: stats.overdue, icon: AlertCircle, color: 'text-red-400' },
    { id: 'paid', label: 'Paid', count: stats.paid, icon: CheckCircle, color: 'text-emerald-400' },
  ];

  // Highlight invoice when navigating from quote
  useEffect(() => {
    if (highlightId) {
      setTimeout(() => {
        const element = document.getElementById(`invoice-${highlightId}`);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
          element.classList.add('ring-2', 'ring-emerald-400', 'animate-pulse');
          setTimeout(() => element.classList.remove('animate-pulse'), 2000);
        }
      }, 100);
    }
  }, [highlightId]);

  const canonical = `${window.location.origin}/electrician/invoices`;

  return (
    <div className="min-h-screen bg-background pb-safe pt-safe animate-fade-in">
        <Helmet>
          <title>Invoices | Elec-Mate</title>
          <meta name="description" content="Manage all your electrical invoices. Track drafts, sent invoices, payments and overdue invoices." />
          <link rel="canonical" href={canonical} />
        </Helmet>

        {/* Compact Mobile Header */}
        <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-md border-b border-border/50">
          <div className="flex items-center h-14 px-4 gap-3">
            {/* Back Button */}
            <button
              onClick={() => navigate('/electrician')}
              className="h-11 w-11 flex items-center justify-center rounded-full hover:bg-elec-gray/50 active:scale-[0.98] transition-all touch-manipulation -ml-1"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>

            {/* Title or Search */}
            {isSearchOpen ? (
              <div className="flex-1 flex items-center gap-2">
                <div className="flex-1 relative">
                  <Input
                    autoFocus
                    placeholder="Search invoices..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="h-10 pl-4 pr-10 bg-elec-gray/50 border-0 rounded-full text-sm"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute right-3 top-1/2 -translate-y-1/2"
                    >
                      <X className="h-4 w-4 text-muted-foreground" />
                    </button>
                  )}
                </div>
                <button
                  onClick={() => { setIsSearchOpen(false); setSearchQuery(""); }}
                  className="text-sm text-muted-foreground"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <>
                <h1 className="flex-1 text-lg font-bold">Invoices</h1>
                <div className="flex items-center gap-2">
                  <VoiceHeaderButton
                    hint="Send invoice"
                    currentSection="invoices"
                    onToolResult={handleRefresh}
                  />
                  <button
                    onClick={() => setIsSearchOpen(true)}
                    className="h-11 w-11 flex items-center justify-center rounded-full hover:bg-elec-gray/50 active:scale-[0.98] transition-all touch-manipulation"
                  >
                    <Search className="h-5 w-5" />
                  </button>
                  <button
                    onClick={handleRefresh}
                    disabled={isRefreshing}
                    className="h-11 w-11 flex items-center justify-center rounded-full hover:bg-elec-gray/50 active:scale-[0.98] transition-all touch-manipulation disabled:opacity-50"
                  >
                    <RefreshCw className={cn("h-5 w-5", isRefreshing && "animate-spin")} />
                  </button>
                  <Button
                    onClick={() => navigate('/electrician/invoice-builder/create')}
                    className="bg-emerald-500 text-white hover:bg-emerald-600 gap-1.5 h-11 px-3 touch-manipulation active:scale-[0.98]"
                  >
                    <Plus className="h-4 w-4" />
                    <span className="hidden sm:inline">New</span>
                  </Button>
                </div>
                {/* View Toggle - Hidden on mobile */}
                <div className="hidden lg:flex items-center gap-1 bg-elec-gray/30 rounded-lg p-1">
                  <button
                    onClick={() => setViewMode('card')}
                    className={cn(
                      "h-9 w-9 flex items-center justify-center rounded-md transition-all",
                      viewMode === 'card'
                        ? "bg-emerald-500/20 text-emerald-400"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    <LayoutGrid className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('table')}
                    className={cn(
                      "h-9 w-9 flex items-center justify-center rounded-md transition-all",
                      viewMode === 'table'
                        ? "bg-emerald-500/20 text-emerald-400"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    <List className="h-4 w-4" />
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Filter Pills - Horizontal Scroll */}
          <div className="flex gap-2 px-4 pb-3 overflow-x-auto scrollbar-hide">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => handleFilterChange(filter.id)}
                className={cn(
                  "shrink-0 h-11 px-4 rounded-full text-sm font-medium transition-all active:scale-[0.98] touch-manipulation",
                  activeFilter === filter.id
                    ? "bg-emerald-500 text-white"
                    : "bg-elec-gray/50 text-foreground hover:bg-elec-gray"
                )}
              >
                {filter.label}
                <span className={cn(
                  "ml-1.5",
                  activeFilter === filter.id ? "text-white/70" : "text-muted-foreground"
                )}>
                  {filter.count}
                </span>
              </button>
            ))}
          </div>
        </header>

        {/* Main Content */}
        <main className="px-4 py-4 space-y-4">
          {/* Stripe Connect Banner - Prompt to enable card payments */}
          <StripeConnectBanner />

          {/* Hero Stats Card */}
          <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-500 via-green-500 to-teal-500 p-5 text-white">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-black/5 rounded-full translate-y-1/2 -translate-x-1/2" />

            <div className="relative space-y-3">
              <div className="flex items-center gap-2 text-white/70">
                <PoundSterling className="h-4 w-4" />
                <span className="text-sm font-medium">Total Paid</span>
              </div>

              <div className="text-4xl font-bold tracking-tight">
                £{stats.monthlyTotal.toLocaleString('en-GB', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
              </div>

              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1.5">
                    <FileText className="h-4 w-4" />
                    <span className="font-medium">{stats.total} invoices</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle className="h-4 w-4" />
                    <span className="font-medium">{stats.paid} paid</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Quick Stats Row */}
          <section className="grid grid-cols-3 gap-3">
            <div
              className={cn(
                "bg-card border rounded-xl p-3 text-center cursor-pointer active:scale-[0.98] transition-transform touch-manipulation",
                activeFilter === 'overdue' && "ring-2 ring-red-400"
              )}
              onClick={() => handleFilterChange('overdue')}
            >
              <div className="text-lg font-bold text-red-500">{stats.overdue}</div>
              <div className="text-xs text-muted-foreground">Overdue</div>
            </div>
            <div
              className={cn(
                "bg-card border rounded-xl p-3 text-center cursor-pointer active:scale-[0.98] transition-transform touch-manipulation",
                activeFilter === 'sent' && "ring-2 ring-blue-400"
              )}
              onClick={() => handleFilterChange('sent')}
            >
              <div className="text-lg font-bold text-blue-500">{stats.sent}</div>
              <div className="text-xs text-muted-foreground">Sent</div>
            </div>
            <div
              className={cn(
                "bg-card border rounded-xl p-3 text-center cursor-pointer active:scale-[0.98] transition-transform touch-manipulation",
                activeFilter === 'draft' && "ring-2 ring-slate-400"
              )}
              onClick={() => handleFilterChange('draft')}
            >
              <div className="text-lg font-bold text-muted-foreground">{stats.draft}</div>
              <div className="text-xs text-muted-foreground">Drafts</div>
            </div>
          </section>

          {/* Analytics Dashboard */}
          {invoices.length > 0 && (
            <QuoteInvoiceAnalytics
              quotes={[]}
              invoices={invoices}
              formatCurrency={formatCurrency}
            />
          )}

          {/* Invoices List */}
          <section>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                {activeFilter === 'all' ? 'All Invoices' : `${activeFilter.charAt(0).toUpperCase() + activeFilter.slice(1)} Invoices`}
              </h2>
              <span className="text-xs text-muted-foreground">
                {filteredInvoices.length} {filteredInvoices.length === 1 ? 'invoice' : 'invoices'}
              </span>
            </div>

            {isLoading ? (
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-32 bg-elec-gray/30 rounded-xl animate-pulse" />
                ))}
              </div>
            ) : filteredInvoices.length === 0 ? (
              searchQuery ? (
                <Card className="bg-elec-gray/20 border-dashed">
                  <CardContent className="py-10 text-center">
                    <Search className="h-10 w-10 mx-auto text-muted-foreground/50 mb-3" />
                    <p className="font-medium">No results found</p>
                    <p className="text-sm text-muted-foreground mt-1">Try a different search term</p>
                    <Button variant="ghost" size="sm" className="mt-3" onClick={() => setSearchQuery("")}>
                      Clear search
                    </Button>
                  </CardContent>
                </Card>
              ) : activeFilter === 'all' ? (
                <EmptyStateGuide type="invoice" onCreateClick={() => navigate('/electrician/invoice-builder/create')} />
              ) : (
                <Card className="bg-elec-gray/20 border-dashed">
                  <CardContent className="py-10 text-center">
                    <FileText className="h-10 w-10 mx-auto text-muted-foreground/50 mb-3" />
                    <p className="font-medium">No {activeFilter} invoices</p>
                    <p className="text-sm text-muted-foreground mt-1">Invoices will appear here when {activeFilter}</p>
                  </CardContent>
                </Card>
              )
            ) : (
              <>
                {/* Table view (desktop only) */}
                {viewMode === 'table' && (
                  <InvoiceTableView
                    invoices={filteredInvoices}
                    onInvoiceAction={handleInvoiceAction}
                    onDownloadPDF={handleDownloadPDF}
                    onMarkAsPaid={handleMarkAsPaid}
                    onSendSuccess={handleSendSuccess}
                    onDeleteInvoice={handleDeleteInvoice}
                    onShareWhatsApp={handleShareWhatsApp}
                    onShareEmail={handleShareEmail}
                    markingPaidId={markingPaidId}
                    downloadingPdfId={downloadingPdfId}
                    deletingInvoiceId={deletingInvoiceId}
                  />
                )}
                {/* Card view (or mobile fallback) */}
                <div className={viewMode === 'table' ? 'lg:hidden' : ''}>
                  <InvoiceCardView
                    invoices={filteredInvoices}
                    onInvoiceAction={handleInvoiceAction}
                    onDownloadPDF={handleDownloadPDF}
                    onMarkAsPaid={handleMarkAsPaid}
                    onSendSuccess={handleSendSuccess}
                    onDeleteInvoice={handleDeleteInvoice}
                    onShareWhatsApp={handleShareWhatsApp}
                    onShareEmail={handleShareEmail}
                    markingPaidId={markingPaidId}
                    downloadingPdfId={downloadingPdfId}
                    deletingInvoiceId={deletingInvoiceId}
                    formatCurrency={formatCurrency}
                  />
                </div>
              </>
            )}
          </section>
        </main>

    </div>
  );
};

export default InvoicesPage;
