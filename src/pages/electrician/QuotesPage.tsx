import { useSearchParams, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Button } from "@/components/ui/button";
import { Plus, ArrowLeft, PoundSterling, TrendingUp, FileText, Clock, CheckCircle, XCircle, Send, RefreshCw } from "lucide-react";
import { useQuoteStorage } from "@/hooks/useQuoteStorage";
import RecentQuotesList from "@/components/electrician/quote-builder/RecentQuotesList";
import { filterQuotesByStatus } from "@/utils/quote-analytics";
import { useMemo, useState, useCallback } from "react";
import { cn } from "@/lib/utils";
import { VoiceHeaderButton } from "@/components/electrician/VoiceHeaderButton";
import { EmptyStateGuide } from "@/components/electrician/shared/EmptyStateGuide";
import { Card, CardContent } from "@/components/ui/card";
import { QuoteInvoiceAnalytics } from "@/components/electrician/analytics";

const QuotesPage = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const filter = searchParams.get('filter') || 'all';
  const [isRefreshing, setIsRefreshing] = useState(false);

  const {
    savedQuotes,
    deleteQuote,
    updateQuoteStatus,
    sendPaymentReminder,
    refreshQuotes,
    loading
  } = useQuoteStorage();

  // Refresh handler
  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    await refreshQuotes();
    setTimeout(() => setIsRefreshing(false), 500);
  }, [refreshQuotes]);

  const filteredQuotes = useMemo(() => {
    if (!filter || filter === 'all') return savedQuotes;
    if (filter === 'monthly') return savedQuotes;
    return filterQuotesByStatus(savedQuotes, filter as any);
  }, [savedQuotes, filter]);

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

      {/* Compact Mobile Header - Matches InvoicesPage */}
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-md border-b border-border/50">
        <div className="flex items-center h-14 px-4 gap-3">
          {/* Back Button */}
          <button
            onClick={() => navigate('/electrician')}
            className="h-11 w-11 flex items-center justify-center rounded-full hover:bg-elec-gray/50 active:scale-[0.98] transition-all touch-manipulation -ml-1"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>

          {/* Title */}
          <h1 className="flex-1 text-lg font-bold">Quotes</h1>

          {/* Right Side Buttons */}
          <div className="flex items-center gap-2">
            <VoiceHeaderButton
              hint="Send quote"
              currentSection="quotes"
              onToolResult={handleRefresh}
            />
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
          </div>
        </div>

        {/* Filter Pills - Horizontal Scroll */}
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
      </header>

      <div className="px-4 py-4 space-y-4 pb-6">
        {/* Hero Stats Card */}
        <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-elec-yellow via-amber-500 to-orange-500 p-5 text-black">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-black/5 rounded-full translate-y-1/2 -translate-x-1/2" />

          <div className="relative space-y-3">
            <div className="flex items-center gap-2 text-black/70">
              <PoundSterling className="h-4 w-4" />
              <span className="text-sm font-medium">Total Quote Value</span>
            </div>

            <div className="text-4xl font-bold tracking-tight">
              £{stats.totalValue.toLocaleString('en-GB', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
            </div>

            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1.5">
                  <FileText className="h-4 w-4" />
                  <span className="font-medium">{stats.counts.all} quotes</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <TrendingUp className="h-4 w-4" />
                  <span className="font-medium">{stats.conversionRate}% converted</span>
                </div>
              </div>
            </div>
          </div>
        </section>


        {/* Quick Stats Row */}
        <section className="grid grid-cols-3 gap-3">
          <div className="bg-card border rounded-xl p-3 text-center">
            <div className="text-lg font-bold text-green-500">
              £{stats.approvedValue.toLocaleString('en-GB', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
            </div>
            <div className="text-xs text-muted-foreground">Approved</div>
          </div>
          <div className="bg-card border rounded-xl p-3 text-center">
            <div className="text-lg font-bold text-amber-500">{stats.counts.sent}</div>
            <div className="text-xs text-muted-foreground">Awaiting</div>
          </div>
          <div className="bg-card border rounded-xl p-3 text-center">
            <div className="text-lg font-bold text-muted-foreground">{stats.counts.draft}</div>
            <div className="text-xs text-muted-foreground">Drafts</div>
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
            filter === 'all' ? (
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
            <RecentQuotesList
              quotes={filteredQuotes}
              onDeleteQuote={deleteQuote}
              onUpdateQuoteStatus={updateQuoteStatus}
              onSendPaymentReminder={sendPaymentReminder}
              showAll={true}
            />
          )}
        </section>
      </div>

    </div>
  );
};

export default QuotesPage;
