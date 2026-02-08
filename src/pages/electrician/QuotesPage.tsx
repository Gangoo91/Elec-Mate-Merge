import { useSearchParams, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Button } from "@/components/ui/button";
import { Plus, ArrowLeft, PoundSterling, TrendingUp, FileText, Clock, CheckCircle, XCircle, Send, RefreshCw, Receipt, Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useQuoteStorage } from "@/hooks/useQuoteStorage";
import { filterQuotesByStatus } from "@/utils/quote-analytics";
import { useMemo, useState, useCallback } from "react";
import { cn } from "@/lib/utils";
import { VoiceHeaderButton } from "@/components/electrician/VoiceHeaderButton";
import { EmptyStateGuide } from "@/components/electrician/shared/EmptyStateGuide";
import { Card, CardContent } from "@/components/ui/card";
import { QuoteInvoiceAnalytics } from "@/components/electrician/analytics";
import { SwipeableQuoteCard } from "@/components/electrician/quote-builder/SwipeableQuoteCard";
import { AnimatePresence } from "framer-motion";
import { ConfirmationDialog } from "@/components/ui/confirmation-dialog";
import { toast } from "@/hooks/use-toast";

const QuotesPage = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const filter = searchParams.get('filter') || 'all';
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [quoteToDelete, setQuoteToDelete] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);

  const {
    savedQuotes,
    deleteQuote,
    updateQuoteStatus,
    sendPaymentReminder,
    refreshQuotes,
    loading,
    lastUpdated
  } = useQuoteStorage();

  const handleDeleteQuote = async (quoteId: string) => {
    const success = await deleteQuote(quoteId);
    if (success) {
      toast({
        title: "Quote deleted",
        description: "The quote has been removed successfully.",
      });
    }
    setQuoteToDelete(null);
  };

  // Refresh handler
  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    await refreshQuotes();
    setTimeout(() => setIsRefreshing(false), 500);
  }, [refreshQuotes]);

  const filteredQuotes = useMemo(() => {
    let filtered = savedQuotes;

    // Status filter
    if (filter && filter !== 'all' && filter !== 'monthly') {
      filtered = filterQuotesByStatus(filtered, filter as any);
    }

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(q =>
        q.client?.name?.toLowerCase().includes(query) ||
        q.quoteNumber?.toLowerCase().includes(query) ||
        q.jobDetails?.title?.toLowerCase().includes(query) ||
        q.jobDetails?.description?.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [savedQuotes, filter, searchQuery]);

  // Calculate stats
  const stats = useMemo(() => {
    const totalValue = savedQuotes.reduce((acc, q) => acc + (q.total || 0), 0);
    const approvedValue = savedQuotes
      .filter(q => q.status === 'approved' || q.acceptance_status === 'accepted')
      .reduce((acc, q) => acc + (q.total || 0), 0);
    const conversionRate = savedQuotes.length > 0
      ? Math.round((savedQuotes.filter(q => q.status === 'approved' || q.acceptance_status === 'accepted').length / savedQuotes.length) * 100)
      : 0;

    return {
      totalValue,
      approvedValue,
      conversionRate,
      counts: {
        all: savedQuotes.length,
        draft: savedQuotes.filter(q => q.status === 'draft').length,
        sent: savedQuotes.filter(q => q.status === 'sent' || q.status === 'pending').length,
        approved: savedQuotes.filter(q => q.status === 'approved' || q.acceptance_status === 'accepted').length,
        rejected: savedQuotes.filter(q => q.status === 'rejected' || q.acceptance_status === 'rejected').length,
      }
    };
  }, [savedQuotes]);

  const setFilter = (newFilter: string) => {
    if (newFilter === 'all') {
      setSearchParams({});
    } else {
      setSearchParams({ filter: newFilter });
    }
  };

  const filterOptions = [
    { id: 'all', label: 'All', icon: FileText, count: stats.counts.all },
    { id: 'draft', label: 'Draft', icon: Clock, count: stats.counts.draft },
    { id: 'sent', label: 'Sent', icon: Send, count: stats.counts.sent },
    { id: 'approved', label: 'Approved', icon: CheckCircle, count: stats.counts.approved },
    { id: 'rejected', label: 'Rejected', icon: XCircle, count: stats.counts.rejected },
  ];

  const canonical = `${window.location.origin}/electrician/quotes`;

  return (
    <div className="-mt-3 sm:-mt-4 md:-mt-6 bg-background animate-fade-in">
        <Helmet>
        <title>All Quotes | Professional Quote Management for Electricians</title>
        <meta
          name="description"
          content="View, manage and track all your electrical quotes. Professional quote management for UK electricians with BS 7671 compliant templates."
        />
        <link rel="canonical" href={canonical} />
      </Helmet>

      {/* iOS-Style Native Header */}
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-md">
        {showSearch ? (
          /* Search Mode - Full width search input */
          <div className="flex items-center h-14 px-4 gap-2">
            <div className="relative flex-1">
              {!searchQuery && (
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/70 pointer-events-none" />
              )}
              <Input
                type="text"
                placeholder="Search by name, quote #..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={cn(
                  "h-11 pr-9 text-base touch-manipulation rounded-xl bg-white/[0.05] border-white/[0.06] focus:border-elec-yellow focus:ring-1 focus:ring-elec-yellow/20",
                  !searchQuery && "pl-9"
                )}
                autoFocus
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 flex items-center justify-center rounded-full bg-white/[0.1] hover:bg-white/[0.15] touch-manipulation"
                >
                  <X className="h-3 w-3 text-white" />
                </button>
              )}
            </div>
            <button
              onClick={() => {
                setShowSearch(false);
                setSearchQuery('');
              }}
              className="text-sm text-elec-yellow font-medium px-2 touch-manipulation"
            >
              Cancel
            </button>
          </div>
        ) : (
          <>
            {/* Row 1: Navigation bar */}
            <div className="flex items-center h-14 px-4 gap-2">
              <button
                onClick={() => navigate('/electrician/business')}
                className="h-10 w-10 -ml-2 flex items-center justify-center rounded-xl hover:bg-white/[0.05] active:scale-[0.98] transition-all touch-manipulation"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>

              <h1 className="flex-1 text-xl font-bold">Quotes</h1>

              {/* Right side actions */}
              <button
                onClick={() => setShowSearch(true)}
                className="h-10 w-10 flex items-center justify-center rounded-xl hover:bg-white/[0.05] active:scale-[0.98] transition-all touch-manipulation"
              >
                <Search className="h-5 w-5 text-white/80" />
              </button>

              <button
                onClick={() => navigate('/electrician/quote-builder/create')}
                className="h-10 w-10 rounded-xl bg-elec-yellow flex items-center justify-center active:scale-[0.98] touch-manipulation"
              >
                <Plus className="h-5 w-5 text-black" />
              </button>
            </div>

            {/* Row 2: Quick actions */}
            <div className="flex items-center gap-3 px-4 pb-3">
              <button
                onClick={() => navigate('/electrician/invoices')}
                className="flex items-center gap-2 text-elec-yellow active:opacity-70 touch-manipulation"
              >
                <Receipt className="h-4 w-4" />
                <span className="text-[14px] font-medium">Invoices</span>
              </button>

              <div className="flex-1" />

              <button
                onClick={handleRefresh}
                disabled={isRefreshing}
                className="h-8 w-8 flex items-center justify-center rounded-lg hover:bg-white/[0.05] active:scale-[0.98] transition-all touch-manipulation disabled:opacity-50"
              >
                <RefreshCw className={cn("h-4 w-4 text-white/60", isRefreshing && "animate-spin")} />
              </button>

              <VoiceHeaderButton
                hint="Send quote"
                currentSection="quotes"
                onToolResult={handleRefresh}
              />
            </div>
          </>
        )}

        {/* Filter Pills - Compact iOS style */}
        {!showSearch && (
          <div className="flex gap-2 px-4 pb-3 overflow-x-auto scrollbar-hide">
            {filterOptions.map((option) => (
              <button
                key={option.id}
                onClick={() => setFilter(option.id)}
                className={cn(
                  "shrink-0 flex items-center gap-1.5 h-9 px-3.5 rounded-full text-[13px] font-medium transition-all touch-manipulation active:scale-[0.97]",
                  filter === option.id
                    ? "bg-elec-yellow text-black"
                    : "bg-white/[0.08] text-white"
                )}
              >
                {option.label}
                <span className={cn(
                  "text-[11px] px-1.5 py-0.5 rounded-full min-w-[18px] text-center font-semibold",
                  filter === option.id ? "bg-black/20" : "bg-white/[0.15]"
                )}>
                  {option.count}
                </span>
              </button>
            ))}
          </div>
        )}
      </header>

      <div className="px-4 py-4 space-y-4 pb-6">
        {/* iOS-Style Pipeline Card - Clean Grouped List */}
        <section className="rounded-2xl bg-white/[0.03] border border-white/[0.06] overflow-hidden">
          {/* Main Value Section */}
          <div className="p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-elec-yellow flex items-center justify-center">
                  <PoundSterling className="h-5 w-5 text-black" />
                </div>
                <div>
                  <p className="text-[12px] text-white">Pipeline Value</p>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                    <span className="text-[11px] text-white">Live</span>
                  </div>
                </div>
              </div>
            </div>
            <p className="text-4xl font-bold text-elec-yellow">
              £{stats.totalValue.toLocaleString('en-GB', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
            </p>
            <p className="text-[13px] text-white mt-1">
              {stats.counts.all} active • {stats.conversionRate}% win rate
            </p>
          </div>

          {/* Status Grid - All elec-yellow themed */}
          <div className="grid grid-cols-3 divide-x divide-white/[0.06] border-t border-white/[0.06]">
            <button
              onClick={() => setFilter('approved')}
              className="p-4 text-center hover:bg-white/[0.02] active:scale-[0.98] touch-manipulation transition-colors"
            >
              <div className="w-9 h-9 mx-auto rounded-xl bg-elec-yellow/20 flex items-center justify-center mb-2">
                <CheckCircle className="h-4 w-4 text-elec-yellow" />
              </div>
              <p className="text-[11px] text-white mb-0.5">Approved</p>
              <p className="text-lg font-bold text-white">
                £{(stats.approvedValue / 1000).toFixed(0)}k
              </p>
            </button>

            <button
              onClick={() => setFilter('sent')}
              className="p-4 text-center hover:bg-white/[0.02] active:scale-[0.98] touch-manipulation transition-colors"
            >
              <div className="w-9 h-9 mx-auto rounded-xl bg-elec-yellow/20 flex items-center justify-center mb-2">
                <Send className="h-4 w-4 text-elec-yellow" />
              </div>
              <p className="text-[11px] text-white mb-0.5">Pending</p>
              <p className="text-lg font-bold text-white">
                {stats.counts.sent}
              </p>
            </button>

            <button
              onClick={() => setFilter('draft')}
              className="p-4 text-center hover:bg-white/[0.02] active:scale-[0.98] touch-manipulation transition-colors"
            >
              <div className="w-9 h-9 mx-auto rounded-xl bg-elec-yellow/20 flex items-center justify-center mb-2">
                <Clock className="h-4 w-4 text-elec-yellow" />
              </div>
              <p className="text-[11px] text-white mb-0.5">Draft</p>
              <p className="text-lg font-bold text-white">
                {stats.counts.draft}
              </p>
            </button>
          </div>
        </section>

        {/* Analytics Dashboard */}
        {savedQuotes.length > 0 && (
          <QuoteInvoiceAnalytics
            quotes={savedQuotes}
            formatCurrency={(value) => `£${value.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
            lastUpdated={lastUpdated}
            onRefresh={refreshQuotes}
            isLoading={loading}
          />
        )}

        {/* Quotes List */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">
              {filter === 'all' ? 'All Quotes' : filterOptions.find(f => f.id === filter)?.label + ' Quotes'}
            </h2>
            <span className="text-sm text-muted-foreground">
              {filteredQuotes.length} {filteredQuotes.length === 1 ? 'quote' : 'quotes'}
            </span>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-2 border-elec-yellow border-t-transparent"></div>
            </div>
          ) : filteredQuotes.length === 0 ? (
            searchQuery.trim() ? (
              <Card className="bg-muted/20 border-dashed">
                <CardContent className="py-10 text-center">
                  <Search className="h-10 w-10 mx-auto text-muted-foreground/50 mb-3" />
                  <p className="font-medium">No quotes found</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    No quotes match "{searchQuery}"
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => setSearchQuery('')}
                    className="mt-4"
                  >
                    Clear search
                  </Button>
                </CardContent>
              </Card>
            ) : filter === 'all' ? (
              <EmptyStateGuide
                type="quote"
                onCreateClick={() => navigate('/electrician/quote-builder/create')}
              />
            ) : (
              <Card className="bg-muted/20 border-dashed">
                <CardContent className="py-10 text-center">
                  <FileText className="h-10 w-10 mx-auto text-muted-foreground/50 mb-3" />
                  <p className="font-medium">No {filter} quotes</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Quotes will appear here when {filter}
                  </p>
                </CardContent>
              </Card>
            )
          ) : (
            <div className="space-y-3">
              <AnimatePresence>
                {filteredQuotes.map((quote, idx) => (
                  <SwipeableQuoteCard
                    key={quote.id}
                    quote={quote}
                    onDelete={() => setQuoteToDelete(quote.id)}
                    onEdit={() => navigate(`/electrician/quote-builder/${quote.id}`)}
                    onView={() => navigate(`/electrician/quotes/view/${quote.id}`)}
                    delay={idx * 0.05}
                  />
                ))}
              </AnimatePresence>
            </div>
          )}
        </section>
      </div>

      {/* Delete Confirmation Dialog */}
      <ConfirmationDialog
        open={!!quoteToDelete}
        onOpenChange={(open) => !open && setQuoteToDelete(null)}
        onConfirm={() => quoteToDelete && handleDeleteQuote(quoteToDelete)}
        title="Delete Quote"
        description="Are you sure you want to delete this quote? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
      />
    </div>
  );
};

export default QuotesPage;
