import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface NewsArticle {
  id?: string;
  title: string;
  url?: string;
  source_url?: string;
  snippet?: string;
  summary?: string;
  content?: string;
  date: string;
  date_published?: string;
  tag?: string;
  category?: string;
  image?: string;
  thumbnail?: string;
  imageUrl?: string;
  img?: string;
  view_count?: number;
  average_rating?: number;
  source_type?: string;
  source_name?: string;
}

const fetchNewsData = async (): Promise<NewsArticle[]> => {
  console.log('🔧 Fetching live news data via React Query...');
  
  const { data, error } = await supabase.functions.invoke('comprehensive-news-scraper', {
    body: { live: true }
  });
  
  if (error) {
    console.error('❌ Error fetching news:', error);
    throw new Error(error.message || 'Failed to fetch news data');
  }

  if (Array.isArray(data?.articles) && data.articles.length > 0) {
    // Transform the data to ensure consistent interface and add IDs
    const transformedNews = data.articles.map((article: any, index: number) => ({
      id: article.id || `${article.url || article.source_url || article.title}-${index}`,
      title: article.title || 'Untitled Article',
      url: article.url || article.source_url,
      source_url: article.source_url || article.url,
      snippet: article.snippet || article.summary,
      summary: article.summary || article.snippet,
      content: article.content,
      date: article.date || article.date_published || new Date().toISOString(),
      date_published: article.date_published || article.date || new Date().toISOString(),
      tag: article.tag || article.category,
      category: article.category || article.tag,
      image: article.image || article.thumbnail || article.imageUrl || article.img,
      thumbnail: article.thumbnail || article.image,
      imageUrl: article.imageUrl || article.image,
      img: article.img || article.image,
      view_count: article.view_count || 0,
      average_rating: article.average_rating || 0,
      source_type: article.source_type,
      source_name: article.source_name
    }));

    console.log(`✅ Transformed ${transformedNews.length} news articles`);
    return transformedNews;
  }

  console.log('📊 No news data received');
  return [];
};

export const useNewsData = () => {
  return useQuery({
    queryKey: ['industry-news', 'live'],
    queryFn: fetchNewsData,
    staleTime: 5 * 60 * 1000, // 5 minutes - news doesn't change frequently
    gcTime: 30 * 60 * 1000, // 30 minutes - keep cached for offline capability
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    refetchInterval: 10 * 60 * 1000, // Auto-refresh every 10 minutes
  });
};

export const useRefreshNews = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: fetchNewsData,
    onSuccess: (data) => {
      // Update the cache with fresh data
      queryClient.setQueryData(['industry-news', 'live'], data);
      console.log('✅ News data refreshed manually');
    },
    onError: (error) => {
      console.error('❌ Failed to refresh news:', error);
    },
  });
};