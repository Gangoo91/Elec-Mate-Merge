/**
 * EPAGatewayPulse
 *
 * Live "% to gateway" strip linking the portfolio dashboard to the
 * EPA Simulator. Mirrors the readiness score so the apprentice sees their
 * gateway distance without having to navigate.
 */

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useEPAReadiness } from '@/hooks/epa/useEPAReadiness';
import { Eyebrow } from './PortfolioPrimitives';

interface EPAGatewayPulseProps {
  qualificationCode: string;
  qualificationId?: string | null;
}

export function EPAGatewayPulse({ qualificationCode, qualificationId }: EPAGatewayPulseProps) {
  const { data, isLoading, recalculate } = useEPAReadiness(qualificationCode, qualificationId);
  const navigate = useNavigate();

  // Trigger one calculation on mount
  useEffect(() => {
    if (!data && !isLoading) recalculate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!qualificationCode) return null;

  const score = data?.overallScore ?? 0;
  const ready = score >= 70;

  return (
    <button
      type="button"
      onClick={() => navigate('/apprentice/epa-simulator')}
      className="w-full rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)] hover:bg-white/[0.04] transition-colors px-4 py-3 sm:px-5 sm:py-4 text-left touch-manipulation"
    >
      <div className="flex items-baseline justify-between gap-3">
        <Eyebrow>EPA gateway · {ready ? 'Ready' : 'In progress'}</Eyebrow>
        <span className="text-[11px] text-elec-yellow/85">Open simulator →</span>
      </div>
      <div className="flex items-baseline gap-2 mt-1.5">
        <span
          className={cn(
            'text-[28px] sm:text-[32px] font-mono font-semibold leading-none tabular-nums',
            ready ? 'text-elec-yellow' : 'text-white'
          )}
        >
          {score}
        </span>
        <span className="text-[14px] text-white/40 font-mono">/ 100</span>
      </div>
      <div className="h-1 w-full bg-white/[0.04] rounded-full overflow-hidden mt-3">
        <div
          className={cn(
            'h-full rounded-full transition-all duration-700',
            ready ? 'bg-elec-yellow' : 'bg-white/55'
          )}
          style={{ width: `${Math.min(score, 100)}%` }}
        />
      </div>
      <p className="text-[12px] text-white/55 leading-snug mt-2">
        {ready
          ? 'Gateway threshold met. Talk to your tutor about booking your EPA.'
          : `${70 - score} points to the 70% gateway threshold. Tap for your readiness breakdown and drill targets.`}
      </p>
    </button>
  );
}
