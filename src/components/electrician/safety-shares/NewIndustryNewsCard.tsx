import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Newspaper, AlertTriangle, RefreshCw } from "lucide-react";
import { useIndustryNews, type NewsArticle } from "@/hooks/useIndustryNews";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import NewsHero from "./NewsHero";
import NewsGrid from "./NewsGrid";
import NewsFilters from "./NewsFilters";
import NewsDetail from "./NewsDetail";

const NewIndustryNewsCard = () => {
  const { toast } = useToast();
  const { data: articles = [], isLoading, error, refetch } = useIndustryNews();
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [isScrapingNews, setIsScrapingNews] = useState(false);

  // Filter and sort articles
  const filteredAndSortedArticles = useMemo(() => {
    let filtered = articles.filter(article => {
      const matchesSearch = !searchTerm || 
        article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.content.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = selectedCategory === "all" || 
        article.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });

    // Sort articles
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.date_published).getTime() - new Date(a.date_published).getTime();
        case "oldest":
          return new Date(a.date_published).getTime() - new Date(b.date_published).getTime();
        case "title":
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });

    return filtered;
  }, [articles, searchTerm, selectedCategory, sortBy]);

  const handleReadMore = (article: NewsArticle) => {
    setSelectedArticle(article);
  };

  const handleRefreshNews = async () => {
    setIsScrapingNews(true);
    try {
      console.log('🔧 Triggering news scraper...');
      const { data, error } = await supabase.functions.invoke('firecrawl-news-scraper', {
        body: { trigger: 'manual' }
      });

      if (error) {
        console.error('❌ Error calling news scraper:', error);
        throw error;
      }

      console.log('✅ News scraper response:', data);
      
      toast({
        title: "News Updated",
        description: data?.message || "News articles have been refreshed successfully",
        duration: 5000,
      });

      // Refresh the news data
      refetch();
    } catch (error) {
      console.error('❌ News refresh failed:', error);
      toast({
        title: "Refresh Failed",
        description: "Failed to refresh news articles. Please try again later.",
        variant: "destructive",
        duration: 5000,
      });
    } finally {
      setIsScrapingNews(false);
    }
  };

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
          <p className="text-sm text-muted-foreground">
            Check back later for the latest industry updates
          </p>
        </CardContent>
      </Card>
    );
  }

  const heroArticle = filteredAndSortedArticles[0];
  const remainingArticles = filteredAndSortedArticles.slice(1);

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
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-2">
            <Newspaper className="h-5 w-5 text-elec-yellow" />
            <h2 className="text-2xl font-semibold text-elec-yellow">
              Industry News
            </h2>
          </div>
          <div className="flex items-center gap-4">
            <p className="text-sm text-muted-foreground">
              Showing {filteredAndSortedArticles.length} of {articles.length} articles
            </p>
            <Button
              onClick={handleRefreshNews}
              disabled={isScrapingNews}
              size="sm"
              variant="outline"
              className="border-elec-yellow/20 text-elec-yellow hover:bg-elec-yellow/10 hover:border-elec-yellow/40 bg-transparent"
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${isScrapingNews ? 'animate-spin' : ''}`} />
              {isScrapingNews ? 'Updating...' : 'Refresh News'}
            </Button>
          </div>
        </div>

        {filteredAndSortedArticles.length === 0 ? (
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
                onReadMore={handleReadMore}
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
                  onReadMore={handleReadMore}
                />
              </div>
            )}
          </>
        )}
      </div>

      {/* Article Detail Modal */}
      <NewsDetail
        article={selectedArticle}
        isOpen={!!selectedArticle}
        onClose={() => setSelectedArticle(null)}
      />
    </>
  );
};

export default NewIndustryNewsCard;