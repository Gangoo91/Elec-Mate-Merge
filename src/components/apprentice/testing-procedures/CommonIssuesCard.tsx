import { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

type Issue = {
  title: string;
  description: string;
  solution: string;
};

const CommonIssuesCard = () => {
  const [expandedIssue, setExpandedIssue] = useState<number | null>(null);

  const issuesList: Issue[] = [
    {
      title: 'High readings',
      description: 'Readings significantly above expected values',
      solution:
        'Check for loose connections or damaged conductors. Inspect terminations for proper torque settings and look for signs of corrosion.',
    },
    {
      title: 'Inconsistent readings',
      description: 'Values that fluctuate or vary between tests',
      solution:
        'Check for corrosion or poor contact at test points. Clean contact surfaces and ensure proper pressure is applied during tests.',
    },
    {
      title: 'Zero readings',
      description: 'No value registering on the test equipment',
      solution:
        'Check for inadvertent short circuits in the test setup. Verify that the test equipment is functioning correctly with a known good circuit.',
    },
  ];

  const toggleIssue = (index: number) => {
    setExpandedIssue(expandedIssue === index ? null : index);
  };

  return (
    <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-3">
      <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
        Common issues
      </span>

      <ul className="space-y-2">
        {issuesList.map((issue, index) => (
          <li key={index} className="border-b border-white/[0.06] pb-2 last:border-0 last:pb-0">
            <button
              onClick={() => toggleIssue(index)}
              className="flex justify-between items-center w-full text-left touch-manipulation min-h-[36px]"
            >
              <span className="text-[14px] text-white/85">{issue.title}</span>
              <ChevronRight
                className={cn(
                  'h-4 w-4 text-white/55 transition-transform',
                  expandedIssue === index && 'rotate-90'
                )}
              />
            </button>

            {expandedIssue === index && (
              <div className="mt-2 pl-3 border-l border-white/[0.06] animate-fade-in space-y-1">
                <p className="text-[13px] text-white/70 leading-relaxed">{issue.description}</p>
                <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                  Solution
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
