/**
 * RIDDORCountdown
 *
 * Visual countdown timer for RIDDOR reporting deadlines.
 * Shows days/hours remaining with colour-coded urgency.
 */

import { useMemo } from 'react';
import { AlertTriangle, CheckCircle2, Clock, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';

interface RIDDORCountdownProps {
  /** RIDDOR category: 'death', 'specified_injury', 'over_7_day', 'dangerous_occurrence' */
  category?: string;
  /** When the incident occurred */
  incidentDate: string;
  /** Whether already reported */
  isReported?: boolean;
  /** HSE reference if reported */
  hseReference?: string;
}

const DEADLINES: Record<string, { label: string; hours: number; description: string }> = {
  death: { label: 'Death', hours: 0, description: 'Report immediately by phone — do not delay' },
  specified_injury: {
    label: 'Specified Injury',
    hours: 0,
    description: 'Report without delay — immediate notification required',
  },
  over_7_day: {
    label: 'Over 7-Day Incapacitation',
    hours: 360,
    description: 'Report within 15 days of the incident',
  },
  dangerous_occurrence: {
    label: 'Dangerous Occurrence',
    hours: 0,
    description: 'Report without delay — immediate notification required',
  },
};

export function RIDDORCountdown({
  category,
  incidentDate,
  isReported,
  hseReference,
}: RIDDORCountdownProps) {
  const deadline = category ? DEADLINES[category] : null;

  const status = useMemo(() => {
    if (isReported) return { colour: 'emerald', label: 'REPORTED', urgent: false };
    if (!deadline) return { colour: 'amber', label: 'PENDING', urgent: true };

    if (deadline.hours === 0) {
      return { colour: 'red', label: 'REPORT NOW', urgent: true };
    }

    const incidentTime = new Date(incidentDate).getTime();
    const deadlineTime = incidentTime + deadline.hours * 60 * 60 * 1000;
    const now = Date.now();
    const hoursRemaining = Math.max(0, (deadlineTime - now) / (1000 * 60 * 60));
    const daysRemaining = Math.floor(hoursRemaining / 24);

    if (hoursRemaining <= 0)
      return { colour: 'red', label: 'OVERDUE', urgent: true, daysRemaining: 0 };
    if (hoursRemaining <= 48)
      return {
        colour: 'red',
        label: `${Math.ceil(hoursRemaining)}h LEFT`,
        urgent: true,
        daysRemaining,
      };
    if (daysRemaining <= 5)
      return { colour: 'amber', label: `${daysRemaining} DAYS LEFT`, urgent: true, daysRemaining };
    return { colour: 'blue', label: `${daysRemaining} DAYS LEFT`, urgent: false, daysRemaining };
  }, [category, incidentDate, isReported, deadline]);

  const colourMap: Record<string, { bg: string; text: string; border: string }> = {
    red: { bg: 'bg-red-500/10', text: 'text-red-400', border: 'border-red-500/30' },
    amber: { bg: 'bg-amber-500/10', text: 'text-amber-400', border: 'border-amber-500/30' },
    blue: { bg: 'bg-blue-500/10', text: 'text-blue-400', border: 'border-blue-500/30' },
    emerald: { bg: 'bg-emerald-500/10', text: 'text-emerald-400', border: 'border-emerald-500/30' },
  };

  const c = colourMap[status.colour] || colourMap.amber;

  return (
    <div
      className={cn(
        'rounded-xl border p-4',
        c.bg,
        c.border,
        status.urgent && !isReported && 'animate-pulse'
      )}
    >
      <div className="flex items-start gap-3">
        {isReported ? (
          <CheckCircle2 className={cn('h-5 w-5 flex-shrink-0 mt-0.5', c.text)} />
        ) : status.colour === 'red' ? (
          <AlertTriangle className={cn('h-5 w-5 flex-shrink-0 mt-0.5', c.text)} />
        ) : (
          <Clock className={cn('h-5 w-5 flex-shrink-0 mt-0.5', c.text)} />
        )}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className={cn('text-sm font-bold', c.text)}>RIDDOR: {status.label}</span>
            {deadline && (
              <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-white/5 text-white">
                {deadline.label}
              </span>
            )}
          </div>
          <p className="text-xs text-white leading-relaxed">
            {isReported
              ? `Reported to HSE${hseReference ? ` — Reference: ${hseReference}` : ''}`
              : deadline?.description || 'Determine RIDDOR category to see reporting deadline'}
          </p>
          {!isReported && (
            <a
              href="https://notifications.hse.gov.uk/riddorforms"
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                'inline-flex items-center gap-1.5 mt-2 text-xs font-semibold',
                c.text,
                'touch-manipulation'
              )}
            >
              <ExternalLink className="h-3 w-3" />
              Report to HSE Online
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
