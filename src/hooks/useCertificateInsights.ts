import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

/**
 * Anonymous aggregate statistics from issued certificates (ELE-1584 / 1587):
 * what EICRs find, and what installations measure. Rebuilt weekly by
 * `refresh_certificate_insights()`; every cell has at least five source
 * certificates behind it and nothing identifies a report, a user or an
 * address.
 *
 * For Elec-Mate's own use (Andrew, 4 Oct 2026) — read on Admin → Certificate
 * insights through the admin-asserting RPCs, never shown to users.
 */

export type InsightEarthing = 'TN-C-S' | 'TN-S' | 'TT' | 'ALL';
export type InsightMeasurement = 'ze' | 'zs' | 'r1r2' | 'ir' | 'rcd_1x' | 'pfc';
export type DefectCode = 'C1' | 'C2' | 'C3' | 'FI';

export interface ReadingSummary {
  measurement: InsightMeasurement;
  earthing: InsightEarthing;
  n: number;
  p10: number | null;
  p25: number | null;
  p50: number | null;
  p75: number | null;
  p90: number | null;
  lower_bound: number;
  upper_bound: number;
}

export interface ReadingBucket {
  measurement: InsightMeasurement;
  earthing: InsightEarthing;
  lo: number;
  hi: number | null;
  n: number;
}

export interface DefectCategory {
  code: DefectCode;
  category: string;
  observations: number;
  reports: number;
}

export interface RegulationCount {
  code: DefectCode;
  regulation: string;
  observations: number;
  reports: number;
}

export interface CertificateInsights {
  computed_at: string;
  reports: { eicr: number; eic: number };
  observations: number;
  readings: number;
  /** One row per code with DISTINCT certificates — a cert with two C2 categories counts once. */
  defects_by_code: { code: DefectCode; observations: number; reports: number }[];
  defect_categories: DefectCategory[];
  regulations: RegulationCount[];
  reading_summary: ReadingSummary[];
  reading_buckets: ReadingBucket[];
}

export const INSIGHTS_QUERY_KEY = ['certificate-insights'] as const;

export const MEASUREMENTS: Record<
  InsightMeasurement,
  { label: string; short: string; unit: string; dp: number; per: string }
> = {
  ze: { label: 'Ze at the origin', short: 'Ze', unit: 'Ω', dp: 2, per: 'one reading per certificate' },
  zs: { label: 'Zs per circuit', short: 'Zs', unit: 'Ω', dp: 2, per: 'one reading per circuit row' },
  r1r2: { label: 'R1 + R2', short: 'R1+R2', unit: 'Ω', dp: 2, per: 'one reading per circuit row' },
  ir: { label: 'Insulation resistance L–E', short: 'IR', unit: 'MΩ', dp: 0, per: 'one reading per circuit row' },
  rcd_1x: { label: 'RCD trip at 1× IΔn', short: 'RCD 1×', unit: 'ms', dp: 0, per: 'one reading per circuit row' },
  pfc: { label: 'Prospective fault current', short: 'PFC', unit: 'kA', dp: 1, per: 'one reading per circuit row' },
};

export const useCertificateInsights = () =>
  useQuery<CertificateInsights | null>({
    queryKey: INSIGHTS_QUERY_KEY,
    queryFn: async () => {
      // The RPC post-dates the generated Database types.
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { data, error } = await (supabase as any).rpc('admin_get_certificate_insights');
      if (error) throw error;
      return (data as CertificateInsights | null) ?? null;
    },
    staleTime: 60 * 60 * 1000,
    gcTime: 24 * 60 * 60 * 1000,
    retry: 1,
  });

/** Rebuild the aggregates now rather than waiting for Sunday's cron. */
export const useRefreshCertificateInsights = () => {
  const queryClient = useQueryClient();
  return useMutation<number>({
    mutationFn: async () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { data, error } = await (supabase as any).rpc('admin_refresh_certificate_insights');
      if (error) throw error;
      return Number(data);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: INSIGHTS_QUERY_KEY }),
  });
};

/** Summary row for a measurement on an earthing system; null when fewer than five certificates. */
export const readingSummaryFor = (
  insights: CertificateInsights | null | undefined,
  measurement: InsightMeasurement,
  earthing: InsightEarthing
): ReadingSummary | null =>
  insights?.reading_summary.find((r) => r.measurement === measurement && r.earthing === earthing) ??
  null;

/** Histogram buckets for a measurement on an earthing system, lowest edge first. */
export const readingBucketsFor = (
  insights: CertificateInsights | null | undefined,
  measurement: InsightMeasurement,
  earthing: InsightEarthing
): ReadingBucket[] =>
  (insights?.reading_buckets ?? [])
    .filter((b) => b.measurement === measurement && b.earthing === earthing)
    .slice()
    .sort((a, b) => Number(a.lo) - Number(b.lo));
