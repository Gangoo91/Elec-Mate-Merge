import { useState, useMemo, useCallback, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Newspaper,
  AlertTriangle,
  RefreshCw,
  Search,
  X,
  ArrowLeft,
  Sparkles,
  Zap,
  ChevronDown
} from "lucide-react";
import { useIndustryNews } from "@/hooks/useIndustryNews";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { isValidUrl } from "@/utils/urlUtils";
import NewsGrid from "./NewsGrid";
import NewsPagination from "./NewsPagination";
import NewsFeaturedCarousel from "./NewsFeaturedCarousel";
import { PullToRefresh } from "@/components/ui/pull-to-refresh";
import { motion, AnimatePresence } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 400, damping: 28 },
  },
};

const NewIndustryNewsCard = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const {
    data: articles = [],
    isLoading,
    error,
    refresh,
    isRefreshing,
    refreshError,
    refreshSuccess
  } = useIndustryNews();

  const [searchTerm, setSearchTerm] = useState("");
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const ITEMS_PER_PAGE = 18;

  // Filter articles
  const filteredArticles = useMemo(() => {
    if (!articles || articles.length === 0) return [];

    return articles
      .filter(article => {
        const matchesSearch = !searchTerm ||
          article.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          article.summary?.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesSearch && isValidUrl(article.external_url);
      })
      .sort((a, b) => {
        const dateA = new Date(a.date_published);
        const dateB = new Date(b.date_published);
        return dateB.getTime() - dateA.getTime();
      });
  }, [articles, searchTerm]);

  // Reset page on search
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

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
      toast({ title: "Updated", description: "Latest news fetched", duration: 2000 });
    }
    if (!refreshSuccess) {
      hasShownSuccessRef.current = false;
    }
  }, [refreshSuccess, isRefreshing, toast]);

  useEffect(() => {
    if (refreshError && !hasShownErrorRef.current) {
      hasShownErrorRef.current = true;
      toast({ title: "Error", description: "Could not refresh", variant: "destructive", duration: 2000 });
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
        <p className="text-sm text-white/50 text-center mb-4">Please check your connection and try again</p>
        <Button onClick={() => window.location.reload()} variant="outline" className="border-white/20">
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
            HEADER - Premium, cohesive design
        ═══════════════════════════════════════════════════════════════ */}
        <motion.header variants={itemVariants} className="relative">
          {/* Background glow */}
          <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[400px] h-[200px] bg-elec-yellow/[0.03] rounded-full blur-3xl pointer-events-none" />

          <div className="relative space-y-4">
            {/* Top row: Back + Actions */}
            <div className="flex items-center justify-between">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate(-1)}
                className="text-white/50 hover:text-white hover:bg-white/5 -ml-2 gap-1.5"
              >
                <ArrowLeft className="h-4 w-4" />
                <span className="text-sm">Back</span>
              </Button>

              {/* Desktop refresh - subtle */}
              <Button
                variant="ghost"
                size="sm"
                onClick={handleRefresh}
                disabled={isRefreshing}
                className="hidden sm:flex text-white/40 hover:text-elec-yellow hover:bg-elec-yellow/5 gap-2"
              >
                <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                <span className="text-sm">{isRefreshing ? 'Updating...' : 'Refresh'}</span>
              </Button>
            </div>

            {/* Title section */}
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5 text-elec-yellow">
                  <Zap className="h-4 w-4" />
                  <span className="text-xs font-medium tracking-wide uppercase">Live Feed</span>
                </div>
                {articles.length > 0 && (
                  <span className="text-xs text-white/30">• {articles.length} articles</span>
                )}
              </div>

              <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Industry Updates
              </h1>

              <p className="text-sm text-white/50">
                Electrical Times • Professional Electrician • ECN
              </p>
            </div>

            {/* Search bar - elegant, integrated */}
            <div className="relative">
              <div className="relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30 group-focus-within:text-elec-yellow transition-colors" />
                <Input
                  type="text"
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full h-12 pl-11 pr-4 bg-white/[0.03] border-white/[0.08] rounded-xl text-white placeholder:text-white/30 focus:bg-white/[0.05] focus:border-elec-yellow/30 focus:ring-1 focus:ring-elec-yellow/20 transition-all"
                />
                {searchTerm && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSearchTerm("")}
                    className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0 text-white/40 hover:text-white hover:bg-white/10 rounded-lg"
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
                    className="absolute -bottom-7 left-0 text-xs text-white/40"
                  >
                    {filteredArticles.length} result{filteredArticles.length !== 1 ? 's' : ''} for "{searchTerm}"
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.header>

        {/* Spacer for search results text */}
        {searchTerm && <div className="h-2" />}

        {/* ═══════════════════════════════════════════════════════════════
            CONTENT
        ═══════════════════════════════════════════════════════════════ */}

        {articles.length === 0 ? (
          <motion.div variants={itemVariants} className="py-16 text-center">
            <div className="w-20 h-20 rounded-2xl bg-white/5 flex items-center justify-center mx-auto mb-4">
              <Newspaper className="h-10 w-10 text-white/20" />
            </div>
            <h2 className="text-lg font-medium text-white mb-2">No articles yet</h2>
            <p className="text-sm text-white/40 mb-6">Pull down to fetch the latest news</p>
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
              <Search className="h-8 w-8 text-white/20" />
            </div>
            <h2 className="text-lg font-medium text-white mb-2">No matches</h2>
            <p className="text-sm text-white/40">Try different keywords</p>
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
                  <h2 className="text-base font-medium text-white/70">More Stories</h2>
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
        <motion.footer
          variants={itemVariants}
          className="pt-8 pb-4 text-center"
        >
          <p className="text-[11px] text-white/20">
            News aggregated from trusted industry sources
          </p>
        </motion.footer>
      </motion.div>
    </PullToRefresh>
  );
};

export default NewIndustryNewsCard;
