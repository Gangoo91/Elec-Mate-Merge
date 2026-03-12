import { useQuery, useQueryClient } from '@tanstack/react-query';
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
  image_url?: string;
}

const fetchIndustryNews = async (): Promise<NewsArticle[]> => {
  const { data, error } = await supabase
    .from('industry_news')
    .select('*')
    .eq('is_active', true)
    .order('date_published', { ascending: false });

  if (error) {
    throw new Error(error.message || 'Failed to fetch news data');
  }

  return data || [];
};

export const useIndustryNews = () => {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ['industry-news'],
    queryFn: fetchIndustryNews,
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
    retry: 2,
  });

  const refresh = () => {
    queryClient.invalidateQueries({ queryKey: ['industry-news'] });
  };

  return {
    ...query,
    refresh,
    isRefreshing: query.isFetching,
  };
};
