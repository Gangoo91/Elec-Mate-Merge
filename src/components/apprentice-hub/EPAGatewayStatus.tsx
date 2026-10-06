/**
 * EPAGatewayStatus — the profile's readiness bottom sheet.
 *
 * Same model and the same breakdown as the EPA simulator's Readiness tab
 * (src/lib/epa/readiness + EpaReadinessBreakdown), so the learner never sees
 * two answers. It used to promise "70%+ is the typical gateway bar" — there's
 * no such bar; the employer and provider decide.
 */
import { Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { FormSheet } from '@/components/forms/FormSheet';
import { useStudentQualification } from '@/hooks/useStudentQualification';
import { useEPAReadiness } from '@/hooks/epa/useEPAReadiness';
import { EpaReadinessBreakdown } from '@/components/epa/EpaReadinessBreakdown';
import { epaRouteFor } from '@/lib/epa/readiness';
import { nextTarget } from '@/components/epa/epaNextTarget';

interface EPAGatewayStatusProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function EPAGatewayStatus({ open, onOpenChange }: EPAGatewayStatusProps) {
  const { qualificationCode, qualificationId, enrolmentCode } = useStudentQualification();
  const navigate = useNavigate();
  const route = epaRouteFor(enrolmentCode ?? qualificationCode);
  // Only calculate while the sheet is open.
  const { data, isLoading, error, recalculate } = useEPAReadiness(
    open && route.kind !== 'none' ? (qualificationCode ?? undefined) : undefined,
    qualificationId,
    enrolmentCode
  );

  return (
    <FormSheet
      open={open}
      onOpenChange={onOpenChange}
      eyebrow={route.assessment ? `${route.assessment} readiness` : 'Readiness'}
      title="Where you stand"
      description="The same picture your tutor sees."
      bodyClassName="space-y-0"
    >
      {route.kind === 'none' ? (
        <p className="py-8 text-[14px] text-white">{route.summary}</p>
      ) : error ? (
        <div className="py-8">
          <p className="text-[14px] text-white">Couldn’t load your readiness.</p>
          <button
            type="button"
            onClick={() => void recalculate()}
            className="mt-3 h-11 rounded-xl border border-white/[0.22] px-4 text-[14px] font-semibold text-white touch-manipulation"
          >
            Try again
          </button>
        </div>
      ) : isLoading || !data ? (
        <div className="flex flex-col items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-white" />
          <p className="mt-2 text-sm text-white">Checking readiness…</p>
        </div>
      ) : (
        <EpaReadinessBreakdown
          model={data}
          onNext={(n) => {
            const to = nextTarget(n);
            if (!to) return;
            onOpenChange(false);
            navigate(to);
          }}
        />
      )}
    </FormSheet>
  );
}

export default EPAGatewayStatus;
