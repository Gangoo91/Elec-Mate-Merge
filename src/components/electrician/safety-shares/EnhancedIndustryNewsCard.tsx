import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  ArrowLeft, 
  ExternalLink, 
  Newspaper, 
  Search, 
  Calendar, 
  Eye, 
  Star, 
  RefreshCw,
  Filter,
  Bookmark,
  BookmarkCheck,
  ThumbsUp,
  ThumbsDown,
  Share2
} from "lucide-react";
import { useState } from "react";
import { format } from "date-fns";
import { supabase } from "@/integrations/supabase/client";

interface NewsArticle {
  id: string;
  title: string;
  summary: string;
  content: string;
  source_url?: string;
  date_published: string;
  view_count?: number;
  average_rating?: number;
  category?: string;
  source_type?: string;
  source_name?: string;
}

interface UserInteraction {
  isBookmarked: boolean;
  rating: number | null;
  hasRated: boolean;
}

const EnhancedIndustryNewsCard = () => {
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("date");
  const [userInteractions, setUserInteractions] = useState<Record<string, UserInteraction>>({});
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchLiveNews = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      console.log('Fetching enhanced live industry news...');
      const { data, error } = await supabase.functions.invoke('comprehensive-news-scraper', {
        body: { live: true }
      });
      
      if (error) {
        console.error('Error fetching live news:', error);
        throw error;
      }
      
      console.log('Fetched enhanced live articles:', data?.articles?.length);
      setArticles(data?.articles || []);
    } catch (err) {
      console.error('Error:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch news');
    } finally {
      setIsLoading(false);
    }
  };

  // Get unique categories from articles
  const uniqueCategories = [...new Set(articles.map(article => article.category).filter(Boolean))];

  // Filter and sort articles
  const filteredArticles = articles.filter(article => {
    const matchesSearch = !searchTerm || 
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (article.summary && article.summary.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === "all" || article.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const sortedAndFilteredArticles = [...filteredArticles].sort((a, b) => {
    switch (sortBy) {
      case "date":
        return new Date(b.date_published).getTime() - new Date(a.date_published).getTime();
      case "views":
        return (b.view_count || 0) - (a.view_count || 0);
      case "rating":
        return (b.average_rating || 0) - (a.average_rating || 0);
      default:
        return 0;
    }
  });

  // User interaction handlers
  const toggleBookmark = (articleId: string) => {
    setUserInteractions(prev => ({
      ...prev,
      [articleId]: {
        ...prev[articleId],
        isBookmarked: !prev[articleId]?.isBookmarked
      }
    }));
  };

  const rateArticle = (articleId: string, rating: number) => {
    setUserInteractions(prev => ({
      ...prev,
      [articleId]: {
        ...prev[articleId],
        rating,
        hasRated: true
      }
    }));
  };

  const getCategoryColor = (category: string) => {
    switch (category?.toLowerCase()) {
      case "hse":
        return "bg-red-500/20 text-red-400 border-red-500/30";
      case "bs7671":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      case "iet":
        return "bg-green-500/20 text-green-400 border-green-500/30";
      case "major projects":
        return "bg-purple-500/20 text-purple-400 border-purple-500/30";
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  if (isLoading) {
    return (
      <Card className="w-full bg-elec-dark border-elec-yellow/20">
        <CardHeader>
          <CardTitle className="text-elec-yellow flex items-center gap-2">
            <Newspaper className="h-5 w-5" />
            Enhanced Industry News (Live)
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Fetching interactive industry news with filtering and user interactions...
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="h-4 w-3/4 bg-elec-yellow/10" />
              <Skeleton className="h-3 w-full bg-elec-yellow/10" />
              <Skeleton className="h-3 w-1/2 bg-elec-yellow/10" />
            </div>
          ))}
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="w-full bg-elec-dark border-elec-yellow/20">
        <CardHeader>
          <CardTitle className="text-elec-yellow flex items-center gap-2">
            <Newspaper className="h-5 w-5" />
            Enhanced Industry News (Live)
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
    <>
      <Card className="w-full bg-elec-dark border-elec-yellow/20">
        <CardHeader>
          <CardTitle className="text-elec-yellow flex items-center gap-2">
            <Newspaper className="h-5 w-5" />
            Enhanced Industry News (Live)
            <Button
              onClick={fetchLiveNews}
              variant="outline"
              size="sm"
              className="ml-auto border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow/10"
            >
              <RefreshCw className="h-4 w-4" />
              Fetch News
            </Button>
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Live interactive industry news with filtering, ratings, and bookmarking
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Enhanced Filters */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-elec-gray/50 border-elec-yellow/20 text-white"
              />
            </div>
            
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="bg-elec-gray/50 border-elec-yellow/20 text-white">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {uniqueCategories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="bg-elec-gray/50 border-elec-yellow/20 text-white">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="date">Date</SelectItem>
                <SelectItem value="views">Views</SelectItem>
                <SelectItem value="rating">Rating</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Articles List */}
          {sortedAndFilteredArticles.length === 0 ? (
            <div className="text-center py-12">
              <Newspaper className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <p className="text-lg text-muted-foreground mb-2">
                {articles.length === 0 
                  ? 'Click "Fetch News" to get the latest industry updates.'
                  : searchTerm || selectedCategory !== "all" 
                    ? 'No articles match your filters.' 
                    : 'No news articles available.'}
              </p>
              <p className="text-sm text-muted-foreground">
                {articles.length > 0 && 'Try adjusting your search terms or category filters.'}
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {sortedAndFilteredArticles.map((article) => (
                <Card key={article.id} className="border-elec-yellow/20 bg-elec-gray/30">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-3">
                          {article.category && (
                            <Badge className={getCategoryColor(article.category)}>
                              {article.category}
                            </Badge>
                          )}
                          {article.source_name && (
                            <span className="text-sm text-muted-foreground">
                              by {article.source_name}
                            </span>
                          )}
                          {article.average_rating && article.average_rating > 0 && (
                            <div className="flex items-center gap-1">
                              <Star className="h-3 w-3 text-yellow-400 fill-current" />
                              <span className="text-xs text-muted-foreground">
                                {article.average_rating.toFixed(1)}
                              </span>
                            </div>
                          )}
                        </div>
                        <CardTitle className="text-white text-lg mb-2 cursor-pointer hover:text-elec-yellow"
                          onClick={() => setSelectedArticle(article)}>
                          {article.title}
                        </CardTitle>
                        {article.summary && (
                          <p className="text-gray-300 text-sm line-clamp-2">
                            {article.summary}
                          </p>
                        )}
                      </div>
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        onClick={() => toggleBookmark(article.id)}
                        className={userInteractions[article.id]?.isBookmarked ? "text-elec-yellow" : "text-gray-400"}
                      >
                        {userInteractions[article.id]?.isBookmarked ? (
                          <BookmarkCheck className="h-4 w-4 fill-current" />
                        ) : (
                          <Bookmark className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </CardHeader>

                  <CardContent className="pt-0">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {format(new Date(article.date_published), 'dd MMM yyyy')}
                        </span>
                        {article.view_count !== undefined && (
                          <span className="flex items-center gap-1">
                            <Eye className="h-4 w-4" />
                            {article.view_count}
                          </span>
                        )}
                        <div className="flex items-center gap-1">
                          <ThumbsUp className="h-4 w-4" />
                          <span>{Math.floor(Math.random() * 50)}</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          variant="outline"
                          className="border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow/10"
                          onClick={() => setSelectedArticle(article)}
                        >
                          Read More
                        </Button>
                        {article.source_url && (
                          <Button 
                            size="sm" 
                            className="bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90"
                            onClick={() => window.open(article.source_url, '_blank', 'noopener,noreferrer')}
                          >
                            <ExternalLink className="h-4 w-4 mr-2" />
                            Source
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Show count */}
          {articles.length > 0 && (
            <div className="text-center text-sm text-muted-foreground">
              Showing {sortedAndFilteredArticles.length} of {articles.length} live articles
            </div>
          )}
        </CardContent>
      </Card>

      {/* Article Detail Dialog */}
      <Dialog open={!!selectedArticle} onOpenChange={() => setSelectedArticle(null)}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto bg-elec-dark border-elec-yellow/20">
          <DialogHeader>
            <DialogTitle className="text-elec-yellow text-xl">
              {selectedArticle?.title}
            </DialogTitle>
            <DialogDescription className="text-muted-foreground">
              <div className="flex flex-wrap items-center gap-2 mt-2">
                {selectedArticle?.category && (
                  <Badge className={getCategoryColor(selectedArticle.category)}>
                    {selectedArticle.category}
                  </Badge>
                )}
                <span>
                  Published: {selectedArticle && format(new Date(selectedArticle.date_published), 'dd MMM yyyy')}
                </span>
              </div>
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 text-white">
            {selectedArticle?.content && (
              <div className="prose prose-invert max-w-none">
                <p className="whitespace-pre-wrap">{selectedArticle.content}</p>
              </div>
            )}
            
            {/* User interaction buttons */}
            <div className="flex items-center justify-between border-t border-elec-yellow/20 pt-4">
              <div className="flex items-center gap-4">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => selectedArticle && toggleBookmark(selectedArticle.id)}
                  className={userInteractions[selectedArticle?.id || '']?.isBookmarked ? "text-elec-yellow" : "text-gray-400"}
                >
                  {userInteractions[selectedArticle?.id || '']?.isBookmarked ? (
                    <BookmarkCheck className="h-4 w-4 mr-2 fill-current" />
                  ) : (
                    <Bookmark className="h-4 w-4 mr-2" />
                  )}
                  {userInteractions[selectedArticle?.id || '']?.isBookmarked ? 'Saved' : 'Save'}
                </Button>
                
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`h-4 w-4 cursor-pointer ${
                        star <= (userInteractions[selectedArticle?.id || '']?.rating || 0)
                          ? "text-yellow-400 fill-current"
                          : "text-gray-600"
                      }`}
                      onClick={() => selectedArticle && rateArticle(selectedArticle.id, star)}
                    />
                  ))}
                </div>
              </div>
              
              {selectedArticle?.source_url && (
                <Button
                  onClick={() => {
                    if (selectedArticle.source_url) {
                      window.open(selectedArticle.source_url, '_blank', 'noopener,noreferrer');
                    }
                  }}
                  className="bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  View Source
                </Button>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EnhancedIndustryNewsCard;