import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Newspaper, AlertTriangle, RefreshCw } from "lucide-react";
import { useIndustryNews, type NewsArticle } from "@/hooks/useIndustryNews";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { isValidUrl } from "@/utils/urlUtils";
import NewsHero from "./NewsHero";
import NewsGrid from "./NewsGrid";
import NewsFilters from "./NewsFilters";
import NewsPagination from "./NewsPagination";

const NewIndustryNewsCard = () => {
  const { toast } = useToast();
  const { 
    data: articles = [], 
    isLoading, 
    error, 
    refetch, 
    refresh, 
    isRefreshing, 
    refreshError, 
    refreshSuccess 
  } = useIndustryNews();
  
  // Enhanced debugging
  console.log('📰 NewIndustryNewsCard render:', {
    articlesCount: articles.length,
    isLoading,
    hasError: !!error,
    errorMessage: error?.message,
    firstArticle: articles[0]?.title
  });
  
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);
  
  const ITEMS_PER_PAGE = 12; // 1 hero + 11 grid articles

  // Filter and sort articles with enhanced debugging
  const filteredAndSortedArticles = useMemo(() => {
    console.log('🔍 Starting filtering process:', {
      totalArticles: articles.length,
      searchTerm,
      selectedCategory,
      sortBy,
      sampleArticle: articles[0]
    });

    // Emergency fallback - if no articles, return empty array
    if (!articles || articles.length === 0) {
      console.warn('⚠️ No articles to filter');
      return [];
    }

    let filtered = articles.filter(article => {
      // Debug each article filtering
      const matchesSearch = !searchTerm || 
        (article.title && article.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (article.summary && article.summary.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (article.content && article.content.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesCategory = selectedCategory === "all" || 
        (article.category && article.category === selectedCategory);
      
      const hasValidUrl = isValidUrl(article.external_url);
      
      const passes = matchesSearch && matchesCategory && hasValidUrl;
      
      if (!passes) {
        console.log(`❌ Article filtered out: "${article.title}" - Search: ${matchesSearch}, Category: ${matchesCategory}, ValidURL: ${hasValidUrl}`);
      }
      
      return passes;
    });

    console.log(`✅ After filtering: ${filtered.length} articles remain`);

    // Sort articles with error handling
    try {
      filtered.sort((a, b) => {
        switch (sortBy) {
          case "newest":
            const dateA = new Date(a.date_published);
            const dateB = new Date(b.date_published);
            if (isNaN(dateA.getTime()) || isNaN(dateB.getTime())) {
              console.warn('⚠️ Invalid date found during sorting:', { a: a.date_published, b: b.date_published });
              return 0;
            }
            return dateB.getTime() - dateA.getTime();
          case "oldest":
            const dateA2 = new Date(a.date_published);
            const dateB2 = new Date(b.date_published);
            if (isNaN(dateA2.getTime()) || isNaN(dateB2.getTime())) {
              console.warn('⚠️ Invalid date found during sorting:', { a: a.date_published, b: b.date_published });
              return 0;
            }
            return dateA2.getTime() - dateB2.getTime();
          case "title":
            return (a.title || '').localeCompare(b.title || '');
          default:
            return 0;
        }
      });
    } catch (error) {
      console.error('❌ Error during sorting:', error);
      // If sorting fails, return unsorted filtered results
    }

    console.log(`🎯 Final filtered & sorted articles: ${filtered.length}`, filtered.map(a => ({ title: a.title, category: a.category, date: a.date_published })));

    return filtered;
  }, [articles, searchTerm, selectedCategory, sortBy]);

  // Reset to first page when filters change
  const resetPageOnFilterChange = useMemo(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory, sortBy]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredAndSortedArticles.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedArticles = filteredAndSortedArticles.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };


  const handleRefreshNews = () => {
    console.log('🔄 User clicked refresh news button - fetching live data with Firecrawl');
    refresh();
  };

  // Show toast notifications for refresh state
  if (refreshSuccess && !isRefreshing) {
    toast({
      title: "News Updated",
      description: "Latest industry news has been fetched successfully",
      duration: 3000,
    });
  }

  if (refreshError) {
    toast({
      title: "Refresh Failed", 
      description: "Failed to fetch latest news. Please try again later.",
      variant: "destructive",
      duration: 3000,
    });
  }

  if (error) {
    return (
      <Card className="w-full bg-elec-dark border-elec-yellow/20">
        <CardHeader>
          <CardTitle className="text-elec-yellow flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Error Loading News
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-red-400">
            Unable to load industry news. Please try again later.
          </p>
        </CardContent>
      </Card>
    );
  }

  if (isLoading) {
    return (
      <Card className="w-full bg-elec-dark border-elec-yellow/20">
        <CardHeader>
          <CardTitle className="text-elec-yellow flex items-center gap-2">
            <Newspaper className="h-5 w-5" />
            Industry News
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Hero skeleton */}
          <div className="h-64 bg-elec-gray/20 rounded-lg">
            <Skeleton className="h-full w-full bg-elec-yellow/10" />
          </div>
          
          {/* Grid skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i} className="bg-elec-gray/20 border-elec-yellow/10">
                <CardContent className="p-4 space-y-3">
                  <Skeleton className="h-5 w-16 bg-elec-yellow/10" />
                  <Skeleton className="h-6 w-3/4 bg-elec-yellow/10" />
                  <Skeleton className="h-4 w-full bg-elec-yellow/10" />
                  <Skeleton className="h-3 w-1/2 bg-elec-yellow/10" />
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  // Use paginated articles for display
  const displayArticles = paginatedArticles.length > 0 ? paginatedArticles : 
    (filteredAndSortedArticles.length > 0 ? filteredAndSortedArticles : articles).slice(0, ITEMS_PER_PAGE);
  
  console.log('📊 Display decision:', {
    filteredCount: filteredAndSortedArticles.length,
    totalCount: articles.length,
    currentPage,
    totalPages,
    paginatedCount: paginatedArticles.length,
    willDisplay: displayArticles.length
  });

  if (articles.length === 0) {
    return (
      <Card className="w-full bg-elec-dark border-elec-yellow/20">
        <CardHeader>
          <CardTitle className="text-elec-yellow flex items-center gap-2">
            <Newspaper className="h-5 w-5" />
            Industry News
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center py-12">
          <Newspaper className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <p className="text-lg text-muted-foreground mb-2">
            No news articles available
          </p>
          <p className="text-sm text-muted-foreground mb-4">
            Click "Refresh News" to fetch the latest industry updates from live sources
          </p>
          <Button
            onClick={handleRefreshNews}
            disabled={isRefreshing}
            className="bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90"
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
            {isRefreshing ? 'Fetching News...' : 'Get Latest News'}
          </Button>
        </CardContent>
      </Card>
    );
  }

  const heroArticle = displayArticles[0];
  const remainingArticles = displayArticles.slice(1);

  return (
    <>
      <div className="space-y-8">
        {/* Filters */}
        <NewsFilters
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          sortBy={sortBy}
          onSortChange={setSortBy}
          articles={articles}
        />

        {/* Results Summary with Refresh Button */}
        <div className="flex flex-col gap-4 w-full">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 w-full min-w-0">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 w-full min-w-0">
              <div className="text-sm text-muted-foreground min-w-0 flex-1 sm:flex-initial">
                <p className="break-words">
                  Showing {startIndex + 1}-{Math.min(endIndex, filteredAndSortedArticles.length)} of {filteredAndSortedArticles.length} articles
                  {totalPages > 1 && (
                    <span className="text-elec-yellow ml-2 whitespace-nowrap">(Page {currentPage} of {totalPages})</span>
                  )}
                </p>
                {articles.length > 0 && (
                  <p className="text-xs opacity-75 mt-1">
                    Sources: Electrical Times, Professional Electrician, ECN
                  </p>
                )}
              </div>
              <Button
                onClick={handleRefreshNews}
                disabled={isRefreshing}
                size="sm"
                variant="outline"
                className="border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow/10 hover:border-elec-yellow/50 bg-transparent whitespace-nowrap flex-shrink-0 ml-auto"
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
                {isRefreshing ? 'Fetching Latest...' : 'Refresh News'}
              </Button>
            </div>
          </div>
        </div>

        {displayArticles.length === 0 ? (
          <div className="text-center py-12">
            <Newspaper className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <p className="text-lg text-muted-foreground mb-2">
              No articles match your filters
            </p>
            <p className="text-sm text-muted-foreground">
              Try adjusting your search terms or category filter
            </p>
          </div>
        ) : (
          <>
            {/* Hero Article */}
            {heroArticle && (
              <NewsHero 
                article={heroArticle}
              />
            )}

            {/* Remaining Articles Grid */}
            {remainingArticles.length > 0 && (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-white">
                  More Industry News
                </h3>
                <NewsGrid 
                  articles={remainingArticles}
                />
              </div>
              )}
            </>
          )}

        {/* Pagination */}
        {filteredAndSortedArticles.length > ITEMS_PER_PAGE && (
          <NewsPagination
            currentPage={currentPage}
            totalPages={totalPages}
            paginate={handlePageChange}
          />
        )}
      </div>

    </>
  );
};

export default NewIndustryNewsCard;