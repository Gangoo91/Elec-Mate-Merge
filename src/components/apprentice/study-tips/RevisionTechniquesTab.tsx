import { Progress } from '@/components/ui/progress';

const RevisionTechniquesTab = () => {
  const techniques = [
    {
      technique: 'Active recall',
      description: 'Test yourself without looking at notes',
      effectiveness: 90,
      howTo: 'Cover your notes and try to write down everything you remember about a topic',
      example: 'Cover formulas and try to write them from memory, then check your accuracy',
      benefits: ['Strengthens memory pathways', 'Identifies knowledge gaps', 'Builds confidence'],
    },
    {
      technique: 'Spaced repetition',
      description: 'Review material at increasing intervals',
      effectiveness: 85,
      howTo: 'Review today, then in 3 days, 1 week, 2 weeks, and 1 month',
      example: 'Study cable calculations today, review them Tuesday, next Monday, then next month',
      benefits: ['Prevents forgetting', 'Efficient use of time', 'Long-term retention'],
    },
    {
      technique: 'Teaching others',
      description: 'Explain concepts to fellow apprentices',
      effectiveness: 95,
      howTo: 'Form study groups and take turns teaching different topics',
      example: 'Explain three-phase power calculations to your study group',
      benefits: ['Deepens understanding', 'Reveals gaps', 'Builds communication skills'],
    },
    {
      technique: 'Practice testing',
      description: 'Take mock exams under real conditions',
      effectiveness: 80,
      howTo: 'Set timer, use only allowed materials, no interruptions',
      example: 'Complete a full BS 7671 practice paper in 2 hours',
      benefits: ['Reduces exam anxiety', 'Improves time management', 'Identifies weak areas'],
    },
  ];

  const studyMethods = [
    {
      method: 'The Feynman Technique',
      steps: [
        'Choose a concept you want to learn',
        'Explain it in simple terms as if teaching a child',
        'Identify gaps in your explanation',
        'Go back to source material to fill gaps',
        'Repeat until you can explain clearly',
      ],
      bestFor: 'Complex electrical theory concepts',
    },
    {
      method: 'Mind mapping',
      steps: [
        'Start with main topic in centre',
        'Add major branches for subtopics',
        'Include formulas, diagrams, examples',
        'Use colours and symbols',
        'Review and update regularly',
      ],
      bestFor: 'Connecting related topics and regulations',
    },
    {
      method: 'The Pomodoro Technique',
      steps: [
        'Study for 25 minutes focused',
        'Take 5 minute break',
        'Repeat 3-4 times',
        'Take longer 15-30 minute break',
        'Track what you accomplished',
      ],
      bestFor: 'Maintaining concentration and avoiding burnout',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-4">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          Evidence-based revision techniques
        </span>
        <div className="space-y-3">
          {techniques.map((technique, index) => (
            <div
              key={index}
              className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-4 space-y-3"
            >
              <div className="flex items-start gap-3">
                <div className="flex-1 space-y-1">
                  <h3 className="text-[15px] font-semibold text-white leading-tight">
                    {technique.technique}
                  </h3>
                  <p className="text-[13px] text-white/70">{technique.description}</p>
                </div>
                <div className="text-right space-y-1">
                  <div className="text-[12px] text-white/85 font-mono">
                    {technique.effectiveness}%
                  </div>
                  <Progress value={technique.effectiveness} className="w-20 h-1" />
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                <div className="space-y-2">
                  <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                    How to do it
                  </span>
                  <p className="text-[13px] text-white/85">{technique.howTo}</p>
                  <div className="rounded-md border border-white/10 bg-white/[0.03] p-3 space-y-1">
                    <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                      Example
                    </span>
                    <p className="text-[12px] text-white/85">{technique.example}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                    Benefits
                  </span>
                  <ul className="space-y-1">
                    {technique.benefits.map((benefit, benefitIndex) => (
                      <li
                        key={benefitIndex}
                        className="flex items-start gap-2 text-[13px] text-white/85"
                      >
                        <span className="w-1 h-1 rounded-full bg-white/55 mt-2 flex-shrink-0" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-3">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          Proven study methods
        </span>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
          {studyMethods.map((method, index) => (
            <div
              key={index}
              className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-4 space-y-3"
            >
              <h3 className="text-[15px] font-semibold text-white leading-tight">
                {method.method}
              </h3>
              <ol className="space-y-2">
                {method.steps.map((step, stepIndex) => (
                  <li
                    key={stepIndex}
                    className="text-[13px] text-white/85 flex items-start gap-2"
                  >
                    <span className="text-white/55 font-mono text-[11px] mt-0.5">
                      {stepIndex + 1}.
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
              <div className="rounded-md border border-white/10 bg-white/[0.03] p-2.5 space-y-0.5">
                <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                  Best for
                </span>
                <p className="text-[12px] text-white/85">{method.bestFor}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RevisionTechniquesTab;
