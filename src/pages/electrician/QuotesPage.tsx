import { Link, useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Button } from "@/components/ui/button";
import { Plus, ArrowLeft, PoundSterling, TrendingUp, FileText, Clock, CheckCircle, XCircle, Send } from "lucide-react";
import { useQuoteStorage } from "@/hooks/useQuoteStorage";
import RecentQuotesList from "@/components/electrician/quote-builder/RecentQuotesList";
import { filterQuotesByStatus } from "@/utils/quote-analytics";
import { useMemo } from "react";
import { cn } from "@/lib/utils";

const QuotesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const filter = searchParams.get('filter') || 'all';

  const {
    savedQuotes,
    deleteQuote,
    updateQuoteStatus,
    sendPaymentReminder,
    loading
  } = useQuoteStorage();

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
    <div className="min-h-screen bg-background">
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
              <Button variant="ghost" size="icon" className="h-9 w-9">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <h1 className="text-xl font-bold">Quotes</h1>
          </div>
          <Link to="/electrician/quote-builder/create">
            <Button size="sm" className="bg-elec-yellow text-black hover:bg-elec-yellow/90 h-9 gap-1.5">
              <Plus className="h-4 w-4" />
              New
            </Button>
          </Link>
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
            <div className="text-center py-12 space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-muted flex items-center justify-center">
                <FileText className="h-8 w-8 text-muted-foreground" />
              </div>
              <div className="space-y-1">
                <p className="font-medium">No quotes yet</p>
                <p className="text-sm text-muted-foreground">
                  Create your first quote to get started
                </p>
              </div>
              <Link to="/electrician/quote-builder/create">
                <Button className="bg-elec-yellow text-black hover:bg-elec-yellow/90 gap-2">
                  <Plus className="h-4 w-4" />
                  Create Your First Quote
                </Button>
              </Link>
            </div>
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
