import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { classifyJobText, countJobTypes, isPartialPaymentTitle } from '../lib/jobTaxonomy';

export interface PricingBenchmarkRow {
  job_type: string;
  scope: 'national' | 'regional';
  region: string;
  /** Quotes for the job on its own (items span a single job type). */
  sample_size: number;
  /** Distinct electricians behind the figure. */
  contributors: number;
  median_price: number;
  p25_price: number;
  p75_price: number;
  win_rate: number | null;
  decided_count: number;
  /** Quotes of this type bundled with other work — context, not the headline. */
  bundled_count: number;
  bundled_median: number | null;
  /** Price distribution (8 buckets, P5–P95) — only for types with 50+ solo quotes. */
  histogram: { lo: number; hi: number; n: number }[] | null;
  latest_activity: string;
}

export interface ItemBenchmarkRow {
  item: string;
  kind: 'fitted' | 'materials';
  sample_size: number;
  contributors: number;
  median_price: number;
  p25_price: number;
  p75_price: number;
}

export function useLivePricingItemBenchmarks() {
  return useQuery({
    queryKey: ['live-pricing-item-benchmarks'],
    queryFn: async (): Promise<ItemBenchmarkRow[]> => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any -- RPC not in generated types yet
      const { data, error } = await (supabase as any).rpc('get_live_pricing_item_benchmarks');
      if (error) throw error;
      return (data ?? []) as ItemBenchmarkRow[];
    },
    staleTime: 5 * 60 * 1000,
  });
}

export interface LivePricingInsights {
  totals: {
    quotes: number;
    electricians: number;
    total_value: number;
    quotes_90d: number;
    won: number;
    decided: number;
  };
  labour_rate: { n: number; median: number | null; p25: number | null; p75: number | null };
  /** Win rate by price position vs the type median — null until every bucket has n>=30. */
  pricing_power: { bucket: string; n: number; win_rate: number }[] | null;
  top_job_types: { job_type: string; n: number; median: number; win_rate: number | null }[];
  monthly_trend: { month: string; n: number; median: number }[];
  region_coverage: { region: string; n: number }[];
  generated_at: string;
}

export function useLivePricingBenchmarks() {
  return useQuery({
    queryKey: ['live-pricing-benchmarks'],
    queryFn: async (): Promise<PricingBenchmarkRow[]> => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any -- RPC not in generated types yet
      const { data, error } = await (supabase as any).rpc('get_live_pricing_benchmarks');
      if (error) throw error;
      return (data ?? []) as PricingBenchmarkRow[];
    },
    staleTime: 5 * 60 * 1000,
  });
}

export function useLivePricingInsights() {
  return useQuery({
    queryKey: ['live-pricing-insights'],
    queryFn: async (): Promise<LivePricingInsights> => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any -- RPC not in generated types yet
      const { data, error } = await (supabase as any).rpc('get_live_pricing_insights');
      if (error) throw error;
      return data as LivePricingInsights;
    },
    staleTime: 5 * 60 * 1000,
  });
}

export interface MyJobTypeStat {
  jobType: string;
  count: number;
  medianPrice: number;
}

export interface MyPricingStats {
  quoteCount: number;
  jobTypes: MyJobTypeStat[];
}

function median(values: number[]): number {
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
}

/** The signed-in user's own quotes, classified with the shared taxonomy (RLS-scoped). */
export function useMyPricingStats() {
  return useQuery({
    queryKey: ['live-pricing-my-stats'],
    queryFn: async (): Promise<MyPricingStats> => {
      const { data, error } = await supabase
        .from('quotes')
        .select('total, job_details, items')
        .is('deleted_at', null)
        .gte('total', 20)
        .lte('total', 50000)
        .limit(500);
      if (error) throw error;

      const byType = new Map<string, number[]>();
      for (const quote of data ?? []) {
        const details = (quote.job_details ?? {}) as { title?: string; description?: string };
        if (isPartialPaymentTitle(details.title)) continue;
        const items = Array.isArray(quote.items) ? (quote.items as { description?: string }[]) : [];
        // Solo-job quotes only, so personal medians compare like-for-like with
        // the benchmark headline figures (which exclude bundled quotes).
        if (countJobTypes(items.map((i) => i.description)) >= 2) continue;
        const text = [details.title, details.description, ...items.map((i) => i.description)]
          .filter(Boolean)
          .join(' ');
        const jobType = classifyJobText(text);
        const prices = byType.get(jobType) ?? [];
        prices.push(Number(quote.total));
        byType.set(jobType, prices);
      }

      const jobTypes: MyJobTypeStat[] = [...byType.entries()]
        .map(([jobType, prices]) => ({
          jobType,
          count: prices.length,
          medianPrice: Math.round(median(prices)),
        }))
        .sort((a, b) => b.count - a.count);

      return {
        quoteCount: (data ?? []).length,
        jobTypes,
      };
    },
    staleTime: 5 * 60 * 1000,
  });
}
