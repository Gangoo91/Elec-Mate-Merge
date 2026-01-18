import { useNavigate, useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, FileText, Clock, CheckCircle, TrendingUp, XCircle, Send, Search, ArrowLeft, X, RefreshCw } from "lucide-react";
import { VoiceHeaderButton } from "@/components/electrician/VoiceHeaderButton";
import RecentQuotesList from "@/components/electrician/quote-builder/RecentQuotesList";
import { useQuoteStorage } from "@/hooks/useQuoteStorage";
import FinancialSnapshot from "@/components/electrician/quote-builder/FinancialSnapshot";
import { EmptyStateGuide } from "@/components/electrician/shared/EmptyStateGuide";
import React, { useState, useMemo, useCallback } from "react";
import { VoiceFormProvider } from "@/contexts/VoiceFormContext";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const QuoteBuilder = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [showFinancialSnapshot, setShowFinancialSnapshot] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Get filter from URL params or default to 'all'
  const activeFilter = searchParams.get('filter') || 'all';

  const {
    savedQuotes,
    deleteQuote,
    updateQuoteStatus,
    sendPaymentReminder,
    getQuoteStats,
    loading,
    refreshQuotes
  } = useQuoteStorage();

  const stats = getQuoteStats();

  // Pull to refresh handler
  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    await refreshQuotes();
    setTimeout(() => setIsRefreshing(false), 500);
  }, [refreshQuotes]);

  // Filter quotes based on active filter and search
  const filteredQuotes = useMemo(() => {
    let filtered = savedQuotes;

    if (activeFilter !== 'all') {
      filtered = filtered.filter(q => q.status === activeFilter);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(q =>
        q.client?.name?.toLowerCase().includes(query) ||
        q.jobDetails?.title?.toLowerCase().includes(query) ||
        q.quoteNumber?.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [savedQuotes, activeFilter, searchQuery]);

  const handleFilterChange = (filter: string) => {
    if (filter === 'all') {
      setSearchParams({});
    } else {
      setSearchParams({ filter });
    }
  };

  const filters = [
    { id: 'all', label: 'All', count: savedQuotes.length },
    { id: 'pending', label: 'Pending', count: stats.pending, icon: Clock, color: 'text-amber-400' },
    { id: 'sent', label: 'Sent', count: stats.sent, icon: Send, color: 'text-blue-400' },
    { id: 'approved', label: 'Approved', count: stats.approved, icon: CheckCircle, color: 'text-emerald-400' },
    { id: 'rejected', label: 'Rejected', count: stats.rejected, icon: XCircle, color: 'text-red-400' },
  ];

  const canonical = `${window.location.origin}/electrician/quote-builder`;

  return (
    <VoiceFormProvider>
      <div className="bg-background   animate-fade-in">
        <Helmet>
          <title>Quote Builder | Elec-Mate</title>
          <meta
            name="description"
            content="Professional quote builder for UK electricians. Create, manage and track electrical quotes."
          />
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
                    placeholder="Search quotes..."
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
                  onClick={() => {
                    setIsSearchOpen(false);
                    setSearchQuery("");
                  }}
                  className="text-sm text-muted-foreground"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <>
                <h1 className="flex-1 text-lg font-bold">Quotes</h1>
                <VoiceHeaderButton
                  hint="Create quote"
                  currentSection="quotes"
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
                  onClick={() => navigate('/electrician/quote-builder/create')}
                  className="bg-elec-yellow text-black hover:bg-elec-yellow/90 gap-1.5 h-11 px-3 touch-manipulation active:scale-[0.98]"
                >
                  <Plus className="h-4 w-4" />
                  <span className="hidden sm:inline">New</span>
                </Button>
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
                    ? "bg-elec-yellow text-elec-dark"
                    : "bg-elec-gray/50 text-foreground hover:bg-elec-gray"
                )}
              >
                {filter.label}
                <span className={cn(
                  "ml-1.5",
                  activeFilter === filter.id ? "text-elec-dark/70" : "text-muted-foreground"
                )}>
                  {filter.count}
                </span>
              </button>
            ))}
          </div>
        </header>

        {/* Main Content */}
        <main className="px-4 py-4 space-y-4">
          {/* Stats Summary - Tappable Cards */}
          <div className="grid grid-cols-2 gap-3">
            {/* Monthly Revenue Card */}
            <Card
              className="col-span-2 cursor-pointer active:scale-[0.98] transition-transform bg-gradient-to-br from-elec-yellow/15 to-elec-yellow/5 border-elec-yellow/20"
              onClick={() => setShowFinancialSnapshot(true)}
            >
              <CardContent className="p-4 flex items-center gap-4">
                <div className="h-12 w-12 rounded-2xl bg-elec-yellow/20 flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-elec-yellow" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground font-medium">This Month</p>
                  <p className="text-2xl font-bold text-elec-yellow">
                    £{stats.monthlyTotal.toLocaleString()}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-muted-foreground">{stats.approved} approved</p>
                  <p className="text-xs text-emerald-400">+{stats.sent} sent</p>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card
              className={cn(
                "cursor-pointer active:scale-[0.98] transition-transform",
                activeFilter === 'pending' && "ring-2 ring-amber-400"
              )}
              onClick={() => handleFilterChange('pending')}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <Clock className="h-5 w-5 text-amber-400" />
                  <span className="text-2xl font-bold">{stats.pending}</span>
                </div>
                <p className="text-xs text-muted-foreground">Pending</p>
              </CardContent>
            </Card>

            <Card
              className={cn(
                "cursor-pointer active:scale-[0.98] transition-transform",
                activeFilter === 'approved' && "ring-2 ring-emerald-400"
              )}
              onClick={() => handleFilterChange('approved')}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <CheckCircle className="h-5 w-5 text-emerald-400" />
                  <span className="text-2xl font-bold">{stats.approved}</span>
                </div>
                <p className="text-xs text-muted-foreground">Approved</p>
              </CardContent>
            </Card>
          </div>

          {/* Quotes List */}
          <section>
            {/* Section Header */}
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                {activeFilter === 'all' ? 'All Quotes' : `${activeFilter.charAt(0).toUpperCase() + activeFilter.slice(1)} Quotes`}
              </h2>
              <span className="text-xs text-muted-foreground">
                {filteredQuotes.length} {filteredQuotes.length === 1 ? 'quote' : 'quotes'}
              </span>
            </div>

            {/* Quote Cards or Empty State */}
            {loading ? (
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-32 bg-elec-gray/30 rounded-xl animate-pulse" />
                ))}
              </div>
            ) : filteredQuotes.length === 0 ? (
              searchQuery ? (
                <Card className="bg-elec-gray/20 border-dashed">
                  <CardContent className="py-10 text-center">
                    <Search className="h-10 w-10 mx-auto text-muted-foreground/50 mb-3" />
                    <p className="font-medium">No results found</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Try a different search term
                    </p>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="mt-3"
                      onClick={() => setSearchQuery("")}
                    >
                      Clear search
                    </Button>
                  </CardContent>
                </Card>
              ) : activeFilter === 'all' ? (
                <EmptyStateGuide
                  type="quote"
                  onCreateClick={() => navigate('/electrician/quote-builder/create')}
                />
              ) : (
                <Card className="bg-elec-gray/20 border-dashed">
                  <CardContent className="py-10 text-center">
                    <FileText className="h-10 w-10 mx-auto text-muted-foreground/50 mb-3" />
                    <p className="font-medium">No {activeFilter} quotes</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Quotes will appear here when {activeFilter}
                    </p>
                  </CardContent>
                </Card>
              )
            ) : (
              <RecentQuotesList
                quotes={filteredQuotes}
                onDeleteQuote={deleteQuote}
                onUpdateQuoteStatus={updateQuoteStatus}
                onSendPaymentReminder={sendPaymentReminder}
                showAll
              />
            )}
          </section>
        </main>

        {/* Financial Snapshot Modal */}
        <FinancialSnapshot
          isOpen={showFinancialSnapshot}
          onClose={() => setShowFinancialSnapshot(false)}
          quotes={savedQuotes}
        />
      </div>
    </VoiceFormProvider>
  );
};

export default QuoteBuilder;
