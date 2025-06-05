
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Newspaper, Star, Bookmark, Eye, ExternalLink } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

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
  is_bookmarked?: boolean;
  user_rating?: number;
}

const EnhancedIndustryNewsCard = () => {
  const [news, setNews] = useState<IndustryNews[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedNews, setSelectedNews] = useState<IndustryNews | null>(null);
  const [filter, setFilter] = useState<string>('all');

  useEffect(() => {
    fetchIndustryNews();
  }, []);

  const fetchIndustryNews = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      let query = supabase
        .from('industry_news')
        .select('*')
        .eq('is_active', true)
        .order('date_published', { ascending: false })
        .limit(15);

      const { data: newsData, error } = await query;

      if (error) throw error;

      if (user) {
        // Fetch user bookmarks and ratings
        const newsIds = newsData?.map(item => item.id) || [];
        
        const [bookmarksRes, ratingsRes] = await Promise.all([
          supabase
            .from('safety_bookmarks')
            .select('content_id')
            .eq('user_id', user.id)
            .eq('content_type', 'industry_news')
            .in('content_id', newsIds),
          supabase
            .from('safety_content_ratings')
            .select('content_id, rating')
            .eq('user_id', user.id)
            .eq('content_type', 'industry_news')
            .in('content_id', newsIds)
        ]);

        const bookmarks = new Set(bookmarksRes.data?.map(b => b.content_id) || []);
        const ratingsMap = new Map(ratingsRes.data?.map(r => [r.content_id, r.rating]) || []);

        const enrichedNews = newsData?.map(item => ({
          ...item,
          is_bookmarked: bookmarks.has(item.id),
          user_rating: ratingsMap.get(item.id)
        })) || [];

        setNews(enrichedNews);
      } else {
        setNews(newsData || []);
      }
    } catch (error) {
      console.error('Error fetching industry news:', error);
      toast.error('Failed to load industry news');
    } finally {
      setLoading(false);
    }
  };

  const trackView = async (newsId: string) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      await supabase
        .from('safety_content_views')
        .insert({
          user_id: user?.id || null,
          content_type: 'industry_news',
          content_id: newsId,
          session_id: Math.random().toString(36),
        });
    } catch (error) {
      console.error('Error tracking view:', error);
    }
  };

  const toggleBookmark = async (newsId: string) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast.error('Please sign in to bookmark content');
        return;
      }

      const newsItem = news.find(n => n.id === newsId);
      if (!newsItem) return;

      if (newsItem.is_bookmarked) {
        await supabase
          .from('safety_bookmarks')
          .delete()
          .eq('user_id', user.id)
          .eq('content_type', 'industry_news')
          .eq('content_id', newsId);
        
        toast.success('Bookmark removed');
      } else {
        await supabase
          .from('safety_bookmarks')
          .insert({
            user_id: user.id,
            content_type: 'industry_news',
            content_id: newsId
          });
        
        toast.success('Bookmarked successfully');
      }

      setNews(prev => prev.map(n => 
        n.id === newsId ? { ...n, is_bookmarked: !n.is_bookmarked } : n
      ));
    } catch (error) {
      console.error('Error toggling bookmark:', error);
      toast.error('Failed to update bookmark');
    }
  };

  const rateContent = async (newsId: string, rating: number) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast.error('Please sign in to rate content');
        return;
      }

      await supabase
        .from('safety_content_ratings')
        .upsert({
          user_id: user.id,
          content_type: 'industry_news',
          content_id: newsId,
          rating
        });

      setNews(prev => prev.map(n => 
        n.id === newsId ? { ...n, user_rating: rating } : n
      ));
      
      toast.success('Rating saved');
    } catch (error) {
      console.error('Error rating content:', error);
      toast.error('Failed to save rating');
    }
  };

  const regulatoryBodies = [...new Set(news.map(n => n.regulatory_body))];
  const filteredNews = filter === 'all' ? news : news.filter(n => n.regulatory_body === filter);

  const handleNewsClick = (newsItem: IndustryNews) => {
    setSelectedNews(newsItem);
    trackView(newsItem.id);
  };

  if (loading) {
    return (
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardContent className="p-6">
          <div className="animate-pulse space-y-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-24 bg-elec-yellow/10 rounded"></div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (selectedNews) {
    return (
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="border-elec-yellow/40 text-elec-yellow">
                {selectedNews.regulatory_body}
              </Badge>
              <Badge variant="outline" className="border-blue-400/40 text-blue-400">
                {selectedNews.category}
              </Badge>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSelectedNews(null)}
              className="border-elec-yellow/20 text-elec-yellow hover:bg-elec-yellow/10"
            >
              Back to List
            </Button>
          </div>
          <CardTitle className="text-xl text-white">{selectedNews.title}</CardTitle>
          <CardDescription className="text-gray-300">
            Published: {new Date(selectedNews.date_published).toLocaleDateString()}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4 text-sm text-gray-400">
            <div className="flex items-center gap-1">
              <Eye className="h-4 w-4" />
              {selectedNews.view_count} views
            </div>
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4" />
              {selectedNews.average_rating.toFixed(1)} average
            </div>
          </div>
          
          <div className="prose prose-invert max-w-none">
            <p className="text-gray-300 whitespace-pre-wrap">{selectedNews.content}</p>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-elec-yellow/20">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-400">Rate this article:</span>
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => rateContent(selectedNews.id, star)}
                  className={`p-1 rounded ${
                    (selectedNews.user_rating || 0) >= star
                      ? 'text-yellow-400'
                      : 'text-gray-600 hover:text-yellow-300'
                  }`}
                >
                  <Star className="h-4 w-4 fill-current" />
                </button>
              ))}
            </div>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => toggleBookmark(selectedNews.id)}
              className={`border-elec-yellow/20 ${
                selectedNews.is_bookmarked
                  ? 'bg-elec-yellow/20 text-elec-yellow'
                  : 'text-elec-yellow hover:bg-elec-yellow/10'
              }`}
            >
              <Bookmark className={`h-4 w-4 mr-2 ${selectedNews.is_bookmarked ? 'fill-current' : ''}`} />
              {selectedNews.is_bookmarked ? 'Bookmarked' : 'Bookmark'}
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-elec-yellow flex items-center justify-center">
            <Newspaper className="h-6 w-6 text-elec-dark" />
          </div>
          <div>
            <CardTitle className="text-xl text-white">Industry News & Updates</CardTitle>
            <CardDescription className="text-gray-300">
              Latest regulatory updates and industry developments
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {regulatoryBodies.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            <Button
              variant={filter === 'all' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter('all')}
              className="text-xs"
            >
              All Sources
            </Button>
            {regulatoryBodies.map((body) => (
              <Button
                key={body}
                variant={filter === body ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilter(body)}
                className="text-xs"
              >
                {body}
              </Button>
            ))}
          </div>
        )}

        {filteredNews.length === 0 ? (
          <div className="text-center py-8 text-gray-400">
            <Newspaper className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No industry news available at the moment.</p>
          </div>
        ) : (
          filteredNews.map((newsItem) => (
            <div
              key={newsItem.id}
              className="p-4 rounded-lg border border-elec-yellow/20 bg-elec-dark/50 hover:bg-elec-dark/70 cursor-pointer transition-all"
              onClick={() => handleNewsClick(newsItem)}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="border-elec-yellow/40 text-elec-yellow text-xs">
                    {newsItem.regulatory_body}
                  </Badge>
                  <Badge variant="outline" className="border-blue-400/40 text-blue-400 text-xs">
                    {newsItem.category}
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  {newsItem.is_bookmarked && (
                    <Bookmark className="h-4 w-4 text-elec-yellow fill-current" />
                  )}
                  <div className="flex items-center gap-1 text-xs text-gray-400">
                    <Eye className="h-3 w-3" />
                    {newsItem.view_count}
                  </div>
                </div>
              </div>
              
              <h3 className="font-semibold text-white mb-2">{newsItem.title}</h3>
              <p className="text-sm text-gray-400 mb-2 line-clamp-2">{newsItem.summary}</p>
              
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>{new Date(newsItem.date_published).toLocaleDateString()}</span>
                <div className="flex items-center gap-1">
                  <Star className="h-3 w-3" />
                  {newsItem.average_rating.toFixed(1)}
                </div>
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
};

export default EnhancedIndustryNewsCard;
