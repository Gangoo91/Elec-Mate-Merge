import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Button } from "@/components/ui/button";
import { Plus, ArrowLeft, PoundSterling, TrendingUp, FileText, Clock, CheckCircle, XCircle, Send, RefreshCw } from "lucide-react";
import { useQuoteStorage } from "@/hooks/useQuoteStorage";
import RecentQuotesList from "@/components/electrician/quote-builder/RecentQuotesList";
import { filterQuotesByStatus } from "@/utils/quote-analytics";
import { useMemo, useState, useCallback } from "react";
import { cn } from "@/lib/utils";
import { VoiceFormProvider } from "@/contexts/VoiceFormContext";
import { ElectricianVoiceAssistant } from "@/components/electrician/ElectricianVoiceAssistant";
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

  // Voice navigation handler
  const handleVoiceNavigate = (section: string) => {
    const sectionLower = section.toLowerCase().replace(/\s+/g, '-');
    switch (sectionLower) {
      case 'create':
      case 'new-quote':
      case 'new':
        navigate('/electrician/quote-builder/create');
        break;
      case 'draft':
      case 'sent':
      case 'approved':
      case 'rejected':
        setSearchParams({ filter: sectionLower });
        break;
      case 'back':
      case 'home':
        navigate('/electrician');
        break;
      default:
        navigate(`/electrician/${sectionLower}`);
    }
  };

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
    <VoiceFormProvider>
      <div className="min-h-screen bg-background pt-safe pb-safe animate-fade-in">
      <Helmet>
        <title>All Quotes | Professional Quote Management for Electricians</title>
        <meta
          name="description"
          content="View, manage and track all your electrical quotes. Professional quote management for UK electricians with BS 7671 compliant templates."
        />
        <link rel="canonical" href={canonical} />
      </Helmet>

      {/* Compact Header */}
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b">
        <div className="px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/electrician">
              <Button variant="ghost" size="icon" className="h-11 w-11 touch-manipulation active:scale-[0.98]">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <h1 className="text-xl font-bold">Quotes</h1>
          </div>
          <Link to="/electrician/quote-builder/create">
            <Button size="sm" className="bg-elec-yellow text-black hover:bg-elec-yellow/90 h-11 gap-1.5 touch-manipulation active:scale-[0.98]">
              <Plus className="h-4 w-4" />
              New
            </Button>
          </Link>
          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="h-11 w-11 flex items-center justify-center rounded-full hover:bg-muted active:scale-[0.98] transition-all touch-manipulation disabled:opacity-50"
          >
            <RefreshCw className={cn("h-5 w-5", isRefreshing && "animate-spin")} />
          </button>
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

        {/* Filter Pills */}
        <section className="overflow-x-auto scrollbar-hide -mx-4 px-4">
          <div className="flex gap-2 min-w-max pb-1">
            {filterOptions.map((option) => {
              const isActive = filter === option.id;
              const Icon = option.icon;
              return (
                <button
                  key={option.id}
                  onClick={() => setFilter(option.id)}
                  className={cn(
                    "flex items-center gap-2 h-9 px-4 rounded-full text-sm font-medium transition-all touch-manipulation",
                    isActive
                      ? "bg-elec-yellow text-black shadow-sm"
                      : "bg-card border border-border text-muted-foreground hover:text-foreground hover:bg-muted"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  <span>{option.label}</span>
                  {option.count > 0 && (
                    <span className={cn(
                      "text-xs px-1.5 py-0.5 rounded-full min-w-[20px] text-center",
                      isActive ? "bg-black/20" : "bg-muted"
                    )}>
                      {option.count}
                    </span>
                  )}
                </button>
              );
            })}
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

      {/* Voice Assistant */}
      <ElectricianVoiceAssistant
        onNavigate={handleVoiceNavigate}
        currentSection="quotes"
      />
    </div>
    </VoiceFormProvider>
  );
};

export default QuotesPage;
