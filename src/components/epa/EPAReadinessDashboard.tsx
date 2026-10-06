/**
 * EPAReadinessDashboard — the EPA simulator's Readiness tab.
 *
 * Rebuilt 6 Oct 2026 on the ONE readiness model (src/lib/epa/readiness): AM2
 * practice, the portfolio on the learner's own qualification's ACs, and the
 * sign-offs — the same picture their tutor sees. The old version weighted an
 * "evidence quality" score that had never been measured and a professional
 * discussion the ST0152 EPA doesn't have, so nobody could ever reach "ready";
 * its weak-AC panel matched bare AC codes across units and said "strong
 * coverage" when it had loaded nothing.
 *
 * What to do next comes first — on a phone the start buttons used to be four
 * screens down.
 */
import { useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { CARD_SURFACE } from '@/components/ui/card-recipe';
import { useEPAReadiness } from '@/hooks/epa/useEPAReadiness';
import { EpaReadinessBreakdown } from '@/components/epa/EpaReadinessBreakdown';
import { nextTarget } from '@/components/epa/epaNextTarget';

interface EPAReadinessDashboardProps {
  qualificationCode: string;
  qualificationId?: string | null;
  /** The code as enrolled — the route comes from it. */
  enrolmentCode?: string | null;
  onStartDiscussion: () => void;
  onStartKnowledgeTest: () => void;
  /** Kept for the page's "drill this AC" deep link. */
  onTargetAC?: (acRef: string, acText: string, unitCode?: string) => void;
}

export function EPAReadinessDashboard({
  qualificationCode,
  qualificationId,
  enrolmentCode,
  onStartDiscussion,
  onStartKnowledgeTest,
}: EPAReadinessDashboardProps) {
  const navigate = useNavigate();
  const { data, isLoading, error, recalculate } = useEPAReadiness(
    qualificationCode,
    qualificationId,
    enrolmentCode
  );

  if (error && !data) {
    return (
      <div className="space-y-3 py-6">
        <p className="text-[14px] text-white">Couldn’t work out your readiness: {error}</p>
        <button
          type="button"
          onClick={() => void recalculate()}
          className="h-11 rounded-xl border border-white/[0.22] px-4 text-[14px] font-semibold text-white touch-manipulation"
        >
          Try again
        </button>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex items-center gap-3 py-12">
        <Loader2 className="h-4 w-4 animate-spin text-white" />
        <p className="text-[13px] text-white">Working out where you stand…</p>
      </div>
    );
  }

  const practise = [
    {
      title: `${data.route.assessment || 'AM2'} simulator`,
      desc: 'Sections B to E, a full mock day, and your weak spots.',
      onClick: () => navigate('/apprentice/am2-simulator'),
    },
    {
      title: 'Questions on your portfolio',
      desc: 'Built from your own jobs and your qualification’s ACs.',
      onClick: onStartDiscussion,
    },
    {
      title: 'Knowledge test',
      desc: 'Thirty mixed questions is a full sitting; fewer is a drill.',
      onClick: onStartKnowledgeTest,
    },
  ];

  return (
    <div className="space-y-5 py-2">
      <EpaReadinessBreakdown
        model={data}
        onNext={(n) => {
          const to = nextTarget(n);
          if (to) navigate(to);
        }}
      />

      <section className="space-y-2">
        <h2 className="text-[15px] font-semibold tracking-tight text-white">Practise</h2>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
          {practise.map((p) => (
            <button
              key={p.title}
              type="button"
              onClick={p.onClick}
              className={cn(
                'min-h-[64px] rounded-2xl border border-white/[0.14] p-4 text-left transition-colors hover:border-elec-yellow touch-manipulation',
                CARD_SURFACE
              )}
            >
              <span className="block text-[14px] font-semibold text-white">{p.title}</span>
              <span className="mt-0.5 block text-[12.5px] leading-snug text-white">{p.desc}</span>
            </button>
          ))}
        </div>
      </section>

      <div className="flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => navigate('/apprentice/toolbox/end-point-assessment')}
          className="h-11 rounded-xl border border-white/[0.18] px-4 text-[13px] font-semibold text-white touch-manipulation"
        >
          How the EPA works
        </button>
        <button
          type="button"
          onClick={() => void recalculate()}
          disabled={isLoading}
          className="h-11 rounded-xl border border-white/[0.18] px-4 text-[13px] font-semibold text-white touch-manipulation disabled:opacity-60"
        >
          {isLoading ? 'Updating…' : 'Update'}
        </button>
      </div>
    </div>
  );
}

export default EPAReadinessDashboard;
