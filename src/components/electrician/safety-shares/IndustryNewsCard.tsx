import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Clock, ExternalLink, Eye, MessageSquare, Bookmark, Search, Filter, TrendingUp, BookmarkCheck, RefreshCw } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

interface NewsArticle {
  id: string;
  title: string;
  summary: string;
  content: string;
  category: string;
  source: string;
  date_published: string;
  view_count: number;
  average_rating: number;
  priority?: 'high' | 'medium' | 'low';
  source_url: string;
  tags?: string[];
}

const IndustryNewsCard = () => {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [bookmarkedArticles, setBookmarkedArticles] = useState<Set<string>>(new Set());
  const { toast } = useToast();

  const fetchArticles = async () => {
    try {
      const { data, error } = await supabase
        .from('industry_news')
        .select('*')
        .eq('is_active', true)
        .order('date_published', { ascending: false })
        .limit(20);

      if (error) throw error;
      
      // Map the database fields to our interface
      const mappedArticles = (data || []).map((item: any) => ({
        id: item.id,
        title: item.title,
        summary: item.summary,
        content: item.content,
        category: item.category,
        source: item.source || item.regulatory_body || 'Unknown',
        source_url: item.source_url || '#',
        date_published: item.date_published,
        view_count: item.view_count || 0,
        average_rating: Number(item.average_rating) || 0,
        priority: (item.priority as 'high' | 'medium' | 'low') || 'medium',
        tags: item.tags || []
      }));
      
      setArticles(mappedArticles);
    } catch (error) {
      console.error('Error fetching articles:', error);
      toast({
        title: "Error",
        description: "Failed to load industry news. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const refreshNews = async () => {
    setRefreshing(true);
    try {
      // Call the edge function to fetch new news
      const { error } = await supabase.functions.invoke('fetch-industry-news');
      if (error) throw error;
      
      // Refetch articles after successful update
      await fetchArticles();
      toast({
        title: "Success",
        description: "Industry news updated successfully!",
      });
    } catch (error) {
      console.error('Error refreshing news:', error);
      toast({
        title: "Error", 
        description: "Failed to refresh news. Please try again.",
        variant: "destructive",
      });
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const categories = ["all", ...Array.from(new Set(articles.map(article => article.category)))];

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.summary.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleBookmark = (articleId: string) => {
    const newBookmarks = new Set(bookmarkedArticles);
    if (newBookmarks.has(articleId)) {
      newBookmarks.delete(articleId);
    } else {
      newBookmarks.add(articleId);
    }
    setBookmarkedArticles(newBookmarks);
  };

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case "regulations": return "bg-red-500/20 text-red-400 border-red-500/30";
      case "government policy": return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      case "safety updates": return "bg-orange-500/20 text-orange-400 border-orange-500/30";
      case "industry updates": return "bg-green-500/20 text-green-400 border-green-500/30";
      case "technology": return "bg-purple-500/20 text-purple-400 border-purple-500/30";
      case "guidance": return "bg-cyan-500/20 text-cyan-400 border-cyan-500/30";
      case "training": return "bg-pink-500/20 text-pink-400 border-pink-500/30";
      default: return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  const getPriorityColor = (priority?: string) => {
    switch (priority) {
      case 'high': return 'border-l-red-500';
      case 'medium': return 'border-l-elec-yellow';
      case 'low': return 'border-l-green-500';
      default: return 'border-l-transparent';
    }
  };

  const isTrending = (article: NewsArticle) => {
    // Consider trending if published in last 3 days and has high views or high priority
    const threeDaysAgo = new Date();
    threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);
    const publishDate = new Date(article.date_published);
    
    return publishDate > threeDaysAgo && (article.view_count > 1000 || article.priority === 'high');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <Loader2 className="h-8 w-8 animate-spin text-elec-yellow" />
        <span className="ml-2 text-muted-foreground">Loading industry news...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Search and Filter Controls */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <Button 
            onClick={refreshNews}
            disabled={refreshing}
            className="bg-elec-yellow text-black hover:bg-elec-yellow/90 self-start sm:self-auto"
          >
            {refreshing ? (
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <RefreshCw className="h-4 w-4 mr-2" />
            )}
            {refreshing ? 'Refreshing...' : 'Refresh News'}
          </Button>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-elec-gray border-elec-yellow/20 text-white placeholder:text-muted-foreground"
            />
          </div>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full sm:w-48 bg-elec-gray border-elec-yellow/20 text-white">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent className="bg-elec-gray border-elec-yellow/20">
              {categories.map((category) => (
                <SelectItem key={category} value={category} className="text-white">
                  {category === "all" ? "All Categories" : category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Results Count */}
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>{filteredArticles.length} article{filteredArticles.length !== 1 ? 's' : ''} found</span>
        </div>
      </div>

      {/* Articles Grid */}
      <div className="grid gap-6">
        {filteredArticles.map((article) => (
          <Card 
            key={article.id} 
            className={`border-elec-yellow/20 bg-elec-gray border-l-4 ${getPriorityColor(article.priority)} hover:border-elec-yellow/40 transition-colors`}
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-3 flex-wrap">
                    <Badge className={getCategoryColor(article.category)}>
                      {article.category}
                    </Badge>
                    {isTrending(article) && (
                      <Badge variant="secondary" className="bg-elec-yellow/20 text-elec-yellow border-elec-yellow/30">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        Trending
                      </Badge>
                    )}
                    <span className="text-sm text-muted-foreground">by {article.source}</span>
                  </div>
                  <CardTitle className="text-white text-lg mb-2 leading-tight">
                    {article.title}
                  </CardTitle>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {article.summary}
                  </p>
                </div>
                <Button 
                  size="sm" 
                  variant="ghost" 
                  onClick={() => toggleBookmark(article.id)}
                  className={`shrink-0 ${bookmarkedArticles.has(article.id) ? 'text-elec-yellow' : 'text-muted-foreground'} hover:text-elec-yellow`}
                >
                  {bookmarkedArticles.has(article.id) ? (
                    <BookmarkCheck className="h-4 w-4" />
                  ) : (
                    <Bookmark className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </CardHeader>

            <CardContent className="pt-0">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-center gap-4 text-sm text-muted-foreground flex-wrap">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{new Date(article.date_published).toLocaleDateString('en-GB')}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Eye className="h-4 w-4" />
                    <span>{article.view_count.toLocaleString()}</span>
                  </div>
                  {article.average_rating > 0 && (
                    <div className="flex items-center gap-1">
                      <span>★ {article.average_rating.toFixed(1)}</span>
                    </div>
                  )}
                </div>
                <Button 
                  size="sm" 
                  className="bg-elec-yellow text-black hover:bg-elec-yellow/90 self-start sm:self-auto"
                  onClick={() => window.open(article.source_url, '_blank')}
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Read Article
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Load More */}
      {filteredArticles.length > 0 && filteredArticles.length >= 20 && (
        <div className="text-center pt-4">
          <Button variant="outline" className="border-elec-yellow/30 text-white hover:bg-elec-yellow/10">
            Load More Articles
          </Button>
        </div>
      )}

      {/* No Results */}
      {filteredArticles.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 rounded-full bg-elec-yellow/10 flex items-center justify-center mx-auto mb-4">
            <Search className="h-8 w-8 text-elec-yellow" />
          </div>
          <p className="text-muted-foreground">No articles found matching your search criteria.</p>
          <Button 
            variant="ghost" 
            onClick={() => {
              setSearchTerm("");
              setSelectedCategory("all");
            }}
            className="mt-2 text-elec-yellow hover:bg-elec-yellow/10"
          >
            Clear filters
          </Button>
        </div>
      )}
    </div>
  );
};

export default IndustryNewsCard;