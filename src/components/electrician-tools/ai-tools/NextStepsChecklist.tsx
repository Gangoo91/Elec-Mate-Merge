/**
 * NextStepsChecklist — editorial post-analysis next steps.
 *
 * Drops red/amber/green flood backgrounds and inline icons. Each action
 * gets a numbered eyebrow + priority chip + body. Recommendations list as
 * a divided ordered list.
 */

import { Eyebrow } from '@/components/college/primitives';
import { cn } from '@/lib/utils';

interface NextStepsChecklistProps {
  failCount: number;
  requiresTestingCount: number;
  recommendations: string[];
}

export const NextStepsChecklist = ({
  failCount,
  requiresTestingCount,
  recommendations,
}: NextStepsChecklistProps) => {
  type Priority = 'critical' | 'high' | 'low';
  const actionItems: Array<{
    priority: Priority;
    title: string;
    description: string;
    time: string;
    tone: string;
  }> = [];

  if (failCount > 0) {
    actionItems.push({
      priority: 'critical',
      title: 'Address failed checks immediately',
      description: `${failCount} check${failCount > 1 ? 's' : ''} failed — immediate action required for safety + compliance.`,
      time: 'Immediate',
      tone: 'text-red-300 border-red-500/40 bg-red-500/[0.08]',
    });
  }

  if (requiresTestingCount > 0) {
    actionItems.push({
      priority: 'high',
      title: 'Schedule on-site testing',
      description: `${requiresTestingCount} check${requiresTestingCount > 1 ? 's' : ''} need physical instrument testing.`,
      time: 'Within 48 hours',
      tone: 'text-amber-300 border-amber-500/40 bg-amber-500/[0.08]',
    });
  }

  if (failCount === 0 && requiresTestingCount === 0) {
    actionItems.push({
      priority: 'low',
      title: 'Complete final verification',
      description: 'All visual checks passed. Proceed with full testing and certification.',
      time: 'At your convenience',
      tone: 'text-emerald-300 border-emerald-500/40 bg-emerald-500/[0.08]',
    });
  }

  return (
    <section className="rounded-2xl bg-[linear-gradient(180deg,hsl(0_0%_13%)_0%,hsl(0_0%_10%)_100%)] border border-white/[0.10] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] p-5 sm:p-6 space-y-4">
      <Eyebrow>NEXT STEPS</Eyebrow>

      <ol className="divide-y divide-white/[0.06]">
        {actionItems.map((item, index) => (
          <li key={index} className="py-4 first:pt-0 last:pb-0">
            <div className="flex items-baseline gap-3">
              <span className="text-[10.5px] tabular-nums font-semibold text-elec-yellow shrink-0 w-5">
                {String(index + 1).padStart(2, '0')}
              </span>
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline justify-between gap-2 flex-wrap">
                  <h4 className="text-[14px] font-semibold tracking-tight text-white">
                    {item.title}
                  </h4>
                  <span
                    className={cn(
                      'text-[10px] uppercase tracking-[0.14em] font-semibold border rounded-md px-1.5 py-0.5',
                      item.tone
                    )}
                  >
                    {item.priority}
                  </span>
                </div>
                <p className="mt-1 text-[12.5px] leading-relaxed text-white/85">
                  {item.description}
                </p>
                <p className="mt-1.5 text-[10.5px] uppercase tracking-[0.14em] font-semibold text-white/65 tabular-nums">
                  {item.time}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ol>

      {recommendations && recommendations.length > 0 && (
        <div className="pt-4 border-t border-white/[0.06] space-y-3">
          <Eyebrow>ALSO RECOMMENDED</Eyebrow>
          <ul className="space-y-2">
            {recommendations.slice(0, 5).map((rec, idx) => (
              <li
                key={idx}
                className="flex items-baseline gap-2.5 text-[12.5px] leading-relaxed text-white"
              >
                <span className="w-1 h-1 rounded-full bg-elec-yellow shrink-0 self-center" aria-hidden />
                <span className="flex-1">{rec}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
};
