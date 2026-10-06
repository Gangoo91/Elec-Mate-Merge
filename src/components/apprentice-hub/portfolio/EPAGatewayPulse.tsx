/**
 * EPAGatewayPulse
 *
 * The home-screen strip: where the learner stands on the road to their NET
 * assessment (AM2S, AM2, AM2E or AM2D — from the qualification their
 * portfolio is on), and the one thing to do next. Same model as the EPA
 * simulator and the tutor's view (src/lib/epa/readiness.ts).
 *
 * 6 Oct 2026: it used to say "Gateway threshold met… book your EPA" at 70 —
 * there is no such threshold; the employer and provider decide gateway. And it
 * recalculated on mount on top of the hook's own run, writing two snapshots
 * per home visit. Hidden for qualifications that don't end in an AM2.
 */
import { useNavigate } from 'react-router-dom';
import { useEPAReadiness } from '@/hooks/epa/useEPAReadiness';
import { EPA_STATUS_LABEL, epaRouteFor } from '@/lib/epa/readiness';
import { Eyebrow } from './PortfolioPrimitives';

interface EPAGatewayPulseProps {
  qualificationCode: string;
  qualificationId?: string | null;
  /** The code as enrolled — the route comes from it. */
  enrolmentCode?: string | null;
}

export function EPAGatewayPulse({
  qualificationCode,
  qualificationId,
  enrolmentCode,
}: EPAGatewayPulseProps) {
  const route = epaRouteFor(enrolmentCode ?? qualificationCode);
  const { data, error } = useEPAReadiness(
    route.kind === 'none' ? undefined : qualificationCode,
    qualificationId,
    enrolmentCode
  );
  const navigate = useNavigate();

  if (route.kind === 'none') return null;

  const score = data?.score ?? 0;
  const next = data?.next[0];

  return (
    <button
      type="button"
      onClick={() => navigate('/apprentice/epa-simulator')}
      className="w-full rounded-xl border border-white/[0.14] bg-gradient-to-b from-white/[0.08] to-white/[0.04] px-4 py-3 text-left transition-colors hover:border-elec-yellow touch-manipulation sm:px-5 sm:py-4"
    >
      <div className="flex items-baseline justify-between gap-3">
        <Eyebrow>
          {route.assessment} readiness · {data ? EPA_STATUS_LABEL[data.status] : '…'}
        </Eyebrow>
        <span className="text-[12px] font-semibold text-white">Open →</span>
      </div>
      <div className="mt-1.5 flex items-baseline gap-2">
        <span className="font-mono text-[28px] font-semibold leading-none tabular-nums text-white sm:text-[32px]">
          {score}
        </span>
        <span className="font-mono text-[14px] text-white">/ 100</span>
      </div>
      <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-white/[0.08]">
        <div
          className="h-full rounded-full bg-elec-yellow transition-all duration-700"
          style={{ width: `${Math.min(score, 100)}%` }}
        />
      </div>
      <p className="mt-2 text-[12.5px] leading-snug text-white">
        {error
          ? 'Couldn’t load your readiness — tap to try again.'
          : next
            ? `Next: ${next.label}.`
            : (data?.headline ?? 'Working out where you stand…')}
      </p>
    </button>
  );
}
