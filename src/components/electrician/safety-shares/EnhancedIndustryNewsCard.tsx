
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Newspaper, Clock, ExternalLink, Eye, MessageSquare, Bookmark, Search, Filter, Star, ThumbsUp, RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";

interface NewsArticle {
  id: string;
  title: string;
  summary: string;
  category: string;
  source: string;
  datePublished: string;
  readTime: string;
  views: number;
  comments: number;
  likes: number;
  bookmarked: boolean;
  rating: number;
  external_url?: string;
  source_url?: string;
}

const EnhancedIndustryNewsCard = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedSource, setSelectedSource] = useState("all");
  const [bookmarkedArticles, setBookmarkedArticles] = useState<Set<string>>(new Set());
  const [likedArticles, setLikedArticles] = useState<Set<string>>(new Set());
  const { toast } = useToast();

  // Fetch real industry news from Supabase
  const { data: realArticles = [], isLoading, refetch } = useQuery({
    queryKey: ['enhanced-industry-news'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('industry_news')
        .select('*')
        .eq('is_active', true)
        .order('date_published', { ascending: false })
        .limit(50);
      
      if (error) {
        console.error('Error fetching industry news:', error);
        throw error;
      }
      
      return data || [];
    },
    refetchOnWindowFocus: false,
  });

  // Transform real articles to match enhanced interface
  const articles: NewsArticle[] = realArticles.map(article => ({
    id: article.id,
    title: article.title,
    summary: article.summary,
    category: article.category,
    source: article.source_name || article.regulatory_body,
    datePublished: article.date_published,
    readTime: `${Math.ceil(article.content.length / 200)} min`, // Estimate read time
    views: article.view_count || 0,
    comments: Math.floor(Math.random() * 50), // Mock for now
    likes: Math.floor(Math.random() * 100), // Mock for now  
    bookmarked: bookmarkedArticles.has(article.id),
    rating: article.average_rating || 4.0,
    external_url: article.external_url,
    source_url: article.source_url
  }));

  // Live refresh function
  const handleRefresh = async () => {
    try {
      const { data, error } = await supabase.functions.invoke('comprehensive-news-scraper', {
        body: { manual: true }
      });

      if (error) throw error;

      if (data?.success) {
        toast({
          title: "Content Refreshed",
          description: `Successfully fetched ${data.articlesInserted || 0} new articles`,
        });
        await refetch();
      } else {
        toast({
          title: "Refresh Failed", 
          description: data?.error || "Failed to refresh content",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Refresh error:', error);
      toast({
        title: "Refresh Error",
        description: "An error occurred while refreshing content",
        variant: "destructive",
      });
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case "hse updates": return "bg-red-500/20 text-red-400 border-red-500/30";
      case "bs7671 updates": return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      case "iet technical": return "bg-green-500/20 text-green-400 border-green-500/30";
      case "major projects": return "bg-purple-500/20 text-purple-400 border-purple-500/30";
      default: return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  const toggleBookmark = (articleId: string) => {
    setBookmarkedArticles(prev => {
      const newSet = new Set(prev);
      if (newSet.has(articleId)) {
        newSet.delete(articleId);
        toast({ title: "Bookmark removed" });
      } else {
        newSet.add(articleId);
        toast({ title: "Article bookmarked" });
      }
      return newSet;
    });
  };

  const handleLike = (articleId: string) => {
    setLikedArticles(prev => {
      const newSet = new Set(prev);
      if (!newSet.has(articleId)) {
        newSet.add(articleId);
        toast({ title: "Article liked!" });
      }
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
                         article.summary.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || article.category === selectedCategory;
    const matchesSource = selectedSource === "all" || article.source === selectedSource;
    
    return matchesSearch && matchesCategory && matchesSource;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Enhanced Industry News</h2>
          <p className="text-muted-foreground">Interactive industry news with filtering, ratings, and bookmarking</p>
        </div>
        <div className="flex gap-2">
          <Button 
            onClick={handleRefresh}
            variant="outline"
            className="border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow/10"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button className="bg-elec-yellow text-black hover:bg-elec-yellow/90">
            <Newspaper className="h-4 w-4 mr-2" />
            Subscribe to News
          </Button>
        </div>
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
                <SelectItem value="HSE">HSE Updates</SelectItem>
                <SelectItem value="BS7671">BS7671 Updates</SelectItem>
                <SelectItem value="IET">IET Updates</SelectItem>
                <SelectItem value="Major Projects">Major Projects</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedSource} onValueChange={setSelectedSource}>
              <SelectTrigger className="bg-elec-dark/50 border-elec-yellow/30">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by source" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Sources</SelectItem>
                <SelectItem value="HSE Press Releases">HSE Press Releases</SelectItem>
                <SelectItem value="BS7671 Wiring Regulations">BS7671 Wiring Regulations</SelectItem>
                <SelectItem value="IET Technical News">IET Technical News</SelectItem>
                <SelectItem value="Construction News Projects">Construction News Projects</SelectItem>
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
                    <span className="text-sm text-muted-foreground">by {article.source}</span>
                    <div className="flex items-center gap-1">
                      {renderStars(article.rating)}
                      <span className="text-xs text-muted-foreground ml-1">({article.rating})</span>
                    </div>
                  </div>
                  <CardTitle className="text-white text-lg mb-2">
                    {article.title}
                  </CardTitle>
                  <p className="text-gray-300 text-sm">
                    {article.summary}
                  </p>
                </div>
                <Button 
                  size="sm" 
                  variant="ghost" 
                  onClick={() => toggleBookmark(article.id)}
                  className={article.bookmarked ? "text-elec-yellow" : "text-gray-400"}
                >
                  <Bookmark className={`h-4 w-4 ${article.bookmarked ? "fill-current" : ""}`} />
                </Button>
              </div>
            </CardHeader>

            <CardContent className="pt-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{format(new Date(article.datePublished), 'dd MMM yyyy')}</span>
                  </div>
                  <span>{article.readTime} read</span>
                  <div className="flex items-center gap-1">
                    <Eye className="h-4 w-4" />
                    <span>{article.views}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageSquare className="h-4 w-4" />
                    <span>{article.comments}</span>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleLike(article.id)}
                    className="flex items-center gap-1 text-muted-foreground hover:text-elec-yellow p-0 h-auto"
                  >
                    <ThumbsUp className="h-4 w-4" />
                    <span>{article.likes}</span>
                  </Button>
                </div>
                <Button 
                  size="sm" 
                  className="bg-elec-yellow text-black hover:bg-elec-yellow/90"
                  onClick={() => (article.external_url || article.source_url) && window.open(article.external_url || article.source_url, '_blank')}
                  title={article.external_url ? 
                    "Read the full article" : 
                    "Visit the source website"}
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  {article.external_url ? 
                    "Read Article" : 
                    "View Source"}
                </Button>
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
