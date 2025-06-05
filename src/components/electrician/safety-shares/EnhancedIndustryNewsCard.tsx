
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Newspaper, Clock, Filter, Search, X, Star, Bookmark, Eye } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

interface IndustryNews {
  id: string;
  title: string;
  summary: string;
  content: string;
  regulatory_body: string;
  category: string;
  date_published: string;
  view_count: number;
  average_rating: number;
}

interface BookmarkStatus {
  [key: string]: boolean;
}

interface UserRating {
  [key: string]: number;
}

const EnhancedIndustryNewsCard = () => {
  const [news, setNews] = useState<IndustryNews[]>([]);
  const [filteredNews, setFilteredNews] = useState<IndustryNews[]>([]);
  const [selectedNews, setSelectedNews] = useState<IndustryNews | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [regulatoryFilter, setRegulatoryFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [bookmarks, setBookmarks] = useState<BookmarkStatus>({});
  const [userRatings, setUserRatings] = useState<UserRating>({});
  const { toast } = useToast();

  useEffect(() => {
    console.log('EnhancedIndustryNewsCard: Component mounted, fetching news...');
    fetchNews();
  }, []);

  useEffect(() => {
    console.log('EnhancedIndustryNewsCard: Filtering news with:', { searchTerm, regulatoryFilter, categoryFilter });
    filterNews();
  }, [news, searchTerm, regulatoryFilter, categoryFilter]);

  const fetchNews = async () => {
    try {
      console.log('EnhancedIndustryNewsCard: Starting to fetch industry news...');
      setError(null);
      
      const { data, error: fetchError } = await supabase
        .from('industry_news')
        .select('*')
        .eq('is_active', true)
        .order('date_published', { ascending: false });

      console.log('EnhancedIndustryNewsCard: Supabase response:', { data, error: fetchError });

      if (fetchError) {
        console.error('EnhancedIndustryNewsCard: Error fetching industry news:', fetchError);
        setError(`Failed to fetch news: ${fetchError.message}`);
        return;
      }

      const newsData = data || [];
      console.log('EnhancedIndustryNewsCard: Fetched news:', newsData.length);
      setNews(newsData);
      
      if (newsData.length === 0) {
        console.log('EnhancedIndustryNewsCard: No news found in database');
        setError('No industry news found');
      }
    } catch (error) {
      console.error('EnhancedIndustryNewsCard: Exception during fetch:', error);
      setError(`Unexpected error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  const filterNews = () => {
    let filtered = news;

    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.summary.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (regulatoryFilter !== "all") {
      filtered = filtered.filter(item => item.regulatory_body === regulatoryFilter);
    }

    if (categoryFilter !== "all") {
      filtered = filtered.filter(item => item.category === categoryFilter);
    }

    console.log('EnhancedIndustryNewsCard: Filtered news:', filtered.length);
    setFilteredNews(filtered);
  };

  const handleBookmark = async (newsItem: IndustryNews) => {
    try {
      const isBookmarked = bookmarks[newsItem.id];
      
      if (isBookmarked) {
        await supabase
          .from('safety_bookmarks')
          .delete()
          .eq('content_id', newsItem.id)
          .eq('content_type', 'industry_news');
      } else {
        await supabase
          .from('safety_bookmarks')
          .insert({
            content_id: newsItem.id,
            content_type: 'industry_news',
            user_id: (await supabase.auth.getUser()).data.user?.id
          });
      }

      setBookmarks(prev => ({ ...prev, [newsItem.id]: !isBookmarked }));
      toast({
        title: isBookmarked ? "Bookmark removed" : "Bookmark added",
        description: `News "${newsItem.title}" ${isBookmarked ? 'removed from' : 'added to'} bookmarks`
      });
    } catch (error) {
      console.error('Error managing bookmark:', error);
      toast({
        title: "Error",
        description: "Failed to update bookmark",
        variant: "destructive"
      });
    }
  };

  const handleRating = async (newsItem: IndustryNews, rating: number) => {
    try {
      const user = (await supabase.auth.getUser()).data.user;
      if (!user) return;

      await supabase
        .from('safety_content_ratings')
        .upsert({
          content_id: newsItem.id,
          content_type: 'industry_news',
          user_id: user.id,
          rating
        });

      setUserRatings(prev => ({ ...prev, [newsItem.id]: rating }));
      toast({
        title: "Rating submitted",
        description: `You rated this news ${rating} stars`
      });
    } catch (error) {
      console.error('Error submitting rating:', error);
      toast({
        title: "Error",
        description: "Failed to submit rating",
        variant: "destructive"
      });
    }
  };

  const trackView = async (newsItem: IndustryNews) => {
    try {
      const user = (await supabase.auth.getUser()).data.user;
      await supabase
        .from('safety_content_views')
        .insert({
          content_id: newsItem.id,
          content_type: 'industry_news',
          user_id: user?.id,
          session_id: 'web-session'
        });
    } catch (error) {
      console.error('Error tracking view:', error);
    }
  };

  const getRegulatoryBodyColor = (body: string) => {
    switch (body.toLowerCase()) {
      case 'ofgem': return 'bg-blue-500 hover:bg-blue-600';
      case 'hse': return 'bg-red-500 hover:bg-red-600';
      case 'iee': return 'bg-purple-500 hover:bg-purple-600';
      case 'bsi': return 'bg-green-500 hover:bg-green-600';
      default: return 'bg-gray-500 hover:bg-gray-600';
    }
  };

  const getUniqueRegulatoryBodies = () => {
    return [...new Set(news.map(item => item.regulatory_body))];
  };

  const getUniqueCategories = () => {
    return [...new Set(news.map(item => item.category))];
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <Card className="border-elec-yellow/20 bg-elec-gray">
          <CardContent className="p-6">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-elec-yellow mx-auto mb-4"></div>
              <p className="text-gray-300">Loading industry news...</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <Card className="border-red-500/20 bg-elec-gray">
          <CardContent className="p-6">
            <div className="text-center">
              <Newspaper className="h-12 w-12 text-red-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-red-400 mb-2">Error Loading News</h3>
              <p className="text-gray-300 mb-4">{error}</p>
              <Button 
                onClick={fetchNews}
                className="bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90"
              >
                Try Again
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Filters Section */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Filter className="h-5 w-5 text-elec-yellow" />
            Filter News
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search news..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-elec-gray-light border-elec-yellow/30 text-white placeholder-gray-400"
              />
            </div>
            
            <Select value={regulatoryFilter} onValueChange={setRegulatoryFilter}>
              <SelectTrigger className="bg-elec-gray-light border-elec-yellow/30 text-white">
                <SelectValue placeholder="Filter by regulatory body" />
              </SelectTrigger>
              <SelectContent className="bg-elec-gray border-elec-yellow/30">
                <SelectItem value="all" className="text-white hover:bg-elec-gray-light">All Bodies</SelectItem>
                {getUniqueRegulatoryBodies().map(body => (
                  <SelectItem key={body} value={body} className="text-white hover:bg-elec-gray-light">
                    {body}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="bg-elec-gray-light border-elec-yellow/30 text-white">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent className="bg-elec-gray border-elec-yellow/30">
                <SelectItem value="all" className="text-white hover:bg-elec-gray-light">All Categories</SelectItem>
                {getUniqueCategories().map(category => (
                  <SelectItem key={category} value={category} className="text-white hover:bg-elec-gray-light">
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {(searchTerm || regulatoryFilter !== "all" || categoryFilter !== "all") && (
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <span>Showing {filteredNews.length} of {news.length} articles</span>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => {
                  setSearchTerm("");
                  setRegulatoryFilter("all");
                  setCategoryFilter("all");
                }}
                className="h-6 px-2 text-gray-400 hover:text-white"
              >
                Clear filters
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* News List */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Newspaper className="h-5 w-5 text-blue-400" />
            Enhanced Industry News
            <Badge className="bg-elec-yellow/20 text-elec-yellow">
              {filteredNews.length}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {filteredNews.length === 0 ? (
            <div className="text-center py-8">
              <Newspaper className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-400">No news articles found matching your criteria.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredNews.map((item) => (
                <div
                  key={item.id}
                  className="p-4 bg-elec-gray-light/10 rounded-lg border border-elec-yellow/10 hover:border-elec-yellow/30 transition-all duration-300 cursor-pointer group"
                  onClick={() => {
                    setSelectedNews(item);
                    trackView(item);
                  }}
                >
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-white group-hover:text-elec-yellow transition-colors line-clamp-2 mb-2">
                        {item.title}
                      </h3>
                      <p className="text-sm text-gray-300 line-clamp-2 sm:line-clamp-3 mb-3">
                        {item.summary}
                      </p>
                      
                      <div className="flex flex-wrap items-center gap-2 mb-3">
                        <Badge className={`${getRegulatoryBodyColor(item.regulatory_body)} text-white text-xs`}>
                          {item.regulatory_body}
                        </Badge>
                        <span className="bg-elec-yellow/20 text-elec-yellow px-2 py-1 rounded text-xs">
                          {item.category}
                        </span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-xs text-gray-400">
                          <div className="flex items-center gap-1">
                            <Eye className="h-3 w-3" />
                            {item.view_count}
                          </div>
                          <div className="flex items-center gap-1">
                            <Star className="h-3 w-3" />
                            {item.average_rating.toFixed(1)}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {new Date(item.date_published).toLocaleDateString()}
                          </div>
                        </div>
                        
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleBookmark(item);
                          }}
                          className={`h-6 w-6 p-0 ${bookmarks[item.id] ? 'text-elec-yellow' : 'text-gray-400'} hover:text-elec-yellow`}
                        >
                          <Bookmark className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* News Detail Modal */}
      {selectedNews && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-elec-gray border border-elec-yellow/20 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
            <div className="p-6 border-b border-elec-yellow/10">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <h2 className="text-xl font-bold text-white mb-2">{selectedNews.title}</h2>
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <Badge className={`${getRegulatoryBodyColor(selectedNews.regulatory_body)} text-white`}>
                      {selectedNews.regulatory_body}
                    </Badge>
                    <span className="bg-elec-yellow/20 text-elec-yellow px-2 py-1 rounded text-sm">
                      {selectedNews.category}
                    </span>
                    <div className="flex items-center gap-1 text-sm text-gray-400">
                      <Clock className="h-4 w-4" />
                      {new Date(selectedNews.date_published).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleBookmark(selectedNews)}
                      className={`border-elec-yellow/30 ${bookmarks[selectedNews.id] ? 'text-elec-yellow bg-elec-yellow/10' : 'text-elec-yellow'} hover:bg-elec-yellow/10`}
                    >
                      <Bookmark className="h-4 w-4 mr-2" />
                      {bookmarks[selectedNews.id] ? 'Bookmarked' : 'Bookmark'}
                    </Button>
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((rating) => (
                        <Button
                          key={rating}
                          size="sm"
                          variant="ghost"
                          onClick={() => handleRating(selectedNews, rating)}
                          className={`h-6 w-6 p-0 ${userRatings[selectedNews.id] >= rating ? 'text-elec-yellow' : 'text-gray-400'} hover:text-elec-yellow`}
                        >
                          <Star className="h-3 w-3" />
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedNews(null)}
                  className="flex-shrink-0 hover:bg-elec-gray-light"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6">
              <div className="prose prose-invert max-w-none">
                <p className="text-gray-300 whitespace-pre-wrap leading-relaxed">
                  {selectedNews.content}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EnhancedIndustryNewsCard;
