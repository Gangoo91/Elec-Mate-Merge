import { useOtjForecast } from '@/hooks/useOtjForecast';
import { Pill, type Tone } from '@/components/college/primitives';

/* ==========================================================================
   OtjForecastBadge — compact view for Student 360 / Gateway readiness.
   ELE-928 (I2).
   ========================================================================== */

interface Props {
  studentId: string;
  compact?: boolean;
}

const RISK_TONE = {
  green: 'emerald' as Tone,
  amber: 'amber' as Tone,
  red: 'red' as Tone,
  unknown: 'blue' as Tone,
};

const RISK_LABEL = {
  green: 'On track',
  amber: 'At risk',
  red: 'Off track',
  unknown: 'Unknown',
};

export function OtjForecastBadge({ studentId, compact }: Props) {
  const { forecast, loading } = useOtjForecast(studentId);

  if (loading || !forecast) {
    return <Pill tone="blue">{loading ? '…' : 'No forecast'}</Pill>;
  }

  if (compact) {
    return (
      <Pill tone={RISK_TONE[forecast.risk]}>
        OTJ {forecast.forecast_pct}% • {RISK_LABEL[forecast.risk]}
      </Pill>
    );
  }

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
      <div className="flex items-center justify-between gap-3">
        <div>
          <div className="text-xs uppercase tracking-wider text-white/50">OTJ forecast</div>
          <div className="mt-1 text-2xl font-semibold text-white">
            {forecast.forecast_pct}%
          </div>
          <div className="text-xs text-white/60">
            of required {forecast.required_hours}h by end date
          </div>
        </div>
        <Pill tone={RISK_TONE[forecast.risk]}>{RISK_LABEL[forecast.risk]}</Pill>
      </div>

      <div className="mt-3 space-y-1.5 text-xs text-white/70">
        <div>
          <span className="text-white/40">So far:</span> {forecast.current_hours}h ·{' '}
          <span className="text-white/40">pace:</span> {forecast.weekly_pace_hours}h/wk
        </div>
        <div>
          <span className="text-white/40">Days left:</span> {forecast.days_remaining} ·{' '}
          <span className="text-white/40">forecast at end:</span>{' '}
          {forecast.forecast_hours_at_end}h
        </div>
        {forecast.shortfall_hours < 0 && (
          <div className="text-red-300">
            Needs ~{forecast.weekly_needed_to_close_gap}h/wk to close the gap.
          </div>
        )}
      </div>
    </div>
  );
}
