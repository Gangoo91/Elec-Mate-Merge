import { useState, useMemo, useCallback, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { Newspaper, AlertTriangle, RefreshCw, Search, X, Clock } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { useIndustryNews, type NewsArticle } from '@/hooks/useIndustryNews';
import { useToast } from '@/hooks/use-toast';
import { isValidUrl } from '@/utils/urlUtils';
import NewsGrid from './NewsGrid';
import NewsPagination from './NewsPagination';
import NewsFeaturedCarousel from './NewsFeaturedCarousel';
import { PullToRefresh } from '@/components/ui/pull-to-refresh';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.02, delayChildren: 0 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.2, ease: 'easeOut' },
  },
};

const NewIndustryNewsCard = () => {
  const { toast } = useToast();
  const {
    data: articles = [],
    isLoading,
    error,
    refresh,
    isRefreshing,
    refreshError,
    refreshSuccess,
  } = useIndustryNews();

  const [searchTerm, setSearchTerm] = useState('');
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const ITEMS_PER_PAGE = 18;
  const categories = ['All', 'Industry', 'Safety', 'Technical', 'BS7671', 'Projects'];

  // Filter articles
  const filteredArticles = useMemo(() => {
    if (!articles || articles.length === 0) return [];

    return articles
      .filter((article) => {
        const matchesSearch =
          !searchTerm ||
          article.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          article.summary?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || article.category === selectedCategory;
        return matchesSearch && matchesCategory && isValidUrl(article.external_url);
      })
      .sort((a, b) => {
        // Prefer published_date (populated on fresh scraper output), fall back
        // to date_published (legacy rows), then created_at (scrape time).
        const pickDate = (a: NewsArticle) =>
          a.published_date || a.date_published || a.created_at;
        const dateA = new Date(pickDate(a));
        const dateB = new Date(pickDate(b));
        return dateB.getTime() - dateA.getTime();
      });
  }, [articles, searchTerm, selectedCategory]);

  // Most recent scrape timestamp — for the "Updated X ago" badge.
  // Uses created_at (TIMESTAMPTZ = when we actually ingested the row)
  // rather than published_date (a DATE column that parses to midnight UTC
  // and makes freshly scraped articles look a day older than they are).
  const lastUpdatedAt = useMemo(() => {
    if (!articles || articles.length === 0) return null;
    const timestamps = articles
      .map((a) => a.created_at)
      .filter(Boolean)
      .map((t) => new Date(t).getTime())
      .filter((t) => !Number.isNaN(t));
    if (timestamps.length === 0) return null;
    return new Date(Math.max(...timestamps));
  }, [articles]);

  // Reset page on search or category change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory]);

  // Pagination
  const totalPages = Math.ceil(filteredArticles.length / ITEMS_PER_PAGE);
  const paginatedArticles = filteredArticles.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRefresh = useCallback(async () => {
    refresh();
  }, [refresh]);

  // Toast notifications
  const hasShownSuccessRef = useRef(false);
  const hasShownErrorRef = useRef(false);

  useEffect(() => {
    if (refreshSuccess && !isRefreshing && !hasShownSuccessRef.current) {
      hasShownSuccessRef.current = true;
      toast({ title: 'Updated', description: 'Latest news fetched', duration: 2000 });
    }
    if (!refreshSuccess) {
      hasShownSuccessRef.current = false;
    }
  }, [refreshSuccess, isRefreshing, toast]);

  useEffect(() => {
    if (refreshError && !hasShownErrorRef.current) {
      hasShownErrorRef.current = true;
      toast({
        title: 'Error',
        description: 'Could not refresh',
        variant: 'destructive',
        duration: 2000,
      });
    }
    if (!refreshError) {
      hasShownErrorRef.current = false;
    }
  }, [refreshError, toast]);

  // Error state
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4">
        <div className="w-16 h-16 rounded-2xl bg-red-500/10 flex items-center justify-center mb-4">
          <AlertTriangle className="h-8 w-8 text-red-400" />
        </div>
        <h2 className="text-lg font-semibold text-white mb-2">Unable to load news</h2>
        <p className="text-sm text-white text-center mb-4">
          Please check your connection and try again
        </p>
        <Button
          onClick={() => window.location.reload()}
          variant="outline"
          className="border-white/20"
        >
          Retry
        </Button>
      </div>
    );
  }

  // Loading state
  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="space-y-3">
          <Skeleton className="h-8 w-48 bg-white/5" />
          <Skeleton className="h-4 w-64 bg-white/5" />
        </div>
        <Skeleton className="h-12 w-full bg-white/5 rounded-xl" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Skeleton key={i} className="h-64 bg-white/5 rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  const displayArticles = paginatedArticles;
  const carouselArticles = displayArticles.slice(0, 6);
  const gridArticles = displayArticles.slice(6);

  return (
    <PullToRefresh onRefresh={handleRefresh} isRefreshing={isRefreshing}>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-6"
      >
        {/* ═══════════════════════════════════════════════════════════════
            HEADER CARD — stats, refresh, search, filters
        ═══════════════════════════════════════════════════════════════ */}
        <motion.div variants={itemVariants} className="space-y-3">
          {/* Hero card — gradient accent, stats + refresh */}
          <div className="relative rounded-2xl bg-white/[0.03] border border-white/[0.08] overflow-hidden">
            <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-blue-500 via-cyan-400 to-elec-yellow opacity-60" />
            <div className="relative p-4 sm:p-5">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3 min-w-0 flex-1">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0">
                    <Newspaper className="h-5 w-5 text-blue-400" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                      <span className="text-[10px] font-bold text-green-400 uppercase tracking-[0.15em]">
                        Live Feed
                      </span>
                    </div>
                    <div className="mt-1 flex items-baseline gap-2 flex-wrap">
                      <span className="text-2xl sm:text-3xl font-bold text-white tabular-nums leading-none">
                        {articles.length.toLocaleString()}
                      </span>
                      <span className="text-xs text-white font-medium">articles</span>
                    </div>
                    {lastUpdatedAt && (
                      <p className="mt-1.5 flex items-center gap-1 text-[11px] text-white">
                        <Clock className="h-3 w-3" />
                        Updated {formatDistanceToNow(lastUpdatedAt, { addSuffix: true })}
                      </p>
                    )}
                  </div>
                </div>
                <Button
                  onClick={handleRefresh}
                  disabled={isRefreshing}
                  className="h-10 px-3 touch-manipulation bg-elec-yellow/10 hover:bg-elec-yellow/20 text-elec-yellow border border-elec-yellow/30 rounded-xl shrink-0 active:scale-[0.97] transition-transform disabled:opacity-50"
                >
                  <RefreshCw
                    className={cn('h-4 w-4', isRefreshing && 'animate-spin')}
                  />
                  <span className="ml-1.5 text-xs font-semibold hidden sm:inline">
                    {isRefreshing ? 'Refreshing' : 'Refresh'}
                  </span>
                </Button>
              </div>

              {/* Sources strip */}
              <div className="mt-4 pt-4 border-t border-white/[0.06] flex items-center gap-3 text-[11px] text-white flex-wrap">
                <span className="font-semibold text-white uppercase tracking-wider">
                  Sources
                </span>
                <span>•</span>
                <span>Electrical Times</span>
                <span>•</span>
                <span>Professional Electrician</span>
                <span>•</span>
                <span>ECN</span>
                <span>•</span>
                <span>IET</span>
                <span>•</span>
                <span>HSE</span>
              </div>
            </div>
          </div>

          {/* Search bar */}
          <div className="relative">
            <div className="relative group">
              {!searchTerm && (
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-white group-focus-within:text-elec-yellow transition-colors pointer-events-none" />
              )}
              <Input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={cn(
                  'w-full h-12 pr-4 bg-input border-white/[0.08] rounded-xl text-white placeholder:text-white/50 focus:border-elec-yellow/30 focus:ring-1 focus:ring-elec-yellow/20 transition-all',
                  !searchTerm && 'pl-11'
                )}
              />
              {searchTerm && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSearchTerm('')}
                  className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0 text-white hover:text-white hover:bg-white/10 rounded-lg"
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>

            {/* Search results indicator */}
            <AnimatePresence>
              {searchTerm && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="absolute -bottom-7 left-0 text-xs text-white"
                >
                  {filteredArticles.length} result{filteredArticles.length !== 1 ? 's' : ''} for "
                  {searchTerm}"
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Category filter pills */}
          <div className="flex gap-2 overflow-x-auto pb-2 -mx-1 px-1 scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={cn(
                  'px-3.5 py-1.5 rounded-full text-xs whitespace-nowrap transition-all touch-manipulation active:scale-[0.97]',
                  selectedCategory === cat
                    ? 'bg-elec-yellow text-black font-semibold shadow-[0_0_20px_rgba(250,204,21,0.2)]'
                    : 'bg-white/[0.04] text-white hover:bg-white/[0.08] border border-white/[0.06]'
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Spacer for search results text */}
        {searchTerm && <div className="h-2" />}

        {/* ═══════════════════════════════════════════════════════════════
            CONTENT
        ═══════════════════════════════════════════════════════════════ */}

        {articles.length === 0 ? (
          <motion.div variants={itemVariants} className="py-16 text-center">
            <div className="w-20 h-20 rounded-2xl bg-white/5 flex items-center justify-center mx-auto mb-4">
              <Newspaper className="h-10 w-10 text-white" />
            </div>
            <h2 className="text-lg font-medium text-white mb-2">No articles yet</h2>
            <p className="text-sm text-white mb-6">Pull down to fetch the latest news</p>
            <Button
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90"
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
              {isRefreshing ? 'Fetching...' : 'Get News'}
            </Button>
          </motion.div>
        ) : displayArticles.length === 0 ? (
          <motion.div variants={itemVariants} className="py-16 text-center">
            <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mx-auto mb-4">
              <Search className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-lg font-medium text-white mb-2">No matches</h2>
            <p className="text-sm text-white">Try different keywords</p>
          </motion.div>
        ) : (
          <>
            {/* Featured Carousel */}
            {carouselArticles.length > 0 && (
              <motion.section variants={itemVariants}>
                <NewsFeaturedCarousel articles={carouselArticles} />
              </motion.section>
            )}

            {/* Grid Section */}
            {gridArticles.length > 0 && (
              <motion.section variants={itemVariants} className="space-y-4">
                <div className="flex items-center gap-4">
                  <h2 className="text-base font-medium text-white">More Stories</h2>
                  <div className="flex-1 h-px bg-gradient-to-r from-white/10 to-transparent" />
                </div>
                <NewsGrid articles={gridArticles} />
              </motion.section>
            )}

            {/* Pagination */}
            {filteredArticles.length > ITEMS_PER_PAGE && (
              <motion.div variants={itemVariants}>
                <NewsPagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  paginate={handlePageChange}
                />
              </motion.div>
            )}
          </>
        )}

        {/* Footer attribution */}
        <motion.footer variants={itemVariants} className="pt-8 pb-4 text-center">
          <p className="text-[11px] text-white">News aggregated from trusted industry sources</p>
        </motion.footer>
      </motion.div>
    </PullToRefresh>
  );
};

export default NewIndustryNewsCard;
