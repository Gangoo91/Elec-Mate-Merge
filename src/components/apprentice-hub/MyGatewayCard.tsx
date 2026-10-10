import { useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import { useGatewayReadiness } from '@/hooks/epa/useGatewayReadiness';
import {
  LC_FRAME,
  LC_HEAD,
  LC_ROW,
  lcChip,
} from '@/components/apprentice-hub/college-hub/learnerUi';
import { MyGatewayForecast } from '@/components/apprentice-hub/MyGatewayForecast';

/* ==========================================================================
   MyGatewayCard — the learner's gateway on their college EPA page, in words
   (8 Oct 2026). Reads get_gateway_readiness, the same lines their tutor sees
   on Student 360 and EPA tracking: "0 of 9 gateway lines met" and the
   criteria line's own "4 of 340 criteria passed". No score. Every line, each
   with the place to fix it, is on the portfolio Readiness view.
   ========================================================================== */

export function MyGatewayCard() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { data, loading, error } = useGatewayReadiness(user?.id ?? null);

  if (!user || error) return null;
  if (loading && !data)
    return (
      <section className={cn(LC_FRAME, 'px-4 py-4 sm:px-5')}>
        <p className="text-[13px] text-white">Checking your gateway…</p>
      </section>
    );
  if (!data?.items?.length) return null;

  const met = data.items.filter((i) => i.state === 'green').length;
  const total = data.items.length;
  const allMet = met === total;
  const crit = data.items.find((i) => i.key === 'criteria')?.figures as
    { passed?: number; total?: number } | undefined;
  const open = data.items.filter((i) => i.state !== 'green');
  const what = data.assessment || 'end-point assessment';

  return (
    <section className={LC_FRAME} aria-labelledby="my-gateway-title" data-testid="my-gateway-card">
      <div className={LC_HEAD}>
        <h2 id="my-gateway-title" className="text-[15px] font-semibold tracking-tight text-white">
          Your gateway
        </h2>
        <span className={lcChip(data.gateway_passed || allMet ? 'done' : 'neutral')}>
          {data.gateway_passed ? 'Gateway passed' : allMet ? 'Ready for gateway' : 'In progress'}
        </span>
      </div>
      <div className="px-4 pb-3 sm:px-5">
        <p
          className="text-[22px] font-semibold leading-tight tabular-nums text-white"
          data-testid="my-gateway-met"
        >
          {met} of {total} gateway lines met
        </p>
        {crit?.total ? (
          <p className="mt-1 text-[13px] text-white" data-testid="my-gateway-criteria">
            {crit.passed ?? 0} of {crit.total} criteria passed
          </p>
        ) : null}
        <p className="mt-2 text-[12.5px] leading-snug text-white">
          {allMet
            ? `Every line is met. Your employer and college decide when you go forward for the ${what}.`
            : `Still to do: ${open
                .slice(0, 3)
                .map((i) => i.label.toLowerCase())
                .join(', ')}${open.length > 3 ? `, and ${open.length - 3} more` : ''}.`}
        </p>
      </div>
      {/* When, at this pace: the same forecast the tutor sees. */}
      {!data.gateway_passed && (
        <MyGatewayForecast
          userId={user.id}
          className="border-t border-white/[0.08] px-4 py-3 sm:px-5"
        />
      )}
      <button
        type="button"
        onClick={() => navigate('/apprentice/hub?view=readiness')}
        className={cn(LC_ROW, 'border-t border-white/[0.08]')}
      >
        <span className="min-w-0 flex-1 text-[13.5px] font-semibold text-white">
          See every line and where to fix it
        </span>
        <ChevronRight className="h-4 w-4 shrink-0 text-white" aria-hidden="true" />
      </button>
    </section>
  );
}
