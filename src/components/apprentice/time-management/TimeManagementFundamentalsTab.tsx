const TimeManagementFundamentalsTab = () => {
  const principles = [
    {
      title: 'Priority matrix (Eisenhower method)',
      description: 'Categorise tasks by urgency and importance',
      steps: [
        'Urgent & important: Do immediately (safety issues, deadlines)',
        'Important, not urgent: Schedule (study time, skills development)',
        'Urgent, not important: Delegate or minimise (interruptions)',
        'Neither: Eliminate (time wasters, excessive social media)',
      ],
    },
    {
      title: 'Time blocking',
      description: 'Allocate specific time slots for different activities',
      steps: [
        'Block work hours (including travel time)',
        'Schedule study sessions with specific topics',
        'Reserve time for breaks and meals',
        'Plan personal time and relationships',
      ],
    },
    {
      title: 'The 2-minute rule',
      description: 'If it takes less than 2 minutes, do it now',
      steps: [
        'Reply to quick messages immediately',
        'File documents as you receive them',
        'Complete small administrative tasks',
        'Tidy workspace at end of each day',
      ],
    },
  ];

  const commonChallenges = [
    {
      challenge: 'Irregular work hours',
      solution: 'Create flexible routines that adapt to shift patterns',
      tip: 'Use travel time for audio learning content',
    },
    {
      challenge: 'Physical exhaustion',
      solution: 'Schedule demanding study during peak energy hours',
      tip: 'Take power naps (15-20 minutes) when possible',
    },
    {
      challenge: 'Multiple deadlines',
      solution: 'Break large tasks into smaller, manageable chunks',
      tip: 'Use backwards planning from deadline dates',
    },
    {
      challenge: 'Distractions at home',
      solution: 'Create a dedicated study space and set boundaries',
      tip: 'Use noise-cancelling headphones or white noise',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-3">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          Core time management principles
        </span>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {principles.map((principle, index) => (
            <div
              key={index}
              className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 space-y-3"
            >
              <div>
                <h3 className="text-[16px] font-semibold text-white leading-tight">
                  {principle.title}
                </h3>
                <p className="text-[14px] text-white/70 leading-relaxed mt-1">
                  {principle.description}
                </p>
              </div>
              <ul className="space-y-1.5">
                {principle.steps.map((step, stepIndex) => (
                  <li
                    key={stepIndex}
                    className="text-[14px] text-white/85 leading-relaxed flex items-start gap-2"
                  >
                    <span className="w-1 h-1 rounded-full bg-white/55 mt-2 flex-shrink-0" />
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-3">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          Common challenges & solutions
        </span>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {commonChallenges.map((item, index) => (
            <div
              key={index}
              className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 space-y-2"
            >
              <h4 className="text-[14px] font-semibold text-white">{item.challenge}</h4>
              <p className="text-[14px] text-white/85 leading-relaxed">{item.solution}</p>
              <span className="inline-block text-[12px] text-white/85 px-2 py-0.5 rounded-md border border-elec-yellow/20 bg-elec-yellow/[0.04]">
                {item.tip}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-3">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          Getting started: your first week
        </span>
        <div className="space-y-3">
          {[
            {
              title: 'Day 1-2: Assessment',
              items: [
                'Track your current time usage for 2 days',
                'Identify your peak energy hours',
                'Note major time wasters and distractions',
              ],
            },
            {
              title: 'Day 3-4: Planning',
              items: [
                'Create your weekly template schedule',
                'Set up your priority matrix system',
                'Choose your planning tools and apps',
              ],
            },
            {
              title: 'Day 5-7: Implementation',
              items: [
                'Start with one new habit (e.g., time blocking)',
                'Practice the 2-minute rule consistently',
                'Review and adjust your approach daily',
              ],
            },
          ].map((block, idx) => (
            <div
              key={idx}
              className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 space-y-2"
            >
              <h4 className="text-[14px] font-semibold text-white">{block.title}</h4>
              <ul className="space-y-1.5">
                {block.items.map((item, i) => (
                  <li
                    key={i}
                    className="text-[14px] text-white/85 leading-relaxed flex items-start gap-2"
                  >
                    <span className="w-1 h-1 rounded-full bg-white/55 mt-2 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TimeManagementFundamentalsTab;
