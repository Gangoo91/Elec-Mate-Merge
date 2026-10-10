/**
 * useGatewayForecast — "at this pace, ready for gateway by March 2027"
 * (8 Oct 2026), from get_gateway_forecast / get_gateway_forecast_many. The
 * learner and every staff screen read the same server answer; the words come
 * from src/lib/epa/gatewayForecast.ts.
 */
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { GatewayForecast } from '@/lib/epa/gatewayForecast';

export type { GatewayForecast } from '@/lib/epa/gatewayForecast';

/** One learner's forecast (auth user id). Null id: nothing loads. */
export function useGatewayForecast(learnerId: string | null | undefined) {
  return useQuery({
    queryKey: ['gateway-forecast', learnerId ?? ''],
    enabled: !!learnerId,
    staleTime: 60_000,
    queryFn: async () => {
      const { data, error } = await supabase.rpc(
        'get_gateway_forecast' as never,
        { p_learner: learnerId } as never
      );
      if (error) throw new Error(error.message);
      return (data ?? null) as GatewayForecast | null;
    },
  });
}

export type Forecasts = Record<string, GatewayForecast>;

/** Forecasts for up to 500 learners, keyed on auth user id, 100 a call. */
export async function fetchGatewayForecastMany(userIds: string[]): Promise<Forecasts> {
  const ids = Array.from(new Set(userIds.filter(Boolean))).slice(0, 500);
  if (!ids.length) return {};
  const parts = await Promise.all(
    Array.from({ length: Math.ceil(ids.length / 100) }, (_, i) =>
      supabase
        .rpc(
          'get_gateway_forecast_many' as never,
          { p_learners: ids.slice(i * 100, i * 100 + 100) } as never
        )
        .then(({ data, error }) => {
          if (error) throw new Error(error.message);
          return (data ?? {}) as Forecasts;
        })
    )
  );
  return Object.assign({}, ...parts) as Forecasts;
}

export function useGatewayForecastMany(userIds: string[]) {
  const ids = userIds.filter(Boolean);
  const key = [...ids].sort().join(',');
  return useQuery({
    queryKey: ['gateway-forecast-many', key],
    enabled: ids.length > 0,
    staleTime: 60_000,
    queryFn: () => fetchGatewayForecastMany(ids),
  });
}
