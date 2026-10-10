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
import { ChevronRight, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { COLLEGE_BTN } from '@/components/college/ui/CollegeUi';
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
    <div className="space-y-8">
      <EpaReadinessBreakdown
        model={data}
        showSummary={false}
        onNext={(n) => {
          const to = nextTarget(n);
          if (to) navigate(to);
        }}
      />

      {/* Practise: rows on a phone, three same-height cards on a wider screen. */}
      <section className="space-y-3">
        <h2 className="text-[17px] font-semibold tracking-tight text-white">Practise</h2>
        <ul className="-mx-4 divide-y divide-white/[0.06] overflow-hidden border-y border-white/[0.06] bg-[hsl(0_0%_12%)] sm:mx-0 sm:grid sm:grid-cols-3 sm:gap-3 sm:divide-y-0 sm:overflow-visible sm:border-0 sm:bg-transparent">
          {practise.map((p) => (
            <li key={p.title} className="sm:flex">
              <button
                type="button"
                onClick={p.onClick}
                className="group flex min-h-[64px] w-full items-center gap-3 px-5 py-3.5 text-left transition-colors touch-manipulation hover:bg-white/[0.04] active:bg-white/[0.07] sm:items-start sm:rounded-2xl sm:border sm:border-white/[0.08] sm:bg-[hsl(0_0%_12%)] sm:p-5 sm:hover:border-white/[0.18]"
              >
                <span className="min-w-0 flex-1">
                  <span className="block text-[15px] font-semibold text-white">{p.title}</span>
                  <span className="mt-1 block text-[13px] leading-snug text-white">{p.desc}</span>
                </span>
                <ChevronRight
                  className="h-4 w-4 shrink-0 text-white transition-transform group-hover:translate-x-0.5 sm:mt-1"
                  aria-hidden
                />
              </button>
            </li>
          ))}
        </ul>
      </section>

      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => navigate('/apprentice/toolbox/end-point-assessment')}
          className={COLLEGE_BTN}
        >
          How the EPA works
        </button>
        <button
          type="button"
          onClick={() => void recalculate()}
          disabled={isLoading}
          className={COLLEGE_BTN}
        >
          {isLoading ? 'Updating…' : 'Update readiness'}
        </button>
      </div>
    </div>
  );
}

export default EPAReadinessDashboard;
