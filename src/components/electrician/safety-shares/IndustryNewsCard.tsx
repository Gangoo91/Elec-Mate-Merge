import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, ExternalLink, Newspaper, Search, Calendar, Eye, Star, RefreshCw } from "lucide-react";
import { useState, useEffect } from "react";
import { format } from "date-fns";
import { supabase } from "@/integrations/supabase/client";
import NewsPagination from "./NewsPagination";

interface NewsArticle {
  id?: string;
  title: string;
  url: string;
  snippet: string;
  date: string;
  tag: string;
}

const IndustryNewsCard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [sortOption, setSortOption] = useState<string>("random");

  const fetchLiveNews = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      console.log('Fetching live industry news...');
      const { data, error } = await supabase.functions.invoke('comprehensive-news-scraper', {
        body: { live: true }
      });
      
      if (error) {
        console.error('Error fetching live news:', error);
        throw error;
      }
      
      console.log('Fetched live articles:', data?.articles?.length);
      // Add IDs to articles for React keys
      const articlesWithIds = (data?.articles || []).map((article, index) => ({
        ...article,
        id: `${article.url || article.title}-${index}`
      }));
      setArticles(articlesWithIds);
    } catch (err) {
      console.error('Error:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch news');
    } finally {
      setIsLoading(false);
    }
  };

  // Get unique categories from articles
  const uniqueCategories = [...new Set(articles.map(article => article.tag).filter(Boolean))];

  // Count articles per category
  const getCategoryCount = (category: string) => {
    return articles.filter(article => 
      (!searchTerm || 
        article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (article.snippet && article.snippet.toLowerCase().includes(searchTerm.toLowerCase()))
      ) && article.tag === category
    ).length;
  };

  // Parse relative date strings to Date objects for sorting
  const parseRelativeDate = (dateString: string): Date => {
    if (!dateString) return new Date();
    
    const now = new Date();
    const lowerDate = dateString.toLowerCase();
    
    // Handle "X minutes/hours/days/weeks/months/years ago" format
    const timeAgoMatch = lowerDate.match(/(\d+)\s*(minute|hour|day|week|month|year)s?\s*ago/);
    if (timeAgoMatch) {
      const amount = parseInt(timeAgoMatch[1]);
      const unit = timeAgoMatch[2];
      
      switch (unit) {
        case 'minute':
          return new Date(now.getTime() - amount * 60 * 1000);
        case 'hour':
          return new Date(now.getTime() - amount * 60 * 60 * 1000);
        case 'day':
          return new Date(now.getTime() - amount * 24 * 60 * 60 * 1000);
        case 'week':
          return new Date(now.getTime() - amount * 7 * 24 * 60 * 60 * 1000);
        case 'month':
          return new Date(now.getTime() - amount * 30 * 24 * 60 * 60 * 1000);
        case 'year':
          return new Date(now.getTime() - amount * 365 * 24 * 60 * 60 * 1000);
        default:
          return now;
      }
    }
    
    // Try to parse as regular date
    const parsedDate = new Date(dateString);
    return isNaN(parsedDate.getTime()) ? now : parsedDate;
  };

  // Shuffle function to randomize array
  const shuffleArray = <T,>(array: T[]): T[] => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  // Sort articles based on selected option
  const sortArticles = (articles: NewsArticle[]): NewsArticle[] => {
    switch (sortOption) {
      case "newest":
        return [...articles].sort((a, b) => {
          const dateA = parseRelativeDate(a.date);
          const dateB = parseRelativeDate(b.date);
          return dateB.getTime() - dateA.getTime(); // Newest first
        });
      case "oldest":
        return [...articles].sort((a, b) => {
          const dateA = parseRelativeDate(a.date);
          const dateB = parseRelativeDate(b.date);
          return dateA.getTime() - dateB.getTime(); // Oldest first
        });
      case "random":
      default:
        return shuffleArray(articles);
    }
  };

  // Filter and sort articles based on search, category, and sort option
  const filteredArticles = sortArticles(articles.filter(article => {
    const matchesSearch = !searchTerm || 
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (article.snippet && article.snippet.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = !selectedCategory || article.tag === selectedCategory;
    
    return matchesSearch && matchesCategory;
  }));

  // Reset to page 1 when filters or sort option change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory, sortOption]);

  // Pagination calculations
  const totalPages = itemsPerPage === -1 ? 1 : Math.ceil(filteredArticles.length / itemsPerPage);
  const startIndex = itemsPerPage === -1 ? 0 : (currentPage - 1) * itemsPerPage;
  const endIndex = itemsPerPage === -1 ? filteredArticles.length : startIndex + itemsPerPage;
  const currentArticles = filteredArticles.slice(startIndex, endIndex);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleItemsPerPageChange = (value: string) => {
    const newItemsPerPage = value === "all" ? -1 : parseInt(value);
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
  };

  const handleSortChange = (value: string) => {
    setSortOption(value);
    setCurrentPage(1);
  };


  if (error) {
    return (
      <Card className="w-full bg-elec-dark border-elec-yellow/20">
        <CardHeader>
          <CardTitle className="text-elec-yellow flex items-center gap-2">
            <Newspaper className="h-5 w-5" />
            Industry News (Live)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-red-400">Error loading news: {error}</p>
          <Button 
            onClick={fetchLiveNews} 
            className="mt-2 bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Try Again
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full bg-elec-dark border-elec-yellow/20">
        <CardHeader>
          <CardTitle className="text-elec-yellow flex items-center gap-2">
            <Newspaper className="h-5 w-5" />
            Industry News (Live)
            <Button
              onClick={fetchLiveNews}
              disabled={isLoading}
              variant="outline"
              size="sm"
              className="ml-auto border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow/10 disabled:opacity-50"
            >
              <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
              {isLoading ? 'Fetching...' : 'Fetch News'}
            </Button>
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Live regulatory updates and compliance information from industry bodies
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Search and Filter Controls */}
          <div className="space-y-4">
            {/* Search Input */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                disabled={isLoading}
                className="pl-10 bg-elec-gray/50 border-elec-yellow/20 text-white disabled:opacity-50"
              />
            </div>

            {/* Category Filter Buttons and Items Per Page */}
            {uniqueCategories.length > 0 && (
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Filter by category:</p>
                    <div className="flex flex-wrap gap-2 sm:gap-3">
                      <Badge
                        variant={selectedCategory === "" ? "default" : "outline"}
                        className={`transition-colors ${
                          isLoading 
                            ? "opacity-50 cursor-not-allowed" 
                            : "cursor-pointer"
                        } ${
                          selectedCategory === ""
                            ? "bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90"
                            : "border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow/10"
                        }`}
                        onClick={isLoading ? undefined : () => setSelectedCategory("")}
                      >
                        All Categories ({articles.filter(a => !searchTerm || 
                          a.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (a.snippet && a.snippet.toLowerCase().includes(searchTerm.toLowerCase()))
                        ).length})
                      </Badge>
                      {uniqueCategories.map((category) => (
                        <Badge
                          key={category}
                          variant={selectedCategory === category ? "default" : "outline"}
                          className={`transition-colors ${
                            isLoading 
                              ? "opacity-50 cursor-not-allowed" 
                              : "cursor-pointer"
                          } ${
                            selectedCategory === category
                              ? "bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90"
                              : "border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow/10"
                          }`}
                          onClick={isLoading ? undefined : () => setSelectedCategory(category)}
                        >
                          {category} ({getCategoryCount(category)})
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  {/* Sort and Items Per Page Controls */}
                  <div className="flex flex-col sm:flex-row gap-4">
                    {/* Sort Options */}
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">Sort by:</p>
                      <Select 
                        value={sortOption} 
                        onValueChange={handleSortChange}
                        disabled={isLoading}
                      >
                        <SelectTrigger className="w-36 bg-elec-gray/50 border-elec-yellow/20 text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-elec-dark border-elec-yellow/20">
                          <SelectItem value="random" className="text-white hover:bg-elec-yellow/10">Random</SelectItem>
                          <SelectItem value="newest" className="text-white hover:bg-elec-yellow/10">Newest First</SelectItem>
                          <SelectItem value="oldest" className="text-white hover:bg-elec-yellow/10">Oldest First</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Items Per Page Selector */}
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">Articles per page:</p>
                      <Select 
                        value={itemsPerPage === -1 ? "all" : itemsPerPage.toString()} 
                        onValueChange={handleItemsPerPageChange}
                        disabled={isLoading}
                      >
                        <SelectTrigger className="w-32 bg-elec-gray/50 border-elec-yellow/20 text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-elec-dark border-elec-yellow/20">
                          <SelectItem value="5" className="text-white hover:bg-elec-yellow/10">5</SelectItem>
                          <SelectItem value="10" className="text-white hover:bg-elec-yellow/10">10</SelectItem>
                          <SelectItem value="20" className="text-white hover:bg-elec-yellow/10">20</SelectItem>
                          <SelectItem value="50" className="text-white hover:bg-elec-yellow/10">50</SelectItem>
                          <SelectItem value="all" className="text-white hover:bg-elec-yellow/10">All</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Articles List */}
          {isLoading && articles.length === 0 ? (
            <div className="space-y-4">
              <div className="text-center py-4">
                <p className="text-muted-foreground">Fetching latest articles...</p>
              </div>
              {[1, 2, 3].map((i) => (
                <div key={i} className="space-y-2 p-4 rounded-lg border border-elec-yellow/10 bg-elec-gray/30">
                  <Skeleton className="h-5 w-3/4 bg-elec-yellow/10" />
                  <Skeleton className="h-4 w-full bg-elec-yellow/10" />
                  <Skeleton className="h-3 w-1/2 bg-elec-yellow/10" />
                </div>
              ))}
            </div>
          ) : filteredArticles.length === 0 ? (
            <div className="text-center py-8">
              <Newspaper className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">
                {articles.length === 0 
                  ? 'Click "Fetch News" to get the latest industry updates.'
                  : searchTerm || selectedCategory 
                    ? 'No articles match your search criteria.' 
                    : 'No news articles available.'}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {currentArticles.map((article) => (
                <div
                  key={article.id}
                  className="p-4 rounded-lg border border-elec-yellow/10 bg-elec-gray/30 hover:border-elec-yellow/30 transition-colors"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="font-semibold text-white mb-2 line-clamp-2">
                        {article.title}
                      </h3>
                      {article.snippet && (
                        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                          {article.snippet}
                        </p>
                      )}
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                          {article.tag && (
                            <Badge variant="secondary" className="bg-elec-yellow/20 text-elec-yellow">
                              {article.tag}
                            </Badge>
                          )}
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {article.date || 'Date not available'}
                          </span>
                        </div>
                        <Button
                          onClick={() => {
                            if (article.url) {
                              window.open(article.url, '_blank', 'noopener,noreferrer');
                            }
                          }}
                          size="sm"
                          className="bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90 shrink-0"
                        >
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Read Full Article
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Pagination */}
          {filteredArticles.length > 0 && itemsPerPage !== -1 && (
            <NewsPagination 
              currentPage={currentPage}
              totalPages={totalPages}
              paginate={handlePageChange}
            />
          )}

          {/* Show count */}
          {articles.length > 0 && (
            <div className="text-center text-sm text-muted-foreground">
              {itemsPerPage === -1 
                ? `Showing all ${filteredArticles.length} of ${articles.length} articles`
                : `Showing ${startIndex + 1}-${Math.min(endIndex, filteredArticles.length)} of ${filteredArticles.length} articles (Page ${currentPage} of ${totalPages})`
              }
            </div>
          )}
        </CardContent>
      </Card>
  );
};

export default IndustryNewsCard;