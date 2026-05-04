import { Checkbox } from '@/components/ui/checkbox';
import { useState } from 'react';

const PreventionTab = () => {
  const [completedItems, setCompletedItems] = useState<string[]>([]);

  const preventionStrategies = [
    {
      category: 'Planning & Preparation',
      description: 'Set yourself up for success before you start',
      strategies: [
        {
          id: 'plan-1',
          title: 'Read job specifications thoroughly before starting',
          description: 'Understand all requirements and scope completely',
          impact: 'Prevents scope misunderstandings and rework',
        },
        {
          id: 'plan-2',
          title: 'Create a comprehensive materials checklist',
          description: 'List all required components with quantities',
          impact: 'Reduces wrong part selection and delays',
        },
        {
          id: 'plan-3',
          title: 'Review relevant BS 7671 regulations',
          description: 'Check compliance requirements for the specific job',
          impact: 'Ensures regulatory compliance from the start',
        },
      ],
    },
    {
      category: 'Work Execution',
      description: 'Execute work with precision and safety',
      strategies: [
        {
          id: 'exec-1',
          title: 'Double-check all connections before energising',
          description: 'Verify connections, polarity, and settings thoroughly',
          impact: 'Catches errors before they become dangerous',
        },
        {
          id: 'exec-2',
          title: 'Follow proper testing sequence religiously',
          description: 'Use dead testing procedures without shortcuts',
          impact: 'Prevents live working incidents and injuries',
        },
        {
          id: 'exec-3',
          title: 'Label cables and circuits during installation',
          description: 'Mark everything clearly as work progresses',
          impact: 'Prevents confusion in complex installations',
        },
      ],
    },
    {
      category: 'Communication & Documentation',
      description: 'Keep everyone informed and records accurate',
      strategies: [
        {
          id: 'comm-1',
          title: 'Ask questions when anything is uncertain',
          description: 'Clarify all doubts before proceeding with work',
          impact: 'Prevents costly assumption-based errors',
        },
        {
          id: 'comm-2',
          title: 'Report progress regularly to supervisor',
          description: 'Keep everyone informed of work status',
          impact: 'Enables early intervention if issues arise',
        },
        {
          id: 'comm-3',
          title: 'Document any changes from original plan',
          description: 'Record all deviations with reasons clearly',
          impact: 'Maintains accurate installation records',
        },
      ],
    },
  ];

  const commonRisks = [
    {
      title: 'High-Risk Situations',
      risks: [
        'Working under severe time pressure',
        'Unfamiliar installation types or locations',
        'Complex multi-circuit designs',
        'Multiple people working on same system',
      ],
    },
    {
      title: 'Environmental Factors',
      risks: [
        'Noisy or distracting work environment',
        'End of day or week fatigue',
        'Client presence causing pressure',
        'New or unfamiliar tools and equipment',
      ],
    },
  ];

  const mitigationStrategies = [
    'Take regular breaks to maintain concentration',
    'Ask for help when facing unfamiliar situations',
    'Double-check all critical connections and settings',
    'Use systematic checklists for complex tasks',
    'Communicate concerns early to supervisors',
    "Plan work to avoid rushing at day's end",
  ];

  const toggleCompleted = (id: string) => {
    setCompletedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const calculateProgress = () => {
    const totalItems = preventionStrategies.reduce(
      (sum, category) => sum + category.strategies.length,
      0
    );
    return Math.round((completedItems.length / totalItems) * 100);
  };

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-5">
        <div className="flex items-baseline justify-between gap-3">
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
            Prevention strategies
          </span>
          <span className="text-2xl font-mono text-white">{calculateProgress()}%</span>
        </div>

        <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
          <div
            className="h-full bg-elec-yellow transition-all duration-500"
            style={{ width: `${calculateProgress()}%` }}
          />
        </div>

        <div className="space-y-5">
          {preventionStrategies.map((category, categoryIndex) => (
            <div
              key={categoryIndex}
              className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 space-y-3"
            >
              <div className="space-y-1">
                <h3 className="text-[16px] font-semibold text-white">{category.category}</h3>
                <p className="text-[13px] text-white/55">{category.description}</p>
              </div>

              <div className="space-y-2">
                {category.strategies.map((strategy) => (
                  <div
                    key={strategy.id}
                    className="flex items-start gap-3 p-3 rounded-lg border border-white/[0.06] bg-white/[0.02]"
                  >
                    <Checkbox
                      id={strategy.id}
                      checked={completedItems.includes(strategy.id)}
                      onCheckedChange={() => toggleCompleted(strategy.id)}
                      className="mt-0.5 border-white/40 data-[state=checked]:bg-elec-yellow data-[state=checked]:border-elec-yellow data-[state=checked]:text-black"
                    />
                    <div className="flex-1 space-y-1">
                      <label
                        htmlFor={strategy.id}
                        className="text-[14px] font-medium text-white cursor-pointer block"
                      >
                        {strategy.title}
                      </label>
                      <p className="text-[13px] text-white/85 leading-relaxed">
                        {strategy.description}
                      </p>
                      <span className="inline-block text-[12px] text-white/85 px-2 py-0.5 rounded-md border border-white/10 bg-white/[0.03] mt-1">
                        {strategy.impact}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-4">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          Risk awareness & mitigation
        </span>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-4">
            {commonRisks.map((riskCategory, index) => (
              <div
                key={index}
                className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 space-y-2"
              >
                <h4 className="text-[14px] font-semibold text-white">{riskCategory.title}</h4>
                <ul className="space-y-1.5">
                  {riskCategory.risks.map((risk, riskIndex) => (
                    <li
                      key={riskIndex}
                      className="text-[14px] text-white/85 leading-relaxed flex items-start gap-2"
                    >
                      <span className="w-1 h-1 rounded-full bg-white/55 mt-2 flex-shrink-0" />
                      <span>{risk}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 space-y-2">
            <h4 className="text-[14px] font-semibold text-white">Mitigation strategies</h4>
            <ul className="space-y-1.5">
              {mitigationStrategies.map((strategy, index) => (
                <li
                  key={index}
                  className="text-[14px] text-white/85 leading-relaxed flex items-start gap-2"
                >
                  <span className="w-1 h-1 rounded-full bg-elec-yellow mt-2 flex-shrink-0" />
                  <span>{strategy}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreventionTab;
