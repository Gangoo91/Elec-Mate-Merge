import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface NewsArticle {
  id: string;
  title: string;
  summary: string;
  content: string;
  category: string;
  source_name: string;
  date_published: string;
  /** Fresh scrapes populate this; legacy rows may leave it null */
  published_date?: string | null;
  regulatory_body: string;
  view_count?: number;
  average_rating?: number;
  created_at: string;
  updated_at: string;
  external_url?: string;
  /** VPS scraper writes article URL here (legacy rows used external_url) */
  source_url?: string;
  image_url?: string;
}

const fetchIndustryNews = async (): Promise<NewsArticle[]> => {
  // Sort priority (scraper populates published_date on newly ingested rows;
  // older legacy rows only have date_published set):
  //   1. published_date DESC — fresh scraped articles bubble to top
  //   2. date_published DESC — older rows fall back to their own date
  //   3. created_at DESC — final tiebreak on ingest time
  // Limit raised to 2500 so the DB's 1750+ active rows all come back
  // (Supabase's default PostgREST cap is 1000 which was silently clipping
  // the feed at 1000 articles).
  const { data, error } = await supabase
    .from('industry_news')
    .select('*')
    .eq('is_active', true)
    .order('published_date', { ascending: false, nullsFirst: false })
    .order('date_published', { ascending: false, nullsFirst: false })
    .order('created_at', { ascending: false })
    .limit(2500);

  if (error) {
    throw new Error(error.message || 'Failed to fetch news data');
  }

  return data || [];
};

export const useIndustryNews = () => {
  const queryClient = useQueryClient();
  const [isTriggeringScrape, setIsTriggeringScrape] = useState(false);
  const [refreshSuccess, setRefreshSuccess] = useState(false);
  const [refreshError, setRefreshError] = useState<string | null>(null);

  const query = useQuery({
    queryKey: ['industry-news'],
    queryFn: fetchIndustryNews,
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
    retry: 2,
  });

  /**
   * Re-pull the latest articles from the database.
   *
   * The actual scraper runs on the VPS (crawl4ai) on a daily cron — there is
   * no Supabase edge function to trigger it. Refresh here just re-queries
   * the DB so any rows the scraper has ingested since the last fetch land
   * in the UI immediately.
   */
  const refresh = async () => {
    setRefreshSuccess(false);
    setRefreshError(null);
    setIsTriggeringScrape(true);

    try {
      await queryClient.refetchQueries({
        queryKey: ['industry-news'],
        type: 'active',
      });
      setRefreshSuccess(true);
    } catch (e) {
      setRefreshError((e as Error).message);
    } finally {
      setIsTriggeringScrape(false);
    }
  };

  return {
    ...query,
    refresh,
    isRefreshing: query.isFetching || isTriggeringScrape,
    refreshSuccess,
    refreshError,
  };
};
