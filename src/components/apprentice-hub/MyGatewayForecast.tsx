import { cn } from '@/lib/utils';
import { useGatewayForecast } from '@/hooks/epa/useGatewayForecast';
import {
  forecastDateWords,
  forecastHeadline,
  forecastLever,
  type GatewayForecast,
} from '@/lib/epa/gatewayForecast';

/* ==========================================================================
   The learner's gateway forecast (8 Oct 2026): "At your current pace you'll
   be ready for gateway by March 2027", and the one thing that most moves the
   date. Same server answer (get_gateway_forecast) as their tutor's screens.
   ========================================================================== */

export function MyGatewayForecastText({
  forecast,
  className,
}: {
  forecast: GatewayForecast | null | undefined;
  className?: string;
}) {
  if (!forecast) return null;
  const lever = forecastLever(forecast, 'learner');
  return (
    <span
      className={cn('block', className)}
      data-testid="gateway-forecast"
      data-status={forecast.status}
      data-date={forecastDateWords(forecast)}
    >
      <span className="block font-semibold">{forecastHeadline(forecast, 'learner')}</span>
      {lever && <span className="mt-0.5 block">{lever}</span>}
    </span>
  );
}

/** Self-loading block for the gateway card. */
export function MyGatewayForecast({
  userId,
  className,
}: {
  userId: string | null | undefined;
  className?: string;
}) {
  const { data, isLoading, error } = useGatewayForecast(userId);
  if (!userId || error) return null;
  if (isLoading && !data)
    return <p className={cn('text-[13px] text-white', className)}>Working out your forecast…</p>;
  return (
    <div className={className}>
      <p className="text-[13px] font-semibold text-white">Gateway forecast</p>
      <MyGatewayForecastText
        forecast={data}
        className="mt-1 text-[13.5px] leading-snug text-white"
      />
      <p className="mt-1.5 text-[12px] leading-snug text-white">
        A forecast from your record, not a decision.
      </p>
    </div>
  );
}
