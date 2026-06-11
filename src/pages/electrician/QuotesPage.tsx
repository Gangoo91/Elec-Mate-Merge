import { useSearchParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Plus, ArrowLeft, Search, X, ArrowUpDown, ChevronRight } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { PullToRefresh } from '@/components/ui/pull-to-refresh';
import { useQuoteStorage } from '@/hooks/useQuoteStorage';
import { Quote } from '@/types/quote';
import { filterQuotesByStatus } from '@/utils/quote-analytics';
import { isQuoteWon, isQuoteLost, isQuoteAwaiting, isQuoteOpen } from '@/utils/quote-status';
import { useMemo, useState, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { EmptyStateGuide } from '@/components/electrician/shared/EmptyStateGuide';
import { QuoteInvoiceAnalytics } from '@/components/electrician/analytics';
import { QuoteCard } from '@/components/electrician/quote-builder/QuoteCard';
import { AnimatePresence, motion } from 'framer-motion';
import { ConfirmationDialog } from '@/components/ui/confirmation-dialog';
import { toast } from '@/hooks/use-toast';
import { createQuickTaskBatch } from '@/utils/createQuickTask';

const statusFilters: Quote['status'][] = ['draft', 'sent', 'pending', 'approved', 'rejected'];

type SortKey = 'newest' | 'oldest' | 'value-high' | 'value-low' | 'expiry';
type QuickFilter = 'viewed' | 'unviewed' | 'expiring' | null;
type DateRange = 'all' | '30d' | '90d';

const sortOptions: { id: SortKey; label: string }[] = [
  { id: 'newest', label: 'Newest' },
  { id: 'oldest', label: 'Oldest' },
  { id: 'value-high', label: 'Highest value' },
  { id: 'value-low', label: 'Lowest value' },
  { id: 'expiry', label: 'Expiring soon' },
];

const quickFilterOptions: { id: Exclude<QuickFilter, null>; label: string }[] = [
  { id: 'viewed', label: 'Viewed' },
  { id: 'unviewed', label: 'Not viewed' },
  { id: 'expiring', label: 'Expiring' },
];

// Elevated panel recipe — matches QuoteViewPage fintech surface language
const PANEL =
  'rounded-2xl border border-white/[0.10] bg-gradient-to-b from-white/[0.06] to-white/[0.03] shadow-[0_8px_24px_rgba(0,0,0,0.35)]';

const getErrorMessage = (error: unknown, fallback: string): string => {
  return error instanceof Error && error.message ? error.message : fallback;
};

const QuotesPage = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const filter = searchParams.get('filter') || 'all';
  const [quoteToDelete, setQuoteToDelete] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [creatingFollowUps, setCreatingFollowUps] = useState(false);
  const [sortBy, setSortBy] = useState<SortKey>('newest');
  const [quickFilter, setQuickFilter] = useState<QuickFilter>(null);
  const [dateRange, setDateRange] = useState<DateRange>('all');

  const {
    savedQuotes,
    invoicedQuotes,
    deleteQuote,
    updateQuoteStatus,
    refreshQuotes,
    loading,
    lastUpdated,
  } = useQuoteStorage();

  const handleAcceptQuote = async (quoteId: string, currentStatus: Quote['status']) => {
    const success = await updateQuoteStatus(quoteId, currentStatus, undefined, 'accepted');
    if (success) {
      toast({ title: 'Quote accepted', description: 'You can now convert it to an invoice.' });
    } else {
      toast({ title: 'Failed to accept quote', variant: 'destructive' });
    }
  };

  const handleDeleteQuote = async (quoteId: string) => {
    const success = await deleteQuote(quoteId);
    if (success) {
      toast({ title: 'Quote deleted' });
    }
    setQuoteToDelete(null);
  };

  const filteredQuotes = useMemo(() => {
    let filtered: Quote[];
    if (filter === 'invoiced') {
      filtered = invoicedQuotes;
    } else {
      filtered = savedQuotes;
      if (statusFilters.includes(filter as Quote['status'])) {
        filtered = filterQuotesByStatus(filtered, filter as Quote['status']);
      }
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (q) =>
          q.client?.name?.toLowerCase().includes(query) ||
          q.quoteNumber?.toLowerCase().includes(query) ||
          q.jobDetails?.title?.toLowerCase().includes(query) ||
          q.jobDetails?.description?.toLowerCase().includes(query) ||
          q.client?.address?.toLowerCase().includes(query) ||
          q.client?.postcode?.toLowerCase().includes(query)
      );
    }

    if (quickFilter === 'viewed') {
      filtered = filtered.filter((q) => (q.email_open_count ?? 0) > 0);
    } else if (quickFilter === 'unviewed') {
      filtered = filtered.filter((q) => isQuoteAwaiting(q) && !((q.email_open_count ?? 0) > 0));
    } else if (quickFilter === 'expiring') {
      const now = Date.now();
      filtered = filtered.filter((q) => {
        if (!q.expiryDate || !isQuoteOpen(q)) return false;
        const days = Math.ceil((new Date(q.expiryDate).getTime() - now) / 86400000);
        return days >= 0 && days <= 7;
      });
    }

    if (dateRange !== 'all') {
      const cutoff = new Date();
      cutoff.setDate(cutoff.getDate() - (dateRange === '30d' ? 30 : 90));
      filtered = filtered.filter((q) => {
        const d = q.updatedAt || q.createdAt;
        return d ? new Date(d) >= cutoff : false;
      });
    }

    const time = (q: Quote) => new Date(q.updatedAt || q.createdAt || 0).getTime();
    const sorted = [...filtered];
    switch (sortBy) {
      case 'oldest':
        sorted.sort((a, b) => time(a) - time(b));
        break;
      case 'value-high':
        sorted.sort((a, b) => (b.total || 0) - (a.total || 0));
        break;
      case 'value-low':
        sorted.sort((a, b) => (a.total || 0) - (b.total || 0));
        break;
      case 'expiry':
        sorted.sort((a, b) => {
          const ea = a.expiryDate ? new Date(a.expiryDate).getTime() : Infinity;
          const eb = b.expiryDate ? new Date(b.expiryDate).getTime() : Infinity;
          return ea - eb;
        });
        break;
      default:
        sorted.sort((a, b) => time(b) - time(a));
    }

    return sorted;
  }, [savedQuotes, invoicedQuotes, filter, searchQuery, quickFilter, dateRange, sortBy]);

  const filteredValue = useMemo(
    () => filteredQuotes.reduce((acc, q) => acc + (q.total || 0), 0),
    [filteredQuotes]
  );

  // Stats
  const stats = useMemo(() => {
    const totalValue = savedQuotes.reduce((acc, q) => acc + (q.total || 0), 0);
    const approvedValue = savedQuotes
      .filter(isQuoteWon)
      .reduce((acc, q) => acc + (q.total || 0), 0);
    const pendingValue = savedQuotes
      .filter(isQuoteAwaiting)
      .reduce((acc, q) => acc + (q.total || 0), 0);
    const draftValue = savedQuotes
      .filter((q) => q.status === 'draft')
      .reduce((acc, q) => acc + (q.total || 0), 0);
    const invoicedValue = invoicedQuotes.reduce((acc, q) => acc + (q.total || 0), 0);
    const conversionRate =
      savedQuotes.length > 0
        ? Math.round((savedQuotes.filter(isQuoteWon).length / savedQuotes.length) * 100)
        : 0;

    return {
      totalValue,
      approvedValue,
      pendingValue,
      draftValue,
      invoicedValue,
      conversionRate,
      counts: {
        all: savedQuotes.length,
        draft: savedQuotes.filter((q) => q.status === 'draft').length,
        sent: savedQuotes.filter(isQuoteAwaiting).length,
        invoiced: invoicedQuotes.length,
        approved: savedQuotes.filter(isQuoteWon).length,
        rejected: savedQuotes.filter(isQuoteLost).length,
      },
    };
  }, [savedQuotes, invoicedQuotes]);

  // Stale quotes
  const staleQuotes = useMemo(() => {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    return savedQuotes.filter(
      (q) => isQuoteAwaiting(q) && q.updatedAt && new Date(q.updatedAt) < sevenDaysAgo
    );
  }, [savedQuotes]);

  const handleCreateFollowUps = async () => {
    setCreatingFollowUps(true);
    try {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(9, 0, 0, 0);

      const tasks = staleQuotes.map((q) => ({
        title: `Follow up: Quote ${q.quoteNumber || ''}${q.client?.name ? ` — ${q.client.name}` : ''}`.trim(),
        priority: 'normal' as const,
        dueAt: tomorrow.toISOString(),
        tags: ['follow-up', 'quote'],
      }));

      const count = await createQuickTaskBatch(tasks);
      toast({
        title: 'Follow-up tasks created',
        description: `${count} follow-up ${count === 1 ? 'task' : 'tasks'} added for tomorrow.`,
      });
    } catch (error: unknown) {
      toast({
        title: 'Failed',
        description: getErrorMessage(error, 'Could not create tasks.'),
        variant: 'destructive',
      });
    } finally {
      setCreatingFollowUps(false);
    }
  };

  const setFilter = (newFilter: string) => {
    if (newFilter === 'all') {
      setSearchParams({});
    } else {
      setSearchParams({ filter: newFilter });
    }
  };

  const filterOptions = [
    { id: 'all', label: 'All', count: stats.counts.all },
    { id: 'draft', label: 'Draft', count: stats.counts.draft },
    { id: 'sent', label: 'Sent', count: stats.counts.sent },
    { id: 'approved', label: 'Won', count: stats.counts.approved },
    { id: 'rejected', label: 'Declined', count: stats.counts.rejected },
    { id: 'invoiced', label: 'Invoiced', count: stats.counts.invoiced },
  ];

  // 30-day quote-creation sparkline for the analytics strip
  const sparkPoints = useMemo(() => {
    const days = 30;
    const counts = new Array(days).fill(0);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    [...savedQuotes, ...invoicedQuotes].forEach((q) => {
      if (!q.createdAt) return;
      const created = new Date(q.createdAt);
      created.setHours(0, 0, 0, 0);
      const d = Math.round((today.getTime() - created.getTime()) / 86400000);
      if (d >= 0 && d < days) counts[days - 1 - d]++;
    });
    const max = Math.max(...counts, 1);
    return counts
      .map((v, i) => `${((i / (days - 1)) * 100).toFixed(1)},${(29 - (v / max) * 26).toFixed(1)}`)
      .join(' ');
  }, [savedQuotes, invoicedQuotes]);

  const formatGBP = useCallback(
    (value: number) =>
      `£${value.toLocaleString('en-GB', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`,
    []
  );

  return (
    <div className="bg-background min-h-screen animate-fade-in">
      <Helmet>
        <title>Quotes | Elec-Mate</title>
        <meta name="description" content="Manage and track all your electrical quotes." />
      </Helmet>

      {/* Full-screen search overlay */}
      <AnimatePresence>
        {showSearch && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-background flex flex-col"
          >
            {/* Search header */}
            <div className="px-4 pt-4 pb-3 space-y-3">
              <div className="flex items-center gap-3">
                <div className="flex-1 relative">
                  <input
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Client, quote number, job title..."
                    className="w-full h-12 pl-4 pr-10 rounded-xl bg-white/[0.06] border border-white/[0.12] text-[15px] text-white placeholder:text-white/50 outline-none focus:border-elec-yellow focus:ring-2 focus:ring-elec-yellow/20 touch-manipulation"
                    autoFocus
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-white/[0.1] flex items-center justify-center touch-manipulation"
                    >
                      <X className="h-3 w-3 text-white" />
                    </button>
                  )}
                </div>
                <button
                  className="text-[13px] text-white font-medium flex-shrink-0 touch-manipulation h-12 px-2"
                  onClick={() => { setShowSearch(false); setSearchQuery(''); }}
                >
                  Cancel
                </button>
              </div>
              {searchQuery.trim() && (
                <p className="text-[12px] text-white/50">{filteredQuotes.length} result{filteredQuotes.length !== 1 ? 's' : ''}</p>
              )}
            </div>

            {/* Results */}
            <div className="flex-1 overflow-y-auto overscroll-contain px-4 pb-8 space-y-3">
              {searchQuery.trim() ? (
                filteredQuotes.length > 0 ? (
                  <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2.5">
                    {filteredQuotes.map((quote) => (
                      <QuoteCard
                        key={quote.id}
                        quote={quote}
                        onTap={() => {
                          setShowSearch(false);
                          navigate(`/electrician/quotes/view/${quote.id}`);
                        }}
                        onDelete={() => setQuoteToDelete(quote.id)}
                        onEdit={() => navigate(`/electrician/quote-builder/${quote.id}`)}
                        onAccept={() => handleAcceptQuote(quote.id, quote.status)}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16">
                    <p className="text-[15px] font-medium text-white">No results</p>
                    <p className="text-[13px] text-white/50 mt-1">Try a different search term</p>
                  </div>
                )
              ) : (
                <div className="space-y-4 pt-2">
                  {/* Recent quotes — show last 5 */}
                  <div>
                    <p className="text-[11px] text-white/50 uppercase tracking-wider mb-2">Recent Quotes</p>
                    <div className="space-y-2">
                      {savedQuotes.slice(0, 5).map((quote) => (
                        <button
                          key={quote.id}
                          onClick={() => {
                            setShowSearch(false);
                            navigate(`/electrician/quotes/view/${quote.id}`);
                          }}
                          className="w-full flex items-center justify-between py-3 border-b border-white/[0.08] touch-manipulation active:bg-white/[0.04] transition-all text-left"
                        >
                          <div className="flex-1 min-w-0">
                            <p className="text-[14px] font-medium text-white truncate">{quote.client?.name || 'No client'}</p>
                            <p className="text-[12px] text-white/50 mt-0.5">{quote.quoteNumber} · {quote.items?.length || 0} items</p>
                          </div>
                          <span className="text-[14px] font-semibold text-white tabular-nums ml-3">
                            {formatGBP(quote.total)}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-md border-b border-white/[0.06]">
        <div className="flex items-center px-4 pt-2 gap-2">
          <button
            onClick={() => navigate('/electrician/business')}
            className="h-10 w-10 -ml-2 flex items-center justify-center rounded-xl hover:bg-white/[0.05] active:scale-[0.98] transition-all touch-manipulation"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <h1 className="flex-1 text-[22px] font-bold text-white truncate tracking-tight">Quotes</h1>
          <button
            onClick={() => navigate('/electrician/invoices')}
            className="h-8 px-2.5 rounded-lg bg-white/[0.08] text-[11px] font-medium text-white/90 touch-manipulation active:scale-[0.97] transition-all flex-shrink-0"
          >
            Invoices
          </button>
          <button
            onClick={() => setShowSearch(true)}
            className="h-10 w-10 flex items-center justify-center rounded-xl hover:bg-white/[0.05] active:scale-[0.98] transition-all touch-manipulation"
          >
            <Search className="h-5 w-5 text-white" />
          </button>
          <button
            onClick={() => navigate('/electrician/quote-builder/create')}
            className="h-10 w-10 rounded-xl bg-elec-yellow flex items-center justify-center active:scale-[0.98] touch-manipulation"
          >
            <Plus className="h-5 w-5 text-black" />
          </button>
        </div>

        {/* Pipeline subline */}
        <p className="px-4 mt-0.5 text-[12px] text-white/75">
          <span className="font-semibold text-elec-yellow tabular-nums">{formatGBP(stats.totalValue)}</span> pipeline
          <span className="mx-1.5 text-white/30">·</span>
          <span className="font-semibold text-white tabular-nums">{stats.conversionRate}%</span> win rate
        </p>

        {/* Status tabs */}
        <div className="flex gap-5 px-4 mt-2 overflow-x-auto scrollbar-hide">
          {filterOptions.map((option) => (
            <button
              key={option.id}
              onClick={() => setFilter(option.id)}
              className="relative flex-shrink-0 pb-3 pt-2 text-[13px] font-medium whitespace-nowrap touch-manipulation select-none"
            >
              <span className={filter === option.id ? 'text-white' : 'text-white/80'}>
                {option.label}
              </span>
              {option.count > 0 && (
                <span
                  className={cn(
                    'ml-1.5 text-[11px] tabular-nums',
                    filter === option.id ? 'text-elec-yellow' : 'text-white/60'
                  )}
                >
                  {option.count}
                </span>
              )}
              {filter === option.id && (
                <span className="absolute bottom-0 left-0 right-0 h-[2px] rounded-full bg-elec-yellow" />
              )}
            </button>
          ))}
        </div>
      </header>

      {/* Content */}
      <PullToRefresh onRefresh={refreshQuotes} isRefreshing={loading}>
        <div className="px-4 py-4 space-y-6 pb-24">
          {/* 01 · PIPELINE — open editorial grid */}
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-elec-yellow/80 tabular-nums">01</span>
              <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/80">· Pipeline</span>
            </div>

            {/* Pipeline panel */}
            <div className={cn(PANEL, 'overflow-hidden mt-2')}>
            <div className="grid grid-cols-2 lg:grid-cols-4">
              <button
                onClick={() => setFilter('approved')}
                className="p-4 text-left border-b border-r border-white/[0.08] lg:border-b-0 touch-manipulation active:bg-white/[0.03] transition-colors"
              >
                <p className="text-[22px] font-bold text-emerald-400 tabular-nums leading-none tracking-tight">{formatGBP(stats.approvedValue)}</p>
                <p className="text-[11px] text-white/80 mt-1.5">Won · <span className="text-white tabular-nums">{stats.counts.approved}</span></p>
              </button>
              <button
                onClick={() => setFilter('sent')}
                className="p-4 text-left border-b border-white/[0.08] lg:border-b-0 lg:border-r touch-manipulation active:bg-white/[0.03] transition-colors"
              >
                <p className="text-[22px] font-bold text-amber-400 tabular-nums leading-none tracking-tight">{formatGBP(stats.pendingValue)}</p>
                <p className="text-[11px] text-white/80 mt-1.5">Pending · <span className="text-white tabular-nums">{stats.counts.sent}</span></p>
              </button>
              <button
                onClick={() => setFilter('draft')}
                className="p-4 text-left border-r border-white/[0.08] touch-manipulation active:bg-white/[0.03] transition-colors"
              >
                <p className="text-[22px] font-bold text-white tabular-nums leading-none tracking-tight">{formatGBP(stats.draftValue)}</p>
                <p className="text-[11px] text-white/80 mt-1.5">Drafts · <span className="text-white tabular-nums">{stats.counts.draft}</span></p>
              </button>
              <button
                onClick={() => setFilter('invoiced')}
                className="p-4 text-left touch-manipulation active:bg-white/[0.03] transition-colors"
              >
                <p className="text-[22px] font-bold text-blue-400 tabular-nums leading-none tracking-tight">{formatGBP(stats.invoicedValue)}</p>
                <p className="text-[11px] text-white/80 mt-1.5">Invoiced · <span className="text-white tabular-nums">{stats.counts.invoiced}</span></p>
              </button>
            </div>

            {/* Follow-up */}
            {staleQuotes.length > 0 && (
              <button
                type="button"
                onClick={handleCreateFollowUps}
                disabled={creatingFollowUps}
                className="w-full flex items-center justify-between py-3 px-4 border-t border-white/[0.08] touch-manipulation active:bg-white/[0.03] transition-colors disabled:opacity-50"
              >
                <p className="text-[12px] text-white/90">
                  <span className="font-semibold text-amber-400 tabular-nums">{staleQuotes.length}</span> awaiting response 7+ days
                </p>
                <span className="text-[11px] font-semibold text-amber-400">
                  {creatingFollowUps ? 'Creating…' : 'Follow up →'}
                </span>
              </button>
            )}
            </div>
          </div>

          {/* Analytics — sparkline strip, expands to full panel */}
          {savedQuotes.length > 0 && (
            <div className={cn(PANEL, 'px-4 py-3')}>
            <QuoteInvoiceAnalytics
              quotes={savedQuotes}
              formatCurrency={(value) =>
                `£${value.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
              }
              lastUpdated={lastUpdated}
              onRefresh={refreshQuotes}
              isLoading={loading}
              trigger={(isOpen) => (
                <button className="w-full flex items-center gap-3 py-1 touch-manipulation">
                  <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/80 flex-shrink-0">
                    Analytics
                  </span>
                  <svg
                    viewBox="0 0 100 32"
                    preserveAspectRatio="none"
                    className="flex-1 h-8 min-w-0 text-elec-yellow/90"
                    aria-hidden="true"
                  >
                    <polyline
                      points={sparkPoints}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      vectorEffect="non-scaling-stroke"
                      strokeLinejoin="round"
                      strokeLinecap="round"
                    />
                  </svg>
                  <ChevronRight
                    className={cn(
                      'w-4 h-4 text-white/75 transition-transform flex-shrink-0',
                      isOpen && 'rotate-90'
                    )}
                  />
                </button>
              )}
            />
            </div>
          )}

          {/* 02 · QUOTES — list */}
          <section className="space-y-3 pt-2 border-t border-white/[0.12]">
            <div className="flex items-baseline justify-between gap-3 pt-4">
              <div className="flex items-baseline gap-2">
                <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-elec-yellow/80 tabular-nums">02</span>
                <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/80">
                  ·{' '}
                  {filter === 'all'
                    ? 'All quotes'
                    : (filterOptions.find((f) => f.id === filter)?.label || 'Quotes') + ' quotes'}
                </span>
              </div>
              <span className="text-[11px] text-white/80 tabular-nums">
                {filteredQuotes.length} {filteredQuotes.length === 1 ? 'quote' : 'quotes'}
                {filteredQuotes.length > 0 && (
                  <span className="text-white"> · {formatGBP(filteredValue)}</span>
                )}
              </span>
            </div>

            {/* Sort + quick filters */}
            <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide -mx-4 px-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex-shrink-0 h-9 flex items-center gap-1.5 text-[12px] font-medium text-white/90 touch-manipulation select-none active:scale-[0.97] transition-all">
                    <ArrowUpDown className="h-3.5 w-3.5 text-elec-yellow" />
                    {sortOptions.find((s) => s.id === sortBy)?.label}
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="start"
                  className="z-[100] min-w-[160px] bg-elec-gray border-white/10"
                >
                  {sortOptions.map((s) => (
                    <DropdownMenuItem
                      key={s.id}
                      onClick={() => setSortBy(s.id)}
                      className={cn(
                        'h-11 text-[14px] touch-manipulation focus:bg-white/[0.06]',
                        sortBy === s.id
                          ? 'text-elec-yellow focus:text-elec-yellow'
                          : 'text-white focus:text-white'
                      )}
                    >
                      {s.label}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              <div className="h-5 w-px bg-white/[0.16] flex-shrink-0" />

              {quickFilterOptions.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setQuickFilter(quickFilter === c.id ? null : c.id)}
                  className={cn(
                    'flex-shrink-0 h-9 px-3 rounded-lg text-[12px] font-medium transition-all touch-manipulation active:scale-[0.97] select-none',
                    quickFilter === c.id
                      ? 'bg-elec-yellow/10 text-elec-yellow'
                      : 'text-white/75'
                  )}
                >
                  {c.label}
                </button>
              ))}

              <div className="h-5 w-px bg-white/[0.16] flex-shrink-0" />

              {(['30d', '90d'] as const).map((r) => (
                <button
                  key={r}
                  onClick={() => setDateRange(dateRange === r ? 'all' : r)}
                  className={cn(
                    'flex-shrink-0 h-9 px-3 rounded-lg text-[12px] font-medium transition-all touch-manipulation active:scale-[0.97] select-none',
                    dateRange === r
                      ? 'bg-elec-yellow/10 text-elec-yellow'
                      : 'text-white/75'
                  )}
                >
                  {r}
                </button>
              ))}
            </div>

            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-2 border-elec-yellow border-t-transparent" />
              </div>
            ) : filteredQuotes.length === 0 ? (
              filter === 'all' && !searchQuery.trim() && !quickFilter && dateRange === 'all' ? (
                <EmptyStateGuide
                  type="quote"
                  onCreateClick={() => navigate('/electrician/quote-builder/create')}
                />
              ) : (
                <div className="text-center py-12">
                  <p className="text-[14px] font-medium text-white">
                    No {filter !== 'all' ? filter : ''} quotes
                  </p>
                  <p className="text-[12px] text-white mt-1">
                    {searchQuery.trim()
                      ? `No quotes match "${searchQuery}"`
                      : quickFilter || dateRange !== 'all'
                        ? 'Try clearing the filters above'
                        : `Quotes will appear here when ${filter}`}
                  </p>
                </div>
              )
            ) : (
              <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2.5">
                <AnimatePresence>
                  {filteredQuotes.map((quote) => (
                    <motion.div
                      key={quote.id}
                      layout
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="h-full"
                    >
                      <QuoteCard
                        quote={quote}
                        onTap={() => navigate(`/electrician/quotes/view/${quote.id}`)}
                        onDelete={() => setQuoteToDelete(quote.id)}
                        onEdit={() => navigate(`/electrician/quote-builder/${quote.id}`)}
                        onAccept={() => handleAcceptQuote(quote.id, quote.status)}
                      />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </section>
        </div>
      </PullToRefresh>

      {/* Delete confirmation */}
      <ConfirmationDialog
        open={!!quoteToDelete}
        onOpenChange={(open) => !open && setQuoteToDelete(null)}
        onConfirm={() => quoteToDelete && handleDeleteQuote(quoteToDelete)}
        title="Delete Quote"
        description="Are you sure? This cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
      />
    </div>
  );
};

export default QuotesPage;
