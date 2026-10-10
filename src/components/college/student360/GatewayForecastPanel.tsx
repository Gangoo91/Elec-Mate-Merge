import { cn } from '@/lib/utils';
import { COLLEGE_CARD } from '@/components/college/ui/CollegeUi';
import { useGatewayForecast } from '@/hooks/epa/useGatewayForecast';
import {
  forecastDateWords,
  forecastHeadline,
  forecastLever,
  forecastParts,
  forecastTag,
  forecastTone,
  openLinesWords,
  type GatewayForecast,
} from '@/lib/epa/gatewayForecast';

/* ==========================================================================
   Gateway forecast for staff (8 Oct 2026): "On pace for gateway by March
   2027", or "Behind: at this pace, November 2028, 5 months after the planned
   end. 2 criteria a week brings it back." From get_gateway_forecast, the same
   answer the learner sees on their EPA page. A forecast, not a decision.

   Every surface carries data-testid="gateway-forecast" with data-status and
   data-date, so a test can check the screens agree.
   ========================================================================== */

const chipCls = (tone: 'done' | 'action' | 'neutral') =>
  cn(
    'inline-flex h-6 shrink-0 items-center whitespace-nowrap rounded-full border px-2.5 text-[12px] font-semibold',
    tone === 'done'
      ? 'border-emerald-400/60 text-emerald-300'
      : tone === 'action'
        ? 'border-orange-400/60 text-orange-300'
        : 'border-white/[0.18] text-white'
  );

export function ForecastChip({ forecast }: { forecast: GatewayForecast | null | undefined }) {
  return <span className={chipCls(forecastTone(forecast))}>{forecastTag(forecast)}</span>;
}

const dataAttrs = (f: GatewayForecast | null | undefined) => ({
  'data-testid': 'gateway-forecast',
  'data-status': f?.status ?? 'none',
  'data-date': forecastDateWords(f),
});

/** The full panel: headline, the lever, the three parts, what else is open. */
export function GatewayForecastPanel({
  userId,
  className,
}: {
  userId: string | null | undefined;
  className?: string;
}) {
  const { data: f, isLoading, error } = useGatewayForecast(userId);
  if (!userId) return null;
  return (
    <section className={cn(COLLEGE_CARD, className)} aria-labelledby="gateway-forecast-title">
      <div className="flex items-start justify-between gap-3">
        <h2 id="gateway-forecast-title" className="text-[13px] font-semibold text-white">
          Gateway forecast
        </h2>
        {f && <ForecastChip forecast={f} />}
      </div>
      {isLoading ? (
        <p className="mt-2 text-[13px] text-white">Working out the forecast…</p>
      ) : error || !f ? (
        <p className="mt-2 text-[13px] text-white">The forecast could not be worked out.</p>
      ) : (
        <div {...dataAttrs(f)}>
          <p className="mt-2 text-[18px] font-semibold leading-snug tracking-tight text-white sm:text-[20px]">
            {forecastHeadline(f, 'staff')}
          </p>
          {forecastLever(f, 'staff') && (
            <p className="mt-1.5 text-[14px] leading-snug text-white">
              {forecastLever(f, 'staff')}
            </p>
          )}
          {f.status !== 'gateway_passed' && f.status !== 'stopped' && (
            <dl className="mt-4 grid grid-cols-1 gap-3 border-t border-white/[0.08] pt-4 sm:grid-cols-3 sm:gap-5">
              {forecastParts(f).map((p) => (
                <div key={p.label} className="min-w-0">
                  <dt className="text-[12px] font-semibold text-white">{p.label}</dt>
                  <dd className="mt-0.5 text-[13px] leading-snug text-white">{p.text}</dd>
                </div>
              ))}
            </dl>
          )}
          {openLinesWords(f) && f.status !== 'gateway_passed' && (
            <p className="mt-3 text-[13px] leading-snug text-white">
              Also still open, with no date to forecast: {openLinesWords(f)}.
            </p>
          )}
          <p className="mt-3 text-[12px] leading-snug text-white">
            A forecast from the record, not a decision. The employer and college decide gateway.
          </p>
        </div>
      )}
    </section>
  );
}

/** One or two lines for a list row or an overview card. */
export function GatewayForecastLine({
  forecast,
  loading,
  className,
}: {
  forecast: GatewayForecast | null | undefined;
  loading?: boolean;
  className?: string;
}) {
  if (loading && !forecast)
    return <span className={cn('block text-[12.5px] text-white', className)}>Forecast…</span>;
  if (!forecast) return null;
  const lever = forecastLever(forecast, 'staff');
  const behind = forecast.status === 'off_pace' || forecast.status === 'at_risk';
  return (
    <span
      className={cn('block text-[13px] leading-snug text-white', className)}
      {...dataAttrs(forecast)}
    >
      {(() => {
        // Showcase pass (10 Oct): only the verdict word takes colour
        // ("Behind:"), the reason reads in white like the rest of the row.
        const head = forecastHeadline(forecast, 'staff');
        const cut = head.indexOf(': ');
        if (!behind || cut < 0)
          return <span className={cn('font-semibold', behind && 'text-orange-300')}>{head}</span>;
        return (
          <>
            <span className="font-semibold text-orange-300">{head.slice(0, cut + 1)}</span>{' '}
            <span className="font-semibold">{head.slice(cut + 2).replace(/\.?$/, '.')}</span>
          </>
        );
      })()}
      {lever && behind ? <> {lever}</> : null}
    </span>
  );
}

/** Self-loading line for one learner (Student 360 overview). */
export function GatewayForecastSummary({
  userId,
  className,
}: {
  userId: string | null | undefined;
  className?: string;
}) {
  const { data, isLoading } = useGatewayForecast(userId);
  if (!userId) return null;
  return <GatewayForecastLine forecast={data} loading={isLoading} className={className} />;
}
