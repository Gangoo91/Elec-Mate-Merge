import { useQuery } from '@tanstack/react-query';
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

  console.log(`✅ Raw Supabase response:`, { data, dataLength: data?.length, error });
  console.log(`✅ First article sample:`, data?.[0]);
  
  if (!data || data.length === 0) {
    console.warn('⚠️ No articles returned from database');
    return [];
  }
  
  console.log(`✅ Successfully fetched ${data.length} news articles`);
  return data;
};

export const useIndustryNews = () => {
  const query = useQuery({
    queryKey: ['industry-news-debug'], // Changed key to force fresh query
    queryFn: fetchIndustryNews,
    staleTime: 0, // Force fresh data for debugging
    gcTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    retry: 1,
  });
  
  console.log('🔍 useIndustryNews hook state:', {
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    dataLength: query.data?.length,
    status: query.status,
    fetchStatus: query.fetchStatus
  });
  
  return query;
};