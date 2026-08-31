import { PANEL } from '@/components/ui/panel-recipe';
import { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * Common issues for a given test.
 *
 * This used to hold one hardcoded generic list — "high readings", "inconsistent
 * readings", "zero readings" — shown on the R₁+R₂ tab only, with advice vague
 * enough to fit any test and therefore useful for none. Worse, it told you a
 * zero reading meant a short in the test setup; on a continuity test a near
 * zero reading almost always means the temporary link is still in place.
 *
 * Each test now passes its own list, and all four tabs show one.
 */

export type Issue = {
  title: string;
  description: string;
  solution: string;
};

const CommonIssuesCard = ({ issues }: { issues: Issue[] }) => {
  const [expandedIssue, setExpandedIssue] = useState<number | null>(null);

  const toggleIssue = (index: number) => {
    setExpandedIssue(expandedIssue === index ? null : index);
  };

  return (
    <div className={cn(PANEL, "space-y-3")}>
      <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/70">
        Common issues
      </span>

      <ul className="space-y-2">
        {issues.map((issue, index) => (
          <li key={index} className="border-b border-white/[0.10] pb-2 last:border-0 last:pb-0">
            <button
              onClick={() => toggleIssue(index)}
              aria-expanded={expandedIssue === index}
              className="flex justify-between items-center gap-3 w-full text-left touch-manipulation min-h-[44px]"
            >
              <span className="text-[14px] text-white">{issue.title}</span>
              <ChevronRight
                className={cn(
                  'h-4 w-4 shrink-0 text-white/70 transition-transform',
                  expandedIssue === index && 'rotate-90'
                )}
              />
            </button>

            {expandedIssue === index && (
              <div className="mt-1 mb-2 pl-3 border-l border-white/[0.12] animate-fade-in space-y-1">
                <p className="text-[13px] text-white/85 leading-relaxed">{issue.description}</p>
                <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/70 pt-1">
                  What to check
                </p>
                <p className="text-[13px] text-white/85 leading-relaxed">{issue.solution}</p>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CommonIssuesCard;
