
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Newspaper, Clock, ExternalLink, Eye, MessageSquare, Bookmark, Search, Filter, Star, ThumbsUp, RefreshCcw, Calendar, Link, Globe } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface NewsArticle {
  id: string;
  title: string;
  summary: string;
  content: string;
  category: string;
  regulatory_body: string;
  date_published: string;
  external_url: string | null;
  source_url: string | null;
  view_count: number;
  average_rating: number;
  is_active: boolean;
}

const EnhancedIndustryNewsCard = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedSource, setSelectedSource] = useState("all");
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const { data, error } = await supabase
        .from('industry_news')
        .select('*')
        .eq('is_active', true)
        .order('date_published', { ascending: false })
        .limit(20);

      if (error) {
        console.error('Error fetching articles:', error);
        toast.error('Failed to fetch articles');
        return;
      }

      setArticles(data || []);
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to fetch articles');
    } finally {
      setIsLoading(false);
    }
  };

  const refreshNews = async () => {
    setIsRefreshing(true);
    try {
      // Call the edge function to fetch fresh news
      const { data, error } = await supabase.functions.invoke('fetch-industry-news');
      
      if (error) {
        console.error('Error refreshing news:', error);
        toast.error('Failed to refresh news');
        return;
      }

      toast.success(`Refreshed! Found ${data.inserted} new articles`);
      
      // Refresh the local data
      await fetchArticles();
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to refresh news');
    } finally {
      setIsRefreshing(false);
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case "hse": return "bg-red-500/20 text-red-400 border-red-500/30";
      case "bs7671": return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      case "iet": return "bg-green-500/20 text-green-400 border-green-500/30";
      case "major projects": return "bg-purple-500/20 text-purple-400 border-purple-500/30";
      default: return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  const handleViewArticle = async (article: NewsArticle) => {
    // Track view count
    try {
      await supabase
        .from('safety_content_views')
        .insert({
          content_type: 'industry_news',
          content_id: article.id,
          user_id: null, // Can be null for anonymous views
        });
    } catch (error) {
      console.error('Error tracking view:', error);
    }

    // Open external link if available
    if (article.external_url) {
      window.open(article.external_url, '_blank');
    } else if (article.source_url) {
      window.open(article.source_url, '_blank');
    }
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
    const matchesCategory = selectedCategory === "all" || article.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesSource = selectedSource === "all" || article.regulatory_body === selectedSource;
    
    return matchesSearch && matchesCategory && matchesSource;
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-elec-yellow mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading industry news...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white">Industry News & Major Projects</h2>
            <p className="text-muted-foreground">Latest electrical industry news with real-time updates from major sources</p>
          </div>
          <div className="flex gap-2">
            <Button 
              onClick={refreshNews}
              disabled={isRefreshing}
              variant="outline"
              className="border-elec-yellow/30 text-white hover:bg-elec-yellow/10"
            >
              <RefreshCcw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
              {isRefreshing ? 'Refreshing...' : 'Refresh News'}
            </Button>
            <Button className="bg-elec-yellow text-black hover:bg-elec-yellow/90">
              <Newspaper className="h-4 w-4 mr-2" />
              Subscribe to News
            </Button>
          </div>
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
                <SelectItem value="HSE">HSE Safety</SelectItem>
                <SelectItem value="BS7671">BS 7671 Updates</SelectItem>
                <SelectItem value="IET">IET News</SelectItem>
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
                <SelectItem value="HSE">HSE</SelectItem>
                <SelectItem value="BEIS">Government (BEIS)</SelectItem>
                <SelectItem value="IET">Institution of Engineering and Technology</SelectItem>
                <SelectItem value="Industry">Industry Sources</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

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
                      {renderStars(article.average_rating)}
                      <span className="text-xs text-muted-foreground ml-1">({article.average_rating.toFixed(1)})</span>
                    </div>
                    {article.external_url && (
                      <div className="flex items-center gap-1 text-xs text-elec-yellow">
                        <Globe className="h-3 w-3" />
                        <span>External Link</span>
                      </div>
                    )}
                  </div>
                  <CardTitle className="text-white text-lg mb-2">
                    {article.title}
                  </CardTitle>
                  <p className="text-gray-300 text-sm mb-3">
                    {article.summary}
                  </p>
                  {article.content && article.content.length > 200 && (
                    <p className="text-gray-400 text-xs line-clamp-2">
                      {article.content.substring(0, 200)}...
                    </p>
                  )}
                </div>
                <div className="flex flex-col gap-2">
                  {(article.external_url || article.source_url) && (
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      className="text-elec-yellow hover:bg-elec-yellow/10"
                      onClick={() => handleViewArticle(article)}
                    >
                      <Link className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            </CardHeader>

            <CardContent className="pt-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>{new Date(article.date_published).toLocaleDateString('en-GB')}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Eye className="h-4 w-4" />
                    <span>{article.view_count}</span>
                  </div>
                  {article.source_url && (
                    <div className="flex items-center gap-1 text-xs">
                      <Globe className="h-3 w-3" />
                      <span>Source</span>
                    </div>
                  )}
                </div>
                <div className="flex gap-2">
                  {article.source_url && (
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => window.open(article.source_url!, '_blank')}
                      className="border-elec-yellow/30 text-white hover:bg-elec-yellow/10"
                    >
                      <Globe className="h-4 w-4 mr-2" />
                      Source
                    </Button>
                  )}
                  <Button 
                    size="sm" 
                    className="bg-elec-yellow text-black hover:bg-elec-yellow/90"
                    onClick={() => handleViewArticle(article)}
                    disabled={!article.external_url && !article.source_url}
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    {article.external_url ? 'Read Article' : 'View Source'}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredArticles.length === 0 && !isLoading && (
        <div className="text-center py-8 text-muted-foreground">
          <Newspaper className="h-12 w-12 mx-auto mb-4 text-gray-600" />
          <p className="text-lg mb-2">No articles found</p>
          <p className="text-sm">Try adjusting your search criteria or refresh for new content.</p>
        </div>
      )}

      {filteredArticles.length > 0 && (
        <div className="text-center pt-4">
          <Button 
            variant="outline" 
            className="border-elec-yellow/30 text-white hover:bg-elec-yellow/10"
            onClick={fetchArticles}
          >
            Load More Articles
          </Button>
        </div>
      )}
    </div>
  );
};

export default EnhancedIndustryNewsCard;
