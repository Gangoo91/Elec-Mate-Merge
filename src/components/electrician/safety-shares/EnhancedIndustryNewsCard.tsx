
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Newspaper, Clock, ExternalLink, Eye, MessageSquare, Bookmark, Search, Filter, Star, ThumbsUp, RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";

interface NewsArticle {
  id: string;
  title: string;
  summary: string;
  content: string;
  category: string;
  regulatory_body: string;
  date_published: string;
  view_count: number;
  average_rating: number;
  external_url?: string;
  source_url?: string;
  tags?: string[];
  created_at: string;
  updated_at: string;
  is_active: boolean;
}

const EnhancedIndustryNewsCard = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedSource, setSelectedSource] = useState("all");
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);
  const [bookmarkedArticles, setBookmarkedArticles] = useState<Set<string>>(new Set());
  const [likedArticles, setLikedArticles] = useState<Set<string>>(new Set());
  const { toast } = useToast();

  // Fetch industry news from database
  const { data: articles = [], isLoading, refetch } = useQuery({
    queryKey: ['enhanced-industry-news'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('industry_news')
        .select('*')
        .eq('is_active', true)
        .order('date_published', { ascending: false })
        .limit(50);
      
      if (error) throw error;
      return data || [];
    }
  });

  // Manual refresh function
  const handleManualRefresh = async () => {
    try {
      toast({
        title: "Fetching Latest News",
        description: "Updating from industry sources...",
        duration: 2000,
      });

      const { error } = await supabase.functions.invoke('fetch-industry-news');
      
      if (error) {
        console.error('Edge function error:', error);
        toast({
          title: "Refresh Info", 
          description: "Refreshing from database...",
          duration: 2000,
        });
      } else {
        toast({
          title: "News Updated",
          description: "Latest industry news fetched successfully",
        });
      }
      
      // Always refetch from database
      await refetch();
    } catch (error) {
      console.error('Refresh error:', error);
      toast({
        title: "Refreshed Locally",
        description: "Showing latest cached articles", 
        duration: 2000,
      });
      await refetch();
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case "regulations": return "bg-red-500/20 text-red-400 border-red-500/30";
      case "bs7671": return "bg-red-500/20 text-red-400 border-red-500/30";
      case "regulatory": return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      case "safety": return "bg-orange-500/20 text-orange-400 border-orange-500/30";
      case "electrical": return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "major projects": return "bg-purple-500/20 text-purple-400 border-purple-500/30";
      case "technical": return "bg-green-500/20 text-green-400 border-green-500/30";
      case "iet": return "bg-green-500/20 text-green-400 border-green-500/30";
      case "hse": return "bg-orange-500/20 text-orange-400 border-orange-500/30";
      default: return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  const toggleBookmark = (articleId: string) => {
    setBookmarkedArticles(prev => {
      const newSet = new Set(prev);
      if (newSet.has(articleId)) {
        newSet.delete(articleId);
      } else {
        newSet.add(articleId);
      }
      return newSet;
    });
  };

  const handleLike = (articleId: string) => {
    setLikedArticles(prev => {
      const newSet = new Set(prev);
      newSet.add(articleId);
      return newSet;
    });
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-3 w-3 ${
          i < Math.floor(rating)
            ? "text-yellow-400 fill-current"
            : "text-gray-600"
        }`}
      />
    ));
  };

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (article.summary && article.summary.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === "all" || article.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesSource = selectedSource === "all" || article.regulatory_body === selectedSource;
    
    return matchesSearch && matchesCategory && matchesSource;
  });

  // Extract unique categories and sources for filtering
  const uniqueCategories = Array.from(new Set(articles.map(article => article.category).filter(Boolean)));
  const uniqueSources = Array.from(new Set(articles.map(article => article.regulatory_body).filter(Boolean)));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Enhanced Industry News</h2>
          <p className="text-muted-foreground">Interactive industry news with filtering, ratings, and bookmarking</p>
        </div>
        <Button
          onClick={handleManualRefresh}
          className="bg-elec-yellow text-black hover:bg-elec-yellow/90"
          disabled={isLoading}
        >
          <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
          {isLoading ? 'Refreshing...' : 'Refresh News'}
        </Button>
      </div>

      {/* Enhanced Filters */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search news..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-elec-dark/50 border-elec-yellow/30"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="bg-elec-dark/50 border-elec-yellow/30">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {uniqueCategories.map((category) => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedSource} onValueChange={setSelectedSource}>
              <SelectTrigger className="bg-elec-dark/50 border-elec-yellow/30">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by source" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Sources</SelectItem>
                {uniqueSources.map((source) => (
                  <SelectItem key={source} value={source}>{source}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {isLoading ? (
        <div className="text-center py-8">
          <div className="animate-spin h-8 w-8 border-2 border-elec-yellow border-t-transparent rounded-full mx-auto"></div>
          <p className="text-gray-400 mt-2">Loading enhanced news...</p>
        </div>
      ) : (
        <div className="grid gap-6">
          {filteredArticles.map((article) => (
            <Card key={article.id} className="border-elec-yellow/20 bg-elec-gray">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-3">
                      <Badge className={getCategoryColor(article.category)}>
                        {article.category}
                      </Badge>
                      <span className="text-sm text-muted-foreground">by {article.regulatory_body}</span>
                      <div className="flex items-center gap-1">
                        {renderStars(article.average_rating || 0)}
                        <span className="text-xs text-muted-foreground ml-1">({article.average_rating?.toFixed(1) || '0.0'})</span>
                      </div>
                      {/* Show category-based tags */}
                      <Badge variant="outline" className="text-xs border-elec-yellow/30 text-elec-yellow">
                        {article.category}
                      </Badge>
                    </div>
                    <CardTitle className="text-white text-lg mb-2">
                      {article.title}
                    </CardTitle>
                    <p className="text-gray-300 text-sm line-clamp-2">
                      {article.summary}
                    </p>
                  </div>
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    onClick={() => toggleBookmark(article.id)}
                    className={bookmarkedArticles.has(article.id) ? "text-elec-yellow" : "text-gray-400"}
                  >
                    <Bookmark className={`h-4 w-4 ${bookmarkedArticles.has(article.id) ? "fill-current" : ""}`} />
                  </Button>
                </div>
              </CardHeader>

              <CardContent className="pt-0">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{format(new Date(article.date_published), 'dd MMM yyyy')}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye className="h-4 w-4" />
                      <span>{article.view_count || 0}</span>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleLike(article.id)}
                      className={`flex items-center gap-1 p-0 h-auto ${
                        likedArticles.has(article.id) ? "text-elec-yellow" : "text-muted-foreground hover:text-elec-yellow"
                      }`}
                    >
                      <ThumbsUp className="h-4 w-4" />
                      <span>{likedArticles.has(article.id) ? '1' : '0'}</span>
                    </Button>
                  </div>
                  <div className="flex gap-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow/10"
                          onClick={() => setSelectedArticle(article as NewsArticle)}
                        >
                          Read Article
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto bg-elec-gray border-elec-yellow/20">
                        <DialogHeader>
                          <DialogTitle className="text-elec-yellow text-xl">{selectedArticle?.title}</DialogTitle>
                          <DialogDescription className="text-gray-300">
                            <div className="flex flex-wrap items-center gap-2 mt-2">
                              <Badge className={getCategoryColor(selectedArticle?.category || '')}>
                                {selectedArticle?.category}
                              </Badge>
                              <span>Published: {selectedArticle && format(new Date(selectedArticle.date_published), 'dd MMM yyyy')}</span>
                              <span>•</span>
                              <span>Source: {selectedArticle?.regulatory_body}</span>
                            </div>
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4 text-white">
                          {selectedArticle?.content && (
                            <div className="prose prose-invert max-w-none">
                              <div className="whitespace-pre-wrap">{selectedArticle.content}</div>
                            </div>
                          )}
                        </div>
                      </DialogContent>
                    </Dialog>
                    {(article as any).source_url && (
                      <Button 
                        size="sm" 
                        className="bg-elec-yellow text-black hover:bg-elec-yellow/90"
                        onClick={() => window.open((article as any).source_url, '_blank')}
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

      {filteredArticles.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          No articles found matching your search criteria.
        </div>
      )}

      <div className="text-center pt-4">
        <Button variant="outline" className="border-elec-yellow/30 text-white hover:bg-elec-yellow/10">
          Load More Articles
        </Button>
      </div>
    </div>
  );
};

export default EnhancedIndustryNewsCard;
