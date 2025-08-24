import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ArrowLeft, ExternalLink, Newspaper, Search, Calendar, Eye, Star, RefreshCw } from "lucide-react";
import { useState } from "react";
import { format } from "date-fns";
import { supabase } from "@/integrations/supabase/client";

interface NewsArticle {
  id?: string;
  title: string;
  url: string;
  snippet: string;
  date: string;
  tag: string;
}

const IndustryNewsCard = () => {
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

  // Filter articles based on search and category
  const filteredArticles = articles.filter(article => {
    const matchesSearch = !searchTerm || 
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (article.snippet && article.snippet.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = !selectedCategory || article.tag === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  if (isLoading) {
    return (
      <Card className="w-full bg-elec-dark border-elec-yellow/20">
        <CardHeader>
          <CardTitle className="text-elec-yellow flex items-center gap-2">
            <Newspaper className="h-5 w-5" />
            Industry News (Live)
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Fetching latest regulatory updates and compliance information...
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {[1, 2, 3].map((i) => (
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
    <>
      <Card className="w-full bg-elec-dark border-elec-yellow/20">
        <CardHeader>
          <CardTitle className="text-elec-yellow flex items-center gap-2">
            <Newspaper className="h-5 w-5" />
            Industry News (Live)
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
            Live regulatory updates and compliance information from industry bodies
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Search and Filter Controls */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-elec-gray/50 border-elec-yellow/20 text-white"
              />
            </div>
            {uniqueCategories.length > 0 && (
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 rounded-md bg-elec-gray/50 border border-elec-yellow/20 text-white"
              >
                <option value="">All Categories</option>
                {uniqueCategories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            )}
          </div>

          {/* Articles List */}
          {filteredArticles.length === 0 ? (
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
              {filteredArticles.map((article) => (
                <div
                  key={article.id}
                  className="p-4 rounded-lg border border-elec-yellow/10 bg-elec-gray/30 hover:border-elec-yellow/30 transition-colors cursor-pointer"
                  onClick={() => setSelectedArticle(article)}
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
                      <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                        {article.tag && (
                          <Badge variant="secondary" className="bg-elec-yellow/20 text-elec-yellow">
                            {article.tag}
                          </Badge>
                        )}
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {article.date && article.date !== "" && !isNaN(new Date(article.date).getTime())
                            ? format(new Date(article.date), 'dd MMM yyyy')
                            : 'No date'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Show count */}
          {articles.length > 0 && (
            <div className="text-center text-sm text-muted-foreground">
              Showing {filteredArticles.length} of {articles.length} articles
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
                {selectedArticle?.tag && (
                  <Badge variant="secondary" className="bg-elec-yellow/20 text-elec-yellow">
                    {selectedArticle.tag}
                  </Badge>
                )}
                <span>
                  Published: {selectedArticle && selectedArticle.date && selectedArticle.date !== "" && !isNaN(new Date(selectedArticle.date).getTime())
                    ? format(new Date(selectedArticle.date), 'dd MMM yyyy')
                    : 'No date'}
                </span>
              </div>
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 text-white">
            {selectedArticle?.snippet && (
              <div className="prose prose-invert max-w-none">
                <p className="whitespace-pre-wrap">{selectedArticle.snippet}</p>
              </div>
            )}
            {selectedArticle?.url && (
              <div className="flex justify-end">
                <Button
                  onClick={() => {
                    if (selectedArticle.url) {
                      window.open(selectedArticle.url, '_blank', 'noopener,noreferrer');
                    }
                  }}
                  className="bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Read Full Article
                </Button>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default IndustryNewsCard;