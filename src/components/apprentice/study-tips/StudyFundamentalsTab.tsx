const utilityToneClass = (utility: string) =>
  utility === 'High utility'
    ? 'text-elec-yellow border-elec-yellow/30 bg-elec-yellow/[0.06]'
    : 'text-white/70 border-white/10 bg-white/[0.03]';

const Section = ({
  eyebrow,
  description,
  children,
}: {
  eyebrow: string;
  description?: string;
  children: React.ReactNode;
}) => (
  <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-3">
    <div className="space-y-1">
      <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
        {eyebrow}
      </span>
      {description && <p className="text-[14px] text-white/70 leading-relaxed">{description}</p>}
    </div>
    {children}
  </div>
);

const Pill = ({ children }: { children: React.ReactNode }) => (
  <span className="text-[12px] text-white/85 px-2 py-0.5 rounded-md border border-white/10 bg-white/[0.03]">
    {children}
  </span>
);

const StudyFundamentalsTab = () => {
  const learningPrinciples = [
    {
      principle: 'Active learning',
      description: 'Engage with material rather than passively reading.',
      techniques: [
        'Summarise in your own words',
        'Teach concepts to others',
        'Create mind maps',
        'Ask questions while reading',
      ],
      utility: 'Moderate utility',
      timeInvestment: 'Same as passive reading, much stronger results',
    },
    {
      principle: 'Spaced repetition',
      description: 'Review material at increasing intervals for long-term retention.',
      techniques: [
        'Use flashcard apps',
        'Schedule regular reviews',
        'Increase intervals after success',
        'Focus on difficult concepts',
      ],
      utility: 'High utility',
      timeInvestment: 'Less total time than cramming for the same retention',
    },
    {
      principle: 'Interleaving',
      description: 'Mix different topics in study sessions rather than blocking.',
      techniques: [
        'Alternate between subjects',
        'Mix theory and practical',
        'Combine calculations with regulations',
        'Vary question types',
      ],
      utility: 'Moderate utility',
      timeInvestment: 'No extra time needed',
    },
    {
      principle: 'Elaborative interrogation',
      description: "Ask 'why' and 'how' questions to deepen understanding.",
      techniques: [
        'Explain why formulas work',
        'Connect concepts to real applications',
        'Question assumptions',
        'Explore relationships',
      ],
      utility: 'Moderate utility',
      timeInvestment: 'A little extra time, used while you read',
    },
    {
      principle: 'Dual coding',
      description: 'Combine visual and verbal information for better retention.',
      techniques: [
        'Draw diagrams while reading',
        'Use visual mnemonics',
        'Create concept maps',
        'Watch demonstration videos',
      ],
      utility: 'Moderate utility',
      timeInvestment: 'Some extra time to sketch alongside notes',
    },
    {
      principle: 'Distributed practice',
      description: 'Spread learning sessions over time rather than cramming.',
      techniques: [
        'Study little and often',
        'Plan long-term schedules',
        'Review previous sessions',
        'Build consistent habits',
      ],
      utility: 'High utility',
      timeInvestment: 'Better time efficiency overall',
    },
  ];

  const studyEnvironment = [
    {
      factor: 'Physical environment',
      importance: 'Critical',
      elements: [
        'Consistent study location with minimal distractions',
        'Good lighting — preferably natural light from the left',
        'Comfortable temperature (18-22°C optimal)',
        'Quiet space or consistent background noise',
        'Organised desk with all materials within reach',
      ],
    },
    {
      factor: 'Digital environment',
      importance: 'High',
      elements: [
        'Fast, reliable internet connection',
        'Multiple monitors if available for references',
        'PDF reader optimised for technical documents',
        'Note-taking app synced across devices',
        'Website blockers during focused study time',
      ],
    },
    {
      factor: 'Mental environment',
      importance: 'Critical',
      elements: [
        'Clear learning objectives for each session',
        'Positive mindset and growth mentality',
        'Stress management techniques ready',
        'Break schedule planned in advance',
        'Progress tracking system in place',
      ],
    },
    {
      factor: 'Social environment',
      importance: 'Medium',
      elements: [
        'Family understanding of study commitments',
        'Study group or accountability partner',
        'Mentor or tutor for difficult concepts',
        'Workplace support for learning goals',
        'Online communities for motivation',
      ],
    },
  ];

  const studyTechniques = [
    {
      technique: 'The Feynman technique',
      description: 'Explain concepts simply to identify knowledge gaps.',
      steps: [
        'Choose a concept you want to understand',
        'Explain it in simple terms as if teaching a child',
        'Identify gaps where explanation breaks down',
        'Return to source material to fill gaps',
        'Repeat until explanation flows naturally',
      ],
      bestFor: 'Complex electrical theory and regulations',
      timeRequired: '15-30 minutes per concept',
    },
    {
      technique: 'Active recall testing',
      description: 'Test yourself without looking at notes or answers.',
      steps: [
        'Cover your notes after reading a section',
        'Write down everything you remember',
        'Check against original material',
        'Focus extra time on missed information',
        'Repeat at increasing intervals',
      ],
      bestFor: 'Memorising regulations and formulas',
      timeRequired: '5-10 minutes per topic',
    },
    {
      technique: 'Mind mapping',
      description: 'Visual representation of information and connections.',
      steps: [
        'Start with main topic in the centre',
        'Add major branches for key subtopics',
        'Include formulas, examples, and regulations',
        'Use colours and symbols for categorisation',
        'Review and update map regularly',
      ],
      bestFor: 'Understanding complex electrical systems',
      timeRequired: '20-45 minutes per map',
    },
    {
      technique: 'Problem-solution pairing',
      description: 'Connect every concept to real-world applications.',
      steps: [
        'Learn the theoretical concept thoroughly',
        'Find or create practical examples',
        'Practice applying theory to solve problems',
        'Explain how theory relates to workplace',
        'Create your own example scenarios',
      ],
      bestFor: 'Cable calculations and circuit design',
      timeRequired: '30-60 minutes per concept',
    },
  ];

  const motivationStrategies = [
    {
      strategy: 'Goal hierarchy',
      description: 'Break long-term goals into manageable steps.',
      implementation:
        'Set daily, weekly, monthly, and yearly learning objectives with clear success criteria.',
    },
    {
      strategy: 'Progress visualisation',
      description: 'Make learning progress visible and tangible.',
      implementation:
        'Use progress bars, checklists, or charts to show advancement toward qualification.',
    },
    {
      strategy: 'Reward systems',
      description: 'Celebrate achievements to maintain motivation.',
      implementation:
        'Set up small rewards for study milestones and bigger rewards for major achievements.',
    },
    {
      strategy: 'Social accountability',
      description: 'Share goals with others for external motivation.',
      implementation:
        'Tell family, friends, or study partners about your commitments and progress.',
    },
    {
      strategy: 'Purpose connection',
      description: 'Connect daily study to long-term career vision.',
      implementation: "Regularly remind yourself why you're pursuing electrical qualifications.",
    },
    {
      strategy: 'Habit stacking',
      description: 'Attach new study habits to existing routines.',
      implementation:
        'Study immediately after established activities like morning coffee or lunch break.',
    },
  ];

  return (
    <div className="space-y-5">
      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-3">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          Study fundamentals
        </span>
        <p className="text-[14px] text-white/85 leading-relaxed">
          Master the core principles of effective learning. These evidence-based fundamentals form
          the foundation of successful study practices for electrical apprenticeships and beyond.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: 'Key principles', value: '6' },
            { label: 'Study techniques', value: '4' },
            { label: 'Daily minimum', value: '30 min' },
            { label: 'Consistency wins', value: 'Daily' },
          ].map((s) => (
            <div
              key={s.label}
              className="rounded-md border border-white/[0.06] bg-white/[0.02] p-3 space-y-1"
            >
              <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                {s.label}
              </span>
              <p className="text-[16px] font-semibold text-white">{s.value}</p>
            </div>
          ))}
        </div>
      </div>

      <Section
        eyebrow="Evidence-based learning principles"
        description="Utility ratings follow Dunlosky et al. (2013) — how reliably each technique helps across subjects, ages, and test types. Not invented percentages."
      >
        <div className="space-y-3">
          {learningPrinciples.map((principle, index) => (
            <div
              key={index}
              className="rounded-md border border-white/[0.06] bg-white/[0.02] p-4 space-y-3"
            >
              <div className="flex items-start justify-between gap-3">
                <h4 className="text-[16px] font-semibold text-white">{principle.principle}</h4>
                <span
                  className={`flex-shrink-0 text-[10px] font-medium uppercase tracking-[0.14em] px-2 py-0.5 rounded-md border ${utilityToneClass(
                    principle.utility
                  )}`}
                >
                  {principle.utility}
                </span>
              </div>
              <p className="text-[13px] text-white/70 leading-relaxed">{principle.description}</p>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                    Implementation techniques
                  </span>
                  <ul className="space-y-1">
                    {principle.techniques.map((technique, techIndex) => (
                      <li
                        key={techIndex}
                        className="text-[13px] text-white/85 leading-relaxed flex items-start gap-2"
                      >
                        <span className="w-1 h-1 rounded-full bg-white/55 mt-2 flex-shrink-0" />
                        <span>{technique}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-md border border-white/[0.06] bg-white/[0.02] p-3 space-y-1">
                  <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                    Time investment
                  </span>
                  <p className="text-[13px] text-white/85 leading-relaxed">
                    {principle.timeInvestment}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section eyebrow="Optimal study environment setup">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {studyEnvironment.map((env, index) => (
            <div
              key={index}
              className="rounded-md border border-white/[0.06] bg-white/[0.02] p-4 space-y-2"
            >
              <div className="flex items-baseline justify-between gap-2">
                <h4 className="text-[14px] font-semibold text-white">{env.factor}</h4>
                <Pill>{env.importance}</Pill>
              </div>
              <ul className="space-y-1.5">
                {env.elements.map((element, elementIndex) => (
                  <li
                    key={elementIndex}
                    className="text-[13px] text-white/85 leading-relaxed flex items-start gap-2"
                  >
                    <span className="w-1 h-1 rounded-full bg-white/55 mt-2 flex-shrink-0" />
                    <span>{element}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      <Section eyebrow="Core study techniques">
        <div className="space-y-3">
          {studyTechniques.map((technique, index) => (
            <div
              key={index}
              className="rounded-md border border-white/[0.06] bg-white/[0.02] p-4 space-y-3"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h4 className="text-[14px] font-semibold text-white">{technique.technique}</h4>
                  <p className="text-[13px] text-white/70 leading-relaxed">
                    {technique.description}
                  </p>
                </div>
                <Pill>{technique.timeRequired}</Pill>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                    Step-by-step process
                  </span>
                  <ol className="space-y-1.5">
                    {technique.steps.map((step, stepIndex) => (
                      <li
                        key={stepIndex}
                        className="text-[13px] text-white/85 leading-relaxed flex items-start gap-2"
                      >
                        <span className="w-5 flex-shrink-0 text-white/55 font-mono">
                          {stepIndex + 1}.
                        </span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>
                <div className="rounded-md border border-white/[0.06] bg-white/[0.02] p-3 space-y-1">
                  <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                    Best used for
                  </span>
                  <p className="text-[13px] text-white/85 leading-relaxed">{technique.bestFor}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section eyebrow="Maintaining study motivation">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {motivationStrategies.map((strategy, index) => (
            <div
              key={index}
              className="rounded-md border border-white/[0.06] bg-white/[0.02] p-4 space-y-2"
            >
              <h4 className="text-[14px] font-semibold text-white">{strategy.strategy}</h4>
              <p className="text-[13px] text-white/70 leading-relaxed">{strategy.description}</p>
              <div className="space-y-1">
                <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                  How to implement
                </span>
                <p className="text-[13px] text-white/85 leading-relaxed">
                  {strategy.implementation}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section
        eyebrow="If studying on top of work gets too much"
        description="Juggling day-release, OTJ hours and a full working week is hard. If the pressure tips into stress or you are struggling, these UK trade and crisis lines are free, confidential, and there for apprentices."
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            {
              name: 'Electrical Industries Charity',
              detail: 'Free, confidential support for anyone in the electrical industry',
              label: '0800 652 1618',
              href: 'tel:08006521618',
            },
            {
              name: 'Lighthouse Construction Industry Charity',
              detail: '24/7 helpline for construction and trades',
              label: '0345 605 1956',
              href: 'tel:03456051956',
            },
            {
              name: 'Lighthouse text line',
              detail: 'Text HARDHAT to 85258 for free 24/7 crisis text support',
              label: 'Text HARDHAT to 85258',
              href: 'sms:85258?&body=HARDHAT',
            },
            {
              name: 'Samaritans',
              detail: 'Round-the-clock support, whatever you are going through',
              label: '116 123',
              href: 'tel:116123',
            },
          ].map((line) => (
            <a
              key={line.name}
              href={line.href}
              className="flex flex-col gap-1 rounded-md border border-white/[0.06] bg-white/[0.02] p-4 min-h-11 hover:bg-white/[0.04] active:bg-white/[0.06] transition-colors touch-manipulation"
            >
              <span className="text-[14px] font-semibold text-white">{line.name}</span>
              <span className="text-[12px] text-white/70 leading-relaxed">{line.detail}</span>
              <span className="text-[13px] font-mono text-elec-yellow">{line.label}</span>
            </a>
          ))}
        </div>
      </Section>

      <Section eyebrow="Foundational study schedule template">
        <div className="grid grid-cols-1 md:grid-cols-7 gap-3">
          {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(
            (day, index) => (
              <div
                key={day}
                className="rounded-md border border-white/[0.06] bg-white/[0.02] p-3 space-y-2"
              >
                <h4 className="text-[12px] font-semibold text-white">{day}</h4>
                <div className="space-y-2 text-[12px] text-white/85 leading-relaxed">
                  {index < 5 ? (
                    <>
                      <div>
                        <div className="text-white/55 font-mono">6:30-7:00</div>
                        Quick review
                      </div>
                      <div>
                        <div className="text-white/55 font-mono">19:00-20:30</div>
                        Main study
                      </div>
                      <div>
                        <div className="text-white/55 font-mono">21:00-21:15</div>
                        Tomorrow prep
                      </div>
                    </>
                  ) : index === 5 ? (
                    <>
                      <div>
                        <div className="text-white/55 font-mono">9:00-11:00</div>
                        Deep study
                      </div>
                      <div>
                        <div className="text-white/55 font-mono">14:00-15:00</div>
                        Practice tests
                      </div>
                    </>
                  ) : (
                    <>
                      <div>
                        <div className="text-white/55 font-mono">10:00-11:00</div>
                        Week review
                      </div>
                      <div>
                        <div className="text-white/55 font-mono">15:00-16:00</div>
                        Next week plan
                      </div>
                    </>
                  )}
                </div>
              </div>
            )
          )}
        </div>
      </Section>
    </div>
  );
};

export default StudyFundamentalsTab;
