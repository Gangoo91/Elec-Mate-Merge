import { cn } from '@/lib/utils';
import { CARD_SURFACE } from '@/components/ui/card-recipe';
import { useOtjForecast } from '@/hooks/useOtjForecast';

/* ==========================================================================
   OtjForecastBadge — off-the-job forecast for Student 360 / Gateway
   readiness. ELE-928 (I2).

   Hub card language. The risk word is text, not a pill: red only for "off
   track", which is a real state; "at risk" is volt text; "on track" is
   plain white.
   ========================================================================== */

interface Props {
  studentId: string;
  compact?: boolean;
}

const RISK_LABEL = {
  green: 'On track',
  amber: 'At risk',
  red: 'Off track',
  unknown: 'Unknown',
} as const;

const RISK_TEXT = {
  green: 'text-white',
  amber: 'text-elec-yellow',
  red: 'text-red-300',
  unknown: 'text-white',
} as const;

export function OtjForecastBadge({ studentId, compact }: Props) {
  const { forecast, loading } = useOtjForecast(studentId);

  if (loading || !forecast) {
    return (
      <span className="text-[12px] font-semibold text-white">
        {loading ? '…' : 'No forecast'}
      </span>
    );
  }

  if (compact) {
    return (
      <span className="text-[12px] font-semibold tabular-nums text-white">
        OTJ {forecast.forecast_pct}% ·{' '}
        <span className={RISK_TEXT[forecast.risk]}>{RISK_LABEL[forecast.risk]}</span>
      </span>
    );
  }

  return (
    <section
      className={cn('overflow-hidden rounded-2xl border border-elec-yellow/35', CARD_SURFACE)}
    >
      <div className="flex items-end justify-between gap-4 px-4 py-3.5 sm:px-5">
        <h3 className="text-[15px] font-semibold tracking-tight text-elec-yellow">
          Off-the-job forecast
        </h3>
        <span className={cn('text-[11px] font-semibold', RISK_TEXT[forecast.risk])}>
          {RISK_LABEL[forecast.risk]}
        </span>
      </div>

      <div className="flex items-center justify-between gap-4 border-t border-white/[0.10] px-4 py-3.5 sm:px-5">
        <div className="min-w-0 text-[12px] leading-snug text-white">
          <div>
            <span className="font-semibold">{forecast.current_hours}h</span> so far ·{' '}
            <span className="font-semibold">{forecast.weekly_pace_hours}h</span>/wk pace
          </div>
          <div className="mt-0.5">
            {forecast.days_remaining} days left · forecast{' '}
            <span className="font-semibold">{forecast.forecast_hours_at_end}h</span> of{' '}
            {forecast.required_hours}h required by end date
          </div>
          {forecast.shortfall_hours < 0 && (
            <div className="mt-0.5 font-semibold text-red-300">
              Needs ~{forecast.weekly_needed_to_close_gap}h/wk to close the gap.
            </div>
          )}
        </div>
        <span
          className={cn(
            'shrink-0 text-[26px] font-semibold leading-none tabular-nums',
            forecast.risk === 'red' ? 'text-red-300' : 'text-white'
          )}
        >
          {forecast.forecast_pct}%
        </span>
      </div>
    </section>
  );
}
