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
    loading
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
    <div className="min-h-screen bg-background pt-safe pb-safe animate-fade-in">
        <Helmet>
        <title>All Quotes | Professional Quote Management for Electricians</title>
        <meta
          name="description"
          content="View, manage and track all your electrical quotes. Professional quote management for UK electricians with BS 7671 compliant templates."
        />
        <link rel="canonical" href={canonical} />
      </Helmet>

      {/* Mobile-Optimized Header - Matches InvoicesPage Layout */}
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-md border-b border-border/50">
        {showSearch ? (
          /* Search Mode - Full width search input */
          <div className="flex items-center h-14 px-4 gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search by name, quote #..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-11 pl-9 pr-9 text-base touch-manipulation bg-elec-gray/50 border-elec-gray focus:border-elec-yellow"
                autoFocus
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 flex items-center justify-center rounded-full bg-muted hover:bg-muted/80 touch-manipulation"
                >
                  <X className="h-3 w-3" />
                </button>
              )}
            </div>
            <button
              onClick={() => {
                setShowSearch(false);
                setSearchQuery('');
              }}
              className="text-sm text-muted-foreground font-medium px-2"
            >
              Cancel
            </button>
          </div>
        ) : (
          <>
            {/* Row 1: Back + Title + Primary Action */}
            <div className="flex items-center h-14 px-4 gap-3">
              <button
                onClick={() => navigate('/electrician')}
                className="h-11 w-11 flex items-center justify-center rounded-full hover:bg-elec-gray/50 active:scale-[0.98] transition-all touch-manipulation -ml-2"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
              <h1 className="flex-1 text-xl font-bold">Quotes</h1>

              {/* New Quote - Primary Action, always visible */}
              <Button
                onClick={() => navigate('/electrician/quote-builder/create')}
                className="shrink-0 bg-elec-yellow text-black hover:bg-elec-yellow/90 gap-2 h-11 px-4 touch-manipulation active:scale-[0.98] font-semibold"
              >
                <Plus className="h-4 w-4" />
                <span className="hidden xs:inline">New</span>
                <span className="hidden sm:inline"> Quote</span>
              </Button>
            </div>

            {/* Row 2: Secondary Tools - Horizontally scrollable on mobile */}
            <div className="flex items-center gap-2 px-4 pb-3 overflow-x-auto scrollbar-hide">
              {/* Quick Link to Invoices - Icon only on mobile */}
              <Button
                variant="outline"
                onClick={() => navigate('/electrician/invoices')}
                className="shrink-0 h-11 w-11 sm:w-auto sm:px-4 border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow/10 hover:border-elec-yellow/50 touch-manipulation gap-2"
                title="View Invoices"
              >
                <Receipt className="h-4 w-4" />
                <span className="hidden sm:inline">Invoices</span>
              </Button>

              {/* Search */}
              <button
                onClick={() => setShowSearch(true)}
                className="shrink-0 h-11 w-11 flex items-center justify-center rounded-full bg-elec-gray/50 hover:bg-elec-gray active:scale-[0.98] transition-all touch-manipulation"
                title="Search quotes"
              >
                <Search className="h-5 w-5" />
              </button>

              {/* Refresh */}
              <button
                onClick={handleRefresh}
                disabled={isRefreshing}
                className="shrink-0 h-11 w-11 flex items-center justify-center rounded-full bg-elec-gray/50 hover:bg-elec-gray active:scale-[0.98] transition-all touch-manipulation disabled:opacity-50"
              >
                <RefreshCw className={cn("h-5 w-5", isRefreshing && "animate-spin")} />
              </button>

              {/* Voice */}
              <VoiceHeaderButton
                hint="Send quote"
                currentSection="quotes"
                onToolResult={handleRefresh}
              />
            </div>
          </>
        )}

        {/* Row 3: Filter Pills - Horizontal Scroll */}
        {!showSearch && (
          <div className="flex gap-2 px-4 pb-3 overflow-x-auto scrollbar-hide">
            {filterOptions.map((option) => {
            const Icon = option.icon;
            return (
              <button
                key={option.id}
                onClick={() => setFilter(option.id)}
                className={cn(
                  "shrink-0 h-11 px-4 rounded-full text-sm font-medium transition-all active:scale-[0.98] touch-manipulation flex items-center gap-2",
                  filter === option.id
                    ? "bg-elec-yellow text-black"
                    : "bg-elec-gray/50 text-foreground hover:bg-elec-gray"
                )}
              >
                <Icon className="h-4 w-4" />
                {option.label}
                <span className={cn(
                  "text-xs px-1.5 py-0.5 rounded-full min-w-[20px] text-center",
                  filter === option.id ? "bg-black/20" : "bg-muted"
                )}>
                  {option.count}
                </span>
              </button>
            );
          })}
          </div>
        )}
      </header>

      <div className="px-4 py-4 space-y-4 pb-6">
        {/* Premium Financial Snapshot - Best in Class Mobile */}
        <section className="relative overflow-hidden rounded-3xl glass-premium p-6 border border-white/[0.08]">
          {/* Gradient accent line at top */}
          <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-elec-yellow via-amber-400 to-elec-yellow" />

          {/* Decorative blur elements */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-elec-yellow/[0.08] rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-amber-400/[0.06] rounded-full blur-2xl translate-y-1/2 -translate-x-1/4" />

          <div className="relative space-y-5">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-elec-yellow/10">
                  <PoundSterling className="h-4 w-4 text-elec-yellow" />
                </div>
                <span className="text-sm font-medium text-white/70">Total Pipeline Value</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.06] border border-white/[0.08]">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-xs font-medium text-white/70">Live</span>
              </div>
            </div>

            {/* Main Value */}
            <div>
              <div className="text-5xl font-bold text-white tracking-tight mb-2">
                £{stats.totalValue.toLocaleString('en-GB', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
              </div>
              <div className="flex items-center gap-3 text-sm">
                <div className="flex items-center gap-1.5 text-white/50">
                  <FileText className="h-3.5 w-3.5" />
                  <span>{stats.counts.all} active</span>
                </div>
                <div className="w-1 h-1 rounded-full bg-white/20" />
                <div className="flex items-center gap-1.5 text-green-400">
                  <TrendingUp className="h-3.5 w-3.5" />
                  <span className="font-medium">{stats.conversionRate}% win rate</span>
                </div>
              </div>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-3 gap-2 pt-3 border-t border-white/[0.08]">
              <button
                onClick={() => setFilter('approved')}
                className="group relative p-3 rounded-xl bg-gradient-to-br from-green-500/10 to-emerald-600/5 border border-green-500/20 hover:border-green-500/40 active:scale-[0.97] transition-all touch-manipulation"
              >
                <div className="flex flex-col items-start gap-1">
                  <CheckCircle className="h-4 w-4 text-green-400 mb-1" />
                  <div className="text-xs text-green-400/70 font-medium">Approved</div>
                  <div className="text-lg font-bold text-green-400">
                    £{(stats.approvedValue / 1000).toFixed(0)}k
                  </div>
                </div>
                <div className="absolute inset-0 bg-green-400/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>

              <button
                onClick={() => setFilter('sent')}
                className="group relative p-3 rounded-xl bg-gradient-to-br from-blue-500/10 to-blue-600/5 border border-blue-500/20 hover:border-blue-500/40 active:scale-[0.97] transition-all touch-manipulation"
              >
                <div className="flex flex-col items-start gap-1">
                  <Send className="h-4 w-4 text-blue-400 mb-1" />
                  <div className="text-xs text-blue-400/70 font-medium">Pending</div>
                  <div className="text-lg font-bold text-blue-400">
                    {stats.counts.sent}
                  </div>
                </div>
                <div className="absolute inset-0 bg-blue-400/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>

              <button
                onClick={() => setFilter('draft')}
                className="group relative p-3 rounded-xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/[0.08] hover:border-white/20 active:scale-[0.97] transition-all touch-manipulation"
              >
                <div className="flex flex-col items-start gap-1">
                  <Clock className="h-4 w-4 text-white/50 mb-1" />
                  <div className="text-xs text-white/40 font-medium">Draft</div>
                  <div className="text-lg font-bold text-white/70">
                    {stats.counts.draft}
                  </div>
                </div>
                <div className="absolute inset-0 bg-white/[0.02] rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            </div>
          </div>
        </section>

        {/* Analytics Dashboard */}
        {savedQuotes.length > 0 && (
          <QuoteInvoiceAnalytics
            quotes={savedQuotes}
            formatCurrency={(value) => `£${value.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
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
