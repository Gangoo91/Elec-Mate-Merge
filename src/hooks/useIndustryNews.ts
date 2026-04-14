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
   * Force a real refresh:
   *   1. Fire the daily-news-update edge function (fire-and-forget — it may
   *      take 30–60s to finish scraping).
   *   2. Immediately refetch the DB to pull any rows already ingested by the
   *      last cron run.
   *   3. After a short delay, refetch again to pick up rows that arrive while
   *      the scraper is still running.
   */
  const refresh = async () => {
    setRefreshSuccess(false);
    setRefreshError(null);
    setIsTriggeringScrape(true);

    // Fire the scraper trigger — don't await the body, just kick it off.
    // If the function is missing/404s we swallow the error and still refetch.
    supabase.functions
      .invoke('daily-news-update', { body: { source: 'manual_refresh' } })
      .catch((e) => {
        console.warn('daily-news-update trigger failed (non-fatal)', e);
      });

    try {
      // Immediate refetch
      await queryClient.refetchQueries({
        queryKey: ['industry-news'],
        type: 'active',
      });
      setRefreshSuccess(true);

      // Second refetch after 8s to capture rows the scraper writes
      // during the user's current visit.
      setTimeout(() => {
        queryClient.invalidateQueries({ queryKey: ['industry-news'] });
      }, 8000);
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
