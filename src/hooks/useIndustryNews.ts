import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface NewsArticle {
  id: string;
  title: string;
  summary: string;
  content: string;
  category: string;
  source_name: string;
  date_published: string;
  regulatory_body: string;
  view_count?: number;
  average_rating?: number;
  created_at: string;
  updated_at: string;
  external_url?: string;
}

const fetchIndustryNews = async (): Promise<NewsArticle[]> => {
  console.log('🔧 Fetching industry news from database...');
  
  const { data, error } = await supabase
    .from('industry_news')
    .select('*')
    .eq('is_active', true)
    .order('date_published', { ascending: false });
  
  if (error) {
    console.error('❌ Error fetching news:', error);
    throw new Error(error.message || 'Failed to fetch news data');
  }

  console.log(`✅ Successfully fetched ${data?.length || 0} news articles`);
  return data || [];
};

const refreshNewsFromFirecrawl = async (): Promise<{ success: boolean; message: string; articlesInserted: number }> => {
  console.log('🔄 Refreshing news from Firecrawl...');
  
  const { data, error } = await supabase.functions.invoke('firecrawl-news-scraper', {
    body: { action: 'refresh' }
  });
  
  if (error) {
    console.error('❌ Error refreshing news:', error);
    throw new Error(error.message || 'Failed to refresh news');
  }
  
  console.log('✅ News refresh completed:', data);
  return data;
};

export const useIndustryNews = () => {
  const queryClient = useQueryClient();
  
  const query = useQuery({
    queryKey: ['industry-news'],
    queryFn: fetchIndustryNews,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
    retry: 2,
  });
  
  const refreshMutation = useMutation({
    mutationFn: refreshNewsFromFirecrawl,
    onSuccess: (data) => {
      // Invalidate and refetch news data after successful refresh
      queryClient.invalidateQueries({ queryKey: ['industry-news'] });
      console.log(`🎉 Refresh completed: ${data.articlesInserted} new articles added`);
    },
    onError: (error) => {
      console.error('❌ Refresh failed:', error);
    }
  });
  
  console.log('🔍 useIndustryNews hook state:', {
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    dataLength: query.data?.length,
    status: query.status,
    fetchStatus: query.fetchStatus,
    isRefreshing: refreshMutation.isPending
  });
  
  return {
    ...query,
    refresh: refreshMutation.mutate,
    isRefreshing: refreshMutation.isPending,
    refreshError: refreshMutation.error,
    refreshSuccess: refreshMutation.isSuccess
  };
};