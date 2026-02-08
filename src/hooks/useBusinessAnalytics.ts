/**
 * useBusinessAnalytics
 * React-query hook wrapping the business-analytics RPC edge function.
 * Returns certificate volume, revenue pipeline, defect trends, and client metrics.
 */

import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export interface CertificateVolume {
  type: string;
  label: string;
  count: number;
  prevCount: number;
}

export interface DefectBreakdown {
  code: string;
  label: string;
  count: number;
  percentage: number;
}

export interface MonthlyRevenue {
  month: string;
  certificates: number;
  quotes: number;
  invoices: number;
  total: number;
}

export interface ClientMetric {
  totalClients: number;
  repeatRate: number;
  avgCertsPerClient: number;
  topClients: Array<{
    name: string;
    certificateCount: number;
    totalValue: number;
  }>;
}

export interface ExpiryForecast {
  period: string;
  count: number;
  estimatedRevenue: number;
}

export interface BusinessAnalyticsData {
  certificatesByType: CertificateVolume[];
  defectBreakdown: DefectBreakdown[];
  monthlyRevenue: MonthlyRevenue[];
  expiryForecast: ExpiryForecast[];
  clientMetrics: ClientMetric;
  totalCertificates: number;
  totalRevenue: number;
  periodLabel: string;
}

type DateRange = '7d' | '30d' | '90d' | '1yr';

const getDaysForRange = (range: DateRange): number => {
  switch (range) {
    case '7d': return 7;
    case '30d': return 30;
    case '90d': return 90;
    case '1yr': return 365;
  }
};

export const useBusinessAnalytics = (dateRange: DateRange = '30d') => {
  const { user } = useAuth();
  const days = getDaysForRange(dateRange);

  return useQuery({
    queryKey: ['business-analytics', user?.id, dateRange],
    queryFn: async (): Promise<BusinessAnalyticsData> => {
      const { data, error } = await supabase.functions.invoke('business-analytics', {
        body: { days, dateRange },
      });

      if (error) throw error;
      return data as BusinessAnalyticsData;
    },
    enabled: !!user?.id,
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
  });
};
