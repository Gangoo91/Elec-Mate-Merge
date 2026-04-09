import { useSearchParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Plus, ArrowLeft, Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { PullToRefresh } from '@/components/ui/pull-to-refresh';
import { useQuoteStorage } from '@/hooks/useQuoteStorage';
import { Quote } from '@/types/quote';
import { filterQuotesByStatus } from '@/utils/quote-analytics';
import { useMemo, useState, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { EmptyStateGuide } from '@/components/electrician/shared/EmptyStateGuide';
import { QuoteInvoiceAnalytics } from '@/components/electrician/analytics';
import { QuoteCard } from '@/components/electrician/quote-builder/QuoteCard';
import { AnimatePresence, motion } from 'framer-motion';
import { ConfirmationDialog } from '@/components/ui/confirmation-dialog';
import { toast } from '@/hooks/use-toast';
import { createQuickTaskBatch } from '@/utils/createQuickTask';

const QuotesPage = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const filter = searchParams.get('filter') || 'all';
  const [quoteToDelete, setQuoteToDelete] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [creatingFollowUps, setCreatingFollowUps] = useState(false);

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
    if (filter === 'invoiced') {
      if (!searchQuery.trim()) return invoicedQuotes;
      const query = searchQuery.toLowerCase();
      return invoicedQuotes.filter(
        (q) =>
          q.client?.name?.toLowerCase().includes(query) ||
          q.quoteNumber?.toLowerCase().includes(query) ||
          q.jobDetails?.title?.toLowerCase().includes(query) ||
          q.jobDetails?.description?.toLowerCase().includes(query)
      );
    }

    let filtered = savedQuotes;

    if (filter && filter !== 'all' && filter !== 'monthly') {
      filtered = filterQuotesByStatus(filtered, filter as any);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (q) =>
          q.client?.name?.toLowerCase().includes(query) ||
          q.quoteNumber?.toLowerCase().includes(query) ||
          q.jobDetails?.title?.toLowerCase().includes(query) ||
          q.jobDetails?.description?.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [savedQuotes, invoicedQuotes, filter, searchQuery]);

  // Stats
  const stats = useMemo(() => {
    const totalValue = savedQuotes.reduce((acc, q) => acc + (q.total || 0), 0);
    const approvedValue = savedQuotes
      .filter((q) => q.status === 'approved' || q.acceptance_status === 'accepted')
      .reduce((acc, q) => acc + (q.total || 0), 0);
    const conversionRate =
      savedQuotes.length > 0
        ? Math.round(
            (savedQuotes.filter(
              (q) => q.status === 'approved' || q.acceptance_status === 'accepted'
            ).length /
              savedQuotes.length) *
              100
          )
        : 0;

    return {
      totalValue,
      approvedValue,
      conversionRate,
      counts: {
        all: savedQuotes.length,
        draft: savedQuotes.filter((q) => q.status === 'draft').length,
        sent: savedQuotes.filter((q) => q.status === 'sent' || q.status === 'pending').length,
        invoiced: invoicedQuotes.length,
        approved: savedQuotes.filter(
          (q) => q.status === 'approved' || q.acceptance_status === 'accepted'
        ).length,
        rejected: savedQuotes.filter(
          (q) => q.status === 'rejected' || q.acceptance_status === 'rejected'
        ).length,
      },
    };
  }, [savedQuotes, invoicedQuotes]);

  // Stale quotes
  const staleQuotes = useMemo(() => {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    return savedQuotes.filter(
      (q) =>
        (q.status === 'sent' || q.status === 'pending') &&
        q.updatedAt &&
        new Date(q.updatedAt) < sevenDaysAgo
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
    } catch (error: any) {
      toast({ title: 'Failed', description: error?.message || 'Could not create tasks.', variant: 'destructive' });
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
    { id: 'approved', label: 'Approved', count: stats.counts.approved },
    { id: 'rejected', label: 'Declined', count: stats.counts.rejected },
    { id: 'invoiced', label: 'Invoiced', count: stats.counts.invoiced },
  ];

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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background flex flex-col"
          >
            <div className="flex items-center gap-2 px-4 py-3 h-14 border-b border-white/[0.06]">
              <Search className="h-5 w-5 text-white flex-shrink-0" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by client, quote number, job..."
                className="h-10 flex-1 text-base bg-transparent border-0 focus:ring-0 focus:border-0 placeholder:text-white touch-manipulation"
                autoFocus
              />
              <button
                className="text-elec-yellow font-medium text-sm flex-shrink-0 touch-manipulation"
                onClick={() => {
                  setShowSearch(false);
                  setSearchQuery('');
                }}
              >
                Cancel
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
              {searchQuery.trim() ? (
                filteredQuotes.length > 0 ? (
                  filteredQuotes.map((quote) => (
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
                  ))
                ) : (
                  <div className="text-center py-12">
                    <p className="text-white text-sm">No quotes matching "{searchQuery}"</p>
                  </div>
                )
              ) : (
                <div className="text-center py-12">
                  <p className="text-white text-sm">Search by client name, quote number, or job title</p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-md border-b border-white/[0.06]">
        <div className="flex items-center h-14 px-4 gap-2">
          <button
            onClick={() => navigate('/electrician/business')}
            className="h-10 w-10 -ml-2 flex items-center justify-center rounded-xl hover:bg-white/[0.05] active:scale-[0.98] transition-all touch-manipulation"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <h1 className="flex-1 text-lg font-semibold text-white">Quotes</h1>
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

        {/* Filter pills — I&T style */}
        <div className="flex gap-2 px-4 pb-3 overflow-x-auto scrollbar-hide">
          {filterOptions.map((option) => (
            <button
              key={option.id}
              onClick={() => setFilter(option.id)}
              className={cn(
                'flex-shrink-0 h-8 px-3 rounded-lg text-xs font-medium transition-all touch-manipulation active:scale-[0.98]',
                filter === option.id
                  ? 'bg-elec-yellow/15 text-elec-yellow border border-elec-yellow/25'
                  : 'bg-white/[0.04] text-white border border-white/[0.08] hover:bg-white/[0.07]'
              )}
            >
              {option.label}
              {option.count > 0 && (
                <span className="ml-1.5 text-white">{option.count}</span>
              )}
            </button>
          ))}
        </div>
      </header>

      {/* Content */}
      <PullToRefresh onRefresh={refreshQuotes} isRefreshing={loading}>
        <div className="px-4 py-4 space-y-4 pb-24">
          {/* Pipeline hero */}
          <div className="space-y-3">
            {/* Main value */}
            <div className="flex items-end justify-between">
              <div>
                <p className="text-[10px] text-white uppercase tracking-[0.15em] font-medium">Pipeline</p>
                <p className="text-[36px] font-extrabold text-elec-yellow leading-none tracking-tight mt-1">{formatGBP(stats.totalValue)}</p>
              </div>
              <div className="text-right pb-0.5">
                <p className="text-[28px] font-bold text-white leading-none">{stats.conversionRate}%</p>
                <p className="text-[10px] text-white uppercase tracking-wider mt-0.5">Win Rate</p>
              </div>
            </div>

            {/* Stat pills — tappable, inline */}
            <div className="grid grid-cols-4 gap-2">
              <button onClick={() => setFilter('approved')} className="rounded-xl bg-white/[0.04] border border-white/[0.08] py-2.5 text-center touch-manipulation active:scale-[0.97] active:bg-white/[0.07] transition-all">
                <p className="text-[15px] font-bold text-emerald-400">{formatGBP(stats.approvedValue)}</p>
                <p className="text-[10px] text-white mt-0.5">Won</p>
              </button>
              <button onClick={() => setFilter('sent')} className="rounded-xl bg-white/[0.04] border border-white/[0.08] py-2.5 text-center touch-manipulation active:scale-[0.97] active:bg-white/[0.07] transition-all">
                <p className="text-[15px] font-bold text-amber-400">{stats.counts.sent}</p>
                <p className="text-[10px] text-white mt-0.5">Pending</p>
              </button>
              <button onClick={() => setFilter('draft')} className="rounded-xl bg-white/[0.04] border border-white/[0.08] py-2.5 text-center touch-manipulation active:scale-[0.97] active:bg-white/[0.07] transition-all">
                <p className="text-[15px] font-bold text-white">{stats.counts.draft}</p>
                <p className="text-[10px] text-white mt-0.5">Drafts</p>
              </button>
              <button onClick={() => setFilter('invoiced')} className="rounded-xl bg-white/[0.04] border border-white/[0.08] py-2.5 text-center touch-manipulation active:scale-[0.97] active:bg-white/[0.07] transition-all">
                <p className="text-[15px] font-bold text-blue-400">{stats.counts.invoiced}</p>
                <p className="text-[10px] text-white mt-0.5">Invoiced</p>
              </button>
            </div>

            {/* Follow-up */}
            {staleQuotes.length > 0 && (
              <button
                type="button"
                onClick={handleCreateFollowUps}
                disabled={creatingFollowUps}
                className="w-full flex items-center justify-between py-2.5 px-4 rounded-xl bg-amber-500/[0.06] border border-amber-500/15 touch-manipulation active:scale-[0.98] transition-all disabled:opacity-50"
              >
                <p className="text-[12px] text-white">
                  <span className="font-bold text-amber-400">{staleQuotes.length}</span> awaiting response 7+ days
                </p>
                <span className="text-[11px] font-bold text-amber-400">
                  {creatingFollowUps ? 'Creating...' : 'Follow Up'}
                </span>
              </button>
            )}
          </div>

          {/* Analytics */}
          {savedQuotes.length > 0 && (
            <QuoteInvoiceAnalytics
              quotes={savedQuotes}
              formatCurrency={(value) =>
                `£${value.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
              }
              lastUpdated={lastUpdated}
              onRefresh={refreshQuotes}
              isLoading={loading}
            />
          )}

          {/* Quotes list */}
          <section className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-xs font-medium text-white uppercase tracking-wider">
                {filter === 'all'
                  ? 'All Quotes'
                  : filterOptions.find((f) => f.id === filter)?.label + ' Quotes'}
              </h2>
              <span className="text-[11px] text-white">
                {filteredQuotes.length} {filteredQuotes.length === 1 ? 'quote' : 'quotes'}
              </span>
            </div>

            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-2 border-elec-yellow border-t-transparent" />
              </div>
            ) : filteredQuotes.length === 0 ? (
              filter === 'all' && !searchQuery.trim() ? (
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
                      : `Quotes will appear here when ${filter}`}
                  </p>
                </div>
              )
            ) : (
              <div className="space-y-3">
                <AnimatePresence>
                  {filteredQuotes.map((quote) => (
                    <motion.div
                      key={quote.id}
                      layout
                      exit={{ opacity: 0, scale: 0.95 }}
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
